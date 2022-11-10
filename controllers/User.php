<?php

namespace controllers;

use models;

class User{

	public $model;

	public function __construct(){
		$this->model=new models\User();
	}

	public function register($request){
		$user=$this->model->existUser($request->post('user'));
		$email=$this->model->existEmail($request->post('email'));
		$message="";
		if($user){
			$message="El usuario ya existe";
		}else
		if($email){
			$message="El email ya existe";
		}
		$params["json"]["status"]=$this->model->register($request);
		$params["json"]["message"]=$message;
		view('json',$params);
	}

	public function login($request){
		$status=$this->model->login($request);
		$params["json"]["status"]=$status;
		$params["json"]["message"]=$status?"":"El usuario o la contraseña no coinciden";
		view('json',$params);
	}

}

?>