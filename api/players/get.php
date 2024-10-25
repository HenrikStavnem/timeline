<?php

	header("Access-Control-Allow-Origin: *");
	mb_internal_encoding('UTF-8');
	mb_http_output('UTF-8');
	mb_http_input('UTF-8');

	// $charactersIndexList = array();
	// $itemsIndexList = array();

	init();

	function init() {
		$connection = getConnection();

		$timeline = new StdClass();
		$timeline->id = 4;

		$slug = null;
		if (isset($_GET["slug"])) {
			$slug = $_GET["slug"];
		}

		$players = fetchPlayers($connection);

		echo json_encode($players);
	}

	function getConnection() {
		$servername = "localhost";
		$username = "root";
		$password = "";
		$database = "timeline";
		
		
		$connection = new mysqli($servername, $username, $password, $database);
		$connection->set_charset('utf8');
		
		
		if ($connection->connect_error) {
			die("Connection failed: " . $connection->connect_error);
		}
		
		return $connection;
	}

	function fetchPlayers($connection) {
		$players = [];

		$sql = "SELECT id, name, description, image, coverImage, slug FROM tl_players ORDER BY name";

		$query = $connection->query($sql);
		while ($row = $query->fetch_assoc()) {
			$player = new StdClass();

			$player->id = $row['id'];
			$player->name = $row['name'];
			$player->description = $row['description'];
			$player->image = $row['image'];
			$player->coverImage = $row['coverImage'];
			$player->slug = $row['slug'];

			array_push($players, $player);
		}

		return $players;
	}
?>