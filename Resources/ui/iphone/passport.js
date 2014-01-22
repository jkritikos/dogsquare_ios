var viewPassport = null;	
var addNoteButton = null;
var passportTableView = null;

//data for the sections
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
		    width:24,
		    height:23
		});
		navController.getWindow().setRightNavButton(addNoteButton);
		//next button event listener
		addNoteButton.addEventListener("click", handleAddNoteButton);
		
		//passport table view
		passportTableView = Titanium.UI.createTableView({
			editable:true,
			minRowHeight:71,
			width:293,
			backgroundColor:UI_BACKGROUND_COLOR,
			top:24,
			bottom:0,
			zIndex:1
		});
		viewPassport.add(passportTableView);
		passportTableView.addEventListener('click', handlePassportTableViewRows);
		passportTableView.addEventListener('delete', handlePassportTableViewRowDeletion);
		
		var passportDefaultImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'common/grey_320x320.png',
			width:320,
			height:320
		});
		viewPassport.add(passportDefaultImage);
		
		//inbox table view footer
		passportTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
		
		//populate section
		populateTableViewSection(noteData);
	}
}

//populate section
function populateTableViewSection(nData) {
	//Disable window sliding
	window.setPanningMode("NoPanning");
	
	Ti.API.info('populating table view');
	var data = [];
	var numberOfNotes = null;
	
	var previousMonth = null;
	var previousYear = null;
	
	if(nData.length > 0) {
		for(i=0;i<nData.length;i++){
			var date = new Date(nData[i].date*1000);
			var month = date.getMonth();
			var year = date.getYear();
			//rows are ordered by date - if previous month
			if(previousMonth != month || previousYear != year){
				numberOfNotes = 1;
				previousMonth = month;
				previousYear = year;
				
				var rowDate = formatDate(date);
				var rowMinutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
				var rowHours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
				var rowTime = rowHours + ':' + rowMinutes;
				var monthName = getMonthName(date);
				
				Ti.API.info('passport date '+date + ' hours '+date.getHours() + ' minutes '+date.getMinutes());
				
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
					selectedBackgroundColor:'transparent',
					id:nData[i].note_id
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
					width:275,
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
					text:rowDate+ ' ' + rowTime,
					color:'black',
					bottom:8,
					height:12,
					width:'auto',
					textAlign:'left',
					left:7,
					font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
				});
				passportRow1.add(rowDateLabel1);
				
				tableViewSection.add(passportRow1);
				data.push(tableViewSection);
				
			}else if(previousMonth == month){
				//increase the number of notes if more than one
				numberOfNotes++;
				rowCategoryNumberLabel1.text = numberOfNotes;
				
				previousMonth = month;
				previousYear = year;
				var passportRow = Ti.UI.createTableViewRow({
					className:'passportRow',
					height:'auto',
					width:'100%',
					backgroundColor:'white',
					selectedBackgroundColor:'transparent',
					id:nData[i].note_id
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
					width:275,
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
				var rowMinutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
				var rowHours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
				var rowTime = rowHours + ':' + rowMinutes;
				
				var rowDateLabel = Titanium.UI.createLabel({ 
					text:rowDate + ' ' + rowTime,
					color:'black',
					bottom:8,
					height:12,
					width:'auto',
					textAlign:'left',
					left:7,
					font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
				});
				passportRow.add(rowDateLabel);
				
				tableViewSection.add(passportRow);
				///////////////////END OF NEXT ROW//////////////////
			}
			passportTableView.setData(data);
		}
	}else{
		passportTableView.hide();
	}
}

//convert numerical month to string
function getMonthName(date){
	var month = date.getMonth();
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

	return monthNames[month];
}

function handlePassportTableViewRowDeletion(e){
	var note_id = e.row.id;
	
	if(passportTableView.data.length == 0){
		passportTableView.hide();
	}
	
	deleteNoteOnline(note_id);
}

//handle next button
function handlePassportTableViewRows(e) {
	var noteId = e.row.id;
	
	var noteObj = getNote(noteId);
	
	Ti.include('ui/iphone/add_note.js');
	
	buildAddNoteView();
	updateNoteView(noteObj, noteId);
	
	//add note window
	var addNoteWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
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

//handle next button
function handleAddNoteButton() {
	Ti.include('ui/iphone/add_note.js');
	
	buildAddNoteView();
	
	//add note window
	var addNoteWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
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

//delete note in server db
function deleteNoteOnline(noteId){
	Ti.API.info('deleteNoteOnline() called'); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in deleteNoteOnline() '+e);
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		Ti.API.info('deleteNoteOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			deleteNote(noteId);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
			
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else {
			alert(getErrorMessage(jsonData.response));
		}
	};
	xhr.open('POST',API+'deleteNote');
	xhr.send({
		user_id:userObject.userId,
		note_id:noteId,
		token:userObject.token
	});
}