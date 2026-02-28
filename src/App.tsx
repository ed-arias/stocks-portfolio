import { useEffect, useState } from 'react'
import './App.css'
import { useTheme } from './context/ThemeContext'
import { StockService } from './services/StockService'
import type { PortfolioSummary } from './types'

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
        <div className="skeleton skeleton-table" />
      </div>
    </div>
  )
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null)
  const [loading, setLoading] = useState(true)

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

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

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

          {/* Chart Placeholder */}
          <div className="card">
            <p className="card-label">Performance (7D)</p>
            <div className="card-placeholder">Chart coming soon</div>
          </div>
        </div>

        {/* Holdings Table */}
        <section className="holdings-section">
          <div className="section-header">
            <h2 className="section-title">Holdings</h2>
            <span className="section-count">{portfolio?.positions.length ?? 0} positions</span>
          </div>

          <div className="table-scroll">
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Shares</th>
                  <th>Avg Cost</th>
                  <th>Price</th>
                  <th>Total Value</th>
                  <th>Profit / Loss</th>
                </tr>
              </thead>
              <tbody>
                {portfolio?.positions.map((pos) => (
                  <tr key={pos.id}>
                    <td className="ticker-cell">
                      {pos.ticker}
                      <span className="company-name">{pos.companyName}</span>
                    </td>
                    <td>{pos.shares}</td>
                    <td>{formatCurrency(pos.avgCost)}</td>
                    <td>{formatCurrency(pos.currentPrice)}</td>
                    <td>{formatCurrency(pos.marketValue)}</td>
                    <td className={pos.unrealizedGain >= 0 ? 'positive' : 'negative'}>
                      <div className="pl-cell">
                        <span>{formatCurrency(pos.unrealizedGain)}</span>
                        <span className="pl-pct">{pos.unrealizedGainPercentage.toFixed(2)}%</span>
                      </div>
                    </td>
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
