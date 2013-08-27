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
	textAlign:'center',
	width:50,
	height:22,
	top:1,
	left:53,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherOpacityBar.add(profileOtherOpacityBarNumberLabel1);

//following label on the opacity bar
var profileOtherOpacityBarLabel2 = Ti.UI.createLabel({
	text:'following',
	color:'black',
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
	textAlign:'center',
	width:50,
	height:22,
	top:1,
	right:55,
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
    top:310
});
profileOtherWindow.add(profileOtherChatButton);

//chat button label
var profileOtherChatButtonLabel = Ti.UI.createLabel({
	text:'Chat with me',
	color:'black',
	opacity:0.6,
	textAlign:'center',
	top:354,
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
    top:310,
    left:42
});
profileOtherWindow.add(profileOtherWalkWithButton);

//walk with me button label
var profileOtherWalkWithButtonLabel = Ti.UI.createLabel({
	text:'Walk with me',
	color:'black',
	opacity:0.6,
	textAlign:'left',
	top:354,
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
    top:310,
    right:42
});
profileOtherWindow.add(profileOtherGalleryButton);

//gallery button label
var profileOtherGalleryButtonLabel = Ti.UI.createLabel({
	text:'Gallery',
	color:'black',
	opacity:0.6,
	textAlign:'center',
	top:354,
	width:88,
	height:18,
	right:21,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherWindow.add(profileOtherGalleryButtonLabel);

//dogs bar
var profileOtherDogBar = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
	bottom:0,
	width:320,
	height:33,
	toggle:false
});

var profileOtherDogBarLabel = Titanium.UI.createLabel({ 
	text:'Dogs',
	color:'white',
	top:13,
	height:20,
	textAlign:'center',
	left:15,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOtherDogBar.add(profileOtherDogBarLabel);
profileOtherWindow.add(profileOtherDogBar);
profileOtherDogBar.addEventListener('click', handleDogBarButton);

//background of the table view
var profileOtherTableViewBackground = Titanium.UI.createView({ 
	backgroundColor:'d2d2d2',
	width:'100%',
	height:324,
	top:416
});
profileOtherWindow.add(profileOtherTableViewBackground);

//profile other tableView
var profileOtherTableView = Titanium.UI.createTableView({
	minRowHeight:51,
	width:320,
	data:populateProfileOtherTableView(),
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	backgroundColor:'d2d2d2',
	top:3,
	bottom:0
});
profileOtherTableViewBackground.add(profileOtherTableView);

function handleDogBarButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		profileOtherDogBar.animate({bottom:0, duration:500});
		profileOtherTableViewBackground.animate({top:416, duration:500});
		e.source.toggle = false;
	}else{
		profileOtherDogBar.animate({bottom:192, duration:500});
		profileOtherTableViewBackground.animate({top:224, duration:500});
		e.source.toggle = true;
	}
}

function populateProfileOtherTableView(){
	var tableRows = [];
	
	var dogsArray = ['Lucy', 'Boney', 'Minsey'];
	
	for(i=0;i<=1;i++){
		var dogRow = Ti.UI.createTableViewRow({
			className:'dogRow',
			height:51,
			width:'100%',
			backgroundColor:'e7e7e7',
			selectedBackgroundColor:'transparent'
		});
		
		var rowDogImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var rowDogImageBlob = rowDogImageFile.toBlob();
		var rowDogImageBlobCropped = rowDogImageBlob.imageAsThumbnail(42,0,21);
		var rowDogImage = Titanium.UI.createImageView({
			image:rowDogImageBlobCropped,
			left:28,
			top:3,
			borderRadius:21,
			borderWidth:1,
			borderColor:'f5a92c'
		});	
		
		//sepparator
		var rowSepparator = Titanium.UI.createView({ 
			backgroundColor:'d2d2d2',
			width:'100%',
			bottom:0,
			height:3
		});
		
		//dog name label
		var dogNameLabel = Ti.UI.createLabel({
			text:dogsArray[i],
			top:10,
			textAlign:'left',
			width:'auto',
			height:'auto',
			left:88,
			opacity:0.6,
			color:'black',
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		dogRow.add(rowDogImage);
		dogRow.add(rowSepparator);
		dogRow.add(dogNameLabel);
		
		tableRows.push(dogRow);
	}
	return tableRows;
}