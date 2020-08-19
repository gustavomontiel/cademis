
export class Movimiento {

  public id?: number;
  public anio?: number;
  public descripcion?: string;
  // tslint:disable-next-line: variable-name
  public fecha_vencimiento?: string;
  public importe?: number;
  public saldo?: number;
  public estado?: string;
  // tslint:disable-next-line: variable-name
  public cuenta_corriente_id?: number;
  // tslint:disable-next-line: variable-name
  public comprobante_id?: number;
  // tslint:disable-next-line: variable-name
  public concepto_id?: number;
  // tslint:disable-next-line: variable-name
  public tipo_movimiento_id?: number;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  // tslint:disable-next-line: variable-name
  public importe_pagado?: number;

  constructor() {
  }

  static movFromJson( mov: any ) {

    const newObj = new Movimiento();
    newObj.anio = mov.anio;
    newObj.descripcion = mov.descripcion;
    newObj.fecha_vencimiento = mov.fecha_vencimiento;
    newObj.importe = mov.importe;
    newObj.saldo = mov.saldo;
    newObj.estado = mov.estado;
    newObj.cuenta_corriente_id = mov.cuenta_corriente_id;
    newObj.comprobante_id = mov.comprobante_id;
    newObj.concepto_id = mov.concepto_id;
    newObj.tipo_movimiento_id = mov.tipo_movimiento_id;
    newObj.importe_pagado = mov.importe_pagado;

    return newObj;

  }

  get saldo_a_mostrar() {
    return this.tipo_movimiento_id === 2 ? this.saldo * -1 : this.saldo;
  }

  get importe_a_mostrar() {
    return this.tipo_movimiento_id === 2 ? this.importe * -1 : this.importe;
  }
}
