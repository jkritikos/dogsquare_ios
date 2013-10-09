//UI components
var viewBadgeDetail = null;
var badgeDetailLargeBadgeImage = null;

function buildBadgeDetailView(id){
	if(viewBadgeDetail == null){
		var badgeObj = getBadgeDetails(id, 1);
		
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
			text:badgeObj.description,
			color:'black',
			width:253,
			top:40,
			font:{fontSize:10, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		badgeDetailBackground.add(badgeDetailDescriptionLabel);
		
		viewBadgeDetail.add(badgeDetailBackground);
		
		var badgeDetailDogImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/dog_silhouette.png',
			top:5
		});
		viewBadgeDetail.add(badgeDetailDogImage);
		
		var badgeDetailBadgeImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/color/' + 'badge_' + id + '.png',
			top:184,
			left:133
		});
		
		//viewBadgeDetail.add(badgeDetailBadgeImage);
		
		badgeDetailLargeBadgeImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/big/' + 'badge_' + id + '.png',
			top:100,
			left:49
		});
		viewBadgeDetail.add(badgeDetailLargeBadgeImage);
		
	}
	
	awardBadgeAnimation();
}

function awardBadgeAnimation(){
	var tmpMatrix = Ti.UI.create2DMatrix();
	tmpMatrix = tmpMatrix.scale(0.26);
	badgeDetailLargeBadgeImage.animate({transform:tmpMatrix, duration:1200});
}
