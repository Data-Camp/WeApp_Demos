import formidable from 'formidable'
import qn from 'qn'

class Ctrl{
	constructor(app) {
		Object.assign(this, {
			app, 
		})

		this.init()
	}

	/**
	 * 初始化
	 */
	init() {
		this.initClient()
		this.routes()
	}

	/**
	 * 注册路由
	 */
	routes() {
		this.app.post('/api/qiniu/upload', this.upload.bind(this))
		this.app.post('/api/qiniu/download', this.download.bind(this))
		this.app.post('/api/qiniu/saveAsURL', this.saveAsURL.bind(this))
		this.app.post('/api/qiniu/stat', this.stat.bind(this))
		this.app.post('/api/qiniu/move', this.move.bind(this))
		this.app.post('/api/qiniu/copy', this.copy.bind(this))
		this.app.post('/api/qiniu/delete', this.delete.bind(this))
		this.app.post('/api/qiniu/list', this.list.bind(this))
		this.app.post('/api/qiniu/image/info', this.imageInfo.bind(this))
		this.app.post('/api/qiniu/image/exif', this.imageExif.bind(this))
		this.app.post('/api/qiniu/image/view', this.imageView.bind(this))
		this.app.post('/api/qiniu/image/mogr', this.imageMogr.bind(this))
		this.app.post('/api/qiniu/image/watermark', this.watermark.bind(this))
		this.app.post('/api/qiniu/md2html', this.md2html.bind(this))
		this.app.post('/api/qiniu/qrcode', this.qrcode.bind(this))
	}

	/**
	 * init qn
	 */
	initClient() {
		this.client = qn.create({
			accessKey: 'AIoInqqk9hMIdzCVpUuUmAS8PhFgrO6MXsse4PFD',
			secretKey: 'wh3JtbPWa2kCW22wRd17DJ6v1hPhSRB5fSWPw6UN',
			bucket   : 'skyvow',
			origin   : 'http://7xo4dc.com1.z0.glb.clouddn.com/',
		})
	}

	/**
	 * @apiDefine Header
	 * @apiHeader {String} Authorization jsonwebtoken
	 */
	
	/**
	 * @apiDefine Success
	 * @apiSuccess {Object} meta 状态描述
	 * @apiSuccess {Number} meta.code 标识码，0表示成功，1表示失败
	 * @apiSuccess {String} meta.message 标识信息
	 * @apiSuccess {Object} data 数据内容
	 */
	
	/**
	 * @api {post} /qiniu/upload 上传文件
	 * @apiDescription 上传文件
	 * @apiName upload
	 * @apiGroup qiniu
	 *
	 * @apiParam {File} file 文件
	 *
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/upload
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "上传成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	upload(req, res, next) {
		const form = new formidable.IncomingForm()
		form.parse(req, (err, fields, files) => {
			for (let item in files) {
				const file         = files[item] 
				const tempfilepath = file.path 
				const filenewname  = res.tools.randFilename(file) 
				
				this.client.uploadFile(tempfilepath, {key: filenewname}, (err, doc) => {
					if (err) return next(err)
					return res.tools.setJson(0, '上传成功', {
						key: doc.key, 
						path: doc.url, 
					})
				})
			}
		})
	}

	/**
	 * @api {post} /qiniu/download 下载文件
	 * @apiDescription 下载文件
	 * @apiName download
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 *
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/download
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	download(req, res, next) {
		this.client.stat(req.body.key, (err, content, doc) => {
			if (err) return next(err)
			return res.tools.setJson(0, '调用成功', {
				content: content, 
				doc: doc, 
			})
		})
	}

	/**
	 * @api {post} /qiniu/saveAsURL 保存文件
	 * @apiDescription 保存文件
	 * @apiName saveAsURL
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {String} [name] 重命名
	 *
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/saveAsURL
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": "data"
	 *     }
	 */
	saveAsURL(req, res, next) {
		const key  = req.body.key
		const name = req.body.name
		const doc  = this.client.saveAsURL(key, name)

		return res.tools.setJson(0, '调用成功', doc)
	}

	/**
	 * @api {post} /qiniu/stat 文件信息
	 * @apiDescription 文件信息
	 * @apiName stat
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 *
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/stat
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {
	 *       	"fsize": "fsize",
	 *       	"hash": "hash",
	 *       	"mimeType": "mimeType",
	 *       	"putTime": "putTime",
	 *       }
	 *     }
	 */
	stat(req, res, next) {
		this.client.stat(req.body.key, (err, doc) => {
			if (err) return next(err)
			return res.tools.setJson(0, '调用成功', doc)
		})
	}

	/**
	 * @api {post} /qiniu/move 移动文件
	 * @apiDescription 移动文件
	 * @apiName move
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {String} [name] 重命名
	 *
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/move
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	move(req, res, next) {
		const k1   = req.body.key
		const name = req.body.name
		const k2   = name ? name : res.tools.randFilename({name: k1})

		this.client.move(k1, k2, (err, doc) => {
			if (err) return next(err)
			return res.tools.setJson(0, '调用成功')
		})
	}

	/**
	 * @api {post} /qiniu/copy 复制文件
	 * @apiDescription 复制文件
	 * @apiName copy
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {String} [name] 重命名
	 *
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/copy
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	copy(req, res, next) {
		const k1   = req.body.key
		const name = req.body.name
		const k2   = name ? name : res.tools.randFilename({name: k1})

		this.client.copy(k1, k2, (err, doc) => {
			if (err) return next(err)
			return res.tools.setJson(0, '调用成功')
		})
	}

	/**
	 * @api {post} /qiniu/delete 删除文件
	 * @apiDescription 删除文件
	 * @apiName delete
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 *
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/delete
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	delete(req, res, next) {
		this.client.delete(req.body.key, (err, doc) => {
			if (err) return next(err)
			return res.tools.setJson(0, '删除成功')
		})
	}

	/**
	 * @api {post} /qiniu/list 列出所有文件
	 * @apiDescription 列出所有文件
	 * @apiName list
	 * @apiGroup qiniu
	 *
	 * @apiParam {Object} [opt] 配置参数
	 *  - {String} prefix 指定要过滤出来的前缀，默认 '/'
	 *  - {String} marker 为服务器上次导出时返回的标记，没有可以不填
	 *  - {String} limit 单次查询返回的最大条目数，最大不超过1000
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/list
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {
	 *       	"marker": "marker",
	 *       	"items": [{
	 *       		"key": "key",
	 *       		"hash": "hash",
	 *       		"fsize": "fsize",
	 *       		"mimeType": "mimeType",
	 *       		"putTime": "putTime",
	 *       	}]
	 *       }
	 *     }
	 */
	list(req, res, next) {
		const opt = req.body.opt || {}
		this.client.list(opt, (err, docs) => {
			if (err) return next(err)
			return res.tools.setJson(0, '调用成功', docs)
		})
	}

	/**
	 * @api {post} /qiniu/image/info 图片基本信息
	 * @apiDescription 图片基本信息
	 * @apiName imageInfo
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/image/info
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {
	 *       	"format": "format",
	 *       	"width": "width",
	 *       	"height": "height",
	 *       	"colorModel": "colorModel",
	 *       	"orientation": "orientation",
	 *       }
	 *     }
	 */
	imageInfo(req, res, next) {
		this.client.imageInfo(req.body.key, (err, doc) => {
			if (err) return next(err)
			return res.tools.setJson(0, '调用成功', doc)
		})
	}

	/**
	 * @api {post} /qiniu/image/exif 图片EXIF信息
	 * @apiDescription 图片EXIF信息
	 * @apiName imageExif
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/image/exif
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	imageExif(req, res, next) {
		this.client.exif(req.body.key, (err, doc) => {
			if (err) return next(err)
			return res.tools.setJson(0, '调用成功', doc)
		})
	}

	/**
	 * @api {post} /qiniu/image/view 生成缩略图
	 * @apiDescription 生成缩略图
	 * @apiName imageView
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {Object} opt 配置参数
	 *  - {Number} mode 
	 *  	- mode=1  表示限定目标缩略图的宽度和高度，放大并从缩略图中央处裁剪为指定 Width x Height 大小的图片
	 *  	- mode=2  指定 Width 和 Height，表示限定目标缩略图的长和宽，将缩略图的大小限定在指定的宽高矩形内
	 *  	- mode=2  指定 Width 但不指定 Height，表示限定目标缩略图的宽度，高度等比缩略自适应
	 *  	- mode=2  指定 Height 但不指定 Width，表示限定目标缩略图的高度，宽度等比缩略自适应
	 *  - {Number} width 宽度
	 *  - {Number} height 高度
	 *  - {Number} [q] 质量
	 *  - {String} [format] 指定目标缩略图的输出格式，取值范围：jpg, gif, png, webp 等图片格式
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/image/view
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	imageView(req, res, next) {
		const key = req.body.key
		const opt = req.body.opt || {}
		const doc = this.client.imageView(key, opt)

		return res.tools.setJson(0, '调用成功', doc)
	}

	/**
	 * @api {post} /qiniu/image/mogr 高级图片处理（缩略、裁剪、旋转、转化）
	 * @apiDescription 高级图片处理（缩略、裁剪、旋转、转化）
	 * @apiName imageMogr
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {Object} opt 配置参数
	 *  - {String} [thumbnail] 缩略图大小，详解见下
	 *  - {String} [gravity] 位置偏移，只会使其后的裁剪偏移({offset})受到影响，默认值为 NorthWest（左上角）
	 *      可选值：NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast 
	 *  - {String} [crop] 裁剪大小和偏移，详解见下
	 *  - {Number} [quality] 图片质量，取值范围是[1, 100]
	 *  - {Number} [rotate] 旋转角度
	 *  - {String} [format] 输出格式，可选为jpg, gif, png, bmp, tiff, webp等
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/image/mogr
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	imageMogr(req, res, next) {
		const key = req.body.key
		const opt = req.body.opt || {}
		const doc = this.client.imageMogr(key, opt)

		return res.tools.setJson(0, '调用成功', doc)
	}

	/**
	 * @api {post} /qiniu/image/watermark 图片水印（图片、文字）
	 * @apiDescription 图片水印（图片、文字）
	 * @apiName watermark
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {Object} opt 配置参数
	 *  - {Number} mode 
	 *  	- mode=1 时，表示图片水印：
	 *  	- mode=2 时，表示文字水印：
	 *   - {String} image 水印图片，使用图片水印时需指定用于水印的远程图片URL。EncodedImageURL = urlsafe_base64_encode(ImageURL)
	 *   - {String} text 水印文本，文字水印时必须。EncodedText = urlsafe_base64_encode(Text)
	 *   - {String} [font] 字体名，若水印文本为非英文字符（比如中文）构成，则必须。EncodedFontName = urlsafe_base64_encode(FontName)
	 *   - {Number} [fontsize] 字体大小，0 表示默认，单位: 缇，等于 1⁄20 磅
	 *   - {String} [fill] 字体颜色。EncodedTextColor = urlsafe_base64_encode(TextColor)
	 *       RGB格式，可以是颜色名称（比如 red）或十六进制（比如 #FF0000），
	 *       参考 [RGB颜色编码表](http://www.rapidtables.com/web/color/RGB_Color.htm)
	 *  - {Number} [dissolve] 透明度，取值范围 1-100，默认值 100，即表示 100%（不透明）
	 *  - {String} [gravity] 位置，默认值为 SouthEast（右下角）
	 *      可选值：NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
	 *  - {Number} [dx] 横向边距，单位：像素（px），默认值为 10
	 *  - {Number} [dy] 纵向边距，单位：像素（px），默认值为 10
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/image/watermark
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	watermark(req, res, next) {
		const key = req.body.key
		const opt = req.body.opt || {}
		const doc = this.client.watermark(key, opt)

		return res.tools.setJson(0, '调用成功', doc)
	}

	/**
	 * @api {post} /qiniu/md2html Markdown转HTML
	 * @apiDescription Markdown转HTML
	 * @apiName md2html
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {Object} opt 配置参数
	 *  - {Number} mode 0 表示转为完整的 HTML(head+body) 输出; 1 表示只转为HTML Body，缺省值：0
	 *  - {String} css CSS 样式的URL
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/md2html
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	md2html(req, res, next) {
		const key = req.body.key
		const opt = req.body.opt || {}
		const doc = this.client.md2html(key, opt)

		return res.tools.setJson(0, '调用成功', doc)
	}

	/**
	 * @api {post} /qiniu/qrcode 生成二维码
	 * @apiDescription 生成二维码
	 * @apiName qrcode
	 * @apiGroup qiniu
	 *
	 * @apiParam {String} key 文件名
	 * @apiParam {Number} [mode=0] 可选值0或1，0表示以当前url生成二维码，1表示以当前URL中的数据生成二维码
	 * @apiParam {String} [level=L] 冗余度，可选值 L、M、Q、H
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /qiniu/qrcode
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": "data"
	 *     }
	 */
	qrcode(req, res, next) {
		const key   = req.body.key
		const mode  = req.body.mode
		const level = req.body.level
		const doc   = this.client.qrcode(key, mode, level)

		return res.tools.setJson(0, '调用成功', doc)
	}
}

export default Ctrl