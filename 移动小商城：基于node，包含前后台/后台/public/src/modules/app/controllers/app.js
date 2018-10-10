import selectHtml from 'ngtemplate!html!../../common/tpl/select.html'

class Ctrl {
    constructor($scope, $timeout, $state, $window, $ionicModal, $ionicSideMenuDelegate, AuthEvents){
        Object.assign(this, {
            $scope, 
            $timeout, 
            $state, 
            $window, 
            $ionicModal, 
            $ionicSideMenuDelegate, 
            AuthEvents, 
        })

        this.menu = {
            aside: [
                {
                    url: null,
                    name: '分类管理',
                    children: [
                        {
                            url: 'web.classify.list',
                            name: '所有分类'
                        },
                        {
                            url: 'web.classify.add',
                            name: '添加分类'
                        }
                    ]
                },
                {
                    url: null,
                    name: '商品管理',
                    children: [
                        {
                            url: 'web.goods.list',
                            name: '所有商品'
                        },
                        {
                            url: 'web.goods.add',
                            name: '添加商品'
                        }
                    ]
                },
                {
                    url: null,
                    name: '图片管理',
                    children: [
                        {
                            url: 'web.banner.list',
                            name: '所有Banner'
                        },
                        {
                            url: 'web.banner.add',
                            name: '添加banner'
                        }
                    ]
                },
                {
                    url: null,
                    name: '订单管理',
                    children: [
                        {
                            url: 'web.order.list',
                            name: '所有订单'
                        }
                    ]
                },
                {
                    url: null,
                    name: '帮助管理',
                    children: [
                        {
                            url: 'web.help.list',
                            name: '所有帮助'
                        },
                        {
                            url: 'web.help.add',
                            name: '添加帮助'
                        }
                    ]
                },
            ],
            line: [],
            flat: [
                {
                    icon: 'fa-rmb',
                    name: '分类管理',
                    url: 'web.classify.list',
                    bg: '',
                },
                {
                    icon: 'fa-link',
                    name: '商品管理',
                    url: 'web.goods.list',
                    bg: '',
                },
                {
                    icon: 'fa-photo',
                    name: '图片管理',
                    url: 'web.banner.list',
                    bg: '',
                },
                {
                    icon: 'fa-file',
                    name: '订单管理',
                    url: 'web.order.list',
                    bg: '',
                },
                {
                    icon: 'fa-bookmark-o',
                    name: '帮助管理',
                    url: 'web.help.list',
                    bg: '',
                },
            ]
        }

        this.init()
    }

    init() {
        this.initModal()
        this.initAuthenticated()
    }

    initAuthenticated() {
        const toSign = () => this.$state.go('web.login')
        this.$scope.$on(this.AuthEvents.notAuthenticated, toSign)
        this.$scope.$on(this.AuthEvents.notAuthorized, toSign)
        this.$scope.$on(this.AuthEvents.sessionTimeout, toSign)
    }

    openThisLink($event, url) {
        $event.preventDefault()
        $event.stopPropagation()

        this.$ionicSideMenuDelegate.toggleLeft()
        this.$state.go(url)
    }

    onSelect(state) {
        this.selectModal.close()
        this.$timeout(() => {
            this.$state.go(state)
        }, 250)
    }
    
    initModal() {
        this.selectModal = {}
        this.$ionicModal.fromTemplateUrl(selectHtml, {
            scope: this.$scope,
            animation: 'slide-in-up',
        }).then((modal) => {
            this.selectModal.instance = modal
        })

        this.selectModal.open = () => {
            this.selectModal.instance.show()
        }

        this.selectModal.close = () => {
            this.selectModal.instance.hide()
        }
    }
}

Ctrl.$inject = [
    '$scope', 
    '$timeout', 
    '$state', 
    '$window', 
    '$ionicModal', 
    '$ionicSideMenuDelegate', 
    'AuthEvents', 
] 

export default Ctrl