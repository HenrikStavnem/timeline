<?php

	class Season {
		public $season;
		public $title;
		public $events;

		public function __construct($season, $title) {
			$this->season = $season;
			$this->title = $title;
		}
	}

?>