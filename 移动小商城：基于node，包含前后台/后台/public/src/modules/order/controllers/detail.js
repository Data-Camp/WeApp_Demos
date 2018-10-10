import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, OrderResource){
        super('order', $scope, $state, $timeout, $ionicLoading, OrderResource)
        this.init()
    }

    init() {
        this.order.detail({
        	id: this.$state.params.id
        })
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'OrderResource',
] 

export default Ctrl