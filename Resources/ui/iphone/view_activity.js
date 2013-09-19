
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

var viewActivityView = null;

var viewActivityAnnotationStart = null;
var viewActivityAnnotationEnd = null;

var viewActivityComObject = {};

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
				backgroundColor:'black',
				width:1,
				opacity:0.4,
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
			right:206,
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
			text:'Breed Energy Bar',
			color:'white',
			height:25,
			textAlign:'center',
			left:18,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityTitleBar.add(runFinishTitleLabel);
		
		//dogs table view
		viewActivityTableView = Titanium.UI.createTableView({
			minRowHeight:60,
			width:320,
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:240,
			bottom:39,
			allowsSelection:false,
			height:93
		});
		
		viewActivityView.add(viewActivityTableView);
		
		//background for comments
		viewActivityCommentsBackgroundView = Ti.UI.createView({
			top:384,
			height:429,
			width:'100%',
			backgroundColor:UI_BACKGROUND_COLOR,
			zIndex:2
		});
		
		//button to show all comments
		viewActivityCommentsButton = Ti.UI.createButton({ 
			backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
			top:0,
			width:320,
			height:33,
			toggle:false,
			button:'bar'
		});
		viewActivityCommentsBackgroundView.add(viewActivityCommentsButton);
		//event listener for button
		viewActivityCommentsButton.addEventListener('click', handleViewActivityCommentButtons);
		
		// save button
		viewActivitySaveCommentButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/save_button.png',
		    width:54,
		    height:34,
		    activityId:aId
		});
		viewActivitySaveCommentButton.addEventListener('click', handleActivityCommentSaveButton);
		
		//plus buttton to create a new comment
		var viewActivityPlusButton = Ti.UI.createButton({ 
			backgroundImage:IMAGE_PATH+'checkin_place/add_icon.png',
			bottom:4,
			right:26,
			width:12,
			height:12,
			button:'plus'
		});
		viewActivityCommentsButton.add(viewActivityPlusButton);
		//event listener for plus button
		viewActivityPlusButton.addEventListener('click', handleViewActivityCommentButtons);
		
		//comments title label
		var viewActivityCommentsTitleLabel = Titanium.UI.createLabel({ 
			text:'Comments',
			color:'white',
			top:13,
			height:20,
			textAlign:'center',
			left:18,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		viewActivityCommentsButton.add(viewActivityCommentsTitleLabel);
		
		//create a comment textField
		viewActivityCommentsTextArea = Ti.UI.createTextArea({
			backgroundColor:'white',
			width:276,
			height:137,
			top:55,
			font:{fontSize:15}
		});
		viewActivityCommentsBackgroundView.add(viewActivityCommentsTextArea);
		viewActivityCommentsTextArea.hide();
		
		//comments tableView
		viewActivityCommentsTableView = Titanium.UI.createTableView({
			minRowHeight:47,
			width:320,
			backgroundColor:'e7e7e7',
			top:36,
			bottom:0,
			allowsSelection:false
		});
		viewActivityCommentsBackgroundView.add(viewActivityCommentsTableView);
		viewActivityView.add(viewActivityCommentsBackgroundView);
		
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
			left:14,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		row.add(rowDogImage);
		
		//dog name label
		var rowDogNameLabel = Titanium.UI.createLabel({ 
			text:dogObj[i].Dog.name,
			color:'black',
			height:65,
			textAlign:'center',
			left:91,
			opacity:0.7,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		row.add(rowDogNameLabel);
		
		//bone image
		var rowBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'run_finish/bone_icon.png',
			right:105
		});
		
		row.add(rowBoneImage);
		
		//bone fill image
		var boneFillImage = Titanium.Filesystem.getFile(IMAGE_PATH+'run_finish/bone_icon_fill.png');
		var boneFillImageBlob = boneFillImage.toBlob();
		var boneFillImageBlobCropped = boneFillImageBlob.imageAsCropped({y:0,x:0,width:10});
		var rowBoneFillImage = Ti.UI.createImageView({ 
			image:boneFillImageBlobCropped,
			right:105,
			zIndex:2
		}); 
		
		row.add(rowBoneFillImage);
		
		//mood label
		var rowMoodLabel = Titanium.UI.createLabel({ 
			text:'Happy',
			color:'black',
			height:15,
			textAlign:'center',
			right:120,
			bottom:10,
			opacity:0.3,
			font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		row.add(rowMoodLabel);
		
		//mood percent label
		var rowMoodPercentLabel = Titanium.UI.createLabel({ 
			text:'14%',
			color:'999900',
			height:15,
			textAlign:'center',
			right:97,
			bottom:10,
			font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		row.add(rowMoodPercentLabel);
		
		//sepparator for rows
		var rowSepparator = Titanium.UI.createView({ 
			backgroundColor:'black',
			opacity:0.1,
			bottom:0,
			height:1,
			width:299
		});
		row.add(rowSepparator);
		
		tableRows.push(row);
	}
	
	viewActivityTableView.setData(tableRows);
}

//populate comment rows
function populateViewActivityCommentsTableView(comObj){
	var tableRows = [];
	
	for(i=0;i<comObj.length;i++){
		//comment row
		var commentRow = Ti.UI.createTableViewRow({
			className:'commentRow',
			height:'auto',
			width:'100%',
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
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
	
	viewActivityCommentsTableView.setData(tableRows);
}

//handle comments button and plus button
function handleViewActivityCommentButtons(e){
	var toggle = e.source.toggle;
	var button = e.source.button;
	
	if(toggle && button != 'plus'){
		openWindows[0].setRightNavButton(null);
		viewActivityCommentsBackgroundView.animate({top:384, duration:500});
		viewActivityCommentsTextArea.blur();
		viewActivityCommentsTextArea.hide();
		viewActivityCommentsTableView.show();
		e.source.toggle = false;
	}else if(!toggle && button != 'plus'){
		openWindows[0].setRightNavButton(null);
		viewActivityCommentsBackgroundView.animate({top:-13, duration:500});
		viewActivityCommentsTextArea.blur();
		viewActivityCommentsTextArea.hide();
		viewActivityCommentsTableView.show();
		e.source.toggle = true;
	}else if(button == 'plus'){
		viewActivityCommentsBackgroundView.animate({top:-13, duration:300});
		viewActivityCommentsButton.toggle = true;
		openWindows[0].setRightNavButton(viewActivitySaveCommentButton);
		
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
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'likeActivity');
	xhr.send({
		user_id:userObject.userId,
		activity_id:aId
	});
}

function unlikeActivity(aId){
	Ti.API.info('unlikeActivity() with id: ' + aId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			viewActivityHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'unlikeActivity');
	xhr.send({
		user_id:userObject.userId,
		activity_id:aId
	});
}

function handleActivityCommentSaveButton(e){
	if(viewActivityCommentsTextArea.value != ''){
		viewActivityComObject.comment = viewActivityCommentsTextArea.value;
		viewActivityComObject.activity_id = e.source.activityId;
		//save place comment
		doSaveActivityCommentOnline(viewActivityComObject);
	}
}

//Server call for saving activity comments
function doSaveActivityCommentOnline(comObj){
	Ti.API.info('doSaveActivityCommentOnline() called with commentObject='+comObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSaveActivityCommentOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			Ti.API.info('doSaveActivityCommentOnline() got back comment id from server '+jsonData.data.comment_id);
			
			comObj.comment_id = jsonData.data.comment_id;
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			alert('activity comment successfully added');
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('POST',API+'addActivityComment');
	xhr.send({
		user_id:userObject.userId,
		comment:comObj.comment,
		activity_id:comObj.activity_id,
	});
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
		} else{
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
		activity_id:aId
	});
}

function getActivityLikedUsersOnline(aId){
	Ti.API.info('getActivityLikedUsersOnline() called with activity_id: '+aId);
	
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
	xhr.open('GET',API+'getActivityLikedUsers');
	xhr.send({
		user_id:userObject.userId,
		activity_id:aId
	});
}

function updateActivityView(activityObj){
	
	viewActivityDistanceNumberLabel.text = activityObj.distance;
	viewActivityAvgPaceNumberLabel.text = activityObj.pace;
	viewActivityWeatherNumberLabel.text = activityObj.temperature;
	viewActivityLikesNumberLabel.text = activityObj.likes;
	
    
    if(activityObj.liked == null){
		viewActivityHeartImage.image = IMAGE_PATH+'common/best_icon_default.png';
		viewActivityHeartImage.toggle = false;
	}else{
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
			latitudeDelta:0.001,
			longitudeDelta:0.001
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