$(document).foundation();
// variables for Movie Search
var searchMoviesBtn = document.querySelector("#search-movies");
var runGenreSearch= document.querySelector("#search-genre");
var modalBg = document.querySelector(".modal-bg");
var checkboxes = document.querySelectorAll(".checkbox");
var movieSuggestions = document.querySelector("#movie-suggestion")
var str = "";

// variables for Youtube Search
var youtubeEL = document.querySelector("#youtube-suggestion");
var youtubeModalBg = document.querySelector("#youtube-modal-bg")
var searchYoutubeBtn = document.querySelector("#search-youtube");
var runYoutubeSearch = document.querySelector("#run-youtube-search")
var inputOne = document.querySelector("#input-1")
var promptEl = document.querySelector("#prompt")
var formEl = document.querySelector("#youtube-form")
var promptArray = [ "What is your favorite animal?","What is your favorite food?","What is your favorite sport?","Write the first word you can think of.","What is the coolest place you've been?", "Name a hobby.", "Name a planet.",]

//save watched movies var
var watched = [];
 

// functions for Movie Search
var movieAPI = function (genre) {
    var apiUrl = "https://imdb-api.com/API/AdvancedSearch/k_0m8x9src/?genres=" + genre + "&count=10"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for(i=0; i < 4; i++) {
                var mTitle = data.results[i].title;
                var mImageURL = data.results[i].image
                displayMovies(mTitle, mImageURL)
            }
        
        })} else {
            window.alert('not valid')
        }
    });
};

var resetCheckboxes = function() {
    str = "";
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

var displayMovies = function (mTitle, mImageURL) {
    var movieCard = document.createElement("div")

    var movTitleEl = document.createElement("h4");
    movTitleEl.setAttribute("data-mTitle", mTitle)
    movTitleEl.textContent = mTitle;
    movieCard.appendChild(movTitleEl);

    var movImageEl = document.createElement("img");
    movImageEl.src = mImageURL
    movImageEl.classList.add("mov-image-width")
    movieCard.appendChild(movImageEl);

    var watchedEl = document.createElement("button");
    watchedEl.textContent = "Watched";
    watchedEl.classList.add("watchedbtn");
    watchedEl.addEventListener("click", saveMovies);
    movieCard.appendChild(watchedEl);
    movieSuggestions.appendChild(movieCard);
}

// event Listeners for Movie Search
searchMoviesBtn.addEventListener("click", function(){
    modalBg.classList.add("bg-active")
})
runGenreSearch.addEventListener('click', function(){
    modalBg.classList.remove("bg-active");
    for ( i = 0; i < checkboxes.length; i++)  {
        if ( checkboxes[i].checked === true ){
            str += checkboxes[i].value + ","
        }
    };
    movieAPI (str);
    resetCheckboxes();
})

//save watched movies
var saveMovies = function (e) {
    //add localstorage
    console.log(e.target.previousElementSibling.previousElementSibling.dataset.mtitle);
    console.log(e.target.previousElementSibling.src);
};

// function for YouTube Search
var youtubeAPI = function (keyword) {
    var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + keyword + '&type=video&videoDuration=short&videoEmbeddable=true&key=AIzaSyCqv1-wCJ6ZsvLMDOpmxtMGoR-VPFEhraY'
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for(i=0; i < 4; i++) {
                var x = data.items[i].id.videoId
                var title = data.items[i].snippet.title
                displayVideos(x, title)
            }       
        })} else {
            window.alert('not valid')
        }
    });
};


var displayVideos = function(youtubeID, vidtitle) {
    var videoCard = document.createElement("div")
    videoCard.classList.add("video-card")

    var vidTitleEl = document.createElement("h3");
    vidTitleEl.textContent = vidtitle;
    videoCard.appendChild(vidTitleEl);

    var addLink = document.createElement("div");
    addLink.innerHTML = "<iframe src='https://www.youtube.com/embed/" + youtubeID + "'" + ' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    videoCard.appendChild(addLink)

    youtubeEL.appendChild(videoCard)
}

// Event Listeners for Youtube
searchYoutubeBtn.addEventListener("click", function() {
    youtubeModalBg.classList.add("bg-active");
    promptEl.innerHTML = promptArray[Math.floor(Math.random() * promptArray.length)];
});

runYoutubeSearch.addEventListener("click", function(){
    event.preventDefault();
    if(document.querySelector(".video-card"))
    {
        document.querySelectorAll(".video-card").forEach(el => el.remove());
    }
    var keyword = inputOne.value.trim();
    youtubeAPI(keyword);
    youtubeModalBg.classList.remove("bg-active");
})
