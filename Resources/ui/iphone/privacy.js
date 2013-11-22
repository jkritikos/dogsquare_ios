var privacyWindow = null;
var privacyNavWin = null;

//Build the privacy view
function buildPrivacyView(){
	privacyWindow = Ti.UI.createWindow({
		backgroundColor:'black',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		translucent:false,
		modal:true,
		title:'Privacy'
	});
	
	//check if version is ios 7 and higher and create new navigationWindow (3.1.3.GA)
	if(iOS7){
		privacyNavWin = Ti.UI.iOS.createNavigationWindow({
		    modal: true,
		    window: privacyWindow
		});
	}
	
	var privacyScrollView = Ti.UI.createScrollView({
		backgroundColor:UI_BACKGROUND_COLOR,
		height:'auto'
	});
	privacyWindow.add(privacyScrollView);
	
	var privacyTransparentView = Ti.UI.createScrollView({
		backgroundColor:'transparent',
		height:'auto',
		bottom:30,
		top:30
	});
	privacyScrollView.add(privacyTransparentView);
	
	var privacyPdfView = Ti.UI.createWebView({
		url:'http://dogsquare/files/privacy.pdf',
		height:'auto'
	});
	privacyScrollView.add(privacyPdfView);
	
	var privacyDoneButton = Titanium.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34,
	    right:6
	});
	privacyWindow.setRightNavButton(privacyDoneButton);
	
	privacyDoneButton.addEventListener('click', function(e){
		if(iOS7){
			privacyNavWin.close();
		}else{
			privacyWindow.close();
		}
	});
}