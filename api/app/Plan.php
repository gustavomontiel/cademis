<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
       /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'planes';

    protected $fillable = [
        'nombre'
    ];

    /**
     * Obtener el estado de la obra social
     */
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }
    public function obraSocial()
    {
        return $this->belongsTo('App\ObraSocial');
    }
}
