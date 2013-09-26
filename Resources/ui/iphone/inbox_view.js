var viewInboxView = null;
var inboxViewTableView = null;
var inboxViewChatField = null;
var inboxViewChatFieldLabel = null;

var otherThumbCreated = false;
var userThumbCreated = false;

var inboxViewToName = null;
var inboxViewToId = null;

function buildViewInboxView(messages){
	if(viewInboxView == null){
		
		//inbox view
		viewInboxView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		inboxViewTableView = Titanium.UI.createTableView({
			top:5,
			minRowHeight:71,
			width:302,
			backgroundColor:UI_BACKGROUND_COLOR,
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			height:354
		});
		viewInboxView.add(inboxViewTableView);
		
		//inbox table view footer
		inboxViewTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
		
		//sepparator for the textfield from the messages view
		var userInboxViewSepparator = Titanium.UI.createView({
			backgroundColor:UI_COLOR,
			height:1,
			left:10,
			right:16,
			bottom:47
		});
		viewInboxView.add(userInboxViewSepparator);
		
		//chat text field
		inboxViewChatField = Ti.UI.createTextField({
			width:252,
			height:24,
			bottom:15,
			left:10,
			backgroundColor:'white',
			borderWidth:1,
			borderRadius:3,
			borderColor:'c5c5c5'
		});
		viewInboxView.add(inboxViewChatField);
		
		inboxViewChatField.addEventListener('change', handleChatTextFieldChange);
		inboxViewChatField.addEventListener('focus', handleChatTextFieldFocus);
		inboxViewChatField.addEventListener('blur', handleChatTextFieldBlur);
		
		//chat text field label
		inboxViewChatFieldLabel = Ti.UI.createLabel({
			text:'Send a message',
			color:'999999',
			textAlign:'left',
			left:10,
			opacity:0.7,
			width:100,
			height:30,
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		inboxViewChatField.add(inboxViewChatFieldLabel);
		
		//send button
		var inboxViewSendButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'inbox_view/send_icon.png',
			right:16,
			bottom:14,
			width:30,
			height:28,
		});
		inboxViewSendButton.addEventListener('click', handleInboxViewSendButton);
		viewInboxView.add(inboxViewSendButton);
	}
	
	return viewInboxView;
}

function populateInboxViewTableView(mObj, userId){
	var tableRows = [];
	
	inboxViewToId = userId;
	inboxViewToName = mObj[0].name;
	
	for(i=0;i<mObj.length;i++){
		
		//message row
		var messageRow = Ti.UI.createTableViewRow({
			className:'messageRow',
			height:'auto',
			width:'100%',
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var rowMessageProfileImage = Titanium.UI.createImageView({
			borderRadius:30,
			borderWidth:2,
			borderColor:'f5a92c',
			userToggle:false,
			otherUserToggle:false,
			user_id:userId
		});
		rowMessageProfileImage.addEventListener('click', handleInboxViewThumbImage);
		
		//sender message box background 
		var senderInboxViewMessageBox = Titanium.UI.createView({
			backgroundColor:'white',
			top:12,
			left:90,
			width:140,
			height:Titanium.UI.SIZE,
			borderWidth:1,
			borderColor:UI_BACKGROUND_COLOR,
			borderRadius:5
		});
		
		//sender message label
		var senderInboxViewMessageLabel = Titanium.UI.createLabel({ 
			text:mObj[i].message,
			top:10,
			bottom:10,
			color:'black',
			height:'auto',
			width:119,
			textAlign:'left',
			opacity:0.7,
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		senderInboxViewMessageBox.add(senderInboxViewMessageLabel);
		
		var senderInboxViewTimeLabel = Titanium.UI.createLabel({ 
			text:relativeTime(mObj[i].date),
			color:'black',
			height:18,
			width:70,
			top:30,
			right:0,
			zIndex:3,
			opacity:0.6,
			textAlign:'center',
			font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		if(mObj[i].my_message == 0) {
			if(!otherThumbCreated) {
				rowMessageProfileImage.image = API+'photo?user_id=' + userId;
				rowMessageProfileImage.left = 4;
				
				otherThumbCreated = true;
				userThumbCreated = false;
			}
			
		}else if(mObj[i].my_message == 1) {
			rowMessageProfileImage.user_id = userObject.userId;
			senderInboxViewMessageBox.right = 90;
			senderInboxViewMessageBox.left = null;
			senderInboxViewTimeLabel.left = 0;
			senderInboxViewMessageBox.backgroundColor = UI_COLOR;
			
			if(!userThumbCreated) {
				rowMessageProfileImage.image = API+'photo?user_id=' + userObject.userId;
				rowMessageProfileImage.right = 4;
				
				otherThumbCreated = false;
				userThumbCreated = true;
			}
		}
		messageRow.add(rowMessageProfileImage);
		messageRow.add(senderInboxViewTimeLabel);
		messageRow.add(senderInboxViewMessageBox);
		tableRows.push(messageRow);
	}
	
	inboxViewTableView.setData(tableRows);
}

//handle change on chat text field
function handleChatTextFieldChange(){
	if(inboxViewChatField.value != ''){
		inboxViewChatFieldLabel.hide();
	}else {
		inboxViewChatFieldLabel.show();
	}
}

//handle blur on chat text field
function handleChatTextFieldBlur(){
	if(inboxViewChatField.value == ''){
		inboxViewChatFieldLabel.show();
	}else {
		inboxViewChatFieldLabel.hide();
	}
	viewInboxView.animate({bottom:0, duration:200});
	inboxViewTableView.animate({height:354, duration:200});
}

//handle focus on chat text field
function handleChatTextFieldFocus(){
	viewInboxView.animate({bottom:215, duration:300});
	inboxViewTableView.animate({height:140, duration:200});
}

function handleInboxViewSendButton(){
	var toId = inboxViewToId;
	var toName = inboxViewToName;
	var message = inboxViewChatField.value;
	var view = VIEW_INBOX_VIEW;
	inboxViewChatField.blur();
	inboxViewChatField.value = '';
	
	if(message != '') {
		sendMessageToUser(toId, toName, message, view);
	}
	
	if(inboxViewTableView.data.length != 0){
		inboxViewTableView.scrollToIndex(inboxViewTableView.data[0].rows.length - 1);
	}
	
}

function appendRowInboxViewTableView(date, message){
	//appended message row
	var messageRow = Ti.UI.createTableViewRow({
		className:'messageRow',
		height:'auto',
		width:'100%',
		backgroundColor:'transparent',
		selectedBackgroundColor:'transparent'
	});
	
	var rowMessageProfileImage = Titanium.UI.createImageView({
		right:4,
		borderRadius:30,
		borderWidth:2,
		borderColor:'f5a92c',
		userToggle:false,
		otherUserToggle:false
	});
	
	//sender message box background 
	var senderInboxViewMessageBox = Titanium.UI.createView({
		backgroundColor:UI_COLOR,
		top:12,
		right:90,
		width:140,
		height:54,
		borderWidth:1,
		borderColor:UI_BACKGROUND_COLOR,
		borderRadius:5
	});
	
	//sender message label
	var senderInboxViewMessageLabel = Titanium.UI.createLabel({ 
		text:message,
		color:'black',
		height:'auto',
		width:119,
		textAlign:'left',
		opacity:0.7,
		font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	senderInboxViewMessageBox.add(senderInboxViewMessageLabel);
	
	var senderInboxViewTimeLabel = Titanium.UI.createLabel({ 
		text:relativeTime(date),
		color:'black',
		height:18,
		width:70,
		top:30,
		left:0,
		zIndex:3,
		opacity:0.6,
		textAlign:'center',
		font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	if(!userThumbCreated) {
		rowMessageProfileImage.image = API+'photo?user_id=' + userObject.userId;
		
		otherThumbCreated = false;
		userThumbCreated = true;
	}
	
	messageRow.add(rowMessageProfileImage);
	messageRow.add(senderInboxViewTimeLabel);
	messageRow.add(senderInboxViewMessageBox);
	
	inboxViewTableView.appendRow(messageRow);
	inboxViewTableView.scrollToIndex(inboxViewTableView.data[0].rows.length - 1);
}

function handleInboxViewThumbImage(e){
	var userId = e.source.user_id;
	
	var profileWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
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
	});
	
	//show profile view if the user, is the device owner, else show profile other view
	if (userId == userObject.userId){
		Ti.include('ui/iphone/profile.js');
		profileWindow.add(viewProfile);
		profileWindow.setTitle(userObject.name);
		
		openWindows.push(profileWindow);
		navController.open(profileWindow);
	}else {
		Ti.include('ui/iphone/profile_other.js');
		
		var profileOtherView = buildProfileOtherView(userId);
		
		profileWindow.add(profileOtherView);
		profileWindow.setTitle(inboxViewToName);
		
		openWindows.push(profileWindow);
		navController.open(profileWindow);
	}
}
