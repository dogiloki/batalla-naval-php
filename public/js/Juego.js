class Juego{

	constructor(){
		this.code="";
		this.jugadores=[];
		this.turno=0;
		this.barcos=[];
		this.total_barcos=0;
		this.iniciada=`<?php echo ($code??null!=null); ?>`;
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

}