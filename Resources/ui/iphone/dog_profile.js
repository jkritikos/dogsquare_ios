	
function buildDogProfileView(dId){
	var data = getDogById(dId);
	navController.getWindow().setTitle(data[0].name);
	
	var dogProfileView = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var dogProfileLabel = Ti.UI.createLabel({
		text:'dog profile'
	});
	dogProfileView.add(dogProfileLabel);
	
	var dogImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + data[0].photo);
	
	var dogProfilePhotoImage = Ti.UI.createImageView({ 
		image:dogImageFile.nativePath,
		height:272,
		top:0,
		width:'100%'
	});
	
	var dogProfileBreedBackground = Titanium.UI.createView({
		backgroundColor:'white',
		left:11,
		top:11,
		width:75,
		height:75,
		opacity:0.4,
		borderRadius:37.5,
		borderWidth:1,
		borderColor:'transparent',
	});
	dogProfilePhotoImage.add(dogProfileBreedBackground);
	
	var dogProfileBreedLabel = Titanium.UI.createLabel({ 
		text:'breed',
		height:14,
		textAlign:'center',
		top:63,
		left:36,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfilePhotoImage.add(dogProfileBreedLabel);
	
	var dogBreed = null;
	
	if(data[0].breed_id == 1){
		dogBreed = 'kannis';
	}else if(data[0].breed_id == 2){
		dogBreed = 'bull dog';
	}
	
	var dogProfileBreedTypeLabel = Titanium.UI.createLabel({ 
		text:dogBreed,
		height:'auto',
		width:42,
		textAlign:'center',
		top:25,
		left:27,
		font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfilePhotoImage.add(dogProfileBreedTypeLabel);
	
	dogProfileView.add(dogProfilePhotoImage);
	
	
	
	//opacity bar for info
	var dogProfileOpacityInfoBar = Titanium.UI.createView({ 
		backgroundColor:'white',
		width:'100%',
		top:169,
		height:56,
		opacity:0.8
	});
	
	var dividerLeftOffset = 0;
		
	for(i=0;i<=2;i++){
		var dogProfileDividerBar = Titanium.UI.createView({ 
			backgroundColor:'black',
			width:1,
			opacity:0.4,
			height:31,
			left:79 + dividerLeftOffset
		});
		dogProfileOpacityInfoBar.add(dogProfileDividerBar);
		
		dividerLeftOffset += 80;
	}
	
	var dogGender = null;
	var dogGenderLeft = null;
	
	if(data[0].gender == 1){
		dogGender = 'male';
		dogGenderLeft = 18;
	}else if(data[0].gender == 2){
		dogGender = 'female';
		dogGenderLeft = 13;
	}
	
	var dogProfileDogGenderLabel = Titanium.UI.createLabel({
		text:dogGender,
		height:21,
		textAlign:'right',
		left:dogGenderLeft,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileDogGenderLabel);
	
	var dogProfileGenderLabel = Titanium.UI.createLabel({ 
		text:'gender',
		height:19,
		textAlign:'center',
		left:19,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileGenderLabel);
	
	var dogProfileAgeNumberLabel = Titanium.UI.createLabel({
		text:data[0].age,
		height:21,
		textAlign:'right',
		left:111,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileAgeNumberLabel);
	
	var dogProfileAgeLabel = Titanium.UI.createLabel({ 
		text:'years old',
		height:19,
		textAlign:'center',
		left:94,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileAgeLabel);
	
	var dogProfileWeightLabel = Titanium.UI.createLabel({ 
		text:'weight',
		height:19,
		textAlign:'center',
		left:182,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileWeightLabel);
	
	var dogProfileWeightNumberLabel = Titanium.UI.createLabel({
		text:data[0].weight,
		height:21,
		textAlign:'center',
		left:181,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileWeightNumberLabel);
		
	var dogProfileWeightUnitLabel = Titanium.UI.createLabel({ 
		text:'kgs',
		height:17,
		textAlign:'center',
		left:200,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileWeightUnitLabel);
	
	var dogProfileLikesLabel = Titanium.UI.createLabel({ 
		text:'likes',
		height:19,
		textAlign:'center',
		left:266,
		bottom:4,
		font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileLikesLabel);
	
	var dogProfileLikesNumberLabel = Titanium.UI.createLabel({
		text:'25',
		height:21,
		textAlign:'center',
		left:260,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileLikesNumberLabel);
	
	dogProfilePhotoImage.add(dogProfileOpacityInfoBar);
	
	//opacity bar for description
	var dogProfileOpacityDescriptionBar = Titanium.UI.createView({ 
		backgroundColor:'white',
		width:'100%',
		top:229,
		height:31,
		opacity:0.8
	});
	
	var dogProfileDescriptionLabel = Titanium.UI.createLabel({ 
		text:'I\'m currently searching for a mate',
		height:19,
		textAlign:'center',
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	dogProfileOpacityDescriptionBar.add(dogProfileDescriptionLabel);
	
	dogProfilePhotoImage.add(dogProfileOpacityDescriptionBar);
	
	var dogProfileMoodLabel = Titanium.UI.createLabel({ 
		text:'Happy',
		color:'black',
		height:'auto',
		textAlign:'left',
		left:46,
		bottom:86,
		opacity:0.6,
		font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileView.add(dogProfileMoodLabel);
	
	var dogProfileMoodPercentLabel = Titanium.UI.createLabel({ 
		text:'53%',
		color:'999900',
		height:'auto',
		textAlign:'left',
		left:91,
		bottom:86,
		font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileView.add(dogProfileMoodPercentLabel);
	
	var dogProfileBoneImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'dog_profile/bone_default.png',
		bottom:79,
		right:38
	});
	dogProfileView.add(dogProfileBoneImage);
	
	var dogProfileHeartImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'checkin_place/best_icon_default.png',
		bottom:35,
		right:89
	});
	dogProfileView.add(dogProfileHeartImage);
	
	var dogProfileLikeMeLabel = Titanium.UI.createLabel({ 
		text:'Like me?',
		color:'black',
		height:'auto',
		textAlign:'left',
		left:47,
		bottom:36,
		opacity:0.8,
		font:{fontSize:11, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	dogProfileView.add(dogProfileLikeMeLabel);
	
	
	return dogProfileView;
}