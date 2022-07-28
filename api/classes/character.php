<?php
	class Character {
		public function __construct($id, $firstname, $lastname, $birthDate, $deathDate, $image, $coverImage, $description, $slug, $dndStats) {
			$this->id = $id;
			$this->firstName = $firstname;
			$this->lastName = $lastname;
			$this->birthDate = $birthDate;
			$this->deathDate = $deathDate;
			$this->image = $image;
			$this->coverImage = $coverImage;
			$this->description = $description;
			$this->slug = $slug;
			$this->dndStats = $dndStats;
		}
	}

	class CharacterDndStats {
		public function __construct($class, $level, $background, $playerName, $alignment, $armorClass, $initiative, $speed, $strength, $dexterity, $constitution, $intelligence, $wisdom, $charisma) {
			$this->class = $class;
			$this->level = $level;
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