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
	
	return obj; 
}

function hello(){
	
}

//Weather retrieval from Yahoo
var weather = ( function() {
    var api = {};
    api.getWeather = function(la, lo) {
    	alert('weather for lat '+la +' lon '+lo);
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
	
	db.execute('insert into dogs (breed_id,dog_id,name,age,weight,mating,gender,photo) values (?,?,?,?,?,?,?,?)', dogObject.breed_id, dogObject.dog_id, dogObject.name, dogObject.age, dogObject.weight, dogObject.mating, dogObject.gender, dogObject.photo_filename);
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
	
	var rows = db.execute('select dog_id, name, photo from dogs ');
	while (rows.isValidRow()) {

	  	var obj = {
	  		id:rows.field(0),
			name:rows.field(1),
			photo:rows.field(2)
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

//Updates an activity in the local db
function endActivity(obj){
	var now = new Date().getTime();
	
	Ti.API.info('updateActivity() called for activity id '+obj.activity_id);
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('update activities set end_time=?, temperature=?, pace=?,distance=? where id=?',now,obj.temperature,obj.pace,obj.distance,obj.activity_id);
	
	db.close();
}

//Returns a list of all the user activities
function getActivities(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	var activities = [];
	
	var sql = 'select id,start_date, start_time, end_time,type_id from activities order by id desc';
	var rows = db.execute(sql);
	while (rows.isValidRow()){
		
		var duration = rows.field(3) - rows.field(2);
		
		var obj = {
			id:rows.field(0),
			start_date:rows.field(1),
			start_time:rows.field(2),
			end_time:rows.field(3),
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
	
	var sql = 'select id,start_date, start_time, end_time,type_id from activities where id=?';
	var rows = db.execute(sql,id);
	while (rows.isValidRow()){
		
		var duration = rows.field(3) - rows.field(2);
		
		obj = {
			id:rows.field(0),
			start_date:rows.field(1),
			start_time:rows.field(2),
			end_time:rows.field(3),
			duration:duration,
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
	
	var rows = db.execute('select lat,lon from activity_coordinates where activity_id=? order by log_time', activityId);
	
	while (rows.isValidRow()){
		var obj = {
			lat:rows.field(0),
			lon:rows.field(1)
		};
		
		data.push(obj);
		rows.next();
	}
	
	db.close();
	
	return data;
}

function createDB(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('create table if not exists DOGFUEL_RULES (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"breed_id\" integer, \"user_id\" integer,\"walk_distance\" integer, \"playtime\" integer )');
	db.execute('create table if not exists DOGS (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"breed_id\" integer, \"dog_id\" integer, \"name\" varchar(128), \"age\" integer, \"weight\" integer, \"mating\" integer, \"gender\" integer, \"photo\" varchar(128))');
	db.execute('create table if not exists ACTIVITIES (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"start_date\" real, \"start_time\" real, \"end_time\" real, \"type_id\" integer, \"temperature\" integer, \"pace\" real, \"distance\" real)');
	db.execute('create table if not exists ACTIVITY_DOGS (\"activity_id\" integer, \"dog_id\" integer, \"walk_distance\" real, \"playtime\" integer, \"dogfuel\" integer)');
	db.execute('create table if not exists ACTIVITY_COORDINATES (\"activity_id\" integer, \"lat\" real, \"lon\" real, \"log_time\" real)');
	db.execute('create table if not exists PASSPORT (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"title\" varchar(128), \"description\" varchar(128), \"date\" real, \"remind_flag\" integer)');

	
	db.close();
	Ti.API.info('createDB() ends');
}
