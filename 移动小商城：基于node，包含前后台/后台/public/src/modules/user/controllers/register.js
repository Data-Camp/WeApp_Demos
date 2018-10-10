class Ctrl {
    constructor($state, Notice, UserService){
        Object.assign(this, {
            $state, 
            Notice, 
            UserService, 
        })

        this.init()
    }

    init() {
        this.initForm()
    }

    initForm() {
        this.form = {
            username: null,
            password: null,
        }
    }

    submitForm(isValid) {
        if (!isValid) return
        console.log(this.form)
    	this.UserService.signUp(this.form)
    	.then(data => {
    		console.log(data)
            this.Notice.message(data.meta.message)
    	})
    }
}

Ctrl.$inject = [
    '$state', 
	'Notice', 
	'UserService'
] 

export default Ctrl