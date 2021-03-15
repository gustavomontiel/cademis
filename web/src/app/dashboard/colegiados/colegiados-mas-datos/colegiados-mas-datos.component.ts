import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Colegiado } from '../../models/colegiado.model';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colegiados-mas-datos',
  templateUrl: './colegiados-mas-datos.component.html',
  styleUrls: ['./colegiados-mas-datos.component.scss']
})
export class ColegiadosMasDatosComponent implements OnInit {

  colegiado: Colegiado;
  forma: FormGroup;

  constructor(
    public colegiadosService: ColegiadosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      persona: new FormGroup({
        fecha_nac: new FormControl(null),
        localidad_nac: new FormControl(null),
        provincia_nac: new FormControl(null),
        pais_nac: new FormControl(null),
        sexo: new FormControl(null),
      }),
      id: new FormControl(null, [Validators.required]),
      telefono1: new FormControl(null),
      telefono2: new FormControl(null),
      telefono3: new FormControl(null),
      fecha_recibido: new FormControl(null),
      facultad: new FormControl(null),
      observacion: new FormControl(''),
      denuncias: new FormControl(''),
      email: new FormControl(null, [Validators.email]),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.colegiadosService.getItemById(id)
      .subscribe(resp => {
        this.colegiado = resp.data;
        this.forma.patchValue(this.colegiado);
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

        const item = { ... this.forma.value };

        this.colegiadosService.updateMasDatos(item).subscribe(
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

  editarItem() {
    const url = this.router.url.split('/');
    url.pop();
    url.pop();
    url.push('colegiados-update');
    const urlFinal = url.join('/') + '/' + this.colegiado.id;
    this.router.navigateByUrl(urlFinal);
  }

}
