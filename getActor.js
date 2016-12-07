var id = '';
var bday = '';
var movie = '';
var recentOne;
var recentTwo;
var recentThree;

document.getElementById("searchOne").addEventListener("click", function() {
    getStarID(localStorage.getItem('recentOne')); 
}, false);

if (typeof(Storage) !== "undefined") {
  if (localStorage.getItem("recentOne") === null)  {
  localStorage.setItem('recentOne',"Please search for a star.") 
} else {
    document.getElementById("searchOne").innerHTML = localStorage.getItem("recentOne");
document.getElementById("searchTwo").innerHTML = localStorage.getItem("recentTwo");
document.getElementById("searchThree").innerHTML = localStorage.getItem("recentThree");}
 	} else {
    document.getElementById("recent").innerHTML = "Please us a different browser to view recent searches.";
}

 
document.getElementById("searchButton").onclick = function() {
  if (encodeURIComponent(document.getElementById("starName").value) === '') {
    p = document.createElement("P");
    p.innerHTML = "you must enter a name.";
    document.getElementById('error').appendChild(p);
  } else {
	var searching = document.getElementById('searchBox');
  var recents = document.getElementById('recentSearch');
  if (searching.classList.contains("search")) { 
    (searching.classList.remove('search'));
    (searching.classList.add("search_found"));
    (recents.classList.remove('recent'));
    (recents.classList.add("recent_found"));
    getStarID();
  } else {
  getStarID(); 
  }
  }
}
  
function getStarID(name) {
  var jsonHTTP = new XMLHttpRequest();
	var api = 'api_key=8bd29dde4b31287cd5579e4bd90c80b3';
	var url1 = 'https://api.themoviedb.org/3/search/person?';
	var url2 = '&query=';
	var callback = '&callback=person'
  if (name == null){
	name = encodeURIComponent(document.getElementById("starName").value);}
	var url = url1 + api + url2 + name;
	if (localStorage.getItem("recentOne") !== null) {
		if (localStorage.getItem("recentTwo") !== null) {
			localStorage.setItem('recentThree',localStorage.getItem('recentTwo'));
      localStorage.setItem('recentTwo', localStorage.getItem('recentOne'));
			document.getElementById("searchThree").innerHTML = localStorage.getItem("recentThree")
      document.getElementById("searchTwo").innerHTML = localStorage.getItem("recentTwo")
    	} else {
		localStorage.setItem('recentTwo',localStorage.getItem('recentOne'));
    	document.getElementById("searchTwo").innerHTML = localStorage.getItem("recentTwo");
      	localStorage.setItem('recentOne',document.getElementById("starName").value);
  		document.getElementById("searchOne").innerHTML = localStorage.getItem("recentOne")
    } 
	localStorage.setItem('recentOne',document.getElementById("starName").value);
  	document.getElementById("searchOne").innerHTML = localStorage.getItem("recentOne")}

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
      var id = data.results[0].id;
      var name = data.results[0].name;
      var pic = 'https://image.tmdb.org/t/p/w500/' + data.results[0].profile_path;  
      getStarBday(id, name, pic);
}
}
jsonHTTP.send();
}

function getStarBday(id,name,pic) {
  var jsonHTTP = new XMLHttpRequest();
	var api = '?api_key=8bd29dde4b31287cd5579e4bd90c80b3';
	var url1 = 'https://api.themoviedb.org/3/person/';
	var url2 = '&language=en-US';
	var url = url1 + id + api + url2

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
        var bday = data.birthday;
        var milliseconds = Math.abs(new Date() - new Date(bday.replace(/-/g,'/')));
        var age = Math.floor(milliseconds / 31536000000);
        var imageBox = document.createElement('IMG');
        imageBox.className = 'star1';
        imageBox.setAttribute('src', pic);
        imageBox.setAttribute('id', 'strimg');
        var description = document.createElement("P");
        var l1 = document.createTextNode(name + " is " + age + " years old.");
        description.className = "bio";
        description.setAttribute('id', 'bio')
        description.appendChild(l1);
     	  var searching = document.getElementsByClassName('star1');
        if (searching.length > 0) { 
            imageBox.className = 'star1';
            var oldIMG = document.getElementById("strimg");
            var oldDesc = document.getElementById('bio');
          document.getElementById('results').innerHTML = "";
          document.getElementById('starImage').replaceChild(imageBox,oldIMG);
          document.getElementById('nameAge').replaceChild(description, oldDesc);
  } else {
  	 document.getElementById('starImage').appendChild(imageBox);
     document.getElementById('nameAge').appendChild(description);
  } 
    var resultsAdd = document.createElement("DIV");
    resultsAdd.className = "results";
    resultsAdd.setAttribute('id','results');
    document.getElementById('gradient').appendChild(resultsAdd);
    getMovieList(id,bday)
}
}
jsonHTTP.send();
} 

function getMovieList(id,bday) {
  var jsonHTTP = new XMLHttpRequest();
	var api = '/combined_credits?api_key=8bd29dde4b31287cd5579e4bd90c80b3&language=en-US';
	var url1 = 'https://api.themoviedb.org/3/person/';
	var url = url1 + id + api

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
        var movieArray = data;
            for (var i = 0; i < movieArray.cast.length; i++) { 
            var movie = (movieArray.cast[i].title) || (movieArray.cast[i].name);
            var releaseDate = (movieArray.cast[i].release_date) || (movieArray.cast[i].first_air_date);
            if (releaseDate == null){ 
            releaseDate = '?';
           }
            var poster;
            if (movieArray.cast[i].poster_path == null) {
            	poster = '?';
            } else {
            	poster = 'https://image.tmdb.org/t/p/w500/' + movieArray.cast[i].poster_path;}
            display(movie, releaseDate, bday, poster)
}
  }
}
jsonHTTP.send();
} 

function display(title,releaseDate,bday,poster) {
    var missingPoster ='https://www.themoviedb.org/assets/1c4aa0e7695a4eebe9a4d2c34a93bf34/images/no-poster-w600_and_h900_bestv2-v2.png';
    var age;
    var div;
    var p;
    var milliseconds = Math.abs(new Date(releaseDate.replace(/-/g,'/')) - new Date(bday.replace(/-/g,'/')));
     if (releaseDate == '?') {
     age = '?';
     } else {
     age = Math.floor(milliseconds / 31536000000);
     }
    var text = document.createTextNode(title + " , age " + age);
    var imageBox = document.createElement('IMG');
    div = document.createElement("DIV"); 
    div.className = 'gridRow'
    div.setAttribute('id','gridRow');
    p = document.createElement("P");
    imageBox.className = 'poster';
    if (poster == '?') {
    imageBox.setAttribute('src', missingPoster);    
    div.appendChild(imageBox);
    p.appendChild(text);
    document.getElementById('results').appendChild(div).appendChild(p);
    } else {
    imageBox.setAttribute('src', poster);   
    div.appendChild(imageBox);
    p.appendChild(text);
    document.getElementById('results').appendChild(div).appendChild(p);
    }
}

function openNav() {
    document.getElementById("myNav").style.width = "30%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}