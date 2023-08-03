import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/dashboard/models/user.model';
import { Subscription } from "rxjs";
import { CustomerService } from 'src/app/dashboard/services/customer.service';
import { ProjectService } from 'src/app/dashboard/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/dashboard/models/project.model';
import { AuthService } from 'src/app/auth/services/authService.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  @ViewChild('EditForm') EditForm : NgForm
  public errors?: any;
  public requesting : boolean;
  public updateSubscription : Subscription;
  public customerSubscription : Subscription;
  public subscription : Subscription;
  errorMessage :string = '';
  successMessage :string = '';
  customers: User[] = [];
  today = new Date();
  id: number = 0;
  project: Project | undefined;
  isCustomer: boolean = false;

  constructor(private customerService: CustomerService,private projectService: ProjectService,private route: ActivatedRoute,private router: Router,private AuthService: AuthService) {
    this.id = this.route.snapshot.params['id'] || 0;
    customerService.fetchData();
    this.isCustomer=AuthService.hasRole('Customer')
  }

  ngOnInit(){
    this.loadCustomers()
    this.loadProject()
  }

  loadProject(id= this.id){
    this.subscription =  this.projectService.getById(id).subscribe(data => {
      this.project = data
    });
  }

  loadCustomers() {
    this.customerSubscription = this.customerService.getData.subscribe(data=>{
      this.customers = data;
    });
  }

  update(){
    this.errorMessage= '';
    this.successMessage= '';
    this.errors= {}
    this.requesting = true;

    this.updateSubscription = this.projectService.update(this.id,this.EditForm.value).subscribe({
      next: (data)=>{

        this.successMessage= 'Project updated successfully';
        this.router.navigate(["/dashboard",'projects'])
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
    this.customerSubscription.unsubscribe();
    if(this.updateSubscription) this.updateSubscription.unsubscribe();
  }

}
