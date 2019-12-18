<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombres',
        'apellidos',
        'tipo_doc',
        'numero_doc',
        'cuit_cuil',
        'fecha_nac',
        'localidad_nac',
        'provincia_nac',
        'pais_nac',
        'sexo'
    ];
}
