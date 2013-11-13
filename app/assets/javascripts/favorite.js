function favorite(){
  var favoriteButton = $("button.favorite");

  favoriteButton.on("click", function(event){
    event.preventDefault();
    var url = $("img.lb-image").attr("src");
    console.log(url);

    $.ajax({
      url: "/gifs",
      type: "POST",
      //data: "user[username]=a&user[email]=a%40b.c&user[password]=a&user[password_confirmation]=a",
      data: "gif[url]=" + url,
      success: function(gifObject){
        $.ajax({
        url: "/gifs/"+ gifObject.id + "/favorite",
        type: "POST",
        //data: "user[username]=a&user[email]=a%40b.c&user[password]=a&user[password_confirmation]=a",
        data: "user[gifs]="+url,
        success: alert("favorited"),
        context:this
        });
      },
      error: function(){alert("Sorry there was a problem");},
      context:this
    });

  });
}
