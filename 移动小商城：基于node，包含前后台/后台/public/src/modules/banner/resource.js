import ResourceBase from 'helpers/ResourceBase'

class Service extends ResourceBase {
	constructor($resource) {
		super($resource)
        this.url = '/banner/:id'
        return this.$resource(this.setUrl(this.url), {id: '@id'}, this.setActions())
	}
}

Service.$inject = [
	'$resource' 
]

export default Service