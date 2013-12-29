//UI properties
var UI_COLOR = '#f9bf30';
var UI_BACKGROUND_COLOR = '#eeeded';
var UI_MENU_BACKGROUND_COLOR = '#252931';
var UI_COLOR_RUN = '#6a5b5b';
var UI_FONT_COLOR_LIGHT_BLACK = '#666666';
var UI_FONT_COLOR_LIGHT_GREY = '#8a8a8a';
var UI_FONT_REGULAR = {fontSize:25, fontWeight:'regular', fontFamily:'Open Sans'};
var UI_FONT_BOLD = {fontSize:25, fontWeight:'bold', fontFamily:'Open Sans'};
var UI_FONT_SEMIBOLD_NAVBAR = {fontSize:25, fontWeight:'semibold', fontFamily:'Open Sans'};
var UI_FONT_LEFTMENU = {fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'};
var UI_FONT_COLOR_TABLE = "#938787";
var UI_FONT_BARS = {fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'};

var IMAGE_PATH = 'images/iphone/';
//End UI properties

//Hack for reusing views within current or new window
var TARGET_MODE_REUSE = 1;
var TARGET_MODE_NEW_WINDOW = 2;

//Left & right menus
Ti.include('menu_left.js');
Ti.include('menu_right.js');
Ti.include('initial.js');

function closeOpenWindows(){
	Ti.API.info('closeOpenWindows() closed '+openWindows.length+' windows');
	for(var i=0; i < openWindows.length; i++){
		navController.close(openWindows[i], {animated:false});
	}
	openWindows = [];
}

////////////////////////////////////////////////
// CENTER MAIN WINDOW
var rightBtn = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/menu_dog.png',
	width:35,
	right:0,
	height:23
});

rightBtn.addEventListener("click", function(){
	if((CURRENT_VIEW == VIEW_RUN && runningMode) || runningMode){
		alert(getLocalMessage(MSG_RUN_NOT_ENDED));
	} else {
		window.toggleRightView();
		window.setCenterhiddenInteractivity("TouchEnabled");
	}
});

var leftBtn = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/menu.png',
	width:38,
	height:18
});

//Profile right nav button
var profileRightNavButton = Ti.UI.createButton({ 
	backgroundImage:IMAGE_PATH+'common/edit_icon.png',
	width:24,
	height:23
});

//Event listener for profile edit button
profileRightNavButton.addEventListener('click', function(){
	Ti.API.info('showEditProfileView() called ');
	
	Ti.include('ui/iphone/profile_edit.js');
	
	var editProfileView = buildEditProfileView(VIEW_SETTINGS);
	
	var editProfileWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:'Edit profile'
	});
	
	//back button & event listener
	var editProfileBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	editProfileWindow.setLeftNavButton(editProfileBackButton);
	editProfileBackButton.addEventListener("click", function() {
	    navController.close(editProfileWindow);
	});
	
	editProfileWindow.add(editProfileView);
	
	openWindows.push(editProfileWindow);
	navController.open(editProfileWindow);
});

leftBtn.addEventListener("click", function(){
	window.toggleLeftView();
	window.setCenterhiddenInteractivity("TouchEnabled");
});

var navController = createCenterNavWindow();

//Hides the textfields according to the previous view
function hideTextfields(e){
	//Ti.API.info('HIDE THEM! current view is '+CURRENT_VIEW+' and e is '+e.view);
	
	//Update dogfuel values
	if(e.view != null && e.view == 'right'){
		//sweet anti-flooding approach
		clearTimeout(timers['update_dogfuel']);
		timers['update_dogfuel'] = setTimeout(function(){
        	updateDogfuelValues();
      	}, 300);
	}
	
	if(CURRENT_VIEW == VIEW_ADD_DOG){
		addDogFieldName.blur();
		addDogFieldAge.blur();
	} else if(CURRENT_VIEW == VIEW_ACTIVITY_NEW){
		viewActivityCommentsTextArea.blur();
	} else if(CURRENT_VIEW == VIEW_RUN_FINISH){
		runfinishCommentsTextArea.blur();
	} else if(CURRENT_VIEW == VIEW_MAP){
		mapSearchTxtfield.blur();
	} else if(CURRENT_VIEW == VIEW_PLACE_VIEW){
		checkinPlaceCommentsTextArea.blur();
	} else if(CURRENT_VIEW == VIEW_FIND_FRIENDS){
		findFriendsSearchTxtfield.blur();
	} else if(CURRENT_VIEW == VIEW_PASSWORD_EDIT){
		passwordEditFieldOldPassword.blur();
		passwordEditFieldNewPassword.blur();
	} else if(CURRENT_VIEW == VIEW_PROFILE_EDIT){
		editProfileFieldName.blur();
		editProfileFieldSurname.blur();
		editProfileFieldEmail.blur();
		editProfileFieldAddress.blur();
	}
}

function createCenterNavWindow(){	
	var win = Ti.UI.createWindow({
		backgroundColor:'#eee',
		title:"Napp Slide Menu",
		navTintColor:UI_COLOR,
		translucent:false,
		barColor:UI_COLOR
		//barImage:IMAGE_PATH+'common/bar.png'
	});
	
	win.leftNavButton = leftBtn;
	win.rightNavButton = rightBtn;
	
	//NAV
	var navController = Ti.UI.iPhone.createNavigationGroup({
		window : win
	});
	
	//If we have a persisted user, load the profile view
	if(userObject.userId){
		Ti.include('profile.js');
		
		navController.getWindow().add(viewProfile);
		navController.getWindow().setTitle(userObject.name);
	}
	
	return navController;
}

////////////////////////////////////////////////
// NappSlideMenu WINDOW
var NappSlideMenu = require('dk.napp.slidemenu');

var window = NappSlideMenu.createSlideMenuWindow({
	centerWindow: navController,
	leftWindow:winLeft,
	rightWindow:winRight,
	leftLedge:65,
	rightLedge:43,
	translucent:false,
	modal:true
});

//Event listener for main window being slided or animated (i.e revealing left/right menu)
window.addEventListener('viewDidOpen', hideTextfields);

function updateDogfuelValues(){
	Ti.API.info('updateDogfuelValues() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in updateDogfuelValues() '+JSON.stringify(e));
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('updateDogfuelValues() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//save lookup data
			saveDogBreeds(jsonData.data.breeds);
			saveDogfuelRules(jsonData.data.rules);
			saveDogfuelDiscounts(jsonData.data.discounts);
			
			//save place categories
			savePlaceCategories(jsonData.data.categories);
			
			var dogfuelValues = jsonData.data.values;
			var foundValue = false;
			var indexToUpdate = 0;
			
			//TODO this is a bug as it only updates the percentage values and not the image - we need to call populate() AFTER saving the
			//dogfuel value locally
			//go through the right menu dogs table
			for (i=1; i<rightTableView.data[0].rows.length;i++){
				var dogIdInRightMenu = rightTableView.data[0].rows[i].dogId;
				
				//see if we have a value for this dog
				for(z=0; z<dogfuelValues.length; z++){
					if(dogfuelValues[z].dog_id == dogIdInRightMenu){
						indexToUpdate = z;
						rightTableView.data[0].rows[i].children[2].text = dogfuelValues[z].dogfuel + '%';
						updateDogfuelLocal(dogIdInRightMenu, dogfuelValues[z].dogfuel);
						foundValue = true;
						break;
					}
				}
				
				if(!foundValue){
					rightTableView.data[0].rows[i].children[2].text = '0%';
					updateDogfuelLocal(dogIdInRightMenu, 0);
				}
				
				foundValue = false;
			}
			
			//Repopulate the right menu
			var dRows = getDogs();
			populateRightMenu(dRows);
				
		} 
	};
	
	var date = new Date();
	var dateDay = date.getDate();
	var dateMonth = date.getMonth() + 1;
	var dateYear = date.getFullYear();
	
	xhr.open('GET',API+'getDogfuel');
	xhr.send({
		user_id:userObject.userId,
		token:userObject.token,
		timezone:getUTCOffset(),
		month:dateMonth,
		day:dateDay,
		year:dateYear
	});
}
