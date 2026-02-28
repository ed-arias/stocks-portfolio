export interface StockPosition {
  id: string;
  ticker: string;
  companyName: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  lastUpdate: string;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyGain: number;
  dailyGainPercentage: number;
  positions: StockPosition[];
}
