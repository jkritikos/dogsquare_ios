var tourWindow = null;
var tourNavWin = null;

function openTourView(){
	tourWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		modal:true,
		translucent:false,
		barImage:iOS7 ? IMAGE_PATH+'common/bar7.png' : IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		//barColor:UI_COLOR,
		title:'Tour'
	});
		
	//if(iOS7){
		tourNavWin  = Ti.UI.iOS.createNavigationWindow({
		    modal: true,
		    window: tourWindow
		});
	//} 
	
	var tourDoneButton = Titanium.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:48,
	    height:33
	});
	
	tourWindow.setRightNavButton(tourDoneButton);
	
	tourDoneButton.addEventListener('click', function(e){
		//if(iOS7){
			tourNavWin.close();
		//}else{
		//	tourWindow.close();
		//}
	});
	
	//tour content
	var view1 = Ti.UI.createImageView({backgroundColor:'#cbcad8',image:IPHONE5? IMAGE_PATH+'tour/1-568h@2x.jpg' : IMAGE_PATH+'tour/1.jpg' });
	var view2 = Ti.UI.createImageView({backgroundColor:'#cbcad8',image:IPHONE5? IMAGE_PATH+'tour/2-568h@2x.jpg' : IMAGE_PATH+'tour/2.jpg' });
	var view3 = Ti.UI.createImageView({backgroundColor:'#cbcad8',image:IPHONE5? IMAGE_PATH+'tour/3-568h@2x.jpg' : IMAGE_PATH+'tour/3.jpg' });
	var view4 = Ti.UI.createImageView({backgroundColor:'#cbcad8',image:IPHONE5? IMAGE_PATH+'tour/4-568h@2x.jpg' : IMAGE_PATH+'tour/4.jpg' });
	var view5 = Ti.UI.createImageView({backgroundColor:'#cbcad8',image:IPHONE5? IMAGE_PATH+'tour/5-568h@2x.jpg' : IMAGE_PATH+'tour/5.jpg' });
	var view6 = Ti.UI.createImageView({backgroundColor:'#cbcad8',image:IPHONE5? IMAGE_PATH+'tour/6-568h@2x.jpg' : IMAGE_PATH+'tour/6.jpg' });
	
	var scrollableView = Ti.UI.createScrollableView({
	  views:[view1,view2,view3,view4,view5,view6],
	  showPagingControl:true
	});
	
	tourWindow.add(scrollableView);	
	
	//open win
	//if(iOS7){
		tourNavWin.open();
	//}else{
	//	tourWindow.open();
	//}
}
