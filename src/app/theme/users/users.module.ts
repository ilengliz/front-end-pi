import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  UsersComponent } from './users.component';
import { UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../../shared/shared.module';
// tslint:disable-next-line:import-spacing
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [UsersComponent ]
})
export class UsersModule { }
