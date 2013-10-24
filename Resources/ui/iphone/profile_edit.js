//UI components
var editProfileView = null;
var editProfilePhotoButton = null;
var editProfileFormBackground = null;
var editProfileFieldName = null;
var editProfileFieldNameHintTextLabel = null;
var editProfileFieldSurname = null;
var editProfileFieldSurnameHintTextLabel = null;
var editProfileFieldEmail = null;
var editProfileFieldEmailHintTextLabel = null;
var editProfileFieldBirthDateHintTextLabel = null;
var editProfileFieldGenderHintTextLabel = null;
var editProfileFieldCountryHintTextLabel = null;
var editProfileFieldAddressHintTextLabel = null;
var editProfileFieldAddress = null;
var editProfileSignupButton = null;
var editProfilePhotoDialog = null;
var editProfileScrollView = null;
var editProfilePicker = null;
var editProfileDatePicker = null;
var editProfilePickerDoneButton = null;
var editProfileToolbar = null;
var editProfileFormNewsCheckMark = null;
var editProfileFormNewsCheckBox = null;
var editProfilePickerBackground = null;
var editProfileDatePickerBackground = null;
var editProfileThumbnailPreviewImageView = null;

var editProfileGenderPicker = [];
var editProfileCountryPicker = [];
var editProfileCountryIndexes = [];

var editProfileSelectedRowCountry = 0;
var editProfileSelectedRowGender = 0;

var PICKER_DATE_BIRTH = 1;
var PICKER_COUNTRY = 2;
var PICKER_GENDER = 3;

var editProfilePickerType = null;

var toEditProfileFromWindow = null;

CURRENT_VIEW = VIEW_PROFILE_EDIT;

//Data components
//Holds the user data entered through the signup form
var editProfileObject = {};
editProfileObject.address = '';
editProfileObject.newsletter = 0;

function buildEditProfileView(window){
	toEditProfileFromWindow = window;
	
	editProfileView = Ti.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	editProfileScrollView = Ti.UI.createScrollView({
		backgroundColor:UI_BACKGROUND_COLOR
	});
	editProfileView.add(editProfileScrollView);
	
	var editProfileViewDogsquareLogo = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/dogsquare_logo.png',
		top:17
	});
	editProfileScrollView.add(editProfileViewDogsquareLogo);
	
	//Profile pic selector
	editProfilePhotoButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/place_photo.png',
		width:104,
		height:101,
		top:72
	});
	
	//photo button preview image
	editProfileThumbnailPreviewImageView = Ti.UI.createImageView({
		image:getUserPhoto(userObject.image_path),
		processed:false
	});
	
	editProfileThumbnailPreviewImageView.addEventListener('load', function(){
		Ti.API.info('EDIT Profile image loaded event');
		
		if(!editProfileThumbnailPreviewImageView.processed){
			var profileImageViewBlob = profileImageView.toBlob();
			
			//Resizing imageAsResized
			var profileImageBlobCropped = profileImageViewBlob.imageAsThumbnail(94,0,47);
			editProfileThumbnailPreviewImageView.image = profileImageBlobCropped;
			
			editProfileThumbnailPreviewImageView.processed = true;
			
			Ti.API.info('EDIT Profile image loaded event processing. Image height:'+profileImageViewBlob.height+' width '+profileImageViewBlob.width + ' cropped to height '+profileImageBlobCropped.height + ' and width '+profileImageBlobCropped.width);
		}
});
	
	editProfilePhotoButton.add(editProfileThumbnailPreviewImageView);
	
	editProfilePhotoButton.addEventListener('click', editProfileShowPhotoOptions);
	editProfileScrollView.add(editProfilePhotoButton);
	
	//Form scroll container
	var editProfileTxtFieldOffset = 41;
	var editProfileTxtFieldHeight = 39;
	var editProfileTxtFieldWidth = 262;
	
	editProfileFormBackground = Ti.UI.createView({
		backgroundColor:'e7e6e6',
		top:191,
		width:262,
		height:288
	});
	
	//Name textfield
	editProfileFieldName = Ti.UI.createTextField({
		width:editProfileTxtFieldWidth,
		height:editProfileTxtFieldHeight,
		top:1,
		paddingLeft:4, 
		paddingRight:4, 
		returnKeyType: Ti.UI.RETURNKEY_RETURN,
		field:1,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	editProfileFieldName.addEventListener('change', handleEditProfileTextFieldChange);
	editProfileFieldName.addEventListener('blur', handleEditProfileTextFieldBlur);
	editProfileFieldName.addEventListener('focus', handleEditProfileTextFieldFocus);
	
	var nameArray = userObject.name.split(" ", 2);
	
	editProfileFieldName.value = nameArray[0];
	
	editProfileFormBackground.add(editProfileFieldName);
	
	editProfileFieldNameHintTextLabel = Ti.UI.createLabel({
		text:'Name*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	editProfileFieldName.add(editProfileFieldNameHintTextLabel);
	editProfileFieldNameHintTextLabel.hide();
	
	//Surname textfield
	editProfileFieldSurname = Ti.UI.createTextField({
		width:editProfileTxtFieldWidth,
		height:editProfileTxtFieldHeight,
		paddingLeft:4, 
		paddingRight:4, 
		top:editProfileFieldName.top + editProfileTxtFieldOffset,
		returnKeyType: Ti.UI.RETURNKEY_RETURN,
		field:2,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	editProfileFieldSurname.addEventListener('change', handleEditProfileTextFieldChange);
	editProfileFieldSurname.addEventListener('blur', handleEditProfileTextFieldBlur);
	editProfileFieldSurname.addEventListener('focus', handleEditProfileTextFieldFocus);
	
	editProfileFieldSurname.value = nameArray[1];
	
	editProfileFormBackground.add(editProfileFieldSurname);
	
	editProfileFieldSurnameHintTextLabel = Ti.UI.createLabel({
		text:'Surname*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	editProfileFieldSurname.add(editProfileFieldSurnameHintTextLabel);
	editProfileFieldSurnameHintTextLabel.hide();
	
	//Email textfield
	editProfileFieldEmail = Ti.UI.createTextField({
		width:editProfileTxtFieldWidth,
		height:editProfileTxtFieldHeight,
		paddingLeft:4, 
		paddingRight:4, 
		top:editProfileFieldSurname.top + editProfileTxtFieldOffset,
		keyboardType:Ti.UI.KEYBOARD_EMAIL,
		returnKeyType: Ti.UI.RETURNKEY_RETURN,
		field:3,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	editProfileFieldEmail.addEventListener('change', handleEditProfileTextFieldChange);
	editProfileFieldEmail.addEventListener('blur', handleEditProfileTextFieldBlur);
	editProfileFieldEmail.addEventListener('focus', handleEditProfileTextFieldFocus);
	
	editProfileFieldEmail.value = userObject.email;
	
	editProfileFormBackground.add(editProfileFieldEmail);
	
	editProfileFieldEmailHintTextLabel = Ti.UI.createLabel({
		text:'Email address*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	editProfileFieldEmail.add(editProfileFieldEmailHintTextLabel);
	editProfileFieldEmailHintTextLabel.hide();
	
	editProfileFieldBirthDateHintTextLabel = Ti.UI.createLabel({
		width:editProfileTxtFieldWidth-9,
		height:editProfileTxtFieldHeight,
		color:'black',
		top:editProfileFieldEmail.top + editProfileTxtFieldOffset,
		textAlign:'left',
		left:4,
		opacity:1,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'},
		picker:PICKER_DATE_BIRTH
	});
	editProfileFormBackground.add(editProfileFieldBirthDateHintTextLabel);
	editProfileFieldBirthDateHintTextLabel.addEventListener('click', editProfileHandlePicker);
	
	var date = new Date(userObject.birth_date);
	
	editProfileObject.birth_date = date;
	
	var birth_date = formatDate(date);
	
	editProfileFieldBirthDateHintTextLabel.text = birth_date;
	
	//Address textfield
	editProfileFieldAddress = Ti.UI.createTextField({
		width:editProfileTxtFieldWidth,
		height:editProfileTxtFieldHeight,
		paddingLeft:4, 
		paddingRight:4, 
		top:editProfileFieldBirthDateHintTextLabel.top + editProfileTxtFieldOffset,
		backgroundColor:'grey',
		returnKeyType: Ti.UI.RETURNKEY_RETURN,
		field:4,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	editProfileFieldAddress.addEventListener('change', handleEditProfileTextFieldChange);
	editProfileFieldAddress.addEventListener('blur', handleEditProfileTextFieldBlur);
	editProfileFieldAddress.addEventListener('focus', handleEditProfileTextFieldFocus);
	
	editProfileFormBackground.add(editProfileFieldAddress);
	
	editProfileFieldAddressHintTextLabel = Ti.UI.createLabel({
		text:'Address',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	editProfileFieldAddress.add(editProfileFieldAddressHintTextLabel);
	
	if(userObject.address != ''){
		editProfileFieldAddress.value = userObject.address;
		editProfileFieldAddressHintTextLabel.hide();
	}
	
	
	editProfileFieldCountryHintTextLabel = Ti.UI.createLabel({
		text:'Country*',
		width:editProfileTxtFieldWidth-9,
		height:editProfileTxtFieldHeight,
		color:'black',
		top:editProfileFieldAddress.top + editProfileTxtFieldOffset,
		textAlign:'left',
		left:4,
		opacity:1,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'},
		picker:PICKER_COUNTRY
	});
	editProfileFormBackground.add(editProfileFieldCountryHintTextLabel);
	editProfileFieldCountryHintTextLabel.addEventListener('click', editProfileHandlePicker);
	
	var countryName = getCountryById(userObject.country);
	editProfileFieldCountryHintTextLabel.text = countryName;
	editProfileObject.country = userObject.country;
	editProfileSelectedRowCountry = userObject.country;
	
	editProfileFieldGenderHintTextLabel = Ti.UI.createLabel({
		width:editProfileTxtFieldWidth-9,
		height:editProfileTxtFieldHeight,
		color:'black',
		opacity:1,
		top:editProfileFieldCountryHintTextLabel.top + editProfileTxtFieldOffset,
		textAlign:'left',
		left:4,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'},
		picker:PICKER_GENDER
	});
	editProfileFormBackground.add(editProfileFieldGenderHintTextLabel);
	editProfileFieldGenderHintTextLabel.addEventListener('click', editProfileHandlePicker);
	
	if(userObject.gender == 1){
		editProfileFieldGenderHintTextLabel.text = 'Male';
	}else{
		editProfileFieldGenderHintTextLabel.text = 'Female';
	}
	editProfileObject.gender = userObject.gender;
	editProfileSelectedRowGender = userObject.gender;
	
	//sepparator offset
	var sepparatorOffset = 0;
	
	//creation of sepparators
	for(var i=0; i<=6; i++) {
		var editProfileSepparator = Ti.UI.createView({
			backgroundColor:'CCCCCC',
			width:editProfileTxtFieldWidth,
			height:2,
			top:40 + sepparatorOffset,
			opacity:0.4
		});
		editProfileFormBackground.add(editProfileSepparator);
		
		sepparatorOffset += 41;
	}
	
	editProfileScrollView.add(editProfileFormBackground);
	
		
	editProfileFormNewsCheckBox = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/check_box.png',
		top:493,
		left:30,
		active:false
	});
	
	editProfileFormNewsCheckMark = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/check_mark.png',
		active:false
	});
	editProfileFormNewsCheckBox.add(editProfileFormNewsCheckMark);
	
	if(userObject.newsletter == 1){
		editProfileFormNewsCheckMark.show();
		editProfileFormNewsCheckBox.active = true;
		editProfileFormNewsCheckMark.active = true;
		editProfileObject.newsletter = 1;
	}else{
		editProfileFormNewsCheckMark.hide();
		editProfileFormNewsCheckBox.active = false;
		editProfileFormNewsCheckMark.active = false;
		editProfileObject.newsletter = 0;
	}
	
	
	editProfileScrollView.add(editProfileFormNewsCheckBox);
	editProfileFormNewsCheckBox.addEventListener('click', handleEditProfileFormNewsCheckBox);

	var editProfileReceiveNewsLabel = Titanium.UI.createLabel({
		text:'I want to receive news from Dogsquare',
		textAlign:'left',
		left:270,
		top:498,
		left:60,
		font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	editProfileScrollView.add(editProfileReceiveNewsLabel);
	
	//Facebook button
	/*editProfileFacebookButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/Facebook_button.png',
		width:241,
		height:45,
		top:672,
		bottom:30
	});
	
	editProfileScrollView.add(editProfileFacebookButton);
	
	editProfileFacebookButton.addEventListener('click', function(){
		fb.authorize();
		
		w.close();
		loginWindow.animate({opacity:0, duration:1}, function(){
			window.remove(loginWindow);
		});
		
	});*/

	//Signup button
	editProfileEditButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/update_btn.png',
		width:270,
		height:55,
		top:533,
		bottom:30
	});
	editProfileEditButton.addEventListener('click', handleEditProfileEditClick);
	
	editProfileScrollView.add(editProfileEditButton);
	
	editProfilePhotoDialog = Titanium.UI.createOptionDialog({
		options:['Take Photo', 'Choose From Library', 'Cancel'],
		cancel:2
	});
	
	editProfilePhotoDialog.addEventListener('click',function(e){
		if(e.index == 0){
			handleEditProfileCameraSelection();
		} else if(e.index == 1){
			handleEditProfilePhotoSelection();
		}
	});
	
	//Set up minimum and maximum dates
	var today = new Date();
	
	var maxDate = new Date();
	maxDate.setFullYear(today.getFullYear() - 5);
	maxDate.setMonth(13);
	maxDate.setDate(31);
	
	var minDate = new Date();
	minDate.setFullYear(today.getFullYear() - 70);
	minDate.setMonth(0);
	minDate.setDate(1);
	
	editProfileDatePickerBackground = Titanium.UI.createView({
	    height:260,
	    bottom:-260,
	    backgroundColor:'red'
	}); 
	editProfileView.add(editProfileDatePickerBackground);
	
	editProfilePickerBackground = Titanium.UI.createView({
	    height:260,
	    bottom:-260
	}); 
	editProfileView.add(editProfilePickerBackground);
	
	//date picker - sepparate picker because of an error when changing type of picker
	editProfileDatePicker = Ti.UI.createPicker({
	  type:Ti.UI.PICKER_TYPE_DATE,
	  bottom:0,
	  minDate:minDate,
	  maxDate:maxDate,
	  value:date
	});
	editProfileDatePickerBackground.add(editProfileDatePicker);
	editProfileDatePicker.addEventListener("change", handleEditProfileDatePickerChange);
	
	//picker for country and gender
	editProfilePicker = Ti.UI.createPicker({
	  bottom:0
	});
	editProfilePickerBackground.add(editProfilePicker);
	editProfilePicker.addEventListener("change", handleEditProfilePickerChange);
	
	//picker done button
	editProfilePickerDoneButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34
	});
	editProfilePickerDoneButton.addEventListener("click", handleEditProfilePickerDoneButton);
	
	//picker - toolbar flex space
	var editProfileFlexSpace = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	//picker toolbar
	editProfileToolbar = Titanium.UI.iOS.createToolbar({
	    items:[editProfileFlexSpace, editProfilePickerDoneButton],
	    barColor:'999999',
	    top:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	editProfilePickerBackground.add(editProfileToolbar);
	
	//picker done button
	editProfileDatePickerDoneButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34
	});
	editProfileDatePickerDoneButton.addEventListener("click", handleEditProfilePickerDoneButton);
	
	//picker - toolbar flex space
	var editProfileDateFlexSpace = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	//picker toolbar
	editProfileDateToolbar = Titanium.UI.iOS.createToolbar({
	    items:[editProfileDateFlexSpace, editProfileDatePickerDoneButton],
	    barColor:'999999',
	    top:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	editProfileDatePickerBackground.add(editProfileDateToolbar);
	
	//gender picker data
	editProfileGenderPicker[0]=Ti.UI.createPickerRow({title:'Male', id:1});
	editProfileGenderPicker[1]=Ti.UI.createPickerRow({title:'Female', id:2});
	
	//country picker data
	var countries = getCountries();
	
	for(i=0;i<countries.length;i++){
		
		var countryPickerName = countries[i].name;
		var countryPickerId = countries[i].id;
		
		if(!isStringNullOrEmpty(countryPickerName)){
			editProfileCountryPicker[i]=Ti.UI.createPickerRow({title:countryPickerName, id:countryPickerId});
			editProfileCountryIndexes[countryPickerId] = i;
		}
		
	}
	
	editProfilePicker.add(editProfileCountryPicker);
	
	return editProfileView;
}

function handleEditProfileFormNewsCheckBox(e){
	var active = e.source.active;
	
	if(active){
		editProfileFormNewsCheckMark.hide();
		editProfileFormNewsCheckBox.active = false;
		editProfileFormNewsCheckMark.active = false;
		editProfileObject.newsletter = 0;
	}else{
		editProfileFormNewsCheckMark.show();
		editProfileFormNewsCheckMark.active = true;
		editProfileFormNewsCheckBox.active = true;
		editProfileObject.newsletter = 1;
		
	}
}

function handleEditProfileDatePickerChange(e){
	//show date
	editProfileFieldBirthDateHintTextLabel.color = 'black';
	editProfileFieldBirthDateHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	editProfileFieldBirthDateHintTextLabel.opacity = 1;
	
	var pickerDate = e.value;
	
	var date = formatDate(pickerDate);
	
	editProfileFieldBirthDateHintTextLabel.text = date;
	editProfileObject.birth_date = pickerDate;
}

function handleEditProfilePickerChange(e){
	if(editProfilePickerType == PICKER_COUNTRY){
		editProfileFieldCountryHintTextLabel.color = 'black';
		editProfileFieldCountryHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		editProfileFieldCountryHintTextLabel.opacity = 1;
		
		var data = editProfilePicker.getSelectedRow(0).title;
		
		editProfileFieldCountryHintTextLabel.text = data;
		editProfileObject.country = editProfilePicker.getSelectedRow(0).id;
	}else if(editProfilePickerType == PICKER_GENDER){
		editProfileFieldGenderHintTextLabel.color = 'black';
		editProfileFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		editProfileFieldGenderHintTextLabel.opacity = 1;
		
		var data = editProfilePicker.getSelectedRow(0).title;
		editProfileFieldGenderHintTextLabel.text = data;
		editProfileObject.gender = editProfilePicker.getSelectedRow(0).id;
	}
}

//handle picker done button
function handleEditProfilePickerDoneButton(e){
	
	if(editProfilePickerType === PICKER_DATE_BIRTH){
		editProfileDatePickerBackground.animate({bottom:-260, duration:500});
		//set as selected the row which the user selected previously
		editProfilePicker.value = editProfilePicker.value;
		if(IPHONE5){
			editProfileScrollView.scrollTo(0,114);
		}     
	}else if(editProfilePickerType === PICKER_COUNTRY){
		editProfilePickerBackground.animate({bottom:-260, duration:500});
		editProfileScrollView.scrollTo(0,IPHONE5 ? 114 : 200);
		editProfileObject.country = editProfilePicker.getSelectedRow(0).id;
		//set as selected the row which the user selected previously
		editProfileSelectedRowCountry = editProfilePicker.getSelectedRow(0).id;
	}else if(editProfilePickerType === PICKER_GENDER){
		editProfilePickerBackground.animate({bottom:-260, duration:500});
		editProfileScrollView.scrollTo(0,IPHONE5 ? 114 : 200);
		editProfileObject.gender = editProfilePicker.getSelectedRow(0).id;
		//set as selected the row which the user selected previously
		editProfileSelectedRowGender = editProfilePicker.getSelectedRow(0).id;
	}
	
}

//handle picker data and animation
function editProfileHandlePicker(e){
	//clear all picker rows method
    clearEditProfilePickerRows();
    
    editProfileFieldName.blur();
	editProfileFieldSurname.blur();
	editProfileFieldEmail.blur();
	editProfileFieldAddress.blur();
	
    var picker = e.source.picker;
    //add data for specified picker
	if(picker === PICKER_DATE_BIRTH){
		var pickerDate = editProfileDatePicker.value;
		editProfileFieldBirthDateHintTextLabel.color = 'black';
		editProfileFieldBirthDateHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		editProfileFieldBirthDateHintTextLabel.opacity = 1;
	
		var date = formatDate(pickerDate);
		
		editProfileFieldBirthDateHintTextLabel.text = date;
		editProfileObject.birth_date = pickerDate;
		editProfileScrollView.scrollTo(0,IPHONE5 ? 112 : 200);
		editProfileDatePickerBackground.animate({bottom:0, duration:500});
	}else if(picker === PICKER_COUNTRY){
		editProfilePicker.add(editProfileCountryPicker);
		
		editProfilePicker.setSelectedRow(0, editProfileCountryIndexes[editProfileSelectedRowCountry], false);
		
		editProfileFieldCountryHintTextLabel.color = 'black';
		editProfileFieldCountryHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		editProfileFieldCountryHintTextLabel.opacity = 1;
		
		editProfileScrollView.scrollTo(0,IPHONE5 ? 194 : 282);
		editProfilePickerBackground.animate({bottom:0, duration:500});
	}else if(picker === PICKER_GENDER){
		editProfilePicker.add(editProfileGenderPicker);
		
		editProfilePicker.setSelectedRow(0, editProfileSelectedRowGender-1, false);
		
		editProfileFieldGenderHintTextLabel.color = 'black';
		editProfileFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		editProfileFieldGenderHintTextLabel.opacity = 1;
		
		editProfileScrollView.scrollTo(0,IPHONE5 ? 235 : 323);
		editProfilePickerBackground.animate({bottom:0, duration:500});
	}
	
	editProfileDatePicker.selectionIndicator = true;
	editProfilePicker.selectionIndicator = true;
	
	editProfilePickerType = picker;
}

//clear all picker rows
function clearEditProfilePickerRows(){
	if (editProfilePicker.getColumns()[0]) {
 
        var _col = editProfilePicker.getColumns()[0];
	    var len  = _col.rowCount;
 
	    for (var x = len - 1; x >= 0; x--) {
                var _row = _col.rows[x];
                _col.removeRow(_row);
        }
    }
}

//Event handler for profile photo selection
function editProfileShowPhotoOptions(){
	editProfilePhotoDialog.show();
}
	
//Validator for signup form
function validateEditUserForm(){
	
	if(isStringNullOrEmpty(editProfileFieldName.value)){
		alert(getLocalMessage(MSG_REGISTER_NO_NAME));
		return false;
	} else if(isStringNullOrEmpty(editProfileFieldSurname.value)){
		alert(getLocalMessage(MSG_REGISTER_NO_SURNAME));
		return false;
	} else if(isStringNullOrEmpty(editProfileFieldEmail.value)){
		alert(getLocalMessage(MSG_REGISTER_NO_EMAIL));
		return false;
	}else if(typeof editProfileObject.birth_date == 'undefined'){
		alert(getLocalMessage(MSG_REGISTER_NO_DOB));
		return false;
	}else if(typeof editProfileObject.country == 'undefined'){
		alert(getLocalMessage(MSG_REGISTER_NO_COUNTRY));
		return false;
	}else if(typeof editProfileObject.gender == 'undefined'){
		alert(getLocalMessage(MSG_REGISTER_NO_GENDER));
		return false;
	}
	
	if(!isValidEmail(editProfileFieldEmail.value)){
		alert(getLocalMessage(MSG_REGISTER_INVALID_EMAIL));
		return false;
	}
	
	//Prepare the signup object
	editProfileObject.name = editProfileFieldName.value +' '+editProfileFieldSurname.value;
	editProfileObject.email = editProfileFieldEmail.value;
	editProfileObject.followers = 0;
	editProfileObject.following = 0;
	editProfileObject.address = editProfileFieldAddress.value;
	
	return true;
}

//Event handler for signup button
function handleEditProfileEditClick(){
	if(validateEditUserForm()){
		Ti.API.info('edit Profile form is valid');
		
		//Call signup() on the server
		editUserProfile(editProfileObject);	
	}
}

//handle textfield when not focused
function handleEditProfileTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 1){
		if(editProfileFieldName.value == ''){
			editProfileFieldNameHintTextLabel.show();
		}
	}else if(field == 2){
		if(editProfileFieldSurname.value == ''){
			editProfileFieldSurnameHintTextLabel.show();
		}
	}else if(field == 3){
		if(editProfileFieldEmail.value == ''){
			editProfileFieldEmailHintTextLabel.show();
		}
	}else if(field == 4){
		if(editProfileFieldAddress.value == ''){
			editProfileFieldAddressHintTextLabel.show();
		}
	}
}

//Edit user profile
function editUserProfile(uObj){
	Ti.API.info('editUserProfile() called with userObject='+ JSON.stringify(uObj)); 	
	
	//progress view
	var progressView = new ProgressView({window:editProfileView});
	progressView.show({
		text:"Saving..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in editUserProfile() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('editUserProfile() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		//Update user object and close the signup window
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
			if(typeof jsonData.data.thumb != 'undefined'){
				uObj.thumb_path = jsonData.data.thumb;
				uObj.image_path = jsonData.data.photo;
			}else{
				uObj.thumb_path = userObject.thumb_path;
				uObj.image_path = userObject.image_path;
			}
			
			//Save data & update UI
			saveUserObject(uObj);
			updateLeftMenu(uObj);
			
			if(toEditProfileFromWindow == VIEW_PROFILE){
				navController.getWindow().setTitle(userObject.name);
				profileImageView.image = getUserPhoto(userObject.image_path);
			}
			
			navController.close(openWindows[openWindows.length-1]);
			//Hide message and close edit Profile window
			progressView.hide();
		}else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
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
	xhr.open('POST',API+'editUser');
	xhr.send({
		user_id:userObject.userId,
		photo:uObj.image,
		thumb:uObj.thumb,
		name:uObj.name,
		email:uObj.email,
		password:uObj.password,
		birth_date:uObj.birth_date,
		facebook_id:uObj.facebook_id,
		gender:uObj.gender,
		address:uObj.address,
		country:uObj.country,
		newsletter:uObj.newsletter,
		edit:true,
		token:userObject.token
	});
}

//Selects a photo from the camera roll
function handleEditProfilePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Preview thumbnail
			var imageThumbnailPreview = image.imageAsThumbnail(94,0,47);
			editProfileThumbnailPreviewImageView.image = imageThumbnailPreview;
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			editProfileObject.image = compressedImage;
			editProfileObject.thumb = imageThumbnail;
			editProfileObject.image_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg";
			editProfileObject.thumb_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile_thumb.jpg";
			
			//Save images on the filesystem
			var tmpImage = Titanium.Filesystem.getFile(editProfileObject.image_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(editProfileObject.thumb_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			
			tmpImage.write(imageThumbnail);
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}
	
function handleEditProfileCameraSelection(){
	Titanium.Media.showCamera({
		success:function(event){
			var image = event.media;
			
			//Reduce image size first
			Ti.API.info('Took image with h:'+image.height+' w:'+image.width);
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Preview thumbnail
			var imageThumbnailPreview = image.imageAsThumbnail(94,0,47);
			editProfileThumbnailPreviewImageView.image = imageThumbnailPreview;
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			editProfileObject.image = compressedImage;
			editProfileObject.thumb = imageThumbnail;
			editProfileObject.image_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg";
			editProfileObject.thumb_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile_thumb.jpg";
			
			//Save images on the filesystem
			var tmpImage = Titanium.Filesystem.getFile(editProfileObject.image_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(editProfileObject.thumb_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			
			tmpImage.write(imageThumbnail);
		},
		cancel:function(){
	
		},
		error:function(error){
			alert(getLocalMessage(MSG_CAMERA_PROBLEM));
		},
		allowEditing:true
	});
}	

function handleEditProfileTextFieldFocus(e){
	if(editProfilePickerType === PICKER_DATE_BIRTH){
		editProfileDatePickerBackground.animate({bottom:-260, duration:500});
	}else if(editProfilePickerType === PICKER_COUNTRY  || editProfilePickerType === PICKER_GENDER){
		editProfilePickerBackground.animate({bottom:-260, duration:500});
	}
}
	
function handleEditProfileTextFieldChange(e){
	var field = e.source.field;
	
	if(field == 1){
		if(editProfileFieldName.value != ''){
			editProfileFieldNameHintTextLabel.hide();
		}else {
			editProfileFieldNameHintTextLabel.show();
		}
	}else if(field == 2){
		if(editProfileFieldSurname.value != ''){
			editProfileFieldSurnameHintTextLabel.hide();
		}else {
			editProfileFieldSurnameHintTextLabel.show();
		}
	}else if(field == 3){
		if(editProfileFieldEmail.value != ''){
			editProfileFieldEmailHintTextLabel.hide();
		}else {
			editProfileFieldEmailHintTextLabel.show();
		}
	}else if(field == 4){
		if(editProfileFieldAddress.value != ''){
			editProfileFieldAddressHintTextLabel.hide();
		}else {
			editProfileFieldAddressHintTextLabel.show();
		}
	}
}