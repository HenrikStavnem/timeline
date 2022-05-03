<?php

class RawEvent {
	public $description;
	public $exactness;
	public $millennium;
	public $year;
	public $season;
	public $seasonTitle;
	public $month;
	public $monthTitle;

	public function __construct($description, $exactness, $millennium, $year, $season, $seasonTitle, $month, $monthTitle) {
		$this->description = $description;
		$this->exactness = $exactness;
		$this->millennium = $millennium;
		$this->year = $year;
		$this->month = $month;
		$this->season = $season;
		$this->seasonTitle = $seasonTitle;
		$this->monthTitle = $monthTitle;
	}
}

class Date {
	public $exactness;
	public $millennium;
	public $year;

	public function __construct($exactness, $millennium, $year) {
		$this->exactness = $exactness;
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

	public function __construct($month, $name) {
		$this->month = $month;
		$this->name = $name;
	}
}

class Era {
	public $unknown = array();
	public $millennia = array();
	public $years = array();
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

class Millennium {
	public $millennium;
	public $events = array();

	public function __construct($millennium) {
		$this->millennium = $millennium;
	}
}

$dbEvents = array();

array_push($dbEvents, new RawEvent('First',		'year-circa',	1, 1, null, null,	null,	null));
array_push($dbEvents, new RawEvent('Second',	'year',			1, 1, null, null,	null,	null));
array_push($dbEvents, new RawEvent('Third',		'year',			1, 1, null, null,	null,	null));
array_push($dbEvents, new RawEvent('Third 2',	'year',			1, 2, null, null,	null,	null));
array_push($dbEvents, new RawEvent('Fourth',	'month',		1, 1, null, null,	1,		'January'));
array_push($dbEvents, new RawEvent('Fifth',		'month',		1, 1, null, null,	1,		'January'));
array_push($dbEvents, new RawEvent('Sixth',		'month',		1, 1, null, null,	2,		'February'));
array_push($dbEvents, new RawEvent('Seventh',	'season',		1, 1, 1, 'Spring',	null,	null));
array_push($dbEvents, new RawEvent('Eight',		'season',		1, 1, 1, 'Spring',	null,	null));

/*
array_push($dbEvents, new RawEvent('unknown',	'unknown',		null, null,	null,	null));
array_push($dbEvents, new RawEvent('unknown 2',	'unknown',		null, null,	null,	null));
array_push($dbEvents, new RawEvent('MILL',		'millennium',	1, null,	null,	null));
array_push($dbEvents, new RawEvent('MILL 2',	'millennium',	1, null,	null,	null));
array_push($dbEvents, new RawEvent('MILL 3',	'millennium',	2, null,	null,	null));
array_push($dbEvents, new RawEvent('First',		'year',			1, 1,		null,	null));
array_push($dbEvents, new RawEvent('Circa',		'year-circa',	1, 1,		null,	null));
array_push($dbEvents, new RawEvent('Second',	'year',			1, 1,		null,	null));
array_push($dbEvents, new RawEvent('Third',		'year',			1, 1,		null,	null));
array_push($dbEvents, new RawEvent('Fourth',	'year',			1, 2,		null,	null));
array_push($dbEvents, new RawEvent('Fifth',		'year',			1, 2,		null,	null));
array_push($dbEvents, new RawEvent('TEST',		'year',			1, 55,		null,	null));
array_push($dbEvents, new RawEvent('TEST 2',	'year',			1, 32,		null,	null));
array_push($dbEvents, new RawEvent('Sixth',		'year',			1, 3,		1,		'Jan'));
array_push($dbEvents, new RawEvent('Seventh',	'year',			1, 3,		1,		'Jan'));
array_push($dbEvents, new RawEvent('Eighth',	'season',		1, 1,		2,		'Feb'));
array_push($dbEvents, new RawEvent('Eighth',	'month',		1, 1,		2,		'Feb'));
array_push($dbEvents, new RawEvent('Ninth',		'month',		1, 4,		2,		'Feb'));
array_push($dbEvents, new RawEvent('Tenth',		'month',		1, 4,		2,		'Feb'));
*/

//echo "Test: " . array_search(2, array_column($dbEvents, 'year')) . "<br /><br />";
//echo "False:".true."<br /><br />";

$index = 0;
$result = new Era();

foreach($dbEvents as $dbEvent) {
	$index = $index + 1;
	$result = func($dbEvent, $result);
}

echo json_encode($result);

function func($dbEvent, $result) {
	$accuracy = $dbEvent->exactness;

	if ($accuracy == 'unknown') {
		$result = createUnknown($result, $dbEvent);
	}

	/*
	if ($accuracy == 'millennium') {
		// TODO: Having a seperate list with millennia might not work. Maybe extend createYear to include years with different exactnesses. 
		$result = createMillennium($result, $dbEvent);
	}
	*/

	if ($accuracy == 'year' || $accuracy == 'year-circa') {
		$result = createYear($result, $dbEvent);
	}

	if ($accuracy == 'season') {
		$result = createSeason($result, $dbEvent);
	}

	if ($accuracy == 'month') {
		$result = createMonth($result, $dbEvent);
	}

	return $result;
}

function createUnknown($era, $dbEvent) {
	$unknowns = $era->unknown;

	array_push($unknowns, $dbEvent->description);
	$era->unknown = $unknowns;

	return $era;
}

function createMillennium($era, $dbEvent) {
	$millennia = $era->millennia;

	$existingMillenniumIndex = array_search($dbEvent->millennium, array_column($millennia, 'millennium'), true);

	if ($existingMillenniumIndex !== false) {
		$existingMillennium = $millennia[$existingMillenniumIndex];
		$events = $existingMillennium->events;
		array_push($events, $dbEvent->description);
		$existingMillennium->events = $events;
	}
	else {
		$newMillennium = new Millennium($dbEvent->millennium);

		$events = array();
		array_push($events, $dbEvent->description);
		$newMillennium->events = $events;

		array_push($millennia, $newMillennium);
		$era->millennia = $millennia;
	}

	return $era;
}

function getExistingYearIndex($years, $dbEvent) {
	$validYearTypes = ['millennium', 'century', 'decade', 'year-circa', 'year'];

	$index = 0;
	$existingYearIndex = false;
	foreach($years as $year) {
		$exactness = in_array($dbEvent->exactness, $validYearTypes) ? $dbEvent->exactness : 'year';
		if ($year->year == $dbEvent->year && $year->accuracy == $exactness) {
			$existingYearIndex = $index;
			break;
		}
		$index += 1;
	}

	return $existingYearIndex;
}

function createYear($era, $dbEvent) {
	$years = $era->years;

	$validYearTypes = ['millennium', 'century', 'decade', 'year-circa', 'year'];

	$index = 0;
	$existingYearIndex = getExistingYearIndex($years, $dbEvent);

	if ($existingYearIndex !== false) {
		if (in_array($dbEvent->exactness, $validYearTypes)) {
			$existingYear = $years[$existingYearIndex];
			$events = $existingYear->events;
			array_push($events, $dbEvent->description);
			$existingYear->events = $events;
		}
	}
	else {
		$newYearExactness = in_array($dbEvent->exactness, $validYearTypes) ? $dbEvent->exactness : 'year';
		$newYear = new Year($dbEvent->year, $newYearExactness);

		if (in_array($dbEvent->exactness, $validYearTypes)) {
			$newYear->events = [$dbEvent->description];
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
		array_push($events, $dbEvent->description);
		$existingSeason->events = $events;
	}
	else {
		$newSeason = new Season($dbEvent->season, $dbEvent->seasonTitle);
		$events = array();
		array_push($events, $dbEvent->description);
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
		$existingMonth = $months[$existingMonthIndex];;

		$events = $existingMonth->events;
		array_push($events, $dbEvent->description);
		$existingMonth->events = $events;
	}
	else {
		$newMonth = new Month($dbEvent->month, $dbEvent->monthTitle);
		$events = array();
		array_push($events, $dbEvent->description);
		$newMonth->events = $events;

		array_push($months, $newMonth);
		$existingYear->months = $months;

		$temp = $existingYear->months;
	}

	return $era;
}

/*
function findNeedleInHaystack($arr, $key, $needle) {
	$neededObject = array_filter(
		$arr,
		function ($e) use (&$needle, &$key) {
			return $e->$key == $needle;
		}
	);
	return $neededObject;
}

function isNeedleInHaystack($arr, $key, $needle) {
	$neededObject = array_filter(
		$arr,
		function ($e) use (&$needle, &$key) {
			if (isset($e->$key)) {
				return $e->$key == $needle;
			}
			else {
				return false;
			}
		}
	);
	return $neededObject != null;
}

function getNeedleInHaystackIndex($arr, $key, $needle) {
	$neededObject = array_filter(
		$arr,
		function ($e) use (&$needle, &$key) {
			if (isset($e->$key)) {
				return $e->$key == $needle;
			}
			else {
				return -1;
			}
		}
	, ARRAY_FILTER_USE_BOTH);
	return $neededObject != null;		// TODO: Return actual index!
}
*/

?>