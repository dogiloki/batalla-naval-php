class Juego{

	constructor(iniciada=false){
		this.code="";
		this.jugadores=[];
		this.turno=0;
		this.barcos=[];
		this.total_barcos=0;
		this.iniciada=iniciada;
		this.code=null;
		this.name=null;
	}

	agregarBarco(tipo_barco,max){
		let barco=Object.assign({},Diccionario.barcos.filter((barco)=>{
			return tipo_barco==barco.tipo;
		})[0]);
		if(max!=null){
			barco.max=max;
		}
		this.barcos.push({
			barco:null,
			info:barco
		});
		this.total_barcos+=max;
	}

	agregarJugador(jugador){
		this.jugadores.push(jugador);
	}

	cambiarTurno(){
		this.turno=this.turno==0?1:0;
	}

	obtenerOponente(){
		return this.jugadores[this.turno==0?1:0];
	}

	obtenerJugador(){
		return this.jugadores[this.turno];
	}

}