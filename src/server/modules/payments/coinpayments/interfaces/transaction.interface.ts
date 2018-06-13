export interface ITransactionConfig {
  currency1: string;
  currency2: string;
  amount: number;
  address?: string;
  buyer_name?: string;
  buyer_email?: string;
  item_name?: string;
  item_number?: string;
  invoice?: string;
  custom?: string;
  ipn_url?: string;
}
