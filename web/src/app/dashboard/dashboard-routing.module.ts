import { ProfileComponent } from './usuarios/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../auth/auth.guard';

const dashboardRoutes: Routes = [

  {
    path: 'home', component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'home',
      rolesPermitidos: []
    },
    loadChildren: './usuarios/usuarios.module#UsuariosdModule',
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
