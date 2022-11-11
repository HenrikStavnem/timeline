<?php

	header("Access-Control-Allow-Origin: *");
	mb_internal_encoding('UTF-8');
	mb_http_output('UTF-8');
	mb_http_input('UTF-8');

	init();

	function init() {
		$connection = getConnection();

		$timeline = new StdClass();
		$timeline->id = 4;

		$slug = null;
		if (isset($_GET["timeline"])) {
			$slug = $_GET["timeline"];
		}

		if ($slug != null)  {
			$timelineId = getTimelineId($connection, $slug);
	
			$locations = fetchLocations($connection, $timelineId);
	
			echo json_encode($locations);
		}

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

	function getTimelineId($connection, $slug) {
		$timelineId = false;

		$sqlTimeline = "SELECT id FROM tl_timelines WHERE url = '$slug' LIMIT 1";
		$queryTimeline = $connection->query($sqlTimeline);
		while ($row = $queryTimeline->fetch_assoc()) {
			$timelineId = $row['id'];
		}

		return $timelineId;
	}

	function fetchLocations($connection, $timelineId) {
		$locations = [];

		$sql = "SELECT id, name, description, coverImage, slug FROM tl_locations WHERE timelineId=$timelineId ORDER BY name, description";

		$query = $connection->query($sql);
		while ($row = $query->fetch_assoc()) {
			$location = new StdClass();

			$location->id = $row['id'];
			$location->name = $row['name'];
			$location->description = $row['description'];
			$location->coverImage = $row['coverImage'];
			$location->slug = $row['slug'];

			array_push($locations, $location);
		}

		return $locations;
	}
?>