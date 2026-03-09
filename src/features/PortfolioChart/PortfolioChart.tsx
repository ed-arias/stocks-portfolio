import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '../../context/ThemeContext'
import { StockService } from '../../services/StockService'
import type { Period, PortfolioHistoryPoint } from '../../types'
import './PortfolioChart.css'

const PERIODS: Period[] = ['1W', '1M', '3M', 'YTD', '1Y', 'All']

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-value">{formatCurrency(payload[0].value)}</p>
      <p className="chart-tooltip-date">{label}</p>
    </div>
  )
}

function formatXTick(tick: string, period: Period): string {
  const d = new Date(tick + 'T12:00:00Z')
  if (period === '1W') return d.toLocaleDateString('en-US', { weekday: 'short' })
  if (period === '1M') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

function formatYTick(val: number): string {
  return `$${(val / 1_000).toFixed(0)}k`
}

export function PortfolioChart() {
  const { theme } = useTheme()
  const [activePeriod, setActivePeriod] = useState<Period>('1M')
  const [data, setData] = useState<PortfolioHistoryPoint[]>([])

  useEffect(() => {
    StockService.getPortfolioHistory(activePeriod).then(setData)
  }, [activePeriod])

  // Read CSS custom properties at render time so they update on theme change
  const accentColor =
    getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#0071E3'
  const mutedColor =
    getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#8e8e93'
  const borderColor =
    getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#e5e5ea'

  // theme is read so re-render fires when it changes, refreshing the CSS vars above
  void theme

  return (
    <div className="chart-section">
      <div className="chart-header">
        <h2 className="chart-title">Portfolio Value</h2>
        <div className="period-selector" role="group" aria-label="Select time period">
          {PERIODS.map((p) => (
            <button
              key={p}
              className={`period-btn${activePeriod === p ? ' active' : ''}`}
              onClick={() => setActivePeriod(p)}
              aria-pressed={activePeriod === p}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accentColor} stopOpacity={0.18} />
              <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={(tick) => formatXTick(tick, activePeriod)}
            tick={{ fontSize: 11, fill: mutedColor, fontFamily: 'var(--font-ui)' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />

          <YAxis
            tickFormatter={formatYTick}
            tick={{ fontSize: 11, fill: mutedColor, fontFamily: 'var(--font-ui)' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke={accentColor}
            strokeWidth={2}
            fill="url(#chartGradient)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: accentColor }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
