import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColegiadosMovimientosCuentaComponent } from './colegiados-movimientos-cuenta/colegiados-movimientos-cuenta.component';
import { ColegiadosEstadoCuentaComponent } from './colegiados-estado-cuenta/colegiados-estado-cuenta.component';
import { ColegiadosDireccionesComponent } from './colegiados-direcciones/colegiados-direcciones.component';
import { ColegiadosMasDatosComponent } from './colegiados-mas-datos/colegiados-mas-datos.component';
import { ColegiadosViewComponent } from './colegiados-view/colegiados-view.component';
import { ColegiadosUpdateComponent } from './colegiados-update/colegiados-update.component';
import { ColegiadosCreateComponent } from './colegiados-create/colegiados-create.component';
import { ColegiadosListComponent } from './colegiados-list/colegiados-list.component';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';
import { ColegiadosDeleteComponent } from './colegiados-delete/colegiados-delete.component';
import { RoleGuard } from 'src/app/auth/services/role.guard';


const colegiadosRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Colegiados',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'colegiados-list',
        component: ColegiadosListComponent,
        data: {
          title: 'Listado colegiados',
          rolesPermitidos: []
        }
      },
      {
        path: 'colegiados-create',
        component: ColegiadosCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Crear colegiado',
          rolesPermitidos: ['administrativo']
        }
      },
      {
        path: 'colegiados-update/:id',
        component: ColegiadosUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Editar colegiado',
          rolesPermitidos: ['administrativo']
        }
      },
      {
        path: 'colegiados-view/:id',
        component: ColegiadosViewComponent,
        canDeactivate: [],
        data: {
          title: 'Vista colegiado',
          rolesPermitidos: []
        }
      },
      {
        path: 'colegiados-mas-datos/:id',
        component: ColegiadosMasDatosComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Colegiados más datos',
          rolesPermitidos: ['administrativo']
        }
      },
      {
        path: 'colegiados-direcciones/:id',
        component: ColegiadosDireccionesComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Colegiado direcciones',
          rolesPermitidos: ['administrativo']
        }
      },
      {
        path: 'colegiados-estado-cuenta/:id',
        component: ColegiadosEstadoCuentaComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Colegiado direcciones',
          rolesPermitidos: ['cajero']
        }
      },
      {
        path: 'colegiados-movimientos-cuenta/:id',
        component: ColegiadosMovimientosCuentaComponent,
        canDeactivate: [],
        canActivate: [RoleGuard],
        data: {
          title: 'Colegiado direcciones',
          rolesPermitidos: ['cajero']
        }
      },
      {
        path: 'colegiados-delete/:id',
        component: ColegiadosDeleteComponent,
        canDeactivate: [],
        canActivate: [RoleGuard],
        data: {
          title: 'Eliminar colegiado',
          rolesPermitidos: ['administrador']
        }
      },
      { path: '', redirectTo: 'colegiados-list'},
      { path: '**', redirectTo: 'colegiados-list'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(colegiadosRoutes)],
  exports: [RouterModule]
})
export class ColegiadosRoutingModule { }
