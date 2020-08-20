<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Concepto extends Model
{
        /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'conceptos';

    protected $fillable = [
        'nombre',
        'orden'
    ];

    /**
     * Obtener el estado del tipo de movimiento
     */
    public function tipoDeMovimiento()
    {
        return $this->belongsTo('App\TipoMovimiento');
    }
}
