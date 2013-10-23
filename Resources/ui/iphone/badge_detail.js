//UI components
var viewBadgeDetail = null;
var badgeDetailLargeBadgeImage = null;

function buildBadgeDetailView(id, awardBadge, badgeFlag){
	if(viewBadgeDetail == null){
		var badgeObj = getBadgeDetails(id);
		
		viewBadgeDetail = Ti.UI.createView({
			backgroundColor:'white'
		});
		
		var badgeDetailBackground = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR,
			top:250
		});
		
		var badgeDetailTitleBar = Ti.UI.createView({
			backgroundColor:'white',
			top:10,
			height:23
		});
		badgeDetailBackground.add(badgeDetailTitleBar);
		
		var badgeDetailTitleLabel = Titanium.UI.createLabel({
			text:'The ' + badgeObj.title +' badge',
			color:'black',
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		badgeDetailTitleBar.add(badgeDetailTitleLabel);
		
		var badgeDetailDescriptionLabel = Titanium.UI.createLabel({
			text:awardBadge ? badgeObj.award : badgeObj.description,
			color:'black',
			textAlign:'center',
			width:253,
			top:40,
			font:{fontSize:12, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		badgeDetailBackground.add(badgeDetailDescriptionLabel);
		
		viewBadgeDetail.add(badgeDetailBackground);
		
		var badgeDetailDogImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/dog_silhouette.png',
			top:5
		});
		viewBadgeDetail.add(badgeDetailDogImage);
		
		//Animate the badge if we are awarding it now
		if(awardBadge){
			badgeDetailLargeBadgeImage = Titanium.UI.createImageView({
				image:IMAGE_PATH+'badges/big/' + 'badge_' + id + '.png',
				//top:IPHONE5? 55 :100,
				//left:IPHONE5? 4: 49
				top:IPHONE5? 55 :55,
				left:IPHONE5? 4: 4
			});
			
			viewBadgeDetail.add(badgeDetailLargeBadgeImage);
			
			awardBadgeAnimation();
		} else {
			var badgeDetailBadgeImage = Titanium.UI.createImageView({
				image:IMAGE_PATH+'badges/'+(badgeFlag ? 'color' : 'grey')+'/' + 'badge_' + id + '.png',
				top:184,
				left:133
			});
			
			viewBadgeDetail.add(badgeDetailBadgeImage);
		}
	}
}

//Performs the animation for badge awarding
function awardBadgeAnimation(){
	var scale = RETINA_DEVICE? 0.19 : 0.26;
	var tmpMatrix = Ti.UI.create2DMatrix();
	tmpMatrix = tmpMatrix.scale(scale);
	badgeDetailLargeBadgeImage.animate({transform:tmpMatrix, duration:1200});
}
