import { SharedModule } from './../../shared/shared.module';
import { InstanceRoutingModule } from './instance-routing.module';
import { InstanceComponent } from './instance.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ToastyModule } from 'ng2-toasty';
// import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    InstanceRoutingModule,
    SharedModule,
    SelectModule,
    UiSwitchModule,
       FormsModule,
       ToastyModule.forRoot()

  ],
  declarations: [InstanceComponent],
  bootstrap: [InstanceComponent]
})
export class InstanceModule {}
