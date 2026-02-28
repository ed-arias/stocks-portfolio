import type { PortfolioSummary, StockPosition } from '../types';

const MOCK_POSITIONS: StockPosition[] = [
  {
    id: '1',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    shares: 10,
    avgCost: 150.0,
    currentPrice: 185.92,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    shares: 5,
    avgCost: 200.0,
    currentPrice: 197.58,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    shares: 15,
    avgCost: 450.0,
    currentPrice: 726.13,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '4',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    shares: 8,
    avgCost: 310.0,
    currentPrice: 404.06,
    lastUpdate: new Date().toISOString(),
  },
];

export const StockService = {
  getPortfolioSummary: async (): Promise<PortfolioSummary> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalValue = MOCK_POSITIONS.reduce(
      (acc, pos) => acc + pos.shares * pos.currentPrice,
      0
    );

    // Calculate a mock daily gain for demonstration
    const dailyGain = 452.18;
    const dailyGainPercentage = 1.25;

    return {
      totalValue,
      dailyGain,
      dailyGainPercentage,
      positions: MOCK_POSITIONS,
    };
  },
};
