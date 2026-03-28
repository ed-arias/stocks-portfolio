import { type ReactNode, useEffect, useState } from 'react'
import type { AllocationBreakdown } from '../../types'
import './AllocationExplorer.css'

export interface AllocationDimension {
  key:         string
  label:       string
  title:       string
  data:        AllocationBreakdown[]
  colorFn:     (item: AllocationBreakdown) => string
  labelFn:     (item: AllocationBreakdown) => string
  customBody?: ReactNode
}

interface Props {
  views: AllocationDimension[]
}

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function AllocationExplorer({ views }: Props) {
  const [activeKey, setActiveKey] = useState(views[0].key)
  const [animated, setAnimated] = useState(false)

  const active = views.find(v => v.key === activeKey) ?? views[0]

  // Replay bar animation on mount and on view switch
  useEffect(() => {
    setAnimated(false)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    return () => cancelAnimationFrame(id)
  }, [activeKey])

  return (
    <div className="alloc-zone">
      <div className="alloc-header">
        <h3 className="alloc-title">{active.title}</h3>
        <div className="dim-selector" role="group" aria-label="Select allocation view">
          {views.map(v => (
            <button
              key={v.key}
              className={`dim-btn${v.key === activeKey ? ' active' : ''}`}
              onClick={() => setActiveKey(v.key)}
              aria-pressed={v.key === activeKey}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="alloc-body">
        {active.customBody ?? (
          <div className="alloc-bars">
            {active.data.map((item, i) => {
              const color = active.colorFn(item)
              const label = active.labelFn(item)
              return (
                <div
                  key={item.key}
                  className="alloc-bar-row"
                  style={{ '--bar-delay': `${i * 60}ms` } as React.CSSProperties}
                >
                  <span className="alloc-bar-dot" style={{ background: color }} />
                  <span className="alloc-bar-label">{label}</span>
                  <div className="alloc-bar-track">
                    <div
                      className="alloc-bar-fill"
                      style={{
                        width: animated ? `${item.percentage}%` : '0%',
                        background: color,
                        transitionDelay: animated ? `${i * 60}ms` : '0ms',
                      }}
                    />
                  </div>
                  <span className="alloc-bar-pct">{item.percentage.toFixed(1)}%</span>
                  <span className="alloc-bar-val">{fmt(item.value)}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
