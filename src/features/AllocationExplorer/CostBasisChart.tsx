import { useEffect, useState } from 'react'
import type { CostVsMarketBreakdown } from '../../types'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

interface Props {
  data:    CostVsMarketBreakdown[]
  colorFn: (key: string) => string
}

export function CostBasisChart({ data, colorFn }: Props) {
  const [animated,   setAnimated]   = useState(false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  useEffect(() => {
    // Double-RAF so CSS transitions pick up the initial width change
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  const maxValue    = Math.max(...data.map((d) => Math.max(d.costBasis, d.marketValue)))
  const totalCost   = data.reduce((s, d) => s + d.costBasis,   0)
  const totalMarket = data.reduce((s, d) => s + d.marketValue, 0)
  const totalGain   = totalMarket - totalCost
  const totalGainPct = (totalGain / totalCost) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
      {data.map((item, i) => {
        const color      = colorFn(item.key)
        const isPositive = item.gain >= 0
        const hovered    = !hoveredKey || hoveredKey === item.key

        // Bar geometry: base = min(cost,mkt); extension = |gain|
        const basePct = (Math.min(item.costBasis, item.marketValue) / maxValue) * 100
        const extPct  = (Math.abs(item.gain) / maxValue) * 100
        // Stagger each row's extension by 80ms
        const extDelay = `${0.12 + i * 0.08}s`

        return (
          <div
            key={item.key}
            style={{
              opacity:    hovered ? 1 : 0.32,
              transition: 'opacity 0.2s',
              cursor:     'default',
            }}
            onMouseEnter={() => setHoveredKey(item.key)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            {/* Row header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: color, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.82rem',
                color: 'var(--text-secondary)', flex: 1,
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily:   'var(--font-data)',
                fontSize:     '0.72rem',
                fontWeight:   600,
                padding:      '2px 8px',
                borderRadius: '100px',
                letterSpacing: '-0.01em',
                background:   isPositive ? 'var(--success-bg)' : 'var(--danger-bg)',
                color:        isPositive ? 'var(--success)'    : 'var(--danger)',
              }}>
                {isPositive ? '+' : ''}{item.gainPct.toFixed(1)}%
              </span>
            </div>

            {/* Bar track */}
            <div style={{
              position: 'relative', height: 9,
              background: 'var(--bg-subtle)', borderRadius: 5,
              overflow: 'hidden',
            }}>
              {/* Base segment — min(cost, market) in muted asset color */}
              <div style={{
                position:   'absolute', left: 0, top: 0, bottom: 0,
                width:      animated ? `${basePct}%` : '0%',
                background: `color-mix(in srgb, ${color} 52%, var(--bg-subtle))`,
                borderRadius: 5,
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />

              {/* Extension segment — |gain| in success/danger */}
              <div style={{
                position:   'absolute',
                left:       `${basePct}%`, top: 0, bottom: 0,
                width:      animated ? `${extPct}%` : '0%',
                background: isPositive ? 'var(--success)' : 'var(--danger)',
                opacity:    0.72,
                borderRadius: '0 5px 5px 0',
                transition: `width 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${extDelay}`,
              }} />
            </div>

            {/* Values row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: '0.32rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-data)', fontSize: '0.68rem',
                color: 'var(--text-muted)',
              }}>
                Cost {fmt(item.costBasis)}
              </span>
              <span style={{
                fontFamily: 'var(--font-data)', fontSize: '0.68rem',
                fontWeight: 500,
                color: isPositive ? 'var(--success)' : 'var(--danger)',
              }}>
                {isPositive ? '+' : ''}{fmt(item.gain)}
              </span>
              <span style={{
                fontFamily: 'var(--font-data)', fontSize: '0.68rem',
                color: 'var(--text-secondary)',
              }}>
                {fmt(item.marketValue)} mkt
              </span>
            </div>
          </div>
        )
      })}

      {/* Total summary */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily:    'var(--font-ui)',
            fontSize:      '0.68rem',
            fontWeight:    600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.07em',
            color:         'var(--text-muted)',
            flex:          1,
            whiteSpace:    'nowrap',
          }}>
            Total Portfolio
          </span>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            {fmt(totalCost)}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', opacity: 0.6 }}>→</span>
          <span style={{
            fontFamily: 'var(--font-data)', fontSize: '0.72rem',
            color: 'var(--text-primary)', fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            {fmt(totalMarket)}
          </span>
          <span style={{
            fontFamily:    'var(--font-data)',
            fontSize:      '0.72rem',
            fontWeight:    600,
            padding:       '2px 9px',
            borderRadius:  '100px',
            letterSpacing: '-0.01em',
            whiteSpace:    'nowrap',
            background:    totalGain >= 0 ? 'var(--success-bg)' : 'var(--danger-bg)',
            color:         totalGain >= 0 ? 'var(--success)'    : 'var(--danger)',
          }}>
            {totalGain >= 0 ? '+' : ''}{totalGainPct.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}
