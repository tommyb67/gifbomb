 
function editUser(){
	var editButton = $("button.edit");
	var div_three =  $("div.sect_three");
	editButton.click(function(){
		div_three.empty();
		var form = $("<form>").addClass("editUserForm");
	  var username = $("<input>").attr("type", "text").attr("name","username").attr("placeholder", "Username").appendTo(form);
	  var email = $("<input>").attr("type","text").attr("name","email").attr("placeholder","Email").appendTo(form);
	  var avatar = $("<input>").attr("type","url").attr("name","avatar").attr("placeholder","Avatar URL").appendTo(form);
	  var password = $("<input>").attr("type","password").attr("name","password").attr("placeholder","Password").appendTo(form);
	  var password_confirmation = $("<input>").attr("type","password").attr("name", "password_confirmation").attr("placeholder","Confirm").appendTo(form);
	  var button = $("<button>").addClass("login").html("Bueno!").appendTo(form);

  var editFormDiv = $("<div class = 'editUserDiv'>").append(form).appendTo(div_three);

 	div_three.prepend($("<div class='editHeader'>").append($("<span class='editHeader'>").text("Edit")));
			form.submit(function(event){
				event.preventDefault();
				alert("here");
	 		  $.ajax({
	      url: "/users/"+ current_user,
	      type: "PUT",
	      // PUT    /users/:id(.:format)           users#update
	      data: $(this).serializeParams("user"),
	      success: function(user){
	       	var id = user.id;
	       	appendAvatar(id);
	        $("div.sect_three").empty(); logOut(); appendAvatar(current_user); viewFavorites(current_user);
	      	},
	     	context:this
	    	});
			});
	});
}	