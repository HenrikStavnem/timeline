<?php
	class Character {
		public function __construct($id, $firstname, $lastname, $birthDate, $deathDate, $image, $coverImage, $description, $descriptionNew, $slug, $dndStats) {
			$this->id = $id;
			$this->firstName = $firstname;
			$this->lastName = $lastname;
			$this->birthDate = $birthDate;
			$this->deathDate = $deathDate;
			$this->image = $image;
			$this->coverImage = $coverImage;
			$this->description = $description;
			$this->descriptionNew = $descriptionNew;
			$this->slug = $slug;
			$this->dndStats = $dndStats;
		}
	}

	class CharacterDndStats {
		public function __construct($background, $playable, $playerName, $alignment, $armorClass, $initiative, $speed, $strength, $dexterity, $constitution, $intelligence, $wisdom, $charisma) {
			$this->playable = $playable;
			$this->background = $background;
			$this->playerName = $playerName;
			$this->alignment = $alignment;

			$this->armorClass = $armorClass;
			$this->initiative = $initiative;
			$this->speed = $speed;

			$this->strength = $strength;
			$this->dexterity = $dexterity;
			$this->constitution = $constitution;
			$this->intelligence = $intelligence;
			$this->wisdom = $wisdom;
			$this->charisma = $charisma;
		}
	}
?>