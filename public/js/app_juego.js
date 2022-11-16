var content_tablero=document.getElementById('content-tablero');
var btn_salir=document.getElementById('btn-salir');
var text=document.getElementById('text');
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
					disparar(data.fila,data.columna);
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
				casilla.addEventListener("click",()=>{
					if(this.seleccion.jugador.nombre==this.juego.name){
						this.socket.enviar({
							"code":this.juego.code,
							"status":"disparo",
							"fila":a,
							"columna":b
						});
						this.disparar(a,b);
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

function disparar(fila,columna){
	let disparo=this.seleccion.tablero.disparar(fila,columna);
	if(disparo==null){
		Util.aviso(Util.ERROR,"Posición no válida",Util.LATERAL);
		return
	}
	if(disparo==false){
		Util.aviso(Util.ERROR,"Fallaste el disparo",Util.LATERAL);
	}else{
		if(disparo.undido()){
			Util.aviso(Util.MSG,"Has undido un barco",Util.LATERAL);
		}else{
			Util.aviso(Util.ADVERT,"Le has diparado a un barco",Util.LATERAL);
		}
	}
	if(!this.seleccion.tablero.hayBarcos()){
		Util.aviso(Util.MSG,"Destruiste todos los barcos",Util.LATERAL);
	}
	this.juego.cambiarTurno();
	this.seleccion.jugador=this.juego.obtenerJugador();
	this.seleccion.oponente=this.juego.obtenerOponente();
	this.seleccion.tablero=this.seleccion.oponente.tablero;
	text.innerHTML=this.seleccion.jugador.nombre+" ataca a "+this.seleccion.oponente.nombre;
	this.mostrarTablero();
}