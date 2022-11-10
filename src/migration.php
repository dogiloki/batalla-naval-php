<?php

require "libs/config.php";
require "libs/database.php";
require "src/config.php";

use libs\DB;
use libs\Config;

// Sentencias SQL

$engine="INNODB";

DB::create()->database($name_db==null?Config::singleton()->get('db_name'):$name_db);

DB::create()->table('user',function($table,$vars){
	$table->add('id','int')->autoIncrement()->primaryKey();
	$table->add('user','varchar',20)->unique();
	$table->add('email','varchar',20)->unique();
	$table->add('password','varchar',64);
	$table->add('token','varchar',128)->nullable()->unique();
	$table->engine($vars[0]);
},$engine);

DB::create()->table('session',function($table,$vars){
	$table->add('id','int')->autoIncrement()->primaryKey();
	$table->add('id_user','int');
	$table->add('token','varchar',128)->unique();
	$table->add('date_register','datetime');
	$table->add('date_expired','datetime');
	$table->engine($vars[0]);
},$engine);

?>