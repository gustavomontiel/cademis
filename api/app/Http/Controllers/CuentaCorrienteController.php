<?php

namespace App\Http\Controllers;

use App\CuentaCorriente;
use Illuminate\Http\Request;
use Validator;

class CuentaCorrienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cuentas = CuentaCorriente::all();

        if (count($cuentas) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen cuentas corrientes cargadas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $cuentas, 'message' => 'Cuentas corrientes enviadas correctamente.']);
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
            'colegiado_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $cuentaCorriente = CuentaCorriente::create($input);

        return response()->json(['error' => 'false', 'data' => $cuentaCorriente, 'message' => 'Cuenta corriente creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cuentaCorriente = CuentaCorriente::where('id', $id)->first();

        if (is_null($cuentaCorriente)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta corriente no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $cuentaCorriente, 'message' => 'Cuenta corriente enviada correctamente.']);
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
        $cuentaCorriente = CuentaCorriente::find($id);

        if (is_null($cuentaCorriente)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta corriente no encontrada.'], 404);
        }

        $validator = Validator::make($input, [
            'saldo_matricula' => 'numeric',
            'saldo_obra_social' => 'numeric',
            'saldo' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['saldo_matricula'])) $cuentaCorriente->saldo_matricula = $input['saldo_matricula'];
        if (isset($input['saldo_obra_social'])) $cuentaCorriente->saldo_obra_social = $input['saldo_obra_social'];
        if (isset($input['saldo'])) $cuentaCorriente->saldo = $input['saldo'];

        $cuentaCorriente->save();

        return response()->json(['error' => 'false', 'data' => $cuentaCorriente, 'message' => 'Cuenta corriente actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cuentaCorriente = CuentaCorriente::find($id);

        if (is_null($cuentaCorriente)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta corriente no encontrada.']);
        }

        $cuentaCorriente->delete();

        return response()->json(['error' => 'false', 'message' => 'Cuenta corriente eliminada correctamente.']);
    }
}
