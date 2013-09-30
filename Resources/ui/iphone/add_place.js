var addPlaceWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR,
	title:'Add Place'
});

var addPlaceObject = {};

//save button
var addPlaceSaveButton = Ti.UI.createButton({
    backgroundImage:IMAGE_PATH+'common/save_button.png',
    width:54,
    height:34
});

addPlaceWindow.setRightNavButton(addPlaceSaveButton);
addPlaceSaveButton.addEventListener('click', handleAddPlaceSaveButton);

//back button
var addPlaceBackButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'common/back_button.png',
    width:48,
    height:33
});
addPlaceWindow.setLeftNavButton(addPlaceBackButton);

//event listener for back button
addPlaceBackButton.addEventListener("click", function() {
    navController.close(addPlaceWindow);
});

//the map
var addPlaceMap = Titanium.Map.createView({ 
	width:'100%',
	top:0,
	height:IPHONE5 ? 248 : 161,
    mapType:Titanium.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:true,
    visible:true
});
addPlaceWindow.add(addPlaceMap);

//set place map region object
var addPlaceMapRegion = {
	latitude: userObject.lat,
	longitude: userObject.lon,
	animate:true,
	latitudeDelta:0.003,
	longitudeDelta:0.003
};
	
addPlaceMap.setLocation(checkinMapRegion);

//photo area button
var addPlacePhotoAreaButton = Ti.UI.createButton({ 
	backgroundImage:IMAGE_PATH+'add_place/photo_area.png',
	top:IPHONE5 ? 246 : 158,
	height:138,
	width:320
});
addPlaceWindow.add(addPlacePhotoAreaButton);
addPlacePhotoAreaButton.addEventListener('click', addPlaceShowPhotoOptions);

//photo icon
var addPlacePhotoIcon = Ti.UI.createImageView({ 
	image:IMAGE_PATH+'add_place/photo_icon.png',
	top:40
});
addPlacePhotoAreaButton.add(addPlacePhotoIcon);

//photo label
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

//photo dialog
var addPlacePhotoDialog = Titanium.UI.createOptionDialog({
	options:['Take Photo', 'Choose From Library', 'Cancel'],
	cancel:2
});

//photo dialog event listener
addPlacePhotoDialog.addEventListener('click',function(e){
	if(e.index == 0){
		handlePlaceCameraSelection();
	} else if(e.index == 1){
		handlePlacePhotoSelection();
	}
});

//fields background
var addPlaceFieldsBackground = Ti.UI.createView({
	backgroundColor:'e7e6e6',
	bottom:0,
	width:320,
	height:124
});
addPlaceWindow.add(addPlaceFieldsBackground);

//offset for the two sepparators in the form
var sepparatorOffset = 0;

for(var i=0; i<2; i++) {
	//sepparator
	var addPlaceSepparator = Ti.UI.createView({
		backgroundColor:'dcdcdc',
		width:320,
		height:1,
		top:29 + sepparatorOffset
	});
	addPlaceFieldsBackground.add(addPlaceSepparator);
	
	sepparatorOffset += 30;
}

//text field name
var  addPlaceTxtFieldName = Ti.UI.createTextField({
	top:0,
	width:294,
	height:28,
	left:13,
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});
addPlaceFieldsBackground.add(addPlaceTxtFieldName);
//events for text field name
addPlaceTxtFieldName.addEventListener('change', handleTextFieldNameChange);
addPlaceTxtFieldName.addEventListener('focus', handleTextFieldNameFocus);
addPlaceTxtFieldName.addEventListener('blur', handleTextFieldNameBlur);

//textfield label
var addPlaceTxtFieldNameLabel = Ti.UI.createLabel({
	text:'Name',
	color:'black',
	textAlign:'left',
	left:0,
	opacity:0.8,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addPlaceTxtFieldName.add(addPlaceTxtFieldNameLabel);

//category label
var addPlaceCategoryLabel = Ti.UI.createLabel({
	text:'Category',
	color:'black',
	textAlign:'left',
	left:13,
	top:28,
	opacity:0.8,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addPlaceFieldsBackground.add(addPlaceCategoryLabel);

//button to show 
var addPlaceCategoryButton = Ti.UI.createButton({
	top:29,
	right:0,	
    width:43,
    height:31
});
addPlaceFieldsBackground.add(addPlaceCategoryButton);
addPlaceCategoryButton.addEventListener('click', handleCategoryButton);

//picker data
var pickerCategories = [];

var addPlaceCategories = getPlaceCategories();

for(i=0;i<addPlaceCategories.length;i++){
	var name = addPlaceCategories[i].name;
	var id = addPlaceCategories[i].id;
	
	pickerCategories[i]=Ti.UI.createPickerRow({title:name, id:id});
}

//done button for picker
var addPlacePickerDoneButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/Done_button.png',
    width:54,
    height:34
});
addPlacePickerDoneButton.addEventListener("click", handlePickerDoneButton);

var addPlaceFlexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var addPlaceToolbar = Titanium.UI.iOS.createToolbar({
    items:[addPlaceFlexSpace, addPlacePickerDoneButton],
    barColor:'999999',
    bottom:-44,
    borderTop:true,
    borderBottom:false
}); 
addPlaceWindow.add(addPlaceToolbar);

//picker
var addPlacePicker = Ti.UI.createPicker({
  bottom:-216,
  selectionIndicator:true
});
addPlacePicker.add(pickerCategories);

addPlaceWindow.add(addPlacePicker);

//handle category button
function handleCategoryButton(){
	addPlacePicker.animate({bottom:0, duration:500});
	addPlaceToolbar.animate({bottom:216, duration:500});
}

//handle picker done button
function handlePickerDoneButton(){
	addPlaceToolbar.animate({bottom:-44, duration:500});
	addPlacePicker.animate({bottom:-216, duration:500});
	addPlaceWindow.setRightNavButton(addPlaceSaveButton);
	addPlaceCategoryLabel.text = addPlacePicker.getSelectedRow(0).title;
	addPlaceCategoryLabel.id = addPlacePicker.getSelectedRow(0).id;
	addPlaceCategoryLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	addPlaceCategoryLabel.opacity = 1;
}

//handle textfield change
function handleTextFieldNameChange(){
	if(addPlaceTxtFieldName.value != ''){
		addPlaceTxtFieldNameLabel.hide();
	}else {
		addPlaceTxtFieldNameLabel.show();
	}
}

//handle textfield focus
function handleTextFieldNameFocus(){
	addPlaceFieldsBackground.animate({bottom:122, duration:200});
}

//handle textfield blur
function handleTextFieldNameBlur(){
	addPlaceFieldsBackground.animate({bottom:0, duration:200});
}

function validatePlaceForm(){
	if(isStringNullOrEmpty(addPlaceTxtFieldName.value)){
		alert('NAME IS MISSING');
		return false;
	}else if(addPlaceCategoryLabel.id == null){
		alert('CATEGORY IS MISSING');
		return false;
	}else if(addPlaceObject.photo == null){
		alert('PLACE PHOTO MISSING');
		return false;
	}
	
	addPlaceObject.name = addPlaceTxtFieldName.value;
	addPlaceObject.category_id = addPlaceCategoryLabel.id;
	addPlaceObject.longitude = 23.717422;
	addPlaceObject.latitude = 37.970257;
	
	return true;
}

//handle photo button
function addPlaceShowPhotoOptions(){
	addPlacePhotoDialog.show();
}

//handle camera selection
function handlePlaceCameraSelection(){
	
}	

//handle photo selection
function handlePlacePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			var resizedImage = jpgcompressor.scale(image, 1024, 768);
			var compressedImage = jpgcompressor.compress(resizedImage);
			
			addPlaceObject.photo = compressedImage;
			
			var uniquePlaceFilename = new Date().getTime() + '.jpg';
			addPlaceObject.photo_filename = uniquePlaceFilename;
			
			// create new file name and remove old
			var filename = Titanium.Filesystem.applicationDataDirectory + uniquePlaceFilename;
			var tmpImage = Titanium.Filesystem.getFile(filename);
			tmpImage.write(compressedImage);
			Ti.API.info('saved image to '+filename);
		},
		cancel:function(){
	
		},
		error:function(error){
		}
	});
}

function handleAddPlaceSaveButton(){
	if(validatePlaceForm()){
		Ti.API.info('note form is valid');
		doSavePlaceOnline(addPlaceObject);
	}else{
		Ti.API.info('note form is not valid');
	}

}

//Server call for saving places
function doSavePlaceOnline(pObj){
	Ti.API.info('doSavePlaceOnline() called with userObject='+pObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSavePlaceOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			Ti.API.info('doSavePlaceOnline() got back place id from server '+jsonData.data.place_id);
			//Add the server place id to the object
			pObj.place_id = jsonData.data.place_id;
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			alert('place successfully added');
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'addPlace');
	xhr.send({
		user_id:userObject.userId,
		photo:pObj.photo,
		name:pObj.name,
		latitude:pObj.latitude,
		longitude:pObj.longitude,
		category_id:pObj.category_id
	});
}