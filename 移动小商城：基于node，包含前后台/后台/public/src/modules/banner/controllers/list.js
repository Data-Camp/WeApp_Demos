import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, BannerResource, $ionicActionSheet){
        super('banners', $scope, $state, $timeout, $ionicLoading, BannerResource)
        Object.assign(this, {
            $ionicActionSheet, 
        })
        this.init()
    }

    init() {
        this.banners.list()
    }

    showSheet(item) {
        const vm = this
        vm.$ionicActionSheet.show({
            titleText: item.title,
            buttons: [
                { 
                    text: '<b>设为显示</b>' 
                },
                { 
                    text: '<b>设为隐藏</b>' 
                },
            ],
            buttonClicked: (index) => {
                switch(index) {
                    case 0:
                        vm.setBannerShow(item, !0)
                        break
                    case 1: 
                        vm.setBannerShow(item, !1)
                        break
                }                
                return true
            },
            cancelText: '取消',
            cancel: () => {
              // add cancel code..
            },
            destructiveText: '删除',
            destructiveButtonClicked: () => {
                vm.banners.delete({id: item._id})
                return true
            }
        })
    }

    setBannerShow(item, is_show) {
        const params = angular.copy(item)
        params.is_show = is_show
        params.id = item._id
        console.log(params)
        this.banners.update(params)
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'BannerResource',
    '$ionicActionSheet',
] 

export default Ctrl