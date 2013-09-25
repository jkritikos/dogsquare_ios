//Map filters
var FILTER_PARK = 1;
var FILTER_HOMELESS = 2;
var FILTER_CRUELTY = 3;
var FILTER_PETSHOP = 4;
var FILTER_VETERINARY = 5;
var FILTER_DOG_HOSPITAL = 6;
var FILTER_RECENTLY_OPEN = 7;
var FILTER_MATING = 8;
var FILTER_SAME_BREED = 9;

//UI components
var viewMapTargetMode = null;
var viewMap = null;
var mapSearchContainer = null;
var mapFilterCancelButton = null;
var mapSearchIcon = null;
var mapSearchTxtfield = null;
var mapSearchTxtfieldLabel = null;
var mapSearchCategoriesBackground = null;
var mapSearchCategoriesTableView = null;
var mapCheckInButton = null;
var mapview = null;

//Map coordinates
var mapLatitude = null;
var mapLongitude = null;

function buildMapView(windowMode){
	
	Titanium.Geolocation.getCurrentPosition(function(e){
	//Ti.Geolocation.addEventListener('location', function(e) {
		if (e.error) {
			Ti.API.error('map.js : geo - position' + e.error); 
			return;
		 } 
		 
		 mapLatitude = e.coords.latitude; 
		 mapLongitude = e.coords.longitude; 
		 var accuracy = e.coords.accuracy; 
		 var timestamp = e.coords.timestamp;
		 
		 Ti.API.info('Got position lat '+mapLatitude+' lon '+mapLongitude+' with accuracy '+accuracy);
		 
		 //map region object
		var mapRegion = {
			latitude: mapLatitude,
			longitude: mapLongitude,
			animate:true,
			latitudeDelta:0.001,
			longitudeDelta:0.001
		};
			
		mapview.setLocation(mapRegion);
	});
	
	viewMapTargetMode = windowMode;
	CURRENT_VIEW = VIEW_MAP;
	
	viewMap = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//search field
	mapSearchContainer = Titanium.UI.createView({
		backgroundColor:'white',
		width:200,
		height:27
	});
	
	mapSearchIcon = Titanium.UI.createImageView({
		image:IMAGE_PATH+'menu_left/search_icon.png',
		left:5
	});
	
	mapSearchContainer.add(mapSearchIcon);
	
	mapSearchTxtfield = Titanium.UI.createTextField({
		left:35,
		width:155,
		field:'search'
	});
	
	mapSearchTxtfield.addEventListener('change', handleMapSearchTextFieldChange);
	mapSearchTxtfield.addEventListener('focus', handleMapSearchTextFieldFocus);
	mapSearchTxtfield.addEventListener('blur', handleMapSearchTextFieldBlur);
	
	mapSearchTxtfieldLabel = Titanium.UI.createLabel({
		text:'Search',
		color:'666666',
		textAlign:'center',
		opacity:0.3,
		left:3,
		font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	mapSearchTxtfield.add(mapSearchTxtfieldLabel);
	
	mapSearchContainer.add(mapSearchTxtfield);
	
	if(CURRENT_VIEW == VIEW_MAP){
		navController.getWindow().setTitleControl(mapSearchContainer);
	}
	
	mapSearchCategoriesBackground = Titanium.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR,
		width:320,
		height:416,
		opacity:0,
		zIndex:3
	});
		
	mapSearchCategoriesTableView = Ti.UI.createTableView({
		backgroundColor:UI_BACKGROUND_COLOR,
		sepparatorColor:'d3d2d2',
		top:13,
		width:293
	});
	mapSearchCategoriesBackground.add(mapSearchCategoriesTableView);
	
	mapSearchCategoriesTableView.addEventListener('scroll', handleMapSearchCategoriesScroll);
	mapSearchCategoriesTableView.addEventListener('click', handleMapSearchCategoriesRows);
	
	var mapSearchFilterData = [];
	mapSearchFilterData.push(createMapFilterRow(FILTER_PARK));
	mapSearchFilterData.push(createMapFilterRow(FILTER_HOMELESS));
	mapSearchFilterData.push(createMapFilterRow(FILTER_CRUELTY));
	mapSearchFilterData.push(createMapFilterRow(FILTER_PETSHOP));
	mapSearchFilterData.push(createMapFilterRow(FILTER_VETERINARY));
	mapSearchFilterData.push(createMapFilterRow(FILTER_DOG_HOSPITAL));
	mapSearchFilterData.push(createMapFilterRow(FILTER_RECENTLY_OPEN));
	mapSearchFilterData.push(createMapFilterRow(FILTER_MATING));
	mapSearchFilterData.push(createMapFilterRow(FILTER_SAME_BREED));
	
	mapSearchCategoriesTableView.setData(mapSearchFilterData);

	viewMap.add(mapSearchCategoriesBackground);
	
	mapCheckInButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'map/pin_checkIn.png',
		bottom:0,
		width:67,
		height:67,
		zIndex:2
	});
	
	viewMap.add(mapCheckInButton);
	
	//cancel button for map filters
	mapFilterCancelButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34
	});
	
	mapFilterCancelButton.addEventListener('click', handleCloseFilterViewButton);
	
	mapCheckInButton.addEventListener('click', function(){
		navController.getWindow().setTitleControl();
		
		Ti.include('ui/iphone/checkin.js');
		
		//checkin window
		var checkinWindow = Ti.UI.createWindow({
			backgroundColor:UI_BACKGROUND_COLOR,
			barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR,
			title:'Check in'
		});
		
		//back button
		var checkinBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		checkinWindow.setLeftNavButton(checkinBackButton);
		
		checkinBackButton.addEventListener("click", function() {
		    navController.close(checkinWindow);
		    navController.getWindow().setTitleControl(mapSearchContainer);
		});
		
		checkinWindow.add(checkinView);
		openWindows.push(checkinWindow);
		navController.open(checkinWindow);
	});
	 
	mapview = Titanium.Map.createView({
		width:'100%',
		top:0,
	    mapType: Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    regionFit:true,
	    userLocation:false,
	    visible:true
	});
	
	viewMap.add(mapview);
}

function handleMapSearchCategoriesScroll(){
	mapSearchTxtfield.blur();
}

//Event handler for focusing on the search textfield
function handleMapSearchTextFieldFocus(e){
	mapSearchCategoriesBackground.animate({opacity:1, duration:400});
	
	//add the cancel button
	if(viewMapTargetMode == TARGET_MODE_REUSE){
		navController.getWindow().setRightNavButton(mapFilterCancelButton);
	} else if(viewMapTargetMode == TARGET_MODE_NEW_WINDOW){
		openWindows[openWindows.length-1].setRightNavButton(mapFilterCancelButton);
	}
}

function handleMapSearchTextFieldChange(e){
	if(mapSearchTxtfield.value != ''){
		mapSearchTxtfieldLabel.hide();
	}else{
		mapSearchTxtfieldLabel.show();
	}
}

function handleMapSearchTextFieldBlur(e){
	if(mapSearchTxtfield.value == ''){
		mapSearchTxtfieldLabel.show();
	}
}

function createMapFilterRow(filter){
	var row = Ti.UI.createTableViewRow({
		height:47,
		className:'mapFilter',
		backgroundColor:'white',
		selectedBackgroundColor:'transparent',
		filter:filter
	});
		
	var icon, label;
	if(filter == FILTER_PARK){
		icon = IMAGE_PATH+'map_filters/park_icon.png';
		label = 'Park';
	} else if(filter == FILTER_HOMELESS){
		icon = IMAGE_PATH+'map_filters/homeless_icon.png';
		label = 'Homeless';
	}else if(filter == FILTER_CRUELTY){
		icon = IMAGE_PATH+'map_filters/cruelty_icon.png';
		label = 'Cruelty';
	} else if(filter == FILTER_PETSHOP){
		icon = IMAGE_PATH+'map_filters/petshop_icon.png';
		label = 'Pet shop';
	} else if(filter == FILTER_VETERINARY){
		icon = IMAGE_PATH+'map_filters/veterinary_icon.png';
		label = 'Veterinary';
	} else if(filter == FILTER_DOG_HOSPITAL){
		icon = IMAGE_PATH+'map_filters/dogHospital_icon.png';
		label = 'Dog Hospital';
	} else if(filter == FILTER_RECENTLY_OPEN){
		icon = IMAGE_PATH+'map_filters/recentlyOpened_icon.png';
		label = 'Recently open';
	} else if(filter == FILTER_MATING){
		icon = IMAGE_PATH+'map_filters/matting_icon.png';
		label = 'Mating';
	} else if(filter == FILTER_SAME_BREED){
		icon = IMAGE_PATH+'map_filters/sameBreed_icon.png';
		label = 'Same breed';
	}
	
	var rowIcon = Titanium.UI.createImageView({
		image:icon,
		left:7
	});
	
	var rowLabel = Titanium.UI.createLabel({
		text:label,
		color:'#716767',
		left:52,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	row.add(rowIcon);
	row.add(rowLabel);
	
	return row;
}

//Event handler for closing the map filter view
function handleCloseFilterViewButton(){
	//Close the filter view and revert to the standard right nav button
	mapSearchCategoriesBackground.animate({opacity:0, duration:400});
	
	//handle the cancel button
	if(viewMapTargetMode == TARGET_MODE_REUSE){
		navController.getWindow().setRightNavButton(rightBtn);
	} else if(viewMapTargetMode == TARGET_MODE_NEW_WINDOW){
		openWindows[openWindows.length-1].setRightNavButton(null);
	}
	
	mapSearchTxtfield.blur();
}

function handleMapSearchCategoriesRows(){
	mapSearchTxtfield.blur();
	mapSearchCategoriesBackground.animate({opacity:0, duration:400});
}