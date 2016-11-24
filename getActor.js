function getStar() {
	var api = '&language=en-US&api_key=8bd29dde4b31287cd5579e4bd90c80b3';
	var url1 = 'https://api.themoviedb.org/3/search/person?';
	var url2 = '&query=';
	var name = encodeURIComponent(document.getElementById("starName").value);
	var url = url1 + url2 + name + api;

var data = "{}";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    document.getElementById("json").innerHTML = (this.responseText);
  }
});

//xhr.open("GET", "https://api.themoviedb.org/3/search/person?query=bruce%20willis&language=en-US&api_key=8bd29dde4b31287cd5579e4bd90c80b3");

xhr.open("GET", url);

xhr.send(data);

}

