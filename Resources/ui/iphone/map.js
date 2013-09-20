//Map filters
var FILTER_PARK = 0;
var FILTER_HOMELESS = 1;
var FILTER_CRUELTY = 2;
var FILTER_PETSHOP = 3;
var FILTER_VETERINARY = 4;
var FILTER_DOG_HOSPITAL = 5;
var FILTER_RECENTLY_OPEN = 6;

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

function buildMapView(windowMode){
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
		width:100,
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
		height:329,
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
	
	mapSearchCategoriesTableView.setData(mapSearchFilterData);

	viewMap.add(mapSearchCategoriesBackground);
	
	mapCheckInButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'map/pin_checkIn.png',
		bottom:0,
		width:70,
		height:70,
		zIndex:2
	});
	
	viewMap.add(mapCheckInButton);
	
	//cancel button for map filters
	mapFilterCancelButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:58,
	    height:29
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
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:42.30,longitude:-71.18,latitudeDelta:0.03, longitudeDelta:0.1},
	    animate:true,
	    regionFit:true
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