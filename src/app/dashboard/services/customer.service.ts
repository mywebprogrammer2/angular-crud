import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService  extends BaseService<User> {

  constructor(protected http: HttpClient) {
    super();
  }



  protected getEndpoint(): string {
    return 'customers'; // Provide the endpoint URL for users
  }

  fetchData(){
    this.getAll().subscribe(users=>{
      this.data = users;
      this.getData.next(this.data);
    })
  }
}
