var ADD_DOG = 8;


//Right window
var winRight = Ti.UI.createWindow();

var rightTableView = Ti.UI.createTableView({
	backgroundColor:'1c2027',
	data:populateRightMenu(),
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
});
rightTableView.addEventListener('click', handleTableViewRows);

winRight.add(rightTableView);

//Creates and populates the right menu
function populateRightMenu(){
	
	var rightMenuData = [];
	var dogNames = ['Max', 'Lory', 'Lucy'];
	var percent = ['76 %', '53 %', '39 %'];
	
	var rightMenuAddDogRow = Ti.UI.createTableViewRow({
		height:58,
		className:'RIGHT_MENU',
		backgroundColor:UI_MENU_BACKGROUND_COLOR,
		selectedBackgroundColor:'#1c2027',
		rowId:ADD_DOG
	});
	rightMenuAddDogRow.addEventListener("click", function(){
		
		Ti.include('ui/iphone/add_dog.js');
		navController.getWindow().add(viewAddDog);
		navController.getWindow().setTitle('Add new dog');
		
		if(window.isAnyViewOpen()){
			window.toggleRightView();
		}
	});
	
	var rowPlusImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'menu_right/add_dog_icon.png',
		left:86
	});
	
	var addDogRowLabel = Titanium.UI.createLabel({ 
		text:'Add a new dog',
		color:'bab9ba',
		height:27,
		width:125,
		textAlign:'left',
		left:146,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	var rowBorderImage1 = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'menu_right/border.png',
		bottom:0,
		left:39
	});
	
	rightMenuAddDogRow.add(rowBorderImage1);
	rightMenuAddDogRow.add(rowPlusImage);
	rightMenuAddDogRow.add(addDogRowLabel);
	
	rightMenuData.push(rightMenuAddDogRow);
	
	for(i=0;i<=2;i++){
		var rightMenuRow = Ti.UI.createTableViewRow({
			height:116,
			className:'RIGHT_MENU',
			selectedBackgroundColor:'transparent',
			backgroundColor:'1c2027',
			selectionStyle:0,
			active:false
		});
		
		var rowBorderImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/border.png',
			bottom:0,
			left:42
		});
		
		var rowDogImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var rowDogImage = Titanium.UI.createImageView({
			image:rowDogImageFile.nativePath,
			left:58,
			top:13,
			width:80,
			height:80,
			borderRadius:40,
			borderWidth:4,
			borderColor:'454950'
		});
		
		var rowDogNameLabel = Titanium.UI.createLabel({ 
			text:dogNames[i],
			color:'ab7b04',
			height:31,
			width:62,
			textAlign:'left',
			left:156,
			top:14,
			font:{fontSize:24, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		var rowDogMoodLabel = Titanium.UI.createLabel({ 
			text:'Happy',
			color:'8a8b8c',
			height:18,
			width:45,
			textAlign:'left',
			left:158,
			top:47,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		var rowDogPercentLabel = Titanium.UI.createLabel({ 
			text:percent[i],
			color:'ab7b04',
			height:18,
			width:35,
			textAlign:'left',
			left:199,
			top:47,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		var rowBoneImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'run_finish/bone_icon.png',
			left:232,
			top:47
		});
		
		var rowCheckBox = Titanium.UI.createView({
			backgroundColor:'454950',
			bottom:16,
			right:28,
			width: 23,
			height:23
		});
		
		var rowCheckImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/check_mark.png'
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
	return rightMenuData;
}

function handleTableViewRows(e){
	var rowCheckImage = e.row.children[0].children[0];
	var rowDogNameLabel = e.row.children[4];
	var rowDogPercentLabel = e.row.children[2];
	var rowDogImage = e.row.children[5];
	
	if(e.row.rowId != ADD_DOG) {
		if(e.row.active) {
			rowCheckImage.hide();
			rowDogNameLabel.color = 'ab7b04';
			rowDogPercentLabel.color = 'ab7b04';
			rowDogImage.borderColor = '454950';
			e.row.backgroundColor = '1c2027';
			e.row.active = false;
		}else{ 
			rowCheckImage.show();
			rowDogNameLabel.color = 'f9bf30';
			rowDogPercentLabel.color = 'f9bf30';
			rowDogImage.borderColor = 'f9bf30';
			e.row.backgroundColor = UI_MENU_BACKGROUND_COLOR;
			e.row.active = true;
		}
		 	
	}
}