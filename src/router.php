<?php

require "libs/config.php";
require "libs/router.php";
require "libs/database.php";
require "src/config.php";

$router=new Router();

$router->get('/test',function(){
	include "src/server.php";
});

$router->get('/','Juego@inicio');

// Usuario
$router->post('/user/register','User@register');
$router->post('/user/login','User@login');
$router->post('/user/cerrar','User@cerrar');

// Juego
$router->post('/juego/crear','Juego@crear');
$router->post('/juego/unirse','Juego@unirse');
$router->post('/juego/obtener','Juego@getGame');
$router->post('/juego/actualizar','Juego@updateGame');
$router->post('/juego/salir','Juego@salir');
$router->post('/juego/code',function(){
	view('json',[
		'json'=>[
			'code'=>$_SESSION['code']??null,
			'token'=>$_SESSION['token']??null
		]
	]);
});

$router->controller();

?>