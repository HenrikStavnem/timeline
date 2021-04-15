<?php
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}
	
	$data = "blah";

	/*
	if ($_POST['data']) {
		$data = json_decode($_POST['data']);
	}

	$sql = "UPDATE tl_timelines SET title='blah', description='testDesc'";
	$query = $connection->query($sql);

	$result = new stdClass();

	

	$timelineInfo = new stdClass();

	$timelineInfo->title = $data;
	*/

	/*
	$timelineInfo->title = $result->title;
	$timelineInfo->description = $result->description;
	$timelineInfo->image = $result->image;
	*/

	//echo json_encode($timelineInfo);
	//echo $_POST['data'];
	//echo var_dump($_POST);

	foreach ($_POST as $key => $value) {
		echo "Field ".htmlspecialchars($key)." is ".htmlspecialchars($value)."<br>";
	}
	echo "\nEnd: " .  sizeof($_POST);
?>