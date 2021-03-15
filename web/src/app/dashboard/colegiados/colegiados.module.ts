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
import { ColegiadosCreateComponent } from './colegiados-create/colegiados-create.component';
import { ColegiadosUpdateComponent } from './colegiados-update/colegiados-update.component';
import { ColegiadosViewComponent } from './colegiados-view/colegiados-view.component';
import { ColegiadosMasDatosComponent } from './colegiados-mas-datos/colegiados-mas-datos.component';
import { ColegiadosDireccionesComponent } from './colegiados-direcciones/colegiados-direcciones.component';
import { ColegiadosEstadoCuentaComponent } from './colegiados-estado-cuenta/colegiados-estado-cuenta.component';
import { ColegiadosMovimientosCuentaComponent } from './colegiados-movimientos-cuenta/colegiados-movimientos-cuenta.component';
import { ColegiadosDeleteComponent } from './colegiados-delete/colegiados-delete.component';



@NgModule({
  declarations: [
    ColegiadosListComponent,
    ColegiadosCreateComponent,
    ColegiadosUpdateComponent,
    ColegiadosViewComponent,
    ColegiadosMasDatosComponent,
    ColegiadosDireccionesComponent,
    ColegiadosEstadoCuentaComponent,
    ColegiadosMovimientosCuentaComponent,
    ColegiadosDeleteComponent
  ],
  exports: [
    ColegiadosListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    // NgbModule,
    ReactiveFormsModule ,
    ColegiadosRoutingModule
  ],
  providers: [],
})

export class ColegiadosdModule { }
