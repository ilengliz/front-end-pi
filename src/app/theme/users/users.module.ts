import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  UsersComponent } from './users.component';
import { UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {SelectModule} from 'ng-select';
// tslint:disable-next-line:import-spacing
import { FormsModule }   from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
// import { SelectControlValueAccessor } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    SelectModule,
    ToastyModule.forRoot()

   // SelectControlValueAccessor
  ],
  declarations: [UsersComponent ]
})
export class UsersModule { }
