//profile other window
var profileOtherWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR
});

//photo image
var profileOtherPhotoImage = Titanium.UI.createImageView({ 
	image:IMAGE_PATH+'profile_other/jim.jpg',
	width:320,
	height:217,
	top:0
});
profileOtherWindow.add(profileOtherPhotoImage);

//opacity bar
var profileOtherOpacityBar = Titanium.UI.createView({ 
	backgroundColor:'white',
	width:'100%',
	top:170,
	height:36,
	opacity:0.8
});
profileOtherWindow.add(profileOtherOpacityBar);

//followers label on the opacity bar
var profileOtherOpacityBarLabel1 = Ti.UI.createLabel({
	text:'followers',
	color:'black',
	opacity:0.6,
	textAlign:'left',
	width:55,
	height:15,
	bottom:3,
	left:55,
	font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherOpacityBar.add(profileOtherOpacityBarLabel1);

//number of followers label on the opacity bar
var profileOtherOpacityBarNumberLabel1 = Ti.UI.createLabel({
	text:'56',
	color:'black',
	opacity:0.6,
	textAlign:'left',
	width:'auto',
	height:22,
	top:1,
	left:70,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherOpacityBar.add(profileOtherOpacityBarNumberLabel1);

//following label on the opacity bar
var profileOtherOpacityBarLabel2 = Ti.UI.createLabel({
	text:'following',
	color:'black',
	opacity:0.6,
	textAlign:'left',
	width:55,
	height:15,
	bottom:3,
	right:47,
	font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherOpacityBar.add(profileOtherOpacityBarLabel2);

//number of following label on the opacity bar
var profileOtherOpacityBarNumberLabel2 = Ti.UI.createLabel({
	text:'23',
	color:'black',
	opacity:0.6,
	textAlign:'left',
	width:'auto',
	height:22,
	top:1,
	right:71,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherOpacityBar.add(profileOtherOpacityBarNumberLabel2);

//opacity bar sepparator
var profileOtherOpacityBarSepparator = Titanium.UI.createView({ 
	backgroundColor:'959796',
	width:1,
	height:34
});
profileOtherOpacityBar.add(profileOtherOpacityBarSepparator);

var profileOtherFollowButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'profile_other/Follow_button.png',
    width:174,
    height:51,
    top:229
});
profileOtherWindow.add(profileOtherFollowButton);

//chat button
var profileOtherChatButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'profile_other/Chat_icon.png',
    width:45,
    height:43,
    top:324
});
profileOtherWindow.add(profileOtherChatButton);

//chat button label
var profileOtherChatButtonLabel = Ti.UI.createLabel({
	text:'Chat with me',
	color:'black',
	opacity:0.6,
	textAlign:'center',
	top:368,
	width:88,
	height:18,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherWindow.add(profileOtherChatButtonLabel);

//walk with me button
var profileOtherWalkWithButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'profile_other/Walk_with_icon.png',
    width:45,
    height:43,
    top:324,
    left:42
});
profileOtherWindow.add(profileOtherWalkWithButton);

//walk with me button label
var profileOtherWalkWithButtonLabel = Ti.UI.createLabel({
	text:'Walk with me',
	color:'black',
	opacity:0.6,
	textAlign:'left',
	top:368,
	width:88,
	height:18,
	left:21,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherWindow.add(profileOtherWalkWithButtonLabel);

//gallery button
var profileOtherGalleryButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'profile_other/Gallery_icon.png',
    width:45,
    height:43,
    top:324,
    right:42
});
profileOtherWindow.add(profileOtherGalleryButton);

//gallery button label
var profileOtherGalleryButtonLabel = Ti.UI.createLabel({
	text:'Gallery',
	color:'black',
	opacity:0.6,
	textAlign:'center',
	top:368,
	width:88,
	height:18,
	right:21,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherWindow.add(profileOtherGalleryButtonLabel);
