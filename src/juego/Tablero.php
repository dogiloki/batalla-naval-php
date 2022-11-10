<?php

namespace src\juego;

use src\juego\Casilla;

class Tablero{

	public function __construct($filas=10,$columnas=10){
		$this->filas=$filas;
		$this->columnas=$columnas;
		$this->casillas=[];
		$this->barcos=[];
		$this->seleccion_barco=null;
		$this->seleccion_valida=false;
	}

	private function generarTablero(){
		$this->casillas=[];
		for($a=0; $a<$this->filas; $a++){
			$this->casillas[$a]=[];
			for($b=0; $b<$this->columnas; $b++){
				$this->casillas[$a][$b]=new Casilla($a,$b);
			}
		}
	}

}

?>