import { ColegiadosService } from './../colegiados.service';
import { Component, OnInit } from '@angular/core';
import { Colegiado } from '../colegiado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-colegiado',
  templateUrl: './crear-colegiado.component.html',
  styleUrls: ['./crear-colegiado.component.scss']
})
export class CrearColegiadoComponent implements OnInit {

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
      }),
      num_matricula: new FormControl(null, Validators.required),
      fecha_matricula: new FormControl(null, Validators.required),
      folio: new FormControl(null, Validators.required),
      libro: new FormControl(null, Validators.required),
      legajo: new FormControl(null, Validators.required),
      circunscripcion: new FormControl(null, Validators.required),
      domicilioLegal: new FormGroup({
        tipo: new FormControl('Legal', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        piso: new FormControl(null, Validators.required),
        departamento: new FormControl(null, Validators.required),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        fecha: new FormControl(null, Validators.required),
      }),
      domicilioAnterior: new FormGroup({
        tipo: new FormControl('anterior', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        piso: new FormControl(null, Validators.required),
        departamento: new FormControl(null, Validators.required),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        fecha: new FormControl(null, Validators.required),
      }),
      domicilioReal: new FormGroup({
        tipo: new FormControl('real', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        piso: new FormControl(null, Validators.required),
        departamento: new FormControl(null, Validators.required),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        fecha: new FormControl(null, Validators.required),
      }),
      telefono1: new FormControl(null, Validators.required),
      telefono2: new FormControl(null, Validators.required),
      telefono3: new FormControl(null, Validators.required),
      fecha_recibido: new FormControl('2015-07-12', Validators.required),
      facultad: new FormControl(null, Validators.required),
      observacion: new FormControl('', Validators.required),
      email: new FormControl(null, [ Validators.required, Validators.email ] ),
      estado_id: new FormControl(null, Validators.required),
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

}
