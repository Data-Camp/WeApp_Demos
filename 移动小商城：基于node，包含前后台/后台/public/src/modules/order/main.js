// register
import register from 'helpers/register'

// controllers
import OrderListCtrl from './controllers/list'
import OrderDetailCtrl from './controllers/detail'

// services
import OrderResource from './resource'
import OrderService from './service'

export default 
	angular
		.module('app.order', [])
    	.controller('OrderListCtrl', OrderListCtrl)
    	.controller('OrderDetailCtrl', OrderDetailCtrl)


    register('app.order')
    	.factory('OrderResource', OrderResource)
    	.factory('OrderService', OrderService)