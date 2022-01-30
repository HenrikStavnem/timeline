<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	class TimelineList {
		public function __construct($timelines, $statusCode) {
			$this->timelines = $timelines;
			$this->statusCode = $statusCode;
		}
	}

	class TimelineCard {
		public function __construct($id, $title, $image, $author, $slug) {
			$this->id = $id;
			$this->title = $title;
			$this->image = $image;
			$this->author = $author;
			$this->slug = $slug;
		}
	}

	$connection = new mysqli($servername, $username, $password, $database);
	$connection->set_charset('utf8');

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	
	$sqlTimeline = "SELECT tl_timelines.id, title, tl_timelines.description as description, tl_timelines.image as image, tl_timelines.url as url, tl_users.name as authorname, tl_users.image as authorimage from tl_timelines INNER JOIN tl_users ON tl_timelines.owner=tl_users.id ORDER BY title";

	$queryTimeline = $connection->query($sqlTimeline);

	$timelines = array();

	while ($row = $queryTimeline->fetch_assoc()) {
		array_push($timelines, new TimelineCard($row["id"], $row["title"], $row["image"], $row["authorname"], $row["url"] ));
	}

	$timelineList = new TimelineList($timelines, 200);

	if (false) {
		echo "<pre>";
		print_r($timelineList);
		echo "</pre>";
	}
	else {
		echo json_encode($timelineList);
	}

	//echo json_encode($dates1, JSON_FORCE_OBJECT);
?>