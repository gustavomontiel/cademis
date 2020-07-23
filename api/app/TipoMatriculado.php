<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoMatriculado extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tipos_matriculados';

    protected $fillable = [
        'nombre',
        'descripcion'
    ];
}
