//Map filters
var FILTER_PARK = 1;
var FILTER_HOMELESS = 2;
var FILTER_CRUELTY = 3;
var FILTER_PETSHOP = 4;
var FILTER_VETERINARY = 5;
var FILTER_DOG_HOSPITAL = 6;
var FILTER_PUBLIC_PLACE = 7;
var FILTER_BEACH = 8;
var FILTER_WORKPLACE = 9;
var FILTER_RECENTLY_OPEN = 100;
var FILTER_MATING = 101;
var FILTER_SAME_BREED = 102;

//UI components
var viewMapTargetMode = null;
var viewMap = null;
var mapSearchContainer = null;
var mapFilterCancelButton = null;
var mapSearchIcon = null;
var mapSearchTxtfield = null;
var mapSearchTxtfieldLabel = null;
var mapSearchCategoriesBackground = null;
var mapSearchCategoriesTableView = null;
var mapCheckInButton = null;
var mapview = null;
var mapSearchLastValue = "";
var mapSearchFilterData = [];

//Map coordinates
var mapLatitude = null;
var mapLongitude = null;

function buildMapView(windowMode){
	
	Titanium.Geolocation.getCurrentPosition(function(e){
	//Ti.Geolocation.addEventListener('location', function(e) {
		if (e.error) {
			Ti.API.error('map.js : geo - position' + e.error); 
			return;
		} 
		 
		mapLatitude = e.coords.latitude; 
		mapLongitude = e.coords.longitude; 
		var accuracy = e.coords.accuracy; 
		var timestamp = e.coords.timestamp;
		
		var locationObject = {
			lat:e.coords.latitude,
			lon:e.coords.longitude
		};
		
		//Persist our location for use in other views
		saveUserObject(locationObject); 
		 
		Ti.API.info('Got position lat '+mapLatitude+' lon '+mapLongitude+' with accuracy '+accuracy);
		 
		//map region object
		var mapRegion = {
			latitude: mapLatitude,
			longitude: mapLongitude,
			animate:true,
			latitudeDelta:0.003,
			longitudeDelta:0.003
		};
			
		mapview.setLocation(mapRegion);
		
		//Get all nearby places
		getPlacesByFilterOnline(null);
	});
	
	viewMapTargetMode = windowMode;
	CURRENT_VIEW = VIEW_MAP;
	
	viewMap = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//search field
	mapSearchContainer = Titanium.UI.createView({
		backgroundColor:'white',
		width:200,
		height:27
	});
	
	mapSearchIcon = Titanium.UI.createImageView({
		image:IMAGE_PATH+'menu_left/search_icon.png',
		left:5
	});
	
	mapSearchContainer.add(mapSearchIcon);
	
	mapSearchTxtfield = Titanium.UI.createTextField({
		left:35,
		width:155,
		field:'search'
	});
	
	mapSearchTxtfield.addEventListener('change', handleMapSearchTextFieldChange);
	mapSearchTxtfield.addEventListener('focus', handleMapSearchTextFieldFocus);
	mapSearchTxtfield.addEventListener('blur', handleMapSearchTextFieldBlur);
	
	mapSearchTxtfieldLabel = Titanium.UI.createLabel({
		text:'Search',
		color:'666666',
		textAlign:'center',
		opacity:0.3,
		left:3,
		font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	mapSearchTxtfield.add(mapSearchTxtfieldLabel);
	
	mapSearchContainer.add(mapSearchTxtfield);
	
	if(viewMapTargetMode == TARGET_MODE_REUSE){
		navController.getWindow().setTitleControl(mapSearchContainer);
	}
	
	mapSearchCategoriesBackground = Titanium.UI.createView({
		backgroundColor:UI_BACKGROUND_COLOR,
		width:320,
		height:'100%',
		opacity:0,
		zIndex:3
	});
		
	mapSearchCategoriesTableView = Ti.UI.createTableView({
		backgroundColor:UI_BACKGROUND_COLOR,
		sepparatorColor:'d3d2d2',
		top:13,
		width:293
	});
	mapSearchCategoriesBackground.add(mapSearchCategoriesTableView);
	
	mapSearchCategoriesTableView.addEventListener('scroll', handleMapSearchCategoriesScroll);
	mapSearchCategoriesTableView.addEventListener('click', handleMapSearchCategoriesRows);
	
	//inbox table view footer
	mapSearchCategoriesTableView.footerView = Ti.UI.createView({
	    height: 1,
	    backgroundColor: 'transparent'
	});
	
	//Prepare filters table
	mapSearchFilterData.push(createMapFilterRow(FILTER_PARK));
	mapSearchFilterData.push(createMapFilterRow(FILTER_HOMELESS));
	mapSearchFilterData.push(createMapFilterRow(FILTER_CRUELTY));
	mapSearchFilterData.push(createMapFilterRow(FILTER_PETSHOP));
	mapSearchFilterData.push(createMapFilterRow(FILTER_VETERINARY));
	mapSearchFilterData.push(createMapFilterRow(FILTER_DOG_HOSPITAL));
	mapSearchFilterData.push(createMapFilterRow(FILTER_RECENTLY_OPEN));
	mapSearchFilterData.push(createMapFilterRow(FILTER_MATING));
	mapSearchFilterData.push(createMapFilterRow(FILTER_SAME_BREED));
	mapSearchFilterData.push(createMapFilterRow(FILTER_PUBLIC_PLACE));
	mapSearchFilterData.push(createMapFilterRow(FILTER_BEACH));
	mapSearchFilterData.push(createMapFilterRow(FILTER_WORKPLACE));

	mapSearchCategoriesTableView.setData(mapSearchFilterData);

	viewMap.add(mapSearchCategoriesBackground);
	
	mapCheckInButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'map/pin_checkIn.png',
		bottom:0,
		width:67,
		height:67,
		zIndex:2
	});
	
	viewMap.add(mapCheckInButton);
	
	//cancel button for map filters
	mapFilterCancelButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/Done_button.png',
	    width:54,
	    height:34
	});
	
	mapFilterCancelButton.addEventListener('click', handleCloseFilterViewButton);
	
	mapCheckInButton.addEventListener('click', function(){
		Ti.include('ui/iphone/checkin.js');
		
		//checkin window
		var checkinWindow = Ti.UI.createWindow({
			backgroundColor:UI_BACKGROUND_COLOR,
			//barImage:IMAGE_PATH+'common/bar.png',
			translucent:false,
			barColor:UI_COLOR,
			title:'Check in'
		});
		
		checkinWindow.setTitle('Check in');
		
		//back button
		var checkinBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		checkinWindow.setLeftNavButton(checkinBackButton);
		
		checkinBackButton.addEventListener("click", function() {
		    navController.close(checkinWindow);
		    
		    if(viewMapTargetMode == TARGET_MODE_REUSE){
		    	Ti.API.info('Back from checkin.js - target mode is REUSE');
		    	navController.getWindow().setTitleControl(mapSearchContainer);
		    } else {
		    	Ti.API.info('Back from checkin.js - target mode is NEW WIN');
		    	openWindows[openWindows.length-1].setTitleControl(mapSearchContainer);
		    }
		});
		
		checkinWindow.add(checkinView);
		openWindows.push(checkinWindow);
		navController.open(checkinWindow);
	});
	 
	mapview = Titanium.Map.createView({
		width:'100%',
		top:0,
	    mapType: Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    visible:true
	});
	
	viewMap.add(mapview);
	
	//Event listener for map annotations
	mapview.addEventListener('click', handleMapAnnotationClick);
}

//Event listener for map annotation click events
function handleMapAnnotationClick(e){
	var annotation = e.annotation;
	var source = e.clicksource;
	
	if(source == 'rightButton'){
		if(annotation.place_id){
			var placeId = annotation.place_id;
			var placeTitle = annotation.title;
			
			Ti.include('ui/iphone/place_view.js');
			
			var checkinPlaceWindow = Ti.UI.createWindow({
				backgroundColor:UI_BACKGROUND_COLOR,
				translucent:false,
				//barImage:IMAGE_PATH+'common/bar.png',
				barColor:UI_COLOR
			});
			
			//back button
			var checkinPlaceBackButton = Ti.UI.createButton({
			    backgroundImage: IMAGE_PATH+'common/back_button.png',
			    width:48,
			    height:33
			});
			
			checkinPlaceWindow.setLeftNavButton(checkinPlaceBackButton);
			
			checkinPlaceBackButton.addEventListener("click", function() {
			    navController.close(checkinPlaceWindow);
			});
			
			checkinPlaceWindow.setTitle(placeTitle);
			var checkinPlaceView = buildCheckinPlaceView(CHECKIN_PLACE_VIEW, placeId);
			
			checkinPlaceWindow.add(checkinPlaceView);
			openWindows.push(checkinPlaceWindow);
			//openWindows[1] = checkinPlaceWindow;
			navController.open(checkinPlaceWindow);
		} else if(annotation.user_id){
			
		}
	}
	
	

}

function handleMapSearchCategoriesScroll(){
	mapSearchTxtfield.blur();
}

//Event handler for focusing on the search textfield
function handleMapSearchTextFieldFocus(e){
	mapSearchCategoriesBackground.animate({opacity:1, duration:400});
	
	//add the cancel button
	if(viewMapTargetMode == TARGET_MODE_REUSE){
		navController.getWindow().setRightNavButton(mapFilterCancelButton);
	} else if(viewMapTargetMode == TARGET_MODE_NEW_WINDOW){
		openWindows[openWindows.length-1].setRightNavButton(mapFilterCancelButton);
	}
}

function handleMapSearchTextFieldChange(e){
	if(mapSearchTxtfield.value != ''){
		mapSearchTxtfieldLabel.hide();
		
		//search for places
		if(mapSearchTxtfield.value.length > 2 && mapSearchTxtfield.value != mapSearchLastValue){
			
			//sweet anti-flooding approach
			clearTimeout(timers['autocomplete_map']);
			timers['autocomplete_map'] = setTimeout(function(){
	        	mapSearchLastValue = mapSearchTxtfield.value;
	         	searchNearbyPlaces(mapSearchTxtfield.value);
	      	}, 300);
		}
	}else{
		mapSearchTxtfieldLabel.show();
	}
}

function handleMapSearchTextFieldBlur(e){
	if(mapSearchTxtfield.value == ''){
		mapSearchTxtfieldLabel.show();
	}
}

//Returns the filter object according to the specified id
function getMapFilter(filter){
	if(filter == FILTER_PARK){
		icon = IMAGE_PATH+'map_filters/park_icon.png';
		label = 'Park';
	} else if(filter == FILTER_HOMELESS){
		icon = IMAGE_PATH+'map_filters/homeless_icon.png';
		label = 'Homeless';
	}else if(filter == FILTER_CRUELTY){
		icon = IMAGE_PATH+'map_filters/cruelty_icon.png';
		label = 'Cruelty';
	} else if(filter == FILTER_PETSHOP){
		icon = IMAGE_PATH+'map_filters/petshop_icon.png';
		label = 'Pet shop';
	} else if(filter == FILTER_VETERINARY){
		icon = IMAGE_PATH+'map_filters/veterinary_icon.png';
		label = 'Veterinary';
	} else if(filter == FILTER_DOG_HOSPITAL){
		icon = IMAGE_PATH+'map_filters/dogHospital_icon.png';
		label = 'Dog Hospital';
	} else if(filter == FILTER_RECENTLY_OPEN){
		icon = IMAGE_PATH+'map_filters/recentlyOpened_icon.png';
		label = 'Recently open';
	} else if(filter == FILTER_MATING){
		icon = IMAGE_PATH+'map_filters/matting_icon.png';
		label = 'Mating';
	} else if(filter == FILTER_SAME_BREED){
		icon = IMAGE_PATH+'map_filters/sameBreed_icon.png';
		label = 'Same breed';
	} else if(filter == FILTER_BEACH){
		icon = IMAGE_PATH+'map_filters/beach_icon.png';
		label = 'Beach';
	} else if(filter == FILTER_WORKPLACE){
		icon = IMAGE_PATH+'map_filters/workplace_icon.png';
		label = 'Workplace';
	} else if(filter == FILTER_PUBLIC_PLACE){
		icon = IMAGE_PATH+'map_filters/publicplace_icon.png';
		label = 'Public place';
	}
	
	var obj = {
		icon:icon,
		label:label
	};
	
	return obj;
}

function createMapFilterRow(filter){
	var row = Ti.UI.createTableViewRow({
		height:47,
		className:'mapFilter',
		backgroundColor:'white',
		selectedBackgroundColor:'transparent',
		filter:filter
	});
		
	var filterObject = getMapFilter(filter);
	var icon = filterObject.icon;
	var label = filterObject.label;
	
	var rowIcon = Titanium.UI.createImageView({
		image:icon,
		left:7
	});
	
	var rowLabel = Titanium.UI.createLabel({
		text:label,
		color:'#716767',
		left:52,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	row.add(rowIcon);
	row.add(rowLabel);
	
	return row;
}

//Event handler for closing the map filter view
function handleCloseFilterViewButton(){
	Ti.API.info('Map filter DONE button pressed');
	//Close the filter view and revert to the standard right nav button
	mapSearchCategoriesBackground.animate({opacity:0, duration:400}, function(){
		//Revert back to the filters table
		mapSearchCategoriesTableView.setData(mapSearchFilterData);
	});
	
	//handle the cancel button
	if(viewMapTargetMode == TARGET_MODE_REUSE){
		navController.getWindow().setRightNavButton(rightBtn);
	} else if(viewMapTargetMode == TARGET_MODE_NEW_WINDOW){
		openWindows[openWindows.length-1].setRightNavButton(null);
	}
	
	mapSearchTxtfield.blur();
}

//Event handler for the filter/search results table
function handleMapSearchCategoriesRows(e){
	navController.getWindow().setRightNavButton(rightBtn);
	mapSearchTxtfield.blur();
	mapSearchCategoriesBackground.animate({opacity:0, duration:400});
	
	if(e.row.filter){
		Ti.API.info('MapTable click on a FILTER');
		var filter = e.row.filter;
		getPlacesByFilterOnline(filter);
	} else if(e.row.searchResultId){
		Ti.API.info('MapTable click on a RESULT');
		
		var placeId = e.row.searchResultId;
		var placeTitle = e.row.children[0].text;
	
		Ti.include('ui/iphone/place_view.js');
	
		var checkinPlaceWindow = Ti.UI.createWindow({
			backgroundColor:UI_BACKGROUND_COLOR,
			translucent:false,
			//barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR
		});
	
		//back button
		var checkinPlaceBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		checkinPlaceWindow.setLeftNavButton(checkinPlaceBackButton);
		
		checkinPlaceBackButton.addEventListener("click", function() {
		    navController.close(checkinPlaceWindow);
		});
		
		checkinPlaceWindow.setTitle(placeTitle);
		var checkinPlaceView = buildCheckinPlaceView(CHECKIN_PLACE_VIEW, placeId);
		
		checkinPlaceWindow.add(checkinPlaceView);
		openWindows.push(checkinPlaceWindow);
		//openWindows[1] = checkinPlaceWindow;
		navController.open(checkinPlaceWindow);		
	}
}

//Searches for nearby places according to the user input from the searchfield on the navbar
function searchNearbyPlaces(placeName){
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in searchNearbyPlaces() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('searchNearbyPlaces() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		showMapSearchResults(jsonData.data.places);
	};
	
	xhr.open('GET',API+'getPlaces');
	xhr.send({
		user_id:userObject.userId,
		lat:mapLatitude,
		lon:mapLongitude,
		name:placeName,
		breed_list:[]
	});
}

//Updates the filter table with the search results
function showMapSearchResults(data){
	var tableRows = [];
	
	if(data.length > 0){
		for(var i=0; i < data.length; i++){
			
			var rowIcon = Titanium.UI.createImageView({
				image:getMapFilter(data[i].category_id).icon,
				left:7
			});
			
			var row = Ti.UI.createTableViewRow({
				height:47,
				backgroundColor:'white',
				selectedBackgroundColor:'transparent',
				searchResultId:data[i].id
			});
			
			var rowLabel = Titanium.UI.createLabel({
				text:data[i].name,
				color:'#716767',
				width:170,
				height:24,
				left:52,
				font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			
			var rowDistance = Titanium.UI.createLabel({
				text:data[i].distance,
				color:'#716767',
				right:10,
				textAlign:'right',
				font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			
			row.add(rowLabel);
			row.add(rowDistance);
			row.add(rowIcon);
			
			tableRows.push(row);		
		}
	} else {
		var row = Ti.UI.createTableViewRow({
			height:47,
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		var rowLabel = Titanium.UI.createLabel({
			text:'No results',
			color:'#716767',
			left:12,
			font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		row.add(rowLabel);
		
		tableRows.push(row);
	}
	
	mapSearchCategoriesTableView.setData(tableRows);
}

//get places by filter 
function getPlacesByFilterOnline(catId){
	var currentUser = getUserObject();
	Ti.API.info('getPlacesByFilterOnline() called for user '+currentUser.userId+' with lat '+mapLatitude+' and lon '+mapLongitude);
	
	var dogBreeds = [];
	
	if(catId != null && catId == FILTER_SAME_BREED) {
		var dogs  = getDogs();
		
		for(i=0;i<dogs.length;i++){
			dogBreeds.push(dogs[i].breed_id);
		}
	}
	
	var dogBreeds = JSON.stringify(dogBreeds);
	
	//progress view
	if(catId != null){
		var progressView = new ProgressView({window:viewMap});
		progressView.show({
			text:"Loading..."
		});
	}
	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in getPlacesByFilterOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('getPlacesByFilterOnline() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		//Hide progress view
		if(catId != null){
			progressView.hide();
		}
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
		
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
			updateMapWithAnnotations(jsonData.data.places);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		}
	};
	
	xhr.open('GET',API+'getPlaces');
	xhr.send({
		user_id:currentUser.userId,
		lat:mapLatitude,
		lon:mapLongitude,
		category_id:catId,
		breed_list:dogBreeds
	});
}

//Displays the map annotations
function updateMapWithAnnotations(places){
	var annotationArray = [];
	
	if(places.length != 0 && places != null){
		for(i=0;i<places.length;i++){
			
			var customPin2 = Ti.UI.createView({
				backgroundImage:IMAGE_PATH+'map/pin_user.png',
				width:76,
				height:86
			});
			
			//Add the place thumb, if available
			var placeImage = Ti.UI.createImageView({
				image:REMOTE_PLACE_IMAGES + places[i].thumb,
				defaultImage:IMAGE_PATH+'common/default_place_photo.png',
				zIndex:2,
				top:3
			});
			
			customPin2.add(placeImage);
			
			var customView = Ti.UI.createView({
				backgroundColor:'red',
				width:50,
				height:30
			});
			
			var mapAnnotations = Titanium.Map.createAnnotation({
				latitude:places[i].lat,
				longitude:places[i].lon,
				title:places[i].name,
				animate:true,
				customView:customPin2,
				rightButton:IMAGE_PATH+'map/arrow_icon.png',
				place_id:places[i].id
			});
			
			annotationArray.push(mapAnnotations);
		}
		
		mapview.setAnnotations(annotationArray);
	}else{
		mapview.annotations = [];
	}
}