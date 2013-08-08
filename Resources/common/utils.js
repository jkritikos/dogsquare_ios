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