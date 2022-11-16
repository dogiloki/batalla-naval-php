var template_jugador=document.getElementById('template-jugador').content;
var template_barco=document.getElementById('template-barco').content;
var content_jugadores=document.getElementById('content-jugadores');
var content_barcos=document.getElementById('content-barcos');
var content_tablero=document.getElementById('content-tablero');
var btn_crear=document.getElementById('btn-crear');
var btn_unirse=document.getElementById('btn-unirse');
var juego=new Juego();
var seleccion={
	tablero:new Tablero(),
	casilla:{
		fila:null,
		columna:null
	},
	barco:null
};

var tablero;
//"{\"filas\":10,\"columnas\":15,\"casillas\":[[{\"obj\":{},\"fila\":0,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":0,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":0,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":1,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":1,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":1,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":2,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":2,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":2,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":2,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":3,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":3,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":3,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":3,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":3,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":4,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":4,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":5,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":5,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":6,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":6,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":7,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\",\"ocupada\":true},{\"obj\":{},\"fila\":7,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":7,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":8,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":8,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}],[{\"obj\":{},\"fila\":9,\"columna\":0,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":1,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":2,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":3,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":4,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":5,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":6,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":7,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":8,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":9,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":10,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":11,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":12,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":13,\"disparo\":false,\"ocupado\":false,\"status\":\"\"},{\"obj\":{},\"fila\":9,\"columna\":14,\"disparo\":false,\"ocupado\":false,\"status\":\"\"}]],\"barcos\":[{\"centro\":{\"fila\":0,\"columna\":0},\"coordenadas\":[{\"destruido\":false,\"img\":\"assets/boats/1.png\",\"fila\":0,\"columna\":0},{\"destruido\":false,\"img\":\"assets/boats/2.png\",\"fila\":1,\"columna\":0},{\"destruido\":false,\"img\":\"assets/boats/3.png\",\"fila\":2,\"columna\":0},{\"destruido\":false,\"img\":\"assets/boats/4.png\",\"fila\":3,\"columna\":0}],\"rotacion\":0,\"direccion\":0,\"tipo\":1},{\"centro\":{\"fila\":2,\"columna\":3},\"coordenadas\":[{\"destruido\":false,\"img\":\"assets/boats/1.png\",\"fila\":2,\"columna\":3},{\"destruido\":false,\"img\":\"assets/boats/2.png\",\"fila\":3,\"columna\":3},{\"destruido\":false,\"img\":\"assets/boats/3.png\",\"fila\":3,\"columna\":4}],\"rotacion\":0,\"direccion\":0,\"tipo\":2},{\"centro\":{\"fila\":7,\"columna\":6},\"coordenadas\":[{\"destruido\":false,\"img\":\"assets/boats/1.png\",\"fila\":7,\"columna\":6}],\"rotacion\":0,\"direccion\":0,\"tipo\":4}],\"seleccion_barco\":null,\"seleccion_valida\":true}"


document.addEventListener("DOMContentLoaded",()=>{
	// Configurar juego
	this.juego.agregarBarco(Diccionario.portaAviones,2);
	this.juego.agregarBarco(Diccionario.submarino,2);
	this.juego.agregarBarco(Diccionario.destructor,3);
	this.juego.agregarBarco(Diccionario.fragata,1);
	if(!this.juego.iniciada){
		selectorBarcos();
	}
	mostrarTablero();
});

document.addEventListener("keydown",(evt)=>{
	if(this.seleccion.tablero.seleccion_barco!=null){
		switch(evt.code){
			//case 39: seleccion.jugador.tablero.seleccion_barco.rotar(Barco.izq); break;
			//case 37: seleccion.jugador.tablero.seleccion_barco.rotar(Barco.der); break;
			case 'ArrowDown': this.seleccion.tablero.seleccion_barco.rotacion=Diccionario.rotacion.sur; break;
			case 'ArrowRight': this.seleccion.tablero.seleccion_barco.rotacion=Diccionario.rotacion.este; break;
			case 'ArrowLeft': this.seleccion.tablero.seleccion_barco.rotacion=Diccionario.rotacion.oeste; break;
			case 'ArrowUp': this.seleccion.tablero.seleccion_barco.rotacion=Diccionario.rotacion.norte; break;

		}
		this.seleccion.tablero.seleccion_barco.estructurar(this.seleccion.casilla.fila,this.seleccion.casilla.columna);
		this.seleccion.tablero.seleccionPrevia();
	}
});

btn_crear.addEventListener("click",()=>{
	this.crear();
});

btn_unirse.addEventListener("click",()=>{
	this.unirse();
});

function selectorBarcos(){
	Util.modal(this.content_jugadores,false);
	this.juego.barcos.forEach((barco)=>{
		let content_barco=this.template_barco.cloneNode(true);
		let obj=content_barco.getElementById('barco');
		let texto=(barco.info.tipo==Diccionario.destruido)?`${barco.info.max} / ${this.seleccion.tablero.totalBarcos()} Barcos`:`(${barco.info.max}) ${barco.info.nombre}`;
		obj.setAttribute("title",texto);
		content_barco.getElementById('nombre').innerHTML=texto;
		content_barco.getElementById('img').src=barco.info.img;
		obj.addEventListener("click",()=>{
			if(1==1){
				if(barco.info.total>=barco.info.max && barco.info.tipo!=Diccionario.destruido){
					Util.aviso(Util.ERROR,"No puedes poner más "+barco.info.nombre);
				}else{
					barco.barco=new Barco(barco.info.tipo);
					this.seleccion.barco=barco;
					this.seleccion.tablero.seleccion_barco=this.seleccion.barco.barco;
				}
			}
		});
		barco.info.obj=obj;
		this.content_barcos.appendChild(content_barco);
	});
}

/*function generarJugadores(){
	for(let a=0; a<Config.num_jugadores; a++){
		let jugador=new Jugador("Jugador "+(a+1),Config.img.players[0]);
		let content_jugador=this.template_jugador.cloneNode(true);
		content_jugador.getElementById('jugador').setAttribute("title",jugador.nombre);
		content_jugador.getElementById('nombre').innerHTML=jugador.nombre;
		content_jugador.getElementById('img').src=jugador.img;
		this.jugadores.push(jugador);
		this.content_jugadores.appendChild(content_jugador);
	}
	this.seleccion.jugador=this.jugadores[0];
}*/

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
			if(!this.juego.iniciada){
				casilla.addEventListener("mouseover",()=>{
					if(this.seleccion.tablero.seleccion_barco!=null){
						this.seleccion.casilla.fila=a;
						this.seleccion.casilla.columna=b;
						this.seleccion.tablero.seleccion_barco.estructurar(a,b);
						this.seleccion.tablero.seleccionPrevia();
					}
				});
				casilla.addEventListener("click",()=>{
					if(this.seleccion.tablero.seleccion_barco==null){
						return;
					}
					if(this.seleccion.tablero.seleccion_barco.tipo==Diccionario.destruido){
						
					}else{
						if(this.seleccion.tablero.seleccion_barco==null){
							Util.aviso(Util.ERROR,"Seleccione un barco",Util.LATERAL);
						}else{
							this.seleccion.casilla.fila=a;
							this.seleccion.casilla.columna=b;
							if(this.seleccion.tablero.seleccion_valida){
								this.seleccion.tablero.ponerBarco();
								this.seleccion.barco.info.total++;
								if(this.seleccion.barco.info.total>=this.seleccion.barco.info.max){
									this.seleccion.barco.info.obj.remove();
								}
								this.seleccion.barco=null;
								//this.seleccion.tablero.seleccion_barco=this.seleccion.barco;
							}else{
								Util.aviso(Util.ERROR,"Posición no válida",Util.LATERAL);
							}
						}
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

function crear(){
	if(this.seleccion.tablero.barcos.length!=this.juego.total_barcos){
		Util.aviso(Util.ERROR,"Posicione todos los barcos",Util.LATERAL);
		return;
	}
	Util.carga(true,"Creando partida...");
	let tablero=JSON.stringify(this.seleccion.tablero);
	fetch('juego/crear',{
		method:'POST',
		body: new URLSearchParams({
			'board':tablero
		})
	})
	.then(rs=>rs.json())
	.then((data)=>{
		if(data.status??false){
			location.reload();
		}else{
			Util.aviso(Util.ERROR,"Error al crear partidad, intente más tarde",Util.LATERAL);
		}
		Util.carga(false);
	})
	.catch((error)=>{
		Util.aviso(Util.ERROR,"Error al crear partidad, intente más tarde",Util.LATERAL);
		Util.carga(false);	
	});
}

async function unirse(){
	let socket=await new Socket();
	let code=(document.getElementById('caja-code').value??"").replaceAll(" ","");
	if(this.seleccion.tablero.barcos.length!=this.juego.total_barcos){
		Util.aviso(Util.ERROR,"Posicione todos los barcos",Util.LATERAL);
		return;
	}else
	if(code==""){
		Util.aviso(Util.ERROR,"Ingrese un código",Util.LATERAL);	
		return;
	}
	Util.carga(true,"Uniendose a la partida...");
	let tablero=JSON.stringify(this.seleccion.tablero);
	fetch('juego/unirse',{
		method:'POST',
		body: new URLSearchParams({
			'board':tablero,
			'code':code
		})
	})
	.then(rs=>rs.json())
	.then((data)=>{
		if(data.status??false){
			socket.enviar({
				"code":data.code,
				"status":"unirse"
			});
			location.reload();
		}else{
			Util.aviso(Util.ERROR,"Error al unirse a la partidad, intente más tarde",Util.LATERAL);
		}
		Util.carga(false);
	})
}