import ServiceBase from 'helpers/ServiceBase'

class Service extends ServiceBase {
	constructor($http, $q) {
		super($http, $q)
		this.url_prefix = '/user'
		this.OBJ = {
			signUp  : '/sign/up',
			signIn  : '/sign/in',
			signOut : '/sign/out',
			password: '/reset/password',
			info    : '/info',
        }
	}

	signUp(params) {
		return this.postRequest(this.OBJ.signUp, params) 
	}

	signIn(params) {
		return this.postRequest(this.OBJ.signIn, params) 
	}

	signOut(params) {
		return this.postRequest(this.OBJ.signOut) 
	}

	password(params) {
		return this.postRequest(this.OBJ.password, params) 
	}

	getInfo() {
		return this.getRequest(this.OBJ.info) 
	}

	saveInfo(params) {
		return this.postRequest(this.OBJ.info, params) 
	}
}

Service.$inject = [
	'$http', 
	'$q', 
]

export default Service