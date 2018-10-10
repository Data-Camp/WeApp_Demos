// register
import register from 'helpers/register'

// controllers
import ClassifyAddCtrl from './controllers/add'
import ClassifyEditCtrl from './controllers/edit'
import ClassifyListCtrl from './controllers/list'

// services
import ClassifyResource from './resource'

export default 
	angular
		.module('app.classify', [])
    	.controller('ClassifyAddCtrl', ClassifyAddCtrl)
    	.controller('ClassifyEditCtrl', ClassifyEditCtrl)
    	.controller('ClassifyListCtrl', ClassifyListCtrl)


    register('app.classify')
    	.factory('ClassifyResource', ClassifyResource)