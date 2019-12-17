import { Persona } from '../persona.model';

export class Colegiado {

  public persona: Persona;
  public numMatricula: number;
  public fechaMatricula: Date;
  public folio: string;
  public libro: string;
  public legajo: string;
  public cisrcunscripcion: string;
  public fechaRecibido: Date;
  public facultad: string;
  public telefono1: string;
  public telefono2: string;
  public telefono3: string;
  public email: string;
  public estado: number;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;

}
