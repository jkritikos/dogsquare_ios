//UI components
var viewGallery = null;
var viewGalleryScroll = null;
var galleryCameraButton = null;
var galleryPhotoDialog = null;
var galleryPhotoType = null;
var galleryImageObj = {};

var imagesArray = [];

var ADD_PHOTO = 1;
var GET_PHOTOS = 2;

//Build the gallery view
function buildGalleryView(target_id, photoType){
	CURRENT_VIEW = VIEW_GALLERY;
	
	if(viewGallery == null){
		
		viewGallery = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		viewGalleryScroll = Ti.UI.createScrollView({
			backgroundColor:UI_BACKGROUND_COLOR,
			top:9,
			bottom:18,
			width:296
		});
		viewGallery.add(viewGalleryScroll);
		
		galleryCameraButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'gallery/add_photo_icon.png',
			width:32,
			height:31
		});
		
		//If we're viewing the gallery of the current logged in user, allow them to add photos
		if((target_id == userObject.userId) && photoType == PHOTO_TYPE_USER){
			navController.getWindow().setRightNavButton(galleryCameraButton);
		}
		
		galleryCameraButton.addEventListener('click', handleGalleryCameraButton);
		
		//photo dialog
		galleryPhotoDialog = Titanium.UI.createOptionDialog({
			options:['Take Photo', 'Choose From Library', 'Cancel'],
			cancel:2
		});
		
		//photo dialog event listener
		galleryPhotoDialog.addEventListener('click', handleGalleryPhotoDialog);
	}
	
	//Load photos
	getUserPhotosOnline(GET_PHOTOS, target_id, photoType);
}

function populateGallery(photos, type){
	Ti.API.info('populateGallery() for type '+type);
	
	var leftOffset = 9;
	var topOffset = 9;
	var rowThumbs = 0;
	
	for(i=0;i<photos.length;i++){
		
		var thumbImage = Titanium.UI.createImageView({
			image:type == PHOTO_TYPE_PLACE ? REMOTE_PLACE_IMAGES + photos[i].thumb : REMOTE_USER_IMAGES + photos[i].thumb,
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			borderWidth:2,
			borderRadius:30,
			borderColor:'#f9bf30',
			left:leftOffset,
			top:topOffset,
			id:i
		});
		viewGalleryScroll.add(thumbImage);
		thumbImage.addEventListener('click',handleThumbImageButton);
		
		imagesArray.push(photos[i].path);
		
		rowThumbs++;
		leftOffset += 73;
		
		if(rowThumbs == 4){
			topOffset += 80; 
			rowThumbs = 0;
			leftOffset = 9;
		}
	}
}

//get all photos from server
function getUserPhotosOnline(method , targetId, photoType){
	Ti.API.info('getUserPhotosOnline() called for targer '+targetId+' with photo type '+photoType); 	
	
	var progressView = new ProgressView({window:viewGallery});
	if(method == GET_PHOTOS){
		progressView.show({
			text:"Loading..."
		});
	}
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getUserPhotosOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('getUserPhotosOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			galleryPhotoType = photoType;
			populateGallery(jsonData.data.photos, photoType);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide progress view
			progressView.hide();
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.open('GET',API+'getPhotos');
	xhr.send({
		user_id:userObject.userId,
		target_id:targetId,
		token:userObject.token,
		type_id:photoType
	});
}

//save photo online
function savePhotoOnline(){
	Ti.API.info('savePhotoOnline() called for current user'); 	
	
	var progressView = new ProgressView({window:viewGallery});
	progressView.show({
		text:"Uploading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in savePhotoOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('savePhotoOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			imagesArray = [];
			getUserPhotosOnline(ADD_PHOTO, userObject.userId, PHOTO_TYPE_USER);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			//Hide progress view
			progressView.hide();
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'addPhoto');
	xhr.send({
		user_id:userObject.userId,
		photo:galleryImageObj.photo,
		thumb:galleryImageObj.thumb,
		token:userObject.token
	});
}

function handleThumbImageButton(e){
	var id = e.source.id;
	
	if(galleryPhotoType == PHOTO_TYPE_USER){
		image = REMOTE_USER_IMAGES + imagesArray[id];
	} else if(galleryPhotoType == PHOTO_TYPE_PLACE){
		image = REMOTE_PLACE_IMAGES + imagesArray[id];
	}
	
	Ti.include('ui/iphone/photo_view.js');
	
	buildPhotoView(image);
	
	if(iOS7){
		photoNavWin.open();
	}else{
		photoViewWindow.open();
	}
}

function handleGalleryCameraButton(){
	galleryPhotoDialog.show();
}

function handleGalleryPhotoDialog(e){
	if(e.index == 0){
		handleGalleryCameraSelection();
	} else if(e.index == 1){
		handleGalleryPhotoSelection();
	}
}

//handle photo selection
function handleGalleryPhotoSelection(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			galleryImageObj.photo = compressedImage;
			galleryImageObj.thumb = imageThumbnail;
			
			var timestamp = new Date().getTime();
			var uniqueDogFilename = timestamp + '.jpg';
			var uniqueDogFilenameThumb = 'thumb_' + timestamp + '.jpg';
			
			galleryImageObj.photo_filename = uniqueDogFilename;
			galleryImageObj.thumb_filename = uniqueDogFilenameThumb;
			
			//save images on the local filesystem
			var filename = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilename;
			var filenameThumb = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilenameThumb;
			
			var tmpImage = Titanium.Filesystem.getFile(filename);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(filenameThumb);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(imageThumbnail);
			
			savePhotoOnline();
			
			Ti.API.info('saved image to '+filename);
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}

//handle camera selection
function handleGalleryCameraSelection(){
	Titanium.Media.showCamera({
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(200000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			galleryImageObj.photo = compressedImage;
			galleryImageObj.thumb = imageThumbnail;
			
			var timestamp = new Date().getTime();
			var uniqueDogFilename = timestamp + '.jpg';
			var uniqueDogFilenameThumb = 'thumb_' + timestamp + '.jpg';
			
			galleryImageObj.photo_filename = uniqueDogFilename;
			galleryImageObj.thumb_filename = uniqueDogFilenameThumb;
			
			//save images on the local filesystem
			var filename = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilename;
			var filenameThumb = Titanium.Filesystem.applicationDataDirectory + uniqueDogFilenameThumb;
			
			var tmpImage = Titanium.Filesystem.getFile(filename);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(filenameThumb);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(imageThumbnail);
			
			savePhotoOnline();
			
			Ti.API.info('saved image to '+filename);
		},
		cancel:function(){
	
		},
		error:function(error){
			alert(getLocalMessage(MSG_CAMERA_PROBLEM));
		},
		allowEditing:true
	});
}