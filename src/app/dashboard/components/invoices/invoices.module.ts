import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices.component';
import { CreateComponent } from './create/create.component';
import { DashboardSharedModule } from '../../shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceItemsTableComponent } from './invoice-items-table/invoice-items-table.component';



@NgModule({
  declarations: [
    InvoicesComponent,
    CreateComponent,
    EditComponent,
    InvoiceItemsTableComponent,
  ],
  imports: [
    InvoicesRoutingModule,
    DashboardSharedModule
  ]
})
export class InvoicesModule { }
