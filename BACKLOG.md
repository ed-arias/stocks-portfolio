# Feature Backlog

Informed by analysis of the top 10 stock portfolio apps: **Empower, Sharesight, Stock Events, Webull, Yahoo Finance, Morningstar Investor, Seeking Alpha, Portfolio Visualizer, Delta by eToro, and Parqet**.

> **Backend requirements** (auth, data persistence, market data APIs, notifications) are tracked separately in [`BACKEND.md`](./BACKEND.md).

Features are grouped by epic and tagged with priority:
- `P0` — Core, implement first
- `P1` — High value, implement next
- `P2` — Nice to have, implement when the core is solid
- `P3` — Advanced / future

---

## Epic 1 — Dashboard & Overview

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 1.1 | Total portfolio value card (current market value) | ✅ Done | All |
| 1.2 | Day gain/loss card (absolute + %) with color indicator | ✅ Done | All |
| 1.3 | Total return card (all-time absolute + %) | ✅ Done | Empower, Sharesight |
| 1.4 | Portfolio value history line chart (1W / 1M / 3M / YTD / 1Y / All) | ✅ Done | Yahoo Finance, Delta |
| 1.5 | Asset allocation donut chart (stocks, ETFs, crypto, cash) | ✅ Done | Empower, Morningstar |
| 1.12 | Holdings weight donut chart (per-position allocation %) | ✅ Done | Empower, Morningstar |
| 1.13 | Unified allocation chart with dimension selector | ✅ Done | — |
| 1.6 | Sector allocation chart | ⚠️ Needs revision — sector concept doesn't apply uniformly to ETFs and crypto; revisit when mixed-asset sector handling is defined | Empower, Morningstar, Yahoo Finance |
| 1.7 | Geographic / regional exposure chart | ⚠️ Needs revision — regional exposure doesn't apply uniformly to ETFs and crypto; revisit when per-position geographic data model is defined | Sharesight, Delta, Parqet |
| 1.8 | Market cap breakdown chart (large / mid / small cap) | ⚠️ Needs revision — large/mid/small cap taxonomy is stock-specific; ETF classification requires look-through or style category; crypto doesn't map to this taxonomy | Morningstar |
| 1.9 | Multi-portfolio support (manage separate portfolios) | P2 | Sharesight, Delta, Stock Events |
| 1.10 | Real-time intraday portfolio value chart | P2 | Stock Events, Delta |
| 1.11 | Net worth dashboard (investments + cash + liabilities) | P3 | Empower, Parqet, Kubera |

---

## Epic 2 — Holdings Table

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 2.1 | Holdings list with ticker, shares, current price, market value | ✅ Done | All |
| 2.2 | Per-holding unrealized gain/loss (absolute + %) | ✅ Done | All |
| 2.3 | Per-holding daily change (absolute + %) | ✅ Done | All |
| 2.4 | Per-holding portfolio weight (%) | ~~superseded by 1.12~~ | Empower, Morningstar |
| 2.5 | Per-holding average cost / cost basis | ✅ Done | All |
| 2.6 | Per-holding dividend yield | ✅ Done | Sharesight, Stock Events, Parqet |
| 2.7 | Per-holding total return including dividends | ✅ Done | Sharesight |
| 2.8 | Customizable columns (user selects visible metrics) | ✅ Done | Seeking Alpha, Yahoo Finance |
| 2.9 | Sortable columns | ✅ Done | All |
| 2.10 | Grouping by asset class only (sector/country deferred) | ✅ Done | Sharesight, Parqet |
| 2.11 | Transaction history per holding (buys, sells, dividends) | ✅ Done | Sharesight, Yahoo Finance |
| 2.12 | Closed / historical positions view | ✅ Done | Sharesight |
| 2.13 | Per-holding analyst consensus rating column | ✅ Done | Seeking Alpha, Yahoo Finance |
| 2.14 | Per-holding fair value estimate column | P3 | Morningstar |

---

## Epic 3 — Performance & Returns

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 3.1 | Simple total return (%) for any date range | P0 | All |
| 3.2 | Returns breakdown: capital gains vs. dividend income | P1 | Sharesight |
| 3.3 | Annualized return (CAGR) | P1 | Sharesight, Portfolio Visualizer |
| 3.4 | Time-weighted return (TWR) | P1 | Sharesight |
| 3.5 | Money-weighted return / XIRR | P1 | Sharesight, Portfolio Visualizer |
| 3.6 | Multi-period performance selector (1W, 1M, 3M, YTD, 1Y, 5Y, All) | P1 | All |
| 3.7 | Performance over custom date range | P1 | Sharesight |
| 3.8 | Performance attribution (top contributors / detractors) | P2 | Empower, Seeking Alpha |
| 3.9 | Rolling returns chart | P2 | Portfolio Visualizer |
| 3.10 | Maximum drawdown tracking | P2 | Portfolio Visualizer, Webull |
| 3.11 | Sharpe and Sortino ratio | P3 | Portfolio Visualizer |

---

## Epic 4 — Benchmark Comparison

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 4.1 | Compare portfolio vs. S&P 500 on the performance chart | P1 | Yahoo Finance, Portfolio Visualizer |
| 4.2 | Benchmark selector (NASDAQ, MSCI World, custom index) | P1 | Portfolio Visualizer, Parqet |
| 4.3 | Alpha and beta display | P2 | Portfolio Visualizer, Morningstar |
| 4.4 | Relative performance chart (portfolio vs. benchmark over time) | P2 | Portfolio Visualizer |
| 4.5 | Community benchmark (compare vs. other users) | P3 | Parqet, getquin |

---

## Epic 5 — Dividend Tracking

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 5.1 | Dividend income tracker per holding (amount, yield, yield on cost) | P1 | Sharesight, Stock Events, Parqet |
| 5.2 | Dividend calendar (upcoming payment dates) | P1 | Stock Events, Parqet, Delta |
| 5.3 | Monthly dividend income bar chart | P1 | Stock Events, Parqet |
| 5.4 | Dividend income breakdown by year | P1 | Stock Events, Sharesight |
| 5.5 | Projected future dividend income (next 12 months) | P2 | Sharesight, Parqet |
| 5.6 | Dividend breakdown by sector and geography | P2 | Stock Events, Sharesight |
| 5.7 | Dividend reinvestment (DRIP) tracking | P3 | Sharesight |
| 5.8 | Withholding tax on dividends tracking | P3 | Sharesight, Parqet |

---

## Epic 6 — Watchlist

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 6.1 | Create and manage watchlists | P1 | Yahoo Finance, Seeking Alpha |
| 6.2 | Watchlist view with price, daily change, volume | P1 | Yahoo Finance |
| 6.3 | Add/remove tickers from watchlist | P1 | All |
| 6.4 | Custom sorting and filtering within watchlist | P2 | Yahoo Finance |
| 6.5 | Notes per watchlist item | P2 | Yahoo Finance |
| 6.6 | Multiple named watchlists | P2 | Yahoo Finance, Seeking Alpha |

---

## Epic 7 — Alerts & Notifications

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 7.1 | Price target alerts (above / below threshold) | P1 | Yahoo Finance, Sharesight, Delta |
| 7.2 | Percentage change alerts | P1 | Yahoo Finance, Delta |
| 7.3 | Earnings announcement alerts | P1 | Stock Events, Seeking Alpha |
| 7.4 | Dividend announcement alerts | P1 | Stock Events, Sharesight |
| 7.5 | Analyst rating change alerts | P2 | Seeking Alpha |
| 7.6 | Volume spike alerts | P2 | Webull |
| 7.7 | End-of-day portfolio summary notification | P2 | Delta |
| 7.8 | Breaking news alerts per holding | P2 | Seeking Alpha, Yahoo Finance |
| 7.9 | Economic event alerts (CPI, Fed decisions) | P3 | Delta, Stock Events |

---

## Epic 8 — News & Research Feed

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 8.1 | Personalized news feed filtered to holdings | P1 | Yahoo Finance, Seeking Alpha |
| 8.2 | Company-specific news per holding | P1 | Yahoo Finance, Seeking Alpha |
| 8.3 | Earnings releases and summaries | P1 | Stock Events, Seeking Alpha |
| 8.4 | Analyst consensus rating and price targets per stock | P2 | Yahoo Finance, Seeking Alpha |
| 8.5 | Insider buying / selling activity table | P2 | Seeking Alpha |
| 8.6 | Analyst upgrade / downgrade history | P2 | Seeking Alpha |
| 8.7 | Fair value estimates | P3 | Morningstar |
| 8.8 | Economic moat rating | P3 | Morningstar |
| 8.9 | ESG / sustainability scores | P3 | Morningstar |

---

## Epic 9 — Calendars

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 9.1 | Earnings calendar (personalized to holdings and watchlist) | P1 | Stock Events, Seeking Alpha, Yahoo Finance |
| 9.2 | Dividend calendar (upcoming ex-dates and payment dates) | P1 | Stock Events, Parqet |
| 9.3 | Economic calendar (CPI, interest rate decisions, GDP) | P2 | Delta, Stock Events |
| 9.4 | IPO calendar | P3 | Yahoo Finance |

---

## Epic 10 — Portfolio Analysis

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 10.1 | Asset allocation vs. target allocation (rebalancing view) | P1 | Empower, Morningstar |
| 10.2 | Rebalancing calculator (what to buy/sell) | P2 | Empower, Morningstar |
| 10.3 | Concentration risk alerts (overweight single stock/sector) | P2 | Yahoo Finance, Parqet |
| 10.4 | Overlap / holdings intersection detection across funds | P2 | Morningstar, Parqet |
| 10.5 | ETF look-through / X-Ray (see ETF underlying holdings) | P2 | Morningstar, Parqet |
| 10.6 | Correlation heatmap between holdings | P3 | Portfolio Visualizer |
| 10.7 | Factor exposure analysis (value, momentum, quality, size) | P3 | Portfolio Visualizer |
| 10.8 | Portfolio fee / expense ratio analyzer | P3 | Empower, Morningstar |
| 10.9 | Efficient frontier visualization | P3 | Portfolio Visualizer |

---

## Epic 11 — Advanced Quantitative Tools

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 11.1 | Portfolio backtesting against historical data | P3 | Portfolio Visualizer |
| 11.2 | Monte Carlo simulation (retirement / withdrawal planning) | P3 | Empower, Portfolio Visualizer |
| 11.3 | Retirement planner with readiness score | P3 | Empower |
| 11.4 | Mean-Variance Optimization (Markowitz) | P3 | Portfolio Visualizer |
| 11.5 | Risk Parity optimization | P3 | Portfolio Visualizer |
| 11.6 | Tactical asset allocation models (momentum, moving averages) | P3 | Portfolio Visualizer |

---

## Epic 12 — Transaction Management

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 12.1 | Manual transaction entry (buy, sell, dividend) | P0 | All |
| 12.2 | Edit and delete transactions | P0 | All |
| 12.3 | CSV transaction import | P1 | Sharesight, Yahoo Finance |
| 12.4 | Split and dividend adjustment handling | P2 | Sharesight |
| 12.5 | Cash account / settlement account tracking | P2 | Parqet |

---

## Epic 13 — Stock Screener

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 13.1 | Filter by market cap, P/E, P/B, dividend yield | P2 | Yahoo Finance, Morningstar |
| 13.2 | Filter by sector, industry, country, exchange | P2 | Yahoo Finance, Morningstar |
| 13.3 | Filter by analyst rating | P2 | Seeking Alpha, Yahoo Finance |
| 13.4 | Technical screener (RSI, moving averages) | P3 | Webull |
| 13.5 | Save and manage custom screeners | P3 | Morningstar, Seeking Alpha |

---

## Epic 14 — UX & Accessibility

| # | Feature | Priority | Inspired by |
|---|---|---|---|
| 14.1 | Light / Dark theme toggle (already implemented) | ✅ Done | All |
| 14.2 | Responsive layout (mobile + tablet + desktop) | ✅ Done | All |
| 14.3 | Keyboard navigation and accessibility (ARIA) | P1 | — |
| 14.4 | Persistent user preferences (columns, theme, layout) | P1 | Yahoo Finance, Seeking Alpha |
| 14.5 | Customizable dashboard layout (drag-and-drop cards) | P2 | Webull, Empower |
| 14.6 | Export portfolio to CSV / PDF | P2 | Sharesight |
| 14.7 | Print-friendly report view | P3 | Sharesight, Morningstar |
