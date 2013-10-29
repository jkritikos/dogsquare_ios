//checkin view
var checkinView = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

//the checkin map
var checkinMap = Titanium.Map.createView({ 
	width:'100%',
	top:0,
	height:208,
    mapType:Titanium.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:true,
    visible:true
});
checkinView.add(checkinMap);

//set checkin map region object
var checkinMapRegion = {
	latitude: userObject.lat,
	longitude: userObject.lon,
	animate:true,
	latitudeDelta:0.003,
	longitudeDelta:0.003
};
	
checkinMap.setLocation(checkinMapRegion);

//checkin title yellow bar
var checkinTitleBar = Ti.UI.createButton({ 
	backgroundImage:IMAGE_PATH+'common/comment_field.png',
	zIndex:3,
	top:226,
	width:320,
	height:44,
	toggle:false
});

//checkin title label of the bar
var checkinBarTitleLabel = Titanium.UI.createLabel({ 
	text:'Nearby places',
	color:'white',
	top:15,
	height:20,
	textAlign:'center',
	left:18,
	font:UI_FONT_BARS
});
checkinTitleBar.add(checkinBarTitleLabel);
checkinView.add(checkinTitleBar);
checkinTitleBar.addEventListener('click', handleNearbyPlacesButton);

//opacity bar
var checkinOpacityBar = Titanium.UI.createView({ 
	backgroundColor:'white',
	width:320,
	top:144,
	height:53,
	opacity:0.8
});
checkinMap.add(checkinOpacityBar);

//change opacity when touched
checkinOpacityBar.addEventListener('touchstart', function(e){
	checkinOpacityBar.opacity = 1;
});

//change opacity when released
checkinOpacityBar.addEventListener('touchend', function(e){
	checkinOpacityBar.opacity = 0.8;
});

//redirect to add new place view
checkinOpacityBar.addEventListener('click', function(e){
	Ti.include('ui/iphone/add_place.js');
	
	openWindows.push(addPlaceWindow);
	navController.open(addPlaceWindow);
});

//checkin opacity bar label
var checkinOpacityBarLabel = Titanium.UI.createLabel({ 
	text:'+ Add a new place / incident',
	color:'black',
	height:22,
	textAlign:'left',
	left:16,
	opacity:0.8,
	font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
});
checkinOpacityBar.add(checkinOpacityBarLabel);

//background of the table view
var checkinPlacesTableViewBackground = Titanium.UI.createView({ 
	backgroundColor:UI_BACKGROUND_COLOR,
	width:'100%',
	bottom:0,
	top:253
});
checkinView.add(checkinPlacesTableViewBackground);

//checkin places tableView
var checkinPlacesTableView = Titanium.UI.createTableView({
	minRowHeight:51,
	width:320,
	backgroundColor:UI_BACKGROUND_COLOR,
	top:18,
	bottom:0
});

getNearbyPlaces();

//remove empty rows
checkinPlacesTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

checkinPlacesTableViewBackground.add(checkinPlacesTableView);
checkinPlacesTableView.addEventListener('click', handleCheckinPlacesTableViewRow);

function populatecheckinPlacesTableView(places){
	
	var tableRows = [];
	
	if(places.length > 0){
	
		for(i=0;i<places.length;i++){
			
			//places row
			var placeRow = Ti.UI.createTableViewRow({
				className:'placeRow',
				height:71,
				width:'100%',
				backgroundColor:'white',
				selectedBackgroundColor:'transparent',
				placeId:places[i].id
			});
			
			//place image
			var rowPlaceImage = Titanium.UI.createImageView({
				image:REMOTE_PLACE_IMAGES + places[i].thumb,
				defaultImage:IMAGE_PATH+'common/default_place_photo.png',
				left:10,
				top:5,
				borderRadius:30,
				borderWidth:2,
				borderColor:'f5a92c'
			});
			
			//place title label for row
			var rowPlaceTitleLabel = Titanium.UI.createLabel({ 
				text:places[i].name,
				color:'black',
				top:10,
				width:'auto',
				textAlign:'left',
				opacity:0.8,
				left:87,
				font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			//place description label for row
			var rowPlaceDescriptionLabel = Titanium.UI.createLabel({ 
				text:places[i].category,
				color:'black',
				top:28,
				width:'auto',
				textAlign:'left',
				opacity:0.7,
				left:87,
				font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			//place distance label for row
			var rowPlaceDistanceLabel = Titanium.UI.createLabel({ 
				text:places[i].distance,
				color:'black',
				height:14,
				top:47,
				width:'auto',
				textAlign:'left',
				opacity:0.5,
				left:87,
				font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			placeRow.add(rowPlaceTitleLabel);
			placeRow.add(rowPlaceDescriptionLabel);
			placeRow.add(rowPlaceDistanceLabel);
			placeRow.add(rowPlaceImage);
			
			tableRows.push(placeRow);
		}
	}else {
		var placeRow = Ti.UI.createTableViewRow({
			className:'placeRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		//place label
		var placeLabel = Ti.UI.createLabel({
			text:'No nearby places found',
			textAlign:'left',
			width:'auto',
			height:'auto',
			opacity:0.6,
			color:'black',
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		placeRow.add(placeLabel);
		
		tableRows.push(placeRow);
		checkinPlacesTableView.allowsSelection = false;
	}
	
	checkinPlacesTableView.setData(tableRows);
}

function handleCheckinPlacesTableViewRow(e){
	var placeId = e.row.placeId;
	var placeTitle = e.row.children[0].text;
	
	Ti.include('ui/iphone/place_view.js');
	
	var checkinPlaceWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		translucent:false,
		//barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR
	});
	
	//back button
	var checkinPlaceBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	checkinPlaceWindow.setLeftNavButton(checkinPlaceBackButton);
	
	checkinPlaceBackButton.addEventListener("click", function() {
	    navController.close(checkinPlaceWindow);
	});
	
	checkinPlaceWindow.setTitle(placeTitle);
	var checkinPlaceView = buildCheckinPlaceView(placeId);
	
	checkinPlaceWindow.add(checkinPlaceView);
	openWindows.push(checkinPlaceWindow);
	//openWindows[1] = checkinPlaceWindow;
	navController.open(checkinPlaceWindow);
}

function handleNearbyPlacesButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		checkinTitleBar.animate({top:226, duration:500});
		checkinPlacesTableViewBackground.animate({top:253, duration:500});
		e.source.toggle = false;
	}else{
		checkinTitleBar.animate({top:102, duration:500});
		checkinPlacesTableViewBackground.animate({top:129, duration:500});
		e.source.toggle = true;
	}
}

//get all nearby places according to latitude and longitude
function getNearbyPlaces(){
	Ti.API.info('getNearbyPlaces() called for latitude:' + userObject.lat + 'and longitude:'+ userObject.lon);
	
	var dogBreeds = [];
	
	var dogBreeds = JSON.stringify(dogBreeds);
	
	//progress view
	var progressView = new ProgressView({window:checkinView});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getNearbyPlaces() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('getNearbyPlaces() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			populatecheckinPlacesTableView(jsonData.data.places);
			
			//Hide progress view
			progressView.hide();
		} else {
			alert(getErrorMessage(jsonData.data.response));
		}
	};
	
	xhr.open('GET',API+'getPlaces');
	xhr.send({
		user_id:userObject.userId,
		lat:userObject.lat,
		lon:userObject.lon,
		breed_list:dogBreeds
	});
}