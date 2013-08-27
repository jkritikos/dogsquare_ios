//Add dog view
var viewAddDog = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

//constants
var DOG_BREED_PICKER = 1;
var GENDER_PICKER = 2;
var MATTING_PICKER = 3;

//UI components
var addDogPickerType = null;

var addDogObject = {};

// done button
var addDogDoneButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/Done_button.png',
    width:58,
    height:29
});
navController.getWindow().setRightNavButton(addDogDoneButton);
addDogDoneButton.addEventListener('click', handleAddDogDoneClick);

//form field
var addDogFormFieldImage = Ti.UI.createImageView({ 
	image:IMAGE_PATH+'add_dog/form_field.png',
	top:12
});
viewAddDog.add(addDogFormFieldImage);

//photo button
var addDogPhotoButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'signup/place_photo.png',
	width:109,
	height:91,
	top:30
});

viewAddDog.add(addDogPhotoButton);
addDogPhotoButton.addEventListener('click', addDogShowPhotoOptions);

//photo label
var addDogPhotoLabel = Ti.UI.createLabel({
	text:'Dog\'s Photo Here!',
	bottom:9,
	textAlign:'center',
	width:50,
	height:30,
	color:'black',
	font:{fontSize:8, fontWeight:'semibold', fontFamily:'Open Sans'}
});
addDogPhotoButton.add(addDogPhotoLabel);

//Scroll background 
var addDogFormScrollBackground = Ti.UI.createScrollView({
	backgroundColor:'e7e6e6',
	top:119,
	width:196,
	height:205
});
addDogFormFieldImage.add(addDogFormScrollBackground);

var addDogTxtFieldOffset = 34;
var addDogTxtFieldHeight = 32;
var addDogTxtFieldWidth = 192;

//Name textfield
var addDogFieldName = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:1,
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:1,
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});

addDogFieldName.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldName.addEventListener('blur', handleAddDogTextFieldBlur);

//Event listener for the name textfield
addDogFieldName.addEventListener('return', function() {
   addDogFieldDogBreedHintTextLabel.fireEvent('click');
});

addDogFormScrollBackground.add(addDogFieldName);

//Name textfield label
var addDogFieldNameHintTextLabel = Ti.UI.createLabel({
	text:'Name*',
	color:'999999',
	textAlign:'left',
	left:4,
	opacity:0.7,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldName.add(addDogFieldNameHintTextLabel);

//Dog Breed textfield label
var addDogFieldDogBreedHintTextLabel = Ti.UI.createLabel({
	text:'Dog Breed*',
	picker:DOG_BREED_PICKER,
	color:'999999',
	textAlign:'left',
	top:addDogFieldName.top + addDogTxtFieldOffset,
	opacity:0.7,
	width:192,
	height:32,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFormScrollBackground.add(addDogFieldDogBreedHintTextLabel);
addDogFieldDogBreedHintTextLabel.addEventListener('click', addDogHandlePicker);

//Age textfield
var addDogFieldAge = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:addDogFieldDogBreedHintTextLabel.top + addDogTxtFieldOffset,
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:3,
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});

addDogFieldAge.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldAge.addEventListener('blur', handleAddDogTextFieldBlur);

//Event listener for the age textfield
addDogFieldAge.addEventListener('return', function() {
   addDogFieldWeight.focus();
});

addDogFormScrollBackground.add(addDogFieldAge);

//Age textfield label
var addDogFieldAgeHintTextLabel = Ti.UI.createLabel({
	text:'Age*',
	color:'999999',
	textAlign:'left',
	left:4,
	opacity:0.7,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldAge.add(addDogFieldAgeHintTextLabel);

//Weight textfield
var addDogFieldWeight = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:addDogFieldAge.top + addDogTxtFieldOffset,
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:4,
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});

addDogFieldWeight.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldWeight.addEventListener('blur', handleAddDogTextFieldBlur)

//Event listener for the weight textfield
addDogFieldWeight.addEventListener('return', function() {
   addDogFieldGenderHintTextLabel.fireEvent('click');
   addDogFormScrollBackground.scrollTo(0,100); //sometimes it wouldn't open'
});

addDogFormScrollBackground.add(addDogFieldWeight);

//Weight textfield label
var addDogFieldWeightHintTextLabel = Ti.UI.createLabel({
	text:'Weight*',
	color:'999999',
	textAlign:'left',
	left:4,
	opacity:0.7,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldWeight.add(addDogFieldWeightHintTextLabel);

//Gender textfield label
var addDogFieldGenderHintTextLabel = Ti.UI.createLabel({
	text:'Gender*',
	picker:GENDER_PICKER,
	color:'999999',
	textAlign:'left',
	opacity:0.7,
	top:addDogFieldWeight.top + addDogTxtFieldOffset,
	width:192,
	height:32,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFormScrollBackground.add(addDogFieldGenderHintTextLabel);
addDogFieldGenderHintTextLabel.addEventListener('click', addDogHandlePicker);

//Matting textfield label
var addDogFieldMattingHintTextLabel = Ti.UI.createLabel({
	text:'Matting*',
	picker:MATTING_PICKER,
	color:'999999',
	textAlign:'left',
	top:addDogFieldGenderHintTextLabel.top + addDogTxtFieldOffset,
	opacity:0.7,
	width:192,
	height:32,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFormScrollBackground.add(addDogFieldMattingHintTextLabel);
addDogFieldMattingHintTextLabel.addEventListener('click', addDogHandlePicker);

//picker
var addDogPicker = Ti.UI.createPicker({
  bottom:-216
});
viewAddDog.add(addDogPicker);

//picker done button
var addDogPickerDoneButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/Done_button.png',
    width:58,
    height:29
});

//picker data
var genderPicker = [];

genderPicker[0]=Ti.UI.createPickerRow({title:'male', id:1});
genderPicker[1]=Ti.UI.createPickerRow({title:'female', id:2});

var dogBreedPicker = [];
	
dogBreedPicker[0]=Ti.UI.createPickerRow({title:'kannis', id:1});
dogBreedPicker[1]=Ti.UI.createPickerRow({title:'bull dog', id:2});

var mattingPicker = [];
	
mattingPicker[0]=Ti.UI.createPickerRow({title:'yes', id:1});
mattingPicker[1]=Ti.UI.createPickerRow({title:'no', id:2});

//sepparator offset
var sepparatorOffset = 0;

//creation of sepparators
for(var i=0; i<=4; i++) {
	var addDogSepparator = Ti.UI.createView({
		backgroundColor:'CCCCCC',
		width:addDogTxtFieldWidth,
		height:2,
		top:32 + sepparatorOffset,
		opacity:0.4
	});
	addDogFormScrollBackground.add(addDogSepparator);
	
	sepparatorOffset += 34;
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
    
    var picker = e.source.picker;
    //add data for specified picker
	if(picker === DOG_BREED_PICKER){
		addDogPicker.add(dogBreedPicker);
	}else if(picker === GENDER_PICKER){
		addDogPicker.add(genderPicker);
		addDogFormScrollBackground.scrollTo(0,100);
	}else if(picker === MATTING_PICKER){
		addDogPicker.add(mattingPicker);
		addDogFormScrollBackground.scrollTo(0,135);
	}
	
	addDogPicker.selectionIndicator = true;
	addDogPicker.animate({bottom:0, duration:500});
	
	
	navController.getWindow().setRightNavButton(addDogPickerDoneButton);
	addDogPickerDoneButton.addEventListener("click", handlePickerDoneButton);
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
	addDogFormScrollBackground.scrollTo(0,0);
	
	addDogPicker.animate({bottom:-216, duration:500});
 	navController.getWindow().setRightNavButton(addDogDoneButton);
	
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
	}
}

//handle photo selection
function handlePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			addDogObject.photo = image;
			
			var uniqueDogFilename = new Date().getTime() + '.jpg';
			addDogObject.photo_filename = uniqueDogFilename;
			
			// create new file name and remove old
			
			var filename = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilename;
			var tmpImage = Titanium.Filesystem.getFile(filename);
			tmpImage.write(image);
			Ti.API.info('saved image to '+filename);
		},
		cancel:function(){
	
		},
		error:function(error){
		}
	});
}

//handle camera selection
function handleCameraSelection(){
	
}	

//handle all textfields when focused
function handleAddDogTextFieldFocus(e){
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
	}else if(field == 4){
		if(addDogFieldWeight.value != ''){
			addDogFieldWeightHintTextLabel.hide();
		}else {
			addDogFieldWeightHintTextLabel.show();
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
	}else if(field == 4){
		if(addDogFieldWeight.value == ''){
			addDogFieldWeightHintTextLabel.show();
		}
	}
}

//Server call for saving dogs
function doSaveDogOnline(dObj){
	Ti.API.info('doSaveDogOnline() called with userObject='+dObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSaveDogOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		//Update user object and close the signup window
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Add the server dog id to the object
			dObj.dog_id = jsonData.data.dog_id;
			saveDog(dObj);
			
			var dogRows = getDogs();
			populateRightMenu(dogRows);
			
			navController.getWindow().setRightNavButton(rightBtn);
			Ti.include('ui/iphone/dog_profile.js');
			navController.getWindow().add(dogProfileView);
			navController.getWindow().setTitle('dog profile');
			
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'addDog');
	xhr.send({
		user_id:userObject.userId,
<<<<<<< HEAD
		photo:dObj.photo,
=======
		photo:dObj.image,
>>>>>>> 030a04459bd2acca5b510763ef47bc58c5c66416
		name:dObj.name,
		weight:dObj.weight,
		age:dObj.age,
		breed_id:dObj.breed_id,
		gender:dObj.gender,
		mating:dObj.mating
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
	} else if(isStringNullOrEmpty(addDogFieldWeight.value) || isNaN(addDogFieldWeight.value)){
		alert('WEIGHT IS MISSING OR NOT A NUMBER');
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
	addDogObject.weight = addDogFieldWeight.value;
	addDogObject.gender = addDogFieldGenderHintTextLabel.id;
	addDogObject.mating = addDogFieldMattingHintTextLabel.id;
	
	return true;
}

function handleAddDogDoneClick(){
	
	if(validateDogForm()){
		Ti.API.info('dog form is valid');
		
		doSaveDogOnline(addDogObject);	
		//alert(addDogObject);
	}else{
		Ti.API.info('dog form is not valid');
	}
}
