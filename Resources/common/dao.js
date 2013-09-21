var SERVER = '';

var PRODUCTION_MODE = true;

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

//Server properties
var API = SERVER + 'api/';
var REMOTE_USER_IMAGES = SERVER+'uploaded_files/users/';
var REMOTE_DOG_IMAGES = SERVER+'uploaded_files/dogs/';
var REMOTE_PLACE_IMAGES = SERVER+'uploaded_files/places/';

//Facebook connectivity (Titanium 3.1 and up)
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
    			var email = jsonFBData.email ? jsonFBData.email : null;
    			
    			Ti.API.info('FB callback: name '+fbName+' gender '+gender+' age '+age+' fbId '+fbId+' email '+email);
    			
    			if(currentDogView == VIEW_SIGNUP){
    				
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

//Language constants
var LANGUAGE_ENGLISH = 1;

//Server constants
var NETWORK_TIMEOUT = 20000;
var NETWORK_RESPONSE_OK = 1;
var NETWORK_RESPONSE_ERROR = -1;

//Updates the global user object - only keys in obj are updated
function saveUserObject(obj){
	Ti.API.info('saveUserObject '+JSON.stringify(obj));
	//image
	if(obj.image_path){
		userObject.image_path = obj.image_path;	
	}
	
	if(obj.thumb_path){
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
        	var url = 'http://weather.yahooapis.com/forecastrss?w=' + e.data.ResultSet.Results.woeid + '&u=c';
        	var xhr = Ti.Network.createHTTPClient({});
        	
        	xhr.onload = function() {
           
        		var weather = this.responseXML.documentElement;
        		
        		var currentTemp = weather.getElementsByTagName('yweather:condition').item(0).getAttribute("temp");
        		runObject.temperature = currentTemp;
        	};
        	
        	xhr.open('GET', url);
        	xhr.send();
    	});
    };
    return api;
}());

//Saves a dog object in the local db
function saveDog(dogObject){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('insert into dogs (breed_id,dog_id,name,age,weight,mating,gender,photo,thumb) values (?,?,?,?,?,?,?,?,?)', dogObject.breed_id, dogObject.dog_id, dogObject.name, dogObject.age, dogObject.weight, dogObject.mating, dogObject.gender, dogObject.photo_filename, dogObject.thumb_path);
	var dogId = db.lastInsertRowId;
	db.close();
}

//Saves a note object in the local db
function saveNote(nObject){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('insert into passport (title, description, date, remind_flag) values (?,?,?,?)', nObject.title, nObject.description, nObject.date, nObject.remind_flag);
	var noteId = db.lastInsertRowId;
	
	Ti.API.info('note stored in DB with id: ' + noteId);
	
	db.close();
}

//Gets all dogs from the local db
function getDogs(){
	var dbDogObject = {};
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	var dogRows = [];
	
	var rows = db.execute('select dog_id, name, photo, thumb from dogs ');
	while (rows.isValidRow()) {

	  	var obj = {
	  		dog_id:rows.field(0),
			name:rows.field(1),
			photo:rows.field(2),
			thumb_path:rows.field(3)
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
	
	var rows = db.execute('select dog_id, name, photo, weight, gender, age, breed_id from dogs where dog_id=?', dogId);
	while (rows.isValidRow()) {

	  	var obj = {
	  		id:rows.field(0),
			name:rows.field(1),
			photo:rows.field(2),
			weight:rows.field(3),
			gender:rows.field(4),
			age:rows.field(5),
			breed_id:rows.field(6),
		};
		
	  	dogRows.push(obj);	
	  	rows.next();
	}
	
	rows.close();
	db.close();
	
	return dogRows;
}

//Gets all notes from the local db
function getNotes(){
	var dbNoteObject = {};
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var noteRows = [];
	
	var rows = db.execute('select title, description, date, remind_flag from passport order by date');
	var i=0;
	while (rows.isValidRow())
	{
		
	  var title = rows.field(0);
	  var description = rows.field(1);
	  var date = rows.field(2);
	  var month = new Date(date*1000).getMonth();
	  var remind_flag = rows.field(3);
	  
	  var obj = {
			title:title,
			description:description,
			date:date,
			remind_flag:remind_flag,
		};
	
		noteRows.push(obj);
		rows.next();
	}
	rows.close();
	db.close();
	
	return noteRows;
}

//save user whom you follow, in web database
function followUser(uId, button, win){
	Ti.API.info('saveFollowingUser() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
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
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'followUser');
	xhr.send({
		user_id:userObject.userId,
		follow_user:uId
	});
}

//unfollow user
function unfollowUser(uId, button, win){
	Ti.API.info('unfollowUser() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
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
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'unfollowUser');
	xhr.send({
		user_id:userObject.userId,
		follow_user:uId
	});
}

//Gets all followers of the user
function getFollowers(uId){
	Ti.API.info('getFollowers() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateListUsersTableView(jsonData.data);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('GET',API+'getFollowers');
	xhr.send({
		user_id:userObject.userId,
		target_id:uId
	});
}

//Gets all users who follow the user
function getFollowing(uId){
	
	Ti.API.info('getFollowing() called');
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			populateListUsersTableView(jsonData.data);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('GET',API+'getFollowing');
	xhr.send({
		user_id:userObject.userId,
		target_id:uId
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
	Ti.API.info('getActivityDetails() called for activity '+id);
	
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var info = [];
	
	var sql = 'select ad.dog_id, d.name, d.photo from activity_dogs ad inner join dogs d on (ad.dog_id=d.dog_id) where ad.activity_id=?';
	var rows = db.execute(sql, id);
	while (rows.isValidRow()){
		
		Ti.API.info('Found dog '+rows.field(0)+' for activity '+id);
		
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

//Saves the specified coordinates for this activity
function saveActivityCoordinates(activityId, lat, lon){
	var now = new Date().getTime();
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('insert into activity_coordinates (activity_id, lat, lon, log_time) values (?,?,?,?)',activityId, lat, lon, now);
	
	db.close();
}

//Returns the activity coordinates for this activity
function getActivityCoordinates(activityId){
	var db = Ti.Database.install('dog.sqlite', 'db');
	var data = [];
	
	var rows = db.execute('select lat,lon,log_time from activity_coordinates where activity_id=? order by log_time', activityId);
	
	while (rows.isValidRow()){
		var obj = {
			lat:rows.field(0),
			lon:rows.field(1),
			log_time:rows.field(2)
		};
		
		data.push(obj);
		rows.next();
	}
	
	db.close();
	
	return data;
}

//Stores a message object to our local inbox
function saveInboxMessage(obj){
	var db = Ti.Database.install('dog.sqlite', 'db');
	db.execute('insert into inbox (remote_user_id, remote_user_name, my_message, read, date, message) values (?,?,?,?,?,?)',obj.user_from_id, obj.user_from_name, obj.my_message, obj.read, obj.created, obj.message);
	db.close();
	
	Ti.API.info('saveInboxMessage() saved message locally');
}

//Returns all messages from our inbox
//TODO order by id and group by remote_user_id - get latest message of each user
function getInboxMessages(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var messagesRows = [];
	
	var rows = db.execute('select i.remote_user_id, i.remote_user_name, i.date, i.message from inbox i where i.date = (select max(i2.date) from inbox i2 where i.remote_user_id = i2.remote_user_id)');
	var i=0;
	while (rows.isValidRow())
	{
		
	  var user_id = rows.field(0);
	  var name = rows.field(1);
	  var date = rows.field(2);
	  var message = rows.field(3);
	  
	  var obj = {
			user_id:user_id,
			name:name,
			date:date,
			message:message,
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
	
	var rows = db.execute('select date, my_message, message from inbox where remote_user_id = ? order by date asc', userId);
	
	while (rows.isValidRow())
	{
		
	  var date = rows.field(0);
	  var my_message = rows.field(1);
	  var message = rows.field(2);
	  
	  var obj = {
			date:date,
			my_message:my_message,
			message:message
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
			db.execute('insert into DOG_BREEDS (name, origin, weight_from, weight_to, kennel_club, active) values (?,?,?,?,?,?)', obj[i].DogBreed.name,obj[i].DogBreed.origin,obj[i].DogBreed.weight_from,obj[i].DogBreed.weight_to,obj[i].DogBreed.kennel_club,obj[i].DogBreed.active);
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
	
	var rows = db.execute('select id, name, origin, weight_from, weight_to, kennel_club, active from dog_breeds');
	
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
	db.execute('delete from MUTUAL_FOLLOWERS');
	
	db.close();
	Ti.API.info('cleanDB() ends');
}

//Creates the local database
function createDB(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('create table if not exists DOGFUEL_RULES (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"breed_id\" integer, \"user_id\" integer,\"walk_distance\" integer, \"playtime\" integer )');
	db.execute('create table if not exists DOGS (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"breed_id\" integer, \"dog_id\" integer, \"name\" varchar(128), \"age\" integer, \"weight\" integer, \"mating\" integer, \"gender\" integer, \"photo\" varchar(128), \"thumb\" varchar(128))');
	db.execute('create table if not exists ACTIVITIES (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"start_date\" real, \"start_time\" real, \"end_time\" real, \"type_id\" integer, \"temperature\" integer, \"pace\" real, \"distance\" real, \"activity_id\" integer, \"sync\" integer)');
	db.execute('create table if not exists ACTIVITY_DOGS (\"activity_id\" integer, \"dog_id\" integer, \"walk_distance\" real, \"playtime\" integer, \"dogfuel\" integer)');
	db.execute('create table if not exists ACTIVITY_COORDINATES (\"activity_id\" integer, \"lat\" real, \"lon\" real, \"log_time\" real)');
	db.execute('create table if not exists PASSPORT (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"title\" varchar(128), \"description\" varchar(128), \"date\" real, \"remind_flag\" integer)');
	db.execute('create table if not exists INBOX (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"remote_user_id\" integer, \"remote_user_name\" varchar(128), \"remote_user_thumb\" varchar(128), \"my_message\" integer, \"read\" integer, \"date\" real, \"message\" text)');
	db.execute('create table if not exists DOG_BREEDS (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"name\" varchar(256), \"origin\" varchar(256), \"weight_from\" integer, \"weight_to\" integer, \"kennel_club\" varchar(256), \"active\" integer)');
	db.execute('create table if not exists MUTUAL_FOLLOWERS (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"user_id\" integer, \"name\" varchar(256),\"thumb\" varchar(128))');
	//db.execute('create table if not exists INBOX (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"user_from\" integer, \"user_to\" integer, \"date\" real, \"message\" text)');
	
	db.close();
	Ti.API.info('createDB() ends');
}
