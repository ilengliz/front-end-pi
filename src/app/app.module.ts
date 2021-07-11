import { NewInstanceModule } from './theme/new-instance/new-instance.module';
import { ToastyModule } from 'ng2-toasty';
import { SchedulesModule } from './theme/schedules/schedules.module';
import { InstanceService } from './services/instance.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { DataTableModule } from './theme/table/data-table/data-table.module';
import { TestModule } from './theme/test-folder/test.module';
import { SimplePageModule } from './theme/simple-page/simple-page.module';
import { SignUpService } from './services/sign-up.service';
import { AuthService } from './services/auth.service';
import { AuthModule } from './theme/auth/auth.module';
import { UserModule } from './theme/user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectsModule } from './theme/projects/projects.module';
import { UsersModule } from './theme/users/users.module';
 import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UiSwitchModule } from 'ngx-ui-switch';
import { LoginModule } from './theme/auth/login/login.module';
import { LogModule } from './theme/log/log.module';
import { NewProjectModule } from './theme/new-project/new-project.module';
import { InstanceModule } from './theme/instance/instance.module';
import { NutritionnisteComponent } from './theme/nutritionniste/nutritionniste.component';

// import { httpInterceptorProviders } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    NutritionnisteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    SimplePageModule,
    TestModule,
    ProjectsModule,
    LoginModule,
    DataTableModule,
    NewProjectModule,
    UsersModule,
    NewInstanceModule,
    MDBBootstrapModule.forRoot(),
    InstanceModule,
  UiSwitchModule,
  SchedulesModule,
  LogModule,
  ToastyModule.forRoot()

  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [MenuItems, AuthService, SignUpService, InstanceService, AuthGuard, {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports : [FormsModule],

})
export class AppModule { }
