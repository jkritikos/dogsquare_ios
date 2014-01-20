var currentActivityMode = null;
var runningPathCoordinates = [];
var runningDistanceKm = 0;
var runningDistanceKmLabelValue = '';
var runObject = {};
var runFirstSetOfCoordinates = null;

//UI components
var viewRun = null;
var runDistanceValueLabel = null;
var runDistanceUnitLabel = null;
var runDurationValueLabel = null;
var runPauseButton = null;
var runPlayButton = null;
var runEndButton = null;
var runAvgPaceMinuteLabel = null;

//TMP debug
var runDebugView = null;
var viewRunSummaryMap = null;

//UI component isnide method
var runFinishWindow = null;

//Cronometer
var horas = 0, minutos = 0, segundos = 0, total_seconds = 0;
var cronometerInterval = null;
var timestampCurrent = 0;
var timestampPrevious = 0;
var tick = 0;

function buildRunView(){
	var iphone5Offset = 40;
	
	//Reset cronometer
	horas = 0, minutos = 0, segundos = 0, total_seconds = 0;
	
	viewRun = Ti.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR
	});

	var runDogsquareLogo = Ti.UI.createImageView({
		image:IMAGE_PATH+'run/dogsquare.png',
		top:2
	});

	runDistanceValueLabel = Ti.UI.createLabel({
		text:'0.00',
		width:230,
		textAlign:'center',
		top:IPHONE5 ? 115+iphone5Offset : 115,
		left:5,
		color:UI_COLOR_RUN,
		font:{fontSize:82, fontWeight:'bold', fontFamily:'Open Sans'}
	});

	runDistanceUnitLabel = Ti.UI.createLabel({
		text:'km',
		top:IPHONE5 ? 156+iphone5Offset : 156,
		right:22,
		color:UI_COLOR_RUN,
		font:{fontSize:41, fontWeight:'bold', fontFamily:'Open Sans'}
	});
	
	runAvgPaceMinuteLabel = Ti.UI.createLabel({
		text:'0.0',
		top:IPHONE5? 216+iphone5Offset : 216,
		left:12,
		width:85,
		textAlign:'center',
		color:UI_COLOR_RUN,
		font:{fontSize:27, fontWeight:'bold', fontFamily:'Open Sans'}
	});
	
	var runAvgPaceLabel = Ti.UI.createLabel({
		text:'Avg pace',
		top:IPHONE5? 251+iphone5Offset : 251,
		left:25,
		color:UI_COLOR_RUN,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	runDurationValueLabel = Ti.UI.createLabel({
		text:'0:00:00',
		top:IPHONE5? 216+iphone5Offset : 216,
		color:UI_COLOR_RUN,
		font:{fontSize:27, fontWeight:'bold', fontFamily:'Open Sans'}
	});
	
	var runDurationLabel = Ti.UI.createLabel({
		text:'Duration',
		top:IPHONE5? 251+iphone5Offset : 251,
		color:UI_COLOR_RUN,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	var runMapButton = Ti.UI.createImageView({
		image:IMAGE_PATH+'profile/woofin_button_orange.png',
		width:97,
		//height:49,
		right:8,
		top:IPHONE5? 224+iphone5Offset : 224
	});
	runMapButton.addEventListener('click', handleMapButton);
	
	viewRun.add(runDurationLabel);
	viewRun.add(runDurationValueLabel);
	viewRun.add(runAvgPaceLabel);
	viewRun.add(runAvgPaceMinuteLabel);
	viewRun.add(runDistanceValueLabel);
	viewRun.add(runDistanceUnitLabel);
	viewRun.add(runMapButton);
	viewRun.add(runDogsquareLogo);
	
	runPauseButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'run/start_walking_orange.png',
		bottom:68,
		left:2,
		width:157,
		height:50,
		zIndex:2,
		type:ACTIVITY_MODE_WALKING
	});
	
	runPlayButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'run/start_playing_orange.png',
		bottom:68,
		right:2,
		width:157,
		height:50,
		zIndex:2,
		type:ACTIVITY_MODE_PLAYING
	});

	runEndButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'run/endActivity_orange.png',
		bottom:5,
		width:320,
		height:62,
		zIndex:2
	});

	viewRun.add(runPauseButton);
	viewRun.add(runEndButton);
	viewRun.add(runPlayButton);
	
	runPlayButton.addEventListener('click', handleStartRunButton);
	runPauseButton.addEventListener('click', handleStartRunButton);
	runEndButton.addEventListener('click', handleEndRunButton);
	
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
	
	//TMP DEBUG
	/*
	runDebugView = Ti.UI.createScrollView({
		backgroundColor:'black',
		top:100,
		bottom:80,
		contentWidth:100,
		contentHeight:'auto',
		layout:'vertical'
	});
	
	//viewRun.add(runDebugView);
	
	//viewRun.add(viewRunSummaryMap);
	*/
	return viewRun;
}

function handleMapButton(){
	
	var runMapWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
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
		//TODO isws edw thelei openWindows[openWindows.length-1]
	    navController.close(runMapWindow);
	    openWindows.pop();
	});
	
	Ti.include('ui/iphone/map.js');
	buildMapView(TARGET_MODE_NEW_WINDOW);
	
	runMapWindow.setTitleControl(mapSearchContainer);
	runMapWindow.add(viewMap);
	openWindows.push(runMapWindow);
	navController.open(runMapWindow);
}

function clockTick(){
	var tmpLabel = "";
	
	++segundos;
	++total_seconds;
	
	if(segundos==60) { segundos=0; ++minutos; }
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
	
	runDurationValueLabel.text = tmpLabel;
	
	//Calculate playing time
	if(currentActivityMode == ACTIVITY_MODE_PLAYING){
		runObject.playtime++;
	}
	
}

//Changes and enables/disables the walk/play buttons
function handleRunUIButtons(){
	if(currentActivityMode == ACTIVITY_MODE_PLAYING){
		runPlayButton.backgroundImage = IMAGE_PATH+'run/playing_grey.png';
		runPlayButton.enabled = false;
		runPauseButton.enabled = true;
		runPauseButton.backgroundImage = IMAGE_PATH+'run/start_walking_orange.png';
	} else if(currentActivityMode == ACTIVITY_MODE_WALKING){
		runPauseButton.backgroundImage = IMAGE_PATH+'run/walking_grey.png';
		runPauseButton.enabled = false;
		runPlayButton.enabled = true;
		runPlayButton.backgroundImage = IMAGE_PATH+'run/start_playing_orange.png';
	}
}

function handleStartRunButton(e){
	currentActivityMode = e.source.type;
	
	Ti.API.info('handleStartRunButton() called with activity mode '+currentActivityMode);
	
	if(!runningMode){
		var selectedDogs = getSelectedDogs();
		if(selectedDogs.length > 0){
			runObject.playtime = 0;
			cronometerInterval = setInterval(clockTick,1000);
			
			//Save activity locally
			if(!runObject.activity_id){
				var activityId = saveActivity(selectedDogs);
				runObject.activity_id = activityId;
			} else {
				Ti.API.info('NOT saving activity because we are resuming it');
			}
			
			//Adapt UI
			handleRunUIButtons();
			runningMode = true;
			
			//Start location tracking
			Titanium.Geolocation.addEventListener('location',trackLocation);
			Ti.API.info('Tracking location ON');
			
			//Disable window sliding
			window.setPanningMode("NoPanning");
			
		} else {
			alert(getLocalMessage(MSG_RUN_NO_DOGS));
		}
	} else {
		handleRunUIButtons();
		
		/*
		clearInterval(cronometerInterval);
		
		runPauseButton.backgroundImage = IMAGE_PATH+'run/start_btn.png';
		runningMode = false;
		
		Titanium.Geolocation.removeEventListener('location',trackLocation);
		Ti.API.info('Tracking location PAUSED - collected '+runningPathCoordinates.length+' coordinates');
		
		//Enable window sliding
		window.setPanningMode("FullViewPanning");
		*/
	}
}

function handleEndRunButton(){
	//Enable window sliding
	window.setPanningMode("FullViewPanning");
	
	if(runningMode){
		//Clear cronometer
		runningMode = false;
		clearInterval(cronometerInterval);
		//Clear location tracking
		Titanium.Geolocation.removeEventListener('location',trackLocation);
		Ti.API.info('Tracking location ENDS - collected '+runningPathCoordinates.length+' coordinates');
		
		//Prepare run object for the next window
		if(runningPathCoordinates != null && runningPathCoordinates.length > 0){
			runObject.coordinates = runningPathCoordinates;
		} else {
			
			//User did not move, or the coordinates were not accurate enough, so we save what we have
			//Save coordinates
			saveActivityCoordinates(runObject.activity_id, runFirstSetOfCoordinates.latitude, runFirstSetOfCoordinates.longitude, new Date().getTime(), 0, 0, currentActivityMode);
			runObject.pace = 0;
			runObject.distance = 0;
			
			runningPathCoordinates.push(runFirstSetOfCoordinates);
			runObject.coordinates = runningPathCoordinates;
		}
		
		//Calculate the total distance, playtime
		var activityTotals = calculateDogfuel(runObject.activity_id, runObject.playtime, runObject.temperature);
		runObject.walk = activityTotals.walk;
		runObject.play = activityTotals.play;
		
		//Update our activity object
		endActivity(runObject);
		
		Ti.include('ui/iphone/run_finish.js');
		
		var runFinishView = buildRunFinishView(runObject);
	
		var runFinishWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			//barImage:IMAGE_PATH+'common/bar.png',
			translucent:false,
			barColor:UI_COLOR,
			title:'Activity details'
		});
		
		//back button & event listener
		var runFinishBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		runFinishWindow.setLeftNavButton(runFinishBackButton);
		runFinishBackButton.addEventListener("click", function() {
			shareActivity();
		    navController.close(runFinishWindow);
		    getOnlineUser();
		});
		
		//done button & event listener
		var runFinishDoneButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/Done_button.png',
		    width:54,
		    height:34
		});
		
		runFinishWindow.setRightNavButton(runFinishDoneButton);
		runFinishDoneButton.addEventListener("click", function() {
			shareActivity();
		    navController.close(runFinishWindow);
		    getOnlineUser();
		});
		
		runFinishWindow.add(runFinishView);
		
		//remove RUN window from the navigation stack
		runFinishWindow.addEventListener('focus', function(){
			Ti.API.warn('RunFinish view got focus: Removing RUN window from the navigation stack. openWindows.length='+openWindows.length);
			
			//hack for fixing the navigation bug that appears if we open another window from run.js
			/*
			if(openWindows.length > 2){
				var theLength = openWindows.length;
				for(var i=theLength; i >= theLength; i--){
					Ti.API.warn('Navigation hack: removing window index '+i);
					navController.close(openWindows[i-2], {animated:false});
				}
			} else {
				Ti.API.warn('Navigation hack NOT needed: openWindows.length='+openWindows.length);
				var runWindowIndex = openWindows.length-2;
				navController.close(openWindows[runWindowIndex], {animated:false});
			}
			*/
			
			var runWindowIndex = openWindows.length-2;
			navController.close(openWindows[runWindowIndex], {animated:false});
		});
		
		//clear run object
		runObject = {};
		tick = 0;
		runFirstSetOfCoordinates = null;
		runningPathCoordinates = [];
		//reset UI objects
		runningDistanceKm = 0;
		runningDistanceKmLabelValue = 0;
		timestampCurrent = null;
		timestampPrevious = null;
		
		openWindows.push(runFinishWindow);
		navController.open(runFinishWindow);
		
		Ti.API.info('OPENED run finish');
	} else {
		alert(getLocalMessage(MSG_RUN_END));
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
		
		//Keep a copy of the first set of coordinates, regardless of accuracy
		if(runFirstSetOfCoordinates == null){
			runFirstSetOfCoordinates = coordinates;
			weather.getWeather(e.coords.latitude, e.coords.longitude);
		}
		
		//only use accurate coordinates
		if(e.coords.accuracy <= 10){
			Ti.API.info('trackLocation() got coordinates - processing');
			tick++;
			
			if(tick == 1){
				timestampCurrent = new Date().getTime();
				timestampPrevious = new Date().getTime();
			} else {
				timestampPrevious = timestampCurrent;
				timestampCurrent = new Date().getTime();
			}
			
			var timestampDiff = timestampCurrent - timestampPrevious;
			
			//Get weather once we get the 1st accurate set of coordinates
			if(tick == 1){
				weather.getWeather(e.coords.latitude, e.coords.longitude);	
			}
			
			var tmpDistance = calculateDistance(coordinates);
			runObject.distance = tmpDistance;
			
			//Save coordinates
			saveActivityCoordinates(runObject.activity_id, e.coords.latitude, e.coords.longitude, timestampCurrent, timestampDiff, tmpDistance, currentActivityMode);
			
			runningPathCoordinates.push(coordinates);
			
			/*
			var t = 'Lat:'+e.coords.latitude+' & lon: '+e.coords.longitude+' accuracy: '+e.coords.accuracy+' distance '+tmpDistance;
			var tmpLabel = Ti.UI.createLabel({
				text:t,
				left:10,
				color:'red',
				font:{fontSize:15, fontWeight:'bold'}
			});
			
			runDebugView.add(tmpLabel);
			*/
			
			var speed = e.coords.speed;
			var velocidad_km_h = (speed / 0.28).toFixed(0);	
		} else {
			Ti.API.info('trackLocation() got inaccurate coordinates - ignoring (accuracy '+ e.coords.accuracy+')');
		}
	});
}

function calculateDistance(newCoordinates){
	if(runningPathCoordinates.length >= 1){
		var lat1 = newCoordinates.latitude;
		var lon1 = newCoordinates.longitude;
		var lat2 = runningPathCoordinates[runningPathCoordinates.length-1].latitude;
		var lon2 = runningPathCoordinates[runningPathCoordinates.length-1].longitude;
			
		var R     = 6371.0090667;                          
		var dLat  = rad( lat2 - lat1 );
		var dLong = rad( lon2 - lon1 );
		
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		
		runningDistanceKm += parseFloat(d);
		runningDistanceKmLabelValue = runningDistanceKm.toFixed(2);
		runDistanceValueLabel.text = runningDistanceKmLabelValue;
		
		var hourInSeconds = 3600;
		var pace = 0;
		
		//km per hour
		if(total_seconds > 0){
			var pace = (hourInSeconds * runningDistanceKmLabelValue) / total_seconds;
			Ti.API.info('pace is '+pace + ' runningDistanceKmLabelValue='+runningDistanceKmLabelValue+' total_seconds = '+total_seconds);
			pace = isNaN(pace) ? 0 : pace;
		}
		
		
		runAvgPaceMinuteLabel.text = pace.toFixed(1);
		runObject.pace = pace.toFixed(1);
		
	} else {
		Ti.API.info('calculateDistance() NOT enough points for distance calculation');
	}
	
	return runningDistanceKmLabelValue;
}