class Jugador{

	constructor(nombre,img){
		this.obj;
		this.nombre=nombre;
		this.img=img;
		this.turno=false;
		this.tablero=new Tablero(Config.dimenciones.filas,Config.dimenciones.columnas);
	}

}