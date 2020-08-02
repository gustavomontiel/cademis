<?php

namespace App\Http\Controllers;

use App\TipoDeComprobante;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TipoDeComprobanteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tiposDeComprobantes = TipoDeComprobante::all();

        if (count($tiposDeComprobantes) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen tipos de comprobantes cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $tiposDeComprobantes, 'message' => 'Tipos de comprobantes enviados correctamente.']);
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
            'nombre' => 'required|string|unique:tipos_de_comprobantes,nombre',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $tipoDeComprobante = TipoDeComprobante::create($input);

        return response()->json(['error' => 'false', 'data' => $tipoDeComprobante, 'message' => 'Tipo de comprobante ' . $tipoDeComprobante->nombre . ' creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tipoDeComprobante = TipoDeComprobante::find($id);

        if (is_null($tipoDeComprobante)) {
            return response()->json(['error' => 'true', 'message' => 'Tipo de comprobante no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $tipoDeComprobante, 'message' => 'Tipo de comprobante enviado correctamente.']);
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
        $tipoDeComprobante = TipoDeComprobante::find($id);

        if (is_null($tipoDeComprobante)) {
            return response()->json(['error' => 'true', 'message' => 'Tipo de comprobante no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'nombre' => 'required|string|unique:tipos_de_comprobantes,nombre'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['nombre'])) $tipoDeComprobante->nombre = $input['nombre'];


        $tipoDeComprobante->save();

        return response()->json(['error' => 'false', 'data' => $tipoDeComprobante, 'message' => 'Tipo de comprobante actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tipoDeComprobante = TipoDeComprobante::find($id);

        if (is_null($tipoDeComprobante)) {
            return response()->json(['error' => 'true', 'message' => 'Tipo de comprobante no encontrado.'], 404);
        }

        $tipoDeComprobante->delete();

        return response()->json(['error' => 'false', 'message' => 'Tipo de comprobante eliminado correctamente.']);
    }
}
