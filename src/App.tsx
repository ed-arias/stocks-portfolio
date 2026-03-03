import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useTheme } from './context/ThemeContext'
import AllocationExplorer from './features/AllocationExplorer/AllocationExplorer'
import { PortfolioChart } from './features/PortfolioChart/PortfolioChart'
import { StockService } from './services/StockService'
import type { PortfolioSummary } from './types'

type ColumnId = 'shares' | 'avgCost' | 'price' | 'marketValue' | 'dailyChange' | 'unrealizedGain' | 'totalReturn' | 'dividendYield'

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

const holdingColor = (idx: number, total: number) =>
  `hsl(${Math.round((idx / total) * 360)}, 55%, 75%)`

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
  const [loading, setLoading] = useState(true)
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnId, boolean>>(loadColumnVisibility)
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const toggleColumn = (id: ColumnId) => {
    setVisibleColumns(prev => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem('holdings-visible-columns', JSON.stringify(next))
      return next
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StockService.getPortfolioSummary()
        setPortfolio(data)
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
          {/* Total Portfolio Value */}
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

          {/* Total Return */}
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

        {/* Holdings Table */}
        <section className="holdings-section">
          <div className="section-header">
            <div className="section-header-left">
              <h2 className="section-title">Holdings</h2>
              <span className="section-count">{portfolio?.positions.length ?? 0} positions</span>
            </div>
            <div className="col-picker-wrap" ref={pickerRef}>
              <button
                className="col-picker-btn"
                onClick={() => setPickerOpen(o => !o)}
                aria-expanded={pickerOpen}
              >
                Columns ⌄
              </button>
              {pickerOpen && (
                <div className="col-picker-dropdown">
                  {ALL_COLUMNS.map(id => (
                    <label key={id} className="col-picker-item">
                      <input
                        type="checkbox"
                        checked={visibleColumns[id]}
                        onChange={() => toggleColumn(id)}
                      />
                      {COLUMN_LABELS[id]}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="table-scroll">
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  {visibleColumns.shares         && <th>Shares</th>}
                  {visibleColumns.avgCost        && <th>Avg Cost</th>}
                  {visibleColumns.price          && <th>Price</th>}
                  {visibleColumns.marketValue    && <th>Total Value</th>}
                  {visibleColumns.dailyChange    && <th>Daily Change</th>}
                  {visibleColumns.unrealizedGain && <th>Profit / Loss</th>}
                  {visibleColumns.totalReturn    && <th>Total Return</th>}
                  {visibleColumns.dividendYield  && <th>Div. Yield</th>}
                </tr>
              </thead>
              <tbody>
                {portfolio?.positions.map((pos) => (
                  <tr key={pos.id}>
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
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
