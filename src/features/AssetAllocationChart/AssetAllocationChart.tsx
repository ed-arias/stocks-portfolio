import { useEffect, useState } from 'react'
import type { AssetAllocationBreakdown } from '../../types'

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

const COLOR_MAP: Record<string, string> = {
  stock:  'var(--asset-stock)',
  etf:    'var(--asset-etf)',
  crypto: 'var(--asset-crypto)',
  cash:   'var(--asset-cash)',
}

const LABEL_MAP: Record<string, string> = {
  stock:  'Stocks',
  etf:    'ETFs',
  crypto: 'Crypto',
  cash:   'Cash',
}

const RADIUS      = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const GAP         = 8
const STROKE_WIDTH = 28
const CX          = 110
const CY          = 110

interface TooltipState {
  x: number
  y: number
  segment: AssetAllocationBreakdown
}

interface Props {
  data: AssetAllocationBreakdown[]
}

export default function AssetAllocationChart({ data }: Props) {
  const [tooltip, setTooltip]           = useState<TooltipState | null>(null)
  const [animated, setAnimated]         = useState(false)
  const [hoveredClass, setHoveredClass] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const nonZero = data.filter((d) => d.percentage > 0)

  const segments = nonZero.reduce<
    { item: AssetAllocationBreakdown; arcLength: number; dashOffset: number }[]
  >((acc, item) => {
    const offset = acc.reduce((sum, s) => sum + s.arcLength + GAP, 0)
    const arcLength = (item.percentage / 100) * CIRCUMFERENCE - GAP
    return [...acc, { item, arcLength, dashOffset: CIRCUMFERENCE - offset }]
  }, [])

  return (
    <div
      style={{
        background:   'var(--surface)',
        border:       '1px solid var(--border)',
        borderRadius: 16,
        padding:      '1.5rem',
        boxShadow:    'var(--shadow-sm)',
        transition:   'box-shadow 0.2s, transform 0.2s',
        animation:    'fadeUp var(--anim-duration) var(--anim-ease) calc(var(--anim-stagger) * 3) both',
        position:     'relative',
      }}
      onMouseLeave={() => {
        setTooltip(null)
        setHoveredClass(null)
      }}
    >
      {/* Card label */}
      <p style={{
        fontFamily:    'var(--font-ui)',
        fontSize:      '0.72rem',
        fontWeight:    500,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color:         'var(--text-muted)',
        marginBottom:  '1.5rem',
      }}>
        Asset Allocation
      </p>

      {/* Body: donut + legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>

        {/* Donut */}
        <div style={{ flexShrink: 0, position: 'relative' }}>
          <svg
            width={220}
            height={220}
            viewBox="0 0 220 220"
            role="img"
            aria-label="Asset allocation donut chart"
          >
            {/* Track ring */}
            <circle
              cx={CX} cy={CY} r={RADIUS}
              fill="none"
              stroke="var(--bg-subtle)"
              strokeWidth={STROKE_WIDTH}
            />

            {/* Segments */}
            {segments.map(({ item, arcLength, dashOffset }) => (
              <circle
                key={item.assetClass}
                cx={CX} cy={CY} r={RADIUS}
                fill="none"
                stroke={COLOR_MAP[item.assetClass]}
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="butt"
                strokeDasharray={
                  animated
                    ? `${arcLength} ${CIRCUMFERENCE - arcLength}`
                    : `0 ${CIRCUMFERENCE}`
                }
                strokeDashoffset={dashOffset}
                transform={`rotate(-90 ${CX} ${CY})`}
                style={{
                  transition: 'stroke-dasharray 0.75s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s',
                  opacity:    hoveredClass && hoveredClass !== item.assetClass ? 0.25 : 1,
                  cursor:     'pointer',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.closest('svg')!.getBoundingClientRect()
                  setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, segment: item })
                  setHoveredClass(item.assetClass)
                }}
                onMouseLeave={() => {
                  setTooltip(null)
                  setHoveredClass(null)
                }}
              />
            ))}

            {/* Center labels */}
            <text
              x={CX} y={CY - 9}
              textAnchor="middle"
              style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', fill: 'var(--text-muted)', letterSpacing: '0.08em' }}
            >
              ALLOCATION
            </text>
            <text
              x={CX} y={CY + 9}
              textAnchor="middle"
              style={{ fontFamily: 'var(--font-data)', fontSize: '0.8rem', fill: 'var(--text-secondary)' }}
            >
              {nonZero.length} classes
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1, minWidth: 160 }}>
          {segments.map(({ item }) => (
            <div
              key={item.assetClass}
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        '0.65rem',
                transition: 'opacity 0.2s',
                opacity:    hoveredClass && hoveredClass !== item.assetClass ? 0.35 : 1,
                cursor:     'default',
              }}
              onMouseEnter={() => setHoveredClass(item.assetClass)}
              onMouseLeave={() => setHoveredClass(null)}
            >
              {/* Color swatch */}
              <span style={{
                width:        10,
                height:       10,
                borderRadius: '50%',
                background:   COLOR_MAP[item.assetClass],
                flexShrink:   0,
              }} />

              {/* Label */}
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize:   '0.82rem',
                color:      'var(--text-secondary)',
                flex:       1,
              }}>
                {LABEL_MAP[item.assetClass]}
              </span>

              {/* Percentage */}
              <span style={{
                fontFamily: 'var(--font-data)',
                fontSize:   '0.8rem',
                fontWeight: 600,
                color:      'var(--text-primary)',
                minWidth:   40,
                textAlign:  'right',
              }}>
                {item.percentage.toFixed(1)}%
              </span>

              {/* Value */}
              <span style={{
                fontFamily: 'var(--font-data)',
                fontSize:   '0.72rem',
                color:      'var(--text-muted)',
                minWidth:   80,
                textAlign:  'right',
              }}>
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position:      'absolute',
          left:          tooltip.x + 14,
          top:           tooltip.y,
          transform:     'translateY(-50%)',
          background:    'var(--surface-raised)',
          border:        '1px solid var(--border)',
          borderRadius:  10,
          padding:       '0.5rem 0.75rem',
          boxShadow:     'var(--shadow-md)',
          zIndex:        10,
          pointerEvents: 'none',
          whiteSpace:    'nowrap',
        }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
            {LABEL_MAP[tooltip.segment.assetClass]}
          </p>
          <p style={{ fontFamily: 'var(--font-data)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {formatCurrency(tooltip.segment.value)}
          </p>
          <p style={{ fontFamily: 'var(--font-data)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
            {tooltip.segment.percentage.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  )
}
