import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

export interface PuedeDesactivar {
  permitirSalirDeRuta: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: "root",
})
export class CanDeactivateGuard implements CanDeactivate<PuedeDesactivar> {

  static confirmaSalirDeRuta(forma: FormGroup): boolean | Promise<boolean> {
    
    if (forma.dirty) {
      return Swal.fire({
        title: "Salir",
        text: "Confirma salir y perder los cambios?",
        icon: "question",
        showCancelButton: true,
      }).then((result) => {
        return result.isConfirmed ? true : false;
      });
    } else {
      return true;
    }
    
  }

  canDeactivate(component: PuedeDesactivar) {
    return component.permitirSalirDeRuta
      ? component.permitirSalirDeRuta()
      : true;
  }
}
