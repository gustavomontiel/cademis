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
        'fecha_apertura',
        'fecha_cierre',
        'saldo'
    ];

    /**
     * Obtener el usuario de la caja
     */
    public function Usuario()
    {
        return $this->belongsTo('App\User');
    }
}
