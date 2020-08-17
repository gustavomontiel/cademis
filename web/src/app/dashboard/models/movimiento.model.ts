import { CuentaCorriente } from './cuenta_corriente';

export class Movimiento {

  // tslint:disable-next-line: variable-name
  public cta_cte: CuentaCorriente;
  public comprobante: string;
  public concepto: string;
  public anio: number;
  public descripcion: string;
  // tslint:disable-next-line: variable-name
  public fecha_vencimiento: string;
  public saldo?: number;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;

}
