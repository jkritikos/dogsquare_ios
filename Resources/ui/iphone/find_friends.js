var viewFindFriends = null;
var findFriendsTabContactsSelection = null;
var findFriendsTabFacebookSelection = null;
var findFriendsTabDogsquareSelection = null;
var findFriendsSearchTxtfield = null;
var findFriendsSearchTxtfieldLabel = null;
var findFriendsFacebookView = null;
var findFriendsTableView = null;

//UI components
var FACEBOOK_TAB = 1;
var CONTACTS_TAB = 2;
var DOGSQUARE_TAB = 3;

var TYPE_CONTACTS_ROW = 1;
var TYPE_DOGSQUARE_ROW = 2;
var TYPE_FOLLOW_BUTTON = 3;
var TYPE_INVITE_BUTTON = 4;

var FIND_FRIENDS_WIN = 1;

var people = [];
var contactsEmailArray = [];

//temporary variable to store data from server
var localDataForContacts = null;

Ti.Contacts.requestAuthorization(function(e){
    if (e.success) {
       //get all contacts from iphone
		people = Titanium.Contacts.getAllPeople();
		people.sort(sortByFullName);
    } else {
       alert('PLEASE ENABLE CONTACTS ACCESS');
    }
});	

function buildFindFriendsView(){
	if(viewFindFriends == null){
		viewFindFriends = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//tabs Area Image
		var findFriendsTabsAreaImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'follow_invite/Tabs_Area.png',
			top:-3
		});
		
		viewFindFriends.add(findFriendsTabsAreaImage);
		
		//facebook tab image
		var findFriendsTabFacebookImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'follow_invite/Facebook_logo.png',
			top:9,
			left:6
		});
		findFriendsTabsAreaImage.add(findFriendsTabFacebookImage);
		
		//contacts tab label
		var findFriendsTabContactsLabel = Titanium.UI.createLabel({
			text:'Contacts',
			color:UI_FONT_COLOR_LIGHT_BLACK,
			height:47,
			textAlign:'center',
			font:{fontSize:18, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		findFriendsTabsAreaImage.add(findFriendsTabContactsLabel);
		
		//dogsquare tab image
		var findFriendsTabDogsquareImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'follow_invite/Dogsquare_logo.png',
			top:13,
			right:6
		});
		findFriendsTabsAreaImage.add(findFriendsTabDogsquareImage);
		
		//contacts selection bar
		findFriendsTabContactsSelection = Titanium.UI.createView({
			backgroundColor:UI_COLOR,
			bottom:3,
			width:129,
			height:8
		});
		findFriendsTabsAreaImage.add(findFriendsTabContactsSelection);
		
		//facebook selection bar
		findFriendsTabFacebookSelection = Titanium.UI.createView({
			backgroundColor:UI_COLOR,
			left:0,
			bottom:3,
			width:93,
			height:8
		});
		findFriendsTabsAreaImage.add(findFriendsTabFacebookSelection);
		findFriendsTabFacebookSelection.hide();
		
		//dogsquare selection bar
		findFriendsTabDogsquareSelection = Titanium.UI.createView({
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
		findFriendsSearchTxtfield = Titanium.UI.createTextField({
			left:35,
			height:28,
			width:278,
			field:'search'
		});
		
		findFriendsSearchContainer.add(findFriendsSearchTxtfield);
		findFriendsSearchTxtfield.addEventListener('change', handlefindFriendsTextFieldFocus);
		findFriendsSearchTxtfield.addEventListener('blur', handlefindFriendsTextFieldBlur);
		
		findFriendsSearchTxtfield.addEventListener('return', function() {
		   var nameUser = findFriendsSearchTxtfield.value;
		   if(nameUser != ''){
		       getOnlineUser(nameUser);
		   }else{
		   		findFriendsTableView.data = [];
		   }
		   
		});
		
		//search textfield label
		findFriendsSearchTxtfieldLabel = Titanium.UI.createLabel({
		    text:'Search',
			color:'e0e0e0',
			height:22,
			textAlign:'center',
			left:3,
			font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		findFriendsSearchTxtfield.add(findFriendsSearchTxtfieldLabel);
		findFriendsSearchContainer.add(findFriendsSearchIcon);
		viewFindFriends.add(findFriendsSearchContainer);
		
		//dummy view for facebook
		findFriendsFacebookView = Titanium.UI.createView({
			backgroundColor:'yellow',
			bottom:0,
			width:'100%',
			height:285
		});
		viewFindFriends.add(findFriendsFacebookView);
		findFriendsFacebookView.hide();
		
		//table view for all
		findFriendsTableView = Titanium.UI.createTableView({
			minRowHeight:60,
			width:290,
			backgroundColor:'transparent',
			top:90,
			bottom:0
		});
		viewFindFriends.add(findFriendsTableView);
		findFriendsTableView.addEventListener('click', handlefriendsTableViewRows);
		
		//remove empty rows
		findFriendsTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
		
		//push every email from work or from home
		if(people.length != 0){
			for(j=0;j<people.length;j++){	
				
				if(people[j].email.home != null){
					contactsEmailArray[j] = people[j].email.home[0];
				}else if(people[j].email.work != null){
					contactsEmailArray[j] = people[j].email.work[0];
				}
			}
			
			//find user info via email from the server - to check if he owns the app 
			doSearchUserByEmail(contactsEmailArray);
		}
	}
}


function sortByFullName(a, b) {
    var x = JSON.stringify(a.fullName).toUpperCase();
    var y = JSON.stringify(b.fullName).toUpperCase(); 
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

//populate contacts table view
function populateFindFriendsContactsTableView(uData){
	
	var tableRows = [];
	//populate each row with the people in the contacts
	for(i=0;i<people.length;i++){	
		var followCreated = false;//show if follow created or not
		
		var row = Ti.UI.createTableViewRow({
			className:'contactsRow',
			height:73,
			backgroundColor:'white',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
			type:TYPE_CONTACTS_ROW,
			button:'invite'
		});
		
		
		var rowFriendImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:3,
			type:TYPE_CONTACTS_ROW,
			button:'invite'
		});
		row.add(rowFriendImage);
		
		//friend's fullname label
		var rowFullNameLabel = Titanium.UI.createLabel({
			text:people[i].fullName,
			color:UI_FONT_COLOR_LIGHT_BLACK,
			height:22,
			textAlign:'left',
			left:72,
			width:116,
			font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'},
			type:TYPE_CONTACTS_ROW,
			button:'invite'
		});
		row.add(rowFullNameLabel);
		
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
					//create follow button if the email exists in the server
					var rowFollowButton = Titanium.UI.createButton({
						right:9,
						width:86,
						height:29,
						userId:uData.results.users[k].User.id,
						type:TYPE_FOLLOW_BUTTON
					});
					row.add(rowFollowButton);
					
					//check if contact user has been already followed
					if(uData.results.users[k].User.followed == null){
						rowFollowButton.backgroundImage = IMAGE_PATH+'follow_invite/Follow_btn.png';
						rowFollowButton.toggle = false;
					}else{
						rowFollowButton.backgroundImage = IMAGE_PATH+'follow_invite/Unfollow_btn.png';
						rowFollowButton.toggle = true;
					}
						
					followCreated = true;//follow is created
				}
			}
		}
		
		//if follow not created - create invite button
		if(!followCreated) {
			//invite button
			var rowInviteButton = Titanium.UI.createButton({
				backgroundImage:IMAGE_PATH+'follow_invite/Invite_btn.png',
				right:9,
				width:86,
				height:29,
				type:TYPE_INVITE_BUTTON
			});
			row.add(rowInviteButton);
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
			selectedBackgroundColor:'transparent',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
			type:TYPE_DOGSQUARE_ROW
		});
		
		//friend's profile name
		var rowFriendImage = Titanium.UI.createImageView({
			image:API+'photo?user_id='+uObj[i].User.id,
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30',
			type:TYPE_DOGSQUARE_ROW
		});
		row.add(rowFriendImage);
		
		//friend's name label
		var rowNameLabel = Titanium.UI.createLabel({
			text:uObj[i].User.name,
			color:UI_FONT_COLOR_LIGHT_BLACK,
			height:22,
			textAlign:'left',
			width:116,
			left:72,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'},
			type:TYPE_DOGSQUARE_ROW
		});
		row.add(rowNameLabel);
		
		//follow button
		var rowFollowButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'follow_invite/Follow_btn.png',
			right:9,
			width:86,
			height:29,
			userId:uObj[i].User.id,
			type:TYPE_FOLLOW_BUTTON
		});
		row.add(rowFollowButton);
		
		//check if contact user has been already followed
		if(uObj[i].User.followed == null){
			rowFollowButton.backgroundImage = IMAGE_PATH+'follow_invite/Follow_btn.png';
			rowFollowButton.toggle = false;
		}else{
			rowFollowButton.backgroundImage = IMAGE_PATH+'follow_invite/Unfollow_btn.png';
			rowFollowButton.toggle = true;
		}
		
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
		
		doSearchUserByEmail(contactsEmailArray);
		
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
	
	//progress view
	var progressView = new ProgressView({window:viewFindFriends});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getOnlineUser() '+e);
	};
	
	xhr.onload = function(e) {
		Ti.API.info('doSearchUserByEmail() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
			
			var userObj = jsonData;
			populateFindFriendsDogsquareTableView(userObj.data.users);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide message and close register window
			progressView.hide();
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			
			//Show the error message we got back from the server
			progressView.change({
		        error:true,
		        text:getErrorMessage(jsonData.data.response)
		    });
			//and hide it after a while		    
		    setTimeout(function() {
			    progressView.hide();
			}, ERROR_MSG_REMOVE_TIMEOUT);
		}
		
	};
	xhr.open('GET',API+'searchUser');
	xhr.send({
		user_id:userObject.userId,
		name:n,
		token:userObject.token
	});
}


//get info if contact has the app or not or has been followed by the user
function doSearchUserByEmail(cEmail){
	Ti.API.info('doSearchUserByEmail() with emails: '+cEmail);
	
	//progress view
	var progressView = new ProgressView({window:viewFindFriends});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	var emailList = escape(JSON.stringify(cEmail));
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSearchUserByEmail() '+e);
	};
	
	xhr.onload = function(e) {
		Ti.API.info('doSearchUserByEmail() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Show success
			progressView.change({
		        success:true
		    });
			
			populateFindFriendsContactsTableView(jsonData.data);
			localDataForContacts = jsonData.data;
			
			
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide message and close register window
			progressView.hide();
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			//Show the error message we got back from the server
			progressView.change({
		        error:true,
		        text:getErrorMessage(jsonData.data.response)
		    });
			//and hide it after a while		    
		    setTimeout(function() {
			    progressView.hide();
			}, ERROR_MSG_REMOVE_TIMEOUT);
		}
		
	};
	xhr.open('GET',API+'areUsers');
	xhr.send({
		user_id:userObject.userId,
		list:emailList,
		token:userObject.token
	});
}

function handlefriendsTableViewRows(e){
	if(e.source.type == TYPE_DOGSQUARE_ROW){
		
		Ti.include('ui/iphone/profile_other.js');
		
		var userId = e.row.children[2].userId;
		var nameUser = e.row.children[1].text;
		var profileOtherView = buildProfileOtherView(userId, nameUser);
		
		var profileOtherWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR,
			title:nameUser
		});
		
		//back button & event listener
		var profileOtherBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		profileOtherWindow.setLeftNavButton(profileOtherBackButton);
		profileOtherBackButton.addEventListener("click", function() {
		    navController.close(profileOtherWindow);
		});
		
		profileOtherWindow.add(profileOtherView);
		
		openWindows.push(profileOtherWindow);
		navController.open(profileOtherWindow);
	}else if(e.source.type == TYPE_FOLLOW_BUTTON){
		var userId = e.source.userId;
		var win = FIND_FRIENDS_WIN;
		
		if(e.source.toggle){
			unfollowUser(userId, e.source, win);
			e.source.toggle = false;
		}else{
			followUser(userId, e.source, win);
			e.source.toggle = true;
		}
	}else if(e.source.type == TYPE_INVITE_BUTTON){
		var smsModule = require("com.omorandi");
		var smsDialog = smsModule.createSMSDialog({ 
		    messageBody: 'hey',
		    barColor: 'black'
		});
	
	    smsDialog.open({animated: true});
	}
}