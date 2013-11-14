
function favorite(){
  var favoriteButton = $("button.favorite");

  favoriteButton.on("click", function(event){
    if ($(this).parent().attr("class") === "givs clicked"){
      event.preventDefault();
    }
  else if($(this).parent().attr("class") === "givs"){
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
          success: function(){$(this).parent().attr("class","givs clicked");},
          context:this
          });
          // viewFavorites(gifObject);
        },
        error: function(){alert("Sorry there was a problem");},
        context:this
      });

  }
  });
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
