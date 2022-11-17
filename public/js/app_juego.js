var content_tablero=document.getElementById('content-tablero');
var btn_salir=document.getElementById('btn-salir');
var text=document.getElementById('text');
var content_misil=document.getElementById('content-misil');
var socket;
var juego=new Juego(true);
var seleccion={
	jugador:null,
	oponente:null,
	tablero:null,
	casilla:{
		fila:null,
		columna:null
	},
	barco:null
};

document.addEventListener('DOMContentLoaded',async()=>{
	content_misil.src=Diccionario.misil;
	Util.modal(content_misil,false);
	content_misil.style.left="0px";
	content_misil.style.top="0px";
	this.socket=new Socket();
	this.socket.server.onmessage=function(event){
		fetch('juego/code',{
			method:"POST"
		})
		.then(rs=>rs.json())
		.then((data)=>{
			if((data.code??"")!=JSON.parse(event.data).code){
				return false;
			}
		})
		.catch((error)=>{
			return false;
		})
		let data=JSON.parse(event.data);
		switch(data.status??null){
			case 'unirse':{
				location.reload();
				break;
			}
			case 'disparo':{
				if((data.fila??null)!=null && (data.columna??null)!=null){
					this.moverMisil(this.seleccion.tablero.casillas[fila][columna].obj.offsetLeft,this.seleccion.tablero.casillas[fila][columna].obj.offsetTop+this.seleccion.tablero.casillas[fila][columna].obj.offsetParent.offsetTop);
					disparar(data.x,data.y,data.fila,data.columna);
				}
				break;
			}
		}
	}
	this.getTablero();
});

btn_salir.addEventListener("click",()=>{
	this.abandonar();
});

function moverMisil(x,y){
	Util.modal(content_misil,true);
	content_misil.style.left=(x-content_misil.offsetWidth/2)+"px";
	content_misil.style.top=(y-content_misil.offsetHeight/2)+"px";
	setTimeout(()=>{
		content_misil.style.left="0px";
		content_misil.style.top="0px";
		Util.modal(content_misil,false);
	},2000);
	//x=x-25;
	//y=y-50;
	/*Util.modal(content_misil,true);
	let mover_x=0;
	let mover_y=0;
	let tiempo=1500;
	let total=0;
	let intervalo;
	content_misil.style.left="0px";
	content_misil.style.top="0px";
	intervalo=setInterval(()=>{
		if(mover_x>x && mover_y>y){
			Util.modal(content_misil,false);
			content_misil.style.left="0px";
			content_misil.style.top="0px";
			clearInterval(intervalo);
		}
		content_misil.style.left=mover_x+"px";
		content_misil.style.top=mover_y+"px";
		mover_x+=(x/10);
		mover_y+=(y/10);
		total+=tiempo;
	},100);*/
	return;
}

function abandonar(){
	Util.carga(true,"Abandonando partida");
	fetch("juego/salir",{
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
}

function getTablero(){
	Util.carga(true,"Esperando jugador...<br><button class='btn-nav' onclick='abandonar()' style='color:#353535'>Abandonar partida</button>");
	fetch('juego/obtener',{
		method:'POST',
	})
	.then(rs=>rs.json())
	.then((data)=>{
		if(data.status??false){
			if(data.board_1==null || data.name_1==null || data.board_2==null || data.name_2==null || data.turn==null || data.code==null || data.name==null){
				return;
			}
			this.juego.code=data.code;
			this.juego.name=data.name;
			this.construirTablero(JSON.parse(data.board_1));
			this.juego.agregarJugador(new Jugador(data.name_1,this.seleccion.tablero));
			this.construirTablero(JSON.parse(data.board_2));
			this.juego.agregarJugador(new Jugador(data.name_2,this.seleccion.tablero));
			this.juego.turno=Number(data.turn);
			this.seleccion.jugador=this.juego.obtenerJugador();
			this.seleccion.oponente=this.juego.obtenerOponente();
			this.seleccion.tablero=this.seleccion.oponente.tablero;
			text.innerHTML=this.seleccion.jugador.nombre+" ataca a "+this.seleccion.oponente.nombre;
			this.mostrarTablero();
		}else{
			if(!(data.session??false)){
				location.reload();
			}
		}
		Util.carga(false);
	})
	.catch((error)=>{
		Util.carga(false);
	});
}

function construirTablero(tablero){
	this.seleccion.tablero=new Tablero();
	tablero.barcos.forEach((barco)=>{
		this.seleccion.barco=new Barco(barco.tipo);
		this.seleccion.tablero.seleccion_barco=this.seleccion.barco;
		this.seleccion.casilla.fila=barco.centro.fila;
		this.seleccion.casilla.columna=barco.centro.columna;
		this.seleccion.tablero.seleccion_barco.estructurar(barco.centro.fila,barco.centro.columna);
		this.seleccion.tablero.seleccionPrevia(false);
		if(this.seleccion.tablero.seleccion_valida){
			this.seleccion.tablero.ponerBarco(false);
			this.seleccion.barco=null;
			this.seleccion.tablero.seleccion_barco=this.seleccion.barco;
		}else{
			Util.aviso(Util.ERROR,"Posición no válida",Util.LATERAL);
		}
	});
}

function mostrarTablero(){
	this.content_tablero.innerHTML="";
	let tablero=this.seleccion.tablero;
	let ancho_total=this.content_tablero.offsetWidth;
	let alto_total=this.content_tablero.offsetHeight;
	for(let a=-1; a<tablero.filas; a++){
		for(let b=-1; b<tablero.columnas; b++){
			let casilla;
			if(a<0 || b<0){
				casilla=document.createElement("div");
			}else{
				casilla=document.createElement("img");
				tablero.casillas[a][b].obj=casilla;
			}
			casilla.setAttribute("class","casilla");
			let ancho_px=(ancho_total/(tablero.columnas+1));
			let alto_px=(alto_total/(tablero.filas+1));
			let ancho_vw=(ancho_px*90)/ancho_total;
			let alto_vh=(alto_px*80)/alto_total;
			casilla.style.width=ancho_vw+"vw";
			casilla.style.height=alto_vh+"vh";
			if(this.juego.iniciada){
				// Disparo
				casilla.addEventListener("click",(event)=>{
					if(this.seleccion.jugador.nombre==this.juego.name){
						this.moverMisil(this.seleccion.tablero.casillas[a][b].obj.offsetLeft,this.seleccion.tablero.casillas[a][b].obj.offsetTop+this.seleccion.tablero.casillas[a][b].obj.offsetParent.offsetTop);
						this.disparar(casilla.offsetLeft,casilla.offsetTop,a,b,true);
					}
				});
			}
			if(a==-1 && b>=0){
				casilla.innerHTML=b+1;
			}else
			if(a>=0 && b==-1){
				casilla.innerHTML=Util.convertNum(a+1);
			}
			//tablero.casillas[a][b].obj=casilla;
			// Verificar barcos
			if(a>=0 && b>=0){
				if(this.seleccion.tablero.casillas[a][b].disparo){
					casilla.src=Diccionario.disparo;
				}
				if(this.seleccion.tablero.casillas[a][b].blanco){
					casilla.src=Diccionario.barcos.filter((bar)=>{return bar.tipo==Diccionario.destruido})[0].img;
				}
			}
			this.content_tablero.appendChild(casilla);
		}
	}
}

async function disparar(x,y,fila,columna,enviar_socket=false){
	let disparo=this.seleccion.tablero.disparar(fila,columna);
	if(disparo==null){
		Util.aviso(Util.ERROR,"Posición no válida",Util.LATERAL);
		return;
	}
	if(enviar_socket){
		this.socket.enviar({
			"code":this.juego.code,
			"status":"disparo",
			"fila":fila,
			"columna":columna
		});
	}
	if(!this.seleccion.tablero.hayBarcos()){
		Util.aviso(Util.MSG,"Destruiste todos los barcos",Util.LATERAL);
		Util.aviso(Util.MSG,"El ganador es: "+this.seleccion.jugador.nombre);
		return;
	}else
	if(disparo==false){
		Util.aviso(Util.ERROR,"Fallaste el disparo",Util.LATERAL);
	}else{
		if(disparo.undido()){
			Util.aviso(Util.MSG,"Has undido un barco",Util.LATERAL);
		}else{
			Util.aviso(Util.ADVERT,"Le has diparado a un barco",Util.LATERAL);
		}
	}
	setTimeout(()=>{
		this.juego.cambiarTurno();
		this.seleccion.jugador=this.juego.obtenerJugador();
		this.seleccion.oponente=this.juego.obtenerOponente();
		this.seleccion.tablero=this.seleccion.oponente.tablero;
		text.innerHTML=this.seleccion.jugador.nombre+" ataca a "+this.seleccion.oponente.nombre;
		this.mostrarTablero();
		fetch("juego/actualizar",{
			method:"POST",
			body:new URLSearchParams({
				"turn":this.juego.turno,
				"code":this.juego.code,
				"board_1":JSON.stringify(this.juego.jugadores[0].tablero),
				"board_2":JSON.stringify(this.juego.jugadores[1].tablero)
			})
		})
		.then(rs=>rs.json())
		.then((data)=>{
			if(!(data.status??false)){
				//location.reload();
			}
		})
		.catch((error)=>{
			//location.reload();
		});
	},2000);
}