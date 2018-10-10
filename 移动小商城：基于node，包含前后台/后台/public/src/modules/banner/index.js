import { plugin, loadPlugin } from 'etc/loadplugin'
import authService from '../app/resolves/authService'

function Router($stateProvider, $ocLazyLoadProvider) {
    
    //set router
    $stateProvider

        .state('web.banner', {
            abstract: true,
            url: '/banner',
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
                        }, 'banner')
                    })
                }]
            }
        })

        .state('web.banner.list', {
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
                    controller: 'BannerListCtrl as vm'
                }
            }
        })

        .state('web.banner.add', {
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
                    controller: 'BannerAddCtrl as vm'
                }
            }
        })

        .state('web.banner.edit', {
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
                    controller: 'BannerEditCtrl as vm'
                }
            }
        })
}

Router.$inject = [
    '$stateProvider', 
    '$ocLazyLoadProvider'
]

export default angular
	.module('app.banner.router', [])
    .config(Router)