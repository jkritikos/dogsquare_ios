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
	text:'Near me',
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
	minRowHeight:71,
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
			
			//place image
			var rowPlaceImage = Titanium.UI.createImageView({
				image:places[i].dog_id ? API+'photo_dog?dog_id='+places[i].dog_id : REMOTE_PLACE_IMAGES + places[i].thumb,
				defaultImage:IMAGE_PATH+'common/default_place_photo.png',
				left:10,
				//top:5,
				borderRadius:30,
				borderWidth:2,
				borderColor:'f5a92c'
			});
			
			//place title label for row
			var rowPlaceTitleLabel = Titanium.UI.createLabel({ 
				text:places[i].name,
				color:'black',
				top:4,
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
				//top:28,
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
				//height:14,
				//top:47,
				width:'auto',
				textAlign:'left',
				opacity:0.5,
				left:87,
				font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			//places row
			var rowHeight = Math.round((rowPlaceTitleLabel.text.length / 28) * 70);
			var placeRow = Ti.UI.createTableViewRow({
				className:'placeRow',
				height:rowHeight,
				width:'100%',
				backgroundColor:places[i].color ? places[i].color : 'white',
				selectedBackgroundColor:'transparent',
				placeId:places[i].id,
				dogId:places[i].dog_id,
				userId:places[i].user_id,
				categoryId:places[i].category_id,
				userName:places[i].user_name,
				placeName:places[i].name
			});
			
			//Wrapper view with vertical layout for the text in each row
			var rowWrapperView = Ti.UI.createView({
				layout:'vertical',
				top:0,
				bottom:0
			});
			
			
			
			rowWrapperView.add(rowPlaceTitleLabel);
			rowWrapperView.add(rowPlaceDescriptionLabel);
			rowWrapperView.add(rowPlaceDistanceLabel);
			placeRow.add(rowPlaceImage);
			
			placeRow.add(rowWrapperView);
			
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
	Ti.API.info('nearme table clicked!');
	
	var placeId = e.row.placeId;
	var placeTitle = e.row.placeName;
	var categoryId = e.row.categoryId;
	
	if(categoryId == FILTER_LOST_DOG){
		var userId = e.row.userId;
		
		if(userId != userObject.userId){
			Ti.include('ui/iphone/profile_other.js');
			
			var user_name = e.row.userName;
			
			var profileOtherView = buildProfileOtherView(userId, user_name);
	
			var profileOtherWindow = Ti.UI.createWindow({
				backgroundColor:'white',
				//barImage:IMAGE_PATH+'common/bar.png',
				translucent:false,
				barColor:UI_COLOR,
				title:user_name
			});
			
			//back button & event listener
			var profileOtherBackButton = Ti.UI.createButton({
			    backgroundImage: IMAGE_PATH+'common/back_button.png',
			    width:48,
			    height:33
			});
			
			profileOtherWindow.setLeftNavButton(profileOtherBackButton);
			profileOtherBackButton.addEventListener("click", function() {
			    navController.close(profileOtherWindow);
			});
			
			profileOtherWindow.add(profileOtherView);
			
			openWindows.push(profileOtherWindow);
			navController.open(profileOtherWindow);
		} else{
			Ti.include('ui/iphone/profile.js');
	
			var profileWindow = Ti.UI.createWindow({
				backgroundColor:'white',
				//barImage:IMAGE_PATH+'common/bar.png',
				translucent:false,
				barColor:UI_COLOR,
				title:userObject.name
			});
			
			//back button & event listener
			var profileBackButton = Ti.UI.createButton({
			    backgroundImage: IMAGE_PATH+'common/back_button.png',
			    width:48,
			    height:33
			});
			
			profileWindow.setLeftNavButton(profileBackButton);
			profileBackButton.addEventListener("click", function() {
			    navController.close(profileWindow);
			});
			
			profileWindow.add(viewProfile);
			
			openWindows.push(profileWindow);
			navController.open(profileWindow);
		}
		
	} else {
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
		    openWindows.pop();
		});
		
		checkinPlaceWindow.setTitle(placeTitle);
		var checkinPlaceView = buildCheckinPlaceView(placeId, true, TARGET_MODE_NEW_WINDOW);
		
		checkinPlaceWindow.add(checkinPlaceView);
		openWindows.push(checkinPlaceWindow);
		//openWindows[1] = checkinPlaceWindow;
		navController.open(checkinPlaceWindow);
	}
	
	
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
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
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