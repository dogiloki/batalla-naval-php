class Socket{

	host="192.168.10.32";
	port="8000";

	constructor(){
		this.server=new WebSocket("ws://"+this.host+":"+this.port);
	}

	enviar(msg){
		this.server.send(JSON.stringify(msg));
	}

}