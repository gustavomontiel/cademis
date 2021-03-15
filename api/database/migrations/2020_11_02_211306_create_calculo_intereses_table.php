<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use phpseclib\Math\BigInteger;

class CreateCalculoInteresesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calculo_intereses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('identificador', 100);
            $table->date('desde_fecha');
            $table->date('hasta_fecha')->nullable();
            $table->bigInteger('dias_mora')->nullable();
            $table->decimal('tasa', 10, 3)->nullable();
            $table->decimal('coeficiente', 10, 6)->nullable();
            $table->decimal('interes_calculado', 12, 2)->nullable();
            $table->decimal('interes_acumulado', 12, 2)->nullable();
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
        Schema::dropIfExists('calculo_intereses');
    }
}
