class Tablero{

	constructor(filas=Config.dimenciones.filas,columnas=Config.dimenciones.columnas){
		this.obj;
		this.filas=filas;
		this.columnas=columnas;
		this.casillas=[];
		this.barcos=[];
		this.seleccion_barco=null;
		this.seleccion_valida=false;
		this.generarTablero();
	}

	generarTablero(){
		this.casillas=new Array(this.filas);
		for(let a=0; a<this.filas; a++){
			this.casillas[a]=new Array(this.columnas);
			for(let b=0; b<this.columnas; b++){
				this.casillas[a][b]=new Casilla(a,b);
			}
		}
	}

	ponerBarco(validad=false){
		if(validad){ // Si no se usa quitar (pendiente)
			if(!this.posicionValida(fila,columna)){
				return false;
			}
		}
		this.seleccion_barco.coordenadas.forEach((coord)=>{
			this.casillas[coord.fila][coord.columna].ocupada=true;
			this.casillas[coord.fila][coord.columna].obj.src=coord.img;
		});
		this.barcos.push(this.seleccion_barco);
		this.seleccion_barco=null;
	}

	posicionValida(fila,columna,disparo=true){
		if(fila<0 || columna<0 || fila>this.filas || columna>this.columnas){
			return false;
		}
		for(let a=0; a<this.barcos.length; a++){
			for(let b=0; b<this.barcos[a].coordenadas.length; b++){
				let fila_barco=this.barcos[a].coordenadas[b].fila;
				let columna_barco=this.barcos[a].coordenadas[b].columna;
				if(fila_barco==fila && columna_barco==columna){
					return false;
				}else
				if(!disparo){
					if((fila_barco==fila && columna_barco-1==columna) ||
						(fila_barco==fila && columna_barco+1==columna) ||
						(fila_barco+1==fila && columna_barco==columna) ||
						(fila_barco-1==fila && columna_barco==columna)){
						return false;
					}
				}
			};
		}
		return true;
	}

	seleccionPrevia(){
		let coordenadas=this.seleccion_barco==null?[]:this.seleccion_barco.coordenadas;
		let casillas=[];
		this.casillas.forEach((casilla_temp,fila)=>{
			casilla_temp.forEach((casilla,columna)=>{
				casilla.normal();
				coordenadas.forEach((coord)=>{
					if(coord.fila==fila && coord.columna==columna && this.posicionValida(fila,columna,false)){
						casillas.push(casilla);
						casilla.seleccionado();
					}
				});
			});
		});
		if(casillas.length!=coordenadas.length || coordenadas.length<=0){
			this.seleccion_valida=false;
			casillas.forEach((casilla)=>{
				casilla.ocupada();
			});
		}else{
			this.seleccion_valida=true;
		}
	}

}