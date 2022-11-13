<?php

class Client{

	public $socket;
	public $handshake;

	public function __construct($socket,$ip){
		$this->socket=$socket;
		$this->ip;
	}
	
}

class Room{

	public $id;
	public $clients;
	public static $max_clients=2;

	public function __construct(){
		$this->id=uniqid();
		$this->clients=[];
	}

	public function addClient($client){
		$this->clients[]=$client;
	}

	public function removeClient($client){
		$index=array_search($client,$this->clients);
		if($index>=0){
			unset($this->clients[$index]);
		}
	}

}

class Socket{

	public $host;
	public $port;
	public $socket;
	public $clients=[];

	public function __construct($host,$port=0){
		if(!extension_loaded('sockets')){
			if(!dl('sockets.dll')){
				exit();
			}
		}
		set_time_limit(0);
		ob_implicit_flush();// socket_strerror($this->socket);
		$this->host=$host;
		$this->port=$port;
		$this->listen();
	}

	private function listen(){
		if (($this->socket=socket_create(AF_INET,SOCK_STREAM,SOL_TCP))===false) {
			echo "socket_create(): ".socket_strerror(socket_last_error())."\n";
		}
		if ((socket_set_option($this->socket,SOL_SOCKET,SO_REUSEADDR,1))===false) {
			echo "socket_set_option(): ".socket_strerror(socket_last_error($this->socket))."\n";
		}
		if(socket_bind($this->socket,$this->host,$this->port)===false) {
			echo "socket_bind(): ".socket_strerror(socket_last_error($this->socket))."\n";
		}
		if(socket_listen($this->socket,5)===false) {
			echo "socket_listen(): ".socket_strerror(socket_last_error($this->socket))."\n";
		}
		$this->run();
	}

	private function run(){
		do{
			$read=[];
			$read[]=$this->socket;
			$read=array_merge($read,$this->clients);
			if(@socket_select($read,$null,$null,0,10) < 1){
				continue;
			}
			// Nuevas conexiones
			if(in_array($this->socket,$read)){
				if(($client=socket_accept($this->socket))===false){
					echo "socket_accept(): ".socket_strerror(socket_last_error($this->socket))."\n";
					break;
				}
				$this->clients[]=$client;
				socket_set_block($client);
				$header=socket_read($client,1024);
				$this->handshake($header,$client,$this->host,$this->port);
				socket_getpeername($client,$ip);
				$key=array_keys($this->clients,$client);
				$msg="ip: {$ip}";
				$this->send($msg,$client);
				// $index=array_search($this->socket,$read);
				// unset($read[$index]);
			}
			// Entrada de datos
			foreach($this->clients as $key=>$client){
				if(in_array($client,$read)){
					while(@socket_recv($client,$socket_data,1024,0)>=1){
						if($socket_data){
							$msg=$this->unseal($socket_data);
							$this->send($msg);
							print_r($this->clients);
							break 2;
						}
					}
					$socket_data=@socket_read($client,1024,PHP_NORMAL_READ);
					if($socket_data===false) {
						socket_getpeername($client,$ip);
						$msg="Desconectado ip: {$ip}";
						echo $msg."\n";
						$index=array_search($client,$this->clients);
						socket_close($this->clients[$index]);
						unset($this->clients[$index]);
					}
				}
			}
		}while(true);
		socket_close($this->socket);


		// $this->clients=[$this->socket];
		// echo "Escuchando en ".$this->host.":".$this->port."\n";
		// while(true){
		// 	$new_clients=$this->clients;
		// 	if(false===(socket_select($new_clients,$null,$null,0,10))){
		// 		echo "socket_select(): ".socket_strerror(socket_last_error($this->socket))."\n";
		// 		break;
		// 	}
		// 	if(in_array($this->socket,$new_clients)){
		// 		$client=socket_accept($this->socket);
		// 		$this->clients[]=$client;
		// 		$header=socket_read($client,1024);
		// 		$this->handshake($header,$client,$this->host,$this->port);
		// 		socket_getpeername($client,$ip);
		// 		// send socket
		// 		$msg="ip: {$ip}";
		// 		$this->send($msg,$client);
		// 		$index=array_search($this->socket,$new_clients);
		// 		unset($new_clients[$index]);
		// 	}
		// 	foreach($new_clients as $new_client){
		// 		while(socket_recv($new_client,$socket_data,1024,0)>=1){
		// 			if($socket_data){
		// 				$socket_message=$this->unseal($socket_data);
		// 				$this->send($socket_message);
		// 				print_r($this->clients);
		// 				break 2;
		// 			}
		// 		}
		// 		$socket_data=@socket_read($new_client,1024,PHP_NORMAL_READ);
		// 		if($socket_data===false){
		// 			socket_getpeername($new_client,$ip);
		// 			$msg="Cerrado {$ip}";
		// 			$this->send($msg);
		// 			echo $msg."\n\n";
		// 			$index=array_search($new_client,$this->clients);
		// 			unset($this->clients[$index]);
		// 		}
		// 	}
		// }
		// socket_close($this->socket);


		// Masukan koneksi server kedalam clients.
		// $this->clients = [
		// 	$this->socket
		// ];

		// // Set address and port.
		// $address = $this->host;
		// $port = $this->port;
		
		// // Log message
		// echo "Listening incoming request on port {$this->port} ..\n";

		// // Unlimited loop.
		// while (true) 
		// {
		// 	$newClients = $this->clients;
			
		// 	socket_select($newClients, $null, $null, 0, 10);
			
		// 	// Jika koneksi socket sekarang ada dalam clients.
		// 	if (in_array($this->socket, $newClients)) 
		// 	{
		// 		// Terima koneksi baru ..
		// 		$newSocket = socket_accept($this->socket);
				
		// 		// Masukan dalam client/container socket.
		// 		$this->clients[] = $newSocket;
				
		// 		// Baca data masuk dari tunnel socket yang masuk tadi, browser biasanya mengirim header.
		// 		$header = socket_read($newSocket, 1024);
				
		// 		// Handshake, kirim balik data balasan.
		// 		$this->handshake($header, $newSocket, $address, $port);
				
		// 		// Beri pesan, ada client baru bergabung, ke semua connected client.
		// 		socket_getpeername($newSocket, $ip);
		// 		$this->send("Client dengan ip {$ip} baru saja bergabung");
				
		// 		echo "Client dengan ip {$ip} baru saja bergabung \n";
				
		// 		$index = array_search($this->socket, $newClients);
		// 		unset($newClients[$index]);
		// 	}
			
		// 	foreach ($newClients as $newClientsResource) 
		// 	{	
		// 		// Selama unlimited loop, terima data kiriman dari client, dari method "websocket.send" pada browser.
		// 		while(socket_recv($newClientsResource, $socketData, 1024, 0) >= 1)
		// 		{
		// 			// Jika ada data diterima, baru proses
		// 			if ($socketData) {
						
		// 				// Terima data dari client, kemudian unseal dan decode json.
		// 				$socketMessage = $this->unseal($socketData);
		// 				$this->send($socketMessage);
		// 				print_r($this->clients);
						
		// 				break 2;
		// 			}
		// 		}
				
		// 		// Dalam looping juga selalu cek, client ada yang keluar apa engga. 
		// 		// Caranya baca dari socket read berdasarkan connected client, kalau keluar kasih pesan out.
		// 		$socketData = @socket_read($newClientsResource, 1024, PHP_NORMAL_READ);
				
		// 		// False berarti keluar tunnel.
		// 		if ($socketData === false) 
		// 		{
		// 			// Beri pesan keluar.
		// 			socket_getpeername($newClientsResource, $ip);

		// 			echo "Desconectado: {$ip}\n";
					
		// 			// Hapus current index dari connected client.
		// 			$index = array_search($newClientsResource, $this->clients);
		// 			unset($this->clients[$index]);	
		// 		}
		// 	}
		// }

		// socket_close($this->server);
	}

	public function send($message,$client=null){
		$message=$this->seal($message);
		if($client==null){
			foreach($this->clients as $client){
				@socket_write($client,$message,strlen($message));
			}
		}else{
			@socket_write($client,$message,strlen($message));
		}
		return true;
	}

	public function seal($socket_data){
		$b1=0x80 | (0x1 & 0x0f);
		$len=strlen($socket_data);
		if($len<=125){
			$header=pack('CC',$b1,$len);
		}else
		if($len>125 && $len<65536){
			$header=pack('CCn',$b1,126,$len);
		}else
		if($len>=65536){
			$header=pack('CCNN',$b1,127,$len);
		}
		return $header.$socket_data;
	}

	public function unseal($socket_data){
		$len=ord($socket_data[1])&127;
		if($len==126){
			$maks=substr($socket_data,4,4);
			$data=substr($socket_data,8);
		}else
		if($len==127){
			$maks=substr($socket_data,10,4);
			$data=substr($socket_data,14);
		}else{
			$maks=substr($socket_data,2,4);
			$data=substr($socket_data,6);
		}
		$socket_data="";
		for($a=0; $a<strlen($data); $a++){
			$socket_data.=$data[$a]^$maks[$a%4];
		}
		return $socket_data;
	}

	function handshake($header, $socket, $address, $port) {

		$headers = array();
		$lines = preg_split("/\r\n/", $header);
		foreach($lines as $line)
		{
			$line = chop($line);
			if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))
			{
				$headers[$matches[1]] = $matches[2];
			}
		}
		
		$secKey = $headers['Sec-WebSocket-Key'];
		$secAccept = base64_encode(pack('H*',sha1($secKey.'258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
		
		$buffer   = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n";
		$buffer  .= "Upgrade: websocket\r\n";
		$buffer  .= "Connection: Upgrade\r\n";
		$buffer  .= "WebSocket-Origin: $address\r\n";
		$buffer  .= "WebSocket-Location: ws://$address:$port\r\n";
		$buffer  .= "Sec-WebSocket-Accept:$secAccept\r\n\r\n";

		socket_write($socket,$buffer,strlen($buffer));

	}
}

?>