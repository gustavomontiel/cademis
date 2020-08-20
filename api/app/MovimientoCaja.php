<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MovimientoCaja extends Model
{
        /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'movimientos_cajas';

    protected $fillable = [
        'fecha',
        'tipo',
        'concepto',
        'observacion',
        'importe'
    ];

    /**
     * Obtener el comprobante asociado
     */
    public function comprobante()
    {
        return $this->belongsTo('App\Comprobante');
    }
}
