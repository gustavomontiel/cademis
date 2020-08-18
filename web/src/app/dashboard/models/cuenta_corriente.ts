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

  fromJson( ctaCte ) {
    const newObj = new CuentaCorriente(ctaCte);
    return newObj;
  }
  constructor( ctaCte ) {

    this.colegiado = ctaCte;
    this.colegiado_id = ctaCte.colegiado_id;

    this.saldo_matricula = ctaCte.saldo_matricula;

    this.saldo_obra_social = ctaCte.saldo_obra_social;
    this.saldo = ctaCte.saldo;
    this.created_at = ctaCte.created_at;
    this.updated_at = ctaCte.updated_at;
    this.id = ctaCte.id;

    this.importe_pagado = ctaCte.importe_pagado;
    this.pago_a_cuenta = ctaCte.pago_a_cuenta;

  }

}
