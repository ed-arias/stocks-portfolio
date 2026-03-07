import { Fragment, useMemo, useState } from 'react'
import type { ClosedPosition } from '../../types'

type ClosedSortKey =
  | 'ticker' | 'assetClass' | 'shares' | 'avgCost'
  | 'exitPrice' | 'realizedGain' | 'realizedGainPercentage' | 'holdDays' | 'closeDate'

const ASSET_CLASS_ORDER = ['stock', 'etf', 'crypto', 'cash'] as const

const ASSET_CLASS_LABELS: Record<string, string> = {
  stock: 'Stocks', etf: 'ETFs', crypto: 'Crypto', cash: 'Cash',
}

function formatHoldPeriod(days: number): string {
  if (days < 30) return `${days}d`
  if (days < 365) return `${Math.floor(days / 30)}mo`
  const years = Math.floor(days / 365)
  const months = Math.floor((days % 365) / 30)
  return months === 0 ? `${years}y` : `${years}y ${months}mo`
}

const fmt = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

interface Props {
  positions: ClosedPosition[]
}

export function ClosedPositionsTable({ positions }: Props) {
  const [open, setOpen] = useState(false)
  const [sortKey, setSortKey] = useState<ClosedSortKey>('closeDate')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())

  const handleSort = (key: ClosedSortKey) => {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc') }
    else if (sortDir === 'asc') setSortDir('desc')
    else { setSortKey('closeDate'); setSortDir('desc') }
  }

  const toggleGroup = (key: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const sorted = useMemo(() => {
    const dir = sortDir === 'asc' ? 1 : -1
    return [...positions].sort((a, b) => {
      switch (sortKey) {
        case 'ticker':                 return a.ticker.localeCompare(b.ticker) * dir
        case 'assetClass':             return a.assetClass.localeCompare(b.assetClass) * dir
        case 'shares':                 return (a.shares - b.shares) * dir
        case 'avgCost':                return (a.avgCost - b.avgCost) * dir
        case 'exitPrice':              return (a.exitPrice - b.exitPrice) * dir
        case 'realizedGain':           return (a.realizedGain - b.realizedGain) * dir
        case 'realizedGainPercentage': return (a.realizedGainPercentage - b.realizedGainPercentage) * dir
        case 'holdDays':               return (a.holdDays - b.holdDays) * dir
        default:                       return (new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime()) * dir
      }
    })
  }, [positions, sortKey, sortDir])

  const groups = useMemo(() => {
    const buckets = new Map<string, ClosedPosition[]>()
    for (const pos of sorted) {
      if (!buckets.has(pos.assetClass)) buckets.set(pos.assetClass, [])
      buckets.get(pos.assetClass)!.push(pos)
    }
    return ASSET_CLASS_ORDER
      .filter(k => buckets.has(k))
      .map(k => ({
        key: k,
        label: ASSET_CLASS_LABELS[k] ?? k,
        positions: buckets.get(k)!,
        realizedGainSum: buckets.get(k)!.reduce((s, p) => s + p.realizedGain, 0),
      }))
  }, [sorted])

  const th = (key: ClosedSortKey, label: string, align?: string) => (
    <th
      className={`closed-th${align ? ` closed-th--${align}` : ''}`}
      data-sort={sortKey === key ? sortDir : 'none'}
      onClick={() => handleSort(key)}
    >
      {label}
    </th>
  )

  return (
    <div className="closed-section">
      <button
        className={`closed-toggle${open ? ' closed-toggle--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="closed-toggle-label">Closed Positions</span>
        <span className="closed-toggle-count">{positions.length}</span>
        <span className={`closed-toggle-chevron${open ? ' expanded' : ''}`}>›</span>
      </button>

      {open && (
        <div className="closed-table-wrap">
          <div className="table-scroll">
            <table className="holdings-table closed-table">
              <thead>
                <tr>
                  {th('ticker',                 'Ticker')}
                  {th('assetClass',             'Asset Class', 'center')}
                  {th('shares',                 'Shares',      'right')}
                  {th('avgCost',                'Avg Cost',    'right')}
                  {th('exitPrice',              'Exit Price',  'right')}
                  {th('realizedGain',           'Realized G/L ($)', 'right')}
                  {th('realizedGainPercentage', 'Realized G/L (%)', 'right')}
                  {th('holdDays',               'Hold Period', 'right')}
                </tr>
              </thead>
              <tbody>
                {groups.map(group => (
                  <Fragment key={group.key}>
                    <tr
                      className="group-header-row"
                      onClick={() => toggleGroup(group.key)}
                    >
                      <td>
                        <div className="group-header-content">
                          <span className={`group-chevron${collapsedGroups.has(group.key) ? '' : ' expanded'}`}>›</span>
                          <span className="group-label">{group.label}</span>
                          <span className="group-count">{group.positions.length}</span>
                        </div>
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td className={`closed-group-gl ${group.realizedGainSum >= 0 ? 'positive' : 'negative'}`}>
                        <span className="closed-gl-sum">
                          {group.realizedGainSum >= 0 ? '+' : ''}{fmt(group.realizedGainSum)}
                        </span>
                      </td>
                      <td />
                      <td />
                    </tr>
                    {!collapsedGroups.has(group.key) && group.positions.map(pos => (
                      <tr key={pos.id} className="data-row closed-data-row">
                        <td className="ticker-cell">
                          {pos.ticker}
                          <span className="company-name">{pos.companyName}</span>
                        </td>
                        <td className="closed-asset-class-cell">
                          <span className="closed-asset-badge">
                            {ASSET_CLASS_LABELS[pos.assetClass] ?? pos.assetClass}
                          </span>
                        </td>
                        <td className="closed-num">{pos.shares}</td>
                        <td className="closed-num">{fmt(pos.avgCost)}</td>
                        <td className="closed-num">{fmt(pos.exitPrice)}</td>
                        <td className={pos.realizedGain >= 0 ? 'positive' : 'negative'}>
                          <div className="pl-cell">
                            <span>{pos.realizedGain >= 0 ? '+' : ''}{fmt(pos.realizedGain)}</span>
                          </div>
                        </td>
                        <td className={pos.realizedGainPercentage >= 0 ? 'positive' : 'negative'}>
                          <span className={`closed-gl-pill ${pos.realizedGainPercentage >= 0 ? 'closed-gl-pill--pos' : 'closed-gl-pill--neg'}`}>
                            {pos.realizedGainPercentage >= 0 ? '+' : ''}{pos.realizedGainPercentage.toFixed(2)}%
                          </span>
                        </td>
                        <td className="closed-hold-period">
                          {formatHoldPeriod(pos.holdDays)}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
