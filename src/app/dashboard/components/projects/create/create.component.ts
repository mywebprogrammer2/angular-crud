import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/dashboard/models/user.model';
import { CustomerService } from 'src/app/dashboard/services/customer.service';
import { ProjectService } from 'src/app/dashboard/services/project.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @ViewChild('CreateForm') CreateForm : NgForm
  public errors?: any;
  public requesting : boolean;
  public createSubscription : Subscription;
  public customerSubscription : Subscription;
  errorMessage :string = '';
  successMessage :string = '';
  customers: User[] = [];
  today = new Date();

  constructor(private customerService: CustomerService,private projectService: ProjectService) {
    customerService.fetchData();
  }

  ngOnInit() {
    this.loadCustomers()
  }

  loadCustomers() {
    this.customerSubscription = this.customerService.getData.subscribe(data=>{
      this.customers = data;
    });
  }

  create(){
    this.errors = [];
    this.requesting = true;

    this.createSubscription = this.projectService.create(this.CreateForm.value).subscribe({
      next: (project) => {
        this.CreateForm.resetForm()
        this.successMessage = 'Project has been created.';
      },
      error: (err) => {
        this.requesting = false
        if (err.errors)
          this.errors = err.errors
        if (err.message)
          this.errorMessage = err.message
      },
      complete: () => {this.requesting = false}
    })
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
    if(this.createSubscription) this.createSubscription.unsubscribe();
   }
}
