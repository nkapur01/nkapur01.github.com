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

var closest_stop; //closest stop to current location
var distance_to; //distance to closest stop

function init(){
		mapSetting={
		center: new google.maps.LatLng(42.3000, -71.8000),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
 	map = new google.maps.Map(document.getElementById("map_canvas"),
            mapSetting); 

    myLocation();
    t_locations();
	drawLine();
}

function myLocation(){

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var	lat=position.coords.latitude;
			var	lng=position.coords.longitude;
		
			var location=new google.maps.LatLng(lat, lng);
				map.setCenter(location);
			var marker=new google.maps.Marker({
				position: location,
				map: map,
				title: "Your_Location"
			});
			marker['infoWindow']=new google.maps.InfoWindow({
				content:"I know where you live<br>" + String(lat)+ " , " + String(lng)+ closest_tstop(location) + String(distance_to)
			});
			google.maps.event.addListener(marker, 'click', function() {
				this['infoWindow'].open(map, this)
			}); 
		});
	}
}

function t_locations(){
Tpositions=new Object;
	//loop through associative array Tstation and create markers
	for(var key in Tstation)
	{
		//set marker
		map.setCenter(Tstation[key]['position']);
		var marker=new google.maps.Marker({
			position: Tstation[key]['position'],
			map: map,
			title: Tstation[key]['station'],
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

function drawLine(){

	Tstop_positions= [new google.maps.LatLng(42.395428, -71.142483), new google.maps.LatLng(42.39674, -71.121815), new google.maps.LatLng(42.3884, -71.119149), new google.maps.LatLng(42.373362, -71.118956), new google.maps.LatLng(42.365486, -71.103802), new google.maps.LatLng(42.3624908, -71.086177), new google.maps.LatLng(42.361166, -71.070628),new google.maps.LatLng(42.3563946, -71.062424),new google.maps.LatLng(42.355518, -71.060225), new google.maps.LatLng(42.352271, -71.055242),new google.maps.LatLng(42.342622, -71.056967),new google.maps.LatLng(42.330154, -71.057655),new google.maps.LatLng(42.320685, -71.052391),new google.maps.LatLng(42.31129, -71.05331),new google.maps.LatLng(42.300093, -71.061667),new google.maps.LatLng(42.2931258, -71.065738),new google.maps.LatLng(42.284652, -71.064489),new google.maps.LatLng(42.275275, -71.029583),new google.maps.LatLng(42.2665139, -71.020337),new google.maps.LatLng(42.251809, -71.005409),new google.maps.LatLng(42.233391, -71.007153),new google.maps.LatLng(42.2078543, -71.001139)];
	var Tpath= new google.maps.Polyline({
		path: Tstop_positions,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,	
		strokeWeight: 2
	});
	Tpath.setMap(map);
}

function closest_tstop(location){
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    var my_lat=location.position.lat();
    var my_lng=location.position.lng();
    for( i=0;i<Tstop_positions.length; i++ ) {
        var Tlat = map.marker[i].position.lat();
        var Tlng = map.marker[i].position.lng();
        var dLat  = rad(my_lat - lat); //distance latitude
        var dLong = rad(my_lng - lng); //distance longitude
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }

	distance_to=distances[closest];   
    return map.marker[closest].title;
    
        
}
