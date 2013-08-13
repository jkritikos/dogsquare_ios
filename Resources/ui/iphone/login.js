var loginWindow = Ti.UI.createWindow({
	backgroundColor:'green',
	title:'login'
});

var closeButton = Ti.UI.createButton({
	title:'close',
});
			
loginWindow.add(closeButton);
			
closeButton.addEventListener('click', function(){
	loginWindow.animate({opacity:0, duration:250}, function(){
		window.remove(loginWindow);
	});
	
});

var registerButton = Ti.UI.createButton({
	title:'Register',
	bottom:30
});

loginWindow.add(registerButton);

registerButton.addEventListener('click', function(){
	
	var w = Ti.UI.createWindow({
		backButtonTitle:'back',
		title:'register',
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	/*this view is created to get the globalPoint for the slider -
	it needs a view to do that*/
	var hiddenView = Ti.UI.createView({
		backgroundColor:'transparent'
	});
	w.add(hiddenView);
	
	var registerNavBar = Ti.UI.createImageView({
		image:IMAGE_PATH+'common/bar.png',
		top:0
	});
	
	var registerNavBarLabel = Ti.UI.createLabel({
		text:'Welcome',
		color:'white',
		font:UI_FONT_SEMIBOLD_NAVBAR
	})
	
	registerNavBar.add(registerNavBarLabel);
	
	w.add(registerNavBar);
	
	//Custom navbar
	var registerFormBorder = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/border.png',
		top:'12%'
	});
	
	w.add(registerFormBorder);
	
	//Profile pic selector
	var registerProfilePhotoButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/place_photo.png',
		width:109,
		height:91,
		top:'13%'
	});
	
	registerProfilePhotoButton.addEventListener('click', registerShowPhotoOptions);
	
	w.add(registerProfilePhotoButton);
	
	
	var registerProfilePhotoLabel = Ti.UI.createLabel({
		text:'Your Photo Here!',
		bottom:9,
		textAlign:'center',
		width:45,
		height:30,
		color:'black',
		font:{fontSize:8, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	registerProfilePhotoButton.add(registerProfilePhotoLabel);
	
	//Form scroll container
	var registerTxtFieldOffset = 34;
	var registerTxtFieldHeight = 32;
	var registerTxtFieldWidth = 192;
	
	var registerFormScrollBackground = Ti.UI.createScrollView({
		top:192,
		width:192,
		height:140
	});
	
	//Form background
	var registerFormBackground = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/fields_area.png',
		top:'32%'
	});
	
	//Gender selector MALE label
	var registerGenderMaleLabel = Ti.UI.createLabel({
		text:'Male',
		top:11
	});
	
	//Gender selector FEMALE label
	var registerGenderFemaleLabel = Ti.UI.createLabel({
		text:'Female',
		top:14,
		right:19,
		color:'white',
		font:{fontSize:18, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	registerFormBackground.add(registerGenderFemaleLabel);
	
	//Gender selector sliding button
	var registerGenderSelectorSlider = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/Selected_genre.png',
		top:12,
		left:8
	});
	
	registerFormBackground.add(registerGenderSelectorSlider);
	
	//Name textfield
	var registerFieldName = Ti.UI.createTextField({
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
	
	
	
	var registerFieldNameHintTextLabel = Ti.UI.createLabel({
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
	var registerFieldEmail = Ti.UI.createTextField({
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
	
	var registerFieldEmailHintTextLabel = Ti.UI.createLabel({
		text:'Email*',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		width:80,
		height:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	registerFieldEmail.add(registerFieldEmailHintTextLabel);
	
	//Password textfield
	var registerFieldPassword = Ti.UI.createTextField({
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
	
	var registerFieldPasswordHintTextLabel = Ti.UI.createLabel({
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
	var registerFieldAge = Ti.UI.createTextField({
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:registerFieldPassword.top + registerTxtFieldOffset,
		returnKeyType: Ti.UI.RETURNKEY_DONE,
		field:4
	});
	
	registerFieldAge.addEventListener('change', handleRegisterTextFieldFocus);
	registerFieldAge.addEventListener('blur', handleRegisterTextFieldBlur);
	registerFormScrollBackground.add(registerFieldAge);
	
	var registerFieldAgeHintTextLabel = Ti.UI.createLabel({
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
	
	w.add(registerFormBackground);
	w.add(registerFormScrollBackground);
	
	//Facebook button
	var registerFacebookButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/Facebook_button.png',
		width:241,
		height:45,
		bottom:5
	});
	
	w.add(registerFacebookButton);
	
	registerFacebookButton.addEventListener('click', function(){
		w.close();
		loginWindow.animate({opacity:0, duration:1}, function(){
			window.remove(loginWindow);
		});
	});

	//Signup button
	var registerSignupButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/sign_up_button.png',
		width:161,
		height:47,
		bottom:75
	});
	
	registerSignupButton.addEventListener('click', showProfileAfterUserSignup);
	
	w.add(registerSignupButton);
	
	loginWindow.add(w);
	w.open();
	
	var registerPhotoDialog = Titanium.UI.createOptionDialog({
		options:['Take Photo', 'Choose From Library', 'Cancel'],
		cancel:2
	});
	
	//Event handler for profile photo selection
	function registerShowPhotoOptions(){
		registerPhotoDialog.show();
	}
	
	registerPhotoDialog.addEventListener('click',function(e){
		if(e.index == 0){
			handleCameraSelection();
		} else if(e.index == 1){
			handlePhotoSelection();
		}
	});
	
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
		
		return true;
	}
	
	function showProfileAfterUserSignup(){
		if(validateSignupForm()){
			Ti.API.info('register form is valid');
			w.close();
			loginWindow.animate({opacity:0, duration:1}, function(){
				window.remove(loginWindow);
				leftTableView.fireEvent('click', {menuItem:MENU_PROFILE});
			});
		}
	}
	
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
	
	function handleCameraSelection(){
		
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
				registerFieldNameHintTextLabel.show();
			}
		}else if(field == 3){
			if(registerFieldPassword.value != ''){
				registerFieldPasswordHintTextLabel.hide();
			}else {
				registerFieldNameHintTextLabel.show();
			}
		}else if(field == 4){
			if(registerFieldAge.value != ''){
				registerFieldAgeHintTextLabel.hide();
			}else {
				registerFieldNameHintTextLabel.show();
			}
		}
	}
	
	//handle textfield when not focused
	function handleRegisterTextFieldBlur(e){
		var field = e.source.field;
		
		if(field == 1){
			if(registerFieldName.value == ''){
				registerFieldNameHintTextLabel.show();
			}
			registerFieldName.blur();
		}else if(field == 2){
			if(registerFieldEmail.value == ''){
				registerFieldEmailHintTextLabel.show();
			}
			registerFieldEmail.blur();
		}else if(field == 3){
			if(registerFieldPassword.value == ''){
				registerFieldPasswordHintTextLabel.show();
			}
			registerFieldPassword.blur();
		}else if(field == 4){
			if(registerFieldAge.value == ''){
				registerFieldAgeHintTextLabel.show();
			}
			registerFieldAge.blur();
		}
	}
	
	registerGenderSelectorSlider.addEventListener('touchstart', function(e){ //changed by alex
	     e.source.axis = parseInt(e.x);
	});
	
	registerGenderSelectorSlider.addEventListener('touchmove', function(e){ //changed by alex
		var globalPoint = e.source.convertPointToView({x:e.x, y:e.y}, hiddenView);
	    var coordinates = (globalPoint.x - e.source.axis) - 63;
	    
        if(coordinates <= 102 && coordinates >= 8){
	    	registerGenderSelectorSlider.left = coordinates;
	    }
        
	});
	
	registerGenderSelectorSlider.addEventListener('touchend', function(e){ //changed by alex
	   
	    if(registerGenderSelectorSlider.left >= 60){
	        // Positioning the slider to the right
	        registerGenderSelectorSlider.animate({
	            left:102,
	            duration:300
	        });
	    }else if(registerGenderSelectorSlider.left <= 60){
	        // Positioning the slider to the left
	        registerGenderSelectorSlider.animate({
	            left:8,
	            duration:300
	        });
	    }
	});
});

var loginButton = Ti.UI.createButton({
	title:'Login',
	top:40
});

loginWindow.add(loginButton);