// 文件管理类

export default class IO{
	
	constructor(){
		
	}
	
	
	/**
	 * 检查图片是否存在本地
	 * @param {String} hb_path 图片路径 _www 或者 相对路径
	 * @param {Function} callback 回调函数
	 */
	existImage(hb_path = '', callback = () => {}){
		// 是否 _www _download  等路径
		if(hb_path[0] === '_') {
			// 转换
			hb_path = plus.io.convertLocalFileSystemURL(hb_path)
			if(hb_path.indexOf('file') < 0) {
				hb_path = 'file://' + hb_path
			}
		}
		let img = new Image()
		img.src = hb_path
		img.onload = function() {
			// 存在
			callback(hb_path)
		}
		img.onerror = function() {
			// 错误（不存在）
			callback(false)
		}
		return this
	}
	
	/**
	 * 检查是否存在本地文件
	 * @param {string} filePath 文件路径
	 * @param {Function} callback 获取文件大小回调函数 参数列表
	 */
	existFile(filePath, callback){
		plus.io.resolveLocalFileSystemURL(filePath, entry => {
			callback(entry.isFile, entry)
		}, err => {
			callback(false)
		})
	}
	
	
	/**
	 * 获取文件大小
	 * @param {string} filePath 文件路径
	 * @param {Function} callback 获取文件大小回调函数 参数列表 (err = {message}, size)
	 */
	getFileSize(filePath, callback) {
		this.existFile(filePath, (has, entry) => {
			if(!has){
				return callback({
					message: 'file path error'
				})
			}
			entry.getMetadata(metadata => {
				callback(null, metadata.size / (1024))
			}, callback)
		})
	}
	
	
}
