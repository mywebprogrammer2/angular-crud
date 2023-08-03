import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService<Project> {

  constructor(protected http: HttpClient) {
    super();
  }



  protected getEndpoint(): string {
    return 'projects'; // Provide the endpoint URL for users
  }

  fetchData(){
    this.getAll().subscribe(users=>{
      this.data = users;
      this.getData.next(this.data);
    })
  }
}
