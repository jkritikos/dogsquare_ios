//UI components
var ADD_DOG = 8;
var TYPE_CHECKBOX = 1;
var RIGHT_MENU_TYPE_ROW = 2;

//Right window
var winRight = Ti.UI.createWindow();
var dRows = getDogs();

//right table view
var rightTableView = Ti.UI.createTableView({
	backgroundColor:'1c2027',
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
});
populateRightMenu(dRows);
winRight.add(rightTableView);
rightTableView.addEventListener('click', handleTableViewRows);

/*Returns an array of the selected dog ids*/
function getSelectedDogs(){
	var selected = [];
	
	for (i=0; i<rightTableView.data[0].rows.length;i++){
	    if (rightTableView.data[0].rows[i].active) {
	        Ti.API.info('Found selected dog '+rightTableView.data[0].rows[i].dogId);
	        selected.push(rightTableView.data[0].rows[i].dogId);
	    }
	}
	
	return selected;
}

//Creates and populates the right menu
function populateRightMenu(dogObject){
	
	var rightMenuData = [];
	//temporary arrays
	var percent = ['76 %', '53 %', '39 %'];
	
	//add dog row - buttton
	var rightMenuAddDogRow = Ti.UI.createTableViewRow({
		height:58,
		className:'RIGHT_MENU',
		backgroundColor:UI_MENU_BACKGROUND_COLOR,
		selectedBackgroundColor:'#1c2027',
		rowId:ADD_DOG
	});
	
	//plus image inside button UI
	var rowPlusImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'menu_right/add_dog_icon.png',
		left:86
	});
	
	//label inside button UI
	var addDogRowLabel = Titanium.UI.createLabel({ 
		text:'Add a new dog',
		color:'bab9ba',
		height:27,
		width:125,
		textAlign:'left',
		left:146,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	//border inside button UI
	var rowBorderImage1 = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'menu_right/border.png',
		bottom:0,
		width:319
	});
	
	rightMenuAddDogRow.add(rowBorderImage1);
	rightMenuAddDogRow.add(rowPlusImage);
	rightMenuAddDogRow.add(addDogRowLabel);
	
	rightMenuData.push(rightMenuAddDogRow);
	
	for(var i=0;i<dogObject.length;i++){
		Ti.API.info('dog rows are being populated with dog id '+dogObject[i].dog_id);

		//all dog rows
		var rightMenuRow = Ti.UI.createTableViewRow({
			height:90,
			className:'RIGHT_MENU',
			selectedBackgroundColor:'transparent',
			backgroundColor:'1c2027',
			selectionStyle:0,
			active:false,
			type:RIGHT_MENU_TYPE_ROW,
			dogId:dogObject[i].dog_id
		});
		
		//border image inside the dog row - right menu row
		var rowBorderImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/border.png',
			bottom:0,
			width:319
		});
		
		var rowDogImage = Titanium.UI.createImageView({
			image:REMOTE_DOG_IMAGES + dogObject[i].thumb_path,
			left:58,
			top:13,
			borderRadius:30,
			borderWidth:2,
			borderColor:'454950',
			type:RIGHT_MENU_TYPE_ROW
		});
		Ti.API.info(REMOTE_DOG_IMAGES + dogObject[i].thumb_path);
		
		//dog name label inside the dog row - right menu row
		var rowDogNameLabel = Titanium.UI.createLabel({ 
			text:dogObject[i].name,
			color:'ab7b04',
			height:31,
			width:'auto',
			textAlign:'left',
			left:134,
			top:14,
			font:{fontSize:24, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:RIGHT_MENU_TYPE_ROW
		});
		
		//dog mood label inside the dog row - right menu row
		var rowDogMoodLabel = Titanium.UI.createLabel({ 
			text:'Happy',
			color:'8a8b8c',
			height:18,
			width:45,
			textAlign:'left',
			left:136,
			top:50,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:RIGHT_MENU_TYPE_ROW
		});
		
		//dog percent label inside the dog row - right menu row
		var rowDogPercentLabel = Titanium.UI.createLabel({ 
			text:percent[i],
			color:'ab7b04',
			height:18,
			width:35,
			textAlign:'left',
			left:180,
			top:50,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:RIGHT_MENU_TYPE_ROW
		});
		
		//bone image inside the dog row - right menu row
		var rowBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/bone_grey.png',
			left:222,
			top:50,
			type:RIGHT_MENU_TYPE_ROW
		});
		
		//check box view inside the dog row - right menu row
		var rowCheckBox = Titanium.UI.createView({
			backgroundColor:'454950',
			top:20,
			right:25,
			width: 23,
			height:23,
			type:TYPE_CHECKBOX
		});
		rowCheckBox.addEventListener('click', handleCheckBoxInteraction);
		
		//check image inside the dog row - right menu row
		var rowCheckImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/check_mark.png',
			type:TYPE_CHECKBOX
		});
		rowCheckImage.hide();
		
		rowCheckBox.add(rowCheckImage);
		rightMenuRow.add(rowCheckBox);
		rightMenuRow.add(rowBoneImage);
		rightMenuRow.add(rowDogPercentLabel);
		rightMenuRow.add(rowDogMoodLabel);
		rightMenuRow.add(rowDogNameLabel);
		rightMenuRow.add(rowDogImage);
		rightMenuRow.add(rowBorderImage);
		
		rightMenuData.push(rightMenuRow);
	}
	rightTableView.setData(rightMenuData);
}

//handle all rows and show dog profile - also handle add dog
function handleTableViewRows(e){
	
	if(e.source.type == RIGHT_MENU_TYPE_ROW) {
		closeOpenWindows();
		navController.getWindow().setTitleControl();
		
		var dogId = e.row.dogId;
		
		Ti.include('ui/iphone/dog_profile.js');
		var dogProfileView = buildDogProfileView(dogId);
		
		navController.getWindow().add(dogProfileView);
		
		if(window.isAnyViewOpen()){
			window.toggleRightView();
		}
	}else if(e.row.rowId == ADD_DOG){
		closeOpenWindows();
		navController.getWindow().setTitleControl();
		
		Ti.include('ui/iphone/add_dog.js');
		navController.getWindow().add(viewAddDog);
		navController.getWindow().setTitle('Add new dog');
		
		if(window.isAnyViewOpen()){
			window.toggleRightView();
		}
	}
}


function handleCheckBoxInteraction(e){
	var rowCheckImage = e.row.children[0].children[0];
	var rowDogNameLabel = e.row.children[4];
	var rowDogPercentLabel = e.row.children[2];
	var rowDogImage = e.row.children[5];
	
	if(e.row.rowId != ADD_DOG) {
		if(e.source.type == TYPE_CHECKBOX && e.row.active) {
			rowCheckImage.hide();
			rowDogNameLabel.color = 'ab7b04';
			rowDogPercentLabel.color = 'ab7b04';
			rowDogImage.borderColor = '454950';
			e.row.backgroundColor = '1c2027';
			e.row.active = false;
		}else if(e.source.type == TYPE_CHECKBOX && !(e.row.active)){ 
			rowCheckImage.show();
			rowDogNameLabel.color = 'f9bf30';
			rowDogPercentLabel.color = 'f9bf30';
			rowDogImage.borderColor = 'f9bf30';
			e.row.backgroundColor = UI_MENU_BACKGROUND_COLOR;
			e.row.active = true;
		}	
	}
}

