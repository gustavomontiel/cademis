import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColegiadosListComponent } from './colegiados-list/colegiados-list.component';
import { CrearColegiadoComponent } from './crear-colegiado/crear-colegiado.component';
import { EditarColegiadoComponent } from './editar-colegiado/editar-colegiado.component';



const colegiadosRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Colegiados',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'lista-colegiados',
        component: ColegiadosListComponent,
        data: {
          title: 'Listado colegiados',
          rolesPermitidos: []
        }
      },
      {
        path: 'crear-colegiado',
        component: CrearColegiadoComponent,
        data: {
          title: 'Crear colegiado',
          rolesPermitidos: []
        }
      },
      {
        path: 'editar-colegiado/:id',
        component: EditarColegiadoComponent,
        data: {
          title: 'Editar colegiado',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'lista-colegiados'},
      { path: '**', redirectTo: 'lista-colegiados'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(colegiadosRoutes)],
  exports: [RouterModule]
})
export class ColegiadosRoutingModule { }
