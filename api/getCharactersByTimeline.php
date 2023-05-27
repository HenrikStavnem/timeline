<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	require_once 'classes/character.php';

	class Date {
		public function __construct($era, $year, $month, $day) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
		}
	}

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$timelineId = 2; //TODO: Remove

	$timelineSlug = 'test';
	if (isset($_GET["timeline"])) {
		$timelineSlug = $_GET["timeline"];
	}

	$sqlTimeline = "SELECT id FROM tl_timelines WHERE url = '$timelineSlug' LIMIT 1";
	$queryTimeline = $connection->query($sqlTimeline);
	while ($row = $queryTimeline->fetch_assoc()) {
		$timelineId = $row['id'];
	}
	
	$sqlCharacter = "
		SELECT
			id, type, firstname, lastname, birthEra, birthYear, birthMonth, birthDay, deathEra, deathYear, deathMonth, deathDay, image, coverImage, description, playable, strength, slug from tl_characters
		LEFT JOIN tl_character_dnd_stats
			ON tl_characters.id = tl_character_dnd_stats.characterId
		WHERE
			timelineId='$timelineId'
		ORDER BY
			firstname, lastname, birthYear, birthMonth, birthDay";

	$queryCharacter = $connection->query($sqlCharacter);

	$characters = array();

	while ($row = $queryCharacter->fetch_assoc()) {
		$birthDate = new Date($row['birthEra'], $row['birthYear'], $row['birthMonth'], $row['birthDay']);
		$deathDate = new Date($row['deathEra'], $row['deathYear'], $row['deathMonth'], $row['deathDay']);

		$character = new Character($row['id'], $row['firstname'], $row['lastname'], $birthDate, $deathDate, $row['image'], $row['coverImage'], $row['description'], $row['slug'], null);
		$character->slug = $row['slug'];
		$character->isRpg = $row['strength'] ? true : false; // TODO: Find better check!
		$character->playable = !!$row['playable'];

		array_push($characters, $character);
	}

	http_response_code(200);
	$result = new StdClass();
	$result->characters = $characters;
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