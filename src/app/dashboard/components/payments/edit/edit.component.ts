import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/dashboard/models/invoice.model';
import { Payment } from 'src/app/dashboard/models/payment.model';
import { InvoiceService } from 'src/app/dashboard/services/invoice.service';
import { PaymentService } from 'src/app/dashboard/services/payment.service';

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
  public invoiceSubscription : Subscription;
  public subscription : Subscription;
  errorMessage :string = '';
  successMessage :string = '';
  today = new Date();
  id: number = 0;
  isCustomer: boolean = false;

  invoice_id: number = 0;
  invoice: Invoice | undefined ;
  payment: Payment | undefined ;

  constructor(private paymentService: PaymentService,private invoiceService: InvoiceService,private route: ActivatedRoute,private router: Router) {
    this.invoice_id = this.route.snapshot.params['invoice_id'];
    this.id = this.route.snapshot.params['id'] || 0;
    this.loadPayment();

  }

  ngOnInit(){
    this.loadInvoice()
  }

  loadPayment(id=  this.id){
    this.subscription = this.paymentService.getById(id).subscribe(payment => {
      this.payment =  payment;
    })
  }

  loadInvoice(){
    this.invoiceSubscription = this.invoiceService.getById(this.invoice_id).subscribe(data =>{
      this.invoice = data;
    })
  }



  update(){
    this.errorMessage= '';
    this.successMessage= '';
    this.errors= {}
    this.requesting = true;

    this.EditForm.value.payment_date = new Date(this.EditForm.value.payment_date).toLocaleDateString('en-US');
    this.EditForm.value.invoice_id = this.invoice_id;

    this.updateSubscription = this.paymentService.update(this.id,this.EditForm.value).subscribe({
      next: (data)=>{

        this.successMessage= 'Payment updated successfully';
        this.router.navigate(["/dashboard",'invoices','payments',this.invoice_id])
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
    this.invoiceSubscription.unsubscribe();
    if(this.updateSubscription) this.updateSubscription.unsubscribe();
  }

}
