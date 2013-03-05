Tstation=new Object;
	Tstation['RALE']={'station':'Alewife Station', 'position':new google.maps.LatLng(42.395428, -71.142483)};
	Tstation['RDAV']={'station':'Davis Station', 'position':new google.maps.LatLng(42.39674, -71.121815)};
	Tstation['RPOR']={'station':'Porter Square Station', 'position':new google.maps.LatLng(42.3884, -71.119149)};
	Tstation['RHAR']={'station':'Harvard Square Station', 'position':new google.maps.LatLng(42.373362, -71.118956)};
	Tstation['RCEN']={'station':'Central Square Station','position':new google.maps.LatLng(42.365486, -71.103802)};
	Tstation['RKEN']={'station':'Kendall/MIT Station', 'position':new google.maps.LatLng(42.3624908, -71.086177)};
	Tstation['RMGH']={'station': 'Charles/MGH Station', 'position':new google.maps.LatLng(42.361166, -71.070628)};
	Tstation['RPRK']={'station': 'Park St. Station', 'position':new google.maps.LatLng(42.3563946, -71.062424)};
	Tstation['RDTC']={'station':'Downtown Crossing Station', 'position':new google.maps.LatLng(42.355518, -71.060225)}; 
	Tstation['RSOU']={'station':'South Station', 'position':new google.maps.LatLng(42.352271, -71.055242)};
	Tstation['RBRO']={'station':'Broadway Station', 'position':new google.maps.LatLng(42.342622, -71.056967)};
	Tstation['RAND']={'station':'Andrew Station', 'position':new google.maps.LatLng(42.330154, -71.057655)};
	Tstation['RJFK']={'station':'JFK/UMass Station', 'position':new google.maps.LatLng(42.320685, -71.052391)};
	Tstation['RSAV']={'station':'Savin Hill Station', 'position':new google.maps.LatLng(42.31129, -71.05331)};
	Tstation['RFIE']={'station':'Fields Corner Station', 'position':new google.maps.LatLng(42.300093, -71.061667)};
	Tstation['RSHA']={'station':'Shawmut Station', 'position':new google.maps.LatLng(42.2931258, -71.065738)};
	Tstation['RASH']={'station':'Ashmont Station', 'position':new google.maps.LatLng(42.284652, -71.064489)};
	Tstation['RNQU']={'station':'North Quincy Station', 'position':new google.maps.LatLng(42.275275, -71.029583)};
	Tstation['RWOL']={'station':'Wollaston Station', 'position':new google.maps.LatLng(42.2665139, -71.020337)};
	Tstation['RQUC']={'station':'Quincy Center Station', 'position':new google.maps.LatLng(42.251809, -71.005409)};
	Tstation['RQUA']={'station':'Quincy Adams Station', 'position':new google.maps.LatLng(42.233391, -71.007153)};
	Tstation['RBRA']={'station':'Braintree Station', 'position':new google.maps.LatLng(42.2078543, -71.001139)};
	
var distance_to; //distance to closest stop

function init(){
		mapSetting={
		center: new google.maps.LatLng(42.3000, -71.8000),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
 	map = new google.maps.Map(document.getElementById("map_canvas"), mapSetting);  
	
	init_request_times();
	myLocation();
	init_request_cw();
	
}

function myLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
				lat=position.coords.latitude;
				lng=position.coords.longitude;
		
			 my_location=new google.maps.LatLng(lat, lng);
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
		var image = {
			url: 'mbta_pin.png',
			size: new google.maps.Size(71,71),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(10,25),
			scaledSize:new google.maps.Size(25,25)
		};
		
		var marker=new google.maps.Marker({
			position: Tstation[key]['position'],
			map: map,
			title: Tstation[key]['station'],
			icon:image
		});
		parse_times(key);
		station_times=Array(North_time, South_time);
		marker['infoWindow']=new google.maps.InfoWindow({
			content:Tstation[key]['station']+"<br>"+ "Northbound:<br>"+station_times[0]+"<br>Southbound:<br>"+station_times[1]
		});		
		google.maps.event.addListener(marker, 'click', function() {
			//this['infoWindow'].close(),
			this['infoWindow'].open(map, this)
		}); 
	}
}		

function drawLine(){
	Tstop_positions1= [new google.maps.LatLng(42.395428, -71.142483), new google.maps.LatLng(42.39674, -71.121815), new google.maps.LatLng(42.3884, -71.119149), new google.maps.LatLng(42.373362, -71.118956), new google.maps.LatLng(42.365486, -71.103802), new google.maps.LatLng(42.3624908, -71.086177), new google.maps.LatLng(42.361166, -71.070628),new google.maps.LatLng(42.3563946, -71.062424),new google.maps.LatLng(42.355518, -71.060225), new google.maps.LatLng(42.352271, -71.055242),new google.maps.LatLng(42.342622, -71.056967),new google.maps.LatLng(42.330154, -71.057655),new google.maps.LatLng(42.320685, -71.052391),new google.maps.LatLng(42.31129, -71.05331),new google.maps.LatLng(42.300093, -71.061667),new google.maps.LatLng(42.2931258, -71.065738),new google.maps.LatLng(42.284652, -71.064489)];
	Tstop_positions2=[new google.maps.LatLng(42.320685, -71.052391),new google.maps.LatLng(42.275275, -71.029583),new google.maps.LatLng(42.2665139, -71.020337),new google.maps.LatLng(42.251809, -71.005409),new google.maps.LatLng(42.233391, -71.007153),new google.maps.LatLng(42.2078543, -71.001139)];
	
	var Tpath1= new google.maps.Polyline({
		path: Tstop_positions1,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,	
		strokeWeight: 3
	});
	var Tpath2= new google.maps.Polyline({
		path: Tstop_positions2,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,	
		strokeWeight: 3
	});
	Tpath1.setMap(map);
	Tpath2.setMap(map);
}


function init_request_times(link){
	request=new XMLHttpRequest();
	request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	request.send(null);
	request.onreadystatechange = parse_helper_times;
}

function parse_helper_times(){
	if(request.readyState == 4 && request.status==200){
		times_list=JSON.parse(request.responseText);
		t_locations();
		drawLine();
	}
}

function parse_times(location){
	South_time=' ';
	North_time=' ';
	for(i=0; i<times_list.length; i++){
		if(times_list[i]['PlatformKey'].substring(0,4)==location && times_list[i]['InformationType']=='Predicted'){
			if(times_list[i]['PlatformKey'].charAt(times_list[i]['PlatformKey'].length-1)=='N'){
				North_time=times_list[i]['Time'];
			}
			else if(times_list[i]['PlatformKey'].charAt(times_list[i]['PlatformKey'].length-1)=='S'){
				South_time=times_list[i]['Time'];		
			}			
		}
	}	
}

function init_request_cw(){
	console.log("in init");
	request2=new XMLHttpRequest();
	request2.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
	request2.send(null);
	request2.onreadystatechange = parse_helper_cw;
}

function parse_helper_cw(){
	if(request2.readyState == 4 && request2.status==200){
	console.log(request2.readyState);
		cw_locations=JSON.parse(request2.responseText);
		parse_cw();
	}
}

function parse_cw(){
console.log(cw_locations.length);
	for(i=0; i<cw_locations.length; i++){
		if(cw_locations[i]['name']=='Waldo'){
		console.log("waldo");
			var waldo_loc=new google.maps.LatLng(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']);
			var wmarker=new google.maps.Marker({
				position: waldo_loc,
				map: map,
				title: "Waldo's Location",
				icon: "waldo.png"		
			});
			wmarker['infoWindow']=new google.maps.InfoWindow({
				content:"You found me!<br>"+"I am at: "+cw_locations[i]['loc']['latitude']+", "+cw_locations[i]['loc']['longitude'] 
			});
			google.maps.event.addListener(wmarker, 'click', function(){
				this['infoWindow'].open(map, this)
			});
			distancefrom_cw(waldo_loc);
		}
		else if(cw_locations[i]['name']=='Carmen Sandiego'){
		console.log("carmen");
			var carmen_loc=new google.maps.LatLng(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']);
			var cmarker=new google.maps.Marker({
				position: carmen_loc,
				map: map,
				title: "Carmen's Location",
				icon: "carmen.png"
			});	
			cmarker['infoWindow']=new google.maps.InfoWindow({
				content:"You found me!<br>"+"I am at: "+cw_locations[i]['loc']['latitude']+", "+cw_locations[i]['loc']['longitude'] 
			});
			google.maps.event.addListener(cmarker, 'click', function(){
				this['infoWindow'].open(map, this)
			});
			distancefrom_cw(carmen_loc);
		}
	}
}

function distancefrom_cw(position_cw){
    var R = 3963; // radius of earth in miles
    var lat;
    var lng;
    var CWlat = position_cw.lat();
    var CWlng = position_cw.lng();
    var dLat  = rad(lat - CWlat); //distance latitude
    var dLng = rad(lat - CWlng); //distance longitude
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(rad(CWlat)) * Math.cos(rad(lat)) * Math.sin(dLng/2) * Math.sin(dLng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    
	return d;
}


function closest_tstop(my_location){
console.log("in closest tstop function");
    var R = 3963; // radius of earth in miles
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