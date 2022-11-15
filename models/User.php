<?php

namespace models;

use libs\DB;
use src\util\Secure;

class User{

	public function register($request){
		try{
			DB::table('user')->insert([
				"user"=>$request->post('user'),
				"email"=>$request->post('email'),
				"password"=>Secure::encodePassword($request->post('password')),
			])->execute();
			return true;
		}catch(\Exception $ex){
			return false;
		}
	}

	public function existUser($user){
		try{
			$rs=DB::table('user')->select()->where('user',$user)->execute()->fetchAll();
			return sizeof($rs)>=1;
		}catch(\Exception $ex){
			return true;
		}
	}

	public function existEmail($email){
		try{
			$rs=DB::table('user')->select()->where('email',$email)->execute()->fetchAll();
			return sizeof($rs)>=1;
		}catch(\Exception $ex){
			return true;
		}
	}

	public function login($request){
		try{
			$rs=DB::table('user')->select()
			->where('user',$request->post('user'))->or()
			->where('email',$request->post('user'))
			->execute()->fetchAll();
			if(sizeof($rs)<=0){
				return false;
			}
			if(!Secure::verifyPassword($request->post('password'),$rs[0]['password']??"")){
				return false;
			}
			$token=Secure::generateToken();
			$rs_token=DB::table('session')->insert([
				"id_user"=>$rs[0]['id']??null,
				"token"=>$token,
				"date_register"=>DB::flat('now()'),
				"date_expired"=>DB::flat('now()')
			])->execute();
			return $_SESSION['token']=$token;
		}catch(\Exception $ex){
			return false;
		}
	}

	public function validadToken($token){
		if($token==null){
			return false;
		}
		try{
			$rs=DB::table('session')->select()->where('token',$token)->execute()->fetchAll();
			return sizeof($rs)>=1;
		}catch(\Exception $ex){
			return false;
		}
	}

	public static function getId(){
		try{
			$token=$_SESSION['token']??null;
			$rs=DB::table('session')->select()->where('token',$token)->execute()->fetchAll();
			if(sizeof($rs)<=0){
				return null;
			}
			return $rs[0]['id_user']??null;
		}catch(\Exception $ex){
			return null;
		}
	}

	public function getUser($token){
		if($token==null){
			return null;
		}
		try{
			$rs_token=DB::table('session')->select()->where('token',$token)->execute()->fetchAll();
			if(sizeof($rs_token)<=0){
				return null;
			}
			$id_user=$rs_token[0]['id_user'];
			$rs_user=DB::table('user')->select()->where('id',$id_user??'')->execute()->fetchAll();
			if(sizeof($rs_user)<=0){
				return null;
			}
			return $rs_user;
		}catch(\Exception $ex){
			return null;
		}
	}

}

?>