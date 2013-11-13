
var searchWord = "";

function giphyTest(searchTerm, callback){
searchWord = searchTerm;
$.getJSON("http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=100", function(data){callback(data); });

};

function displayGifs(gifHash){
  // console.log($(test).length, $(test)[0]['data'][0], $(test)[0]['data'][1]['images']['original']['url']);

  // takes a sample of 100 gifs
  var sampler = _.sample($(gifHash)[0]['data'], 12);
  
  // displays random gifs
  for(var i = 0; i < sampler.length; i++){
  
    var divy = $("<div>").attr("id", i).addClass("givs");
    var lightedLinks = $("<a>").attr("id", "gallery").attr("data-lightbox","givs").attr("href",sampler[i]['images']['original']['url']);
    var l = $("<img>").addClass("gifs").attr("src",sampler[i]['images']['fixed_height']['url']);
    l.appendTo(divy);
    lightedLinks.append($(divy));
    lightedLinks.appendTo($("div.sect_one"));
    }
};

function header(){
  var header = $("<div>").addClass("header");
  var title = $("<h2>").css("clear","both").css("float","left").css("font-family","Share Tech Mono").html("gif").appendTo(header);
  var logo = $("<img>").attr("src","http://fc01.deviantart.net/fs49/f/2009/230/0/3/Bobomb_Sploding_by_OldManRupee.gif").appendTo(header);
 header.prependTo($("section#1"));
}

function searchForm() {
  var header = $("div.header")
  var searchBox = $("<form>").addClass("search");
  var keyword  = $("<input>").addClass("keyword").attr("type", "text").attr("name","keyword").attr("placeholder","Search");
  searchBox.css("text-align", "center").append(keyword).prependTo($("div.sect_one"));
 
  
  keyword.on("keypress",function(e){
    var code = e.keyCode || e.which;
    if(code == 13) {
      searchBox.on("submit", function(event) {
        event.preventDefault();
        $(this).remove();
        $("div.sect_one").empty();
        searchForm();
        giphyTest(keyword.val(), displayGifs);
      });
    }
  });
}



  

$(function(){

  $(".main").onepage_scroll({
   sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000, // AnimationTime let you define how long each section takes to animate
   pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {}, // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {}, // This option accepts a callback function. The function will be called after the page moves.
   loop: true, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   responsiveFallback: 600 // You can fallback to normal page scroll by defining the width of the browser in which you want the responsive fallback to be triggered. For example, set this to 600 and whenever the browser's width is less than 600, the fallback will kick in.
  });
  header();
  giphyTest("kittens", displayGifs);
  searchForm();
  
  

});


