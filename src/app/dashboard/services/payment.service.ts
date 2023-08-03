import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Payment } from '../models/payment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  extends BaseService<Payment>  {

  constructor(protected http: HttpClient) {
    super();
  }



  protected getEndpoint(): string {
    return 'payments'; // Provide the endpoint URL for users
  }

  fetchData(url?:string){
    this.getAll(url).subscribe(data=>{
      this.data = data;
      this.getData.next(this.data);
    })
  }
}
