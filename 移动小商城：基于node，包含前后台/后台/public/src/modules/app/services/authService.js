class authService {
    constructor(AppService) {
        Object.assign(this, {
            AppService, 
        })

        this.isAuthorized = () => {
            return  this.AppService.signCheck()
            .then(data => {
                if (data.meta && data.meta.code == 0) {
                	return !0
            	}
            	return !1
            })
        }
    }

    isAuthorized() {
        return this.isAuthorized()
    }
}

authService.$inject = [
    'AppService',
]

export default authService