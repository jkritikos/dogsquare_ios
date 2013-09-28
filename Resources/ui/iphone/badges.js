//UI components
var viewBadges = null;

function buildBadgesView(){
	CURRENT_VIEW = VIEW_BADGES;
	
	if(viewBadges == null){
		//notifications view
		viewBadges = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
	}
}