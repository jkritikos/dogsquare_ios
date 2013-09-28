//inbox view
var viewInbox = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

//Change right nav button
var newMessageRightNavButton = Ti.UI.createButton({ 
	backgroundImage:IMAGE_PATH+'common/edit_icon.png',
	width:24,
	height:23
});
newMessageRightNavButton.addEventListener('click', handleNewMessage);
navController.getWindow().rightNavButton = newMessageRightNavButton;

//inbox table view
var inboxTableView = Titanium.UI.createTableView({
	minRowHeight:71,
	width:293,
	backgroundColor:UI_BACKGROUND_COLOR,
	top:13,
	bottom:0
});
viewInbox.add(inboxTableView);
inboxTableView.addEventListener('click', handleInboxTableViewRows);

getUnreadInboxMessages();

//inbox table view footer
inboxTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

//populate table view
function populateInboxTableView(mObj) {
	var tableRows = [];
	
	for(i=0;i<mObj.length;i++){
		//message row
		var messageRow = Ti.UI.createTableViewRow({
			className:'messageRow',
			height:79,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			user_id:mObj[i].user_id
		});
		
		var rowMessageProfileImage = Titanium.UI.createImageView({
			image:API+'photo?user_id='+mObj[i].user_id,
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:2,
			borderRadius:30,
			borderWidth:2,
			borderColor:'f5a92c'
		});
		
		//message label
		var rowMessageLabel = Titanium.UI.createLabel({ 
			text:mObj[i].message,
			color:'gray',
			bottom:18,
			height:18,
			width:'auto',
			textAlign:'left',
			left:75,
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		//name label
		var rowNameLabel = Titanium.UI.createLabel({ 
			text:mObj[i].name,
			color:'black',
			top:18,
			height:18,
			width:'auto',
			textAlign:'left',
			left:75,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//date label
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:relativeTime(mObj[i].date),
			color:'black',
			top:10,
			height:18,
			width:'auto',
			textAlign:'center',
			right:9,
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		messageRow.add(rowMessageProfileImage);
		messageRow.add(rowMessageLabel);
		messageRow.add(rowNameLabel);
		messageRow.add(rowDateLabel);
		
		tableRows.push(messageRow);
	}
	
	inboxTableView.setData(tableRows);
}

function handleNewMessage(){
	Ti.include('ui/iphone/inbox_new.js');
	
	openWindows.push(inboxNewWindow);
	navController.open(inboxNewWindow);
}

function getUnreadInboxMessages(){
	Ti.API.info('getUnreadInboxMessages() called for user='+ userObject.userId);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e) {
		Ti.API.info('getUnreadInboxMessages() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			var messagesList = [];
			
			for(i=0;i<jsonData.data.messages.length;i++){
				messagesList.push(jsonData.data.messages[i].UserInbox.id);
				
				jsonData.data.messages[i].UserInbox.read = 0;
				
				if(jsonData.data.messages[i].UserInbox.user_from_id == userObject.userId){
					jsonData.data.messages[i].UserInbox.my_message = 1;
				}else{
					jsonData.data.messages[i].UserInbox.my_message = 0;
				}
				
				saveInboxMessage(jsonData.data.messages[i].UserInbox);
				
			}
			
			if(messagesList != 0){
				setMessagesIntoRead(messagesList);
			}
			
			var messages = getInboxMessages();
			
			populateInboxTableView(messages);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('GET',API+'getMessages');
	xhr.send({
		user_id:userObject.userId
	});
}

function setMessagesIntoRead(list){
	Ti.API.info('setMessagesIntoRead() read: '+ list);
	
	var list = JSON.stringify(list);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e) {
		Ti.API.info('setMessagesIntoRead() got back from server : '+ this.responseText);
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
	xhr.open('POST',API+'setMessagesRead');
	xhr.send({
		user_id:userObject.userId,
		list:list
	});
}

function handleInboxTableViewRows(e){
	var userId = e.row.user_id;
	var name = e.row.children[2].text;
	
	var messages = getInboxMessagesByUserId(userId);
	
	Ti.include('ui/iphone/inbox_view.js');
	
	//inbox view window
	var inboxViewWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:name
	});
	
	//back button
	var inboxViewBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	inboxViewWindow.setLeftNavButton(inboxViewBackButton);
	
	inboxViewBackButton.addEventListener("click", function() {
	    navController.close(inboxViewWindow);
	});
	
	var viewInboxView = buildViewInboxView(messages);
	populateInboxViewTableView(messages, userId);
	
	inboxViewWindow.add(viewInboxView);
	
	openWindows.push(inboxViewWindow);
	navController.open(inboxViewWindow);
}
