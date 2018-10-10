function TokenInterceptor($rootScope, $q, $window, $location, AuthEvents) {
    return {
        request: function (config) {
            config.headers = config.headers || {}
            config.requestTimestamp = new Date().getTime()

            if (config.url.indexOf('/api') !== -1 && $window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token
            }

            return config
        },

        requestError: function(requestError) {
            return $q.reject(requestError)
        },

        response: function (response) {
            response.config.responseTimestamp = new Date().getTime()

            if (response.config.url.indexOf('/api') != -1) {
                if (response.data.meta.code === 401 || 403 || 419 || 440) {
                    $rootScope.$broadcast({
                        401: AuthEvents.notAuthenticated,
                        403: AuthEvents.notAuthorized,
                        419: AuthEvents.sessionTimeout,
                        440: AuthEvents.sessionTimeout
                    }[response.data.meta.code], !0)
                }
            }

            return response || $q.when(response)
        },

        responseError: function(responseError) {

            // 广播HTTP错误事件
            $rootScope.$broadcast({
                401: AuthEvents.notAuthenticated,
                403: AuthEvents.notAuthorized,
                419: AuthEvents.sessionTimeout,
                440: AuthEvents.sessionTimeout
            }[responseError.status], responseError)

            return $q.reject(responseError)
        }
    }
}

TokenInterceptor.$inject = [
    '$rootScope', 
    '$q', 
    '$window', 
    '$location', 
    'AuthEvents', 
]

export default TokenInterceptor