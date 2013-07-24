var viewRunSummary = Ti.UI.createView({
	backgroundColor:'white'
});

var viewRunSummaryMap = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: center,
    animate:true,
    regionFit:true
});