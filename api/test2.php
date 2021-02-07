<?php

	$timeline = new stdClass();

	class Entry {
		public $year;
		public $month;
		public $day;
		public $title;
		public $desc;

		public function __construct($year, $month, $day, $title, $desc) {
			$this->year = $year;
			$this->month = $month;
			$this->day = $day;
			$this->title = $title;
			$this->desc = $desc;
		}
	}

	class Event {
		public $title;
		public $description;
		public $type;

		public function __construct($title, $description, $type) {
			$this->title = $title;
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

	$entries = array(
		"1" => new Entry(1955, 1, 1, "First", ""),
		"2" => new Entry(1955, 1, 1, "Second", ""),
		"3" => new Entry(1955, 1, 1, "Third", ""),
		"4" => new Entry(1955, 1, 2, "Fourth", ""),
		"5" => new Entry(1955, 1, 2, "Fifth", ""),
		"6" => new Entry(1955, 2, 12, "Sixth", ""),
		"7" => new Entry(1955, 4, 8, "Seventh", ""),
		"8" => new Entry(2015, 1, 2, "Eighth", ""),
		"9" => new Entry(2015, 1, 2, "Ninth", ""),
		"10" => new Entry(2021, 1, 22, "Tenth", ""),
		"11" => new Entry(2021, 8, 25, "Eleventh", ""),
		"12" => new Entry(2021, 8, 25, "Twelfth", "Example"),
		"12" => new Entry(2038, 4, 1, "Thirtheenth", "What, is this a joke?")
	);

	$currentYear = null;
	$currentMonth = null;
	$currentDay = null;

	$newYears = array();
	$newMonths = array();
	$newDays = array();
	$newEvents = array();

	$lastIndex = count($entries);
	$i = 0;

	foreach($entries as $key => $entry) {
		$isNewYear = false;
		$isNewMonth = false;
		$isNewDay = false;

		$isFirstIndex = false;
		$isLastIndex = false;

		$thisYear = $entry->year;
		$thisMonth = $entry->month;
		$thisDay = $entry->day;

		if ($i === 0) {
			$isFirstIndex = true;
		}

		if (++$i === $lastIndex) {
			$isLastIndex = true;
		}

		if ($currentYear != $thisYear) {
			$isNewYear = true;

			$currentMonth = null;
			$currentDay = null;
		}

		if ($currentMonth != $thisMonth) {			
			$isNewMonth = true;
			$currentDay = null;
		}

		if ($currentDay != $thisDay) {
			//echo "new day<br />";
			$isNewDay = true;
		}

		if ($isFirstIndex) {
			$currentMonth = $thisMonth;
			$currentYear = $thisYear;
		}

		// $title, $description, $type
		$newEvent = new Event($entry->title, $entry->desc, "other");


		if ($isNewDay && !$isFirstIndex) {
			$newDay = new Day($currentDay, "exact", $newEvents);

			array_push($newDays, $newDay);

			$newEvents = array();

			if ($isNewMonth && !$isFirstIndex) {
				$newMonth = new Month($currentMonth, "monthName", "exact", $newDays);
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

		$currentDay = $thisDay;
	}

	$timeline->years = $newYears;

	echo "<pre>";
		//print_r($newYears);

		print_r($timeline);
	echo "</pre>"
?>