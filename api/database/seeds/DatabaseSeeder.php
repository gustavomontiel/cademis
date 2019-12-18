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
        ]);
        User::createFromValues('Administrador', 'admin', 'admin@cademis.com', '123456')->assignRole('administrador');
        User::createFromValues('Usuario', 'user', 'user@cademis.com', '123456');
    }
}
