var tourWindow = null;
var tourNavWin = null;

function openTourView(){
	tourWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		modal:true,
		translucent:false,
		barImage:iOS7 ? IMAGE_PATH+'common/bar7.png' : IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Tour'
	});
		
	if(iOS7){
		tourNavWin  = Ti.UI.iOS.createNavigationWindow({
		    modal: true,
		    window: tourWindow
		});
	} 
	
	var tourDoneButton = Titanium.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:48,
	    height:33
	});
	
	tourWindow.setRightNavButton(tourDoneButton);
	
	tourDoneButton.addEventListener('click', function(e){
		if(iOS7){
			tourNavWin.close();
		}else{
			tourWindow.close();
		}
	});
	
	//tour content
	var view1 = Ti.UI.createImageView({backgroundColor:'white',image:IPHONE5? IMAGE_PATH+'tour/1-568h@2x.png' : IMAGE_PATH+'tour/1.png' });
	var view2 = Ti.UI.createImageView({backgroundColor:'white',image:IPHONE5? IMAGE_PATH+'tour/2-568h@2x.png' : IMAGE_PATH+'tour/2.png' });
	var view3 = Ti.UI.createImageView({backgroundColor:'white',image:IPHONE5? IMAGE_PATH+'tour/3-568h@2x.png' : IMAGE_PATH+'tour/3.png' });
	var view4 = Ti.UI.createImageView({backgroundColor:'white',image:IPHONE5? IMAGE_PATH+'tour/4-568h@2x.png' : IMAGE_PATH+'tour/4.png' });
	var view5 = Ti.UI.createImageView({backgroundColor:'white',image:IPHONE5? IMAGE_PATH+'tour/5-568h@2x.png' : IMAGE_PATH+'tour/5.png' });
	var view6 = Ti.UI.createImageView({backgroundColor:'white',image:IPHONE5? IMAGE_PATH+'tour/6-568h@2x.png' : IMAGE_PATH+'tour/6.png' });
	var view7 = Ti.UI.createImageView({backgroundColor:'white',image:IPHONE5? IMAGE_PATH+'tour/7-568h@2x.png' : IMAGE_PATH+'tour/7.png' });
	
	var scrollableView = Ti.UI.createScrollableView({
	  views:[view1,view2,view3,view4,view5,view6,view7],
	  showPagingControl:true
	});
	
	tourWindow.add(scrollableView);	
	
	//open win
	if(iOS7){
		tourNavWin.open();
	}else{
		tourWindow.open();
	}
}
