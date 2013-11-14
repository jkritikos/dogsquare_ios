//UI components	
var dogProfileHeartImage = null;
var dogProfilePhotoImage = null;
var dogProfileBreedTypeLabel = null;
var dogProfileDogGenderLabel = null;
var dogProfileAgeNumberLabel = null;
var dogProfileSizeNumberLabel = null;
var dogProfileLikesNumberLabel = null;
var dogProfileMatingBackground = null;
var dogProfileView = null;
var dogProfileMyDog = false;
var dogProfileDogId = null;	
var dogProfileEditDialog = null;
var dogProfileMoodPercentLabel = null;
var dogProfileBoneImageColor = null;
var dogProfileLostDogButton = null;
var dogProgileProgressView = null;
var dogProfileEditButton = null;

var BUTTON_LOST_DOG = 1;
var BUTTON_FOUND_DOG = 2;
	
function buildDogProfileView(dogId){
	if(dogProfileView == null){
		dogProgileProgressView = new ProgressView({window:dogProfileView});
		
		dogProfileDogId = dogId;
		
		//Check if this is our dog or not
		dogProfileMyDog = false;
		var dogObject = getDogById(dogId);
		
		if(dogObject.length > 0 && dogObject[0].id == dogId){
			dogProfileMyDog = true;
		}
		
		dogProfileEditButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/edit_icon.png',
			width:24,
			height:23
		});
		dogProfileEditButton.addEventListener('click', handleDogProfileEditButton);
		
		//Always prepare the photo options depending on whether this is our dog or not
		if(dogProfileMyDog){
			navController.getWindow().rightNavButton = dogProfileEditButton;
			
			//Photo dialog with options for viewing/changing the profile image
			var dogProfilePhotoDialog = Titanium.UI.createOptionDialog({
				options:['View', 'Take Photo', 'Choose From Library', 'Cancel'],
				cancel:3
			});
		} else {
			//Photo dialog with options for viewing/changing the profile image
			var dogProfilePhotoDialog = Titanium.UI.createOptionDialog({
				options:['View','Cancel'],
				cancel:1
			});
		}
		
		Ti.API.info('buildDogProfileView() for dogId '+dogId+' dogProfileMyDog='+dogProfileMyDog);
		
		//Edit dialog with options for editing/deleting the dog profile
		dogProfileEditDialog = Titanium.UI.createOptionDialog({
			options:['Edit', 'Delete', 'Cancel'],
			cancel:2
		});
	
		dogProfileView = Ti.UI.createScrollView({
			backgroundColor:'#eeeded'
		});
		
		dogProfilePhotoImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'common/white_default',
			defaultImage:IMAGE_PATH+'common/white_default.png',
			height:320,
			top:0,
			width:320
		});
		
		//Event listener for profile photo dialog options	
		dogProfilePhotoDialog.addEventListener('click',function(e){
			if(dogProfileMyDog){
				if(e.index == 0){
					dogProfilePhotoView();
				} else if(e.index == 1){
					dogProfilePhotoTakeNew();
				} else if(e.index == 2){
					dogProfilePhotoChooseExisting();
				}
			} else {
				if(e.index == 0){
					dogProfilePhotoView();
				}
			}
		});
		
		//Event listener for profile edit dialog options	
		dogProfileEditDialog.addEventListener('click',function(e){
			if(e.index == 0){
				editDogProfile();
			} else if(e.index == 1){
				deleteDogProfile();
			}
		});
		
		//Event listener for profile image - brings up a dialog for viewing or changing the profile image
		dogProfilePhotoImage.addEventListener('click', function(){
			dogProfilePhotoDialog.show();
		});
		
		dogProfileMatingBackground = Titanium.UI.createImageView({
			bottom:IPHONE5 ? 86 : 100,
			right:81
		});
	
		//opacity bar for info
		var dogProfileOpacityInfoBar = Titanium.UI.createView({ 
			backgroundColor:'white',
			width:'100%',
			top:225,
			height:56,
			opacity:0.7,
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
			left:109,
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
			text:'size',
			height:19,
			textAlign:'center',
			left:189,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileWeightLabel);
		
		dogProfileSizeNumberLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'right',
			width:'auto',
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		dogProfileOpacityInfoBar.add(dogProfileSizeNumberLabel);
		
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
			opacity:0.7,
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
			text:'24h Dogfuel',
			color:'black',
			height:'auto',
			textAlign:'left',
			left:36,
			bottom:IPHONE5 ? 146 : 160,
			opacity:0.6,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		dogProfileMoodPercentLabel = Titanium.UI.createLabel({ 
			text:'0%',
			color:'999900',
			height:'auto',
			width:87,
			textAlign:'center',
			left:36,
			bottom:IPHONE5 ? 130 : 144,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//Empty bone image
		var dogProfileBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'dog_profile/bone_grey.png',
			bottom:IPHONE5 ? 127 : 142,
			left:143
		});
		
		dogProfileBoneImageColor = Ti.UI.createImageView({ 
			//image:croppedDataObject.photo,
			bottom:IPHONE5 ? 127 : 142,
			//width: croppedDataObject.view_width,
			height: 45,
			left:143,
			zIndex:2,
			visible:false
		});
		
		//Heart image for likes
		dogProfileHeartImage = Ti.UI.createImageView({ 
			left:11,
			top:11,
			zIndex:2, 
			dogId:dogId
		});
		dogProfileView.add(dogProfileHeartImage);
		dogProfileHeartImage.addEventListener('click', handleDogLikeButton);
		
		var dogProfileLikeMeLabel = Titanium.UI.createLabel({ 
			text:'Dog mating',
			color:'black',
			height:'auto',
			textAlign:'left',
			left:36,
			bottom:IPHONE5 ? 95 : 110,
			opacity:0.6,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//if not my dog change the position os some images and labels
		if(!dogProfileMyDog){
			dogProfileMatingBackground.bottom = IPHONE5 ? 86 : 8;
			dogProfileMoodLabel.bottom = IPHONE5 ? 144 : 66;
			dogProfileMoodPercentLabel.bottom = IPHONE5 ? 130 : 67;
			dogProfileBoneImage.bottom = IPHONE5 ? 127 : 50;
			dogProfileBoneImageColor.bottom = IPHONE5 ? 127 : 50;
			dogProfileLikeMeLabel.bottom = IPHONE5 ? 95 : 17;
		}
		
		dogProfileView.add(dogProfileMatingBackground);
		dogProfileView.add(dogProfileMoodLabel);
		dogProfileView.add(dogProfileMoodPercentLabel);
		dogProfileView.add(dogProfileBoneImage);
		dogProfileView.add(dogProfileBoneImageColor);
		dogProfileView.add(dogProfileLikeMeLabel);
		
		if(dogProfileMyDog){
			dogProfileLostDogButton = Ti.UI.createButton({ 
				width:270,
				height:55,
				top:IPHONE5 ? 436 : 440,
				bottom:IPHONE5 ? 13 : 13
			});
			dogProfileView.add(dogProfileLostDogButton);
			dogProfileLostDogButton.addEventListener('click', handleLostDogButton);
		}
		
		Ti.API.info('buildDogProfileView has been built');
	}
	getOnlineDog(dogId);
	
	return dogProfileView;
}

//Event handler for the lost/found dog button
function handleLostDogButton(){
	var button = dogProfileLostDogButton.button;
	if(button == BUTTON_LOST_DOG){
		//progress view
		dogProgileProgressView.show({
			text:"Locating..."
		});
		
		//Start location tracking
		Titanium.Geolocation.addEventListener('location',trackLocationForLostDog);
	}else if(button == BUTTON_FOUND_DOG){
		foundDogOnline();
	}
}

function deleteDogProfile(){
	deleteDogOnline(dogProfileDogId);
}

function editDogProfile(){
	Ti.include('ui/iphone/add_dog.js');
	
	var addDogWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:'Add new dog'
	});
	
	//back button
	var addDogBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	addDogWindow.setLeftNavButton(addDogBackButton);
	
	//event listener for back button
	addDogBackButton.addEventListener("click", function() {
	    navController.close(addDogWindow);
	});
	
	//Revert to the standard right window button
	addDogWindow.leftNavButton = addDogBackButton;
	
	openWindows.push(addDogWindow);
	
	builAddDogView(TARGET_MODE_NEW_WINDOW);
	updateAddDogView(dogProfileDogId);
	
	addDogWindow.add(viewAddDog);
	
	navController.open(addDogWindow);
}

function handleDogProfileEditButton(){
	dogProfileEditDialog.show();
}

function dogProfilePhotoView(){
	var image = dogProfilePhotoImage.image;
		
	Ti.include('ui/iphone/photo_view.js');
	buildPhotoView(image);
	
	if(iOS7){
		photoNavWin.open();
	}else{
		photoViewWindow.open();
	}
}

//Gets an accurate position of the current location and posts the lost dog event
function trackLocationForLostDog(){
	Titanium.Geolocation.getCurrentPosition(function(e){
		if (e.error){
			//alert('Se ha perdido la señal GPS. Sal a cielo abierto ...');
			return;
		}
		
		var coordinates = {
			latitude: e.coords.latitude,
			longitude: e.coords.longitude,
			animate:true,
			latitudeDelta:0.001,
			longitudeDelta:0.001
		};
		
		//only use accurate coordinates
		if(e.coords.accuracy <= 15){
			Ti.API.info('trackLocationForLostDog() got accurate coordinates - processing');
			//Clear location tracking
			Titanium.Geolocation.removeEventListener('location',trackLocationForLostDog);
			
			lostDogOnline(e.coords.latitude, e.coords.longitude);
			
		} else {
			Ti.API.info('trackLocationForLostDog() got inaccurate coordinates - ignoring (accuracy '+ e.coords.accuracy+')');
		}
	});
}

//Posts a lost dog place on the server
function lostDogOnline(dogLat, dogLon){
	Ti.API.info('lostDogOnline() called for dog with id ' + dogProfileDogId);
			
	//progress view
	dogProgileProgressView.show({
		text:"Sending..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in lostDogOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('lostDogOnline() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			dogProgileProgressView.change({
		        success:true
		    });
		    
		    dogProfileLostDogButton.backgroundImage = IMAGE_PATH+'dog_profile/found_btn.png';
		    dogProfileLostDogButton.button = BUTTON_FOUND_DOG;
		    
			//Hide progress view
			dogProgileProgressView.hide();
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		}
	};
	
	xhr.open('POST',API+'lostDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dogProfileDogId,
		lat:dogLat,
		lon:dogLon,
		token:userObject.token
	});
}

function foundDogOnline(){
	Ti.API.info('foundDogOnline() called for dog with id ' + dogProfileDogId);
	
	//progress view
	var progressView = new ProgressView({window:dogProfileView});
	progressView.show({
		text:"Sending..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in foundDogOnline() '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('foundDogOnline() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
		    
		    dogProfileLostDogButton.backgroundImage = IMAGE_PATH+'dog_profile/lost_btn.png';
		    dogProfileLostDogButton.button = BUTTON_LOST_DOG;
		    
			//Hide progress view
			progressView.hide();
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		}
	};
	
	xhr.open('POST',API+'foundDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dogProfileDogId,
		token:userObject.token
	});
}

//delete dog in online server by the user's choise
function deleteDogOnline(dogId){
	Ti.API.info('deleteDogOnline() called ');
	
	//progress view
	var progressView = new ProgressView({window:dogProfileView});
	progressView.show({
		text:"Deleting..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in deleteDogOnline() '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		Ti.API.info('deleteDogOnline() got back from server : '+ this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//delete dog locally
			deleteDog(dogId);
			var dogObj = getDogs();
			populateRightMenu(dogObj);
			
			//Show success
			progressView.change({
		        success:true
		    });
		    
		    //Hide progress view
			progressView.hide();
			
			openProfileView();
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'deleteDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dogId,
		token:userObject.token
	});
}

//Takes a new photo and uploads it as the new profile image
function dogProfilePhotoTakeNew(){
	Titanium.Media.showCamera({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			var timestamp = new Date().getTime();
			var uniqueDogFilename = timestamp + '.jpg';
			var uniqueDogFilenameThumb = 'thumb_' + timestamp + '.jpg';
			
			//save images on the local filesystem
			var filename = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilename;
			var filenameThumb = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilenameThumb;
			
			var tmpImage = Titanium.Filesystem.getFile(filename);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(filenameThumb);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(imageThumbnail);
			
			var editDogObject = {
				photo:compressedImage,
				thumb:imageThumbnail,
				user_id:userObject.userId,
				token:userObject.token,
				dog_id:dogProfileDogId,
				photo_filename:uniqueDogFilename,
				thumb_filename:uniqueDogFilenameThumb,
				edit:false //only editing the photo
			};
			
			//Upload
			changeDogProfilePhoto(editDogObject);
			
		},
		cancel:function(){
	
		},
		error:function(error){
			alert(getLocalMessage(MSG_CAMERA_PROBLEM));
		},
		allowEditing:true
	});
}

//Selects a photo from the camera roll and uploads it as the new profile image
function dogProfilePhotoChooseExisting(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			var timestamp = new Date().getTime();
			var uniqueDogFilename = timestamp + '.jpg';
			var uniqueDogFilenameThumb = 'thumb_' + timestamp + '.jpg';
			
			//save images on the local filesystem
			var filename = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilename;
			var filenameThumb = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilenameThumb;
			
			var tmpImage = Titanium.Filesystem.getFile(filename);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(filenameThumb);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(imageThumbnail);
			
			var editDogObject = {
				photo:compressedImage,
				thumb:imageThumbnail,
				user_id:userObject.userId,
				token:userObject.token,
				dog_id:dogProfileDogId,
				photo_filename:uniqueDogFilename,
				thumb_filename:uniqueDogFilenameThumb,
				edit:false //only editing the photo
			};
			
			//Upload
			changeDogProfilePhoto(editDogObject);
			
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}

//Uploads a new profile image for the current dog
function changeDogProfilePhoto(obj){
	Ti.API.info('changeDogProfilePhoto() called'); 	
	
	//progress view
	var progressView = new ProgressView({window:dogProfileView});
	progressView.show({
		text:"Uploading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('changeDogProfilePhoto() got back error '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('changeDogProfilePhoto() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Hide progress view
			progressView.hide();
			
			//Change the profile image on the UI
			dogProfilePhotoImage.image = Titanium.Filesystem.applicationDataDirectory + obj.photo_filename;
			
			//Update dog on the local db
			var localDog = {
				dog_id:obj.dog_id,
				photo_filename:obj.photo_filename,
				thumb_path:jsonData.data.thumb
			};
			
			editDog(localDog);
			populateRightMenu(getDogs());
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
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
	xhr.open('POST',API+'editDog');
	xhr.send(obj);
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

//Creates a like for the specified dog
function likeDog(dId){
	Ti.API.info('likeDog() with id: ' + dId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in likeDog() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		Ti.API.info('likeDog() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		} else if (jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'likeDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId,
		token:userObject.token
	});
}

//Removes the like on the specified dog
function unlikeDog(dId){
	Ti.API.info('unlikeDog() with id: ' + dId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in unlikeDog() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'unlikeDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId,
		token:userObject.token
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
		Ti.API.error('Error in getOnlineDog() '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
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
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
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
	xhr.open('GET',API+'getDog');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId,
		token:userObject.token
	});
}

function getDogLikedUsersOnline(dId){
	
	Ti.API.info('getDogLikedUsersOnline() called with dog_id: '+dId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getDogLikedUsersOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateListUsersTableView(jsonData.data);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else if (jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else{
			alert(getErrorMessage(jsonData.data.response));
		}
	};
	xhr.open('GET',API+'getDogLikedUsers');
	xhr.send({
		user_id:userObject.userId,
		dog_id:dId,
		token:userObject.token
	});
}

//update dog profile UI
function updateDogProfile(dogObj){
	navController.getWindow().setTitle(dogObj.name);
	
	dogProfileBreedTypeLabel.text = dogObj.dog_breed;
    dogProfilePhotoImage.image = REMOTE_DOG_IMAGES + dogObj.photo;
    dogProfileAgeNumberLabel.text = dogObj.age;
    
    var sizeObj = getSize(dogObj.size);
    
    dogProfileSizeNumberLabel.text = sizeObj.label;
    dogProfileSizeNumberLabel.left = sizeObj.left;
    dogProfileLikesNumberLabel.text = dogObj.likes;
    
    if(dogObj.mating == 1){
    	dogProfileMatingBackground.image = IMAGE_PATH+'dog_profile/badge_matting.png';
    }else{
    	dogProfileMatingBackground.image = IMAGE_PATH+'dog_profile/badge_matting_grey.png';
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
    
    if(dogObj.liked == false){
		dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
		dogProfileHeartImage.toggle = false;
	} else{
		dogProfileHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
		dogProfileHeartImage.toggle = true;
	}
	
	//Show dogfuel value and colored bone image
	if(dogObj.dogfuel != null){
		dogProfileMoodPercentLabel.text = dogObj.dogfuel + '%';
		
		//Only crop if necessary
		if(dogObj.dogfuel > 0){
			var croppedDataObject = createCroppedBoneImage(VIEW_DOG_PROFILE,dogObj.dogfuel);
			dogProfileBoneImageColor.width = croppedDataObject.view_width;
			dogProfileBoneImageColor.image = croppedDataObject.photo;
			dogProfileBoneImageColor.show();	
		}
	}
	
	if(dogProfileMyDog){
		if(dogObj.lost != null){
			dogProfileLostDogButton.backgroundImage = IMAGE_PATH+'dog_profile/found_btn.png';
			dogProfileLostDogButton.button = BUTTON_FOUND_DOG;
		} else{
			dogProfileLostDogButton.backgroundImage = IMAGE_PATH+'dog_profile/lost_btn.png';
			dogProfileLostDogButton.button = BUTTON_LOST_DOG;
		}
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
		translucent:false,
		//barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Likes'
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

//open add dog view after the dog is deleted by user's choise
function openProfileView(){
	Ti.include('ui/iphone/profile.js');
	
	var profileWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:userObject.name
	});
	
	//Revert to the standard right window button
	profileWindow.leftNavButton = leftBtn;
	profileWindow.rightNavButton = rightBtn;
	
	profileWindow.add(viewProfile);
	
	openWindows.push(profileWindow);
	navController.open(profileWindow);
}
