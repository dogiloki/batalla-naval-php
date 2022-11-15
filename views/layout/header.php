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
		<div id="title">Batalla Naval <?php echo ' - '.($code??''); ?></div>
		<?php
		if($session??false){
			if($code==null){
				echo "
				<div>
					<input type='number' class='caja' id='caja-code' placeholder='Código'>
					<button class='btn' id='btn-unirse'>Unirse</button>
					<button class='btn' id='btn-crear'>Crear partida</button>
				</div>";
			}
			echo "<button class='btn-nav' id='btn-cerrar-sesion'>Cerrar sesión</button>";
		}
		?>
	</header>