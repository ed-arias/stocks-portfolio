export type Period = '1W' | '1M' | '3M' | 'YTD' | '1Y' | 'All';

export type TransactionType = 'buy' | 'sell' | 'dividend' | 'split';

export interface Transaction {
  id: string;
  date: string;          // ISO 8601
  type: TransactionType;
  shares: number | null; // null for dividend
  price: number | null;  // null for dividend and split
  amount: number | null; // null for split
}

export type AssetClass = 'stock' | 'etf' | 'crypto' | 'cash';

export interface AnalystRating {
  label: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  analystCount: number;
}

export interface AllocationBreakdown {
  key: string;        // Asset class key, ticker, sector, etc.
  value: number;      // Total market value in USD
  percentage: number; // Portfolio weight (0–100)
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
  dividendYield: number;
  totalReturn: number;
  totalReturnPercentage: number;
  transactions: Transaction[];
  analystRating?: AnalystRating;
}

export interface ClosedPosition {
  id: string;
  ticker: string;
  companyName: string;
  assetClass: AssetClass;
  shares: number;
  avgCost: number;
  exitPrice: number;
  // Pre-computed by backend
  realizedGain: number;
  realizedGainPercentage: number;
  openDate: string;  // ISO 8601 date: YYYY-MM-DD
  closeDate: string; // ISO 8601 date: YYYY-MM-DD
  holdDays: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyGain: number;
  dailyGainPercentage: number;
  totalReturn: number;
  totalReturnPercentage: number;
  positions: StockPosition[];
  allocations: {
    byAssetClass: AllocationBreakdown[];
    byHolding: AllocationBreakdown[];
  };
}
