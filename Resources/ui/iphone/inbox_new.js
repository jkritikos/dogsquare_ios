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
inboxNewSendToTextField.addEventListener('change', handleSendToTextFieldChange);
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
	backgroundColor:'transparent',
	top:39,
	bottom:0
});
inboxNewContactsTableView.addEventListener('click', handleNewContactsTableRows);
inboxNewWindow.add(inboxNewContactsTableView);
getMutualFollowers();

//remove empty rows
inboxNewContactsTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

function populateInboxNewContactsTableView(mObject){
	
	var tableRows = [];
	
	for(i=0;i<mObject.length;i++){
		
		var row = Ti.UI.createTableViewRow({
			height:73,
			className:'contactsResult',
			backgroundColor:'white',
			selectedBackgroundColor:'blue',
			user_id:mObject[i].user_id
		});
		
		var rowMutualFriendImage = Titanium.UI.createImageView({
			image:REMOTE_USER_IMAGES + mObject[i].thumb,
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		
		var rowNameLabel = Titanium.UI.createLabel({
			text:mObject[i].name,
			color:'#ab7b04',
			left:72,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		row.add(rowMutualFriendImage);
		row.add(rowNameLabel);
		tableRows.push(row);
	}
	
	inboxNewContactsTableView.setData(tableRows);
}

function handleToolbarSendButton() { 
	Titanium.UI.createAlertDialog({title:'Toolbar',message:'You clicked send!'}).show(); 
}

function getMutualFollowers(){
	Ti.API.info('getMutualFollowers() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			saveMutualFollowers(jsonData.data.mutual_followers);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('GET',API+'getMutualFollowers');
	xhr.send({
		user_id:userObject.userId,
		target_id:userObject.userId
	});
}

function handleNewContactsTableRows(e){
	inboxNewSendToTextField.blur();
	inboxNewSendToTextField.value = e.row.children[1].text;
	inboxNewContactsTableView.data = [];
}

function handleSendToTextFieldChange(e){
	if(e.value != ''){
		var mutualObj = null;
		mutualObj = searchMutualFollowers(e.value);
		populateInboxNewContactsTableView(mutualObj);
	}else{
		inboxNewContactsTableView.data = [];
	}
	
}
