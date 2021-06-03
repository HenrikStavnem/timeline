<?php
	class Date {
		public function __construct($era, $year, $month, $day) {
			$this->era = intval($era);
			$this->year = ($era != null) ? intval($year) : null; // TODO: Doesn't work
			$this->month = intval($month);
			$this->day = intval($day);
		}
	}

	class DateExpirable extends Date {
		public function __construct($era, $year, $month, $day, $expirable) {
			$this->expirable = boolval($expirable);
		}
	}

	class DateStartable extends Date {
		public function __construct($era, $year, $month, $day, $startable) {
			$this->startable = boolval($startable);
		}
	}
?>