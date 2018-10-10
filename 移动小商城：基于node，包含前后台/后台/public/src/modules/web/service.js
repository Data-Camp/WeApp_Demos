import ServiceBase from 'helpers/ServiceBase'

class Service extends ServiceBase {
	constructor($http, $q) {
		super($http, $q)
		this.url_prefix = ''
		this.OBJ = {
			
        }
	}
}

Service.$inject = [
	'$http', 
	'$q', 
]

export default Service