import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, HelpResource){
        super('helps', $scope, $state, $timeout, $ionicLoading, HelpResource)
        this.init()
    }

    init() {
        this.helps.detail({
            id: this.$state.params.id
        })
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'HelpResource',
] 

export default Ctrl