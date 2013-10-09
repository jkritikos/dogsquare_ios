//UI components
var viewNotifications = null;
var notificationsTableView = null;

function buildNotificationsView(){
	CURRENT_VIEW = VIEW_NOTIFICATIONS;
	
	if(viewNotifications == null){
		//notifications view
		viewNotifications = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//notifications table view
		notificationsTableView = Titanium.UI.createTableView({
			minRowHeight:71,
			width:293,
			backgroundColor:UI_BACKGROUND_COLOR,
			top:13,
			bottom:0
		});
		viewNotifications.add(notificationsTableView);
		notificationsTableView.addEventListener('click', handleNotificationsTableView);
		
		//notifications table view footer
		notificationsTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor:'transparent'
		});
	}
	
	//Get unread notifications from the server and populate the table
	doGetNotifications();
}

function doGetNotifications(){
	var currentUser = getUserObject();
	
	Ti.API.info('doGetNotifications() called for user_id '+currentUser.userId);
	
	//progress view
	var progressView = new ProgressView({window:viewNotifications});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doGetNotifications() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('doGetNotifications() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
		
			var notificationsList = [];
			
			for(i=0;i<jsonData.data.notifications.length;i++){
				notificationsList.push(jsonData.data.notifications[i].id);
				
				saveNotification(jsonData.data.notifications[i]);
			}
			
			if(notificationsList != 0){
				setOnlineNotificationsToRead(notificationsList);
			}
			
			var notificationsObj = getNotifications();
			
			//Update UI
			if(notificationsObj.length > 0){
				populateNotificationsTableView(notificationsObj);	
			}else{
				notificationsTableView.data = [];
			}
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide progress view
			progressView.hide();
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		}
	};
	
	xhr.open('GET',API+'getNotifications');
	xhr.send({
		user_id:currentUser.userId,
		token:currentUser.token
	});
}

//populate table view
function populateNotificationsTableView(data) {
	
	var tableRows = [];
	var notificationText = '';
	
	for(i=0; i< data.length; i++){
		//build text
		if(data[i].type_id != NOTIFICATION_AWARD_BADGE){
			notificationText = data[i].name + ' ' + getNotificationMessage(data[i].type_id);
		} else {
			notificationText = getNotificationMessage(data[i].type_id);
		}
		
		var notificationTime = relativeTime(data[i].created);
		
		//notification row
		var notificationRow = Ti.UI.createTableViewRow({
			className:'notificationRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			id:data[i].id,
			notification_type:data[i].type_id,
			fromUserId:data[i].user_from,
			fromUserName:data[i].name
		});
		
		//Wrapper view with vertical layout for the text in each row
		var notificationWrapperView = Ti.UI.createView({
			layout:'vertical'
		});
		
		//profile image
		var rowNotificationProfileImage = Titanium.UI.createImageView({
			image:getUserPhoto(data[i].thumb),
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:2,
			borderRadius:30,
			borderWidth:2,
			borderColor:'f5a92c'
		});
		
		//notification label
		var rowNotificationLabel = Titanium.UI.createLabel({ 
			text:notificationText,
			color:'#605353',
			top:15,
			textAlign:'left',
			width:'auto',
			height:'auto',
			left:70,
			font:{fontSize:13, fontWeight:data[i].read == 0 ? 'semibold' : 'regular', fontFamily:'Open Sans'}
		});
		
		//date label
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:notificationTime,
			color:'#938787',
			textAlign:'left',
			width:'auto',
			height:'auto',
			left:70,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		notificationWrapperView.add(rowNotificationLabel);
		notificationWrapperView.add(rowDateLabel);
		
		notificationRow.add(rowNotificationProfileImage);
		notificationRow.add(notificationWrapperView);
		
		tableRows.push(notificationRow);
	}
	
	notificationsTableView.setData(tableRows);
}

function handleNotificationsTableView(e){
	var notType = e.row.notification_type;	
	var userId = e.row.fromUserId;
	var name = e.row.fromUserName;
	var notificationId = e.row.id;
	
	setNotificationToRead(notificationId);
	
	var notificationRowWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR
	});
	
	//back button & event listener
	var notificationRowBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	notificationRowWindow.setLeftNavButton(notificationRowBackButton);
	notificationRowBackButton.addEventListener("click", function() {
	    navController.close(notificationRowWindow);
	    doGetNotifications();
	});
	
	if(notType == NOTIFICATION_COMMENT_ACTIVITY || notType == NOTIFICATION_LIKE_ACTIVITY){
		
		Ti.include('ui/iphone/view_activity.js');
	
		var viewActivityView = buildViewActivityView(userId);
		
		notificationRowWindow.add(viewActivityView);
		notificationRowWindow.setTitle('Activity');
		
		openWindows.push(notificationRowWindow);
		navController.open(notificationRowWindow);
	}else if(notType == NOTIFICATION_NEW_FOLLOWER || notType == NOTIFICATION_WALK_REQUEST){
		
		Ti.include('ui/iphone/profile_other.js');
		
		var profileOtherView = buildProfileOtherView(userId);
		
		notificationRowWindow.add(profileOtherView);
		notificationRowWindow.setTitle(name);
		
		openWindows.push(notificationRowWindow);
		navController.open(notificationRowWindow);
	} else if(notType == NOTIFICATION_AWARD_BADGE){
		Ti.include('ui/iphone/badge_detail.js');
		
		var badgeDetailView = 
	}
}

function setOnlineNotificationsToRead(list){
	
	Ti.API.info('setOnlineNotificationsToRead() reads notifications: '+ list);
	
	var list = JSON.stringify(list);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in setOnlineNotificationsToRead() '+e);
	};
	
	xhr.onload = function(e) {
		Ti.API.info('setOnlineNotificationsToRead() got back from server : '+ this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
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
	
	xhr.open('POST',API+'setNotificationsRead');
	xhr.send({
		user_id:userObject.userId,
		list:list,
		token:userObject.token
	});
}