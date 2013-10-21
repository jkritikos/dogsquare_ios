//Error messages (Local)
var MSG_ADD_DOG_NO_NAME = 'Missing dog name';
var MSG_ADD_DOG_NO_BREED = 'Missing dog breed';
var MSG_ADD_DOG_NO_AGE = 'Invalid/Missing dog age';
var MSG_ADD_DOG_NO_SIZE = 'Missing dog size';
var MSG_ADD_DOG_NO_GENDER = 'Missing dog gender';
var MSG_ADD_DOG_NO_MATING = 'Missing dog mating flag';
var MSG_ADD_DOG_NO_PHOTO = 'Missing dog photo';
var MSG_ADD_NOTE_NO_TITLE = 'Missing note title';
var MSG_ADD_NOTE_NO_DESCRIPTION = 'Missing note description';
var MSG_ADD_NOTE_NO_DATE = 'Missing note date';
var MSG_ADD_NOTE_NO_TIME = 'Missing note time';
var MSG_ADD_PLACE_NO_NAME = 'Missing place name';
var MSG_ADD_PLACE_NO_CATEGORY = 'Missing place category';
var MSG_ADD_PLACE_NO_PHOTO = 'Missing place photo';
var MSG_FIND_FRIENDS_NO_CONTACTS_ACCESS = 'Please enable Dogsquare to access your contacts';
var MSG_CAMERA_PROBLEM = 'There is a problem with your camera';
var MSG_PWD_CHANGE_NO_PASSWORD = 'Current password missing';
var MSG_PWD_CHANGE_NO_NEW_PASSWORD = 'New password missing';
var MSG_RUN_NO_DOGS = 'No dogs selected';
var MSG_RUN_END = 'Start your activity first';
var MSG_REGISTER_NO_NAME = 'Missing first name';
var MSG_REGISTER_NO_SURNAME = 'Missing surname';
var MSG_REGISTER_NO_EMAIL = 'Missing email';
var MSG_REGISTER_NO_PASSWORD = 'Missing password';
var MSG_REGISTER_NO_DOB = 'Missing date of birth';
var MSG_REGISTER_NO_COUNTRY = 'Missing country';
var MSG_REGISTER_NO_GENDER = 'Missing gender';
var MSG_REGISTER_INVALID_EMAIL = 'Invalid email address';
var MSG_REGISTER_NO_PHOTO = 'Missing profile photo';
var MSG_REGISTER_NO_TERMS = 'Please agree to the terms';
var MSG_RUN_NOT_ENDED = 'Stop your activity first';
var MSG_NO_MUTUAL_FOLLOWERS = 'You are not mutual followers';

//Error messages (Server)
var ERROR_EMAIL_TAKEN = -2;
var ERROR_USER_CREATION = -3;
var ERROR_USER_PHOTO_UPLOAD = -4;
var ERROR_DOG_CREATION = -5;
var ERROR_DOG_PHOTO_UPLOAD = -6;
var ERROR_USER_ALREADY_FOLLOWING = -7;
var ERROR_USER_NOT_FOLLOWING = -8;
var ERROR_REQUEST_UNAUTHORISED = -100;

//Photo types
var PHOTO_TYPE_USER = 1;
var PHOTO_TYPE_DOG = 2;
var PHOTO_TYPE_GALLERY = 3;
var PHOTO_TYPE_PLACE = 4;

//Notification types
var NOTIFICATION_NEW_FOLLOWER = 1;
var NOTIFICATION_WALK_REQUEST = 2;
var NOTIFICATION_COMMENT_ACTIVITY = 3;
var NOTIFICATION_LIKE_ACTIVITY = 4;
var NOTIFICATION_AWARD_BADGE = 5;

//Feed types
var FEED_NEW_WALK = 1;
var FEED_NEW_DOG = 2;
var FEED_FRIEND_NEW_FOLLOWER = 3;
var FEED_FRIEND_LIKE_DOG = 4;
var FEED_FRIEND_LIKE_ACTIVITY = 5;
var FEED_FRIEND_COMMENT_ACTIVITY = 6;

//Remove error messages after a while
var ERROR_MSG_REMOVE_TIMEOUT = 1500;

//SMS invite text message
var INVITE_SMS_MSG = 'Hey there, join me on Dogsquare!';

function TT(s){
	var currentLanguage = LANGUAGE_ENGLISH;
}

//Report a problem subject
var REPORT_PROBLEM_SUBJECT = 'Dogsquare problem';

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
	} else if(code == NOTIFICATION_AWARD_BADGE){
		msg = "You earned a new badge!";
	}
	
	return msg;
}

//get size 
function getSize(size){
	var sizeObj = {};
	
	if(size == 1){
		sizeObj.label = "Small";
		sizeObj.left = 180;
	} else if(size == 2){
		sizeObj.label = "Medium";
		sizeObj.left = 169;
	} else if(size == 3){
		sizeObj.label = "Large";
		sizeObj.left = 177;
	} else if(size == 4){
		sizeObj.label = "X-Large";	
		sizeObj.left = 171;
	}
	
	return sizeObj;
}

//Builds the text description for a feed object
function getFeedMessage(obj){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = 'default feed';
	
	if(obj.Feed.type_id == FEED_NEW_WALK){
		msg = obj.Feed.user_from_name + ' went for a walk with ' + obj.Feed.target_dog_name;
	} else if(obj.Feed.type_id == FEED_NEW_DOG){
		msg = obj.Feed.user_from_name + ' added dog ' + obj.Feed.target_dog_name;
	} else if(obj.Feed.type_id == FEED_FRIEND_NEW_FOLLOWER){
		msg = obj.Feed.user_from_name + ' is now following ' + obj.Feed.target_user_name;
	} else if(obj.Feed.type_id == FEED_FRIEND_LIKE_DOG){
		msg = obj.Feed.user_from_name + ' likes ' + obj.Feed.target_dog_name;
	}else if(obj.Feed.type_id == FEED_FRIEND_LIKE_ACTIVITY){
		msg = obj.Feed.user_from_name + ' likes activity: ' + obj.Feed.activity_id;
	}else if(obj.Feed.type_id == FEED_FRIEND_COMMENT_ACTIVITY){
		msg = obj.Feed.user_from_name + ' commented on activity: ' + obj.Feed.activity_id;
	}
	
	return msg;
}

function getErrorMessage(code){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = 'AN ERROR OCCURED';
	
	if(code == ERROR_EMAIL_TAKEN){
		msg = 'Email already in use.';
	} else if(code == ERROR_REQUEST_UNAUTHORISED){
		msg = 'Invalid username/password.';
	}
	
	return msg;
}
