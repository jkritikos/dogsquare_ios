//add note window
var addNoteWindow = Ti.UI.createWindow({
	backgroundColor:UI_BACKGROUND_COLOR,
	barImage:IMAGE_PATH+'common/bar.png',
	barColor:UI_COLOR,
	title:'Add Note'
});

//UI components
var selected = false;

//form background
var addNoteFormBackground = Ti.UI.createView({
	backgroundColor:'e7e6e6',
	top:27,
	width:320,
	height:171
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
addNoteTitleTextField.addEventListener('change', handleAddNoteTextFieldFocus);
addNoteTitleTextField.addEventListener('blur', handleAddNoteTextFieldBlur);

//note title textfield label
var addNoteTitleTextFieldLabel = Ti.UI.createLabel({
	text:'Note Title',
	color:'b8afaf',
	textAlign:'left',
	opacity:0.7,
	left:0,
	width:80,
	height:31,
	font:{fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'}
});
addNoteTitleTextField.add(addNoteTitleTextFieldLabel);

//sepparator
var addNoteFormSepparator = Ti.UI.createView({
	backgroundColor:'b8afaf',
	top:32,
	width:320,
	height:1
});
addNoteFormBackground.add(addNoteFormSepparator);

//note description text area
var addNoteDescriptionTextArea = Ti.UI.createTextArea({
	backgroundColor:'e7e6e6',
	hintText:'note description',
	width:320,
	height:139,
	top:37,
	left:0,
	field:2,
	font:{fontSize:15}
});
addNoteFormBackground.add(addNoteDescriptionTextArea);
addNoteDescriptionTextArea.addEventListener('change', handleAddNoteTextFieldFocus);
addNoteDescriptionTextArea.addEventListener('blur', handleAddNoteTextFieldBlur);

//note description text area label
var addNoteDescriptionTextAreaLabel = Ti.UI.createLabel({
	text:'Note Description',
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
	top:213,
	width:105,
	height:30,
	right:5,
	active:false
});
addNoteWindow.add(addNoteRemindBackground);

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
		selected = true;
	}else{
		addNoteBellImage.image = IMAGE_PATH+'add_note/bell_icon_default.png';
		selected = false;
	}
});	


function handleAddNoteTextFieldFocus(e){
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