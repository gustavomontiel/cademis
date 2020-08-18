<?php

use App\Concepto;
use Illuminate\Database\Seeder;

class ConceptosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Concepto::create(['nombre' => 'MATRICULA ANUAL', 'tipo_movimiento_id' => 1]);
    }
}
