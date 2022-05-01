<?php

class RawEvent {
	public $description;
	public $exactness;
	public $millennium;
	public $year;
	public $month;
	public $monthTitle;

	public function __construct($description, $exactness, $millennium, $year, $month, $monthTitle) {
		$this->description = $description;
		$this->exactness = $exactness;
		$this->millennium = $millennium;
		$this->year = $year;
		$this->month = $month;
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

class Month {
	public $month;
	public $name;

	public function __construct($month, $name) {
		$this->month = $month;
		$this->name = $name;
	}
}

class Era {
	public $millennia = array();
	public $years = array();
}

class Year {
	public $year;
	public $events = array();
	public $months = array();

	public function __construct($year) {
		$this->year = $year;
	}
}

$dbEvents = array();

array_push($dbEvents, new RawEvent('First',		'year',			1, 1,	null,	null));
array_push($dbEvents, new RawEvent('Second',	'year',			1, 1,	null,	null));
array_push($dbEvents, new RawEvent('Third',		'year',			1, 1,	null,	null));
array_push($dbEvents, new RawEvent('Fourth',	'year',			1, 2,	null,	null));
array_push($dbEvents, new RawEvent('Fifth',		'year',			1, 2,	null,	null));
array_push($dbEvents, new RawEvent('Sixth',		'year',			1, 3,	1,		'Jan'));
array_push($dbEvents, new RawEvent('Seventh',	'year',			1, 3,	1,		'Jan'));
array_push($dbEvents, new RawEvent('Eighth',	'month',		1, 1,	2,		'Feb'));
array_push($dbEvents, new RawEvent('Ninth',		'month',		1, 4,	2,		'Feb'));
array_push($dbEvents, new RawEvent('Tenth',		'month',		1, 4,	2,		'Feb'));

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

	if ($accuracy == 'millennium') {
	}

	if ($accuracy == 'year') {
		$result = createYear($result, $dbEvent);
	}

	if ($accuracy == 'month') {
		$result = createMonth($result, $dbEvent);
	}

	return $result;
}

function createYear($era, $dbEvent) {
	$years = $era->years;

	$existingYearIndex = array_search($dbEvent->year, array_column($years, 'year'), true);

	if ($existingYearIndex !== false) {
		if ($dbEvent->exactness == 'year') {
			$existingYear = $years[$existingYearIndex];
			$events = $existingYear->events;
			array_push($events, $dbEvent->description);
			$existingYear->events = $events;
		}
	}
	else {
		$newYear = new Year($dbEvent->year);

		if ($dbEvent->exactness == 'year') {
			$newYear->events = [$dbEvent->description];
		}

		array_push($years, $newYear);
		$era->years = $years;
	}

	return $era;
}

function createMonth($era, $dbEvent) {
	// First, create year if missing
	$era = createYear($era, $dbEvent);

	// Get relevant year
	$years = $era->years;
	$existingYearIndex = array_search($dbEvent->year, array_column($years, 'year'), true);
	$existingYear = $years[$existingYearIndex];

	// Check if month already exists
	$months = $existingYear->months;

	$months = is_countable($months) ? $months : [];

	$existingMonthIndex = array_search($dbEvent->month, array_column($months, 'month'), true);	

	if ($existingMonthIndex !== false) {
		$existingMonth = $months[$existingMonthIndex];;
		$existingMonth->debug = 'Existing';

		$events = $existingMonth->events;
		array_push($events, $dbEvent->description);
		$existingMonth->events = $events;
	}
	else {
		$newMonth = new Month($dbEvent->month, $dbEvent->monthTitle);
		$newMonth->debug = 'New';
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