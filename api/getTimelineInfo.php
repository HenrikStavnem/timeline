<?php
	header("Access-Control-Allow-Origin: *");

	$timelineInfo = new stdClass();

	$timelineInfo->title = "Examplia";
	$timelineInfo->description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
	$timelineInfo->image = 'https://cdnb.artstation.com/p/assets/images/images/001/439/765/large/yeonji-rhee-mission-impossible-yj-2015-10.jpg?1446468912';


	echo json_encode($timelineInfo);
?>