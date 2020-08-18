<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comprobante extends Model
{
    /**
     * Obtener el Tipo de Comprobante
     */
    public function tipoDeComprobante()
    {
        return $this->belongsTo('App\TipoDeComprobante');
    }
}
