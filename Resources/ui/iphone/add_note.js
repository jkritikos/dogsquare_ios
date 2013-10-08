var addNoteView = null;
var addNoteSaveButton = null;
var addNoteTitleTextField = null;
var addNoteTitleTextFieldLabel = null;
var addNoteDescriptionTextArea = null;
var addNoteDescriptionTextAreaLabel = null;
var addNoteTimeLabel = null;
var addNoteDateLabel = null;
var addNoteBellImage = null;
var addNoteCheckImage = null;
var addNoteCompletedBackground = null;
var addNoteRemindBackground = null;
var addNoteDateTimePicker = null;
var addNotePickerDoneButton = null;

//UI components
var selected = false;

var PICKER_TIME = 0;
var PICKER_DATE = 1;

var ADD_NOTE = 2;
var EDIT_NOTE = 3;

//picker date defaults
var pickerYear = '00';
var pickerMonth = '00';
var pickerDay = '00';
var pickerHours = '00';
var pickerMinutes = '00';
var pickerSeconds = '00';

var interactionType = ADD_NOTE;

var noteObject = {};

noteObject.remind_flag = 0;
noteObject.completed = 0;
noteObject.note_id = 0;

function buildAddNoteView(){
	if(addNoteView == null){
		//add note view
		addNoteView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//save button
		addNoteSaveButton = Ti.UI.createButton({
		    backgroundImage:IMAGE_PATH+'common/save_button.png',
		    width:54,
		    height:34
		});
		
		addNoteSaveButton.addEventListener('click', handleAddNoteSaveButton);
		
		//form background
		var addNoteFormBackground = Ti.UI.createView({
			backgroundColor:'e7e6e6',
			top:0,
			width:320,
			height:205
		});
		
		//sepparators
		var addNoteFormSepparator1 = Ti.UI.createView({
			backgroundColor:'b8afaf',
			top:32,
			width:320,
			height:1
		});
		addNoteFormBackground.add(addNoteFormSepparator1);
		
		var addNoteFormSepparator2 = Ti.UI.createView({
			backgroundColor:'b8afaf',
			top:141,
			width:320,
			height:1
		});
		addNoteFormBackground.add(addNoteFormSepparator2);
		
		var addNoteFormSepparator3 = Ti.UI.createView({
			backgroundColor:'b8afaf',
			top:172,
			width:320,
			height:1
		});
		addNoteFormBackground.add(addNoteFormSepparator3);
		
		//note title textfield
		addNoteTitleTextField = Ti.UI.createTextField({
			width:307,
			height:31,
			top:0,
			left:7,
			field:1
		});
		addNoteFormBackground.add(addNoteTitleTextField);
		addNoteTitleTextField.addEventListener('focus', handleAddNoteTextFieldfocus);
		addNoteTitleTextField.addEventListener('change', handleAddNoteTextFieldChange);
		addNoteTitleTextField.addEventListener('blur', handleAddNoteTextFieldBlur);
		
		//note title textfield label
		addNoteTitleTextFieldLabel = Ti.UI.createLabel({
			text:'Title',
			color:'b8afaf',
			textAlign:'left',
			opacity:0.7,
			left:0,
			height:31,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		addNoteTitleTextField.add(addNoteTitleTextFieldLabel);
		
		//note description text area
		addNoteDescriptionTextArea = Ti.UI.createTextArea({
			backgroundColor:'e7e6e6',
			width:320,
			height:100,
			top:37,
			left:0,
			field:2,
			font:{fontSize:15}
		});
		addNoteFormBackground.add(addNoteDescriptionTextArea);
		addNoteDescriptionTextArea.addEventListener('focus', handleAddNoteTextFieldfocus);
		addNoteDescriptionTextArea.addEventListener('change', handleAddNoteTextFieldChange);
		addNoteDescriptionTextArea.addEventListener('blur', handleAddNoteTextFieldBlur);
		
		//note description text area label
		addNoteDescriptionTextAreaLabel = Ti.UI.createLabel({
			text:'Description',
			color:'b8afaf',
			textAlign:'left',
			opacity:0.7,
			left:7,
			top:0,
			height:31,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		addNoteDescriptionTextArea.add(addNoteDescriptionTextAreaLabel);
		
		//note time label
		addNoteTimeLabel = Ti.UI.createLabel({
			text:'Time',
			color:'b8afaf',
			textAlign:'left',
			opacity:0.7,
			left:7,
			bottom:2,
			width:313,
			height:31,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'},
			type:PICKER_TIME
		});
		addNoteFormBackground.add(addNoteTimeLabel);
		addNoteTimeLabel.addEventListener('click', handleAddNoteDateTimeLabel);
		
		//note date label
		addNoteDateLabel = Ti.UI.createLabel({
			text:'Date',
			color:'b8afaf',
			textAlign:'left',
			opacity:0.7,
			left:7,
			bottom:33,
			width:313,
			height:31,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'},
			type:PICKER_DATE
		});
		addNoteFormBackground.add(addNoteDateLabel);
		addNoteDateLabel.addEventListener('click', handleAddNoteDateTimeLabel);
		addNoteView.add(addNoteFormBackground);
		
		//remind background
		addNoteRemindBackground = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR,
			top:220,
			width:105,
			height:30,
			right:5,
			active:false
		});
		
		//remind label
		var addNoteRemindLabel = Titanium.UI.createLabel({ 
			text:'Remind Me',
			left:5,
			color:'black',
			height:20,
			width:'auto',
			textAlign:'left',
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		addNoteRemindBackground.add(addNoteRemindLabel);
		
		//bell image
		addNoteBellImage = Titanium.UI.createImageView({ 
			image:IMAGE_PATH+'add_note/bell_icon_default.png',
			right:5
		});
		addNoteRemindBackground.add(addNoteBellImage);
		
		addNoteView.add(addNoteRemindBackground);
		addNoteRemindBackground.addEventListener('click', handleAddNoteRemind);	
		
		//remind background
		addNoteCompletedBackground = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR,
			top:220,
			width:105,
			height:30,
			left:5,
			active:false
		});
		
		//completed label
		var addNoteCompletedLabel = Titanium.UI.createLabel({ 
			text:'Completed',
			left:5,
			color:'black',
			width:'auto',
			textAlign:'left',
			font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		addNoteCompletedBackground.add(addNoteCompletedLabel);
		
		//comleted check box 
		var addNoteCheckBox = Titanium.UI.createView({
			backgroundColor:'a5a5a5',
			right:5,
			width: 23,
			height:23
		});
		
		//check image inside check box
		addNoteCheckImage = Ti.UI.createImageView({ 
			image:IMAGE_PATH+'menu_right/check_mark.png',
			bottom:3
		});
		addNoteCheckBox.add(addNoteCheckImage);
		addNoteCheckImage.hide();
		addNoteCompletedBackground.add(addNoteCheckBox);
		
		addNoteView.add(addNoteCompletedBackground);
		addNoteCompletedBackground.hide();
		addNoteCompletedBackground.addEventListener('click', handleAddNoteCompleted);
		
		addNoteDateTimePicker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_TIME,
			bottom:-219
		});
		addNoteView.add(addNoteDateTimePicker);
		addNoteDateTimePicker.addEventListener('change', handleDatePickerChange);
		
		addNotePickerDoneButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/Done_button.png',
		    width:54,
		    height:34
		});
	}
}

function handleAddNoteCompleted(e){

	if(!selected){
		addNoteCheckImage.show();
		noteObject.completed = 1;
		selected = true;
	}else{
		addNoteCheckImage.hide();
		noteObject.completed = 0;
		selected = false;
	}
}

function handleAddNoteRemind(e){

	if(!selected){
		addNoteBellImage.image = IMAGE_PATH+'add_note/bell_icon_selected.png';
		noteObject.remind_flag = 1;
		selected = true;
	}else{
		addNoteBellImage.image = IMAGE_PATH+'add_note/bell_icon_default.png';
		noteObject.remind_flag = 0;
		selected = false;
	}
}

function handleAddNoteTextFieldChange(e){
	var field = e.source.field;
	
	if(field == 1){
		if(addNoteTitleTextField.value != ''){
			addNoteTitleTextFieldLabel.hide();
		}else {
			addNoteTitleTextFieldLabel.show();
		}
	}else if(field == 2){
		if(addNoteDescriptionTextArea.value != ''){
			addNoteDescriptionTextAreaLabel.hide();
		}else {
			addNoteDescriptionTextAreaLabel.show();
		}
	}
}

function handleAddNoteTextFieldfocus(e){
	openWindows[openWindows.length - 1].setRightNavButton(addNoteSaveButton);
}

//handle textfield when not focused
function handleAddNoteTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 1){
		if(addNoteTitleTextField.value == ''){
			addNoteTitleTextFieldLabel.show();
		}
	}else if(field == 2){
		if(addNoteDescriptionTextArea.value == ''){
			addNoteDescriptionTextAreaLabel.show();
		}
	}
}

//handle date label
function handleAddNoteDateTimeLabel(e){
	var type = e.source.type;
	
	if(type == PICKER_DATE){
		if(interactionType == ADD_NOTE){
			//Set up minimum and maximum dates
			var today = new Date();
			
			var minDate = new Date();
			minDate.setFullYear(today.getFullYear());
			minDate.setMonth(today.getMonth());
			minDate.setDate(today.getDate());
			
			var maxDate = new Date();
			maxDate.setFullYear(2020);
			maxDate.setMonth(11);
			maxDate.setDate(31);
			
			var value = new Date();
			value.setFullYear(today.getFullYear());
			value.setMonth(today.getMonth());
			value.setDate(today.getDate());
			
			addNoteDateTimePicker.value = value;
		}
		//show date 
		addNoteDateTimePicker.type = Ti.UI.PICKER_TYPE_DATE;
		addNoteDateTimePicker.minDate = minDate;
		addNoteDateTimePicker.maxDate = maxDate;
		
		
		addNoteDateLabel.color = 'black';
		addNoteDateLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addNoteDateLabel.opacity = 1;
		
		var pickerDate = addNoteDateTimePicker.value;
		
		var date = formatDate(pickerDate);
		
		addNoteDateLabel.text = date;
		
		getDateData(pickerDate);
		
	}else if (type == PICKER_TIME){
		//show time 
		addNoteDateTimePicker.type = Ti.UI.PICKER_TYPE_TIME;
		addNoteDateTimePicker.minDate = null;
		addNoteDateTimePicker.maxDate = null;
		
		addNoteTimeLabel.color = 'black';
		addNoteTimeLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addNoteTimeLabel.opacity = 1;
		
		var pickerTime = addNoteDateTimePicker.value;
		
		var hours = pickerTime.getHours() < 10 ? '0'+pickerTime.getHours() : pickerTime.getHours();
		var minutes = pickerTime.getMinutes() < 10 ? '0'+pickerTime.getMinutes() : pickerTime.getMinutes();
		
		var time = hours + " : " + minutes;
		
		addNoteTimeLabel.text = time;
		
		getTimeData(pickerTime);
	}
	//create a date string with the current data
	noteObject.date = pickerYear+'-'+pickerMonth+'-'+pickerDay+' '+pickerHours+':'+pickerMinutes+':'+pickerSeconds+' +0000';
	addNoteTitleTextField.blur();
	addNoteDescriptionTextArea.blur();
	
	addNoteDateTimePicker.animate({bottom:0, duration:500});
	
	openWindows[openWindows.length - 1].setRightNavButton(addNotePickerDoneButton);
	addNotePickerDoneButton.addEventListener("click", handleAddNotePickerDoneButton);
}

//handle done button of picker
function handleAddNotePickerDoneButton(){
	addNoteDateTimePicker.animate({bottom:-219, duration:500});
	
	openWindows[openWindows.length - 1].setRightNavButton(addNoteSaveButton);
}

//handle picker when changed
function handleDatePickerChange(e) {
	var pickerType = addNoteDateTimePicker.type;
	
	if(pickerType == PICKER_DATE){
		//show date
		addNoteDateLabel.color = 'black';
		addNoteDateLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addNoteDateLabel.opacity = 1;
		
		var pickerDate = e.value;
		
		var date = formatDate(pickerDate);
		
		addNoteDateLabel.text = date;
		noteObject.date = pickerDate;
		
		getDateData(pickerDate);	
	}else if(pickerType == PICKER_TIME){
		//show time
		addNoteTimeLabel.color = 'black';
		addNoteTimeLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
		addNoteTimeLabel.opacity = 1;
		
		var pickerTime = e.value;
		
		var hours = pickerTime.getHours() < 10 ? '0' + pickerTime.getHours() : pickerTime.getHours();
		var minutes = pickerTime.getMinutes() < 10 ? '0' + pickerTime.getMinutes() : pickerTime.getMinutes();
		
		addNoteTimeLabel.text = hours + " : " + minutes;
		
		getTimeData(pickerTime);
	}
	noteObject.date = pickerYear+'-'+pickerMonth+'-'+pickerDay+' '+pickerHours+':'+pickerMinutes+':'+pickerSeconds+' +0000';
}

//validate form 
function validateNoteForm(){
	if(isStringNullOrEmpty(addNoteTitleTextField.value)){
		alert('TITLE IS MISSING');
		return false;
	}else if(isStringNullOrEmpty(addNoteDescriptionTextArea.value)){
		alert('DESCRIPTION IS MISSING');
		return false;
	}else if(addNoteDateLabel.text == 'Date'){
		alert('DATE IS MISSING');
		return false;
	}else if(addNoteTimeLabel.text == 'Time'){
		alert('TIME IS MISSING');
		return false;
	}
	
	noteObject.title = addNoteTitleTextField.value;
	noteObject.description = addNoteDescriptionTextArea.value;
	
	return true;
}

//handle save button
function handleAddNoteSaveButton(){
	if(validateNoteForm()){
		Ti.API.info('note form is valid');
		
		doSaveNoteOnline();
	}else{
		Ti.API.info('note form is not valid');
	}

}

//update note view to edit note 
function updateNoteView(nObj, id){
	addNoteTitleTextField.value = nObj.title;
	addNoteDescriptionTextArea.value = nObj.description;
	interactionType = EDIT_NOTE;
	
	addNoteCompletedBackground.show();
	addNoteDescriptionTextAreaLabel.hide();
	addNoteTitleTextFieldLabel.hide();
	
	if(nObj.completed == 1){
		addNoteCheckImage.show();
		addNoteCompletedBackground.active = true;
	}
	
	if(nObj.remind_flag == 1){
		addNoteBellImage.image = IMAGE_PATH+'add_note/bell_icon_selected.png';
		addNoteRemindBackground.active = true;
	}
	
	//fill noteObject with data 
	noteObject.note_id = id;
	noteObject.title = nObj.title;
	noteObject.description = nObj.description;
	noteObject.remind_flag = nObj.remind_flag;
	noteObject.completed = nObj.completed;
	
	var date = new Date(nObj.date*1000);
	
	getDateData(date);
	getTimeData(date);
	
	addNoteDateTimePicker.value = date;
	noteObject.date = date;
	
	//TODO check timezone - hour is +3 hours
	var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	
	date = formatDate(date);
	
	addNoteTimeLabel.text = hours + " : " + minutes;
	addNoteTimeLabel.color = 'black';
	addNoteTimeLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	addNoteTimeLabel.opacity = 1;
		
	addNoteDateLabel.text = date;
	addNoteDateLabel.color = 'black';
	addNoteDateLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	addNoteDateLabel.opacity = 1;
}

//Server call for saving note
function doSaveNoteOnline(){
	Ti.API.info('doSaveNoteOnline() called'); 	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('Error in doSaveNoteOnline() '+e);
	};
	
	xhr.onload = function(e){
		Ti.API.info('doSaveNoteOnline() got back from server '+this.responseText); 	
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			var date = new Date(jsonData.data.date * 1000);
			noteObject.date = date;
			
			if(interactionType == ADD_NOTE){
				Ti.API.info('doSaveNoteOnline() got back note id from server '+jsonData.data.note_id);
				noteObject.note_id = jsonData.data.note_id;
				saveNote(noteObject);
			}else if(interactionType == EDIT_NOTE){
				var id = noteObject.note_id;
				updateNote(noteObject, id);
			}
			
			navController.close(openWindows[openWindows.length - 1]);
			
			passportTableView.data = [];

			var noteData = null;
			noteData = getNotes();
			
			//populate section
			populateTableViewSection(noteData);
			
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
	xhr.open('POST',API+'addNote');
	xhr.send({
		user_id:userObject.userId,
		title:noteObject.title,
		description:noteObject.description,
		date:noteObject.date,
		completed:noteObject.completed,
		remind:noteObject.remind_flag,
		interaction_type:interactionType,
		note_id:noteObject.note_id,
		token:userObject.token
	});
}

//get year, month and day from date
function getDateData(date){
	pickerYear = date.getFullYear();
	pickerMonth = (date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1;
	pickerDay = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
}

//get hours, minutes and seconds from date
function getTimeData(time){
	pickerHours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
	pickerMinutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
	pickerSeconds = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
}