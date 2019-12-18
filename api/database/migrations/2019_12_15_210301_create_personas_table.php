<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('tipo_doc');
            $table->bigInteger('numero_doc');
            $table->string('cuit_cuil')->nullable();
            $table->date('fecha_nac')->nullable();
            $table->string('localidad_nac')->nullable();
            $table->string('provincia_nac')->nullable();
            $table->string('pais_nac')->nullable();
            $table->string('sexo')->nullable();
            $table->bigInteger('colegiado_id')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personas');
    }
}
