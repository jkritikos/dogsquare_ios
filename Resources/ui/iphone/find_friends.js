var viewFindFriends = Ti.UI.createView({
	backgroundColor:'eeeded'
});

//UI components
var FACEBOOK_TAB = 1;
var CONTACTS_TAB = 2;
var DOGSQUARE_TAB = 3;

//temporary variable to store data from server
var localDataForContacts = null;

//tabs Area Image
var findFriendsTabsAreaImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'follow_invite/Tabs_Area.png',
	top:-3
});

viewFindFriends.add(findFriendsTabsAreaImage);

//facebook tab label
var findFriendsTabFacebookLabel = Titanium.UI.createLabel({
	text:'Facebook',
	color:'black',
	height:47,
	left:10,
	textAlign:'center',
	opacity:0.6,
	font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
});
findFriendsTabsAreaImage.add(findFriendsTabFacebookLabel);

//contacts tab label
var findFriendsTabContactsLabel = Titanium.UI.createLabel({
	text:'Contacts',
	color:'black',
	height:47,
	textAlign:'center',
	opacity:0.6,
	font:{fontSize:18, fontWeight:'semibold', fontFamily:'Open Sans'}
});
findFriendsTabsAreaImage.add(findFriendsTabContactsLabel);

//dogsquare tab label
var findFriendsTabDogsquareLabel = Titanium.UI.createLabel({
	text:'Dogsquare',
	color:'black',
	height:47,
	right:3,
	textAlign:'center',
	opacity:0.6,
	font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
});
findFriendsTabsAreaImage.add(findFriendsTabDogsquareLabel);

//contacts selection bar
var findFriendsTabContactsSelection = Titanium.UI.createView({
	backgroundColor:UI_COLOR,
	bottom:3,
	width:129,
	height:8
});
findFriendsTabsAreaImage.add(findFriendsTabContactsSelection);

//facebook selection bar
var findFriendsTabFacebookSelection = Titanium.UI.createView({
	backgroundColor:UI_COLOR,
	left:0,
	bottom:3,
	width:93,
	height:8
});
findFriendsTabsAreaImage.add(findFriendsTabFacebookSelection);
findFriendsTabFacebookSelection.hide();

//dogsquare selection bar
var findFriendsTabDogsquareSelection = Titanium.UI.createView({
	backgroundColor:UI_COLOR,
	right:0,
	bottom:3,
	width:94,
	height:8
});
findFriendsTabsAreaImage.add(findFriendsTabDogsquareSelection);
findFriendsTabDogsquareSelection.hide();

//facebook transparent view - to be clicked
var findFriendsTabFacebookTransparentView = Titanium.UI.createView({
	backgroundColor:'transparent',
	left:0,
	bottom:2,
	width:93,
	height:45,
	tab:FACEBOOK_TAB
});
findFriendsTabsAreaImage.add(findFriendsTabFacebookTransparentView);
findFriendsTabFacebookTransparentView.addEventListener('click', handleFindFriendsTabs);

//contacts transparent view - to be clicked
var findFriendsTabContactsTransparentView = Titanium.UI.createView({
	backgroundColor:'transparent',
	bottom:2,
	width:129,
	height:45,
	tab:CONTACTS_TAB
});
findFriendsTabsAreaImage.add(findFriendsTabContactsTransparentView);
findFriendsTabContactsTransparentView.addEventListener('click', handleFindFriendsTabs);

//dogsquare transparent view - to be clicked
var findFriendsTabDogsquareTransparentView = Titanium.UI.createView({
	backgroundColor:'transparent',
	right:0,
	bottom:2,
	width:94,
	height:45,
	tab:DOGSQUARE_TAB
});
findFriendsTabsAreaImage.add(findFriendsTabDogsquareTransparentView);
findFriendsTabDogsquareTransparentView.addEventListener('click', handleFindFriendsTabs);

//container for search
var findFriendsSearchContainer = Titanium.UI.createView({
	backgroundColor:'white',
	top:50,
	width:'100%',
	height:30,
	borderWidth:1,
	borderColor:'white'
});

//search icon
var findFriendsSearchIcon = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu_left/search_icon.png',
	left:5
});

//search textfield
var findFriendsSearchTxtfield = Titanium.UI.createTextField({
	left:35,
	width:200,
	field:'search'
});

findFriendsSearchContainer.add(findFriendsSearchTxtfield);
findFriendsSearchTxtfield.addEventListener('change', handlefindFriendsTextFieldFocus);
findFriendsSearchTxtfield.addEventListener('blur', handlefindFriendsTextFieldBlur);

findFriendsSearchTxtfield.addEventListener('return', function() {
   var nameUser = findFriendsSearchTxtfield.value;
   if(nameUser != ''){
       getOnlineUser(nameUser);
   }
   
});

//search textfield label
var findFriendsSearchTxtfieldLabel = Titanium.UI.createLabel({
    text:'Search',
	color:'CCCCCC',
	height:22,
	textAlign:'center',
	opacity:0.6,
	left:3,
	font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
});
findFriendsSearchTxtfield.add(findFriendsSearchTxtfieldLabel);
findFriendsSearchContainer.add(findFriendsSearchIcon);
viewFindFriends.add(findFriendsSearchContainer);

//dummy view for facebook
var findFriendsFacebookView = Titanium.UI.createView({
	backgroundColor:'yellow',
	bottom:0,
	width:'100%',
	height:285
});
viewFindFriends.add(findFriendsFacebookView);
findFriendsFacebookView.hide();

//table view for all
var findFriendsTableView = Titanium.UI.createTableView({
	minRowHeight:60,
	width:290,
	backgroundColor:'transparent',
	top:133,
	bottom:0,
	allowsSelection:false
});
viewFindFriends.add(findFriendsTableView);

//get all contacts from iphone
var people = Titanium.Contacts.getAllPeople();

//remove empty rows
findFriendsTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

var contactsEmailObj = [];
//push every email from work or from home
for(j=0;j<people.length;j++){	
	
	if(people[j].email.home != null){
		contactsEmailObj[j] = people[j].email.home[0];
	}else if(people[j].email.work != null){
		contactsEmailObj[j] = people[j].email.work[0];
	}
}

var contactsEmailStringList = '';
//convert the array into a string 
for(l=0;l<contactsEmailObj.length;l++){
	if(contactsEmailObj.length - 1 == l){
		contactsEmailStringList += '\'' + contactsEmailObj[l] + '\'';
	}else{
		contactsEmailStringList += '\'' + contactsEmailObj[l] + '\',';
	}
	
}

//find user info via email from the server - to check if he owns the app 
doSearchUserByEmail(contactsEmailStringList);
//populate contacts if user is offline
populateFindFriendsContactsTableView(localDataForContacts);

//populate contacts table view
function populateFindFriendsContactsTableView(uData){
	var tableRows = [];
	
	for(i=0;i<people.length;i++){	
		
		var row = Ti.UI.createTableViewRow({
			className:'contactsRow',
			height:73,
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		//friend's profile image
		var friendImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var friendImageBlob = friendImageFile.toBlob();
		var friendImageBlobCropped = friendImageBlob.imageAsThumbnail(60,0,30);
		var rowFriendImage = Titanium.UI.createImageView({
			image:friendImageBlobCropped,
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		row.add(rowFriendImage);
		
		//friend's fullname label
		var rowFullNameLabel = Titanium.UI.createLabel({
			text:people[i].fullName,
			color:'black',
			height:22,
			textAlign:'center',
			opacity:0.6,
			left:72,
			font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		row.add(rowFullNameLabel);
		
		//invite button
		var rowInviteButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'follow_invite/Invite_btn.png',
			right:9,
			width:86,
			height:29
		});
		row.add(rowInviteButton);
		
		var userEmail = null;
		//check what type of email the user has - from work or home
		if(people[i].email.home != null){
			userEmail = people[i].email.home[0];
		}else if(people[i].email.work != null){
			userEmail = people[i].email.work[0];
		}
		
		if(uData != null){
			//show follow button if user exists in web database and insert userId on follow button
			for(k=0;k<uData.results.users.length;k++){
				
				if(userEmail == uData.results.users[k].User.email){
					
					var rowFollowButton = Titanium.UI.createButton({
						backgroundImage:IMAGE_PATH+'follow_invite/Follow_btn.png',
						right:9,
						width:86,
						height:29,
						userId:uData.results.users[k].User.id
					});
					row.add(rowFollowButton);
					rowFollowButton.addEventListener('click', handleFollowButton);
				}
			}
		}
		tableRows.push(row);
	}
	findFriendsTableView.setData(tableRows);
	Ti.API.info('contacts table View has been populated');
}

//populate dogsquare table view
function populateFindFriendsDogsquareTableView(uObj){
	var tableRows = [];
	
	for(i=0;i<uObj.length;i++){	
		
		var row = Ti.UI.createTableViewRow({
			className:'dogsquareRow',
			height:73,
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		//friend's profile name
		var friendImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var friendImageBlob = friendImageFile.toBlob();
		var friendImageBlobCropped = friendImageBlob.imageAsThumbnail(60,0,30);
		var rowFriendImage = Titanium.UI.createImageView({
			image:friendImageBlobCropped,
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		row.add(rowFriendImage);
		
		//friend's name label
		var rowNameLabel = Titanium.UI.createLabel({
			text:uObj[i].User.name,
			color:'black',
			height:22,
			textAlign:'center',
			opacity:0.6,
			left:72,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		row.add(rowNameLabel);
		
		//follow button
		var rowFollowButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'follow_invite/Follow_btn.png',
			right:9,
			width:86,
			height:29,
			userId:uObj[i].User.id
		});
		row.add(rowFollowButton);
		rowFollowButton.addEventListener('click', handleFollowButton);
		
		tableRows.push(row);
	}
	findFriendsTableView.setData(tableRows);
	Ti.API.info('dogsquare table View has been populated');
}

//handle textfield focus
function handlefindFriendsTextFieldFocus(e){
		var field = e.source.field;
		
		if(field == 'search'){
			if(findFriendsSearchTxtfield.value != ''){
				findFriendsSearchTxtfieldLabel.hide();
			}else{
				findFriendsSearchTxtfieldLabel.show();
			}
		}
	}
	
//handle textfield blur
function handlefindFriendsTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 'search'){
		if(findFriendsSearchTxtfield.value == ''){
			findFriendsSearchTxtfieldLabel.show();
		}
	}
}

//handle tabs
function handleFindFriendsTabs(e){
	var tab = e.source.tab;
	if(tab == FACEBOOK_TAB){
		findFriendsTabFacebookSelection.show();
		findFriendsTabContactsSelection.hide();
		findFriendsTabDogsquareSelection.hide();
		
		findFriendsTableView.hide();
		findFriendsFacebookView.show();
	}else if(tab == CONTACTS_TAB){
		findFriendsTabFacebookSelection.hide();
		findFriendsTabContactsSelection.show();
		findFriendsTabDogsquareSelection.hide();
		
		populateFindFriendsContactsTableView(localDataForContacts);
		
		findFriendsTableView.show();
		findFriendsFacebookView.hide();
	}else if(tab == DOGSQUARE_TAB){
		findFriendsTabFacebookSelection.hide();
		findFriendsTabContactsSelection.hide();
		findFriendsTabDogsquareSelection.show();
		
		var emptyArray = [];
		
		populateFindFriendsDogsquareTableView(emptyArray);
		
		findFriendsTableView.show();
		findFriendsFacebookView.hide();
	}
}

//get online user
function getOnlineUser(n){
	Ti.API.info('getOnlineUser() called for user='+ n);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	var loading = createLoadingView();
	viewFindFriends.add(loading);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			var userObj = jsonData;
			populateFindFriendsDogsquareTableView(userObj.data.users);
			viewFindFriends.remove(loading);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('GET',API+'searchUser');
	xhr.send({
		name:n
	});
}


//get info if contact has the app or not or has been followed by the user
function doSearchUserByEmail(cEmail){
	Ti.API.info('doSearchUserByEmail() with emails');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateFindFriendsContactsTableView(jsonData.data);
			localDataForContacts = jsonData.data;
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('GET',API+'areUsers');
	xhr.send({
		user_id:userObject.userId,
		list:cEmail
	});
}

//save user whom you follow, in web database
function saveFollowingUser(uId){
	Ti.API.info('doSearchUserByEmail() with emails');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			alert('successfully followed!');
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'followUser');
	xhr.send({
		user_id:userObject.userId,
		follow_user:uId
	});
}

//handle follow button
function handleFollowButton(e){
	var userId = e.source.userId;
	
	saveFollowingUser(userId);
}
