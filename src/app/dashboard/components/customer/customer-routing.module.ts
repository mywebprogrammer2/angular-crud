import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CreateComponent } from './create/create.component';
import { PermissionsGuard } from 'src/app/auth/guards/permissions.guard';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component:CustomerComponent},
  {
    path: 'create',
    component:CreateComponent,
    data: {permission: 'customer-create'},
    canActivate:[PermissionsGuard]
  },
  {
    path: 'edit/:id',
    component:EditComponent,
    data: {permission: 'customer-edit'},
    canActivate:[PermissionsGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
