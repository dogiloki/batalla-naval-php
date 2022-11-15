<?php

namespace models;

use libs\DB;
use models\User;
use src\util\Secure;

class Juego{

	public static function generarCode(){
		$code="";
		for($a=0; $a<4; $a++){
			$code.=rand(0,9);
		}
		return $code;
	}

	public function crear($request){
		try{
			$id_user=User::getId();
			$token=Secure::generateToken(32);
			$code=Juego::generarCode();
			$rs=DB::table('game')->insert([
				"code"=>$code,
				"turn"=>0,
				"id_user_1"=>$id_user,
				"token_1"=>$token,
				"board_1"=>$request->post('board'),
				"date_register"=>DB::flat('now()'),
				"date_expired"=>DB::flat('now()')
			])->execute();
			if($rs!=null){
				$_SESSION['code']=$code;
				$_SESSION['token']=$token;
			}
			return [
				"status"=>$rs!=null,
				"code"=>$code
			];
		}catch(\Exception $ex){
			return false;
		}
	}

	public function getGame($code){
		try{
			$rs=DB::table('game')->select()
			->where('code',$code)
			->execute()->fetchAll();
			if(sizeof($rs)<=0){
				return null;
			}
			return $rs[0];
		}catch(\Exception $ex){
			return null;
		}
	}

	public function validadCode($code){
		if($code==null){
			return false;
		}
		try{
			$rs=DB::table('game')->select()
			->where('code',$code)
			->execute()->fetchAll();
			return sizeof($rs)>=1;
		}catch(\Exception $ex){
			return false;
		}
	}

	public function validadToken($code,$token){
		if($code==null || $token==null){
			return false;
		}
		try{
			$rs=DB::table('game')->select()
			->where('code',$code)->and()
			->where('token_1',$token)
			->execute()->fetchAll();
			return sizeof($rs)>=1;
		}catch(\Exception $ex){
			return false;
		}
	}

}

?>