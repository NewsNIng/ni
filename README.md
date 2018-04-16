**简要描述：** 

#### 2018-04-15更新
---------
- 修复Broadcast发送消息时，JSON转义错误的问题
- Cache新增max参数，可以限制数据最大长度（仅限数组）
---------

#### 2018-01-19更新
---------
- 减少build时默认开启的功能（之前是全开，发现有些用的很少，需要功能的可以去index.js里开启并重新build）
- 修复Broadcast在通知指定id页面时获取不到webview而报错的bug
- 兼容部分低版本安卓，新增Promise polyfill，可看情况去除
---------


- **ni.js** 是一个基于跨平台 **WebApp** 解决方案 **HTML5PLUS** 的拓展

**项目地址：** 

- github: https://github.com/NewsNIng/ni
- api(文档地址): https://www.showdoc.cc/1681984

**使用方式：** 

一：常规页面引用
- 下载 项目中 dist/ni.js

```
<script src="你下载的ni.js路径"></script> 
<script>
	ni.plusReady(function(){
		console.log("ni hao");
	});
</script>

```
二：Vue插件支持
- 下载 项目中 dist/vue-ni.js

```

<div class="mui-content" id='app'>
	<button @click='gallery'>选取照片</button>
	剩余可选择图片数量: {{len}}
	<template v-for='o,i of imgs'>
		<img :src="o" width="30%" height="30%" />
	</template>
</div>
<script src="vue.js路径"></script>
<script src="你下载的ni.js路径"></script> 
<script>
	new Vue({
		el: "#app",
		data: function(){
			return {
				imgs: [], // 图片数组
				maxImgLen: 9 // 最大选取数量
			}
		},
		computed: {
			len: function(){
				// 计算剩余图片选取数量
				return this.maxImgLen - this.imgs.length;
			}
		},
		plusReady: function(){
			console.log("ni hao Vue plusReady");
			// 例：
			// 设置返回键处理逻辑
			this.$back(function(){
				plus.webview.currentWebview().close();
			});
		},
		methods: {
			// 选取照片
			gallery: function() {
				this.$gallery(function(err, imgs) => {
					Array.prototype.push.apply(this.imgs, imgs);
				}.bind(this), this.len);
			},
		}
	});
</script>

```

好吧，开始浪起来。