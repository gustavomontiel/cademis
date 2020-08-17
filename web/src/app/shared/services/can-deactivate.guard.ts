import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

export interface PuedeDesactivar {
  permitirSalirDeRuta: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<PuedeDesactivar>  {

  static confirmaSalirDeRuta(forma: FormGroup) {

    if (forma.dirty) {
      return Swal.fire({
        title: 'Salir',
        text: 'Confirma salir y perder los cambios?',
        icon: 'question',
        showCancelButton: true,
      }).then((result) => {
        console.log('result', result.value);
        return result.value ? result.value : false;
      });
    } else {
      return true;
    }

  }

  canDeactivate(component: PuedeDesactivar) {
    console.log('canDeactivate', component.permitirSalirDeRuta());
    return component.permitirSalirDeRuta ? component.permitirSalirDeRuta() : true;
  }

}
