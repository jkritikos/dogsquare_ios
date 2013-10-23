//UI components
var registerWindow = null;
var registerNavBar = null;
var registerNavBarLabel = null;
var registerProfilePhotoButton = null;
var registerFormBackground = null;
var registerFieldName = null;
var registerFieldNameHintTextLabel = null;
var registerFieldSurname = null;
var registerFieldSurnameHintTextLabel = null;
var registerFieldEmail = null;
var registerFieldEmailHintTextLabel = null;
var registerFieldPassword = null;
var registerFieldPasswordHintTextLabel = null;
var registerFieldBirthDateHintTextLabel = null;
var registerFieldGenderHintTextLabel = null;
var registerFieldCountryHintTextLabel = null;
var registerFieldAddressHintTextLabel = null;
var registerFieldAddress = null;
var registerFacebookButton = null;
var registerSignupButton = null;
var registerPhotoDialog = null;
var registerScrollView = null;
var registerPicker = null;
var registerDatePicker = null;
var registerPickerDoneButton = null;
var registerToolbar = null;
var registerFormTermsCheckMark = null;
var registerFormNewsCheckMark = null;
var registerFormNewsCheckBox = null;
var registerFormTermsCheckBox = null;
var registerPickerBackground = null;
var registerDatePickerBackground = null;
var registerThumbnailPreviewImageView = null;

var genderPicker = [];
var countryPicker = [];
var countryIndexes = [];

var registerSelectedRowCountry = 0;
var registerSelectedRowGender = 0;

var PICKER_DATE_BIRTH = 1;
var PICKER_COUNTRY = 2;
var PICKER_GENDER = 3;

var registerPickerType = null;

//Data components
//Holds the user data entered through the signup form
var signupUserObject = {};
signupUserObject.address = '';
signupUserObject.newsletter = 0;

function buildRegisterWindow(){
	Titanium.UI.iPhone.showStatusBar();
	
	registerWindow = Ti.UI.createWindow({
		backButtonTitle:'back',
		title:'register',
		translucent:false,
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	registerScrollView = Ti.UI.createScrollView({
		backgroundColor:UI_BACKGROUND_COLOR
	});
	registerWindow.add(registerScrollView);
	
	var registerViewDogsquareLogo = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/dogsquare_logo.png',
		top:71
	});
	registerScrollView.add(registerViewDogsquareLogo);
	
	registerNavBar = Ti.UI.createImageView({
		image:iOS7 ? IMAGE_PATH+'common/bar7.png' : IMAGE_PATH+'common/bar.png',
		top:0
	});
	
	//back button
	var registerBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33,
	    left:6,
	    top:23
	});
	registerNavBar.add(registerBackButton);
	
	registerBackButton.addEventListener("click", function() {
	   	registerWindow.close({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	   	initialWindow.remove(registerWindow);
	});
	
	registerNavBarLabel = Ti.UI.createLabel({
		text:'Welcome',
		color:'white',
		font:UI_FONT_SEMIBOLD_NAVBAR,
		top:20
	});
	
	registerNavBar.add(registerNavBarLabel);
	
	registerWindow.add(registerNavBar);
	
	//Profile pic selector
	registerProfilePhotoButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/place_photo.png',
		width:104,
		height:101,
		top:116
	});
	
	//photo button preview image
	registerThumbnailPreviewImageView = Ti.UI.createImageView({
		borderRadius:39
	});
	
	registerProfilePhotoButton.add(registerThumbnailPreviewImageView);
	
	registerProfilePhotoButton.addEventListener('click', registerShowPhotoOptions);
	registerScrollView.add(registerProfilePhotoButton);
	
	//Form scroll container
	var registerTxtFieldOffset = 41;
	var registerTxtFieldHeight = 39;
	var registerTxtFieldWidth = 262;
	
	registerFormBackground = Ti.UI.createView({
		backgroundColor:'e7e6e6',
		top:IPHONE5 ? 221 : 235,
		width:262,
		height:329
	});
	
	//Name textfield
	registerFieldName = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:1,
		paddingLeft:4, 
		paddingRight:4, 
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:1,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldName.addEventListener('change', handleRegisterTextFieldChange);
	registerFieldName.addEventListener('blur', handleRegisterTextFieldBlur);
	registerFieldName.addEventListener('focus', handleRegisterTextFieldFocus);
	
	//Event listener for the name textfield
	registerFieldName.addEventListener('return', function() {
	    registerFieldSurname.focus();
	});
	
	registerFormBackground.add(registerFieldName);
	
	registerFieldNameHintTextLabel = Ti.UI.createLabel({
		text:'Name*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldName.add(registerFieldNameHintTextLabel);
	
	//Surname textfield
	registerFieldSurname = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		paddingLeft:4, 
		paddingRight:4, 
		top:registerFieldName.top + registerTxtFieldOffset,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:2,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldSurname.addEventListener('change', handleRegisterTextFieldChange);
	registerFieldSurname.addEventListener('blur', handleRegisterTextFieldBlur);
	registerFieldSurname.addEventListener('focus', handleRegisterTextFieldFocus);
	
	//Event listener for the name textfield
	registerFieldSurname.addEventListener('return', function() {
	    registerFieldEmail.focus();
	});
	
	registerFormBackground.add(registerFieldSurname);
	
	registerFieldSurnameHintTextLabel = Ti.UI.createLabel({
		text:'Surname*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldSurname.add(registerFieldSurnameHintTextLabel);
	
	//Email textfield
	registerFieldEmail = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		paddingLeft:4, 
		paddingRight:4, 
		top:registerFieldSurname.top + registerTxtFieldOffset,
		keyboardType:Ti.UI.KEYBOARD_EMAIL,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:3,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldEmail.addEventListener('change', handleRegisterTextFieldChange);
	registerFieldEmail.addEventListener('blur', handleRegisterTextFieldBlur);
	registerFieldEmail.addEventListener('focus', handleRegisterTextFieldFocus);
	
	//Event listener for the email textfield
	registerFieldEmail.addEventListener('return', function() {
	    registerFieldPassword.focus();
	});
	
	registerFormBackground.add(registerFieldEmail);
	
	registerFieldEmailHintTextLabel = Ti.UI.createLabel({
		text:'Email address*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldEmail.add(registerFieldEmailHintTextLabel);
	
	//Password textfield
	registerFieldPassword = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		paddingLeft:4, 
		paddingRight:4, 
		top:registerFieldEmail.top + registerTxtFieldOffset,
		backgroundColor:'grey',
		passwordMask:true,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:4,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldPassword.addEventListener('change', handleRegisterTextFieldChange);
	registerFieldPassword.addEventListener('blur', handleRegisterTextFieldBlur);
	registerFieldPassword.addEventListener('focus', handleRegisterTextFieldFocus);
	
	//Event listener for the password textfield
	registerFieldPassword.addEventListener('return', function() {
	    registerFieldBirthDateHintTextLabel.fireEvent('click');
	    registerScrollView.scrollTo(0,241);
	});
	
	registerFormBackground.add(registerFieldPassword);
	
	registerFieldPasswordHintTextLabel = Ti.UI.createLabel({
		text:'Password*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldPassword.add(registerFieldPasswordHintTextLabel);
	
	registerFieldBirthDateHintTextLabel = Ti.UI.createLabel({
		text:'Date of birth*',
		width:registerTxtFieldWidth-9,
		height:registerTxtFieldHeight,
		color:'999999',
		top:registerFieldPassword.top + registerTxtFieldOffset,
		textAlign:'left',
		left:4,
		opacity:0.7,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'},
		picker:PICKER_DATE_BIRTH
	});
	registerFormBackground.add(registerFieldBirthDateHintTextLabel);
	registerFieldBirthDateHintTextLabel.addEventListener('click', registerHandlePicker);
	
	//Password textfield
	registerFieldAddress = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		paddingLeft:4, 
		paddingRight:4, 
		top:registerFieldBirthDateHintTextLabel.top + registerTxtFieldOffset,
		backgroundColor:'grey',
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:5,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldAddress.addEventListener('change', handleRegisterTextFieldChange);
	registerFieldAddress.addEventListener('blur', handleRegisterTextFieldBlur);
	registerFieldAddress.addEventListener('focus', handleRegisterTextFieldFocus);
	
	//Event listener for the password textfield
	registerFieldAddress.addEventListener('return', function() {
	    registerFieldCountryHintTextLabel.fireEvent('click');
	    registerScrollView.scrollTo(0,323);
	});
	
	registerFormBackground.add(registerFieldAddress);
	
	registerFieldAddressHintTextLabel = Ti.UI.createLabel({
		text:'Address',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	registerFieldAddress.add(registerFieldAddressHintTextLabel);
	
	registerFieldCountryHintTextLabel = Ti.UI.createLabel({
		text:'Country*',
		width:registerTxtFieldWidth-9,
		height:registerTxtFieldHeight,
		color:'999999',
		top:registerFieldAddress.top + registerTxtFieldOffset,
		textAlign:'left',
		left:4,
		opacity:0.7,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'},
		picker:PICKER_COUNTRY
	});
	registerFormBackground.add(registerFieldCountryHintTextLabel);
	registerFieldCountryHintTextLabel.addEventListener('click', registerHandlePicker);
	
	registerFieldGenderHintTextLabel = Ti.UI.createLabel({
		text:'Gender*',
		width:registerTxtFieldWidth-9,
		height:registerTxtFieldHeight,
		color:'999999',
		top:registerFieldCountryHintTextLabel.top + registerTxtFieldOffset,
		textAlign:'left',
		left:4,
		opacity:0.7,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'},
		picker:PICKER_GENDER
	});
	registerFormBackground.add(registerFieldGenderHintTextLabel);
	registerFieldGenderHintTextLabel.addEventListener('click', registerHandlePicker);
	
	//sepparator offset
	var sepparatorOffset = 0;
	
	//creation of sepparators
	for(var i=0; i<=7; i++) {
		var registerSepparator = Ti.UI.createView({
			backgroundColor:'CCCCCC',
			width:registerTxtFieldWidth,
			height:2,
			top:40 + sepparatorOffset,
			opacity:0.4
		});
		registerFormBackground.add(registerSepparator);
		
		sepparatorOffset += 41;
	}
	
	registerScrollView.add(registerFormBackground);
	
		
	registerFormNewsCheckBox = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/check_box.png',
		top:578,
		left:30,
		active:false
	});
	
	registerFormNewsCheckMark = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/check_mark.png',
		active:false
	});
	registerFormNewsCheckBox.add(registerFormNewsCheckMark);
	registerFormNewsCheckMark.hide();
	
	registerScrollView.add(registerFormNewsCheckBox);
	registerFormNewsCheckBox.addEventListener('click', handleRegisterFormNewsCheckBox);
	
	registerFormTermsCheckBox = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/check_box.png',
		top:614,
		left:30,
		active:false
	});
	
	registerFormTermsCheckMark = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/check_mark.png',
		active:false
	});
	registerFormTermsCheckBox.add(registerFormTermsCheckMark);
	registerFormTermsCheckMark.hide();
	
	registerScrollView.add(registerFormTermsCheckBox);
	registerFormTermsCheckBox.addEventListener('click', handleRegisterFormTermsCheckBox);
	
	
	var registerReceiveNewsLabel = Titanium.UI.createLabel({
		text:'I want to receive news from Dogsquare',
		textAlign:'left',
		top:583,
		left:60,
		font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	registerScrollView.add(registerReceiveNewsLabel);
	
	var registerTermsLabel = Titanium.UI.createLabel({
		text:'I agree to the Dogsquare',
		textAlign:'left',
		top:619,
		left:60,
		font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	registerScrollView.add(registerTermsLabel);
	
	var registerTermsLinkLabel = Titanium.UI.createLabel({
		text:'TERMS OF USE',
		textAlign:'left',
		top:618,
		left:178,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	registerScrollView.add(registerTermsLinkLabel);
	registerTermsLinkLabel.addEventListener('click', handleTermsLabelLink);
	
	//Facebook button
	registerFacebookButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/Facebook_button.png',
		width:241,
		height:45,
		top:672,
		bottom:30
	});
	
	registerScrollView.add(registerFacebookButton);
	
	registerFacebookButton.addEventListener('click', function(){
		fb.authorize();
		
		w.close();
		loginWindow.animate({opacity:0, duration:1}, function(){
			window.remove(loginWindow);
		});
		
	});

	//Signup button
	registerSignupButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/signup_btn.png',
		width:270,
		height:55,
		top:665,
		bottom:30
	});
	
	registerSignupButton.addEventListener('click', handleSignupClick);
	
	registerScrollView.add(registerSignupButton);
	
	registerPhotoDialog = Titanium.UI.createOptionDialog({
		options:['Take Photo', 'Choose From Library', 'Cancel'],
		cancel:2
	});
	
	registerPhotoDialog.addEventListener('click',function(e){
		if(e.index == 0){
			handleCameraSelection();
		} else if(e.index == 1){
			handlePhotoSelection();
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
	
	var value = new Date();
	value.setFullYear(today.getFullYear() - 5);
	value.setMonth(12);
	value.setDate(1);
	
	registerDatePickerBackground = Titanium.UI.createView({
	    height:260,
	    bottom:-260,
	    backgroundColor:'red'
	}); 
	registerWindow.add(registerDatePickerBackground);
	
	registerPickerBackground = Titanium.UI.createView({
	    height:260,
	    bottom:-260
	}); 
	registerWindow.add(registerPickerBackground);
	
	//date picker - sepparate picker because of an error when changing type of picker
	registerDatePicker = Ti.UI.createPicker({
	  type:Ti.UI.PICKER_TYPE_DATE,
	  bottom:0,
	  minDate:minDate,
	  maxDate:maxDate,
	  value:value
	});
	registerDatePickerBackground.add(registerDatePicker);
	registerDatePicker.addEventListener("change", handleRegisterDatePickerChange);
	
	//picker for country and gender
	registerPicker = Ti.UI.createPicker({
	  bottom:0
	});
	registerPickerBackground.add(registerPicker);
	registerPicker.addEventListener("change", handleRegisterPickerChange);
	
	//picker done button
	registerPickerDoneButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34
	});
	registerPickerDoneButton.addEventListener("click", handleRegisterPickerDoneButton);
	
	//picker - toolbar flex space
	var registerFlexSpace = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	//picker toolbar
	registerToolbar = Titanium.UI.iOS.createToolbar({
	    items:[registerFlexSpace, registerPickerDoneButton],
	    barColor:'999999',
	    top:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	registerPickerBackground.add(registerToolbar);
	
	//picker done button
	registerDatePickerDoneButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34
	});
	registerDatePickerDoneButton.addEventListener("click", handleRegisterPickerDoneButton);
	
	//picker - toolbar flex space
	var registerDateFlexSpace = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	//picker toolbar
	registerDateToolbar = Titanium.UI.iOS.createToolbar({
	    items:[registerDateFlexSpace, registerDatePickerDoneButton],
	    barColor:'999999',
	    top:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	registerDatePickerBackground.add(registerDateToolbar);
	
	//gender picker data
	genderPicker[0]=Ti.UI.createPickerRow({title:'Male', id:1});
	genderPicker[1]=Ti.UI.createPickerRow({title:'Female', id:2});
	
	//country picker data
	var countries = getCountries();
	
	for(i=0;i<countries.length;i++){
		
		var countryPickerName = countries[i].name;
		var countryPickerId = countries[i].id;
		
		if(!isStringNullOrEmpty(countryPickerName)){
			countryPicker[i]=Ti.UI.createPickerRow({title:countryPickerName, id:countryPickerId});
			countryIndexes[countryPickerId] = i;
		}
		
	}
	
	registerPicker.add(countryPicker);
	
	return registerWindow;
}

function handleRegisterFormTermsCheckBox(e){
	var active = e.source.active;
	
	if(active){
		registerFormTermsCheckMark.hide();
		registerFormTermsCheckMark.active = false;
		registerFormTermsCheckBox.active = false;
	}else{
		registerFormTermsCheckMark.show();
		registerFormTermsCheckMark.active = true;
		registerFormTermsCheckBox.active = true;
	}
}

function handleRegisterFormNewsCheckBox(e){
	var active = e.source.active;
	
	if(active){
		registerFormNewsCheckMark.hide();
		registerFormNewsCheckBox.active = false;
		registerFormNewsCheckMark.active = false;
		signupUserObject.newsletter = 0;
	}else{
		registerFormNewsCheckMark.show();
		registerFormNewsCheckMark.active = true;
		registerFormNewsCheckBox.active = true;
		signupUserObject.newsletter = 1;
		
	}
}

function handleTermsLabelLink(){
	Ti.include('ui/iphone/terms.js');
	buildTermsView();
	
	if(iOS7){
		termsNavWin.open();
	}else{
		termsWindow.open();
	}
}

function handleRegisterDatePickerChange(e){
	//show date
	registerFieldBirthDateHintTextLabel.color = 'black';
	registerFieldBirthDateHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	registerFieldBirthDateHintTextLabel.opacity = 1;
	
	var pickerDate = e.value;
	
	var date = formatDate(pickerDate);
	
	registerFieldBirthDateHintTextLabel.text = date;
	signupUserObject.birth_date = pickerDate;
}

function handleRegisterPickerChange(e){
	if(registerPickerType == PICKER_COUNTRY){
		registerFieldCountryHintTextLabel.color = 'black';
		registerFieldCountryHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		registerFieldCountryHintTextLabel.opacity = 1;
		
		var data = registerPicker.getSelectedRow(0).title;
		registerFieldCountryHintTextLabel.text = data;
		signupUserObject.country = registerPicker.getSelectedRow(0).id;
	}else if(registerPickerType == PICKER_GENDER){
		registerFieldGenderHintTextLabel.color = 'black';
		registerFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		registerFieldGenderHintTextLabel.opacity = 1;
		
		var data = registerPicker.getSelectedRow(0).title;
		
		registerFieldGenderHintTextLabel.text = data;
		signupUserObject.gender = registerPicker.getSelectedRow(0).id;
	}
}

//handle picker done button
function handleRegisterPickerDoneButton(e){
	
	if(registerPickerType === PICKER_DATE_BIRTH){
		registerDatePickerBackground.animate({bottom:-260, duration:500});
		registerFieldAddress.focus();
	}else if(registerPickerType === PICKER_COUNTRY){
		registerPickerBackground.animate({bottom:-260, duration:500});
		registerFieldGenderHintTextLabel.fireEvent('click');
		registerScrollView.scrollTo(0,IPHONE5 ? 262 : 364);
		//store in object the id
		signupUserObject.country = registerPicker.getSelectedRow(0).id;
		//store the selected id in a variable
		registerSelectedRowCountry = registerPicker.getSelectedRow(0).id;
	}else if(registerPickerType === PICKER_GENDER){
		registerPickerBackground.animate({bottom:-260, duration:500});
		registerScrollView.scrollTo(0,IPHONE5 ? 202 : 186);
		
		signupUserObject.gender = registerPicker.getSelectedRow(0).id;
		registerSelectedRowGender = registerPicker.getSelectedRow(0).id;
	}
}

//handle picker data and animation
function registerHandlePicker(e){
	
	//clear all picker rows method
    clearRegisterPickerRows();
    
    registerFieldName.blur();
	registerFieldSurname.blur();
	registerFieldEmail.blur();
	registerFieldAddress.blur();
	registerFieldPassword.blur();
	
    var picker = e.source.picker;
    //add data for specified picker
	if(picker === PICKER_DATE_BIRTH){
		var pickerDate = registerDatePicker.value;
		registerFieldBirthDateHintTextLabel.color = 'black';
		registerFieldBirthDateHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		registerFieldBirthDateHintTextLabel.opacity = 1;
	
		var date = formatDate(pickerDate);
		
		registerFieldBirthDateHintTextLabel.text = date;
		signupUserObject.birth_date = pickerDate;
		registerScrollView.scrollTo(0,IPHONE5 ? 139 : 241);
		registerDatePickerBackground.animate({bottom:0, duration:500});
	}else if(picker === PICKER_COUNTRY){
		registerPicker.add(countryPicker);
		
		registerFieldCountryHintTextLabel.color = 'black';
		registerFieldCountryHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		registerFieldCountryHintTextLabel.opacity = 1;
		
		//select previously selected row
		registerPicker.setSelectedRow(0, countryIndexes[registerSelectedRowCountry], false);
		
		registerScrollView.scrollTo(0,IPHONE5 ? 221 : 323);
		registerPickerBackground.animate({bottom:0, duration:500});
	}else if(picker === PICKER_GENDER){
		registerPicker.add(genderPicker);
		
		registerFieldGenderHintTextLabel.color = 'black';
		registerFieldGenderHintTextLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		registerFieldGenderHintTextLabel.opacity = 1;
		
		//select previously selected row
		registerPicker.setSelectedRow(0, registerSelectedRowGender-1, false);
		
		registerScrollView.scrollTo(0,IPHONE5 ? 262 : 364);
		registerPickerBackground.animate({bottom:0, duration:500});
	}
	
	registerDatePicker.selectionIndicator = true;
	registerPicker.selectionIndicator = true;
	
	registerPickerType = picker;
}

//clear all picker rows
function clearRegisterPickerRows(){
	if (registerPicker.getColumns()[0]) {
 
        var _col = registerPicker.getColumns()[0];
	    var len  = _col.rowCount;
 
	    for (var x = len - 1; x >= 0; x--) {
                var _row = _col.rows[x];
                _col.removeRow(_row);
        }
    }
}

//Event handler for profile photo selection
function registerShowPhotoOptions(){
	registerPhotoDialog.show();
}
	
//Validator for signup form
function validateSignupForm(){
	//TODO translator integration here
	if(isStringNullOrEmpty(registerFieldName.value)){
		alert('NAME IS MISSING');
		return false;
	} else if(isStringNullOrEmpty(registerFieldSurname.value)){
		alert('SURNAME IS MISSING');
		return false;
	} else if(isStringNullOrEmpty(registerFieldEmail.value)){
		alert('EMAIL IS MISSING');
		return false;
	} else if(isStringNullOrEmpty(registerFieldPassword.value)){
		alert('PASSWORD IS MISSING');
		return false;
	}else if(typeof signupUserObject.birth_date == 'undefined'){
		alert('DATE OF BIRTH IS MISSING');
		return false;
	}else if(typeof signupUserObject.country == 'undefined'){
		alert('COUNTRY IS MISSING');
		return false;
	}else if(typeof signupUserObject.gender == 'undefined'){
		alert('GENDER IS MISSING');
		return false;
	}
	
	if(!isValidEmail(registerFieldEmail.value)){
		alert('INVALID EMAIL');
		return false;
	}
	
	if(signupUserObject.image == null){
		alert('PROFILE PHOTO MISSING');
		return false;
	}
	
	if(!registerFormTermsCheckBox.active){
		alert('Please agree to the terms!');
		return false;
	}
	
	//Prepare the signup object
	signupUserObject.name = registerFieldName.value +' '+registerFieldSurname.value;
	signupUserObject.email = registerFieldEmail.value;
	signupUserObject.password = registerFieldPassword.value;
	signupUserObject.followers = 0;
	signupUserObject.following = 0;
	signupUserObject.address = registerFieldAddress.value;
	
	return true;
}

//Event handler for signup button
function handleSignupClick(){
	if(validateSignupForm()){
		Ti.API.info('register form is valid');
		
		//Call signup() on the server
		doSignup(signupUserObject);	
	}
}

//handle textfield when not focused
function handleRegisterTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 1){
		if(registerFieldName.value == ''){
			registerFieldNameHintTextLabel.show();
		}
	}else if(field == 2){
		if(registerFieldSurname.value == ''){
			registerFieldSurnameHintTextLabel.show();
		}
	}else if(field == 3){
		if(registerFieldEmail.value == ''){
			registerFieldEmailHintTextLabel.show();
		}
	}else if(field == 4){
		if(registerFieldPassword.value == ''){
			registerFieldPasswordHintTextLabel.show();
		}
	}else if(field == 5){
		if(registerFieldAddress.value == ''){
			registerFieldAddressHintTextLabel.show();
		}
	}
}

//Server call for signup
function doSignup(uObj){
	Ti.API.info('doSignup() called with userObject='+ JSON.stringify(uObj)); 	
	
	//progress view
	var progressView = new ProgressView({window:registerWindow});
	progressView.show({
		text:"Saving data..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSignup() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSignup() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		//Update user object and close the signup window
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
			
			//Add our new user_id to the user object
			uObj.userId = jsonData.data.user_id;
			uObj.thumb_path = jsonData.data.thumb;
			uObj.image_path = jsonData.data.photo;
			uObj.token = jsonData.data.token;
			
			//Save data & update UI
			saveUserObject(uObj);
			updateLeftMenu(uObj);
			
			//Save lookup data (breeds, dogfuel rules, place categories)
			saveDogBreeds(jsonData.data.breeds);
			saveDogfuelRules(jsonData.data.rules);
			savePlaceCategories(jsonData.data.categories);
			
			//Hide message and close register window
			progressView.hide();
			
			//Only if we really came from the signup view
			if(!uObj.facebook_id){
				closeRegisterWindow();
			}
			
			//Init the app
			window.open(); //init the app
			window.setParallaxAmount(0.3);
			
			if(uObj.facebook_id){
				_import('ui/iphone/profile.js');
				navController.getWindow().add(viewProfile);
				navController.getWindow().setTitle(userObject.name);
			}
			
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
	xhr.open('POST',API+'signup');
	xhr.send({
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
		newsletter:uObj.newsletter
	});
}
	
//Closes the register window
function closeRegisterWindow(){
	
	initialWindow.animate({opacity:0, duration:100}, function(){
		registerWindow.close();
		window.remove(initialWindow);
		leftTableView.fireEvent('click', {menuItem:MENU_PROFILE});
	});
}

//Selects a photo from the camera roll
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
			registerThumbnailPreviewImageView.image = imageThumbnailPreview;
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			signupUserObject.image = compressedImage;
			signupUserObject.thumb = imageThumbnail;
			signupUserObject.image_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg";
			signupUserObject.thumb_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile_thumb.jpg";
			
			//Save images on the filesystem
			var tmpImage = Titanium.Filesystem.getFile(signupUserObject.image_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(signupUserObject.thumb_path);
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
	
function handleCameraSelection(){
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
			var imageThumbnailPreview = image.imageAsThumbnail(78,0,39);
			registerThumbnailPreviewImageView.image = imageThumbnailPreview;
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			signupUserObject.image = compressedImage;
			signupUserObject.thumb = imageThumbnail;
			signupUserObject.image_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg";
			signupUserObject.thumb_path = Titanium.Filesystem.applicationDataDirectory + "pic_profile_thumb.jpg";
			
			//Save images on the filesystem
			var tmpImage = Titanium.Filesystem.getFile(signupUserObject.image_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(signupUserObject.thumb_path);
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

function handleRegisterTextFieldFocus(e){
	if(registerPickerType === PICKER_DATE_BIRTH){
		registerDatePickerBackground.animate({bottom:-260, duration:500});
	}else if(registerPickerType === PICKER_COUNTRY  || registerPickerType === PICKER_GENDER){
		registerPickerBackground.animate({bottom:-260, duration:500});
	}
}
	
function handleRegisterTextFieldChange(e){
	var field = e.source.field;
	
	if(field == 1){
		if(registerFieldName.value != ''){
			registerFieldNameHintTextLabel.hide();
		}else {
			registerFieldNameHintTextLabel.show();
		}
	}else if(field == 2){
		if(registerFieldSurname.value != ''){
			registerFieldSurnameHintTextLabel.hide();
		}else {
			registerFieldSurnameHintTextLabel.show();
		}
	}else if(field == 3){
		if(registerFieldEmail.value != ''){
			registerFieldEmailHintTextLabel.hide();
		}else {
			registerFieldEmailHintTextLabel.show();
		}
	}else if(field == 4){
		if(registerFieldPassword.value != ''){
			registerFieldPasswordHintTextLabel.hide();
		}else {
			registerFieldPasswordHintTextLabel.show();
		}
	}else if(field == 5){
		if(registerFieldAddress.value != ''){
			registerFieldAddressHintTextLabel.hide();
		}else {
			registerFieldAddressHintTextLabel.show();
		}
	}
}