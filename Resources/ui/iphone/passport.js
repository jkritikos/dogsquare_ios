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
var noteData = getNotes();

//populate section
populateTableViewSection(noteData);

//handle next button
function handleAddNoteButton() {
	Ti.include('ui/iphone/add_note.js');
	openWindows.push(addNoteWindow);
    navController.open(addNoteWindow);
}

//populate section
function populateTableViewSection(nData) {
	
	var tableRows = [];
	var numberOfNotes = null;
	
	var previousMonth = null;
	
	for(i=0;i<nData.length;i++){
		var date = new Date(nData[i].date*1000);
		var month = date.getMonth();
		//rows are ordered by date - if previous month
		if(previousMonth != month){
			numberOfNotes = 1;
			previousMonth = month;
			
			var tableViewSection = Titanium.UI.createTableViewSection({
				height:'auto',
				backgroundColor:'transparent'
			});
			tableViewSection.footerView = Ti.UI.createView({height:30});
			
			var passportRow1 = Ti.UI.createTableViewRow({
				className:'passportRow1',
				height:'auto',
				width:'100%',
				backgroundColor:UI_BACKGROUND_COLOR,
				selectedBackgroundColor:'transparent'
			});
			
			//background
			var passportRowBackground1 = Ti.UI.createView({
				height:'auto',
				width:'100%',
				top:17,
				bottom:2,
				backgroundColor:'white'
			});
			passportRow1.add(passportRowBackground1);
			
			var rowDate = formatDate(date);
			var monthName = getMonthName(date);
			
			var monthCategoryLabel = monthName + ' ' + date.getFullYear();
			
			//category date label
			var rowCategoryDateLabel1 = Titanium.UI.createLabel({ 
				text:monthCategoryLabel,
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
				text:numberOfNotes,
				color:'black',
				top:0,
				textAlign:'right',
				right:0,
				font:{fontSize:11, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRow1.add(rowCategoryNumberLabel1);
			
			//title label
			var rowTitleLabel1 = Titanium.UI.createLabel({ 
				text:nData[i].title,
				color:'black',
				top:3,
				height:22,
				width:276,
				textAlign:'left',
				left:7,
				font:{fontSize:20, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRowBackground1.add(rowTitleLabel1);
			//testLabel.width = rowTitleLabel1.toImage().width
			
			//description label
			var rowDescriptionLabel1 = Titanium.UI.createLabel({ 
				text:nData[i].description,
				color:'black',
				height:'auto',
				width:'auto',
				textAlign:'left',
				top:26,
				bottom:28,
				left:7,
				right:7,
				font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRowBackground1.add(rowDescriptionLabel1);
			
			//date label
			var rowDateLabel1 = Titanium.UI.createLabel({ 
				text:rowDate,
				color:'black',
				bottom:13,
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
			
			tableViewSection.add(passportRow1);
			data.push(tableViewSection);
			
		}else if(previousMonth == month){
			//increase the number of notes if more than one
			numberOfNotes++;
			rowCategoryNumberLabel1.text = numberOfNotes;
			
			previousMonth = month;
			var passportRow = Ti.UI.createTableViewRow({
				className:'passportRow',
				height:'auto',
				width:'100%',
				backgroundColor:'white',
				selectedBackgroundColor:'transparent'
			});
			
			var rowTitleLabel = Titanium.UI.createLabel({ 
				text:nData[i].title,
				color:'black',
				top:3,
				height:22,
				width:276,
				textAlign:'left',
				left:7,
				font:{fontSize:20, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRow.add(rowTitleLabel);
			
			var rowDescriptionLabel = Titanium.UI.createLabel({ 
				text:nData[i].description,
				color:'black',
				height:'auto',
				width:'auto',
				textAlign:'left',
				top:26,
				bottom:28,
				left:7,
				right:7,
				font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRow.add(rowDescriptionLabel);
			
			var date = new Date(nData[i].date*1000);
			var rowDate = formatDate(date);
			
			var rowDateLabel = Titanium.UI.createLabel({ 
				text:rowDate,
				color:'black',
				bottom:13,
				height:12,
				width:'auto',
				textAlign:'left',
				left:7,
				font:{fontSize:10, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRow.add(rowDateLabel);
			
			var rowSepparator = Titanium.UI.createView({ 
				width:'100%',
				bottom:0,
				height:2,
				backgroundColor:UI_BACKGROUND_COLOR
			});
			passportRow.add(rowSepparator);
			
			tableViewSection.add(passportRow);
			///////////////////END OF NEXT ROW//////////////////
		}
		passportTableView.setData(data);
		Ti.API.info('data set to tableview');
	}
}

//convert numerical month to string
function getMonthName(date){
	var month = date.getMonth();
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

	return monthNames[month];
}
