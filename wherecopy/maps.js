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
		console.log(longitude);
		var location=new google.maps.LatLng(latitude, longitude);

		map.setCenter(location);
		var marker=new google.maps.Marker({
			position: location,
			title: "You are here"
			});

		});
	
	}
}