// 压缩
// 越压缩烦恼，爆发越可怕

class Zip {
	constructor() {}

	/**
	 * 压缩处理图片
	 * @param {String|Array} imgUrls 需要压缩的图片地址或图片地址数组
	 * @param {Number} wantSize 期望压缩大小或比例
	 * @param {Function} callback 压缩完毕的回调函数
	 */
	processImage(imgUrls, wantSize, callback = () => {

	}) {
		// 如果是单张图片 转换为数组
		if(typeof imgUrls === 'string') {
			imgUrls = [imgUrls]
		}
		// 是否是待处理的图片数组
		else if(!Array.isArray(imgUrls)) {
			return callback({
				message: 'Please check the incoming image'
			})
		}
		// 递归压缩处理图片
		this._zipImgs(imgUrls, (overImgs) => {
			callback(null, overImgs)
		}, 0, wantSize)

	}

	/**
	 * 计算比例
	 * @param {Number} size 原大小
	 * @param {Number} totalSize 期望的大小 | 期望的比例
	 * @return {Number} prop 比例
	 */
	_calcProportion(size, totalSize) {
		if(totalSize <= 1) {
			return totalSize
		}
		var prop = 1
		if(size > totalSize) {
			prop = +(totalSize / size).toFixed(4)
		}
		return prop
	}

	/**
	 * 图片组 递归压缩 
	 * @param {Array} imgs 需要压缩的图片地址数组
	 * @param {Function} callback 压缩完成后的回调 
	 * @param {Number} index 开始压缩下标 默认 0
	 * @param {Number} wantSize 期望压缩大小或比例
	 */
	_zipImgs(imgs, callback, index = 0, wantSize = 1) {
		let indexImgs = imgs[index]
		if(!indexImgs) {
			return callback && callback(imgs)
		}
		// 获取图片大小
		this._getFileSize(indexImgs, (err, size) => {
			size = this._calcProportion(size, wantSize) * 100
			if(size === 100) {
				return this._zipImgs(imgs, callback, ++index, wantSize)
			}
			plus.zip.compressImage({
				src: indexImgs,
				dst: "_doc/tempImg/" + Date.now() + "_" + index + ".jpg",
				overwrite: true,
				format: 'jpg',
				quality: 55,
				height: size + '%',
				width: size + '%',
				rotate: 0
			}, i => {
				//压缩后图片路径替换原路径
				imgs[index] = i.target
				this._zipImgs(imgs, callback, ++index, wantSize)
			}, e => {
				//记录index为压缩失败false
				imgs[index] = false
				this._zipImgs(imgs, callback, ++index, wantSize)
			})
		})

	}

	/**
	 * 获取文件大小
	 * @param {string} filePath 文件路径
	 * @param {Function} callback 获取文件大小回调函数
	 */
	_getFileSize(filePath, callback) {
		plus.io.resolveLocalFileSystemURL(filePath, entry => {
			// 如果不是一个文件
			if(!entry.isFile) {
				callback({
					message: 'Picture path error'
				})
			}
			entry.getMetadata(metadata => {
				callback(null, metadata.size / (1024))
			}, callback)

		}, callback)
	}
	

}

export default  Zip 