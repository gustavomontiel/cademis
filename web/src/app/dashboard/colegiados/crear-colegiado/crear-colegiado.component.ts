import { ColegiadosService } from './../colegiados.service';
import { Component, OnInit } from '@angular/core';
import { Colegiado } from '../colegiado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
        tipoDoc: new FormControl(null, [Validators.required]),
        numDoc: new FormControl(null, [Validators.required]),
        cuitCuil: new FormControl(null, [Validators.required]),
        fechaNacimiento: new FormControl(null, [Validators.required]),
        localidadNac: new FormControl(null, [Validators.required]),
        provinciaNac: new FormControl(null, [Validators.required]),
        paisNac: new FormControl(null, [Validators.required]),
        sexo: new FormControl(null, [Validators.required])
      }),
      numMatricula: new FormControl(null, Validators.required),
      fechaMatricula: new FormControl(null, Validators.required),
      folio: new FormControl(null, Validators.required),
      libro: new FormControl(null, Validators.required),
      legajo: new FormControl(null, Validators.required),
      cisrcunscripcion: new FormControl(null, Validators.required),
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
      email: new FormControl(null, [ Validators.required, Validators.email ] ),
    });

  }

  crearColegiado() {
    console.log();
  }

}
