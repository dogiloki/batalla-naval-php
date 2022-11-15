<?php

namespace models;

use libs\DB;
use models\User;

class Juego{

	public function crear($request){
		try{
			$id_user=User::getId();
			$code=Juego::generarCode();
			$rs=DB::table('game')->insert([
				"code"=>$code,
				"turn"=>0,
				"id_user1"=>$id_user,
				"board1"=>$request->post('board'),
				"date_register"=>DB::flat('now()'),
				"date_expired"=>DB::flat('now()')
			])->execute();
			if($rs!=null){
				$_SESSION['code'];
			}
			return [
				"status"=>$rs!=null,
				"code"=>$code
			];
		}catch(\Exception $ex){
			return false;
		}
	}

	public static function generarCode(){
		$code="";
		for($a=0; $a<4; $a++){
			$code.=rand(0,9);
		}
		return $code;
	}

	public function validadCode($code){
		if($code==null){
			return false;
		}
		try{
			$rs=DB::table('game')->select()->where('code',$code)->execute()->fetchAll();
			return sizeof($rs)>=1;
		}catch(\Exception $ex){
			return false;
		}
	}

}

?>