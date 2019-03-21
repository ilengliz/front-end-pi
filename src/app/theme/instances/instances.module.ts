import { InstancesRoutingModule } from './instances-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstancesComponent } from './instances.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    InstancesRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [InstancesComponent ]
})
export class InstancesModule { }
