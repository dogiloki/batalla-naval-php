<?php require "layout/header.php"; ?>
<link rel="stylesheet" type="text/css" href="public/css/juego.css">

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
<section class="content-jugadores" id="content-jugadores"></section>
<section class="content-barcos" id="content-barcos"></section>
<section class="content-tablero" id="content-tablero"></section>
<section class="content-juego"></section>

<img class="misil" id="content-misil">

<?php require "layout/footer.php"; ?>

<script type="text/javascript" src="public/js/Diccionario.js"></script>
<script type="text/javascript" src="public/js/Config.js"></script>
<script type="text/javascript" src="public/js/Jugador.js"></script>
<script type="text/javascript" src="public/js/Tablero.js"></script>
<script type="text/javascript" src="public/js/Casilla.js"></script>
<script type="text/javascript" src="public/js/Barco.js"></script>
<script type="text/javascript" src="public/js/Juego.js"></script>
<script type="text/javascript" src="public/js/Socket.js"></script>

<?php
if(($code??null)==null || ($token??null)==null){
	?><script type="text/javascript" src="public/js/app_tablero.js"></script><?php
}else{
	?><script type="text/javascript" src="public/js/app_juego.js"></script><?php
}
?>
