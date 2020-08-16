import { ColegiadosService } from './../colegiados.service';
import { Component, OnInit } from '@angular/core';
import { Colegiado } from '../../models/colegiado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PuedeDesactivar } from 'src/app/shared/services/can-deactivate.guard';

@Component({
  selector: 'app-crear-colegiado',
  templateUrl: './crear-colegiado.component.html',
  styleUrls: ['./crear-colegiado.component.scss']
})
export class CrearColegiadoComponent implements OnInit, PuedeDesactivar {

  colegiado: Colegiado;
  forma: FormGroup;


  constructor(
    public colegiadosService: ColegiadosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      persona: new FormGroup({
        nombres: new FormControl('Gustavo', [Validators.required]),
        apellidos: new FormControl('Montiel', [Validators.required]),
        tipo_doc: new FormControl('DNI', [Validators.required]),
        numero_doc: new FormControl(24819843, [Validators.required]),
        cuit_cuil: new FormControl(20248198436, [Validators.required]),
        fecha_nac: new FormControl('1975-09-24', [Validators.required]),
        localidad_nac: new FormControl('Posadas', [Validators.required]),
        provincia_nac: new FormControl('Misiones', [Validators.required]),
        pais_nac: new FormControl('Argentina', [Validators.required]),
        sexo: new FormControl('m', [Validators.required])
        /*
        nombres: new FormControl(null, [Validators.required]),
        apellidos: new FormControl(null, [Validators.required]),
        tipo_doc: new FormControl(null, [Validators.required]),
        numero_doc: new FormControl(null, [Validators.required]),
        cuit_cuil: new FormControl(null, [Validators.required]),
        fecha_nac: new FormControl(null, [Validators.required]),
        localidad_nac: new FormControl(null, [Validators.required]),
        provincia_nac: new FormControl(null, [Validators.required]),
        pais_nac: new FormControl(null, [Validators.required]),
        sexo: new FormControl(null, [Validators.required])
        */
      }),
      num_matricula: new FormControl(9999, Validators.required),
      fecha_matricula: new FormControl('2020-09-24', Validators.required),
      folio: new FormControl(1, Validators.required),
      libro: new FormControl(1, Validators.required),
      legajo: new FormControl(9999),
      circunscripcion: new FormControl('Posadas', Validators.required),
      /*
      num_matricula: new FormControl(null, Validators.required),
      fecha_matricula: new FormControl(null, Validators.required),
      folio: new FormControl(null, Validators.required),
      libro: new FormControl(null, Validators.required),
      legajo: new FormControl(null),
      circunscripcion: new FormControl(null, Validators.required),
      */
      domicilio_legal: new FormGroup({
        tipo: new FormControl('Legal', Validators.required),
        calle: new FormControl('Centenario', Validators.required),
        numero: new FormControl(1, Validators.required),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl('Posadas', Validators.required),
        provincia: new FormControl('Misiones', Validators.required),
        fecha: new FormControl('2020-09-24', Validators.required),
        /*
        tipo: new FormControl('Legal', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        fecha: new FormControl(null, Validators.required),
        */
      }),
      domicilio_anterior: new FormGroup({
        tipo: new FormControl('anterior'),
        calle: new FormControl('Centenario', Validators.required),
        numero: new FormControl(1, Validators.required),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl('Posadas', Validators.required),
        provincia: new FormControl('Misiones', Validators.required),
        fecha: new FormControl('2020-09-24', Validators.required),
        /*
        tipo: new FormControl('anterior'),
        calle: new FormControl(null),
        numero: new FormControl(null),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null),
        provincia: new FormControl(null),
        fecha: new FormControl(null),
        */
      }),
      domicilio_real: new FormGroup({
        tipo: new FormControl('real', Validators.required),
        calle: new FormControl('Centenario', Validators.required),
        numero: new FormControl(1, Validators.required),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl('Posadas', Validators.required),
        provincia: new FormControl('Misiones', Validators.required),
        fecha: new FormControl('2020-09-24', Validators.required),
        /*
        tipo: new FormControl('real', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        fecha: new FormControl(null, Validators.required),
        */
      }),
      telefono1: new FormControl('123', Validators.required),
      telefono2: new FormControl(null),
      telefono3: new FormControl(null),
      fecha_recibido: new FormControl('2020-01-01', null),
      facultad: new FormControl(null),
      observacion: new FormControl(''),
      denuncias: new FormControl(''),
      email: new FormControl('gm@gm.com', [ Validators.required, Validators.email ] ),
      estado_id: new FormControl(null),
      num_mat_fed: new FormControl('0'),
      /*
      telefono1: new FormControl(null, Validators.required),
      telefono2: new FormControl(null),
      telefono3: new FormControl(null),
      fecha_recibido: new FormControl(null, null),
      facultad: new FormControl(null),
      observacion: new FormControl(''),
      denuncias: new FormControl(''),
      email: new FormControl(null, [ Validators.required, Validators.email ] ),
      estado_id: new FormControl(null),
      num_mat_fed: new FormControl('0'),
      */
    });

    this.forma.valueChanges.subscribe(() => {
      console.log(this.forma);
    });

  }

  crearColegiado() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const item = { ... this.forma.value };

        console.log(JSON.stringify(item));

        this.colegiadosService.createItem(item).subscribe(
          resp => {

            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              icon: 'success',
              timer: 2000
            }).then(res => {
              const url = this.router.url.split('/');
              url.pop();
              url.push('editar-usuario');
              this.router.navigateByUrl(url.join('/'));
              console.log(url);
            });
          },
          err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Los cambios no fueron guardados.',
              'error'
            );
          }
        );
      }
    });
  }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {

    if ( this.forma.dirty ) {
      return Swal.fire({
        title: 'Salir',
        text: 'Confirma salir y perder los cambios?',
        icon: 'question',
        showCancelButton: true,
      }).then(( result ) => {
        console.log('result', result.value);
        return result.value ? result.value : false;
      });
    } else {
      return true;
    }

  }


}
