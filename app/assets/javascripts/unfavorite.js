
function destructo(gifId){
  var unFave = $("button.unfavorite");
  console.log(unFave);
  unFave.on("click", function(event){
    event.preventDefault();
    console.log(gifId);
    $.ajax({
      url: "/gifs/" + gifId +"/unfavorite",
      type: "DELETE",
      dataType: "json",
      data: {"_method": "unfavorite"},
      context: this
    });
    $(this).parent().parent().remove();
  });
}