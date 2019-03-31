import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot.component';
import {ForgotRoutingModule} from './forgot-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { RemoveAlertDirective} from './forgot.component';



@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ForgotComponent, RemoveAlertDirective]
})
export class ForgotModule { }
