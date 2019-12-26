import { Component, OnInit } from '@angular/core';
import { Colegiado } from '../../models/colegiado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-colegiado',
  templateUrl: './editar-colegiado.component.html',
  styleUrls: ['./editar-colegiado.component.scss']
})
export class EditarColegiadoComponent implements OnInit {

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
        id: new FormControl(null),
        colegiado_id: new FormControl(null),
        nombres: new FormControl(null, [Validators.required]),
        apellidos: new FormControl(null, [Validators.required]),
        tipo_doc: new FormControl(null, [Validators.required]),
        numero_doc: new FormControl(null, [Validators.required]),
        cuit_cuil: new FormControl(null, [Validators.required]),
        fecha_nac: new FormControl(null, [Validators.required]),
        localidad_nac: new FormControl(null, [Validators.required]),
        provincia_nac: new FormControl(null, [Validators.required]),
        pais_nac: new FormControl(null, [Validators.required]),
        sexo: new FormControl(null, [Validators.required]),
        created_at: new FormControl(null),
        updated_at: new FormControl(null),
      }),
      id: new FormControl(null),
      num_matricula: new FormControl(null, Validators.required),
      fecha_matricula: new FormControl(null, Validators.required),
      folio: new FormControl(null, Validators.required),
      libro: new FormControl(null, Validators.required),
      legajo: new FormControl(null),
      circunscripcion: new FormControl(null, Validators.required),
      created_at: new FormControl(null),
      updated_at: new FormControl(null),
      domicilio_legal_id: new FormControl(null),
      domicilio_legal: new FormGroup({
        id: new FormControl(null, [Validators.required]),
        tipo: new FormControl('Legal', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        pais: new FormControl(null),
        colegiado_id: new FormControl(null),
        // fecha: new FormControl(null, Validators.required),
        created_at: new FormControl(null),
        updated_at: new FormControl(null),
      }),
      domicilio_real_id: new FormControl(null),
      domicilio_real: new FormGroup({
        id: new FormControl(null, [Validators.required]),
        tipo: new FormControl('real', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        pais: new FormControl(null),
        colegiado_id: new FormControl(null),
        // fecha: new FormControl(null, Validators.required),
        created_at: new FormControl(null),
        updated_at: new FormControl(null),
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

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });
  }

  leerItem(id: string) {

    this.colegiadosService.getItemById(id)
      .subscribe(resp => {
        this.colegiado = resp.data;
        console.log(this.colegiado);
        this.forma.setValue(this.colegiado);
      }
    );
  }

  guardarColegiado() {
    console.log('guardarColegiado()');
  }

}
