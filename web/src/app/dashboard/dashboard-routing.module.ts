import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './usuarios/profile/profile.component';

const dashboardRoutes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'home',
        data: {
          title: ''
        },
        component: HomeComponent,
      },
      {
        path: 'usuarios',
        data: {
          title: ''
        },
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosdModule ),
      },
      {
        path: 'colegiados',
        data: {
          title: ''
        },
        loadChildren: () => import('./colegiados/colegiados.module').then(m => m.ColegiadosdModule ),
      },
      {
        path: 'cajas',
        data: {
          title: ''
        },
        loadChildren: () => import('./cajas/cajas.module').then(m => m.CajasModule ),
      },
      {
        path: 'tasas',
        data: {
          title: ''
        },
        loadChildren: () => import('./tasas/tasas.module').then(m => m.TasasModule ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
