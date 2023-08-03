import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { DashboardSharedModule } from '../../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ProjectsRoutingModule } from './project-routing.module';



@NgModule({
  declarations: [
    ProjectsComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    ProjectsRoutingModule,
    DashboardSharedModule
  ]
})
export class ProjectsModule { }
