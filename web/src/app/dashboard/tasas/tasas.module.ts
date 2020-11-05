import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material.module';

import { TasasCreateComponent } from './tasas-create/tasas-create.component';
import { TasasListComponent } from './tasas-list/tasas-list.component';
import { TasasRoutingModule } from './tasas-routing.module';
import { TasasUpdateComponent } from './tasas-update/tasas-update.component';

@NgModule({
  declarations: [
    TasasListComponent, 
    TasasCreateComponent, 
    TasasUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule ,
    CommonModule,
    TasasRoutingModule
  ]
})
export class TasasModule { }
