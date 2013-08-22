//inbox view window
var inboxViewWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR,
	title:'Chat'
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

//scroll background
var inboxViewScrollBackground = Ti.UI.createScrollView({
	top:13,
	width:302,
	height:347,
	backgroundColor:UI_BACKGROUND_COLOR,
	showVerticalScrollIndicator: true
});
inboxViewWindow.add(inboxViewScrollBackground);

//sender profile image
var senderInboxViewImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
var senderInboxViewProfileImage = Titanium.UI.createImageView({
	image:senderInboxViewImageFile.nativePath,
	left:2,
	top:11,
	width:54,
	height:54,
	borderRadius:27,
	borderWidth:3,
	borderColor:'f9bf30'
});
inboxViewScrollBackground.add(senderInboxViewProfileImage);

//data
var messagesTopOffset = 0;
var inboxTimeArray1 = ['10.00 p.m', '10.02 p.m'];
var inboxMessagesArray1 = ['Morning!! I have to go vet for Lory’s vaccine', 
						  'Will you join me?'];
						  
var inboxTimeArray2 = ['10.06 p.m', '10.08 p.m'];


for(i=0;i<=1;i++){
	//sender message shadow box background 
	var senderInboxViewMessageShadowBox = Titanium.UI.createView({
		backgroundColor:'d2d1d1',
		top:14 + messagesTopOffset,
		left:72,
		width: 167,
		height:54,
		borderWidth:1,
		borderColor:UI_BACKGROUND_COLOR,
		borderRadius:5
	});
	inboxViewScrollBackground.add(senderInboxViewMessageShadowBox);
	
	//sender message box background 
	var senderInboxViewMessageBox = Titanium.UI.createView({
		backgroundColor:'white',
		top:12 + messagesTopOffset,
		left:70,
		width: 167,
		height:54,
		borderWidth:1,
		borderColor:UI_BACKGROUND_COLOR,
		borderRadius:5
	});
	inboxViewScrollBackground.add(senderInboxViewMessageBox);
	
	//sender message label
	var senderInboxViewMessageLabel = Titanium.UI.createLabel({ 
		text:inboxMessagesArray1[i],
		color:'black',
		height:36,
		width:146,
		textAlign:'left',
		opacity:0.7,
		font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	senderInboxViewMessageBox.add(senderInboxViewMessageLabel);
	
	//sender time label
	var senderInboxViewTimeLabel = Titanium.UI.createLabel({ 
		text:inboxTimeArray1[i],
		color:'black',
		height:18,
		width:48,
		top:27 + messagesTopOffset,
		right:5,
		opacity:0.6,
		textAlign:'center',
		font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	inboxViewScrollBackground.add(senderInboxViewTimeLabel);
	
	messagesTopOffset += 60;
}

//user profile image
var userInboxViewImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
var userInboxViewProfileImage = Titanium.UI.createImageView({
	image:userInboxViewImageFile.nativePath,
	right:2,
	top:171,
	width:54,
	height:54,
	borderRadius:27,
	borderWidth:3,
	borderColor:'f9bf30'
});
inboxViewScrollBackground.add(userInboxViewProfileImage);

//user message shadow box background 1
var userInboxViewMessageShadowBox1 = Titanium.UI.createView({
	backgroundColor:'d2d1d1',
	top:174,
	right:68,
	width: 124,
	height:54,
	borderWidth:1,
	borderColor:UI_BACKGROUND_COLOR,
	borderRadius:5
});
inboxViewScrollBackground.add(userInboxViewMessageShadowBox1);

//user message box background 1
var userInboxViewMessageBox1 = Titanium.UI.createView({
	backgroundColor:UI_COLOR,
	top:172,
	right:70,
	width: 124,
	height:54,
	borderWidth:1,
	borderColor:UI_BACKGROUND_COLOR,
	borderRadius:5
});
inboxViewScrollBackground.add(userInboxViewMessageBox1);

//user message shadow box background 2
var userInboxViewMessageShadowBox2 = Titanium.UI.createView({
	backgroundColor:'d2d1d1',
	top:234,
	right:68,
	width: 167,
	height:54,
	borderWidth:1,
	borderColor:UI_BACKGROUND_COLOR,
	borderRadius:5
});
inboxViewScrollBackground.add(userInboxViewMessageShadowBox2);

//user message box background 2
var userInboxViewMessageBox2 = Titanium.UI.createView({
	backgroundColor:UI_COLOR,
	top:232,
	right:70,
	width: 167,
	height:54,
	borderWidth:1,
	borderColor:UI_BACKGROUND_COLOR,
	borderRadius:5
});
inboxViewScrollBackground.add(userInboxViewMessageBox2);

//user message label 1
var userInboxViewMessageLabel1 = Titanium.UI.createLabel({ 
	text:'Yeah! sure!!',
	color:'black',
	height:36,
	width:102,
	textAlign:'right',
	opacity:0.7,
	font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
});
userInboxViewMessageBox1.add(userInboxViewMessageLabel1);

//user message label 2
var userInboxViewMessageLabel2 = Titanium.UI.createLabel({ 
	text:'I’ll come by your place!',
	color:'black',
	height:36,
	width:146,
	textAlign:'right',
	opacity:0.7,
	font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
});
userInboxViewMessageBox2.add(userInboxViewMessageLabel2);

messagesTopOffset = 0;
for(i=0;i<=1;i++){
	//user time label
	var userInboxViewTimeLabel = Titanium.UI.createLabel({ 
		text:inboxTimeArray2[i],
		color:'black',
		height:18,
		width:48,
		top:187 + messagesTopOffset,
		left:5,
		opacity:0.6,
		textAlign:'center',
		font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	inboxViewScrollBackground.add(userInboxViewTimeLabel);
	
	messagesTopOffset += 60;

}

//sepparator for the textfield from the messages view
var userInboxViewSepparator = Titanium.UI.createView({
	backgroundColor:UI_COLOR,
	height:1,
	left:10,
	right:16,
	bottom:47
});
inboxViewWindow.add(userInboxViewSepparator);

//chat text field
var inboxViewChatField = Ti.UI.createTextField({
	width:252,
	height:24,
	bottom:15,
	left:10,
	backgroundColor:'white',
	borderWidth:1,
	borderRadius:3,
	borderColor:'c5c5c5'
});
inboxViewWindow.add(inboxViewChatField);

inboxViewChatField.addEventListener('change', handleChatTextFieldChange);
inboxViewChatField.addEventListener('focus', handleChatTextFieldFocus);
inboxViewChatField.addEventListener('blur', handleChatTextFieldBlur);

//chat text field label
var inboxViewChatFieldLabel = Ti.UI.createLabel({
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
inboxViewWindow.add(inboxViewSendButton);

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
	inboxViewWindow.animate({bottom:0, duration:200});
	inboxViewScrollBackground.animate({height:347, duration:200});
}

//handle focus on chat text field
function handleChatTextFieldFocus(){
	inboxViewWindow.animate({bottom:215, duration:300});
	inboxViewScrollBackground.animate({height:140, duration:200});
}
