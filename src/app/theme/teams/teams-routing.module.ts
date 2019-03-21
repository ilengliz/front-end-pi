import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TeamsComponent} from './teams.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    data: {
      title: 'Sample Page',
      icon: 'ti-layout-sidebar-left',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
