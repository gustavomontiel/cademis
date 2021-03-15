import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Colegiado } from '../../models/colegiado.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';

@Component({
  selector: 'app-colegiados-create',
  templateUrl: './colegiados-create.component.html',
  styleUrls: ['./colegiados-create.component.scss']
})
export class ColegiadosCreateComponent implements OnInit {

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
        nombres: new FormControl('Gustavo', [Validators.required]),
        apellidos: new FormControl('Montiel', [Validators.required]),
        tipo_doc: new FormControl('DNI', [Validators.required]),
        numero_doc: new FormControl(24819843, [Validators.required]),
        cuit_cuil: new FormControl('20248198436', [Validators.required]),
        foto: new FormControl(null),
      }),
      num_matricula: new FormControl(9999, Validators.required),
      fecha_matricula: new FormControl('2020-09-24', Validators.required),
      folio: new FormControl('1', Validators.required),
      libro: new FormControl('1', Validators.required),
      legajo: new FormControl('9999'),
      circunscripcion: new FormControl('Posadas', Validators.required),
      estado_id: new FormControl(1),
    });

  }

  createItem() {

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
        formData.append(`persona[foto]`, this.forma.get('persona.foto').value);

        this.colegiadosService.createItem(formData).subscribe(
          resp => {
            this.forma.markAsPristine();
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
    return CanDeactivateGuard.confirmaSalirDeRuta(this.forma);
  }

}
