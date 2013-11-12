//UI components
var viewBadgeList = null;
var viewBadgeScroll = null;

function buildBadgeListView(user_id){
	CURRENT_VIEW = VIEW_BADGES;
	
	if(viewBadgeList == null){
		
		viewBadgeList = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		viewBadgeScroll = Ti.UI.createScrollView({
			backgroundColor:'white'
		});
		viewBadgeList.add(viewBadgeScroll);
	}
	getBadgesOnline(user_id);
}


function populateBadgeList(badges){
	
	var leftOffset = 9;
	var leftLabelOffset = 9;
	var topOffset = 9;
	var rowBadges = 0;
	
	for(i=0;i<badges.length;i++){
		
		var badgeObj = getBadgeDetails(badges[i].id);
		
		var badgeImage = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'badges/' + (badges[i].flag ? 'new/color/' : 'new/grey/') + 'badge_' + badges[i].id + '.png',
			width:90,
			height:90,
			left:leftOffset,
			top:topOffset,
			winTitle:badgeObj.title,
			id:badges[i].id,
			badgeFlag:badges[i].flag
		});
		viewBadgeScroll.add(badgeImage);
		badgeImage.addEventListener('click',handleBadgeButton);
		
		var badgeTitleLabel = Titanium.UI.createLabel({
			text:badgeObj.title,
			color:'black',
			textAlign:'center',
			width:90,
			left:leftLabelOffset,
			top:topOffset + 94,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		viewBadgeScroll.add(badgeTitleLabel);
		
		rowBadges++;
		leftOffset += 103;
		leftLabelOffset += 103;
		
		if(rowBadges == 3){
			topOffset += 124; 
			rowBadges = 0;
			leftOffset = 9;
			leftLabelOffset = 9;
		}
		
		if(i == badges.length - 1){
			
			badgeImage.bottom = 28;
		}
	}
}

function getBadgesOnline(userId){
	Ti.API.info('getBadgesOnline() called for user:' + userObject.userId); 	
	
	//progress view
	var progressView = new ProgressView({window:viewBadgeList});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('getBadgesOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			populateBadgeList(jsonData.data.badges);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide progress view
			progressView.hide();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('GET',API+'getBadges');
	xhr.send({
		user_id:userObject.userId,
		target_id:userId,
		token:userObject.token
	});
}

//Opens the badge details view
function handleBadgeButton(e){
	
	var title = e.source.winTitle;
	var id = e.source.id;
	var badgeFlag = e.source.badgeFlag;
	
	Ti.include('ui/iphone/badge_detail.js');
	
	//inbox view window
	var badgeDetailWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:title
	});
	
	//back button
	var badgeDetailBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	badgeDetailWindow.setLeftNavButton(badgeDetailBackButton);
	
	badgeDetailBackButton.addEventListener("click", function() {
	    navController.close(badgeDetailWindow);
	});
	
	//Build the badge detail view, without the award animation
	buildBadgeDetailView(id, false, badgeFlag);
	
	badgeDetailWindow.add(viewBadgeDetail);
	
	openWindows.push(badgeDetailWindow);
	navController.open(badgeDetailWindow);
}