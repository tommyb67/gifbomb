
var searchWord = "";

function giphyTest(searchTerm, callback){
searchWord = searchTerm;
$.getJSON("http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=100", function(data){callback(data); });

};

// function imgurTest(callback){
//   $.getJSON("https://api.imgur.com/3/", function(data){callback(data); });
// }
function splash(){
  var divHead = $("<div>").addClass("sect_one");
  var heading = $("<h1>").addClass("def");
  var imgLogo = $("<img>").addClass("bomb");
  var span = $("<span>").addClass("defined");
  heading.html("gif");
  imgLogo.attr("src","http://fc01.deviantart.net/fs49/f/2009/230/0/3/Bobomb_Sploding_by_OldManRupee.gif");
  span.html("a bitmap image format that was introduced by CompuServe in 1987. a neverending loop of awesome.");
  divHead.append(heading).append(imgLogo).append(span).appendTo($("section#1"));
  
}
function moar(){
  var showMore = $("<button>").css("float","right").attr("id", "more").text("moar");
  showMore.appendTo($("div.sect_two"));
  showMore.on("click", function(e){
    e.preventDefault();
    $("div.sect_two").empty();
    // showMore.appendTo($("div.sect_two"));
    searchForm();
    
    giphyTest(searchWord, displayGifs);
    this.remove();
  });
}
function displayGifs(gifHash){
  // console.log($(test).length, $(test)[0]['data'][0], $(test)[0]['data'][1]['images']['original']['url']);

  // takes a sample of 100 gifs
  var sampler = _.sample($(gifHash)[0]['data'], 10);

  // displays random gifs
  for(var i = 0; i < sampler.length; i++){
    var divy = $("<div>").attr("id", i);
    var l = $("<img>").addClass("gifs").attr("src",sampler[i]['images']['fixed_height']['url']);
    l.appendTo(divy);
    divy.on("click", function(){
      var singleGif = $("div.sect_three");
      $(this).children().toggleClass("gifSingle");
      $(this).appendTo(singleGif);
      $(".main").moveDown();
    })
    divy.appendTo($("div.sect_two"));

    
  }
  
};

function searchForm() {
  var searchBox = $("<form>").addClass("search");
  var keyword  = $("<input>").attr("type", "text").attr("name","keyword");
  var title = $("<h2>").css("clear","both").css("float","left").css("font-family","Share Tech Mono").html("gif").appendTo($("div.sect_two"));
  var logo = $("<img>").attr("src","http://fc01.deviantart.net/fs49/f/2009/230/0/3/Bobomb_Sploding_by_OldManRupee.gif").appendTo($("div.sect_two"));;
  searchBox.css("float", "right").append(keyword).appendTo($("div.sect_two"));
  
  keyword.on("keypress",function(e){
    var code = e.keyCode || e.which;
    if(code == 13) {
      searchBox.on("submit", function(event) {
        event.preventDefault();
        $("div.sect_two").empty();
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
  splash();
  searchForm();
  moar();
  giphyTest("kittens", displayGifs);
  

});


