import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/dashboard/models/invoice.model';
import { Project } from 'src/app/dashboard/models/project.model';
import { InvoiceService } from 'src/app/dashboard/services/invoice.service';
import { PaymentService } from 'src/app/dashboard/services/payment.service';
import { ProjectService } from 'src/app/dashboard/services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @ViewChild('CreateForm') CreateForm : NgForm
  public errors?: any;
  public invoiceSubscription : Subscription;
  public requesting : boolean;
  public createSubscription : Subscription;
  errorMessage :string = '';
  successMessage :string = '';
  invoice_id: number = 0;
  invoice: Invoice | undefined ;


  constructor(private invoiceService: InvoiceService,private paymentService: PaymentService,private route: ActivatedRoute){
    this.invoice_id = this.route.snapshot.params['invoice_id'];
    this.loadInvoice()
  }

  loadInvoice(){
    this.invoiceSubscription = this.invoiceService.getById(this.invoice_id).subscribe(data =>{
      this.invoice = data;
    })
  }



  create(){
    this.errors = [];
    this.requesting = true;

    this.CreateForm.value.payment_date = new Date(this.CreateForm.value.payment_date).toLocaleDateString('en-US');
    this.CreateForm.value.invoice_id = this.invoice_id;

    this.createSubscription = this.paymentService.create(this.CreateForm.value).subscribe({
      next: (project) => {
        this.CreateForm.resetForm()
        this.successMessage = 'Payment has been created.';
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
    if(this.invoiceSubscription) this.invoiceSubscription.unsubscribe();
    if(this.createSubscription) this.createSubscription.unsubscribe();
   }
}
