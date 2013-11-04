var addPlaceWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	//barImage:IMAGE_PATH+'common/bar.png',
	translucent:false,
	barColor:UI_COLOR,
	title:'Add Place'
});

//image view for previewing the place image
var addPlaceImagePreview = Ti.UI.createImageView({
	width:320,
	height:320,
	top:160,
	zIndex:1
});

addPlaceWindow.add(addPlaceImagePreview);

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
	width:320,
	zIndex:0
});
addPlaceWindow.add(addPlacePhotoAreaButton);
addPlacePhotoAreaButton.addEventListener('click', addPlaceShowPhotoOptions);
addPlaceImagePreview.addEventListener('click', addPlaceShowPhotoOptions);
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
	height:124,
	zIndex:2
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
		zIndex:2,
		top:29 + sepparatorOffset
	});
	addPlaceFieldsBackground.add(addPlaceSepparator);
	
	sepparatorOffset += 30;
}

//text field name
var addPlaceTxtFieldName = Ti.UI.createTextField({
	top:0,
	width:294,
	height:28,
	left:13,
	zIndex:2,
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
	color:'999999',
	textAlign:'left',
	left:0,
	width:80,
	height:30,
	zIndex:2,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addPlaceTxtFieldName.add(addPlaceTxtFieldNameLabel);

//category background
var addPlaceCategoryBackground = Ti.UI.createView({
	backgroundColor:'transparent',
	height:30,
	top:28,
	zIndex:2
});
addPlaceFieldsBackground.add(addPlaceCategoryBackground);
addPlaceCategoryBackground.addEventListener('click', handleCategoryButton);

//category label
var addPlaceCategoryLabel = Ti.UI.createLabel({
	text:'Category',
	color:'999999',
	textAlign:'left',
	left:13,
	width:180,
	height:30,
	zIndex:2,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addPlaceCategoryBackground.add(addPlaceCategoryLabel);

//button to show 
var addPlaceCategoryButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'add_place/arrow.png',
	top:10,
	right:13,	
    width:13,
    height:13
});
addPlaceCategoryBackground.add(addPlaceCategoryButton);

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
    borderBottom:false,
    zIndex:2
}); 
addPlaceWindow.add(addPlaceToolbar);

//picker
var addPlacePicker = Ti.UI.createPicker({
	bottom:-216,
  	selectionIndicator:true,
  	zIndex:2
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
	addPlaceCategoryLabel.color = 'black';
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
		alert(getLocalMessage(MSG_ADD_PLACE_NO_NAME));
		return false;
	}else if(addPlaceCategoryLabel.id == null){
		alert(getLocalMessage(MSG_ADD_PLACE_NO_CATEGORY));
		return false;
	}else if(addPlaceObject.photo == null){
		alert(getLocalMessage(MSG_ADD_PLACE_NO_PHOTO));
		return false;
	}
	
	addPlaceObject.name = addPlaceTxtFieldName.value;
	addPlaceObject.category_id = addPlaceCategoryLabel.id;
	addPlaceObject.longitude = userObject.lon;
	addPlaceObject.latitude = userObject.lat;
	
	return true;
}

//handle photo button
function addPlaceShowPhotoOptions(){
	addPlacePhotoDialog.show();
}

//handle camera selection
function handlePlaceCameraSelection(){
	Titanium.Media.showCamera({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Preview thumbnail
			var imageThumbnailPreview = image.imageAsResized(320,320);
			addPlaceImagePreview.image = imageThumbnailPreview;
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			addPlaceObject.photo = compressedImage;
			addPlaceObject.thumb = imageThumbnail;
			
			var uniquePlaceFilename = new Date().getTime() + '.jpg';
			addPlaceObject.photo_filename = uniquePlaceFilename;
			
			
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}	

//handle photo selection
function handlePlacePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Preview thumbnail
			var imageThumbnailPreview = image.imageAsResized(320,320);
			addPlaceImagePreview.image = imageThumbnailPreview;
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			addPlaceObject.photo = compressedImage;
			addPlaceObject.thumb = imageThumbnail;
			
			var uniquePlaceFilename = new Date().getTime() + '.jpg';
			addPlaceObject.photo_filename = uniquePlaceFilename;
			
			
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}

//Validates the add place form and submits to the server
function handleAddPlaceSaveButton(){
	if(validatePlaceForm()){
		Ti.API.info('Add place form is valid');
		doSavePlaceOnline(addPlaceObject);
	}else{
		Ti.API.info('Add place form is not valid');
	}
}

//Server call for saving places
function doSavePlaceOnline(pObj){
	Ti.API.info('doSavePlaceOnline() called with userObject='+JSON.stringify(userObject) + ' and place '+JSON.stringify(pObj)); 	
	
	//progress view
	var progressView = new ProgressView({window:addPlaceWindow});
	progressView.show({
		text:"Saving..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSavePlaceOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSavePlaceOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			Ti.API.info('doSavePlaceOnline() got back place id from server '+jsonData.data.place_id);
			
			//Show success
			progressView.change({
		        success:true
		    });
			
			//Add the server place id to the object
			pObj.place_id = jsonData.data.place_id;
			
			//Hide message and close register window
			progressView.hide();
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Open the place view
			Ti.include('ui/iphone/place_view.js');
			var placeCheckinView = buildCheckinPlaceView(jsonData.data.place_id);
			var placeCheckinWindow = Ti.UI.createWindow({
				backgroundColor:'white',
				//barImage:IMAGE_PATH+'common/bar.png',
				translucent:false,
				barColor:UI_COLOR,
				title:pObj.name
			});
			
			//back button & event listener
			var placeCheckinBackButton = Ti.UI.createButton({
			    backgroundImage: IMAGE_PATH+'common/back_button.png',
			    width:48,
			    height:33
			});
			
			placeCheckinWindow.setLeftNavButton(placeCheckinBackButton);
			placeCheckinBackButton.addEventListener("click", function() {
			    navController.close(placeCheckinWindow);
			});
			
			placeCheckinWindow.add(placeCheckinView);
		
			//remove checkin window from the navigation stack
			placeCheckinWindow.addEventListener('focus', function(){
				var checkinWindowIndex = openWindows.length-2;
				navController.close(openWindows[checkinWindowIndex], {animated:false});
			});
			
			openWindows.push(placeCheckinWindow);
			navController.open(placeCheckinWindow);
			//End open the place view
			
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'addPlace');
	xhr.send({
		user_id:userObject.userId,
		photo:pObj.photo,
		thumb:pObj.thumb,
		name:pObj.name,
		latitude:pObj.latitude,
		longitude:pObj.longitude,
		category_id:pObj.category_id,
		token:userObject.token
	});
}