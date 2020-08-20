<?php

namespace App\Http\Controllers;

use App\Concepto;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ConceptoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $conceptos = Concepto::all();

        if (count($conceptos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen conceptos cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $conceptos, 'message' => 'Conceptos enviados correctamente.']);
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
            'nombre' => 'required|string|unique:conceptos,nombre',
            'tipo_movimiento_id' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $concepto = Concepto::create($input);

        return response()->json(['error' => 'false', 'data' => $concepto, 'message' => 'Concepto ' . $concepto->nombre . ' creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $concepto = Concepto::find($id);

        if (is_null($concepto)) {
            return response()->json(['error' => 'true', 'message' => 'Concepto no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $concepto, 'message' => 'Concepto enviado correctamente.']);
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
        $concepto = Concepto::find($id);

        if (is_null($concepto)) {
            return response()->json(['error' => 'true', 'message' => 'Concepto no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'nombre' => 'required|string|unique:conceptos,nombre',
            'tipo_movimiento_id' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['nombre'])) $concepto->nombre = $input['nombre'];
        if (isset($input['tipo_movimiento_id'])) $concepto->tipo_movimiento_id = $input['tipo_movimiento_id'];


        $concepto->save();

        return response()->json(['error' => 'false', 'data' => $concepto, 'message' => 'Concepto actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $concepto = Concepto::find($id);

        if (is_null($concepto)) {
            return response()->json(['error' => 'true', 'message' => 'Concepto no encontrado.'], 404);
        }

        $concepto->delete();

        return response()->json(['error' => 'false', 'message' => 'Concepto eliminado correctamente.']);
    }
}
