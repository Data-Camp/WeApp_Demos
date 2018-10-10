function Router($httpProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider, vgSrcConfigProvider) {
    
    // otherwise
    $urlRouterProvider.otherwise('/404')

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
    
    // 注入拦截器
    $httpProvider.interceptors.push('TokenInterceptor')

    // html5Mode
    $locationProvider.html5Mode(true)
    
    // set cache false
    $ionicConfigProvider.views.maxCache(0)

    // image lazyload
    vgSrcConfigProvider.$set({
		error  : '/build/assets/img/loading.jpg',
		loading: '/build/assets/img/loading.jpg',
		empty  : '/build/assets/img/loading.jpg',
    })
}

Router.$inject = [
    '$httpProvider', 
    '$urlRouterProvider', 
    '$locationProvider', 
    '$ionicConfigProvider', 
    'vgSrcConfigProvider'
]

export default Router