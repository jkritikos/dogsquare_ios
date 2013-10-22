var photoViewImage = null;
var photoViewDoneButton = null;
var photoViewWindow = null;
var photoNavWin = null;

//Build the photo view
function buildPhotoView(img){
	photoViewWindow = Ti.UI.createWindow({
		backgroundColor:'black',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		modal:true,
		title:'Gallery'
	});
	
	//check if version is ios 7 and higher and create new navigationWindow (3.1.3.GA)
	if(iosVersion[0] >= 7){
		photoNavWin = Ti.UI.iOS.createNavigationWindow({
		    modal: true,
		    window: photoViewWindow
		});
	}
	
	photoViewImage = Ti.UI.createImageView({
		image:img
	});
	photoViewWindow.add(photoViewImage);
	
	photoViewDoneButton = Titanium.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34
	});
	photoViewDoneButton.addEventListener('click', handlePhotoViewDoneButton);
	photoViewWindow.setRightNavButton(photoViewDoneButton);
}

function handlePhotoViewDoneButton(){
	
	if(iosVersion[0] >= 7){
		photoNavWin.close();
	}else{
		photoViewWindow.close();
	}
	
}