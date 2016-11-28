var id = ''
var bday = ''
var movie = ''
function moveBar(){
	var searching = document.getElementsByClassName('search')[0];

document.getElementsByClassName('go')[0].onclick = function() {
  if(this.innerHTML == 'go') 
  { 
    this.innerHTML = 'go';
    searching.classList.add('searched');
  } else {
    this.innerHTML = 'go';
    var computedStyle = window.getComputedStyle(searchED),
        marginLeft = computedStyle.getPropertyValue('margin-left');
    searchED.style.marginLeft = marginLeft;
    searchED.classList.remove('searched');    
  }  
  getStarID();
}
}
function getStarID() {
	//moveBar();
  var jsonHTTP = new XMLHttpRequest();
	var api = 'api_key=8bd29dde4b31287cd5579e4bd90c80b3';
	var url1 = 'https://api.themoviedb.org/3/search/person?';
	var url2 = '&query=';
	var callback = '&callback=person'
	var name = encodeURIComponent(document.getElementById("starName").value);
	var url = url1 + api + url2 + name;

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
      var id = data.results[0].id;
      var name = data.results[0].name;
      //document.getElementById("profileImage").innerHTML = 'https://image.tmdb.org/t/p/w500/' + data.results[0].profile_path;  
    //var img = document.createElement("IMG"); document.getElementById("profileImage").replaceChild(img, 'https://image.tmdb.org/t/p/w500/' + data.results[0].profile_path)
      //display(id)
      getStarBday(id, name);
}
}
jsonHTTP.send();
}

function getStarBday(id,name) {
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
        var age = Math.floor(milliseconds / 31536000000)
        document.getElementById('nameAge').innerHTML = name + " is " + age + " years old."
        getMovieList(id,bday)
   		//document.getElementById("json").innerHTML = "json = " + bday;
}
}
jsonHTTP.send();
} 
function display(title,releaseDate,bday) {
    var table = document.getElementById('movie');
    var tbody = table.getElementsByTagName('tbody');
    var row = tbody[0].insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var milliseconds = Math.abs(new Date(releaseDate.replace(/-/g,'/')) - new Date(bday.replace(/-/g,'/')));
        var age = Math.floor(milliseconds / 31536000000)
    cell1.innerHTML = title;
    cell2.innerHTML = age;
}

function getMovieList(id,bday) {
  var jsonHTTP = new XMLHttpRequest();
	var api = '/movie_credits?api_key=8bd29dde4b31287cd5579e4bd90c80b3&language=en-US';
	var url1 = 'https://api.themoviedb.org/3/person/';
	var url = url1 + id + api

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
        var movieArray = data;
            for (var i = 0; i < movieArray.cast.length; i++) { 
            var movie = (movieArray.cast[i].title);
            var releaseDate = (movieArray.cast[i].release_date)
            display(movie, releaseDate, bday)
}
  }
}
jsonHTTP.send();
} 