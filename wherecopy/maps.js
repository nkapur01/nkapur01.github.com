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
		var	lat=position.coords.latitude;
		var	lng=position.coords.longitude;
		
		var location=new google.maps.LatLng(lat, lng);
			console.log("made location");
			map.setCenter(location);
		var marker=new google.maps.Marker({
			position: location,
			map: map,
			title: "You are here"
			});
		});
		t_locations();
	}
}

function t_locations(){
Tstation=new Object;

	Tstation['RALEN']={'station':'Alewife Station', 'position':new google.maps.LatLng(42.395428, -71.142483)};
	Tstation['RDAVN']={'station':'Davis Station', 'position':new google.maps.LatLng(42.39674, -71.121815)};
	Tstation['RPORN']={'station':'Porter Square Station', 'position':new google.maps.LatLng(42.3884, -71.119149)};
	Tstation['RHARN']={'station':'Harvard Square Station', 'position':new google.maps.LatLng(42.373362, -71.118956)};
	Tstation['RCENN']={'station':'Central Square Station','position':new google.maps.LatLng(42.365486, -71.103802)};
	Tstation['RKENN']={'station':'Kendall/MIT Station', 'position':new google.maps.LatLng(42.3624908, -71.086177)};
	Tstation['RMGHN']={'station': 'Charles/MGH Station', 'position':new google.maps.LatLng(42.361166, -71.070628)};
	Tstation['RPRKN']={'station': 'Park St. Station', 'position':new google.maps.LatLng(42.3563946, -71.062424)};
	Tstation['RDTCN']={'station':'Downtown Crossing Station', 'position':new google.maps.LatLng(42.355518, -71.060225)};
	Tstation['RSOUN']={'station':'South Station', 'position':new google.maps.LatLng(42.352271, -71.055242)};
	Tstation['RBRON']={'station':'Broadway Station', 'position':new google.maps.LatLng(42.342622, -71.056967)};
	Tstation['RANDN']={'station':'Andrew Station', 'position':new google.maps.LatLng(42.330154, -71.057655)};
	Tstation['RJFKN']={'station':'JFK/UMass Station', 'position':new google.maps.LatLng(42.320685, -71.052391)};
	Tstation['RSAVN']={'station':'Savin Hill Station', 'position':new google.maps.LatLng(42.31129, -71.05331)};
	Tstation['RFIEN']={'station':'Fields Corner Station', 'position':new google.maps.LatLng(42.300093, -71.061667)};
	Tstation['RSHAN']={'station':'Shawmut Station', 'position':new google.maps.LatLng(42.2931258, -71.065738)};
	Tstation['RASHS']={'station':'Ashmont Station', 'position':new google.maps.LatLng(42.284652, -71.064489)};
	Tstation['RNQUN']={'station':'North Quincy Station', 'position':new google.maps.LatLng(42.275275, -71.029583)};
	Tstation['RWOLN']={'station':'Wollaston Station', 'position':new google.maps.LatLng(42.2665139, -71.020337)};
	Tstation['RQUCN']={'station':'Quincy Center Station', 'position':new google.maps.LatLng(42.251809, -71.005409)};
	Tstation['RQUAN']={'station':'Quincy Adams Station', 'position':new google.maps.LatLng(42.233391, -71.007153)};
	Tstation['RBRAS']={'station':'Braintree Station', 'position':new google.maps.LatLng(42.2078543, -71.001139)};

	for(var key in Tstation)
	{
		//set marker
		map.setCenter(Tstation[key]['position']);
		var marker=new google.maps.Marker({
			position: Tstation[key]['position'],
			map: map,
			title: 'T Station',
			icon: 'mbta_pin.png'
		});
		
		//add info window
		marker['infoWindow']=new google.maps.InfoWindow({
			content:Tstation[key]['station']
		});
		google.maps.event.addListener(marker, 'click', function() {
			this['infoWindow'].open(map, this)
		}); 
	}
}			