define(function(require, exports, module){
	console.log(require);
	var $=require("jquery");
	var banner=require("banner");
	var t1=banner.init($("#test1"),{
		time:'2500',
		width:1366,
		height:768,
	});
});