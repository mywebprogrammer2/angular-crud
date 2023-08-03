import { Component } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/auth/services/authService.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public user: User | null;


  constructor(private permissionService: PermissionService,private authService: AuthService) {
    this.user = this.authService.getUser();
   }

  can(permission:string):boolean { return this.permissionService.hasPermission(permission)}


  logout() {
    this.authService.logout();
  }

}
