<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCuentasCorrientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cuentas_corrientes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->decimal('saldo_matricula', 11, 2)->default(0);
            $table->decimal('saldo_obra_social', 11, 2)->default(0);
            $table->decimal('saldo', 11, 2)->default(0);
            $table->bigInteger('colegiado_id');
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
        Schema::dropIfExists('cuentas_corrientes');
    }
}
