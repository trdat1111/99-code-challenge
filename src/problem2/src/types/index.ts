export interface Token {
  currency: string;
  date?: string;
  price: number;
  icon?: string;
}

export interface SwapData {
  from: string;
  to: string;
  amount: number;
}

export enum TokenType {
  FROM = 'from',
  TO = 'to'
}

export interface ExchangeRateData {
  rate: number;
  fromToken: string;
  toToken: string;
}