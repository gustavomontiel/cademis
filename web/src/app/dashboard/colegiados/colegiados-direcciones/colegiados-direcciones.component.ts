import { Component, OnInit } from '@angular/core';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';
import { Colegiado } from '../../models/colegiado.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colegiados-direcciones',
  templateUrl: './colegiados-direcciones.component.html',
  styleUrls: ['./colegiados-direcciones.component.scss']
})
export class ColegiadosDireccionesComponent implements OnInit {

  colegiado: Colegiado;
  forma: FormGroup;

  constructor(
    public colegiadosService: ColegiadosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      domicilio_legal: new FormGroup({
        tipo: new FormControl('LEGAL'),
        calle: new FormControl(null),
        numero: new FormControl(null),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null),
        provincia: new FormControl(null),
        pais: new FormControl('ARGENTINA'),
      }),
      domicilio_real: new FormGroup({
        tipo: new FormControl('REAL'),
        calle: new FormControl(null),
        numero: new FormControl(null),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null),
        provincia: new FormControl(null),
        pais: new FormControl('ARGENTINA'),
      }),
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
        this.forma.patchValue({ id: this.colegiado.id });
        this.colegiado.domicilio_legal && this.forma.patchValue({ domicilio_legal: this.colegiado.domicilio_legal });
        this.colegiado.domicilio_real && this.forma.patchValue({ domicilio_real: this.colegiado.domicilio_real });
      }
      );
  }


  cambioDomicilioLegal() {
    if (this.colegiado.domicilio_legal) {
      return this.colegiado.domicilio_legal.calle !== this.forma.get('domicilio_legal').get('calle').value
        ||
        this.colegiado.domicilio_legal.numero !== this.forma.get('domicilio_legal').get('numero').value
        ||
        this.colegiado.domicilio_legal.piso !== this.forma.get('domicilio_legal').get('piso').value
        ||
        this.colegiado.domicilio_legal.departamento !== this.forma.get('domicilio_legal').get('departamento').value
        ||
        this.colegiado.domicilio_legal.localidad !== this.forma.get('domicilio_legal').get('localidad').value
        ||
        this.colegiado.domicilio_legal.provincia !== this.forma.get('domicilio_legal').get('provincia').value;
    } else {
      return '' !== this.forma.get('domicilio_legal').get('calle').value
        ||
        '' !== this.forma.get('domicilio_legal').get('numero').value
        ||
        '' !== this.forma.get('domicilio_legal').get('piso').value
        ||
        '' !== this.forma.get('domicilio_legal').get('departamento').value
        ||
        '' !== this.forma.get('domicilio_legal').get('localidad').value
        ||
        '' !== this.forma.get('domicilio_legal').get('provincia').value;
    }
  }

  cambioDomicilioReal() {
    if (this.colegiado.domicilio_real) {
      return this.colegiado.domicilio_real.calle !== this.forma.get('domicilio_real').get('calle').value
        ||
        this.colegiado.domicilio_real.numero !== this.forma.get('domicilio_real').get('numero').value
        ||
        this.colegiado.domicilio_real.piso !== this.forma.get('domicilio_real').get('piso').value
        ||
        this.colegiado.domicilio_real.departamento !== this.forma.get('domicilio_real').get('departamento').value
        ||
        this.colegiado.domicilio_real.localidad !== this.forma.get('domicilio_real').get('localidad').value
        ||
        this.colegiado.domicilio_real.provincia !== this.forma.get('domicilio_real').get('provincia').value;
    } else {
      return null !== this.forma.get('domicilio_real').get('calle').value
        ||
        null !== this.forma.get('domicilio_real').get('numero').value
        ||
        null !== this.forma.get('domicilio_real').get('piso').value
        ||
        null !== this.forma.get('domicilio_real').get('departamento').value
        ||
        null !== this.forma.get('domicilio_real').get('localidad').value
        ||
        null !== this.forma.get('domicilio_real').get('provincia').value;

    }


  }


  updateItem() {

    const item: any = {};
    item.id = this.forma.get('id').value;

    // tslint:disable-next-line: no-unused-expression
    this.cambioDomicilioLegal() && (item.domicilio_legal = this.forma.get('domicilio_legal').value);

    // tslint:disable-next-line: no-unused-expression
    this.cambioDomicilioReal() && (item.domicilio_real = this.forma.get('domicilio_real').value);

    if (this.forma.invalid || !(this.forma.dirty && (this.cambioDomicilioReal() || this.cambioDomicilioLegal()))) {
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

        this.colegiadosService.updateDirecciones(item).subscribe(
          resp => {
            this.colegiado = resp.data;
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

  editarItem() {
    const url = this.router.url.split('/');
    url.pop();
    url.pop();
    url.push('colegiados-update');
    const urlFinal = url.join('/') + '/' + this.colegiado.id;
    this.router.navigateByUrl(urlFinal);
  }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return CanDeactivateGuard.confirmaSalirDeRuta(this.forma);
  }

}
