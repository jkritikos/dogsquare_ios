var passwordResetWindow = null;
var passwordResetNavWin = null;
var passwordResetFieldEmail = null;
var passwordResetFieldEmailHintTextLabel = null;

//Build the terms view
function buildPasswordResetView(){
	passwordResetWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		modal:true,
		translucent:false,
		barImage:iOS7 ? IMAGE_PATH+'common/bar7.png' : IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Password Reset'
	});
	
	//check if version is ios 7 and higher and create new navigationWindow (3.1.3.GA)
	if(iOS7){
		passwordResetNavWin = Ti.UI.iOS.createNavigationWindow({
		    modal: true,
		    window: passwordResetWindow
		});
	}
	
	var passwordResetDoneButton = Titanium.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:48,
	    height:33
	});
	passwordResetWindow.setRightNavButton(passwordResetDoneButton);
	
	passwordResetDoneButton.addEventListener('click', function(e){
		if(iOS7){
			passwordResetNavWin.close();
		}else{
			passwordResetWindow.close();
		}
	});
	
	var passwordResetDogsquareLogo = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/dogsquare_logo.png',
		top:10
	});
	passwordResetWindow.add(passwordResetDogsquareLogo);
	
	var passwordResetFormBackground = Ti.UI.createView({
		backgroundColor:'e7e6e6',
		top:70,
		width:262,
		height:42
	});
	
	//email textfield
	passwordResetFieldEmail = Ti.UI.createTextField({
		width:262,
		height:39,
		paddingLeft:4, 
		paddingRight:4,
		top:1,
		keyboardType:Ti.UI.KEYBOARD_EMAIL
	});
	passwordResetFormBackground.add(passwordResetFieldEmail);
	passwordResetFieldEmail.addEventListener('change', handlePasswordResetTextFieldChange);
	
	passwordResetFieldEmailHintTextLabel = Ti.UI.createLabel({
		text:'Your Email',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	passwordResetFieldEmail.add(passwordResetFieldEmailHintTextLabel);
	
	var passwordResetSepparator = Ti.UI.createView({
		backgroundColor:'CCCCCC',
		width:262,
		height:2,
		top:40,
		opacity:0.4
	});
	passwordResetFormBackground.add(passwordResetSepparator);
		
	passwordResetWindow.add(passwordResetFormBackground);
	
	//button to change password
	var passwordResetButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/reset_btn.png',
		width:270,
		height:55,
		top:123,
		bottom:30
	});
	passwordResetWindow.add(passwordResetButton);
	passwordResetButton.addEventListener('click', handlePasswordResetButton);
}

function handlePasswordResetTextFieldChange(e){
	if(passwordResetFieldEmail.value != ''){
		passwordResetFieldEmailHintTextLabel.hide();
	}else {
		passwordResetFieldEmailHintTextLabel.show();
	}
}

function handlePasswordResetButton(){
	passwordResetFieldEmail.blur();
	
	if(validatePasswordResetForm()){
		
	}	
}

function validatePasswordResetForm(){
	if(isStringNullOrEmpty(passwordResetFieldEmail.value)){
		alert(getLocalMessage(MSG_REGISTER_NO_EMAIL));
		return false;
	}
	
	return true;
}