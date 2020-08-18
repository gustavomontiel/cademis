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

}
