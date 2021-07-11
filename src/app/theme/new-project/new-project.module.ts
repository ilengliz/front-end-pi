import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng-select';
import { FormsModule} from '@angular/forms';
import { NewProjectComponent } from './new-project.component';
import { NewProjectRoutingModule } from './new-project-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';

@NgModule({
  imports: [
    CommonModule,
    NewProjectRoutingModule,
    SharedModule,
    ArchwizardModule,
    FormsModule,
    SelectModule,
    RouterModule
  ],

  declarations: [NewProjectComponent],
  bootstrap: [NewProjectComponent]
})
export class NewProjectModule { }

