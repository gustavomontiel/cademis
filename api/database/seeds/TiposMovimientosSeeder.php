<?php

use App\TipoMovimiento;
use Illuminate\Database\Seeder;

class TiposMovimientosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TipoMovimiento::create(['nombre' => 'DEBITO', 'operacion' => 'RESTA']);
        TipoMovimiento::create(['nombre' => 'CREDITO', 'operacion' => 'SUMA']);
    }
}
