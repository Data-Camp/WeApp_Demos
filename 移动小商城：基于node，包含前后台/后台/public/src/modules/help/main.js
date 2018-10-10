// register
import register from 'helpers/register'

// controllers
import HelpListCtrl from './controllers/list'
import HelpAddCtrl from './controllers/add'
import HelpEidtCtrl from './controllers/edit'
import HelpDetailCtrl from './controllers/detail'

// services
import HelpResource from './resource'

export default 
	angular
		.module('app.help', [])
    	.controller('HelpListCtrl', HelpListCtrl)
    	.controller('HelpAddCtrl', HelpAddCtrl)
    	.controller('HelpEidtCtrl', HelpEidtCtrl)
        .controller('HelpDetailCtrl', HelpDetailCtrl)


    register('app.help')
    	.factory('HelpResource', HelpResource)