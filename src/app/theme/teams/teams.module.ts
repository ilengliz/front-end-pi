import { TeamsComponent } from './teams.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamsRoutingModule} from './teams-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule
  ],
  declarations: [TeamsComponent ]
})
export class TeamsModule { }
