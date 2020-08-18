<?php

namespace App\Http\Controllers;

use App\Colegiado;
use App\Concepto;
use App\CuentaCorriente;
use App\Movimiento;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    /**
     * Generar las cuotas de matrícula para todos los colegiados activos
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function generarCuotas(Request $request)
    {

        $input = $request->all();
        $anio = $input['anio'];
        $cuotas = $input['cuotas'];
        $importe = $input['importe'];

        $colegiados = Colegiado::whereHas('estado', function ($query) {$query->where('codigo', 'A');})->get();

        foreach ($colegiados as $colegiado) {
            $cuentaCorriente = CuentaCorriente::where('colegiado_id', $colegiado->id)->first();
            $concepto = Concepto::where('nombre', 'MATRICULA ANUAL')->first();

            for ($i=0; $i < $cuotas; $i++) { 
                $movimiento = new Movimiento();
                $movimiento->anio = $anio;
                $movimiento->descripcion = 'Cuota ' . ($i+1) . ' de matricula ' . $anio;
                $movimiento->fecha_vencimiento = date($anio . '/12/31');
                $movimiento->importe = $importe / $cuotas;
                $movimiento->saldo = $importe / $cuotas;
                $movimiento->estado = 'PENDIENTE';
                $movimiento->cuenta_corriente_id = $cuentaCorriente->id;
                $movimiento->concepto_id = $concepto->id;
                $movimiento->tipo_movimiento_id = $concepto->tipo_movimiento_id;
                $movimiento->save();
            }

            $cuentaCorriente->saldo_matricula += $importe;
            $cuentaCorriente->saldo += $importe;
            $cuentaCorriente->save();
            
        }

        return response()->json(['error' => 'false', 'message' => 'Cuotas generadas correctamente.']);
    }
}
