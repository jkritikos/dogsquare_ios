var runningMode = false;
var runningPathCoordinates = [];
var runningDistanceKm = 0;
var runningDistanceKmLabelValue = '';

//UI components
var viewRun = null;
var runDistanceValueLabel = null;
var runDistanceUnitLabel = null;
var runPauseButton = null;
var runEndButton = null;

//TMP debug
var runDebugView = null;
var viewRunSummaryMap = null;

function buildRunView(){
	viewRun = Ti.UI.createView({
		backgroundColor:'white'
	});

	runDistanceValueLabel = Ti.UI.createLabel({
		text:'0,00',
		top:30,
		font:{fontSize:50, fontWeight:'bold'}
	});

	runDistanceUnitLabel = Ti.UI.createLabel({
		text:'km',
		top:30,
		right:40,
		font:{fontSize:50, fontWeight:'bold'}
	});

	viewRun.add(runDistanceValueLabel);
	viewRun.add(runDistanceUnitLabel);

	runPauseButton = Ti.UI.createButton({
		title:'Start',
		bottom:20,
		left:10,
		zIndex:2
	});

	runEndButton = Ti.UI.createButton({
		title:'End',
		bottom:20,
		right:10,
		zIndex:2
	});

	viewRun.add(runPauseButton);
	viewRun.add(runEndButton);
	
	runPauseButton.addEventListener('click', handleStartRunButton);
	runEndButton.addEventListener('click', handleEndRunButton);
	
	//TMP DEBUG
	runDebugView = Ti.UI.createScrollView({
		backgroundColor:'black',
		top:100,
		bottom:80,
		contentWidth:100,
		contentHeight:'auto',
		layout:'vertical'
	});
	
	viewRun.add(runDebugView);
	
	viewRunSummaryMap = Titanium.Map.createView({
		width:'100%',
		bottom:80,
		top:100,
	    mapType:Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    visible:true
	});
	
	viewRun.add(viewRunSummaryMap);

	return viewRun;
}

function handleStartRunButton(){
	if(!runningMode){
		runPauseButton.title = 'Pause';
		runningMode = true;
		
		Titanium.Geolocation.addEventListener('location',trackLocation);
		Ti.API.info('Tracking location ON');
	} else {
		runPauseButton.title = 'Start';
		runningMode = false;
		
		Titanium.Geolocation.removeEventListener('location',trackLocation);
		Ti.API.info('Tracking location OFF - collected '+runningPathCoordinates.length+' coordinates');
	}
}

function handleEndRunButton(){
	Ti.include('ui/iphone/run_finish.js');
	
	var runEndWindow = Ti.UI.createWindow({
		//url:'ui/iphone/run_finish.js',
		backgroundColor:'white',
		barColor:'#28292c',
		title:'Run overview',
		backButtonTitle:'Back'
	});
	
	//runEndWindow.add(buildRunFinishView(runningPathCoordinates));
	
	//openWindows.push(runEndWindow);
	//navController.open(runEndWindow);
	// route object
	var route = {
	    name:"Your path",
	    points:runningPathCoordinates,
	    color:"green",
	    borderColor:'black',
	    width:12
	};
	
	viewRunSummaryMap.addRoute(route);
}

function trackLocation(){
	Titanium.Geolocation.getCurrentPosition(function(e){
		if (e.error){
			//alert('Se ha perdido la señal GPS. Sal a cielo abierto ...');
			return;
		}
		
		var coordinates = {
			latitude: e.coords.latitude,
			longitude: e.coords.longitude,
			animate:true,
			latitudeDelta:0.001,
			longitudeDelta:0.001
		};
		
		viewRunSummaryMap.setLocation(coordinates);
		
		//only use accurate coordinates
		if(e.coords.accuracy <= 15){
			var tmpDistance = calculateDistance(coordinates);
			runningPathCoordinates.push(coordinates);
			
			var t = 'Lat:'+e.coords.latitude+' & lon: '+e.coords.longitude+' accuracy: '+e.coords.accuracy+' distance '+tmpDistance;
			var tmpLabel = Ti.UI.createLabel({
				text:t,
				left:10,
				color:'red',
				font:{fontSize:15, fontWeight:'bold'}
			});
			
			runDebugView.add(tmpLabel);
			
			var speed = e.coords.speed;
			var velocidad_km_h = (speed / 0.28).toFixed(0);	
		}
	});
}

function calculateDistance(newCoordinates){
	if(runningPathCoordinates.length >= 1){
		var lat1 = newCoordinates.latitude;
		var lon1 = newCoordinates.longitude;
		var lat2 = runningPathCoordinates[runningPathCoordinates.length-1].latitude;
		var lon2 = runningPathCoordinates[runningPathCoordinates.length-1].longitude;
		
		rad = function(x) {return x*Math.PI/180;}
			
		var R     = 6371.0090667;                          
		var dLat  = rad( lat2 - lat1 );
		var dLong = rad( lon2 - lon1 );
		
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		
		runningDistanceKm += parseFloat(d);
		runningDistanceKmLabelValue = runningDistanceKm.toFixed(2);
		runDistanceValueLabel.text = runningDistanceKmLabelValue;
	} else {
		Ti.API.info('calculateDistance() NOT enough points for distance calculation');
	}
	
	return parseFloat(d);
}

//Ti.UI.currentWindow.add(viewRun);
