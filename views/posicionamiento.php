<?php include "layout/header.php"; ?>
<link rel="stylesheet" type="text/css" href="<?php echo config('public').'css/juego.css' ?>">
<template id="template-jugador">
	<div class="jugador" id="jugador">
		<div class="img">
			<img src="" id="img" width="100%" height="100%">
		</div>
		<div class="nombre" id="nombre"></div>
	</div>
</template>
<template id="template-barco">
	<div class="barco" id="barco">
		<div class="img">
			<img src="" id="img" width="100%" height="100%">
		</div>
		<div class="nombre" id="nombre"></div>
	</div>
</template>
	
<main class="content-juego">
	<section class="content-jugadores" id="content-jugadores"></section>
	<section class="content-barcos" id="content-barcos"></section>
	<section class="content-tablero" id="content-tablero"></section>
</main>
<?php include "layout/footer.php"; ?>
<script type="text/javascript" src="<?php echo config('public'); ?>js/Config.js"></script>
<script type="text/javascript" src="<?php echo config('public'); ?>js/Jugador.js"></script>
<script type="text/javascript" src="<?php echo config('public'); ?>js/Tablero.js"></script>
<script type="text/javascript" src="<?php echo config('public'); ?>js/Casilla.js"></script>
<script type="text/javascript" src="<?php echo config('public'); ?>js/Barco.js"></script>
<script type="text/javascript" src="<?php echo config('public'); ?>js/App.js"></script>