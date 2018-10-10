import bluebird from 'bluebird'
import FS from 'fs'
import formidable from 'formidable'
import request from 'request'
import cheerio from 'cheerio'
import captchapng from 'captchapng'
import proxy from '../proxy'
import config from '../config'

const fs = bluebird.promisifyAll(FS)

class Ctrl{
	constructor(app) {
		Object.assign(this, {
			app, 
			upload: proxy.upload, 
		})

		this.init()
	}

	/**
	 * 初始化
	 */
	init() {
		this.routes()
	}

	/**
	 * 注册路由
	 */
	routes() {
		this.app.post('/api/common/file', this.uploadFile.bind(this))
		this.app.post('/api/common/file/:id', this.delFile.bind(this))
		this.app.post('/api/common/sign/check', this.signCheck.bind(this))
		this.app.get('/api/common/captcha(/:width)?(/:height)?', this.captcha.bind(this))
	}

	/**
	 * 创建表单上传           
	 */
	initFormidable(req, callback) {
		// 创建表单上传
	    const form = new formidable.IncomingForm()

	    // 设置编辑
	    form.encoding = 'utf-8'

	    // 设置文件存储路径
	    form.uploadDir = config.upload.tmp

	    // 保留后缀
	    form.keepExtensions = true

	    // 设置单文件大小限制    
	    form.maxFieldsSize = 2 * 1024 * 1024

	    // 设置所有文件的大小总和
	    form.maxFields = 1000 

	    form.parse(req, (err, fields, files) => callback(err, fields, files))
	}

	/**
	 * @api {post} /common/file 上传文件
	 * @apiDescription 上传文件
	 * @apiName uploadFile
	 * @apiGroup common
	 *
	 * @apiParam {File} files 文件
	 *
	 * @apiPermission none
	 * @apiSampleRequest /common/file
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
	 *       "data": {
	 *       	"_id": "_id",
	 *       	"name": "name",
	 *       	"path": "path",
	 *       	"create_at": "create_at"
	 *       }
	 *     }
	 */
	uploadFile(req, res, next) {
		this.initFormidable(req, (err, fields, files) => {
			for (let item in files) {
				const file         = files[item] 
				const tempfilepath = file.path 
				const filenewname  = res.tools.randFilename(file) 
				const filenewpath  = config.upload.path +  filenewname
				const result       = 'uploads/' + filenewname

				// 将临时文件保存为正式的文件
				fs.renameAsync(tempfilepath, filenewpath)
				.then(doc => this.upload.newAndSave(file.name, result))
				.then(doc => res.tools.setJson(0, '上传成功', doc))
				.catch(err => next(err))
			}
		})
	}

	/**
	 * @api {post} /common/file/:id 删除文件
	 * @apiDescription 删除文件
	 * @apiName delFile
	 * @apiGroup common
	 *
	 * @apiParam {String} id 资源ID
	 *
	 * @apiPermission none
	 * @apiSampleRequest /common/file/:id
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "删除成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	delFile(req, res, next) {
		let filepath = null
		this.upload.findById(req.params.id)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			filepath = 'public/' + doc.path
			return doc.remove()
		})
		.then(doc => fs.unlinkAsync(filepath))
		.then(doc => res.tools.setJson(0, '删除成功'))
		.catch(err => next(err))
	}

	/**
	 * @api {post} /common/sign/check 登录认证
	 * @apiDescription 登录认证
	 * @apiName signCheck
	 * @apiGroup common
	 *
	 * @apiPermission none
	 * @apiSampleRequest /common/sign/check
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
	signCheck(req, res, next) {
		return res.tools.setJson(0, '调用成功')
	}

	/**
	 * @api {get} /common/captcha/:width/:height 验证码
	 * @apiDescription 验证码
	 * @apiName captcha
	 * @apiGroup common
	 *
	 * @apiParam {String} width 宽度
	 * @apiParam {String} height 高度
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /common/captcha/:width/:height
	 */
	captcha(req, res, next) {
		const width   = parseInt(req.params.width) || 80
		const height  = parseInt(req.params.height) || 30
		const code    = req.session.code = parseInt(Math.random() * 9000 + 1000)
		const captcha = new captchapng(width, height, code)

        captcha.color(0, 0, 0, 0)
        captcha.color(80, 80, 80, 255)

        const img = captcha.getBase64()
        const imgbase64 = new Buffer(img, 'base64')

		res.end(imgbase64)
	}
}

export default Ctrl