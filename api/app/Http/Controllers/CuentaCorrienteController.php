<?php

namespace App\Http\Controllers;

use App\Colegiado;
use App\Concepto;
use App\CuentaCorriente;
use App\Http\Requests\CsvImportRequest;
use App\Movimiento;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByColegiado($idColegiado)
    {
        $cuentaCorriente = CuentaCorriente::where('colegiado_id', $idColegiado)->with(['colegiado.persona', 'movimientos'])->first();

        if (is_null($cuentaCorriente)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta corriente no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $cuentaCorriente, 'message' => 'Cuenta corriente enviada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showPendientesByColegiado($idColegiado)
    {
        $cuentaCorriente = CuentaCorriente::where('colegiado_id', $idColegiado)
            ->with(['movimientos' => function ($query) {
                $query->where('estado', '<>', 'CANCELADO');
            }])
            ->with('colegiado.persona')
            ->first();

        if (is_null($cuentaCorriente)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta corriente no encontrada.']);
        }

        foreach ($cuentaCorriente->movimientos as $movimiento) {
            $movimiento->intereses = 0;
            if (date('Y-m-d') > $movimiento->fecha_vencimiento) {
                $descripcion = 'Matrícula: ' . $idColegiado . ' - ' . $movimiento->descripcion;
                $interes = DB::select('call sp_calcular_interes(?, ?, ?, ?)', array($descripcion, $movimiento->saldo, $movimiento->fecha_vencimiento, date('Y-m-d')));
                $movimiento->intereses += $interes[0]->interes_acumulado;
                $movimiento->saldo += $interes[0]->interes_acumulado;
            }
        }

        return response()->json(['error' => 'false', 'data' => $cuentaCorriente, 'message' => 'Cuenta corriente enviada correctamente.']);
    }

    /**
     * Importar cuentas corrientes de un csv exportado desde el sistema anterior.
     *
     * @param  CsvImportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function importarcuentascorrientes(CsvImportRequest $request)
    {
        $path = $request->file('csv_file')->getRealPath();
        $data = array_map(function ($v) {
            return str_getcsv($v, ";");
        }, file($path));
        $cabecera = $data[0];
        $datos = array_slice($data, 1);
        foreach ($datos as $row) {
            $idColegiado = utf8_encode(trim($row[0]));
            $cuentaCorriente = CuentaCorriente::where('colegiado_id', $idColegiado)->first();
            if ($cuentaCorriente) {
                $concepto = Concepto::where('nombre', 'MATRICULA ANUAL')->first();
                $movimiento = new Movimiento();
                $movimiento->anio = utf8_encode(trim($row[8]));
                $movimiento->descripcion = 'Cuota ' . utf8_encode(trim($row[9])) . ' de matricula ' . utf8_encode(trim($row[8]));
                $fecha_vencimiento = DateTime::createFromFormat('d/n/Y', utf8_encode(trim($row[17])));
                $movimiento->fecha_vencimiento = $fecha_vencimiento;
                $movimiento->importe = str_replace(",", ".", utf8_encode(trim($row[10])));
                $movimiento->saldo = str_replace(",", ".", utf8_encode(trim($row[11])));
                $movimiento->estado = 'PENDIENTE';
                $movimiento->cuenta_corriente_id = $cuentaCorriente->id;
                $movimiento->concepto_id = $concepto->id;
                $movimiento->tipo_movimiento_id = $concepto->tipo_movimiento_id;
                $movimiento->save();
                $cuentaCorriente->saldo_matricula += $movimiento->saldo;
                $cuentaCorriente->saldo += $movimiento->saldo;
                $cuentaCorriente->save();
            }

            // return response()->json(['error' => 'false', 'respuesta' => $movimiento]);
        }
        //     $colegiado = new Colegiado();
        //     $persona = new Persona();
        //     $domicilioReal = new Direccion();
        //     $domicilioReal->tipo = 'REAL';
        //     $domicilioLegal = new Direccion();
        //     $domicilioLegal->tipo = 'LEGAL';
        //     $domicilioLegalAnterior = new Direccion();
        //     $domicilioLegalAnterior->tipo = 'LEGALANTERIOR';
        //     for ($i = 0; $i < count($cabecera); $i++) {
        //         /*
        //         "matricula",
        //         "apeynombre",
        //         "codtipodoc",
        //         "nrodocum",
        //         "cuil",
        //         "fechanac",
        //         "nomlocanac",
        //         "codprovnac",
        //         "paisnac",
        //         "sexo",
        //         "nomcalle",
        //         "alturaleg",
        //         "pisoleg",
        //         "deptoleg",
        //         "nomlocaleg",
        //         "nomprovleg",
        //         "nomcalleant",
        //         "alturaant",
        //         "pisoant",
        //         "deptoant",
        //         "codlocant",
        //         "codprovant",
        //         "nomcallereal",
        //         "alturareal",
        //         "pisoreal",
        //         "deptoreal",
        //         "nomlocareal",
        //         "nomprovreal",
        //         "codte1",
        //         "te1",
        //         "codte2",
        //         "te2",
        //         "codte3",
        //         "te3",
        //         "email",
        //         "nromatfed",
        //         "fecmatfec",
        //         "libmatfed",
        //         "folmatfed",
        //         "descripcio",
        //         "fechamat",
        //         "nrolegajo",
        //         "descircuns",
        //         "codsituacion",
        //         "fechainac",
        //         "cargo",
        //         "feccargo"
        //         */
        //         switch ($cabecera[$i]) {
        //             case 'matricula':
        //                 $colegiado->num_matricula = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'apeynombre':
        //                 $apeynombre = explode(',', utf8_encode(trim($row[$i])));
        //                 if (count($apeynombre) > 1) {
        //                     $persona->apellidos = trim($apeynombre[0]);
        //                     $persona->nombres = trim($apeynombre[1]);
        //                 } else {
        //                     $nombres = explode(' ', utf8_encode(trim($row[$i])));
        //                     for ($index = 0; $index < count($nombres); $index++) {
        //                         if ($index == 0) {
        //                             $persona->apellidos = trim($nombres[$index]);
        //                         } else {
        //                             $persona->nombres .= trim($nombres[$index]) . ' ';
        //                         }
        //                     }
        //                     $persona->nombres = substr($persona->nombres, 0, -1);;
        //                 }
        //                 break;
        //             case 'codtipodoc':
        //                 $persona->tipo_doc = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nrodocum':
        //                 $persona->numero_doc = str_replace(".", "", utf8_encode(trim($row[$i])));
        //                 break;
        //             case 'cuil':
        //                 $persona->cuit_cuil = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'fechanac':
        //                 $fechaNac = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
        //                 if (is_object($fechaNac)) {
        //                     $persona->fecha_nac = $fechaNac;
        //                 }
        //                 break;
        //             case 'nomlocanac':
        //                 $persona->localidad_nac = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'codprovnac':
        //                 $persona->provincia_nac = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'paisnac':
        //                 $persona->pais_nac = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'sexo':
        //                 $persona->sexo = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nomcalle':
        //                 $domicilioLegal->calle = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'alturaleg':
        //                 $domicilioLegal->numero = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'pisoleg':
        //                 $domicilioLegal->piso = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'deptoleg':
        //                 $domicilioLegal->departamento = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nomlocaleg':
        //                 $domicilioLegal->localidad = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nomprovleg':
        //                 $domicilioLegal->provincia = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nomcalleant':
        //                 $domicilioLegalAnterior->calle = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'alturaant':
        //                 $domicilioLegalAnterior->numero = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'pisoant':
        //                 $domicilioLegalAnterior->piso = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'deptoant':
        //                 $domicilioLegalAnterior->departamento = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'codlocant':
        //                 $domicilioLegalAnterior->localidad = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'codprovant':
        //                 $domicilioLegalAnterior->provincia = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nomcallereal':
        //                 $domicilioReal->calle = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'alturareal':
        //                 $domicilioReal->numero = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'pisoreal':
        //                 $domicilioReal->piso = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'deptoreal':
        //                 $domicilioReal->departamento = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nomlocareal':
        //                 $domicilioReal->localidad = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nomprovreal':
        //                 $domicilioReal->provincia = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'codte1':
        //                 $colegiado->telefono1 = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'te1':
        //                 $colegiado->telefono1 .= utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'codte2':
        //                 $colegiado->telefono2 = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'te2':
        //                 $colegiado->telefono2 .= utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'codte3':
        //                 $colegiado->telefono3 = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'te3':
        //                 $colegiado->telefono3 .= utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'email':
        //                 $colegiado->email = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'nromatfed':
        //                 $colegiado->num_mat_fed = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'fecmatfec':
        //                 $fechamatfed = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
        //                 if (is_object($fechamatfed)) {
        //                     $colegiado->fecha_mat_fed = $fechamatfed;
        //                 }
        //                 break;
        //             case 'libmatfed':
        //                 $colegiado->libro_mat_fed = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'folmatfed':
        //                 $colegiado->folio_mat_fed = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'fechamat':
        //                 $fechamat = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
        //                 if (is_object($fechamat)) {
        //                     $colegiado->fecha_matricula = $fechamat;
        //                 }
        //                 break;
        //             case 'nrolegajo':
        //                 $colegiado->legajo = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'descircuns':
        //                 $colegiado->circunscripcion = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'codsituacion':
        //                 switch (utf8_encode(trim($row[$i]))) {
        //                     case 'A':
        //                         $colegiado->estado_id = 1;
        //                         break;
        //                     case 'S':
        //                         $colegiado->estado_id = 2;
        //                         break;
        //                     case 'V':
        //                         $colegiado->estado_id = 3;
        //                         break;
        //                     case 'D':
        //                         $colegiado->estado_id = 4;
        //                         break;
        //                     case 'I':
        //                         $colegiado->estado_id = 5;
        //                         break;
        //                     case 'C':
        //                         $colegiado->estado_id = 6;
        //                         break;
        //                     case 'F':
        //                         $colegiado->estado_id = 7;
        //                         break;
        //                     case 'M':
        //                         $colegiado->estado_id = 8;
        //                         break;
        //                     case 'H':
        //                         $colegiado->estado_id = 9;
        //                         break;
        //                     case 'E':
        //                         $colegiado->estado_id = 10;
        //                         break;
        //                 }
        //                 break;
        //             case 'fechainac':
        //                 $fechainac = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
        //                 if (is_object($fechainac)) {
        //                     $colegiado->fecha_inactividad = $fechainac;
        //                 }
        //                 break;
        //             case 'cargo':
        //                 $colegiado->cargo = utf8_encode(trim($row[$i]));
        //                 break;
        //             case 'feccargo':
        //                 $feccargo = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
        //                 if (is_object($feccargo)) {
        //                     $colegiado->fecha_cargo = $feccargo;
        //                 }
        //                 break;
        //         }
        //     }
        //     $colegiado->save();
        //     $colegiado->persona()->save($persona);
        //     $colegiado->domicilioReal()->save($domicilioReal);
        //     $colegiado->domicilioLegal()->save($domicilioLegal);
        //     $colegiado->domiciliosAnteriores()->save($domicilioLegalAnterior);
        //     $cuentaCorriente = new CuentaCorriente();
        //     $colegiado->cuentaCorriente()->save($cuentaCorriente);
        //     // return response()->json(['error' => 'false', 'colegiado' => $colegiado, 'persona' => $persona, 'domicilioReal' => $domicilioReal, 'domicilioLegal' => $domicilioLegal, 'domicilioLegalAnterior' => $domicilioLegalAnterior]);
        // }
        return response()->json(['error' => 'false', 'message' => 'Cuentas corrientes importadas correctamente']);
    }
}
