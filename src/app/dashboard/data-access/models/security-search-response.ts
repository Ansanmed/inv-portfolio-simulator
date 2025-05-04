import { SecuritySearchItem } from './security-search-item';

export interface SecuritySearchResponse {
  response: {
    count: number;
    result: SecuritySearchItem[];
  };
}
