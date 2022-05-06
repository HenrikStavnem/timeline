<?php

header("Access-Control-Allow-Origin: *");
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');
mb_http_input('UTF-8');

init();

class RawEvent {
	public $description;
	public $accuracy;
	public $millennium;
	public $century;
	public $decade;
	public $year;
	public $season;
	public $seasonTitle;
	public $month;
	public $monthTitle;
	public $day;

	public function __construct($description, $accuracy, $millennium, $century, $decade, $year, $season, $seasonTitle, $month, $monthTitle, $day) {
		$this->description = $description;
		$this->accuracy = $accuracy;
		$this->millennium = $millennium;
		$this->century = $century;
		$this->decade = $decade;
		$this->year = $year;
		$this->season = $season;
		$this->seasonTitle = $seasonTitle;
		$this->month = $month;
		$this->monthTitle = $monthTitle;
		$this->day = $day;
	}
}

class Event {
	public $description;
	public $eventTypeTitle;
	public $eventTypeImage;

	public function __construct($description, $eventTypeTitle, $eventTypeImage) {
		$this->description = $description;
		$this->eventTypeTitle = $eventTypeTitle;
		$this->eventTypeImage = $eventTypeImage;
	}
}

class Date {
	public $accuracy;
	public $millennium;
	public $year;

	public function __construct($accuracy, $millennium, $year) {
		$this->accuracy = $accuracy;
		$this->millennium = $millennium;
		$this->year = $year;
	}
}

class Season {
	public $season;
	public $name;

	public function __construct($season, $name) {
		$this->season = $season;
		$this->name = $name;
	}
}

class Month {
	public $month;
	public $name;
	public $accuracy;
	public $days = array();

	public function __construct($month, $name, $accuracy) {
		$this->month = $month;
		$this->name = $name;
		$this->accuracy = $accuracy;
	}
}

class Era {
	public $id;
	public $title;
	public $description;
	public $image;
	public $unknown = array();
	public $years = array();

	public function __construct($id, $title, $description, $image) {
		$this->id = $id;
		$this->title = $title;
		$this->description = $description;
		$this->image = $image;
	}
}

class Year {
	public $year;
	public $accuracy;
	public $events = array();
	public $seasons = array();
	public $months = array();

	public function __construct($year, $accuracy) {
		$this->year = $year;
		$this->accuracy = $accuracy;
	}
}

class Day {
	public $day;
	public $events = array();

	public function __construct($day) {
		$this->day = $day;
	}
}

function testData() {
	$dbEvents = array();
	
	array_push($dbEvents, new RawEvent('Hmm',		'unknown',		1, null, null, null, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('MILL 1',	'millennium',	1, null, null, null, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('MILL 2',	'millennium',	1, null, null, null, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('CENT 1',	'century',		1, 1, null, null, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('CENT 2',	'century',		1, 1, null, null, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('DECA 1',	'decade',		1, 1, 1, null, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('DECA 2',	'decade',		1, 1, 1, null, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('First',		'year-circa',	1, 1, 1, 1, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('Second',	'year',			1, 1, 1, 1, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('Third',		'year',			1, 1, 1, 1, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('Third 2',	'year',			1, 2, 1, 1, null, null,	null,	null, null));
	array_push($dbEvents, new RawEvent('Fourth',	'month',		1, 1, 1, 1, null, null,	1,		'January', null));
	array_push($dbEvents, new RawEvent('Fifth',		'month',		1, 1, 1, 1, null, null,	1,		'January', null));
	array_push($dbEvents, new RawEvent('Sixth',		'month',		1, 1, 1, 1, null, null,	2,		'February', null));
	array_push($dbEvents, new RawEvent('Seventh',	'season',		1, 1, 1, 1, 1, 'Spring',	null,	null, null));
	array_push($dbEvents, new RawEvent('Eight',		'season',		1, 1, 1, 1, 1, 'Spring',	null,	null, null));
	array_push($dbEvents, new RawEvent('Ninth',		'season',		1, 1, 1, 2, 1, 'Spring',	null,	null, null));
	array_push($dbEvents, new RawEvent('DAY 1',		'day',			1, 1, 1, 1, null, null,	1,		'January', 1));
	
	//array_push($dbEvents, new RawEvent('DAY 2',		'day',			1, 1, 1, 1, null, null,	3,		'March', 1));
	array_push($dbEvents, new RawEvent('DAY 3',		'day',			1, 1, 1, 5, null, null,	4,		'April', 1));
	
	$result = new Era(1, '[HC] Title', '[HC] Description', '[HC] Image');
	
	foreach($dbEvents as $dbEvent) {
		$result = mapEvent($dbEvent, $result);
	}
	
	echo json_encode($result);
}

function init() {
	//testData();

	$connection = getConnection();

	$timeline = fetchTimeline($connection);

	$eras = fetchEras($connection, $timeline->id);

	$timeline->eras = $eras;

	echo json_encode($timeline);
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

function fetchTimeline($connection) {
	$slug = null;
	if (isset($_GET["slug"])) {
		$slug = $_GET["slug"];
	}

	if ($slug) {
		$sqlTimeline = "SELECT tl_timelines.id as id, title, tl_timelines.description as description, tl_timelines.image as image, tl_users.name as authorname, tl_users.image as authorimage from tl_timelines INNER JOIN tl_users ON tl_timelines.owner=tl_users.id WHERE url='$slug' LIMIT 1";
	}
	else {
		$sqlTimeline = "SELECT tl_timelines.id as id, title, tl_timelines.description as description, tl_timelines.image as image, tl_users.name as authorname, tl_users.image as authorimage from tl_timelines INNER JOIN tl_users ON tl_timelines.owner=tl_users.id WHERE tl_timelines.id=9 LIMIT 1";
	}

	$queryTimeline = $connection->query($sqlTimeline);

	$timeline = new StdClass();

	while ($row = $queryTimeline->fetch_assoc()) {
		$timeline->id = $row['id'];
		$timeline->title = $row['title'];
		$timeline->description = $row['description'];
		$timeline->image = $row['image'];
		$timeline->authorName = $row['authorname'];
		$timeline->authorImage = $row['authorimage'];
	}

	return $timeline;
}

function fetchEras($connection, $timelineId) {
	$sqlEras = "SELECT id, title, description, image FROM tl_eras WHERE timeline=$timelineId ORDER BY eraOrder, era";
	$queryEras = $connection->query($sqlEras);

	$eras = array();

	if ($queryEras && $queryEras->num_rows > 0) {
		while($row = $queryEras->fetch_assoc()) {
			$newEra = new Era($row['id'], $row['title'], $row['description'], $row['image']);

			//$newEra = fetchEraEvents($connection, $timelineId, $newEra);
			//fetchEraEvents($connection, $timelineId, $newEra);

			//$newEra->events = fetchEraEvents($connection, $timelineId, $newEra);
			$newEra = fetchEraEvents($connection, $timelineId, $newEra);

			array_push($eras, $newEra);
		}
	}

	return $eras;
}

function fetchEraEvents($connection, $timelineId, $era) {
	$eraId = $era->id;

	$sql = "SELECT tl_events.id, year, tl_seasons.id as season, tl_seasons.title as seasonTitle, tl_events.month as month, tl_months.title as monthTitle, day, description, 		image, yearExactness, monthExactness, exactness
		FROM tl_events
		INNER JOIN tl_event_types
			ON tl_events.type = tl_event_types.id
		LEFT JOIN tl_months
			ON tl_events.month = tl_months.month AND tl_months.timeline_id = $timelineId
		LEFT JOIN tl_seasons
			ON tl_events.season = tl_seasons.id AND tl_seasons.timeline = $timelineId
		WHERE era=$eraId
		ORDER BY era, year, yearExactness, season, month, day, exactness, id";

	$query = $connection->query($sql);

	$events = array();

	while($row = $query->fetch_assoc()) {
		//array_push($dbEvents, new RawEvent('DAY 1',		'day',			1, 1, 1, 1, null, null,	1,		'January', 1));
		$dbEvent = new RawEvent($row['description'], $row['exactness'], 8, 83, 835, $row['year'], $row['season'], $row['seasonTitle'], $row['month'], $row['monthTitle'], $row['day']);	// TODO: db changes needed for hardcoded values

		$era = mapEvent($dbEvent, $era);

		//array_push($events, $row['description']);
		array_push($events, $dbEvent);
	}

	//return $events;
	return $era;
}

function mapEvent($dbEvent, $result) {
	$accuracy = $dbEvent->accuracy;

	if ($accuracy == 'unknown') {
		$result = createUnknown($result, $dbEvent);
	}

	if (in_array($accuracy, getValidYearTypes())) {
		$result = createYear($result, $dbEvent);
	}

	if ($accuracy == 'season') {
		$result = createSeason($result, $dbEvent);
	}

	if ($accuracy == 'month') {
		$result = createMonth($result, $dbEvent);
	}

	if ($accuracy == 'day') {
		$result = createDay($result, $dbEvent);
	}

	return $result;
}

function createEvent($dbEvent) {
	return new Event($dbEvent->description, 'Birth', 'birth.png');
}

function createUnknown($era, $dbEvent) {
	$unknowns = $era->unknown;

	array_push($unknowns, createEvent($dbEvent));
	$era->unknown = $unknowns;

	return $era;
}

function createYear($era, $dbEvent) {
	$years = $era->years;
	$validYearTypes = getValidYearTypes();

	$index = 0;
	$existingYearIndex = getExistingYearIndex($years, $dbEvent);

	if ($existingYearIndex !== false) {
		if (in_array($dbEvent->accuracy, $validYearTypes)) {
			$existingYear = $years[$existingYearIndex];
			$events = $existingYear->events;
			array_push($events, createEvent($dbEvent));
			$existingYear->events = $events;
		}
	}
	else {
		$newYearaccuracy = in_array($dbEvent->accuracy, $validYearTypes) ? $dbEvent->accuracy : 'year';

		$newYearValue = $dbEvent->year;

		if ($dbEvent->accuracy == 'millennium') {
			$newYearValue = $dbEvent->millennium;
		}

		switch($dbEvent->accuracy) {
			case 'millennium':	$newYearValue = $dbEvent->millennium;	break;
			case 'century':		$newYearValue = $dbEvent->century;		break;
			case 'decade':		$newYearValue = $dbEvent->decade;		break;
		}

		$newYear = new Year($newYearValue, $newYearaccuracy);

		if (in_array($dbEvent->accuracy, $validYearTypes)) {
			$newYear->events = [createEvent($dbEvent)];
		}

		array_push($years, $newYear);
		$era->years = $years;
	}

	return $era;
}

function createSeason($era, $dbEvent) {
	// First, create year if missing
	$era = createYear($era, $dbEvent);

	// Get relevant year
	$years = $era->years;
	$existingYearIndex = getExistingYearIndex($years, $dbEvent);
	$existingYear = $years[$existingYearIndex];

	$seasons = $existingYear->seasons;
	$seasons = is_countable($seasons) ? $seasons : [];

	$existingSeasonIndex = array_search($dbEvent->season, array_column($seasons, 'season'), true);

	// TODO: Do rest

	if ($existingSeasonIndex !== false) {
		$existingSeason = $seasons[$existingSeasonIndex];

		$events = $existingSeason->events;
		array_push($events, createEvent($dbEvent));
		$existingSeason->events = $events;
	}
	else {
		$newSeason = new Season($dbEvent->season, $dbEvent->seasonTitle);
		$events = array();
		array_push($events, createEvent($dbEvent));
		$newSeason->events = $events;

		array_push($seasons, $newSeason);
		$existingYear->seasons = $seasons;
	}

	return $era;
}

function createMonth($era, $dbEvent) {
	// First, create year if missing
	$era = createYear($era, $dbEvent);

	// Get relevant year
	$years = $era->years;
	$existingYearIndex = getExistingYearIndex($years, $dbEvent);
	$existingYear = $years[$existingYearIndex];

	// Check if month already exists
	$months = $existingYear->months;
	$months = is_countable($months) ? $months : [];

	$existingMonthIndex = array_search($dbEvent->month, array_column($months, 'month'), true);

	if ($existingMonthIndex !== false) {
		$existingMonth = $months[$existingMonthIndex];

		if ($dbEvent->accuracy == 'month') { // TODO: Include month-circa, month-before, month-after etc.
			$events = $existingMonth->events;
			array_push($events, createEvent($dbEvent));
			$existingMonth->events = $events;
		}
	}
	else {
		$validMonthTypes = getValidMonthTypes();
		$newMonthaccuracy = in_array($dbEvent->accuracy, $validMonthTypes) ? $dbEvent->accuracy : 'month';
		$newMonth = new Month($dbEvent->month, $dbEvent->monthTitle, $newMonthaccuracy);
		
		if ($dbEvent->accuracy == 'month') {
			$events = array();
			array_push($events, createEvent($dbEvent));
			$newMonth->events = $events;
		}

		array_push($months, $newMonth);
		$existingYear->months = $months;

		$temp = $existingYear->months;
	}

	return $era;
}

function createDay($era, $dbEvent) {
	// First, create month (and year) if missing
	$era = createMonth($era, $dbEvent);

	$years = $era->years;
	$existingYearIndex = getExistingYearIndex($years, $dbEvent);
	$existingYear = $years[$existingYearIndex];

	$months = $existingYear->months;
	$existingMonthIndex = getExistingMonthIndex($months, $dbEvent);
	$existingMonth = $months[$existingMonthIndex];

	$days = $existingMonth->days;

	$existingDayIndex = getExistingDayIndex($days, $dbEvent);

	if ($existingDayIndex !== false) {
		$existingDay = $days[$existingDayIndex];

		$events = $existingDay->events;
		array_push($events, createEvent($dbEvent));
		$existingDay->events = $events;
	}
	else {
		$newDay = new Day($dbEvent->day);

		$events = array();
		array_push($events, createEvent($dbEvent));
		$newDay->events = $events;

		array_push($days, $newDay);
		$existingMonth->days = $days;
	}

	return $era;
}

function getExistingYearIndex($years, $dbEvent) {
	$validYearTypes = getValidYearTypes();

	$index = 0;
	$existingYearIndex = false;
	foreach($years as $year) {
		$accuracy = in_array($dbEvent->accuracy, $validYearTypes) ? $dbEvent->accuracy : 'year';

		switch($accuracy) {
			case 'millennium':	$eventAccuracy = $dbEvent->millennium; break;
			case 'century':		$eventAccuracy = $dbEvent->century;  break;
			case 'decade':		$eventAccuracy = $dbEvent->decade; break;
			default: 			$eventAccuracy = $dbEvent->year;
		}

		if ($year->year == $eventAccuracy && $year->accuracy == $accuracy) {
			$existingYearIndex = $index;
			break;
		}
		$index += 1;
	}

	return $existingYearIndex;
}

function getExistingMonthIndex($months, $dbEvent) {
	$index = 0;
	$existingMonthIndex = false;

	foreach($months as $month) {
		if ($month->month == $dbEvent->month && $month->accuracy == $dbEvent->accuracy) {
			$existingMonthIndex = $index;
			break;
		}

		$index += 1;
	}

	return $existingMonthIndex;
}

function getExistingDayIndex($days, $dbEvent) {
	$index = 0;
	$existingDayIndex = false;

	foreach($days as $day) {
		if ($day->day == $dbEvent->day /*&& $day->accuracy == $dbEvent->accuracy*/) {
			$existingDayIndex = $index;
			break;
		}
		$index += 1;
	}

	return $existingDayIndex;
}

function getValidYearTypes() {
	return ['millennium', 'century', 'decade', 'year-circa', 'year'];
}

function getValidMonthTypes() {
	return ['month', 'month-circa'];
}

?>