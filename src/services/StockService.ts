import type { PortfolioSummary, StockPosition } from '../types';

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
};
