//inbox view
var viewInbox = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

//inbox table view
var inboxTableView = Titanium.UI.createTableView({
	minRowHeight:71,
	width:293,
	data:populateInboxTableView(),
	backgroundColor:UI_BACKGROUND_COLOR,
	top:13,
	bottom:0
});
viewInbox.add(inboxTableView);

//inbox table view footer
inboxTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

//populate table view
function populateInboxTableView() {
	var tableRows = [];
	
	//arrays for the labels
	var namesArray = ['Ben Howdle', 'Rogie King', 'Mike Beecham', 'Ryan Murphy'];
	var messageTitleArray = ['Check Out Kashflow', 'RE: NeonMob', 'RE: Bagels', 'RE: Rockpack is Awesome!'];
	var messageArray = ['Hey Jamie, I wanted to show you Kashflow...', 
						'Hey Jamie, of course you can have all the ... ', 
						'I agree, bagels are pretty good!',
						'Hey Jamie, Rockpack is a great place...'];
	
	for(i=0;i<=3;i++){
		//message row
		var messageRow = Ti.UI.createTableViewRow({
			className:'messageRow',
			height:71,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		messageRow.addEventListener('click', handleInboxMessage);
		
		//profile image
		var rowMessageImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var rowMessageProfileImage = Titanium.UI.createImageView({
			image:rowMessageImageFile.nativePath,
			left:2,
			width:54,
			height:54,
			borderRadius:27,
			borderWidth:3,
			borderColor:'f5a92c'
		});
		
		//title label
		var rowTitleLabel = Titanium.UI.createLabel({ 
			text:messageTitleArray[i],
			color:'black',
			height:20,
			width:'auto',
			textAlign:'left',
			left:64,
			opacity:0.8,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		//message label
		var rowMessageLabel = Titanium.UI.createLabel({ 
			text:messageArray[i],
			color:'black',
			bottom:9,
			height:18,
			width:'auto',
			textAlign:'left',
			left:65,
			opacity:0.7,
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		//name label
		var rowNameLabel = Titanium.UI.createLabel({ 
			text:namesArray[i],
			color:'black',
			top:9,
			height:18,
			width:'auto',
			textAlign:'left',
			left:65,
			opacity:0.7,
			font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		//date label
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:'Sept 7',
			color:'black',
			top:10,
			height:18,
			width:'auto',
			textAlign:'center',
			right:9,
			opacity:0.7,
			font:{fontSize:9, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		messageRow.add(rowMessageProfileImage);
		messageRow.add(rowTitleLabel);
		messageRow.add(rowMessageLabel);
		messageRow.add(rowNameLabel);
		messageRow.add(rowDateLabel);
		
		tableRows.push(messageRow);
	}
	
	return tableRows;
}

function handleInboxMessage(){
	Ti.include('ui/iphone/inbox_view.js');
	
	openWindows.push(inboxViewWindow);
	navController.open(inboxViewWindow);
}
