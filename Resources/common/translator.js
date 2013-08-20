function TT(s){
	var currentLanguage = LANGUAGE_ENGLISH;
	
	
}

function getErrorMessage(code){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = 'AN ERROR OCCURED';
	
	if(code == ERROR_MESSAGE_EMAIL_TAKEN){
		msg = 'EMAIL ALREADY REGISTERED';
	}
	
	return msg;
}
