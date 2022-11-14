class Casilla{

	constructor(fila,columna){
		this.obj=null;
		this.fila=fila;
		this.columna=columna;
		this.disparo=false;
		this.ocupado=false;
		this.status="";
	}

	normal(){
		this.obj.style.background=Diccionario.colores.normal;
	}

	seleccionado(){
		this.obj.style.background=Diccionario.colores.seleccion;
	}

	ocupada(){
		this.obj.style.background=Diccionario.colores.ocupado;
	}

}