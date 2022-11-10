<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Batalla Naval</title>
	<link rel="stylesheet" type="text/css" href="<?php echo config('public').'css/util.css' ?>">
	<link rel="stylesheet" type="text/css" href="<?php echo config('public').'css/header.css' ?>">
</head>
<body>

	<header>
		<div id="title">Batalla Naval</div>
		<?php
		if($session??false){
			echo "<button class='btn-nav' id='btn-cerrar-sesion'>Cerrar sesión</button>";
		}
		?>
	</header>