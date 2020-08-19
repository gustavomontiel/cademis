import { Colegiado } from './colegiado.model';
import { Movimiento } from './movimiento.model';

export class CuentaCorriente {

  public colegiado: Colegiado;
  public movimientos: Movimiento[];
  // tslint:disable-next-line: variable-name
  public colegiado_id?: number;
  // tslint:disable-next-line: variable-name
  public saldo_matricula?: number;
  // tslint:disable-next-line: variable-name
  public saldo_obra_social?: number;
  public saldo?: number;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;
  // tslint:disable-next-line: variable-name
  public importe_pagado?: number;
  // tslint:disable-next-line: variable-name
  public pago_a_cuenta?: number;


  constructor() {
  }

  static ctacteFromJson( ctaCte: any ) {

    const newObj = new CuentaCorriente();
    newObj.colegiado = ctaCte.colegiado;
    newObj.colegiado_id = ctaCte.colegiado_id;
    newObj.saldo_matricula = ctaCte.saldo_matricula;
    newObj.saldo_obra_social = ctaCte.saldo_obra_social;
    newObj.saldo = ctaCte.saldo;
    newObj.created_at = ctaCte.created_at;
    newObj.updated_at = ctaCte.updated_at;
    newObj.id = ctaCte.id;
    newObj.importe_pagado = ctaCte.importe_pagado;
    newObj.pago_a_cuenta = ctaCte.pago_a_cuenta;
    newObj.movimientos = [];

    ctaCte.movimientos.forEach( mov => {
      const obj = Movimiento.movFromJson( mov );
      newObj.movimientos.push( obj );
    } );

    return newObj;

  }

}
