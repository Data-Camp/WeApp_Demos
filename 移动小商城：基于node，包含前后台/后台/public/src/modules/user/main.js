// register
import register from 'helpers/register'

// controllers
import RegisterCtrl   from './controllers/register'
import LoginCtrl 	  from './controllers/login'
import InfoCtrl 	  from './controllers/info'
import SettingCtrl 	  from './controllers/setting'
import PasswordCtrl   from './controllers/password'

// services
import UserService from './service'

export default 
	angular
		.module('app.user', [])
    	.controller('RegisterCtrl', RegisterCtrl)
    	.controller('LoginCtrl', LoginCtrl)
    	.controller('InfoCtrl', InfoCtrl)
    	.controller('SettingCtrl', SettingCtrl)
    	.controller('PasswordCtrl', PasswordCtrl)


    register('app.user')
    	.factory('UserService', UserService)