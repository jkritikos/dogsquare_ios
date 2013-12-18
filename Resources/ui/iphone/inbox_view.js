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
			minRowHeight:60,
			width:302,
			backgroundColor:UI_BACKGROUND_COLOR,
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			height:IPHONE5 ? 451 : 354
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
			height:30,
			bottom:9,
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
			font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		inboxViewChatField.add(inboxViewChatFieldLabel);
		
		//send button
		var inboxViewSendButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'inbox_view/send_icon.png',
			right:16,
			bottom:10,
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
		Ti.API.info('Inbox_view processing object '+JSON.stringify(mObj));
		
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
			top:16,
			borderWidth:2,
			borderColor:'f5a92c',
			userToggle:false,
			otherUserToggle:false,
			user_id:userId
		});
		rowMessageProfileImage.addEventListener('click', handleInboxViewThumbImage);
		
		var maxLabelWidth = 184;
		var maxBoxWidth = 214;
		
		//sender message box background 
		var senderInboxViewMessageBox = Titanium.UI.createView({
			backgroundColor:'white',
			top:15,
			bottom:15,
			left:81,
			width:Titanium.UI.SIZE,//214
			height:Titanium.UI.SIZE,
			borderWidth:1,
			borderColor:UI_BACKGROUND_COLOR,
			borderRadius:5
		});
		
		//sender message label
		var senderInboxViewMessageLabel = Titanium.UI.createLabel({ 
			text:mObj[i].message,
			top:5,
			bottom:5,
			left:10,
			right:10,
			color:'black',
			height:'auto',
			width:'auto',//184
			textAlign:'left',
			opacity:0.7,
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		senderInboxViewMessageBox.add(senderInboxViewMessageLabel);
		
		//alert(senderInboxViewMessageLabel.toImage.width);
		
		var senderInboxViewTimeLabel = Titanium.UI.createLabel({ 
			text:relativeTime(mObj[i].date),
			color:'black',
			height:18,
			bottom:0,
			width:70,
			left:85,
			zIndex:3,
			opacity:0.6,
			textAlign:'left',
			font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		if(mObj[i].my_message == 0) {
			if(!otherThumbCreated) {
				rowMessageProfileImage.defaultImage = IMAGE_PATH+'follow_invite/default_User_photo.png';
				rowMessageProfileImage.image = API+'photo?user_id=' + userId+'&now='+new Date().getTime();
				rowMessageProfileImage.left = 10;
				
				otherThumbCreated = true;
				userThumbCreated = false;
			}
			
		}else if(mObj[i].my_message == 1) {
			rowMessageProfileImage.user_id = userObject.userId;
			senderInboxViewMessageBox.right = 81;
			senderInboxViewMessageBox.left = null;
			senderInboxViewTimeLabel.right = 85;
			senderInboxViewTimeLabel.left = null;
			senderInboxViewTimeLabel.textAlign = 'right';
			senderInboxViewMessageBox.backgroundColor = UI_COLOR;
			
			if(!userThumbCreated) {
				rowMessageProfileImage.defaultImage = IMAGE_PATH+'follow_invite/default_User_photo.png';
				rowMessageProfileImage.image = API+'photo?user_id=' + userObject.userId+'&now='+new Date().getTime();
				rowMessageProfileImage.right = 10;
				
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
	inboxViewTableView.scrollToIndex(inboxViewTableView.data[0].rows.length - 1);
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
	inboxViewTableView.animate({height:IPHONE5 ? 451 : 354, duration:200});
}

//handle focus on chat text field
function handleChatTextFieldFocus(){
	viewInboxView.animate({bottom:215, duration:300});
	inboxViewTableView.animate({height:IPHONE5 ? 236 : 140, duration:200});
	
	//used setTimeout because sometimes, it wouldn't respond
	var t = setTimeout(function(){
		inboxViewTableView.scrollToIndex(inboxViewTableView.data[0].rows.length - 1);
	},200);
	
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
		right:10,
		top:16,
		borderRadius:30,
		borderWidth:2,
		borderColor:'f5a92c',
		userToggle:false,
		otherUserToggle:false
	});
	
	//sender message box background 
	var senderInboxViewMessageBox = Titanium.UI.createView({
		backgroundColor:UI_COLOR,
		top:15,
		bottom:15,
		right:81,
		width:Titanium.UI.SIZE,
		height:Titanium.UI.SIZE,
		borderWidth:1,
		borderColor:UI_BACKGROUND_COLOR,
		borderRadius:5
	});
	
	//sender message label
	var senderInboxViewMessageLabel = Titanium.UI.createLabel({ 
		text:message,
		top:5,
		bottom:5,
		left:10,
		right:10,
		color:'black',
		height:'auto',
		width:'auto',
		textAlign:'left',
		opacity:0.7,
		font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	senderInboxViewMessageBox.add(senderInboxViewMessageLabel);
	
	var senderInboxViewTimeLabel = Titanium.UI.createLabel({ 
		text:relativeTime(date),
		color:'black',
		height:18,
		bottom:0,
		width:70,
		right:85,
		zIndex:3,
		opacity:0.6,
		textAlign:'right',
		font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	if(!userThumbCreated) {
		rowMessageProfileImage.defaultImage = IMAGE_PATH+'follow_invite/default_User_photo.png';
		rowMessageProfileImage.image = API+'photo?user_id=' + userObject.userId+'&now='+new Date().getTime();
		
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
		translucent:false,
		//barImage:IMAGE_PATH+'common/bar.png',
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
