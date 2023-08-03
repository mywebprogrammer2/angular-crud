import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from "./customer-routing.module";
import { DashboardSharedModule } from "../../shared/shared.module";
import { CustomerComponent } from "./customer.component";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CustomerRoutingModule,
    DashboardSharedModule
  ],
})
export class CustomerModule { }
