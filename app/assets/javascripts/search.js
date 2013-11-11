function searchForm() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    $("div.sect_two").empty();
    var keyword = this.keyword.value;
    console.log(keyword);
    giphyTest(keyword, displayGifs);
  });
}

