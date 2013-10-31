var viewFindFriends = null;
var findFriendsTabContactsSelection = null;
var findFriendsTabFacebookSelection = null;
var findFriendsTabDogsquareSelection = null;
var findFriendsSearchTxtfield = null;
var findFriendsSearchTxtfieldLabel = null;
var findFriendsFacebookView = null;
var findFriendsTableView = null;
var findFriendsPhoneDialog = null;
var findFriendsSearchContainer = null;

//UI components
var FACEBOOK_TAB = 1;
var CONTACTS_TAB = 2;
var DOGSQUARE_TAB = 3;

var TYPE_FRIENDS_ROW = 1;
var TYPE_FOLLOW_BUTTON = 2;
var TYPE_INVITE_BUTTON = 3;
var TYPE_INVITE_FB_BUTTON = 4;
var TYPE_ALREADY_INVITED_BUTTON = 5;

var FIND_FRIENDS_WIN = 1;

var people = [];
var contactsEmailArray = [];

//temporary variable to store data from server
var localDataForContacts = null;

CURRENT_VIEW = VIEW_FIND_FRIENDS;

//Gets access to the address book and performs contact retrieval
function getAddressBookContacts(){
	var contactsAccess = Ti.Contacts.contactsAuthorization;
	if(contactsAccess == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
		readContacts();
	} else {
		Ti.Contacts.requestAuthorization(function(e){
		    if (e.success) {
		       readContacts();
		    } else {
		       alert(getLocalMessage(MSG_FIND_FRIENDS_NO_CONTACTS_ACCESS));
		    }
		});	
	}
}

//Gets and sorts the address book contacts
function readContacts(){
	//get all contacts from iphone
	people = Titanium.Contacts.getAllPeople();
	people.sort(sortByFullName);
	
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

//UI building
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
			width:131,
			height:8
		});
		findFriendsTabsAreaImage.add(findFriendsTabContactsSelection);
		
		//facebook selection bar
		findFriendsTabFacebookSelection = Titanium.UI.createView({
			backgroundColor:UI_COLOR,
			left:0,
			bottom:3,
			width:94,
			height:8
		});
		findFriendsTabsAreaImage.add(findFriendsTabFacebookSelection);
		findFriendsTabFacebookSelection.hide();
		
		//dogsquare selection bar
		findFriendsTabDogsquareSelection = Titanium.UI.createView({
			backgroundColor:UI_COLOR,
			right:0,
			bottom:3,
			width:95,
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
		findFriendsSearchContainer = Titanium.UI.createView({
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
		   	} else{
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
			backgroundColor:'eeeded',
			bottom:0,
			width:'100%',
			height:IPHONE5 ? 460 : 372
		});
		viewFindFriends.add(findFriendsFacebookView);
		
		//Connect to FB text
		var findFriendsFacebookConnectLabel = Ti.UI.createLabel({
			text:'Connect with your Facebook friends \non DOGSQUARE',
			textAlign:'center',
			color:'#756868',
			top:25,
			font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		//Connect to FB image
		var findFriendsFacebookConnectImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'follow_invite/connecting.png',
			top:88
		});
		
		//Connect to FB button
		var findFriendsFacebookConnectButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'follow_invite/Facebook_button.png',
			width:280,
			height:52,
			top:206
		});
		
		//Connect to FB event handler
		findFriendsFacebookConnectButton.addEventListener('click', function(){
			Ti.API.info('Facebook login button clicked from find friends view');
			fb.authorize();
		});
		
		findFriendsFacebookView.add(findFriendsFacebookConnectImage);
		findFriendsFacebookView.add(findFriendsFacebookConnectLabel);
		findFriendsFacebookView.add(findFriendsFacebookConnectButton);
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
		
		//Access contacts
		getAddressBookContacts();
	}
}

function sortByFullName(a, b) {
    var x = JSON.stringify(a.fullName).toUpperCase();
    var y = JSON.stringify(b.fullName).toUpperCase(); 
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

//populate FB friends
function populateFindFriendsFacebookTableView(data){
	var tableRows = [];
	
	for(var i=0; i < data.length; i++){
		var row = Ti.UI.createTableViewRow({
			className:'contactsRow',
			height:73,
			backgroundColor:'white',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
			type:TYPE_FRIENDS_ROW,
			button:'invite',
			facebook_id:data[i].id
		});
		
		var rowFriendImage = Titanium.UI.createImageView({
			image:'http://graph.facebook.com/'+data[i].id+'/picture?height=60&width=60',
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			borderRadius:30,
			borderColor:UI_COLOR,
			borderWidth:2,
			width:60,
			height:60,
			left:3,
			type:TYPE_FRIENDS_ROW,
			button:'invite'
		});
		row.add(rowFriendImage);
		
		//friend's fullname label
		var rowFullNameLabel = Titanium.UI.createLabel({
			text:data[i].name,
			color:UI_FONT_COLOR_LIGHT_BLACK,
			height:22,
			textAlign:'left',
			left:72,
			width:116,
			font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'},
			type:TYPE_FRIENDS_ROW,
			button:'invite'
		});
		row.add(rowFullNameLabel);
		
		//invite button
		var rowInviteButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'follow_invite/Invite_btn.png',
			right:9,
			width:86,
			height:29,
			type:TYPE_INVITE_FB_BUTTON
		});
		row.add(rowInviteButton);
		
		tableRows.push(row);
	}
	
	findFriendsTableView.setData(tableRows);
}

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
			type:TYPE_FRIENDS_ROW,
			button:'invite'
		});
		
		
		var rowFriendImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:3,
			type:TYPE_FRIENDS_ROW,
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
			type:TYPE_FRIENDS_ROW,
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
					
					//these exist to identify that the row is a row with a follow button
					row.button = 'follow';
					rowFriendImage.button = 'follow';
					rowFullNameLabel.button = 'follow';
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
			type:TYPE_FRIENDS_ROW
		});
		
		//friend's profile name
		var rowFriendImage = Titanium.UI.createImageView({
			image:API+'photo?user_id='+uObj[i].User.id,
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30',
			type:TYPE_FRIENDS_ROW
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
			font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'},
			type:TYPE_FRIENDS_ROW
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
		
		//these exist to identify that the row is a row with a follow button
		row.button = 'follow';
		rowFriendImage.button = 'follow';
		rowNameLabel.button = 'follow';
		
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

//handle tab clicking
function handleFindFriendsTabs(e){
	var tab = e.source.tab;
	if(tab == FACEBOOK_TAB){
		findFriendsSearchContainer.hide();
		findFriendsTabFacebookSelection.show();
		findFriendsTabContactsSelection.hide();
		findFriendsTabDogsquareSelection.hide();
		
		findFriendsTableView.hide();
		
		//Fetch facebook friends who have the app, if connected
		if(fb.loggedIn){
			Ti.API.info('FindFriends: FB connected TRUE');
			facebookGetAllFriends();
		} else {
			Ti.API.info('FindFriends: FB connected FALSE');
			findFriendsFacebookView.show();
		}
		
		
	} else if(tab == CONTACTS_TAB){
		findFriendsSearchContainer.show();
		findFriendsTabFacebookSelection.hide();
		findFriendsTabContactsSelection.show();
		findFriendsTabDogsquareSelection.hide();
		
		findFriendsTableView.show();
		findFriendsFacebookView.hide();
		
		getAddressBookContacts();
	} else if(tab == DOGSQUARE_TAB){
		findFriendsSearchContainer.show();
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
	if(e.source.type == TYPE_FRIENDS_ROW && e.source.button == 'follow'){
		
		Ti.include('ui/iphone/profile_other.js');
		
		var userId = e.row.children[2].userId;
		var nameUser = e.row.children[1].text;
		var profileOtherView = buildProfileOtherView(userId, nameUser);
		
		var profileOtherWindow = Ti.UI.createWindow({
			backgroundColor:'white',
			//barImage:IMAGE_PATH+'common/bar.png',
			translucent:false,
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
		Ti.API.info('Inviting by SMS - contact index is '+e.index);
		
		showContactPhoneNumbersSelection(e.index);
		
		
	} else if(e.source.type == TYPE_INVITE_FB_BUTTON){
		Ti.API.info('Inviting by FACEBOOK, row is '+e.index+' fb id is '+e.row.facebook_id);
		
		facebookInvitePost(e.row.facebook_id, e.index);
	}
}

//Brings up the sms dialog for the specified person/number
function showSMSDialog(recipient, msg){
	var smsDialog = smsModule.createSMSDialog({ 
	    messageBody: msg,
	    recipients:[recipient],
	    barColor: 'black'
	});

    smsDialog.open({animated: true});
}

//Brings up options with all the phone numbers for the specified contact. Input is the index of the sorted array of contacts
function showContactPhoneNumbersSelection(sortedContactIndex){
	var phoneOptions = [];
	var phoneNumbers = [];
		
	var person = people[sortedContactIndex];
	if(person != null){
		for(var temp in person.phone){
	        var temp_numbers = person.phone[temp];
	        for(var k=0;k<temp_numbers.length; k++){
	            var temp_num = temp_numbers[k] + ' ('+temp+')';
	            phoneNumbers.push(temp_numbers[k]);
	            phoneOptions.push(temp_num);
	        }
	    }
	    
	    Ti.API.info('Found '+phoneOptions.length+' phone numbers');
	    
	    if(phoneOptions.length > 0){
	    	phoneOptions.push('Cancel');
	    	
	    	var optionsDialogOpts = {
				options:phoneOptions,
				cancel:phoneOptions.length
			};
	    	
	    	//phone number options (for sms sending)
			findFriendsPhoneDialog = Titanium.UI.createOptionDialog({
				options:phoneOptions
			});
			
			findFriendsPhoneDialog.addEventListener('click',function(e){
				Ti.API.info('Clicked on '+phoneNumbers[e.index]);
				
				if(phoneNumbers != null && phoneNumbers[e.index] != null){
					showSMSDialog(phoneNumbers[e.index], INVITE_SMS_MSG);
				}
			});
			
			findFriendsPhoneDialog.show();
			
		
	    } else {
	    	alert('No phone numbers found for this contact');
	    }
	}
}

/*Gets the friends that have installed the app*/
function facebookGetFriendsWithApp(){
	if (Titanium.Network.online == true){
		
		Ti.API.warn('GETTING FB FRIENDS');
		
		var data = {};
		if(fb.loggedIn){
			fb.request('friends.getAppUsers', data,function(e) {
		    	if (e.success) {
		        	Ti.API.warn('FACEBOOK - Success in getting FB friends with Dogsquare :'+e.result);
		        	var friends = JSON.parse(e.result);
		        	
		        	var friendString = '';
		        	for(var i=0; i < friends.length; i++){
		        		friendString += friends[i];
		        		
		        		if(i < (friends.length -1)){
		        			friendString += ',';
		        		}
		        	}
		        	
		        	Ti.API.warn('FACEBOOK - Saved the FB friends list as '+friendString);
		    	} else {
		        	if (e.error) {
		         	   Ti.API.warn('FACEBOOK - ERROR in getting FB friends');
		        	} else {
		            	Ti.API.warn('FACEBOOK - UNKNOWN response in getting FB friends');
		        	}
		    	}
			});
		} 
	}
}

//Gets all the friends of the currently connected FB account
function facebookGetAllFriends(){
	var data = {};
	
	if (Titanium.Network.online == true){
		Ti.API.warn('GETTING ALL FB FRIENDS');
		if(fb.loggedIn){
			
			//progress view
			var progressView = new ProgressView({window:viewFindFriends});
			progressView.show({
				text:"Loading..."
			});
			
			fb.requestWithGraphPath('me/friends', data, "GET", function(e) {
		    	if (e.success) {
		        	
		        	var allFriends = JSON.parse(e.result);
		        	var allFriendsObject = allFriends.data;
		        	
		        	allFriendsObject.sort(sortFBFriends);
		        	Ti.API.info('FACEBOOK - Success in getting ALL friends '+allFriendsObject.length);
		        	
		        	findFriendsFacebookView.hide();
		        	populateFindFriendsFacebookTableView(allFriendsObject);
		        	findFriendsTableView.show();
		        	
		    	} else {
		        	if (e.error) {
		         	   Ti.API.info('FACEBOOK - ERROR '+e.error+' in getting ALL friends');
		        	} else {
		            	Ti.API.info('FACEBOOK - UNKNOWN response in getting ALL friends');
		        	}
		    	}
			});
			
			//Hide the progress view
			progressView.hide();
			
		} else {
			Ti.API.info('FACEBOOK - NOT logged in');
		}
	}
}

/*Posts to the current (or another) user's facebook wall*/
function facebookInvitePost(otherUserId, rowIndex){
	
	var url = otherUserId != null ? otherUserId+'/feed' : 'me/feed';
	
	var data = {
	    link : "http://www.dogsquareapp.com",
	    name : "Dogsquare",
	    message : "Hey Pack Leader!! You are invited to experience Dogsquare: the first Dog-social app that will drastically improve your loyal friend’s life. Your dog will be grateful every time you touch phone.",
	    //caption : "The ",
	    picture : SERVER+'fb_icon6.png',
	    description : "Woof your Dog!"
	};
	
	if (Titanium.Network.online == true){
		if(fb.loggedIn){
			
			//progress view
			var progressView = new ProgressView({window:viewFindFriends});
			progressView.show({
				text:"Inviting..."
			});
			
			fb.requestWithGraphPath(url, data, "POST", function(e) {
		    	if (e.success) {
		        	Ti.API.info('FACEBOOK - Success in posting message');
		        	
		        	//Show success
					progressView.change({
				        success:true
				    });
				    
				    //Update table view
				    var theRow = findFriendsTableView.data[0].rows[rowIndex];
				    theRow.children[2].backgroundImage = IMAGE_PATH+'follow_invite/invited_button.png';
					theRow.children[2].type = TYPE_ALREADY_INVITED_BUTTON;
		        	
		    	} else {
		        	if (e.error) {
		         	   Ti.API.info('FACEBOOK - ERROR in posting message');
		        	} else {
		            	Ti.API.info('FACEBOOK - UNKNOWN response in posting message');
		        	}
		        	
		        	//Show the error message we got back from the server
					progressView.change({
				        error:true,
				        text:getLocalMessage(MSG_FACEBOOK_ERROR)
				    });
		        	
		    	}
		    	
		    	//and hide it after a while		    
			    setTimeout(function() {
				    progressView.hide();
				}, ERROR_MSG_REMOVE_TIMEOUT);
			});
		} else {
			Ti.API.info('FACEBOOK - NOT logged in');
		}
	}
}