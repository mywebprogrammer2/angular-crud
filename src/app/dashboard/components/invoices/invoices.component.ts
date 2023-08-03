import { Component } from '@angular/core';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PermissionService } from '../../services/permission.service';
import { InvoiceService } from '../../services/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {

  invoices: Invoice[] = [];
  subscriptions: Subscription;
  deleteSubscription: Subscription;

  constructor(private permissionService: PermissionService, private dialog: MatDialog, private invoiceService: InvoiceService) {

    invoiceService.fetchData();
  }

  ngOnInit(){
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.subscriptions = this.invoiceService.getData.subscribe((data ) => {
      this.invoices = data;
    })
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
    this.deleteSubscription = this.invoiceService.delete(id).subscribe({
      next: () => this.onDeleted(id),
      error: (error) => {},
      complete: () => {}

    })
  }

  onDeleted(id:number): void {
    const deleteItem = this.invoices.find(x => x.id == id);
    if(deleteItem){
      this.invoiceService.deleteLocally( deleteItem );
    }
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
    if(this.deleteSubscription ) this.deleteSubscription.unsubscribe();
  }
}
