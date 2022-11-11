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

		$timelineSlug = null;
		$locationSlug = null;

		if (isset($_GET["timeline"])) {
			$timelineSlug = $_GET["timeline"];
		}

		if (isset($_GET["slug"])) {
			$locationSlug = $_GET["slug"];
		}

		if ($timelineSlug != null)  {
			$timelineId = getTimelineId($connection, $timelineSlug);
	
			$locations = fetchLocation($connection, $timelineId, $locationSlug);
	
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

	function getTimelineId($connection, $timelineSlug) {
		$timelineId = "boo";

		$sqlTimeline = "SELECT id FROM tl_timelines WHERE url = '$timelineSlug' LIMIT 1";
		$queryTimeline = $connection->query($sqlTimeline);
		while ($row = $queryTimeline->fetch_assoc()) {
			$timelineId = $row['id'];
		}

		return $timelineId;
	}

	function fetchLocation($connection, $timelineId, $slug) {
		$location = new StdClass();

		$sql = "SELECT id, name, description, coverImage, slug FROM tl_locations WHERE timelineId=$timelineId AND slug='$slug' LIMIT 1";

		$query = $connection->query($sql);
		while ($row = $query->fetch_assoc()) {

			$location->id = $row['id'];
			$location->name = $row['name'];
			$location->description = $row['description'];
			$location->coverImage = $row['coverImage'];
			$location->slug = $row['slug'];
		}

		return $location;
	}
?>