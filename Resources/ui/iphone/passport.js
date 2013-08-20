//passport view
var viewPassport = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

//creation of a button
var addNoteButton = Ti.UI.createButton({
	title:'add',
    width:48,
    height:33
});
navController.getWindow().setRightNavButton(addNoteButton);
//next button event listener
addNoteButton.addEventListener("click", handleAddNoteButton);

//passport table view
var passportTableView = Titanium.UI.createTableView({
	minRowHeight:71,
	width:293,
	backgroundColor:UI_BACKGROUND_COLOR,
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	top:24,
	bottom:0,
	allowsSelection:false
});
viewPassport.add(passportTableView);

//data for the sections
var data = [];

//section creation and data will change
var array1 = [{title:'Vet', description:'Appointment for Lory’s vaccine', date:'26 / 08 / 2013'}];

var array2 = [{title:'Vet for Jeremy', description:'Appointment for Jeremy’s vaccine', date:'26 / 07 / 2013'},
			  {title:'Lory’s Bath', description:'Appointment for Lory’s Bath at 18.00 pm', date:'12 / 07 / 2013'}];

//SECTION 1
var tableViewSection1 = Titanium.UI.createTableViewSection({
	height:'auto',
	backgroundColor:'transparent'
});
//populate section
populateTableViewSection(array1, 1, 'August 2013');

data.push(tableViewSection1);
passportTableView.setData(data);

//SECTION 2
var tableViewSection2 = Titanium.UI.createTableViewSection({
	height:'auto',
	backgroundColor:'transparent'
});
populateTableViewSection(array2, 2, 'July 2013');

data.push(tableViewSection2);
passportTableView.setData(data);
//spacing between sections
tableViewSection2.headerView = Ti.UI.createView({height:30});

//handle next button
function handleAddNoteButton() {
	Ti.include('ui/iphone/add_note.js');
    navController.open(addNoteWindow);
}

//populate section
function populateTableViewSection(array, section, month) {
	var tableRows = [];
	
	///////////////////START OF FIRST ROW//////////////////
	var passportRow1 = Ti.UI.createTableViewRow({
		className:'passportRow1',
		height:90,
		width:'100%',
		backgroundColor:UI_BACKGROUND_COLOR,
		selectedBackgroundColor:'transparent'
	});
	
	//background
	var passportRowBackground1 = Ti.UI.createView({
		height:71,
		width:'100%',
		bottom:2,
		backgroundColor:'white'
	});
	passportRow1.add(passportRowBackground1);
	
	//category date label
	var rowCategoryDateLabel1 = Titanium.UI.createLabel({ 
		text:month,
		color:'black',
		top:0,
		height:14,
		width:'auto',
		textAlign:'left',
		left:0,
		font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	passportRow1.add(rowCategoryDateLabel1);
	
	//category number label
	var rowCategoryNumberLabel1 = Titanium.UI.createLabel({ 
		text:section,
		color:'black',
		top:0,
		textAlign:'right',
		right:0,
		font:{fontSize:11, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	passportRow1.add(rowCategoryNumberLabel1);
	
	//title label
	var rowTitleLabel1 = Titanium.UI.createLabel({ 
		text:array[0].title,
		color:'black',
		top:4,
		height:22,
		width:'auto',
		textAlign:'left',
		left:7,
		font:{fontSize:20, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	passportRowBackground1.add(rowTitleLabel1);
	
	//description label
	var rowDescriptionLabel1 = Titanium.UI.createLabel({ 
		text:array[0].description,
		color:'black',
		height:18,
		width:'auto',
		textAlign:'left',
		left:7,
		font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	passportRowBackground1.add(rowDescriptionLabel1);
	
	//date label
	var rowDateLabel1 = Titanium.UI.createLabel({ 
		text:array[0].date,
		color:'black',
		top:46,
		height:12,
		width:'auto',
		textAlign:'left',
		left:7,
		font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	passportRowBackground1.add(rowDateLabel1);
	
	//date sepparator
	var rowDateSepparator1 = Titanium.UI.createView({ 
		width:'100%',
		top:14,
		height:1,
		backgroundColor:UI_COLOR
	});
	passportRow1.add(rowDateSepparator1);
	
	//row sepparator
	var rowSepparator1 = Titanium.UI.createView({ 
		width:'100%',
		bottom:0,
		height:2,
		backgroundColor:UI_BACKGROUND_COLOR
	});
	passportRow1.add(rowSepparator1);
	
	//this will change
	if(section == 1 ){
		tableViewSection1.add(passportRow1);
	}else if(section == 2 ){
		tableViewSection2.add(passportRow1);
	}
	///////////////////END OF FIRST ROW//////////////////
	
	///////////////////START OF NEXT ROW//////////////////
	for(i=1;i<array.length;i++){
		var passportRow = Ti.UI.createTableViewRow({
			className:'passportRow1',
			height:73,
			width:'100%',
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		var rowTitleLabel = Titanium.UI.createLabel({ 
			text:array[i].title,
			color:'black',
			top:4,
			height:22,
			width:'auto',
			textAlign:'left',
			left:7,
			font:{fontSize:20, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		passportRow.add(rowTitleLabel);
		
		var rowDescriptionLabel = Titanium.UI.createLabel({ 
			text:array[i].description,
			color:'black',
			height:18,
			width:'auto',
			textAlign:'left',
			left:7,
			font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		passportRow.add(rowDescriptionLabel);
		
		var rowDateLabel = Titanium.UI.createLabel({ 
			text:array[i].date,
			color:'black',
			top:46,
			height:12,
			width:'auto',
			textAlign:'left',
			left:7,
			font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		passportRow.add(rowDateLabel);
		
		var rowSepparator1 = Titanium.UI.createView({ 
			width:'100%',
			bottom:0,
			height:2,
			backgroundColor:UI_BACKGROUND_COLOR
		});
		passportRow1.add(rowSepparator1);
		
		if(section == 1 ){
			tableViewSection1.add(passportRow);
		}else if(section == 2 ){
			tableViewSection2.add(passportRow);
		}
		///////////////////END OF NEXT ROW//////////////////
	}
}
