<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$eras = array();

	class Date {
		public $month;
		public $day;
		public $dateType;
		public $entries = array();
		public $test = "n/a";

		public function __construct($month, $day, $dateType, $entries, $test) {
			$this->month = $month;
			$this->day = $day;
			$this->dateType = $dateType;
			$this->test = $test;

			foreach($entries as $entry => $val) {
				array_push($this->entries, $val);
			}
		}
	}

	class Year {
		public $title;
		public $year;
		public $exactness;
		public $dates = array();

		public function __construct($title, $year, $exactness, $dates) {
			$this->title = $title;
			$this->year = $year;
			$this->exactness = $exactness;

			foreach($dates as $date => $val) {
				array_push($this->dates, $val);
			}
		}
	}

	class Entry {
		public $title;
		public $description;
		public $type;

		public function __construct($title, $description, $type) {
			$this->title = $title;
			$this->description = $description;
			$this->type = $type;
		}
	}

	$connection = new mysqli($servername, $username, $password, $database);

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	$sqlEras = "SELECT id, title, description FROM tl_eras WHERE timeline=1";
	$queryEras = $connection->query($sqlEras);

	$eras = array();

	if ($queryEras->num_rows > 0) {
		while($row = $queryEras->fetch_assoc()) {
			$eraId = $row["id"];
			$era = new stdClass();
			$era->title = $row["title"];
			$era->description = $row["description"];
			$era->years = [];

			$sqlEvents = "SELECT id, year, month, day, description, type FROM tl_events WHERE era=$eraId ORDER BY year, month, day";
			$queryEvents = $connection->query($sqlEvents);

			$events = array();
			$currentYear = null;
			$currentMonth = null;
			$currentDay = null;

			$newYear = null;
			$newMonth = null;
			$newDay = null;

			$isNewYear = false;
			$isNewMonth = false;
			$isNewDay = false;
			
			$newYears = array();
			$newMonths = array();
			$newDays = array();

			$newDates = array();
			$newEntries = array();
			$newDate = null;
			$newYear = null;

			while($rowEra = $queryEvents->fetch_assoc()) {
				$testStr = "default";

				$isNewYear = false;
				$isNewMonth = false;
				$isNewDay = false;

				$thisYear = $rowEra["year"];
				$thisMonth = $rowEra["month"];
				$thisDay = $rowEra["day"];

				$newEntry = new Entry("eventTitle", $rowEra["description"], $rowEra["type"]);
				array_push($newEntries, $newEntry);

				if ($currentYear != $thisYear) {
					$isNewYear = true;
					
					$newYear = new Year("yearTitle", $thisYear, "exact", $newDates);

					//$newYear->months = $newMonths;
					array_push($newYears, $newYear);

					// resets
					$currentMonth = null;
					$currentDay = null;
					$newMonths = array();
					$newEntries = array();

					//$newYear = new Year("yearTitle", $thisYear, "exact", []);
				}

				if ($thisMonth != $currentMonth || $thisDay != $currentDay) {
							//$month, $day, $dateType, $entries, $test
					$newDate = new Date($thisMonth, $thisDay, "exact", $newEntries, "Yabba");
					array_push($newDates, $newDate);

					$currentMonth = $thisMonth;
					$currentDay = $thisDay;
					$newEntries = array();
				}

				array_push($newEntries, $newEntry);

				$currentYear = $thisYear;
				$currentMonth = $thisMonth;
				$currentDay = $thisDay;
			}

			$newDate->entries = $newEntries;
			//array_push($newDates, $newDate);
			$newYear->dates = $newDates;
			array_push($newYears, $newYear);

			$era->years = $newYears;

			array_push($eras, $era);
		}
	}

	$timeline = new stdClass();
	$timeline->id = 1;
	$timeline->statusCode = 200;
	$timeline->title = "Remote Title";
	$timeline->description = "Remote description";
	//$timeline->$eras;
	
	$timeline->eras = $eras;
	
	$timeline->actors = array(
		"1" => array(
			"firstName" => "Cal",
			"lastName" => "Nordinger",
			"type" => "person",
			"birthYear" => 1971,
			"shield" => "http://dukendor.com/nadtas/timeline/graphics/shields/red.png",
			"titles" => array(
				"0" => array(
					"year" => 2012,
					"title" => "Lord"
				),
				"1" => array(
					"year" => 2018,
					"title" => "Farmer"
				)
			)
		),
		"2" => array(
			"firstName" => "Tarrosh",
			"lastName" => "Felding",
			"type" => "person",
			"birthYear" => 1985,
			"shield" => "http://dukendor.com/nadtas/timeline/graphics/shields/cole.png"
		),
		"3" => array(
			"firstName" => "Darkstone Castle",
			"lastName" => "",
			"type" => "location",
			"birthYear" => 1594,
			"shield" => "http://dukendor.com/nadtas/timeline/graphics/shields/thorne.png"
		),
		"4" => array(
			"firstName" => "Minna",
			"lastName" => "Wallford",
			"type" => "person",
			"birthYear" => 2004,
			"shield" => "assets/shield.png"
		),
		"5" => array(
			"firstName" => "Dakklon",
			"lastName" => "Throe",
			"type" => "person",
			"birthYear" => 1960
		)
	);

	echo json_encode($timeline);

	//echo json_encode($dates1, JSON_FORCE_OBJECT);
?>