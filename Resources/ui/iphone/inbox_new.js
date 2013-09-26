//inbox new window
var inboxNewWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR,
	title:'New Message'
});

//back button
var inboxNewBackButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'common/back_button.png',
    width:48,
    height:33
});

inboxNewWindow.setLeftNavButton(inboxNewBackButton);

var toUserId = null;
var inboxNewOtherThumbCreated = false;
var inboxNewUserThumbCreated = false;

//inbox new send to background
var inboxNewSendToBackgroundView = Ti.UI.createView({
    backgroundColor: 'white',
    top:0,
    width:'100%',
    height:38
});

var inboxNewSendToChosenBackgroundView = Ti.UI.createView({
    backgroundColor:'1c2027',
    left:40,
    width:Titanium.UI.SIZE,
    height:25,
    borderColor:'white',
    borderRadius:10,
    borderWidth:1
});

var inboxNewSendToChosenLabel = Ti.UI.createLabel({
    right:10,
	left:10,
	color:'white',
	height:25,
	width:'auto',
	textAlign:'left',
	font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
});
inboxNewSendToChosenBackgroundView.add(inboxNewSendToChosenLabel);

var inboxNewSendToEraseIcon = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/erase_icon.png',
	right:5,
	width:16,
	height:18
});
inboxNewSendToBackgroundView.add(inboxNewSendToEraseIcon);
inboxNewSendToEraseIcon.addEventListener('click', handleSendToEraseButton);
inboxNewSendToEraseIcon.hide();

inboxNewSendToBackgroundView.add(inboxNewSendToChosenBackgroundView);
inboxNewSendToChosenBackgroundView.hide();

inboxNewSendToBackgroundView.add(inboxNewSendToChosenBackgroundView);

var inboxNewSendToLabel = Titanium.UI.createLabel({ 
	text:'To:',
	left:10,
	color:'666666',
	height:25,
	width:23,
	textAlign:'left',
	font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
});

inboxNewSendToBackgroundView.add(inboxNewSendToLabel);

var inboxNewSendToTextField = Ti.UI.createTextField({
	width:238,
	height:38, 
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});
inboxNewSendToTextField.addEventListener('change', handleSendToTextFieldChange);
inboxNewSendToTextField.addEventListener('focus', handleSendToTextFieldFocus);
inboxNewSendToTextField.addEventListener('blur', handleSendToTextFieldBlur);

inboxNewSendToBackgroundView.add(inboxNewSendToTextField);
inboxNewWindow.add(inboxNewSendToBackgroundView);

inboxNewBackButton.addEventListener("click", function() {
    navController.close(inboxNewWindow);
    inboxNewSendToTextField.blur();
    inboxNewChatField.blur();
});

//inbox new sepparator
var inboxNewSendToSepparator = Ti.UI.createView({
    backgroundColor: 'black',
    top:38,
    width:'100%',
    opacity:0.5,
    height:1
});
inboxNewWindow.add(inboxNewSendToSepparator);

var inboxNewContactsTableView = Titanium.UI.createTableView({
	minRowHeight:60,
	width:320,
	backgroundColor:'transparent',
	top:39,
	bottom:0
});
inboxNewContactsTableView.addEventListener('click', handleNewContactsTableRows);
inboxNewWindow.add(inboxNewContactsTableView);
getMutualFollowers();

//remove empty rows
inboxNewContactsTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

var inboxNewChatTableView = Titanium.UI.createTableView({
	minRowHeight:60,
	height:329,
	width:320,
	backgroundColor:'transparent',
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	top:39
});
inboxNewWindow.add(inboxNewChatTableView);
inboxNewChatTableView.hide();

//remove empty rows
inboxNewChatTableView.footerView = Ti.UI.createView({
    height: 10,
    backgroundColor: 'transparent'
});

//sepparator for the textfield from the messages view
var inboxNewSepparator = Titanium.UI.createView({
	backgroundColor:UI_COLOR,
	height:1,
	left:10,
	right:16,
	bottom:47
});
inboxNewWindow.add(inboxNewSepparator);

//chat text field
inboxNewChatField = Ti.UI.createTextField({
	width:252,
	height:24,
	bottom:15,
	left:10,
	backgroundColor:'white',
	borderWidth:1,
	borderRadius:3,
	borderColor:'c5c5c5'
});
inboxNewWindow.add(inboxNewChatField);

inboxNewChatField.addEventListener('change', handleInboxNewChatTextFieldChange);
inboxNewChatField.addEventListener('focus', handleInboxNewChatTextFieldFocus);
inboxNewChatField.addEventListener('blur', handleInboxNewChatTextFieldBlur);

//chat text field label
inboxNewChatFieldLabel = Ti.UI.createLabel({
	text:'Send a message',
	color:'999999',
	textAlign:'left',
	left:10,
	opacity:0.7,
	width:100,
	height:30,
	font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
});
inboxNewChatField.add(inboxNewChatFieldLabel);

//send button
var inboxNewSendButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'inbox_view/send_icon.png',
	right:16,
	bottom:14,
	width:30,
	height:28,
});
inboxNewSendButton.addEventListener('click', handleInboxNewSendButton);
inboxNewWindow.add(inboxNewSendButton);

function populateInboxNewContactsTableView(mObject){
	
	var tableRows = [];
	
	for(i=0;i<mObject.length;i++){
		
		var row = Ti.UI.createTableViewRow({
			height:73,
			className:'contactsResult',
			backgroundColor:'white',
			selectedBackgroundColor:'blue',
			user_id:mObject[i].user_id
		});
		
		var rowMutualFriendImage = Titanium.UI.createImageView({
			image:REMOTE_USER_IMAGES + mObject[i].thumb,
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		
		var rowNameLabel = Titanium.UI.createLabel({
			text:mObject[i].name,
			color:'#605353',
			left:72,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		row.add(rowMutualFriendImage);
		row.add(rowNameLabel);
		tableRows.push(row);
	}
	
	inboxNewContactsTableView.setData(tableRows);
}

function getMutualFollowers(){
	Ti.API.info('getMutualFollowers() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		Ti.API.info('getMutualFollowers() got back from server '+this.responseText);
		
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			saveMutualFollowers(jsonData.data.mutual_followers);
			
			var fArray = [];
			var fObj = {};
			
			for(i=0;i<jsonData.data.mutual_followers.length;i++){
				fObj.name = jsonData.data.mutual_followers[i].User.name;
				fObj.user_id = jsonData.data.mutual_followers[i].User.id;
				fObj.thumb = jsonData.data.mutual_followers[i].User.thumb;
				
				fArray.push(fObj);
				fObj = {};
			}
			
			populateInboxNewContactsTableView(fArray);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	
	xhr.open('GET',API+'getMutualFollowers');
	xhr.send({
		user_id:userObject.userId,
		target_id:userObject.userId
	});
}

function handleNewContactsTableRows(e){
	inboxNewSendToEraseIcon.show();
	inboxNewChatField.focus();
	inboxNewWindow.animate({bottom:215, duration:300});
	inboxNewContactsTableView.animate({height:114, duration:200});
	inboxNewSendToTextField.hide();
	inboxNewSendToTextField.value = '';
	
	inboxNewContactsTableView.hide();
	inboxNewChatTableView.show();
	
	inboxNewSendToChosenBackgroundView.show();
	
	toUserId = e.row.user_id;
	
	var messages = getInboxMessagesByUserId(toUserId);
	
	if(messages.length != 0){
		populateInboxNewChatTableView(messages, toUserId);
	}
	
	inboxNewSendToChosenLabel.text = e.row.children[1].text;
}

function updateInboxNewView(userId, name){
	inboxNewChatField.focus();
	
	inboxNewContactsTableView.hide();
	inboxNewChatTableView.show();
	
	inboxNewSendToChosenBackgroundView.show();
	
	toUserId = userId;
	
	var messages = getInboxMessagesByUserId(toUserId);
	
	if(messages.length != 0){
		populateInboxNewChatTableView(messages, toUserId);
	}
	inboxNewSendToEraseIcon.show();
	inboxNewSendToChosenLabel.text = name;
}

function handleSendToTextFieldChange(e){
	if(e.value != ''){
		inboxNewContactsTableView.show();
		inboxNewChatTableView.hide();
		var mutualObj = null;
		mutualObj = searchMutualFollowers(e.value);
		populateInboxNewContactsTableView(mutualObj);
	}else{
		inboxNewContactsTableView.data = [];
		inboxNewChatTableView.data = [];
	}
	
}

function handleSendToTextFieldBlur(e){
	inboxNewChatTableView.height = 377;
	inboxNewContactsTableView.height = 377;
}

function handleSendToTextFieldFocus(e){
	inboxNewChatTableView.height = 117;
	inboxNewContactsTableView.height = 117;
	
	if(inboxNewChatTableView.data.length != 0){
		inboxNewChatTableView.scrollToIndex(inboxNewChatTableView.data[0].rows.length - 1);
	}
}

function handleInboxNewSendButton(){
	var toId = toUserId;
	var toName = inboxNewSendToTextField.value;
	var message = inboxNewChatField.value;
	var view = VIEW_INBOX_NEW;
	
	if(message != '') {
		sendMessageToUser(toId, toName, message, view);
	}
	
	inboxNewChatField.blur();
	inboxNewChatField.value = '';
}

function populateInboxNewChatTableView(mObj, userId){
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
		//rowMessageProfileImage.addEventListener('click', handleInboxViewThumbImage);
		
		//sender message box background 
		var senderInboxViewMessageBox = Titanium.UI.createView({
			backgroundColor:'white',
			top:12,
			left:90,
			width:140,
			height:54,
			borderWidth:1,
			borderColor:UI_BACKGROUND_COLOR,
			borderRadius:5
		});
		
		//sender message label
		var senderInboxViewMessageLabel = Titanium.UI.createLabel({ 
			text:mObj[i].message,
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
			if(!inboxNewOtherThumbCreated) {
				rowMessageProfileImage.image = API+'photo?user_id=' + userId;
				rowMessageProfileImage.left = 4;
				
				inboxNewOtherThumbCreated = true;
				inboxNewUserThumbCreated = false;
			}
			
		}else if(mObj[i].my_message == 1) {
			rowMessageProfileImage.user_id = userObject.userId;
			senderInboxViewMessageBox.right = 90;
			senderInboxViewMessageBox.left = null;
			senderInboxViewTimeLabel.left = 0;
			senderInboxViewMessageBox.backgroundColor = UI_COLOR;
			
			if(!inboxNewUserThumbCreated) {
				rowMessageProfileImage.image = API+'photo?user_id=' + userObject.userId;
				rowMessageProfileImage.right = 4;
				
				inboxNewOtherThumbCreated = false;
				inboxNewUserThumbCreated = true;
			}
		}
		messageRow.add(rowMessageProfileImage);
		messageRow.add(senderInboxViewTimeLabel);
		messageRow.add(senderInboxViewMessageBox);
		tableRows.push(messageRow);
	}
	
	inboxNewChatTableView.setData(tableRows);
	inboxNewChatTableView.scrollToIndex(inboxNewChatTableView.data[0].rows.length - 1);
}

function appendRowInboxNewTableView(date, message){
	//appended message row
	var messageRow = Ti.UI.createTableViewRow({
		className:'messageRow',
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
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
	
	if(!inboxNewUserThumbCreated) {
		rowMessageProfileImage.image = API+'photo?user_id=' + userObject.userId;
		
		inboxNewOtherThumbCreated = false;
		inboxNewUserThumbCreated = true;
	}
	
	messageRow.add(rowMessageProfileImage);
	messageRow.add(senderInboxViewTimeLabel);
	messageRow.add(senderInboxViewMessageBox);
	
	inboxNewChatTableView.appendRow(messageRow);
	inboxNewChatTableView.scrollToIndex(inboxNewChatTableView.data[0].rows.length - 1);
}

function handleSendToEraseButton(){
	inboxNewSendToEraseIcon.hide();
	inboxNewSendToTextField.show();
	inboxNewSendToTextField.focus();
	
	inboxNewContactsTableView.show();
	inboxNewChatTableView.hide();
	
	inboxNewSendToChosenBackgroundView.hide();
}

//handle change on chat text field
function handleInboxNewChatTextFieldChange(){
	if(inboxNewChatField.value != ''){
		inboxNewChatFieldLabel.hide();
	}else {
		inboxNewChatFieldLabel.show();
	}
}

//handle blur on chat text field
function handleInboxNewChatTextFieldBlur(){
	if(inboxNewChatField.value == ''){
		inboxNewChatFieldLabel.show();
	}else {
		inboxNewChatFieldLabel.hide();
	}
	inboxNewWindow.animate({bottom:0, duration:200});
	inboxNewContactsTableView.animate({height:329, duration:200});
	inboxNewChatTableView.animate({height:329, duration:200});
}

//handle focus on chat text field
function handleInboxNewChatTextFieldFocus(){
	inboxNewWindow.animate({bottom:215, duration:300});
	inboxNewContactsTableView.animate({height:115, duration:200});
	inboxNewChatTableView.animate({height:115, duration:200});
}