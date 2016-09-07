define(function(require, exports, module){

	var $=require("jquery");
	var banner=require("banner");
	//定义一个轮番播
	var t1=banner.init($("#test1"),{
		time:'2000',
		width:1000,
		height:400,
	});
	//再定义一个轮番播
	var t2=banner.init($("#test2"),{
		time:'5000',
		width:686,
		height:278,
	});
	t1.stop();//暂停自动播放 t1.start()开启
	setTimeout(function(){
		t1.start();
		console.log("t1开始");
	},3000);
	console.log(t1,t2);

});