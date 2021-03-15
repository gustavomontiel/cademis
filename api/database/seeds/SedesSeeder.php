<?php

use App\Sede;
use Illuminate\Database\Seeder;

class SedesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Sede::create(['nombre' => 'Sede Central', 'tipo' => 'Sede', 'direccion' => 'Santa Fe ...', 'municipio' => 'Posadas']);
        Sede::create(['nombre' => 'Palacio de Justicia', 'tipo' => 'Subdelegación', 'direccion' => 'Santa Catalina ...', 'municipio' => 'Posadas']);
        Sede::create(['nombre' => 'Puerto Rico', 'tipo' => 'Delegación', 'direccion' => 'Santa Fe ...', 'municipio' => 'Puerto Rico']);
        Sede::create(['nombre' => 'Eldorado', 'tipo' => 'Delegación', 'direccion' => 'Santa Fe ...', 'municipio' => 'Eldorado']);
        Sede::create(['nombre' => 'Oberá', 'tipo' => 'Delegación', 'direccion' => 'Santa Fe ...', 'municipio' => 'Oberá']);
        Sede::create(['nombre' => 'Leandro N. Alem', 'tipo' => 'Subdelegación', 'direccion' => 'Santa Fe ...', 'municipio' => 'Leandro N. Alem']);
        Sede::create(['nombre' => 'San Vicente', 'tipo' => 'Subdelegación', 'direccion' => 'Santa Fe ...', 'municipio' => 'San Vicente']);
        Sede::create(['nombre' => 'Puerto Iguazú', 'tipo' => 'Subdelegación', 'direccion' => 'Santa Fe ...', 'municipio' => 'Puerto Iguazú']);
    }
}
