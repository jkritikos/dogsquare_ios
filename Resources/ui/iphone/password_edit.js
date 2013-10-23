var passwordEditView = null;
var passwordEditFormBackground = null;
var passwordEditFieldOldPassword = null;
var passwordEditFieldOldPasswordHintText = null;
var passwordEditFieldNewPassword = null;
var passwordEditFieldNewPasswordHintText = null;
var passwordEditButton = null;

var passwordObject = {};

CURRENT_VIEW = VIEW_PASSWORD_EDIT;

function buildPasswordEditView(){
	if(passwordEditView == null){
		
		passwordEditView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		var passwordEditDogsquareLogo = Ti.UI.createImageView({
			image:IMAGE_PATH+'signup/dogsquare_logo.png',
			top:17
		});
		passwordEditView.add(passwordEditDogsquareLogo);
		
		//Form scroll container
		var passwordEditTxtFieldOffset = 41;
		var passwordEditTxtFieldHeight = 39;
		var passwordEditTxtFieldWidth = 262;
		
		passwordEditFormBackground = Ti.UI.createView({
			backgroundColor:'e7e6e6',
			top:83,
			width:262,
			height:83
		});
		passwordEditView.add(passwordEditFormBackground);
		
		//old password textfield
		passwordEditFieldOldPassword = Ti.UI.createTextField({
			width:passwordEditTxtFieldWidth,
			height:passwordEditTxtFieldHeight,
			top:1,
			passwordMask:true,
			paddingLeft:4, 
			paddingRight:4, 
			returnKeyType: Ti.UI.RETURNKEY_NEXT,
			field:1
		});
		passwordEditFormBackground.add(passwordEditFieldOldPassword);
		passwordEditFieldOldPassword.addEventListener('change', handlePasswordEditTextFieldChange);
		
		//Event listener for the old password textfield
		passwordEditFieldOldPassword.addEventListener('return', function() {
		    passwordEditFieldNewPassword.focus();
		});
		
		passwordEditFieldOldPasswordHintText = Ti.UI.createLabel({
			text:'Old Password*',
			color:'b3b3b3',
			textAlign:'left',
			left:4,
			height:30,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		passwordEditFieldOldPassword.add(passwordEditFieldOldPasswordHintText);
		
		//new password textfield
		passwordEditFieldNewPassword = Ti.UI.createTextField({
			width:passwordEditTxtFieldWidth,
			height:passwordEditTxtFieldHeight,
			paddingLeft:4, 
			paddingRight:4, 
			passwordMask:true,
			top:passwordEditFieldOldPassword.top + passwordEditTxtFieldOffset,
			backgroundColor:'grey',
			returnKeyType: Ti.UI.RETURNKEY_NEXT,
			field:2
		});
		passwordEditFormBackground.add(passwordEditFieldNewPassword);
		passwordEditFieldNewPassword.addEventListener('change', handlePasswordEditTextFieldChange);
		
		passwordEditFieldNewPasswordHintText = Ti.UI.createLabel({
			text:'New Password*',
			color:'b3b3b3',
			textAlign:'left',
			left:4,
			height:30,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		passwordEditFieldNewPassword.add(passwordEditFieldNewPasswordHintText);
		
		//sepparator offset
		var sepparatorOffset = 0;
		
		//creation of sepparators
		for(var i=0; i<=6; i++) {
			var passwordEditSepparator = Ti.UI.createView({
				backgroundColor:'CCCCCC',
				width:passwordEditTxtFieldWidth,
				height:2,
				top:40 + sepparatorOffset,
				opacity:0.4
			});
			passwordEditFormBackground.add(passwordEditSepparator);
			
			sepparatorOffset += 41;
		}
		
		//button to change password
		passwordEditButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/update_btn.png',
			width:270,
			height:55,
			top:195,
			bottom:30
		});
		passwordEditView.add(passwordEditButton);
		passwordEditButton.addEventListener('click', handlePasswordEditButton);
	}
}

function handlePasswordEditButton(){
	if(validatePasswordEditForm()){
		Ti.API.info('edit password form is valid');
		
		//save password change on the server
		doEditPassword(passwordObject);	
	}
}

function handlePasswordEditTextFieldChange(e){
	var field = e.source.field;
	
	if(field == 1){
		if(passwordEditFieldOldPassword.value != ''){
			passwordEditFieldOldPasswordHintText.hide();
		}else {
			passwordEditFieldOldPasswordHintText.show();
		}
	}else if(field == 2){
		if(passwordEditFieldNewPassword.value != ''){
			passwordEditFieldNewPasswordHintText.hide();
		}else {
			passwordEditFieldNewPasswordHintText.show();
		}
	}
}

//Validator for edit password form
function validatePasswordEditForm(){
	if(isStringNullOrEmpty(passwordEditFieldOldPassword.value)){
		alert('PROVIDE YOUR OLD PASSWORD');
		return false;
	} else if(isStringNullOrEmpty(passwordEditFieldNewPassword.value)){
		alert('PROVIDE A NEW PASSWORD');
		return false;
	}
	
	//Prepare the signup object
	passwordObject.old_pass = passwordEditFieldOldPassword.value;
	passwordObject.new_pass = passwordEditFieldNewPassword.value;
	
	return true;
}

//edit password in online server
function doEditPassword(pObj){
	
	//progress view
	var progressView = new ProgressView({window:passwordEditView});
	progressView.show({
		text:"Saving data..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doEditPassword() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('doEditPassword() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		//Update user object and close the signup window
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
		    var obj = {};
		    
		    obj.token = jsonData.data.token;
		    saveUserObject(obj);
		    
		    var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide message and close register window
			progressView.hide();
			navController.close(openWindows[openWindows.length-1]);
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
	xhr.open('POST',API+'editPassword');
	xhr.send({
		user_id:userObject.userId,
		old_pass:pObj.old_pass,
		new_pass:pObj.new_pass,
		token:userObject.token
	});
}