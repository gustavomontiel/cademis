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
import { ColegiadosCreateComponent } from './colegiados-create/colegiados-create.component';
import { ColegiadosUpdateComponent } from './colegiados-update/colegiados-update.component';
import { ColegiadosViewComponent } from './colegiados-view/colegiados-view.component';
import { ColegiadosMasDatosComponent } from './colegiados-mas-datos/colegiados-mas-datos.component';
import { ColegiadosDireccionesComponent } from './colegiados-direcciones/colegiados-direcciones.component';
import { ColegiadosEstadoCuentaComponent } from './colegiados-estado-cuenta/colegiados-estado-cuenta.component';



@NgModule({
  declarations: [
    ColegiadosListComponent,
    CrearColegiadoComponent,
    EditarColegiadoComponent,
    ColegiadosCreateComponent,
    ColegiadosUpdateComponent,
    ColegiadosViewComponent,
    ColegiadosMasDatosComponent,
    ColegiadosDireccionesComponent,
    ColegiadosEstadoCuentaComponent
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
