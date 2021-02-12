<?php

	$events = [
		"The Hobbit, {char-1} sets out on an adventure.",
		"{char-1} defeats the spiders.",
		"The dwarf, {char-2} is furious at {char-1}",
		"No characters here.",
		"By golly, {char-3} is dashing, isn't he?",
		"{char-3} is in possession of {item-1}",
		"Then {char-4} took his sword, {item-2} and fled to {location-1}",
		"{location-5} went to war with {location-2}"
	];

	$charactersIndexList = array();
	$itemsIndexList = array();
	$locationsIndexList = array();

	foreach($events as $event) {
		extractReferences($event);
	}

	function extractReferences($string) {

		$needle = "{";
		$lastPos = 0;
		$startPositions = array();

		// get all start brackets
		while (($lastPos = strPos($string, $needle, $lastPos)) !== false) {
			$startPositions[] = $lastPos;
			$lastPos = $lastPos + strlen($needle);
		}

		$lastPos = 0;
		$endPositions = array();
		$needle = "}";

		// get all end brackets {
		while (($lastPos = strpos($string, $needle, $lastPos))!== false) {
			$endPositions[] = $lastPos;
			$lastPos = $lastPos + strlen($needle);
		}

		foreach ($startPositions as $key=>$value) {
			$endPos = $endPositions[$key]-1 - $startPositions[$key];
			$substr = substr($string, $startPositions[$key]+1, $endPos);

			indexReferences($substr);
		}
	}

	function indexReferences($string) {
		global $charactersIndexList, $itemsIndexList, $locationsIndexList;

		echo "indexReferences: $string<br />";

		$parts = explode("-", $string);

		echo "<pre>".print_r($parts)."</pre>";

		$type = $parts[0];
		$index = $parts[1];

		switch ($type) {
			case "char":
				if (!in_array($index, $charactersIndexList)) {
					array_push($charactersIndexList, $index);
				}
				break;
			case "item": 
				if (!in_array($index, $itemsIndexList)) {
					array_push($itemsIndexList, $index);
				}
				break;
			case "location": 
				if (!in_array($index, $locationsIndexList)) {
					array_push($locationsIndexList, $index);
				}
				break;
			default: echo "Error: Not recognized type '$type'<br />";
		}
	}

	echo "<pre>";
		print_r($charactersIndexList);
		print_r($itemsIndexList);
		print_r($locationsIndexList);
	echo "</pre>";
?>
