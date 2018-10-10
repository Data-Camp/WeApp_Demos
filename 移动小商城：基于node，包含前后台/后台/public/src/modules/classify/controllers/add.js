import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, ClassifyResource){
        super('classify', $scope, $state, $timeout, $ionicLoading, ClassifyResource)
        this.init()
    }

    init() {
        this.initForm()
    }

    initForm() {
        this.form = {
            name  : null,
            remark: null,
        }
    }

    submitForm(isValid) {
        if (!isValid) return
        console.log(this.form)
        this.classify.save(this.form, {
            callback: () => this.$state.go('web.classify.list')
        })
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'ClassifyResource',
] 

export default Ctrl