<?php

header("Access-Control-Allow-Origin: *");
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');
mb_http_input('UTF-8');

$charactersIndexList = array();
$itemsIndexList = array();

init();

class RawEvent {
	public $description;
	public $accuracy;
	public $eventType;
	public $eventTypeImage;
	public $millennium;
	public $century;
	public $decade;
	public $year;
	public $season;
	public $seasonTitle;
	public $month;
	public $monthTitle;
	public $day;
	public $eventOrder;

	public function __construct($description, $accuracy, $eventType, $eventTypeImage, $millennium, $century, $decade, $year, $season, $seasonTitle, $month, $monthTitle, $day, $eventOrder) {
		$this->description = $description;
		$this->accuracy = $accuracy;
		$this->eventType = $eventType;
		$this->eventTypeImage = $eventTypeImage;
		$this->millennium = $millennium;
		$this->century = $century;
		$this->decade = $decade;
		$this->year = $year;
		$this->season = $season;
		$this->seasonTitle = $seasonTitle;
		$this->month = $month;
		$this->monthTitle = $monthTitle;
		$this->day = $day;
		$this->eventOrder = $eventOrder;
	}
}

class Event {
	public $description;
	public $eventTypeTitle;
	public $eventTypeImage;

	public function __construct($description, $eventTypeTitle, $eventTypeImage, $eventOrder) {
		$this->description = $description;
		$this->eventTypeTitle = $eventTypeTitle;
		$this->eventTypeImage = $eventTypeImage;
		$this->eventOrder = $eventOrder;
	}
}

class Character {

}

class Date {
	public $era;
	public $year;
	public $month;

	public function __construct($era, $year, $month, $day) {
		$this->era = $era;
		$this->year = $year;
		$this->month = $month;
		$this->day = $day;
	}
}

class Season {
	public $season;
	public $title;

	public function __construct($season, $title) {
		$this->season = $season;
		$this->title = $title;
	}
}

class Month {
	public $month;
	public $title;
	public $accuracy;
	public $days = array();

	public function __construct($month, $title, $accuracy) {
		$this->month = $month;
		$this->title = $title;
		$this->accuracy = $accuracy;
	}
}

class Era {
	public $id;
	public $era;
	public $title;
	public $description;
	public $image;
	public $unknownBefore = array();
	public $unknownAfter = array();
	public $years = array();

	public function __construct($id, $era, $title, $description, $image) {
		$this->id = $id;
		$this->era = $era;
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
	global $charactersIndexList;
	//testData();

	$connection = getConnection();

	$timeline = fetchTimeline($connection);

	$eras = fetchEras($connection, $timeline->id);

	$characters = getCharacters($connection);

	$timeline->eras = $eras;
	$timeline->characters = $characters;

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
	// TODO: Handle empty slugs

	$slug = null;
	if (isset($_GET["slug"])) {
		$slug = $_GET["slug"];
	}

	if ($slug != null) {
		$sqlTimeline = "SELECT tl_timelines.id as id, title, tl_timelines.description as description, tl_timelines.image as image, tl_users.name as authorname, tl_users.image as authorimage, tl_timelines.url as slug from tl_timelines INNER JOIN tl_users ON tl_timelines.owner=tl_users.id WHERE url='$slug' LIMIT 1";
	}
	else {
		$sqlTimeline = "SELECT tl_timelines.id as id, title, tl_timelines.description as description, tl_timelines.image as image, tl_users.name as authorname, tl_users.image as authorimage, tl_timelines.url as slug from tl_timelines INNER JOIN tl_users ON tl_timelines.owner=tl_users.id WHERE tl_timelines.id = 9 LIMIT 1";
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
		$timeline->slug = $row['slug'];
	}

	return $timeline;
}

function fetchEras($connection, $timelineId) {
	$sqlEras = "SELECT id, era, title, description, image FROM tl_eras WHERE timeline=$timelineId ORDER BY eraOrder, era";
	$queryEras = $connection->query($sqlEras);

	$eras = array();

	if ($queryEras && $queryEras->num_rows > 0) {
		while($row = $queryEras->fetch_assoc()) {
			$newEra = new Era($row['id'], $row['era'], $row['title'], $row['description'], $row['image']);
			$newEra = fetchEraEvents($connection, $timelineId, $newEra);

			array_push($eras, $newEra);
		}
	}

	return $eras;
}

function fetchEraEvents($connection, $timelineId, $era) {
	$eraId = $era->id;

	$sql = "SELECT tl_events.id, millennium, century, decade, year, tl_seasons.id as season, tl_seasons.title as seasonTitle, tl_events.month as month, tl_months.title as monthTitle, day, description, tl_event_types.title as eventType, tl_event_types.image as eventTypeImage, yearExactness, monthExactness, exactness, eventOrder
		FROM tl_events
		INNER JOIN tl_event_types
			ON tl_events.type = tl_event_types.id
		LEFT JOIN tl_months
			ON tl_events.month = tl_months.month AND tl_months.timeline_id = $timelineId
		LEFT JOIN tl_seasons
			ON tl_events.season = tl_seasons.id AND tl_seasons.timeline = $timelineId
		WHERE era=$eraId
		ORDER BY era, year, exactness, season, month, day, eventOrder, id";

	$query = $connection->query($sql);

	$events = array();

	while($row = $query->fetch_assoc()) {
		$dbEvent = new RawEvent($row['description'], $row['exactness'], $row['eventType'], $row['eventTypeImage'], 8, $row['century'], 835, $row['year'], $row['season'], $row['seasonTitle'], $row['month'], $row['monthTitle'], $row['day'], $row['eventOrder']);	// TODO: db changes needed for hardcoded values

		$era = mapEvent($dbEvent, $era);

		extractReferences($row['description']);

		array_push($events, $dbEvent);
	}

	//return $events;
	return $era;
}

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

function getCharacters($connection) {
	global $charactersIndexList;

	$characters = array();

	if (count($charactersIndexList) > 0) {
		sort($charactersIndexList);

		$ids = join(',',$charactersIndexList);
		$sql = "SELECT id, firstname, lastname, birthEra, birthYear, birthMonth, birthDay, deathEra, deathYear, deathMonth, deathDay, image, coverImage, slug from tl_characters WHERE id IN ($ids)";
		$query = $connection->query($sql);

		while($row = $query->fetch_assoc()) {
			$character = new Character();
			$character->id = $row['id'];
			$character->firstName = $row['firstname'];
			$character->lastName = $row['lastname'];
			$character->birthDate = new Date($row['birthEra'], $row['birthYear'], $row['birthMonth'], $row['birthDay']);
			$character->deathDate = new Date($row['deathEra'], $row['deathYear'], $row['deathMonth'], $row['deathDay']);
			$character->image = $row['image'];
			$character->coverImage = $row['coverImage'];
			$character->slug = $row['slug'];

			array_push($characters, $character);
		}
	}

	return $characters;
}

function mapEvent($dbEvent, $result) {
	$accuracy = $dbEvent->accuracy;

	if ($accuracy == 'unknown-before') {
		$result = createUnknownBefore($result, $dbEvent);
	}

	if ($accuracy == 'unknown-after') {
		$result = createUnknownAfter($result, $dbEvent);
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
	return new Event($dbEvent->description, $dbEvent->eventType, $dbEvent->eventTypeImage, $dbEvent->eventOrder);
}

function createUnknownBefore($era, $dbEvent) {
	$unknowns = $era->unknownBefore;

	array_push($unknowns, createEvent($dbEvent));
	$era->unknownBefore = $unknowns;

	return $era;
}

function createUnknownAfter($era, $dbEvent) {
	$unknowns = $era->unknownAfter;

	array_push($unknowns, createEvent($dbEvent));
	$era->unknownAfter = $unknowns;

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
		$newYearAccuracy = in_array($dbEvent->accuracy, $validYearTypes) ? $dbEvent->accuracy : 'year';

		$newYearValue = $dbEvent->year;

		if ($dbEvent->accuracy == 'millennium') {
			$newYearValue = $dbEvent->millennium;
		}

		switch($dbEvent->accuracy) {
			case 'millennium':	$newYearValue = $dbEvent->millennium;	break;
			case 'century':		$newYearValue = $dbEvent->century;		break;
			case 'decade':		$newYearValue = $dbEvent->decade;		break;
		}

		$newYear = new Year($newYearValue, $newYearAccuracy);

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
		if ($month->month == $dbEvent->month /*&& $month->accuracy == $dbEvent->accuracy*/) {
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
	return ['millennium', 'century', 'decade', 'year-circa', 'year', 'beforeYear', 'afterYear'];
}

function getValidMonthTypes() {
	return ['month', 'month-circa'];
}

?>