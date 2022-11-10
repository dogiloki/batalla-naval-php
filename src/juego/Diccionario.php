<?php

namespace src\juego;

class Diccionario{

	// Tipos de barcos
	public const DESTRUIDO=0;
	public const PORTAVIONES=1;
	public const SUBMARINO=2;
	public const DESTRUCTOR=3;
	public const FRAGATA=4;

	// Tipos de rotaciones
	public const ROTACION=[
		"min"=>0,
		"max"=>3,
		"sur"=>0,
		"este"=>1,
		"norte"=>2,
		"oeste"=>3,
		"izq"=>0,
		"der"=>1,
	];

	public const BARCOS=[

	];

}

?>