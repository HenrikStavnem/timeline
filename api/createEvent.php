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

	$eraId = $decodeObj['era'];
	$year = $decodeObj['year'];
	$month = $decodeObj['month'];
	$day = $decodeObj['day'];
	$type = $decodeObj['type'];
	$description = $decodeObj['description'];

	$stmt = $connection->prepare("INSERT INTO `tl_events` (`id`, `type`, `era`, `year`, `month`, `day`, `description`) VALUES (NULL, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param('iiiiis', $type, $eraId, $year, $month, $day, $description);
	$stmt->execute();

	$message = new StdClass();
	$message->msg = $msg;
	$message->input = $decodeObj;

	echo json_encode($message);
?>