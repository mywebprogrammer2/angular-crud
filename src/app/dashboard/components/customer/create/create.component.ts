import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/dashboard/services/customer.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  public showPassword : boolean = false;
  @ViewChild('CreateForm') CreateForm : NgForm
  public errors?: any;
  public requesting : boolean;
  public createSubscription : Subscription;
  public roleSubscription : Subscription;
  errorMessage :string = '';
  successMessage :string = '';

  constructor(private customerService: CustomerService){
  }

  ngOnInit(){
  }



  create(){
    this.errors = [];
    this.requesting = true;

    this.createSubscription = this.customerService.create(this.CreateForm.value).subscribe({
      next: (customer) => {
        this.CreateForm.resetForm()
        this.successMessage = 'Customer has been created.';
      },
      error: (err) => {
        if (err.errors)
          this.errors = err.errors
        if (err.message)
          this.errorMessage = err.message
      },
      complete: () => {this.requesting = false}
    })
  }


  ngOnDestroy() {
    if(this.createSubscription) this.createSubscription.unsubscribe();
  }
}
