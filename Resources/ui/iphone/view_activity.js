
var viewActivityCommentsBackgroundView = null;
var viewActivityCommentsTextArea = null;
var viewActivityCommentsTableView  = null;
var viewActivityCommentsButton = null;

function buildViewActivityView(aId){
	var data = getActivity(aId); 
	
	//activity View
	var viewActivityView = Ti.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	//start point annotation
	var viewActivityAnnotationStart = Titanium.Map.createAnnotation({
		latitude:data.path[0].lat,
		longitude:data.path[0].lon,
		title:"Start",
		animate:true,
		image:IMAGE_PATH+'run_finish/pin.png'
	});
	
	//end point annotation
	var viewActivityAnnotationEnd = Titanium.Map.createAnnotation({
		latitude:data.path[0].lat,
		longitude:data.path[0].lon,
		title:"End",
		animate:true,
		image:IMAGE_PATH+'run_finish/pin.png'
	});
	
	//the map
	var viewActivityMap = Titanium.Map.createView({ 
		width:'100%',
		top:0,
		height:214,
	    mapType:Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    regionFit:true,
	    userLocation:false,
	    visible:true,
	    annotations:[viewActivityAnnotationStart,viewActivityAnnotationEnd]
	});
	viewActivityView.add(viewActivityMap);
	
	//opacity bar
	var viewActivityOpacityBar = Titanium.UI.createView({ 
		backgroundColor:'white',
		width:'100%',
		top:150,
		height:52,
		opacity:0.8
	});
	viewActivityMap.add(viewActivityOpacityBar);
	
	
	var dividerLeftOffset = 0;
	
	for(i=0;i<=2;i++){
		var viewActivityDividerBar = Titanium.UI.createView({ 
			backgroundColor:'black',
			width:1,
			opacity:0.4,
			height:31,
			left:79 + dividerLeftOffset
		});
		viewActivityOpacityBar.add(viewActivityDividerBar);
		
		dividerLeftOffset += 80;
	}
	
	
	//number of the distance label
	var viewActivityDistanceNumberLabel = Titanium.UI.createLabel({
		text:'23',
		height:21,
		textAlign:'center',
		left:16,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityDistanceNumberLabel);
	
	//unit of the distance label
	var viewActivityDistanceUnitLabel = Titanium.UI.createLabel({ 
		text:'km',
		height:17,
		textAlign:'center',
		left:44,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityDistanceUnitLabel);
	
	//distance label
	var viewActivityDistanceLabel = Titanium.UI.createLabel({ 
		text:'distance',
		height:19,
		textAlign:'center',
		left:16,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityDistanceLabel);
	
	//number of the average pace label
	var viewActivityAvgPaceNumberLabel = Titanium.UI.createLabel({
		text:'21',
		height:21,
		textAlign:'right',
		left:92,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityAvgPaceNumberLabel);
	
	//unit of the average pace label
	var viewActivityAvgPaceUnitLabel = Titanium.UI.createLabel({ 
		text:'km/h',
		height:17,
		textAlign:'center',
		left:115,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityAvgPaceUnitLabel);
	
	//average pace label
	var viewActivityAvgPaceLabel = Titanium.UI.createLabel({ 
		text:'avg pace',
		height:19,
		textAlign:'center',
		left:92,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityAvgPaceLabel);
	
	//number of the weather label
	var viewActivityWeatherNumberLabel = Titanium.UI.createLabel({
		text:'23',
		height:21,
		textAlign:'center',
		left:185,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityWeatherNumberLabel);
	
	//unit of the weather label
	var viewActivityWeatherUnitLabel = Titanium.UI.createLabel({ 
		text:'°C',
		height:17,
		textAlign:'center',
		left:206,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityWeatherUnitLabel);
	
	//weather label
	var viewActivityWeatherLabel = Titanium.UI.createLabel({ 
		text:'weather',
		height:19,
		textAlign:'center',
		left:177,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityWeatherLabel);
	
	//number of the Likes label
	var viewActivityLikesNumberLabel = Titanium.UI.createLabel({
		text:'32',
		height:21,
		textAlign:'center',
		left:269,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityLikesNumberLabel);
	
	var viewActivityLikesLabel = Titanium.UI.createLabel({ 
		text:'Likes',
		height:19,
		textAlign:'center',
		left:266,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityOpacityBar.add(viewActivityLikesLabel);
	
	//Table view title bar	
	var viewActivityTitleBar = Titanium.UI.createView({ 
		backgroundColor:UI_COLOR,
		width:'100%',
		top:214,
		height:25
	});
	viewActivityView.add(viewActivityTitleBar);
	
	//Table view title label	
	var runFinishTitleLabel = Titanium.UI.createLabel({ 
		text:'Breed Energy Bar',
		color:'white',
		height:25,
		textAlign:'center',
		left:18,
		font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityTitleBar.add(runFinishTitleLabel);
	
	//dogs table view
	var viewActivityTableView = Titanium.UI.createTableView({
		minRowHeight:60,
		width:320,
		data:populateViewActivityTableView(data),
		backgroundColor:'transparent',
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		top:240,
		bottom:39,
		allowsSelection:false,
		height:393
	});
	
	viewActivityView.add(viewActivityTableView);
	
	//map region object
	var viewActivityRegion = {
		latitude: data.path[0].lat,
		longitude: data.path[0].lon,
		animate:true,
		latitudeDelta:0.001,
		longitudeDelta:0.001
	};
	
	viewActivityMap.setLocation(viewActivityRegion);
	
	//push into object more data
	data.path[0] = ({animate:1, 
					 latitude:data.path[0].lat,
					 latitudeDelta:0.001,
					 longitude:data.path[0].lon,
					 longitudeDelta:0.001
					}); 
	
	//route object
	var route = {
	    name:"Your path",
	    points:data.path,
	    color:"f9bf30",
	    borderColor:'black',
	    width:8
	};
	
	// add the route
	viewActivityMap.addRoute(route);
	
	//background for comments
	viewActivityCommentsBackgroundView = Ti.UI.createView({
		top:332,
		height:320,
		width:'100%',
		backgroundColor:UI_BACKGROUND_COLOR,
		zIndex:2
	});
	
	//button to show all comments
	viewActivityCommentsButton = Ti.UI.createButton({ 
		backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
		top:0,
		width:320,
		height:33,
		toggle:false,
		button:'bar'
	});
	viewActivityCommentsBackgroundView.add(viewActivityCommentsButton);
	//event listener for button
	viewActivityCommentsButton.addEventListener('click', handleViewActivityCommentButtons);
	
	//plus buttton to create a new comment
	var viewActivityPlusButton = Ti.UI.createButton({ 
		backgroundImage:IMAGE_PATH+'checkin_place/add_icon.png',
		bottom:4,
		right:26,
		width:12,
		height:12,
		button:'plus'
	});
	viewActivityCommentsButton.add(viewActivityPlusButton);
	//event listener for plus button
	viewActivityPlusButton.addEventListener('click', handleViewActivityCommentButtons);
	
	//comments title label
	var viewActivityCommentsTitleLabel = Titanium.UI.createLabel({ 
		text:'Comments',
		color:'white',
		top:13,
		height:20,
		textAlign:'center',
		left:18,
		font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	viewActivityCommentsButton.add(viewActivityCommentsTitleLabel);
	
	//create a comment textField
	viewActivityCommentsTextArea = Ti.UI.createTextArea({
		backgroundColor:'white',
		width:276,
		height:137,
		top:55,
		font:{fontSize:15}
	});
	viewActivityCommentsBackgroundView.add(viewActivityCommentsTextArea);
	viewActivityCommentsTextArea.hide();
	
	//comments tableView
	viewActivityCommentsTableView = Titanium.UI.createTableView({
		minRowHeight:47,
		width:320,
		data:populateViewActivityCommentsTableView(),
		backgroundColor:'e7e7e7',
		top:36,
		bottom:0,
		allowsSelection:false
	});
	viewActivityCommentsBackgroundView.add(viewActivityCommentsTableView);
	viewActivityView.add(viewActivityCommentsBackgroundView);
	
	return viewActivityView;
	
	Ti.API.info('buildActivityView() created');
}

function populateViewActivityTableView(d){
	//Get activity details
	
	var tableRows = [];
	//row
	var row = Ti.UI.createTableViewRow({ 
		className:'runFinishRow',
		height:65,
		backgroundColor:UI_BACKGROUND_COLOR,
		selectedBackgroundColor:'transparent'
	});
	//dog image 
	var dogImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
	var dogImageBlob = dogImageFile.toBlob();
	var dogImageBlobCropped = dogImageBlob.imageAsThumbnail(50,0,25);
	
	var rowDogImage = Titanium.UI.createImageView({ 
		image:dogImageBlobCropped,
		left:14,
		borderRadius:25,
		borderWidth:2,
		borderColor:'#f9bf30'
	});
	row.add(rowDogImage);
	
	//dog name label
	var rowDogNameLabel = Titanium.UI.createLabel({ 
		text:d.dogs[0].name,
		color:'black',
		height:65,
		textAlign:'center',
		left:91,
		opacity:0.7,
		font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	row.add(rowDogNameLabel);
	
	//bone image
	var rowBoneImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'run_finish/bone_icon.png',
		right:105
	});
	
	row.add(rowBoneImage);
	
	//bone fill image
	var boneFillImage = Titanium.Filesystem.getFile(IMAGE_PATH+'run_finish/bone_icon_fill.png');
	var boneFillImageBlob = boneFillImage.toBlob();
	var boneFillImageBlobCropped = boneFillImageBlob.imageAsCropped({y:0,x:0,width:10});
	var rowBoneFillImage = Ti.UI.createImageView({ 
		image:boneFillImageBlobCropped,
		right:105,
		zIndex:2
	}); 
	
	row.add(rowBoneFillImage);
	
	//mood label
	var rowMoodLabel = Titanium.UI.createLabel({ 
		text:'Happy',
		color:'black',
		height:15,
		textAlign:'center',
		right:120,
		bottom:10,
		opacity:0.3,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	row.add(rowMoodLabel);
	
	//mood percent label
	var rowMoodPercentLabel = Titanium.UI.createLabel({ 
		text:'14%',
		color:'999900',
		height:15,
		textAlign:'center',
		right:97,
		bottom:10,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	row.add(rowMoodPercentLabel);
	
	//sepparator for rows
	var rowSepparator = Titanium.UI.createView({ 
		backgroundColor:'black',
		opacity:0.1,
		bottom:0,
		height:1,
		width:299
	});
	row.add(rowSepparator);
	
	tableRows.push(row);
	
	return tableRows;
}

//populate comment rows
function populateViewActivityCommentsTableView(){
	
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
function handleViewActivityCommentButtons(e){
	var toggle = e.source.toggle;
	var button = e.source.button;
	
	if(toggle && button != 'plus'){
		viewActivityCommentsBackgroundView.animate({top:332, duration:500});
		viewActivityCommentsTextArea.blur();
		viewActivityCommentsTextArea.hide();
		viewActivityCommentsTableView.show();
		e.source.toggle = false;
	}else if(!toggle && button != 'plus'){
		viewActivityCommentsBackgroundView.animate({top:-13, duration:500});
		viewActivityCommentsTextArea.blur();
		viewActivityCommentsTextArea.hide();
		viewActivityCommentsTableView.show();
		e.source.toggle = true;
	}else if(button == 'plus'){
		viewActivityCommentsBackgroundView.animate({top:-13, duration:300});
		viewActivityCommentsButton.toggle = true;
		
		viewActivityCommentsTextArea.focus();
		viewActivityCommentsTableView.hide();
		viewActivityCommentsTextArea.show();
	}
	
}