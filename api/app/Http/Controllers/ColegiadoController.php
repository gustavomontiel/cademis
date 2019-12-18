<?php

namespace App\Http\Controllers;

use App\Colegiado;
use App\Direccion;
use App\Persona;
use Illuminate\Http\Request;
use Validator;

class ColegiadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $colegiados = Colegiado::all();

        if (count($colegiados) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen colegiados cargados en el sistema.']);
        }

        $colegiados->load('persona');

        return response()->json(['error' => 'false', 'data' => $colegiados, 'message' => 'Colegiados enviados correctamente.']);
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
            'fecha_matricula' => 'required|date',
            'num_matricula' => 'required|unique:colegiados,num_matricula',
            'libro' => 'numeric',
            'folio' => 'numeric',
            'legajo' => 'numeric',
            'fecha_recibido' => 'date',
            'email' => 'email',
            'observacion' => 'string|max:5000',
            /*
        'persona_id',
        'circunscripcion',
        'facultad',
        'estado_id',
*/
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $persona = new Persona($input['persona']);
        unset($input['persona']);
        $domicilioReal = new Direccion($input['domicilio_real']);
        unset($input['domicilio_real']);
        $domicilioLegal = new Direccion($input['domicilio_legal']);
        unset($input['domicilio_legal']);

        $colegiado = Colegiado::create($input);

        $colegiado->persona()->save($persona);
        $colegiado->domicilioReal()->save($domicilioReal);
        $colegiado->domicilioLegal()->save($domicilioLegal);

        return response()->json(['error' => 'false', 'data' => $colegiado, 'message' => 'Colegiado creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $colegiado = Colegiado::where('id', $id)
                                ->with(['persona',
                                        'domicilioReal' => function ($query) {$query->where('tipo', 'REAL');},
                                        'domicilioLegal' => function ($query) {$query->where('tipo', 'LEGAL');}])
                                ->first();

        if (is_null($colegiado)) {
            return response()->json(['error' => 'true', 'message' => 'Colegiado no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $colegiado, 'message' => 'Colegiado enviado correctamente.']);
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
        $colegiado = Colegiado::find($id);

        if (is_null($colegiado)) {
            return response()->json(['error' => 'true', 'message' => 'Colegiado no encontrado.']);
        }

        $colegiado->delete();

        return response()->json(['error' => 'false', 'message' => 'Colegiado eliminado correctamente.']);
    }
}
