import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { InstancesComponent } from './instances.component';

const routes: Routes = [
  {
    path: '',
    component: InstancesComponent,
    data: {
      title: 'Instances',
      icon: 'ti-layout-sidebar-left',
      caption: '',
      status: true
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstancesRoutingModule { }
