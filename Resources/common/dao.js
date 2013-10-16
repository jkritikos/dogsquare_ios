var SERVER = '';

var PRODUCTION_MODE = false;

if(!PRODUCTION_MODE){
	//UrbanAirship.key='QcPHp0gxT3-3yj5Y9aLDpA';
	//UrbanAirship.secret ='xUCXrw0xQq-8fCqXbf7NdA';
	//UrbanAirship.master_secret='qK_-SzSeQP6NA_UQ8g-ENw';
	//UrbanAirship.baseurl = 'https://go.urbanairship.com';
	//API = 'http://dev.mindthebuzz.com/api/';
	SERVER = 'http://dogsquare/';
	
} else {
	//UrbanAirship.key='W1NHMmPjR56aHc3u6nu6iA';
	//UrbanAirship.secret ='KBiUUr_mQwKYNmTXX5oVpQ';
	//UrbanAirship.master_secret='0louzaRKRLmStWwb0qEHjw';
	//UrbanAirship.baseurl = 'https://go.urbanairship.com';
	SERVER = 'http://dogsquare.veladia.com/';
}

//Determine iPhone5
var IPHONE5 = false;
if(Ti.Platform.displayCaps.platformHeight == 568){
	IPHONE5 = true;	
}

//Language constants
var LANGUAGE_ENGLISH = 1;

//Server constants
var NETWORK_TIMEOUT = 20000;
var NETWORK_RESPONSE_OK = 1;
var NETWORK_RESPONSE_ERROR = -1;

//Badges
var BADGE_TOTAL = 16;

//Various views
var VIEW_SIGNUP = 1;
var VIEW_NOTIFICATIONS = 2;
var VIEW_PROFILE = 3;
var VIEW_FEED = 4;
var VIEW_MAP = 5;
var VIEW_GALLERY = 6;
var VIEW_INBOX = 7;
var VIEW_BADGES = 8;
var VIEW_PASSPORT = 9;
var VIEW_FIND_FRIENDS = 10;
var VIEW_SETTINGS = 11;
var VIEW_PLACE_VIEW = 12;
var CHECKIN_PLACE_VIEW = 13;
var VIEW_INBOX_VIEW = 14;
var VIEW_INBOX_NEW = 15;
var VIEW_ACTIVITY_NEW = 16;
var VIEW_RUN_FINISH = 17;
var VIEW_BADGES = 18;
var VIEW_LOGIN = 19;

//our current view
var CURRENT_VIEW = null;

//Server properties
var API = SERVER + 'api/';
var REMOTE_USER_IMAGES = SERVER+'uploaded_files/users/';
var REMOTE_DOG_IMAGES = SERVER+'uploaded_files/dogs/';
var REMOTE_PLACE_IMAGES = SERVER+'uploaded_files/places/';

//Facebook connectivity (Titanium 3.1 and up)
var FB_DOG_PWD = 1234;
var FB_APP_ID = '509577672446427';
var FB_API_KEY = '667843a07b0ab0bd71aaa4c91c5ec2af';
var FB_READ_PERMISSIONS = ['read_stream'];
var FB_WRITE_PERMISSIONS = ['publish_actions','publish_stream'];
//var FB_SESSION_PROXY = 'http://api.appcelerator.net/p/fbconnect/';
var fb = require('facebook');
fb.appid = FB_APP_ID;
fb.forceDialogAuth = false;
fb.permissions = FB_READ_PERMISSIONS;

/*Facebook logout event handler*/
fb.addEventListener('logout', function(e) {
    Ti.API.info('Facebook LOGOUT event');
});

/*Facebook login event handler*/
fb.addEventListener('login', function(e) {
	
	Ti.API.info('Facebook LOGIN event');
	
	if(fb.loggedIn){
		
		//fb.reauthorize(FB_WRITE_PERMISSIONS, "friends");
		
		fb.requestWithGraphPath('me', {}, 'GET', function(e) {
    		if (e.success) {
    			Ti.API.info(e.result);
    			var jsonFBData = JSON.parse(e.result);
    			
    			var fbName = jsonFBData.name ? jsonFBData.name : null;
    			var gender = jsonFBData.gender ? jsonFBData.gender : null; 
    			var age = jsonFBData.age ? jsonFBData.age : null;
    			var fbId = jsonFBData.id;
    			var email = jsonFBData.email ? jsonFBData.email : fbId+'@facebook.com';
    			
    			Ti.API.info('FB callback: name '+fbName+' gender '+gender+' age '+age+' fbId '+fbId+' email '+email);
    			
    			if(CURRENT_VIEW == VIEW_SIGNUP){
    				Ti.API.info('FB Login from registration view');

    				//Prepare a signup object from the FB data
    				var signupObject = {
    					name:fbName,
    					followers:0,
    					following:0,
    					password:FB_DOG_PWD,
    					facebook_id:fbId,
    					age:age,
    					gender:gender,
    					email:email
    				};
    				
    				doSignup(signupObject);	
    			} else if(CURRENT_VIEW == VIEW_LOGIN){
    				Ti.API.info('FB Login from login view');
    				
    				var loginObject = {
    					email:'',
    					password:'',
    					facebook_id:fbId,
    					f:FB_DOG_PWD
    				};
    				
    				checkLoginCredentials(loginObject);
    			}
    			
    		} else if (e.error) {
        		//TODO handle error
        		alert(e.error);
    		} else {
    			//TODO handle unknown response
        		alert('Unknown response');
    		}
		});
		
	} else {
		Ti.API.info('USER **NOT** LOGGED IN TO FACEBOOK!');
	}	
});

//Returns the properties for the specified badge object
function getBadgeDetails(id){
	var badge = {};
	
	if(id == 1){
		badge = {
			title:'Puppy',
			description:'Achieved when adding a dog 1-­2 years old.',
			award:'Your puppy would like to thank you for adding it to the family of Dogsquare!'
		};
	} else if(id == 2){
		badge = {
			title:'Lazy',
			description:'When a dog from the user\'s pack doesn\'t fill the bar for 3 weeks’ time (not a single time).',
			award:'Heeeeeeeey! Get off that ugly couch and move your Dog!'
		};
	} else if(id == 3){
		badge = {
			title:'Olympian',
			description:'Achieved when a dog from the user\'s pack fills the Dog fuel bar at least 3 times a week for 4 weeks\' time.',
			award:'12 ­in a row­ dog bar fillings per month! Olympians never rest­ - keep going!'
		};
	} else if(id == 4){
		badge = {
			title:'Superfamily',
			description:'Unlocked when you add a third dog to the pack.',
			award:'That\'s a huge Dog family and we love it!'
		};
	} else if(id == 5){
		badge = {
			title:'Athletic',
			description:'Achieved when a dog from the user\'s pack fills the bar 10 times in a month.',
			award:'10 dog bar filling in a month! Twice the dog bar fillings, double the Glory!'
		};
	} else if(id == 6){
		badge = {
			title:'Crossfit',
			description:'Achieved when a dog fills the fuel bar for 6 times in 2 weeks time.',
			award:'6 bar fillings in 2 weeks!?! This badge is earned not given.'
		};
	} else if(id == 7){
		badge = {
			title:'Savior',
			description:'Unlocked when ￼tagging a homeless dog.',
			award:'You are an Angel for the homeless! Adopt one you\'re gonna lovit!'
		};
	} else if(id == 8){
		badge = {
			title:'Workie',
			description:'Achieved when user checks in at work with a dog from his dog pack.',
			award:'Oh no! You are working again? But that\'s how we progress dont forget...'
		};
	} else if(id == 9){
		badge = {
			title:'Swimmie',
			description:'Achieved when user checks in at a beach with a dog from the pack.',
			award:'Chilling at the beach, you\'re so luckyyy! We are still at the office...'
		};
	} else if(id == 10){
		badge = {
			title:'VID',
			description:'Achieved when user checks in at cafe­-bars-­restaurants with a dog from the pack',
			award:'You fancy the good life eehh? That\'s the spirit keep it on!'
		};
	} else if(id == 11){
		badge = {
			title:'Cruelty',
			description:'Unlocked when reporting a cruelty by tagging it.',
			award:'You\'re awesome. You might have saved a life!'
		};
	} else if(id == 12){
		badge = {
			title:'Godfather',
			description:'Achieved when a new dog park is added by the user.',
			award:'New Dog Park discovered! You name it Godfather!'
		};
	} else if(id == 13){
		badge = {
			title:'Rookie',
			description:'Unlocks when creating a user profile for the first time.',
			award:'Welcome to the \‘Woof your Dog\’ family!'
		};
	} else if(id == 14){
		badge = {
			title:'Superstar',
			description:'Unlocked when any of your dogs gets 20 likes from other users.',
			award:'More than 20 likes? Hi there Casanova...'
		};
	} else if(id == 15){
		badge = {
			title:'Healthy Dog',
			description:'Unlocked when you complete the Pasport Tasks.',
			award:'Your Dog would like to thank you for taking so good care of him!'
		};
	} else if(id == 16){
		badge = {
			title:'101 Dalmatians',
			description:'Achieved when reaching 101 checkins.',
			award:'Woof! You reeeaached 101 checkins!'
		};
	}
	
	return badge;
}

//Updates the global user object - only keys in obj are updated
function saveUserObject(obj){
	Ti.API.info('saveUserObject '+JSON.stringify(obj));
	
	//image
	if(typeof obj.image_path != 'undefined'){
		userObject.image_path = obj.image_path;	
	}
	
	if(typeof obj.thumb_path != 'undefined'){
		userObject.thumb_path = obj.thumb_path;	
	}
	
	if(obj.name){
		userObject.name = obj.name;	
	}
	
	if(obj.email){
		userObject.email = obj.email;	
	}
	
	if(obj.age){
		userObject.age = obj.age;	
	}
	
	if(obj.facebook_id){
		userObject.facebook_id = obj.facebook_id;	
	}
	
	if(obj.gender){
		userObject.gender = obj.gender;
	}
	
	if(obj.followers != null){
		userObject.followers = obj.followers;
	}
	
	if(obj.following != null){
		userObject.following = obj.following;
	} 
	
	if(obj.inbox != null){
		userObject.inbox = obj.inbox;
	}
	
	if(obj.userId){
		userObject.userId = obj.userId;
	}
	
	if(obj.token){
		userObject.token = obj.token;
	}
	
	if(obj.birth_date){
		userObject.birth_date = obj.birth_date;	
	}
	
	if(obj.country){
		userObject.country = obj.country;	
	}
	
	if(obj.address != null){
		userObject.address = obj.address;	
	}
	
	if(obj.newsletter){
		userObject.newsletter = obj.newsletter;	
	}
	
	if(obj.lat){
		userObject.lat = obj.lat;
	}
	
	if(obj.lon){
		userObject.lon = obj.lon;
	}
	
	Ti.App.Properties.setObject('user', userObject);
}

//Returns the persisted user object
function getUserObject(){
	var obj = {};
	if(Ti.App.Properties.getObject('user') != null){
		obj = Ti.App.Properties.getObject('user');
	}
	
	Ti.API.info('getUserObject() returns user with id '+obj.userId);
	return obj; 
}

function hello(){
	
}

//Weather retrieval from Yahoo
var weather = ( function() {
    var api = {};
    api.getWeather = function(la, lo) {
    	//alert('weather for lat '+la +' lon '+lo);
    	Ti.Yahoo.yql('select * from yahoo.maps.findLocation where q="' + la + ',' + lo + '" and gflags="R"', function(e) {
    		
    		if(e.data != null && e.data.json != null && e.data.json.ResultSet != null &&  e.data.json.ResultSet.Results != null && e.data.json.ResultSet.Results.woeid != null){
    			Ti.API.info('DATA: '+JSON.stringify(e.data));
	        	var url = 'http://weather.yahooapis.com/forecastrss?w=' + e.data.json.ResultSet.Results.woeid + '&u=c';
	        	var xhr = Ti.Network.createHTTPClient({});
	        	
	        	xhr.onload = function() {
	           		Ti.API.info('Weather: '+this.responseXML);
	        		var weather = this.responseXML.documentElement;
	        		
	        		var currentTemp = weather.getElementsByTagName('yweather:condition').item(0).getAttribute("temp");
	        		runObject.temperature = currentTemp;
	        	};
	        	
	        	xhr.open('GET', url);
	        	xhr.send();
    		} else {
    			Ti.API.error('Unable to get weather info for lat '+la+' and lon '+lo);	
    		}
    	});
    };
    return api;
}());

//Updates a dog object in the local db
function editDog(dogObject){
	var db = Ti.Database.install('dog.sqlite', 'db');
	db.execute('update dogs set photo=?, thumb=? where dog_id=?', dogObject.photo_filename, dogObject.thumb_path,dogObject.dog_id);
	db.close();
}

//Saves a dog object in the local db
function saveDog(dogObject){
	Ti.API.info('saveDog() called');
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('insert into dogs (breed_id,dog_id,name,age,weight,size,mating,gender,photo,thumb) values (?,?,?,?,?,?,?,?,?,?)', dogObject.breed_id, dogObject.dog_id, dogObject.name, dogObject.age, dogObject.weight, dogObject.size, dogObject.mating, dogObject.gender, dogObject.photo_filename, dogObject.thumb_path);
	var dogId = db.lastInsertRowId;
	db.close();
}

//edit dog in local db
function editDogLocal(dogObject){
	Ti.API.info('editDogLocal() called');
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	if(typeof dogObject.photo == 'undefined'){
		db.execute('update dogs set breed_id=?, name=?, age=?, weight=?, size=?, mating=?, gender=? where dog_id=?', dogObject.breed_id, dogObject.name, dogObject.age, dogObject.weight, dogObject.size, dogObject.mating, dogObject.gender, dogObject.dog_id);
	}else{
		db.execute('update dogs set breed_id=?, name=?, age=?, weight=?, size=?, mating=?, gender=?, photo=?, thumb=? where dog_id=?', dogObject.breed_id, dogObject.name, dogObject.age, dogObject.weight, dogObject.size, dogObject.mating, dogObject.gender, dogObject.photo_filename, dogObject.thumb_path, dogObject.dog_id);
	}
	
	db.close();
}

//Saves a note object in the local db
function saveNote(nObject){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('insert into passport (title, note_id, description, date, remind_flag, completed) values (?,?,?,?,?,?)', nObject.title, nObject.note_id, nObject.description, nObject.date, nObject.remind_flag, nObject.completed);
	var noteId = db.lastInsertRowId;
	
	Ti.API.info('note stored in DB with id: ' + noteId);
	
	db.close();
}

//Gets all dogs from the local db
function getDogs(){
	var dbDogObject = {};
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	var dogRows = [];
	
	var rows = db.execute('select dog_id, name, photo, thumb, breed_id from dogs ');
	while (rows.isValidRow()) {

	  	var obj = {
	  		dog_id:rows.field(0),
			name:rows.field(1),
			photo:rows.field(2),
			thumb_path:rows.field(3),
			breed_id:rows.field(4)
		};
		
	  	dogRows.push(obj);	
	  	rows.next();
	}
	
	rows.close();
	db.close();
	
	return dogRows;
}

//Gets dog from the local db by id
function getDogById(dogId){
	var dbDogObject = {};
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	var dogRows = [];
	
	var rows = db.execute('select d.dog_id, d.name, d.photo, d.weight, d.gender, d.age, d.breed_id, db.name, d.size, d.mating , d.thumb from dogs d inner join dog_breeds db on (d.breed_id=db.id) where d.dog_id=?', dogId);

	while (rows.isValidRow()) {

	  	var obj = {
	  		id:rows.field(0),
			name:rows.field(1),
			photo:rows.field(2),
			weight:rows.field(3),
			gender:rows.field(4),
			age:rows.field(5),
			breed_id:rows.field(6),
			breed:rows.field(7),
			size:rows.field(8),
			mating:rows.field(9),
			thumb:rows.field(10)
		};
		
	  	dogRows.push(obj);	
	  	rows.next();
	}
	
	rows.close();
	db.close();
	
	return dogRows;
}

//delete local db dog
function deleteDog(dog_id){
	Ti.API.info('deleteDog() called');
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('delete from dogs where dog_id=?', dog_id);
	
	db.close();
}

//Gets all notes from the local db
function getNotes(){
	var dbNoteObject = {};
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var noteRows = [];
	
	var rows = db.execute('select title, description, date, remind_flag, completed, note_id from passport order by date');
	var i=0;
	while (rows.isValidRow())
	{
		
	  var title = rows.field(0);
	  var description = rows.field(1);
	  var date = rows.field(2);
	  var month = new Date(date*1000).getMonth();
	  var remind_flag = rows.field(3);
	  var completed = rows.field(4);
	  var note_id = rows.field(5);
	  
	  var obj = {
			title:title,
			description:description,
			date:date,
			remind_flag:remind_flag,
			completed:completed,
			note_id:note_id
		};
	
		noteRows.push(obj);
		rows.next();
	}
	rows.close();
	db.close();
	
	return noteRows;
}

//Gets all notes from the local db
function getNote(id){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var row = db.execute('select title, description, date, remind_flag, completed from passport where note_id = ?', id);
	
    var title = row.field(0);
    var description = row.field(1);
    var date = row.field(2);
    var remind_flag = row.field(3);
    var completed = row.field(4);
  
    var noteObj = {
		title:title,
		description:description,
		date:date,
		remind_flag:remind_flag,
		completed:completed
	};
	
	row.close();
	db.close();
	
	return noteObj;
}

//update db note
function updateNote(noteObj, noteId){
	Ti.API.info('updateNote() called');
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('update passport set title=?, description=?, date=?, remind_flag=?, completed=? where note_id=?', noteObj.title, noteObj.description, noteObj.date, noteObj.remind_flag, noteObj.completed, noteId);
	
	db.close();
}

//delete local db note
function deleteNote(note_id){
	Ti.API.info('deleteNote() called');
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('delete from passport where note_id=?', note_id);
	
	db.close();
}

//save user whom you follow, in web database
function followUser(uId, button, win){
	Ti.API.info('followUser() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in followUser() '+e);
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			if(win == 1){
				button.backgroundImage = IMAGE_PATH+'follow_invite/Unfollow_btn.png';
			}else if(win == 2){
				button.backgroundImage = IMAGE_PATH+'profile_other/Unfollow_button.png';
			}
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'followUser');
	xhr.send({
		user_id:userObject.userId,
		follow_user:uId,
		token:userObject.token
	});
}

//Sends a message to a remote user and stores it locally upon server callback
function sendMessageToUser(id, name, message, view){
	Ti.API.info('sendMessageToUser() called. Sender id: '+userObject.userId+' sender name '+name+' message: '+message);
	
	var date = new Date().getTime();
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in sendMessageToUser() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('sendMessageToUser() got back from server '+this.responseText);
		
		var jsonData = JSON.parse(this.responseText);
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			Ti.API.info('sendMessageToUser() got back message_id '+jsonData.data.message_id);
			
			//Save to our local db
			var messageObject = {
				user_from_id:id,
				user_from_name:name,
				my_message:1,
				read:1,
				created:date,
				message:message
			};
			
			saveInboxMessage(messageObject);
			
			if(view == VIEW_INBOX_VIEW){
				appendRowInboxViewTableView(date, message);
			}else if(view == VIEW_INBOX_NEW){
				appendRowInboxNewTableView(date, message);
			}
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		}
	};
	
	xhr.open('POST',API+'sendMessage');
	
	xhr.send({
		user_id:userObject.userId,
		target_id:id,
		message:message,
		token:userObject.token
	});
}

//unfollow user
function unfollowUser(uId, button, win){
	Ti.API.info('unfollowUser() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in unfollowUser() '+e);
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			if(win == 1){
				button.backgroundImage = IMAGE_PATH+'follow_invite/Follow_btn.png';
			}else if(win == 2){
				button.backgroundImage = IMAGE_PATH+'profile_other/Follow_button.png';
			}
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'unfollowUser');
	xhr.send({
		user_id:userObject.userId,
		follow_user:uId,
		token:userObject.token
	});
}

//Gets all followers of the user
function getFollowers(uId){
	Ti.API.info('getFollowers() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getFollowers() '+e);
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateListUsersTableView(jsonData.data);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('GET',API+'getFollowers');
	xhr.send({
		user_id:userObject.userId,
		target_id:uId,
		token:userObject.token
	});
}

//Gets all users who follow the user
function getFollowing(uId){
	
	Ti.API.info('getFollowing() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getFollowing() '+e);
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateListUsersTableView(jsonData.data);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.open('GET',API+'getFollowing');
	xhr.send({
		user_id:userObject.userId,
		target_id:uId,
		token:userObject.token
	});
}

//Saves an activity to the local db
function saveActivity(dogs){
	var now = new Date().getTime();
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	//activity
	db.execute('insert into activities (start_date,start_time,type_id) values (date(),?,1)',now);
	var activityId = db.lastInsertRowId;
	
	//dogs
	if(dogs != null){
		for(var i=0; i < dogs.length; i++){
			Ti.API.info('saveActivity() for dog '+dogs[i]);
			db.execute('insert into activity_dogs (activity_id, dog_id) values (?,?)', activityId,dogs[i]);
		}
	}
	
	db.close();
	
	Ti.API.info('saveActivity() returns activity id '+activityId);
	return activityId;
}

//Sets the server activity id for the specified local id
function updateActivityRemoteId(localId, remoteId){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('update activities set activity_id=? where id=?',remoteId,localId);
	
	db.close();
	Ti.API.info('updateActivityRemoteId() updated local activity_id '+localId+' with remote id '+remoteId);
}

//Saves an activity, related dogs and coordinates to the remote db
function saveActivityOnline(id){
	Ti.API.info('saveActivityOnline() called for local activity_id '+id);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	var activityObject = getActivity(id);
	var coordinates = getActivityCoordinates(id);
	var dogs = activityObject.dogs;
	
	Ti.API.info('saveActivityOnline() sends coordinates array with length '+coordinates.length+' and dogs array with length '+dogs.length);
	
	//extract data from the local object
	var coordinates = JSON.stringify(coordinates);
	var dogs = JSON.stringify(dogs);
	var startDate = activityObject.start_date;
	var startTime = activityObject.start_time;	
	var endTime = activityObject.end_time;
	var duration = activityObject.duration;
	var temperature = activityObject.temperature;
	var pace = activityObject.pace;
	var distance = activityObject.distance;
	
	xhr.onerror = function(e){
		Ti.API.error('ERROR in saveActivityOnline()');
	};
	
	xhr.onload = function(e){
		Ti.API.info('saveActivityOnline() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			var activity_id = jsonData.data.activity_id;
			
			Ti.App.fireEvent('activity', {activityId:activity_id});
			
			//Update local activity with its remote id
			if(activity_id != null){
				updateActivityRemoteId(id, activity_id);
			}
		}
	};
	
	xhr.open('POST',API+'saveActivity');
	xhr.send({
		user_id:userObject.userId,
		coordinates:coordinates,
		dogs:dogs,
		start_date:startDate,
		start_time:startTime,
		end_time:endTime,
		duration:duration,
		temperature:temperature,
		pace:pace,
		distance:distance
	});
}

//Updates an activity in the local db
function endActivity(obj){
	var now = new Date().getTime();
	
	Ti.API.info('updateActivity() called for activity id '+obj.activity_id);
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('update activities set end_time=?, temperature=?, pace=?,distance=? where id=?',now,obj.temperature,obj.pace,obj.distance,obj.activity_id);
	
	db.close();
	
	saveActivityOnline(obj.activity_id);
}

//Returns a list of all the user activities
function getActivities(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var activities = [];
	
	var sql = 'select id,start_date, start_time, end_time,type_id, activity_id from activities order by id desc';
	var rows = db.execute(sql);
	while (rows.isValidRow()){
		
		var duration = rows.field(3) - rows.field(2);
		
		var obj = {
			id:rows.field(0),
			start_date:rows.field(1),
			start_time:rows.field(2),
			end_time:rows.field(3),
			activity_id:rows.field(5),
			duration:duration,
			dogs:getActivityDetails(rows.field(0))
		};
		
		activities.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	return activities;
}

//Returns all the data for the specified activity
function getActivity(id){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var obj = null;
	
	var sql = 'select id, start_date, start_time, end_time,type_id,temperature,pace,distance, activity_id from activities where id=?';
	var rows = db.execute(sql,id);
	while (rows.isValidRow()){
		
		var duration = rows.field(3) - rows.field(2);
		
		obj = {
			id:rows.field(0),
			start_date:rows.field(1),
			start_time:rows.field(2),
			end_time:rows.field(3),
			type_id:rows.field(4),
			duration:duration,
			temperature:rows.field(5),
			pace:rows.field(6),
			distance:rows.field(7),
			activity_id:rows.field(8),
			dogs:getActivityDetails(rows.field(0)),
			path:getActivityCoordinates(rows.field(0))
		};
		
		rows.next();
	}
	
	rows.close();
	db.close();
	
	return obj;
}

//Returns the dog related info for the specified activity
function getActivityDetails(id){
	//Ti.API.info('getActivityDetails() called for activity '+id);
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var info = [];
	
	var sql = 'select ad.dog_id, d.name, d.photo from activity_dogs ad inner join dogs d on (ad.dog_id=d.dog_id) where ad.activity_id=?';
	var rows = db.execute(sql, id);
	while (rows.isValidRow()){
		
		//Ti.API.info('Found dog '+rows.field(0)+' for activity '+id);
		
		var obj = {
			dog_id:rows.field(0),
			name:rows.field(1),
			photo:rows.field(2)
		};
		
		info.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	return info;
}

//Server call for saving activity comments
function doSaveActivityCommentOnline(comObj, view){
	Ti.API.info('doSaveActivityCommentOnline() called with commentObject='+comObj); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSaveActivityCommentOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSaveActivityCommentOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			Ti.API.info('doSaveActivityCommentOnline() got back comment id from server '+jsonData.data.comment_id);
			
			comObj.comment_id = jsonData.data.comment_id;
			
			var date = jsonData.data.date;
			var message = comObj.comment;
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			if(view == VIEW_ACTIVITY_NEW){
				appendCommentActivityTableView(date, message);
			}else if(view == VIEW_RUN_FINISH){
				appendCommentFinishTableView(date, message);
			}
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('POST',API+'addActivityComment');
	xhr.send({
		user_id:userObject.userId,
		comment:comObj.comment,
		activity_id:comObj.activity_id,
		token:userObject.token
	});
}

//Calculates the dogfuel earned by the specified activity
function calculateDogfuel(activityId){
	Ti.API.info('calculateDogfuel() called for activity '+activityId);
	
	//10 meters
	var PLAYTIME_THRESHOLD = 0.002;
	var coordinateData = getActivityCoordinates(activityId);
	var previousRowDistance = 0;
	var currentRowDistance = 0;
	
	var totalWalkDistance = 0;
	var totalPlaytime = 0;
	
	var debug = '';
	for(var i=0; i < coordinateData.length; i++){
		
		//Distance from previous row
		if(i > 0){
			previousRowDistance = coordinateData[i-1].distance;
		} else {
			previousRowDistance = 0;
		}
		
		currentRowDistance = coordinateData[i].distance - previousRowDistance;
		var currentDistanceFormated = parseFloat(currentRowDistance.toFixed(3));
		
		if(coordinateData[i].distance != null){
			if(currentDistanceFormated > PLAYTIME_THRESHOLD){
				Ti.API.info('      *** '+currentDistanceFormated+' is > than '+PLAYTIME_THRESHOLD+' - so, counting this row as WALK');
				debug += '      *** '+currentDistanceFormated+' is > than '+PLAYTIME_THRESHOLD+' - so, counting this row as WALK';
				totalWalkDistance += currentDistanceFormated;	
			} else {
				Ti.API.info('      *** '+currentDistanceFormated+' is <= than '+PLAYTIME_THRESHOLD+' - so, counting this row as PLAY');
				debug += '      *** '+currentDistanceFormated+' is <= than '+PLAYTIME_THRESHOLD+' - so, counting this row as PLAY';
				totalPlaytime += coordinateData[i].dt;
			}
		} else {
			Ti.API.info(' *** Null distance for row '+i);
		}
		
		Ti.API.info(' *** Checkpoint: lat: '+coordinateData[i].lat+' lon '+coordinateData[i].lon+ ' total distance '+coordinateData[i].distance+' - Did '+currentDistanceFormated+' in '+coordinateData[i].dt+' ms');
	}
	
	alert(debug);
	Ti.API.info(' *** totalWalkDistance '+totalWalkDistance+' Km, totalPlaytime '+totalPlaytime+' ms');
	alert(' *** totalWalkDistance '+totalWalkDistance+' Km, totalPlaytime '+totalPlaytime+' ms');
	
	return null;
}

//Saves the specified coordinates for this activity
function saveActivityCoordinates(activityId, lat, lon, t, Dt, d){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('insert into activity_coordinates (activity_id, lat, lon, log_time, dt, distance) values (?,?,?,?,?,?)',activityId, lat, lon, t, Dt, d);
	
	db.close();
}

//Returns the activity coordinates for this activity
function getActivityCoordinates(activityId){
	var db = Ti.Database.install('dog.sqlite', 'db');
	var data = [];
	
	var rows = db.execute('select lat,lon,log_time,dt,distance from activity_coordinates where activity_id=? order by log_time', activityId);
	
	while (rows.isValidRow()){
		var obj = {
			lat:rows.field(0),
			lon:rows.field(1),
			log_time:rows.field(2),
			dt:rows.field(3),
			distance:rows.field(4)
		};
		
		data.push(obj);
		rows.next();
	}
	
	db.close();
	
	return data;
}

//Stores a notification object to local
function saveNotification(obj){
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	Ti.API.info('saveNotification() called');
	db.execute('insert into notifications (user_from_id, user_from_name, type_id, read, activity_id, date, user_from_thumb, badge_id) values (?,?,?,0,?,?,?,?)',obj.user_from, obj.name, obj.type_id, obj.activity_id, obj.created, obj.thumb, obj.badge_id);
	db.close();
	
	Ti.API.info('saveNotification() saved notification locally');
}

//sets notification to read
function setNotificationToRead(notId){
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	Ti.API.info('setNotificationToRead() called');
	db.execute('update notifications set read = 1 where id = ?', notId);
	db.close();
	
	Ti.API.info('setNotificationToRead() changed notification id:'+ notId +' to read: 1');
}

//get all local notifications
function getNotifications(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var notificationRows = [];
	
	var rows = db.execute('select id, user_from_id, user_from_name, type_id, read, activity_id, date, user_from_thumb, badge_id from notifications order by date desc');
	var i=0;
	while (rows.isValidRow()){
		
		var obj = {
  			id:rows.field(0),
			user_from:rows.field(1),
			name:rows.field(2),
			type_id:rows.field(3),
			read:rows.field(4),
			activity_id:rows.field(5),
			created:rows.field(6),
			thumb:rows.field(7),
			badge_id:rows.field(8)
		};
	
		notificationRows.push(obj);
		rows.next();
	}
	rows.close();
	db.close();
	
	return notificationRows;
}

//Stores a message object to our local inbox
function saveInboxMessage(obj){
	var db = Ti.Database.install('dog.sqlite', 'db');
	Ti.API.info('saveInboxMessage() called with remote_user_name '+obj.user_from_name);
	db.execute('insert into inbox (remote_user_id, remote_user_name, my_message, read, date, message) values (?,?,?,?,?,?)',obj.user_from_id, obj.user_from_name, obj.my_message, obj.read, obj.created, obj.message);
	db.close();
	
	Ti.API.info('saveInboxMessage() saved message locally');
}

//sets inbox messages to read in local
function setMessagesToRead(list){
	var db = Ti.Database.install('dog.sqlite', 'db');
	Ti.API.info('setMessagesToRead() called');
	db.execute('update inbox set read = 1 where id in (' + list + ') and read = 0');
	db.close();
	
	Ti.API.info('setMessagesToRead() changed messages with id:'+ list +' to read: 1');
}

//delete local db note
function deleteMessages(userId){
	Ti.API.info('deleteMessages() called');
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('delete from inbox where remote_user_id=?', userId);
	
	db.close();
}

//Returns all messages from our inbox
//TODO order by id and group by remote_user_id - get latest message of each user
function getInboxMessages(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var messagesRows = [];
	
	var rows = db.execute('select i.remote_user_id, i.remote_user_name, i.date, i.message , i.my_message, i.read from inbox i where i.date = (select max(i2.date) from inbox i2 where i.remote_user_id = i2.remote_user_id)');
	var i=0;
	while (rows.isValidRow())
	{
		
	  var user_id = rows.field(0);
	  var name = rows.field(1);
	  var date = rows.field(2);
	  var message = rows.field(3);
	  var my_message = rows.field(4);
	  var read = rows.field(5);
	  
	  var obj = {
			user_id:user_id,
			name:name,
			date:date,
			message:message,
			my_message:my_message,
			read:read
		};
	
		messagesRows.push(obj);
		rows.next();
	}
	rows.close();
	db.close();
	
	return messagesRows;
}

//Returns all messages from from a specific user
function getInboxMessagesByUserId(userId){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var messagesRows = [];
	
	var rows = db.execute('select date, my_message, message, remote_user_name, id, read from inbox where remote_user_id = ? order by date asc', userId);
	
	while (rows.isValidRow())
	{
		
	  var date = rows.field(0);
	  var my_message = rows.field(1);
	  var message = rows.field(2);
	  var name = rows.field(3);
	  var id = rows.field(4);
	  var read = rows.field(5);
	  
	  var obj = {
	  		id:id,
			date:date,
			my_message:my_message,
			message:message,
			name:name,
			read:read
		};
	
		messagesRows.push(obj);
		rows.next();
	}
	rows.close();
	db.close();
	
	return messagesRows;
}

//Updates the local db with the user's mutual followers
function saveMutualFollowers(obj){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	if(obj !=  null && obj.length > 0){
		db.execute('delete from mutual_followers');
		
		for(i=0; i < obj.length; i++){
			db.execute('insert into mutual_followers (user_id, name, thumb) values (?,?,?)', obj[i].User.id, obj[i].User.name, obj[i].User.thumb);
		}
	
		Ti.API.info('saveMutualFollowers() saved '+obj.length+' rows');
	} else {
		Ti.API.info('saveMutualFollowers() NO data to save');
	}
	
	db.close();
}

//Updates the local db with the user's mutual followers
function searchMutualFollowers(name){
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	var mutualFollowerRows = [];
	
	var rows = db.execute("select user_id, name, thumb from mutual_followers where name like \'%" + name + "%\'");
	while (rows.isValidRow()) {

	  	var obj = {
	  		user_id:rows.field(0),
			name:rows.field(1),
			thumb:rows.field(2)
		};
		
	  	mutualFollowerRows.push(obj);	
	  	rows.next();
	}
	
	rows.close();
	db.close();
	
	return mutualFollowerRows;
}

//Updates the local db with the list of dog breeds
function saveDogBreeds(obj){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	if(obj !=  null && obj.length > 0){
		db.execute('delete from DOG_BREEDS');
		
		for(i=0; i < obj.length; i++){
			//Ti.API.info('saveDogBreeds() saving breed '+obj[i].DogBreed.name+' with id '+obj[i].DogBreed.id);
			
			//TODO FIX UTF-8 char problem
			if(!isStringNullOrEmpty(obj[i].DogBreed.name)){
				db.execute('insert into DOG_BREEDS (id,name, origin, weight_from, weight_to, kennel_club, active) values (?,?,?,?,?,?,?)', obj[i].DogBreed.id,obj[i].DogBreed.name,obj[i].DogBreed.origin,obj[i].DogBreed.weight_from,obj[i].DogBreed.weight_to,obj[i].DogBreed.kennel_club,obj[i].DogBreed.active);
			}
		}
	
		Ti.API.info('saveDogBreeds() saved '+obj.length+' rows');
	} else {
		Ti.API.info('saveDogBreeds() NO data to save');
	}
	
	db.close();
}

function getDogBreeds(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	var breedRows = [];
	
	var rows = db.execute('select id, name, origin, weight_from, weight_to, kennel_club, active from dog_breeds order by name');
	
	while(rows.isValidRow()) {
	  	var obj = {
	  		id:rows.field(0),
			name:rows.field(1),
			origin:rows.field(2),
			weight_from:rows.field(3),
			weight_to:rows.field(4),
			kennel_club:rows.field(5),
			active:rows.field(6)
		};
		
	  	breedRows.push(obj);	
	  	rows.next();
	}
	rows.close();
	db.close();
	return breedRows;
}

//Updates the local db with the list of place categories
function savePlaceCategories(obj){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	if(obj !=  null && obj.length > 0){
		db.execute('delete from PLACE_CATEGORIES');
		
		for(i=0; i < obj.length; i++){
			Ti.API.info('savePlaceCategories() saved category '+obj[i].PlaceCategory.id);
			db.execute('insert into PLACE_CATEGORIES (id, name, active) values (?,?,?)', obj[i].PlaceCategory.id, obj[i].PlaceCategory.name, obj[i].PlaceCategory.active);
		}
	
		Ti.API.info('savePlaceCategories() saved '+obj.length+' rows');
	} else {
		Ti.API.info('savePlaceCategories() NO data to save');
	}
	
	db.close();
}

//Updates the local db with the latest list of countries
function saveCountries(obj){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	if(obj !=  null && obj.length > 0){
		db.execute('delete from COUNTRIES');
		
		for(i=0; i < obj.length; i++){
			Ti.API.info('saveCountries() saved country '+obj[i].Country.id);
			db.execute('insert into COUNTRIES (id, name, active) values (?,?,?)', obj[i].Country.id, obj[i].Country.name, obj[i].Country.active);
		}
	
		Ti.API.info('saveCountries() saved '+obj.length+' rows');
	} else {
		Ti.API.info('saveCountries() NO data to save');
	}
	
	db.close();
}

function getPlaceCategories(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	var categoryRows = [];
	
	var rows = db.execute('select id, name, active from place_categories');
	
	while(rows.isValidRow()) {
	  	var obj = {
	  		id:rows.field(0),
			name:rows.field(1),
			active:rows.field(2)
		};
		
	  	categoryRows.push(obj);	
	  	rows.next();
	}
	rows.close();
	db.close();
	
	return categoryRows;
}

// get all countries from local db
function getCountries(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	var countryRows = [];
	
	var rows = db.execute('select id, name, active from countries');
	
	while(rows.isValidRow()) {
	  	var obj = {
	  		id:rows.field(0),
			name:rows.field(1),
			active:rows.field(2)
		};
		
	  	countryRows.push(obj);	
	  	rows.next();
	}
	rows.close();
	db.close();
	
	return countryRows;
}

//get country name by id for edit profile view
function getCountryById(id){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var rows = db.execute('select name from countries where id=?', id);
	
	while(rows.isValidRow()) {
	  	var name = rows.field(0);
	  	rows.next();
	}
	rows.close();
	db.close();
	
	return name;
}

//Updates the local db with the list of dogfuel rules
function saveDogfuelRules(obj){
	
}

//Cleans the local database
function cleanDB(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('delete from DOGS');
	db.execute('delete from ACTIVITIES');
	db.execute('delete from ACTIVITY_DOGS');
	db.execute('delete from ACTIVITY_COORDINATES');
	db.execute('delete from PASSPORT');
	db.execute('delete from INBOX');
	db.execute('delete from DOG_BREEDS');
	db.execute('delete from COUNTRIES');
	db.execute('delete from MUTUAL_FOLLOWERS');
	db.execute('delete from NOTIFICATIONS');
	
	db.close();
	Ti.API.info('cleanDB() ends');
}

//Creates the local database
function createDB(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('create table if not exists DOGFUEL_RULES (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"breed_id\" integer, \"user_id\" integer,\"walk_distance\" integer, \"playtime\" integer )');
	db.execute('create table if not exists DOGS (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"breed_id\" integer, \"dog_id\" integer, \"name\" varchar(128), \"age\" integer, \"weight\" integer, \"size\" integer, \"mating\" integer, \"gender\" integer, \"photo\" varchar(128), \"thumb\" varchar(128))');
	db.execute('create table if not exists ACTIVITIES (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"start_date\" real, \"start_time\" real, \"end_time\" real, \"type_id\" integer, \"temperature\" integer, \"pace\" real, \"distance\" real, \"activity_id\" integer, \"sync\" integer)');
	db.execute('create table if not exists ACTIVITY_DOGS (\"activity_id\" integer, \"dog_id\" integer, \"walk_distance\" real, \"playtime\" integer, \"dogfuel\" integer)');
	db.execute('create table if not exists ACTIVITY_COORDINATES (\"activity_id\" integer, \"lat\" real, \"lon\" real, \"log_time\" real, \"dt\" real, \"distance\" real)');
	db.execute('create table if not exists PASSPORT (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"title\" varchar(128), \"note_id\" integer, \"description\" varchar(128), \"date\" real, \"remind_flag\" integer, \"completed\" integer)');
	db.execute('create table if not exists INBOX (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"remote_user_id\" integer, \"remote_user_name\" varchar(128), \"remote_user_thumb\" varchar(128), \"my_message\" integer, \"read\" integer, \"date\" real, \"message\" text)');
	db.execute('create table if not exists DOG_BREEDS (\"id\" INTEGER PRIMARY KEY, \"name\" varchar(256), \"origin\" varchar(256), \"weight_from\" integer, \"weight_to\" integer, \"kennel_club\" varchar(256), \"active\" integer)');
	db.execute('create table if not exists MUTUAL_FOLLOWERS (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"user_id\" integer, \"name\" varchar(256),\"thumb\" varchar(128))');
	db.execute('create table if not exists PLACE_CATEGORIES (\"id\" INTEGER PRIMARY KEY, \"name\" varchar(256), \"active\" integer)');
	db.execute('create table if not exists COUNTRIES (\"id\" INTEGER PRIMARY KEY, \"name\" varchar(256), \"active\" integer)');
	db.execute('create table if not exists NOTIFICATIONS (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"user_from_id\" integer, \"user_from_name\" varchar(256), \"type_id\" integer, \"read\" integer, \"activity_id\" integer, \"badge_id\" integer, \"date\" real, \"user_from_thumb\" varchar(128))');
	//db.execute('create table if not exists INBOX (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"user_from\" integer, \"user_to\" integer, \"date\" real, \"message\" text)');
	
	db.close();
	Ti.API.info('createDB() ends');
}
