//UI components
var viewGallery = null;
var viewGalleryScroll = null;
var fullscreenImage = null;
var galleryDoneButton = null;
var galleryCameraButton = null;
var galleryPhotoDialog = null;
var galleryFullscreenBackground = null;

var galleryImageObj = {};

var imagesArray = [];

var ADD_PHOTO = 1;
var GET_PHOTOS = 2;

var progressView = new ProgressView({window:viewGallery});

function buildGalleryView(user_id){
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
		
		galleryFullscreenBackground = Ti.UI.createView({
			backgroundColor:'black',
			top:415,
			height:416,
			zIndex:3
		});
		viewGallery.add(galleryFullscreenBackground);
		
		fullscreenImage = Ti.UI.createImageView();
		galleryFullscreenBackground.add(fullscreenImage);
		
		galleryDoneButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/Done_button.png',
		    width:54,
		    height:34
		});
		galleryDoneButton.addEventListener('click', handleGalleryDoneButton);
		
		galleryCameraButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'gallery/add_photo_icon.png',
			width:32,
			height:31
		});
		
		if(user_id == userObject.userId){
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
	getUserPhotosOnline(GET_PHOTOS, user_id);
}

function populateGallery(photos){
	
	var leftOffset = 9;
	var topOffset = 9;
	var rowThumbs = 0;
	
	for(i=0;i<photos.length;i++){
		
		var thumbImage = Titanium.UI.createImageView({
			image:REMOTE_USER_IMAGES + photos[i].thumb,
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
		
		Ti.API.info(REMOTE_USER_IMAGES + photos[i].thumb);
		
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
function getUserPhotosOnline(method , userId){
	Ti.API.info('getUserPhotosOnline() called for current user'); 	
	
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
			populateGallery(jsonData.data.photos);
			
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
		target_id:userId,
		token:userObject.token
	});
}

//save photo online
function savePhotoOnline(){
	Ti.API.info('savePhotoOnline() called for current user'); 	
	
	progressView.show({
		text:"Uploading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e){
		Ti.API.info('savePhotoOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			imagesArray = [];
			getUserPhotosOnline(ADD_PHOTO);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'addPhoto');
	xhr.send({
		user_id:userObject.userId,
		photo:galleryImageObj.photo,
		thumb:galleryImageObj.thumb
	});
}

function handleThumbImageButton(e){
	var id = e.source.id;
	fullscreenImage.image = REMOTE_USER_IMAGES + imagesArray[id];
	
	navController.getWindow().setRightNavButton(galleryDoneButton);
	
	galleryFullscreenBackground.animate({top:0,duration:500});
}

function handleGalleryDoneButton(){
	navController.getWindow().setRightNavButton(galleryCameraButton);
	galleryFullscreenBackground.animate({top:415,duration:500});
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
		},
		allowEditing:true
	});
}