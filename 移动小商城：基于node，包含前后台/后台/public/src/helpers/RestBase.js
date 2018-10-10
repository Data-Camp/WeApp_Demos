class Ctrl{
	constructor($$model, $scope, $state, $timeout, $ionicLoading, $$Resource) {
		Object.assign(this, {
			$$model,
            $scope, 
            $state, 
            $timeout, 
            $ionicLoading, 
            $$Resource, 
        })

        this.initModel()
	}

	initModel() {
		this[this.$$model] = {
			params: {
				page : 1,
				limit: 10,
			},
			paginate: {}
		}

		this[this.$$model].list = (params = {}) => {
			angular.extend(this[this.$$model].params, params)
			console.time(`Get resources`)
			this.$$Resource.get(params).$promise
			.then(data => {
				console.timeEnd(`Get resources`)
				console.log(data)
				if (data.meta.code == 0) {
					this[this.$$model].items = data.data.items
					this[this.$$model].paginate = data.data.paginate
					this[this.$$model].params.page = data.data.paginate.next
					this[this.$$model].params.limit = data.data.paginate.perPage
				}
			})
		}

		this[this.$$model].detail = (params = {}) => {
			console.time(`Get resource`)
			return this.$$Resource.get(params).$promise
			.then(data => {
				console.timeEnd(`Get resource`)
				console.log(data)
				if (data.meta.code == 0) {
					this[this.$$model].item = data.data
				}
			})
		}
		
		this[this.$$model].save = (params = {}, options = {}) => {
			console.time(`Post resource`)
			this.$$Resource.save(params).$promise
			.then(data => {
				console.timeEnd(`Post resource`)
	            console.log(data)
	            this.notify(data, options.callback)
	        })
	        .catch(error => this.requestErrorHandler(error))
		}

		this[this.$$model].update = (params = {}, options = {}) => {
			console.time(`Put resource`)
			this.$$Resource.update(params).$promise
			.then(data => {
				console.timeEnd(`Put resource`)
	            console.log(data)
	            this.notify(data, options.callback)
	        })
	        .catch(error => this.requestErrorHandler(error))
		}

		this[this.$$model].delete = (params = {}, options = {}) => {
			console.time(`Delete resource`)
			this.$$Resource.delete(params).$promise
			.then(data => {
				console.time(`Delete resource`)
				console.log(data)
				this.notify(data, null, !0)
	        })
	        .catch(error => this.requestErrorHandler(error))
		}

		this[this.$$model].listAsync   = (params) => this.$$Resource.get(params).$promise
		
		this[this.$$model].detailAsync = (params) => this.$$Resource.get(params).$promise
		
		this[this.$$model].saveAsync   = (params) => this.$$Resource.save(params).$promise
		
		this[this.$$model].updateAsync = (params) => this.$$Resource.update(params).$promise
		
		this[this.$$model].deleteAsync = (params) => this.$$Resource.delete(params).$promise
	}

	notify(data, callback, reload) {
		const self = this
		const time = 1000
		const type = data.meta && (data.meta.code === 0)
		const text = data.meta && data.meta.message
		const cb   = reload ? self.doRefresh.bind(self) : angular.isFunction(callback) ? callback : angular.noop
		self.$ionicLoading.show({
			template: text,
			duration: time,
		})
		.then(self.$timeout(() => cb.apply(self, [data]), time))
	}

	doRefresh() {
		this[this.$$model].params.page = 1
		this[this.$$model].params.limit = 10
		this[this.$$model].paginate = {}
		console.time(`Do refresh`)
		this[this.$$model].listAsync(this[this.$$model].params).then(data => {
			console.timeEnd(`Do refresh`)
			console.log(data)
			if (data.meta.code == 0) {
				this[this.$$model].items = data.data.items
				this[this.$$model].paginate = data.data.paginate
				this[this.$$model].params.page = data.data.paginate.next
				this[this.$$model].params.limit = data.data.paginate.perPage
				this.$scope.$broadcast(`scroll.refreshComplete`)
			}
		})
	}

	loadMore() {
		console.time(`Load more`)
		this[this.$$model].listAsync(this[this.$$model].params).then(data => {
			console.timeEnd(`Load more`)
			console.log(data)
			if (data.meta.code == 0) {
				angular.forEach(data.data.items, (value, key) => this[this.$$model].items.push(value))
				this[this.$$model].paginate = data.data.paginate
				this[this.$$model].params.page = data.data.paginate.next
				this[this.$$model].params.limit = data.data.paginate.perPage
				this.$scope.$broadcast(`scroll.infiniteScrollComplete`)
			}
		})
	}

	requestErrorHandler(response) {
		this.$ionicLoading.show({
			template: `Error: ${response.status} ${response.statusText}`, 
			duration: 1000, 
		})
	}
}

Ctrl.$inject = [
	'$scope', 
	'$state', 
	'$timeout', 
	'$ionicLoading', 
    '$$Resource',
] 

export default Ctrl