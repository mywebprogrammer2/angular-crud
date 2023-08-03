import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/dashboard/models/project.model';
import { InvoiceService } from 'src/app/dashboard/services/invoice.service';
import { ProjectService } from 'src/app/dashboard/services/project.service';
import { InvoiceItemsTableComponent } from '../invoice-items-table/invoice-items-table.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @ViewChild('CreateForm') CreateForm : NgForm
  @ViewChild(InvoiceItemsTableComponent,{static: true}) invoiceItemsTable : InvoiceItemsTableComponent;
  public errors?: any;
  public requesting : boolean;
  public createSubscription : Subscription;
  public projectsSubscription : Subscription;
  errorMessage :string = '';
  successMessage :string = '';
  projects: Project[] = [];
  today = new Date();

  constructor(private invoiceService: InvoiceService,private projectService: ProjectService) {
    projectService.fetchData();
  }

  ngOnInit() {
    this.loadProjects()
  }

  loadProjects() {
    this.projectsSubscription = this.projectService.getData.subscribe(data=>{
      this.projects = data;
    });
  }

  create(){
    this.errors = [];
    this.requesting = true;

    this.CreateForm.value.items= this.invoiceItemsTable.invoiceItems;
    this.CreateForm.value.status= 'pending';
    this.CreateForm.value.due_date= this.CreateForm.value.due_date ? new Date( this.CreateForm.value.due_date).toLocaleString('en-US') : null;

    this.createSubscription = this.invoiceService.create(this.CreateForm.value).subscribe({
      next: (invoice) => {
        this.CreateForm.resetForm();
        this.invoiceItemsTable.invoiceItems = []
        this.successMessage = 'Invoice has been created.';
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
    this.projectsSubscription.unsubscribe();
    if(this.createSubscription) this.createSubscription.unsubscribe();
   }
}
