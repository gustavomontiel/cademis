<?php

namespace App\Http\Controllers;

use App\ObraSocial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ObraSocialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $obra = ObraSocial::all();

        if (count($obra) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen obras sociales cargadas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $obra, 'message' => 'Obras sociales enviadas correctamente.']);
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
            'nombre' => 'required|string|unique:obras_sociales,nombre',
            'sigla' => 'required|string',
            'estado_id' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $obra = ObraSocial::create($input);

        return response()->json(['error' => 'false', 'data' => $obra, 'message' => 'Obra social ' . $obra->nombre . ' creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { 
        $obra = ObraSocial::find($id);

        if (is_null($obra)) {
            return response()->json(['error' => 'true', 'message' => 'Obra social no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $obra, 'message' => 'Obra social enviada correctamente.']);
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
        $obra = ObraSocial::find($id);

        if (is_null($obra)) {
            return response()->json(['error' => 'true', 'message' => 'Obra social no encontrada.'], 404);
        }

        $validator = Validator::make($input, [
            'nombre' => 'required|string|unique:obras_sociales,nombre,' . $id,
            'sigla' => 'required|string',
            'estado_id'=> 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['nombre'])) $obra->nombre = $input['nombre'];
        if (isset($input['sigla'])) $obra->sigla = $input['sigla'];
        if (isset($input['estado_id'])) $obra->estado = $input['estado_id'];


        $obra->save();

        return response()->json(['error' => 'false', 'data' => $obra, 'message' => 'Obra social actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $obra = ObraSocial::find($id);

        if (is_null($obra)) {
            return response()->json(['error' => 'true', 'message' => 'Obra social no encontrada.'], 404);
        }

        $obra->delete();

        return response()->json(['error' => 'false', 'message' => 'Obra social eliminada correctamente.']);
    }
}
