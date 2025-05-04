import { MonetaryAmount } from '../../../shared/models/monetary-amount';

export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  value: MonetaryAmount;
  earnings: {
    value: MonetaryAmount;
    percentage: number;
  };
  composition: {
    tick: string;
    qty: number;
    purchasePrice: MonetaryAmount;
    currentPrice: MonetaryAmount;
    value: MonetaryAmount;
    changePercent: number;
  }[];
  sectorAllocation?: { [sector: string]: number };
  bestPerformer?: { tick: string; changePercent: number };
  lastUpdated: string;
}
