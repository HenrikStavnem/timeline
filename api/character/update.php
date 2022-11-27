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

	$characterId = $decodeObj['characterId'];
	$firstName = $decodeObj['firstName'];
	$lastName = $decodeObj['lastName'];
	$description = $decodeObj['description'];
	$birthDay = $decodeObj['birthDay'];
	$birthMonth = $decodeObj['birthMonth'];
	$birthYear = $decodeObj['birthYear'];
	$imageUrl = $decodeObj['imageUrl'];
	$coverImageUrl = $decodeObj['coverImageUrl'];
	$slug = $decodeObj['slug'];

	$stmt = $connection->prepare("UPDATE `tl_characters` SET `firstname`=?, `lastname`=?, `description`=?, `birthDay`=?, `birthMonth`=?, `birthYear`=?, `image`=?, `coverImage`=?, `slug`=? WHERE `id` = ?");
	$stmt->bind_param('sssiiisssi', $firstName, $lastName, $description, $birthDay, $birthMonth, $birthYear, $imageUrl, $coverImageUrl, $slug, $characterId);
	$stmt->execute();

	http_response_code(200);
	$result = new StdClass();
	$result->characterId = $characterId;
	$result->firstName = $firstName;
	$result->lastName = $lastName;
	$result->description = $description;
	$result->imageUrl = $imageUrl;
	$result->slug = $slug;

	echo json_encode($result);

?>