<?php

	class Year {
		public $year;
		public $accuracy;

		public function __construct($year, $accuracy) {
			$this->year = $year;
			$this->accuracy = $accuracy;
		}
	}

	$years = array();

	array_push($years, new Year(1, 'millennium'));
	array_push($years, new Year(1, 'year-circa'));
	array_push($years, new Year(1, 'year'));
	array_push($years, new Year(1, 'year'));

	$existingYearIndex = array_search('year', array_column($years, 'accuracy'), true);

	//$matchingYears = array_column($years, 'year');

	//echo "Existing Year Index: $existingYearIndex<br />";

	$index = 0;
	$matchingIndex = false;
	
	foreach($years as $year) {
		if ($year->year == 1 && $year->accuracy == 'year') {
			$matchingIndex = $index;
			break;
		}

		$index += 1;
	}

	echo "Index: ".$matchingIndex;

	//echo json_encode($matchingYears);


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