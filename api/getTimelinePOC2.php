<?php

class RawEvent {
	public $description;
	public $exactness;
	public $millennium;
	public $year;
	public $month;

	public function __construct($description, $exactness, $millennium, $year, $month) {
		$this->description = $description;
		$this->exactness = $exactness;
		$this->millennium = $millennium;
		$this->year = $year;
		$this->month = $month;
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

$dbEvents = array();
/*
array_push($dbEvents, new RawEvent('First',		'millennium',	1, null,null));
array_push($dbEvents, new RawEvent('Second',	'year',			1, 1,	null));
array_push($dbEvents, new RawEvent('Third',		'year',			1, 1,	null));
array_push($dbEvents, new RawEvent('Fourth',	'month',		1, 1,	1));
array_push($dbEvents, new RawEvent('Fourth 2',	'month',		1, 1,	2));
array_push($dbEvents, new RawEvent('Fifth',		'year',			2, 1,	null));
*/

array_push($dbEvents, new RawEvent('First',		'year',			1, 1,	null));
array_push($dbEvents, new RawEvent('Second',	'month',		1, 1,	1));
array_push($dbEvents, new RawEvent('Third',		'month',		1, 1,	1));
array_push($dbEvents, new RawEvent('Fourth',	'month',		1, 1,	2));
array_push($dbEvents, new RawEvent('Fifth',		'month',		1, 1,	2));

$dbEventsCount = count($dbEvents);
$index = 0;

$previous = new stdClass();
$previous->exactness = null;
$previous->millennium = null;
$previous->year = null;
$previous->month = null;

$dates = array();
$newDate = null;
$newEvents = array();

$newMonth = null;
$newMonths = array();

foreach($dbEvents as $dbEvent) {
	$index = $index + 1;
	$thisExactness = $dbEvent->exactness;
	$thisMillennium = $dbEvent->millennium;
	$thisYear = $dbEvent->year;
	$thisMonth = $dbEvent->month;

	$isNewExactness = ($previous->exactness != $thisExactness);
	$isNewDate = validateIfNewDate($dbEvent, $previous);
	$isSubDate = validateIfSubDate($dbEvent, $previous);

	if ($isNewExactness || $isNewDate) {
		/* If the exactness (accuracy) is different and/or the date is different, we create a new date object.
		 * First, however, we add the event list to the previous date and then empty the event list
		 */
		if ($previous->exactness != null) {

			if ($previous->exactness == 'millennium' || $previous->exactness == 'year') {
				$newDate->events = $newEvents;
			}
			else if ($previous->exactness == 'month') {
				$newMonth->events = $newEvents;
				array_push($newMonths, $newMonth);
				$newDate->months = $newMonths;
				//$newMonths = array();
			}

			//$newDate->events = $newEvents; // TODO: This only works when exactness is mill., cent., deca., and year. We need to be able to add to seasons, months, and days as well
			$newEvents = array();
		}
		array_push($dates, $newDate);

		// Determine the exactness level, then create an appropiate Date object.

		//if (!$isNewDate) {
			
			// TODO: Verify if disabling the following line solves 90% of the problems
			//$newDate = new Date($dbEvent->exactness, $thisMillennium, $thisYear, $thisMonth);

			// TODO: THIS IS IT!!
			if ($isSubDate->isSubdate) {
				$newDate->isSubDate = true;

				//$newDate->months = $newMonths;
			}
			else {
				$newDate = new Date($dbEvent->exactness, $thisMillennium, $thisYear, $thisMonth);
				$newDate->isSubDate = false;
			}
		//}



		// TODO: If new date, add new month to month list. If new exactness, add events to previous appropiate mill., year, month, etc

		if ($thisExactness == 'month') {
			$newMonth = new Month($dbEvent->month, 'May');

			//array_push($newMonths, $newMonth);
			//$newDate->months
		}

		//$newDate = new Date($dbEvent->exactness, $thisYear);
	}

	// Create new event and push it to event list
	$newEvent = new StdClass();
	$newEvent->description = $dbEvent->description;
	array_push($newEvents, $newEvent);

	// Add events to last date and add last date to era
	if ($index == $dbEventsCount) {

		if ($thisExactness == 'month') {
			$newDate->months = $newMonths;	
		}
		else {
			$newDate->events = $newEvents;
		}


		array_push($dates, $newDate);
	}

	// Update previous variables to this
	$previous->exactness = $thisExactness;
	$previous->millennium = $thisMillennium;
	$previous->year = $thisYear;
	$previous->month = $thisMonth;
}

$timeline = new StdClass();
$timeline->dates = $dates;

echo json_encode($timeline);

function validateIfNewDate($dbEvent, $previousObj) {
	if ($dbEvent->exactness != $previousObj->exactness) {
		return true;
	}

	if ($dbEvent->millennium != $previousObj->millennium) {
		return true;
	}

	if ($dbEvent->year != $previousObj->year) {
		return true;
	}

	if ($dbEvent->month != $previousObj->month) {
		return true;
	}

	return false;
}

function validateIfSubDate($dbEvent, $previousObj) {
	$isSameYear = false;
	$isSameMonth = false;

	$isSubDate = false;

	// If same exactness, it cannot be as subdate
	if ($dbEvent->exactness == $previousObj->exactness) {
		$isSubDate = false;
	}

	if ($dbEvent->year == $previousObj->year && $dbEvent->year != null && $previousObj->year  != null) {
		$isSameYear = true;
	}

	if ($dbEvent->month == $previousObj->month && $dbEvent->month != null && $previousObj->month  != null) {
		$isSameMonth = true;
	}

	if (!$isSameYear) {
		$isSubDate = false;
	}

	if ($dbEvent->exactness == 'month' && $previousObj->exactness == 'year') {
		$isSubDate = true;
	}

	if ($dbEvent->exactness == 'day' && ($previousObj->exactness == 'year' || $previousObj->exactness == 'year')) {
		$isSubDate = true;
	}

	$result = new stdClass();
	$result->isSubdate = $isSubDate;

	return $result;
}

?>