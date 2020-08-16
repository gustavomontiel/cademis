export class Persona {

  public nombres: string;
  public apellidos: string;
  // tslint:disable-next-line: variable-name
  public tipo_doc: string;
  // tslint:disable-next-line: variable-name
  public numero_doc: number;
  // tslint:disable-next-line: variable-name
  public cuit_cuil: string;
  // tslint:disable-next-line: variable-name
  public fecha_nac: Date;
  // tslint:disable-next-line: variable-name
  public localidad_nac: string;
  // tslint:disable-next-line: variable-name
  public provincia_nac: string;
  // tslint:disable-next-line: variable-name
  public pais_nac: string;
  public sexo: string;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;
  // tslint:disable-next-line: variable-name
  public colegiado_id?: number;
  public foto?: string|any;

}
