$(document).ready(function() {

    var topics = ["Puppies", "Kittens", "Parrots", "Tigers", "Lions", "Bear", "Panda", "Jaguar", "Turtle", "Dolphin"];

    // Create button and appending them.
    function printButtons() {
        for (var i = 0; i < topics.length; i++) {
          var animalButton = $("<button>");
          animalButton.addClass("gifButtons");
          animalButton.addClass("btn btn-outline-secondary");
          animalButton.html(topics[i]);
          animalButton.attr("data-name", topics[i]);
          $("#buttonDisplay").prepend(animalButton);
    
        }
    };

    window.onload = printButtons();
    

    //Giphy api and main functionality of the project
    $(document).on('click', '.gifButtons', function() {
        $("#gifArea").empty();
        var animal = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=c0qsLqebrSRxxim6Pw9VfRdtjZDXLzqr&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var gifDisplay = $("<div class = 'gifs'>");
                var rating = response.data[i].rating;
                var ratingDisplay = $("<p>");

                ratingDisplay.html('Rating: ' + rating);

                var still = response.data[i].images.fixed_height_still.url;
                var moving = response.data[i].images.fixed_height.url;
                var img = $("<img>");

                img.attr("src", still);
                img.attr("data-still", still);
                img.attr("data-moving", moving);
                img.attr("data-state", "still");
                img.addClass('animalGifs');

                gifDisplay.append(ratingDisplay);
                gifDisplay.append(img);

                $("#gifArea").prepend(gifDisplay);
            }
      
        })
    });

    // Play/pause gifs on click
    $(document).on('click', '.animalGifs', function() {
        var imgState = $(this).attr('data-state')
        if (imgState == 'still') {
          $(this).attr('src', $(this).data('moving'));
          $(this).attr('data-state', 'moving');
        } else {
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
        }
      });

    // Add animal
    $('#addAnimal').click(function(event) {
        event.preventDefault();
        var newButton = $("input").val();
        topics.push(newButton);
        $("#buttonDisplay").empty();
        printButtons();
        $('#addAnimalForm').find('input:text').val('');
      });
    
});