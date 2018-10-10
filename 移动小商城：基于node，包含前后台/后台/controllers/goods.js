import proxy from '../proxy'

class Ctrl{
	constructor(app) {
		Object.assign(this, {
			app, 
			model: proxy.goods, 
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
		this.app.get('/api/goods', this.getAll.bind(this))
		this.app.get('/api/goods/:id', this.get.bind(this))
		this.app.post('/api/goods', this.post.bind(this))
		this.app.put('/api/goods/:id', this.put.bind(this))
		this.app.delete('/api/goods/:id', this.delete.bind(this))
		this.app.get('/api/goods/search/all', this.search.bind(this))
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
	 * @api {get} /goods 列出所有资源
	 * @apiDescription 列出所有资源
	 * @apiName getAll
	 * @apiGroup goods
	 * 
	 * @apiParam {String} [page=1] 指定第几页
	 * @apiParam {String} [limit=10] 指定每页的记录数
	 *
	 * @apiPermission none
	 * @apiSampleRequest /goods
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
	 *       	"name": "name",
	 *       	"price": "price",
	 *       	"remark": "remark",
	 *       	"images": "images",
	 *       	"types": "types",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }]
	 *     }
	 */	
	getAll(req, res, next) {
		const query = {}

		const opts = {
			page : req.query.page, 
			limit: req.query.limit
		}

		if (req.query.type) {
			query.types = req.query.type
		}

		if (req.query.keyword) {
			query.name = req.query.keyword
		}

		const params = {
			query  : query, 
			fields : {}, 
			options: opts, 
		}

		const options = {
			path    : 'types', 
			select  : {}, 
		}

		Promise.all([
			this.model.countAsync(query), 
			this.model.findAndPopulateAsync(params, options), 
		])
		.then(docs => {
			res.tools.setJson(0, '调用成功', {
				items   : docs[1], 
				paginate: new res.paginate(Number(opts.page), Number(opts.limit), docs[0]).item, 
			})
		})
		.catch(err => next(err))
	}
	
	/**
	 * @api {get} /goods/:id 获取某个指定资源的信息
	 * @apiDescription 获取某个指定资源的信息
	 * @apiName get
	 * @apiGroup goods
	 *
	 * @apiParam {String} id 资源ID
	 *
	 * @apiPermission none
	 * @apiSampleRequest /goods/:id
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
	 *       	"name": "name",
	 *       	"price": "price",
	 *       	"remark": "remark",
	 *       	"images": "images",
	 *       	"types": "types",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }
	 *     }
	 */
	get(req, res, next) {
		const params = {
			query  : {
				_id: req.params.id
			},
			fields : {}, 
			options: {}, 
		}

		const options = {
			path    : 'types', 
			select  : {}, 
		}

		this.model.findOneAndPopulateAsync(params, options)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '调用成功', doc)
		})
		.catch(err => next(err))
	}

	/**
	 * @api {post} /goods 新建一个资源
	 * @apiDescription 新建一个资源
	 * @apiName post
	 * @apiGroup goods
	 *
	 * @apiParam {String} name 名称
	 * @apiParam {Number} price 价格
	 * @apiParam {String} remark 简介
	 * @apiParam {Array} images 图片
	 * @apiParam {Array} types 分类
	 *
	 * @apiPermission none
	 * @apiSampleRequest /goods
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
		const body = {
			name  : req.body.name, 
			price : req.body.price, 
			remark: req.body.remark, 
			images: req.body.images, 
			types : req.body.types, 
		}

		this.model.post(body)
		.then(doc => res.tools.setJson(0, '新增成功', {_id: doc._id}))
		.catch(err => next(err))
	}

	/**
	 * @api {put} /goods/:id 更新某个指定资源的信息
	 * @apiDescription 更新某个指定资源的信息
	 * @apiName put
	 * @apiGroup goods
	 *
	 * @apiParam {String} id 资源ID
	 * @apiParam {String} [name] 名称
	 * @apiParam {String} [price] 价格
	 * @apiParam {String} [remark] 简介
	 * @apiParam {Array} [images] 图片
	 * @apiParam {Array} [types] 分类
	 *
	 * @apiPermission none
	 * @apiSampleRequest /goods/:id
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
	 *       	"name": "name",
	 *       	"price": "price",
	 *       	"remark": "remark",
	 *       	"images": "images",
	 *       	"types": "types",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }
	 *     }
	 */
	put(req, res, next) {
		const query = {
			_id: req.params.id
		}

		const body = {
			name  : req.body.name, 
			price : req.body.price, 
			remark: req.body.remark, 
			images: req.body.images, 
			types : req.body.types, 
		}

		this.model.put(query, body)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '更新成功', doc)
		})
		.catch(err => next(err))
	}

	/**
	 * @api {delete} /goods/:id 删除某个指定资源
	 * @apiDescription 删除某个指定资源
	 * @apiName delete
	 * @apiGroup goods
	 *
	 * @apiParam {String} id 资源ID
	 * @apiSampleRequest /goods/:id
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
			_id: req.params.id
		}
		
		this.model.delete(query)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '删除成功')
		})
		.catch(err => next(err))
	}

	/**
	 * @api {search} /goods/search/all 按关键词查询资源
	 * @apiDescription 按关键词查询资源
	 * @apiName search
	 * @apiGroup goods
	 *
	 * @apiParam {String} keyword 关键词
	 * @apiSampleRequest /goods/search/all
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
	 *       	"message": "调用成功"
	 *       },
	 *       "data": [{
	 *       	"_id": "_id",
	 *       	"num": "num",
	 *       }]
	 *     }
	 */
	search(req, res, next) {
		const keyword = req.query.keyword
		const pattern = keyword && new RegExp(keyword)

		this.model.model.aggregate([
			{
				$match: {
					name: pattern
				}
			},
			{
				$group: {
					_id: '$name',
					num: {
						$sum: 1
					}
				}
			}
		])
		.then(doc => res.tools.setJson(0, '调用成功', doc))
		.catch(err => next(err))
	}
}

export default Ctrl