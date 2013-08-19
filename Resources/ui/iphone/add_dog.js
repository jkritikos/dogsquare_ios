//Add dog view
var viewAddDog = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

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
	field:1
});

addDogFieldName.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldName.addEventListener('blur', handleAddDogTextFieldBlur);

//Event listener for the name textfield
addDogFieldName.addEventListener('return', function() {
   addDogFieldDogBreed.focus();
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

//Dog Breed textfield
var addDogFieldDogBreed = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:addDogFieldName.top + addDogTxtFieldOffset,
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:2
});

addDogFieldDogBreed.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldDogBreed.addEventListener('blur', handleAddDogTextFieldBlur);

//Event listener for the dog breed textfield
addDogFieldDogBreed.addEventListener('return', function() {
   addDogFieldAge.focus();
});

addDogFormScrollBackground.add(addDogFieldDogBreed );

//Dog Breed textfield label
var addDogFieldDogBreedHintTextLabel = Ti.UI.createLabel({
	text:'Dog Breed*',
	color:'999999',
	textAlign:'left',
	left:4,
	opacity:0.7,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldDogBreed.add(addDogFieldDogBreedHintTextLabel);

//Age textfield
var addDogFieldAge = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:addDogFieldDogBreed.top + addDogTxtFieldOffset,
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:3
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
	field:4
});

addDogFieldWeight.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldWeight.addEventListener('blur', handleAddDogTextFieldBlur)

//Event listener for the weight textfield
addDogFieldWeight.addEventListener('return', function() {
   addDogFieldGender.focus();
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

//Gender textfield
var addDogFieldGender = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:addDogFieldWeight.top + addDogTxtFieldOffset,
	returnKeyType: Ti.UI.RETURNKEY_NEXT,
	field:5
});

addDogFieldGender.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldGender.addEventListener('blur', handleAddDogTextFieldBlur);

//Event listener for the gender textfield
addDogFieldGender.addEventListener('return', function() {
   addDogFieldMatting.focus();
});

addDogFormScrollBackground.add(addDogFieldGender);

//Gender textfield label
var addDogFieldGenderHintTextLabel = Ti.UI.createLabel({
	text:'Gender*',
	color:'999999',
	textAlign:'left',
	left:4,
	opacity:0.7,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldGender.add(addDogFieldGenderHintTextLabel);

//Matting textfield
var addDogFieldMatting = Ti.UI.createTextField({
	width:addDogTxtFieldWidth,
	height:addDogTxtFieldHeight,
	top:addDogFieldGender.top + addDogTxtFieldOffset,
	returnKeyType: Ti.UI.RETURNKEY_DONE,
	field:6
});

addDogFieldMatting.addEventListener('change', handleAddDogTextFieldFocus);
addDogFieldMatting.addEventListener('blur', handleAddDogTextFieldBlur); 

addDogFormScrollBackground.add(addDogFieldMatting);

//Matting textfield label
var addDogFieldMattingHintTextLabel = Ti.UI.createLabel({
	text:'Matting*',
	color:'999999',
	textAlign:'left',
	left:4,
	opacity:0.7,
	width:80,
	height:30,
	font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
});
addDogFieldMatting.add(addDogFieldMattingHintTextLabel);

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

//handle photo button
function addDogShowPhotoOptions(){
	addDogPhotoDialog.show();
}

//handle photo selection
function handlePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			// create new file name and remove old
			var filename = Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg";
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
	}else if(field == 2){
		if(addDogFieldDogBreed.value != ''){
			addDogFieldDogBreedHintTextLabel.hide();
		}else {
			addDogFieldDogBreedHintTextLabel.show();
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
	}else if(field == 5){
		if(addDogFieldGender.value != ''){
			addDogFieldGenderHintTextLabel.hide();
		}else {
			addDogFieldGenderHintTextLabel.show();
		}
	}else if(field == 6){
		if(addDogFieldMatting.value != ''){
			addDogFieldMattingHintTextLabel.hide();
		}else {
			addDogFieldMattingHintTextLabel.show();
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
	}else if(field == 2){
		if(addDogFieldDogBreed.value == ''){
			addDogFieldDogBreedHintTextLabel.show();
		}
	}else if(field == 3){
		if(addDogFieldAge.value == ''){
			addDogFieldAgeHintTextLabel.show();
		}
	}else if(field == 4){
		if(addDogFieldWeight.value == ''){
			addDogFieldWeightHintTextLabel.show();
		}
	}else if(field == 5){
		if(addDogFieldGender.value == ''){
			addDogFieldGenderHintTextLabel.show();
		}
	}else if(field == 6){
		if(addDogFieldMatting.value == ''){
			addDogFieldMattingHintTextLabel.show();
		}
	}
}