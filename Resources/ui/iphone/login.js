//UI components
var loginFieldEmail = null;
var loginFieldEmailHintTextLabel = null;
var loginFieldPassword = null;
var loginFieldPasswordHintTextLabel = null;
var loginWindow = null;
var loginWindowPopupMode = null;

var loginObject = {};

function buildLoginWindow(isPopup){
    Ti.API.info('buildLoginWindow() called with iOS7='+iOS7);
    
	loginWindowPopupMode = isPopup;
	Titanium.UI.iPhone.showStatusBar();
	
	loginWindow = Ti.UI.createWindow({
		title:'Login',
		backgroundColor:UI_BACKGROUND_COLOR,
		navTintColor:UI_COLOR,
		translucent:false
	});
	
	var loginNavBar = Ti.UI.createImageView({
		image:iOS7 ? IMAGE_PATH+'common/bar7.png' : IMAGE_PATH+'common/bar.png',
		top:iOS7 ? 0 : -2
	});
	
	//Back button only when not in popup mode
	if(!isPopup){
		var loginBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33,
		    left:6,
		    top:iOS7 ? 23 : 8
		});
		
		loginNavBar.add(loginBackButton);
		
		loginBackButton.addEventListener("click", function() {
		   	loginWindow.close({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		   	initialWindow.remove(loginWindow);
		});
	}
	
	var loginNavBarLabel = Ti.UI.createLabel({
		text:'Login',
		color:'white',
		font:UI_FONT_SEMIBOLD_NAVBAR,
		top:iOS7 ? 20 : 5
	});
	
	loginNavBar.add(loginNavBarLabel);
	loginWindow.add(loginNavBar);
	
	var loginViewDogsquareLogo = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/dogsquare_logo.png',
		top:75
	});
	loginWindow.add(loginViewDogsquareLogo);
	
	var loginFormBackground = Ti.UI.createView({
		backgroundColor:'e7e6e6',
		top:136,
		width:262,
		height:83
	});
	
	//email textfield
	loginFieldEmail = Ti.UI.createTextField({
		width:262,
		height:39,
		paddingLeft:4, 
		paddingRight:4,
		top:1,
		keyboardType:Ti.UI.KEYBOARD_EMAIL,
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
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	loginFieldEmail.add(loginFieldEmailHintTextLabel);
	loginFormBackground.add(loginFieldEmail);
	
	//password textfield
	loginFieldPassword = Ti.UI.createTextField({
		width:262,
		height:39,
		paddingLeft:4, 
		paddingRight:4,
		top:42,
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
		height:30,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	loginFieldPassword.add(loginFieldPasswordHintTextLabel);
	loginFormBackground.add(loginFieldPassword);
	
	//sepparator offset
	var sepparatorOffset = 0;
	
	//creation of sepparators
	for(var i=0; i<=1; i++) {
		var loginSepparator = Ti.UI.createView({
			backgroundColor:'CCCCCC',
			width:262,
			height:2,
			top:40 + sepparatorOffset,
			opacity:0.4
		});
		loginFormBackground.add(loginSepparator);
		
		sepparatorOffset += 41;
	}
	loginWindow.add(loginFormBackground);
	
	var loginForgotPasswordLabel = Ti.UI.createLabel({
		text:'forgot your password?',
		color:'black',
		textAlign:'left',
		top:305,
		height:18,
		opacity:0.6,
		font:{fontSize:11, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	loginWindow.add(loginForgotPasswordLabel);
	loginForgotPasswordLabel.addEventListener('click', handleForgotPasswordLabelLink);
	
	//login button
	var loginButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'login/login_btn.png',
		width:270,
		height:55,
		top:232
	});
	loginWindow.add(loginButton);
	loginButton.addEventListener('click', handleLoginButton);
	
	//Facebook login button
	var facebookButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'login/facebook_btn.png',
		width:274,
		height:85,
		top:341
	});
	loginWindow.add(facebookButton);
	
	facebookButton.addEventListener('click', function(){
		CURRENT_VIEW = VIEW_LOGIN;
		Ti.API.info('Facebook login button clicked from login view');
		
		fb.authorize();
	});
	
	return loginWindow;
}

function handleForgotPasswordLabelLink(){
	
	Ti.include('ui/iphone/password_reset.js');
	buildPasswordResetView();
	
	//if(iOS7){
		passwordResetNavWin.open();
	//}else{
	//	passwordResetWindow.open();
	//}
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
	
	if(validateLoginForm()){
		checkLoginCredentials(loginObject);
	}	
}

function validateLoginForm(){
	if(isStringNullOrEmpty(loginFieldEmail.value)){
		alert(getLocalMessage(MSG_REGISTER_NO_EMAIL));
		return false;
	}else if(isStringNullOrEmpty(loginFieldPassword.value)){
		alert(getLocalMessage(MSG_REGISTER_NO_PASSWORD));
		return false;
	}
	
	loginObject.password = loginFieldPassword.value;
	loginObject.email = loginFieldEmail.value;
	
	return true;
}

//Server call for login
function checkLoginCredentials(lObj){
	Ti.API.info('checkLoginCredentials() called with loginObject='+ JSON.stringify(lObj)); 	
	var erasedDatabase = false;
	
	//progress view
	var progressView = new ProgressView({window:loginWindow});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in checkLoginCredentials() '+JSON.stringify(e));
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
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
			userObj.address = jsonData.data.user.address;
			userObj.newsletter = jsonData.data.user.newsletter;
			userObj.birth_date = jsonData.data.user.birth_date;
			userObj.country = jsonData.data.user.country;
			userObj.facebook_id = jsonData.data.user.facebook_id;
			userObj.gender = jsonData.data.user.gender;
			userObj.followers = jsonData.data.user.followers;
			userObj.following = jsonData.data.user.following;
			userObj.token = jsonData.data.token;
			
			//Save user data & update UI
			saveUserObject(userObj);
			updateLeftMenu(userObj);
			
			//Clear the local db if this is a new user logging in
			var lastLoginBy = getLastLogin();
			if(lastLoginBy != null && lastLoginBy != jsonData.data.user.id){
				Ti.API.info('last user id logged in was '+lastLoginBy + ' - current user logging in is '+jsonData.data.user.id+' - CLEANING DB');
				cleanDB();
				erasedDatabase = true;
			} else {
				Ti.API.info('not cleaning db - lastLoginBy '+lastLoginBy+' and current login by '+jsonData.data.user.id);
			}
			
			//Pesists the user that logs in
			saveUserLogin(jsonData.data.user.id);
			
			var dogArray = [];
			var dogObj = {};
			
			for(i=0;i<jsonData.data.dogs.length;i++){
				dogObj.name = jsonData.data.dogs[i].Dog.name;
				dogObj.dog_id = jsonData.data.dogs[i].Dog.id;
				dogObj.photo_filename = jsonData.data.dogs[i].Dog.photo;
				dogObj.breed_id = jsonData.data.dogs[i].Dog.breed_id;
				dogObj.breed = jsonData.data.dogs[i].Dog.dog_breed;
				dogObj.age = jsonData.data.dogs[i].Dog.age;
				dogObj.gender = jsonData.data.dogs[i].Dog.gender;
				dogObj.weight = jsonData.data.dogs[i].Dog.weight;
				dogObj.thumb_path = jsonData.data.dogs[i].Dog.thumb;
				dogObj.mating = jsonData.data.dogs[i].Dog.mating;
				dogObj.size = jsonData.data.dogs[i].Dog.size;
				dogObj.dogfuel = jsonData.data.dogs[i].Dog.dogfuel;
				
				//Save dog data if we have cleared the database OR this is the first time someone logs in
				if(erasedDatabase || lastLoginBy == null){
					saveDog(dogObj);
				}
				
				dogArray.push(dogObj);
				dogObj = {};
			}
			//populate dog rows
			populateRightMenu(dogArray);
			
			saveDogBreeds(jsonData.data.breeds);

			saveDogfuelRules(jsonData.data.rules);
			
			//save place categories
			savePlaceCategories(jsonData.data.categories);
			
			//save passport notes
			var notes = jsonData.data.notes;
			var noteObj = {};
			
			for(i=0;i<notes.length;i++){
				noteObj.title = notes[i].Note.title;
				noteObj.note_id = notes[i].Note.id;
				noteObj.description = notes[i].Note.description;
				var date = new Date(notes[i].Note.date);
				noteObj.date = date;
				noteObj.remind_flag = notes[i].Note.remind;
				noteObj.completed = notes[i].Note.completed;
				
				saveNote(noteObj);
				noteObj = {};
			}
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			//update menu counts
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide message and close login window
			progressView.hide();
			closeLoginWindow();
			
			//Init the app
			window.open(); //init the app
			window.setParallaxAmount(0.3);
			
			if(statusBarWindowHack == null){
				statusBarWindowHack = Ti.UI.createWindow({
				    backgroundColor: 'transparent',
				    zIndex: 1000,
				    touchEnabled: false
				});
				statusBarWindowHack.open();
			}
		} else {
			
			var errorMessage = getErrorMessage(jsonData.data.response);
			
			//logout from FB in case of error
			if(fb.loggedIn){
				errorMessage = 'Pack Leader please register first!';
				fb.logout();	
			}
			
			//Show the error message we got back from the server
			progressView.change({
		        error:true,
		        text:errorMessage
		    });
			//and hide it after a while		    
		    setTimeout(function() {
			    progressView.hide();
			}, ERROR_MSG_REMOVE_TIMEOUT);
		    
		}
	};
	
	var date = new Date();
	var dateDay = date.getDate();
	var dateMonth = date.getMonth() + 1;
	var dateYear = date.getFullYear();
	
	xhr.open('POST',API+'login');
	xhr.send({
		password:lObj.password,
		email:lObj.email,
		facebook_id:lObj.facebook_id,
		f:lObj.f,
		timezone:getUTCOffset(),
		month:dateMonth,
		day:dateDay,
		year:dateYear
	});
}

//Closes the login window
function closeLoginWindow(){
	if(!loginWindowPopupMode){
		initialWindow.animate({opacity:0, duration:100}, function(){
			loginWindow.close();
			window.remove(initialWindow);
			leftTableView.fireEvent('click', {menuItem:MENU_PROFILE});
		});
	} else {
		loginWindow.close();
	}
}

//Opens a modal login window for post-login unauthorised requests
function showLoginPopup(){
	if(fb.loggedIn){
		fb.logout();	
	}
		
	var loginPopup = buildLoginWindow(true);
	loginPopup.open({modal:true,navBarHidden:true});
}