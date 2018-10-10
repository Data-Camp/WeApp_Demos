// register
import register from 'helpers/register'

// constant
import AuthEvents from './authEvents'

// factory
import FileReader from './fileReader'
import AppService from './appService'
import QiniuService from './qiniuService'
import AuthService from './authService'
import FileOptimization from './fileOptimization'
import TokenInterceptor from './tokenInterceptor'
import Notice from './notice'

export default 
	angular
		.module('app.service', [])
		.constant('AuthEvents', AuthEvents)
		.constant("$ionicLoadingConfig", {
	        template : '正在载入数据，请稍后...'
	    })


    register('app.service')
		.factory('FileReader', FileReader)
		.factory('AppService', AppService)
		.factory('QiniuService', QiniuService)
		.factory('AuthService', AuthService)
		.factory('FileOptimization', FileOptimization)
		.factory('TokenInterceptor', TokenInterceptor)
		.factory('Notice', Notice)