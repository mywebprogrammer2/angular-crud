import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { PermissionsGuard } from 'src/app/auth/guards/permissions.guard';
import { EditComponent } from './edit/edit.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  { path: '', component:PaymentsComponent},
  {
    path: 'create',
    component:CreateComponent,
    data: {permission: 'payment-create'},
    canActivate:[PermissionsGuard]
  },
  {
    path: 'edit/:id',
    component:EditComponent,
    data: {permission: 'payment-edit'},
    canActivate:[PermissionsGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
