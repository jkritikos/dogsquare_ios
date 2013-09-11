//inbox new window
var inboxNewWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR,
	title:'New Message'
});

//back button
var inboxNewBackButton = Ti.UI.createButton({
    backgroundImage: IMAGE_PATH+'common/back_button.png',
    width:48,
    height:33
});

inboxNewWindow.setLeftNavButton(inboxNewBackButton);

inboxNewBackButton.addEventListener("click", function() {
    navController.close(inboxNewWindow);
});

//inbox new send to background
var inboxNewSendToBackgroundView = Ti.UI.createView({
    backgroundColor: 'white',
    top:0,
    width:'100%',
    height:38
});

var inboxNewSendToLabel = Titanium.UI.createLabel({ 
	text:'To:',
	left:10,
	color:'666666',
	height:25,
	width:23,
	textAlign:'left',
	font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
});

inboxNewSendToBackgroundView.add(inboxNewSendToLabel);

//flexible space for toolbar
var inboxNewFlexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var inboxNewSendMessageTextField = Titanium.UI.createTextField({ 
	height:31, 
	backgroundColor:'white',
	width:239, 
	font:{fontSize:13}, 
	color:'black', 
	borderColor:'transparent',
	borderWidth:5,
	borderRadius:5,
	paddingLeft:10, 
	left:7 
});

var inboxNewSendMessageSendButton = Titanium.UI.createButton({  
	title:'send',
	width:55, 
	height:32,
	left:7, 
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE 
}); 

inboxNewSendMessageSendButton.addEventListener('click', handleToolbarSendButton);

var inboxNewSendToTextField = Ti.UI.createTextField({
	width:238,
	height:38,
	keyboardToolbar:[inboxNewSendMessageTextField, inboxNewFlexSpace, inboxNewSendMessageSendButton], 
	keyboardToolbarColor:'#999',
	font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
});

inboxNewSendToBackgroundView.add(inboxNewSendToTextField);
inboxNewWindow.add(inboxNewSendToBackgroundView);

//inbox new sepparator
var inboxNewSendToSepparator = Ti.UI.createView({
    backgroundColor: 'black',
    top:38,
    width:'100%',
    opacity:0.5,
    height:1
});
inboxNewWindow.add(inboxNewSendToSepparator);

var inboxNewContactsTableView = Titanium.UI.createTableView({
	minRowHeight:60,
	width:320,
	backgroundColor:UI_MENU_BACKGROUND_COLOR,
	top:39,
	bottom:0
});
inboxNewWindow.add(inboxNewContactsTableView);

//remove empty rows
inboxNewContactsTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: UI_MENU_BACKGROUND_COLOR
});

populateInboxNewContactsTableView();

function populateInboxNewContactsTableView(){
	
	var tableRows = [];
	
	for(i=0;i<=2;i++){
		
		var row = Ti.UI.createTableViewRow({
			height:60,
			className:'contactsResult',
			backgroundColor:'transparent',
			selectedBackgroundColor:'#1c2027',
			user_id:1
		});
		
		var rowNameLabel = Titanium.UI.createLabel({
			text:'Mike',
			color:'#ab7b04',
			left:52,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		row.add(rowNameLabel);
		tableRows.push(row);
	}
	
	inboxNewContactsTableView.setData(tableRows);
}

function handleToolbarSendButton() { 
	Titanium.UI.createAlertDialog({title:'Toolbar',message:'You clicked send!'}).show(); 
}