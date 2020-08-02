<?php

namespace App\Http\Controllers;


use App\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $planes = Plan::all();

        if (count($planes) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen planes cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $planes, 'message' => 'Planes enviados correctamente.']);
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
            'nombre' => 'required|string|unique:planes,nombre',
            'obra_social_id' => 'numeric',
            'estado_id' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $plan = Plan::create($input);

        return response()->json(['error' => 'false', 'data' => $plan, 'message' => 'Plan ' . $plan->nombre . ' creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $plan = Plan::find($id);

        if (is_null($plan)) {
            return response()->json(['error' => 'true', 'message' => 'Plan no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $plan, 'message' => 'Plan enviado correctamente.']);
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
        $plan = Plan::find($id);

        if (is_null($plan)) {
            return response()->json(['error' => 'true', 'message' => 'Plan no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'nombre' => 'required|string|unique:planes,nombre',
            'estado_id' => 'numeric',
            'obra_social_id' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['nombre'])) $plan->nombre = $input['nombre'];
        if (isset($input['estado_id'])) $plan->estado_id = $input['estado_id'];
        if (isset($input['obra_social_id'])) $plan->obra_social_id = $input['obra_social_id'];


        $plan->save();

        return response()->json(['error' => 'false', 'data' => $plan, 'message' => 'Plan actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $plan = Plan::find($id);

        if (is_null($plan)) {
            return response()->json(['error' => 'true', 'message' => 'Plan no encontrado.'], 404);
        }

        $plan->delete();

        return response()->json(['error' => 'false', 'message' => 'Plan eliminado correctamente.']);
    }
}
