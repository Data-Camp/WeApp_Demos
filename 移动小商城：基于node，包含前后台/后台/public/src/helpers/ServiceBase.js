import __config from 'etc/config'

class ServiceBase {
    constructor($http, $q) {
        Object.assign(this, {
            $http, 
            $q, 
            $$baseUrl: __config.baseUrl
        })
    }

    /* Set headers */
    setHeaders(headers = {}) {
        headers['Content-type'] = 'application/json'
        return headers
    }

    /* GET */
    getRequest(url, search = {}) {
        const deferred = this.$q.defer()
        const headers  = this.setHeaders()
        const $$url    = `${this.$$baseUrl}${this.url_prefix}${url}`

        this.$http({
            method: 'GET',
            url: $$url,
            params: search,
            headers: headers,
            paramSerializer: '$httpParamSerializerJQLike'
        })
        .success((data, status, headers, config) => deferred.resolve(data))
        .error((data, status, headers, config) => deferred.reject(data))

        return deferred.promise
    }

    /* POST */
    postRequest(url, params = {}, search = {}) {
        const deferred = this.$q.defer()
        const headers  = this.setHeaders()
        const $$url    = `${this.$$baseUrl}${this.url_prefix}${url}`

        this.$http({
            method: 'POST',
            url: $$url,
            data: params,
            headers: headers,
            params: search,
            paramSerializer: '$httpParamSerializerJQLike'
        })
        .success((data, status, headers, config) => deferred.resolve(data))
        .error((data, status, headers, config) => deferred.reject(data))

        return deferred.promise
    }

    /* upload file */
    postMultipart(url, params = {}, search = {}) {
        const deferred = this.$q.defer()
        const headers  = this.setHeaders()
        const $$url    = `${this.$$baseUrl}${this.url_prefix}${url}`
            
        let fd = new FormData()
        angular.forEach(params, (val, key) => fd.append(key, val))

        this.$http({
            method: 'POST',
            url: $$url,
            params: search,
            paramSerializer: '$httpParamSerializerJQLike',
            data: fd,
            headers: {
				'Content-Type': undefined
            },
            transformRequest: angular.identity
        })
        .success((data, status, headers, config) => deferred.resolve(data))
        .error((data, status, headers, config) => deferred.reject(data))

        return deferred.promise
    }
}

ServiceBase.$inject = [
    '$http', 
    '$q', 
]

export default ServiceBase