var animals = ["Dog", "Cat", "Bird", "Fox"];


function renderButtons() {
	var div = $("#button-area");
    div.empty();
    animals.map(function(animal) {
    	var a = $("<button>").addClass("btn animal").attr("data-name", animal).text(animal);
        div.append(a);
    });
}

renderButtons();