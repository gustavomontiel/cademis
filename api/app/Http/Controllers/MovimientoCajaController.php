<?php

namespace App\Http\Controllers;

use App\MovimientoCaja;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

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

        $movimiento_caja = MovimientoCaja::create($input);

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

        $movimiento_caja->delete();

        return response()->json(['error' => 'false', 'message' => 'Movimiento de caja eliminado correctamente.']);
    }
}
