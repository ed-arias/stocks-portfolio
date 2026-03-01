export type Period = '1W' | '1M' | '3M' | 'YTD' | '1Y' | 'All';

export type AssetClass = 'stock' | 'etf' | 'crypto' | 'cash';

export interface AssetAllocationBreakdown {
  assetClass: AssetClass;
  value: number;      // Total market value in USD
  percentage: number; // Share of total portfolio value (0–100)
}

export interface PortfolioHistoryPoint {
  date: string;  // ISO 8601 date: YYYY-MM-DD
  value: number; // Portfolio total value in USD
}

export interface StockPosition {
  id: string;
  ticker: string;
  companyName: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  lastUpdate: string;
  assetClass: AssetClass;
  // Pre-computed by backend
  marketValue: number;
  unrealizedGain: number;
  unrealizedGainPercentage: number;
  dailyChange: number;
  dailyChangePercentage: number;
  portfolioWeight: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyGain: number;
  dailyGainPercentage: number;
  totalReturn: number;
  totalReturnPercentage: number;
  positions: StockPosition[];
  assetAllocation: AssetAllocationBreakdown[];
}
