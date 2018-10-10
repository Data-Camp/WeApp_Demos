import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, HelpResource){
        super('helps', $scope, $state, $timeout, $ionicLoading, HelpResource)
        this.init()
    }

    init() {
        this.initForm()
    }

    initForm() {
        this.form = {
            title  : null,
            content: null,
        }
    }

    submitForm(isValid) {
        if (!isValid) return
        console.log(this.form)
        this.helps.save(this.form, {
            callback: () => this.$state.go('web.help.list')
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