export interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  percentage: number;
  isSelected?: boolean;
}

export type CurrencyId = string;
