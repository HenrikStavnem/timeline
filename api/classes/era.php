<?php

	class Era {
		public $era;
		public $title;
		public $years;
		public $description;
		public $image;

		public function __construct($era, $title, $description, $image) {
			$this->era = intval($era);
			$this->title = $title;
			$this->description = $description;
			$this->image = $image;
		}
	}

?>