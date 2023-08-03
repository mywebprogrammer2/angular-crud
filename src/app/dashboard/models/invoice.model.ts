import { InvoiceItems } from "./invoiceItems.model";
import { Project } from "./project.model";

export interface Invoice {
  id: number;
  invoice_number: string;
  project_id: number;
  total_amount: number;
  due_date?:string;
  remaining?: number;
  cancelled?: boolean;
  status?:string;
  notes?: string;
  qb_id?: number;
  project?: Project;
  items?: InvoiceItems;
  created_at?: string;
  updated_at?: string;
}
