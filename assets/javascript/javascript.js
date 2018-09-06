$("#new-nightmare").submit(function(event) {
  $("#all-the-buttons").append("<button data-nightmare=" + $("#nightmare-input").val() + ">" + $("#nightmare-input").val() + "</button>")

  $("button").off("click")

  addNightmareHandlers()
  
  event.preventDefault()
})

var addNightmareHandlers = function() {
  $("button").on("click", function() {
    $("#gifs-appear-here").empty();

    var nightmare = $(this).attr("data-nightmare");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nightmare + "&api_key=bDnGQ6GEese3oz4X7T07WXdAxodp77Lx&limit=10";

    $.ajax({
    url: queryURL,
    method: "GET"
    })

    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        gifDiv.append(p);

        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var nightmareImage = $("<img>");

          nightmareImage.attr("src", results[i].images.fixed_height_still.url);
          nightmareImage.attr("data-still", results[i].images.fixed_height_still.url);
          nightmareImage.attr("data-animate", results[i].images.fixed_height.url);

          gifDiv.append(nightmareImage);
        } else {
          gifDiv.append("<h3>Image Censored</h3>")
        }

        $("#gifs-appear-here").prepend(gifDiv);
      }

      $("img").on("click", function() {
        if ($(this).attr("src") === $(this).attr("data-still")) {
          $(this).attr("src", $(this).attr("data-animate"))
        } else {
          $(this).attr("src", $(this).attr("data-still"))
        }
      })
    });
  });
}

addNightmareHandlers()
