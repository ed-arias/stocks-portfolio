import type { Period, PortfolioHistoryPoint, PortfolioSummary, StockPosition } from '../types';

// ─── History helpers (run once at module load, not per-call) ──────────────────

function buildDates(start: string, end: string, stepDays: number): string[] {
  const dates: string[] = [];
  const cur = new Date(start + 'T12:00:00Z');
  const last = new Date(end + 'T12:00:00Z');
  while (cur <= last) {
    const dow = cur.getUTCDay(); // 0=Sun, 6=Sat
    if (stepDays > 1 || (dow !== 0 && dow !== 6)) {
      dates.push(cur.toISOString().split('T')[0]);
    }
    cur.setUTCDate(cur.getUTCDate() + stepDays);
  }
  return dates;
}

function buildValues(startVal: number, endVal: number, n: number, volatility: number): number[] {
  return Array.from({ length: n }, (_, i) => {
    if (i === n - 1) return endVal; // Pin last point to exact current value
    const t = n > 1 ? i / (n - 1) : 1;
    const trend = startVal + (endVal - startVal) * t;
    const wave =
      Math.sin(i * 0.8) * volatility +
      Math.sin(i * 1.5) * volatility * 0.4 +
      Math.sin(i * 0.3) * volatility * 0.6;
    return Math.max(0, Math.round((trend + wave) * 100) / 100);
  });
}

function buildHistory(
  start: string,
  end: string,
  startVal: number,
  endVal: number,
  stepDays: number,
  volatility: number,
): PortfolioHistoryPoint[] {
  const dates = buildDates(start, end, stepDays);
  const values = buildValues(startVal, endVal, dates.length, volatility);
  return dates.map((date, i) => ({ date, value: values[i] }));
}

const MOCK_HISTORY: Record<Period, PortfolioHistoryPoint[]> = {
  '1W':  buildHistory('2026-02-22', '2026-02-28', 27_234,    27_891.45, 1,  120),
  '1M':  buildHistory('2026-02-02', '2026-02-28', 26_512,    27_891.45, 1,  200),
  '3M':  buildHistory('2025-12-01', '2026-02-28', 25_498,    27_891.45, 1,  350),
  'YTD': buildHistory('2026-01-01', '2026-02-28', 26_156,    27_891.45, 1,  250),
  '1Y':  buildHistory('2025-03-01', '2026-02-28', 21_890,    27_891.45, 7,  600),
  'All': buildHistory('2024-01-01', '2026-02-28', 17_943,    27_891.45, 14, 800),
};

const MOCK_POSITIONS: StockPosition[] = [
  {
    id: '1',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    shares: 10,
    avgCost: 150.00,
    currentPrice: 185.92,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    marketValue: 1859.20,
    unrealizedGain: 359.20,
    unrealizedGainPercentage: 23.95,
    dailyChange: 18.50,
    dailyChangePercentage: 1.00,
    portfolioWeight: 6.67,
  },
  {
    id: '2',
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    shares: 5,
    avgCost: 200.00,
    currentPrice: 197.58,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    marketValue: 987.90,
    unrealizedGain: -12.10,
    unrealizedGainPercentage: -1.21,
    dailyChange: -6.20,
    dailyChangePercentage: -0.63,
    portfolioWeight: 3.54,
  },
  {
    id: '3',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    shares: 15,
    avgCost: 450.00,
    currentPrice: 726.13,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    marketValue: 10891.95,
    unrealizedGain: 4141.95,
    unrealizedGainPercentage: 61.36,
    dailyChange: 312.45,
    dailyChangePercentage: 2.95,
    portfolioWeight: 39.05,
  },
  {
    id: '4',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    shares: 8,
    avgCost: 310.00,
    currentPrice: 404.06,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    marketValue: 3232.48,
    unrealizedGain: 752.48,
    unrealizedGainPercentage: 30.34,
    dailyChange: 127.43,
    dailyChangePercentage: 4.11,
    portfolioWeight: 11.59,
  },
];

const MOCK_SUMMARY: PortfolioSummary = {
  totalValue: 27891.45,
  dailyGain: 452.18,
  dailyGainPercentage: 1.25,
  totalReturn: 5241.53,
  totalReturnPercentage: 23.14,
  positions: MOCK_POSITIONS,
};

export const StockService = {
  getPortfolioSummary: async (): Promise<PortfolioSummary> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_SUMMARY;
  },

  getPortfolioHistory: async (period: Period): Promise<PortfolioHistoryPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_HISTORY[period];
  },
};
