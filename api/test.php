<?php
	header("Access-Control-Allow-Origin: *");

	$result = new stdClass();
	$result->statusCode = 200;

	echo json_encode($result, JSON_FORCE_OBJECT);

?>