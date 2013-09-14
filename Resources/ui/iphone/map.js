var FILTER_PARK = 0;
var FILTER_HOMELESS = 1;
var FILTER_CRUELTY = 2;
var FILTER_PETSHOP = 3;
var FILTER_VETERINARY = 4;
var FILTER_DOG_HOSPITAL = 5;
var FILTER_RECENTLY_OPEN = 6;

var viewMap = Ti.UI.createView({
	backgroundColor:'white'
});

//search field
var mapSearchContainer = Titanium.UI.createView({
	backgroundColor:'white',
	width:200,
	height:27
});

var mapSearchIcon = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu_left/search_icon.png',
	left:5
});
mapSearchContainer.add(mapSearchIcon);

var mapSearchTxtfield = Titanium.UI.createTextField({
	left:35,
	width:100,
	field:'search'
});
mapSearchTxtfield.addEventListener('change', handleMapSearchTextFieldChange);
mapSearchTxtfield.addEventListener('focus', handleMapSearchTextFieldFocus);
mapSearchTxtfield.addEventListener('blur', handleMapSearchTextFieldBlur);

var mapSearchTxtfieldLabel = Titanium.UI.createLabel({
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

var mapSearchCategoriesBackground = Titanium.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR,
	width:320,
	height:416,
	zIndex:3
});

var mapCloseFilterButton = Titanium.UI.createButton({
	title:'close',
	bottom:7,
	width:45,
	height:29
});
mapSearchCategoriesBackground.add(mapCloseFilterButton);
mapCloseFilterButton.addEventListener('click', handleCloseFilterViewButton);

var mapSearchCategoriesTableView = Ti.UI.createTableView({
	backgroundColor:UI_BACKGROUND_COLOR,
	sepparatorColor:'d3d2d2',
	top:40,
	height:329,
	width:265,
	borderWidth:1,
	borderRadius:3,
	borderColor:'d3d2d2'
});
mapSearchCategoriesBackground.add(mapSearchCategoriesTableView);

mapSearchCategoriesTableView.addEventListener('scroll', handleMapSearchCategoriesScroll);
mapSearchCategoriesTableView.addEventListener('click', handleMapSearchCategoriesRows);

function handleMapSearchCategoriesScroll(){
	mapSearchTxtfield.blur();
}

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
mapSearchCategoriesBackground.hide();

var mapCheckInButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'map/pin_checkIn.png',
	bottom:0,
	width:70,
	height:70,
	zIndex:2
});


viewMap.add(mapCheckInButton);

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



var center = {latitude:42.30,longitude:-71.18,latitudeDelta:0.03, longitudeDelta:0.1};
 
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: center,
    animate:true,
    regionFit:true
});

viewMap.add(mapview);

function handleMapSearchTextFieldFocus(e){
	mapSearchCategoriesBackground.show();
	
	if(CURRENT_VIEW == VIEW_MAP){
		
	}else{
		
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
		className:'LEFT_MENU',
		backgroundColor:'transparent',
		selectedBackgroundColor:'#1c2027',
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

function handleCloseFilterViewButton(){
	mapSearchCategoriesBackground.hide();
}

function handleMapSearchCategoriesRows(){
	mapSearchTxtfield.blur();
	mapSearchCategoriesBackground.hide();
}
