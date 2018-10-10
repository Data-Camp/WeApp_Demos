import index from './app/index'
import web from './web/index'
import user from './user/index'
import banner from './banner/index'
import classify from './classify/index'
import goods from './goods/index'
import order from './order/index'
import help from './help/index'

angular
    .module('App', [
        index.name,
        web.name,
        user.name,
        banner.name,
        classify.name,
        goods.name,
        order.name,
        help.name,
    ])