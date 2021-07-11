import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesComponent } from './schedules.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { SelectModule } from 'ng-select';
// import { TagInputModule } from 'ngx-chips';


@NgModule({
  imports: [
    CommonModule,
  SchedulesRoutingModule ,
  SharedModule ,
  SelectModule,
  // TagInputModule,
  FormsModule
]
    ,
  declarations: [SchedulesComponent],
  bootstrap: [SchedulesComponent]
})
export class SchedulesModule { }

