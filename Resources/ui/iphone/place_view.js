//UI Components
var checkinPlaceCommentsBackgroundView = null;
var checkinPlaceCommentsTextArea = null;
var checkinPlaceCommentsTableView = null;
var checkinPlaceCommentsButton = null;
var checkinPlaceHeartImage = null;
var checkinPlacePhotoImage = null;
var checkinPlaceTitleLabel = null;
var checkinPlaceDescriptionLabel = null;
var checkinPlaceMap = null;
var checkinPlaceMapAnnotation = null;
var checkinPlaceView = null;
var checkinPlaceSaveCommentButton = null;
var checkinPlaceId = null;
var annotations = [];
var addPlaceComObject = {};

var ADD_COMMENT = 1;
var COMMENT_ROW = 2;

function buildCheckinPlaceView(view, placeId){
	checkinPlaceId = placeId;
	
	if(checkinPlaceView == null){
		checkinPlaceView = Ti.UI.createView({
			backgroundColor:'white'
		});
		
		checkinPlaceMapAnnotation = Ti.Map.createAnnotation({
	        animate: true,
	        image:IMAGE_PATH+'run_finish/pin.png'
	   });
		
		//the map
		checkinPlaceMap = Titanium.Map.createView({ 
			width:'100%',
			top:0,
			height:120,
		    mapType:Titanium.Map.STANDARD_TYPE,
		    animate:true,
		    regionFit:true,
		    userLocation:true,
		    visible:true
		});
		checkinPlaceView.add(checkinPlaceMap);
		
		//photo image
		checkinPlacePhotoImage = Ti.UI.createImageView({
			width:320,
			height:320,
			top:120,
			zIndex:1
		});
		checkinPlaceView.add(checkinPlacePhotoImage);
		
		//Place photo event handler opens the gallery for this place
		checkinPlacePhotoImage.addEventListener('click', handlePlaceGallery);
		
		//view to add photo
		var checkinPlacePhotoView = Ti.UI.createView({
			height:120,
			top:checkinPlacePhotoImage.top,
			width:54,
			right:0,
			backgroundColor:'black',
			opacity:0.5,
			zIndex:2
		});
		checkinPlaceView.add(checkinPlacePhotoView);
		
		//add photo icon
		var checkinPlaceAddPhotoIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'gallery/add_photo_icon.png',
			right:10,
			top:168,
			zIndex:2
		});
		
		checkinPlaceView.add(checkinPlaceAddPhotoIcon);
		
		//Event handler for adding photos
		checkinPlacePhotoView.addEventListener('click', handlePlaceShowPhotoOptions);
		checkinPlaceAddPhotoIcon.addEventListener('click', handlePlaceShowPhotoOptions);
		
		//background bar for checkinPlace button
		var checkinPlaceButtonBarView = Ti.UI.createView({
			top:240,
			height:92,
			width:'100%',
			backgroundColor:'white',
			zIndex:2
		});
		checkinPlaceView.add(checkinPlaceButtonBarView);
		
		//place title label
		checkinPlaceTitleLabel = Ti.UI.createLabel({
			top:0,
			textAlign:'left',
			width:280,
			left:17,
			color:'black',
			opacity:0.6,
			zIndex:2,
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		checkinPlaceButtonBarView.add(checkinPlaceTitleLabel);
		
		//place description label
		checkinPlaceDescriptionLabel = Ti.UI.createLabel({
			top:17,
			textAlign:'left',
			width:180,
			left:17,
			color:'black',
			opacity:0.8,
			zIndex:2,
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		checkinPlaceButtonBarView.add(checkinPlaceDescriptionLabel);
		
		//change if it is the view place view
		if(view == VIEW_PLACE_VIEW){
			//checkin number label
			var checkinNumberLabel = Ti.UI.createLabel({
				text:'1600 Check-ins',
				textAlign:'left',
				width:'auto',
				height:20,
				left:94,
				color:'black',
				opacity:0.8,
				font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			checkinPlaceButtonBarView.add(checkinNumberLabel);
			
			//checkin number of hearts label 
			var checkinNumberOfHeartsLabel = Ti.UI.createLabel({
				text:'5',
				textAlign:'left',
				width:'auto',
				height:20,
				right:73,
				color:'black',
				opacity:0.8,
				font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			checkinPlaceButtonBarView.add(checkinNumberOfHeartsLabel);
			
		}else if(view == CHECKIN_PLACE_VIEW){
			
			//checkinPlace button
			var checkinPlaceButton = Ti.UI.createButton({
				backgroundImage:IMAGE_PATH+'checkin_place/check_in_btn.png',
				width:179,
				height:51,
				left:14,
				top:36,
				place_id:placeId
			});
			checkinPlaceButtonBarView.add(checkinPlaceButton);
			checkinPlaceButton.addEventListener('click', handleCheckinPlaceButton);
		}
		
		//heart image
		checkinPlaceHeartImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'common/best_icon_default.png',
			right:46,
			top:38,
			placeId:placeId,
			toggle:false
		});
		checkinPlaceButtonBarView.add(checkinPlaceHeartImage);
		checkinPlaceHeartImage.addEventListener('click', handlePlaceLikeButton);
		
		//background for comments
		checkinPlaceCommentsBackgroundView = Ti.UI.createView({
			top:332,
			height:429,
			width:'100%',
			backgroundColor:'white',
			zIndex:2
		});
		checkinPlaceView.add(checkinPlaceCommentsBackgroundView);
		
		//button to show all comments
		checkinPlaceCommentsButton = Ti.UI.createButton({ 
			backgroundImage:IMAGE_PATH+'common/comment_field.png',
			top:0,
			width:320,
			height:44,
			toggle:false,
			zIndex:3,
			button:'bar'
		});
		checkinPlaceCommentsBackgroundView.add(checkinPlaceCommentsButton);
		//event listener for button
		checkinPlaceCommentsButton.addEventListener('click', handlePlaceCommentButton);
		
		// save button
		checkinPlaceSaveCommentButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/save_button.png',
		    width:54,
		    height:34,
		    placeId:placeId
		});
		checkinPlaceSaveCommentButton.addEventListener('click', handlePlaceCommentSaveButton);
		
		//comments title label
		var checkinPlaceCommentsTitleLabel = Titanium.UI.createLabel({ 
			text:'Comments',
			color:'white',
			top:15,
			height:20,
			textAlign:'center',
			left:18,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		checkinPlaceCommentsButton.add(checkinPlaceCommentsTitleLabel);
		
		//create a comment text area
		checkinPlaceCommentsTextArea = Ti.UI.createTextArea({
			backgroundColor:'white',
			width:276,
			height:137,
			top:55,
			font:{fontSize:15}
		});
		checkinPlaceCommentsBackgroundView.add(checkinPlaceCommentsTextArea); 
		checkinPlaceCommentsTextArea.hide();
		
		//comments tableView
		checkinPlaceCommentsTableView = Titanium.UI.createTableView({
			minRowHeight:47,
			width:320,
			backgroundColor:'e7e7e7',
			top:41,
			bottom:0
		});
		checkinPlaceCommentsBackgroundView.add(checkinPlaceCommentsTableView);
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
		barImage:IMAGE_PATH+'common/bar.png',
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
	});
	
	galleryWindow.add(viewGallery);
	
	openWindows.push(galleryWindow);
	navController.open(galleryWindow);
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

//Selects and uploads a photo from the camera roll
function handleCheckinPlacePhotoSelection(){
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
			jpgcompressor.setCompressSize(200000);
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
			alert('Camera problem');
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
	
	if(comObj.length > 0){
		for(i=0;i<comObj.length;i++){
			//comment row
			var commentRow = Ti.UI.createTableViewRow({
				className:'commentRow',
				height:'auto',
				width:'100%',
				backgroundColor:'transparent',
				selectedBackgroundColor:'transparent',
				rowId:COMMENT_ROW
			});
			
			//comment label
			var commentLabel = Ti.UI.createLabel({
				text:comObj[i].comm.text,
				top:8,
				textAlign:'left',
				width:292,
				bottom:24,
				height:'auto',
				left:14,
				opacity:0.6,
				color:'black',
				font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			var date = new Date(comObj[i].comm.date * 1000);
			
			//comment time
			var timeLabel = Ti.UI.createLabel({
				text:relativeTime(date),
				bottom:10,
				textAlign:'left',
				width:180,
				height:15,
				left:16,
				opacity:0.4,
				color:'black',
				font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			commentRow.add(commentLabel);
			commentRow.add(timeLabel);
			
			tableRows.push(commentRow);
		}
	}else {
		var commentRow = Ti.UI.createTableViewRow({
			className:'commentRow',
			height:48,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		//comment label
		var commentLabel = Ti.UI.createLabel({
			text:'No comments',
			textAlign:'left',
			width:'auto',
			height:'auto',
			opacity:0.6,
			color:'black',
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		commentRow.add(commentLabel);
		
		tableRows.push(commentRow);
	}
	
	checkinPlaceCommentsTableView.setData(tableRows);
}

//handle comments button
function handlePlaceCommentButton(e){
	var toggle = e.source.toggle;
	var button = e.source.button;
	
	if(toggle){
		openWindows[openWindows.length - 1].setRightNavButton(null);
		checkinPlaceCommentsBackgroundView.animate({top:332, duration:500});
		checkinPlaceCommentsTextArea.blur();
		checkinPlaceCommentsTextArea.hide();
		checkinPlaceCommentsTableView.show();
		e.source.toggle = false;

	}else if(!toggle){
		openWindows[openWindows.length - 1].setRightNavButton(null);
		checkinPlaceCommentsBackgroundView.animate({top:-11, duration:500});
		checkinPlaceCommentsTextArea.blur();
		checkinPlaceCommentsTextArea.hide();
		checkinPlaceCommentsTableView.show();
		e.source.toggle = true;
	}
}

function handlePlaceViewCommentTableRows(e){
	var row = e.row.rowId;
	
	if(row == ADD_COMMENT){
		checkinPlaceCommentsBackgroundView.animate({top:-11, duration:200});
		checkinPlaceCommentsButton.toggle = true;
		openWindows[openWindows.length - 1].setRightNavButton(checkinPlaceSaveCommentButton);
		
		checkinPlaceCommentsTextArea.focus();
		checkinPlaceCommentsTableView.hide();
		checkinPlaceCommentsTextArea.show();
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
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			checkinPlaceHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
			
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
	Ti.API.info('unlikeDog() with id: ' + pId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in unlikePlace() '+e);
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			checkinPlaceHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
			
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
	};
	
	xhr.onload = function(e){
		Ti.API.info('getOnlinePlace() got back from server '+this.responseText);	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Hide progress view
			progressView.hide();
			
			updateCheckinPlace(jsonData.data.place);
			populateCheckinPlaceCommentsTableView(jsonData.data.comments);
			
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
function updateCheckinPlace(placeObj){
	
	Ti.API.info('place_view.js shows '+placeObj.name+' at latitude '+placeObj.latitude+' and longitude '+placeObj.longitude);
	//update map and put annotation
	checkinPlaceMapAnnotation.latitude = placeObj.latitude;
	checkinPlaceMapAnnotation.longitude = placeObj.longitude;
	checkinPlaceMapAnnotation.title = placeObj.name;
	annotations.push(checkinPlaceMapAnnotation);
	checkinPlaceMap.annotations = annotations;
	checkinPlaceMap.region = {latitude:placeObj.latitude, longitude:placeObj.longitude,
            				  latitudeDelta:0.01, longitudeDelta:0.01};
    //update other info
	checkinPlaceMap.longitude = placeObj.longitude;
    checkinPlacePhotoImage.image = REMOTE_PLACE_IMAGES + placeObj.photo;
    checkinPlaceTitleLabel.text = placeObj.name;
    checkinPlaceDescriptionLabel.text = placeObj.category;
    
    //update likes
    if(placeObj.liked == null){
		checkinPlaceHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
		checkinPlaceHeartImage.toggle = false;
	}else{
		checkinPlaceHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
		checkinPlaceHeartImage.toggle = true;
	}
}

function handlePlaceCommentSaveButton(e){
	if(checkinPlaceCommentsTextArea.value != ''){
		addPlaceComObject.comment = checkinPlaceCommentsTextArea.value;
		addPlaceComObject.place_id = e.source.placeId;
		//save place comment
		doSavePlaceCommentOnline(addPlaceComObject);
		
		checkinPlaceCommentsTextArea.blur();
		checkinPlaceCommentsTextArea.hide();
		checkinPlaceCommentsTableView.show();
	}
}

//Server call for saving place comments
function doSavePlaceCommentOnline(comObj){
	Ti.API.info('doSavePlaceCommentOnline() called with commentObject='+comObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSavePlaceCommentOnline() '+e);
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
		backgroundColor:'transparent',
		selectedBackgroundColor:'transparent',
		rowId:COMMENT_ROW
	});
	
	//comment label
	var commentLabel = Ti.UI.createLabel({
		text:message,
		top:8,
		textAlign:'left',
		width:292,
		bottom:24,
		height:'auto',
		left:14,
		opacity:0.6,
		color:'black',
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	var dateCreated = new Date(date * 1000);
	
	//comment time
	var timeLabel = Ti.UI.createLabel({
		text:relativeTime(dateCreated),
		bottom:10,
		textAlign:'left',
		width:180,
		height:15,
		left:16,
		opacity:0.4,
		color:'black',
		font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	commentRow.add(commentLabel);
	commentRow.add(timeLabel);
	
	//viewActivityCommentsTableView.appendRow(commentRow);
	checkinPlaceCommentsTableView.insertRowBefore(1, commentRow);
	checkinPlaceCommentsTableView.scrollToIndex(checkinPlaceCommentsTableView.data[0].rows.length - 1);
}

function handleCheckinPlaceButton(e){
	var placeId = e.source.place_id;
	
	checkinPlaceOnline(placeId);
}

//save place checkin to online database
function checkinPlaceOnline(placeId){
	Ti.API.info('checkinPlaceOnline() called for place:' + placeId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in checkinPlaceOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('checkinPlaceOnline() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
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
