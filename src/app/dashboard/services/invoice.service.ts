import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService<Invoice> {

  constructor(protected http: HttpClient) {
    super();
  }
  protected getEndpoint(): string {
    return 'invoices'; // Provide the endpoint URL for users
  }

  fetchData(){
    this.getAll().subscribe(users=>{
      this.data = users;
      this.getData.next(this.data);
    })
  }
}
