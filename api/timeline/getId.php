<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	class Date {
		public function __construct($era, $year, $month, $day) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
		}
	}

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$timelineId;

	$timelineSlug = 'test';
	if (isset($_GET["timelineSlug"])) {
		$timelineSlug = $_GET["timelineSlug"];
	}

	$sqlTimeline = "SELECT id FROM tl_timelines WHERE url = '$timelineSlug' LIMIT 1";
	$queryTimeline = $connection->query($sqlTimeline);
	while ($row = $queryTimeline->fetch_assoc()) {
		$timelineId = $row['id'];
	}

	echo $timelineId;

?>