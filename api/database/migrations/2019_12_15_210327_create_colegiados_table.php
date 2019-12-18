<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateColegiadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('colegiados', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('fecha_matricula');
            $table->bigInteger('num_matricula');
            $table->bigInteger('libro')->nullable();
            $table->bigInteger('folio')->nullable();
            $table->bigInteger('legajo')->nullable();
            $table->string('circunscripcion');
            $table->date('fecha_recibido')->nullable();
            $table->string('facultad')->nullable();
            $table->bigInteger('domicilio_real_id')->nullable();
            $table->bigInteger('domicilio_legal_id')->nullable();
            $table->string('telefono1');
            $table->string('telefono2')->nullable();
            $table->string('telefono3')->nullable();
            $table->string('email');
            $table->bigInteger('estado_id')->nullable();
            $table->string('observacion', 5000)->nullable();
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
        Schema::dropIfExists('colegiados');
    }
}
