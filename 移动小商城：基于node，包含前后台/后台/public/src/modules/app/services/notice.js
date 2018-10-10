class notice {
    constructor($timeout, $ionicLoading) {
    	Object.assign(this, {
    		$timeout, 
    		$ionicLoading, 
    	})

        this.defaults = {
            template: '正在载入数据，请稍后...', 
            duration: 1000, 
        }
    }

    show(opts) {
        const self    = this
        const options = angular.extend(angular.copy(self.defaults), opts || {})
        self.$ionicLoading.show(options)
    }

    message(msg, cb) {
        const self = this
        const opts = {
        	template: msg, 
            duration: 1000, 
        }
        self.$ionicLoading.show(opts).then(self.$timeout(angular.isFunction(cb) && cb, 1000))
    }
}

notice.$inject = [
	'$timeout', 
	'$ionicLoading', 
]

export default notice