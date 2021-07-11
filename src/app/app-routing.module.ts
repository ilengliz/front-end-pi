//import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import { NutritionnisteComponent } from './theme/nutritionniste/nutritionniste.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
     {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'nutritionnistes',
        component: NutritionnisteComponent
      },
      {
      path: '',
      loadChildren: './theme/instance/instance.module#InstanceModule'
      },
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'user',
        loadChildren: './theme/user/user.module#UserModule'
      },
      {
        path: 'simple-page',
        loadChildren: './theme/simple-page/simple-page.module#SimplePageModule'
      },
      {
        path: 'data-table',
        loadChildren: './theme/table/data-table/data-table.module#DataTableModule'
      },
      {
        path: 'forms/test',
        loadChildren: './theme/test-folder/test.module#TestModule'
      },
      {
        path: 'instances',
        loadChildren: './theme/instance/instance.module#InstanceModule'
      },
      {
        path: 'newProject',
        loadChildren: './theme/new-project/new-project.module#NewProjectModule'
      },
      {
        path: 'newSchedule',
        loadChildren: './theme/new-schedule/new-schedule.module#NewScheduleModule'
      },
      {
        path: 'newInstance',
        loadChildren: './theme/new-instance/new-instance.module#NewInstanceModule'
      },
      {
        path: 'log',
        loadChildren: './theme/log/log.module#LogModule'
      },
      {
        path: 'users',
        loadChildren: './theme/users/users.module#UsersModule'
      },
      {
        path: 'projects',
        loadChildren: './theme/projects/projects.module#ProjectsModule'
      },
      {
        path: 'schedule',
        loadChildren: './theme/schedules/schedules.module#SchedulesModule'
      },
      {
        path: 'profile/:email',
        loadChildren: './theme/user-profile/user-profile.module#UserProfileModule'
      }
    ],
    //canActivate: [AuthGuard]
    },
  /* {
      path: '',
      component: AuthComponent,
      children: [
        {
          path: 'auth',
          loadChildren: './theme/auth/auth.module#AuthModule'
        }
      ]
    },*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
