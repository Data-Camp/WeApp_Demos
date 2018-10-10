import { plugin, loadPlugin } from 'etc/loadplugin'
import authService from '../app/resolves/authService'

function Router($stateProvider, $ocLazyLoadProvider) {
    
    //set router
    $stateProvider

        .state('web.help', {
            abstract: true,
            url: '/help',
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
                        }, 'help')
                    })
                }]
            }
        })

        .state('web.help.list', {
            url: '/list',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/list.html'))
                            }, 'help.list.html')
                        })
                    }],
                    controller: 'HelpListCtrl as vm'
                }
            }
        })

        .state('web.help.add', {
            tabsHidden: true,
            url: '/add',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/add.html'))
                            }, 'help.add.html')
                        })
                    }],
                    controller: 'HelpAddCtrl as vm'
                }
            }
        })

        .state('web.help.edit', {
            tabsHidden: true,
            url: '/{id}/edit',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/add.html'))
                            }, 'help.add.html')
                        })
                    }],
                    controller: 'HelpEidtCtrl as vm'
                }
            }
        })

        .state('web.help.detail', {
            tabsHidden: true,
            url: '/{id}',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/detail.html'))
                            }, 'help.detail.html')
                        })
                    }],
                    controller: 'HelpDetailCtrl as vm'
                }
            }
        })
}

Router.$inject = [
    '$stateProvider', 
    '$ocLazyLoadProvider'
]

export default angular
	.module('app.help.router', [])
    .config(Router)