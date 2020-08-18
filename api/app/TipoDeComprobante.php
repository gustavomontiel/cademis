<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoDeComprobante extends Model
{
        /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tipos_de_comprobantes';

    protected $fillable = [
        'nombre'
    ];

    /**
     * Obtener los comprobantes asociados al Tipo de Comprobante
     */
    public function comprobantes()
    {
        return $this->hasMany('App\Comprobante');
    }
}
