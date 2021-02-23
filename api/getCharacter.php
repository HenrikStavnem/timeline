<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	class Character {
		public function __construct($id, $firstname, $lastname, $birthYear, $deathYear) {
			$this->id = $id;
			$this->firstName = $firstname;
			$this->lastName = $lastname;
			$this->birthYear = $birthYear;
			$this->deathYear = $deathYear;
		}
	}

	$connection = new mysqli($servername, $username, $password, $database);

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$slug = null;
	if (isset($_GET["slug"])) {
		$slug = $_GET["slug"];
	}

	
	$sqlCharacter = "SELECT id, type, firstname, lastname, birthYear, deathYear from tl_characters WHERE slug='$slug' LIMIT 1";

	$queryCharacter = $connection->query($sqlCharacter);

	while ($row = $queryCharacter->fetch_assoc()) {
		$character = new Character($row['id'], $row['firstname'], $row['lastname'], $row['birthYear'], $row['deathYear']);
	}

	http_response_code(200);
	$result = new StdClass();
	$result->character = $character;
	$result->statusCode = 200;

	if (false) {
		echo "<pre>";
		print_r($result);
		echo "</pre>";
	}
	else {
		echo json_encode($result);
	}

	//echo json_encode($dates1, JSON_FORCE_OBJECT);
?>