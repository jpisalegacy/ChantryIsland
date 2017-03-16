$(document).foundation();

// JavaScript Document

(function() {
	"use strict";
	console.log("SEAF Fired");
	//variables

	var map= new google.maps.Map(document.querySelector('.map-wrapper')), 
	marker,
	preloader = document.querySelector('.preload-wrapper'),
	//directions service
	directionsService = new google.maps.DirectionsService(),
	directionsDisplay,
	locations = [];
	
	//functions

	function initMap(position){
		locations[0]= {lat: position.coords.latitude, lng: position.coords.longitude};
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);

		map.setCenter({lat: 44.490588, lng:-81.404080});

		map.setZoom(10);

		marker = new google.maps.Marker({
			position : {lat: 44.490588, lng:-81.404080},
			map: map,
		});
		preloader.classList.add('hide-preloader');

		calcRoute();
	}

	function calcRoute(codeLoc){
		var request = {
			origin: locations[0],
			destination:{lat: 44.490588, lng:-81.404080},
			travelMode: 'DRIVING'
		};

		directionsService.route(request, function(response, status){
			if(status === 'OK'){
				directionsDisplay.setDirections(response);
			}
		});
	}


	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initMap, handleError);
	} else {
		console.log("no geolocation for you!");		
	}

	function handleError(e){
		console.log(e);
	}

	
	//listeners	

	window.addEventListener('load', codeAddress, false);
	
})();