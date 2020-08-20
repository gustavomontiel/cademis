<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ObraSocial extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'obras_sociales';

    protected $fillable = [
        'nombre',
        'sigla'
    ];

    /**
     * Obtener el estado de la obra social
     */
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }
}
