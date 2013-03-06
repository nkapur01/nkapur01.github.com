//Neena Kapur
//Computer Science 20
//Assignment 3

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
var mylat=400;
var mylng=400;

//Initializes map
function init(){
	mapSetting={
	center: new google.maps.LatLng(42.3000, -71.8000),
	zoom: 11,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
 	map = new google.maps.Map(document.getElementById("map_canvas"), mapSetting);  	
 	
	myLocation(); //get my location
	init_request_times();//get times for Tstations
	init_request_cw(); //get carmen's/waldo's location
		
}

//set my location
function myLocation(){
console.log("in my location");
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
		console.log("get current position");
				mylat=position.coords.latitude;
				mylng=position.coords.longitude;
		
			var my_location=new google.maps.LatLng(mylat, mylng);
				map.setCenter(my_location);
			var marker=new google.maps.Marker({
				position: my_location,
				map: map,
				title: "Your Location"
			});
			closest_tstop(my_location);
			marker['infoWindow']=new google.maps.InfoWindow({
				content:"You are here!<br>" +mylat.toFixed(4)+ " , " + mylng.toFixed(4)+
						"<br> The closest station is: " + closest_tstop(my_location) + 
						"<br>It is "+distance_to.toFixed(4)+ " miles away"
			});
			google.maps.event.addListener(marker, 'click', function() {
				this['infoWindow'].open(map, this)
			}); 
		});	
	}
}

/*function make_cw_infowindows(){
	var who_is_it;
	
	if(cmarker){
		who_is_it='C';
		cmarker['infoWindow']+="<br> I am "+distancefrom_cw(who_is_it);
		});
	}
			
	if(wmarker){
		who_is_it='W'
		wmarker['infoWindow']+="<br> I am "+distancefrom_cw(who_is_it);
}
*/

//set Tlocations, make markers/info boxes
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

//draw polyline
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

//request tschedule json
function init_request_times(){
	request=new XMLHttpRequest();
	request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	request.send(null);
	request.onreadystatechange = parse_helper_times;
}

//handle request for tstop schedule, call Tlocations function and drawline function
function parse_helper_times(){
	if(request.readyState == 4 && request.status==200){
		times_list=JSON.parse(request.responseText);
		t_locations(); //make tlocations on map
		drawLine(); //draw polyline
	}
	else if(request.status==0){
		alert("Error! Please refresh page");
	}
}

//parse tschedule, return to Tlocations function
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

//make request for carmen/waldo json
function init_request_cw(){
	request2=new XMLHttpRequest();
	request2.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
	request2.send(null);
	request2.onreadystatechange = parse_helper_cw;
}

//check to see if readystate is 4 and status is 200, handle potential errors
function parse_helper_cw(){
	if(request2.readyState == 4 && request2.status==200){
		cw_locations=JSON.parse(request2.responseText);
		parse_cw();
	}
	else if(request2.status==0){
		alert("Error! Please refresh page");
	}
	else if(request2.status==404){
		alert("Error! Please refresh page");
	}
}

//Parse carmen/waldo json, display marker and infowindows on map
function parse_cw(){
console.log(mylat);
console.log(mylng);
	if(cw_locations.length==0){
		alert("Carmen and Waldo are nowhere to be found!");
		}
	if(mylat!=400 && mylng!=400){	
		for(i=0; i<cw_locations.length; i++){
			if(cw_locations[i]['name']=='Waldo'){
				waldo_loc=new google.maps.LatLng(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']);
				var wmarker=new google.maps.Marker({
					position: waldo_loc,
					map: map,
					title: "Waldo's Location",
					icon: "waldo.png"		
				});
				wmarker['infoWindow']=new google.maps.InfoWindow({
					content:"You found me!<br>"+
					"I am at: "+cw_locations[i]['loc']['latitude'].toFixed(4)+", "+cw_locations[i]['loc']['longitude'].toFixed(4)+
					"<br> I am "+distancefrom_cw(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']).toFixed(4)+" miles away from you."
				});
				google.maps.event.addListener(wmarker, 'click', function(){
					this['infoWindow'].open(map, this)
				});
			}
			else if(cw_locations[i]['name']=='Carmen Sandiego'){
				carmen_loc=new google.maps.LatLng(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']);
				cmarker=new google.maps.Marker({
					position: carmen_loc,
					map: map,
					title: "Carmen's Location",
					icon: "carmen.png"
				});	
				cmarker['infoWindow']=new google.maps.InfoWindow({
					content:"You found me!<br>"+
						"I am at: "+cw_locations[i]['loc']['latitude'].toFixed(4)+", "+cw_locations[i]['loc']['longitude'].toFixed(4)+
						"<br> I am "+distancefrom_cw(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']).toFixed(4)+" miles away from you."
				});
				google.maps.event.addListener(cmarker, 'click', function(){
					this['infoWindow'].open(map, this)
				});
			}
		}
	}
	else if(mylat==400 && mylng==400){
		for(i=0; i<cw_locations.length; i++){
			if(cw_locations[i]['name']=='Waldo'){
				waldo_loc=new google.maps.LatLng(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']);
				var wmarker=new google.maps.Marker({
					position: waldo_loc,
					map: map,
					title: "Waldo's Location",
					icon: "waldo.png"		
				});
				wmarker['infoWindow']=new google.maps.InfoWindow({
					content:"You found me!<br>"+
					"I am at: "+cw_locations[i]['loc']['latitude'].toFixed(4)+", "+cw_locations[i]['loc']['longitude'].toFixed(4)
				});
				google.maps.event.addListener(wmarker, 'click', function(){
					this['infoWindow'].open(map, this)
				});
			}
			else if(cw_locations[i]['name']=='Carmen Sandiego'){
				carmen_loc=new google.maps.LatLng(cw_locations[i]['loc']['latitude'], cw_locations[i]['loc']['longitude']);
				cmarker=new google.maps.Marker({
					position: carmen_loc,
					map: map,
					title: "Carmen's Location",
					icon: "carmen.png"
				});	
				cmarker['infoWindow']=new google.maps.InfoWindow({
					content:"You found me!<br>"+
						"I am at: "+cw_locations[i]['loc']['latitude'].toFixed(4)+", "+cw_locations[i]['loc']['longitude'].toFixed(4)
				});
				google.maps.event.addListener(cmarker, 'click', function(){
					this['infoWindow'].open(map, this)
				});
			}
		}
	}
}


//Calculate distance between mylocation and carmen and/or waldo
function distancefrom_cw(CWlat, CWlng){
    var R = 3963; // radius of earth in miles
    var dLat  = rad(mylat - CWlat); //distance latitude
    var dLng = rad(mylng - CWlng); //distance longitude
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(rad(CWlat)) * Math.cos(rad(mylat)) * Math.sin(dLng/2) * Math.sin(dLng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    
	return d;
}

//Calculate distance between mylocation and closest tstop, determine the closest station
function closest_tstop(my_location){
    var R = 3963; // radius of earth in miles
    var distances = [];
    var stations=[];
    var closest = -1;
    var my_lat=my_location.lat();
    var my_lng=my_location.lng();
    var i=0;
    for( key in Tstation) {
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
	return stations[closest];
}

//convert to radians function
function rad(x){
return x*Math.PI/180;
}