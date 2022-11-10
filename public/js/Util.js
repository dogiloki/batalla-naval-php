class Util{

	static modal(content,visible=-1){
		content.style.display=(visible==-1)?
							((content.style.display=="none")?"":"none"):
							(visible)?"":"none";
	}

	static cambiarSigno(num){
		return (num>0)?-num:num;
	}

	static convertText(texto){
		return texto.codePointAt(0)-64;
	}

	static convertNum(num){
		return String.fromCodePoint(num+64);
	}

	static cambioNum(actual,min,max,direccion=Util.izq){
		if(direccion==Util.izq){
			if(actual<max){
				actual++;
			}else{
				actual=min;
			}
		}else
		if(direccion==Util.der){
			if(actual>min){
				actual--;
			}else{
				actual=max;
			}
		}
		return actual;
	}

	static izq=0;
	static der=1;

	static ERROR=0;
	static ADVERT=1;
	static MSG=2;
	static CONFIRM=3;
	static LATERAL=true;
	static SHOW=false;

	static aviso(tipo=2,msg=null,lateral=false){ // tipo -> 0=error ; 1=advertencia ; 2=aviso ; 3=confirmación;
		if(Util.SHOW){
			return;
		}
		Util.SHOW=true;
		let content_modal=document.createElement("section");
		let content_aviso=document.createElement("div");
		let content_btn=document.createElement("div");
		let btns=[
			document.createElement("button"),
			document.createElement("button")
		];
		btns[0].setAttribute("class","btn");
		btns[0].innerHTML="ACEPTAR";
		btns[1].setAttribute("class","btn");
		btns[0].addEventListener("click",()=>{
			document.body.removeChild(content_modal);
			Util.SHOW=false;
			return true;
		});
		btns[1].addEventListener("click",()=>{
			document.body.removeChild(content_modal);
			Util.SHOW=false;
			return false;
		});
		content_btn.setAttribute("class","content_btn");
		content_modal.setAttribute("class","content_modal");
		content_aviso.setAttribute("class","content_aviso");
		content_aviso.innerHTML=msg;
		switch(tipo){
			case Util.ERROR: content_aviso.classList.add("error");
					break;
			case Util.ADVERT: content_aviso.classList.add("advertencia");
					break;
			case Util.MSG: content_aviso.classList.add("aviso");
					break;
			case Util.CONFIRM: content_aviso.classList.add("confirmacion");
					btns[0].innerHTML="SÍ";
					btns[1].innerHTML="NO";
					content_btn.appendChild(btns[1]);
					break;
		}
		content_btn.appendChild(btns[0]);
		content_aviso.appendChild(content_btn);
		content_modal.appendChild(content_aviso);
		document.body.appendChild(content_modal);
		if(lateral){
			content_aviso.classList.add("aviso_laterial");
			document.body.appendChild(content_aviso);
			content_aviso.removeChild(content_btn);
			document.body.removeChild(content_modal);
			setTimeout(()=>{
				document.body.removeChild(content_aviso);
				Util.SHOW=false;
			},2000);
		}
	}

}