<?php

namespace App\Http\Controllers;

use App\AfectacionMovimiento;
use App\Colegiado;
use App\Comprobante;
use App\ComprobanteLinea;
use App\CuentaCorriente;
use App\Movimiento;
use App\TipoDeComprobante;
use Illuminate\Http\Request;

class CobroController extends Controller
{
    /**
     * Procesar un cobro de un colegiado
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function procesarCobro(Request $request)
    {
        $input = $request->all();

        $cuentaCorriente = CuentaCorriente::find($input['id']);

        if (is_null($cuentaCorriente)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta corriente no encontrada.']);
        }

        $tipo = TipoDeComprobante::where('nombre', 'RECIBO')->first();

        $comprobante = new Comprobante();
        date_default_timezone_set('America/Argentina/Buenos_Aires');
        $comprobante->fecha = date('Y-m-d');
        $comprobante->subtotal = $input['importe_pagado'];
        $comprobante->total = $input['importe_pagado'];
        $comprobante->tipo_de_comprobante_id = $tipo->id;
        $comprobante->save();

        if ($input['pago_a_cuenta'] == 0) {
            $movimientoCredito = new Movimiento();
            $movimientoCredito->cuenta_corriente_id = $cuentaCorriente->id;
            $movimientoCredito->comprobante_id = $comprobante->id;
            $movimientoCredito->anio = date('Y');
            $movimientoCredito->descripcion = 'COBRO';
            $movimientoCredito->fecha_vencimiento = date('Y-m-d');
            $movimientoCredito->importe = $input['importe_pagado'];
            $movimientoCredito->tipo_movimiento_id = 2;
            $movimientoCredito->estado = 'CANCELADO';
            $movimientoCredito->save();
        } else {
            $movimientoCredito = new Movimiento();
            $movimientoCredito->cuenta_corriente_id = $cuentaCorriente->id;
            $movimientoCredito->comprobante_id = $comprobante->id;
            $movimientoCredito->anio = date('Y');
            $movimientoCredito->descripcion = 'COBRO';
            $movimientoCredito->fecha_vencimiento = date('Y-m-d');
            $movimientoCredito->importe = $input['importe_pagado'];
            $movimientoCredito->saldo = $input['pago_a_cuenta'];
            $movimientoCredito->tipo_movimiento_id = 2;
            $movimientoCredito->estado = 'PENDIENTE';
            $movimientoCredito->save();
        }

        foreach ($input['movimientos'] as $movimiento) {
            $linea = new ComprobanteLinea();
            $linea->comprobante_id = $comprobante->id;
            $linea->cantidad = 1;
            $linea->descripcion = $movimiento['descripcion'] . ' ' . $movimiento['anio'];
            $linea->importe_unitario = $movimiento['importe_pagado'];
            $linea->importe_total = $linea->cantidad * $linea->importe_unitario;
            $linea->save();

            $afectacion = new AfectacionMovimiento();
            $afectacion->afectador = $movimientoCredito->id;
            $afectacion->afectado = $movimiento['id'];
            $afectacion->importe = $movimiento['importe_pagado'];
            $afectacion->save();

            $debito = Movimiento::find($movimiento['id']);
            $debito->saldo = $debito->saldo - $movimiento['importe_pagado'];
            if ($debito->saldo <= 0) {
                $debito->estado = 'CANCELADO';
            } else {
                $debito->estado = 'PAGADO PARCIALMENTE';
            }
            $debito->save();
        }


        if ($input['pago_a_cuenta'] > 0) {
            $linea = new ComprobanteLinea();
            $linea->comprobante_id = $comprobante->id;
            $linea->cantidad = 1;
            $linea->descripcion = 'PAGO A CUENTA';
            $linea->importe_unitario = $input['pago_a_cuenta'];
            $linea->importe_total = $linea->cantidad * $linea->importe_unitario;
            $linea->save();
        }

        $cuentaCorriente->saldo_matricula = $cuentaCorriente->saldo_matricula - $input['importe_pagado'];
        $cuentaCorriente->saldo = $cuentaCorriente->saldo - $input['importe_pagado'];
        $cuentaCorriente->save();


        return response()->json(['error' => 'false', 'data' => $comprobante, 'message' => 'Cobro procesado correctamente.']);
    }
}
