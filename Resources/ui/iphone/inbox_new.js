var inboxNewView = null;
var inboxNewSendToChosenBackgroundView = null;
var inboxNewSendToChosenLabel = null;
var inboxNewSendToEraseIcon = null;
var inboxNewSendToTextField = null;
var inboxNewContactsTableView = null;
var inboxNewChatTableView = null;
var inboxNewChatField = null;
var inboxNewChatFieldLabel = null;

var toUserId = null;
var inboxNewOtherThumbCreated = false;
var inboxNewUserThumbCreated = false;

function buildViewInboxNew(){
	if(inboxNewView == null){
		inboxNewView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//inbox new send to background
		var inboxNewSendToBackgroundView = Ti.UI.createView({
		    backgroundColor: 'white',
		    top:0,
		    width:'100%',
		    height:38
		});
		
		inboxNewSendToChosenBackgroundView = Ti.UI.createView({
		    backgroundColor:'1c2027',
		    left:40,
		    width:Titanium.UI.SIZE,
		    height:25,
		    borderColor:'white',
		    borderRadius:10,
		    borderWidth:1
		});
		
		inboxNewSendToChosenLabel = Ti.UI.createLabel({
		    right:10,
			left:10,
			color:'white',
			height:25,
			width:'auto',
			textAlign:'left',
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		inboxNewSendToChosenBackgroundView.add(inboxNewSendToChosenLabel);
		
		inboxNewSendToEraseIcon = Titanium.UI.createButton({
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
		
		inboxNewSendToTextField = Ti.UI.createTextField({
			width:238,
			height:38, 
			font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		inboxNewSendToTextField.addEventListener('change', handleSendToTextFieldChange);
		inboxNewSendToTextField.addEventListener('focus', handleSendToTextFieldFocus);
		inboxNewSendToTextField.addEventListener('blur', handleSendToTextFieldBlur);
		
		inboxNewSendToBackgroundView.add(inboxNewSendToTextField);
		inboxNewView.add(inboxNewSendToBackgroundView);
		
		//inbox new sepparator
		var inboxNewSendToSepparator = Ti.UI.createView({
		    backgroundColor: 'black',
		    top:38,
		    width:'100%',
		    opacity:0.5,
		    height:1
		});
		inboxNewView.add(inboxNewSendToSepparator);
		
		inboxNewContactsTableView = Titanium.UI.createTableView({
			minRowHeight:60,
			width:320,
			backgroundColor:'transparent',
			top:39,
			bottom:48
		});
		inboxNewContactsTableView.addEventListener('click', handleNewContactsTableRows);
		inboxNewView.add(inboxNewContactsTableView);
		getMutualFollowers();
		
		//remove empty rows
		inboxNewContactsTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
		
		inboxNewChatTableView = Titanium.UI.createTableView({
			minRowHeight:60,
			height:IPHONE5 ? 417 : 329,
			width:320,
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:44	
		});
		inboxNewView.add(inboxNewChatTableView);
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
		inboxNewView.add(inboxNewSepparator);
		
		//chat text field
		inboxNewChatField = Ti.UI.createTextField({
			width:252,
			height:30,
			bottom:9,
			left:10,
			backgroundColor:'white',
			borderWidth:1,
			borderRadius:3,
			borderColor:'c5c5c5'
		});
		inboxNewView.add(inboxNewChatField);
		
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
			font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		inboxNewChatField.add(inboxNewChatFieldLabel);
		
		//send button
		var inboxNewSendButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'inbox_view/send_icon.png',
			right:16,
			bottom:10,
			width:30,
			height:28,
		});
		inboxNewSendButton.addEventListener('click', handleInboxNewSendButton);
		inboxNewView.add(inboxNewSendButton);
	}
}

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
			image:getUserPhoto(mObject[i].thumb),
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
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
		Ti.API.error('Error in getMutualFollowers() '+e);
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
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	
	xhr.open('GET',API+'getMutualFollowers');
	xhr.send({
		user_id:userObject.userId,
		target_id:userObject.userId,
		token:userObject.token
	});
}

function handleNewContactsTableRows(e){
	inboxNewSendToEraseIcon.show();
	inboxNewChatField.focus();
	inboxNewContactsTableView.animate({height:IPHONE5 ? 202 : 114, duration:200});
	inboxNewView.animate({bottom:215, duration:300});
	
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
	
	//used setTimeout because sometimes, it wouldn't respond
	var t = setTimeout(function(){
		inboxNewChatTableView.scrollToIndex(inboxNewChatTableView.data[0].rows.length - 1);
	},300);
}

function updateInboxNewView(userId, name){
	inboxNewChatField.focus();
	inboxNewSendToTextField.hide();
	
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
	inboxNewContactsTableView.height = IPHONE5 ? 417 : 377;
}

function handleSendToTextFieldFocus(e){
	inboxNewContactsTableView.height = IPHONE5 ? 249 : 161;
}

function handleInboxNewSendButton(){
	var toId = toUserId;
	//var toName = inboxNewSendToTextField.value;
	var toName = inboxNewSendToChosenLabel.text;
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
			top:16,
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
			top:15,
			bottom:15,
			left:81,
			width:Titanium.UI.SIZE,
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
			width:'auto',
			textAlign:'left',
			opacity:0.7,
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		senderInboxViewMessageBox.add(senderInboxViewMessageLabel);
		
		var senderInboxViewTimeLabel = Titanium.UI.createLabel({ 
			text:relativeTime(mObj[i].date),
			bottom:0,
			color:'black',
			height:18,
			width:70,
			left:85,
			zIndex:3,
			opacity:0.6,
			textAlign:'left',
			font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		if(mObj[i].my_message == 0) {
			if(!inboxNewOtherThumbCreated) {
				rowMessageProfileImage.image = API+'photo?user_id=' + userId;
				rowMessageProfileImage.left = 10;
				
				inboxNewOtherThumbCreated = true;
				inboxNewUserThumbCreated = false;
			}
			
		}else if(mObj[i].my_message == 1) {
			rowMessageProfileImage.user_id = userObject.userId;
			senderInboxViewMessageBox.right = 81;
			senderInboxViewMessageBox.left = null;
			senderInboxViewTimeLabel.right = 85;
			senderInboxViewTimeLabel.left = null;
			senderInboxViewTimeLabel.textAlign = 'right';
			senderInboxViewMessageBox.backgroundColor = UI_COLOR;
			
			if(!inboxNewUserThumbCreated) {
				rowMessageProfileImage.image = API+'photo?user_id=' + userObject.userId;
				rowMessageProfileImage.right = 10;
				
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
		bottom:0,
		color:'black',
		height:18,
		width:70,
		right:85,
		zIndex:3,
		opacity:0.6,
		textAlign:'right',
		font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	if(!inboxNewUserThumbCreated) {
		rowMessageProfileImage.defaultImage = IMAGE_PATH+'follow_invite/default_User_photo.png',
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
	inboxNewView.animate({bottom:0, duration:200});
	inboxNewContactsTableView.animate({height:IPHONE5 ? 417 : 329, duration:200});
	inboxNewChatTableView.animate({height:IPHONE5 ? 412 : 329, duration:200});
}

//handle focus on chat text field
function handleInboxNewChatTextFieldFocus(){
	inboxNewView.animate({bottom:215, duration:300});
	inboxNewContactsTableView.animate({height:IPHONE5 ? 202 : 115, duration:200});
	inboxNewChatTableView.animate({height:IPHONE5 ? 197 : 115, duration:200});
}