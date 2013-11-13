$(function(){

});

function newAndLogIn(){
  newUserForm();
  logIn();
};

function newUserForm(){
  var form = $("<form>");
  var username = $("<input>").attr("type", "text").attr("name","username").attr("placeholder", "Username");
  var email = $("<input>").attr("type","text").attr("name","email").attr("placeholder","Email");
  var avatar = $("<input>").attr("type","text").attr("name","avatar").attr("placeholder","Avatar URL");
  var password = $("<input>").attr("type","password").attr("name","password").attr("placeholder","Password");
  var password_confirmation = $("<input>").attr("type","password").attr("name", "password_confirmation").attr("placeholder","Confirm");
  var button = $("<button>").html("Bueno!");

  form.append(username).append(email).append(avatar).append(password).append(password_confirmation).append(button).appendTo($("div.sect_three"));

  form.on("submit", function(event){
    event.preventDefault();

    $.ajax({
      url: "/users",
      type: "POST",
      //data: "user[username]=a&user[email]=a%40b.c&user[password]=a&user[password_confirmation]=a",
      data: $(this).serializeParams("user"),
      success: function(){$("div.sect_three").empty(); logOut();},
      context:this
    });
  });
}



function logIn() {
  var logInForm = $("<form>");
  var emailLogin = $("<input>").attr("type","text").attr("name","email").attr("placeholder","Email");
  var passWord = $("<input>").attr("type","password").attr("name","password").attr("placeholder","Password");
  var logInButton = $("<button>").html("Wilkommen");

  logInForm.append(emailLogin).append(passWord).append(logInButton);
  logInForm.appendTo($("div.sect_three"));

  logInForm.on("submit", function(event){
    event.preventDefault();
    $("div.sect_three").empty();
    $.ajax({
      url: "/session",
      type: "POST",
      data: $(this).serializeParams("user"),
      success: function(){
        $("div.sect_three").empty();
        logOut();
        appendAvatar(this);
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
  var logout = $("<button>").html("LOGOUT").appendTo($("div.sect_three"));
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


function appendAvatar(user) {
  console.log(user);
  console.log(user.avatar);
  var img = $("<img src=" + user.avatar  +">");    

  $("div.sect_three").append(img);

}