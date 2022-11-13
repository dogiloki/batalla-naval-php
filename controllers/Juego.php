<?php

namespace controllers;

use models;

class Juego{

	public function __construct(){
		$this->model=new models\Juego();
		$this->model_user=new models\User();
	}

	public function inicio(){
		if($this->model_user->validadToken($_SESSION['token']??null)){
			view('index',['session'=>true]);
		}else{
			view('index');
		}
		
	}

}

?>