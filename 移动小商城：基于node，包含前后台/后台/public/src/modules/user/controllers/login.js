class Ctrl {
    constructor($state, $window, Notice, UserService){
        Object.assign(this, {
            $state, 
            $window, 
            Notice, 
            UserService, 
        })
        
        this.init()
    }

    init() {
        this.initForm()
        this.captcha()
    }

    initForm() {
        this.form = {
            username: null,
            password: null,
            code    : null,
        }
    }

    submitForm(isValid) {
        if (!isValid) return
        console.log(this.form)
    	this.UserService.signIn(this.form)
    	.then(data => {
    		console.log(data)
            this.Notice.message(data.meta.message, () => this.notice(data))
    	})
    }

    notice(data) {
        if (data.meta.code == 0) {
            this.$window.sessionStorage.token = data.data.token
            this.$state.go('web.user.info')
        }
    }

    captcha(width = 80, height = 30) {
        const timestamp = Date.now()
        this.code = `${this.$window.api_base_url}/common/captcha/${width}/${height}?timestamp=${timestamp}`
    }
}

Ctrl.$inject = [
    '$state', 
    '$window', 
	'Notice', 
	'UserService', 
] 

export default Ctrl