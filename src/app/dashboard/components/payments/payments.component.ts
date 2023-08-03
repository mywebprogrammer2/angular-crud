import { Component } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Project } from '../../models/project.model';
import { Subscription } from 'rxjs';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  payments: Payment[];
  invoice: Invoice | undefined ;
  subscriptions: Subscription;
  invoice_subscriptions: Subscription;
  deleteSubscription: Subscription;
  invoice_id: number = 0;

  constructor(
    private permissionService: PermissionService,
    private dialog: MatDialog,
    private paymentsService: PaymentService,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService ) {

      this.invoice_id = this.route.snapshot.params['invoice_id'];
      if(this.invoice_id > 0){

        paymentsService.fetchData('payments?invoice_id='+this.invoice_id );
      }
      this.loadInvoice()
  }

  ngOnInit(){
    this.loadPayments();
  }

  loadPayments(){
    this.subscriptions = this.paymentsService.getData.subscribe(data =>{
      this.payments = data;
    })
  }

  loadInvoice(invoice_id =  this.invoice_id){
    if(invoice_id > 0){
      this.invoice_subscriptions = this.invoiceService.getById(invoice_id).subscribe(data =>{
        this.invoice = data;
      })
    }
  }


  can(permission:string){ return this.permissionService.hasPermission(permission)}

  openDeleteConfirmationDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCustomer(id)
      }
    });
  }

  deleteCustomer(id:number){
    this.deleteSubscription = this.paymentsService.delete(id).subscribe({
      next: () => this.onDeleted(id),
      error: (error) => {},
      complete: () => {}

    })
  }

  onDeleted(id:number): void {
    const deleteItem = this.payments.find(x => x.id == id);
    if(deleteItem){
      this.paymentsService.deleteLocally( deleteItem );
    }
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
    if(this.deleteSubscription ) this.deleteSubscription.unsubscribe();
    if(this.invoice_subscriptions ) this.invoice_subscriptions.unsubscribe();
  }
}
