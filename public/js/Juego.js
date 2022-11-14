class Juego{

	constructor(){
		this.jugadores=[];
		this.turno=0;
		this.barcos=[];
		this.iniciada=false;
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
	}

}