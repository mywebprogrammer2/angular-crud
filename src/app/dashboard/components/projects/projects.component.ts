import { Component } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { Project } from '../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProjectService } from '../../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects: Project[] = [];
  subscriptions: Subscription;
  deleteSubscription: Subscription;

  constructor(private permissionService: PermissionService, private dialog: MatDialog, private projectsService: ProjectService) {
    projectsService.fetchData();
  }

  ngOnInit(){
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.subscriptions = this.projectsService.getData.subscribe((data ) => {
      this.projects = data;
    })
  }



  can(permission:string){ return this.permissionService.hasPermission(permission)}

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
    this.deleteSubscription = this.projectsService.delete(id).subscribe({
      next: () => this.onDeleted(id),
      error: (error) => {},
      complete: () => {}

    })
  }

  onDeleted(id:number): void {
    const deleteItem = this.projects.find(x => x.id == id);
    if(deleteItem){
      this.projectsService.deleteLocally( deleteItem );
    }
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
    if(this.deleteSubscription ) this.deleteSubscription.unsubscribe();
  }

}
