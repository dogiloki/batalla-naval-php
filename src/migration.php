<?php

require "libs/config.php";
require "libs/database.php";
require "src/config.php";

use libs\DB;
use libs\Config;

// Sentencias SQL

$engine="INNODB";
$charset="utf8";

DB::create()->database($name_db==null?Config::singleton()->get('db_name'):$name_db);

DB::create()->table('user',function($table,$vars){
	$table->add('id','int')->autoIncrement()->primaryKey();
	$table->add('user','varchar',20)->unique();
	$table->add('email','varchar',20)->unique();
	$table->add('password','varchar',64);
	$table->add('token','varchar',128)->nullable()->unique();
	$table->engine($vars[0]);
	$table->charset($vars[1]);
},$engine,$charset);

DB::create()->table('session',function($table,$vars){
	$table->add('id','int')->autoIncrement()->primaryKey();
	$table->add('id_user','int');
	$table->add('token','varchar',128)->unique();
	$table->add('date_register','datetime');
	$table->add('date_expired','datetime');
	$table->engine($vars[0]);
	$table->charset($vars[1]);
},$engine,$charset);

DB::create()->table('game',function($table,$vars){
	$table->add('code','varchar(10)')->primaryKey();
	$table->add('turn','int');
	$table->add('id_user_1','int')->foreignKey('user','id');
	$table->add('token_1','varchar',64);
	$table->add('board_1','text');
	$table->add('id_user_2','int')->foreignKey('user','id')->nullable();
	$table->add('token_2','varchar',64)->nullable();
	$table->add('board_2','text')->nullable();
	$table->add('date_register','datetime');
	$table->add('date_expired','datetime');
	$table->engine($vars[0]);
	$table->charset($vars[1]);
},$engine,$charset);

?>