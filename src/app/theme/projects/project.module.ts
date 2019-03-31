import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: []
})
export class ProjectModule { }
