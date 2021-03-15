import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajasRoutingModule } from './cajas-routing.module';
import { CajasListComponent } from './cajas-list/cajas-list.component';
import { CajasCreateComponent } from './cajas-create/cajas-create.component';
import { CajasUpdateComponent } from './cajas-update/cajas-update.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CajasMovimientosComponent } from './cajas-movimientos/cajas-movimientos.component';
import { CajasMovimientosCreateComponent } from './cajas-movimientos-create/cajas-movimientos-create.component';
import { CajasMovimientosViewComponent } from './cajas-movimientos-view/cajas-movimientos-view.component';
import { CajasDeleteComponent } from './cajas-delete/cajas-delete.component';


@NgModule({
  declarations: [
    CajasListComponent, 
    CajasCreateComponent, 
    CajasUpdateComponent, 
    CajasMovimientosComponent, 
    CajasMovimientosCreateComponent, 
    CajasMovimientosViewComponent, CajasDeleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule ,
    CajasRoutingModule
  ]
})
export class CajasModule { }
