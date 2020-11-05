import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';

import { TasasCreateComponent } from './tasas-create/tasas-create.component';
import { TasasListComponent } from './tasas-list/tasas-list.component';
import { TasasUpdateComponent } from './tasas-update/tasas-update.component';

const tasasRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Tasas',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'tasas-list',
        component: TasasListComponent,
        data: {
          title: 'Listado de Tasas',
          rolesPermitidos: []
        }
      },
      {
        path: 'tasas-create',
        component: TasasCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear tasa',
          rolesPermitidos: []
        }
      },
      {
        path: 'tasas-update/:id',
        component: TasasUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar tasa',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'tasas-list'},
      { path: '**', redirectTo: 'tasas-list'}

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(tasasRoutes)],
  exports: [RouterModule]
})
export class TasasRoutingModule { }
