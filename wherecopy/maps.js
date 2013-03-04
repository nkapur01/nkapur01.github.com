Tstation=new Object;
	Tstation['RALE']={'station':'Alewife Station', 'position':new google.maps.LatLng(42.395428, -71.142483), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RDAV']={'station':'Davis Station', 'position':new google.maps.LatLng(42.39674, -71.121815), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RPOR']={'station':'Porter Square Station', 'position':new google.maps.LatLng(42.3884, -71.119149), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RHAR']={'station':'Harvard Square Station', 'position':new google.maps.LatLng(42.373362, -71.118956), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RCEN']={'station':'Central Square Station','position':new google.maps.LatLng(42.365486, -71.103802), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RKEN']={'station':'Kendall/MIT Station', 'position':new google.maps.LatLng(42.3624908, -71.086177), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RMGH']={'station': 'Charles/MGH Station', 'position':new google.maps.LatLng(42.361166, -71.070628), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RPRK']={'station': 'Park St. Station', 'position':new google.maps.LatLng(42.3563946, -71.062424), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RDTC']={'station':'Downtown Crossing Station', 'position':new google.maps.LatLng(42.355518, -71.060225), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RSOU']={'station':'South Station', 'position':new google.maps.LatLng(42.352271, -71.055242), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RBRO']={'station':'Broadway Station', 'position':new google.maps.LatLng(42.342622, -71.056967), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RAND']={'station':'Andrew Station', 'position':new google.maps.LatLng(42.330154, -71.057655), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RJFK']={'station':'JFK/UMass Station', 'position':new google.maps.LatLng(42.320685, -71.052391), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RSAV']={'station':'Savin Hill Station', 'position':new google.maps.LatLng(42.31129, -71.05331), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RFIE']={'station':'Fields Corner Station', 'position':new google.maps.LatLng(42.300093, -71.061667), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RSHA']={'station':'Shawmut Station', 'position':new google.maps.LatLng(42.2931258, -71.065738), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RASH']={'station':'Ashmont Station', 'position':new google.maps.LatLng(42.284652, -71.064489), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RNQU']={'station':'North Quincy Station', 'position':new google.maps.LatLng(42.275275, -71.029583), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RWOL']={'station':'Wollaston Station', 'position':new google.maps.LatLng(42.2665139, -71.020337), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RQUC']={'station':'Quincy Center Station', 'position':new google.maps.LatLng(42.251809, -71.005409), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RQUA']={'station':'Quincy Adams Station', 'position':new google.maps.LatLng(42.233391, -71.007153), 'arrivalN': 0, 'arrivalS':0};
	Tstation['RBRA']={'station':'Braintree Station', 'position':new google.maps.LatLng(42.2078543, -71.001139), 'arrivalN': 0, 'arrivalS':0};
	
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
	//init_request_times();
}

function myLocation(){

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var	lat=position.coords.latitude;
			var	lng=position.coords.longitude;
		
			var my_location=new google.maps.LatLng(lat, lng);
				map.setCenter(my_location);
			var marker=new google.maps.Marker({
				position: my_location,
				map: map,
				title: "Your Location"
			});
			closest_tstop(my_location);
			marker['infoWindow']=new google.maps.InfoWindow({
				content:"I know where you live<br>" + String(lat)+ " , " + String(lng)+
						"<br> The closest station is: " + closest_tstop(my_location) + 
						"<br>It is "+String(distance_to)+ " miles away"
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
	Tstop_positions= [new google.maps.LatLng(42.39674, -71.121815), new google.maps.LatLng(42.3884, -71.119149), new google.maps.LatLng(42.373362, -71.118956), new google.maps.LatLng(42.365486, -71.103802), new google.maps.LatLng(42.3624908, -71.086177), new google.maps.LatLng(42.361166, -71.070628),new google.maps.LatLng(42.3563946, -71.062424),new google.maps.LatLng(42.355518, -71.060225), new google.maps.LatLng(42.352271, -71.055242),new google.maps.LatLng(42.342622, -71.056967),new google.maps.LatLng(42.330154, -71.057655),new google.maps.LatLng(42.320685, -71.052391),new google.maps.LatLng(42.31129, -71.05331),new google.maps.LatLng(42.300093, -71.061667),new google.maps.LatLng(42.2931258, -71.065738),new google.maps.LatLng(42.284652, -71.064489),new google.maps.LatLng(42.275275, -71.029583),new google.maps.LatLng(42.2665139, -71.020337),new google.maps.LatLng(42.251809, -71.005409),new google.maps.LatLng(42.233391, -71.007153),new google.maps.LatLng(42.2078543, -71.001139)];
	var Tpath= new google.maps.Polyline({
		path: Tstop_positions,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,	
		strokeWeight: 2
	});
	Tpath.setMap(map);
}

/*
function init_request_times(){
	request=new XMLHttpRequest();
	request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	request.send(null);
	request.onreadystatechange = parse_times;
}


function parse_times(){
	if(request.readyState == 4 && request.status==200){
		str=request.responseText;
		times_list=JSON.parse(str);

		for(i=0; i<times_list.length; i++){
			for(var key in Tstation){
				if(times_list[i]['PlatformKey'].substring(0,4)==Tstation[key]){
					if(times_list[i]['InformationType']=='Predicted'){
						if(times_list[i]['PlatformKey'].charAt(str.length-1)=='N')
							Tstation[key]['arrivalN']=times_list[i]['Time'];
						else if(times_list[i]['PlatformKey'].charAt(str.length-1)=='S')
							Tstation[key]['arrivalS']=times_list[i]['Time'];
					}
				}
			}			
		}
	}
	for(var key in Tstation){
		console.log(Tstation[key]['arrivalS']);
//		console.log(Tstation[key]['arrivalN']);
	}
}
*/


function closest_tstop(my_location){
console.log("in closest tstop function");
    var R = 3963; // radius of earth in km
    var distances = [];
    var stations=[];
    var closest = -1;
    var my_lat=my_location.lat();
    var my_lng=my_location.lng();
    var i=0;
    for( key in Tstation) {
    console.log("in for loop");
        var Tlat = Tstation[key]['position'].lat();
        var Tlng = Tstation[key]['position'].lng();
        var dLat  = rad(my_lat - Tlat); //distance latitude
        var dLng = rad(my_lng - Tlng); //distance longitude
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(Tlat)) * Math.cos(rad(my_lat)) * Math.sin(dLng/2) * Math.sin(dLng/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;
        stations[i]=Tstation[key]['station'];
        i++;
        if (closest == -1 || d < distances[closest] ) {
            closest = i;
                        

        }
    }
	distance_to=distances[closest];
	console.log(stations[closest]);
	return stations[closest];
}

function rad(x){
return x*Math.PI/180;
}