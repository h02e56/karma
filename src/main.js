/*var j = JSON.parse(makeRequest("/code/hunt/data.php", "get"));
console.log(j);*/

var config = {
	users : [{
		user: "user1",
		color: "#ca2a27",
		opacity: 0.5
		},
		{
		user: "user2",
		color: "#277bca",
		opacity: 0.5
	}],
	geoOptions: {
  		enableHighAccuracy : true, 
  		maximumAge       : 0, 
  		timeout          : 27000
	},
	markers:{}

}


var APP ={

	init : function(){

		detectBrowser();

		//geolocation
		//callback:uploadPosition
		navigator.geolocation.watchPosition(uploadPosition, geo_error, config.geoOptions);
	}
}

APP.init();

function geo_error() {
  alert("Sorry, no position available.");
}


function uploadPosition(pos){

	var position = pos.coords,
		newPosition={};

	newPosition.lat = position.latitude;
	newPosition.lon = position.longitude;
	newPosition.accuracy = position.accuracy;

	if(localStorage["user"]){
		newPosition.user = localStorage["user"];		
	}
	else{
		newPosition.user = "";			
	}

	//lets start registering users
	makeRequest('php/init.php', "POST", newPosition).then(function(response){
			register(JSON.parse(response));
		}, function(error){
			console.log(error);
		});

}

/*
**fist time entered. we register user ans start updating
///////////////////////////////////////////////////////////
*/
function register(response){	

	var message = response.message;
	var user = response.user;
	var lat = response.lat;
	var lon = response.lon;

	console.log(response.message);
	

	if (!localStorage["user"]){
		localStorage["user"] = user;//save our name	
		//lets paint basic map wutih our pos
		initOurMap(lat, lon);	
	}
	
	alert(message);

	/*if( response.start = "true"){//server detects more than 1 user		
		alert("other user has entered");*/
		stream();
	//}

 } 
/*
**we create our map/ 
**param user lat i lon
**first and last time
*/

function initOurMap(lat, lon){//init map// USER 1

	var myLatlng = new google.maps.LatLng(lat, lon);
	//console.log(myLatlng);
	var mapOptions = {
	  zoom: 15,
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	}

	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

}

/*
**set amarker on map
**type of mark is static. circle right now
**passin color
**passing possition/myLatlng
*/
function setMarker(map, user, myLatlng){

	var color = config.users[1].color,
		opacity = config.users[1].opacity;

	config.markers[user] = new google.maps.Marker({
        map: map,
        icon: {
		    path: google.maps.SymbolPath.CIRCLE,
		    scale: 2,
		    fillColor: color,
		    strokeColor: color,
		     strokeOpacity: opacity,
		    fillOpacity: opacity
		  },
        draggable: false,
        position: myLatlng,
        //animation: google.maps.Animation.BOUNCE
    });
	
}

/*
**sget data from server
**and oaint all markers
*/
function pointOnMap(data){//USER 2

	document.querySelector('section').innerHTML = "";
	clearMarkers(config.markers);//clear actual markers we are goinfg to put new

	for (var i in data){
		var user = data[i].user;
		var lat = data[i].lat;
		var lon = data[i].lon;
		/*if (user !== localStorage["user"]){//if not us*/
			var myLatlng = new google.maps.LatLng(lat, lon);
			setMarker(map, user, myLatlng);			
		/*}*/		

		paintInfoBoxes(user, lat, lon);
	}
}


function paintInfoBoxes(user, lat, lon){
	
	var me = localStorage["user"];
	var boxHTML = document.createElement('div');
	var wrapper = document.querySelector('section');

	boxHTML.setAttribute("id", user);
	boxHTML.className = "boxes";

	if(me === user) {//don't show if is my data
		boxHTML.innerHTML = "ME<br>Name:" + user + "<br>lat: " + lat + "<br>lon:" + lon;
	}else{
		boxHTML.innerHTML = "<br>Name:" + user + "<br>lat: " + lat + "<br>lon:" + lon;
	}
	
	wrapper.appendChild(boxHTML);
}


function clearMarkers(obj){

	for( var i in obj ){
		obj[i].setMap(null);
	}

	obj = {};//emppty cache	
}

/*
*
*stream function
*
*
*/
function stream(){
	
	var stream = new EventSource("php/stream.php");

	stream.onload = function(e){
		console.log(load);
	};

	stream.addEventListener('message', function(e){
		if(e.origin != "http://www.h02e56.com"){
			return;
		}
		var data = JSON.parse(e.data);
		console.log(data);
		pointOnMap(data);

	}, false);

	stream.addEventListener("open", function(e){
		console.log("conection open");
	})

	stream.addEventListener("error", function(e){
		if (e.readyState == EventSource.CLOSED) {
		    // Connection was closed.
	    	console.log("closed");
		 }
	}, false);
}

//////////////////////
/////CHECK LOCALSTOREGE
/////////////////////////////////
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
  	console.log("don't support localstorage")
    return false;
  }
}

//////ios stuff
function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map_canvas");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}



/////////////////////
/////AJAX

function showLoader(res){
	console.log("loading");
}


function endLoader(res){
	console.log(res);

}


function fail(res){
	console.log(res.error);
}


/*function makeRequest(url, type, data, callback){
	var stringdata = JSON.stringify(data);

	var jqxhr = $.ajax({
		url 		: url,
		type 		: type,
		dataType	: "json",
		data 		: {"data" : stringdata},
		beforeSend	: showLoader
	})

	jqxhr.then(function(response){

		callback(response);		
	});
}*/


