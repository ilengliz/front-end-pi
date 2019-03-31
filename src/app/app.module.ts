import { ProjectModule } from './theme/projects/project.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { DataTableModule } from './theme/table/data-table/data-table.module';
import { TeamsModule } from './theme/teams/teams.module';
import { InstancesModule } from './theme/instances/instances.module';
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
import { ProjectsModule } from './theme/projects/projects/projects.module';
import { UsersModule } from './theme/users/users.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { httpInterceptorProviders } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent
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
    InstancesModule,
    ProjectsModule,
    TeamsModule,
    DataTableModule,
    UsersModule,
    MDBBootstrapModule.forRoot(),
    ProjectModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [MenuItems, AuthService, SignUpService, AuthGuard, {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports : [FormsModule],

})
export class AppModule { }
