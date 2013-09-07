//constants
var VIEW_PLACE_VIEW = 1;
var CHECKIN_PLACE_VIEW = 2;

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
var checkinTitleBar = Ti.UI.createImageView({ 
	image:IMAGE_PATH+'profile/Activitybar.png',
	top:226
});
checkinView.add(checkinTitleBar);

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
	backgroundColor:'d2d2d2',
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
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	backgroundColor:'d2d2d2',
	top:263,
	bottom:0
});
checkinView.add(checkinPlacesTableView);
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
			height:51,
			width:'100%',
			backgroundColor:'e7e7e7',
			selectedBackgroundColor:'transparent',
			placeId:placeArrayId[i]
		});
		
		//place image
		var rowPlaceImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var rowPlaceImageBlob = rowPlaceImageFile.toBlob();
		var rowPlaceImageBlobCropped = rowPlaceImageBlob.imageAsThumbnail(42,0,21);
		var rowPlaceImage = Titanium.UI.createImageView({
			image:rowPlaceImageBlobCropped,
			left:12,
			top:2,
			borderRadius:21,
			borderWidth:1,
			borderColor:'f5a92c'
		});
		
		//place title label for row
		var rowPlaceTitleLabel = Titanium.UI.createLabel({ 
			text:placeArray[i],
			color:'black',
			height:16,
			top:4,
			width:'auto',
			textAlign:'left',
			opacity:0.8,
			left:67,
			font:{fontSize:10, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//place description label for row
		var rowPlaceDescriptionLabel = Titanium.UI.createLabel({ 
			text:descriptionArray[i],
			color:'black',
			height:14,
			top:17,
			width:'auto',
			textAlign:'left',
			opacity:0.5,
			left:67,
			font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//place distance label for row
		var rowPlaceDistanceLabel = Titanium.UI.createLabel({ 
			text:distanceArray[i],
			color:'black',
			height:14,
			top:29,
			width:'auto',
			textAlign:'left',
			opacity:0.5,
			left:67,
			font:{fontSize:10, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//sepparator
		var rowSepparator = Titanium.UI.createView({ 
			backgroundColor:'d2d2d2',
			width:'100%',
			bottom:0,
			height:3
		});
		
		placeRow.add(rowPlaceTitleLabel);
		placeRow.add(rowPlaceDescriptionLabel);
		placeRow.add(rowPlaceDistanceLabel);
		placeRow.add(rowSepparator);
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
	navController.open(checkinPlaceWindow);
}
