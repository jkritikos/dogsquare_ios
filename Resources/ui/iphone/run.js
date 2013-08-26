var runningMode = false;
var runningPathCoordinates = [];
var runningDistanceKm = 0;
var runningDistanceKmLabelValue = '';
var runObject = {};

//UI components
var viewRun = null;
var runDistanceValueLabel = null;
var runDistanceUnitLabel = null;
var runDurationValueLabel = null;
var runPauseButton = null;
var runEndButton = null;

//TMP debug
var runDebugView = null;
var viewRunSummaryMap = null;

//UI component isnide method
var runFinishWindow = null;

//Cronometer
var horas = 0, minutos = 0, segundos = 0, total_minutos = 0;
var cronometerInterval = null;

function buildRunView(){
	viewRun = Ti.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR
	});

	runDistanceValueLabel = Ti.UI.createLabel({
		text:'0.00',
		top:20,
		left:33,
		color:UI_COLOR_RUN,
		font:{fontSize:82, fontWeight:'bold', fontFamily:'Open Sans'}
	});

	runDistanceUnitLabel = Ti.UI.createLabel({
		text:'km',
		top:59,
		right:40,
		color:UI_COLOR_RUN,
		font:{fontSize:41, fontWeight:'bold', fontFamily:'Open Sans'}
	});
	
	var t3 = Ti.UI.create2DMatrix();
	t3 = t3.scale(1, -1);
	
	var runDistanceUnitReflectionLabel = Ti.UI.createLabel({
		text:'km',
		transform:t3,
		opacity:0.3,
		top:91,
		right:40,
		color:UI_COLOR_RUN,
		font:{fontSize:41, fontWeight:'bold', fontFamily:'Open Sans'}
	}); 
	
	/*
	var gradient = Ti.UI.createView({top:75, right:40, height:40, width:60,zIndex:10,
        backgroundGradient:{
            type:'linear',
            colors:[UI_BACKGROUND_COLOR,'transparent']
        }
    });*/
    
	var runAvgPaceMinuteLabel = Ti.UI.createLabel({
		text:'0\'',
		top:146,
		left:33,
		color:UI_COLOR_RUN,
		font:{fontSize:27, fontWeight:'bold', fontFamily:'Open Sans'}
	});
	
	var runAvgPaceSecondLabel = Ti.UI.createLabel({
		text:'0\'\'',
		top:146,
		left:55,
		color:UI_COLOR_RUN,
		font:{fontSize:27, fontWeight:'bold', fontFamily:'Open Sans'}
	});
	
	var runAvgPaceLabel = Ti.UI.createLabel({
		text:'Avg pace',
		top:181,
		left:30,
		color:UI_COLOR_RUN,
		font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	runDurationValueLabel = Ti.UI.createLabel({
		text:'0:00:00',
		top:146,
		color:UI_COLOR_RUN,
		font:{fontSize:27, fontWeight:'bold', fontFamily:'Open Sans'}
	});
	
	var runDurationLabel = Ti.UI.createLabel({
		text:'Duration',
		top:181,
		color:UI_COLOR_RUN,
		font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	var runMapButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'menu_left/Map_icon.png',
		right:52,
		width:26,
		height:23,
		top:158
	});
	runMapButton.addEventListener('click', handleMapButton);
	
	var runMapLabel = Ti.UI.createLabel({
		text:'View Map',
		top:181,
		right:30,
		color:UI_COLOR_RUN,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	viewRun.add(runDistanceUnitReflectionLabel);
	viewRun.add(runDurationLabel);
	viewRun.add(runDurationValueLabel);
	viewRun.add(runAvgPaceLabel);
	viewRun.add(runAvgPaceMinuteLabel);
	viewRun.add(runAvgPaceSecondLabel);
	viewRun.add(runDistanceValueLabel);
	viewRun.add(runDistanceUnitLabel);
	viewRun.add(runMapLabel);
	viewRun.add(runMapButton);

	runPauseButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'run/start_btn.png',
		bottom:73,
		left:21,
		width:153,
		height:54,
		zIndex:2
	});

	runEndButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'run/end_button.png',
		bottom:73,
		right:21,
		width:96,
		height:50,
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
	
	//viewRun.add(runDebugView);
	
	viewRunSummaryMap = Titanium.Map.createView({
		width:'100%',
		bottom:80,
		height:100,
	    mapType:Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    visible:true
	});
	
	//viewRun.add(viewRunSummaryMap);

	return viewRun;
}

function handleMapButton(){
	
	var runMapWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Map'
	});
	
	//map back button
	var runMapBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	runMapWindow.setLeftNavButton(runMapBackButton);
	
	runMapBackButton.addEventListener("click", function() {
	    navController.close(runMapWindow);
	});
	
	Ti.include('ui/iphone/map.js');
	runMapWindow.add(viewMap);
	navController.open(runMapWindow);
}

function clockTick(){
	var tmpLabel = "";
	
	++segundos;
	if(segundos==60) { segundos=0; ++minutos; ++total_minutos; }
	if(minutos==60) { minutos=0; ++horas; }
	if(horas==24) { horas=0; }
	
	if(horas<10) tmpLabel += "0";
	tmpLabel += horas;
	
	tmpLabel += ":";
	
	if(minutos<10) tmpLabel += "0";
	tmpLabel = tmpLabel + minutos;
	
	tmpLabel += ":";
	
	if(segundos<10) {tmpLabel += "0";}
	tmpLabel = tmpLabel + segundos;
	
	//tiempo = "";
	//tiempo += total_minutos;
	//tiempo += ".";
	//if(segundos<10) {tiempo += "0";}
	//tiempo = tiempo+segundos;
	
	//GLOBAL.total_minutos_y_segundos_int = parseFloat(tiempo);
	runDurationValueLabel.text = tmpLabel;
}

function handleStartRunButton(){
	if(!runningMode){
		var selectedDogs = getSelectedDogs();
		if(selectedDogs.length > 0){
			cronometerInterval = setInterval(clockTick,1000);
			
			//Adapt UI
			runPauseButton.backgroundImage = IMAGE_PATH+'run/pause_btn.png';
			runningMode = true;
			
			//Start location tracking
			Titanium.Geolocation.addEventListener('location',trackLocation);
			Ti.API.info('Tracking location ON');
			
			//Disable window sliding
			window.setPanningMode("NoPanning");
			
		} else {
			alert('NO DOGS SELECTED');
		}
	} else {
		clearInterval(cronometerInterval);
		
		runPauseButton.backgroundImage = IMAGE_PATH+'run/start_btn.png';
		runningMode = false;
		
		Titanium.Geolocation.removeEventListener('location',trackLocation);
		Ti.API.info('Tracking location OFF - collected '+runningPathCoordinates.length+' coordinates');
		
		//Enable window sliding
		window.setPanningMode("FullViewPanning");
	}
}

function handleEndRunButton(){
	//Enable window sliding
	window.setPanningMode("FullViewPanning");
	
	
	if(runningMode){
		runningMode = false;
		clearInterval(cronometerInterval);
		
		//Prepare run object for the next window
		runObject.coordinates = runningPathCoordinates;
		runObject.speed = '1.34';
		
		Ti.include('ui/iphone/run_finish.js');
		
		var runFinishView = buildRunFinishView(runObject);
	
		var runFinishWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR,
			title:'Run overview'
		});
		
		//back button & event listener
		var runFinishBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		runFinishWindow.setLeftNavButton(runFinishBackButton);
		runFinishBackButton.addEventListener("click", function() {
		    navController.close(runFinishWindow);
		});
		
		//done button & event listener
		var runFinishDoneButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/Done_button.png',
		    width:58,
		    height:29
		});
		
		runFinishWindow.setRightNavButton(runFinishDoneButton);
		runFinishDoneButton.addEventListener("click", function() {
		    navController.close(runFinishWindow);
		});
		
		runFinishWindow.add(runFinishView);
		
		//remove RUN window from the navigation stack
		runFinishWindow.addEventListener('focus', function(){
			var runWindowIndex = openWindows.length-2;
			navController.close(openWindows[runWindowIndex], {animated:false});
		});
		
		openWindows.push(runFinishWindow);
		navController.open(runFinishWindow);
		
		Ti.API.info('OPENED run finish');
		
		// route object
		/*
		var route = {
		    name:"Your path",
		    points:runningPathCoordinates,
		    color:"green",
		    backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '0%', y: '50%' },
	        endPoint: { x: '100%', y: '50%' },
	        colors: [ { color: 'red', offset: 0.0}, { color: 'green', offset: 0.25 }, { color: 'red', offset: 1.0 } ],
	    },
		    borderColor:'black',
		    width:12
		};
		
		viewRunSummaryMap.addRoute(route);
		*/
	} else {
		alert('START RUNNING FIRST');
	}
}

function handleRunFinishBackButton() {
    navController.close(runFinishWindow);
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
			
			//Get weather once we get the 1st accurate set of coordinates
			if(runningPathCoordinates.length == 1){
				weather.getWeather(runningPathCoordinates[0].latitude, runningPathCoordinates[0].longitude);	
			}
			
			var tmpDistance = calculateDistance(coordinates);
			runObject.distance = tmpDistance;
			
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