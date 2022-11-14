class Barco{

	constructor(tipo,fila=0,columna=0){
		this.obj;
		this.centro={
			fila:fila,
			columna:columna
		};
		//this.tipo=Object.assign({},tipo);
		this.coordenadas=[];
		this.rotacion=Diccionario.rotacion.sur;
		this.direccion=Diccionario.rotacion.izq;
		this.tipo=tipo;
		this.estructurar();
	}

	undido(){
		return this.coordenadas.every((coord)=>{
			return coord.destruido;
		});
	}

	estructurar(fila=this.centro.fila,columna=this.centro.columna,tipo=this.tipo){
		this.centro.fila=fila;
		this.centro.columna=columna;
		this.tipo=tipo;
		switch(tipo){
			case Diccionario.portaAviones:
				this.coordenadas=[
					{
						"destruido":false,
						"img":"assets/boats/1.png",
						"fila":fila,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"assets/boats/2.png",
						"fila":fila+1,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"assets/boats/3.png",
						"fila":fila+2,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"assets/boats/4.png",
						"fila":fila+3,
						"columna":columna
					}
				];
				break;
			case Diccionario.submarino:
				this.coordenadas=[
					{
						"destruido":false,
						"img":"assets/boats/1.png",
						"fila":fila,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"assets/boats/2.png",
						"fila":fila+1,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"assets/boats/3.png",
						"fila":fila+1,
						"columna":columna+1
					}
				];
				break;
			case Diccionario.destructor:
					this.coordenadas=[
						{
							"destruido":false,
							"img":"assets/boats/1.png",
							"fila":fila,
							"columna":columna
						},
						{
							"destruido":false,
							"img":"assets/boats/2.png",
							"fila":fila+1,
							"columna":columna
						}
					];
					break;
			case Diccionario.fragata:
					this.coordenadas=[
						{
							"destruido":false,
							"img":"assets/boats/1.png",
							"fila":fila,
							"columna":columna
						}
					];
					break;
		}
		this.reestructurar();
	}

	reestructurar(rotacion=this.rotacion){
		this.rotacion=rotacion;
		this.coordenadas.forEach((coord)=>{
			let filas=coord.fila-this.centro.fila;
			let columnas=coord.columna-this.centro.columna;
			switch(rotacion){
				case Diccionario.rotacion.sur: coord.fila=coord.fila; coord.columna=coord.columna; break;
				case Diccionario.rotacion.este: coord.fila-=filas+columnas; coord.columna+=filas-columnas; break;
				case Diccionario.rotacion.norte: coord.fila-=filas*2; coord.columna=coord.columna; break;
				case Diccionario.rotacion.oeste: coord.fila-=filas+columnas; coord.columna-=filas+columnas; break;
			}
		});
	}

	rotar(direccion,rotacion=this.rotacion){
		this.rotacion=Util.cambioNum(rotacion,Diccionario.rotacion.min,Diccionario.rotacion.max,direccion);
		this.direccion=direccion;
	}

}