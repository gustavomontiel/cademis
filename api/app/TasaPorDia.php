<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TasaPorDia extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasas_por_dia';

    protected $fillable = [
        'tasa', 'fecha'
    ];
}
