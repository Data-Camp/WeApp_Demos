import { plugin, loadPlugin } from 'etc/loadplugin'
import authService from '../app/resolves/authService'

function Router($stateProvider, $ocLazyLoadProvider) {
    
    //set router
    $stateProvider

        .state('web.goods', {
            abstract: true,
            url: '/goods',
            views: {
                'menu-content': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!../web/tpl/tabs.html'))
                            }, 'tabs.html')
                        })
                    }]
                }
            },
            resolve: {
                authService: authService,
                loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            $ocLazyLoad.load({name: require('./main').default.name})
                            resolve()
                        }, 'goods')
                    })
                }]
            }
        })

        .state('web.goods.list', {
            url: '/list',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/list.html'))
                            }, 'web.list.html')
                        })
                    }],
                    controller: 'GoodsListCtrl as vm'
                }
            }
        })

        .state('web.goods.add', {
            tabsHidden: true,
            url: '/add',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/add.html'))
                            }, 'web.add.html')
                        })
                    }],
                    controller: 'GoodsAddCtrl as vm'
                }
            }
        })

        .state('web.goods.detail', {
            tabsHidden: true,
            url: '/{id}',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/detail.html'))
                            }, 'web.detail.html')
                        })
                    }],
                    controller: 'GoodsDetailCtrl as vm'
                }
            }
        })

        .state('web.goods.edit', {
            tabsHidden: true,
            url: '/{id}/edit',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/add.html'))
                            }, 'web.add.html')
                        })
                    }],
                    controller: 'GoodsEditCtrl as vm'
                }
            }
        })
}

Router.$inject = [
    '$stateProvider', 
    '$ocLazyLoadProvider'
]

export default angular
	.module('app.goods.router', [])
    .config(Router)