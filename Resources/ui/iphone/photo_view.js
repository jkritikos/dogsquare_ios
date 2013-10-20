var photoViewImage = null;
var photoViewDoneButton = null;
var photoViewWindow = null;

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
	photoViewWindow.close();
}