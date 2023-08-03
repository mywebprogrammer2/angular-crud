import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    children: [
      {
        path: "users",
        canActivate: [PermissionsGuard],
        data:{permission: 'user-view'},
        loadChildren: () => import("./components/users/users.module").then((x) =>x.UserModule),
      },
      {
        path: "roles",
        canActivate: [PermissionsGuard],
        data:{permission: 'role-view'},
        loadChildren: () => import("./components/roles/roles.module").then((x) => x.RolesModule),
      },
      {
        path: "projects",
        canActivate: [PermissionsGuard],
        data:{permission: 'project-view'},
        loadChildren: () => import("./components/projects/projects.module").then((x) => x.ProjectsModule),
      },
      {
        path: "customers",
        canActivate: [PermissionsGuard],
        data:{permission: 'customer-view'},
        loadChildren: () => import("./components/customer/customer.module").then((x) => x.CustomerModule),
      },
      {
        path: "invoices",
        canActivate: [PermissionsGuard],
        data:{permission: 'invoice-view'},
        loadChildren: () => import("./components/invoices/invoices.module").then((x) => x.InvoicesModule),
      },
      {
        path: "payments",
        canActivate: [PermissionsGuard],
        data:{permission: 'payment-view'},
        loadChildren: () => import("./components/payments/payments.module").then((x) => x.PaymentsModule),
      },
      {
        path: "change-password",
        component: ChangePasswordComponent
      }
    ]
  },
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
