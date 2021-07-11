import { DataTableModule } from './../table/data-table/data-table.module';
import { LogComponent } from './log.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogRoutingModule} from './log-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    ReactiveFormsModule,
  ],
  declarations: [LogComponent ]
})
export class LogModule { }
