import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FormErrorHandlerService {

  constructor() { }

  fromServer(formulario: FormGroup, error: HttpErrorResponse) {

    if (error instanceof HttpErrorResponse) {

      const validationErrors = error.error.data || error.error;

      if (error.status === 422 || error.status === 400) {

        Object.keys(validationErrors).forEach(prop => {
          const formControl = formulario.get(prop);

          if (formControl) {
            formControl.setErrors({
              customMsgError: validationErrors[prop]
            });
          } else {
            formulario.setErrors({
              customMsgError: validationErrors[prop]
            });
          }
        });
      } else if ( error.status !== 200 && error.status !== 201 && error.status !== 204 ) {
        formulario.setErrors({
          customMsgError: error.message
        });

        Swal.fire(
          'Error interno',
          error.message,
          'error'
        );

      }
    }
  }

  fromLocal(formulario: FormGroup) {
    if (formulario.invalid) {

      Object.keys(formulario.controls).forEach(prop => {

        const formControl = formulario.get(prop);

        if (formControl instanceof FormControl) {

          if (!formControl.valid) {
            const msg = (formControl.errors.required && 'El dato es requerido') ||
              (formControl.errors.email && 'Email inválido') ||
              (formControl.errors.minLength && 'El dato debe ser más largo') ||
              (formControl.errors.maxLength && 'El dato debe ser más corto') ||
              (formControl.errors.pattern && 'Dato inválido, no cumple la forma') ||
              'Dato no válido';

            formControl.setErrors({
              customMsgError: msg
            });

          }

        } else if ( formControl instanceof FormGroup ) {
          this.fromLocal(formControl);
        }

      });
    }
  }
}

