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
        'importe',
        'caja_id',
        'tipo_movimiento_caja_id',
        'usuario_id'
    ];

    /**
     * Obtener el comprobante asociado
     */
    public function comprobante()
    {
        return $this->belongsTo('App\Comprobante');
    }

    /**
     * Obtener la caja asociada
     */
    public function caja()
    {
        return $this->belongsTo('App\Caja');
    }

    /**
     * Obtener el tipo de movimiento de caja asociado
     */
    public function tipoMovimientoCaja()
    {
        return $this->belongsTo('App\TipoMovimientoCaja');
    }

    /**
     * Obtener el usuario asociado al movimiento
     */
    public function usuario()
    {
        return $this->belongsTo('App\User');
    }
}
