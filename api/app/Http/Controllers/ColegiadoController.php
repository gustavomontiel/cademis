<?php

namespace App\Http\Controllers;

use App\Colegiado;
use App\Direccion;
use App\Http\Requests\CsvImportRequest;
use App\Persona;
use DateTime;
use Illuminate\Http\Request;
use Validator;
use GrahamCampbell\Flysystem\Facades\Flysystem;

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

        $colegiados->load(['persona', 'estado']);

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
            'fecha_matricula' => 'date',
            'num_matricula' => 'required|unique:colegiados,num_matricula',
            'libro' => 'string',
            'folio' => 'string',
            'legajo' => 'string',
            'circunscripcion' => 'string',
            'estado_id' => 'required|numeric|exists:estados,id',
            'persona.nombres' => 'string',
            'persona.apellidos' => 'string',
            'persona.tipo_doc' => 'string',
            'persona.numero_doc' => 'required|numeric',
            'persona.cuit_cuil' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $persona = new Persona($input['persona']);
        unset($input['persona']);
        // $domicilioReal = new Direccion($input['domicilio_real']);
        // unset($input['domicilio_real']);
        // $domicilioLegal = new Direccion($input['domicilio_legal']);
        // unset($input['domicilio_legal']);

        $colegiado = Colegiado::create($input);

        $colegiado->persona()->save($persona);
        // $colegiado->domicilioReal()->save($domicilioReal);
        // $colegiado->domicilioLegal()->save($domicilioLegal);

        $this->uploadFoto($colegiado, $request);

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
            ->with([
                'persona',
                'domicilioReal' => function ($query) {
                    $query->where('tipo', 'REAL');
                },
                'domicilioLegal' => function ($query) {
                    $query->where('tipo', 'LEGAL');
                },
                'domiciliosAnteriores' => function ($query) {
                    $query->where('tipo', 'LEGALANTERIOR')->orWhere('tipo', 'REALANTERIOR');
                },
                'estado', 'cuentasCorrientes'
            ])
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
        $colegiado = Colegiado::find($id);

        if (is_null($colegiado)) {
            return response()->json(['error' => 'true', 'message' => 'Colegiado no encontrado.']);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'fecha_matricula' => 'date',
            'num_matricula' => 'unique:colegiados,num_matricula,' . $id,
            'libro' => 'string',
            'folio' => 'string',
            'legajo' => 'string',
            'circunscripcion' => 'string',
            'estado_id' => 'numeric|exists:estados,id',
            'persona.nombres' => 'string',
            'persona.apellidos' => 'string',
            'persona.tipo_doc' => 'string',
            'persona.numero_doc' => 'numeric',
            'persona.cuit_cuil' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $persona = $input['persona'];
        unset($input['persona']);

        $colegiado->fill($input);
        $colegiado->save();

        $colegiado->persona->fill($persona);
        $colegiado->persona->save();

        $this->uploadFoto($colegiado, $request);

        return response()->json(['error' => 'false', 'data' => $colegiado, 'message' => 'Colegiado actualizado correctamente.']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function agregarDatos(Request $request, $id)
    {
        $colegiado = Colegiado::find($id);

        if (is_null($colegiado)) {
            return response()->json(['error' => 'true', 'message' => 'Colegiado no encontrado.']);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'telefono1' => 'string|nullable',
            'telefono2' => 'string|nullable',
            'telefono3' => 'string|nullable',
            'email' => 'email|nullable',
            'observacion' => 'string|max:5000|nullable',
            'denuncias' => 'string|max:5000|nullable',
            'persona.fecha_nac' => 'date|nullable',
            'persona.localidad_nac' => 'string|nullable',
            'persona.provincia_nac' => 'string|nullable',
            'persona.pais_nac' => 'string|nullable',
            'persona.sexo' => 'string|max:1|nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $persona = $input['persona'];
        unset($input['persona']);

        $colegiado->fill($input);
        $colegiado->save();

        $colegiado->persona->fill($persona);
        $colegiado->persona->save();

        return response()->json(['error' => 'false', 'data' => $colegiado, 'message' => 'Colegiado actualizado correctamente.']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function agregarDireccion(Request $request, $id)
    {
        $colegiado = Colegiado::where('id', $id)->with('persona')->first();

        if (is_null($colegiado)) {
            return response()->json(['error' => 'true', 'message' => 'Colegiado no encontrado.']);
        }
        
        $input = $request->all();

        $validator = Validator::make($input, [
            'domicilioReal.calle' => 'string|nullable',
            'domicilioReal.numero' => 'string|nullable',
            'domicilioReal.piso' => 'string|nullable',
            'domicilioReal.departamento' => 'string|nullable',
            'domicilioReal.localidad' => 'string|nullable',
            'domicilioReal.provincia' => 'string|nullable',
            'domicilioLegal.calle' => 'string|nullable',
            'domicilioLegal.numero' => 'string|nullable',
            'domicilioLegal.piso' => 'string|nullable',
            'domicilioLegal.departamento' => 'string|nullable',
            'domicilioLegal.localidad' => 'string|nullable',
            'domicilioLegal.provincia' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['domicilio_real'])) {
            $validator = Validator::make($input['domicilio_real'], [
                'calle' => 'string|required',
                'localidad' => 'string|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
            }
            $domicilioReal = $colegiado->domicilioReal()->where('tipo', 'REAL')->first();
            if ($domicilioReal) {
                $domicilioReal->fill(['tipo' => 'REALANTERIOR']);
                $domicilioReal->save();
            }
            $domicilioReal = new Direccion($input['domicilio_real']);
            $colegiado->domicilioReal()->save($domicilioReal);
        }

        if (isset($input['domicilio_legal'])) {
            $validator = Validator::make($input['domicilio_legal'], [
                'calle' => 'string|required',
                'localidad' => 'string|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
            }
            $domicilioLegal = $colegiado->domicilioLegal()->where('tipo', 'LEGAL')->first();
            if ($domicilioLegal) {
                $domicilioLegal->fill(['tipo' => 'LEGALANTERIOR']);
                $domicilioLegal->save();
            }
            $domicilioLegal = new Direccion($input['domicilio_legal']);
            $colegiado->domicilioLegal()->save($domicilioLegal);
        }
        
        return response()->json(['error' => 'false', 'data' => $colegiado, 'message' => 'Colegiado actualizado correctamente.']);
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

    /**
     * Guardar la foto del colegiado en el servidor.
     *
     * @param Colegiado $colegiado
     * @param Request  $request
     * @return Response
     */
    public function uploadFoto(Colegiado $colegiado, Request $request)
    {

        // IMAGEN PRINCIPAL
        $file = $request->file('persona.foto');
        if ($file) {
            $stream = fopen($file->getRealPath(), 'r+');
            Flysystem::putStream(
                'uploads/persona/' . $colegiado->persona->id . '/foto.' . $file->clientExtension(),
                $stream
            );
            fclose($stream);
            $colegiado->persona['foto'] = 'uploads/persona/' . $colegiado->persona->id . '/foto.' . $file->clientExtension();
            $colegiado->persona->save();

            return response()->json(['error' => 'false', 'message' => 'Imagenes guardadas correctamente']);
        }
    }

    /**
     * Importar colegiados de un csv exportado desde el sistema anterior.
     *
     * @param  CsvImportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function importarcolegiados(CsvImportRequest $request)
    {
        $path = $request->file('csv_file')->getRealPath();
        $data = array_map(function ($v) {
            return str_getcsv($v, ";");
        }, file($path));
        $cabecera = $data[0];
        $datos = array_slice($data, 1);
        Colegiado::truncate();
        Persona::truncate();
        Direccion::truncate();
        foreach ($datos as $row) {
            $colegiado = new Colegiado();
            $persona = new Persona();
            $domicilioReal = new Direccion();
            $domicilioReal->tipo = 'REAL';
            $domicilioLegal = new Direccion();
            $domicilioLegal->tipo = 'LEGAL';
            $domicilioLegalAnterior = new Direccion();
            $domicilioLegalAnterior->tipo = 'LEGALANTERIOR';
            for ($i = 0; $i < count($cabecera); $i++) {
                /*
                "matricula",
                "apeynombre",
                "codtipodoc",
                "nrodocum",
                "cuil",
                "fechanac",
                "nomlocanac",
                "codprovnac",
                "paisnac",
                "sexo",
                "nomcalle",
                "alturaleg",
                "pisoleg",
                "deptoleg",
                "nomlocaleg",
                "nomprovleg",
                "nomcalleant",
                "alturaant",
                "pisoant",
                "deptoant",
                "codlocant",
                "codprovant",
                "nomcallereal",
                "alturareal",
                "pisoreal",
                "deptoreal",
                "nomlocareal",
                "nomprovreal",
                "codte1",
                "te1",
                "codte2",
                "te2",
                "codte3",
                "te3",
                "email",
                "nromatfed",
                "fecmatfec",
                "libmatfed",
                "folmatfed",
                "descripcio",
                "fechamat",
                "nrolegajo",
                "descircuns",
                "codsituacion",
                "fechainac",
                "cargo",
                "feccargo"
                */
                switch ($cabecera[$i]) {
                    case 'matricula':
                        $colegiado->num_matricula = utf8_encode(trim($row[$i]));
                        break;
                    case 'apeynombre':
                        $apeynombre = explode(',', utf8_encode(trim($row[$i])));
                        if (count($apeynombre) > 1) {
                            $persona->apellidos = trim($apeynombre[0]);
                            $persona->nombres = trim($apeynombre[1]);
                        } else {
                            $nombres = explode(' ', utf8_encode(trim($row[$i])));
                            for ($index = 0; $index < count($nombres); $index++) {
                                if ($index == 0) {
                                    $persona->apellidos = trim($nombres[$index]);
                                } else {
                                    $persona->nombres .= trim($nombres[$index]) . ' ';
                                }
                            }
                            $persona->nombres = substr($persona->nombres, 0, -1);;
                        }
                        break;
                    case 'codtipodoc':
                        $persona->tipo_doc = utf8_encode(trim($row[$i]));
                        break;
                    case 'nrodocum':
                        $persona->numero_doc = str_replace(".", "", utf8_encode(trim($row[$i])));
                        break;
                    case 'cuil':
                        $persona->cuit_cuil = utf8_encode(trim($row[$i]));
                        break;
                    case 'fechanac':
                        $fechaNac = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
                        if (is_object($fechaNac)) {
                            $persona->fecha_nac = $fechaNac;
                        }
                        break;
                    case 'nomlocanac':
                        $persona->localidad_nac = utf8_encode(trim($row[$i]));
                        break;
                    case 'codprovnac':
                        $persona->provincia_nac = utf8_encode(trim($row[$i]));
                        break;
                    case 'paisnac':
                        $persona->pais_nac = utf8_encode(trim($row[$i]));
                        break;
                    case 'sexo':
                        $persona->sexo = utf8_encode(trim($row[$i]));
                        break;
                    case 'nomcalle':
                        $domicilioLegal->calle = utf8_encode(trim($row[$i]));
                        break;
                    case 'alturaleg':
                        $domicilioLegal->numero = utf8_encode(trim($row[$i]));
                        break;
                    case 'pisoleg':
                        $domicilioLegal->piso = utf8_encode(trim($row[$i]));
                        break;
                    case 'deptoleg':
                        $domicilioLegal->departamento = utf8_encode(trim($row[$i]));
                        break;
                    case 'nomlocaleg':
                        $domicilioLegal->localidad = utf8_encode(trim($row[$i]));
                        break;
                    case 'nomprovleg':
                        $domicilioLegal->provincia = utf8_encode(trim($row[$i]));
                        break;
                    case 'nomcalleant':
                        $domicilioLegalAnterior->calle = utf8_encode(trim($row[$i]));
                        break;
                    case 'alturaant':
                        $domicilioLegalAnterior->numero = utf8_encode(trim($row[$i]));
                        break;
                    case 'pisoant':
                        $domicilioLegalAnterior->piso = utf8_encode(trim($row[$i]));
                        break;
                    case 'deptoant':
                        $domicilioLegalAnterior->departamento = utf8_encode(trim($row[$i]));
                        break;
                    case 'codlocant':
                        $domicilioLegalAnterior->localidad = utf8_encode(trim($row[$i]));
                        break;
                    case 'codprovant':
                        $domicilioLegalAnterior->provincia = utf8_encode(trim($row[$i]));
                        break;
                    case 'nomcallereal':
                        $domicilioReal->calle = utf8_encode(trim($row[$i]));
                        break;
                    case 'alturareal':
                        $domicilioReal->numero = utf8_encode(trim($row[$i]));
                        break;
                    case 'pisoreal':
                        $domicilioReal->piso = utf8_encode(trim($row[$i]));
                        break;
                    case 'deptoreal':
                        $domicilioReal->departamento = utf8_encode(trim($row[$i]));
                        break;
                    case 'nomlocareal':
                        $domicilioReal->localidad = utf8_encode(trim($row[$i]));
                        break;
                    case 'nomprovreal':
                        $domicilioReal->provincia = utf8_encode(trim($row[$i]));
                        break;
                    case 'codte1':
                        $colegiado->telefono1 = utf8_encode(trim($row[$i]));
                        break;
                    case 'te1':
                        $colegiado->telefono1 .= utf8_encode(trim($row[$i]));
                        break;
                    case 'codte2':
                        $colegiado->telefono2 = utf8_encode(trim($row[$i]));
                        break;
                    case 'te2':
                        $colegiado->telefono2 .= utf8_encode(trim($row[$i]));
                        break;
                    case 'codte3':
                        $colegiado->telefono3 = utf8_encode(trim($row[$i]));
                        break;
                    case 'te3':
                        $colegiado->telefono3 .= utf8_encode(trim($row[$i]));
                        break;
                    case 'email':
                        $colegiado->email = utf8_encode(trim($row[$i]));
                        break;
                    case 'nromatfed':
                        $colegiado->num_mat_fed = utf8_encode(trim($row[$i]));
                        break;
                    case 'fecmatfec':
                        $fechamatfed = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
                        if (is_object($fechamatfed)) {
                            $colegiado->fecha_mat_fed = $fechamatfed;
                        }
                        break;
                    case 'libmatfed':
                        $colegiado->libro_mat_fed = utf8_encode(trim($row[$i]));
                        break;
                    case 'folmatfed':
                        $colegiado->folio_mat_fed = utf8_encode(trim($row[$i]));
                        break;
                    case 'fechamat':
                        $fechamat = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
                        if (is_object($fechamat)) {
                            $colegiado->fecha_matricula = $fechamat;
                        }
                        break;
                    case 'nrolegajo':
                        $colegiado->legajo = utf8_encode(trim($row[$i]));
                        break;
                    case 'descircuns':
                        $colegiado->circunscripcion = utf8_encode(trim($row[$i]));
                        break;
                    case 'codsituacion':
                        switch (utf8_encode(trim($row[$i]))) {
                            case 'A':
                                $colegiado->estado_id = 1;
                                break;
                            case 'S':
                                $colegiado->estado_id = 2;
                                break;
                            case 'V':
                                $colegiado->estado_id = 3;
                                break;
                            case 'D':
                                $colegiado->estado_id = 4;
                                break;
                            case 'I':
                                $colegiado->estado_id = 5;
                                break;
                            case 'C':
                                $colegiado->estado_id = 6;
                                break;
                            case 'F':
                                $colegiado->estado_id = 7;
                                break;
                            case 'M':
                                $colegiado->estado_id = 8;
                                break;
                            case 'H':
                                $colegiado->estado_id = 9;
                                break;
                            case 'E':
                                $colegiado->estado_id = 10;
                                break;
                        }
                        break;
                    case 'fechainac':
                        $fechainac = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
                        if (is_object($fechainac)) {
                            $colegiado->fecha_inactividad = $fechainac;
                        }
                        break;
                    case 'cargo':
                        $colegiado->cargo = utf8_encode(trim($row[$i]));
                        break;
                    case 'feccargo':
                        $feccargo = DateTime::createFromFormat('d/m/Y', utf8_encode(trim($row[$i])));
                        if (is_object($feccargo)) {
                            $colegiado->fecha_cargo = $feccargo;
                        }
                        break;
                }
            }
            $colegiado->save();
            $colegiado->persona()->save($persona);
            $colegiado->domicilioReal()->save($domicilioReal);
            $colegiado->domicilioLegal()->save($domicilioLegal);
            $colegiado->domiciliosAnteriores()->save($domicilioLegalAnterior);
            // return response()->json(['error' => 'false', 'colegiado' => $colegiado, 'persona' => $persona, 'domicilioReal' => $domicilioReal, 'domicilioLegal' => $domicilioLegal, 'domicilioLegalAnterior' => $domicilioLegalAnterior]);
        }
        return response()->json(['error' => 'false', 'message' => 'Colegiados importados correctamente']);
    }
}
