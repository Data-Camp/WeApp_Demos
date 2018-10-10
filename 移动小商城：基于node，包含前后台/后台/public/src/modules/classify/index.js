import { plugin, loadPlugin } from 'etc/loadplugin'
import authService from '../app/resolves/authService'

function Router($stateProvider, $ocLazyLoadProvider) {
    
    //set router
    $stateProvider

        .state('web.classify', {
            abstract: true,
            url: '/classify',
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
                        }, 'classify')
                    })
                }]
            }
        })

        .state('web.classify.list', {
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
                    controller: 'ClassifyListCtrl as vm'
                }
            }
        })

        .state('web.classify.add', {
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
                    controller: 'ClassifyAddCtrl as vm'
                }
            }
        })

        .state('web.classify.edit', {
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
                    controller: 'ClassifyEditCtrl as vm'
                }
            }
        })
}

Router.$inject = [
    '$stateProvider', 
    '$ocLazyLoadProvider'
]

export default angular
	.module('app.classify.router', [])
    .config(Router)