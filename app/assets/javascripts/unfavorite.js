
function destructo(gifId){
  var unFave = $("button.unfavorite");
  console.log(unFave);
  alert(gifId);
  unFave.on("click", function(event){
    event.preventDefault();
    alert(gifId);
    console.log(gifId);
    $.ajax({
      url: "/gifs/" + gifId +"/unfavorite",
      type: "DELETE",
      dataType: "json",x
      data: {"_method": "unfavorite"},
      context: this
    });
    $(this).parent().parent().remove();
  });
}