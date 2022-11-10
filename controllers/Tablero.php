<?php

namespace controllers;

use models;

class Tablero{

	/*
	Ejemplo de acceder a modelos
	public $model;

	public function __construct(){
		$this->model=new models\Tablero();
	}
	*/

	public function agregar($request){
		view('json',['json'=>$request->post('tablero')]);
	}

}

?>