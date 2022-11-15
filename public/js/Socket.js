class Socket{

	host="192.168.10.177";
	port="8000";

	constructor(){
		this.server=new WebSocket("ws://"+this.host+":"+this.port);
	}

}