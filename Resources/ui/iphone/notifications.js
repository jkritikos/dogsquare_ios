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
		
		//notification row
		var notificationRow = Ti.UI.createTableViewRow({
			className:'notificationRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			notification_type:data[i].type_id,
			fromUserId:data[i].user_from,
			fromUserName:data[i].name
		});
		
		//profile image
		var rowNotificationProfileImage = Titanium.UI.createImageView({
			image:REMOTE_USER_IMAGES+data[i].thumb,
			left:2,
			width:54,
			height:54,
			borderRadius:27,
			borderWidth:3,
			borderColor:'f5a92c'
		});
		//notification label
		var rowNotificationLabel = Titanium.UI.createLabel({ 
			text:notificationText,
			color:'black',
			height:'auto',
			width:180,
			textAlign:'left',
			left:65,
			font:{fontSize:11, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		//date label
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:'Sept 7',
			color:'black',
			height:18,
			width:'auto',
			textAlign:'right',
			right:9,
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		notificationRow.add(rowNotificationProfileImage);
		notificationRow.add(rowNotificationLabel);
		notificationRow.add(rowDateLabel);
		
		tableRows.push(notificationRow);
	}
	
	notificationsTableView.setData(tableRows);
}

function handleNotificationsTableView(e){
	Ti.include('ui/iphone/profile_other.js');
		
	var userId = e.row.fromUserId;
	var profileOtherView = buildProfileOtherView(userId);
	var name = e.row.fromUserName;
	
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
