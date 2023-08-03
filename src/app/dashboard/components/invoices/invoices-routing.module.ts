import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { PermissionsGuard } from 'src/app/auth/guards/permissions.guard';
import { EditComponent } from './edit/edit.component';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [
  { path: '', component:InvoicesComponent},
  {
    path: 'create',
    component:CreateComponent,
    data: {permission: 'invoice-create'},
    canActivate:[PermissionsGuard]
  },
  {
    path: 'edit/:id',
    component:EditComponent,
    data: {permission: 'invoice-edit'},
    canActivate:[PermissionsGuard]
  },
  {
    path: "payments/:invoice_id",
    canActivate: [PermissionsGuard],
    data:{permission: 'payment-view'},
    loadChildren: () => import("../payments/payments.module").then((x) => x.PaymentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
