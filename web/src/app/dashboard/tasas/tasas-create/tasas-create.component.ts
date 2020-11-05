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
  selector: 'app-tasas-create',
  templateUrl: './tasas-create.component.html',
  styleUrls: ['./tasas-create.component.scss']
})
export class TasasCreateComponent implements OnInit {

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
  }

  crearTasa() {

    if (this.forma.invalid) {
      this.formErrorHandlerService.fromLocal(this.forma);
      return;
    }

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const user = { ... this.forma.value };
        console.log(user);

        this.tasaService.createItem(user).subscribe(
          resp => {

            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              icon: 'success',
              timer: 2000
            }).then(res => {
              this.forma.markAsPristine();
              const url = this.router.url.split('/');
              url.pop();
              url.push('tasas-update');
              this.router.navigateByUrl(url.join('/'));
              console.log(url);
            });
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
