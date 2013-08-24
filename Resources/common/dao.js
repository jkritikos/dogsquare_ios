var API = '';

var PRODUCTION_MODE = false;

if(!PRODUCTION_MODE){
	//UrbanAirship.key='QcPHp0gxT3-3yj5Y9aLDpA';
	//UrbanAirship.secret ='xUCXrw0xQq-8fCqXbf7NdA';
	//UrbanAirship.master_secret='qK_-SzSeQP6NA_UQ8g-ENw';
	//UrbanAirship.baseurl = 'https://go.urbanairship.com';
	//API = 'http://dev.mindthebuzz.com/api/';
	API = 'http://dogsquare/api/';
} else {
	//UrbanAirship.key='W1NHMmPjR56aHc3u6nu6iA';
	//UrbanAirship.secret ='KBiUUr_mQwKYNmTXX5oVpQ';
	//UrbanAirship.master_secret='0louzaRKRLmStWwb0qEHjw';
	//UrbanAirship.baseurl = 'https://go.urbanairship.com';
	API = 'https://www.dogsquare.com/api/';
}

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
var ERROR_MESSAGE_EMAIL_TAKEN = -1;

//Updates the global user object - only keys in obj are updated
function saveUserObject(obj){
	//image
	
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
	
	if(obj.followers){
		userObject.followers = obj.followers;
	} 
	
	if(obj.inbox){
		userObject.inbox = obj.inbox;
	}
	
	if(obj.userId){
		userObject.userId = obj.userId;
	}
	
}

function getUserObject(){
	
}

function hello(){
	
}

//Weather retrieval from Yahoo
var weather = ( function() {
    var api = {};
    api.getWeather = function(la, lo) {
    	Ti.Yahoo.yql('select * from yahoo.maps.findLocation where q="' + la + ',' + lo + '" and gflags="R"', function(e) {
        	var url = 'http://weather.yahooapis.com/forecastrss?w=' + e.data.ResultSet.Results.woeid + '&u=c';
        	var xhr = Ti.Network.createHTTPClient({});
        	
        	xhr.onload = function() {
           
        		var weather = this.responseXML.documentElement;
        		Ti.API.info('weather: '+weather);
        		
            	var title = weather.getElementsByTagName('title').item(0).text;
            	var high = weather.getElementsByTagName('yweather:forecast').item(0).getAttribute("high");
            	var low = weather.getElementsByTagName('yweather:forecast').item(0).getAttribute("low");
				        
				Ti.API.info(e.data.ResultSet.Results.woeid);      
            	alert(title + "\nToday's Forecast \nhigh: "+ high + 'C, low: '+ low + 'C');
        	};
        	
        	xhr.open('GET', url);
        	xhr.send();
    	});
    };
    return api;
}());

function xhr_upload(_args) {
	var win = Titanium.UI.createWindow({
		title:_args.title
	});
	
	var ind=Titanium.UI.createProgressBar({
		width:200,
		height:50,
		min:0,
		max:1,
		value:0,
		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		top:10,
		message:'Uploading Image',
		font:{fontSize:12, fontWeight:'bold'},
		color:'#888'
	});
	
	win.add(ind);
	ind.show();
	
	Titanium.Media.openPhotoGallery({
	
		success:function(event)
		{
			Ti.API.info("success! event: " + JSON.stringify(event));
			var image = event.media;
		
			var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false});
	
			xhr.onerror = function(e)
			{
				Ti.UI.createAlertDialog({title:'Error', message:e.error}).show();
				Ti.API.info('IN ERROR ' + e.error);
			};
			xhr.setTimeout(NETWORK_TIMEOUT);
			xhr.onload = function(e)
			{
				Ti.UI.createAlertDialog({title:'Success', message:'status code ' + this.status}).show();
				Ti.API.info('IN ONLOAD ' + this.status + ' readyState ' + this.readyState);
			};
			xhr.onsendstream = function(e)
			{
				ind.value = e.progress ;
				Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
			};
			// open the client
			xhr.open('POST',API+'signup');
	
			// send the data
			xhr.setRequestHeader("Content-Type", "multipart/form-data");
			xhr.send({photo:image,username:'fgsandford1000',password:'sanford1000',name:'Jason Kritikos'});
			
		},
		cancel:function()
		{
	
		},
		error:function(error)
		{
		},
		allowEditing:true
	});
	
	return win;
};

function createDB(){
	var db = Ti.Database.install('dog.sqlite', 'db');
	
	db.execute('create table if not exists DOGFUEL_RULES (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"breed_id\" integer, \"user_id\" integer,\"walk_distance\" integer, \"playtime\" integer )');
	
	db.close();
}
