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
		<script src="js/ni.js"></script>
		<script>
			ni.ready(function() {
				console.log('ni ready')
			})

			ni.plusReady(function() {
				sendShare()
			})

			/**
			 * 照片选取
			 */
			function gallery() {
				ni.gallery(function(err, imgs) {
					for(var i = 0; i < imgs.length; i++) {
						console.log(imgs[i])
					}
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
					img: '../img/vhp.png', //图片地址
					href: 'https://github.com/NewsNIng/ni', //分享的超链接
					title: '分享标题', //当且仅当href存在时有效
					content: '分享内容' //当且仅当href存在时有效
				})
			}
		</script>
	</body>

</html>
```
