
var searchWord = "";

function giphyTest(searchTerm, callback){
searchWord = searchTerm;
$.getJSON("http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=36", function(data){callback(data); });

};

function displayGifs(gifHash){
  // console.log($(test).length, $(test)[0]['data'][0], $(test)[0]['data'][1]['images']['original']['url']);
   if(gifHash.data.length < 1){
    var errorDiv = $("<div>").attr('id','error-div');
    var searchError = $("<h3>").attr('id','error').text('No gifs found on that search.');
    errorDiv.appendTo($("div.sect_one"));
    searchError.appendTo(errorDiv);
   }
   else{
  // takes a sample of 100 gifs
  var sampler = _.sample($(gifHash)[0]['data'], 36);
  
  // displays random gifs
  for(var i = 0; i < 10; i++){
    var wrap = $("<div>").addClass("wrap");
    var divy = $("<div>").attr("id", i).addClass("givs");
    var gifWrap = $("<div class = 'adiv'>");
    var lightedLinks = $("<a>").attr("rel", "gallery").attr("class","fancybox").attr("href",sampler[i]['images']['original']['url']).fancybox();
    var l = $("<img>").addClass("gifs").attr("src",sampler[i]['images']['fixed_height']['url']);
    var toFave = $("<button>").addClass("favorite").text("Favorite!").css("float","left"); 
    toFave.appendTo(wrap);
    lightedLinks.append(l);
    gifWrap.append(lightedLinks).appendTo(wrap);
    wrap.appendTo($("div.sect_one"));
    }
    for(var i = 9; i < 24; i++){
    var wrap = $("<div>").addClass("wrap");
    var divy = $("<div>").attr("id", i).addClass("givs");
    var gifWrap = $("<div class = 'adiv'>");
    var lightedLinks =$("<a>").attr("rel", "gallery").attr("class","fancybox").attr("href",sampler[i]['images']['original']['url']).fancybox();
    var l = $("<img>").addClass("gifs").attr("src",sampler[i]['images']['fixed_height']['url']);
    var toFave = $("<button>").addClass("favorite").text("Favorite!").css("float","left");
    toFave.appendTo(wrap);
    lightedLinks.append(l);
    gifWrap.append(lightedLinks).appendTo(wrap);
    wrap.appendTo($("div.sect_two"));
    }
  };
  favorite();
  destroyGif();
  editUser();
};

function header(){
  var header = $("<div>").addClass("header");
  // var title = $("<h2>").css("clear","both").css("float","left").css("font-family","Share Tech Mono").html("gif").appendTo(header);
  var logo = $("<img>").addClass("bomb").attr("src","http://fc01.deviantart.net/fs49/f/2009/230/0/3/Bobomb_Sploding_by_OldManRupee.gif").appendTo(header);
  var textBox= $("<span>").text("Graphics Interchange Format (better known by its acronym ").append($("<span>").text("gif").addClass("gifspan")).append($("<span>").text("), is a bitmap image format that was introduced by CompuServe in 1987[1]. A never ending loop of awesome[+1].")).addClass("heading").appendTo(header);
  var logInButton = $("<button>").addClass("login-top").text("Log In").appendTo(header);
  var signUpButton = $("<button>").addClass("login-top").text("Sign Up").appendTo(header);
  logInButton.on("click", function(event){event.preventDefault();$(".main").moveTo(3);});
  signUpButton.on("click", function(event){event.preventDefault();$(".main").moveTo(3);});
  header.prependTo($("section#1"));
}

function searchForm() {
  var searchBox = $("<form>").addClass("search");
  var searchBox2 = $("<form>").addClass("search");
  var keyword  = $("<input>").addClass("keyword").attr("type", "text").attr("name","keyword").attr("placeholder","Search for more gifs...");
  var keyword2  = $("<input>").addClass("keyword").attr("type", "text").attr("name","keyword").attr("placeholder","Search for more gifs...");
  searchBox.css("text-align", "center").append(keyword).prependTo($("div.sect_one"));
  searchBox2.css("text-align", "center").append(keyword2).appendTo($("div.sect_two"));
  
  keyword.on("keypress",function(e){
    var code = e.keyCode || e.which;
    if(code == 13) {
      searchBox.on("submit", function(event) {
        event.preventDefault();
        $(this).remove();
        $("div.sect_one").empty();
        $("div.sect_two").empty();
        searchForm();
        giphyTest(keyword.val(), displayGifs);
        $(".main").moveTo(1);
      });
    }
  });
  keyword2.on("keypress",function(e){
    var code = e.keyCode || e.which;
    if(code == 13) {
      searchBox2.on("submit", function(event) {
        event.preventDefault();
        $(this).remove();
        $("div.sect_one").empty();
        $("div.sect_two").empty();
        searchForm();
        giphyTest(keyword2.val(), displayGifs);
        $(".main").moveTo(1);
      });
    }
  });
}



  

$(function(){

  $(".main").onepage_scroll({
   sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease-in", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 500, // AnimationTime let you define how long each section takes to animate
   pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {}, // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {}, // This option accepts a callback function. The function will be called after the page moves.
   loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   responsiveFallback: 960 // You can fallback to normal page scroll by defining the width of the browser in which you want the responsive fallback to be triggered. For example, set this to 600 and whenever the browser's width is less than 600, the fallback will kick in.
  });
  header();
  giphyTest("kittens", displayGifs);
  searchForm();

});


