import { Project } from './../Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'http://localhost/pfe/public/api/projects';
  private   projectCollabortsUrl = 'http://localhost/pfe/public/api/project';


  constructor(private http: HttpClient) { }
  getProjects() {
 return this.http.get<Project []>(this.projectsUrl);
  }
  getProjectCollaborators ( projectId) {
    this.http.post(this.projectsUrl, {
      'project_id': projectId
    });
  }
}
