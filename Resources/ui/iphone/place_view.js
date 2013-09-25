

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
var annotations = [];
var addPlaceComObject = {};

var ADD_COMMENT = 1;
var COMMENT_ROW = 2;

function buildCheckinPlaceView(view, placeId){
	if(checkinPlaceView == null){
		checkinPlaceView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		checkinPlaceMapAnnotation = Ti.Map.createAnnotation({
	        animate: true,
	        pincolor: Ti.Map.ANNOTATION_GREEN
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
			width:'100%',
			height:120,
			top:120
		});
		checkinPlaceView.add(checkinPlacePhotoImage);
		
		//view to add photo
		var checkinPlacePhotoView = Ti.UI.createView({
			height:120,
			top:checkinPlacePhotoImage.top,
			width:54,
			right:0,
			backgroundColor:'black',
			opacity:0.5
		});
		checkinPlaceView.add(checkinPlacePhotoView);
		
		//place title label
		checkinPlaceTitleLabel = Ti.UI.createLabel({
			top:240,
			textAlign:'left',
			width:100,
			height:21,
			left:16,
			color:'black',
			opacity:0.6,
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		checkinPlaceView.add(checkinPlaceTitleLabel);
		
		//place description label
		checkinPlaceDescriptionLabel = Ti.UI.createLabel({
			top:257,
			textAlign:'left',
			width:100,
			height:16,
			left:17,
			color:'black',
			opacity:0.8,
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		checkinPlaceView.add(checkinPlaceDescriptionLabel);
		
		//background bar for checkinPlace button
		var checkinPlaceButtonBarView = Ti.UI.createView({
			top:277,
			height:55,
			width:'100%',
			backgroundColor:'white'
		});
		checkinPlaceView.add(checkinPlaceButtonBarView);
		
		//change if it is the view place view
		if(view == VIEW_PLACE_VIEW){
			//checkin number label
			var checkinNumberLabel = Ti.UI.createLabel({
				text:'16 Check-ins',
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
				left:14
			});
			checkinPlaceButtonBarView.add(checkinPlaceButton);
		}
		
		//heart image
		checkinPlaceHeartImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'common/best_icon_default.png',
			right:46,
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
			backgroundColor:UI_BACKGROUND_COLOR,
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
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			checkinPlaceHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'likePlace');
	xhr.send({
		user_id:userObject.userId,
		place_id:pId
	});
}


function unlikePlace(pId){
	Ti.API.info('unlikeDog() with id: ' + pId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			checkinPlaceHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'unlikePlace');
	xhr.send({
		user_id:userObject.userId,
		place_id:pId
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
		place_id:pId
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
	}
}

//Server call for saving place comments
function doSavePlaceCommentOnline(comObj){
	Ti.API.info('doSavePlaceCommentOnline() called with commentObject='+comObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSavePlaceCommentOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			Ti.API.info('doSavePlaceCommentOnline() got back comment id from server '+jsonData.data.comment_id);
			
			comObj.comment_id = jsonData.data.comment_id;
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			alert('place comment successfully added');
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('POST',API+'addPlaceComment');
	xhr.send({
		user_id:userObject.userId,
		comment:comObj.comment,
		place_id:comObj.place_id,
	});
}