var termsWindow = null;

//Build the terms view
function buildTermsView(){
	termsWindow = Ti.UI.createWindow({
		backgroundColor:'black',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		modal:true,
		title:'Terms'
	});
	
	var termsScrollView = Ti.UI.createScrollView({
		backgroundColor:UI_BACKGROUND_COLOR,
		contentHeight:'90%'
	});
	termsWindow.add(termsScrollView);
	
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'terms.txt');
	var contents = file.read();
	
	var termsTextLabel = Ti.UI.createLabel({
		text:contents,
		color:'black',
		textAlign:'center',
		width:280,
		top:30,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	termsScrollView.add(termsTextLabel);
	
	var termsDoneButton = Titanium.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34,
	    right:6
	});
	termsWindow.setRightNavButton(termsDoneButton);
	
	termsDoneButton.addEventListener('click', function(e){
		termsWindow.close();
	});
}