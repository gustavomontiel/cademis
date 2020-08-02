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
        'tipo_de_comprobante_id'
    ];

    /**
     * Obtener el estado de la obra social
     */
    public function tipoDeComprobante()
    {
        return $this->belongsTo('App\TipoDeComprobante');
    }
}
