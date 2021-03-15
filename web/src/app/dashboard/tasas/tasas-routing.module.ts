import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/auth/services/role.guard';
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
        canActivate: [RoleGuard],
        data: {
          title: 'Listado de Tasas',
          rolesPermitidos: ['administrativo', 'directivo']
        }
      },
      {
        path: 'tasas-create',
        component: TasasCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Crear tasa',
          rolesPermitidos: ['administrativo']
        }
      },
      {
        path: 'tasas-update/:id',
        component: TasasUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Editar tasa',
          rolesPermitidos: ['administrativo']
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
