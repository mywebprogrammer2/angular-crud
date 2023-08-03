import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { Subscription } from "rxjs";
import { PermissionService } from '../../services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  public customers: User[] = [];
  subscriptions: Subscription;
  deleteSubscription: Subscription;

  constructor(public dialog: MatDialog,private permissionService: PermissionService,public customerService: CustomerService) {
    customerService.fetchData();
  }

  ngOnInit(){
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.subscriptions = this.customerService.getData.subscribe((data ) => {
      this.customers = data;
    })
  }



  can(permission:string):boolean { return this.permissionService.hasPermission(permission)}

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
    this.deleteSubscription = this.customerService.delete(id).subscribe({
      next: () => this.onDeleted(id),
      error: (error) => {},
      complete: () => {}

    })
  }

  onDeleted(id:number): void {
    const deleteItem = this.customers.find(x => x.id == id);
    if(deleteItem){
      this.customerService.deleteLocally( deleteItem );
    }
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }


}
