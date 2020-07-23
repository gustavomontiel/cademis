<?php

namespace App\Http\Controllers;

use App\TipoMatriculado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipoMatriculadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipos = TipoMatriculado::all();

        if (count($tipos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen tipos de matriculados cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $tipos, 'message' => 'Tipos de matriculados enviados correctamente.']);
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
            'nombre' => 'required|string|unique:tipos_matriculados,nombre',
            'descripcion' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $tipo = TipoMatriculado::create($input);

        return response()->json(['error' => 'false', 'data' => $tipo, 'message' => 'Tipo de matriculado ' . $tipo->nombre . ' creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tipo = TipoMatriculado::find($id);

        if (is_null($tipo)) {
            return response()->json(['error' => 'true', 'message' => 'Tipo de matriculado no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $tipo, 'message' => 'Tipo de matriculado enviado correctamente.']);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
