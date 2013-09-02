

var runFinishCommentsBackgroundView = null;
var runfinishCommentsTextArea = null;
var runFinishCommentsTableView = null;
var runFinishCommentsButton = null;

function buildRunFinishView(obj){

	//run finish View
	var viewRunSummary = Ti.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	//start point annotation
	var runFinishAnnotationStart = Titanium.Map.createAnnotation({
		latitude:obj.coordinates[0].latitude,
		longitude:obj.coordinates[0].longitude,
		title:"Start",
		animate:true,
		image:IMAGE_PATH+'run_finish/pin.png'
	});
	
	//end point annotation
	var runFinishAnnotationEnd = Titanium.Map.createAnnotation({
		latitude:obj.coordinates[0].latitude,
		longitude:obj.coordinates[0].longitude,
		title:"End",
		animate:true,
		image:IMAGE_PATH+'run_finish/pin.png'
	});
	
	//the map
	var viewRunFinishMap = Titanium.Map.createView({ 
		width:'100%',
		top:0,
		height:214,
	    mapType:Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    regionFit:true,
	    userLocation:false,
	    visible:true,
	    annotations:[runFinishAnnotationStart,runFinishAnnotationEnd]
	});
	viewRunSummary.add(viewRunFinishMap);
	
	//opacity bar
	var runFinishOpacityBar = Titanium.UI.createView({ 
		backgroundColor:'white',
		width:'100%',
		top:150,
		height:52,
		opacity:0.8
	});
	viewRunFinishMap.add(runFinishOpacityBar);
	
	//left divider for opacity bar
	var runFinishDividerBar1 = Titanium.UI.createView({ 
		backgroundColor:'black',
		width:1,
		opacity:0.4,
		height:31,
		left:106
	});
	runFinishOpacityBar.add(runFinishDividerBar1);
	
	//right divider for opacity bar
	var runFinishDividerBar2 = Titanium.UI.createView({ 
		backgroundColor:'black',
		width:1,
		opacity:0.4,
		height:31,
		right:106
	});
	runFinishOpacityBar.add(runFinishDividerBar2);

	//number of the distance label
	var runFinishDistanceNumberLabel = Titanium.UI.createLabel({
		text:obj.distance,
		height:21,
		textAlign:'center',
		left:36,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishDistanceNumberLabel);
	
	//unit of the distance label
	var runFinishDistanceUnitLabel = Titanium.UI.createLabel({ 
		text:'km',
		height:17,
		textAlign:'center',
		left:55,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishDistanceUnitLabel);
	
	//distance label
	var runFinishDistanceLabel = Titanium.UI.createLabel({ 
		text:'distance',
		height:19,
		textAlign:'center',
		left:30,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishDistanceLabel);

	//number of the average pace label
	var runFinishAvgPaceNumberLabel = Titanium.UI.createLabel({
		text:obj.pace,
		height:21,
		textAlign:'right',
		left:127,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishAvgPaceNumberLabel);
	
	//unit of the average pace label
	var runFinishAvgPaceUnitLabel = Titanium.UI.createLabel({ 
		text:'km/h',
		height:17,
		textAlign:'center',
		left:159,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishAvgPaceUnitLabel);
	
	//average pace label
	var runFinishAvgPaceLabel = Titanium.UI.createLabel({ 
		text:'avg pace',
		height:19,
		textAlign:'center',
		left:137,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishAvgPaceLabel);

	//number of the weather label
	var runFinishWeatherNumberLabel = Titanium.UI.createLabel({
		text:obj.temperature,
		height:21,
		textAlign:'center',
		left:252,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishWeatherNumberLabel);
	
	//unit of the weather label
	var runFinishWeatherUnitLabel = Titanium.UI.createLabel({ 
		text:'°C',
		height:17,
		textAlign:'center',
		left:271,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishWeatherUnitLabel);
	
	//weather label
	var runFinishWeatherLabel = Titanium.UI.createLabel({ 
		text:'weather',
		height:19,
		textAlign:'center',
		left:246,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishOpacityBar.add(runFinishWeatherLabel);

	//Table view title bar	
	var runFinishTitleBar = Titanium.UI.createView({ 
		backgroundColor:UI_COLOR,
		width:'100%',
		top:214,
		height:25
	});
	viewRunSummary.add(runFinishTitleBar);
	
	//Table view title label	
	var runFinishTitleLabel = Titanium.UI.createLabel({ 
		text:'Breed Energy Bar',
		color:'white',
		height:25,
		textAlign:'center',
		left:18,
		font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishTitleBar.add(runFinishTitleLabel);
	
	//dogs table view
	var runFinishTableView = Titanium.UI.createTableView({
		minRowHeight:60,
		width:320,
		data:populateRunFinishTableView(obj),
		backgroundColor:'transparent',
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		top:240,
		bottom:39,
		allowsSelection:false
	});
	
	viewRunSummary.add(runFinishTableView);

	//map region object
	var runSummaryRegion = {
		latitude: obj.coordinates[0].latitude,
		longitude: obj.coordinates[0].longitude,
		animate:true,
		latitudeDelta:0.001,
		longitudeDelta:0.001
	};
	
	viewRunFinishMap.setLocation(runSummaryRegion);

	//route object
	var route = {
	    name:"Your path",
	    points:obj.coordinates,
	    color:"f9bf30",
	    borderColor:'black',
	    width:8
	};
 
	// add the route
	viewRunFinishMap.addRoute(route);
	
	//background for comments
	runFinishCommentsBackgroundView = Ti.UI.createView({
		top:383,
		height:320,
		width:'100%',
		backgroundColor:UI_BACKGROUND_COLOR,
		zIndex:2
	});
	viewRunSummary.add(runFinishCommentsBackgroundView);
	
	//button to show all comments
	runFinishCommentsButton = Ti.UI.createButton({ 
		backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
		top:0,
		width:320,
		height:33,
		toggle:false,
		button:'bar'
	});
	runFinishCommentsBackgroundView.add(runFinishCommentsButton);
	//event listener for button
	runFinishCommentsButton.addEventListener('click', handleCommentButtons);
	
	//plus buttton to create a new comment
	var runFinishPlusButton = Ti.UI.createButton({ 
		backgroundImage:IMAGE_PATH+'checkin_place/add_icon.png',
		bottom:4,
		right:26,
		width:12,
		height:12,
		button:'plus'
	});
	runFinishCommentsButton.add(runFinishPlusButton);
	//event listener for plus button
	runFinishPlusButton.addEventListener('click', handleCommentButtons);
	
	//comments title label
	var runFinishCommentsTitleLabel = Titanium.UI.createLabel({ 
		text:'Comments',
		color:'white',
		top:13,
		height:20,
		textAlign:'center',
		left:18,
		font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	runFinishCommentsButton.add(runFinishCommentsTitleLabel);
	
	//create a comment text area
	runfinishCommentsTextArea = Ti.UI.createTextArea({
		backgroundColor:'white',
		width:276,
		height:137,
		top:55,
		font:{fontSize:15}
	});
	runFinishCommentsBackgroundView.add(runfinishCommentsTextArea);
	runfinishCommentsTextArea.hide();
	
	//comments tableView
	runFinishCommentsTableView = Titanium.UI.createTableView({
		minRowHeight:47,
		width:320,
		data:populateRunFinishCommentsTableView(),
		backgroundColor:'e7e7e7',
		top:36,
		bottom:0,
		allowsSelection:false,
		height:393
	});
	runFinishCommentsBackgroundView.add(runFinishCommentsTableView);

	return viewRunSummary;
}

function populateRunFinishTableView(o){
	//Get activity details
	var data = getActivity(o.activity_id); 
	var tableRows = [];
	
	for(i=0; i<data.dogs.length; i++){	 
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
			text:data.dogs[i].name,
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
	}
	return tableRows;
}

//populate comment rows
function populateRunFinishCommentsTableView(){
	
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
		runFinishCommentsBackgroundView.animate({top:383, duration:600});
		runfinishCommentsTextArea.blur();
		runfinishCommentsTextArea.hide();
		runFinishCommentsTableView.show();
		e.source.toggle = false;
	}else if(!toggle && button != 'plus'){
		runFinishCommentsBackgroundView.animate({top:-13, duration:600});
		runfinishCommentsTextArea.blur();
		runfinishCommentsTextArea.hide();
		runFinishCommentsTableView.show();
		e.source.toggle = true;
	}else if(button == 'plus'){
		runFinishCommentsBackgroundView.animate({top:-13, duration:200});
		runFinishCommentsButton.toggle = true;
		
		runfinishCommentsTextArea.focus();
		runFinishCommentsTableView.hide();
		runfinishCommentsTextArea.show();
	}
	
}