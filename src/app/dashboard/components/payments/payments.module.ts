import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { PaymentsComponent } from './payments.component';
import { DashboardSharedModule } from '../../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    PaymentsComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    PaymentRoutingModule,
    DashboardSharedModule
  ]
})
export class PaymentsModule { }
