var btn_cerrar_sesion=document.getElementById('btn-cerrar-sesion');
var btn_pag_register=document.getElementById('btn-pag-register');
var btn_pag_login=document.getElementById('btn-pag-login');
var btn_register=document.getElementById('btn-register');
var btn_login=document.getElementById('btn-login');
var form_register=document.getElementById('form-register');
var form_login=document.getElementById('form-login');

document.addEventListener('DOMContentLoaded',()=>{
	if(btn_cerrar_sesion!=null){
		btn_cerrar_sesion.addEventListener('click',()=>{
		
		});
	}
	Util.modal(form_login,true);
	Util.modal(form_register,false);
});

btn_pag_register.addEventListener('click',()=>{
	event.preventDefault();
	Util.modal(form_login,false);
	Util.modal(form_register,true);
});
btn_pag_login.addEventListener('click',()=>{
	event.preventDefault();
	Util.modal(form_login,true);
	Util.modal(form_register,false);
});

form_register.addEventListener('submit',()=>{
	event.preventDefault();
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
	});
});

form_login.addEventListener('submit',()=>{
	event.preventDefault()
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
	});
});


var socket;
conectar();
async function conectar(){
	this.socket=await new WebSocket("ws://192.168.10.177:8000");
	this.socket.onmessage=(event)=>{
		alert("Mensaje recibido "+event.data);
	}
}
function enviar(){
	this.socket.send("Hola mundo");
}