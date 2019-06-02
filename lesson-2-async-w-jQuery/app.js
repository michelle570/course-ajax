/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

//start ajax image
$.ajax({
  url:`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}` ,
  headers: {
    Authorization:'Client-ID 11198af7eef28c65d3088bb2ec307766ff2c9fa4e3a0d460c07b60aa8ed2993e'
  }
}).done(addImage).fail(function(err){
  requestError(err, 'image');
});
//ajax add articles
//articleRequest.open('GET', 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchedForText + '&api-key=vPqkPSW71ajLIXRWeZH6k2qvydEba0oJ');

$.ajax({
  url:'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchedForText + '&api-key=vPqkPSW71ajLIXRWeZH6k2qvydEba0oJ' ,
}).done(addArticles).fail(function(err){
  requestError(err, 'image');
});


// add image
function addImage(data){
  let htmlcontent ='';
  //const data = JSON.parse(this.responseText);

  if (data && data.results && data.results[0]) {
    const firstImage = data.results[0];

    //htmlcontent = '<figure><img src="${firstImage.urls.regular}  alt="${searchedForText}"><figcaption>${searchedForText} by ${firstImage.user.name}</figcaption></figure>';
    htmlcontent = "<figure><img src='" + firstImage.urls.regular +  "' alt='" + searchedForText + "'><figcaption>" + searchedForText + " by " + firstImage.user.name + "</figcaption></figure>";
    //htmlcontent = firstImage.urls.regular;

  } else {
    htmlcontent = '<div class="error-no-image">No images available</div>';
  }
  responseContainer.insertAdjacentHTML('afterbegin', htmlcontent);
}
//end images

//add articles
function addArticles (data) {
  let htmlcontent = '';
  //const data = JSON.parse(this.responseText);
  if (data.response && data.response.docs && data.response.docs.length > 1) {
    htmlcontent = '<ul>' + data.response.docs.map(article => "<li class='article'><h2><a href=" + article.web_url + ">" + article.headline.main + "</a></h2><p>" + article.snippet + "</p></li>").join('') + "</ul>";
  } else {
    htmlcontent = '<div class="error-no-articles">No articles available</div>';
  }

  responseContainer.insertAdjacentHTML('beforeend', htmlcontent);

}

    });
})();
