<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$obj = null;
	if (isset($_GET["obj"])) {
		$obj = $_GET["obj"];
	}

	$decodeObj = json_decode($obj, true);

	if ($decodeObj == null) {
		echo "Invalid JSON";
		return;
	}

	//$jsonObj = json_encode($decodeObj, JSON_FORCE_OBJECT);

	//echo $jsonObj."<br />";
	//echo $jsonObj->title;

	$connection = new mysqli($servername, $username, $password, $database);

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$title = $decodeObj['title'];
	$description = $decodeObj['description'];
	$timelineId = 4;
	
	$stmt = $connection->prepare("UPDATE tl_timelines SET title=?, description=? WHERE id=?");
	$stmt->bind_param('ssi', $title, $description, $timelineId);
	$stmt->execute();

	$message = new StdClass();
	$message->mes = "Its allright";

	echo json_encode($message);

	//echo "Returned value";

	if (false) {
		//echo "<pre>";
		//print_r($timelineList);
		//echo "</pre>";
	}
	else {
		//echo json_encode($timelineList);
	}

	//echo json_encode($dates1, JSON_FORCE_OBJECT);
?>