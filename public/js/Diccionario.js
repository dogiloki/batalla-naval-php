class Diccionario{

	static disparo="public/assets/agua.jpg";
	static misil="public/assets/misil.png";
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
		der:1
	};

	static colores={
		normal:"none",
		seleccion:"#aaffa8",
		ocupado:"#ff999a"
	}

	static barcos=[
		{
			tipo:Diccionario.destruido,
			obj:null,
			total:0,
			max:0,
			nombre:"Destruir",
			img:"public/assets/boats/destruido.jpg",
			imgs:[
				"public/assets/boats/destruido.jpg"
			]
		},
		{
			tipo:Diccionario.portaAviones,
			obj:null,
			total:0,
			max:2,
			nombre:"Porta Aviones",
			img:"public/assets/boats/1.png",
			imgs:[
				"public/assets/boats/1.png",
				"public/assets/boats/1.png",
				"public/assets/boats/1.png",
				"public/assets/boats/1.png"
			]
		},
		{
			tipo:Diccionario.submarino,
			obj:null,
			total:0,
			max:3,
			nombre:"Submarino",
			img:"public/assets/boats/1.png",
			imgs:[
				"public/assets/boats/1.png",
				"public/assets/boats/1.png",
				"public/assets/boats/1.png"
			]
		},
		{
			tipo:Diccionario.destructor,
			obj:null,
			total:0,
			max:3,
			nombre:"Destructor",
			img:"public/assets/boats/1.png",
			imgs:[
				"public/assets/boats/1.png",
				"public/assets/boats/1.png"
			]
		},
		{
			tipo:Diccionario.fragata,
			obj:null,
			total:0,
			max:4,
			nombre:"Fragata",
			img:"public/assets/boats/1.png",
			imgs:[
				"public/assets/boats/1.png"
			]
		}
	];

}

// Precargar assets
var image;
preload();
function preload(){
	Util.carga(true,"Cargando assets...");
	image=new Image();
	image.src=Diccionario.disparo;
	Diccionario.barcos.forEach((barco)=>{
		image=new Image();
		image.src=barco.img;
		barco.imgs.forEach((img)=>{
			image=new Image();
			image.src=img;
		});
	});
	Util.carga(false);
}