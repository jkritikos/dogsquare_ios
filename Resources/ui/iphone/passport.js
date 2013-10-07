var viewPassport = null;	
var addNoteButton = null;
var passportTableView = null;

//data for the sections
var data = [];
var noteData = getNotes();
	
function buildPassportView(){	
	if(viewPassport == null){
		//passport view
		viewPassport = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//creation of a button
		addNoteButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/edit_icon.png',
			title:'add',
		    width:24,
		    height:23
		});
		navController.getWindow().setRightNavButton(addNoteButton);
		//next button event listener
		addNoteButton.addEventListener("click", handleAddNoteButton);
		
		//passport table view
		passportTableView = Titanium.UI.createTableView({
			minRowHeight:71,
			width:293,
			backgroundColor:UI_BACKGROUND_COLOR,
			top:24,
			bottom:0
		});
		viewPassport.add(passportTableView);
		passportTableView.addEventListener('click', handlePassportTableViewRows);
		
		//populate section
		populateTableViewSection(noteData);
	}
}

//populate section
function populateTableViewSection(nData) {
	Ti.API.info('populating table view');
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
			
			var rowDate = formatDate(date);
			var monthName = getMonthName(date);
			
			var monthCategoryLabel = monthName + ' ' + date.getFullYear();
			
			var sectionHeader = Ti.UI.createView({
				height:17,
				backgroundColor:UI_BACKGROUND_COLOR
			});
			
			//category date label
			var rowCategoryDateLabel1 = Titanium.UI.createLabel({ 
				text:monthCategoryLabel,
				color:'black',
				height:14,
				width:'auto',
				textAlign:'left',
				left:0,
				font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			sectionHeader.add(rowCategoryDateLabel1);
			
			//category number label
			var rowCategoryNumberLabel1 = Titanium.UI.createLabel({ 
				text:numberOfNotes,
				color:'black',
				textAlign:'right',
				right:0,
				font:{fontSize:11, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			sectionHeader.add(rowCategoryNumberLabel1);
			
			//date sepparator
			var rowDateSepparator1 = Titanium.UI.createView({ 
				width:'100%',
				bottom:0,
				height:1,
				backgroundColor:UI_COLOR
			});
			sectionHeader.add(rowDateSepparator1);
			
			var tableViewSection = Titanium.UI.createTableViewSection({
				height:'auto',
				backgroundColor:'transparent'
			});
			tableViewSection.footerView = Ti.UI.createView({height:30});
			tableViewSection.headerView = sectionHeader;
			
			var passportRow1 = Ti.UI.createTableViewRow({
				className:'passportRow1',
				height:'auto',
				width:'100%',
				selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
				backgroundColor:'white',
				selectedBackgroundColor:'transparent'
			});
			
			//title label
			var rowTitleLabel1 = Titanium.UI.createLabel({ 
				text:nData[i].title,
				color:'black',
				top:3,
				width:276,
				textAlign:'left',
				left:7,
				font:{fontSize:20, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRow1.add(rowTitleLabel1);
			
			//description label
			var rowDescriptionLabel1 = Titanium.UI.createLabel({ 
				text:nData[i].description,
				color:'black',
				height:'auto',
				width:'auto',
				textAlign:'left',
				top:35,
				bottom:28,
				left:7,
				right:7,
				font:{fontSize:13, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			passportRow1.add(rowDescriptionLabel1);
			
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
			passportRow1.add(rowDateLabel1);
			
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
				top:35,
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
			
			tableViewSection.add(passportRow);
			///////////////////END OF NEXT ROW//////////////////
		}
		passportTableView.setData(data);
	}
}

//convert numerical month to string
function getMonthName(date){
	var month = date.getMonth();
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

	return monthNames[month];
}

//handle next button
function handlePassportTableViewRows(e) {
	Ti.include('ui/iphone/add_note.js');
	
	buildAddNoteView();
	
	//add note window
	var addNoteWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Add Note'
	});
	
	//back button
	var addNoteBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	addNoteWindow.setLeftNavButton(addNoteBackButton);
	
	addNoteBackButton.addEventListener("click", function() {
	    navController.close(addNoteWindow);
	});
	
	addNoteWindow.add(addNoteView);
	
	openWindows.push(addNoteWindow);
    navController.open(addNoteWindow);
}

//handle next button
function handleAddNoteButton() {
	Ti.include('ui/iphone/add_note.js');
	
	buildAddNoteView();
	
	//add note window
	var addNoteWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Add Note'
	});
	
	//back button
	var addNoteBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	addNoteWindow.setLeftNavButton(addNoteBackButton);
	
	addNoteBackButton.addEventListener("click", function() {
	    navController.close(addNoteWindow);
	});
	
	addNoteWindow.add(addNoteView);
	
	openWindows.push(addNoteWindow);
	openWindows[openWindows.length - 1].setRightNavButton(addNoteSaveButton);
    navController.open(addNoteWindow);
}

function clearPassportTable(){
	passportTableView.data = [];
}
