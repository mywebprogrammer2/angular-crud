import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-invoice-items-table',
  templateUrl: './invoice-items-table.component.html',
  styleUrls: ['./invoice-items-table.component.css']
})
export class InvoiceItemsTableComponent {
  total_amount = 0;
  invoiceItems: any[] = [
    { item: '', quantity: 0, price: 0 } // Initial row
  ];


  addRow() {
    this.invoiceItems.push({ item: '', quantity: 0, price: 0 });
    this.calculateTotal()
  }

  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
    this.calculateTotal()
  }

  calculateTotal(){
    this.total_amount = this.invoiceItems.reduce((total, item) => total + ((item.price || 0 )* item.quantity || 1) , 0);
  }

}
