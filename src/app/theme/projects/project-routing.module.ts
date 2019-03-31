import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'project',
      status: false
    },
    children: [
      {
        path: 'newProject',
        loadChildren: './new-project/new-project.module#NewProjectModule'
      },
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
