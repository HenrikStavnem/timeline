<?php
	header("Access-Control-Allow-Origin: *");

	$eras = array();

	class Date {
		public $date;
		public $dateType;
		public $entries = array();

		public function __construct($date, $dateType, $entries) {
			$this->date = $date;
			$this->dateType = $dateType;

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

	$entries1 = array();
	$entry1 = new Entry("-An awesome title-", "-An awesome description-", "combat");
	$entry2 = new Entry("The Midsummer Festival", "{1} laughed.", "festive");
	$entry3 = new Entry("The Midsummer Festival", "{2} travels to {3}.", "travel");
	array_push($entries1, $entry1 );
	array_push($entries1, $entry2 );
	array_push($entries1, $entry3 );

	$entries2 = array();
	$entryA = new Entry("-An awesome title-", "{4}, under advice of {5}, attacks {3}.", "combat");
	$entryB = new Entry("The Midsummer Festival", "{2} is killed by {4}.", "death");
	$entryC = new Entry("The Midsummer Festival", "{4} becomes the Duchess of {3}.", "other");
	array_push($entries2, $entryA );
	array_push($entries2, $entryB );
	array_push($entries2, $entryC );

	//print_r($entries1);

	$dates1 = array();
	$date1 = new Date("22 january", "date", $entries1);
	$date2 = new Date("Winter", "division", $entries1);
	array_push($dates1, $date1);
	array_push($dates1, $date2);

	$dates2 = array();
	$dateA = new Date("16 March", "date", $entries2);
	$dateB = new Date("-2", "relative", $entries1);
	$dateC = new Date("0", "relative", $entries1);
	$dateD = new Date("2", "relative", $entries1);
	array_push($dates2, $dateA);
	array_push($dates2, $dateB);
	array_push($dates2, $dateC);
	array_push($dates2, $dateD);

	$year5 = new Year("Example", 2009, "exact", $dates1);
	$year1 = new Year("Decadium", 2010, "decade", $dates1);
	$year2 = new Year("TESTERIFY", 2015, "exact", $dates2);
	$year3 = new Year("Example", 2017, "exact", $dates1);
	$year4 = new Year("Another", 2018, "circa", $dates1);

	$years = array();
	array_push($years, $year5);
	array_push($years, $year1);
	array_push($years, $year2);
	array_push($years, $year4);

	//print_r($years);

	$timeline = new stdClass();
	$timeline->id = 1;
	$timeline->statusCode = 200;
	$timeline->title = "Remote Title";
	$timeline->description = "Remote description";
	$timeline->eras = array(
		"0" => array(
			"title" => "Era 1",
			"description" => "Era Desc 1",
			"years" => $years
			/*
			"years" => array(
				$year0,
				$year1,
				$year2
			)
			*/
		),
		"1" => array(
			"title" => "Era 2",
			"description" => "Era Desc 2",
			"years" => []
		)
	);
	$timeline->actors = array(
		"1" => array(
			"firstName" => "Cal",
			"lastName" => "Nordinger",
			"type" => "person",
			"birthYear" => 1999,
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