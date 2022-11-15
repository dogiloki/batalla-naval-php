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
		$code=$_SESSION['code']??null;
		if(!$this->model->validadCode($code)){
			unset($_SESSION['code']);
			$code=null;
		}
		if($this->model_user->validadToken($token)){
			$params=[
				'session'=>true,
				'code'=>$code,
				'user'=>$this->model_user->getUser($token)
			];
			view('tablero',$params);
		}else{
			view('index');
		}
	}

	public function crear($request){
		$rs=$this->model->crear($request);
		if($rs['status']??false){
			$_SESSION['code']=$rs['code'];
		}
		$params['json']=[
			'status'=>$rs['status']??false,
			'code'=>$rs['code']??''
		];
		view('json',$params);
	}

}

?>