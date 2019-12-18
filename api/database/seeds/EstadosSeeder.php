<?php

use App\Estado;
use Illuminate\Database\Seeder;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Estado::create(['codigo' => 'A', 'nombre' => 'Activo']);
        Estado::create(['codigo' => 'S', 'nombre' => 'Suspendiodo por Morosidad']);
        Estado::create(['codigo' => 'V', 'nombre' => 'Suspendido Voluntariamente']);
        Estado::create(['codigo' => 'D', 'nombre' => 'Sanción Disciplinaria']);
        Estado::create(['codigo' => 'I', 'nombre' => 'Incompatibilidad']);
        Estado::create(['codigo' => 'C', 'nombre' => 'Cancelado / Baja']);
        Estado::create(['codigo' => 'F', 'nombre' => 'Fallecido']);
        Estado::create(['codigo' => 'M', 'nombre' => 'Moroso']);
        Estado::create(['codigo' => 'H', 'nombre' => 'Activo Honorario']);
        Estado::create(['codigo' => 'E', 'nombre' => 'Denegado']);
    }
}
