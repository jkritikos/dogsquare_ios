
var viewActivityCommentsBackgroundView = null;
var viewActivityCommentsTextArea = null;
var viewActivityCommentsTableView  = null;
var viewActivityCommentsButton = null;
var viewActivityHeartImage = null;
var viewActivityDistanceNumberLabel = null;
var viewActivityAvgPaceNumberLabel = null;
var viewActivityWeatherNumberLabel = null;
var viewActivityLikesNumberLabel = null;
var viewActivityTableView = null;
var viewActivityMap = null;

var ADD_COMMENT = 1;
var COMMENT_ROW = 2;

var viewActivityView = null;

var viewActivityAnnotationStart = null;
var viewActivityAnnotationEnd = null;

var viewActivityComObject = {};

CURRENT_VIEW = VIEW_ACTIVITY_NEW;

function buildViewActivityView(aId){
	if(viewActivityView == null){
		
		//activity View
		viewActivityView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//start point annotation
		viewActivityAnnotationStart = Titanium.Map.createAnnotation({
			title:"Start",
			animate:true,
			image:IMAGE_PATH+'run_finish/pin.png'
		});
		
		//end point annotation
		viewActivityAnnotationEnd = Titanium.Map.createAnnotation({
			title:"End",
			animate:true,
			image:IMAGE_PATH+'run_finish/pin.png'
		});
		
		//the map
		viewActivityMap = Titanium.Map.createView({ 
			width:'100%',
			top:0,
			height:214,
		    mapType:Titanium.Map.STANDARD_TYPE,
		    animate:true,
		    regionFit:true,
		    userLocation:false,
		    visible:true,
		    annotations:[viewActivityAnnotationStart,viewActivityAnnotationEnd]
		});
		
		//heart image
		viewActivityHeartImage = Ti.UI.createImageView({
			left:7,
			top:7,
			activityId:aId,
			toggle:false
		});
		viewActivityMap.add(viewActivityHeartImage);
		viewActivityHeartImage.addEventListener('click', handleActivityLikeButton);
		
		//opacity bar
		var viewActivityOpacityBar = Titanium.UI.createView({ 
			backgroundColor:'white',
			width:'100%',
			top:150,
			height:52,
			opacity:0.8
		});
		viewActivityMap.add(viewActivityOpacityBar);
		
		
		var dividerLeftOffset = 0;
		
		for(i=0;i<=2;i++){
			var viewActivityDividerBar = Titanium.UI.createView({ 
				backgroundColor:UI_FONT_COLOR_LIGHT_GREY,
				width:1,
				height:31,
				left:79 + dividerLeftOffset
			});
			viewActivityOpacityBar.add(viewActivityDividerBar);
			
			dividerLeftOffset += 80;
		}
		
		//number of the distance label
		viewActivityDistanceNumberLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'right',
			right:278,
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityDistanceNumberLabel);
		
		//unit of the distance label
		var viewActivityDistanceUnitLabel = Titanium.UI.createLabel({ 
			text:'km',
			height:17,
			textAlign:'center',
			left:44,
			top:14,
			font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityDistanceUnitLabel);
		
		//distance label
		var viewActivityDistanceLabel = Titanium.UI.createLabel({ 
			text:'distance',
			height:19,
			textAlign:'center',
			left:16,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityDistanceLabel);
		
		//number of the average pace label
		viewActivityAvgPaceNumberLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'right',
			right:207,
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityAvgPaceNumberLabel);
		
		//unit of the average pace label
		var viewActivityAvgPaceUnitLabel = Titanium.UI.createLabel({ 
			text:'km/h',
			height:17,
			textAlign:'center',
			left:115,
			top:14,
			font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityAvgPaceUnitLabel);
		
		//average pace label
		var viewActivityAvgPaceLabel = Titanium.UI.createLabel({ 
			text:'avg pace',
			height:19,
			textAlign:'center',
			left:92,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityAvgPaceLabel);
		
		//number of the weather label
		viewActivityWeatherNumberLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'right',
			right:116,
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityWeatherNumberLabel);
		
		//unit of the weather label
		var viewActivityWeatherUnitLabel = Titanium.UI.createLabel({ 
			text:'°C',
			height:17,
			textAlign:'center',
			left:206,
			top:14,
			font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityWeatherUnitLabel);
		
		//weather label
		var viewActivityWeatherLabel = Titanium.UI.createLabel({ 
			text:'weather',
			height:19,
			textAlign:'center',
			left:177,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityWeatherLabel);
		
		//number of the Likes label
		viewActivityLikesNumberLabel = Titanium.UI.createLabel({
			height:21,
			textAlign:'center',
			left:269,
			top:10,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityLikesNumberLabel);
		
		var viewActivityLikesIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'dog_profile/best_icon_selected.png',
			left:287,
			top:11,
			actId:aId
		});
		viewActivityLikesIcon.addEventListener('click', handleActivityLikesButton);
		viewActivityOpacityBar.add(viewActivityLikesIcon);
		
		var viewActivityLikesLabel = Titanium.UI.createLabel({ 
			text:'Likes',
			height:19,
			textAlign:'center',
			left:266,
			bottom:4,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityOpacityBar.add(viewActivityLikesLabel);
		
		viewActivityView.add(viewActivityMap);
		
		//Table view title bar	
		var viewActivityTitleBar = Titanium.UI.createView({ 
			backgroundColor:UI_COLOR,
			width:'100%',
			top:214,
			height:25
		});
		viewActivityView.add(viewActivityTitleBar);
		
		//Table view title label	
		var runFinishTitleLabel = Titanium.UI.createLabel({ 
			text:'Status',
			color:'white',
			height:25,
			textAlign:'center',
			left:18,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityTitleBar.add(runFinishTitleLabel);
		
		//dogs table view
		viewActivityTableView = Titanium.UI.createTableView({
			minRowHeight:60,
			width:320,
			backgroundColor:'transparent',
			top:240,
			bottom:39,
			allowsSelection:false,
			height:140
		});
		
		viewActivityView.add(viewActivityTableView);
		
		//background for comments
		viewActivityCommentsBackgroundView = Ti.UI.createView({
			top:IPHONE5 ? 417 : 374,
			height:IPHONE5 ? 513 : 429,
			width:'100%',
			backgroundColor:UI_BACKGROUND_COLOR,
			zIndex:2
		});
		
		//button to show all comments
		viewActivityCommentsButton = Ti.UI.createButton({ 
			backgroundImage:IMAGE_PATH+'common/comment_field.png',
			top:0,
			width:320,
			height:44,
			toggle:false,
			zIndex:3,
			button:'bar'
		});
		viewActivityCommentsBackgroundView.add(viewActivityCommentsButton);
		//event listener for button
		viewActivityCommentsButton.addEventListener('click', handleViewActivityCommentButton);
		
		// save button
		viewActivitySaveCommentButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/save_button.png',
		    width:54,
		    height:34,
		    activityId:aId
		});
		viewActivitySaveCommentButton.addEventListener('click', handleActivityCommentSaveButton);
		
		//comments title label
		var viewActivityCommentsTitleLabel = Titanium.UI.createLabel({ 
			text:'Comments',
			color:'white',
			top:15,
			height:20,
			textAlign:'center',
			left:18,
			font:UI_FONT_BARS
		});
		viewActivityCommentsButton.add(viewActivityCommentsTitleLabel);
		
		//create a comment textField
		viewActivityCommentsTextArea = Ti.UI.createTextArea({
			backgroundColor:'white',
			width:276,
			height:137,
			top:55,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		viewActivityCommentsBackgroundView.add(viewActivityCommentsTextArea);
		viewActivityCommentsTextArea.hide();
		
		//comments tableView
		viewActivityCommentsTableView = Titanium.UI.createTableView({
			minRowHeight:47,
			width:320,
			backgroundColor:'e7e7e7',
			top:41
		});
		viewActivityCommentsBackgroundView.add(viewActivityCommentsTableView);
		viewActivityView.add(viewActivityCommentsBackgroundView);
		viewActivityCommentsTableView.addEventListener('click', handleViewActivityCommentTableRows);
		
		//remove empty rows
		viewActivityCommentsTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
	}
	getActivityOnline(aId);
	
	return viewActivityView;
	
	Ti.API.info('buildActivityView() created');
}

function populateViewActivityDogsTableView(dogObj){
	var tableRows = [];
	
	for(i=0;i<dogObj.length;i++){
		//row
		var row = Ti.UI.createTableViewRow({ 
			className:'runFinishRow',
			height:79,
			backgroundColor:UI_BACKGROUND_COLOR,
			selectedBackgroundColor:'transparent'
		});
		
		var rowDogImage = Titanium.UI.createImageView({ 
			image:REMOTE_DOG_IMAGES + dogObj[i].Dog.thumb,
			defaultImage:IMAGE_PATH+'common/default_dog_photo.png',
			left:14,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		row.add(rowDogImage);
		
		//dog name label
		var rowDogNameLabel = Titanium.UI.createLabel({ 
			text:dogObj[i].Dog.name,
			color:'#474747',
			height:65,
			textAlign:'center',
			left:91,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		row.add(rowDogNameLabel);
		
		//bone image
		var rowBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'run_finish/bone_grey.png',
			left:210,
			top:20,
			height:30
		});
		
		row.add(rowBoneImage);
		
		//Filled bone image
		if(dogObj[i].Dog.dogfuel != null && dogObj[i].Dog.dogfuel > 0){
			var croppedDataObject = createCroppedBoneImage(VIEW_RUN_FINISH,dogObj[i].Dog.dogfuel);
			var rowBoneFillImage = Ti.UI.createImageView({ 
				image:croppedDataObject.photo,
				width: croppedDataObject.view_width,
				height:30,
				left:210,
				top:20,
				zIndex:2
			});
			
			row.add(rowBoneFillImage);
		}
		
		//mood label
		var rowMoodLabel = Titanium.UI.createLabel({ 
			text:'Dogfuel',
			color:'#afaeae',
			height:15,
			textAlign:'center',
			right:52,
			bottom:13,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		row.add(rowMoodLabel);
		
		//mood percent label
		var rowMoodPercentLabel = Titanium.UI.createLabel({ 
			text:dogObj[i].Dog.dogfuel + '%',
			color:'999900',
			height:15,
			textAlign:'center',
			left:271,
			bottom:13,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		row.add(rowMoodPercentLabel);
		
		tableRows.push(row);
	}
	
	viewActivityTableView.setData(tableRows);
}

//populate comment rows
function populateViewActivityCommentsTableView(comObj){
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
			image:API+'photo?user_id='+comObj[i].comm.user_id,
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
	
	viewActivityCommentsTableView.setData(tableRows);
}

//handle comments button and plus button
function handleViewActivityCommentButton(e){
	var toggle = e.source.toggle;
	var button = e.source.button;
	
	if(toggle){
		openWindows[openWindows.length - 1].setRightNavButton(null);
		viewActivityCommentsBackgroundView.animate({top:IPHONE5 ? 417 : 374, duration:500});
		viewActivityCommentsTextArea.blur();
		viewActivityCommentsTextArea.hide();
		viewActivityCommentsTableView.show();
		e.source.toggle = false;
	}else if(!toggle){
		openWindows[openWindows.length - 1].setRightNavButton(null);
		viewActivityCommentsBackgroundView.animate({top:-11, duration:500});
		viewActivityCommentsTextArea.blur();
		viewActivityCommentsTextArea.hide();
		viewActivityCommentsTableView.show();
		e.source.toggle = true;
	}
}

function handleViewActivityCommentTableRows(e){
	var row = e.row.rowId;
	
	if(row == ADD_COMMENT){
		viewActivityCommentsBackgroundView.animate({top:-11, duration:300});
		viewActivityCommentsButton.toggle = true;
		openWindows[openWindows.length - 1].setRightNavButton(viewActivitySaveCommentButton);
		
		viewActivityCommentsTextArea.focus();
		viewActivityCommentsTableView.hide();
		viewActivityCommentsTextArea.show();
	}
	
}

function handleActivityLikeButton(e){
	var activityId = e.source.activityId;
	var toggle = e.source.toggle;
	
	if(toggle){
		viewActivityLikesNumberLabel.text--;
		unlikeActivity(activityId);
		e.source.toggle = false;
	}else{
		viewActivityLikesNumberLabel.text++;
		likeActivity(activityId);
		e.source.toggle = true;
	}
}


function likeActivity(aId){
	Ti.API.info('likeActivity() with id: ' + aId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in likeActivity() '+e);
	};
	
	xhr.onload = function(e) {
		Ti.API.info('likeActivity() got back from server '+this.responseText);
		
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			viewActivityHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
			
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
	xhr.open('POST',API+'likeActivity');
	xhr.send({
		user_id:userObject.userId,
		activity_id:aId,
		token:userObject.token
	});
}

function unlikeActivity(aId){
	Ti.API.info('unlikeActivity() with id: ' + aId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in unlikeActivity() '+e);
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			viewActivityHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
			
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
	xhr.open('POST',API+'unlikeActivity');
	xhr.send({
		user_id:userObject.userId,
		activity_id:aId,
		token:userObject.token
	});
}

function handleActivityCommentSaveButton(e){
	if(viewActivityCommentsTextArea.value != ''){
		viewActivityComObject.comment = viewActivityCommentsTextArea.value;
		viewActivityComObject.activity_id = e.source.activityId;
		
		var view = VIEW_ACTIVITY_NEW;
		
		//save place comment
		doSaveActivityCommentOnline(viewActivityComObject, view);
		
		viewActivityCommentsTextArea.blur();
		viewActivityCommentsTextArea.hide();
		viewActivityCommentsTableView.show();
		openWindows[openWindows.length - 1].setRightNavButton(null);
	}
}

function getActivityOnline(aId){
	
	Ti.API.info('getActivityOnline() called with activity_id: '+aId);
	
	//progress view
	var progressView = new ProgressView({window:viewActivityView});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getActivityOnline()');
	};
	
	xhr.onload = function(e) {
		Ti.API.info('getActivityOnline() got back from server: '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			updateActivityView(jsonData.data.activity);
			updateActivityCoordinates(jsonData.data.coordinates);
			
			populateViewActivityDogsTableView(jsonData.data.dogs);
			populateViewActivityCommentsTableView(jsonData.data.comments);
			
			//Hide progress view
			progressView.hide();
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
	
	xhr.open('GET',API+'getActivity');
	xhr.send({
		user_id:userObject.userId,
		activity_id:aId,
		token:userObject.token
	});
}

function getActivityLikedUsersOnline(aId){
	Ti.API.info('getActivityLikedUsersOnline() called with activity_id: '+aId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getActivityLikedUsersOnline() '+e);
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateListUsersTableView(jsonData.data);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else{
			alert(getErrorMessage(jsonData.data.response));
		}
	};
	xhr.open('GET',API+'getActivityLikedUsers');
	xhr.send({
		user_id:userObject.userId,
		activity_id:aId,
		token:userObject.token
	});
}

//Updates the UI with the data returned from the server
function updateActivityView(activityObj){
	
	viewActivityDistanceNumberLabel.text = activityObj.distance;
	viewActivityAvgPaceNumberLabel.text = activityObj.pace;
	viewActivityWeatherNumberLabel.text = activityObj.temperature;
	viewActivityLikesNumberLabel.text = activityObj.likes;
	
    
    if(activityObj.liked == 0){
		viewActivityHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
		viewActivityHeartImage.toggle = false;
	} else{
		viewActivityHeartImage.image = IMAGE_PATH+'common/best_icon_selected_red.png';
		viewActivityHeartImage.toggle = true;
	}
}

function updateActivityCoordinates(coordsObj){
	if(coordsObj.length != 0){
		viewActivityAnnotationStart.latitude = coordsObj[0].latitude;
		viewActivityAnnotationStart.longitude = coordsObj[0].longitude;
		
		viewActivityAnnotationEnd.latitude = coordsObj[coordsObj.length - 1].latitude;
		viewActivityAnnotationEnd.longitude = coordsObj[coordsObj.length - 1].longitude;
		
		//map region object
		var viewActivityRegion = {
			latitude: coordsObj[0].latitude,
			longitude: coordsObj[0].longitude,
			animate:true,
			latitudeDelta:0.004,
			longitudeDelta:0.004
		};
		
		viewActivityMap.setLocation(viewActivityRegion);
		
		//route object
		var route = {
		    name:"Your path",
		    points:coordsObj,
		    color:"f9bf30",
		    borderColor:'black',
		    width:8
		};
		
		// add the route
		viewActivityMap.addRoute(route);
	}
}

function handleActivityLikesButton(e){
	var activityId = e.source.actId;
	
	var userId = userObject.userId;
	
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	
	getActivityLikedUsersOnline(activityId);
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
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

function appendCommentActivityTableView(date, message){
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
			image:API+'photo?user_id='+userObject.userId,
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
	
	
	if(viewActivityCommentsTableView.data[0].rows.length > 1){
		//viewActivityCommentsTableView.appendRow(commentRow);
		viewActivityCommentsTableView.insertRowBefore(1, commentRow);
	}else{
		viewActivityCommentsTableView.appendRow(commentRow);
	}
	
	viewActivityCommentsTableView.scrollToIndex(1);
	
	viewActivityCommentsTextArea.value = '';
}