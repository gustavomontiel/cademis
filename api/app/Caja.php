<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Caja extends Model
{
            /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cajas';

    protected $fillable = [
        'usuario_id',
        'fecha_apertura',
        'fecha_cierre',
        'saldo'
    ];

    /**
     * Obtener el usuario de la caja
     */
    public function usuario()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Obtener los movimientos de la caja
     */
    public function movimientos()
    {
        return $this->hasMany('App\MovimientoCaja');
    }
}
