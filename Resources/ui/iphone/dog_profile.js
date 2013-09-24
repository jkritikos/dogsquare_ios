	
var dogProfileHeartImage = null;
var dogProfilePhotoImage = null;
var dogProfileBreedTypeLabel = null;
var dogProfileDogGenderLabel = null;
var dogProfileAgeNumberLabel = null;
var dogProfileWeightNumberLabel = null;
var dogProfileLikesNumberLabel = null;
var dogProfileMatingBackground = null;
var dogProfileView = null;	
	
function buildDogProfileView(dogId){
	if(dogProfileView == null){
		dogProfileView = Ti.UI.createView({
			backgroundColor:'#eeeded'
		});
		
		dogProfilePhotoImage = Ti.UI.createImageView({ 
			height:320,
			top:0,
			width:320
		});
		
		dogProfileMatingBackground = Titanium.UI.createImageView({
			left:11,
			top:11,
			zIndex:2
		});
		dogProfileView.add(dogProfileMatingBackground);
	
		//opacity bar for info
		var dogProfileOpacityInfoBar = Titanium.UI.createView({ 
			backgroundColor:'white',
			width:'100%',
			top:225,
			height:56,
			opacity:0.8,
			zIndex:2
		});
		
		var dividerLeftOffset = 0;
			
		for(i=0;i<=2;i++){
			var dogProfileDividerBar = Titanium.UI.createView({ 
				backgroundColor:'black',
				width:1,
				opacity:0.4,
				height:31,
				left:79 + dividerLeftOffset
			});
			dogProfileOpacityInfoBar.add(dogProfileDividerBar);
			
			dividerLeftOffset += 80;
		}
		
		dogProfileDogGenderLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'right',
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileDogGenderLabel);
		
		var dogProfileGenderLabel = Titanium.UI.createLabel({ 
			text:'gender',
			height:19,
			textAlign:'center',
			left:19,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileGenderLabel);
		
		dogProfileAgeNumberLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'right',
			left:111,
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileAgeNumberLabel);
		
		var dogProfileAgeLabel = Titanium.UI.createLabel({ 
			text:'years old',
			height:19,
			textAlign:'center',
			left:94,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileAgeLabel);
		
		var dogProfileWeightLabel = Titanium.UI.createLabel({ 
			text:'weight',
			height:19,
			textAlign:'center',
			left:182,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileWeightLabel);
		
		dogProfileWeightNumberLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'right',
			width:30,
			left:169,
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileWeightNumberLabel);
			
		var dogProfileWeightUnitLabel = Titanium.UI.createLabel({ 
			text:'kgs',
			height:17,
			textAlign:'center',
			left:200,
			top:14,
			font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileWeightUnitLabel);
		
		var dogProfileLikesLabel = Titanium.UI.createLabel({ 
			text:'likes',
			height:19,
			textAlign:'center',
			left:266,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileLikesLabel);
		
		dogProfileLikesNumberLabel = Titanium.UI.createLabel({
			text:'',
			height:21,
			textAlign:'center',
			left:270,
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileLikesNumberLabel);
		
		var dogProfileLikesIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'dog_profile/best_icon_selected.png',
			left:287,
			top:11,
			dogId:dogId
		});
		dogProfileLikesIcon.addEventListener('click', handleDogLikesButton);
		dogProfileOpacityInfoBar.add(dogProfileLikesIcon);
		
		dogProfileView.add(dogProfileOpacityInfoBar);
		
		//opacity bar for description
		var dogProfileOpacityDescriptionBar = Titanium.UI.createView({ 
			backgroundColor:'white',
			width:'100%',
			top:289,
			height:31,
			opacity:0.8,
			zIndex:2
		});
		
		dogProfileBreedTypeLabel = Titanium.UI.createLabel({
			textAlign:'center',
			font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'},
			zIndex:2
		});
		dogProfileOpacityDescriptionBar.add(dogProfileBreedTypeLabel);
		
		dogProfileView.add(dogProfileOpacityDescriptionBar);
		
		dogProfileView.add(dogProfilePhotoImage);
		
		var dogProfileMoodLabel = Titanium.UI.createLabel({ 
			text:'Happy',
			color:'black',
			height:'auto',
			textAlign:'left',
			left:46,
			bottom:66,
			opacity:0.6,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileView.add(dogProfileMoodLabel);
		
		var dogProfileMoodPercentLabel = Titanium.UI.createLabel({ 
			text:'53%',
			color:'999900',
			height:'auto',
			textAlign:'left',
			left:91,
			bottom:66,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileView.add(dogProfileMoodPercentLabel);
		
		var dogProfileBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'dog_profile/bone_grey.png',
			bottom:44,
			right:30
		});
		dogProfileView.add(dogProfileBoneImage);
		
		dogProfileHeartImage = Ti.UI.createImageView({ 
			bottom:5,
			right:77,
			dogId:dogId
		});
		dogProfileView.add(dogProfileHeartImage);
		dogProfileHeartImage.addEventListener('click', handleDogLikeButton);
		
		var dogProfileLikeMeLabel = Titanium.UI.createLabel({ 
			text:'Like me?',
			color:'black',
			height:'auto',
			textAlign:'left',
			left:47,
			bottom:16,
			opacity:0.6,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileView.add(dogProfileLikeMeLabel);
		
		Ti.API.info('buildDogProfileView has been built');
	}
	getOnlineDog(dogId);
	
	return dogProfileView;
}

function handleDogLikeButton(e){
	var dogId = e.source.dogId;
	var toggle = e.source.toggle;
	
	if(toggle){
		unlikeDog(dogId);
		dogProfileLikesNumberLabel.text--;
		e.source.toggle = false;
	}else{
		likeDog(dogId);
		dogProfileLikesNumberLabel.text++;
		e.source.toggle = true;
	}
}

function likeDog(dId){
	Ti.API.info('likeDog() with id: ' + dId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'likeDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId
	});
}


function unlikeDog(dId){
	Ti.API.info('unlikeDog() with id: ' + dId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'unlikeDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId
	});
}

//get dog info by id from server
function getOnlineDog(dId){
	Ti.API.info('getOnlineDog() called for dog_id='+ dId); 	
	
	//progress view
	var progressView = new ProgressView({window:dogProfileView});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		navController.getWindow().setTitle('');
	};
	
	xhr.onload = function(e){
		Ti.API.info('getOnlineDog() got back from server '+this.responseText);	
		var jsonData = JSON.parse(this.responseText);
		
		
		//Update user object and close the signup window
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Hide progress view
			progressView.hide();
			
			//update dog profile UI
			updateDogProfile(jsonData.data.dog);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
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
	xhr.open('GET',API+'getDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId
	});
}

function getDogLikedUsersOnline(dId){
	
	Ti.API.info('getDogLikedUsersOnline() called with dog_id: '+dId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateListUsersTableView(jsonData.data);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		}else{
			alert(getErrorMessage(jsonData.data.response));
		}
	};
	xhr.open('GET',API+'getDogLikedUsers');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId
	});
}

//update dog profile UI
function updateDogProfile(dogObj){
	navController.getWindow().setTitle(dogObj.name);
	
	dogProfileBreedTypeLabel.text = dogObj.dog_breed;
    dogProfilePhotoImage.image = REMOTE_DOG_IMAGES + dogObj.photo;
    dogProfileAgeNumberLabel.text = dogObj.age;
    dogProfileWeightNumberLabel.text = dogObj.weight;
    dogProfileLikesNumberLabel.text = dogObj.likes;
    if(dogObj.mating == 1){
    	dogProfileMatingBackground.image = IMAGE_PATH+'dog_profile/badge_matting.png';
    }
    
    if(dogObj.gender == 1){
		dogGender = 'male';
		dogGenderLeft = 18;
	}else if(dogObj.gender == 2){
		dogGender = 'female';
		dogGenderLeft = 13;
	}
    
    dogProfileDogGenderLabel.text = dogGender;
    dogProfileDogGenderLabel.left = dogGenderLeft;
    
    if(dogObj.liked == null){
		dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
		dogProfileHeartImage.toggle = false;
	}else{
		dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
		dogProfileHeartImage.toggle = true;
	}
}

function handleDogLikesButton(e){
	var dogId = e.source.dogId;
	
	var userId = userObject.userId;
	
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	
	getDogLikedUsersOnline(dogId);
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR
	});
	
	//back button & event listener
	var listUsersBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	listUsersWindow.setLeftNavButton(listUsersBackButton);
	listUsersBackButton.addEventListener("click", function() {
	    navController.close(listUsersWindow);
	});
	
	listUsersWindow.add(listUsersView);
	
	openWindows.push(listUsersWindow);
	navController.open(listUsersWindow);
}