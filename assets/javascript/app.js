var topics = ["dog", "cat", "bird", "fox"];


function renderButtons(items) {
	var $div = $("#button-area");
    $div.empty();
    items.map(function(item) {
    	var $a = $("<button>").addClass("btn animal").attr("data-name", item).text(item);
        $div.append($a);
    });
}

function displayResults(term) {
	var apiKey = "HofY8kwFtHMn54N9FItOYEYp0TbhLEz4";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    term.replace(" ", "+") + "&api_key=" + apiKey + "&limit=10&rating=pg";
    console.log(queryURL);
    $.ajax({
	    url: queryURL,
        method: "GET"
    }).done(function(response) {
	    var results = response.data;
	    results.map(function(result) {
	        var $animalDiv = $("<div>");
	        var $p = $("<p>");
	        $p.text("Rating: " + result.rating.toUpperCase());
	        var $animalImage = $("<img>");
	        $animalImage.attr("src", result.images.fixed_height_still.url)
	        			.attr("data-still", result.images.fixed_height_still.url)
	        			.attr("data-animated", result.images.fixed_height.url)
	        			.attr("data-state", "still");
	        $animalDiv.append($animalImage)
						.append($p)
						.addClass("image-div");
	        $("#search-results").prepend($animalDiv);
	    });
	});
}

$("#search-button").on("click", function() {
	var $input = $("#search-term");
	var term = $input.val().toLowerCase();
	if (term && topics.indexOf(term) === -1) {
		topics.push(term);
	}
	renderButtons(topics);
	$input.val("");
});

$("#button-area").on("click", "button", function() {
	$("#search-results").empty();
	displayResults($(this).attr("data-name"));
});

$("#search-results").on("click", "img", function() {
	var $img = $(this);
	if($img.attr("data-state") === "still") {
		$img.attr("src", $img.attr("data-animated"))
			.attr("data-state", "animated");
	}
	else {
		$img.attr("src", $img.attr("data-still"))
			.attr("data-state", "still");
	}
});

renderButtons(topics);