var btn_cerrar_sesion=document.getElementById('btn-cerrar-sesion');
var btn_pag_register=document.getElementById('btn-pag-register');
var btn_pag_login=document.getElementById('btn-pag-login');
var btn_register=document.getElementById('btn-register');
var btn_login=document.getElementById('btn-login');
var form_register=document.getElementById('form-register');
var form_login=document.getElementById('form-login');
inicio();
function inicio(){
	if(form_login!=null && form_register!=null){
		Util.modal(form_login,true);
		Util.modal(form_register,false);
	}
}

if(btn_pag_register!=null){
	btn_pag_register.addEventListener('click',()=>{
		event.preventDefault();
		Util.modal(form_login,false);
		Util.modal(form_register,true);
	});
}
if(btn_pag_login!=null){
	btn_pag_login.addEventListener('click',()=>{
		event.preventDefault();
		Util.modal(form_login,true);
		Util.modal(form_register,false);
	});
}
if(form_register!=null){
	form_register.addEventListener('submit',()=>{
		event.preventDefault();
		Util.carga(true,"Registrando cuenta...");
		fetch('user/register',{
			method:"POST",
			body:new URLSearchParams({
				"user":form_register['user'].value,
				"email":form_register['email'].value,
				"password":form_register['password'].value
			})
		})
		.then(res=>res.json())
		.then((data)=>{
			if(!data['status']??false){
				Util.aviso(Util.ADVERT,data['message']??"Error en servidor");
			}else{
				location.reload();
			}
			Util.carga(false);
		})
		.catch((error)=>{
			Util.carga(false);
		});
	});
}
if(form_login!=null){
	form_login.addEventListener('submit',()=>{
		event.preventDefault();
		Util.carga(true,"Iniciando sesión...");
		fetch('user/login',{
			method:"POST",
			body:new URLSearchParams({
				"user":form_login['user'].value,
				"password":form_login['password'].value
			})
		})
		.then(res=>res.json())
		.then((data)=>{
			if(!data['status']??false){
				Util.aviso(Util.ADVERT,data['message']??"Error en servidor");
			}else{
				location.reload();
			}
			Util.carga(false);
		})
		.catch((error)=>{
			Util.carga(false);
		});
	});
}
if(btn_cerrar_sesion!=null){
	btn_cerrar_sesion.addEventListener("click",()=>{
		Util.carga(true,"Cerrando sesión");
		fetch("user/cerrar",{
			method:"POST"
		})
		.then(rs=>rs.json())
		.then((data=>{
			if(data.status??false){
				location.reload();
			}
			Util.carga(false);
		}))
		.catch((error)=>{
			Util.carga(false);
		});
	});
}