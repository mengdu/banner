;(function(){
	function plugin($){
		var plugin={};
		plugin.init=function(banners,init){
			var conf={
				time:3000,
				width:686,
				height:278,
				imglength:0,
				alt:[],
				now:0,
				clock:null,
				autoplay:true
			};
			//配置接口
			for(var key in conf){
				if(typeof init[key]!='undefined'){
					conf[key]=init[key];
				}
			}
			banners.conf=conf;
			_init(banners);//初始化html结构
			_start(banners);//初始化动画
			//向外提供暂停自动接口
			banners.stop=function(){
				clearInterval(banners.conf.clock);
				banners.conf.autoplay=false;
				//console.log(banners.conf);
			}
			//向外提供重新开始自动接口
			banners.start=function(){
				banners.conf.autoplay=true;
				start_clock(banners);
			}
			return banners;
		}
		function _init(banners){
			banners.each(function(e){
				console.log(e);
				$(this).css({
					width:banners.conf['width'],
					height:banners.conf['height']
				});
				//设置切换按钮样式
				var l_btn=$(this).children('.banner-btn-left');
				var r_btn=$(this).children('.banner-btn-right');
				l_btn.css({
					top:banners.conf['height']/2-(parseInt(l_btn.css('height'))/2)
				});
				r_btn.css({
					top:banners.conf['height']/2-(parseInt(r_btn.css('height'))/2)
				});

				var lis=$(this).children(".banner-box").children("ul").children('li');
				banners.conf['imglength']=lis.length;
				var as=lis.children('a');
				$(this).children(".banner-box").css({
					width:banners.conf['width']*lis.length
				});
				//生成缩略图
				var smallhtml="<div class='roll-small'>";
				as.each(function(e){
					smallhtml+="<img src='"+$(this).children('img').attr('src')+"'/>";
					$(this).children('img').css({
						width:banners.conf['width'],
						height:banners.conf['height']
					});
					banners.conf.alt[e]=$(this).children('img').attr('alt');
				});
				smallhtml+="</div>";
				//生成title
				var title="<div class='roll-title'><a href=''>";
				title+=as.eq(0).children('img').attr('alt')+"</a></div>";
				
				var roll=$(this).children('.banner-roll');
				if(roll.length){
					roll.html(title+smallhtml);
					roll.css({
						width:banners.conf['width']
					});
				}else{
					$(this).append('<div class="banner-roll" style="width:'+banners.conf['width']+'px">'+title+smallhtml+'</div>');
					
				}
			});
		}
		function start_clock(banners){
			banners.conf.clock=setInterval(function(){
				banners.conf.now++;
				if(banners.conf.now>=banners.conf.imglength){
					banners.conf.now=0;
				}
				banners.attr('data-test',banners.conf.now);
				/*banners.children(".banner-box").css({
					left:-(banners.conf.now*banners.conf.width)
				});*/
				show(banners.conf.now,banners);
			},banners.conf.time);
		}
		function show(num,banners){
			//console.log(num);
			banners.children(".banner-box").css({
				left:-(num*banners.conf.width)
			});
			banners.children(".banner-roll").children(".roll-title").children("a").html(banners.conf.alt[num]);
			banners.children(".banner-roll").children(".roll-small").children("img").each(function(e){
				if(e==num){
					$(this).attr("class","banner-now");
				}else{
					$(this).attr("class","");
				}
			});
		}
		function _start(banners){
			if(banners.conf.autoplay==true)
				start_clock(banners);//开始动动画
			banners.on("mouseover",function(){
				clearInterval(banners.conf.clock);
			});
			banners.on("mouseleave",function(){
				if(banners.conf.autoplay==true){
					start_clock(banners);//再次开始动画
				}
			});
			//左切
			banners.children(".banner-btn-left").on("click",function(){
				//console.log(banners.conf.now);
				banners.conf.now--;
				if(banners.conf.now<0){
					banners.conf.now=banners.conf.imglength-1;
				}
				//console.log(banners.conf.now);
				show(banners.conf.now,banners);
				/*banners.children(".banner-box").css({
					left:-(banners.conf.now*banners.conf.width)
				});*/
			});
			//右切
			banners.children(".banner-btn-right").on("click",function(){
				banners.conf.now++;
				if(banners.conf.now>=banners.conf.imglength){
					banners.conf.now=0;
				}
				show(banners.conf.now,banners);
				/*banners.children(".banner-box").css({
					left:-(banners.conf.now*banners.conf.width)
				});*/
			});
			banners.children(".banner-roll").children(".roll-small").children('img').on("click",function(){
				banners.conf.now=$(this).index();
				/*banners.children(".banner-box").css({
					left:-(banners.conf.now*banners.conf.width)
				});*/
				show(banners.conf.now,banners);
			});

		}
		return plugin;
	}
	if(typeof define === "function"){
		//模块加载
		define(function(require, exports, module){
			var $=require('jquery');
			exports.init=plugin($).init;
		});
	}else{
		//普通加载
		window.banner=plugin(window.$);
	}
})();


