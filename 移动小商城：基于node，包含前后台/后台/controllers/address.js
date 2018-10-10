import proxy from '../proxy'

class Ctrl{
	constructor(app) {
		Object.assign(this, {
			app, 
			model: proxy.address, 
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
		this.app.post('/api/address/default/:id', this.setDefault.bind(this))
		this.app.get('/api/address/default', this.getDefault.bind(this))
		this.app.get('/api/address', this.getAll.bind(this))
		this.app.get('/api/address/:id', this.get.bind(this))
		this.app.post('/api/address', this.post.bind(this))
		this.app.put('/api/address/:id', this.put.bind(this))
		this.app.delete('/api/address/:id', this.delete.bind(this))
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
	 * @api {post} /address/default/:id 设置默认地址
	 * @apiDescription 设置默认地址
	 * @apiName setDefault
	 * @apiGroup address
	 *
	 * @apiParam {String} id 资源ID
	 *
	 * @apiPermission none
	 * @apiSampleRequest /address/default/:id
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
	setDefault(req, res, next) {
		const query = {
			is_def: true, 
			user  : req.user._id, 
		}

		const update = {
			$set: {
				is_def: false
			}
		}

		this.model.findOneAndUpdateAsync(query, update)
		.then(doc => {
			return this.model.findOneAndUpdateAsync({_id: req.params.id}, {$set: {is_def: true}})
		})
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '调用成功', doc)
		})
		.catch(err => next(err))
	}
	
	/**
	 * @api {get} /address/default 获取默认地址
	 * @apiDescription 获取默认地址
	 * @apiName getDefault
	 * @apiGroup address
	 *
	 * @apiPermission none
	 * @apiSampleRequest /address/default
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
	getDefault(req, res, next) {
		const query = {
			is_def: true, 
			user  : req.user._id, 
		}

		const fields = {}
		
		this.model.get(query, fields)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '调用成功', doc)
		})
		.catch(err => next(err))
	}

	/**
	 * @api {get} /address 列出所有资源
	 * @apiDescription 列出所有资源
	 * @apiName getAll
	 * @apiGroup address
	 * 
	 * @apiParam {String} [page=1] 指定第几页
	 * @apiParam {String} [limit=10] 指定每页的记录数
	 * @apiParam {Boolean} [is_show] 指定is_show过滤
	 *
	 * @apiPermission none
	 * @apiSampleRequest /address
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
	 *       "data": [{
	 *       	"_id": "_id",
	 *       	"images": [{
	 *       		"_id": "_id",
	 *       		"name": "name",
	 *       		"path": "path",
	 *       		"create_at": "create_at"
	 *       	}],
	 *       	"is_show": "is_show",
	 *       	"remark": "remark",
	 *       	"sort": "sort",
	 *       	"title": "title",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }]
	 *     }
	 */
	getAll(req, res, next) {
		const query = {
			user: req.user._id
		}

		const fields = {}

		const options = {
			page : req.query.page, 
			limit: req.query.limit, 
		}

		Promise.all([
			this.model.countAsync(query), 
			this.model.getAll(query, fields, options), 
		])
		.then(docs => {
			res.tools.setJson(0, '调用成功', {
				items   : docs[1], 
				paginate: new res.paginate(Number(options.page), Number(options.limit), docs[0]).item, 
			})
		})
		.catch(err => next(err))
	}
	
	/**
	 * @api {get} /address/:id 获取某个指定资源的信息
	 * @apiDescription 获取某个指定资源的信息
	 * @apiName get
	 * @apiGroup address
	 *
	 * @apiParam {String} id 资源ID
	 *
	 * @apiPermission none
	 * @apiSampleRequest /address/:id
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
	 *       	"_id": "_id",
	 *       	"images": [{
	 *       		"_id": "_id",
	 *       		"name": "name",
	 *       		"path": "path",
	 *       		"create_at": "create_at"
	 *       	}],
	 *       	"is_show": "is_show",
	 *       	"remark": "remark",
	 *       	"sort": "sort",
	 *       	"title": "title",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }
	 *     }
	 */
	get(req, res, next) {
		const query = {
			_id : req.params.id, 
			user: req.user._id, 
		}

		const fields = {}

		this.model.get(query, fields)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '调用成功', doc)
		})
		.catch(err => next(err))
	}

	/**
	 * @api {post} /address 新建一个资源
	 * @apiDescription 新建一个资源
	 * @apiName post
	 * @apiGroup address
	 *
	 * @apiParam {String} title 标题
	 * @apiParam {String} remark 描述
	 * @apiParam {Number} sort 排序
	 * @apiParam {Boolean} is_show 是否显示
	 * @apiParam {Array} images 图片
	 *
	 * @apiPermission none
	 * @apiSampleRequest /address
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "新增成功"
	 *       },
	 *       "data": {
	 *       	"_id": "_id"
	 *       }
	 *     }
	 */
	post(req, res, next) {
		const query = {
			is_def: true, 
			user  : req.user._id, 
		}

		const update = {
			$set: {
				is_def: false
			}
		}

		const body = {
			name   : req.body.name, 
			gender : req.body.gender, 
			tel    : req.body.tel, 
			address: req.body.address, 
			is_def : req.body.is_def, 
			user   : req.user._id, 
		}

		if (body.is_def) {
			this.model.findOneAndUpdateAsync(query, update)
			.then(doc => this.model.post(body))
			.then(doc => res.tools.setJson(0, '新增成功', {_id: doc._id}))
			.catch(err => next(err))
		}

		if (!body.is_def) {
			this.model.countAsync({user: req.user._id})
			.then(doc => {
				if (!doc) body.is_def = true
				return this.model.post(body)
			})
			.then(doc => res.tools.setJson(0, '新增成功', {_id: doc._id}))
			.catch(err => next(err))
		}
	}

	/**
	 * @api {put} /address/:id 更新某个指定资源的信息
	 * @apiDescription 更新某个指定资源的信息
	 * @apiName put
	 * @apiGroup address
	 *
	 * @apiParam {String} id 资源ID
	 * @apiParam {String} [title] 标题
	 * @apiParam {String} [remark] 描述
	 * @apiParam {Number} [sort] 排序
	 * @apiParam {Boolean} [is_show] 是否显示
	 * @apiParam {Array} [images] 图片
	 *
	 * @apiPermission none
	 * @apiSampleRequest /address/:id
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
	 *       "data": {
	 *       	"_id": "_id",
	 *       	"images": [{
	 *       		"_id": "_id",
	 *       		"name": "name",
	 *       		"path": "path",
	 *       		"create_at": "create_at"
	 *       	}],
	 *       	"is_show": "is_show",
	 *       	"remark": "remark",
	 *       	"sort": "sort",
	 *       	"title": "title",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }
	 *     }
	 */
	put(req, res, next) {
		const query = {
			_id : req.params.id, 
			user: req.user._id, 
		}

		const body = {
			name   : req.body.name, 
			gender : req.body.gender, 
			tel    : req.body.tel, 
			address: req.body.address, 
			is_def : req.body.is_def, 
		}

		const find = {
			is_def: true, 
			user  : req.user._id, 
		}

		const update = {
			$set: {
				is_def: false
			}
		}

		if (body.is_def) {
			this.model.findOneAndUpdateAsync(find, update)
			.then(doc => this.model.put(query, body))
			.then(doc => {
				if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
				return res.tools.setJson(0, '更新成功', doc)
			})
			.catch(err => next(err))
		}

		if (!body.is_def) {
			this.model.put(query, body)
			.then(doc => {
				if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
				return res.tools.setJson(0, '更新成功', doc)
			})
			.catch(err => next(err))
		}
	}

	/**
	 * @api {delete} /address/:id 删除某个指定资源
	 * @apiDescription 删除某个指定资源
	 * @apiName delete
	 * @apiGroup address
	 *
	 * @apiParam {String} id 资源ID
	 * @apiSampleRequest /address/:id
	 * 
	 * @apiPermission none
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
	delete(req, res, next) {
		const query = {
			_id : req.params.id, 
			user: req.user._id, 
		}
		
		this.model.delete(query)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '删除成功')
		})
		.catch(err => next(err))
	}
}

export default Ctrl