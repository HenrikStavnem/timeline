<?php
	header("Access-Control-Allow-Origin: *");
	mb_internal_encoding('UTF-8');
	mb_http_output('UTF-8');
	mb_http_input('UTF-8');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$msg = "OK";

	$obj = null;
	if (isset($_GET["obj"])) {
		$obj = $_GET["obj"];
	}

	$decodeObj = json_decode($obj, true);

	if ($decodeObj == null) {
		$msg = "Invalid JSON";
	}

	$title = $decodeObj['title'];
	$description = $decodeObj['description'];
	$coverImage = $decodeObj['image'];
	$timelineId = $decodeObj['timelineId'];

	echo $timelineId;

	$sqlEraOrder = "SELECT eraOrder FROM tl_eras WHERE timeline = $timelineId  ORDER BY eraOrder DESC LIMIT 1";
	$queryEraOrder = $connection->query($sqlEraOrder);

	$eraOrder = 0;

	while ($row = $queryEraOrder->fetch_assoc()) {
		$eraOrder = $row['eraOrder'] + 1;
	}
	
	$stmt = $connection->prepare("INSERT INTO `tl_eras` (`title`, `description`, `image`, `timeline`, `eraOrder`) VALUES (?, ?, ?, ?, ?)");
	$stmt->bind_param('sssii', $title, $description, $coverImage, $timelineId, $eraOrder);
	$stmt->execute();

	//$stmt = $connection->prepare("INSERT INTO `tl_events` (`id`, `type`, `era`, `exactness`, `year`, `month`, `day`, `description`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)");
	//$stmt->bind_param('iisiiis', $type, $eraId, $exactness, $year, $month, $day, $description);
	//$stmt->execute();

	$message = new StdClass();
	$message->msg = $msg;
	$message->timelineId = $timelineId;
	$message->eraOrder = $eraOrder;
	$message->input = $decodeObj;

	echo json_encode($message);
?>