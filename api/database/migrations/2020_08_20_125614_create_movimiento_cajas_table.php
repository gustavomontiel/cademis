<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovimientoCajasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimientos_cajas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('fecha');
            $table->string('observacion');
            $table->string('concepto');
            $table->string('tipo');
            $table->bigInteger('usuario_id')->nullable();
            $table->bigInteger('comprobante_id')->nullable();
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
        Schema::dropIfExists('movimientos_cajas');
    }
}
