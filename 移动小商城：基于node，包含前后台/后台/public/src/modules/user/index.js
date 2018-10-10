import { plugin, loadPlugin } from 'etc/loadplugin'
import authService from '../app/resolves/authService'

function Router($stateProvider, $ocLazyLoadProvider) {

    //set router
    $stateProvider

        .state('web.user', {
            abstract: true,
            url: '/user',
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
                loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            $ocLazyLoad.load({name: require('./main').default.name})
                            resolve()
                        }, 'user')
                    })
                }]
            }
        })

        // .state('web.register', {
        //     url: '/user/register',
        //     views: {
        //         'menu-content': {
        //             templateProvider: ['$q', ($q) => {
        //                 return $q((resolve) => {
        //                     require.ensure([], () => {
        //                         resolve(require('html!./tpl/register.html'))
        //                     }, 'user.register.html')
        //                 })
        //             }],
        //             controller: 'RegisterCtrl as vm'
        //         }
        //     },
        //     resolve: {
        //         loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
        //             return $q((resolve) => {
        //                 require.ensure([], () => {
        //                     $ocLazyLoad.load({name: require('./main').default.name})
        //                     resolve()
        //                 }, 'user')
        //             })
        //         }]
        //     }
        // })

        .state('web.login', {
            url: '/user/login',
            views: {
                'menu-content': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/login.html'))
                            }, 'user.login.html')
                        })
                    }],
                    controller: 'LoginCtrl as vm'
                }
            },
            resolve: {
                loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            $ocLazyLoad.load({name: require('./main').default.name})
                            resolve()
                        }, 'user')
                    })
                }]
            }
        })

        .state('web.user.info', {
            url: '/info',
            views: {
                'tab-user': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/info.html'))
                            }, 'user.info.html')
                        })
                    }],
                    controller: 'InfoCtrl as vm'
                }
            },
            resolve: {
                authService: authService
            }
        })

        .state('web.user.setting', {
            tabsHidden: true,
            url: '/setting',
            views: {
                'tab-user': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/setting.html'))
                            }, 'user.setting.html')
                        })
                    }],
                    controller: 'SettingCtrl as vm'
                }
            },
            resolve: {
                authService: authService
            }
        })

        .state('web.user.password', {
            tabsHidden: true,
            url: '/password',
            views: {
                'tab-user': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/password.html'))
                            }, 'user.password.html')
                        })
                    }],
                    controller: 'PasswordCtrl as vm'
                }
            },
            resolve: {
                authService: authService
            }
        })
}

Router.$inject = [
    '$stateProvider', 
    '$ocLazyLoadProvider'
]

export default angular
	.module('app.user.router', [])
    .config(Router)