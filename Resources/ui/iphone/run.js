var runningMode = false;
var runningPathCoordinates = [];
var runningDistanceKm = 0;
var runningDistanceKmLabelValue = '';

var viewRun = Ti.UI.createView({
	backgroundColor:'white'
});

var runDistanceValueLabel = Ti.UI.createLabel({
	text:'0,00',
	top:50,
	font:{fontSize:50, fontWeight:'bold'}
});

var runDistanceUnitLabel = Ti.UI.createLabel({
	text:'km',
	top:50,
	right:40,
	font:{fontSize:50, fontWeight:'bold'}
});

viewRun.add(runDistanceValueLabel);
viewRun.add(runDistanceUnitLabel);

var runPauseButton = Ti.UI.createButton({
	title:'Start',
	bottom:20,
	left:10,
	zIndex:2
});

var runEndButton = Ti.UI.createButton({
	title:'End',
	bottom:20,
	right:10,
	zIndex:2
});

viewRun.add(runPauseButton);
viewRun.add(runEndButton);

runPauseButton.addEventListener('click', handleStartButton);

function handleStartButton(){
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

function trackLocation(){
	Titanium.Geolocation.getCurrentPosition(function(e){
		if (e.error){
			//alert('Se ha perdido la señal GPS. Sal a cielo abierto ...');
			return;
		}
		
		var coordinates = [e.coords.latitude,e.coords.longitude];
		calculateDistance(coordinates);
		runningPathCoordinates.push(coordinates);
		
		var speed = e.coords.speed;
		var velocidad_km_h = (speed / 0.28).toFixed(0);
	});
}

function calculateDistance(newCoordinates){
	if(runningPathCoordinates.length >= 1){
		var lat1 = newCoordinates[0];
		var lon1 = newCoordinates[1];
		var lat2 = runningPathCoordinates[runningPathCoordinates.length-1][0];
		var lon2 = runningPathCoordinates[runningPathCoordinates.length-1][1];
		
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
}

Ti.UI.currentWindow.add(viewRun);
