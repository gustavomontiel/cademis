import { Direccion } from './direccion.model';
import { Persona } from './persona.model';

export class Colegiado {

  public persona: Persona;
  // tslint:disable-next-line: variable-name
  public num_matricula: number;
  // tslint:disable-next-line: variable-name
  public fecha_matricula: Date;
  public folio: string;
  public libro: string;
  public legajo: string;
  public circunscripcion: string;
  // tslint:disable-next-line: variable-name
  public fecha_recibido?: Date;
  public facultad?: string;
  public telefono1?: string;
  public telefono2?: string;
  public telefono3?: string;
  public email: string;
  // tslint:disable-next-line: variable-name
  public estado_id: number;
  public observacion?: string;
  public denuncias?: string;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;
  // tslint:disable-next-line: variable-name
  public domicilio_real?: Direccion;
  // tslint:disable-next-line: variable-name
  public domicilio_legal?: Direccion;

}
