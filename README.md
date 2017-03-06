ni.js

## 入门

```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
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
		</div>
		
		<script src="js/ni.js"></script>
		<script>
			ni.ready(function() {
				console.log('ni ready')
			})

			ni.plusReady(function() {
				console.log('ni plusReady')
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
				console.log(ni.Share)
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
			function sendMsg(){
				// 删除之前say事件
				ni.broadcast.remove('say')
				
				// 监听say事件
				ni.broadcast.listen('say',function(data){
					alert('Hello, ' + data.name)
				})
				
				// 发送say事件
				ni.broadcast.send('say',{
					name: 'Ni Hao'
				},{
					self: true, // 是否通知当前页面  默认不通知
					ids: [] // 通知特定id的webview, 默认为全部
				})
			}
			
			/**
			 * 获取缓存
			 */
			function getCache(){
				// 获取点击次数，本地标识不存在时，初始化默认值为1
				var clickCount = new ni.Cache('CLICK_COUNT', 1)
				// 每次点击自增1，同时被保存到本地
				alert(clickCount.data++)
			}
		</script>
	</body>

</html>
```
