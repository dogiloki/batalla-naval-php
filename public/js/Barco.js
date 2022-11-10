class Barco{

	constructor(tipo,fila=0,columna=0){
		this.obj;
		this.centro={
			fila:fila,
			columna:columna
		};
		//this.tipo=Object.assign({},tipo);
		this.coordenadas=[];
		this.rotacion=Barco.rotacion.sur;
		this.direccion=Barco.rotacion.izq;
		this.tipo=tipo;
		this.estructurar();
	}

	unidido(){
		return this.coordenadas.every((coord)=>{
			return coord.destruido;
		});
	}

	estructurar(fila=this.centro.fila,columna=this.centro.columna,tipo=this.tipo){
		this.centro.fila=fila;
		this.centro.columna=columna;
		this.tipo=tipo;
		switch(tipo){
			case Barco.portaAviones:
				this.coordenadas=[
					{
						"destruido":false,
						"img":"public/assets/boats/1.png",
						"fila":fila,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"public/assets/boats/2.png",
						"fila":fila+1,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"public/assets/boats/3.png",
						"fila":fila+2,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"public/assets/boats/4.png",
						"fila":fila+3,
						"columna":columna
					}
				];
				break;
			case Barco.submarino:
				this.coordenadas=[
					{
						"destruido":false,
						"img":"public/assets/boats/1.png",
						"fila":fila,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"public/assets/boats/2.png",
						"fila":fila+1,
						"columna":columna
					},
					{
						"destruido":false,
						"img":"public/assets/boats/3.png",
						"fila":fila+1,
						"columna":columna+1
					}
				];
				break;
			case Barco.destructor:
					this.coordenadas=[
						{
							"destruido":false,
							"img":"public/assets/boats/1.png",
							"fila":fila,
							"columna":columna
						},
						{
							"destruido":false,
							"img":"public/assets/boats/2.png",
							"fila":fila+1,
							"columna":columna
						}
					];
					break;
			case Barco.fragata:
					this.coordenadas=[
						{
							"destruido":false,
							"img":"public/assets/boats/1.png",
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
				case Barco.rotacion.sur: coord.fila=coord.fila; coord.columna=coord.columna; break;
				case Barco.rotacion.este: coord.fila-=filas+columnas; coord.columna+=filas-columnas; break;
				case Barco.rotacion.norte: coord.fila-=filas*2; coord.columna=coord.columna; break;
				case Barco.rotacion.oeste: coord.fila-=filas+columnas; coord.columna-=filas+columnas; break;
			}
		});
	}

	rotar(direccion,rotacion=this.rotacion){
		this.rotacion=Util.cambioNum(rotacion,Barco.rotacion.min,Barco.rotacion.max,direccion);
		this.direccion=direccion;
	}

	static destruido=0;
	static portaAviones=1;
	static submarino=2;
	static destructor=3;
	static fragata=4;
	static rotacion={
		min:0,
		max:3,
		sur:0,
		este:1,
		norte:2,
		oeste:3,
		izq:0,
		de:1
	};

	static barcos=[
		{
			tipo:Barco.portaAviones,
			obj:null,
			max:2,
			nombre:"Porta Aviones",
			img:"public/assets/boats/1.png"
		},
		{
			tipo:Barco.submarino,
			obj:null,
			max:3,
			nombre:"Submarino",
			img:"public/assets/boats/1.png"
		},
		{
			tipo:Barco.destructor,
			obj:null,
			max:3,
			nombre:"Destructor",
			img:"public/assets/boats/1.png"
		},
		{
			tipo:Barco.fragata,
			obj:null,
			max:4,
			nombre:"Fragata",
			img:"public/assets/boats/1.png"
		}
	]

}