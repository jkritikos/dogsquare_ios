//UI components
var viewFeeds = null;
var feedsTableView = null;

function buildFeedsView(){
	if(viewFeeds == null){
		//feeds view
		viewFeeds = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//feeds table view
		feedsTableView = Titanium.UI.createTableView({
			minRowHeight:71,
			width:293,
			backgroundColor:UI_BACKGROUND_COLOR,
			top:13,
			bottom:0
		});
		viewFeeds.add(feedsTableView);
		
		//feeds table view footer
		feedsTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor:'transparent'
		});
	}
	
	//Get unread feeds from the server and populate the table
	doGetFeeds();
}

function doGetFeeds(){
	Ti.API.info('doGetFeeds() called');
	
	//progress view
	var progressView = new ProgressView({window:viewFeeds});
	progressView.show({
		text:"Loading..."
	});
	
	var currentUser = getUserObject();
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('doGetFeeds() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		var followers = jsonData.data.count_followers;
		var inbox = jsonData.data.count_inbox;
		var notifications = jsonData.data.count_notifications;
		
		updateLeftMenuCounts(followers, inbox, notifications);
		
		//Update UI
		populateFeedsTableView(jsonData.data.feed);
		
		//Hide progress view
		progressView.hide();
	};
	
	xhr.open('GET',API+'getFeed');
	xhr.send({
		user_id:currentUser.userId
	});
}

//populate table view
function populateFeedsTableView(data) {
	
	var tableRows = [];
	
	for(i=0; i< data.length; i++){
		//build text
		var notificationText = getFeedMessage(data[i]);
		
		//notification row
		var notificationRow = Ti.UI.createTableViewRow({
			className:'notificationRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			notification_type:data[i].type_id
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
	
	feedsTableView.setData(tableRows);
}