import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';
// import { TagInputModule } from 'ngx-chips';


@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule ,
  SelectModule,
  // TagInputModule,
  FormsModule
]
    ,
  declarations: [ProjectsComponent],
  bootstrap: [ProjectsComponent]
})
export class ProjectsModule { }

