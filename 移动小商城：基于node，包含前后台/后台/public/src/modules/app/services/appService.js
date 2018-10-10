import ServiceBase from 'helpers/ServiceBase'

class Service extends ServiceBase {
	constructor($http, $q) {
		super($http, $q)
		this.url_prefix = '/common'
		this.OBJ = {
            uploadFile : '/file',
            signCheck  : '/sign/check',
            updateIcons: '/update/icons',
            icons      : '/icons',
        }
	}

	uploadFile(params) {
        return this.postMultipart(this.OBJ.uploadFile, params)
    }

    delFile(id) {
        return this.postRequest(`/file/${id}`)
    }

    signCheck() {
        return this.postRequest(this.OBJ.signCheck)
    }

    updateIcons() {
        return this.getRequest(this.OBJ.updateIcons)
    }

    icons() {
        return this.getRequest(this.OBJ.icons)
    }
}

Service.$inject = [
	'$http', 
	'$q', 
]

export default Service