import { MonetaryAmount } from '../../../shared/models/monetary-amount';

export interface PortfolioSummary {
  id: string;
  name: string;
  description?: string;
  composition: { tick: string; qty: number; purchasePrice: MonetaryAmount }[];
  currency: string;
  createdAt: string;
  updatedAt: string;
}
