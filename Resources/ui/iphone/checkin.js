
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

//checkin title yellow bar
var checkinTitleBar = Ti.UI.createButton({ 
	backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
	top:226,
	width:320,
	height:33,
	toggle:false
});

//checkin title label of the bar
var checkinBarTitleLabel = Titanium.UI.createLabel({ 
	text:'Nearby places',
	color:'white',
	top:13,
	height:20,
	textAlign:'center',
	left:18,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
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
	text:'Add a new place   +',
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
	top:259
});
checkinView.add(checkinPlacesTableViewBackground);

//checkin places tableView
var checkinPlacesTableView = Titanium.UI.createTableView({
	minRowHeight:51,
	width:320,
	data:populatecheckinPlacesTableView(),
	backgroundColor:UI_BACKGROUND_COLOR,
	top:4,
	bottom:0
});

//remove empty rows
checkinPlacesTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

checkinPlacesTableViewBackground.add(checkinPlacesTableView);
checkinPlacesTableView.addEventListener('click', handleCheckinPlacesTableViewRow);

function populatecheckinPlacesTableView(){
	var tableRows = [];
	var placeArray = ['Pet City', 'Pet and Bath', 'Pet Vet'];
	var placeArrayId = ['6', '7', '8'];
	var descriptionArray = ['Pet Shop', 'Grooming Services', 'Veterinary Clinic'];
	var distanceArray = ['0,5km', '1km', '1km'];
	
	for(i=0;i<=2;i++){
		
		//places row
		var placeRow = Ti.UI.createTableViewRow({
			className:'placeRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			placeId:placeArrayId[i]
		});
		
		//place image
		//var rowPlaceImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		//var rowPlaceImageBlob = rowPlaceImageFile.toBlob();
		//var rowPlaceImageBlobCropped = rowPlaceImageBlob.imageAsThumbnail(42,0,21);
		var rowPlaceImage = Titanium.UI.createImageView({
			image:REMOTE_USER_IMAGES + userObject.thumb_path,
			left:10,
			top:5,
			borderRadius:27,
			borderWidth:3,
			borderColor:'f5a92c'
		});
		
		//place title label for row
		var rowPlaceTitleLabel = Titanium.UI.createLabel({ 
			text:placeArray[i],
			color:'black',
			height:16,
			top:14,
			width:'auto',
			textAlign:'left',
			opacity:0.8,
			left:87,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//place description label for row
		var rowPlaceDescriptionLabel = Titanium.UI.createLabel({ 
			text:descriptionArray[i],
			color:'black',
			height:14,
			top:27,
			width:'auto',
			textAlign:'left',
			opacity:0.5,
			left:87,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//place distance label for row
		var rowPlaceDistanceLabel = Titanium.UI.createLabel({ 
			text:distanceArray[i],
			color:'black',
			height:14,
			top:39,
			width:'auto',
			textAlign:'left',
			opacity:0.5,
			left:87,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		placeRow.add(rowPlaceTitleLabel);
		placeRow.add(rowPlaceDescriptionLabel);
		placeRow.add(rowPlaceDistanceLabel);
		placeRow.add(rowPlaceImage);
		
		tableRows.push(placeRow);
	}
	
	return tableRows;
}

function handleCheckinPlacesTableViewRow(e){
	var placeId = e.row.placeId;
	var placeTitle = e.row.children[0].text;
	
	Ti.include('ui/iphone/checkin_place.js');
	
	var checkinPlaceWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
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
	var checkinPlaceView = buildCheckinPlaceView(CHECKIN_PLACE_VIEW, placeId);
	
	checkinPlaceWindow.add(checkinPlaceView);
	openWindows.push(checkinPlaceWindow);
	//openWindows[1] = checkinPlaceWindow;
	navController.open(checkinPlaceWindow);
}

function handleNearbyPlacesButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		checkinTitleBar.animate({top:226, duration:500});
		checkinPlacesTableViewBackground.animate({top:259, duration:500});
		e.source.toggle = false;
	}else{
		checkinTitleBar.animate({top:102, duration:500});
		checkinPlacesTableViewBackground.animate({top:135, duration:500});
		e.source.toggle = true;
	}
}
