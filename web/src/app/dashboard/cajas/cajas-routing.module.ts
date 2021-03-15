import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';
import { CajasCreateComponent } from './cajas-create/cajas-create.component';
import { CajasListComponent } from './cajas-list/cajas-list.component';
import { CajasUpdateComponent } from './cajas-update/cajas-update.component';
import { CajasMovimientosComponent } from './cajas-movimientos/cajas-movimientos.component';
import { CajasMovimientosCreateComponent } from './cajas-movimientos-create/cajas-movimientos-create.component';
import { CajasMovimientosViewComponent } from './cajas-movimientos-view/cajas-movimientos-view.component';
import { CajasDeleteComponent } from './cajas-delete/cajas-delete.component';

const cajasRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Cajas',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'cajas-list',
        component: CajasListComponent,
        data: {
          title: 'Listado cajas',
          rolesPermitidos: []
        }
      },
      {
        path: 'cajas-create',
        component: CajasCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear caja',
          rolesPermitidos: []
        }
      },
      {
        path: 'cajas-update/:id',
        component: CajasUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar caja',
          rolesPermitidos: []
        }
      },
      {
        path: 'cajas-delete/:id',
        component: CajasDeleteComponent,
        canDeactivate: [],
        data: {
          title: 'Eliminar caja',
          rolesPermitidos: []
        }
      },
      {
        path: 'cajas/:id/movimientos',
        component: CajasMovimientosComponent,
        data: {
          title: 'Movimientos caja',
          rolesPermitidos: []
        }
      },
      {
        path: 'cajas/:id/movimientos-create',
        component: CajasMovimientosCreateComponent,
        data: {
          title: 'Nuevo movimiento de caja',
          rolesPermitidos: []
        }
      },
      {
        path: 'cajas/:idCaja/movimientos-view/:id',
        component: CajasMovimientosViewComponent,
        data: {
          title: 'Vista de movimiento de caja',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'cajas-list'},
      { path: '**', redirectTo: 'cajas-list'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cajasRoutes)],
  exports: [RouterModule]
})
export class CajasRoutingModule { }
