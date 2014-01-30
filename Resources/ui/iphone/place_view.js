//UI Components
var checkinPlaceCommentsBackgroundView = null;
var checkinPlaceCommentsTextArea = null;
var checkinPlaceCommentsTableView = null;
var checkinPlaceCommentsButton = null;
var checkinPlaceCommentsObject = null;
var checkinPlaceHeartImage = null;
var checkinPlaceTitleLabel = null;
var checkinPlaceDescriptionLabel = null;
var checkinPlaceMap = null;
var checkinPlaceMapAnnotation = null;
var checkinPlaceView = null;
var checkinPlaceSaveCommentButton = null;
var checkinPlaceId = null;
var checkinNumberLabel = null;
var checkinNumberOfHeartsLabel = null;
//var checkinPlaceLikesHeartImage = null;
var checkinPlaceButton = null;
var checkinLabel = null;
var checkinStatusLabel = null;
var annotations = [];

var checkinScrollablePhotoView = null;
var placeViewLatitude = null;
var placeViewLongitude = null;
var checkinPlaceNumPhotosLabel = null;
var checkinPlaceUrlLabel = null;

var ADD_COMMENT = 1;
var COMMENT_ROW = 2;
var viewPlaceWithCheckin = false;
var checkinPlaceTargetMode = null;

function buildCheckinPlaceView(placeId, allowCheckin, windowMode){		
	checkinPlaceId = placeId;
	viewPlaceWithCheckin = allowCheckin;
	checkinPlaceTargetMode = windowMode;
	
	if(checkinPlaceView == null){
		Titanium.Geolocation.getCurrentPosition(function(e){
			if (e.error) {
				Ti.API.error('place_view.js : geo - position' + e.error); 
				return;
			} 
			 
			placeViewLatitude = e.coords.latitude; 
			placeViewLongitude = e.coords.longitude; 
		});
		
		checkinPlaceView = Ti.UI.createScrollView({
			backgroundColor:'white'
		});
		
		checkinPlaceMapAnnotation = Ti.Map.createAnnotation({
	        animate: true,
	        image:IMAGE_PATH+'checkin_place/pin_map.png'
	    });
	   
	   //Scrollable view for place photos
	   checkinScrollablePhotoView = Titanium.UI.createScrollableView({
		    top:0,
		    width:320,
		    height:320,
			showPagingControl: true,
			pagingControlColor:'gray',
			pagingControlAlpha:0.5,
			zIndex:4
	   });
	   
	   checkinPlaceView.add(checkinScrollablePhotoView);
	   
	   //number of pics indicator
	   checkinPlaceNumPhotosLabel = Ti.UI.createLabel({
			top:300,
			text:'',
			textAlign:'right',
			width:'auto',
			height:'auto',
			right:14,
			color:'black',
			zIndex:4,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
	   
	   checkinPlaceView.add(checkinPlaceNumPhotosLabel);
	   
	   //background bar for checkinPlace button
		var checkinPlaceButtonBarView = Ti.UI.createView({
			top:320,
			height:110,
			width:'100%',
			backgroundColor:UI_COLOR,
			zIndex:2
		});
		
		//Event listener for map events
		checkinPlaceButtonBarView.addEventListener('click', handleCheckinMapClick);
		
		checkinPlaceView.add(checkinPlaceButtonBarView);
		
		//Container for checkin/like buttons
		var checkinPlaceButtonContainer = Ti.UI.createView({
			top:430,
			height:110,
			width:'100%',
			backgroundColor:'white',
			zIndex:2
		});
		checkinPlaceView.add(checkinPlaceButtonContainer);
		
		//vertical line separator
		var checkinLineSeparator = Ti.UI.createView({
			backgroundColor:'white',
			width:0.5,
			height:90,
			right:141
		});
		
		checkinPlaceButtonContainer.add(checkinLineSeparator);
		
		//the map
		checkinPlaceMap = Titanium.Map.createView({ 
			width:'44%',
			top:0,
			right:0,
			height:110,
		    mapType:Titanium.Map.STANDARD_TYPE,
		    animate:true,
		    regionFit:true,
		    userLocation:true,
		    visible:true,
		    touchEnabled:false
		});
		
		checkinPlaceButtonBarView.add(checkinPlaceMap);
		
		//Place photo event handler opens the gallery for this place
		checkinScrollablePhotoView.addEventListener('click', handlePlaceGallery);
		
		//add photo icon
		var checkinPlaceAddPhotoIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'checkin_place/add_photo_icon.png',
			right:10,
			top:260,
			zIndex:4
		});
		
		checkinPlaceView.add(checkinPlaceAddPhotoIcon);
		
		//Event handler for adding photos
		checkinPlaceAddPhotoIcon.addEventListener('click', handlePlaceShowPhotoOptions);
		
		//place title label
		checkinPlaceTitleLabel = Ti.UI.createLabel({
			top:27,
			textAlign:'left',
			minimumFontSize:16,
			width:160,
			height:20,
			left:15,
			color:'white',
			zIndex:2,
			font:{fontSize:16, fontWeight:'bold', fontFamily:'Open Sans'}
		});
		checkinPlaceButtonBarView.add(checkinPlaceTitleLabel);
		
		//place description label
		checkinPlaceDescriptionLabel = Ti.UI.createLabel({
			top:50,
			textAlign:'left',
			width:160,
			height:20,
			left:15,
			color:'white',
			zIndex:2,
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Open Sans'}
		});
		
		checkinPlaceButtonBarView.add(checkinPlaceDescriptionLabel);
		
		//place url label
		checkinPlaceUrlLabel = Ti.UI.createLabel({
			text:'Go to Website',
			top:70,
			textAlign:'left',
			width:160,
			height:20,
			left:15,
			color:'black',
			zIndex:2,
			visible:false,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		checkinPlaceUrlLabel.addEventListener('click', handlePlaceUrlClick);
		
		checkinPlaceButtonBarView.add(checkinPlaceUrlLabel);
		
		//checkin number label
		checkinNumberLabel = Ti.UI.createLabel({
			textAlign:'right',
			width:35,
			top:21,
			right:95,
			color:'#f99e30',
			font:{fontSize:17, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		checkinPlaceButtonContainer.add(checkinNumberLabel);
		
		//checkin label
		checkinLabel = Ti.UI.createLabel({
			text:'Check-ins',
			textAlign:'left',
			width:73,
			top:22,
			right:15,
			color:'#f99e30',
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		checkinPlaceButtonContainer.add(checkinLabel); 
		checkinLabel.addEventListener('click', handlePlaceCheckinsLabel);
		
		//checkin number of hearts label 
		checkinNumberOfHeartsLabel = Ti.UI.createLabel({
			textAlign:'right',
			width:35,
			right:95,
			top:78,
			color:'red',
			font:{fontSize:17, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		checkinPlaceButtonContainer.add(checkinNumberOfHeartsLabel);
		
		var checkinLikesLabel = Ti.UI.createLabel({
			text:'Likes',
			textAlign:'left',
			width:73,
			top:79,
			right:15,
			color:'red',
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		checkinPlaceButtonContainer.add(checkinLikesLabel);
		checkinLikesLabel.addEventListener('click', handlePlaceLikesButton);
		
		//checkin status label
		checkinStatusLabel = Ti.UI.createLabel({
			text:'You are here now',
			textAlign:'center',
			width:155,
			top:17,
			left:8,
			visible:false,
			color:'black',
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		checkinPlaceButtonContainer.add(checkinStatusLabel);
		
		//checkinPlace button
		checkinPlaceButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'checkin_place/check_in_here.png',
			width:163,
			height:39,
			left:10,
			top:13,
			place_id:placeId
		});
		checkinPlaceButtonContainer.add(checkinPlaceButton);
		checkinPlaceButton.hide();
		checkinPlaceButton.addEventListener('click', handleCheckinPlaceButton);
		
		//like button
		checkinPlaceHeartImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'checkin_place/like_button.png',
			left:11,
			bottom:2,
			placeId:placeId,
			toggle:false
		});
		checkinPlaceButtonContainer.add(checkinPlaceHeartImage);
		checkinPlaceHeartImage.addEventListener('click', handlePlaceLikeButton);
		
		//dummy heart icon next to the like button
		checkinPlaceHeartImageDummy = Ti.UI.createImageView({
			image:IMAGE_PATH+'common/best_icon_selected_red.png',
			left:133,
			width:32,
			bottom:7,
			placeId:placeId,
			toggle:false
		});
		
		checkinPlaceButtonContainer.add(checkinPlaceHeartImageDummy);
		
		//background for comments
		/*
		checkinPlaceCommentsBackgroundView = Ti.UI.createView({
			top:550,
			height:IPHONE5 ? 545 : 459,
			width:'100%',
			backgroundColor:'white',
			zIndex:6
		});
		checkinPlaceView.add(checkinPlaceCommentsBackgroundView);
		*/
		
		//button to show all comments
		checkinPlaceCommentsButton = Ti.UI.createButton({ 
			backgroundImage:IMAGE_PATH+'common/comment_field_grey.png',
			top:550,
			width:320,
			height:44,
			toggle:false,
			zIndex:3,
			button:'bar'
		});
		checkinPlaceView.add(checkinPlaceCommentsButton);
		
		//event listener for bar button
		//checkinPlaceCommentsButton.addEventListener('click', handlePlaceCommentButton);
		
		// save button
		/*
		checkinPlaceSaveCommentButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/save_button.png',
		    width:54,
		    height:34,
		    placeId:placeId
		});
		checkinPlaceSaveCommentButton.addEventListener('click', handlePlaceCommentSaveButton);
		*/
		
		//comments title label
		var checkinPlaceCommentsTitleLabel = Titanium.UI.createLabel({ 
			text:'Comments',
			color:'white',
			top:15,
			height:20,
			textAlign:'center',
			left:18,
			font:UI_FONT_BARS
		});
		checkinPlaceCommentsButton.add(checkinPlaceCommentsTitleLabel);
		
		//create a comment text area
		/*
		checkinPlaceCommentsTextArea = Ti.UI.createTextArea({
			backgroundColor:'white',
			width:276,
			height:137,
			top:55,
			font:{fontSize:15}
		});
		checkinPlaceCommentsBackgroundView.add(checkinPlaceCommentsTextArea); 
		checkinPlaceCommentsTextArea.hide();
		*/
		
		//comments tableView
		checkinPlaceCommentsTableView = Titanium.UI.createTableView({
			minRowHeight:47,
			width:320,
			backgroundColor:'e7e7e7',
			top:590,
			height:'auto'
			//bottom:0
		});
		checkinPlaceView.add(checkinPlaceCommentsTableView);
		checkinPlaceCommentsTableView.addEventListener('click', handlePlaceViewCommentTableRows);
		
		//remove empty rows
		checkinPlaceCommentsTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
	}
	getOnlinePlace(placeId);
	
	return checkinPlaceView;
}

//Event handler for clicking on the url label
function handlePlaceUrlClick(e){
	Ti.API.info('open url '+e.source.place_url);
	Ti.Platform.openURL(e.place_url);
}

//photo dialog
var checkinPlacePhotoDialog = Titanium.UI.createOptionDialog({
	options:['Take Photo', 'Choose From Library', 'Cancel'],
	cancel:2
});

//photo dialog event listener
checkinPlacePhotoDialog.addEventListener('click',function(e){
	if(e.index == 0){
		handleCameraSelection();
	} else if(e.index == 1){
		handleCheckinPlacePhotoSelection();
	}
});

//Opens the gallery for the current place
function handlePlaceGallery(){
	Ti.include('ui/iphone/gallery.js');
	
	buildGalleryView(checkinPlaceId, PHOTO_TYPE_PLACE);
	
	var galleryWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:'Gallery'
	});
	
	//back button & event listener
	var galleryBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	galleryWindow.setLeftNavButton(galleryBackButton);
	galleryBackButton.addEventListener("click", function() {
	    navController.close(galleryWindow);
	    openWindows.pop();
	});
	
	galleryWindow.add(viewGallery);
	
	openWindows.push(galleryWindow);
	navController.open(galleryWindow);
}

//handle likes heart button
function handlePlaceLikesButton(e){
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	
	getPlaceLikedUsersOnline(checkinPlaceId);
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		translucent:false,
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
	    openWindows.pop();
	});
	
	listUsersWindow.add(listUsersView);
	
	openWindows.push(listUsersWindow);
	navController.open(listUsersWindow);
}

//handle checkins label 
function handlePlaceCheckinsLabel(e){
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	
	getPlaceCheckinUsersOnline(checkinPlaceId);
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		translucent:false,
		barColor:UI_COLOR,
		title:'Checkins'
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
	    openWindows.pop();
	});
	
	listUsersWindow.add(listUsersView);
	
	openWindows.push(listUsersWindow);
	navController.open(listUsersWindow);
}

//Uploads the specified photo for the current place
function uploadPlacePhoto(photoObject){
	Ti.API.info('uploadPlacePhoto() called'); 	
	
	//progress view
	var progressView = new ProgressView({window:checkinPlaceView});
	progressView.show({
		text:"Uploading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in uploadPlacePhoto() '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('uploadPlacePhoto() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		//Update user object and close the signup window
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
		    
		    //Update photos scrollable view
		    var currentPhotoViews = checkinScrollablePhotoView.getViews();
		    var tmpImageView = Ti.UI.createImageView({
				defaultImage:IMAGE_PATH+'common/white_top_default.png',
				image:REMOTE_PLACE_IMAGES + jsonData.data.filename,
				width:320,
				height:320,
				top:0
			});
			currentPhotoViews.push(tmpImageView);
			checkinScrollablePhotoView.setViews(currentPhotoViews);
			
			checkinPlaceNumPhotosLabel.text = currentPhotoViews.length + ' photos';
		    
		    //Hide message and close register window
			progressView.hide();
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
	xhr.open('POST',API+'addPlacePhoto');
	xhr.send(photoObject);
}

//get all the users who liked this place
function getPlaceLikedUsersOnline(pId){
	
	Ti.API.info('getPlaceLikedUsersOnline() called for place_id: '+pId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getPlaceLikedUsersOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		Ti.API.info('getPlaceLikedUsersOnline() got back from server '+this.responseText); 
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
	xhr.open('GET',API+'getPlaceLikedUsers');
	xhr.send({
		user_id:userObject.userId,
		place_id:pId,
		token:userObject.token
	});
}

//get all the users who did a checkin in this place
function getPlaceCheckinUsersOnline(pId){
	
	Ti.API.info('getPlaceCheckinUsersOnline() called for place_id: '+pId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getPlaceCheckinUsersOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		Ti.API.info('getPlaceCheckinUsersOnline() got back from server '+this.responseText); 
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
	xhr.open('GET',API+'getPlaceCheckinUsers');
	xhr.send({
		user_id:userObject.userId,
		place_id:pId,
		token:userObject.token
	});
}

//Selects and uploads a photo from the camera roll
function handleCheckinPlacePhotoSelection(){
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
			
			var placePhotoObject = {
				photo:compressedImage,
				thumb:imageThumbnail,
				user_id:userObject.userId,
				token:userObject.token,
				place_id:checkinPlaceHeartImage.placeId
			};
			
			uploadPlacePhoto(placePhotoObject);
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}

//Takes a new photo and uploads it
function handleCameraSelection(){
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
			
			var placePhotoObject = {
				photo:compressedImage,
				thumb:imageThumbnail,
				user_id:userObject.userId,
				token:userObject.token,
				place_id:checkinPlaceHeartImage.placeId
			};
			
			uploadPlacePhoto(placePhotoObject);
		},
		cancel:function(){
	
		},
		error:function(error){
			alert(getLocalMessage(MSG_CAMERA_PROBLEM));
		},
		allowEditing:true
	});
}

//Display the photo options
function handlePlaceShowPhotoOptions(){
	checkinPlacePhotoDialog.show();
}

//populate comment rows
function populateCheckinPlaceCommentsTableView(comObj){
	var tableRows = [];
	
	var addCommentRow = Ti.UI.createTableViewRow({
		height:43,
		className:'addComment',
		backgroundColor:UI_MENU_BACKGROUND_COLOR,
		selectedBackgroundColor:'#1c2027',
		rowId:ADD_COMMENT
	});
	
	//plus image inside button UI
	var addCommentPlusImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'menu_right/add_dog_icon.png',
		left:30
	});
	
	//label inside button UI
	var addCommentLabel = Titanium.UI.createLabel({ 
		text:'Add a comment',
		color:'bab9ba',
		height:27,
		width:125,
		textAlign:'left',
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	addCommentRow.add(addCommentLabel);
	addCommentRow.add(addCommentPlusImage);
	tableRows.push(addCommentRow);
	
	
	for(i=0;i<comObj.length;i++){
		//Ti.API.info('Adding data to the comments row: '+comObj[i].user_id+' and '+comObj[i].name);
		//comment row
		var commentRow = Ti.UI.createTableViewRow({
			className:'commentRow',
			height:'auto',
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			user_id:comObj[i].comm.user_id,
			user_name:comObj[i].comm.name,
			rowId:COMMENT_ROW
		});
		
		var commentRowUserImage = Titanium.UI.createImageView({
			image:API+'photo?user_id='+comObj[i].comm.user_id+'&now='+new Date().getTime(),
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			top:6,
			left:10,
			borderRadius:30,
			borderWidth:2,
			borderColor:'f5a92c'
		});
		
		//comment name label
		var commentNameLabel = Ti.UI.createLabel({
			text:comObj[i].comm.name,
			top:4,
			textAlign:'left',
			width:200,
			bottom:24,
			height:30,
			left:84,
			color:'black',
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//comment label
		var commentLabel = Ti.UI.createLabel({
			text:comObj[i].comm.text,
			top:30,
			bottom:30,
			textAlign:'left',
			width:203,
			height:'auto',
			left:84,
			color:UI_FONT_COLOR_LIGHT_BLACK,
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		var date = new Date(comObj[i].comm.date * 1000);
		
		//comment time
		var timeLabel = Ti.UI.createLabel({
			text:relativeTime(date),
			bottom:10,
			textAlign:'left',
			width:180,
			height:15,
			left:84,
			color:'black',
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		commentRow.add(commentLabel);
		commentRow.add(timeLabel);
		commentRow.add(commentNameLabel);
		commentRow.add(commentRowUserImage);
		
		tableRows.push(commentRow);
	}
	
	
	checkinPlaceCommentsTableView.setData(tableRows);
}

//Event handler for map click
function handleCheckinMapClick(e){
	var x = e.x;
	
	Ti.API.info('Map clicked on checkin place title '+checkinPlaceMap.title);
	
	if(x >= 180){
		Ti.include('ui/iphone/map_place.js');
		var mapView = buildMapPlaceView(checkinPlaceMap.lat, checkinPlaceMap.lon, checkinPlaceMap.title);
		
		//map window
		var checkinMapWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			translucent:false,
			title:'Map',
			barColor:UI_COLOR
		});
		
		checkinMapWindow.add(mapView);
		
		//back button & event listener
		var mapBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		checkinMapWindow.setLeftNavButton(mapBackButton);
		mapBackButton.addEventListener("click", function() {
		    navController.close(checkinMapWindow);
		    openWindows.pop();
		});
		
		openWindows.push(checkinMapWindow);
		navController.open(checkinMapWindow);	
	}
}

//handle comments button bar
function handlePlaceCommentButton(e){
	Ti.API.info('Clicked on the comments bar');
	var toggle = e.source.toggle;
	var button = e.source.button;
	
	//get the window instance
	var targetWindow = null;
	if(checkinPlaceTargetMode == TARGET_MODE_NEW_WINDOW){
		targetWindow = openWindows[openWindows.length - 1];
	} else if(checkinPlaceTargetMode == TARGET_MODE_REUSE){
		targetWindow = navController.getWindow();
	}
	
	if(toggle){
		targetWindow.setRightNavButton(null);
		checkinPlaceCommentsBackgroundView.animate({top:550, duration:500});
		checkinPlaceCommentsTextArea.blur();
		checkinPlaceCommentsTextArea.hide();
		checkinPlaceCommentsTableView.show();
		e.source.toggle = false;

	}else if(!toggle){
		targetWindow.setRightNavButton(null);
		checkinPlaceCommentsBackgroundView.animate({top:-11, duration:500});
		checkinPlaceCommentsTextArea.blur();
		checkinPlaceCommentsTextArea.hide();
		checkinPlaceCommentsTableView.show();
		e.source.toggle = true;
	}
}

//Event handler for click events on the comments table
function handlePlaceViewCommentTableRows(e){
	var row = e.row.rowId;
	Ti.API.info('clicked on comment row: checkinPlaceTargetMode = '+checkinPlaceTargetMode);
	Ti.API.info('clicked on row '+JSON.stringify(e.row));
	
	//get the window instance
	var targetWindow = null;
	if(checkinPlaceTargetMode == TARGET_MODE_NEW_WINDOW){
		targetWindow = openWindows[openWindows.length - 1];
	} else if(checkinPlaceTargetMode == TARGET_MODE_REUSE){
		targetWindow = navController.getWindow();
	}
	
	if(row == ADD_COMMENT){
		
		Ti.API.info('ADD comment button pressed');
		Ti.include('ui/iphone/comment_add.js');
		openAddCommentWindow(TARGET_MODE_NEW_WINDOW, checkinPlaceCommentsObject, checkinPlaceId);
		
		
		/*
		//checkinPlaceView.scrollTo(0,0);
		
		checkinPlaceCommentsBackgroundView.animate({top:-11, duration:200});
		checkinPlaceCommentsButton.toggle = true;
		targetWindow.setRightNavButton(checkinPlaceSaveCommentButton);
		
		checkinPlaceCommentsTextArea.focus();
		checkinPlaceCommentsTableView.hide();
		checkinPlaceCommentsTextArea.show();
		*/
	} else {
		var userId = e.row.user_id;
		var userName = e.row.user_name;
		
		//profile window
		var profileWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			translucent:false,
			barColor:UI_COLOR
		});
		
		//back button & event listener
		var profileBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		profileWindow.setLeftNavButton(profileBackButton);
		profileBackButton.addEventListener("click", function() {
		    navController.close(profileWindow);
		    openWindows.pop();
		});
		
		//Build the appropriate view and attach it to our window
		if (userId == userObject.userId){
		    Ti.include('ui/iphone/profile.js');
			profileWindow.add(viewProfile);
			profileWindow.setTitle(userObject.name);
			  
			openWindows.push(profileWindow);
	        navController.open(profileWindow); 
		} else {
			Ti.include('ui/iphone/profile_other.js');
        
            var profileOtherView = buildProfileOtherView(userId,userName);
            
            profileWindow.add(profileOtherView);
            profileWindow.setTitle(userName);
            
            openWindows.push(profileWindow);
            navController.open(profileWindow);
		}
	}
	
}

function handlePlaceLikeButton(e){
	var placeId = e.source.placeId;
	var toggle = e.source.toggle;
	
	if(toggle){
		unlikePlace(placeId);
		e.source.toggle = false;
	}else{
		likePlace(placeId);
		e.source.toggle = true;
	}
}


function likePlace(pId){
	Ti.API.info('likePlace() with id: ' + pId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in likePlace() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			checkinPlaceHeartImage.image = IMAGE_PATH+'checkin_place/unlike_button.png';
			checkinNumberOfHeartsLabel.text++;
			
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
	xhr.open('POST',API+'likePlace');
	xhr.send({
		user_id:userObject.userId,
		place_id:pId,
		token:userObject.token
	});
}


function unlikePlace(pId){
	Ti.API.info('unlikePlace() with id: ' + pId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in unlikePlace() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			checkinPlaceHeartImage.image = IMAGE_PATH+'checkin_place/like_button.png';
			checkinNumberOfHeartsLabel.text--;
			
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
	xhr.open('POST',API+'unlikePlace');
	xhr.send({
		user_id:userObject.userId,
		place_id:pId,
		token:userObject.token
	});
}

//get place info by id from server
function getOnlinePlace(pId){
	Ti.API.info('getOnlinePlace() called for place_id='+ pId); 	
	
	//progress view
	var progressView = new ProgressView({window:checkinPlaceView});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		navController.getWindow().setTitle('');
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('getOnlinePlace() got back from server '+this.responseText);	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Hide progress view
			progressView.hide();
			
			//Last checkin
			if(jsonData.data.last_checkin != null){
				checkinStatusLabel.text = 'You were here ' + relativeTime(jsonData.data.last_checkin).toLowerCase();
			} else {
				checkinStatusLabel.text = 'You have never been here!!';
			}
			
			updateCheckinPlace(jsonData.data.place, jsonData.data.checkins, jsonData.data.likes, jsonData.data.photos);
			populateCheckinPlaceCommentsTableView(jsonData.data.comments);
			checkinPlaceCommentsObject = jsonData.data.comments;
			
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
	xhr.open('GET',API+'getPlace');
	xhr.send({
		user_id:userObject.userId,
		place_id:pId,
		token:userObject.token
	});
}

//update checkin place UI
function updateCheckinPlace(placeObj, checkins, likes, photos){
	Ti.API.info('place_view.js shows '+placeObj.name+' at latitude '+placeObj.latitude+' and longitude '+placeObj.longitude);
	
	var distance = null;
	
	//distance = calculateCoordinateDistance(placeObj.latitude,placeObj.longitude, placeViewLatitude,placeViewLongitude);
	
	//if(distance < CHECKIN_ALLOWED_DISTANCE){
	if(viewPlaceWithCheckin){
		checkinStatusLabel.hide();
		checkinPlaceButton.show();
		checkinPlaceHeartImage.show();
		checkinNumberLabel.text = checkins;
		checkinNumberOfHeartsLabel.text = likes;
	} else{
		checkinStatusLabel.show();
		checkinNumberLabel.text = checkins;
		checkinNumberOfHeartsLabel.text = likes;
		checkinNumberLabel.show();
		checkinLabel.show();
		checkinNumberOfHeartsLabel.show();
	}
	
	//Url
	if(placeObj.url != null && placeObj.url != ''){
		checkinPlaceUrlLabel.place_url = placeObj.url;
		checkinPlaceUrlLabel.show();
	}
	
	//set photos onto the scrollable view
	if(photos != null){
		var tmpString = ' photos';
		if(photos.length == 1){
			tmpString = ' photo';
		} 
		
		checkinPlaceNumPhotosLabel.text = photos.length + tmpString;
		var photoViews = [];
		
		for(var z=0; z < photos.length; z++){
			var tmpImageView = Ti.UI.createImageView({
				//defaultImage:IMAGE_PATH+'common/white_top_default.png',
				defaultImage:IMAGE_PATH+'common/white_default.png',
				image:REMOTE_PLACE_IMAGES + photos[z].path,
				width:320,
				height:320,
				top:0
			});
			
			photoViews.push(tmpImageView);
		}
		
		checkinScrollablePhotoView.views = photoViews;
	}
	
	//map data for linking to detailed map view
	checkinPlaceMap.lat = placeObj.latitude;
	checkinPlaceMap.lon = placeObj.longitude;
	checkinPlaceMap.title = placeObj.name;
	
	//update map and put annotation
	checkinPlaceMapAnnotation.latitude = placeObj.latitude;
	checkinPlaceMapAnnotation.longitude = placeObj.longitude;
	checkinPlaceMapAnnotation.title = placeObj.name;
	annotations.push(checkinPlaceMapAnnotation);
	checkinPlaceMap.annotations = annotations;
	checkinPlaceMap.region = {latitude:placeObj.latitude, longitude:placeObj.longitude,
            				  latitudeDelta:0.03, longitudeDelta:0.03};
    //update other info
	checkinPlaceMap.longitude = placeObj.longitude;
    checkinPlaceTitleLabel.text = placeObj.name;
    checkinPlaceDescriptionLabel.text = placeObj.category;
    
    //update likes
    if(placeObj.liked == null){
		checkinPlaceHeartImage.image = IMAGE_PATH+'checkin_place/like_button.png';
		checkinPlaceHeartImage.toggle = false;
	}else{
		checkinPlaceHeartImage.image = IMAGE_PATH+'checkin_place/unlike_button.png';
		checkinPlaceHeartImage.toggle = true;
	}
}

/*
function handlePlaceCommentSaveButton(e){
	//get the window instance
	var targetWindow = null;
	if(checkinPlaceTargetMode == TARGET_MODE_NEW_WINDOW){
		targetWindow = openWindows[openWindows.length - 1];
	} else if(checkinPlaceTargetMode == TARGET_MODE_REUSE){
		targetWindow = navController.getWindow();
	}
	
	if(checkinPlaceCommentsTextArea.value != ''){
		addPlaceComObject.comment = checkinPlaceCommentsTextArea.value;
		addPlaceComObject.place_id = e.source.placeId;
		//save place comment
		doSavePlaceCommentOnline(addPlaceComObject);
		
		checkinPlaceCommentsTextArea.blur();
		checkinPlaceCommentsTextArea.hide();
		checkinPlaceCommentsTableView.show();
		targetWindow.setRightNavButton(null);
	}
}
*/

//Server call for saving place comments
/*
function doSavePlaceCommentOnline(comObj){
	Ti.API.info('doSavePlaceCommentOnline() called with commentObject='+comObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSavePlaceCommentOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSavePlaceCommentOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			Ti.API.info('doSavePlaceCommentOnline() got back comment id from server '+jsonData.data.comment_id);
			
			comObj.comment_id = jsonData.data.comment_id;
			
			var date = jsonData.data.date;
			var message = comObj.comment;
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			appendCommentPlaceTableView(date, message);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.open('POST',API+'addPlaceComment');
	xhr.send({
		user_id:userObject.userId,
		comment:comObj.comment,
		place_id:comObj.place_id,
		token:userObject.token
	});
}

function appendCommentPlaceTableView(date, message){
	//comment row
	var commentRow = Ti.UI.createTableViewRow({
		className:'commentRow',
		height:'auto',
		width:'100%',
		backgroundColor:'white',
		selectedBackgroundColor:'transparent',
		rowId:COMMENT_ROW
	});
	
	var commentRowUserImage = Titanium.UI.createImageView({
		image:API+'photo?user_id='+userObject.userId+'&now='+new Date().getTime(),
		defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
		top:6,
		left:10,
		borderRadius:30,
		borderWidth:2,
		borderColor:'f5a92c'
	});
	
	//comment name label
	var commentNameLabel = Ti.UI.createLabel({
		text:userObject.name,
		top:4,
		textAlign:'left',
		width:200,
		bottom:24,
		height:30,
		left:84,
		color:'black',
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	//comment label
	var commentLabel = Ti.UI.createLabel({
		text:message,
		top:30,
		bottom:30,
		textAlign:'left',
		width:203,
		height:'auto',
		left:84,
		color:UI_FONT_COLOR_LIGHT_BLACK,
		font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	var date = new Date(date * 1000);
	
	//comment time
	var timeLabel = Ti.UI.createLabel({
		text:relativeTime(date),
		bottom:10,
		textAlign:'left',
		width:180,
		height:15,
		left:84,
		color:'black',
		font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	commentRow.add(commentLabel);
	commentRow.add(timeLabel);
	commentRow.add(commentNameLabel);
	commentRow.add(commentRowUserImage);
	
	if(checkinPlaceCommentsTableView.data[0].rows.length > 1){
		//viewActivityCommentsTableView.appendRow(commentRow);
		checkinPlaceCommentsTableView.insertRowBefore(1, commentRow);
	}else{
		checkinPlaceCommentsTableView.appendRow(commentRow);
	}
	
	checkinPlaceCommentsTableView.scrollToIndex(1);
	checkinPlaceCommentsTextArea.value = '';
}
*/

function handleCheckinPlaceButton(e){
	var placeId = e.source.place_id;
	
	checkinPlaceOnline(placeId);
}

//save place checkin to online database
function checkinPlaceOnline(placeId){
	Ti.API.info('checkinPlaceOnline() called for place:' + placeId);
	
	//progress view
	var progressView = new ProgressView({window:checkinPlaceView});
	progressView.show({
		text:"Sending..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in checkinPlaceOnline() '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('checkinPlaceOnline() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Show success
			progressView.change({
		        success:true
		    });
		    
		    //Show checkin status message
		    checkinStatusLabel.text = 'You are here now';
		    checkinStatusLabel.show();
		    
			//checkinNumberLabel.show();
			//checkinNumberOfHeartsLabel.show();
			//checkinPlaceLikesHeartImage.show();
			//checkinLabel.show();
			checkinPlaceButton.hide();
			//checkinPlaceHeartImage.hide();
			checkinNumberLabel.text++;
			
			//Hide message
			progressView.hide();
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Post to facebook if we must
			if(shouldPostCheckinFacebook()){
				var fbPost = 'I am with my Dog Pack at '+checkinPlaceTitleLabel.text;
				facebookPost(fbPost, null);	
			}
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.data.response));
		}
	};
	
	xhr.open('POST',API+'checkin');
	xhr.send({
		user_id:userObject.userId,
		place_id:placeId,
		token:userObject.token
	});
}
