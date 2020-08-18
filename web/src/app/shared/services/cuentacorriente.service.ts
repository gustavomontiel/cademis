import { CuentaCorriente } from './../../dashboard/models/cuenta_corriente';
import { Injectable } from '@angular/core';
import { GenericCrudService } from 'src/app/shared/services/generic-crud.service';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CuentaCorrienteService {

  urlModel = '/cuentascorrientes';

  constructor(
    public crudService: GenericCrudService
  ) { }


  cuentaColegiado( id: string | number ) {

    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });


    const urlApi = this.crudService.getApiUrl() + this.urlModel + '/pendientes/' + id;

    return this.crudService.http.get( urlApi ).pipe(
      map( ( resp: any ) => {
        Swal.close();
        return resp;
      })
    );
  }

  confirmarPago( cuentaCorriente: CuentaCorriente) {
    console.log('va', cuentaCorriente);
    Swal.fire({
      text: 'Creando registro',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const urlApi = this.crudService.getApiUrl() + '/cobro/procesar';

    return this.crudService.http.post( urlApi, cuentaCorriente )
      .pipe(
        map( ( resp: any ) => {
          Swal.close();
          console.log('vuelve', cuentaCorriente);
          return resp;
        }),
        catchError( err => {
          console.log( 'error:', err );
          Swal.close();
          return throwError( err );
        })
      );

  }


}
