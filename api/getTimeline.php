<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$eras = array();

	class Day {
		//public $month;
		public $day;
		public $dateType;
		public $entries = array();

		public function __construct(/*$month,*/ $day, $dateType, $entries) {
			//$this->month = $month;
			$this->day = $day;
			$this->dateType = $dateType;

			foreach($entries as $entry => $val) {
				array_push($this->entries, $val);
			}
		}
	}

	class Month {
		public $month;
		public $name;
		public $exactness;
		public $days = array();

		public function __construct($month, $name, $exactness, $days) {
			$this->month = $month;
			$this->exactness = $exactness;
			$this->name = $name;

			foreach($days as $day => $val) {
				array_push($this->days, $val);
			}
		}
	}

	class Year {
		public $title;
		public $year;
		public $exactness;
		//public $dates = array();
		public $months = array();

		public function __construct($title, $year, $exactness/*, $dates,*/ /*$months*/) {
			$this->title = $title;
			$this->year = $year;
			$this->exactness = $exactness;
			$this->months = array();
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

	class Era {
		public $era;
		public $title;
		public $years;
		public $description;

		public function __construct($era, $title, $description) {
			$this->era = $era;
			$this->title = $title;
			$this->description = $description;
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

			$newEra = new Era($eraId, $row["title"], $row["description"]);

			$sqlEvents = "SELECT id, year, month, day, description, type FROM tl_events WHERE era=$eraId ORDER BY era, year, month, day";
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

				if ($currentYear != $thisYear) {
					$isNewYear = true;
					$isNewMonth = true;
					$isNewDay = true;
					$currentYear = $thisYear;
					
					$newYear = new Year("yearTitle", $thisYear, "exact", $newDates);


					// resets
					$currentMonth = null;
					$currentDay = null;
					$newMonths = array();
					$newDays = array();
					//$newEntries = array();
				}

				if ($currentMonth  != $thisMonth ) {
					$isNewMonth = true;
					$isNewDay = true;
					$currentMonth = $thisMonth;
					
					$newMonth = new Month($thisMonth, "Exampluary", "exact", []);

					// resets
					$currentDay = null;
					$newDays = array();
					//$newEntries = array();
				}

				if ($currentDay != $thisDay) {
					$isNewDay = true;
					$currentDay = $thisDay;
					
					$newDay = new Day($thisDay, "exact", []);

					$newEntries = array();
				}

				array_push($newEntries, $newEntry);

				$newDay->entries = $newEntries; // here?

				if ($isNewDay) {
					//$newDay->entries = $newEntries; // or here?
					array_push($newDays, $newDay);
				}
				if ($isNewMonth) {
					$newMonth->days = $newDays;
					array_push($newMonths, $newMonth);
				}
				if ($isNewYear) {
					$newYear->months = $newMonths;
					array_push($newYears, $newYear);
				}
			}

			$newDay->entries = $newEntries;

			if ($isNewDay) {
				array_push($newDays, $newDay);
			}
		
			$newMonth->days = $newDays;

			if ($isNewMonth) {
				array_push($newMonths, $newMonth);
			}
		
		
			$newYear->months = $newMonths;

			if ($isNewYear) {
				array_push($newYears, $newYear);
			}
			
			$newEra->years = $newYears;

			array_push($eras, $newEra);
		}
	}

	

	$timeline = new stdClass();
	$timeline->id = 1;
	$timeline->statusCode = 200;
	$timeline->title = "Remote Title (hardcoded)";
	$timeline->description = "Remote description (hardcoded)";
	
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

	if (false) {
		echo "<pre>";
		print_r($timeline);
		echo "</pre>";
	}
	else {
		echo json_encode($timeline);
	}

	//echo json_encode($dates1, JSON_FORCE_OBJECT);
?>