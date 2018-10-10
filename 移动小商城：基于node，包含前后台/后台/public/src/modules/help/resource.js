import ResourceBase from 'helpers/ResourceBase'

class Service extends ResourceBase {
	constructor($resource) {
		super($resource)
        this.url = '/help/:id'
        return this.$resource(this.setUrl(this.url), {id: '@id'}, this.setActions())
	}
}

Service.$inject = [
	'$resource' 
]

export default Service