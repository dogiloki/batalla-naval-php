<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Batalla Naval</title>
	<link rel="stylesheet" type="text/css" href="public/css/util.css">
	<link rel="stylesheet" type="text/css" href="public/css/header.css">
	<link rel="stylesheet" type="text/css" href="public/css/form.css">
</head>
<body>

	<header>
		<div id="title">Batalla Naval <?php echo ($code??''); ?></div>
		<?php
		if($session??false){
			if(($code??null)==null || ($token??null)==null){
				echo "
				<div style='display: flex'>
					<input type='number' class='caja' id='caja-code' placeholder='Código'>
					<button class='btn' id='btn-unirse'>Unirse</button>
					<button class='btn' id='btn-crear'>Crear partida</button>
				</div>";
			}else{
				echo "
				<div class='text' id='text'></div>
				<button class='btn-nav' id='btn-salir'>Abandonar partida</button>
				";
			}
			echo "<button class='btn-nav' id='btn-cerrar-sesion'>Cerrar sesión</button>";
		}
		?>
	</header>