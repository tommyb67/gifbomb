// Gif Index page JS

function giphyTest(callback){
  
$.getJSON("http://api.giphy.com/v1/gifs/search?q=kittens&amp;api_key=dc6zaTOxFJmzC&amp;limit=100", function(data){callback(data); });

};

// function imgurTest(callback){
//  $.getJSON("https://api.imgur.com/3/", function(data){callback(data); });
// }
function header(){
  var divHead = $("<div>").addClass("sect_one");
  var heading = $("<h1>").addClass("def");
  var imgLogo = $("<img>").addClass("bomb");
  var span = $("<span>").addClass("defined");
  heading.html("gif");
  imgLogo.attr("src","http://fc01.deviantart.net/fs49/f/2009/230/0/3/Bobomb_Sploding_by_OldManRupee.gif");
  span.html("a bitmap image format that was introduced by CompuServe in 1987. a neverending loop of awesome.");
  divHead.append(heading).append(imgLogo).append(span).appendTo($("section#1"));
  var search = $("<form>").append($("<input>").attr("class", "search"));
}
function displayGifs(gifHash){
  // console.log($(test).length, $(test)[0]['data'][0], $(test)[0]['data'][1]['images']['original']['url']);

  // takes a sample of 100 gifs
  var sampler = _.sample($(gifHash)[0]['data'], 12);
  header();

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
function displayImg(test){
  console.log(test);
}

  

$(function(){

  $(".main").onepage_scroll({
  sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
  easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
  animationTime: 1000, // AnimationTime let you define how long each section takes to animate
  pagination: false, // You can either show or hide the pagination. Toggle true for show, false for hide.
  updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
  beforeMove: function(index) {}, // This option accepts a callback function. The function will be called before the page moves.
  afterMove: function(index) {}, // This option accepts a callback function. The function will be called after the page moves.
  loop: true, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
  responsiveFallback: 600 // You can fallback to normal page scroll by defining the width of the browser in which you want the responsive fallback to be triggered. For example, set this to 600 and whenever the browser's width is less than 600, the fallback will kick in.
  });
  giphyTest(displayGifs);
  // imgurTest(displayImg);
});