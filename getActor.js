function getStar() {
	//var xmlhttp = new XMLHttpRequest();
	var api = 'api_key=8bd29dde4b31287cd5579e4bd90c80b3'
	var url1 = 'https://api.themoviedb.org/3/search/person?'
	var url2 = '&querry='
	var name = encodeURIComponent(document.getElementById("starName").value);
	var url = url1 + api + url2 + name
	document.getElementById("actorName").innerHTML = url
};
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




