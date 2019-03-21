import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import {TestRoutingModule} from './test-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule
  ],
  declarations: [TestComponent ]
})
export class TestModule { }
