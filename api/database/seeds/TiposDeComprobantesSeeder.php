<?php

use App\TipoDeComprobante;
use Illuminate\Database\Seeder;

class TiposDeComprobantesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TipoDeComprobante::create(['nombre' => 'RECIBO']);
    }
}
