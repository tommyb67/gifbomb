
$(function(){
  bindDeleteButtons($("ul .delete"));

});

function bindDeleteButtons(buttons) {
  buttons.on("click", function(e) {
    var user = $(this).parent();
    console.log(user);
    
  });
}


function deleteUser(user) {
  $.ajax({
    url: "/users/" + todo.data("todo-id"),
    type: "POST",
    dataType: "json",
    data: {_method: "delete"},
    success: removeUser,
    context: user
  });
}