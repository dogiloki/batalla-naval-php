var content_tablero=document.getElementById('content-tablero');
var socket=new Socket();
var juego=new Juego(true);
var seleccion={
	tablero:null,
	casilla:{
		fila:null,
		columna:null
	},
	barco:null
};

document.addEventListener('DOMContentLoaded',()=>{
	this.getTablero();
});

socket.server.onmessage((event)=>{
	console.log(event)
	let data=JSON.parse(event.data);
	switch(data.status??null){
		case 'unio':{
			alert("Se unio un jugador");
			break;
		}
	}
});

function getTablero(){
	Util.carga(true,"Esperando jugador...");
	fetch('juego/obtener',{
		method:'POST',
	})
	.then(rs=>rs.json())
	.then((data)=>{
		if(data.status??false){
			if(data.board_1==null || data.name_1==null || data.board_2==null || data.name_2==null){
				return;
			}
			this.construirTablero(JSON.parse(data.board_1));
			this.juego.agregarJugador(new Jugador(data.name_1,this.seleccion.tablero));
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
	})
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
				casilla.addEventListener("click",()=>{
					let disparo=this.seleccion.tablero.disparar(a,b);
					if(disparo==null){
						Util.aviso(Util.ERROR,"Posición no válida",Util.LATERAL);
					}else
					if(disparo==false){
						Util.aviso(Util.ADVERT,"Fallaste el disparo",Util.LATERAL);
					}else{
						if(disparo.undido()){
							Util.aviso(Util.MSG,"Has undido un barco",Util.LATERAL);
						}else{
							Util.aviso(Util.MSG,"Le has diparado a un barco",Util.LATERAL);
						}
					}
					if(!this.seleccion.tablero.hayBarcos()){
						Util.aviso(Util.MSG,"Destruiste todos los barcos",Util.LATERAL);
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
			this.content_tablero.appendChild(casilla);
		}
	}
}

function disparar(){

}