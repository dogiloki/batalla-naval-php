<?php include "layout/header.php"; ?>
<link rel="stylesheet" type="text/css" href="<?php echo config('public').'css/form.css' ?>">
<main class="content-form">
	<form id="form-register" method="POST" style="display: none;">
		<fieldset>
			<legend>REGISTRO</legend>
			<label>
				Usuario
				<input type="text" class="caja" name="user" required>
			</label>
			<label>
				Correo
				<input type="email" class="caja" name="email" required>
			</label>
			<label>
				Contraseña
				<input type="password" class="caja" name="password" required>
			</label><br>
			<div class="flex_sb">
				<button class="btn-form" id="btn-register">Registrase</button>
				<button class="btn-form2" id="btn-pag-login">Iniciar sesión</button>
			</div>
		</fieldset>
	</form>
	<form id="form-login" method="POST" style="display: none;">
		<fieldset>
			<legend>INICIO DE SESIÓN</legend>
			<label>
				Usuario / Correo
				<input type="text" class="caja" name="user" required>
			</label>
			<label>
				Contraseña
				<input type="password" class="caja" name="password" required>
			</label><br>
			<div class="flex_sb">
				<button class="btn-form" id="btn-login">Iniciar sesión</button>
				<button class="btn-form2" id="btn-pag-register">Registrase</button>
			</div>
		</fieldset>
	</form>
	<button onclick="enviar()">sa</button>
</main>
<?php include "layout/footer.php"; ?>
<script type="text/javascript" src="<?php echo config('public').'js/form/user.js' ?>"></script>