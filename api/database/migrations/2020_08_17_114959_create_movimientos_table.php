<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimientos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('anio')->nullable();
            $table->string('descripcion');
            $table->date('fecha_vencimiento');
            $table->decimal('importe', 11, 2)->default(0);
            $table->decimal('saldo', 11, 2)->default(0);
            $table->string('estado')->default('PENDIENTE');
            $table->bigInteger('cuenta_corriente_id');
            $table->bigInteger('comprobante_id')->nullable();
            $table->bigInteger('concepto_id')->nullable();
            $table->bigInteger('tipo_movimiento_id');
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
        Schema::dropIfExists('movimientos');
    }
}
