var checkinWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barColor:UI_COLOR,
	title:'Check in',
	backButtonTitle:'Back'
});

//the map
var checkinMap = Titanium.Map.createView({ 
	width:'100%',
	top:0,
	height:120,
    mapType:Titanium.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:true,
    visible:true
});
checkinWindow.add(checkinMap);

//photo image
var checkinPhotoImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'checkin/photo.png',
	width:'100%',
	height:120,
	top:120
});
checkinWindow.add(checkinPhotoImage);

//view to add photo
var checkinPhotoView = Ti.UI.createView({
	height:120,
	width:54,
	right:0,
	backgroundColor:'black',
	opacity:0.5
});
checkinPhotoImage.add(checkinPhotoView);

//place title label
var checkinTitleLabel = Ti.UI.createLabel({
	text:'Mega Pet City',
	top:240,
	textAlign:'left',
	width:100,
	height:21,
	left:16,
	color:'black',
	opacity:0.6,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
});
checkinWindow.add(checkinTitleLabel);

//place description label
var checkinDescriptionLabel = Ti.UI.createLabel({
	text:'Pet supplies',
	top:257,
	textAlign:'left',
	width:100,
	height:16,
	left:17,
	color:'black',
	opacity:0.8,
	font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
});
checkinWindow.add(checkinDescriptionLabel);

//background bar for checkin button
var checkinButtonBarView = Ti.UI.createView({
	bottom:84,
	height:55,
	width:'100%',
	backgroundColor:'white'
});
checkinWindow.add(checkinButtonBarView);

//checkin button
var checkinButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'checkin/check_in_btn.png',
	width:179,
	height:51,
	left:14
});
checkinButtonBarView.add(checkinButton);

//heart image
var checkinHeartImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'checkin/best_icon_default.png',
	right:46
});
checkinButtonBarView.add(checkinHeartImage);

//background for comments
var checkinCommentsBackgroundView = Ti.UI.createView({
	bottom:-236,
	height:320,
	width:'100%',
	backgroundColor:UI_BACKGROUND_COLOR,
	zIndex:2
});
checkinWindow.add(checkinCommentsBackgroundView);

//button to show all comments
var checkinCommentsButton = Ti.UI.createButton({ 
	backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
	top:0,
	width:320,
	height:33,
	toggle:false,
	button:'bar'
});
checkinCommentsBackgroundView.add(checkinCommentsButton);
//event listener for button
checkinCommentsButton.addEventListener('click', handleCommentButtons);

//plus buttton to create a new comment
var checkinPlusButton = Ti.UI.createButton({ 
	backgroundColor:'red',
	top:13,
	right:26,
	width:20,
	height:20,
	button:'plus'
});
checkinCommentsButton.add(checkinPlusButton);
//event listener for plus button
checkinPlusButton.addEventListener('click', handleCommentButtons);

//comments title label
var checkinCommentsTitleLabel = Titanium.UI.createLabel({ 
	text:'Comments',
	color:'white',
	top:13,
	height:20,
	textAlign:'center',
	left:18,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
});
checkinCommentsButton.add(checkinCommentsTitleLabel);

//create a comment textField
var checkinCommentsTextField = Ti.UI.createTextField({
	width:266,
	height:36,
	top:44,
	borderWidth:2,
	borderRadius:2
});
checkinCommentsBackgroundView.add(checkinCommentsTextField);
checkinCommentsTextField.hide();

//comments tableView
var checkinCommentsTableView = Titanium.UI.createTableView({
	minRowHeight:47,
	width:320,
	data:populateCommentsTableView(),
	backgroundColor:'e7e7e7',
	top:36,
	bottom:0,
	allowsSelection:false
});
checkinCommentsBackgroundView.add(checkinCommentsTableView);

//populate comment rows
function populateCommentsTableView(){
	
	var tableRows = [];
	
	for(i=0;i<=5;i++){
		
		//comment row
		var commentRow = Ti.UI.createTableViewRow({
			className:'commentRow',
			height:'auto',
			width:'100%',
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
		
		//comment label
		var commentLabel = Ti.UI.createLabel({
			text:'Great shop. It has anything you need for your pet',
			top:8,
			textAlign:'left',
			width:292,
			bottom:24,
			height:'auto',
			left:14,
			opacity:0.6,
			color:'black',
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		//comment time
		var timeLabel = Ti.UI.createLabel({
			text:'3 hours ago',
			bottom:10,
			textAlign:'left',
			width:100,
			height:15,
			left:16,
			opacity:0.4,
			color:'black',
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		commentRow.add(commentLabel);
		commentRow.add(timeLabel);
		
		tableRows.push(commentRow);
	}
	
	return tableRows;
}

//handle comments button and plus button
function handleCommentButtons(e){
	var toggle = e.source.toggle;
	var button = e.source.button;
	
	if(toggle && button != 'plus'){
		checkinCommentsBackgroundView.animate({bottom:-236, duration:500});
		checkinCommentsTextField.blur();
		checkinCommentsTextField.hide();
		checkinCommentsTableView.show();
		e.source.toggle = false;
	}else if(!toggle && button != 'plus'){
		checkinCommentsBackgroundView.animate({bottom:0, duration:500});
		checkinCommentsTextField.blur();
		checkinCommentsTextField.hide();
		checkinCommentsTableView.show();
		e.source.toggle = true;
	}else if(button == 'plus'){
		checkinCommentsBackgroundView.animate({bottom:0, duration:300});
		checkinCommentsButton.toggle = true;
		
		checkinCommentsTextField.focus();
		checkinCommentsTableView.hide();
		checkinCommentsTextField.show();
	}
	
}
