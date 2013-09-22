
var loginFieldEmail = null;
var loginFieldEmailHintTextLabel = null;
var loginFieldPassword = null;
var loginFieldPasswordHintTextLabel = null;
var loginWindow = null;

var loginObject = {};

function buildLoginWindow(){
	loginWindow = Ti.UI.createWindow({
		title:'Login',
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	var loginNavBar = Ti.UI.createImageView({
		image:IMAGE_PATH+'common/bar.png',
		top:0
	});
	
	//back button
	var loginBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33,
	    left:6
	});
	loginNavBar.add(loginBackButton);
	
	loginBackButton.addEventListener("click", function() {
	   	loginWindow.close();
	   	initialWindow.remove(loginWindow);
	});
	
	var loginNavBarLabel = Ti.UI.createLabel({
		text:'Login',
		color:'white',
		font:UI_FONT_SEMIBOLD_NAVBAR
	});
	
	loginNavBar.add(loginNavBarLabel);
	
	loginWindow.add(loginNavBar);
	
	//Form background
	var loginFormBackgroundImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'login/field.png',
		top:65
	});
	loginWindow.add(loginFormBackgroundImage);
	
	var loginFormBackground = Ti.UI.createView({
		backgroundColor:'e7e6e6',
		top:93,
		width:192,
		height:62
	});
	
	//email textfield
	loginFieldEmail = Ti.UI.createTextField({
		width:192,
		height:29,
		top:1,
		returnKeyType: Ti.UI.RETURNKEY_NEXT,
		field:1
	});
	
	loginFieldEmail.addEventListener('change', handleLoginTextFieldChange);
	loginFieldEmail.addEventListener('blur', handleLoginTextFieldBlur);

	
	//Event listener for the email textfield
	loginFieldEmail.addEventListener('return', function() {
	    loginFieldPassword.focus();
	});
	
	loginFieldEmailHintTextLabel = Ti.UI.createLabel({
		text:'Your Email',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		width:80,
		height:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	loginFieldEmail.add(loginFieldEmailHintTextLabel);
	loginFormBackground.add(loginFieldEmail);
	
	//password textfield
	loginFieldPassword = Ti.UI.createTextField({
		width:192,
		height:29,
		top:31,
		passwordMask:true,
		field:2
	});
	
	loginFieldPassword.addEventListener('change', handleLoginTextFieldChange);
	loginFieldPassword.addEventListener('blur', handleLoginTextFieldBlur);
	
	loginFieldPasswordHintTextLabel = Ti.UI.createLabel({
		text:'Password',
		color:'999999',
		textAlign:'left',
		left:4,
		opacity:0.7,
		width:80,
		height:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	loginFieldPassword.add(loginFieldPasswordHintTextLabel);
	loginFormBackground.add(loginFieldPassword);
	
	//sepparator offset
	var sepparatorOffset = 0;
	
	//creation of sepparators
	for(var i=0; i<=1; i++) {
		var loginSepparator = Ti.UI.createView({
			backgroundColor:'CCCCCC',
			width:192,
			height:2,
			top:30 + sepparatorOffset,
			opacity:0.4
		});
		loginFormBackground.add(loginSepparator);
		
		sepparatorOffset += 29;
	}
	loginWindow.add(loginFormBackground);
	
	var loginForgotPasswordLabel = Ti.UI.createLabel({
		text:'forgot your password?',
		color:'black',
		textAlign:'left',
		left:160,
		top:155,
		width:103,
		height:18,
		font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	loginWindow.add(loginForgotPasswordLabel);
	
	//login button
	var loginButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'login/Login_button.png',
		width:155,
		height:45,
		top:198
	});
	loginWindow.add(loginButton);
	loginButton.addEventListener('click', handleLoginButton);
	
	//login button
	var facebookButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'login/Facebook_login.png',
		width:237,
		height:43,
		top:298
	});
	loginWindow.add(facebookButton);
	
	return loginWindow;
}


//handle textfield when not focused
function handleLoginTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 1){
		if(loginFieldEmail.value == ''){
			loginFieldEmailHintTextLabel.show();
		}
	}else if(field == 2){
		if(loginFieldPassword.value == ''){
			loginFieldPasswordHintTextLabel.show();
		}
	}
}

function handleLoginTextFieldChange(e){
	var field = e.source.field;
	
	if(field == 1){
		if(loginFieldEmail.value != ''){
			loginFieldEmailHintTextLabel.hide();
		}else {
			loginFieldEmailHintTextLabel.show();
		}
	}else if(field == 2){
		if(loginFieldPassword.value != ''){
			loginFieldPasswordHintTextLabel.hide();
		}else {
			loginFieldPasswordHintTextLabel.show();
		}
	}
}

function handleLoginButton(){
	loginFieldEmail.blur();
	loginFieldPassword.blur();
	if(loginFieldEmail.value != '' && loginFieldPassword.value != ''){
		
		loginObject.password = loginFieldPassword.value;
		loginObject.email = loginFieldEmail.value;
		
		checkLoginCredentials(loginObject);
	}
	
}

//Server call for signup
function checkLoginCredentials(lObj){
	Ti.API.info('checkLoginCredentials() called with loginObject='+ JSON.stringify(lObj)); 	
	
	//progress view
	var progressView = new ProgressView({window:loginWindow});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('checkLoginCredentials() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		//Update user object and close the signup window
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
		    
		    
		    
		    var userObj = {};
			
			userObj.userId = jsonData.data.user.id;
			userObj.image_path = jsonData.data.user.photo;
			userObj.thumb_path = jsonData.data.user.thumb;
			userObj.name = jsonData.data.user.name;
			userObj.email = jsonData.data.user.email;
			userObj.facebook_id = jsonData.data.user.facebook_id;
			userObj.gender = jsonData.data.user.gender;
			userObj.followers = jsonData.data.user.followers;
			userObj.following = jsonData.data.user.following;
			
			//Save user data & update UI
			saveUserObject(userObj);
			updateLeftMenu(userObj);
			
			cleanDB();
			
			var dogArray = [];
			var dogObj = {};
			
			for(i=0;i<jsonData.data.dogs.length;i++){
				dogObj.name = jsonData.data.dogs[i].Dog.name;
				dogObj.dog_id = jsonData.data.dogs[i].Dog.id;
				dogObj.photo_filename = jsonData.data.dogs[i].Dog.photo;
				dogObj.breed_id = 1;
				dogObj.breed = jsonData.data.dogs[i].Dog.dog_breed;
				dogObj.age = jsonData.data.dogs[i].Dog.age;
				dogObj.gender = jsonData.data.dogs[i].Dog.gender;
				dogObj.weight = jsonData.data.dogs[i].Dog.weight;
				dogObj.thumb_path = jsonData.data.dogs[i].Dog.thumb;
				dogObj.mating = jsonData.data.dogs[i].Dog.mating;
				
				//Save dog data
				saveDog(dogObj);
				dogArray.push(dogObj);
				dogObj = {};
			}
			//populate dog rows
			populateRightMenu(dogArray);
			
			saveDogBreeds(jsonData.data.breeds);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			//update menu counts
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide message and close register window
			progressView.hide();
			closeLoginWindow();
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
	xhr.open('POST',API+'login');
	xhr.send({
		password:lObj.password,
		email:lObj.email
	});
}

//Closes the login window
function closeLoginWindow(){
	
	initialWindow.animate({opacity:0, duration:100}, function(){
		loginWindow.close();
		window.remove(initialWindow);
		leftTableView.fireEvent('click', {menuItem:MENU_PROFILE});
	});
}