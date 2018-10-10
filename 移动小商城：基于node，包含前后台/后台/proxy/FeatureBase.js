import bluebird from 'bluebird'

class FeatureBase{
	constructor(model) {
		Object.assign(this, {
			model, 
		})

		this.suffix = 'Async'

		this.instanceSource = {
			Query: [
				'count', 'distinct', 'exec', 'find', 'findOne', 'findOneAndRemove',
				'findOneAndUpdate', 'remove', 'update'
			],
			Model: [
				'remove', 'save',
				// extended from Document
				'update', 'validate', 'populate'
			]
		}

		this.modelStaticsList = [
			// 'aggregate',
			'count', 'create', 'distinct', 'ensureIndexes',
			'find', 'findById', 'findByIdAndRemove', 'findByIdAndUpdate',
			'findOne', 'findOneAndRemove', 'findOneAndUpdate',
			'geoNear', 'geoSearch', 'mapReduce', 'populate', 'remove', 'update'
		]

		this.init()
	}

	/**
	 * init
	 */
	init() {
		const self = this
		for(let key in self.instanceSource) {	
			self.instanceSource[key].forEach(function(value) {
				self[value + self.suffix] = function() {
					return self.getPromise(bluebird, self.getResolver(self.model[value], [...Array.from(arguments)], self.model))
				}
			})
		}
		self.modelStaticsList.forEach(function(value) {
			self[value + self.suffix] = function() {
				return self.getPromise(bluebird, self.getResolver(self.model[value], [...Array.from(arguments)], self.model))
			}
		})
	}

	/**
	 * getPromise
	 * @param  {Object} Promise  
	 * @param  {Function} resolver 
	 * @return {Function}          
	 */
	getPromise(Promise, resolver) {
		//bluebird
		if(Promise.promisifyAll) return new Promise(resolver)
		// when
		if(Promise.lift) return Promise.promise(resolver)
		//RSVP / Q / es6-promise
		if(Promise.Promise) return new Promise.Promise(resolver)

		throw new Error('Promise library is not supported')
	}

	/**
	 * getResolver
	 * @param  {Function} method  
	 * @param  {Object} args    
	 * @param  {Object} context 
	 * @return {Function}         
	 */
	getResolver(method, args, context) {
		return function(resolve, reject) {
			args.push(function(err) {
				if (err) return reject(err)
				let receivedArgs = [...Array.from(arguments)]
				// remove the first argument for error
				receivedArgs.shift()
				resolve(receivedArgs.length > 1 ? receivedArgs : receivedArgs[0])
			})
			method.apply(context, args)
		}
	}

	/**
	 * 关联查询资源列表
	 * @param  {Object} params  
	 * @param  {Object} options 
	 * @return {Function}         
	 */
	findAndPopulateAsync(params = {}, options = {}) {
		params.options = params.options || {}
		const page  = Number(params.options.page) || 1
		const limit = Number(params.options.limit) || 10
		const skip  = (page - 1) * limit
		const sort  = params.options.sort || {create_at: -1}

		return this.model
		.find(params.query, params.fields, {
			skip : skip, 
			limit: limit, 
			sort : sort,
		})
		.populate(options)
		.exec()
	}

	/**
	 * 关联查询某个指定资源
	 * @param  {Object} params  
	 * @param  {Object} options 
	 * @return {Function}         
	 */
	findOneAndPopulateAsync(params = {}, options = {}) {
		return this.model
		.findOne(params.query, params.fields)
		.populate(options)
		.exec()
	}
}

export default FeatureBase