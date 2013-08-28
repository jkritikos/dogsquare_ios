var viewProfile = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

var profileImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");

var profileImageView = Titanium.UI.createImageView({
	image:profileImageFile.nativePath,
	top:0,
	width:'100%'
});

//opacity bar
var profileOpacityBar = Titanium.UI.createView({ 
	backgroundColor:'white',
	width:'100%',
	bottom:12,
	height:36,
	opacity:0.8
});

//followers label on the opacity bar
var profileOpacityBarLabel1 = Ti.UI.createLabel({
	text:'followers',
	color:'black',
	textAlign:'left',
	width:55,
	height:15,
	bottom:3,
	left:55,
	font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOpacityBar.add(profileOpacityBarLabel1);

//number of followers label on the opacity bar
var profileOpacityBarNumberLabel1 = Ti.UI.createLabel({
	text:userObject.followers,
	color:'black',
	textAlign:'center',
	width:50,
	height:22,
	top:1,
	left:53,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOpacityBar.add(profileOpacityBarNumberLabel1);

//following label on the opacity bar
var profileOpacityBarLabel2 = Ti.UI.createLabel({
	text:'following',
	color:'black',
	textAlign:'left',
	width:55,
	height:15,
	bottom:3,
	right:47,
	font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOpacityBar.add(profileOpacityBarLabel2);

//number of following label on the opacity bar
var profileOpacityBarNumberLabel2 = Ti.UI.createLabel({
	text:userObject.following,
	color:'black',
	textAlign:'center',
	width:50,
	height:22,
	top:1,
	right:55,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileOpacityBar.add(profileOpacityBarNumberLabel2);

//opacity bar sepparator
var profileOpacityBarSepparator = Titanium.UI.createView({ 
	backgroundColor:'959796',
	width:1,
	height:34
});
profileOpacityBar.add(profileOpacityBarSepparator);
profileImageView.add(profileOpacityBar);

var profileImageViewBlob = profileImageView.toBlob();
var profileImageBlobCropped = profileImageViewBlob.imageAsCropped({y:0,x:0,height:1650});
profileImageView.image = profileImageBlobCropped;

viewProfile.add(profileImageView);

//Map button
var profileMapButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/Map_icon.png',
	width:33,
	height:32,
	top:222,
	right:48
});

viewProfile.add(profileMapButton);

var profileMapLabel = Ti.UI.createLabel({
	text:'View map',
	top:252,
	right:32,
	color:UI_COLOR_RUN,
	font:{fontSize:13, fontWeight:'semibold',fontFamily:'Open Sans'}
});
viewProfile.add(profileMapLabel);

//Start button
var profileStartButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/start_button.png',
	top:218,
	width:178,
	height:52,
	left:18
});
viewProfile.add(profileStartButton);

//Activity bar
var profileActivityBar = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
	top:280,
	width:320,
	height:33,
	toggle:false
});

var profileActivityLabel = Titanium.UI.createLabel({ 
	text:'Activity',
	color:'white',
	top:13,
	height:20,
	textAlign:'center',
	left:29,
	font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileActivityBar.add(profileActivityLabel);

viewProfile.add(profileActivityBar);
profileActivityBar.addEventListener('click', handleActivityButton);

//background of the table view
var profileTableViewBackground = Titanium.UI.createView({ 
	backgroundColor:'d2d2d2',
	width:'100%',
	height:324,
	top:313
});
viewProfile.add(profileTableViewBackground);

//profile tableView
var profileTableView = Titanium.UI.createTableView({
	minRowHeight:51,
	width:320,
	data:populateProfileTableView(),
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	backgroundColor:'d2d2d2',
	top:0,
	bottom:0
});
profileTableViewBackground.add(profileTableView);

var runWindow = null;

profileStartButton.addEventListener('click', function(){
	runWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Run'
	});
	
	//back button
	var runBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	runWindow.setLeftNavButton(runBackButton);
	runBackButton.addEventListener("click", handleRunBackButton);
	
	runWindow.add(buildRunView());
	
	openWindows.push(runWindow);
	navController.open(runWindow);
});

profileMapButton.addEventListener('click', function(){
	var profileMapWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Map'
	});
	
	//map back button
	var profileMapBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	profileMapWindow.setLeftNavButton(profileMapBackButton);
	
	profileMapBackButton.addEventListener("click", function() {
	    navController.close(profileMapWindow);
	});
	
	Ti.include('ui/iphone/map.js');
	profileMapWindow.add(viewMap);
	navController.open(profileMapWindow);
});

function handleRunBackButton() {
	if(runningMode){
		alert('STOP RUNNING FIRST');
	} else {
		navController.close(runWindow);
	}
}

function handleActivityButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		profileActivityBar.animate({top:280, duration:500});
		profileTableViewBackground.animate({top:313, duration:500});
		e.source.toggle = false;
	}else{
		profileActivityBar.animate({top:187, duration:500});
		profileTableViewBackground.animate({top:220, duration:500});
		e.source.toggle = true;
	}
}

function populateProfileTableView(){
	var userActivities = getActivities();
	var tableRows = [];
	
	if(userActivities.length > 0){
		
		for(var i=0; i < userActivities.length; i++){
			
			var dogNames = '';
			var dogPhoto = '';
			var dogInfo = userActivities[i].dogs;
			for(var z=0; z < dogInfo.length; z++){
				dogNames += dogInfo[z].name + ', ';
				dogPhoto = dogInfo[z].photo;
			}
			
			dogNames = dogNames.substr(0, dogNames.length-2);
			
			var activityRow = Ti.UI.createTableViewRow({
				className:'activityRow',
				height:51,
				width:'100%',
				backgroundColor:'e7e7e7',
				selectedBackgroundColor:'transparent'
			});
			
			var rowActivityImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + dogPhoto);
			var rowActivityImageBlob = rowActivityImageFile.toBlob();
			var rowActivityImageBlobCropped = rowActivityImageBlob.imageAsThumbnail(42,0,21);
			var rowActivityImage = Titanium.UI.createImageView({
				image:rowActivityImageBlobCropped,
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
			
			//activity label
			var activityLabel = Ti.UI.createLabel({
				text:'Gone for a walk with '+dogNames,
				top:10,
				textAlign:'left',
				width:'auto',
				height:'auto',
				left:88,
				opacity:0.6,
				color:'black',
				font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			//time label
			var timeLabel = Ti.UI.createLabel({
				text:relativeTime(userActivities[i].start_time),
				bottom:12,
				textAlign:'left',
				width:'auto',
				height:'auto',
				left:88,
				opacity:0.4,
				color:'black',
				font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
		
			activityRow.add(rowActivityImage);
			activityRow.add(rowSepparator);
			activityRow.add(activityLabel);
			activityRow.add(timeLabel);
			
			tableRows.push(activityRow);
		}
		
	} else {
		var activityRow = Ti.UI.createTableViewRow({
			className:'activityRow',
			height:51,
			width:'100%',
			backgroundColor:'e7e7e7',
			selectedBackgroundColor:'transparent'
		});
		
		//activity label
		var activityLabel = Ti.UI.createLabel({
			text:'No activity yet',
			top:10,
			textAlign:'left',
			width:'auto',
			height:'auto',
			left:88,
			opacity:0.6,
			color:'black',
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		activityRow.add(activityLabel);
		
		tableRows.push(activityRow);
	}

	return tableRows;
}