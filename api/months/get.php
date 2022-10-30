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

		$months = fetchMonths($connection, $timelineId);

		echo json_encode($months);
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

	function fetchMonths($connection, $timelineId) {
		$sqlEras = "SELECT
				id, month, title
			FROM tl_months
			WHERE 
				timeline_id='$timelineId'
			ORDER BY month
			";

		$queryEras = $connection->query($sqlEras);

		$eras = array();

		while ($row = $queryEras->fetch_assoc()) {
			$era = new StdClass();
			$era->id = $row['id'];
			$era->title = $row['title'];
			$era->month = $row['month'];

			array_push($eras, $era);
		}

		return $eras;
	}

?>