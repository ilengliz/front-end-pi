import { RecoverpassRoutingModule } from './recoverpass-routing.module';
import { RecoverpassComponent } from './recoverpass.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RecoverpassRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [RecoverpassComponent]
})
export class RecoverpassModule { }
