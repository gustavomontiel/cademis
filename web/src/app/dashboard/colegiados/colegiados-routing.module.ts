import { ColegiadosViewComponent } from './colegiados-view/colegiados-view.component';
import { ColegiadosUpdateComponent } from './colegiados-update/colegiados-update.component';
import { ColegiadosCreateComponent } from './colegiados-create/colegiados-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColegiadosListComponent } from './colegiados-list/colegiados-list.component';
import { CrearColegiadoComponent } from './crear-colegiado/crear-colegiado.component';
import { EditarColegiadoComponent } from './editar-colegiado/editar-colegiado.component';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';



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
        data: {
          title: 'Crear colegiado',
          rolesPermitidos: []
        }
      },
      {
        path: 'colegiados-update/:id',
        component: ColegiadosUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar colegiado',
          rolesPermitidos: []
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
