function getStar() {
    var jsonHTTP = new XMLHttpRequest();
	var api = 'api_key=8bd29dde4b31287cd5579e4bd90c80b3'
	var url1 = 'https://api.themoviedb.org/3/search/person?'
	var url2 = '&query='
	var name = encodeURIComponent(document.getElementById("starName").value);
	var url = url1 + api + url2 + name

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
      document.getElementById("actorName").innerHTML = jsonHTTP.responseText; 
   }
}

req.send();
//xmlhttp.onreadystatechange=function() {
 //   if (this.readyState == 4 && this.status == 200) {
 //       //myFunction(this.responseText);
 //       var json = this.responseText;
 //       var id = JSON.parse(json);
 //       document.getElementById("actorName").innerHTML = json.page.id;
 //   }
//}

//xmlhttp.open("GET", url, true);
//xmlhttp.send();
//}
//function myFunction(response) {
//    var arr = JSON.parse(response);
//    var out = arr.id;


//document.getElementById("actorName").innerHTML = arr;
}
//function ajax(url, callback) {
//  var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange = function(){
//        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
//            callback(xmlhttp.responseText);
//        } else {
//            // handle the request
//        }
//    }
//    xmlhttp.open("GET", url, true);
//    xmlhttp.send();
//}
//
//function requestData(endpoint) {
//    var root = 'https://api.github.com';
//    ajax(root + endpoint, function(data) {
//        document.getElementById('output').innerHTML = data;
//    });
//}




