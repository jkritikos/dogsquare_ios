//notifications view
var viewNotifications = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

//notifications table view
var notificationsTableView = Titanium.UI.createTableView({
	minRowHeight:71,
	width:293,
	data:populateNotificationsTableView(),
	backgroundColor:UI_BACKGROUND_COLOR,
	top:13,
	bottom:0
});
viewNotifications.add(notificationsTableView);

//notifications table view footer
notificationsTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor:'transparent'
});

//populate table view
function populateNotificationsTableView() {
	var tableRows = [];
	//notifications array
	var notificationArray = ['Ben Howdle requested for a dog walk', 
							 'Rogie King accepted your walk request', 
							 'Mike Beecham commented on your walk',
							 'Rogie King accepted your walk request'];
	
	for(i=0;i<=3;i++){
		//notification row
		var notificationRow = Ti.UI.createTableViewRow({
			className:'notificationRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		//profile image
		var rowNotificationImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var rowNotificationProfileImage = Titanium.UI.createImageView({
			image:rowNotificationImageFile.nativePath,
			left:2,
			width:54,
			height:54,
			borderRadius:27,
			borderWidth:3,
			borderColor:'f5a92c'
		});
		//notification label
		var rowNotificationLabel = Titanium.UI.createLabel({ 
			text:notificationArray[i],
			color:'black',
			height:18,
			width:'auto',
			textAlign:'left',
			left:65,
			opacity:0.7,
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		//date label
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:'Sept 7',
			color:'black',
			height:18,
			width:'auto',
			textAlign:'center',
			right:9,
			opacity:0.7,
			font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		notificationRow.add(rowNotificationProfileImage);
		notificationRow.add(rowNotificationLabel);
		notificationRow.add(rowDateLabel);
		
		tableRows.push(notificationRow);
	}
	return tableRows;
}