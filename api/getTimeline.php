<?php
	header("Access-Control-Allow-Origin: *");
	mb_internal_encoding('UTF-8');
	mb_http_output('UTF-8');
	mb_http_input('UTF-8');

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
		public $items = array();
		public $locations = array();
	}

	class Character {
		public $id;

		public $firstName;
		public $lastName;
		public $type = "person";
		public $slug;

		public $parent1;	// could also be an array
		public $parent2;
		public $birthDate;
		public $deathDate;
		public $image;		// character picture

		//arrays?
		/*
		public $symbols;	// shield or symbol infront of name
		public $genders;	// can change over time
		public $races;
		public $subraces;
		*/

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

	class Date {
		public function __construct($era, $year, $month, $day) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
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
			$this->day = intval($day);
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
			$this->month = intval($month);
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
			$this->year = intval($year);
			$this->exactness = $exactness;
			$this->months = $months;
		}
	}

	class Era {
		public $era;
		public $title;
		public $years;
		public $description;
		public $image;

		public function __construct($era, $title, $description, $image) {
			$this->era = intval($era);
			$this->title = $title;
			$this->description = $description;
			$this->image = $image;
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
		global $charactersIndexList, $itemsIndexList, $locationsIndexList, $characterSettingsList;
		
		$parts = explode("-", $string);
		$type = $parts[0];
		$parts = explode("|", $parts[1]);
		$index = $parts[0];

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
	$connection->set_charset('utf8');
	

	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	}

	if ($slug) {
		$sqlTimeline = "SELECT tl_timelines.id as id, title, tl_timelines.description as description, tl_timelines.image as image, tl_users.name as authorname, tl_users.image as authorimage from tl_timelines INNER JOIN tl_users ON tl_timelines.owner=tl_users.id WHERE url='$slug' LIMIT 1";
	}
	else {
		$sqlTimeline = "SELECT tl_timelines.id as id, title, tl_timelines.description as description, tl_timelines.image as image, tl_users.name as authorname, tl_users.image as authorimage from tl_timelines INNER JOIN tl_users ON tl_timelines.owner=tl_users.id WHERE tl_timelines.id=1 LIMIT 1";
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

		$timelineAuthor = new Author($row['authorname'], $row['authorimage']);
	}


	$sqlEras = "SELECT id, title, description, image FROM tl_eras WHERE timeline=$timelineId ORDER BY eraOrder, era";
	$queryEras = $connection->query($sqlEras);

	$eras = array();

	if ($queryEras->num_rows > 0) {
		while($row = $queryEras->fetch_assoc()) {
			
			$eraId = $row["id"];

			$newEra = new Era($eraId, $row["title"], $row["description"], $row['image']);

			$sqlEvents = "SELECT tl_events.id, year, tl_events.month as month, tl_months.title as monthTitle, day, description, image
				FROM tl_events
				INNER JOIN tl_event_types
					ON tl_events.type = tl_event_types.id
				LEFT JOIN tl_months
					ON tl_events.month = tl_months.month
				WHERE era=$eraId
				ORDER BY era, year, month, day";

			/*
			$sqlEvents = "SELECT tl_events.id, tl_events.year, tl_events.month, tl_events.day, tl_events.description, tl_events.type, tl_months.month as monthTitle FROM tl_events LEFT JOIN tl_months ON tl_events.month = tl_months.month WHERE era=$eraId AND tl_months.timeline_id=$timelineId ORDER BY tl_events.era, tl_events.year, tl_events.month, tl_events.day";
			*/

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

			while($rowEvent = $queryEvents->fetch_assoc()) {
				$isNewYear = false;
				$isNewMonth = false;
				$isNewDay = false;

				$isFirstIndex = false;
				$isLastIndex = false;

				$thisYear = $rowEvent['year'];
				$thisMonth = $rowEvent['month'];
				$thisDay = $rowEvent['day'];

				$monthTitle = $rowEvent['monthTitle'];

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

				extractReferences($rowEvent['description']);
				$newEvent = new Event($rowEvent['description'], $rowEvent['image']);

				if ($isNewDay && !$isFirstIndex) {
					$newDay = new Day($currentDay, "exact", $newEvents);

					array_push($newDays, $newDay);

					$newEvents = array();
					$currentDay = $thisDay;

					if ($isNewMonth && !$isFirstIndex) {
						$newMonth = new Month($currentMonth, $monthTitle, "exact", $newDays);
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

					$newMonth = new Month($currentMonth, $monthTitle, "exact", $newDays);
					array_push($newMonths, $newMonth);

					$newYear = new Year("yearTitle", $currentYear, "exact", $newMonths);
					array_push($newYears, $newYear);
				}
			}

			$newEra->years = $newYears;

			array_push($eras, $newEra);
		}
	}

	$characters = array();

	if (count($charactersIndexList) > 0) {
		$ids = join(',',$charactersIndexList);
		$sqlCharacters = "SELECT id, firstname, lastname, birthEra, birthYear, birthMonth, birthDay, deathEra, deathYear, deathMonth, deathDay, slug from tl_characters WHERE id IN ($ids)";
		$queryCharacters = $connection->query($sqlCharacters);

		while($row = $queryCharacters->fetch_assoc()) {
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

			$character = new Character();
			$character->id = $row['id'];
			$character->firstName = $row['firstname'];
			$character->lastName = $row['lastname'];
			$character->birthDate = new Date($row['birthEra'], $row['birthYear'], $row['birthMonth'], $row['birthDay']);
			$character->deathDate = new Date($row['deathEra'], $row['deathYear'], $row['deathMonth'], $row['deathDay']);
			$character->slug = $row['slug'];

			$sqlCharacterTitles = "SELECT title, ordinal, startEra, startYear, startMonth, startDay, endEra, endYear, endMonth, endDay FROM tl_character_titles WHERE characterId=".$row['id'];
			$queryCharacterTitles = $connection->query($sqlCharacterTitles);

			$characterTitles = array();
			while($row = $queryCharacterTitles->fetch_assoc()) {
				$startDate = new Date($row['startEra'], $row['startYear'], $row['startMonth'], $row['startDay']);
				$endDate = new Date($row['endEra'], $row['endYear'], $row['endMonth'], $row['endDay']);

				array_push($characterTitles, new CharacterTitle($row['title'], $startDate, $endDate));
			}

			$character->titles = $characterTitles;
			
			array_push($characters, $character);
		}
	}

	$timeline = new stdClass();

	$timeline->slug = $slug;

	$timeline->id = $timelineId;
	$timeline->statusCode = 200;		// TODO: Hardcoded
	$timeline->title = $timelineTitle;
	$timeline->description = $timelineDescription;
	$timeline->image = $timelineImage;
	$timeline->author = $timelineAuthor;
	
	$timeline->eras = $eras;


	$actors = new Actors();
	$actors->characters = $characters;

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