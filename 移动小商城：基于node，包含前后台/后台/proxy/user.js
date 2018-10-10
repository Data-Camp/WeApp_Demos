import Model from '../models/user'

class Common{
	constructor(model) {
		Object.assign(this, {
			model, 
		})
	}

	/**
	 * 新建一个用户
	 * @param  {Object} body 
	 * @return {Function}          
	 */
	newAndSave(body) {
		return new this.model(body).save()
	}

	/**
	 * 根据用户名查询一个用户
	 * @param  {String}   username 
	 * @return {Function}            
	 */
	findByName(username) {
		return this.model.findOneAsync({
			username: username
		})
	}
}

export default new Common(Model)