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
            TiposMovimientosCajaSeeder::class,
            SedesSeeder::class
        ]);
        User::createFromValues('Administrador', 'admin', 'admin@cademis.com', 'password')->assignRole('administrador');
        User::createFromValues('Fernando Orbe', 'fernandoorbe', 'fernandoorbe@cademis.com', 'orbe')->assignRole(['directivo', 'administrativo']);
        User::createFromValues('Antonio Lopez Forastier', 'antoniolopez', 'antoniolopez@cademis.com', 'lopez')->assignRole(['directivo', 'administrativo']);
        User::createFromValues('Claudia Lory', 'claudialory', 'claudialory@cademis.com', 'lory', 1)->assignRole(['administrativo', 'cajero']);
        User::createFromValues('Federico Rossano', 'federicorosanno', 'federicorosanno@cademis.com', 'rossano', 1)->assignRole(['administrativo', 'cajero']);
        User::createFromValues('Maximiliano Casoratti', 'maxicasoratti', 'maxicasoratti@cademis.com', 'casoratti', 1)->assignRole('administrativo');
        User::createFromValues('Sergio Cáceres', 'sergiocaceres', 'sergiocaceres@cademis.com', 'caceres', 1)->assignRole('cajero');
        User::createFromValues('Sebastián Cáceres', 'sebastiancaceres', 'sebastiancaceres@cademis.com', 'caceres', 2)->assignRole('cajero');
        User::createFromValues('Alicia Luckman', 'alicialuckman', 'alicialuckman@cademis.com', 'luckman', 3)->assignRole('cajero');
        User::createFromValues('Margarita Bernwald', 'margaritabernwald', 'margaritabernwald@cademis.com', 'bernwald', 4)->assignRole('cajero');
        User::createFromValues('Lorena Marin', 'lorenamarin', 'lorenamarin@cademis.com', 'marin', 4)->assignRole('cajero');
        User::createFromValues('Sandra Teresczcuch', 'sandrateresczcuch', 'sandrateresczcuch@cademis.com', 'teresczcuch', 5)->assignRole('cajero');
        User::createFromValues('María Emilia Agazzi', 'mariaagazzi', 'mariaagazzi@cademis.com', 'agazzi', 5)->assignRole('cajero');
        User::createFromValues('María de los Ángeles Ríos', 'mariarios', 'mariarios@cademis.com', 'rios', 6)->assignRole('cajero');
        User::createFromValues('Fabiana Venialgo', 'fabianavenialgo', 'fabianavenialgo@cademis.com', 'venialgo', 7)->assignRole('cajero');
        User::createFromValues('Rosana Baez', 'rosanabaez', 'rosanabaez@cademis.com', 'baez', 8)->assignRole('cajero');
    }
}
