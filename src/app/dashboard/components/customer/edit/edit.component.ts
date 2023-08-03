import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/dashboard/models/user.model';
import { CustomerService } from 'src/app/dashboard/services/customer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  public showPassword : boolean = false;
  @ViewChild('EditForm') EditForm : NgForm
  public errors?: any;
  public requesting : boolean = false;
  public updateSubscription : Subscription;
  public subscription : Subscription;
  customer: User | undefined;
  id: number = 0;
  errorMessage :string = '';
  successMessage :string = '';

  constructor(private customerService: CustomerService,private route: ActivatedRoute,private router: Router){
    this.id = this.route.snapshot.params['id'] || 0;
    this.loadCustomer();
  }

  loadCustomer(id= this.id){
    this.subscription =  this.customerService.getById(id).subscribe(data => {
      this.customer = data
    });
  }


  update(){
    this.errorMessage= '';
    this.successMessage= '';
    this.errors= {}
    this.requesting = true;

    this.updateSubscription = this.customerService.update(this.id,this.EditForm.value).subscribe({
      next: (data)=>{

        this.successMessage= 'Customer updated successfully';
        this.router.navigate(["/dashboard",'customers'])
      },
      error: (data)=>{
        this.errors = data.errors || {}
        this.errorMessage = data.message || '';
        this.requesting=false
      },
      complete: ()=>{
        this.requesting=false
      }


    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    if(this.updateSubscription) this.updateSubscription.unsubscribe();
  }
}
