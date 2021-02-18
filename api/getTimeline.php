<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$eras = array();

	class Actors {
		public $characters = array();
	}

	class Character {
		public $id;

		public $firstName;
		public $lastName;
		public $birthYear;
		public $type = "person";

		public $parent1;	// could also be an array
		public $parent2;
		public $birth;
		public $death;
		public $image;		// character picture

		//arrays?
		public $symbols;	// shield or symbol infront of name
		public $genders;	// can change over time
		public $races;
		public $subraces;

		//arrays for sure
		public $names = array();
		public $titles;
	}

	class CharacterTitle {
		public $title;
		public $startDate;
		public $endDate;

		public function __construct($title, $startDate, $endDate) {
			$this->title = $title;
			$this->startDate = $startDate;
			$this->endDate = $endDate;
		}
	}

	class Event {
		public $description;
		public $type;

		public function __construct($description, $type) {
			$this->description = $description;
			$this->type = $type;
		}
	}

	class Day {
		public $day;
		public $dateType;
		public $entries = array();

		public function __construct($day, $dateType, $entries) {
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

		public function __construct($title, $year, $exactness/*, $dates,*/, $months) {
			$this->title = $title;
			$this->year = $year;
			$this->exactness = $exactness;
			$this->months = $months;
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

	$charactersIndexList = array();
	$itemsIndexList = array();
	$locationsIndexList = array();

	function extractReferences($string) {
		$needle = "{";
		$lastPos = 0;
		$startPositions = array();

		// get all start brackets
		while (($lastPos = strPos($string, $needle, $lastPos)) !== false) {
			$startPositions[] = $lastPos;
			$lastPos = $lastPos + strlen($needle);
		}

		$lastPos = 0;
		$endPositions = array();
		$needle = "}";

		// get all end brackets {
		while (($lastPos = strpos($string, $needle, $lastPos))!== false) {
			$endPositions[] = $lastPos;
			$lastPos = $lastPos + strlen($needle);
		}

		foreach ($startPositions as $key=>$value) {
			$endPos = $endPositions[$key]-1 - $startPositions[$key];
			$substr = substr($string, $startPositions[$key]+1, $endPos);
			indexReferences($substr);
		}
	}

	function indexReferences($string) {
		global $charactersIndexList, $itemsIndexList, $locationsIndexList;
		
		$parts = explode("-", $string);		
		$type = $parts[0];
		$index = $parts[1];

		switch ($type) {
			case "char":
				if (!in_array($index, $charactersIndexList)) {
					array_push($charactersIndexList, $index);
				}
				break;
			case "item": 
				if (!in_array($index, $itemsIndexList)) {
					array_push($itemsIndexList, $index);
				}
				break;
			case "location": 
				if (!in_array($index, $locationsIndexList)) {
					array_push($locationsIndexList, $index);
				}
				break;
			default: echo "Error: Not recognized type '$type'<br />";
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

			// NEW START

			$currentYear = null;
			$currentMonth = null;
			$currentDay = null;

			$newYears = array();
			$newMonths = array();
			$newDays = array();
			$newEvents = array();

			$i = 0;
			$lastIndex = $queryEvents->num_rows;

			while($rowEra = $queryEvents->fetch_assoc()) {
				$isNewYear = false;
				$isNewMonth = false;
				$isNewDay = false;

				$isFirstIndex = false;
				$isLastIndex = false;

				$thisYear = $rowEra['year'];
				$thisMonth = $rowEra['month'];
				$thisDay = $rowEra['day'];

				if ($i === 0) {
					$isFirstIndex = true;
				}

				if (++$i === $lastIndex) {
					$isLastIndex = true;
				}

				if ($currentYear != $thisYear) {
					$isNewYear = true;
					$isNewMonth = true;
					$isNewDay = true;
	
				}
		
				if ($currentMonth != $thisMonth) {
					$isNewMonth = true;
					$isNewDay = true;
				}
		
				if ($currentDay != $thisDay) {
					$isNewDay = true;
				}
		
				if ($isFirstIndex) {
					$currentMonth = $thisMonth;
					$currentYear = $thisYear;
					$currentDay = $thisDay;
				}

				extractReferences($rowEra['description']);
				$newEvent = new Event($rowEra['description'], "other");

				if ($isNewDay && !$isFirstIndex) {
					$newDay = new Day($currentDay, "exact", $newEvents);

					array_push($newDays, $newDay);

					$newEvents = array();
					$currentDay = $thisDay;

					if ($isNewMonth && !$isFirstIndex) {
						$newMonth = new Month($currentMonth, "month name", "exact", $newDays);
						array_push($newMonths, $newMonth);

						$newDays = array();

						$currentMonth = $thisMonth;

						if ($isNewYear && !$isFirstIndex) {
							$newYear = new Year("yearTitle", $currentYear, "exact", $newMonths);

							array_push($newYears, $newYear);

							$newMonths = array();
							$currentYear = $thisYear;
						}
					}
				}

				array_push($newEvents, $newEvent);

				if ($isLastIndex) {
					$newDay = new Day($currentDay, "exact", $newEvents);
					array_push($newDays, $newDay);

					$newMonth = new Month($currentMonth, "monthName", "exact", $newDays);
					array_push($newMonths, $newMonth);

					$newYear = new Year("yearTitle", $currentYear, "exact", $newMonths);
					array_push($newYears, $newYear);
				}
			}

			$newEra->years = $newYears;

			array_push($eras, $newEra);
		}
	}

	$sqlActors = "SELECT id, firstname, lastname, birthYear, deathYear from tl_characters";
	$queryActors = $connection->query($sqlActors);

	$actors = array();

	while($row = $queryActors->fetch_assoc()) {
		/*
		public $id;
		public $parent1;	// could also be an array
		public $parent2;
		public $birth;
		public $death;
		public $image;		// character picture

		//arrays?
		public $symbols;	// shield or symbol infront of name
		public $genders;	// can change over time
		public $races;
		public $subraces;

		//arrays for sure
		public $names;
		public $titles;
		*/

		$actor = new Character();
		$actor->id = $row['id'];
		$actor->firstName = $row['firstname'];
		$actor->lastName = $row['lastname'];
		$actor->birthYear = $row['birthYear'];

		$actorTitles = array();		// DODO: Hardcoded
		array_push($actorTitles, new CharacterTitle('Duke', 1900, 1960));
		array_push($actorTitles, new CharacterTitle('King', 1961, 1985));
		array_push($actorTitles, new CharacterTitle('Beggar', 1984, 1985));
		array_push($actorTitles, new CharacterTitle('Jester', 1985, 1986));
		array_push($actorTitles, new CharacterTitle('Captain', 1986, 2030));

		$actor->titles = $actorTitles;
		
		array_push($actors, $actor);
	}

	$timeline = new stdClass();
	$timeline->id = 1;		// TODO: Hardcoded
	$timeline->statusCode = 200;		// TODO: Hardcoded
	$timeline->title = "Remote Title (hardcoded)";		// TODO: Hardcoded
	$timeline->description = "Remote description (hardcoded)";		// TODO: Hardcoded
	
	$timeline->eras = $eras;

	$timeline->actors = $actors;

	/*
	$timeline->actors = array(		// TODO: Hardcoded
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
	*/

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