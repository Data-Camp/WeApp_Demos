class Ctrl {
    constructor($scope, $state, Notice, UserService, AppService, $ionicModal){
        Object.assign(this, {
            $scope, 
            $state, 
            Notice, 
            UserService, 
            AppService, 
            $ionicModal, 
        })

        this.init()
    }

    init() {
        this.initForm()
        this.getInfo()
        this.initModal()
    }

    initForm() {
        this.form = {
            tel     : null, 
            email   : null, 
            nickname: null, 
            gender  : null, 
            birthday: null,
        }
    }

    renderHtml() {
        this.form = {
            tel     : this.userInfo.tel, 
            email   : this.userInfo.email, 
            nickname: this.userInfo.nickname, 
            gender  : this.userInfo.gender, 
            birthday: moment(this.userInfo.birthday)._d,
        }
    }

    getInfo() {
    	this.UserService.getInfo()
    	.then(data => {
    		console.log(data)
            if (data.meta.code == 0) {
                this.userInfo = data.data
            }
    	})
    }

    saveInfo(params) {
        this.UserService.saveInfo(params)
        .then(data => {
            console.log(data)
            this.Notice.message(data.meta.message, () => {
                if (data.meta.code == 0) {
                    this.modal.close()
                    this.getInfo()
                }
            })
        })
    }

    getFile() {
        this.AppService.uploadFile({
            file: this.file
        }).then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.saveInfo({
                    avatar: data.data.path
                })
            }
        })
    }

    initModal() {
        this.modal = {}
        this.$ionicModal.fromTemplateUrl('modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then((modal) => {
            this.modal.instance = modal
        })

        this.modal.open = () => {
            this.modal.instance.show()
            this.renderHtml()
        }

        this.modal.close = () => {
            this.modal.instance.hide()
        }
    }

    submitForm(isValid) {
        // if (!isValid) return
        const params = angular.copy(this.form)
        console.log(params)
        this.saveInfo(params)
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
	'Notice', 
    'UserService',
    'AppService',
	'$ionicModal',
] 

export default Ctrl