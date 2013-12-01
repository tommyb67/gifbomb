
// unfavorite_gif DELETE /gifs/:id/unfavorite(.:format) gifs#unfavorite
function destroyGif(){
	var destroy = $("button.unfavorite");

	destroy.click(function(event){
		var deleteId;
		
		event.preventDefault();
		$(this).parent().remove();
		var gifUrl = $(this).parent().children().last().children().attr("href");
		
		$.ajax({
			url: "/users/"+ current_user +"/favorites",
			type: "GET",
			success: function(faves){ 

				_.each(faves, function(favorite){
					if(favorite.url === gifUrl){
						deleteId = favorite.id
					}
				})
				$.ajax({
						url: "/gifs/"+ deleteId +"/unfavorite",
						type: "DELETE",
						data: {"_method": "unfavorite"},
						success: function(){
							$(this).parent().remove();
						}
					})
			},
		})
	})

}