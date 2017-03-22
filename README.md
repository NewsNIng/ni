ni.js

## 入门

更多实例在App文件夹项目下

```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<title></title>

	</head>

	<body>

		<header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">ni 好</h1>
		</header>
		<div class="mui-content">
			<button type="button" class="mui-btn" onclick="gallery()">照片选取</button>
			<button type="button" class="mui-btn" onclick="sendShare()">打开分享</button>
			<button type="button" class="mui-btn" onclick="sendMsg()">页面通知</button>
			<button type="button" class="mui-btn" onclick="getCache()">缓存信息</button>
			<button type="button" class="mui-btn" onclick="openSlider()">侧边菜单</button>
			<br />
			<br />
			<button type="button" class="mui-btn" onclick="sliderWindow()">多窗口滑动切换</button>
			<button type="button" class="mui-btn" onclick="openZipImgsWindow()" data=url="zipImg.html">图片压缩处理</button>
		</div>

		<script src="js/ni.js"></script>
		<script>
			var sm, group
			var broadcast = new ni.Broadcast()

			// 删除之前say事件
			broadcast.remove('say')

			// 监听say事件
			broadcast.listen('say', function(data) {
				alert('Hello, ' + data.name)
			})
			
			

			ni.ready(function() {
				console.log('ni ready')
			})

			ni.plusReady(function() {
				console.log('ni plusReady')

				// 初始化侧滑菜单
				sm = new ni.SliderMenu({
					url: '2.html'
				})

			})

			/**
			 * 照片选取
			 */
			function gallery() {
				ni.gallery(function(err, imgs) {
					var arr = []
					for(var i = 0; i < imgs.length; i++) {
						arr.push(imgs[i])
					}
					alert(arr)
				}, 10) //10张
			}

			/**
			 * 打开分享
			 */
			function sendShare() {
				// wxhy: 微信好友    
				// wxpyq: 微信朋友圈
				// qq: 腾讯QQ
				// sinaweibo: 新浪微博
				new ni.Share('qq', function(err, data) {
					if(err) {
						console.log(err)
					}
					console.log(JSON.stringify(data))
				}, {
					img: '_www/img/vhp.png', //图片地址
					href: 'https://github.com/NewsNIng/ni', //分享的超链接
					title: '分享标题', //当且仅当href存在时有效
					content: '分享内容' //当且仅当href存在时有效
				})
			}

			/**
			 * 页面通知
			 */
			function sendMsg() {

				// 发送say事件
				broadcast.send('say', {
					name: 'Ni Hao'
				}, {
					self: true, // 是否通知当前页面  默认不通知
					//ids: [] // 通知特定id的webview, 默认为全部
				})
			}

			/**
			 * 获取缓存
			 */
			function getCache() {
				// 获取点击次数，本地标识不存在时，初始化默认值为1
				var clickCount = new ni.Cache('CLICK_COUNT', 1)
				// 每次点击自增1，同时被保存到本地
				alert(clickCount.data++)
			}

			/**
			 * 侧边菜单
			 */
			function openSlider() {
				sm && sm.show()
			}

			/**
			 * 窗口滑动切换
			 */
			function sliderWindow() {
				plus.webview.create('parent.html').show('pop-in', 250)
			}
			
			/**
			 * 打开图片压缩例子
			 */
			function openZipImgsWindow(){
				plus.webview.create('zipImg.html').show('pop-in',250)
			}
		</script>
	</body>

</html>

```
图片压缩例子

```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title></title>
		<link href="css/mui.min.css" rel="stylesheet" />
		<style type="text/css">
			.imgRoom>div {
				float: left;
				margin: 10px 1%;
				width: 31.33%;
				padding-top: 31.33%;
				background-color: indigo;
				background-size: cover;
			}
		</style>
		<header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">图片压缩</h1>
		</header>
		<div class="mui-content">
			<button type="button" class="mui-btn mui-btn-blue back" >返回</button>
			<h5>
				选取图片后, 将压缩至您期望的大小或者比例, 并用在div的背景显示在页面中(设置背景可以居中显示图片而不变形), 您还可以获取到所有压缩后的图片地址 
			</h5>
			<h5>将要压缩到某个大小 | 比例</h5>
			<h5>数值设置小于1(如0.5)则按比例，否则按大小(单位kb)</h5>
			<input type="number" name="" id="" value="1000" />
			<br /><br />
			<button type="button" class="mui-btn mui-btn-blue" onclick="onClick()">选取图片</button>
			<br />
			<br />
			<button type="button" class="mui-btn mui-btn-blue" onclick="onShowImgs()">显示图片地址</button>
			<div class="imgRoom">
				<!--图片容器-->
			</div>
		</div>

		<script type="text/javascript" src="js/ni.js"></script>
		<script type="text/javascript" charset="utf-8">
			var cw
			ni.plusReady(function(){
				cw = plus.webview.currentWebview()
				plus.key.addEventListener('backbutton', close)
			})
			
			ni.ready(function(){
				document.querySelector(".back").addEventListener('click',close)
			})
			
			function close(){
				cw && cw.close()
			}
		
			function onClick() {
				// 选取图片
				ni.gallery(function(err, imgs) {
					if(err) { mui.toast(err.message) }
					plus.nativeUI.showWaiting('正在压缩图片...')
					// 处理已选取的图片 每个压缩到差不多1000kb 你也可以写比例 如 0.5
					new ni.Zip().processImage(imgs, 1000, function(err, overImgs) {
						plus.nativeUI.closeWaiting()
						if(err) { mui.toast(err.message) }
						// 将图片添加到页面显示
						addImg(overImgs)
					})

				}, 5) // 从相册选取时，最多选择5张
			}

			function onShowImgs() {
				var items = imgRoom.querySelectorAll('div'),
					srcs = []
				for(var i = 0,temp = null; i < items.length; i++) {
					temp = items[i].style.backgroundImage.match(/url\(\"?([^\"]*)\"?\)/)
					temp = temp? temp[1]: ''
					srcs.push(temp)
				}
				plus.nativeUI.alert(srcs)
			}

			var imgRoom = document.querySelector(".imgRoom")

			function addImg(imgs) {
				var div = null
				for(var i in imgs) {
					div = document.createElement("div")
					div.style.backgroundImage = 'url(' + imgs[i] + ')'
					imgRoom.appendChild(div)
				}
				div = null
			}
		</script>
	</head>

	<body>

	</body>

</html>
```
