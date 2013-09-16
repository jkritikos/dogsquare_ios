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

//save button
var addNoteSaveButton = Ti.UI.createButton({
    backgroundImage:IMAGE_PATH+'common/save_button.png',
    width:54,
    height:34
});

addNoteWindow.setRightNavButton(addNoteSaveButton);
addNoteSaveButton.addEventListener('click', handleAddNoteSaveButton);

addNoteBackButton.addEventListener("click", function() {
    navController.close(addNoteWindow);
});

//UI components
var selected = false;

var noteObject = {};

//form background
var addNoteFormBackground = Ti.UI.createView({
	backgroundColor:'e7e6e6',
	top:0,
	width:320,
	height:205
});
addNoteWindow.add(addNoteFormBackground);

//note title textfield
var addNoteTitleTextField = Ti.UI.createTextField({
	width:320,
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
var addNoteTitleTextFieldLabel = Ti.UI.createLabel({
	text:'Title',
	color:'b8afaf',
	textAlign:'left',
	opacity:0.7,
	left:0,
	width:80,
	height:31,
	font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
});
addNoteTitleTextField.add(addNoteTitleTextFieldLabel);

//sepparator 1
var addNoteFormSepparator1 = Ti.UI.createView({
	backgroundColor:'b8afaf',
	top:32,
	width:320,
	height:1
});
addNoteFormBackground.add(addNoteFormSepparator1);

//note description text area
var addNoteDescriptionTextArea = Ti.UI.createTextArea({
	backgroundColor:'e7e6e6',
	width:320,
	height:138,
	top:37,
	left:0,
	field:2,
	font:{fontSize:15}
});
addNoteFormBackground.add(addNoteDescriptionTextArea);
addNoteDescriptionTextArea.addEventListener('focus', handleAddNoteTextFieldfocus);
addNoteDescriptionTextArea.addEventListener('change', handleAddNoteTextFieldChange);
addNoteDescriptionTextArea.addEventListener('blur', handleAddNoteTextFieldBlur);

var addNoteFormSepparator2 = Ti.UI.createView({
	backgroundColor:'b8afaf',
	top:172,
	width:320,
	height:1
});
addNoteFormBackground.add(addNoteFormSepparator2);

//note description text area label
var addNoteDescriptionTextAreaLabel = Ti.UI.createLabel({
	text:'Description',
	color:'b8afaf',
	textAlign:'left',
	opacity:0.7,
	left:7,
	top:0,
	width:120,
	height:31,
	font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
});
addNoteDescriptionTextArea.add(addNoteDescriptionTextAreaLabel);

//remind background
var addNoteRemindBackground = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR,
	top:220,
	width:105,
	height:30,
	right:5,
	active:false
});
addNoteWindow.add(addNoteRemindBackground);

//note description text area label
var addNoteDateLabel = Ti.UI.createLabel({
	text:'Date',
	color:'b8afaf',
	textAlign:'left',
	opacity:0.7,
	left:7,
	bottom:2,
	width:320,
	height:31,
	font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
});
addNoteFormBackground.add(addNoteDateLabel);
addNoteDateLabel.addEventListener('click', handleAddNoteDateLabel);

noteObject.remind_flag = 0;

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
var addNoteBellImage = Titanium.UI.createImageView({ 
	image:IMAGE_PATH+'add_note/bell_icon_default.png',
	right:5
});
addNoteRemindBackground.add(addNoteBellImage);

addNoteRemindBackground.addEventListener('click', function(e){

	if(!selected){
		addNoteBellImage.image = IMAGE_PATH+'add_note/bell_icon_selected.png';
		noteObject.remind_flag = 1;
		selected = true;
	}else{
		addNoteBellImage.image = IMAGE_PATH+'add_note/bell_icon_default.png';
		noteObject.remind_flag = 0;
		selected = false;
	}
});	

var minDate = new Date();
minDate.setFullYear(2013);
minDate.setMonth(7);
minDate.setDate(1);

var maxDate = new Date();
maxDate.setFullYear(2016);
maxDate.setMonth(11);
maxDate.setDate(31);

var value = new Date();
value.setFullYear(2013);
value.setMonth(7);
value.setDate(28);

var addNoteDatePicker = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_DATE,
	minDate:minDate,
	maxDate:maxDate,
	value:value,
	bottom:-219
});
addNoteWindow.add(addNoteDatePicker);

var addNotePickerDoneButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/Done_button.png',
    width:58,
    height:29
});
addNoteDatePicker.addEventListener('change', handleDatePickerChange);

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
	addNoteWindow.setRightNavButton(addNoteSaveButton);
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
function handleAddNoteDateLabel(){
	addNoteTitleTextField.blur();
	addNoteDescriptionTextArea.blur();
	
	addNoteDatePicker.animate({bottom:0, duration:500});
	
	addNoteWindow.setRightNavButton(addNotePickerDoneButton);
	addNotePickerDoneButton.addEventListener("click", handleAddNotePickerDoneButton);
}

//handle done button of picker
function handleAddNotePickerDoneButton(){
	addNoteDatePicker.animate({bottom:-219, duration:500});
	
	addNoteWindow.setRightNavButton(addNoteSaveButton);
}

//handle picker when changed
function handleDatePickerChange(e) {
	addNoteDateLabel.color = 'black';
	addNoteDateLabel.font = {fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'};
	addNoteDateLabel.opacity = 1;
	
	var pickerDate = e.value;
	
	var date = formatDate(pickerDate);
	
	addNoteDateLabel.text = date;
	noteObject.date = pickerDate;
}

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
	}
	
	noteObject.title = addNoteTitleTextField.value;
	noteObject.description = addNoteDescriptionTextArea.value;
	
	return true;
}

function handleAddNoteSaveButton(){
	if(validateNoteForm()){
		Ti.API.info('note form is valid');
		
		saveNote(noteObject);
		navController.close(addNoteWindow);
		Ti.include('ui/iphone/passport.js');
		
		navController.getWindow().add(viewPassport);
		navController.getWindow().setTitle('Passport');
		
	}else{
		Ti.API.info('note form is not valid');
	}

}