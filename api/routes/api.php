<?php

/** @var Router $router */

use Laravel\Lumen\Routing\Router;

/* Public Routes */

$router->get('/', function () {
    return response()->json(['message' => 'Bienvenidos al backend del sistema de Cademis.']);
});

/* Auth Routes */
$router->group(['prefix' => 'auth', 'as' => 'auth'], function (Router $router) {

    /* Defaults */
    $router->post('/register', [
        'as' => 'register',
        'uses' => 'AuthController@register',
    ]);
    $router->post('/login', [
        'as' => 'login',
        'uses' => 'AuthController@login',
    ]);
    $router->get('/verify/{token}', [
        'as' => 'verify',
        'uses' => 'AuthController@verify'
    ]);

    /* Password Reset */
    $router->post('/password/forgot', [
        'as' => 'password.forgot',
        'uses' => 'AuthController@forgotPassword'
    ]);
    $router->post('/password/recover/{token}', [
        'as' => 'password.recover',
        'uses' => 'AuthController@recoverPassword'
    ]);

    /* Protected User Endpoint */
    $router->get('/user', [
        'uses' => 'AuthController@getUser',
        'as' => 'user',
        'middleware' => 'auth'
    ]);
});

/* Protected Routes */
$router->group(['middleware' => 'auth'], function (Router $router) {

    /* Colegiados Routes */

    $router->get('/colegiados', [
        'as' => 'colegiados.index',
        'uses' => 'ColegiadoController@index'
    ]);

    $router->post('/colegiados', [
        'as' => 'colegiados.store',
        'uses' => 'ColegiadoController@store'
    ]);

    $router->get('/colegiados/{id}', [
        'as' => 'colegiados.show',
        'uses' => 'ColegiadoController@show'
    ]);

    $router->put('/colegiados/{id}', [
        'as' => 'colegiados.update',
        'uses' => 'ColegiadoController@update'
    ]);

    $router->put('/colegiados/datos/{id}', [
        'as' => 'colegiados.agregarDatos',
        'uses' => 'ColegiadoController@agregarDatos'
    ]);

    $router->put('/colegiados/direccion/{id}', [
        'as' => 'colegiados.agregarDireccion',
        'uses' => 'ColegiadoController@agregarDireccion'
    ]);

    $router->delete('/colegiados/{id}', [
        'as' => 'colegiados.destroy',
        'uses' => 'ColegiadoController@destroy'
    ]);

    /* Cuentas Corrientes Routes */

    $router->get('/cuentascorrientes', [
        'as' => 'cuentascorrientes.index',
        'uses' => 'CuentaCorrienteController@index'
    ]);

    $router->post('/cuentascorrientes', [
        'as' => 'cuentascorrientes.store',
        'uses' => 'CuentaCorrienteController@store'
    ]);

    $router->get('/cuentascorrientes/{id}', [
        'as' => 'cuentascorrientes.show',
        'uses' => 'CuentaCorrienteController@show'
    ]);

    $router->get('/cuentascorrientes/colegiado/{idColegiado}', [
        'as' => 'cuentascorrientes.showByColegiado',
        'uses' => 'CuentaCorrienteController@showByColegiado'
    ]);

    $router->get('/cuentascorrientes/pendientes/{idColegiado}', [
        'as' => 'cuentascorrientes.showPendientesByColegiado',
        'uses' => 'CuentaCorrienteController@showPendientesByColegiado'
    ]);

    $router->put('/cuentascorrientes/{id}', [
        'as' => 'cuentascorrientes.update',
        'uses' => 'CuentaCorrienteController@update'
    ]);

    $router->delete('/cuentascorrientes/{id}', [
        'as' => 'cuentascorrientes.destroy',
        'uses' => 'CuentaCorrienteController@destroy'
    ]);

    /* Matrícula Routes */
    $router->post('/matricula/generarcuotas', [
        'as' => 'matricula.generarCuotas',
        'uses' => 'MatriculaController@generarCuotas'
    ]);

    /* Cobro Routes */
    $router->post('/cobro/procesar', [
        'as' => 'cobro.procesarCobro',
        'uses' => 'CobroController@procesarCobro'
    ]);

    /* Tipos de Matriculados Routes */

    $router->get('/tiposmatriculados', [
        'as' => 'tiposmatriculados.index',
        'uses' => 'TipoMatriculadoController@index'
    ]);

    $router->post('/tiposmatriculados', [
        'as' => 'tiposmatriculados.store',
        'uses' => 'TipoMatriculadoController@store'
    ]);

    $router->get('/tiposmatriculados/{id}', [
        'as' => 'tiposmatriculados.show',
        'uses' => 'TipoMatriculadoController@show'
    ]);

    $router->put('/tiposmatriculados/{id}', [
        'as' => 'tiposmatriculados.update',
        'uses' => 'TipoMatriculadoController@update'
    ]);

    $router->delete('/tiposmatriculados/{id}', [
        'as' => 'tiposmatriculados.destroy',
        'uses' => 'TipoMatriculadoController@destroy'
    ]);

    /* Obra Social Routes */

    $router->get('/obrassociales', [
        'as' => 'obrassociales.index',
        'uses' => 'ObraSocialController@index'
    ]);

    $router->post('/obrassociales', [
        'as' => 'obrassociales.store',
        'uses' => 'ObraSocialController@store'
    ]);

    $router->get('/obrassociales/{id}', [
        'as' => 'obrassociales.show',
        'uses' => 'ObraSocialController@show'
    ]);

    $router->put('/obrassociales/{id}', [
        'as' => 'obrassociales.update',
        'uses' => 'ObraSocialController@update'
    ]);

    $router->delete('/obrassociales/{id}', [
        'as' => 'obrassociales.destroy',
        'uses' => 'ObraSocialController@destroy'
    ]);

    /* Planes Routes */

    $router->get('/planes', [
        'as' => 'planes.index',
        'uses' => 'PlanController@index'
    ]);

    $router->post('/planes', [
        'as' => 'planes.store',
        'uses' => 'PlanController@store'
    ]);

    $router->get('/planes/{id}', [
        'as' => 'planes.show',
        'uses' => 'PlanController@show'
    ]);

    $router->put('/planes/{id}', [
        'as' => 'planes.update',
        'uses' => 'PlanController@update'
    ]);

    $router->delete('/planes/{id}', [
        'as' => 'planes.destroy',
        'uses' => 'PlanController@destroy'
    ]);

    /* Concepto Routes */

    $router->get('/conceptos', [
        'as' => 'conceptos.index',
        'uses' => 'ConceptoController@index'
    ]);

    $router->post('/conceptos', [
        'as' => 'conceptos.store',
        'uses' => 'ConceptoController@store'
    ]);

    $router->get('/conceptos/{id}', [
        'as' => 'conceptos.show',
        'uses' => 'ConceptoController@show'
    ]);

    $router->put('/conceptos/{id}', [
        'as' => 'conceptos.update',
        'uses' => 'ConceptoController@update'
    ]);

    $router->delete('/conceptos/{id}', [
        'as' => 'conceptos.destroy',
        'uses' => 'ConceptoController@destroy'
    ]);

    /* Tipo de Comprobante Routes */

    $router->get('/tiposdecomprobantes', [
        'as' => 'tiposdecomprobantes.index',
        'uses' => 'TipoDeComprobanteController@index'
    ]);

    $router->post('/tiposdecomprobantes', [
        'as' => 'tiposdecomprobantes.store',
        'uses' => 'TipoDeComprobanteController@store'
    ]);

    $router->get('/tiposdecomprobantes/{id}', [
        'as' => 'tiposdecomprobantes.show',
        'uses' => 'TipoDeComprobanteController@show'
    ]);

    $router->put('/tiposdecomprobantes/{id}', [
        'as' => 'tiposdecomprobantes.update',
        'uses' => 'TipoDeComprobanteController@update'
    ]);

    $router->delete('/tiposdecomprobantes/{id}', [
        'as' => 'tiposdecomprobantes.destroy',
        'uses' => 'TipoDeComprobanteController@destroy'
    ]);

    $router->group(['middleware' => 'role:administrador'], function (Router $router) {

        $router->get('/admin', function () {
            return response()->json(['message' => 'Eres un administrador.']);
        });

        /* Users Routes */
        $router->get('/users', [
            'as' => 'users.index',
            'uses' => 'UserController@index'
        ]);

        $router->get('/users/{id}', [
            'as' => 'users.show',
            'uses' => 'UserController@show'
        ]);

        $router->post('/users', [
            'as' => 'users.store',
            'uses' => 'UserController@store'
        ]);

        $router->put('/users/{id}', [
            'as' => 'users.update',
            'uses' => 'UserController@update'
        ]);

        $router->delete('/users/{id}', [
            'as' => 'users.destroy',
            'uses' => 'UserController@destroy'
        ]);

        /* Colegiados Routes */
        $router->post('/importarcolegiados', [
            'as' => 'colegiados.importarcolegiados',
            'uses' => 'ColegiadoController@importarcolegiados'
        ]);
    });
});
