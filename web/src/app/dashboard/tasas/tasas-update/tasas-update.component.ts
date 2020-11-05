import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import Swal from 'sweetalert2';

import { CanDeactivateGuard, PuedeDesactivar } from '../../../shared/services/can-deactivate.guard';
import { Tasa } from '../../models/tasa.model';
import { TasasService } from './../tasas.service';

@Component({
  selector: 'app-tasas-update',
  templateUrl: './tasas-update.component.html',
  styleUrls: ['./tasas-update.component.scss']
})
export class TasasUpdateComponent implements OnInit {

  tasa: Tasa;
  forma: FormGroup;

  constructor(
    public tasaService: TasasService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      fecha: new FormControl(null, Validators.required),
      tasa: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.tasaService.getItemById(id)
      .subscribe(resp => {
        this.tasa = resp.data;
        console.log(this.tasa);
        this.forma.setValue({
          fecha: this.tasa.fecha,
          tasa: this.tasa.tasa,
        });
      }
      );
  }

  updateItem() {

    if (this.forma.invalid) {
      this.formErrorHandlerService.fromLocal(this.forma);
      return;
    }

    Swal.fire({
      title: 'Guardar cambios?',
      text: 'Confirma los cambios?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {

        const item = { ... this.forma.value, id: this.tasa.id } as Tasa;
        //item.password = item.password.length < 3 ? null : item.password;

        this.tasaService.updateItem(item).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
            this.forma.markAsPristine();
          },
          error => {
            // tslint:disable-next-line: no-unused-expression
            (error instanceof HttpErrorResponse) && this.formErrorHandlerService.fromServer(this.forma, error);
          }
        );
      }
    });

  }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return CanDeactivateGuard.confirmaSalirDeRuta(this.forma);
  }

}
