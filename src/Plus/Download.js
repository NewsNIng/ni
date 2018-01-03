// 下载
// 别老是下一些奇怪的东西

class Download {
	constructor(url, {
		filename = '', // 文件名
		suffix = '', // 文件后缀 带.号 (.jpg|.txt)
	} = {}) {
		this.url = url
		this.op = {
			suffix,
			filename
		}
		this._init()
	}

	// 初始化下载器
	_init() {
		this._onSuccess = () => {}
		this._onError = () => {}

		let filename = this.op.filename || this.url.split('/').pop()
		filename = '_downloads/ni/' + filename + this.op.suffix
		this.task = plus.downloader.createDownload(this.url, {
			filename
		}, (rs, code) => {
			if(code == 200) {
				filename = plus.io.convertLocalFileSystemURL(filename)
				if(filename.indexOf('file') < 0) {
					filename = 'file://' + filename
				}
				// 下载成功
				this._onSuccess(filename)
			} else {
				rs.abort() //自动删除 临时文件
				// 下载失败
				this._onError({
					message: 'download error',
					result: rs,
					code
				})
			}
		})
		return this
	}

	// 监听下载进度变化
	onChange(callback = () => {}) {
		this.task.addEventListener('statechanged', function(rs) {
			if(rs.totalSize && rs.downloadedSize) {
				// 下载进度变化
				callback(+(rs.downloadedSize / rs.totalSize * 100).toFixed(2), rs)
			}
		})
		return this
	}

	//下载完成时
	onSuccess(callback = () => {}) {
		this._onSuccess = callback
		return this
	}

	//下载失败时
	onError(callback = () => {}) {
		this._onError = callback
		return this
	}

	// 开始下载
	start() {
		this.task.start()
		return this
	}
} 

export default  Download