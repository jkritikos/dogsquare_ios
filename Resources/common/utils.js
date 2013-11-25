//Import files
var FILES_IMPORTED = [];

function getMarkersWithCenter(coordinates){
    Ti.API.info('getMarkersWithCenter() called with '+JSON.stringify(coordinates));
    var total_locations = coordinates.length;
    var minLongi = null, minLati = null, maxLongi = null, maxLati = null;
    var totalLongi = 0.0, totalLati = 0.0;

    for(var i = 0; i < total_locations; i++) 
    {
        if(minLati == null || minLati > coordinates[i].latitude) {
            minLati = parseFloat(coordinates[i].latitude);
        }
        if(minLongi == null || minLongi > coordinates[i].longitude) {
            minLongi = parseFloat(coordinates[i].longitude);
        }
        if(maxLati == null || maxLati < coordinates[i].latitude) {
            maxLati = parseFloat(coordinates[i].latitude);
        }
        if(maxLongi == null || maxLongi < coordinates[i].longitude) {
            maxLongi = parseFloat(coordinates[i].longitude);
        }
    }

    var ltDiff = maxLati-minLati;
    var lgDiff = maxLongi-minLongi;
    var delta = ltDiff>lgDiff ? ltDiff : lgDiff;
	Ti.API.warn('minLati '+minLati+' maxLati '+maxLati+' minLongi '+minLongi+' maxLongi '+maxLongi+' delta '+delta);
    
    //untested, leave in case we need it
    /*
    if(delta > 5){
    	Ti.API.warn('DELTA > 5');
        delta = 0.5;
        maxLati = coordinates[coordinates.length-1].latitude;
        minLati = coordinates[coordinates.length-1].latitude;
        maxLongi = coordinates[coordinates.length -1].longitude;
        minLongi = coordinates[coordinates.length -1].longitude;
    }*/
    
    var results = null;
    if(total_locations>0 && delta>0){
    	results = {
    		delta:delta,
    		latitude:((maxLati+minLati+ 0.00015)/2),
    		longitude:((maxLongi+minLongi)/2)
    	};
    	
    	Ti.API.warn('Returning lat '+results.latitude+' and lon '+results.longitude);
    }
    
    return results;
}

//Returns the timezone offset formatted for MySQL use
function getUTCOffset(){
	var utcTime = new Date();
	var offset = utcTime.getTimezoneOffset();
	var tmpString = utcTime.toString();
	var gmtLocation = tmpString.indexOf('GMT');
	var tzOffset = tmpString.substr(gmtLocation+3, 5);
	
	var partA = tzOffset.substr(0,3);
	var partB = tzOffset.substr(3,2);
	var tzOffsetMysql = partA + ":" + partB;	
	
	Ti.API.info('-=-=-=- ' + tzOffset + ' becomes '+tzOffsetMysql);
	return tzOffsetMysql;
}

//String validator for empty/null
function isStringNullOrEmpty(s){
	var response = false;
	if(s == null || s.replace(/^\s+|\s+$/g).length == 0){
		response = true;
	}
	
	return response;
}

//Returns true if the specified string ends with suffix, false otherwise
function stringEndsWith(str, suffix) {
    return str.charAt(str.length) == suffix;
}

//Returns true if the specified string starts with suffix, false otherwise
function stringStartsWith(str, prefix) {
    return str.charAt(0) == suffix;
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

//Returns the appropriate path for the specified user photo
function getUserPhoto(path){
	var photo = null;
	
	if(path != null){
		if(path.substring(0,4) == 'http'){
			photo = path;
		} else {
			photo = REMOTE_USER_IMAGES+path;
		}
	}
	
	return photo;
}

//int range validator
function isWithinRange(input, min, max){
	if(input >= min && input <= max){
		return true;
	} else {
		return false;
	}
}

//Hack for cropping images for retina/non-retina devices - creates the blob in the correct dimensions
function createCroppedBoneImage(view, dogfuelValue){
	Ti.API.info('createCroppedBoneImage() called with dogfuelValue '+dogfuelValue);
	
	var boneFillImage = null;
	var targetHeightForCropping, targetWidthForCropping, viewWidth, viewHeight = 0;
	
	var boneFillImageBlob = null;
	
	if(view == VIEW_DOG_PROFILE){
		boneFillImage = Titanium.Filesystem.getFile(IMAGE_PATH+'dog_profile/bone_colours.png');
		boneFillImageBlob = boneFillImage.toBlob();
		targetHeightForCropping = RETINA_DEVICE ? 90 : 45;
	} else if(view == VIEW_RUN_FINISH || view == VIEW_ACTIVITY_NEW){
		boneFillImage = Titanium.Filesystem.getFile(IMAGE_PATH+'run_finish/bone_colours.png');
		boneFillImageBlob = boneFillImage.toBlob();
		targetHeightForCropping = RETINA_DEVICE ? 60 : 30;
	} else {
		boneFillImage = Titanium.Filesystem.getFile(IMAGE_PATH+'menu_right/bone_colours.png');
		boneFillImageBlob = boneFillImage.toBlob();
		targetHeightForCropping = RETINA_DEVICE ? 44 : 22;
	}
	
	targetWidthForCropping =  RETINA_DEVICE ? 2 * Math.round((dogfuelValue * boneFillImageBlob.width) / 100) : Math.round((dogfuelValue * boneFillImageBlob.width) / 100);
	viewWidth = RETINA_DEVICE? targetWidthForCropping / 2 : targetWidthForCropping;
	
	Ti.API.info('createCroppedBoneImage() RETINA_DEVICE='+RETINA_DEVICE+' called with input file width:'+boneFillImageBlob.width+' height:'+boneFillImageBlob.height+' CROPPING to w:'+targetWidthForCropping+' h:'+targetHeightForCropping);
	var boneFillImageBlobCropped = boneFillImageBlob.imageAsCropped({y:0,x:0,width:targetWidthForCropping, height:targetHeightForCropping});
	
	var obj = {
		photo:boneFillImageBlobCropped,
		view_width:viewWidth
	};
	
	return obj;
}

//Custom import function imports only ONCE
function _import(file){
	if(!FILESTi.includeED[file]){
		Ti.include(file);
		FILESTi.includeED[file] = true;
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

function rad(x){
	return x*Math.PI/180;
}

//calculate distance in kilometers between tow fixed locations
function calculateCoordinateDistance(lat1,lon1, lat2,lon2){
	var R     = 6371.0090667;                          
	var dLat  = rad( lat2 - lat1 );
	var dLong = rad( lon2 - lon1 );
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	
	var runningDistanceKm = parseFloat(d);
	var runningDistanceKmLabelValue = runningDistanceKm.toFixed(2);
	
	return runningDistanceKmLabelValue;
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
	
	//Ti.API.info('relativeTime() now = '+nowTime+' eventTime = '+eventTime+ ' and calculates diff = '+diff);
	
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
