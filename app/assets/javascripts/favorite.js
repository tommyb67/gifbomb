
function favorite(){
  var pic = $("a#gallery");
  var favoriteButton = $("button.favorite");
  if (pic.hasClass("clicked")){
    favoriteButton.on("click", function(event){
      event.preventDefault();
      alert("You already favorited that!")
    })
  }else{
  var favoriteButton = $("button.favorite");

  favoriteButton.on("click", function(event){
    event.preventDefault();
      var url = $("img.lb-image").attr("src");

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
          success: function(){alert("favorited");favoriteButton.remove(); console.log("user[gifs]="+url)},
          context:this
          });
          // viewFavorites(gifObject);
        },
        error: function(){alert("Sorry there was a problem");},
        context:this
      });
      pic.addClass("clicked");
  });
  }
}


// function viewFavorites(user){
//   $.ajax({
//     url: "/users/" + user,
//     type: "GET",
//     dataType: "json",
//     success: function(user){
//       console.log(user.gifs);
//       var img = $("<img src=" + user.avatar  +">");   
//       img.attr('class', 'img-fav');
//       $("div.sect_three").append(img);
//     },
//     context: this
//   })

// }
