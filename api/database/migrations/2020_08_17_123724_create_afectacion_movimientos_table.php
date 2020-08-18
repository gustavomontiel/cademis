<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAfectacionMovimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('afectaciones_movimientos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('afectador');
            $table->bigInteger('afectado');
            $table->decimal('importe', 11, 2)->default(0);
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
        Schema::dropIfExists('afectaciones_movimientos');
    }
}
