var runningMode = false;
var runningPathCoordinates = [];
var runningDistanceKm = 0;
var runningDistanceKmLabelValue = '';
var runObject = {};

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
		backgroundColor:UI_BACKGROUND_COLOR
	});

	runDistanceValueLabel = Ti.UI.createLabel({
		text:'0.00',
		top:20,
		left:30,
		color:UI_COLOR_RUN,
		font:{fontSize:60, fontWeight:'bold'}
	});

	runDistanceUnitLabel = Ti.UI.createLabel({
		text:'km',
		top:35,
		right:40,
		color:UI_COLOR_RUN,
		font:{fontSize:40, fontWeight:'bold'}
	});
	
	var t3 = Ti.UI.create2DMatrix();
	t3 = t3.scale(1, -1);
	
	var runDistanceUnitReflectionLabel = Ti.UI.createLabel({
		text:'km',
		transform:t3,
		opacity:0.3,
		top:70,
		right:40,
		color:UI_COLOR_RUN,
		font:{fontSize:40, fontWeight:'bold'}
	}); 
	
	/*
	var gradient = Ti.UI.createView({top:75, right:40, height:40, width:60,zIndex:10,
        backgroundGradient:{
            type:'linear',
            colors:[UI_BACKGROUND_COLOR,'transparent']
        }
    });*/
    
	var runAvgPaceValueLabel = Ti.UI.createLabel({
		text:'0',
		top:140,
		left:10,
		color:UI_COLOR_RUN,
		font:{fontSize:30, fontWeight:'regular'}
	});
	
	var runAvgPaceLabel = Ti.UI.createLabel({
		text:'Avg pace',
		top:170,
		left:30,
		color:UI_COLOR_RUN,
		font:{fontSize:15, fontWeight:'regular'}
	});
	
	var runDurationValueLabel = Ti.UI.createLabel({
		text:'0:00:00',
		top:140,
		color:UI_COLOR_RUN,
		font:{fontSize:30, fontWeight:'regular'}
	});
	
	var runDurationLabel = Ti.UI.createLabel({
		text:'Duration',
		top:170,
		color:UI_COLOR_RUN,
		font:{fontSize:15, fontWeight:'regular'}
	});
	
	viewRun.add(runDistanceUnitReflectionLabel);
	viewRun.add(runDurationLabel);
	viewRun.add(runDurationValueLabel);
	viewRun.add(runAvgPaceLabel);
	viewRun.add(runAvgPaceValueLabel);
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
	if(runningMode){
		runningMode = false;
		
		//Prepare run object for the next window
		runObject.coordinates = runningPathCoordinates;
		runObject.temperature = '99';
		runObject.speed = '101';
		
		Ti.include('ui/iphone/run_finish.js');
		
		var runFinishView = buildRunFinishView(runObject);
		
	
		var runFinishWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR,
			title:'Run overview',
			backButtonTitle:'Back'
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

//Ti.UI.currentWindow.add(viewRun);
