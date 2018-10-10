import Model from '../models/upload'

class Common{
	constructor(model) {
		Object.assign(this, {
			model, 
		})
	}
	
	/**
	 * 上传文件
	 * @param  {String}   name     
	 * @param  {String}   path     
	 * @return {Function}            
	 */
	newAndSave(name, path) {
		return new this.model({
			name: name,
			path: path,
		}).save()
	}

	/**
	 * 根据ID查询文件
	 * @param  {String}   id       
	 * @return {Function}            
	 */
	findById(id) {
		return this.model.findByIdAsync(id)
	}
}

export default new Common(Model)