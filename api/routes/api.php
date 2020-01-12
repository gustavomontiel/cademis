<?php

/** @var Router $router */

use Laravel\Lumen\Routing\Router;

/* Public Routes */

$router->get('/', function () {
    return response()->json(['message' => 'Welcome to Lumen API Starter']);
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

    $router->put('/cuentascorrientes/{id}', [
        'as' => 'cuentascorrientes.update',
        'uses' => 'CuentaCorrienteController@update'
    ]);

    $router->delete('/cuentascorrientes/{id}', [
        'as' => 'cuentascorrientes.destroy',
        'uses' => 'CuentaCorrienteController@destroy'
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
