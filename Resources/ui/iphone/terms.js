var termsWindow = null;
var termsNavWin = null;

//Build the terms view
function buildTermsView(type){
	termsWindow = Ti.UI.createWindow({
		backgroundColor:'black',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		translucent:false,
		modal:true
	});
	
	//check if version is ios 7 and higher and create new navigationWindow (3.1.3.GA)
	if(iOS7){
		termsNavWin = Ti.UI.iOS.createNavigationWindow({
		    modal: true,
		    window: termsWindow
		});
	}
	
	var termsScrollView = Ti.UI.createScrollView({
		backgroundColor:UI_BACKGROUND_COLOR,
		height:'auto'
	});
	termsWindow.add(termsScrollView);
	
	//var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'terms.txt');
	//var contents = file.read();
	
	var termsTransparentView = Ti.UI.createScrollView({
		backgroundColor:'transparent',
		height:'auto',
		bottom:30,
		top:30
	});
	termsScrollView.add(termsTransparentView);
	
	/*var termsTextLabel = Ti.UI.createLabel({
		text:contents,
		color:'black',
		textAlign:'center',
		width:280,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	termsTransparentView.add(termsTextLabel);*/
	
	var termsPdfView = Ti.UI.createWebView({
		height:'auto'
	});
	termsScrollView.add(termsPdfView);
	
	if(type == VIEW_TERMS){
		termsPdfView.url = SERVER+'files/terms.pdf';
		termsWindow.title = 'Terms & Conditions';
	}else if(type == VIEW_PRIVACY){
		termsPdfView.url = SERVER+'files/privacy.pdf';
		termsWindow.title = 'Privacy Policy';
	}
	
	var termsDoneButton = Titanium.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34,
	    right:6
	});
	termsWindow.setRightNavButton(termsDoneButton);
	
	termsDoneButton.addEventListener('click', function(e){
		if(iOS7){
			termsNavWin.close();
		}else{
			termsWindow.close();
		}
	});
}