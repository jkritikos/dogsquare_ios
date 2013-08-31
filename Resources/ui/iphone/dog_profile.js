	
function buildDogProfileView(dId){
	Ti.API.info('dog id is: ' + dId);
	
	var dogProfileView = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var dogProfileLabel = Ti.UI.createLabel({
		text:'dog profile'
	});
	dogProfileView.add(dogProfileLabel);
	
	
	
	var dogProfilePhotoImage = Ti.UI.createImageView({ 
		image:IMAGE_PATH+'profile_other/jim.jpg',
		height:272,
		top:0,
		width:'100%'
	});
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
	
	//dogProfile
	
	var dogProfileDogGenderLabel = Titanium.UI.createLabel({
		text:'female',
		height:21,
		textAlign:'right',
		left:13,
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
		text:'9',
		height:21,
		textAlign:'right',
		left:93,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileAgeNumberLabel);
	
	var dogProfileAgeUnitLabel = Titanium.UI.createLabel({ 
		text:'months',
		height:17,
		textAlign:'center',
		left:107,
		top:14,
		font:{fontSize:9, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileAgeUnitLabel);
	
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
		text:'4',
		height:21,
		textAlign:'center',
		left:187,
		top:10,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	dogProfileOpacityInfoBar.add(dogProfileWeightNumberLabel);
		
	var dogProfileWeightUnitLabel = Titanium.UI.createLabel({ 
		text:'kgs',
		height:17,
		textAlign:'center',
		left:196,
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