import __config from 'etc/config'

class ResourceBase {
    constructor($resource) {
        Object.assign(this, {
            $resource, 
            $$baseUrl: __config.baseUrl
        })
    }

    /* Set headers */
    setHeaders(headers = {}) {
        headers['Content-type'] = 'application/json'
        return headers
    }

    /* Set actions */
    setActions(actions = {}) {
    	actions = {
    		get: { 
	        	method:'GET', 
	        	headers: this.setHeaders()
	        },
	        save: { 
	        	method:'POST', 
	        	headers: this.setHeaders()
	        },
	        query: { 
	        	method:'GET', 
	        	headers: this.setHeaders()
	        },
	        remove: { 
	        	method:'DELETE', 
	        	headers: this.setHeaders()
	        },
    		delete: { 
	        	method:'DELETE', 
	        	headers: this.setHeaders()
	        },
	        update: { 
	        	method:'PUT', 
	        	headers: this.setHeaders()
	        }
    	}
    	return actions
    }

    /* Set url */
    setUrl(url) {
    	return `${this.$$baseUrl}${url}`
    }
}

ResourceBase.$inject = [
	'$resource', 
]

export default ResourceBase