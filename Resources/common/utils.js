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
    var date = day + "/" + month + "/" + year;
    
    return date;
}
