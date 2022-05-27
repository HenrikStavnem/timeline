<?php
	header("Access-Control-Allow-Origin: *");

	require_once '../classes/character.php';

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

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

	$timelineSlug = null;
	if (isset($_GET["timelineSlug"])) {
		$timelineSlug = $_GET["timelineSlug"];
	}

	$characterSlug = null;
	if (isset($_GET["characterSlug"])) {
		$characterSlug = $_GET["characterSlug"];
	}

	
	$sqlCharacter = "SELECT
			id, type, firstname, lastname, birthEra, birthYear, birthMonth, birthDay, deathEra, deathYear, deathMonth, deathDay, image, coverImage, description, class, level, background, alignment, playerName, armorClass, initiative, speed, strength, dexterity, constitution, intelligence, wisdom, charisma
		FROM tl_characters
		LEFT JOIN tl_character_dnd_stats
			ON tl_characters.id = tl_character_dnd_stats.characterId
		WHERE 
			slug='$characterSlug'
		LIMIT 1";

	$queryCharacter = $connection->query($sqlCharacter);

	while ($row = $queryCharacter->fetch_assoc()) {
		$characterId = $row['id'];
		$birthDate = new Date($row['birthEra'], $row['birthYear'], $row['birthMonth'], $row['birthDay']);
		$deathDate = new Date($row['deathEra'], $row['deathYear'], $row['deathMonth'], $row['deathDay']);

		$sqlCharacterTitles = "SELECT
			title
			FROM tl_character_titles
			WHERE characterId = $characterId
		";

		$queryCharacterTitles = $connection->query($sqlCharacterTitles);

		$titles = array();

		while ($titleRow = $queryCharacterTitles->fetch_assoc()) {
			array_push($titles, $titleRow['title']);
		}

		if ($row['strength'] !== null) { // TODO: Needs better check
			$class = $row['class'];
			$level = $row['level'];
			$background = $row['background'];
			$alignment = $row['alignment'];
			$armorClass = $row['armorClass'];
			$initiative = $row['initiative'];
			$speed = $row['speed'];
			$playerName = $row['playerName'];
			$strength = $row['strength'] ? $row['strength'] : 10;
			$dexterity = $row['dexterity'] ? $row['dexterity'] : 10;
			$constitution = $row['constitution'] ? $row['constitution'] : 10;
			$intelligence = $row['intelligence'] ? $row['intelligence'] : 10;
			$wisdom = $row['wisdom'] ? $row['wisdom'] : 10;
			$charisma = $row['charisma'] ? $row['charisma'] : 10;

			// TODO: Replace static D&D stats with data from db
			$dndStats = new CharacterDndStats($class, $level, $background, $playerName, $alignment, $armorClass, $initiative, $speed,
			$strength, $dexterity, $constitution, $intelligence, $wisdom, $charisma);
		}
		else {
			$dndStats = null;
		}
		//$dndStats = new CharacterDndStats("Wizard", 3, "Scholar", "Red", "Neutral Good", 12, 2, 30, 10, 10, 10, 10, 10, 10);

		$character = new Character($row['id'], $row['firstname'], $row['lastname'], $birthDate, $deathDate, $row['image'], $row['coverImage'], $row['description'], $dndStats);
		$character->titles = $titles;
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