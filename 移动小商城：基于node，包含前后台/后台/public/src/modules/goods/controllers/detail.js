import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, GoodsResource){
        super('goods', $scope, $state, $timeout, $ionicLoading, GoodsResource)
        this.init()
    }

    init() {
        this.goods.detail({
        	id: this.$state.params.id
        })
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'GoodsResource',
] 

export default Ctrl