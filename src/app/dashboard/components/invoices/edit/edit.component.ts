import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/authService.service';
import { Invoice } from 'src/app/dashboard/models/invoice.model';
import { Project } from 'src/app/dashboard/models/project.model';
import { User } from 'src/app/dashboard/models/user.model';
import { InvoiceService } from 'src/app/dashboard/services/invoice.service';
import { ProjectService } from 'src/app/dashboard/services/project.service';
import { InvoiceItemsTableComponent } from '../invoice-items-table/invoice-items-table.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {


  @ViewChild('EditForm') EditForm : NgForm;
  @ViewChild(InvoiceItemsTableComponent,{static: true}) invoiceItemsTable : InvoiceItemsTableComponent;
  public errors?: any;
  public requesting : boolean;
  public updateSubscription : Subscription;
  public projectSubscription : Subscription;
  public subscription : Subscription;
  errorMessage :string = '';
  successMessage :string = '';
  invoice: Invoice | undefined ;
  today = new Date();
  id: number = 0;
  projects: Project[];
  isCustomer: boolean = false;

  constructor(private invoiceService: InvoiceService,private projectService: ProjectService,private route: ActivatedRoute,private router: Router,private AuthService: AuthService) {
    this.id = this.route.snapshot.params['id'] || 0;
    projectService.fetchData();
    this.isCustomer=AuthService.hasRole('Customer')
  }

  ngOnInit(){
    this.loadInvoice()
    this.loadProjects()
  }

  loadProjects(){
    this.projectSubscription =  this.projectService.getData.subscribe(data=>{
      this.projects = data;
    });
  }

  loadInvoice(id =  this.id) {
    this.subscription = this.invoiceService.getById(id).subscribe(data=>{
      this.invoice = data;
      this.invoiceItemsTable.invoiceItems = this.invoice.items as any;
      this.invoiceItemsTable.calculateTotal();
    });
  }

  update(){
    this.errorMessage= '';
    this.successMessage= '';
    this.errors= {}
    this.requesting = true;

    this.EditForm.value.items= this.invoiceItemsTable.invoiceItems;
    this.EditForm.value.due_date= this.EditForm.value.due_date ? new Date( this.EditForm.value.due_date).toLocaleString('en-US') : null;


    this.updateSubscription = this.invoiceService.update(this.id,this.EditForm.value).subscribe({
      next: (data)=>{

        this.successMessage= 'Invoice updated successfully';
        this.router.navigate(["/dashboard",'invoices'])
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
    this.projectSubscription.unsubscribe();
    if(this.updateSubscription) this.updateSubscription.unsubscribe();
  }
}
