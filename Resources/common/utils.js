//Import files
var FILES_IMPORTED = [];

//String validator for empty/null
function isStringNullOrEmpty(s){
	var response = false;
	if(s == null || s.replace(/^\s+|\s+$/g).length == 0){
		response = true;
	}
	
	return response;
}

//String validator for email format
function isValidEmail(email){
	Ti.API.info('utils.js isValidEmail() called for email '+email);
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
    	return false;
    } else {
    	return true;
    }
}

//int range validator
function isWithinRange(input, min, max){
	if(input >= min && input <= max){
		return true;
	} else {
		return false;
	}
}

//Custom import function imports only ONCE
function _import(file){
	if(!FILES_IMPORTED[file]){
		Ti.include(file);
		FILES_IMPORTED[file] = true;
		Ti.API.info('Importing '+file);
	} else {
		Ti.API.info('NOT importing '+file+' - already imported');
	}
}

function formatDate(date){
	var day = date.getDate();
    day = day.toString();
 
    if (day.length < 2) {
        day = '0' + day;
    }
 
    var month = date.getMonth();
    month = month + 1;
    month = month.toString();
 
    if (month.length < 2) {
        month = '0' + month;
    }
 
    var year = date.getFullYear();
    var date = day + " / " + month + " / " + year;
    
    return date;
}

function createLoadingView(){
	var loadingView = Titanium.UI.createView({
		backgroundColor:'black',
		bottom:0,
		opacity:0.6,
		width:'100%',
		height:416
	});
	
	var loadingViewLabel = Titanium.UI.createLabel({
		text:'Loading...',
		color:'black',
		height:47,
		opacity:1,
		textAlign:'center',
		font:{fontSize:30, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	loadingView.add(loadingViewLabel);
	
	return loadingView;
}

function rad(x){
	return x*Math.PI/180;
}

function relativeTime(eventTime){
	var nowTime = new Date().getTime();
	var t = '';
	var diff = nowTime - eventTime;
	var hour = (1000 * 60) * 60;
	var day = 24 * hour;
	var week = 7 * day;
	var month = 31 * day;
	var year = 12 * month;
	var threeMonths = month * 3;
	var variable = 0;
	var metric = '';
	
	if(diff <= 10000){
		t = 'Just now';
	} else if(diff > 10000 && diff <= 60000){
		t = 'A minute ago';
	} else if(diff > 60000 && diff <= hour){
		variable = Math.floor(diff / 60000);
		metric = variable == 1 ? 'minute' : 'minutes';
		t = variable+' '+metric+' ago';
	} else if(diff > hour && diff <= day){
		variable = Math.floor(diff / hour);
		metric = variable == 1 ? 'hour' : 'hours';
		t = variable+' '+metric+' ago';
	} else if(diff > day && diff <= week){
		variable = Math.floor(diff / day);
		metric = variable == 1 ? 'day' : 'days';
		t = variable+' '+metric+' ago';
	} else if(diff > week && diff <= month){
		variable = Math.floor(diff / week);
		metric = variable == 1 ? 'week' : 'weeks';
		t = variable+' '+metric+' ago';
	} else if(diff > month && diff <= threeMonths){
		variable = Math.floor(diff / month);
		metric = variable == 1 ? 'month' : 'months';
		t = variable+' '+metric+' ago';
	} else {
		t = new Date(eventTime);
	}
	
	return t;
}
