<?php

namespace App\Http\Controllers;

use App\Caja;
use App\MovimientoCaja;
use App\TipoMovimientoCaja;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MovimientoCajaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movimientos = MovimientoCaja::all();

        if (count($movimientos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen movimientos de cajas cargadas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $movimientos, 'message' => 'Movimientos de cajas enviadas correctamente.']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'fecha' => 'date',
            'tipo_movimiento_caja_id' => 'required|numeric|exists:tipo_movimiento_cajas,id',
            'importe' => 'required|numeric',
            'comprobante_id' => 'numeric|exists:comprobantes,id',
            'caja_id' => 'required|numeric|exists:cajas,id',
            'usuario_id' => 'numeric|exists:users,id',
            'observacion'=>'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        // La caja debe estar abierta
        $caja = Caja::find($input['caja_id']);
        if (!is_null($caja->fecha_cierre)){
            return response()->json(['error' => 'true', 'message' => 'Caja cerrada.'], 400);
        }
        // Si el tipo de movimiento es de egreso el importe no puede superar al saldo de la caja
        $movimiento = TipoMovimientoCaja::find($input['tipo_movimiento_caja_id']);
        if ($movimiento->operacion == 'RESTA' && $input['importe'] > $caja->saldo) {
            return response()->json(['error' => 'true', 'message' => 'No se puede extraer un monto mayor al saldo de la caja.'], 400);
        }

        if (empty($input['fecha'])) $input['fecha'] = Carbon::now()->toDateString();
        if (empty($input['usuario_id'])) $input['usuario_id'] = Auth::user()->id;
        $movimiento_caja = MovimientoCaja::create($input);

        // Actualizar el saldo de la caja
        if ($movimiento->operacion == 'SUMA') {
            $caja->saldo += $input['importe'];
        } else {
            $caja->saldo -= $input['importe'];
        }
        $caja->save();

        return response()->json(['error' => 'false', 'data' => $movimiento_caja, 'message' => 'Movimiento de caja creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $movimiento_caja = MovimientoCaja::find($id);

        if (is_null($movimiento_caja)) {
            return response()->json(['error' => 'true', 'message' => 'Movimiento de caja no encontrada.']);
        }

        $movimiento_caja->load(['caja', 'tipoMovimientoCaja', 'usuario', 'comprobante']);

        return response()->json(['error' => 'false', 'data' => $movimiento_caja, 'message' => 'Movimiento de caja enviado correctamente.']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $movimiento_caja = MovimientoCaja::find($id);

        if (is_null($movimiento_caja)) {
            return response()->json(['error' => 'true', 'message' => 'Caja no encontrada.'], 404);
        }

        $validator = Validator::make($input, [
            'fecha' => 'date',
            'tipo' => 'string',
            'importe' => 'numeric',
            'comprobante_id' => 'numeric',
            'usuario_id' => 'numeric',
            'observacion'=>'string',
            'concepto'=>'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['fecha'])) $movimiento_caja->fecha = $input['fecha'];
        if (isset($input['tipo'])) $movimiento_caja->tipo = $input['tipo'];
        if (isset($input['importe'])) $movimiento_caja->importe = $input['importe'];
        if (isset($input['observacion'])) $movimiento_caja->observacion = $input['observacion'];
        if (isset($input['concepto'])) $movimiento_caja->concepto = $input['concepto'];
        if (isset($input['comprobante_id'])) $movimiento_caja->comprobante_id = $input['comprobante_id'];
        if (isset($input['usuario_id'])) $movimiento_caja->usuario_id = $input['usuario_id'];


        $movimiento_caja->save();

        return response()->json(['error' => 'false', 'data' => $movimiento_caja, 'message' => 'Movimiento de caja actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $movimiento_caja = MovimientoCaja::find($id);

        if (is_null($movimiento_caja)) {
            return response()->json(['error' => 'true', 'message' => 'Movimiento de caja no encontrado.'], 404);
        }

        $movimiento_caja->load('tipoMovimientoCaja');

        // Controlar que este abierta la caja y que no sea un movimiento automatico
        $caja = Caja::find($movimiento_caja->caja_id);
        if (!is_null($caja->fecha_cierre)){
            return response()->json(['error' => 'true', 'message' => 'Caja cerrada.'], 400);
        }
        
        // Actualizar el saldo de la caja
        if ($movimiento_caja->tipoMovimientoCaja->operacion == 'SUMA') {
            $caja->saldo -= $movimiento_caja->importe;
        } else {
            $caja->saldo += $movimiento_caja->importe;
        }
        $caja->save();
        
        $movimiento_caja->delete();
        
        return response()->json(['error' => 'false', 'message' => 'Movimiento de caja eliminado correctamente.']);
    }
}
