$(function(){

});
function newAndLogIn(){
  newUserForm();
  logIn();
};

function newUserForm(){
  // var newUserDiv = $("<div>");
  // newUserDiv.attr("id", "new-user-div");

  var form = $("<form>").addClass("newUserForm");
  var username = $("<input>").attr("type", "text").attr("name","username").attr("placeholder", "Username");
  var email = $("<input>").attr("type","text").attr("name","email").attr("placeholder","Email");
  var avatar = $("<input>").attr("type","url").attr("name","avatar").attr("placeholder","Avatar URL");
  var password = $("<input>").attr("type","password").attr("name","password").attr("placeholder","Password");
  var password_confirmation = $("<input>").attr("type","password").attr("name", "password_confirmation").attr("placeholder","Confirm");
  var button = $("<button>").addClass("login").html("Bueno!");

  var newFormDiv = $("<div>").addClass("newFormDiv");
  // newUserDiv.appendTo($("div.sect_three"));
  form.append(username).append(email).append(avatar).append(password).append(password_confirmation).append(button).appendTo(newFormDiv);
  newFormDiv.appendTo("div.sect_three");
  form.on("submit", function(event){
    event.preventDefault();

    $.ajax({
      url: "/users",
      type: "POST",
      //data: "user[username]=a&user[email]=a%40b.c&user[password]=a&user[password_confirmation]=a",
      data: $(this).serializeParams("user"),
      success: function(user){
        var id = user.id;
        appendAvatar(id);
        $("div.sect_three").empty(); logOut();},
      context:this
    });
  });
}



function logIn() {
  var logInForm = $("<form>").addClass("loginForm");
  var emailLogin = $("<input>").attr("type","text").attr("name","email").attr("placeholder","Email");
  var passWord = $("<input>").attr("type","password").attr("name","password").attr("placeholder","Password");
  var logInButton = $("<button>").addClass("login").html("Wilkommen");

  logInForm.append(emailLogin).append(passWord).append(logInButton);
  var logInDiv = $("<div>").addClass("logInDiv")
  logInDiv.append(logInForm);
  logInDiv.appendTo($("div.sect_three"));

  logInForm.on("submit", function(event){
    event.preventDefault();
    $("div.sect_three").empty();

    $.ajax({
      url: "/session",
      type: "POST",
      data: $(this).serializeParams("user"),
      success: function(userObject){
        console.log(userObject);
        $("div.sect_three").empty();
        logOut();
        appendAvatar(userObject);
        viewFavorites(userObject);
        adminButton();
        },
      error: function(){
        alert("There was a problem logging you in");
        newAndLogIn();
        },
      context:this
    });

  });

};
function logOut(){
  var logout = $("<button>").attr("id","admin").html("LOGOUT").appendTo($("div.sect_three"));
  logout.on("click", function(){
    $.ajax({
      url: "/session",
      type: "POST",
      dataType: "json",
      data: {"_method": "delete"},
      context: this
    });
    $("div.sect_three").empty();
    newAndLogIn();
  });
};


function appendAvatar(user){
  $.ajax({
    url: "/users/" + user,
    type: "GET",
    dataType: "json",
    success: function(user){
      if( user.avatar !== ""){
      var img = $("<img src=" + user.avatar  +">");
      }
      else{ var img = $("<img src='http://community.bhf.org.uk/sites/default/files/profile_images/bhf_generic-avatar_01.png'>"); }
      img.attr('id', 'avatar-img');
      var username = $("<span>").addClass("user_greeting").text("Welcome, " + user.username + " | " + user.email).prependTo($("div.sect_three"));
      $("div.sect_three").prepend(img);
      var editButton = $("<button class='edit'>").text("Edit").prependTo($("div.sect_three"));
    },
    context: this
  });
}


function viewFavorites(userId){
  var favoritesDiv = $("<div>").addClass("favoritesDiv");
  $.ajax({
    url: "/users/" + userId + "/favorites",
    type: "GET",
    dataType: "json",
    success: function(user){
      for (var i= 0; i < user.length; i++ ) {
        var wrap = $("<div>").addClass("wrap");
        var gifWrap = $("<div class = 'adiv'>");
        var lightedLinks = $("<a>").attr("rel", "gallery").attr("class","fancybox").attr("href", user[i].url).fancybox();
        var l = $("<img>").addClass("gifs").attr("src", user[i].url);
        var toUnFave = $("<button>").addClass("unfavorite").text("DESTROY").css("float","left");
        l.appendTo(lightedLinks);
        toUnFave.prependTo(wrap);
        gifWrap.append(lightedLinks).appendTo(wrap);
        wrap.appendTo(favoritesDiv);
      };
      favoritesDiv.appendTo($("div.sect_three"));
    },
    context: this
  });

}


function adminButton(){
  var adminForm = $("<form action='/admins'></form>");
  var button = $("<input type='submit' value='Admin' />");
  button.attr('id','admin');
  adminForm.append(button);
  adminForm.prependTo($("div.sect_three"));
}




