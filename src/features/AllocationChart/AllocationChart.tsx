import { useEffect, useState } from 'react'
import type { AllocationBreakdown } from '../../types'

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

const RADIUS       = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const GAP          = 8
const STROKE_WIDTH = 28
const CX           = 110
const CY           = 110

interface TooltipState {
  x: number
  y: number
  item: AllocationBreakdown
  label: string
  color: string
}

interface Props {
  data:        AllocationBreakdown[]
  title:       string
  colorFn:     (item: AllocationBreakdown) => string
  labelFn:     (item: AllocationBreakdown) => string
  standalone?: boolean   // default true — set false to render without card wrapper/title
}

export default function AllocationChart({ data, title, colorFn, labelFn, standalone = true }: Props) {
  const [tooltip,    setTooltip]    = useState<TooltipState | null>(null)
  const [animated,   setAnimated]   = useState(false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const nonZero = data.filter((d) => d.percentage > 0)

  const segments = nonZero.reduce<
    { item: AllocationBreakdown; arcLength: number; dashOffset: number; color: string; label: string }[]
  >((acc, item) => {
    const offset    = acc.reduce((sum, s) => sum + s.arcLength + GAP, 0)
    const arcLength = (item.percentage / 100) * CIRCUMFERENCE - GAP
    return [
      ...acc,
      {
        item,
        arcLength,
        dashOffset: CIRCUMFERENCE - offset,
        color:      colorFn(item),
        label:      labelFn(item),
      },
    ]
  }, [])

  const body = (
    <div
      style={{ position: 'relative' }}
      onMouseLeave={() => {
        setTooltip(null)
        setHoveredKey(null)
      }}
    >
      {/* Body: donut + legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>

        {/* Donut */}
        <div style={{ flexShrink: 0, position: 'relative' }}>
          <svg
            width={220}
            height={220}
            viewBox="0 0 220 220"
            role="img"
            aria-label={`${title} donut chart`}
          >
            {/* Track ring */}
            <circle
              cx={CX} cy={CY} r={RADIUS}
              fill="none"
              stroke="var(--bg-subtle)"
              strokeWidth={STROKE_WIDTH}
            />

            {/* Segments */}
            {segments.map(({ item, arcLength, dashOffset, color }) => (
              <circle
                key={item.key}
                cx={CX} cy={CY} r={RADIUS}
                fill="none"
                stroke={color}
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
                  opacity:    hoveredKey && hoveredKey !== item.key ? 0.25 : 1,
                  cursor:     'pointer',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.closest('svg')!.getBoundingClientRect()
                  setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, item, label: labelFn(item), color })
                  setHoveredKey(item.key)
                }}
                onMouseLeave={() => {
                  setTooltip(null)
                  setHoveredKey(null)
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
              {nonZero.length} items
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1, minWidth: 160 }}>
          {segments.map(({ item, color, label }) => (
            <div
              key={item.key}
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        '0.65rem',
                transition: 'opacity 0.2s',
                opacity:    hoveredKey && hoveredKey !== item.key ? 0.35 : 1,
                cursor:     'default',
              }}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              {/* Color swatch */}
              <span style={{
                width:        10,
                height:       10,
                borderRadius: '50%',
                background:   color,
                flexShrink:   0,
              }} />

              {/* Label */}
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize:   '0.82rem',
                color:      'var(--text-secondary)',
                flex:       1,
              }}>
                {label}
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
            {tooltip.label}
          </p>
          <p style={{ fontFamily: 'var(--font-data)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {formatCurrency(tooltip.item.value)}
          </p>
          <p style={{ fontFamily: 'var(--font-data)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
            {tooltip.item.percentage.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  )

  if (!standalone) return body

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
        {title}
      </p>
      {body}
    </div>
  )
}
