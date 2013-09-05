var addPlaceWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR,
	title:'Add Place'
});

var addPlaceObject = {};

//done button for picker
var addPlacePickerDoneButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/Done_button.png',
    width:58,
    height:29
});
addPlacePickerDoneButton.addEventListener("click", handlePickerDoneButton);

//save button
var addPlaceSaveButton = Ti.UI.createButton({
    title:'Save',
    width:48,
    height:33
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

pickerCategories[0]=Ti.UI.createPickerRow({title:'park', id:1});
pickerCategories[1]=Ti.UI.createPickerRow({title:'homeless', id:2});
pickerCategories[2]=Ti.UI.createPickerRow({title:'cruelty', id:3});
pickerCategories[3]=Ti.UI.createPickerRow({title:'pet shop', id:4});
pickerCategories[4]=Ti.UI.createPickerRow({title:'veterinary', id:5});
pickerCategories[5]=Ti.UI.createPickerRow({title:'dog hospital', id:6});
pickerCategories[6]=Ti.UI.createPickerRow({title:'other', id:7});

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
	addPlaceWindow.setRightNavButton(addPlacePickerDoneButton);
}

//handle picker done button
function handlePickerDoneButton(){
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
	addPlaceObject.longitude = 2345234;
	addPlaceObject.latitude = 4635634;
	
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