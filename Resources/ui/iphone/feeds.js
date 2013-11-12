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
		feedsTableView.addEventListener('click', handleFeedsTableViewRows);
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
	var currentUser = getUserObject();
	
	Ti.API.info('doGetFeeds() called for user '+currentUser.userId+' with token '+currentUser.token);
	
	//progress view
	var progressView = new ProgressView({window:viewFeeds});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doGetFeeds() '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('doGetFeeds() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		//Hide progress view
		progressView.hide();
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
		
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Update UI
			populateFeedsTableView(jsonData.data.feed);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		}
	};
	
	xhr.open('GET',API+'getFeed');
	xhr.send({
		user_id:currentUser.userId,
		token:currentUser.token
	});
}

//populate table view
function populateFeedsTableView(data) {
	
	var tableRows = [];
	
	for(i=0; i< data.length; i++){
		//build text
		var feedText = getFeedMessage(data[i]);
		
		var id = null;
		var type = null;
		var name = null;
		var placeId = null;
		var type = data[i].Feed.type_id;
	
		if(data[i].Feed.activity_id != null){
			
			var id = data[i].Feed.activity_id;
		}else if(data[i].Feed.target_user_id != null){
			
			var id = data[i].Feed.target_user_id;
			var name = data[i].Feed.target_user_name;
		}else if(data[i].Feed.target_dog_id != null){
			
			var id = data[i].Feed.target_dog_id;
			var name = data[i].Feed.target_dog_name;
		}
		
		//feed row
		var feedRow = Ti.UI.createTableViewRow({
			className:'notificationRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			feedType:type,
			id:id,
			name:name,
			placeId:data[i].Feed.target_place_id,
			placeName:data[i].Feed.target_place_name
		});
		
		//profile image
		var rowFeedProfileImage = Titanium.UI.createImageView({
			image:getUserPhoto(data[i].Feed.user_from_thumb),
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:2,
			borderRadius:30,
			borderWidth:2,
			borderColor:'f5a92c'
		});
		
		//Wrapper view with vertical layout for the text in each row
		var feedWrapperView = Ti.UI.createView({
			layout:'vertical'
		});
		
		//notification label
		var rowFeedLabel = Titanium.UI.createLabel({ 
			text:feedText,
			color:'#605353',
			textAlign:'left',
			width:'auto',
			height:'auto',
			left:70,
			top:10,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//date label
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:relativeTime(data[i].Feed.created),
			color:'#938787',
			textAlign:'left',
			width:'auto',
			height:'auto',
			left:70,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		feedWrapperView.add(rowFeedLabel);
		feedWrapperView.add(rowDateLabel);
		
		feedRow.add(rowFeedProfileImage);
		feedRow.add(feedWrapperView);
		
		tableRows.push(feedRow);
	}
	
	feedsTableView.setData(tableRows);
}

function handleFeedsTableViewRows(e){
	var feedType = e.row.feedType;
	var id = e.row.id;
	var name = e.row.name;
	
	var feedsRowWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR
	});
	
	//back button & event listener
	var feedsRowBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	feedsRowWindow.setLeftNavButton(feedsRowBackButton);
	feedsRowBackButton.addEventListener("click", function() {
	    navController.close(feedsRowWindow);
	    navController.getWindow().setTitle('Feed');
	    doGetFeeds();
	});
	
	if(feedType == FEED_NEW_WALK || feedType == FEED_FRIEND_COMMENT_ACTIVITY || feedType == FEED_FRIEND_LIKE_ACTIVITY){
		
		Ti.include('ui/iphone/view_activity.js');
	
		var viewActivityView = buildViewActivityView(id);
		
		feedsRowWindow.add(viewActivityView);
		feedsRowWindow.setTitle('Activity');
		
		openWindows.push(feedsRowWindow);
		navController.open(feedsRowWindow);
	} else if(feedType == FEED_NEW_DOG || feedType == FEED_FRIEND_LIKE_DOG){
		
		Ti.include('ui/iphone/dog_profile.js');
		
		var dogProfileView = buildDogProfileView(id);
		
		feedsRowWindow.add(dogProfileView);
		feedsRowWindow.setTitle(name);
		
		openWindows.push(feedsRowWindow);
		navController.open(feedsRowWindow);
	} else if(feedType == FEED_FRIEND_NEW_FOLLOWER){
		
		Ti.include('ui/iphone/profile_other.js');
		
		var profileOtherView = buildProfileOtherView(id);
		
		feedsRowWindow.add(profileOtherView);
		feedsRowWindow.setTitle(name);
		
		openWindows.push(feedsRowWindow);
		navController.open(feedsRowWindow);
	} else if(feedType == FEED_CHECKIN){
		var placeId = e.row.placeId;
		var placeTitle = e.row.placeName;
		Ti.API.info('show place id '+placeId);
		
		Ti.include('ui/iphone/place_view.js');
		
		var checkinPlaceWindow = Ti.UI.createWindow({
			backgroundColor:UI_BACKGROUND_COLOR,
			translucent:false,
			//barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR
		});
		
		feedsRowWindow.setTitle(placeTitle);
		var checkinPlaceView = buildCheckinPlaceView(placeId, false);
		feedsRowWindow.add(checkinPlaceView);
		
		openWindows.push(feedsRowWindow);
		navController.open(feedsRowWindow);
	}
}
