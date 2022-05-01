<?php

	header("Access-Control-Allow-Origin: *");
	mb_internal_encoding('UTF-8');
	mb_http_output('UTF-8');
	mb_http_input('UTF-8');

	require_once 'classes/date.php';
	require_once 'classes/era.php';
	require_once 'classes/event.php';
	require_once 'classes/millennium.php';
	require_once 'classes/season.php';
	require_once 'classes/year.php';

	run();

	function run() {
		$slug = getSlug();

		$connection = getConnection();

		$timeline = getTimeline($connection, $slug);

		$eras = getEras($connection, $timeline->id);

		

		$timeline->eras = $eras;

		echo json_encode($timeline);
	}

	function getSlug() {
		$slug = null;
		if (isset($_GET["slug"])) {
			$slug = $_GET["slug"];
		}

		return $slug;
	}

	function getConnection() {
		$servername = "localhost";
		$username = "root";
		$password = "";
		$database = "timeline";

		$connection = new mysqli($servername, $username, $password, $database);
		$connection->set_charset('utf8');

		return $connection;
	}

	function getTimeline($connection, $slug) {
		$sqlTimeline = "SELECT
				tl_timelines.id as id,
				title,
				tl_timelines.description as description,
				tl_timelines.image as image,
				tl_users.name as authorname,
				tl_users.image as authorimage
			FROM tl_timelines
			INNER JOIN tl_users ON tl_timelines.owner=tl_users.id
			WHERE url='$slug'
			LIMIT 1
		";

		$queryTimeline = $connection->query($sqlTimeline);

		$timelineId = null;
		$timelineTitle = "";
		$timelineDescription = "";

		while ($row = $queryTimeline->fetch_assoc()) {
			$timelineId = $row['id'];
			$timelineTitle = $row['title'];
			$timelineDescription = $row['description'];
			$timelineImage = $row['image'];
		}

		$timeline = new stdClass();

		$timeline->slug = $slug;

		$timeline->id = $timelineId;
		//$timeline->statusCode = 200;		// TODO: Hardcoded
		$timeline->title = $timelineTitle;
		$timeline->description = $timelineDescription;
		$timeline->image = $timelineImage;
		//$timeline->author = $timelineAuthor;

		//$timeline->eras = $eras;


		//$actors = new Actors();
		//$actors->characters = $characters;
		//$timeline->actors = $actors;

		return $timeline;
	}

	function getEras($connection, $timelineId) {
		$sqlEras = "SELECT
				id, title, description, image
			FROM tl_eras
			WHERE timeline=$timelineId
			ORDER BY eraOrder, era";

		$queryEras = $connection->query($sqlEras);

		$eras = array();
		$enrichedEras = array();

		while($row = $queryEras->fetch_assoc()) {
			$era = new Era($row["id"], $row["title"], $row["description"], $row['image']);

			array_push($eras, $era);
		}

		$enrichedEras = enrichEras($connection, $eras);

		return $enrichedEras;
	}

	function enrichEras($connection, $eras) {
		$enrichedEras = array();

		foreach($eras as $era) {
			$enrichedEra = getEraData($connection, $era);

			array_push($enrichedEras, $enrichedEra);
		}

		return $enrichedEras;
	}

	function getEraData($connection, $era) {
		$eraId = $era->era; // TODO: Is '->era' right? Or is it ->id?

		//$era->millenia = getEraMillenia($connection, $eraId); // TODO: A different approach is needed
		
		//$era->unknownBefore = getUnknownYears($connection, $eraId); //TODO: Disabled for readability. DO RE-ENABLE!
		//$era->years = getYears($connection, $eraId);

		$eventsObj = getYears($connection, $eraId);
		$era->years = $eventsObj->years;
		$era->events = $eventsObj->events;

		return $era;
	}

	function getUnknownYears($connection, $eraId) {
		$sqlEvents = "SELECT tl_events.id, tl_events.year, tl_events.description, image, tl_events.type, tl_events.exactness
			FROM tl_events
			INNER JOIN tl_event_types
				ON tl_events.type = tl_event_types.id
			WHERE era=$eraId AND exactness='unknownbefore'
			ORDER BY era, id
		";

		$queryEvents = $connection->query($sqlEvents);

		$events = array();

		while($row = $queryEvents->fetch_assoc()) {
			$event = new Event($row['description'], $row['exactness'], $row['type']);
			array_push($events, $event);
		}

		return $events;
	}

	function getYears($connection, $eraId) {
		$sqlEvents = "SELECT tl_events.id, tl_events.year, tl_events.season, tl_events.month, tl_events.day, description, image, exactness, tl_event_types.title as type, tl_seasons.title as seasonTitle, tl_seasons.seasonOrder
				FROM tl_events
				INNER JOIN tl_event_types
					ON tl_events.type = tl_event_types.id
				LEFT JOIN tl_seasons
					ON tl_events.season = tl_seasons.id
				WHERE era=$eraId AND exactness!='unknownbefore' AND exactness!='unknownafter' AND exactness!='month'
				ORDER BY era, year, seasonOrder, month, day, exactness, id
			";

		$queryEvents = $connection->query($sqlEvents);

		$events = array();
		$years = array();
		$seasons = array();

		$year = null;

		$previousExactness = null;
		$previousYear = null;
		$previousSeason = null;

		$pushToSameDate = true;
		$pushLevel = array();

		$debugging = false;

		//$isNewExactness = false;

		while($row = $queryEvents->fetch_assoc()) {
			$pushToSameDate = true;
			$isNewExactness = false;
			$isNewYear = false;

			$event = $row['description'];

			$exactness = $row['exactness'];

			if ($exactness != $previousExactness) {
				$exactInfo = "New exactness";

				$pushToSameDate = false;

				$isNewExactness = true;

				$isNewYear = true;

				//$previousYear = null;
				//$previousSeason = null;
			}
			else {
				$exactInfo = "Same exactness";
			}

			if ($row['year'] != $previousYear) {
				$yearInfo = "New year";

				$pushToSameDate = false;
				$isNewYear = true;

				//$previousSeason = null;
			}
			else {
				$yearInfo = "Same year";
			}

			if ($row['season'] != $previousSeason) {
				$seasonInfo = "New season";

				$pushToSameDate = false;
			}
			else {
				$seasonInfo = "Same season";
			}

			if ($pushToSameDate) {
				array_push($events, $event);
			}
			else {
				if (!$pushLevel) {
					switch($exactness) {
						case 'millenia':	$pushLevel = $year;		break;
						case 'century':		$pushLevel = $year;		break;
						case 'decade':		$pushLevel = $year;		break;
						case 'beforeYear':	$pushLevel = $year;		break;
						case 'year':		$pushLevel = $year;		break;
						case 'season':		$pushLevel = $season;	break;
						case 'month':		$pushLevel = $month;	break;
						case 'day':			$pushLevel = $day;		break;
					}
				}
				array_push($events, $event);
				//$pushLevel->events = $events;
			}

			// Date and event creation
			if ($isNewYear) {
				$year = new Year($row['year'], $row['exactness']);
				array_push($years, $year);
			}
			
			// Update previous values
			$previousExactness = $row['exactness'];
			$previousYear = $row['year'];

			// Create that object
			if ($debugging) {					
				$year = new stdClass();
				$year->exactness = $row['exactness'];
				$year->exactInfo = $exactInfo;
				$year->year = $row['year'];
				$year->yearInfo = $yearInfo;
				$year->season = $row['season'];
				$year->seasonInfo = $seasonInfo;
				$year->text = $row['description'];
				array_push($years, $year);
			}
		}

		$result = new stdClass();
		$result->years = $years;
		$result->events = $events;

		return $result;
	}

	function getYearsOLD($connection, $eraId) {
		$sqlEvents = "SELECT tl_events.id, tl_events.year, tl_events.season, tl_events.month, tl_events.day, description, image, exactness, tl_event_types.title as type, tl_seasons.title as seasonTitle, tl_seasons.seasonOrder
				FROM tl_events
				INNER JOIN tl_event_types
					ON tl_events.type = tl_event_types.id
				LEFT JOIN tl_seasons
					ON tl_events.season = tl_seasons.id
				WHERE era=$eraId AND exactness!='unknownbefore' AND exactness!='unknownafter' AND exactness!='month'
				ORDER BY era, year, seasonOrder, month, day, exactness, id
			";

		$queryEvents = $connection->query($sqlEvents);

		$events = array();
		$years = array();
		$seasons = array();
		$eventsInfo = array(); //TODO: Remove after testing

		$year = null;
		$season = null;

		$isFirstEvent = true;
		$previousExactness = null;
		$previousYear = null;
		$previousSeason = null;
		$previousMonth = null;
		$previousDay = null;

		$isNewDate = true;
		$isNewExactness = true;
		$isNewYear = true;
		$isNewSeason = true;
		$isNewMonth = true;
		$isNewDay = true;

		while($row = $queryEvents->fetch_assoc()) {
			$exactness = $row['exactness'];

			$isNewDate = false;
			$isNewExactness = false;
			$isNewYear = false;
			$isNewSeason = false;

			$event = new Event($row['description']." ".$row['season'], $exactness, $row['type']);
			//array_push($events, $event);

			$log = "";

			if ($exactness != $previousExactness) {
				$isNewExactness = true;
				$isNewDate = true;
				//$isNewYear = true;

				$previousExactness = $exactness;

				if ($exactness == 'unknownbefore' || $exactness == 'millenia' || $exactness == 'century' || $exactness == 'decade' || $exactness == 'year') {
					$isNewYear = true;
					$log = $log." exactness is new and not a season/month or below, prompting new year.";
				}

				if ($exactness == 'season') {
					$isNewSeason = true;
					$log = $log." exactness is season.";
				}
			}

			if ($row['year'] != $previousYear) {
				$isNewDate = true;
				$isNewYear = true;
				$previousYear = $row['year'];
			}

			if ($row['season'] != $previousSeason) {
				$isNewDate = true;
				$isNewSeason = true;

				$previousSeason = $row['season'];
				$log = $log." season is different ".$row['season']."/".$previousSeason.".";
			}
			else {
				$log = $log." season is same ".$row['season']."/".$previousSeason.".";
			}

			if ($row['month'] != $previousYear) {
				$isNewDate = true;
				
				if ($row['month'] != null) {
					$isNewMonth = true;
				}

				$previousMonth= $row['month'];
			}

			if ($isNewDate) {
				if (!$isFirstEvent) {
					/*if ($isNewExactness) {
						if ($exactness == "millenia" || $exactness == "century" || $exactness == "decade" || $exactness == "year") {
							//$log = $log."added to new year";
							$log = $log." exactness is new";

						}
					}
					else*/

					if ($season && $season->events && count($season->events) > 0) {
						$log = $log." previous season had events.";
					}

					if ($isNewYear) {
						$log = $log." year is new. Adding events to previous year.";

						$year->seasons = $seasons;

						if ($exactness == 'season') {
							//$year->seasons = $events;
						}
						else {
							//$year->events = $events;
						}

						array_push($years, $year);

						$events = array();

						$year = new Year($row['year'], $exactness);
					}

					if ($isNewSeason) {
						if ($season) {
							//array_push($events, $event);

							$season->events = $events;

							array_push($seasons, $season);
							
							$events = array();
							//$seasons = array();
						}

						$log = $log." season is new.";
						$season = new Season($row['season'], $row['seasonTitle']);
					}

					if ($isNewMonth) {

					}
				}
				else {
					$log = $log." First. Creating year";
					$isFirstEvent = false;

					$year = new Year($row['year'], $exactness);

					//array_push($events, $event);
				}

				array_push($events, $event);
			}

			$eventInfo = $row['exactness']." || ".$row['year']." || ".$row['description']." || newDate: ".$isNewDate." || isNewExactness: ".$isNewExactness." || log: ".$log;

			array_push($eventsInfo, $eventInfo);
		}

		//TODO: Change to only return $events after testing
		$result = new stdClass();
		$result->years = $years;
		$result->eventsInfo = $eventsInfo;

		return $result;
	}

	function getEraMillenia($connection, $eraId) {
		// TODO: This function will not work
		$millenia = array();
		$previousMillennium = null;

		$sqlEvents = "SELECT tl_events.id, tl_events.year, description, image
				FROM tl_events
				INNER JOIN tl_event_types
					ON tl_events.type = tl_event_types.id
				WHERE era=$eraId AND exactness='millenia'
				ORDER BY era, year, id
			";

		$queryEvents = $connection->query($sqlEvents);

		$events = array();

		while($row = $queryEvents->fetch_assoc()) {
			$eventYear = $row['year'];

			if ($previousMillennium == null) {
				$previousMillennium = $eventYear;

				// Handle this event
				$event = $row['description'];
				array_push($events, $event);
			}
			else if ($previousMillennium != $eventYear) {
				$millennium = new millennium($previousMillennium);
				$millennium->events = $events;
				$events = array(); // Reset events
				array_push($millenia, $millennium);
				$previousMillennium = $eventYear;

				// Handle this event
				$event = $row['description'];
				array_push($events, $event);
			}
			else {
				// Handle this event
				$event = $row['description'];
				array_push($events, $event);
			}
		}
		// Add last millennium
		$millennium = new millennium($previousMillennium);
		$millennium->events = $events;
		array_push($millenia, $millennium);

		return $millenia;
	}

?>