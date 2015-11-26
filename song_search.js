document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	new Ajax.Request("songs_xml.php", {
    		method: "GET",
    		parameters: {top: $F('top')},
    		onSuccess: showSongs_XML,
    		onFailure: ajaxFailed,
    		onException: ajaxFailed
    	});
    });
    $("b_json").observe("click", function(){
        new Ajax.Request("songs_json.php", {
    		method: "GET",
    		parameters: {top: $F('top')},
    		onSuccess: showSongs_JSON,
    		onFailure: ajaxFailed,
    		onException: ajaxFailed
    	});
    });
});

function showSongs_XML(ajax) {
while($("songs").firstChild){
		$("songs").removeChild($("songs").firstChild);
	}

	var object = ajax.responseXML.getElementsByTagName("song");
	for(var i =0 ; i<object.length; i++){
		var li = document.createElement("li");
		var title = object[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var artist = object[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
		var genre = object[i].getElementsByTagName("genre")[0].firstChild.nodeValue;
		var time = object[i].getElementsByTagName("time")[0].firstChild.nodeValue;

		li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
		$("songs").appendChild(li);
	}
}

function showSongs_JSON(ajax) {
	while ($("songs").firstChild) {
			$("songs").removeChild($("songs").firstChild);
		}
	var data = JSON.parse(ajax.responseText);
	var top = $F("top");
	for (var i = 0; i < top; i++) {
		var li = document.createElement("li");
		var title = data.songs[i].title;
		var artist = data.songs[i].artist;
		var genre = data.songs[i].genre;
		var time = data.songs[i].time;
		li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
		$("songs").appendChild(li);
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
