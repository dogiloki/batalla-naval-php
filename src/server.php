<?php

require "../libs/socket_temp.php";

$host="localhost";
$port=8000;

$socket=new Socket($host,$port);
$socket->listen(
	// Conexión nueva
	function($socket,$client){
		socket_getpeername($client,$ip);
		echo "\nConectado: ".$ip;
	},
	// Recibir mensaje de cualquier cliente
	function($socket,$client,$msg){
		$socket->send($msg);
	},
	// Desconexión
	function($socket,$client){
		socket_getpeername($client,$ip);
		socket_close($client);
		echo "\nDesconectado: ".$ip;
	}
);

?>