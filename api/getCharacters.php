<?php
	header("Access-Control-Allow-Origin: *");

	require_once 'classes/character.php';

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$timelineId = null;
	if (isset($_GET["timeline"])) {
		$timelineId = $_GET["timeline"];
	}

	$query = null;
	if (isset($_GET["query"])) {
		$query = $_GET["query"];
	}

	if (!$timelineId || !$query) {
		//return;
	}

	
	$sqlCharacters = "SELECT id, type, firstname, lastname from tl_characters WHERE timelineId=$timelineId AND (firstname LIKE '$query%' OR lastname LIKE '$query%') ORDER BY lastname, firstname";

	$queryCharacters = $connection->query($sqlCharacters);

	$characters = array();
	while ($row = $queryCharacters->fetch_assoc()) {
		$character = new StdClass();
		$character->id  = $row['id'];
		$character->firstName  = $row['firstname'];
		$character->lastName  = $row['lastname'];
		
		array_push($characters, $character);
	}

	http_response_code(200);
	$result = new StdClass();
	$result->characters = $characters;
	$result->statusCode = 200;

	echo json_encode($result);
?>