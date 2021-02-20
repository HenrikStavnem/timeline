<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "timeline";

	$slug = null;
	if (isset($_GET["slug"])) {
		$slug = $_GET["slug"];
	}

	class Author {
		public $name;
		public $icon;

		public function __construct($name, $icon) {
			$this->name = $name;
			$this->icon = $icon;
		}
	}

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
		public $title;
		public $exactness;
		public $days = array();

		public function __construct($month, $title, $exactness, $days) {
			$this->month = $month;
			$this->exactness = $exactness;
			$this->title = $title;

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

	$eras = array();
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

	if ($slug) {
		$sqlTimeline = "SELECT id, title, description, image, owner from tl_timelines WHERE url='$slug' LIMIT 1";
	}
	else {
		$sqlTimeline = "SELECT id, title, description, image, owner from tl_timelines WHERE id=1 LIMIT 1";
	}
	$queryTimeline = $connection->query($sqlTimeline);

	$timelineId = null;
	$timelineTitle = "";
	$timelineDescription = "";

	while ($row = $queryTimeline->fetch_assoc()) {
		$timelineId = $row['id'];
		$timelineTitle = $row['title'];
		$timelineDescription = $row['description'];
		$timelineImage = $row['image'];
	}


	$sqlEras = "SELECT id, title, description FROM tl_eras WHERE timeline=$timelineId";
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
							$newYear = new Year("yearTitle", $currentYear, "relative", $newMonths);

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

	$timeline->slug = $slug;

	$timeline->id = $timelineId;
	$timeline->statusCode = 200;		// TODO: Hardcoded
	$timeline->title = $timelineTitle;
	$timeline->description = $timelineDescription;
	$timeline->image = $timelineImage;
	$timeline->author = new Author("Henrik Stavnem", "icon-example");
	
	$timeline->eras = $eras;

	$timeline->actors = $actors;

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