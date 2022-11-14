<?php

namespace controllers;

use models;

class Juego{

	public function __construct(){
		$this->model=new models\Juego();
		$this->model_user=new models\User();
	}

	public function inicio(){
		$token=$_SESSION['token']??null;
		if($this->model_user->validadToken($token)){
			view('tablero',['session'=>true,'user'=>$this->model_user->getUser($token)]);
		}else{
			view('index');
		}
	}

	public function crear($request){
		$params['json']=[
			'status'=>$this->model->crear($request)
		];
		view('json',$params);
	}

}

?>