import { useEffect, useState } from 'react'
import './App.css'
import { useTheme } from './context/ThemeContext'
import { StockService } from './services/StockService'
import type { PortfolioSummary } from './types'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("App mounted, fetching data...");
    const fetchData = async () => {
      try {
        const data = await StockService.getPortfolioSummary()
        console.log("Data fetched:", data);
        setPortfolio(data)
      } catch (error) {
        console.error('Failed to fetch portfolio data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val)
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading Portfolio...</h2>
        <button onClick={toggleTheme}>Toggle Theme (Current: {theme})</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>StockPortfolio</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      <main className="dashboard-grid">
        <section className="card summary-card">
          <div className="label">Total Portfolio Value</div>
          <div className="value">{portfolio ? formatCurrency(portfolio.totalValue) : '$0.00'}</div>
          <div className={`change ${portfolio && portfolio.dailyGain >= 0 ? 'positive' : 'negative'}`}>
            {portfolio && portfolio.dailyGain >= 0 ? '▲' : '▼'} 
            {portfolio ? formatCurrency(Math.abs(portfolio.dailyGain)) : '$0.00'} 
            ({portfolio ? portfolio.dailyGainPercentage : 0}%)
          </div>
        </section>

        <section className="card">
          <div className="label">Portfolio Performance (7D)</div>
          <div className="value" style={{ fontSize: '1rem', opacity: 0.5, marginTop: '2rem' }}>
            Chart Visualization Placeholder
          </div>
        </section>
      </main>

      <section className="card">
        <h3>Current Holdings</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Shares</th>
                <th>Avg Cost</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {portfolio?.positions.map((pos) => {
                const totalValue = pos.shares * pos.currentPrice;
                const pl = totalValue - (pos.shares * pos.avgCost);
                const plPercent = ((pos.currentPrice - pos.avgCost) / pos.avgCost) * 100;

                return (
                  <tr key={pos.id}>
                    <td className="ticker-cell">{pos.ticker}</td>
                    <td>{pos.shares}</td>
                    <td>{formatCurrency(pos.avgCost)}</td>
                    <td>{formatCurrency(pos.currentPrice)}</td>
                    <td>{formatCurrency(totalValue)}</td>
                    <td className={pl >= 0 ? 'positive' : 'negative'}>
                      {formatCurrency(pl)} ({plPercent.toFixed(2)}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default App
