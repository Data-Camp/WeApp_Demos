import request from 'request'
import config from '../config'
import jwt from '../common/jwtauth'
import proxy from '../proxy'
import jwtauth from '../middlewares/jwtauth'

class Ctrl{
	constructor(app) {
		Object.assign(this, {
			app, 
			model: proxy.user, 
		})

		this.init()
	}

	/**
	 * 初始化
	 */
	init() {
		this.routes()
		this.initSuperAdmin()
	}

	/**
	 * 注册路由
	 */
	routes() {
		this.app.post('/api/user/wechat/sign/up', this.wechatSignUp.bind(this))
		this.app.post('/api/user/wechat/sign/in', this.wechatSignIn.bind(this))
		this.app.post('/api/user/sign/up', this.signUp.bind(this))
		this.app.post('/api/user/sign/in', this.signIn.bind(this))
		this.app.post('/api/user/sign/out', this.signOut.bind(this))
		this.app.post('/api/user/reset/password', this.resetPassword.bind(this))
		this.app.post('/api/user/info', this.saveInfo.bind(this))
		this.app.get('/api/user/info', this.getInfo.bind(this))
	}

	/**
	 * 封装request请求
	 */
	requestAsync(url) {
		return new Promise((reslove, reject) => {
			request({url: url}, (err, res, body) => {
				if (err) return reject(err)
				return reslove(body)
			})
		})
	}

	/**
	 * code 换取 session_key
	 */
	getSessionKey(code) {
		const appid = config.wechat.appid
		const secret = config.wechat.secret
		const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
		return this.requestAsync(url)
	}

	/**
	 * @api {post} /user/wechat/sign/up 微信用户注册
	 * @apiDescription 微信用户注册
	 * @apiName wechatSignUp
	 * @apiGroup user
	 *
	 * @apiParam {String} code 登录凭证
	 *
	 * @apiPermission none
	 * @apiSampleRequest /user/wechat/sign/up
	 * 
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "注册成功"
	 *       },
	 *       "data": {
	 *       	"token": "token"
	 *       }
	 *     }
	 */
	wechatSignUp(req, res, next) {
		const code = req.body.code
		const body = {
			username: null, 
			password: res.jwt.setMd5('123456'), 
		}

		this.getSessionKey(code)
		.then(doc => {
			doc = JSON.parse(doc)
			if (doc && doc.errmsg) return res.tools.setJson(doc.errcode, doc.errmsg)
			if (doc && doc.openid) {
				body.username = doc.openid
				return this.model.findByName(doc.openid)
			}
		})
		.then(doc => {
			if (!doc) return this.model.newAndSave(body)
			if (doc && doc._id) return res.tools.setJson(1, '用户名已存在')
		})
		.then(doc => {
			if (doc && doc._id) return res.tools.setJson(0, '注册成功', {
				token: res.jwt.setToken(doc._id)
			})
		})
		.catch(err => next(err))
	}

	/**
	 * @api {post} /user/wechat/sign/in 微信用户登录
	 * @apiDescription 微信用户登录
	 * @apiName wechatSignIn
	 * @apiGroup user
	 *
	 * @apiParam {String} code 登录凭证
	 *
	 * @apiPermission none
	 * @apiSampleRequest /user/wechat/sign/in
	 * 
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "登录成功"
	 *       },
	 *       "data": {
	 *       	"token": "token"
	 *       }
	 *     }
	 */
	wechatSignIn(req, res, next) {
		const code = req.body.code

		this.getSessionKey(code)
		.then(doc => {
			doc = JSON.parse(doc)
			if (doc && doc.errmsg) return res.tools.setJson(doc.errcode, doc.errmsg)
			if (doc && doc.openid) return this.model.findByName(doc.openid)
		})
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '用户名不存在')
			if (doc && doc._id) return res.tools.setJson(0, '登录成功', {
				token: res.jwt.setToken(doc._id)
			})
		})
		.catch(err => next(err))
	}

	/**
	 * 创建超级管理员
	 */
	initSuperAdmin(req, res, next) {
		const username = config.superAdmin.username
		const password = config.superAdmin.password

		this.model.findByName(username)
		.then(doc => {
			if (!doc) return this.model.newAndSave({
				username: username, 
				password: jwt.setMd5(password), 
			})
		})
	}

	/**
	 * @api {post} /user/sign/up 用户注册
	 * @apiDescription 用户注册
	 * @apiName signUp
	 * @apiGroup user
	 *
	 * @apiParam {String} username 用户名
	 * @apiParam {String} password 密码
	 *
	 * @apiPermission none
	 * @apiSampleRequest /user/sign/up
	 * 
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "注册成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	signUp(req, res, next) {
		const username = req.body.username
		const password = req.body.password

		if (!username || !password) return res.tools.setJson(1, '用户名或密码错误')
		
		this.model.findByName(username)
		.then(doc => {
			if (!doc) return this.model.newAndSave({
				username: username, 
				password: res.jwt.setMd5(password)
			})
			return res.tools.setJson(1, '用户名已存在')
		})
		.then(doc => res.tools.setJson(0, '注册成功'))
		.catch(err => next(err))
	}

	/**
	 * @api {post} /user/sign/in 用户登录
	 * @apiDescription 用户登录
	 * @apiName signIn
	 * @apiGroup user
	 *
	 * @apiParam {String} username 用户名
	 * @apiParam {String} password 密码
	 *
	 * @apiPermission none
	 * @apiSampleRequest /user/sign/in
	 * 
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "登录成功"
	 *       },
	 *       "data": {
	 *       	"token": "token"
	 *       }
	 *     }
	 */
	signIn(req, res, next) {
		const username = req.body.username
		const password = req.body.password
		
		if (!username || !password) return res.tools.setJson(1, '用户名或密码错误')	
		if (req.body.code !== req.session.code) return res.tools.setJson(1, '验证码错误')

		this.model.model.getAuthenticated(username, password)
		.then(doc => {
			switch (doc) {
	            case 0:
	            	res.tools.setJson(1, '用户名或密码错误')
	            	break
	            case 1:
	                res.tools.setJson(1, '用户名或密码错误')
	                break
	            case 2:
	                res.tools.setJson(1, '账号已被锁定，请等待两小时解锁后重新尝试登录')
	                break
	            default: res.tools.setJson(0, '登录成功', {
					token: res.jwt.setToken(doc._id)
				})
	        }
		})
		.catch(err => next(err))	
	}

	/**
	 * @api {post} /user/sign/out 用户登出
	 * @apiDescription 用户登出
	 * @apiName signOut
	 * @apiGroup user
	 *
	 * @apiPermission none
	 * @apiSampleRequest /user/sign/out
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "登出成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	signOut(req, res, next) {
		if (req.user) {
			new jwtauth().expireToken(req.headers)
			delete req.user	
			delete this.app.locals.token
			return res.tools.setJson(0, '登出成功')
		}
		return res.tools.setJson(1, '登出失败')
	}

	/**
	 * @api {post} /user/reset/password 修改密码
	 * @apiDescription 修改密码
	 * @apiName resetPassword
	 * @apiGroup user
	 *
	 * @apiParam {String} oldpwd 旧密码
	 * @apiParam {String} newpwd 新密码
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /user/reset/password
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "更新成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	resetPassword(req, res, next) {
		const oldpwd = req.body.oldpwd
		const newpwd = req.body.newpwd
			
		if (oldpwd && newpwd) {
			this.model.findByName(req.user.username)
			.then(doc => {
				if (!doc) return res.tools.setJson(1, '用户不存在或已删除')
				if (doc.password !== res.jwt.setMd5(oldpwd)) return res.tools.setJson(1, '密码错误')
				doc.password = res.jwt.setMd5(newpwd)
				return doc.save()
			})
			.then(doc => res.tools.setJson(0, '更新成功'))
			.catch(err => next(err))
		}
	}

	/**
	 * @api {post} /user/info 保存用户信息
	 * @apiDescription 保存用户信息
	 * @apiName saveInfo
	 * @apiGroup user
	 *
	 * @apiParam {Date} birthday 生日
	 * @apiParam {String} email 邮箱
	 * @apiParam {String} gender 性别
	 * @apiParam {String} avatar 头像
	 * @apiParam {String} nickname 昵称
	 * @apiParam {String} tel 手机
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /user/info
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "更新成功"
	 *       },
	 *       "data": {}
	 *     }
	 */
	saveInfo(req, res, next) {
		this.model.findByName(req.user.username)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '用户不存在或已删除')

			for(let key in req.body) {
				doc[key] = req.body[key]
			}

			doc.update_at = Date.now()

			return doc.save()
		})
		.then(doc => res.tools.setJson(0, '更新成功', doc))
		.catch(err => next(err))
	}

	/**
	 * @api {get} /user/info 获取用户信息
	 * @apiDescription 获取用户信息
	 * @apiName getInfo
	 * @apiGroup user
	 * 
	 * @apiPermission none
	 * @apiSampleRequest /user/info
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
	getInfo(req, res, next) {
		this.model.findByName(req.user.username)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '用户不存在或已删除')
			return res.tools.setJson(0, '调用成功', doc)
		})
		.catch(err => next(err))
	}
}

export default Ctrl