//UI components
var ADD_DOG = 8;
var TYPE_SELECT_ROW = 1;
var TYPE_IMAGE = 2;

//Right window
var winRight = Ti.UI.createWindow({top:WINDOW_TOP});
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
		left:71
	});
	
	//label inside button UI
	var addDogRowLabel = Titanium.UI.createLabel({ 
		text:'Add a new dog',
		color:'bab9ba',
		height:27,
		width:'auto',
		textAlign:'left',
		left:132,
		font:{fontSize:18, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	//border inside button UI
	var rowBorderImage1 = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'menu_right/border.png',
		bottom:-5,
		width:319
	});
	
	rightMenuAddDogRow.add(rowBorderImage1);
	rightMenuAddDogRow.add(rowPlusImage);
	rightMenuAddDogRow.add(addDogRowLabel);
	
	rightMenuData.push(rightMenuAddDogRow);
	
	for(var i=0;i<dogObject.length;i++){
		Ti.API.info('right menu dog rows are being populated with dog id '+dogObject[i].dog_id);

		//all dog rows
		var rightMenuRow = Ti.UI.createTableViewRow({
			height:90,
			className:'RIGHT_MENU',
			selectedBackgroundColor:'transparent',
			backgroundColor:'1c2027',
			selectionStyle:0,
			active:false,
			type:TYPE_SELECT_ROW,
			dogId:dogObject[i].dog_id
		});
		
		//border image inside the dog row - right menu row
		var rowBorderImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/border.png',
			bottom:-5,
			width:319
		});
		
		var rowDogImage = Titanium.UI.createImageView({
			image:REMOTE_DOG_IMAGES + dogObject[i].thumb_path,
			defaultImage:IMAGE_PATH+'common/default_dog_photo.png',
			left:55,
			top:13,
			borderRadius:30,
			borderWidth:2,
			borderColor:'454950',
			type:TYPE_IMAGE
		});
		
		//dog name label inside the dog row - right menu row
		var rowDogNameLabel = Titanium.UI.createLabel({ 
			text:dogObject[i].name,
			color:'ab7b04',
			width:106,
			height:35,
			textAlign:'left',
			left:130,
			top:14,
			font:{fontSize:22, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:TYPE_SELECT_ROW
		});
		
		//dog mood label inside the dog row - right menu row
		var rowDogMoodLabel = Titanium.UI.createLabel({ 
			text:'Dogfuel',
			color:'8a8b8c',
			height:18,
			textAlign:'left',
			left:132,
			top:50,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:TYPE_SELECT_ROW
		});
		
		//dog percent label inside the dog row - right menu row
		var rowDogPercentLabel = Titanium.UI.createLabel({ 
			text:dogObject[i].dogfuel != null ? dogObject[i].dogfuel+'%' : '0%',
			color:'ab7b04',
			height:18,
			width:35,
			textAlign:'left',
			left:185,
			top:50,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:TYPE_SELECT_ROW
		});
		
		//grey bone image inside the dog row - right menu row
		var rowBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/bone_grey.png',
			left:239,
			top:50,
			type:TYPE_SELECT_ROW
		});
		
		//check box view inside the dog row - right menu row
		var rowCheckBox = Titanium.UI.createView({
			backgroundColor:'454950',
			top:20,
			right:31,
			width: 23,
			height:23,
			type:TYPE_SELECT_ROW
		});
		
		//check image inside the dog row - right menu row
		var rowCheckImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/check_mark.png',
			type:TYPE_SELECT_ROW
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
		
		//color bone image inside the dog row - right menu row
		if(dogObject[i].dogfuel != null && dogObject[i].dogfuel > 0){
			var croppedDataObject = createCroppedBoneImage(VIEW_RIGHT_MENU,dogObject[i].dogfuel);
			var rowColorBoneImage = Ti.UI.createImageView({ 
				image:croppedDataObject.photo,
				width: croppedDataObject.view_width,
				height:22,
				left:239,
				top:50,
				type:TYPE_SELECT_ROW,
				zIndex:2
			});
			
			rightMenuRow.add(rowColorBoneImage);
		} else {
			//if we fell to 0 dogfuel show the grey image
			var rowColorBoneImage = Ti.UI.createImageView({ 
				image:IMAGE_PATH+'menu_right/bone_grey.png',
				left:239,
				top:50,
				type:TYPE_SELECT_ROW,
				zIndex:2
			});
			
			rightMenuRow.add(rowColorBoneImage);
		}
		
		rightMenuData.push(rightMenuRow);
	}
	rightTableView.setData(rightMenuData);
}

function handleTableViewRows(e){
	var rowCheckImage = e.row.children[0].children[0];
	var rowDogNameLabel = e.row.children[4];
	var rowDogPercentLabel = e.row.children[2];
	var rowDogImage = e.row.children[5];
	
	if(e.row.rowId != ADD_DOG) {
		if(e.source.type == TYPE_SELECT_ROW && e.row.active) {
			rowCheckImage.hide();
			rowDogNameLabel.color = 'ab7b04';
			rowDogPercentLabel.color = 'ab7b04';
			rowDogImage.borderColor = '454950';
			e.row.backgroundColor = '1c2027';
			e.row.active = false;
		}else if(e.source.type == TYPE_SELECT_ROW && !(e.row.active)){ 
			rowCheckImage.show();
			rowDogNameLabel.color = 'f9bf30';
			rowDogPercentLabel.color = 'f9bf30';
			rowDogImage.borderColor = 'f9bf30';
			e.row.backgroundColor = UI_MENU_BACKGROUND_COLOR;
			e.row.active = true;
		} else if(e.source.type == TYPE_IMAGE) {
			closeOpenWindows();
			navController.getWindow().setTitleControl();
			
			//Revert to the standard right window button
			navController.getWindow().rightNavButton = rightBtn;
			
			var dogId = e.row.dogId;
			
			Ti.include('ui/iphone/dog_profile.js');
			var dogProfileView = buildDogProfileView(dogId);
			
			navController.getWindow().add(dogProfileView);
			
			if(window.isAnyViewOpen()){
				window.toggleRightView();
			}
		}	
	}else {
		closeOpenWindows();
		navController.getWindow().setTitleControl();
		
		Ti.include('ui/iphone/add_dog.js');
		builAddDogView(TARGET_MODE_REUSE);
		navController.getWindow().add(viewAddDog);
		navController.getWindow().setTitle('Add new dog');
		
		if(window.isAnyViewOpen()){
			window.toggleRightView();
		}
	}
}

