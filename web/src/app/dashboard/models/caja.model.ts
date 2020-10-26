import { MovimientoCaja } from './movimiento-caja.model';
import { Usuario } from "./usuario.model";

export class Caja {
  public id?: number;
  public fecha_apertura?: Date;
  public fecha_cierre?: Date;
  public usuario_id?: number;
  public saldo?: number;
  public created_at?: Date;
  public updated_at?: Date;
  public usuario?: Usuario;
  public movimientos?: MovimientoCaja[];
}
