function getStar() {
    var jsonHTTP = new XMLHttpRequest();
	var api = 'api_key=8bd29dde4b31287cd5579e4bd90c80b3'
	var url1 = 'https://api.themoviedb.org/3/search/person?'
	var url2 = '&query='
	var callback = '&callback=test'
	var name = encodeURIComponent(document.getElementById("starName").value);
	var url = url1 + api + url2 + name + callback

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = jsonHTTP.responseText;
    	document.getElementById("actorName").innerHTML = (jsonHTTP.respontText[0].id); 
   }
}

jsonHTTP.send();

}

