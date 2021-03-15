<?php

use App\TipoMovimientoCaja;
use Illuminate\Database\Seeder;

class TiposMovimientosCajaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TipoMovimientoCaja::create(['nombre' => 'SALDO INICIAL', 'operacion' => 'SUMA']);
        TipoMovimientoCaja::create(['nombre' => 'INGRESO', 'operacion' => 'SUMA']);
        TipoMovimientoCaja::create(['nombre' => 'EGRESO', 'operacion' => 'RESTA']);
        TipoMovimientoCaja::create(['nombre' => 'COBRO DE CUOTA', 'operacion' => 'SUMA']);
        TipoMovimientoCaja::create(['nombre' => 'VENTA DE TASA DE JUSTICIA', 'operacion' => 'SUMA']);
        TipoMovimientoCaja::create(['nombre' => 'COBRO DE OBRA SOCIAL', 'operacion' => 'SUMA']);
        TipoMovimientoCaja::create(['nombre' => 'DIFERENCIA POR CIERRE DE CAJA', 'operacion' => 'SUMA']);
    }
}
