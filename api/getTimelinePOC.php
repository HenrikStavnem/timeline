<?php

	class RawEvent {
		public $description;
		public $exactness;
		public $millennium;
		public $century;
		public $decade;
		public $year;
		public $month;
		public $monthName;

		public function __construct($description, $exactness, $millennium, $century, $decade, $year, $month, $monthName) {
			$this->description = $description;
			$this->exactness = $exactness;
			$this->millennium = $millennium;
			$this->century = $century;
			$this->decade = $decade;
			$this->year = $year;
			$this->month = $month;
			$this->monthName = $monthName;
		}
	}

	$dbEvents = array();

	/*
	array_push($dbEvents, new RawEvent("First millennium,	first entry",	"millennium",	1,	1,	1, 1,	null));
	array_push($dbEvents, new RawEvent("First millennium,	second entry",	"millennium",	1,	1,	1, 1,	null));
	array_push($dbEvents, new RawEvent("First century,		first entry",	"century",		1,	1,	1, 1,	null));
	array_push($dbEvents, new RawEvent("First century,		second entry",	"century",		1,	1,	1, 1,	null));
	array_push($dbEvents, new RawEvent("First decade,		first entry",	"decade",		1,	1,	1, 1,	null));
	array_push($dbEvents, new RawEvent("First century,		first entry",	"century",		2,	1,	1, 1,	null));
	array_push($dbEvents, new RawEvent("First century,		second entry",	"century",		2,	1,	1, 1,	null));
	array_push($dbEvents, new RawEvent("Second century,		First entry",	"century",		2,	1,	1, 1,	1));
	array_push($dbEvents, new RawEvent("Second year,		First entry",	"year",			2,	1,	1, 1,	1));
	*/

	array_push($dbEvents, new RawEvent("First year,		First entry",	"year",			1,	1,	1,	1,	null,	'First??'));
	array_push($dbEvents, new RawEvent("First year,		Second entry",	"year",			1,	1,	1,	1,	null,	null));
	array_push($dbEvents, new RawEvent("First year,		Third entry",	"year",			1,	1,	1,	1,	null,	null));
	array_push($dbEvents, new RawEvent("First year,		Fourth entry",	"year",			1,	1,	1,	1,	null,	null));
	array_push($dbEvents, new RawEvent("First year,		Fifth entry",	"year",			1,	1,	1,	1,	null,	null));
	
	array_push($dbEvents, new RawEvent("Second year, first entry",	"year",				1,	1,	1,	2,	null,	null));
	array_push($dbEvents, new RawEvent("Second year,	Second entry",	"year",			1,	1,	1,	2,	null,	null));

	array_push($dbEvents, new RawEvent("Second year, third entry",	"month",			1,	1,	1,	2,	1,		'January'));
	array_push($dbEvents, new RawEvent("Second year,	fourth entry",	"month",		1,	1,	1,	2,	2,		'February'));

	array_push($dbEvents, new RawEvent("Third year,		First entry",	"year",			1,	1,	1,	3,	null,	null));
	array_push($dbEvents, new RawEvent("Third year,		Second entry",	"month",		1,	1,	1,	3,	3,		'March'));
	array_push($dbEvents, new RawEvent("Third year,		Third entry",	"month",		1,	1,	1,	3,	3,		'March'));
	array_push($dbEvents, new RawEvent("Third year,		Fourth entry",	"month",		1,	1,	1,	3,	4,		'April'));
	//array_push($dbEvents, new RawEvent("Second year,	Third entry",	"month",		1,	1,	1,	2,	1));

	//array_push($dbEvents, new RawEvent("Second year,	Second entry",	"century",		1,	1,	1,	2,	1));

	$arr1 = ['millennium', 'century', 'decade'];
	$arr2 = ['year', 'season', 'month', 'day'];

	$previousExactness = null;
	$previousYear = null;
	$previousMonth = null;

	$newYear = null;
	$newMonth = null;

	$years = array();
	$months = array();

	$count = 0;

	$newEvents = array();

	$event = new StdClass();

	foreach($dbEvents as $dbEvent) {
		$description = $dbEvent->description;
		$exactness = $dbEvent->exactness;
		$millennium = $dbEvent->millennium;
		$year = $dbEvent->year;
		$month = $dbEvent->month;

		$event = new StdClass();
		$event->description = $description;
		$event->exactness = $exactness;

		$count += 1;
		$yearExactness = "unknown ($exactness)";

		$isNewYear = false;
		$isNewMonth = false;

		if ($exactness != $previousExactness) {
			//if (in_array($exactness, $arr2)) {
				//$previousYear = null;
				//$previousMonth = null;
			//}

			if ($exactness == 'year') {
				$previousYear = null;
				$previousMonth = null;
			}
			if ($exactness == 'month') {
				$previousMonth = null;
			}
		}

		if ($month != null && $month != $previousMonth) {
			$isNewMonth = true;
		}

		if ($year != null && $year != $previousYear) {
			$isNewYear = true;
		}

		if ($isNewMonth) {
			if ($newMonth) {
				$newMonth->events = $newEvents;
				array_push($months, $newMonth);

				$newEvents = array();
			}
			$newMonth = new StdClass();
			$newMonth->title = $dbEvent->monthName;
		}

		if ($isNewYear) {
			if ($newYear) {
				// TODO: Add seasons here
				if (count($months) > 0) {
					if ($newMonth) {
						$newMonth->events = $newEvents;
						array_push($months, $newMonth);

						$newEvents = array();
					}
					$newYear->months = $months;
					$months = array();
				}
				else {
					$newYear->events = $newEvents;
					$newEvents = array();
				}

				array_push($years, $newYear);
			}

			$count = 1;	// Not 0
			$newYear = new StdClass();
		}

		if ($newYear) {
			$newYear->year = $year;
			$newYear->exactness = getYearExactness($exactness);
			$newYear->millennium = $millennium;
			$newYear->count = $count;

			if (count($months) > 0) {
				$newYear->months = $months;
				//$months = array();
			}
		}

		array_push($newEvents, $event);

		$previousExactness = $exactness;
		$previousYear = $year;
		$previousMonth = $month;
	}

	// Finally


	if ($isNewMonth) {
		//array_push($months, $newMonth);
		$newMonth = new StdClass();
		$newMonth->title = $dbEvent->monthName;
		$newMonth->events = $newEvents;
		array_push($months, $newMonth);
	}

	if ($newYear) {
		//$newYear = new StdClass();
		$newYear->events = $newEvents;
		$newYear->exactness = getYearExactness($exactness);
		$newYear->millennium = $millennium;
		$newYear->count = $count;

		if (count($months) > 0) {
			$newYear->months = $months;
		}

		array_push($years, $newYear);
	}

	// TODO: First year gets second year first event
	// TODO: Last event is not added to month, at least
	
	
	$eras = array();
	$era = new StdClass();
	$era->years = $years;

	array_push($eras, $era);


	$timeline = new StdClass();
	$timeline->eras = $eras;

	echo json_encode($timeline);

	function getYearExactness($exactness) {
		switch($exactness) {
			case 'year':
				$yearExactness = 'year'; break;
			case 'month':
				$yearExactness = 'year'; break;
		}

		return $yearExactness;
		
	}

?>