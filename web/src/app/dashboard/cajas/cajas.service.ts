import { Injectable } from '@angular/core';
import { GenericCrudService } from 'src/app/shared/services/generic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CajasService {

  urlModel = '/cajas';
  urlMovimiento = '/movimientocaja';

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


  // Movimientos
  getMovimientoById(id: string) {
    return this.crudService.getItemById( this.urlModel, id );
  }

  createMovimiento(item: any) {
    return this.crudService.createItem( this.urlMovimiento, item );
  }

  deleteMovimiento(item: any) {
    return this.crudService.deleteItem( this.urlMovimiento, item.id );
  }

}
