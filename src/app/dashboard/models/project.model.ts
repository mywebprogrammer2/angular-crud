import { User } from "./user.model";

export interface Project {
  id: number;
  name: string;
  description? : string;
  customer?: User,
  customer_id?: number,
  start_date?: string;
  end_date?: string;
  active?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
