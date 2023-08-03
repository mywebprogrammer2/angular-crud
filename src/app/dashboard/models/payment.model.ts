export interface Payment {
  id: number;
  invoice_id: number;
  payment_date: string;
  payment_method:string;
  transaction_no:string;
  transaction_id:string;
  notes:string;
  amount_paid?:number;
  created_at?: string;
  updated_at?: string;
}
