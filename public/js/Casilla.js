class Casilla{

	constructor(fila,columna){
		let obj=document.createElement("img");
		obj.classList.add("casilla");
		this.obj=obj;
		this.fila=fila;
		this.columna=columna;
		this.disparo=false;
		this.ocupado=false;
		this.status="";
	}

	normal(){
		this.obj.style.background=Config.colores.normal;
	}

	seleccionado(){
		this.obj.style.background=Config.colores.seleccion;
	}

	ocupada(){
		this.obj.style.background=Config.colores.ocupado;
	}

}