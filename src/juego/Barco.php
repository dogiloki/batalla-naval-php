<?php

namespace src\juego;
use src\juego\Diccionario;

class Barco{

	public function __construct($tipo,$fila=0,$columna=0){
		$this->centro=[
			"fila"=>$fila,
			"columna"=>$columna,
		];
		$this->coordenadas=[];
		$this->rotacion=Diccionario::ROTACION['sur'];
		$this->direccion=Diccionario::ROTACION['izq'];
		$this->tipo=$tipo;
		$this->estructurar();
	}

	private function estructurar(){
		$fila=$this->centro['fila'];
		$columna=$this->centro['columna'];
		$tipo=$this->tipo;
		switch($tipo){
			case Diccionario::PORTAVIONES:{
				$this->coordenadas=[
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila,
						"columna"=>$columna
					],
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila+1,
						"columna"=>$columna
					],
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila+2,
						"columna"=>$columna
					],
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila+3,
						"columna"=>$columna
					]
				];
				break;
			}
			case Diccionario::SUBMARINO:{
				$this->coordenadas=[
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila,
						"columna"=>$columna
					],
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila+1,
						"columna"=>$columna
					],
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila+1,
						"columna"=>$columna+1
					]
				];
				break;
			}
			case Diccionario::DESTRUCTOR:{
				$this->coordenadas=[
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila,
						"columna"=>$columna
					],
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila+1,
						"columna"=>$columna
					]
				];
				break;
			}
			case Diccionario::FRAGATA:{
				$this->coordenadas=[
					[
						"destruido"=>false,
						"img"=>"assets/boats/1.png",
						"fila"=>$fila,
						"columna"=>$columna
					]
				];
				break;
			}
		}
		$this->reestructurar();
	}

	public function reestructurar($rotacion=null){
		$this->rotacion=$rotacion==null?$this->rotacion:$rotacion;
		foreach($this->coordenadas as $coord){
			$filas=$coord['fila']-$this->centro['fila'];
			$columnas=$coord['columna']-$this->centro['columna'];
			switch($rotacion){
				case Diccionario::ROTACION['sur']: $coord['fila']=$coord['fila']; $coord['columna']=$coord['columna']; break;
				case Diccionario::ROTACION['este']: $coord['fila']-=$filas+$columnas; $coord['columna']+=$filas-$columnas; break;
				case Diccionario::ROTACION['norte']: $coord['fila']-=$filas*2; $coord['columna']=$coord['columna']; break;
				case Diccionario::ROTACION['oeste']: $coord['fila']-=$filas+$columnas; $coord['columna']-=$filas+$columnas; break;
			}
		}
	}

	public function rotar($direccion,$rotacion=null){
		$rotacion??=$this->rotacion;
		$this->rotacion=UTIL::cambioNum($rotacion,Diccionario::ROTACION['min'],Diccionario::ROTACION['max'],$direccion);
		$this->direccion=$direccion;
	}

}

?>