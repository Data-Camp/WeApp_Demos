// register
import register from 'helpers/register'

// controllers
import BannerAddCtrl from './controllers/add'
import BannerEditCtrl from './controllers/edit'
import BannerListCtrl from './controllers/list'

// services
import BannerResource from './resource'

export default 
	angular
		.module('app.banner', [])
    	.controller('BannerAddCtrl', BannerAddCtrl)
    	.controller('BannerEditCtrl', BannerEditCtrl)
    	.controller('BannerListCtrl', BannerListCtrl)


    register('app.banner')
    	.factory('BannerResource', BannerResource)