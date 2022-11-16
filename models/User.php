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
			$session=Secure::generateToken();
			$rs_token=DB::table('session')->insert([
				"id_user"=>$rs[0]['id']??null,
				"token"=>$session,
				"date_register"=>DB::flat('now()'),
				"date_expired"=>DB::flat('now()')
			])->execute();
			return $_SESSION['session']=$session;
		}catch(\Exception $ex){
			return false;
		}
	}

	public function validadSession($session){
		if($session==null){
			return false;
		}
		try{
			$rs=DB::table('session')->select()->where('token',$session)->execute()->fetchAll();
			return sizeof($rs)>=1;
		}catch(\Exception $ex){
			return false;
		}
	}

	public static function getId($session=null){
		try{
			if($session==null){
				$session=$_SESSION['session']??null;
			}
			$rs=DB::table('session')->select()->where('token',$session)->execute()->fetchAll();
			if(sizeof($rs)<=0){
				return null;
			}
			return $rs[0]['id_user']??null;
		}catch(\Exception $ex){
			return null;
		}
	}

	public static function getUser($id){
		if($id==null){
			return null;
		}
		try{
			$rs_user=DB::table('user')->select()->where('id',$id??'')->execute()->fetchAll();
			if(sizeof($rs_user)<=0){
				return null;
			}
			return $rs_user[0];
		}catch(\Exception $ex){
			return null;
		}
	}

	public function cerrarSession(){
		try{
			$id_user=User::getId();
			$session=$_SESSION['session']??null;
			$params=[$id_user,$session];
			$rs=DB::execute("DELETE FROM session WHERE id_user=? AND token=?",$params);
			return $rs!=null;
		}catch(\Exception $ex){
			return false;
		}
	}

}

?>