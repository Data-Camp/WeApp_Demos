// register
import register from 'helpers/register'

// controllers
import GoodsAddCtrl from './controllers/add'
import GoodsEditCtrl from './controllers/edit'
import GoodsListCtrl from './controllers/list'
import GoodsDetailCtrl from './controllers/detail'

// services
import GoodsResource from './resource'
import ClassifyResource from '../classify/resource'

export default 
	angular
		.module('app.goods', [])
    	.controller('GoodsAddCtrl', GoodsAddCtrl)
    	.controller('GoodsEditCtrl', GoodsEditCtrl)
    	.controller('GoodsListCtrl', GoodsListCtrl)
    	.controller('GoodsDetailCtrl', GoodsDetailCtrl)


    register('app.goods')
    	.factory('GoodsResource', GoodsResource)
    	.factory('ClassifyResource', ClassifyResource)