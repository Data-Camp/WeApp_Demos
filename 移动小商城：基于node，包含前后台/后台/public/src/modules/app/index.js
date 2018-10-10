// css
import css from 'assets/css/main'

// config
import config from 'etc/config'

// controllers
import Controller from './controllers/index'

// routers
import Router from './routers/index'

// factory
import Service from './services/index'

// animations
import Animation from './animations/index'

// filters
import Filter from './filters/index'

// directives
import Directive from './directives/index'

angular
    .module('app.main', [
        Controller.name, 
        Router.name, 
        Service.name, 
        Animation.name, 
        Filter.name, 
        Directive.name, 
        Service.name, 
    ])

export default angular
    .module('app.index', [
        'oc.lazyLoad', 
        'ionic',  
        'vgSrc',  
        'ng-weui',  
        'ngAnimate',  
        'ngSanitize',  
        'ngResource',  
        'ui.router', 
        'angularMoment', 
        'app.main'
    ])