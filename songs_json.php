<?php
$SONGS_FILE = "songs_shuffled.txt";
if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "GET") {
	header("HTTP/1.1 400 Invalid Request");
	die("ERROR 400: Invalid request - This service accepts only GET requests.");
}
$top = "";
if (isset($_REQUEST["top"])) {
	$top = preg_replace("/[^0-9]*/", "", $_REQUEST["top"]);
}
if (!file_exists($SONGS_FILE)) {
	header("HTTP/1.1 500 Server Error");
	die("ERROR 500: Server error - Unable to read input file: $SONGS_FILE");
}
header("Content-type: application/json");
print "{\n  \"songs\": [\n";
$lines = file($SONGS_FILE);
for($i = 1; $i <= $top ; $i++){
	for($j = 0; $j< count($lines); $j++){
		list($title, $artist, $rank, $genre, $time) = explode("|", trim($lines[$j]));
		if($rank == $i && $i == $top){
			print "{\"rank\": \"$rank\", \"title\": \"$title\", \"artist\": \"$artist\", \"genre\": \"$genre\", \"time\": \"$time\"}\n";
			break;
		}
		else if($rank == $i){
			print "{\"rank\": \"$rank\", \"title\": \"$title\", \"artist\": \"$artist\", \"genre\": \"$genre\", \"time\": \"$time\"},\n";
			break;
		}
	}
}
print "  ]\n}\n";
?>
