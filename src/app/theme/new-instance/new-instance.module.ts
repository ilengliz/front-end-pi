import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng-select';
// import { TagInputModule } from 'ngx-chips';
import { FormsModule} from '@angular/forms';
import { NewInstanceComponent } from './new-instance.component';
import { NewInstanceRoutingModule } from './new-instance-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { RemoveAlertDirective} from './new-instance.component';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    NewInstanceRoutingModule,
    SharedModule,
    ArchwizardModule,
    FormsModule,
    SelectModule,
    RouterModule,
    ToastyModule.forRoot()

  ],

  declarations: [NewInstanceComponent, RemoveAlertDirective],
  bootstrap: [NewInstanceComponent]
})
export class NewInstanceModule { }

