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

// Juego
$router->post('/juego/crear','Juego@crear');
$router->post('/juego/obtener','Juego@getGame');

$router->controller();

?>