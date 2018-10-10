class Tools{
	constructor() {

	}

	clone(obj) {
	    if (typeof obj !== 'object' || !obj) {
	        return obj
	    }
	    let copy = {}
	    for (let attr in obj) {
	        if (obj.hasOwnProperty(attr)) {
	            copy[attr] = obj[attr]
	        }
	    }
	    return copy
	}

	omit(obj, keys) {
	    if (!angular.isObject(obj)) {
	        return obj
	    }
	    if (angular.isArray(keys) && keys.length === 0) {
	        return obj
	    }
	    if (angular.isString(keys) && !keys) {
	        return obj
	    }
	    if (!angular.isString(keys) && !angular.isArray(keys)) {
	        return obj
	    }
	    let o = this.clone(obj)
	    keys.forEach(key => {
	        delete o[key]
	    })
	    return o
	}

	pluck(arr, key) {
	    if (!angular.isArray(arr) || arr.length === 0) {
	        return []
	    }
	    if (!key) {
	        return arr
	    }
	    return arr.map(a => a[key])
	}
}

export default Tools