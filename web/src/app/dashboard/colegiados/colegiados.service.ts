import { Injectable } from '@angular/core';
import { GenericCrudService } from 'src/app/shared/services/generic-crud.service';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColegiadosService {

  urlModel = '/colegiados';

  constructor(
    public crudService: GenericCrudService
  ) { }

  getItems() {
    return this.crudService.getItems( this.urlModel );
  }

  getItemById(id: string) {
    return this.crudService.getItemById( this.urlModel, id );
  }

  createItem(item: any) {
    return this.crudService.createItem( this.urlModel, item );
  }

  updateItem(item: any) {
    return this.crudService.updateItem( this.urlModel, item );
  }

  deleteItem(item: any) {
    return this.crudService.deleteItem( this.urlModel, item.id );
  }

  updateItemWithPost(item: any, id: string) {
    return this.crudService.updateItemWithPost( this.urlModel, item, id );
  }


  updateMasDatos( item: any ) {

    if ( item.id ) {

      Swal.fire({
        text: 'Actualizando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      const urlApi = this.crudService.getApiUrl() + '/' + this.urlModel + '/datos/' + item.id;
      return this.crudService.http.put( urlApi, item )
      .pipe(
        map((resp: any) => {
          Swal.close();
          return resp;
        }),
        catchError( err => {
          console.log( 'Error:', err );
          Swal.close();
          return throwError( err );
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }

  updateDirecciones( item: any ) {

    if ( item.id ) {

      Swal.fire({
        text: 'Actualizando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      const urlApi = this.crudService.getApiUrl() + '/' + this.urlModel + '/direccion/' + item.id;
      return this.crudService.http.put( urlApi, item )
      .pipe(
        map((resp: any) => {
          Swal.close();
          return resp;
        }),
        catchError( err => {
          console.log( 'Error:', err );
          Swal.close();
          return throwError( err );
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }

}
