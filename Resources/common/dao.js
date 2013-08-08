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

//Language constants
var LANGUAGE_ENGLISH = 1;

var NETWORK_TIMEOUT = 20000;

function hello(){
	
}

function signup(){
	
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
			xhr.setTimeout(20000);
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