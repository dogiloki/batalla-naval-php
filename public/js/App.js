var template_jugador=document.getElementById('template-jugador').content;
var template_barco=document.getElementById('template-barco').content;
var content_jugadores=document.getElementById('content-jugadores');
var content_barcos=document.getElementById('content-barcos');
var content_tablero=document.getElementById('content-tablero');
var tablero=new Tablero();
var seleccion={
	casilla:{
		fila:null,
		columna:null
	},
	barco:null
};

selectorBarcos();
mostrarTablero();
document.addEventListener("keydown",(evt)=>{
	if(this.tablero.seleccion_barco!=null){
		switch(evt.code){
			//case 39: seleccion.jugador.tablero.seleccion_barco.rotar(Barco.izq); break;
			//case 37: seleccion.jugador.tablero.seleccion_barco.rotar(Barco.der); break;
			case 'ArrowDown': this.tablero.seleccion_barco.rotacion=Barco.rotacion.sur; break;
			case 'ArrowRight': this.tablero.seleccion_barco.rotacion=Barco.rotacion.este; break;
			case 'ArrowLeft': this.tablero.seleccion_barco.rotacion=Barco.rotacion.oeste; break;
			case 'ArrowUp': this.tablero.seleccion_barco.rotacion=Barco.rotacion.norte; break;

		}
		this.tablero.seleccion_barco.estructurar(this.seleccion.casilla.fila,this.seleccion.casilla.columna);
		this.tablero.seleccionPrevia();
	}
});

function selectorBarcos(){
	Util.modal(this.content_jugadores,false);
	Barco.barcos.forEach((barco)=>{
		let content_barco=this.template_barco.cloneNode(true);
		let obj=content_barco.getElementById('barco');
		obj.setAttribute("title",`(${barco.max}) ${barco.nombre}`);
		content_barco.getElementById('nombre').innerHTML=`(${barco.max}) ${barco.nombre}`;
		content_barco.getElementById('img').src=barco.img;
		obj.addEventListener("click",()=>{
			if(barco.max>0){
				this.seleccion.barco=new Barco(barco.tipo);
				this.tablero.seleccion_barco=this.seleccion.barco;
			}else{
				Util.aviso(Util.ERROR,"No puedes poner más "+barco.nombre);
			}
		});
		barco.obj=obj;
		this.content_barcos.appendChild(content_barco);
	});
	let btn_register=document.createElement("button");
	btn_register.innerHTML="Registrar";
	btn_register.addEventListener("click",()=>{
		fetch("tablero/agregar",{
			method:"POST",
			body:new URLSearchParams({
				"tablero":JSON.stringify(this.tablero)
			})
		})
		.then(res=>res.json())
		.then(data=>console.log(data));
	});
	this.content_barcos.appendChild(btn_register);
}

function mostrarTablero(){
	let ancho_total=this.content_tablero.offsetWidth;
	let alto_total=this.content_tablero.offsetHeight;
	for(let a=-1; a<this.tablero.filas; a++){
		for(let b=-1; b<this.tablero.columnas; b++){
			let casilla;
			if(a<0 || b<0){
				casilla=document.createElement("div");
				casilla.setAttribute("class","casilla");
			}else{
				casilla=this.tablero.casillas[a][b].obj;
			}
			let ancho_px=(ancho_total/(this.tablero.columnas+1));
			let alto_px=(alto_total/(this.tablero.filas+1));
			let ancho_vw=(ancho_px*90)/ancho_total;
			let alto_vh=(alto_px*82)/alto_total;
			casilla.style.width=ancho_vw+"vw";
			casilla.style.height=alto_vh+"vh";
			casilla.addEventListener("mouseover",()=>{
				if(this.tablero.seleccion_barco!=null){
					this.seleccion.casilla.fila=a;
					this.seleccion.casilla.columna=b;
					this.tablero.seleccion_barco.estructurar(a,b);
					this.tablero.seleccionPrevia();
				}
			});
			casilla.addEventListener("click",()=>{
				if(this.tablero.seleccion_barco==null){
					Util.aviso(Util.ERROR,"Seleccione un barco",Util.LATERAL);
				}else{
					this.seleccion.casilla.fila=a;
					this.seleccion.casilla.columna=b;
					if(this.tablero.seleccion_valida){
						this.tablero.ponerBarco();
						this.seleccion.barco=null;
						this.tablero.seleccion_barco=this.seleccion.barco;
					}else{
						Util.aviso(Util.ERROR,"Posición no válida",Util.LATERAL);
					}
				}
			});
			if(a==-1 && b>=0){
				casilla.innerHTML=b+1;
			}else
			if(a>=0 && b==-1){
				casilla.innerHTML=Util.convertNum(a+1);
			}
			this.content_tablero.appendChild(casilla);
		}
	}
}