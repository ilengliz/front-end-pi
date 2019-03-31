import { Router } from '@angular/router';
import { Project } from './../Project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'http://localhost/pfe/public/api/projects';
  private   projectCollabortsUrl = 'http://localhost/pfe/public/api/project';
  private   addProjectUrl = 'http://localhost/pfe/public/api/new_project';
  private   addUserToProjectUrl = 'http://localhost/pfe/public/api/add_user_to_project';
  private   deleteProjectUrl = 'http://localhost/pfe/public/api/delete_project';
  private   editProjectUrl = 'http://localhost/pfe/public/api/edit_project';
  private   removeUserfromProjectUrl = 'http://localhost/pfe/public/api/delete_user_from_project';




  constructor(private http: HttpClient, private router: Router) { }
  getProjects() {
 return this.http.get<Project []>(this.projectsUrl);
  }
  getProjectCollaborators( projectId) {
    return this.http.post(this.projectCollabortsUrl, {
      'project_id': projectId
    });
  }
  isAteamLeader(email, project_Id) {
    if (project_Id.teamLeader.email === email ) {
      return true ;

    } else {
      return false;
    }
  }
addProject (projectName, projectBudget, extraBudget, teamleader ) {
  this.http.post(this.addProjectUrl, {
    'teamleader': teamleader,
    'name': projectName,
    'budget': projectBudget,
    'extra_budget': extraBudget,
    'remaining_budget': 0
  }).subscribe(data => {
    console.log(data);
    this.router.navigateByUrl('/project/projects');

  },
  error =>
  console.log(error)
  );
}
addUserToProject(id, email) {
return this.http.post(this.addUserToProjectUrl, {
  'project_id': id.toString(),
  'email': email
});
}
deleteProject(project_id) {

this.http.post(this.deleteProjectUrl, {
  'project_id': project_id
 }).subscribe(data => console.log('project deleted', data),
            error => console.log(error));
}
editProjet(id, projectName, projectBudget, extrabudget, teamleader) {
  console.log(id.toString());
  this.http.post(this.editProjectUrl, {
    'teamleader': teamleader,
    'name': projectName,
    'budget': projectBudget as string,
    'extra_budget': extrabudget as string,
    'id': id as string
  }).subscribe(data => {
    console.log('edit request', data);
  }, error => console.log(error)
  );
}

removeuser(email, project ) {
this.http.post(this.removeUserfromProjectUrl, {
  'project_id': project.id,
  'email': email
}).subscribe(data => {console.log('user removed', data); },
            error => console.log(error)
);
}
}
