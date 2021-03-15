<?php

namespace App\Http\Controllers;

use App\Caja;
use App\MovimientoCaja;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CajaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cajas = Caja::with('Usuario')->get();

        if (count($cajas) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen cajas cargadas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $cajas, 'message' => 'Cajas enviadas correctamente.']);
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
            'fecha_apertura' => 'date',
            'saldo' => 'numeric',
            'usuario_id' => 'numeric|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (empty($input['fecha_apertura'])) $input['fecha_apertura'] = Carbon::now()->toDateString();
        if (empty($input['usuario_id'])) $input['usuario_id'] = Auth::user()->id;

        $cajas = Caja::where('usuario_id', $input['usuario_id'])->whereNull('fecha_cierre')->get();

        if (count($cajas) > 0) {
            return response()->json(['error' => 'true', 'message' => 'Ya existe una caja abierta para ese usuario.'], 400);
        }

        // Si el saldo inicial es != 0 crear un movimiento por ese monto.
        $caja = Caja::create($input);

        if ($caja->saldo != 0) {
            $movimiento = new MovimientoCaja();
            $movimiento->caja_id = $caja->id;
            $movimiento->fecha = Carbon::now()->toDateString();
            $movimiento->usuario_id = $input['usuario_id'];
            $movimiento->importe = $input['saldo'];
            $movimiento->tipo_movimiento_caja_id = 1;
            $movimiento->observacion = 'Saldo inicial de la caja';
            $movimiento->save();
        }

        return response()->json(['error' => 'false', 'data' => $caja, 'message' => 'Caja ' . $caja->id . ' creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $caja = Caja::find($id);

        if (is_null($caja)) {
            return response()->json(['error' => 'true', 'message' => 'Caja no encontrada.']);
        }

        $caja->load(['usuario', 'movimientos.tipoMovimientoCaja']);

        return response()->json(['error' => 'false', 'data' => $caja, 'message' => 'Caja enviada correctamente.']);
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
        $caja = Caja::find($id);

        if (is_null($caja)) {
            return response()->json(['error' => 'true', 'message' => 'Caja no encontrada.'], 404);
        }

        $validator = Validator::make($input, [
            'fecha_apertura' => 'date',
            'fecha_cierre' => 'date',
            'saldo' => 'numeric',
            'usuario_id' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['fecha_apertura'])) $caja->fecha_apertura = $input['fecha_apertura'];
        if (isset($input['fecha_cierre'])) $caja->fecha_cierre = $input['fecha_cierre'];
        if (isset($input['saldo'])) $caja->saldo = $input['saldo'];
        if (isset($input['usuario_id'])) $caja->usuario_id = $input['usuario_id'];


        $caja->save();

        return response()->json(['error' => 'false', 'data' => $caja, 'message' => 'Caja actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $caja = Caja::find($id);

        if (is_null($caja)) {
            return response()->json(['error' => 'true', 'message' => 'Caja no encontrada.'], 404);
        }

        $caja->delete();

        return response()->json(['error' => 'false', 'message' => 'Caja eliminada correctamente.']);
    }

    /**
     * Cerrar una caja.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function cerrarCaja($id)
    {
        $caja = Caja::find($id);

        if (is_null($caja)) {
            return response()->json(['error' => 'true', 'message' => 'Caja no encontrada.'], 404);
        }

        if (!is_null($caja->fecha_cierre)) {
            return response()->json(['error' => 'true', 'message' => 'La caja ya se encuentra cerrada.'], 400);
        }

        $caja->fecha_cierre = Carbon::now()->toDateString();

        $caja->save();

        return response()->json(['error' => 'false', 'message' => 'Caja cerrada correctamente.']);
    }
}
