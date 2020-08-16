import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Colegiado } from '../../models/colegiado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-colegiados-update',
  templateUrl: './colegiados-update.component.html',
  styleUrls: ['./colegiados-update.component.scss']
})
export class ColegiadosUpdateComponent implements OnInit {

  colegiado: Colegiado;
  forma: FormGroup;
  imgURL: string | ArrayBuffer;

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
        nombres: new FormControl(null, [Validators.required]),
        apellidos: new FormControl(null, [Validators.required]),
        tipo_doc: new FormControl(null, [Validators.required]),
        numero_doc: new FormControl(null, [Validators.required]),
        cuit_cuil: new FormControl(null, [Validators.required]),
        foto: new FormControl(null),
      }),
      num_matricula: new FormControl(null, Validators.required),
      fecha_matricula: new FormControl(null, Validators.required),
      folio: new FormControl(null, Validators.required),
      libro: new FormControl(null, Validators.required),
      legajo: new FormControl(null),
      circunscripcion: new FormControl(null, Validators.required),
      estado_id: new FormControl(1),
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
        this.forma.patchValue(this.colegiado);
        this.imgURL = this.colegiadosService.crudService.getApiUrl() + '/' + this.colegiado.persona.foto;
      }
    );
  }

  updateItem() {

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

        const formData = new FormData();
        // Datos del colegiado
        formData.append('num_matricula', this.forma.get('num_matricula').value);
        formData.append('fecha_matricula', this.forma.get('fecha_matricula').value);
        formData.append('folio', this.forma.get('folio').value);
        formData.append('libro', this.forma.get('libro').value);
        formData.append('legajo', this.forma.get('legajo').value);
        formData.append('circunscripcion', this.forma.get('circunscripcion').value);
        formData.append('estado_id', this.forma.get('estado_id').value);
        formData.append('legajo', this.forma.get('legajo').value);

        // Datos de la persona
        formData.append(`persona[nombres]`, this.forma.get('persona.nombres').value);
        formData.append(`persona[apellidos]`, this.forma.get('persona.apellidos').value);
        formData.append(`persona[tipo_doc]`, this.forma.get('persona.tipo_doc').value);
        formData.append(`persona[numero_doc]`, this.forma.get('persona.numero_doc').value);
        formData.append(`persona[cuit_cuil]`, this.forma.get('persona.cuit_cuil').value);

        // tslint:disable-next-line: no-unused-expression
        this.forma.get('persona.foto').pristine &&
           this.forma.get('persona.foto').value &&
           formData.append(`persona[foto]`, this.forma.get('persona.foto').value);

        formData.append(`_method`, 'put');

        this.colegiadosService.updateItemWithPost( formData, this.colegiado.id.toString() ).subscribe(
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
          error => {
            // tslint:disable-next-line: no-unused-expression
            (error instanceof HttpErrorResponse) && this.formErrorHandlerService.fromServer(this.forma, error);
          }
        );
      }
    });
  }

  onFileChange(event: any, field: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.forma.get(field).setValue(file);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event1) => {
        this.imgURL = fileReader.result;
      };

    }

    this.cd.markForCheck();

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
