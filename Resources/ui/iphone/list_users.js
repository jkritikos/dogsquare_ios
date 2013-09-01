var listUsersTableView = null;

function buildListUsersView(){
	var listUsersView = Ti.UI.createView({
		backgroundColor:'eeeded'
	});
	
	listUsersTableView = Titanium.UI.createTableView({
		minRowHeight:60,
		width:290,
		backgroundColor:'transparent',
		top:45,
		bottom:0,
		allowsSelection:false
	});
	listUsersView.add(listUsersTableView);
	
	//remove empty rows
	listUsersTableView.footerView = Ti.UI.createView({
	    height: 1,
	    backgroundColor: 'transparent'
	});
	
	populateListUsersTableView();
	
	return listUsersView;
}

function populateListUsersTableView(){
	var tableRows = [];

	for(i=0;i<2;i++){	
		var userRow = Ti.UI.createTableViewRow({
			className:'usersRow',
			height:73,
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		var userImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var userImageBlob = userImageFile.toBlob();
		var userImageBlobCropped = userImageBlob.imageAsThumbnail(60,0,30);
		var rowUserImage = Titanium.UI.createImageView({
			image:userImageBlobCropped,
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		userRow.add(rowUserImage);
		
		var rowUserNameLabel = Titanium.UI.createLabel({
			text:'noobie',
			color:'black',
			height:22,
			textAlign:'center',
			opacity:0.6,
			left:72,
			font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		userRow.add(rowUserNameLabel);
		
		tableRows.push(userRow);
	}
	listUsersTableView.setData(tableRows);
	Ti.API.info('followers table View has been populated');
}