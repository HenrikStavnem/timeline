<?php

header("Access-Control-Allow-Origin: *");
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');
mb_http_input('UTF-8');

$charactersIndexList = array();
$itemsIndexList = array();

init();

function init() {
	$connection = getConnection();

	$timeline = new StdClass();
	$timeline->id = 4;

	$timelineId = null;
	if (isset($_GET["timeline"])) {
		$timelineId = $_GET["timeline"];
	}

	$eras = fetchEras($connection, $timelineId);

	echo json_encode($eras);
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

function fetchEras($connection, $timelineId) {
	$sqlEras = "SELECT
			id, title, description, image
		FROM tl_eras
		WHERE 
			timeline='$timelineId'
		";

	$queryEras = $connection->query($sqlEras);

	$eras = array();

	while ($row = $queryEras->fetch_assoc()) {
		$era = new StdClass();
		$era->id = $row['id'];
		$era->title = $row['title'];
		$era->description = $row['description'];
		$era->image = $row['image'];

		array_push($eras, $era);
	}

	return $eras;
}

?>