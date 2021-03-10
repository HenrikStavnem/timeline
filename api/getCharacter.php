<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	class Character {
		public function __construct($id, $firstname, $lastname, $birthDate, $deathDate, $image, $coverImage, $description) {
			$this->id = $id;
			$this->firstName = $firstname;
			$this->lastName = $lastname;
			$this->birthDate = $birthDate;
			$this->deathDate = $deathDate;
			$this->image = $image;
			$this->coverImage = $coverImage;
			$this->description = $description;
		}
	}

	class Date {
		public function __construct($era, $year, $month, $day) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
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

	
	$sqlCharacter = "SELECT id, type, firstname, lastname, birthEra, birthYear, birthMonth, birthDay, deathEra, deathYear, deathMonth, deathDay, image, coverImage, description from tl_characters WHERE slug='$slug' LIMIT 1";

	$queryCharacter = $connection->query($sqlCharacter);

	while ($row = $queryCharacter->fetch_assoc()) {
		$birthDate = new Date($row['birthEra'], $row['birthYear'], $row['birthMonth'], $row['birthDay']);
		$deathDate = new Date($row['deathEra'], $row['deathYear'], $row['deathMonth'], $row['deathDay']);

		$character = new Character($row['id'], $row['firstname'], $row['lastname'], $birthDate, $deathDate, $row['image'], $row['coverImage'], $row['description']);
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