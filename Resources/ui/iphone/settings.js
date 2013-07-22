var viewSettings = Ti.UI.createView({
	backgroundColor:'black'
});

var settingsMenuTable = Ti.UI.createTableView({
	top:40
});

settingsMenuTable.addEventListener('singletap', function(e){// changed to singletap to avoid clicking while moving
	Ti.API.info('Settings item '+e.index);
	var settingsChoiceWindow = Ti.UI.createWindow({
		url:'ui/iphone/settings_privacy.js',
		backgroundColor:'red',
		barColor:'#28292c',
		title:'sub settings',
		backButtonTitle:'Back'
	});
	
	navGroup.open(settingsChoiceWindow);
});

var data = [];
for(var i = 1; i <= 6; i++) {
    var row = Ti.UI.createTableViewRow({
    	height:60
    });
    var label = Ti.UI.createLabel({
        font : {
            fontSize : 20,
            fontWeight : 'bold'
        },
        left : 10,
        text : 'Settings ' + (i)
    });
 
    row.add(label);
    data.push(row);
}
 
settingsMenuTable.setData(data);

viewSettings.add(settingsMenuTable);
