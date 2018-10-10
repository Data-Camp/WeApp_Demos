import FeatureBase from './FeatureBase'

class RestBase extends FeatureBase{
	constructor(model) {
		super(model)
	}

	/**
	 * 获取资源列表
	 * @param  {Object} query   
	 * @param  {Object} fields  
	 * @param  {Object} options 
	 * @return {Function}         
	 */
	getAll(query = {}, fields = {}, options = {}) {
		const page  = Number(options.page) || 1
		const limit = Number(options.limit) || 10
		const skip  = (page - 1) * limit
		const sort  = options.sort || {create_at: -1}

		return this.model.findAsync(query, fields, {
			skip : skip, 
			limit: limit, 
			sort : sort, 
		})
	}

	/**
	 * 获取某个指定资源的信息
	 * @param  {Object} query  
	 * @param  {Object} fields 
	 * @return {Function}        
	 */
	get(query = {}, fields = {}) {
		return this.model.findOneAsync(query, fields)
	}

	/**
	 * 新建一个资源
	 * @param  {Object} body 
	 * @return {Function}      
	 */
	post(body = {}) {
		return new this.model(body).save()
	}

	/**
	 * 更新某个指定资源的信息
	 * @param  {Object} query   
	 * @param  {Object} body    
	 * @param  {Object} options 
	 * @return {Function}         
	 */
	put(query = {}, body = {}, options = {}) {
		body.update_at = Date.now()
		options.upsert = !0
		options.new = !0
		return this.model.findOneAndUpdate(query, body, options)
	}

	/**
	 * 删除某个指定资源
	 * @param  {Object} query   
	 * @param  {Object} options 
	 * @return {Function}         
	 */
	delete(query = {}, options = {}) {
		return this.model.findOneAndRemove(query, options)
	}
}

export default RestBase