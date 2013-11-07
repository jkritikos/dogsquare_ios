//Error messages (Local)
var MSG_ADD_DOG_NO_NAME = 1;
var MSG_ADD_DOG_NO_BREED = 2;
var MSG_ADD_DOG_NO_AGE = 3;
var MSG_ADD_DOG_NO_SIZE = 4;
var MSG_ADD_DOG_NO_GENDER = 5;
var MSG_ADD_DOG_NO_MATING = 6;
var MSG_ADD_DOG_NO_PHOTO = 7;
var MSG_ADD_NOTE_NO_TITLE = 8;
var MSG_ADD_NOTE_NO_DESCRIPTION = 9;
var MSG_ADD_NOTE_NO_DATE = 10;
var MSG_ADD_NOTE_NO_TIME = 11;
var MSG_ADD_PLACE_NO_NAME = 12;
var MSG_ADD_PLACE_NO_CATEGORY = 13;
var MSG_ADD_PLACE_NO_PHOTO = 14;
var MSG_FIND_FRIENDS_NO_CONTACTS_ACCESS = 15;
var MSG_CAMERA_PROBLEM = 16;
var MSG_PWD_CHANGE_NO_PASSWORD = 17;
var MSG_PWD_CHANGE_NO_NEW_PASSWORD = 18;
var MSG_RUN_NO_DOGS = 19;
var MSG_RUN_END = 20;
var MSG_REGISTER_NO_NAME = 21;
var MSG_REGISTER_NO_SURNAME = 22;
var MSG_REGISTER_NO_EMAIL = 23;
var MSG_REGISTER_NO_PASSWORD = 24;
var MSG_REGISTER_NO_DOB = 25;
var MSG_REGISTER_NO_COUNTRY = 26;
var MSG_REGISTER_NO_GENDER = 27;
var MSG_REGISTER_INVALID_EMAIL = 28;
var MSG_REGISTER_NO_PHOTO = 29;
var MSG_REGISTER_NO_TERMS = 30;
var MSG_RUN_NOT_ENDED = 31;
var MSG_NO_MUTUAL_FOLLOWERS = 32;
var MSG_NOT_AVAILABLE_WITH_FACEBOOK = 33;
var MSG_NO_INTERNET_CONNECTION = 34;
var MSG_FACEBOOK_ERROR = 35;
var MSG_APP_REMINDER = 36;

//Error messages (Server)
var ERROR_EMAIL_TAKEN = -2;
var ERROR_USER_CREATION = -3;
var ERROR_USER_PHOTO_UPLOAD = -4;
var ERROR_DOG_CREATION = -5;
var ERROR_DOG_PHOTO_UPLOAD = -6;
var ERROR_USER_ALREADY_FOLLOWING = -7;
var ERROR_USER_NOT_FOLLOWING = -8;
var ERROR_USER_PASSWORD = -21;
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
var FEED_CHECKIN = 7;

//Remove error messages after a while
var ERROR_MSG_REMOVE_TIMEOUT = 1500;

//Remove error messages after a while
var RESET_PASSWORD_SUCCESS = 'reset successfull';

//SMS invite text message
var INVITE_SMS_MSG = 'Hey there, join me on Dogsquare!';
//Facebook invite message
var INVITE_FB_MSG = 'Pack Leader, you are invited to experience Dogsquare - the first Dog-social app that will drastically improve your loyal friend’s life. Your dog will be grateful every time you touch your phone. So Woof your Dog! Find us at the Appstore @ http://www.appstore.com/dogsquare OR visit us @ www.dogsquareapp.com';

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
		sizeObj.label = "small";
		sizeObj.left = 179;
	} else if(size == 2){
		sizeObj.label = "medium";
		sizeObj.left = 168;
	} else if(size == 3){
		sizeObj.label = "large";
		sizeObj.left = 180;
	} else if(size == 4){
		sizeObj.label = "x-Large";	
		sizeObj.left = 173;
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
	} else if(obj.Feed.type_id == FEED_FRIEND_LIKE_ACTIVITY){
		//Add 's to the target name if needed
		var targetUser = obj.Feed.target_user_name;
		if(!stringEndsWith(targetUser, 's')){
			targetUser += '\'s';
		}
		
		msg = obj.Feed.user_from_name + ' likes '+targetUser+ ' activity';
	} else if(obj.Feed.type_id == FEED_FRIEND_COMMENT_ACTIVITY){
		//Add 's to the target name if needed
		var targetUser = obj.Feed.target_user_name;
		if(!stringEndsWith(targetUser, 's')){
			targetUser += '\'s';
		}
		
		msg = obj.Feed.user_from_name + ' commented on '+targetUser+' activity';
	} else if(obj.Feed.type_id == FEED_CHECKIN){
		msg = obj.Feed.user_from_name + ' at ' + obj.Feed.target_place_name;
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
	} else if(code == ERROR_USER_PASSWORD){
		msg = 'Your current password is not correct!';
	}
	
	return msg;
}

//Returns the appropriate locally generated message
function getLocalMessage(code){
	var currentLanguage = LANGUAGE_ENGLISH;
	var msg = '';
	
	if(code == MSG_ADD_DOG_NO_NAME){
		msg = 'What a looovely dog!! What’s his name?';
	} else if(code == MSG_ADD_DOG_NO_BREED){
		msg = 'Your dog is amaaazing!! What’s his breed?';
	} else if(code == MSG_ADD_DOG_NO_AGE){
		msg = 'Your dog is adorable! How old is he?';
	} else if(code == MSG_ADD_DOG_NO_SIZE){
		msg = 'Our scientists insist that you must declare your dog’s size as it is crucial for the Dog Fuel results!!';
	} else if(code == MSG_ADD_DOG_NO_GENDER){
		msg = 'Hey there Pack leader, is that lovely dog a boy OR a girl?';
	} else if(code == MSG_ADD_DOG_NO_MATING){
		msg = 'Love is in the air.. So is your dog in search for a Mate or not?';
	} else if(code == MSG_ADD_DOG_NO_PHOTO){
		msg = 'Pack leader, we need a stunning pic of your doggie!';
	} else if(code == MSG_ADD_NOTE_NO_TITLE){
		msg = 'Your dog insists that this note should have a tittle!';
	} else if(code == MSG_ADD_NOTE_NO_DESCRIPTION){
		msg = 'Shouldn’t this note have a description?';
	} else if(code == MSG_ADD_NOTE_NO_DATE){
		msg = 'Hey Pack leader, write down the note’s date please!!';
	} else if(code == MSG_ADD_NOTE_NO_TIME){
		msg = 'Hey Pack leader, mark the note’s time please!!';
	} else if(code == MSG_ADD_PLACE_NO_NAME){
		msg = 'Wouldn’t it be lovely if you named this place?';
	} else if(code == MSG_ADD_PLACE_NO_CATEGORY){
		msg = 'Woof!! Mark the place using the right Category!';
	} else if(code == MSG_ADD_PLACE_NO_PHOTO){
		msg = 'Woof! We need a picture of this place / incident!';
	} else if(code == MSG_FIND_FRIENDS_NO_CONTACTS_ACCESS){
		msg = 'Woof! Dogsquare needs your permission to access your contacts. No worries we are not spying on you!';
	} else if(code == MSG_CAMERA_PROBLEM){
		msg = 'Ooops! There seems to be a problem with your camera..';
	} else if(code == MSG_PWD_CHANGE_NO_PASSWORD){
		msg = 'Hey Pack leader the current password is missing here!';
	} else if(code == MSG_PWD_CHANGE_NO_NEW_PASSWORD){
		msg = 'Hey Pack leader,the new password is missing here!';
	} else if(code == MSG_RUN_NO_DOGS){
		msg = 'Wouldn’t it be great if you selected at least one dog to go out with you !!';
	} else if(code == MSG_RUN_END){
		msg = 'Hey Pack leader, it is important that you Start your activity first!';
	} else if(code == MSG_REGISTER_NO_NAME){
		msg = 'Don’t be so shy and tell us your first name..';
	} else if(code == MSG_REGISTER_NO_SURNAME){
		msg = 'The Dogsquare Supercomputer says we need your surname too!';
	} else if(code == MSG_REGISTER_NO_EMAIL){
		msg = 'Missing email!! The only thing a dog can’t actually find';
	} else if(code == MSG_REGISTER_NO_PASSWORD){
		msg = 'Your Dog knows that you forgot to set up the password! But he can’t help us only you can.';
	} else if(code == MSG_REGISTER_NO_DOB){
		msg = 'Hey don’t be shy and write down your date of birth..';
	} else if(code == MSG_REGISTER_NO_COUNTRY){
		msg = 'Where are you from Pack leader?';
	} else if(code == MSG_REGISTER_NO_GENDER){
		msg = 'What’s your Gender Pack Leader?';
	} else if(code == MSG_REGISTER_INVALID_EMAIL){
		msg = 'Woof! That email address is wrong!';
	} else if(code == MSG_REGISTER_NO_PHOTO){
		msg = 'Your super cool profile picture is missing!';
	} else if(code == MSG_REGISTER_NO_TERMS){
		msg = 'For this relationship to work you must Agree to the Terms of Use & Privacy Policy..';
	} else if(code == MSG_RUN_NOT_ENDED){
		msg = 'Hey Pack leader you must STOP your current activity to do that!';
	} else if(code == MSG_NO_MUTUAL_FOLLOWERS){
		msg = 'Unfortunately You guys are not mutual followers..who knows things might change..';
	} else if(code == MSG_NOT_AVAILABLE_WITH_FACEBOOK){
		msg = 'You can’t do this when logged in with Facebook.';
	} else if(code == MSG_NO_INTERNET_CONNECTION){
		msg = 'Ooops! There seems to be a problem with your connection to the Internet!';
	} else if(code == MSG_FACEBOOK_ERROR){
		msg = 'Ooops! There seems to be a problem with our Facebook access!';
	} else if(code == MSG_APP_REMINDER){
		msg = 'Hey Pack Leader dont be Lazy! Move your Dog and go for a walk! DOG FUEL IS EARNED NOT GIVEN !!';
	}
 
	return msg;
}
