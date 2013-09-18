//Error messages
var ERROR_EMAIL_TAKEN = -2;
var ERROR_USER_CREATION = -3;
var ERROR_USER_PHOTO_UPLOAD = -4;
var ERROR_DOG_CREATION = -5;
var ERROR_DOG_PHOTO_UPLOAD = -6;
var ERROR_USER_ALREADY_FOLLOWING = -7;
var ERROR_USER_NOT_FOLLOWING = -8;

//Notification types
var NOTIFICATION_NEW_FOLLOWER = 1;
var NOTIFICATION_WALK_REQUEST = 2;
var NOTIFICATION_COMMENT_ACTIVITY = 3;
var NOTIFICATION_LIKE_ACTIVITY = 4;

//Feed types
var FEED_NEW_WALK = 1;

//Remove error messages after a while
var ERROR_MSG_REMOVE_TIMEOUT = 1500;

function TT(s){
	var currentLanguage = LANGUAGE_ENGLISH;
}

//Build the text description for a notification object
function getNotificationMessage(code){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = 'default notification';
	
	if(code == NOTIFICATION_NEW_FOLLOWER){
		msg = "is now following you.";
	} else if(code == NOTIFICATION_WALK_REQUEST){
		msg = "requested a dog walk.";
	} else if(code == NOTIFICATION_COMMENT_ACTIVITY){
		msg = "commented on your activity.";
	} else if(code == NOTIFICATION_LIKE_ACTIVITY){
		msg = "liked your activity.";	
	}
	
	return msg;
}

//Builds the text description for a feed object
function getFeedMessage(obj){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = 'default feed';
	
	if(obj.type_id == FEED_NEW_WALK){
		msg = obj.user_from_name + ' went for a walk with ' + obj.target_dog_name;
	}
	
	return msg;
}

function getErrorMessage(code){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = 'AN ERROR OCCURED';
	
	if(code == ERROR_EMAIL_TAKEN){
		msg = 'Email already in use.';
	}
	
	return msg;
}
