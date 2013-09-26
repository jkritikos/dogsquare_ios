//UI components
var registerWindow = null;
var hiddenRegisterView = null;
var registerNavBar = null;
var registerNavBarLabel = null;
var registerFormBorder = null;
var registerProfilePhotoButton = null;
var registerProfilePhotoLabel = null;
var registerFormScrollBackground = null;
var registerFormBackground = null;
var registerGenderMaleLabel = null;
var registerGenderFemaleLabel = null;
var registerGenderSelectorSlider = null;
var registerFieldName = null;
var registerFieldNameHintTextLabel = null;
var registerFieldEmail = null;
var registerFieldEmailHintTextLabel = null;
var registerFieldPassword = null;
var registerFieldPasswordHintTextLabel = null;
var registerFieldAge = null;
var registerFieldAgeHintTextLabel = null;
var registerFacebookButton = null;
var registerSignupButton = null;
var registerPhotoDialog = null;

var GENDER_FEMALE = 'female';
var GENDER_MALE = 'male';

var registerGenderNumber = GENDER_MALE;

//Data components
//Holds the user data entered through the signup form
var signupUserObject = {};

function buildRegisterWindow(){
	registerWindow = Ti.UI.createWindow({
		backButtonTitle:'back',
		title:'register',
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	/*this view is created to get the globalPoint for the slider - it needs a view to do that*/
	hiddenRegisterView = Ti.UI.createView({
		backgroundColor:'transparent'
	});
	
	registerWindow.add(hiddenRegisterView);
	
	registerNavBar = Ti.UI.createImageView({
		image:IMAGE_PATH+'common/bar.png',
		top:0
	});
	
	//back button
	var registerBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33,
	    left:6
	});
	registerNavBar.add(registerBackButton);
	
	registerBackButton.addEventListener("click", function() {
	   	registerWindow.close();
	   	initialWindow.remove(registerWindow);
	});
	
	registerNavBarLabel = Ti.UI.createLabel({
		text:'Welcome',
		color:'white',
		font:UI_FONT_SEMIBOLD_NAVBAR
	});
	
	registerNavBar.add(registerNavBarLabel);
	
	registerWindow.add(registerNavBar);
	
	//Custom navbar
	registerFormBorder = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/border.png',
		top:'12%'
	});
	
	registerWindow.add(registerFormBorder);
	
	//Profile pic selector
	registerProfilePhotoButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/place_photo.png',
		width:109,
		height:91,
		top:'13%'
	});
	
	registerProfilePhotoButton.addEventListener('click', registerShowPhotoOptions);
	
	registerWindow.add(registerProfilePhotoButton);
	
	registerProfilePhotoLabel = Ti.UI.createLabel({
		text:'Your Photo Here!',
		bottom:9,
		textAlign:'center',
		width:55,
		height:30,
		color:'black',
		font:{fontSize:8, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	registerProfilePhotoButton.add(registerProfilePhotoLabel);
	
	//Form scroll container
	var registerTxtFieldOffset = 34;
	var registerTxtFieldHeight = 32;
	var registerTxtFieldWidth = 192;
	
	registerFormScrollBackground = Ti.UI.createScrollView({
		top:IPHONE5 ? 221 : 192,
		width:192,
		height:140
	});
	
	//Form background
	registerFormBackground = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/fields_area.png',
		top:'32%'
	});
	
	//Gender selector MALE label
	registerGenderMaleLabel = Ti.UI.createLabel({
		text:'Male',
		top:17,
		left:37,
		color:'#6a5b5b',
		font:{fontSize:14, fontWeight:'bold', fontFamily:'Open Sans'},
		zIndex:2
	});
	
	registerFormBackground.add(registerGenderMaleLabel);
	
	//Gender selector FEMALE label
	registerGenderFemaleLabel = Ti.UI.createLabel({
		text:'Female',
		top:17,
		right:28,
		color:'#6a5b5b',
		font:{fontSize:14, fontWeight:'bold', fontFamily:'Open Sans'},
		zIndex:2
	});
	
	registerFormBackground.add(registerGenderFemaleLabel);
	
	//Gender selector sliding button
	registerGenderSelectorSlider = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/Selected_genre.png',
		top:12,
		left:8
	});
	
	registerFormBackground.add(registerGenderSelectorSlider);
	
	//Name textfield
	registerFieldName = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:1,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:1
	});
	
	registerFieldName.addEventListener('change', handleRegisterTextFieldFocus);
	registerFieldName.addEventListener('blur', handleRegisterTextFieldBlur);
	
	//Event listener for the name textfield
	registerFieldName.addEventListener('return', function() {
	    registerFieldEmail.focus();
	});
	
	registerFormScrollBackground.add(registerFieldName);
	
	registerFieldNameHintTextLabel = Ti.UI.createLabel({
		text:'Name*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		width:80,
		height:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldName.add(registerFieldNameHintTextLabel);
	
	//Email textfield
	registerFieldEmail = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:registerFieldName.top + registerTxtFieldOffset,
		keyboardType:Ti.UI.KEYBOARD_EMAIL,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:2
	});
	
	registerFieldEmail.addEventListener('change', handleRegisterTextFieldFocus);
	registerFieldEmail.addEventListener('blur', handleRegisterTextFieldBlur);
	
	//Event listener for the email textfield
	registerFieldEmail.addEventListener('return', function() {
	    registerFieldPassword.focus();
	});
	
	registerFormScrollBackground.add(registerFieldEmail);
	
	registerFieldEmailHintTextLabel = Ti.UI.createLabel({
		text:'Email address*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		width:95,
		height:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldEmail.add(registerFieldEmailHintTextLabel);
	
	//Password textfield
	registerFieldPassword = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:registerFieldEmail.top + registerTxtFieldOffset,
		backgroundColor:'grey',
		passwordMask:true,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:3
	});
	
	registerFieldPassword.addEventListener('change', handleRegisterTextFieldFocus);
	registerFieldPassword.addEventListener('blur', handleRegisterTextFieldBlur);
	
	//Event listener for the password textfield
	registerFieldPassword.addEventListener('return', function() {
	    registerFieldAge.focus();
	});
	
	registerFormScrollBackground.add(registerFieldPassword);
	
	registerFieldPasswordHintTextLabel = Ti.UI.createLabel({
		text:'Password*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		width:80,
		height:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldPassword.add(registerFieldPasswordHintTextLabel);
	
	//Age textfield
	registerFieldAge = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:registerFieldPassword.top + registerTxtFieldOffset,
		returnKeyType: Ti.UI.RETURNKEY_DONE,
		field:4
	});
	
	registerFieldAge.addEventListener('change', handleRegisterTextFieldFocus);
	registerFieldAge.addEventListener('blur', handleRegisterTextFieldBlur);
	registerFormScrollBackground.add(registerFieldAge);
	
	registerFieldAgeHintTextLabel = Ti.UI.createLabel({
		text:'Age',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		width:80,
		height:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldAge.add(registerFieldAgeHintTextLabel);
	
	//sepparator offset
	var sepparatorOffset = 0;
	
	//creation of sepparators
	for(var i=0; i<=3; i++) {
		var registerSepparator = Ti.UI.createView({
			backgroundColor:'CCCCCC',
			width:registerTxtFieldWidth,
			height:2,
			top:33 + sepparatorOffset,
			opacity:0.4
		});
		registerFormScrollBackground.add(registerSepparator);
		
		sepparatorOffset += 34;
	}
	
	registerWindow.add(registerFormBackground);
	registerWindow.add(registerFormScrollBackground);
	
	//Facebook button
	registerFacebookButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/Facebook_button.png',
		width:241,
		height:45,
		bottom:5
	});
	
	registerWindow.add(registerFacebookButton);
	
	registerFacebookButton.addEventListener('click', function(){
		fb.authorize();
		/*
		w.close();
		loginWindow.animate({opacity:0, duration:1}, function(){
			window.remove(loginWindow);
		});
		*/
	});

	//Signup button
	registerSignupButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/sign_up_button.png',
		width:161,
		height:47,
		bottom:75
	});
	
	registerSignupButton.addEventListener('click', handleSignupClick);
	
	registerWindow.add(registerSignupButton);
	
	registerGenderSelectorSlider.addEventListener('touchstart', function(e){ //changed by alex
	     e.source.axis = parseInt(e.x);
	});
	
	registerGenderSelectorSlider.addEventListener('touchmove', function(e){ //changed by alex
		var globalPoint = e.source.convertPointToView({x:e.x, y:e.y}, hiddenRegisterView);
	    var coordinates = (globalPoint.x - e.source.axis) - 63;
	    
        if(coordinates <= 102 && coordinates >= 8){
	    	registerGenderSelectorSlider.left = coordinates;
	    }
        
	});
	
	registerGenderSelectorSlider.addEventListener('touchend', function(e){ //changed by alex
	   
	    if(registerGenderSelectorSlider.left >= 60){
	    	registerGenderNumber = GENDER_FEMALE;
	    	
	        // Positioning the slider to the right
	        registerGenderSelectorSlider.animate({
	            left:102,
	            duration:300
	        });
	    }else if(registerGenderSelectorSlider.left <= 60){
	    	registerGenderNumber = GENDER_MALE;
	    	
	        // Positioning the slider to the left
	        registerGenderSelectorSlider.animate({
	            left:8,
	            duration:300
	        });
	    }
	});
	
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
	
	return registerWindow;
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
	} else if(isStringNullOrEmpty(registerFieldEmail.value)){
		alert('EMAIL IS MISSING');
		return false;
	} else if(isStringNullOrEmpty(registerFieldPassword.value)){
		alert('PASSWORD IS MISSING');
		return false;
	}
	
	if(!isStringNullOrEmpty(registerFieldAge.value) && !isWithinRange(registerFieldAge.value, 12, 100)){
		alert('INVALID AGE');
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
	
	//Prepare the signup object
	signupUserObject.name = registerFieldName.value;
	signupUserObject.email = registerFieldEmail.value;
	signupUserObject.password = registerFieldPassword.value;
	signupUserObject.age = registerFieldAge.value;
	signupUserObject.followers = 0;
	signupUserObject.following = 0;
	signupUserObject.gender = registerGenderNumber;
	//signupUserObject.gender =;
	//signupUserObject.facebook_id = d;
	
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
		if(registerFieldEmail.value == ''){
			registerFieldEmailHintTextLabel.show();
		}
	}else if(field == 3){
		if(registerFieldPassword.value == ''){
			registerFieldPasswordHintTextLabel.show();
		}
	}else if(field == 4){
		if(registerFieldAge.value == ''){
			registerFieldAgeHintTextLabel.show();
		}
	}
}

//Server call for signup
function doSignup(uObj){
	Ti.API.info('doSignup() called with userObject='+ JSON.stringify(uObj)); 	
	
	//progress view
	var progressView = new ProgressView({window:registerWindow});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
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
			
			//Save data & update UI
			saveUserObject(uObj);
			updateLeftMenu(uObj);
			
			//Hide message and close register window
			progressView.hide();
			closeRegisterWindow();
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
		age:uObj.age,
		facebook_id:uObj.facebook_id,
		gender:uObj.gender
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
	
function handlePhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
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
	Titanium.Media.takePicture({
		success:function(event){
			var image = event.media;
			
			//Reduce image size first
			Ti.API.info('Took image with h:'+image.height+' w:'+image.width);
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
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
	var field = e.source.field;
	
	if(field == 1){
		if(registerFieldName.value != ''){
			registerFieldNameHintTextLabel.hide();
		}else {
			registerFieldNameHintTextLabel.show();
		}
	}else if(field == 2){
		if(registerFieldEmail.value != ''){
			registerFieldEmailHintTextLabel.hide();
		}else {
			registerFieldEmailHintTextLabel.show();
		}
	}else if(field == 3){
		if(registerFieldPassword.value != ''){
			registerFieldPasswordHintTextLabel.hide();
		}else {
			registerFieldPasswordHintTextLabel.show();
		}
	}else if(field == 4){
		if(registerFieldAge.value != ''){
			registerFieldAgeHintTextLabel.hide();
		}else {
			registerFieldAgeHintTextLabel.show();
		}
	}
}