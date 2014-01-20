function buildMapPlaceView(lat, lon){
	var mapview = Titanium.Map.createView({
		width:'100%',
		height:'100%',
		top:0,
	    mapType: Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    visible:true
	});
	
	//update map
	var mapRegion = {
		latitude: lat,
		longitude: lon,
		animate:false
	};
	
	mapview.setLocation(mapRegion);
	
	//annotation
	var annotations = [];
	
	//update map and put annotation
	var checkinPlaceMapAnnotation = Ti.Map.createAnnotation({
        animate: false,
        latitude:lat,
        longitude:lon,
        image:IMAGE_PATH+'checkin_place/pin_map.png'
   });
	
	annotations.push(checkinPlaceMapAnnotation);
	mapview.annotations = annotations;
	
	return mapview; 
}
