export interface StockPosition {
  id: string;
  ticker: string;
  companyName: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  lastUpdate: string;
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
}
