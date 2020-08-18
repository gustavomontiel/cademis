import { CuentaCorriente } from './cuenta_corriente';

export class Movimiento {

  public id?: number;
  public anio?: number;
  public descripcion: string;
  // tslint:disable-next-line: variable-name
  public fecha_vencimiento: string;
  public importe?: number;
  public saldo?: number;
  public estado: string;
  // tslint:disable-next-line: variable-name
  public cuenta_corriente_id?: number;
  // tslint:disable-next-line: variable-name
  public comprobante_id?: number;
  // tslint:disable-next-line: variable-name
  public concepto_id: number;
  // tslint:disable-next-line: variable-name
  public tipo_movimiento_id: number;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  // tslint:disable-next-line: variable-name
  public importe_pagado?: number;

  constructor(
  ) {
    this.estado = 'PENDIENTE';
  }
}
