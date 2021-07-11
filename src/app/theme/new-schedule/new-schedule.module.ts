import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng-select';
// import { TagInputModule } from 'ngx-chips';
import { FormsModule} from '@angular/forms';
import {  NewScheduleComponent, RemoveAlertDirective } from './new-schedule.component';
import { NewScheduleRoutingModule } from './new-schedule-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';

@NgModule({
  imports: [
    CommonModule,
    NewScheduleRoutingModule,
    SharedModule,
    ArchwizardModule,
    FormsModule,
    SelectModule,
    // TagInputModule,
    RouterModule
  ],

  declarations: [NewScheduleComponent, RemoveAlertDirective],
  bootstrap: [NewScheduleComponent]
})
export class NewScheduleModule { }

