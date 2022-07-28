<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	require_once 'classes/character.php';

	$timelineId = null;
	if (isset($_GET["timeline"])) {
		$timelineId = $_GET["timeline"];
	}

	class Month {
		public function __construct($id, $month, $title) {
			$this->id = $id;
			$this->month = $month;
			$this->title = $title;
		}
	}

	class Era {
		public function __construct($id, $title) {
			$this->id = $id;
			$this->title = $title;
		}
	}

	class Type {
		public function __construct($id, $title) {
			$this->id = $id;
			$this->title = $title;
		}
	}

	class Season {
		public function __construct($id, $title) {
			$this->id = $id;
			$this->title = $title;
		}
	}

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$slug = null;
	if (isset($_GET["slug"])) {
		$slug = $_GET["slug"];
	}

	
	$sqlMonths = "SELECT id, title, month FROM tl_months WHERE timeline_id=$timelineId ORDER BY month";

	$queryMonths = $connection->query($sqlMonths);

	$months = array();

	while ($row = $queryMonths->fetch_assoc()) {
		$month = new Month($row['id'], $row['month'], $row['title']);
		array_push($months, $month);
	}

	$sqlEras = "SELECT id, title FROM tl_eras WHERE timeline=$timelineId ORDER BY era";
	$queryEras = $connection->query($sqlEras);

	$eras = array();

	while ($row = $queryEras->fetch_assoc()) {
		$era = new Era($row['id'], $row['title']);
		array_push($eras, $era);
	}

	$sqlTypes = "SELECT id, title FROM tl_event_types ORDER BY title";
	$queryTypes = $connection->query($sqlTypes);

	$types = array();

	while ($row = $queryTypes->fetch_assoc()) {
		$type = new Type($row['id'], $row['title']);
		array_push($types, $type);
	}

	//

	$sqlSeasons = "SELECT id, title FROM tl_seasons WHERE timeline=$timelineId ORDER BY seasonOrder";
	$querySeasons = $connection->query($sqlSeasons);

	$seasons = array();

	while ($row = $querySeasons->fetch_assoc()) {
		$season = new Season($row['id'], $row['title']);
		array_push($seasons, $season);
	}

	//

	$sqlCharacters = "SELECT id, firstname, lastname, description, slug FROM tl_characters ORDER BY firstname, lastname";
	$queryCharacters = $connection->query($sqlCharacters);

	$characters = array();

	while ($row = $queryCharacters->fetch_assoc()) {
		$character = new Character($row['id'], $row['firstname'], $row['lastname'], null, null, null, null, $row['description'], $row['slug'], null);
		array_push($characters, $character);
	}

	http_response_code(200);
	$result = new StdClass();
	$result->eras = $eras;
	$result->months = $months;
	$result->types = $types;
	$result->characters = $characters;
	$result->seasons = $seasons;
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