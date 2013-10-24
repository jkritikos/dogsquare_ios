var runFinishCommentsBackgroundView = null;
var runfinishCommentsTextArea = null;
var runFinishCommentsTableView = null;
var runFinishCommentsButton = null;

var runFinishSaveCommentButton = null;

var ADD_COMMENT = 1;
var COMMENT_ROW = 2;

var runFinishComObject = {};

var runFinishActivityId = null;

CURRENT_VIEW = VIEW_RUN_FINISH;
		
Ti.App.addEventListener('activity', function(data) 
{ 
     runFinishActivityId =  data.activityId; 
});

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
		latitude:obj.coordinates[obj.coordinates.length - 1].latitude,
		longitude:obj.coordinates[obj.coordinates.length - 1].longitude,
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
		textAlign:'right',
		left:21,
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
		left:114,
		width:40,
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
		text:'Status',
		color:'white',
		height:25,
		textAlign:'center',
		left:18,
		font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
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
		top:IPHONE5 ? 462 : 375,
		height:IPHONE5 ? 516 : 429,
		width:'100%',
		backgroundColor:UI_BACKGROUND_COLOR,
		zIndex:2
	});
	viewRunSummary.add(runFinishCommentsBackgroundView);
	
	//button to show all comments
	runFinishCommentsButton = Ti.UI.createButton({ 
		backgroundImage:IMAGE_PATH+'common/comment_field.png',
		top:0,
		width:320,
		height:44,
		toggle:false,
		button:'bar'
	});
	runFinishCommentsBackgroundView.add(runFinishCommentsButton);
	//event listener for button
	runFinishCommentsButton.addEventListener('click', handleRunFinishCommentButton);
	
	// save button
	runFinishSaveCommentButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/save_button.png',
	    width:54,
	    height:34,
	    activityId:1
	});
	runFinishSaveCommentButton.addEventListener('click', handleRunFinishCommentSaveButton);
	
	//comments title label
	var runFinishCommentsTitleLabel = Titanium.UI.createLabel({ 
		text:'Comments',
		color:'white',
		top:15,
		height:20,
		textAlign:'center',
		left:18,
		font:UI_FONT_BARS
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
		top:41,
		bottom:0
	});
	runFinishCommentsBackgroundView.add(runFinishCommentsTableView);
	runFinishCommentsTableView.addEventListener('click', handleRunFinishCommentTableRows);
	
	//remove empty rows
	runFinishCommentsTableView.footerView = Ti.UI.createView({
	    height: 1,
	    backgroundColor: 'transparent'
	});

	return viewRunSummary;
}

function populateRunFinishTableView(o){
	//Get activity details
	var data = getActivity(o.activity_id); 
	var tableRows = [];
	
	for(i=0; i<data.dogs.length; i++){
		Ti.API.info('Populating dogfuel row for dog '+data.dogs[i].dog_id);
			 
		//row
		var row = Ti.UI.createTableViewRow({ 
			className:'runFinishRow',
			height:79,
			backgroundColor:UI_BACKGROUND_COLOR,
			selectedBackgroundColor:'transparent'
		});
		
		var rowDogImage = Titanium.UI.createImageView({ 
			image:API+'photo_dog?dog_id='+data.dogs[i].dog_id,
			defaultImage:IMAGE_PATH+'common/default_dog_photo.png',
			left:14,
			borderRadius:30,
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
			image:IMAGE_PATH+'run_finish/bone_grey.png',
			left:210,
			top:20
		});
		
		row.add(rowBoneImage);
	
		//bone fill image
		if(data.dogs[i].dogfuel != null && data.dogs[i].dogfuel > 0){
			var croppedDataObject = createCroppedBoneImage(VIEW_RUN_FINISH,data.dogs[i].dogfuel);
			var rowBoneFillImage = Ti.UI.createImageView({ 
				image:croppedDataObject.photo,
				width: croppedDataObject.view_width,
				height:30,
				left:210,
				top:20,
				zIndex:2
			}); 
			
			row.add(rowBoneFillImage);	
		}
		
		//mood label
		var rowMoodLabel = Titanium.UI.createLabel({ 
			text:'Dogfuel',
			color:'black',
			height:15,
			textAlign:'center',
			right:52,
			bottom:13,
			opacity:0.3,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		row.add(rowMoodLabel);
		
		//mood percent label
		var rowMoodPercentLabel = Titanium.UI.createLabel({ 
			text:data.dogs[i].dogfuel + '%',
			color:'999900',
			height:15,
			textAlign:'center',
			left:271,
			bottom:13,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
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
	
	var addCommentRow = Ti.UI.createTableViewRow({
		height:43,
		className:'addComment',
		backgroundColor:UI_MENU_BACKGROUND_COLOR,
		selectedBackgroundColor:'#1c2027',
		rowId:ADD_COMMENT
	});
	
	//plus image inside button UI
	var addCommentPlusImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'menu_right/add_dog_icon.png',
		left:30
	});
	
	//label inside button UI
	var addCommentLabel = Titanium.UI.createLabel({ 
		text:'Add a comment',
		color:'bab9ba',
		height:27,
		width:125,
		textAlign:'left',
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	addCommentRow.add(addCommentLabel);
	addCommentRow.add(addCommentPlusImage);
	tableRows.push(addCommentRow);
	
	return tableRows;
}

//handle comments button
function handleRunFinishCommentButton(e){
	var toggle = e.source.toggle;
	var button = e.source.button;
	
	if(toggle){
		openWindows[openWindows.length - 1].setRightNavButton(null);
		runFinishCommentsBackgroundView.animate({top:IPHONE5 ? 462 : 375, duration:600});
		runfinishCommentsTextArea.blur();
		runfinishCommentsTextArea.hide();
		runFinishCommentsTableView.show();
		e.source.toggle = false;
	}else if(!toggle){
		openWindows[openWindows.length - 1].setRightNavButton(null);
		runFinishCommentsBackgroundView.animate({top:-12, duration:600});
		runfinishCommentsTextArea.blur();
		runfinishCommentsTextArea.hide();
		runFinishCommentsTableView.show();
		e.source.toggle = true;
	}
}

function handleRunFinishCommentTableRows(e){
	var row = e.row.rowId;
	
	if(row == ADD_COMMENT){
		runFinishCommentsBackgroundView.animate({top:-12, duration:200});
		openWindows[openWindows.length - 1].setRightNavButton(runFinishSaveCommentButton);
		runFinishCommentsButton.toggle = true;
		
		runfinishCommentsTextArea.focus();
		runFinishCommentsTableView.hide();
		runfinishCommentsTextArea.show();
	}
	
}

function handleRunFinishCommentSaveButton(e){
	if(runfinishCommentsTextArea.value != ''){
		runFinishComObject.comment = runfinishCommentsTextArea.value;
		runFinishComObject.activity_id = runFinishActivityId;
		
		var view = VIEW_RUN_FINISH;
		
		//save place comment
		doSaveActivityCommentOnline(runFinishComObject, view);
		
		runfinishCommentsTextArea.blur();
		runfinishCommentsTextArea.hide();
		runFinishCommentsTableView.show();
		
		openWindows[openWindows.length - 1].setRightNavButton(null);
	}
}

function appendCommentFinishTableView(date, message){
	//comment row
	var commentRow = Ti.UI.createTableViewRow({
		className:'commentRow',
		height:'auto',
		width:'100%',
		backgroundColor:'white',
		selectedBackgroundColor:'transparent',
		rowId:COMMENT_ROW
	});
	
	var commentRowUserImage = Titanium.UI.createImageView({
		image:API+'photo?user_id='+userObject.userId,
		defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
		top:6,
		left:10,
		borderRadius:30,
		borderWidth:2,
		borderColor:'f5a92c'
	});
	
	//comment name label
	var commentNameLabel = Ti.UI.createLabel({
		text:userObject.name,
		top:4,
		textAlign:'left',
		width:200,
		bottom:24,
		height:30,
		left:84,
		color:'black',
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	//comment label
	var commentLabel = Ti.UI.createLabel({
		text:message,
		top:30,
		bottom:30,
		textAlign:'left',
		width:203,
		height:'auto',
		left:84,
		color:UI_FONT_COLOR_LIGHT_BLACK,
		font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	var date = new Date(date * 1000);
	
	//comment time
	var timeLabel = Ti.UI.createLabel({
		text:relativeTime(date),
		bottom:10,
		textAlign:'left',
		width:180,
		height:15,
		left:84,
		color:'black',
		font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	commentRow.add(commentLabel);
	commentRow.add(timeLabel);
	commentRow.add(commentNameLabel);
	commentRow.add(commentRowUserImage);
	
	if(runFinishCommentsTableView.data[0].rows.length > 1){
		//viewActivityCommentsTableView.appendRow(commentRow);
		runFinishCommentsTableView.insertRowBefore(1, commentRow);
	}else{
		runFinishCommentsTableView.appendRow(commentRow);
	}
	
	runFinishCommentsTableView.scrollToIndex(1);
	
	runfinishCommentsTextArea.value = '';
}