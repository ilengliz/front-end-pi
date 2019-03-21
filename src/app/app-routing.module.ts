import { AuthGuard } from './auth/auth.guard';
import { SimplePageRoutingModule } from './theme/simple-page/simple-page-routing.module';
import { LoginRoutingModule } from './theme/auth/login/login-routing.module';
import { AuthRoutingModule } from './theme/auth/auth-routing.module';
import { UserRoutingModule } from './theme/user/user-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
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
        loadChildren: './theme/instances/instances.module#InstancesModule'
      },
      {
        path: 'projects',
        loadChildren: './theme/projects/projects.module#ProjectsModule'
      },
      {
        path: 'teams',
        loadChildren: './theme/teams/teams.module#TeamsModule'
      },
      {
        path: 'users',
        loadChildren: './theme/users/users.module#UsersModule'
      }
    ],
    canActivate: [AuthGuard]
    },
    {
      path: '',
      component: AuthComponent,
      children: [
        {
          path: 'auth',
          loadChildren: './theme/auth/auth.module#AuthModule'
        }
      ]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
