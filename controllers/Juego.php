<?php

namespace controllers;

use models;

class Juego{

	public function __construct(){
		$this->model=new models\Juego();
		$this->model_user=new models\User();
	}

	public function inicio(){
		$session=$_SESSION['session']??null;
		$code=$_SESSION['code']??null;
		$token=$_SESSION['token']??null;
		if(!$this->model->validadCode($code)){
			unset($_SESSION['token']);
			$token=null;
			unset($_SESSION['code']);
			$code=null;
		}else
		if(!$this->model->validadToken($code,$token)){
			unset($_SESSION['token']);
			$token=null;
			unset($_SESSION['code']);
			$code=null;
		}
		if($this->model_user->validadSession($session)){
			$params=[
				'session'=>true,
				'code'=>$code,
				'token'=>$token,
				'user'=>$this->model_user->getUser($session)
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

	public function getGame($request){
		$session=$_SESSION['session']??null;
		$code=$_SESSION['code']??null;
		$token=$_SESSION['token']??null;
		if(!$this->model->validadCode($code) || !$this->model->validadToken($code,$token)){
			unset($_SESSION['code']);
			unset($_SESSION['token']);
			$token=null;
			$code=null;
		}else
		if(!$this->model_user->validadSession($session)){
			unset($_SESSION['session']);
			$session=null;
		}
		$rs=$this->model->getGame($code);
		$params['json']=[
			'session'=>$session!=null,
			'status'=>$rs!=null,
			'turn'=>$rs['turn'],
			'name_1'=>$this->model_user::getUser($rs['id_user_1'])['user'],
			'name_2'=>$this->model_user::getUser($rs['id_user_2'])['user']??null,
			'board_1'=>$rs['board_1'],
			'board_2'=>$rs['board_2']??null
		];
		view('json',$params);
	}

}

?>