//Add dog view
var viewAddDog = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

//constants
var DOG_BREED_PICKER = 1;
var GENDER_PICKER = 2;
var MATTING_PICKER = 3;
var SIZE_PICKER = 4;

//UI components
var addDogPickerType = null;

var addDogObject = {};

//Add dog view
var addDogScrollBackground = Ti.UI.createScrollView();

// save button
var addDogSaveButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/save_button.png',
    width:54,
    height:34
});
navController.getWindow().setRightNavButton(addDogSaveButton);
addDogSaveButton.addEventListener('click', handleAddDogSaveButton);

//photo button preview image
var imageThumbnailPreviewImageView = Ti.UI.createImageView({
	borderRadius:39,
	top:30,
	zIndex:10
});

addDogScrollBackground.add(imageThumbnailPreviewImageView);

//photo button
var addDogPhotoButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'add_dog/place_photo.png',
	width:104,
	height:101,
	top:19
});

//photo label
var addDogPhotoLabel = Ti.UI.createLabel({
	text:'Dog\'s Photo Here!',
	bottom:9,
	textAlign:'center',
	width:55,
	height:30,
	color:'black',
	opacity:0.6,
	font:{fontSize:9, fontWeight:'bold', fontFamily:'Open Sans'}
});
addDogPhotoButton.add(addDogPhotoLabel);

addDogScrollBackground.add(addDogPhotoButton);
addDogPhotoButton.addEventListener('click', addDogShowPhotoOptions);

//Scroll background 
var addDogFormBackgroundView = Ti.UI.createView({
	backgroundColor:'e7e6e6',
	top:133,
	width:262,
	height:247
});
addDogScrollBackground.add(addDogFormBackgroundView);
viewAddDog.add(addDogScrollBackground);

var addDogTxtFieldOffset = 41;
var addDogTxtFieldHeight = 39;
var addDogTxtFieldWidth = 262;

//Name textfield
var addDogFieldName = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:1,
	paddingLeft:4, 
	paddingRight:4, 
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:1,
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldName.addEventListener('focus', handleAddDogTextFieldFocus);
addDogFieldName.addEventListener('change', handleAddDogTextFieldChange);
addDogFieldName.addEventListener('blur', handleAddDogTextFieldBlur);

//Event listener for the name textfield
addDogFieldName.addEventListener('return', function() {
    addDogFieldDogBreedHintTextLabel.fireEvent('click');
    addDogScrollBackground.scrollTo(0,40);
});

addDogFormBackgroundView.add(addDogFieldName);

//Name textfield label
var addDogFieldNameHintTextLabel = Ti.UI.createLabel({
	text:'Name*',
	color:'999999',
	textAlign:'left',
	left:4,
	width:80,
	height:30,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldName.add(addDogFieldNameHintTextLabel);

//Dog Breed textfield label
var addDogFieldDogBreedHintTextLabel = Ti.UI.createLabel({
	text:'Dog Breed*',
	picker:DOG_BREED_PICKER,
	color:'999999',
	textAlign:'left',
	top:addDogFieldName.top + addDogTxtFieldOffset,
	width:addDogTxtFieldWidth,
	left:4,
	height:addDogTxtFieldHeight,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFormBackgroundView.add(addDogFieldDogBreedHintTextLabel);
addDogFieldDogBreedHintTextLabel.addEventListener('click', addDogHandlePicker);

//Age textfield
var addDogFieldAge = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:addDogFieldDogBreedHintTextLabel.top + addDogTxtFieldOffset,
	paddingLeft:4, 
	paddingRight:4, 
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:3,
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldAge.addEventListener('focus', handleAddDogTextFieldFocus);
addDogFieldAge.addEventListener('change', handleAddDogTextFieldChange);
addDogFieldAge.addEventListener('blur', handleAddDogTextFieldBlur);

//Event listener for the age textfield
addDogFieldAge.addEventListener('return', function() {
   addDogFieldSizeHintTextLabel.fireEvent('click');
   addDogScrollBackground.scrollTo(0,107);
});

addDogFormBackgroundView.add(addDogFieldAge);

//Age textfield label
var addDogFieldAgeHintTextLabel = Ti.UI.createLabel({
	text:'Age*',
	color:'999999',
	textAlign:'left',
	left:4,
	width:80,
	height:30,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldAge.add(addDogFieldAgeHintTextLabel);

//Weight textfield label
var addDogFieldSizeHintTextLabel = Ti.UI.createLabel({
	text:'Size*',
	picker:SIZE_PICKER,
	left:4,
	color:'999999',
	textAlign:'left',
	top:addDogFieldAge.top + addDogTxtFieldOffset,
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFormBackgroundView.add(addDogFieldSizeHintTextLabel);
addDogFieldSizeHintTextLabel.addEventListener('click', addDogHandlePicker);

//Gender textfield label
var addDogFieldGenderHintTextLabel = Ti.UI.createLabel({
	text:'Gender*',
	picker:GENDER_PICKER,
	color:'999999',
	textAlign:'left',
	top:addDogFieldSizeHintTextLabel.top + addDogTxtFieldOffset,
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	left:4,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFormBackgroundView.add(addDogFieldGenderHintTextLabel);
addDogFieldGenderHintTextLabel.addEventListener('click', addDogHandlePicker);

//Matting textfield label
var addDogFieldMattingHintTextLabel = Ti.UI.createLabel({
	text:'Mating*',
	picker:MATTING_PICKER,
	color:'999999',
	textAlign:'left',
	top:addDogFieldGenderHintTextLabel.top + addDogTxtFieldOffset,
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	left:4,
	font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFormBackgroundView.add(addDogFieldMattingHintTextLabel);
addDogFieldMattingHintTextLabel.addEventListener('click', addDogHandlePicker);

//picker done button
var addDogPickerDoneButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/Done_button.png',
    width:54,
    height:34
});
addDogPickerDoneButton.addEventListener("click", handlePickerDoneButton);

var addDogFlexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var addDogToolbar = Titanium.UI.iOS.createToolbar({
    items:[addDogFlexSpace, addDogPickerDoneButton],
    barColor:'999999',
    bottom:-44,
    borderTop:true,
    borderBottom:false
}); 
viewAddDog.add(addDogToolbar);

//picker
var addDogPicker = Ti.UI.createPicker({
  bottom:-216
});
viewAddDog.add(addDogPicker);

//picker data
var genderPicker = [];

genderPicker[0]=Ti.UI.createPickerRow({title:'Male', id:1});
genderPicker[1]=Ti.UI.createPickerRow({title:'Female', id:2});

var dogBreedPicker = [];
var addDogViewBreeds = getDogBreeds();

//Ti.API.info('------ add dog breeds:  '+addDogViewBreeds.length);
for(i=0;i<addDogViewBreeds.length;i++){
	
	//Ti.API.info('------ breed '+addDogViewBreeds[i].name);
	
	var name = addDogViewBreeds[i].name;
	var id = addDogViewBreeds[i].id;
	
	if(!isStringNullOrEmpty(name)){
		dogBreedPicker[i]=Ti.UI.createPickerRow({title:name, id:id});
	}
	
}

var sizePicker = [];

sizePicker[0]=Ti.UI.createPickerRow({title:'S', id:1});
sizePicker[1]=Ti.UI.createPickerRow({title:'M', id:2});
sizePicker[2]=Ti.UI.createPickerRow({title:'L', id:3});
sizePicker[3]=Ti.UI.createPickerRow({title:'XL', id:4});

var mattingPicker = [];
	
mattingPicker[0]=Ti.UI.createPickerRow({title:'Yes', id:1});
mattingPicker[1]=Ti.UI.createPickerRow({title:'No', id:2});

//sepparator offset
var sepparatorOffset = 0;

//creation of sepparators
for(var i=0; i<=5; i++) {
	var addDogSepparator = Ti.UI.createView({
		backgroundColor:'CCCCCC',
		width:addDogTxtFieldWidth,
		height:2,
		top:40 + sepparatorOffset,
		opacity:0.4
	});
	addDogFormBackgroundView.add(addDogSepparator);
	
	sepparatorOffset += 41;
}

//photo dialog
var addDogPhotoDialog = Titanium.UI.createOptionDialog({
	options:['Take Photo', 'Choose From Library', 'Cancel'],
	cancel:2
});

//photo dialog event listener
addDogPhotoDialog.addEventListener('click',function(e){
	if(e.index == 0){
		handleCameraSelection();
	} else if(e.index == 1){
		handlePhotoSelection();
	}
});

//handle picker data and animation
function addDogHandlePicker(e){
	//clear all picker rows method
    clearPickerRows();
    
    addDogFieldName.blur();
	addDogFieldAge.blur();
	
    
    var picker = e.source.picker;
    //add data for specified picker
	if(picker === DOG_BREED_PICKER){
		addDogScrollBackground.scrollTo(0,60);
		addDogPicker.add(dogBreedPicker);
	}else if(picker === GENDER_PICKER){
		addDogPicker.add(genderPicker);
		addDogScrollBackground.scrollTo(0,183);
	}else if(picker === MATTING_PICKER){
		addDogPicker.add(mattingPicker);
		addDogScrollBackground.scrollTo(0,224);
	}else if(picker === SIZE_PICKER){
		addDogPicker.add(sizePicker);
		addDogScrollBackground.scrollTo(0,142);
	}
	
	addDogPicker.selectionIndicator = true;
	addDogPicker.animate({bottom:0, duration:500});
	addDogToolbar.animate({bottom:216, duration:500});
	
	addDogPickerType = picker;
}

//clear all picker rows
function clearPickerRows(){
	if (addDogPicker.getColumns()[0]) {
 
        var _col = addDogPicker.getColumns()[0];
	    var len  = _col.rowCount;
 
	    for (var x = len - 1; x >= 0; x--) {
                var _row = _col.rows[x];
                _col.removeRow(_row);
        }
    }
}

//handle photo button
function addDogShowPhotoOptions(){
	addDogPhotoDialog.show();
}

//handle picker done button
function handlePickerDoneButton(e){
	addDogScrollBackground.scrollTo(0,0);
	Ti.API.info('inside picker');
	
	addDogPicker.animate({bottom:-216, duration:500});
	addDogToolbar.animate({bottom:-44, duration:500});
 	navController.getWindow().setRightNavButton(addDogSaveButton);
	
	//change text to the chosen picker row
	if(addDogPickerType === DOG_BREED_PICKER){
		addDogFieldDogBreedHintTextLabel.color = 'black';
		addDogFieldDogBreedHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldDogBreedHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldDogBreedHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldDogBreedHintTextLabel.opacity = 1;
		addDogFieldAge.focus();
	}else if(addDogPickerType === GENDER_PICKER){
		addDogFieldGenderHintTextLabel.color = 'black';
		addDogFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldGenderHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldGenderHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldGenderHintTextLabel.opacity = 1;
		addDogFieldMattingHintTextLabel.fireEvent('click');
	}else if(addDogPickerType === MATTING_PICKER){
		addDogFieldMattingHintTextLabel.color = 'black';
		addDogFieldMattingHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldMattingHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldMattingHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldMattingHintTextLabel.opacity = 1;
	}else if(addDogPickerType === SIZE_PICKER){
		addDogFieldSizeHintTextLabel.color = 'black';
		addDogFieldSizeHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldSizeHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldSizeHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldSizeHintTextLabel.opacity = 1;
		addDogFieldGenderHintTextLabel.fireEvent('click');
	}
}

//handle photo selection
function handlePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Preview thumbnail
			var imageThumbnailPreview = image.imageAsThumbnail(78,0,39);
			imageThumbnailPreviewImageView.image = imageThumbnailPreview;
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			addDogObject.photo = compressedImage;
			addDogObject.thumb = imageThumbnail;
			
			var timestamp = new Date().getTime();
			var uniqueDogFilename = timestamp + '.jpg';
			var uniqueDogFilenameThumb = 'thumb_' + timestamp + '.jpg';
			
			addDogObject.photo_filename = uniqueDogFilename;
			addDogObject.thumb_filename = uniqueDogFilenameThumb;
			
			//save images on the local filesystem
			var filename = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilename;
			var filenameThumb = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilenameThumb;
			
			var tmpImage = Titanium.Filesystem.getFile(filename);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(filenameThumb);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(imageThumbnail);
			
			Ti.API.info('saved image to '+filename);
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}

//handle camera selection
function handleCameraSelection(){
	Titanium.Media.showCamera({
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			addDogObject.photo = compressedImage;
			addDogObject.thumb = imageThumbnail;
			
			var timestamp = new Date().getTime();
			var uniqueDogFilename = timestamp + '.jpg';
			var uniqueDogFilenameThumb = 'thumb_' + timestamp + '.jpg';
			
			addDogObject.photo_filename = uniqueDogFilename;
			addDogObject.thumb_filename = uniqueDogFilenameThumb;
			
			//save images on the local filesystem
			var filename = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilename;
			var filenameThumb = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilenameThumb;
			
			var tmpImage = Titanium.Filesystem.getFile(filename);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(filenameThumb);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(imageThumbnail);
			
			Ti.API.info('saved image to '+filename);
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}	

function handleAddDogTextFieldFocus(){
	addDogPicker.animate({bottom:-216, duration:500});
	addDogToolbar.animate({bottom:-44, duration:500});
	
	navController.getWindow().setRightNavButton(addDogSaveButton);
}

//handle all textfields when changed
function handleAddDogTextFieldChange(e){
	var field = e.source.field;
	
	if(field == 1){
		if(addDogFieldName.value != ''){
			addDogFieldNameHintTextLabel.hide();
		}else {
			addDogFieldNameHintTextLabel.show();
		}
	}else if(field == 3){
		if(addDogFieldAge.value != ''){
			addDogFieldAgeHintTextLabel.hide();
		}else {
			addDogFieldAgeHintTextLabel.show();
		}
	}
}

//handle all textfields when not focused
function handleAddDogTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 1){
		if(addDogFieldName.value == ''){
			addDogFieldNameHintTextLabel.show();
		}
	}else if(field == 3){
		if(addDogFieldAge.value == ''){
			addDogFieldAgeHintTextLabel.show();
		}
	}
}

//Server call for saving dogs
function doSaveDogOnline(dObj){
	Ti.API.info('doSaveDogOnline() called with dogObject='+dObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSaveDogOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSaveDogOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Add the server dog id to the object
			dObj.dog_id = jsonData.data.dog_id;
			dObj.thumb_path = jsonData.data.thumb;
			
			Ti.API.info('doSaveDogOnline() got back dog id from server '+jsonData.data.dog_id);
			saveDog(dObj);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			//populate right menu dogs
			populateRightMenu(getDogs());
			
			navController.getWindow().setRightNavButton(rightBtn);
			
			Ti.include('ui/iphone/dog_profile.js');
			var dogProfileView = buildDogProfileView(dObj.dog_id);
		
			navController.getWindow().add(dogProfileView);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'addDog');
	xhr.send({
		user_id:userObject.userId,
		photo:dObj.photo,
		thumb:dObj.thumb,
		name:dObj.name,
		weight:dObj.weight,
		size:dObj.size,
		age:dObj.age,
		breed_id:dObj.breed_id,
		gender:dObj.gender,
		mating:dObj.mating,
		token:userObject.token
	});
}

function validateDogForm(){
	if(isStringNullOrEmpty(addDogFieldName.value)){
		alert('NAME IS MISSING');
		return false;
	}else if(addDogFieldDogBreedHintTextLabel.id == null){
		alert('DOG BREED IS MISSING');
		return false;
	}else if(isStringNullOrEmpty(addDogFieldAge.value) || isNaN(addDogFieldAge.value)){
		alert('AGE IS MISSING OR NOT A NUMBER');
		return false;
	} else if(addDogFieldSizeHintTextLabel.id == null){
		alert('WEIGHT IS MISSING');
		return false;
	}else if(addDogFieldGenderHintTextLabel.id == null){
		alert('GENDER IS MISSING');
		return false;
	}else if(addDogFieldMattingHintTextLabel.id == null){
		alert('MATTING IS MISSING');
		return false;
	}else if(addDogObject.photo == null){
		alert('PROFILE PHOTO MISSING');
		return false;
	}
	
	addDogObject.name = addDogFieldName.value;
	addDogObject.breed_id = addDogFieldDogBreedHintTextLabel.id;
	addDogObject.age = addDogFieldAge.value;
	addDogObject.weight = 0;
	addDogObject.size = addDogFieldSizeHintTextLabel.id;
	addDogObject.gender = addDogFieldGenderHintTextLabel.id;
	addDogObject.mating = addDogFieldMattingHintTextLabel.id;
	
	return true;
}

function handleAddDogSaveButton(){
	
	if(validateDogForm()){
		Ti.API.info('dog form is valid');
		doSaveDogOnline(addDogObject);	
	}else{
		Ti.API.info('dog form is not valid');
	}
}
