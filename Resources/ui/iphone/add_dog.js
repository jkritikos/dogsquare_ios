var viewAddDog = null;
var addDogScrollBackground = null;
var addDogSaveButton = null;
var imageThumbnailPreviewImageView = null;
var addDogFormBackgroundView = null;
var addDogFieldName = null;
var addDogFieldNameHintTextLabel = null;
var addDogFieldDogBreedHintTextLabel = null;
var addDogFieldAge = null;
var addDogFieldAgeHintTextLabel = null;
var addDogFieldSizeHintTextLabel = null;
var addDogFieldGenderHintTextLabel = null;
var addDogFieldMattingHintTextLabel = null;
var addDogToolbar = null;
var addDogPicker = null;
var addDogPhotoDialog = null;
var addDogPickerBackground = null;
var addDogToolbarLabel = null;

//picker data
var genderPicker = [];
var dogBreedPicker = [];
var sizePicker = [];
var mattingPicker = [];

//constants
var DOG_BREED_PICKER = 1;
var GENDER_PICKER = 2;
var MATTING_PICKER = 3;
var SIZE_PICKER = 4;

var selectedPickerDogBreed = 0;
var selectedPickerSize = 0;
var selectedPickerGender = 0;
var selectedPickerMating = 0;

//UI components
var addDogPickerType = null;

var ADD_DOG_USE = 1;
var EDIT_DOG_USE = 2;

var editDogId = null;

var addDogInteractionType = ADD_DOG_USE;
var viewAddDogTargetMode = null;

var addDogObject = {};
var dogBreedIndexes = [];

CURRENT_VIEW = VIEW_ADD_DOG;

function builAddDogView(windowMode){
	if(viewAddDog == null){
		viewAddDogTargetMode = windowMode;
		
		//Add dog view
		viewAddDog = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
			
		//Add dog view
		addDogScrollBackground = Ti.UI.createScrollView();
		
		// save button
	    addDogSaveButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/save_button.png',
		    width:54,
		    height:34
		});
		addDogSaveButton.addEventListener('click', handleAddDogSaveButton);
		
		if(viewAddDogTargetMode == TARGET_MODE_REUSE){
	    	Ti.API.info('load add_dog.js - target mode is REUSE');
	    	navController.getWindow().setRightNavButton(addDogSaveButton);
	    } else {
	    	Ti.API.info('load add_dog.js - target mode is NEW WIN');
	    	openWindows[openWindows.length-1].setRightNavButton(addDogSaveButton);
	    }
		
		//photo button
		var addDogPhotoButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'add_dog/place_photo.png',
			width:104,
			height:101,
			top:19
		});
		
		//photo button preview image
		imageThumbnailPreviewImageView = Ti.UI.createImageView({
			processed:false,
			zIndex:3
		});
		
		if(viewAddDogTargetMode == TARGET_MODE_NEW_WINDOW) {
			imageThumbnailPreviewImageView.addEventListener('load', function(){
				Ti.API.info('EDIT Profile image loaded event');
				
				if(!imageThumbnailPreviewImageView.processed){
					var dogProfileImageViewBlob = dogProfilePhotoImage.toBlob();
					
					//Resizing imageAsResized
					var dogProfileImageBlobCropped = dogProfileImageViewBlob.imageAsThumbnail(94,0,47);
					imageThumbnailPreviewImageView.image = dogProfileImageBlobCropped;
					
					imageThumbnailPreviewImageView.processed = true;
					
					Ti.API.info('EDIT DOg profile image loaded event processing. Image height:'+dogProfileImageViewBlob.height+' width '+dogProfileImageViewBlob.width + ' cropped to height '+dogProfileImageBlobCropped.height + ' and width '+dogProfileImageBlobCropped.width);
				}
			});
		}
		
		addDogPhotoButton.add(imageThumbnailPreviewImageView);
		
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
		addDogFormBackgroundView = Ti.UI.createView({
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
		addDogFieldName = Ti.UI.createTextField({
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
		
		//check if it is adding a dog or editing a dog - change functionality
		if(viewAddDogTargetMode == TARGET_MODE_REUSE) {
			//Event listener for the name textfield
			addDogFieldName.addEventListener('return', function() {
			    addDogFieldDogBreedHintTextLabel.fireEvent('click');
			    addDogScrollBackground.scrollTo(0,40);
			});
		}else{
			addDogFieldName.returnKeyType = Ti.UI.RETURNKEY_RETURN;
		}
		
		addDogFormBackgroundView.add(addDogFieldName);
		
		//Name textfield label
		addDogFieldNameHintTextLabel = Ti.UI.createLabel({
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
		addDogFieldDogBreedHintTextLabel = Ti.UI.createLabel({
			text:'Dog Breed or Stray*',
			picker:DOG_BREED_PICKER,
			color:'999999',
			textAlign:'left',
			top:addDogFieldName.top + addDogTxtFieldOffset,
			width:addDogTxtFieldWidth-9,
			left:4,
			height:addDogTxtFieldHeight,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		addDogFormBackgroundView.add(addDogFieldDogBreedHintTextLabel);
		addDogFieldDogBreedHintTextLabel.addEventListener('click', addDogHandlePicker);
		
		//Age textfield
		addDogFieldAge = Ti.UI.createTextField({
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
		
		if(viewAddDogTargetMode == TARGET_MODE_REUSE) {
			//Event listener for the age textfield
			addDogFieldAge.addEventListener('return', function() {
			   addDogFieldSizeHintTextLabel.fireEvent('click');
			   addDogScrollBackground.scrollTo(0,107);
			});
		}else{
			addDogFieldAge.returnKeyType = Ti.UI.RETURNKEY_RETURN;
		}
		
		addDogFormBackgroundView.add(addDogFieldAge);
		
		//Age textfield label
		addDogFieldAgeHintTextLabel = Ti.UI.createLabel({
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
		addDogFieldSizeHintTextLabel = Ti.UI.createLabel({
			text:'Size*',
			picker:SIZE_PICKER,
			left:4,
			color:'999999',
			textAlign:'left',
			top:addDogFieldAge.top + addDogTxtFieldOffset,
			width:addDogTxtFieldWidth-9,
			height:addDogTxtFieldHeight,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		addDogFormBackgroundView.add(addDogFieldSizeHintTextLabel);
		addDogFieldSizeHintTextLabel.addEventListener('click', addDogHandlePicker);
		
		//Gender textfield label
		addDogFieldGenderHintTextLabel = Ti.UI.createLabel({
			text:'Gender*',
			picker:GENDER_PICKER,
			color:'999999',
			textAlign:'left',
			top:addDogFieldSizeHintTextLabel.top + addDogTxtFieldOffset,
			width:addDogTxtFieldWidth-9,
			height:addDogTxtFieldHeight,
			left:4,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		addDogFormBackgroundView.add(addDogFieldGenderHintTextLabel);
		addDogFieldGenderHintTextLabel.addEventListener('click', addDogHandlePicker);
		
		//Matting textfield label
		addDogFieldMattingHintTextLabel = Ti.UI.createLabel({
			text:'Mating*',
			picker:MATTING_PICKER,
			color:'999999',
			textAlign:'left',
			top:addDogFieldGenderHintTextLabel.top + addDogTxtFieldOffset,
			width:addDogTxtFieldWidth-9,
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
		
		addDogPickerBackground = Titanium.UI.createView({
		    height:260,
		    bottom:-260
		}); 
		viewAddDog.add(addDogPickerBackground);
		
		addDogToolbarLabel = Ti.UI.createLabel({
		    color:'black',
		    left:16
		}); 
		
		addDogToolbar = Titanium.UI.iOS.createToolbar({
		    items:[addDogToolbarLabel, addDogFlexSpace, addDogPickerDoneButton],
		    barColor:'999999',
		    top:0,
		    borderTop:true,
		    borderBottom:false
		}); 
		addDogPickerBackground.add(addDogToolbar);
		
		//picker
		addDogPicker = Ti.UI.createPicker({
		  bottom:0
		});
		addDogPickerBackground.add(addDogPicker);
		addDogPicker.addEventListener("change", handleAddDogPickerChange);
		
		//data for gender picker
		genderPicker[0]=Ti.UI.createPickerRow({title:'Male', id:1});
		genderPicker[1]=Ti.UI.createPickerRow({title:'Female', id:2});
		addDogPicker.add(genderPicker);
		
		//data for dog breeds picker
		var addDogViewBreeds = getDogBreeds();
		
		//Ti.API.info('------ add dog breeds:  '+addDogViewBreeds.length);
		for(i=0;i<addDogViewBreeds.length;i++){
			
			//Ti.API.info('------ breed '+addDogViewBreeds[i].name);
			
			var name = addDogViewBreeds[i].name;
			var id = addDogViewBreeds[i].id;
			
			if(!isStringNullOrEmpty(name)){
				dogBreedPicker[i]=Ti.UI.createPickerRow({title:name, id:id});
				dogBreedIndexes[id] = i;
			}
			
		}
		
		//data for size picker
		sizePicker[0]=Ti.UI.createPickerRow({title:'Small', id:1});
		sizePicker[1]=Ti.UI.createPickerRow({title:'Medium', id:2});
		sizePicker[2]=Ti.UI.createPickerRow({title:'Large', id:3});
		sizePicker[3]=Ti.UI.createPickerRow({title:'X-Large', id:4});
		
		//data for mating picker
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
		addDogPhotoDialog = Titanium.UI.createOptionDialog({
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
	}
}

//handle picker data and animation
function addDogHandlePicker(e){
	
	//clear all picker rows method
    clearPickerRows();
    
    addDogFieldName.blur();
	addDogFieldAge.blur();
	
    var picker = e.source.picker;
    //add data for specified picker
	if(picker === DOG_BREED_PICKER){
		addDogToolbarLabel.text = 'Dog Breed or Stray';
		addDogScrollBackground.scrollTo(0,IPHONE5 ?  0 : 60);
		addDogPicker.add(dogBreedPicker);
		
		addDogPicker.setSelectedRow(0, dogBreedIndexes[selectedPickerDogBreed], false);
	}else if(picker === GENDER_PICKER){
		addDogToolbarLabel.text = 'Gender';
		addDogPicker.add(genderPicker);
		addDogScrollBackground.scrollTo(0,IPHONE5 ?  95 : 183);
		
		addDogPicker.setSelectedRow(0, selectedPickerGender-1, false);
	}else if(picker === MATTING_PICKER){
		addDogToolbarLabel.text = 'Mating';
		addDogPicker.add(mattingPicker);
		addDogScrollBackground.scrollTo(0,IPHONE5 ?  136 : 224);
		
		addDogPicker.setSelectedRow(0, selectedPickerMating-1, false);
	}else if(picker === SIZE_PICKER){
		addDogToolbarLabel.text = 'Size';
		addDogPicker.add(sizePicker);
		addDogScrollBackground.scrollTo(0,IPHONE5 ?  54 : 142);
		
		addDogPicker.setSelectedRow(0, selectedPickerSize-1, false);
	}
	
	addDogPicker.selectionIndicator = true;
	addDogPickerBackground.animate({bottom:0, duration:500});
	
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
	
	addDogPickerBackground.animate({bottom:-260, duration:500});
	
	//change text to the chosen picker row
	if(addDogPickerType === DOG_BREED_PICKER){
		addDogFieldDogBreedHintTextLabel.color = 'black';
		addDogFieldDogBreedHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldDogBreedHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldDogBreedHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldDogBreedHintTextLabel.opacity = 1;
		selectedPickerDogBreed = addDogPicker.getSelectedRow(0).id;
		
		if(viewAddDogTargetMode == TARGET_MODE_REUSE) {
			addDogFieldAge.focus();
		}
	}else if(addDogPickerType === GENDER_PICKER){
		addDogFieldGenderHintTextLabel.color = 'black';
		addDogFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldGenderHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldGenderHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldGenderHintTextLabel.opacity = 1;
		selectedPickerGender = addDogPicker.getSelectedRow(0).id;
		
		if(viewAddDogTargetMode == TARGET_MODE_REUSE) {
			addDogFieldMattingHintTextLabel.fireEvent('click');
		}
	}else if(addDogPickerType === MATTING_PICKER){
		addDogFieldMattingHintTextLabel.color = 'black';
		addDogFieldMattingHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldMattingHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldMattingHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldMattingHintTextLabel.opacity = 1;
		selectedPickerMating = addDogPicker.getSelectedRow(0).id;
	}else if(addDogPickerType === SIZE_PICKER){
		addDogFieldSizeHintTextLabel.color = 'black';
		addDogFieldSizeHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldSizeHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldSizeHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
		addDogFieldSizeHintTextLabel.opacity = 1;
		selectedPickerSize = addDogPicker.getSelectedRow(0).id;
		
		if(viewAddDogTargetMode == TARGET_MODE_REUSE) {
			addDogFieldGenderHintTextLabel.fireEvent('click');
		}
	}
}

//handle photo selection
function handlePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Preview thumbnail
			var imageThumbnailPreview = image.imageAsThumbnail(94,0,47);
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
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Preview thumbnail
			var imageThumbnailPreview = image.imageAsThumbnail(94,0,47);
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
			alert(getLocalMessage(MSG_CAMERA_PROBLEM));
		},
		allowEditing:true
	});
}	

function handleAddDogTextFieldFocus(){
	addDogPickerBackground.animate({bottom:-260, duration:500});
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
	
	//progress view
	var progressView = new ProgressView({window:viewAddDog});
	progressView.show({
		text:"Saving..."
	});

	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSaveDogOnline() '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
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
			
			//Hide message and close register window
			progressView.hide();
			
			navController.getWindow().setRightNavButton(rightBtn);
			
			Ti.include('ui/iphone/dog_profile.js');
			var dogProfileView = buildDogProfileView(dObj.dog_id);
		
			navController.getWindow().add(dogProfileView);
			navController.getWindow().setTitle(dObj.name);
			
			closeOpenWindows();
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			//Show the error message we got back from the server
			progressView.change({
		        error:true,
		        text:getErrorMessage(jsonData.data.response)
		    });
			//and hide it after a while		    
		    setTimeout(function() {
			    progressView.hide();
			}, ERROR_MSG_REMOVE_TIMEOUT);
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
		alert(getLocalMessage(MSG_ADD_DOG_NO_NAME));
		return false;
	}else if(addDogFieldDogBreedHintTextLabel.id == null){
		alert(getLocalMessage(MSG_ADD_DOG_NO_BREED));
		return false;
	}else if(isStringNullOrEmpty(addDogFieldAge.value) || isNaN(addDogFieldAge.value) || !isWithinRange(addDogFieldAge.value, 1, 20)){
		alert(getLocalMessage(MSG_ADD_DOG_NO_AGE));
		return false;
	}else if(addDogFieldSizeHintTextLabel.id == null){
		alert(getLocalMessage(MSG_ADD_DOG_NO_SIZE));
		return false;
	}else if(addDogFieldGenderHintTextLabel.id == null){
		alert(getLocalMessage(MSG_ADD_DOG_NO_GENDER));
		return false;
	}else if(addDogFieldMattingHintTextLabel.id == null){
		alert(getLocalMessage(MSG_ADD_DOG_NO_MATING));
		return false;
	}
	
	if(addDogInteractionType == ADD_DOG_USE){
		if(addDogObject.photo == null){
			alert(getLocalMessage(MSG_ADD_DOG_NO_PHOTO));
			return false;
		}
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
		if(addDogInteractionType == ADD_DOG_USE){
			doSaveDogOnline(addDogObject);	
		}else if(addDogInteractionType == EDIT_DOG_USE){
			doEditDogOnline(addDogObject);
		}
	}else{
		Ti.API.info('dog form is not valid');
	}
}

function updateAddDogView(id){
	addDogInteractionType = EDIT_DOG_USE;
	
	editDogId = id;
	
	var dogObj = getDogById(id);
	Ti.API.info('getDogById() returns '+JSON.stringify(dogObj));
	
	imageThumbnailPreviewImageView.image = dogProfilePhotoImage.image;
	
	//update name
	addDogFieldName.value = dogObj[0].name;
	addDogFieldNameHintTextLabel.hide();
	addDogObject.name = dogObj[0].name;
	
	//update dog breed
	addDogFieldDogBreedHintTextLabel.text = dogObj[0].breed;
	addDogFieldDogBreedHintTextLabel.color = 'black';
	addDogFieldDogBreedHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	selectedPickerDogBreed = dogObj[0].breed_id;
	addDogFieldDogBreedHintTextLabel.opacity = 1;
	addDogObject.breed_id = dogObj[0].breed_id;
	addDogFieldDogBreedHintTextLabel.id = dogObj[0].breed_id;
	
	//update age
	addDogFieldAge.value = dogObj[0].age;
	addDogObject.age = dogObj[0].age;
	
	//update size
	var size = getSize(dogObj[0].size);
	
	addDogFieldSizeHintTextLabel.text = size.label;
	addDogFieldSizeHintTextLabel.color = 'black';
	addDogFieldSizeHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	selectedPickerSize = dogObj[0].size;
	addDogFieldSizeHintTextLabel.opacity = 1;
	addDogObject.size = dogObj[0].size;
	addDogFieldSizeHintTextLabel.id = dogObj[0].size;
	
	//update gender
	var genderLabel = '';
	
	if(dogObj[0].gender == 1){
		genderLabel = 'Male';
	}else{
		genderLabel = 'Female';
	}
	
	addDogFieldGenderHintTextLabel.text = genderLabel;
	addDogFieldGenderHintTextLabel.color = 'black';
	addDogFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	selectedPickerGender = dogObj[0].gender;
	addDogFieldGenderHintTextLabel.opacity = 1;
	addDogObject.gender = dogObj[0].gender;
	addDogFieldGenderHintTextLabel.id = dogObj[0].gender;
	
	//update mating
	var matingLabel = '';
	
	if(dogObj[0].mating == 1){
		matingLabel = 'Yes';
	}else{
		matingLabel = 'No';
	}
	
	addDogFieldMattingHintTextLabel.text = matingLabel;
	addDogFieldMattingHintTextLabel.color = 'black';
	addDogFieldMattingHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	selectedPickerMating = dogObj[0].mating;
	addDogFieldMattingHintTextLabel.opacity = 1;
	addDogObject.mating = dogObj[0].mating;
	addDogFieldMattingHintTextLabel.id = dogObj[0].mating;
	
	addDogObject.weight = 0;
}

//Server call to edit dog profile
function doEditDogOnline(dObj){
	Ti.API.info('doEditDogOnline() called with dogObject='+dObj + 'and dog_id=' + editDogId); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doEditDogOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('doEditDogOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Add the server dog id to the object
			dObj.dog_id = editDogId;
			if(jsonData.data.thumb){
				dObj.thumb_path = jsonData.data.thumb;
			}
			
			Ti.API.info('doEditDogOnline() got back dog id from server '+jsonData.data.dog_id);
			editDogLocal(dObj);
			
			/*var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);*/
			//populate right menu dogs
			populateRightMenu(getDogs());
			
			navController.getWindow().setRightNavButton(rightBtn);
			
			Ti.include('ui/iphone/dog_profile.js');
			var dogProfileView = buildDogProfileView(dObj.dog_id);
		
			navController.getWindow().add(dogProfileView);
			closeOpenWindows();
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'editDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:editDogId,
		photo:dObj.photo,
		thumb:dObj.thumb,
		name:dObj.name,
		weight:dObj.weight,
		size:dObj.size,
		age:dObj.age,
		breed_id:dObj.breed_id,
		gender:dObj.gender,
		mating:dObj.mating,
		edit:true,
		token:userObject.token
	});
}

function handleAddDogPickerChange(e){
	if(addDogPickerType == DOG_BREED_PICKER){
		addDogFieldDogBreedHintTextLabel.color = 'black';
		addDogFieldDogBreedHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldDogBreedHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldDogBreedHintTextLabel.opacity = 1;
		addDogFieldDogBreedHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
	}else if(addDogPickerType == GENDER_PICKER){
		addDogFieldGenderHintTextLabel.color = 'black';
		addDogFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldGenderHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldGenderHintTextLabel.opacity = 1;
		addDogFieldGenderHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
	}else if(addDogPickerType == MATTING_PICKER){
		addDogFieldMattingHintTextLabel.color = 'black';
		addDogFieldMattingHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldMattingHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldMattingHintTextLabel.opacity = 1;
		addDogFieldMattingHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
	}else if(addDogPickerType == SIZE_PICKER){
		addDogFieldSizeHintTextLabel.color = 'black';
		addDogFieldSizeHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addDogFieldSizeHintTextLabel.text = addDogPicker.getSelectedRow(0).title;
		addDogFieldSizeHintTextLabel.opacity = 1;
		addDogFieldSizeHintTextLabel.id = addDogPicker.getSelectedRow(0).id;
	}
}