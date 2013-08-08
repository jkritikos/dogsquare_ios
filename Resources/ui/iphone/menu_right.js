//Right window
var winRight = Ti.UI.createWindow();

var rightTableView = Ti.UI.createTableView({
	font:{fontSize:11},
	rowHeight:40,
	data:[{title:'Home'},{title:'Profile'}, {title:'Map'}, {title:'Gallery'}, {title:'Inbox'}, {title:'Passport'},{title:'Find friends'},{title:'Settings'} ]
});

winRight.add(rightTableView);

//Creates and populates the right menu
function createRightMenu(){
	
}