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

		$player = fetchPlayer($connection, $slug);

		echo json_encode($player);
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

	function fetchPlayer($connection, $slug) {
		$player = new StdClass();

		$sql = "SELECT id, name, description, image, coverImage FROM tl_players WHERE slug='$slug' LIMIT 1";

		$query = $connection->query($sql);
		while ($row = $query->fetch_assoc()) {
			$player->id = $row['id'];
			$player->name = $row['name'];
			$player->description = $row['description'];
			$player->image = $row['image'];
			$player->coverImage = $row['coverImage'];
			$player->characters = fetchCharacters($connection, $row['id']);
		}

		return $player;
	}

	function fetchCharacters($connection, $id) {
		$sql = "SELECT
			characterId as id, class, firstname, lastname, tl_characters.image, tl_characters.slug, tl_timelines.url as timelineSlug
			FROM tl_character_dnd_stats
			LEFT JOIN tl_characters
			ON tl_character_dnd_stats.characterId = tl_characters.id
			LEFT JOIN tl_timelines
			ON tl_characters.timelineId = tl_timelines.id
			WHERE player='$id'
			ORDER BY firstname, lastname, class, level
		";

		$query = $connection->query($sql);

		$characters = array();

		while ($row = $query->fetch_assoc()) {
			$classesObj = fetchClasses($connection, $row['id']);
			$classes = $classesObj->classes;
			$totalLevels = $classesObj->totalLevels;

			$character = new StdClass();

			$character->id = $row['id'];
			$character->firstName = $row['firstname'];
			$character->lastName = $row['lastname'];
			$character->image = $row['image'];
			$character->classes = $classes;
			$character->level = $totalLevels;
			$character->slug = $row['slug'];
			$character->timelineSlug = $row['timelineSlug'];

			//$character->class = fetchClasses($connection, $row['id']);

			array_push($characters, $character);
		}

		return $characters;
	}

	function fetchClasses($connection, $id) {
		$classes = array();
		$totalLevels = 0;

		$sql = "SELECT class, subclass, level FROM tl_character_dnd_classes WHERE characterId='$id'";

		$query = $connection->query($sql);

		while ($row = $query->fetch_assoc()) {
			$class = new StdClass();
			$class->class = $row['class'];
			$class->subclass = $row['subclass'];
			$class->level = $row['level'];
			array_push($classes, $class);

			$totalLevels = $totalLevels + $row['level'];
		}

		$result = new StdClass();
		$result->classes = $classes;
		$result->totalLevels = $totalLevels;

		return $result;
	}
?>