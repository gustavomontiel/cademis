<?php

namespace App\Http\Controllers;

use App\TasaPorDia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TasaPorDiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasas = TasaPorDia::all();

        if (count($tasas) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen tasas cargadas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $tasas, 'message' => 'Tasas enviadas correctamente.']);
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
            'tasa' => 'required|numeric',
            'fecha' => 'required|date|unique:tasas_por_dia,fecha'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $tasa = TasaPorDia::create($input);

        return response()->json(['error' => 'false', 'data' => $tasa, 'message' => 'Tasas creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tasa = TasaPorDia::find($id);

        if (is_null($tasa)) {
            return response()->json(['error' => 'true', 'message' => 'Tasa no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $tasa, 'message' => 'Tasa enviada correctamente.']);
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
        $tasa = TasaPorDia::find($id);

        if (is_null($tasa)) {
            return response()->json(['error' => 'true', 'message' => 'Tasa no encontrada.']);
        }

        $validator = Validator::make($input, [
            'tasa' => 'numeric',
            'fecha' => 'date|unique:tasas_por_dia,fecha,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['tasa'])) $tasa->tasa = $input['tasa'];
        if (isset($input['fecha'])) $tasa->fecha = $input['fecha'];


        $tasa->save();

        return response()->json(['error' => 'false', 'data' => $tasa, 'message' => 'Tasa actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tasa = TasaPorDia::find($id);

        if (is_null($tasa)) {
            return response()->json(['error' => 'true', 'message' => 'Tasa no encontrada.'], 404);
        }

        $tasa->delete();

        return response()->json(['error' => 'false', 'message' => 'Tasa eliminada correctamente.']);
    }
}
