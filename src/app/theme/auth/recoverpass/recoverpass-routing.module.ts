import { RecoverpassComponent } from './recoverpass.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RecoverpassComponent,
    data: {
      title: 'recover'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverpassRoutingModule { }
