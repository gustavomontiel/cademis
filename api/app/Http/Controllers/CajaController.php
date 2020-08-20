<?php

namespace App\Http\Controllers;

use App\Caja;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class CajaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cajas = Caja::all();

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
            'fecha_cierre' => 'date',
            'saldo' => 'numeric',
            'usuario_id' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $caja = Caja::create($input);

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
            'fecha_apertura' => 'date',
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
}
