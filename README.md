## banner
banner是一个网页幻灯片播放js插件；简单易用，可简单定义，支持同页面定义多个互不影响的轮番播。
插件依赖jquery插件。
## 兼容性

浏览器需要支持CSS3即可

## 使用介绍
### 必备文件
	1.banner.js
	2.banner.css
	3.jquery
	4.seajs.js	(模块加载方式必须)
	5.icon-next-last.png	(按钮图标)
### 模块方式加载
banner遵循的是CMD规范编写的，所以可以使用seajs模块加载器来加载

index.js
```
define(function(require, exports, module){
	//console.log(require);
	var $=require("jquery");
	var banner=require("banner");
	var t1=banner.init($("#test1"),{
		time:'2500',
		width:1366,
		height:768,
	});
});
```

html
```
<script type="text/javascript" src="./sea.js"></script>
<script type="text/javascript">
		seajs.config({
			base: "./lib",//设置默认加载模块目录
		});
		seajs.use("./index.js");
</script>
```
css
```
<link rel="stylesheet" type="text/css" href="./lib/banner.css">
```
html编写必须按照这种格式才能正常解析,类名也固定
```
<div class="banner-bg" id="test1">
		<div class="banner-box">
			 <ul>
			 	<li><a href="图片链接"><img src="图片路径" alt="图片标题"></a></li>
				.
				.
				.
			</ul>
		</div>
		<div class="banner-btn-left"></div>
		<div class="banner-btn-right"></div>
	</div>
```

### 普通模式加载
为了方便使用banner也支持比普通方式加载
```
<script type="text/javascript" src="./lib/jquery-2.1.3.min.js"></script>
	<script type="text/javascript" src="./lib/banner.js"></script>
	<script type="text/javascript">
		//不需要模块加载
		$(document).ready(function(){
			//必须在文档加载后才能
			var t1=banner.init($("#test1"),{
				time:'2500',
				width:1366,
				height:768,
			});
		});
</script>
```

### 接口
banner插件以模块方式加载返回的是banner对象
    banner.init(jquery对象,{
        //配置项
    });

banner.init返回的当前幻灯片对象，有两个与幻灯片有有关的方法stop和start

+ stop();//这个方法停止幻灯自动播放
+ start();//这个方法重新开启幻灯片自动播放

### 配置项
banner.init的第二个参数是json对象，用于配置

+ time:    int 动画切换时间（单位毫秒）
+ width:   int 画布长(不需要带单位)
+ height： int 画布高(不需要带单位)
+ autoplay:bool 是否自动播放 默认true

------
作者：lanyue
联系：1752295326(QQ)
