//Error messages
var ERROR_EMAIL_TAKEN = -2;
var ERROR_USER_CREATION = -3;
var ERROR_USER_PHOTO_UPLOAD = -4;
var ERROR_DOG_CREATION = -5;
var ERROR_DOG_PHOTO_UPLOAD = -6;
var ERROR_USER_ALREADY_FOLLOWING = -7;
var ERROR_USER_NOT_FOLLOWING = -8;

//Remove error messages after a while
var ERROR_MSG_REMOVE_TIMEOUT = 1500;

function TT(s){
	var currentLanguage = LANGUAGE_ENGLISH;
}

function getErrorMessage(code){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = 'AN ERROR OCCURED';
	
	if(code == ERROR_EMAIL_TAKEN){
		msg = 'Email already in use.';
	}
	
	return msg;
}
