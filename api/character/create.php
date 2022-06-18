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

	$timelineId = $decodeObj['timelineId'];
	$firstName = $decodeObj['firstName'];
	$lastName = $decodeObj['lastName'];
	$description = $decodeObj['description'];
	$imageUrl = $decodeObj['imageUrl'];
	$coverImageUrl = $decodeObj['coverImageUrl'];
	$slug = $decodeObj['slug'];

	$stmt = $connection->prepare("INSERT INTO `tl_characters` (`timelineId`, `firstname`, `lastname`, `description`, `image`, `coverImage`, `slug`) VALUES (?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param('issssss', $timelineId, $firstName, $lastName, $description, $imageUrl, $coverImageUrl, $slug);
	$stmt->execute();

	http_response_code(200);
	$result = new StdClass();
	$result->msg = $msg;

	echo json_encode($result);

?>