var addPlaceWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR,
	title:'Add Place'
});

//back button
var addPlaceBackButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'common/back_button.png',
    width:48,
    height:33
});

addPlaceWindow.setLeftNavButton(addPlaceBackButton);

addPlaceBackButton.addEventListener("click", function() {
    navController.close(addPlaceWindow);
});

//the map
var addPlaceMap = Titanium.Map.createView({ 
	width:'100%',
	top:0,
	height:161,
    mapType:Titanium.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:true,
    visible:true
});
addPlaceWindow.add(addPlaceMap);

//photo area button
var addPlacePhotoAreaButton = Ti.UI.createButton({ 
	backgroundImage:IMAGE_PATH+'add_place/photo_area.png',
	top:158,
	height:138,
	width:320
});
addPlaceWindow.add(addPlacePhotoAreaButton);

//photo icon
var addPlacePhotoIcon = Ti.UI.createImageView({ 
	image:IMAGE_PATH+'add_place/photo_icon.png',
	top:40
});
addPlacePhotoAreaButton.add(addPlacePhotoIcon);

var addPlacePhotoLabel = Titanium.UI.createLabel({ 
	text:'Add a photo',
	color:'black',
	top:79,
	height:18,
	width:74,
	opacity:0.6,
	textAlign:'center',
	font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
});
addPlacePhotoAreaButton.add(addPlacePhotoLabel);

var addPlaceTableView = Titanium.UI.createTableView({
	minRowHeight:29,
	width:320,
	data:populateAddPlaceTableView(),
	backgroundColor:'dcdcdc',
	separatorColor:'dcdcdc',
	top:293,
	bottom:0,
	allowsSelection:false
});
addPlaceWindow.add(addPlaceTableView);

function populateAddPlaceTableView(){
	var tableRows = [];
	
	// name row
	var nameRow = Ti.UI.createTableViewRow({
		className:'addPlaceRow',
		height:29,
		width:'100%',
		backgroundColor:'e7e6e6',
		selectedBackgroundColor:'transparent'
	});
	
	//Name textfield
	var rowTxtFieldName = Ti.UI.createTextField({
		width:291,
		height:20,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:1
	});
	
	// category row
	var categoryRow = Ti.UI.createTableViewRow({
		className:'addPlaceRow',
		height:29,
		width:'100%',
		backgroundColor:'e7e6e6',
		selectedBackgroundColor:'transparent'
	});
	
	tableRows.push(nameRow);
	tableRows.push(categoryRow);
	
	return tableRows;
}
