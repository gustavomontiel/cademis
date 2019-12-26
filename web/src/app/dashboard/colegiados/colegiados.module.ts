import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Material
import { MaterialModule } from 'src/app/shared/material.module';

// rutas
import { ColegiadosRoutingModule } from './colegiados-routing.module';

import { ColegiadosListComponent } from './colegiados-list/colegiados-list.component';
import { CrearColegiadoComponent } from './crear-colegiado/crear-colegiado.component';
import { EditarColegiadoComponent } from './editar-colegiado/editar-colegiado.component';



@NgModule({
  declarations: [
    ColegiadosListComponent,
    CrearColegiadoComponent,
    EditarColegiadoComponent
  ],
  exports: [
    ColegiadosListComponent,
    CrearColegiadoComponent,
    EditarColegiadoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule ,
    ColegiadosRoutingModule
  ],
  providers: [],
})

export class ColegiadosdModule { }
