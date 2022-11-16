<?php

class Socket{
	/** Props */
	public $server;
	public $address;
	public $port;
	public $clients;
	
	/**
	 * Construct
	 * 
	 * With address and port.
	 * 
	 * @return void
	 */
	public function __construct($address, $port) {

		$this->server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		$this->address = $address;
		$this->port = $port;

		socket_set_option($this->server, SOL_SOCKET, SO_REUSEADDR, 1);
		socket_bind($this->server, 0, $port);
		socket_listen($this->server);

	}

	/**
	 * Send
	 * 
	 * Kirim pesan ke semua client, sebelumnya di encode json dulu.
	 * 
	 * @return bool
	 */
	public function send($message,$client_2=null){
		$message=$this->seal($message);
		
			foreach($this->clients as $client){
				if($client_2==null){
					@socket_write($client,$message,strlen($message));
				}else{
					@socket_getpeername($client,$ip1);
					@socket_getpeername($client_2,$ip2);
					if($ip1!=$ip2){
						@socket_write($client,$message,strlen($message));
					}
				}
			}
		return true;
	}

	/**
	 * Unseal
	 * 
	 * Karena socket receive masih mentah, kita harus unseal dulu.
	 *
	 * @return string
	 */
	public function unseal($socketData) {

		$length = ord($socketData[1]) & 127;

		if ($length == 126) {
			$masks = substr($socketData, 4, 4);
			$data = substr($socketData, 8);
		} elseif ($length == 127) {
			$masks = substr($socketData, 10, 4);
			$data = substr($socketData, 14);
		} else {
			$masks = substr($socketData, 2, 4);
			$data = substr($socketData, 6);
		}
		
		$socketData = "";
		
		for ($i = 0; $i < strlen($data); ++$i) {
			$socketData .= $data[$i] ^ $masks[$i%4];
		}
		
		return $socketData;
	}

	/**
	 * Seal
	 * 
	 * Untuk mengirimkan data seal.
	 * 
	 * @return string
	 */
	function seal($socketData) {

		$b1 = 0x80 | (0x1 & 0x0f);
		$length = strlen($socketData);
		
		if ($length <= 125)
			$header = pack('CC', $b1, $length);
		elseif ($length > 125 && $length < 65536)
			$header = pack('CCn', $b1, 126, $length);
		elseif ($length >= 65536)
			$header = pack('CCNN', $b1, 127, $length);

		return $header.$socketData;
	}

	/**
	 * Handshake
	 * 
	 * Mengirimkan handshake headers ke client yang connect.
	 * 
	 * @return void
	 */
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
		$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
		
		$buffer   = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n";
		$buffer  .= "Upgrade: websocket\r\n";
		$buffer  .= "Connection: Upgrade\r\n";
		$buffer  .= "WebSocket-Origin: $address\r\n";
		$buffer  .= "WebSocket-Location: ws://$address:$port/Server.php\r\n";
		$buffer  .= "Sec-WebSocket-Accept:$secAccept\r\n\r\n";

		socket_write($socket,$buffer,strlen($buffer));

	}
	
	/**
	 * Run 
	 * 
	 * Running websocket server.
	 * 
	 * @return void
	 */
	public function listen($action_connected,$action_on,$action_disconnected){
		$this->clients=[
			$this->server
		];
		echo "Servidor a activo ".$this->port."\n";
		while(true){
			$newClients=$this->clients;
			socket_select($newClients, $null,$null,0,10);
			if(in_array($this->server,$newClients)){
				$newSocket=socket_accept($this->server);
				$this->clients[]=$newSocket;
				$header=socket_read($newSocket,1024);
				$this->handshake($header,$newSocket,$this->address,$this->port);
				$index=array_search($this->server, $newClients);
				unset($newClients[$index]);
				$action_connected($this,$newSocket);
			}
			foreach($newClients as $newClientsResource){	
				while(socket_recv($newClientsResource,$socketData,1024,0)>=1){
					if ($socketData){
						$socketMessage=$this->unseal($socketData);
						$action_on($this,$newClientsResource,$socketMessage);
						break 2;
					}
				}
				$socketData=@socket_read($newClientsResource, 1024, PHP_NORMAL_READ);
				if($socketData===false){
					$index=array_search($newClientsResource, $this->clients);
					unset($this->clients[$index]);
					$action_disconnected($this,$newClientsResource);
				}
			}
		}
		socket_close($this->server);
	}
}

?>