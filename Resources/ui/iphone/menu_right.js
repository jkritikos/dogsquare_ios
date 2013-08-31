//UI components
var ADD_DOG = 8;
var TYPE_CHECKBOX = 1;
var TYPE_ROW = 2;

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
	
	// add dog button event listener
	rightMenuAddDogRow.addEventListener("click", function(){
		closeOpenWindows();
		
		Ti.include('ui/iphone/add_dog.js');
		navController.getWindow().add(viewAddDog);
		navController.getWindow().setTitle('Add new dog');
		
		if(window.isAnyViewOpen()){
			window.toggleRightView();
		}
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
		Ti.API.info('dog rows are being populated with dog id '+dogObject[i].id);

		//all dog rows
		var rightMenuRow = Ti.UI.createTableViewRow({
			height:116,
			className:'RIGHT_MENU',
			selectedBackgroundColor:'transparent',
			backgroundColor:'1c2027',
			selectionStyle:0,
			active:false,
			type:TYPE_ROW,
			dogId:dogObject[i].id
		});
		rightMenuRow.addEventListener('click', handleTableViewRows);
		
		//border image inside the dog row - right menu row
		var rowBorderImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/border.png',
			bottom:0,
			width:319
		});
		
		//dog image inside the dog row - right menu row
		var rowDogImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + dogObject[i].photo);
		var rowDogImageBlob = rowDogImageFile.toBlob();
		var rowDogImageBlobCropped = rowDogImageBlob.imageAsThumbnail(80,0,40);
		
		var rowDogImage = Titanium.UI.createImageView({
			image:rowDogImageBlobCropped,
			left:58,
			top:13,
			borderRadius:40,
			borderWidth:4,
			borderColor:'454950',
			type:TYPE_ROW
		});
		
		//dog name label inside the dog row - right menu row
		var rowDogNameLabel = Titanium.UI.createLabel({ 
			text:dogObject[i].name,
			color:'ab7b04',
			height:31,
			width:'auto',
			textAlign:'left',
			left:156,
			top:14,
			font:{fontSize:24, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:TYPE_ROW
		});
		
		//dog mood label inside the dog row - right menu row
		var rowDogMoodLabel = Titanium.UI.createLabel({ 
			text:'Happy',
			color:'8a8b8c',
			height:18,
			width:45,
			textAlign:'left',
			left:158,
			top:47,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:TYPE_ROW
		});
		
		//dog percent label inside the dog row - right menu row
		var rowDogPercentLabel = Titanium.UI.createLabel({ 
			text:percent[i],
			color:'ab7b04',
			height:18,
			width:35,
			textAlign:'left',
			left:199,
			top:47,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'},
			type:TYPE_ROW
		});
		
		//bone image inside the dog row - right menu row
		var rowBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'run_finish/bone_icon.png',
			left:232,
			top:47,
			type:TYPE_ROW
		});
		
		//check box view inside the dog row - right menu row
		var rowCheckBox = Titanium.UI.createView({
			backgroundColor:'454950',
			bottom:16,
			right:28,
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

//handle all rows and show dog profile
function handleTableViewRows(e){
	
	if(e.source.type == TYPE_ROW) {
		closeOpenWindows();
		
		var dogId = e.row.dogId;
		
		Ti.include('ui/iphone/dog_profile.js');
		var dogProfileView = buildDogProfileView(dogId);
		
		var dogProfileWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR
		});
		
		dogProfileWindow.add(dogProfileView);
		
		navController.getWindow().add(dogProfileWindow);
		
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