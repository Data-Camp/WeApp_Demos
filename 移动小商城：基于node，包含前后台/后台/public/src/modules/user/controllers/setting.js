class Ctrl {
    constructor($state, $window, Notice, UserService){
        Object.assign(this, {
            $state, 
            $window, 
            Notice, 
            UserService, 
        })
    }

    signOut() {
        this.UserService.signOut()
        .then(data => {
            console.log(data)
            this.Notice.message(data.meta.message, () => this.callback(data))
        })
    }

    callback(data) {
        if (data.meta.code == 0) {
            delete this.$window.sessionStorage.token
            this.$state.go('web.login')
        }
    }
}

Ctrl.$inject = [
    '$state', 
    '$window', 
	'Notice', 
	'UserService'
] 

export default Ctrl