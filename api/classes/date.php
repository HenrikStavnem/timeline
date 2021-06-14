<?php
	class Date {
		public function __construct($era, $year, $month, $day) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
		}
	}

	class DateExpirable {
		public function __construct($era, $year, $month, $day, $expirable) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
			$this->expirable = boolval($expirable) ? true : false;
		}
	}

	class DateStartable {
		public function __construct($era, $year, $month, $day, $startable) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
			$this->startable = boolval($startable) ? true : false;
		}
	}
?>