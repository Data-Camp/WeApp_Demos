import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, OrderResource, $ionicActionSheet){
        super('order', $scope, $state, $timeout, $ionicLoading, OrderResource)
        Object.assign(this, {
            $ionicActionSheet, 
        })
        this.init()
    }

    init() {
        this.orderStatus = [
            { 
                text: '<b>全部</b>',
                type: 'all', 
            },
            { 
                text: '<b>已提交</b>',
                type: 'submitted', 
            },
            { 
                text: '<b>已取消</b>',
                type: 'canceled', 
            },
            { 
                text: '<b>已确认</b>',
                type: 'confirmed', 
            },
            { 
                text: '<b>已完成</b>',
                type: 'finished', 
            },
        ]

        this.type = this.orderStatus[0]['type']

        this.order.list({
            type: this.type
        })
    }

    renderStatus(type) {
        let status = null
        angular.forEach(this.orderStatus, (value, key) => {
            if (type === value.type) {
                status = value.text
            }  
        })
        return status
    }

    showSheet() {
        const vm = this
        const orderStatus = angular.copy(vm.orderStatus)

        angular.forEach(orderStatus, (value, key) => {
            if (vm.type === value.type) {
                value.className = 'active'
            }  
        })

        vm.$ionicActionSheet.show({
            titleText: '订单筛选',
            buttons: orderStatus,
            buttonClicked(index) {
                vm.type =  orderStatus[index]['type']
                vm.order.list({
                    type: vm.type,
                })
                return true
            },
            cancelText: '取消',
        })
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'OrderResource',
    '$ionicActionSheet',
] 

export default Ctrl