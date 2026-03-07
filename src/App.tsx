import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { useTheme } from './context/ThemeContext'
import AllocationExplorer from './features/AllocationExplorer/AllocationExplorer'
import { PortfolioChart } from './features/PortfolioChart/PortfolioChart'
import { StockService } from './services/StockService'
import type { ClosedPosition, PortfolioSummary, StockPosition, Transaction } from './types'

type ColumnId = 'shares' | 'avgCost' | 'price' | 'marketValue' | 'dailyChange' | 'unrealizedGain' | 'totalReturn' | 'dividendYield'
type SortKey = ColumnId | 'ticker'
type ClosedSortKey =
  | 'ticker' | 'assetClass' | 'shares' | 'avgCost'
  | 'exitPrice' | 'realizedGain' | 'realizedGainPercentage'
  | 'holdDays' | 'closeDate'

type PositionGroup = {
  key: string
  label: string
  positions: StockPosition[]
  totalValue: number
  dailyChange: number
  unrealizedGain: number
  totalReturn: number
}

const ASSET_CLASS_ORDER = ['stock', 'etf', 'crypto', 'cash'] as const

const COLUMN_LABELS: Record<ColumnId, string> = {
  shares:        'Shares',
  avgCost:       'Avg Cost',
  price:         'Price',
  marketValue:   'Total Value',
  dailyChange:   'Daily Change',
  unrealizedGain:'Profit / Loss',
  totalReturn:   'Total Return',
  dividendYield: 'Div. Yield',
}

const ALL_COLUMNS = Object.keys(COLUMN_LABELS) as ColumnId[]

const DEFAULT_VISIBILITY: Record<ColumnId, boolean> = {
  shares: true, avgCost: true, price: true, marketValue: true,
  dailyChange: true, unrealizedGain: true, totalReturn: true, dividendYield: true,
}

function loadColumnVisibility(): Record<ColumnId, boolean> {
  try {
    const stored = localStorage.getItem('holdings-visible-columns')
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<Record<ColumnId, boolean>>
      return { ...DEFAULT_VISIBILITY, ...parsed }
    }
  } catch { /* ignore */ }
  return { ...DEFAULT_VISIBILITY }
}

const ASSET_CLASS_LABELS: Record<string, string> = {
  stock:  'Stocks',
  etf:    'ETFs',
  crypto: 'Crypto',
  cash:   'Cash',
}

const CLOSED_COLUMN_LABELS: Record<ClosedSortKey, string> = {
  ticker:                 'Ticker',
  assetClass:             'Asset Class',
  shares:                 'Shares',
  avgCost:                'Avg Cost',
  exitPrice:              'Exit Price',
  realizedGain:           'Realized G/L ($)',
  realizedGainPercentage: 'Realized G/L (%)',
  holdDays:               'Hold Period',
  closeDate:              'Close Date',
}

const CLOSED_COLUMNS: ClosedSortKey[] = [
  'ticker', 'assetClass', 'shares', 'avgCost', 'exitPrice',
  'realizedGain', 'realizedGainPercentage', 'holdDays', 'closeDate',
]

const holdingColor = (idx: number, total: number) =>
  `hsl(${Math.round((idx / total) * 360)}, 55%, 75%)`

function formatHoldPeriod(days: number): string {
  if (days < 30) return `${days}d`
  if (days < 365) return `${Math.floor(days / 30)}mo`
  const years = Math.floor(days / 365)
  const months = Math.floor((days % 365) / 30)
  return months === 0 ? `${years}y` : `${years}y ${months}mo`
}

function formatCloseDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function TransactionModal({ position, onClose }: { position: StockPosition; onClose: () => void }) {
  const fmt = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

  const fmtDate = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    })

  const sorted = [...position.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const typeLabel: Record<Transaction['type'], string> = {
    buy: 'Buy', sell: 'Sell', dividend: 'Dividend', split: 'Split',
  }

  return (
    <div className="txn-overlay" onClick={onClose}>
      <div className="txn-panel" onClick={e => e.stopPropagation()}>
        <div className="txn-header">
          <div className="txn-header-info">
            <span className="txn-ticker">{position.ticker}</span>
            <span className="txn-company">{position.companyName}</span>
          </div>
          <button className="txn-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="txn-rule" />
        <div className="txn-body">
          {sorted.length === 0 ? (
            <p className="txn-empty">No transactions recorded for this position.</p>
          ) : (
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Shares</th>
                  <th>Price / Share</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(txn => (
                  <tr key={txn.id} className="txn-row">
                    <td className="txn-date">{fmtDate(txn.date)}</td>
                    <td className="txn-badge-cell">
                      <span className={`txn-badge txn-badge--${txn.type}`}>
                        {typeLabel[txn.type]}
                      </span>
                    </td>
                    <td className="txn-num">
                      {txn.type === 'split'
                        ? `${txn.shares}:1`
                        : txn.shares !== null ? txn.shares : '—'}
                    </td>
                    <td className="txn-num">
                      {txn.price !== null ? fmt(txn.price) : '—'}
                    </td>
                    <td className="txn-num">
                      {txn.amount !== null ? fmt(txn.amount) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function Sidebar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <aside className="sidebar">
      <div className="logotype">
        Portfolio<span>Equity Tracker</span>
      </div>
      <div className="sidebar-footer">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </aside>
  )
}

function LoadingState({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <div className="loading-shell">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div className="loading-main">
        <div className="skeleton skeleton-title" />
        <div className="skeleton-cards">
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
        </div>
        <div className="skeleton skeleton-chart" />
        <div className="skeleton skeleton-alloc" />
        <div className="skeleton skeleton-table" />
      </div>
    </div>
  )
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null)
  const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>([])
  const [loading, setLoading] = useState(true)

  // Active tab state
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active')

  // Active holdings state
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnId, boolean>>(loadColumnVisibility)
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [groupBy, setGroupBy] = useState<'assetClass' | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const [selectedPosition, setSelectedPosition] = useState<StockPosition | null>(null)

  // Closed positions state
  const [closedSortKey, setClosedSortKey] = useState<ClosedSortKey>('closeDate')
  const [closedSortDir, setClosedSortDir] = useState<'asc' | 'desc'>('desc')
  const [closedCollapsedGroups, setClosedCollapsedGroups] = useState<Set<string>>(new Set())

  const toggleGroupCollapse = (key: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleClosedGroup = (key: string) => {
    setClosedCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleColumn = (id: ColumnId) => {
    if (visibleColumns[id] && sortKey === id) {
      setSortKey(null)
      setSortDir('asc')
    }
    setVisibleColumns(prev => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem('holdings-visible-columns', JSON.stringify(next))
      return next
    })
  }

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir('asc')
    }
  }

  const handleClosedSort = (key: ClosedSortKey) => {
    if (closedSortKey !== key) {
      setClosedSortKey(key)
      setClosedSortDir('asc')
    } else if (closedSortDir === 'asc') {
      setClosedSortDir('desc')
    } else {
      setClosedSortKey('closeDate')
      setClosedSortDir('desc')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, closed] = await Promise.all([
          StockService.getPortfolioSummary(),
          StockService.getClosedPositions(),
        ])
        setPortfolio(data)
        setClosedPositions(closed)
      } catch (error) {
        console.error('Failed to fetch portfolio data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!pickerOpen) return
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [pickerOpen])

  useEffect(() => {
    if (!selectedPosition) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPosition(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [selectedPosition])

  const sortedPositions = useMemo(() => {
    const positions = portfolio?.positions ?? []
    if (!sortKey) return positions
    const dir = sortDir === 'asc' ? 1 : -1
    return [...positions].sort((a, b) => {
      if (sortKey === 'ticker')         return a.ticker.localeCompare(b.ticker) * dir
      if (sortKey === 'avgCost')        return (a.avgCost - b.avgCost) * dir
      if (sortKey === 'price')          return (a.currentPrice - b.currentPrice) * dir
      if (sortKey === 'marketValue')    return (a.marketValue - b.marketValue) * dir
      if (sortKey === 'dailyChange')    return (a.dailyChange - b.dailyChange) * dir
      if (sortKey === 'unrealizedGain') return (a.unrealizedGain - b.unrealizedGain) * dir
      if (sortKey === 'totalReturn')    return (a.totalReturn - b.totalReturn) * dir
      if (sortKey === 'dividendYield')  return (a.dividendYield - b.dividendYield) * dir
      return (a.shares - b.shares) * dir
    })
  }, [portfolio, sortKey, sortDir])

  const groupedPositions = useMemo((): PositionGroup[] => {
    if (!groupBy) return []
    const buckets = new Map<string, StockPosition[]>()
    for (const pos of sortedPositions) {
      if (!buckets.has(pos.assetClass)) buckets.set(pos.assetClass, [])
      buckets.get(pos.assetClass)!.push(pos)
    }
    return ASSET_CLASS_ORDER
      .filter(key => buckets.has(key))
      .map(key => {
        const positions = buckets.get(key)!
        return {
          key,
          label: ASSET_CLASS_LABELS[key] ?? key,
          positions,
          totalValue:     positions.reduce((s, p) => s + p.marketValue, 0),
          dailyChange:    positions.reduce((s, p) => s + p.dailyChange, 0),
          unrealizedGain: positions.reduce((s, p) => s + p.unrealizedGain, 0),
          totalReturn:    positions.reduce((s, p) => s + p.totalReturn, 0),
        }
      })
  }, [sortedPositions, groupBy])

  const sortedClosedPositions = useMemo(() => {
    const dir = closedSortDir === 'asc' ? 1 : -1
    return [...closedPositions].sort((a, b) => {
      switch (closedSortKey) {
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
  }, [closedPositions, closedSortKey, closedSortDir])

  const groupedClosedPositions = useMemo(() => {
    const buckets = new Map<string, ClosedPosition[]>()
    for (const pos of sortedClosedPositions) {
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
  }, [sortedClosedPositions])

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

  const formatPercentage = (val: number, decimals = 2) =>
    `${val.toFixed(decimals)}%`

  if (loading) {
    return <LoadingState theme={theme} toggleTheme={toggleTheme} />
  }

  const isPositive = (portfolio?.dailyGain ?? 0) >= 0
  const isReturnPositive = (portfolio?.totalReturn ?? 0) >= 0

  return (
    <div className="shell">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      <main className="main">
        <div className="page-header">
          <p className="page-label">Overview</p>
          <h1 className="page-title">My Portfolio</h1>
        </div>

        <div className="cards-grid">
          <div className="card">
            <p className="card-label">Total Value</p>
            <p className="card-value">
              {portfolio ? formatCurrency(portfolio.totalValue) : '—'}
            </p>
            <p className={`card-change ${isPositive ? 'positive' : 'negative'}`}>
              <span>{isPositive ? '▲' : '▼'}</span>
              <span>
                {portfolio ? formatCurrency(Math.abs(portfolio.dailyGain)) : '—'}
                &nbsp;({portfolio?.dailyGainPercentage.toFixed(2)}%) today
              </span>
            </p>
          </div>

          <div className="card">
            <p className="card-label">Total Return</p>
            <p className="card-value">
              {portfolio ? formatCurrency(portfolio.totalReturn) : '—'}
            </p>
            <p className={`card-change ${isReturnPositive ? 'positive' : 'negative'}`}>
              <span>{isReturnPositive ? '▲' : '▼'}</span>
              <span>{portfolio?.totalReturnPercentage.toFixed(2)}% all-time</span>
            </p>
          </div>
        </div>

        <PortfolioChart />

        {portfolio && (
          <AllocationExplorer
            views={[
              {
                key:     'byAssetClass',
                label:   'Asset Class',
                title:   'Asset Allocation',
                data:    portfolio.allocations.byAssetClass,
                colorFn: (item) => {
                  const idx = portfolio.allocations.byAssetClass.findIndex((a) => a.key === item.key)
                  return holdingColor(idx, portfolio.allocations.byAssetClass.length)
                },
                labelFn: (item) => ASSET_CLASS_LABELS[item.key] ?? item.key,
              },
              {
                key:     'byHolding',
                label:   'Holdings',
                title:   'Holdings Weight',
                data:    portfolio.allocations.byHolding,
                colorFn: (item) => {
                  const idx = portfolio.allocations.byHolding.findIndex((h) => h.key === item.key)
                  return holdingColor(idx, portfolio.allocations.byHolding.length)
                },
                labelFn: (item) => {
                  const pos = portfolio.positions.find((p) => p.ticker === item.key)
                  return pos ? `${item.key} · ${pos.companyName}` : item.key
                },
              },
            ]}
          />
        )}

        {/* Holdings Section */}
        <section className="holdings-section">
          <div className="section-header">
            <div className="section-header-left">
              <h2 className="section-title">Holdings</h2>
              <span className="section-count">
                {activeTab === 'active'
                  ? `${portfolio?.positions.length ?? 0} positions`
                  : `${closedPositions.length} closed`}
              </span>
            </div>
            {activeTab === 'active' && (
              <div className="section-header-right">
                <button
                  className={`col-picker-btn${groupBy ? ' col-picker-btn--active' : ''}`}
                  onClick={() => {
                    if (groupBy) { setGroupBy(null); setCollapsedGroups(new Set()) }
                    else setGroupBy('assetClass')
                  }}
                  aria-pressed={groupBy !== null}
                  aria-label="Toggle grouping by asset class"
                >
                  <svg className="col-picker-icon" viewBox="0 0 16 16" aria-hidden="true">
                    <rect x="1" y="2"    width="14" height="2.5" rx="1" />
                    <rect x="3" y="6.5"  width="11" height="2"   rx="1" />
                    <rect x="3" y="10.5" width="11" height="2"   rx="1" />
                  </svg>
                  Group
                </button>
                <div className="col-picker-wrap" ref={pickerRef}>
                  <button
                    className="col-picker-btn"
                    onClick={() => setPickerOpen(o => !o)}
                    aria-expanded={pickerOpen}
                    aria-label="Toggle column visibility"
                  >
                    <svg className="col-picker-icon" viewBox="0 0 16 16" aria-hidden="true">
                      <rect x="1"  y="2" width="4" height="12" rx="1.5" />
                      <rect x="6"  y="2" width="4" height="12" rx="1.5" />
                      <rect x="11" y="2" width="4" height="12" rx="1.5" />
                    </svg>
                    Columns
                  </button>
                  {pickerOpen && (
                    <div className="col-picker-dropdown">
                      <p className="col-picker-heading">Visible Columns</p>
                      {ALL_COLUMNS.map(id => (
                        <label key={id} className="col-picker-item">
                          <span className="col-picker-label">{COLUMN_LABELS[id]}</span>
                          <span className="col-toggle">
                            <input
                              type="checkbox"
                              checked={visibleColumns[id]}
                              onChange={() => toggleColumn(id)}
                            />
                            <span className="col-toggle-slider" />
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tab bar */}
          <div className="holdings-tab-bar">
            <button
              className={`holdings-tab${activeTab === 'active' ? ' holdings-tab--active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
              <span className="holdings-tab-count">{portfolio?.positions.length ?? 0}</span>
            </button>
            <button
              className={`holdings-tab${activeTab === 'closed' ? ' holdings-tab--active' : ''}`}
              onClick={() => setActiveTab('closed')}
            >
              Closed
              <span className="holdings-tab-count">{closedPositions.length}</span>
            </button>
          </div>

          {/* Active tab */}
          {activeTab === 'active' && (
            <div className="holdings-tab-panel">
              <div className="table-scroll">
                <table className="holdings-table">
                  <thead>
                    <tr>
                      <th data-sort={sortKey === 'ticker' ? sortDir : 'none'} onClick={() => handleSort('ticker')}>Ticker</th>
                      {visibleColumns.shares         && <th data-sort={sortKey === 'shares'         ? sortDir : 'none'} onClick={() => handleSort('shares')}>Shares</th>}
                      {visibleColumns.avgCost        && <th data-sort={sortKey === 'avgCost'        ? sortDir : 'none'} onClick={() => handleSort('avgCost')}>Avg Cost</th>}
                      {visibleColumns.price          && <th data-sort={sortKey === 'price'          ? sortDir : 'none'} onClick={() => handleSort('price')}>Price</th>}
                      {visibleColumns.marketValue    && <th data-sort={sortKey === 'marketValue'    ? sortDir : 'none'} onClick={() => handleSort('marketValue')}>Total Value</th>}
                      {visibleColumns.dailyChange    && <th data-sort={sortKey === 'dailyChange'    ? sortDir : 'none'} onClick={() => handleSort('dailyChange')}>Daily Change</th>}
                      {visibleColumns.unrealizedGain && <th data-sort={sortKey === 'unrealizedGain' ? sortDir : 'none'} onClick={() => handleSort('unrealizedGain')}>Profit / Loss</th>}
                      {visibleColumns.totalReturn    && <th data-sort={sortKey === 'totalReturn'    ? sortDir : 'none'} onClick={() => handleSort('totalReturn')}>Total Return</th>}
                      {visibleColumns.dividendYield  && <th data-sort={sortKey === 'dividendYield'  ? sortDir : 'none'} onClick={() => handleSort('dividendYield')}>Div. Yield</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {groupBy === 'assetClass'
                      ? groupedPositions.map(group => (
                          <Fragment key={group.key}>
                            <tr className="group-header-row" onClick={() => toggleGroupCollapse(group.key)}>
                              <td>
                                <div className="group-header-content">
                                  <span className={`group-chevron${collapsedGroups.has(group.key) ? '' : ' expanded'}`}>›</span>
                                  <span className="group-label">{group.label}</span>
                                  <span className="group-count">{group.positions.length}</span>
                                </div>
                              </td>
                              {visibleColumns.shares         && <td />}
                              {visibleColumns.avgCost        && <td />}
                              {visibleColumns.price          && <td />}
                              {visibleColumns.marketValue    && <td className="group-cell--value">{formatCurrency(group.totalValue)}</td>}
                              {visibleColumns.dailyChange    && (
                                <td className={`group-cell--daily ${group.dailyChange >= 0 ? 'positive' : 'negative'}`}>
                                  <div className="pl-cell">
                                    <span>{group.dailyChange >= 0 ? '+' : ''}{formatCurrency(group.dailyChange)}</span>
                                  </div>
                                </td>
                              )}
                              {visibleColumns.unrealizedGain && (
                                <td className={`group-cell--daily ${group.unrealizedGain >= 0 ? 'positive' : 'negative'}`}>
                                  <div className="pl-cell">
                                    <span>{group.unrealizedGain >= 0 ? '+' : ''}{formatCurrency(group.unrealizedGain)}</span>
                                  </div>
                                </td>
                              )}
                              {visibleColumns.totalReturn    && (
                                <td className={`group-cell--daily ${group.totalReturn >= 0 ? 'positive' : 'negative'}`}>
                                  <div className="pl-cell">
                                    <span>{group.totalReturn >= 0 ? '+' : ''}{formatCurrency(group.totalReturn)}</span>
                                  </div>
                                </td>
                              )}
                              {visibleColumns.dividendYield  && <td />}
                            </tr>
                            {!collapsedGroups.has(group.key) && group.positions.map(pos => (
                              <tr key={pos.id} className="data-row" onClick={() => setSelectedPosition(pos)}>
                                <td className="ticker-cell">
                                  {pos.ticker}
                                  <span className="company-name">{pos.companyName}</span>
                                </td>
                                {visibleColumns.shares         && <td>{pos.shares}</td>}
                                {visibleColumns.avgCost        && <td>{formatCurrency(pos.avgCost)}</td>}
                                {visibleColumns.price          && <td>{formatCurrency(pos.currentPrice)}</td>}
                                {visibleColumns.marketValue    && <td>{formatCurrency(pos.marketValue)}</td>}
                                {visibleColumns.dailyChange    && (
                                  <td className={pos.dailyChange >= 0 ? 'positive' : 'negative'}>
                                    <div className="pl-cell">
                                      <span>{formatCurrency(pos.dailyChange)}</span>
                                      <span className="pl-pct">{pos.dailyChangePercentage.toFixed(2)}%</span>
                                    </div>
                                  </td>
                                )}
                                {visibleColumns.unrealizedGain && (
                                  <td className={pos.unrealizedGain >= 0 ? 'positive' : 'negative'}>
                                    <div className="pl-cell">
                                      <span>{formatCurrency(pos.unrealizedGain)}</span>
                                      <span className="pl-pct">{pos.unrealizedGainPercentage.toFixed(2)}%</span>
                                    </div>
                                  </td>
                                )}
                                {visibleColumns.totalReturn    && (
                                  <td className={pos.totalReturn >= 0 ? 'positive' : 'negative'}>
                                    <div className="pl-cell">
                                      <span>{formatCurrency(pos.totalReturn)}</span>
                                      <span className="pl-pct">{pos.totalReturnPercentage.toFixed(2)}%</span>
                                    </div>
                                  </td>
                                )}
                                {visibleColumns.dividendYield  && (
                                  <td>{pos.dividendYield > 0 ? formatPercentage(pos.dividendYield) : '—'}</td>
                                )}
                              </tr>
                            ))}
                          </Fragment>
                        ))
                      : sortedPositions.map(pos => (
                          <tr key={pos.id} className="data-row" onClick={() => setSelectedPosition(pos)}>
                            <td className="ticker-cell">
                              {pos.ticker}
                              <span className="company-name">{pos.companyName}</span>
                            </td>
                            {visibleColumns.shares         && <td>{pos.shares}</td>}
                            {visibleColumns.avgCost        && <td>{formatCurrency(pos.avgCost)}</td>}
                            {visibleColumns.price          && <td>{formatCurrency(pos.currentPrice)}</td>}
                            {visibleColumns.marketValue    && <td>{formatCurrency(pos.marketValue)}</td>}
                            {visibleColumns.dailyChange    && (
                              <td className={pos.dailyChange >= 0 ? 'positive' : 'negative'}>
                                <div className="pl-cell">
                                  <span>{formatCurrency(pos.dailyChange)}</span>
                                  <span className="pl-pct">{pos.dailyChangePercentage.toFixed(2)}%</span>
                                </div>
                              </td>
                            )}
                            {visibleColumns.unrealizedGain && (
                              <td className={pos.unrealizedGain >= 0 ? 'positive' : 'negative'}>
                                <div className="pl-cell">
                                  <span>{formatCurrency(pos.unrealizedGain)}</span>
                                  <span className="pl-pct">{pos.unrealizedGainPercentage.toFixed(2)}%</span>
                                </div>
                              </td>
                            )}
                            {visibleColumns.totalReturn    && (
                              <td className={pos.totalReturn >= 0 ? 'positive' : 'negative'}>
                                <div className="pl-cell">
                                  <span>{formatCurrency(pos.totalReturn)}</span>
                                  <span className="pl-pct">{pos.totalReturnPercentage.toFixed(2)}%</span>
                                </div>
                              </td>
                            )}
                            {visibleColumns.dividendYield  && (
                              <td>{pos.dividendYield > 0 ? formatPercentage(pos.dividendYield) : '—'}</td>
                            )}
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Closed tab */}
          {activeTab === 'closed' && (
            <div className="holdings-tab-panel">
              <div className="table-scroll">
                <table className="holdings-table">
                  <thead>
                    <tr>
                      {CLOSED_COLUMNS.map((key, i) => (
                        <th
                          key={key}
                          data-sort={closedSortKey === key ? closedSortDir : 'none'}
                          onClick={() => handleClosedSort(key)}
                          style={i > 0 ? { textAlign: 'right' } : undefined}
                        >
                          {CLOSED_COLUMN_LABELS[key]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {groupedClosedPositions.map(group => (
                      <Fragment key={group.key}>
                        <tr className="group-header-row" onClick={() => toggleClosedGroup(group.key)}>
                          <td>
                            <div className="group-header-content">
                              <span className={`group-chevron${closedCollapsedGroups.has(group.key) ? '' : ' expanded'}`}>›</span>
                              <span className="group-label">{group.label}</span>
                              <span className="group-count">{group.positions.length}</span>
                            </div>
                          </td>
                          <td /><td /><td /><td />
                          <td style={{ textAlign: 'right' }}>
                            <span className={`closed-gl-sum ${group.realizedGainSum >= 0 ? 'positive' : 'negative'}`}>
                              {group.realizedGainSum >= 0 ? '+' : ''}{formatCurrency(group.realizedGainSum)}
                            </span>
                          </td>
                          <td /><td /><td />
                        </tr>
                        {!closedCollapsedGroups.has(group.key) && group.positions.map(pos => (
                          <tr key={pos.id} className="data-row">
                            <td className="ticker-cell">
                              {pos.ticker}
                              <span className="company-name">{pos.companyName}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span className="closed-asset-badge">
                                {ASSET_CLASS_LABELS[pos.assetClass] ?? pos.assetClass}
                              </span>
                            </td>
                            <td className="closed-num">{pos.shares}</td>
                            <td className="closed-num">{formatCurrency(pos.avgCost)}</td>
                            <td className="closed-num">{formatCurrency(pos.exitPrice)}</td>
                            <td className={pos.realizedGain >= 0 ? 'positive' : 'negative'}>
                              <div className="pl-cell">
                                <span>{pos.realizedGain >= 0 ? '+' : ''}{formatCurrency(pos.realizedGain)}</span>
                              </div>
                            </td>
                            <td className={pos.realizedGainPercentage >= 0 ? 'positive' : 'negative'}>
                              <span className={`closed-gl-pill${pos.realizedGainPercentage >= 0 ? ' closed-gl-pill--pos' : ' closed-gl-pill--neg'}`}>
                                {pos.realizedGainPercentage >= 0 ? '+' : ''}{pos.realizedGainPercentage.toFixed(2)}%
                              </span>
                            </td>
                            <td className="closed-num">{formatHoldPeriod(pos.holdDays)}</td>
                            <td className="closed-date">{formatCloseDate(pos.closeDate)}</td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>

      {selectedPosition && (
        <TransactionModal
          position={selectedPosition}
          onClose={() => setSelectedPosition(null)}
        />
      )}
    </div>
  )
}

export default App
