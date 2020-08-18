<?php

use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RolesSeeder::class,
            EstadosSeeder::class,
            TiposMovimientosSeeder::class,
            ConceptosSeeder::class,
            TiposDeComprobantesSeeder::class,
        ]);
        User::createFromValues('Administrador', 'admin', 'admin@cademis.com', 'password')->assignRole('administrador');
        User::createFromValues('Usuario', 'user', 'user@cademis.com', 'password');
    }
}
