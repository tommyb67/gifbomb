
function favorite(){
  var favoriteButton = $("button.favorite");
  
  favoriteButton.click(function(event){
    if ($(this).parent().children().last().attr("class") === "adiv clicked"){
      event.preventDefault();
    }
  else if($(this).parent().children().last().attr("class") === "adiv"){
    event.preventDefault();
      var url = $("a.fancybox").last().attr("href");
      console.log("here", url);
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
          success: function(){
            $(this).parent().children().last().attr("class","adiv clicked");
            $(this).parent().children().first().text("DESTROY").attr("class", "unfavorite");
            favoritedGif = $(this).parent();
            $("div.favoritesDiv").append(favoritedGif);
                            },
          context:this
          });

        },
        error: function(){alert("Sorry there was a problem");},
        context:this
      });

  }
  destroyGif();
  });
}

favorite();

