import { useState } from 'react'
import AllocationChart from '../AllocationChart/AllocationChart'
import type { AllocationBreakdown } from '../../types'
import './AllocationExplorer.css'

export interface AllocationDimension {
  key:     string
  label:   string
  title:   string
  data:    AllocationBreakdown[]
  colorFn: (item: AllocationBreakdown) => string
  labelFn: (item: AllocationBreakdown) => string
}

interface Props {
  views: AllocationDimension[]
}

export default function AllocationExplorer({ views }: Props) {
  const [activeKey, setActiveKey] = useState(views[0].key)

  const active = views.find((v) => v.key === activeKey) ?? views[0]

  return (
    <div className="alloc-section">
      <div className="alloc-header">
        <h2 className="alloc-title">{active.title}</h2>
        <div className="dim-selector" role="group" aria-label="Select allocation view">
          {views.map((v) => (
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

      {/* key forces remount → replays donut entry animation on dimension switch */}
      <AllocationChart
        key={activeKey}
        standalone={false}
        data={active.data}
        title={active.title}
        colorFn={active.colorFn}
        labelFn={active.labelFn}
      />
    </div>
  )
}
