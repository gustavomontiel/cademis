import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from './usuario.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  getItems() {

    Swal.fire({
      text: 'Buscando datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = URL_SERVICIOS + '/users';

    return this.http.get(url).pipe(
      map((resp: any) => {
        Swal.close();
        return resp;
      })
    );
  }

  getItemById(id: string) {
    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = URL_SERVICIOS + '/users/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        Swal.close();
        return resp;
      })
    );
  }

  createItem(item: any) {

    Swal.fire({
      text: 'Creando registro',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = URL_SERVICIOS + '/users';

    return this.http.post(url, item)
      .pipe(
        map((resp: any) => {
          Swal.close();
          return resp;
        }),
        catchError(err => {
          console.log('error:', err);
          Swal.close();
          return throwError(err);
        })
      );
  }

  updateItem(item: any) {

    if (item.id) {

      Swal.fire({
        text: 'Actualizando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      let url = URL_SERVICIOS + '/users';
      url += '/' + item.id;

      return this.http.put(url, item)
      .pipe(
        map((resp: any) => {
          Swal.close();
          return resp;
        }),
        catchError(err => {
          console.log('Error:', err);
          Swal.close();
          return throwError(err);
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }


  deleteItem(item: Usuario) {

    Swal.fire({
      text: 'Procesando solicitud',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = URL_SERVICIOS + '/users/' + item.id;
    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          Swal.close();
          return resp;
        })
      );

  }
}
