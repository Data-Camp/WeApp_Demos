class Ctrl {
    constructor($state, $timeout, $ionicLoading, UserService){
        Object.assign(this, {
            $state, 
            $timeout, 
            $ionicLoading, 
            UserService, 
        })
        
        this.init()
    }

    init() {
        this.initForm()
    }

    initForm() {
        this.form = {
			oldpwd : null,
			newpwd : null,
			confpwd: null,
        }
    }

    submitForm(isValid) {
    	const params = angular.copy(this.form)
        if (!params.oldpwd || !params.newpwd || !params.confpwd ) return
        if (params.newpwd != params.confpwd) {
        	alert('两次密码输入不一致')
        	return
        }
        console.log(params)
        this.UserService.password({
        	oldpwd: params.oldpwd,
        	newpwd: params.newpwd,
        })
        .then(data => {
        	console.log(data)
            this.$ionicLoading.show({
                template: data.meta && data.meta.message, 
                duration: 1000, 
            })
        })
    }
}

Ctrl.$inject = [
    '$state', 
    '$timeout', 
	'$ionicLoading', 
	'UserService'
] 

export default Ctrl