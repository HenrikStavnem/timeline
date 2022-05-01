<?php

	class Year {
		public $year;
		public $exactness;

		//public $seasons;
		//public $months;
		public $events;

		public function __construct($year, $exactness) {
			$this->year = $year;
			$this->exactness = $exactness;
		}
	}

?>