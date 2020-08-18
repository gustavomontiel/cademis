<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CuentaCorriente extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cuentas_corrientes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'saldo_matricula',
        'saldo_obra_social',
        'saldo',
        'colegiado_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'saldo_matricula' => 'float',
        'saldo_obra_social' => 'float',
        'saldo' => 'float',
    ];

    public function colegiado()
    {
        return $this->belongsTo('App\Colegiado');
    }

    /**
     * Obtener los movimientos de la cuenta corriente
     */
    public function movimientos()
    {
        return $this->hasMany('App\Movimiento');
    }
}
