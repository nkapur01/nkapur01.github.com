function init(){
		mapSetting={
		center: new google.maps.LatLng(42.3000, -71.8000),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
 	map = new google.maps.Map(document.getElementById("map_canvas"),
            mapSetting);

    myLocation();

}

function myLocation(){

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
		lat=position.coords.latitude;
		lng=position.coords.longitude;
		console.log(lng);
		var location=new google.maps.LatLng(lat, lng);
		console.log("made location");
		map.setCenter(location);
		console.log("set new center");
		var marker=new google.maps.Marker({
			position: location,
			map: map,
			title: "You are here"
			});
			console.log("marker made!");

		});
	
	}
}