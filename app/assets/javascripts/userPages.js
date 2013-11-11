$(function(){
  newUserForm();
})
function newUserForm(){
  var form = $("<form>");
  var username = $("<input>").attr("type", "text").attr("name","username").attr("placeholder", "Username");
  var email = $("<input>").attr("type","text").attr("name","email").attr("placeholder","Email");
  var password = $("<input>").attr("type","password").attr("name","password").attr("placeholder","Password");
  var password_confirmation = $("<input>").attr("type","password").attr("name", "password_confirmation").attr("placeholder","Confirm");
  var button = $("<button>").html("Bueno!");

  form.append(username).append(email).append(password).append(password_confirmation).append(button).appendTo($("div.sect_three"));

  form.on("submit", function(event){
    event.preventDefault();

    $.ajax({
      url: "/users",
      type: "POST",
      data: "user[" + $(this).serialize()
      //data: "user[username]=a&user[email]=a%40b.c&user[password]=a&user[password_confirmation]=a",
      data: $(this).serializeParams("user"),
      context:this,
      success: alert("success!")
    });
  });
}