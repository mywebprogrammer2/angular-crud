
export interface InvoiceItems {
  id: number;
  invoice_id: number;
  item?: string;
  quantity?: number;
  price?: number;
  created_at?: string;
  updated_at?: string;
}
