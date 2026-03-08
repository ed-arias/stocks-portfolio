import type { AllocationBreakdown, AnalystRating, ClosedPosition, Period, PortfolioHistoryPoint, PortfolioSummary, StockPosition, Transaction } from '../types';

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

// ─── Mock transaction data per position ──────────────────────────────────────

const AAPL_TXN: Transaction[] = [
  { id: 'aapl-1', date: '2023-06-12', type: 'buy',      shares: 10,   price: 150.00, amount: 1500.00 },
  { id: 'aapl-2', date: '2024-01-18', type: 'buy',      shares: 5,    price: 174.00, amount:  870.00 },
  { id: 'aapl-3', date: '2024-05-17', type: 'dividend', shares: null, price: null,   amount:    3.65 },
  { id: 'aapl-4', date: '2024-08-14', type: 'sell',     shares: 5,    price: 228.00, amount: 1140.00 },
  { id: 'aapl-5', date: '2024-11-15', type: 'dividend', shares: null, price: null,   amount:    2.60 },
];

const TSLA_TXN: Transaction[] = [
  { id: 'tsla-1', date: '2023-09-05', type: 'buy',  shares: 8, price: 200.00, amount: 1600.00 },
  { id: 'tsla-2', date: '2024-03-11', type: 'sell', shares: 3, price: 185.00, amount:  555.00 },
  { id: 'tsla-3', date: '2024-09-23', type: 'buy',  shares: 3, price: 210.00, amount:  630.00 },
  { id: 'tsla-4', date: '2025-01-07', type: 'sell', shares: 3, price: 395.00, amount: 1185.00 },
];

const NVDA_TXN: Transaction[] = [
  { id: 'nvda-1', date: '2023-04-20', type: 'buy',      shares: 10,  price: 420.00, amount: 4200.00 },
  { id: 'nvda-2', date: '2024-06-10', type: 'split',    shares: 10,  price: null,   amount: null    }, // 10:1 split
  { id: 'nvda-3', date: '2024-07-08', type: 'buy',      shares: 5,   price:  97.50, amount:  487.50 },
  { id: 'nvda-4', date: '2024-09-18', type: 'dividend', shares: null, price: null,  amount:    0.04 },
];

const MSFT_TXN: Transaction[] = [
  { id: 'msft-1', date: '2023-01-15', type: 'buy',      shares: 5,    price: 235.00, amount: 1175.00 },
  { id: 'msft-2', date: '2023-09-20', type: 'dividend', shares: null, price: null,   amount:    7.50 },
  { id: 'msft-3', date: '2024-03-10', type: 'buy',      shares: 3,    price: 410.00, amount: 1230.00 },
  { id: 'msft-4', date: '2024-09-18', type: 'dividend', shares: null, price: null,   amount:    9.52 },
];

const VOO_TXN: Transaction[] = [
  { id: 'voo-1', date: '2023-03-08', type: 'buy',      shares: 10,   price: 365.00, amount: 3650.00 },
  { id: 'voo-2', date: '2023-09-26', type: 'dividend', shares: null, price: null,   amount:   72.28 },
  { id: 'voo-3', date: '2024-01-22', type: 'buy',      shares: 10,   price: 435.00, amount: 4350.00 },
  { id: 'voo-4', date: '2024-09-26', type: 'dividend', shares: null, price: null,   amount:   84.40 },
];

const BTC_TXN: Transaction[] = [
  { id: 'btc-1', date: '2023-11-03', type: 'buy',  shares: 0.10, price: 35000.00, amount: 3500.00 },
  { id: 'btc-2', date: '2024-03-15', type: 'sell', shares: 0.05, price: 68000.00, amount: 3400.00 },
  { id: 'btc-3', date: '2024-10-22', type: 'buy',  shares: 0.05, price: 63500.00, amount: 3175.00 },
];

// ─── Mock analyst ratings ─────────────────────────────────────────────────────

const RATINGS: Record<string, AnalystRating> = {
  AAPL: { label: 'Buy',         analystCount: 31 },
  TSLA: { label: 'Sell',        analystCount: 38 },
  NVDA: { label: 'Strong Buy',  analystCount: 44 },
  MSFT: { label: 'Hold',        analystCount: 52 },
  VOO:  { label: 'Strong Sell', analystCount: 12 },
}

// ─────────────────────────────────────────────────────────────────────────────

const MOCK_POSITIONS: StockPosition[] = [
  {
    id: '1',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    shares: 10,
    avgCost: 150.00,
    currentPrice: 185.92,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    assetClass: 'stock',
    marketValue: 1859.20,
    unrealizedGain: 359.20,
    unrealizedGainPercentage: 23.95,
    dailyChange: 18.50,
    dailyChangePercentage: 1.00,
    dividendYield: 0.44,
    totalReturn: 392.36,
    totalReturnPercentage: 26.16,
    transactions: AAPL_TXN,
    analystRating: RATINGS.AAPL,
  },
  {
    id: '2',
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    shares: 5,
    avgCost: 200.00,
    currentPrice: 197.58,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    assetClass: 'stock',
    marketValue: 987.90,
    unrealizedGain: -12.10,
    unrealizedGainPercentage: -1.21,
    dailyChange: -6.20,
    dailyChangePercentage: -0.63,
    dividendYield: 0,
    totalReturn: -12.10,
    totalReturnPercentage: -1.21,
    transactions: TSLA_TXN,
    analystRating: RATINGS.TSLA,
  },
  {
    id: '3',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    shares: 15,
    avgCost: 450.00,
    currentPrice: 726.13,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    assetClass: 'stock',
    marketValue: 10891.95,
    unrealizedGain: 4141.95,
    unrealizedGainPercentage: 61.36,
    dailyChange: 312.45,
    dailyChangePercentage: 2.95,
    dividendYield: 0.03,
    totalReturn: 4155.27,
    totalReturnPercentage: 61.56,
    transactions: NVDA_TXN,
    analystRating: RATINGS.NVDA,
  },
  {
    id: '4',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    shares: 8,
    avgCost: 310.00,
    currentPrice: 404.06,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    assetClass: 'stock',
    marketValue: 3232.48,
    unrealizedGain: 752.48,
    unrealizedGainPercentage: 30.34,
    dailyChange: 127.43,
    dailyChangePercentage: 4.11,
    dividendYield: 0.72,
    totalReturn: 824.68,
    totalReturnPercentage: 33.25,
    transactions: MSFT_TXN,
    analystRating: RATINGS.MSFT,
  },
  {
    id: '5',
    ticker: 'VOO',
    companyName: 'Vanguard S&P 500 ETF',
    shares: 20,
    avgCost: 380.00,
    currentPrice: 400.00,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    assetClass: 'etf',
    marketValue: 8000.00,
    unrealizedGain: 400.00,
    unrealizedGainPercentage: 5.26,
    dailyChange: 120.00,
    dailyChangePercentage: 1.52,
    dividendYield: 1.40,
    totalReturn: 624.00,
    totalReturnPercentage: 8.21,
    transactions: VOO_TXN,
    analystRating: RATINGS.VOO,
  },
  {
    id: '6',
    ticker: 'BTC',
    companyName: 'Bitcoin',
    shares: 0.05,
    avgCost: 50000.00,
    currentPrice: 58398.40,
    lastUpdate: '2026-02-28T16:00:00.000Z',
    assetClass: 'crypto',
    marketValue: 2919.92,
    unrealizedGain: 419.92,
    unrealizedGainPercentage: 16.80,
    dailyChange: -87.60,
    dailyChangePercentage: -2.91,
    dividendYield: 0,
    totalReturn: 419.92,
    totalReturnPercentage: 16.80,
    transactions: BTC_TXN,
  },
];

const BY_ASSET_CLASS: AllocationBreakdown[] = [
  { key: 'stock',  value: 16971.53, percentage: 60.85 },
  { key: 'etf',    value:  8000.00, percentage: 28.68 },
  { key: 'crypto', value:  2919.92, percentage: 10.47 },
];

const BY_HOLDING: AllocationBreakdown[] = [
  { key: 'AAPL', value:  1859.20, percentage:  6.67 },
  { key: 'TSLA', value:   987.90, percentage:  3.54 },
  { key: 'NVDA', value: 10891.95, percentage: 39.05 },
  { key: 'MSFT', value:  3232.48, percentage: 11.59 },
  { key: 'VOO',  value:  8000.00, percentage: 28.68 },
  { key: 'BTC',  value:  2919.92, percentage: 10.47 },
];

const MOCK_SUMMARY: PortfolioSummary = {
  totalValue: 27891.45,
  dailyGain: 452.18,
  dailyGainPercentage: 1.25,
  totalReturn: 5241.53,
  totalReturnPercentage: 23.14,
  positions: MOCK_POSITIONS,
  allocations: {
    byAssetClass: BY_ASSET_CLASS,
    byHolding:    BY_HOLDING,
  },
};

// ─── Mock closed positions ────────────────────────────────────────────────────

const MOCK_CLOSED_POSITIONS: ClosedPosition[] = [
  {
    id: 'c1',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    assetClass: 'stock',
    shares: 5,
    avgCost: 270.00,
    exitPrice: 335.00,
    realizedGain: 325.00,
    realizedGainPercentage: 24.07,
    openDate: '2022-01-10',
    closeDate: '2023-09-15',
    holdDays: 613,
  },
  {
    id: 'c2',
    ticker: 'AMD',
    companyName: 'Advanced Micro Devices, Inc.',
    assetClass: 'stock',
    shares: 10,
    avgCost: 85.00,
    exitPrice: 70.00,
    realizedGain: -150.00,
    realizedGainPercentage: -17.65,
    openDate: '2023-02-15',
    closeDate: '2023-10-20',
    holdDays: 247,
  },
  {
    id: 'c3',
    ticker: 'QQQ',
    companyName: 'Invesco QQQ Trust',
    assetClass: 'etf',
    shares: 8,
    avgCost: 285.00,
    exitPrice: 410.00,
    realizedGain: 1000.00,
    realizedGainPercentage: 43.86,
    openDate: '2022-06-01',
    closeDate: '2024-01-10',
    holdDays: 588,
  },
  {
    id: 'c4',
    ticker: 'ETH',
    companyName: 'Ethereum',
    assetClass: 'crypto',
    shares: 0.5,
    avgCost: 1600.00,
    exitPrice: 3800.00,
    realizedGain: 1100.00,
    realizedGainPercentage: 137.50,
    openDate: '2023-10-01',
    closeDate: '2024-03-15',
    holdDays: 167,
  },
];

export const StockService = {
  getPortfolioSummary: async (): Promise<PortfolioSummary> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_SUMMARY;
  },

  getPortfolioHistory: async (period: Period): Promise<PortfolioHistoryPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_HISTORY[period];
  },

  getClosedPositions: async (): Promise<ClosedPosition[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_CLOSED_POSITIONS;
  },
};
