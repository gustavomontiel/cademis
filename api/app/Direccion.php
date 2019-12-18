<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'direcciones';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tipo',
        'calle',
        'numero',
        'piso',
        'departamento',
        'localidad',
        'provincia',
        'pais',
        'colegiado_id'
    ];
}
