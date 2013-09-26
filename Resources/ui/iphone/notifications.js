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
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('doGetNotifications() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		//Hide progress view
		progressView.hide();
		
		var followers = jsonData.data.count_followers;
		var inbox = jsonData.data.count_inbox;
		var notifications = jsonData.data.count_notifications;
		
		updateLeftMenuCounts(followers, inbox, notifications);
		
		//Update UI
		if(jsonData.data.notifications.length > 0){
			populateNotificationsTableView(jsonData.data.notifications);	
		}else{
			notificationsTableView.data = [];
		}
	};
	
	xhr.open('GET',API+'getNotifications');
	xhr.send({
		user_id:currentUser.userId
	});
}

//populate table view
function populateNotificationsTableView(data) {
	
	var tableRows = [];
	
	for(i=0; i< data.length; i++){
		//build text
		var notificationText = data[i].name + ' ' + getNotificationMessage(data[i].type_id);
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
			image:REMOTE_USER_IMAGES+data[i].thumb,
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
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//date label
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:notificationTime,
			color:'black',
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
	Ti.include('ui/iphone/profile_other.js');
		
	var userId = e.row.fromUserId;
	var profileOtherView = buildProfileOtherView(userId);
	var name = e.row.fromUserName;
	var notificationId = e.row.id;
	
	setNotificationToRead(notificationId);
	
	var profileOtherWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:name
	});
	
	//back button & event listener
	var profileOtherBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	profileOtherWindow.setLeftNavButton(profileOtherBackButton);
	profileOtherBackButton.addEventListener("click", function() {
	    navController.close(profileOtherWindow);
	});
	
	profileOtherWindow.add(profileOtherView);
	
	openWindows.push(profileOtherWindow);
	navController.open(profileOtherWindow);
}


function setNotificationToRead(notifId){
	
	Ti.API.info('setNotificationToRead() already read, notification: '+ notifId);
	
	var list = JSON.stringify(list);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e) {
		Ti.API.info('setNotificationToRead() got back from server : '+ this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'setNotificationRead');
	xhr.send({
		user_id:userObject.userId,
		notification:notifId
	});
}