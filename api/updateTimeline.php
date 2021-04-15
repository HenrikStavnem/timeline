<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$message = "OK";
	
	$obj = null;
	if (isset($_GET["obj"])) {
		$obj = $_GET["obj"];
	}

	$decodeObj = json_decode($obj, true);

	if ($decodeObj == null) {
		$message = "Invalid JSON";
		return;
	}

	//$jsonObj = json_encode($decodeObj, JSON_FORCE_OBJECT);

	//echo $jsonObj."<br />";
	//echo $jsonObj->title;

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$title = $decodeObj['title'];
	$description = $decodeObj['description'];
	$timelineId = $decodeObj['id'];
	
	$stmt = $connection->prepare("UPDATE tl_timelines SET title=?, description=? WHERE id=?");
	$stmt->bind_param('ssi', $title, $description, $timelineId);
	$stmt->execute();

	$message = new StdClass();
	$message->mes = $message;

	echo json_encode($message);
?>