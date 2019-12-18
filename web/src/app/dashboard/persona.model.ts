export class Persona {

  public nombres: string;
  public apellidos: string;
  public tipo_doc: string;
  public numero_doc: number;
  public cuit_cuil: number;
  public fecha_nac: Date;
  public localidad_nac: string;
  public provincia_nac: string;
  public pais_nac: string;
  public sexo: string;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;

}
