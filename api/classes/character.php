<?php
	class Character {
		public function __construct($id, $firstname, $lastname, $birthDate, $deathDate, $image, $coverImage, $description) {
			$this->id = $id;
			$this->firstName = $firstname;
			$this->lastName = $lastname;
			$this->birthDate = $birthDate;
			$this->deathDate = $deathDate;
			$this->image = $image;
			$this->coverImage = $coverImage;
			$this->description = $description;
		}
	}
?>