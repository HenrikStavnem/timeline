<?php

	class Event {
		public $description;
		public $exactness;
		public $type;

		public function __construct($description, $exactness, $type) {
			$this->description = $description;
			$this->exactness = $exactness;
			$this->type = $type;
		}
	}

?>