//UI components
var commentsTextArea = null;
var commentsTableView = null;
var saveCommentButton = null;

//Data components
var addCommentObject = {};
var commentAddObjectId = null;

function openAddCommentWindow(windowMode, commentsObj, objectId){
	commentAddObjectId = objectId;
	
	//window
	var commentsWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		translucent:false,
		title:'Comments',
		barColor:UI_COLOR
	});
	
	//back button & event listener
	var commentsBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	commentsWindow.setLeftNavButton(commentsBackButton);
	commentsBackButton.addEventListener("click", function() {
	    navController.close(commentsWindow);
	    openWindows.pop();
	});
	
	//save button & event listener
	saveCommentButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/save_button.png',
	    width:54,
	    height:34,
	    placeId:objectId
	});
	
	saveCommentButton.addEventListener('click', handlePlaceCommentSaveButton);
	commentsWindow.setRightNavButton(saveCommentButton);
	
	//build view
	var addCommentView = buildAddCommentView(commentsObj);
	commentsWindow.add(addCommentView);
	
	//open win
	openWindows.push(commentsWindow);
	navController.open(commentsWindow); 
	
	commentsTextArea.focus();
}

function buildAddCommentView(commentsObj){
	//master view
	var viewAddComments = Ti.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	//create a comment text area
	commentsTextArea = Ti.UI.createTextArea({
		backgroundColor:'white',
		width:290,
		height:100,
		top:10,
		font:{fontSize:15}
	});
	
	//comments tableView
	commentsTableView = Titanium.UI.createTableView({
		data:populateCommentsTableView(commentsObj),
		minRowHeight:47,
		width:320,
		backgroundColor:'e7e7e7',
		top:121,
		bottom:0
	});
	
	//comments table event listener
	commentsTableView.addEventListener('click', handlePlaceViewCommentTableRows);
	
	viewAddComments.add(commentsTextArea);
	viewAddComments.add(commentsTableView);
	
	return viewAddComments;
}

//populate comment rows
function populateCommentsTableView(comObj){
	var tableRows = [];
	
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
	
	return tableRows;
}

function handlePlaceCommentSaveButton(e){
	Ti.API.info('comment_add.js Save pressed');
	
	//get the window instance
	var targetWindow = openWindows[openWindows.length - 1];
	
	if(commentsTextArea.value != ''){
		addCommentObject.comment = commentsTextArea.value;
		addCommentObject.place_id = e.source.placeId;
		//save place comment
		doSavePlaceCommentOnline(addCommentObject);
		
		commentsTextArea.blur();
		//commentsTextArea.hide();
		//checkinPlaceCommentsTableView.show();
		targetWindow.setRightNavButton(null);
	}
}

//Event handler for click events on the comments table
function handlePlaceViewCommentTableRows(e){
	var row = e.row.rowId;
	
	//get the window instance
	var targetWindow = null;
	if(checkinPlaceTargetMode == TARGET_MODE_NEW_WINDOW){
		targetWindow = openWindows[openWindows.length - 1];
	} else if(checkinPlaceTargetMode == TARGET_MODE_REUSE){
		targetWindow = navController.getWindow();
	}
	
	if(row == ADD_COMMENT){
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

//Server call for saving place comments
function doSavePlaceCommentOnline(comObj){
	Ti.API.info('doSavePlaceCommentOnline() called with commentObject='+comObj); 	
	
	var targetWindow = openWindows[openWindows.length - 1];
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSavePlaceCommentOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
		
		targetWindow.setRightNavButton(saveCommentButton);
	};
	
	xhr.onload = function(e){
		targetWindow.setRightNavButton(saveCommentButton);
		
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
		rowId:COMMENT_ROW,
		user_name:userObject.name,
		user_id:userObject.userId
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
		commentsTableView.insertRowBefore(0, commentRow);
	}else{
		commentsTableView.appendRow(commentRow);
	}
	
	getOnlinePlace(commentAddObjectId);
	
	commentsTableView.scrollToIndex(1);
	commentsTextArea.value = '';
}