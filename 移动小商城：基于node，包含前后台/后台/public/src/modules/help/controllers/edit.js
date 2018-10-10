import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, HelpResource){
        super('helps', $scope, $state, $timeout, $ionicLoading, HelpResource)
        this.init()
    }

    init() {
        this.initForm()
        this.renderHtml()
    }

    renderHtml() {
        this.helps.detailAsync({id: this.$state.params.id})
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                const detail = data.data
                this.form = {
                    id     : detail._id,
                    title  : detail.title,
                    content: detail.content,
                }
            }
        })
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
        this.helps.update(this.form, {
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