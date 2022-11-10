<?php

require "libs/config.php";
require "libs/router.php";
require "libs/database.php";
require "src/config.php";

$router=new Router();

$router->get('/','Juego@inicio');

// Usuario
$router->post('/user/register','User@register');
$router->post('/user/login','User@login');

// Tablero
$router->post('/tablero/agregar','Tablero@agregar');

$router->controller();

?>