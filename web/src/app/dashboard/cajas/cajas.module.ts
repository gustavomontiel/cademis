import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajasRoutingModule } from './cajas-routing.module';
import { CajasListComponent } from './cajas-list/cajas-list.component';
import { CajasCreateComponent } from './cajas-create/cajas-create.component';
import { CajasUpdateComponent } from './cajas-update/cajas-update.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CajasMovimientosComponent } from './cajas-movimientos/cajas-movimientos.component';
import { CajasMovimientosCreateComponent } from './cajas-movimientos-create/cajas-movimientos-create.component';
import { CajasMovimientosViewComponent } from './cajas-movimientos-view/cajas-movimientos-view.component';


@NgModule({
  declarations: [
    CajasListComponent, 
    CajasCreateComponent, 
    CajasUpdateComponent, 
    CajasMovimientosComponent, 
    CajasMovimientosCreateComponent, CajasMovimientosViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule ,
    CommonModule,
    CajasRoutingModule
  ]
})
export class CajasModule { }
