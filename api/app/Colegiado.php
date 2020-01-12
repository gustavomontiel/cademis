<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Colegiado extends Model
{
    protected $fillable = [
        'persona_id',
        'fecha_matricula',
        'num_matricula',
        'libro',
        'folio',
        'legajo',
        'circunscripcion',
        'fecha_recibido',
        'facultad',
        'telefono1',
        'telefono2',
        'telefono3',
        'email',
        'estado_id',
        'observacion'
    ];

    /**
     * Obtener la persona asociada al Colegiado
     */
    public function persona()
    {
        return $this->hasOne('App\Persona');
    }

    /**
     * Obtener la direccion real asociada al Colegiado
     */
    public function domicilioReal()
    {
        return $this->hasOne('App\Direccion');
    }

    /**
     * Obtener la direccion legal asociada al Colegiado
     */
    public function domicilioLegal()
    {
        return $this->hasOne('App\Direccion');
    }

    /**
     * Obtener las direcciones anteriores asociadas al Colegiado
     */
    public function domiciliosAnteriores()
    {
        return $this->hasMany('App\Direccion');
    }

    /**
     * Obtener el estado del Colegiado
     */
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

    /**
     * Obtener las cuentas corrientes asociadas al Colegiado
     */
    public function cuentasCorrientes()
    {
        return $this->hasMany('App\CuentaCorriente');
    }
}
