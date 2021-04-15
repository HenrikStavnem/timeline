<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$sql = "SELECT id, title, description FROM tl_eras";
	$query = $connection->query($sql);

	$result = new stdClass();

	if ($query->num_rows > 0) {
		while($row = $query->fetch_assoc()) {
			$result->title = $row["title"];
			$result->description = $row["description"];

			echo $row["title"]."<br>";
		}
	}

	/*
	$timelineInfo = new stdClass();

	$timelineInfo->title = $result->title;
	$timelineInfo->description = $result->description;
	$timelineInfo->image = $result->image;

	echo json_encode($timelineInfo);
	*/

	//echo json_encode($result);
?>