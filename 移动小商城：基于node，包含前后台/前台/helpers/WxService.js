import Tools from 'Tools'
import es6 from '../assets/plugins/es6-promise'

class Service {
    constructor() {
        this.__init()
    }

    __init() {
    	const that = this

    	// 工具函数
    	that.tools = new Tools

    	// 缓存非异步方法
        that.noPromiseMethods = [
			'stopRecord', 
			'pauseVoice', 
			'stopVoice', 
			'pauseBackgroundAudio', 
			'stopBackgroundAudio', 
			'showNavigationBarLoading', 
			'hideNavigationBarLoading', 
			'createAnimation', 
			'createContext', 
			'hideKeyboard', 
			'stopPullDownRefresh', 
		]

		// 缓存wx接口方法名
		that.instanceSource = {
            method: Object.keys(wx)
        }

        // 遍历wx方法对象，判断是否为异步方法，是则构造promise
        for(let key in that.instanceSource) { 
			that.instanceSource[key].forEach(function(method) {
				that[method] = function() {
					// 判断是否为非异步方法或以 wx.on 开头，或以 Sync 结尾的方法
					if (that.noPromiseMethods.indexOf(method) !== -1 || method.substr(0, 2) === 'on' || /\w+Sync$/.test(method)) {
						return wx[method](...Array.from(arguments))
					}
	                return that.__getPromise(es6.Promise, that.__getResolver(that.__defaultRequest, [method, ...Array.from(arguments)], that))
	            }
			})
		}

		/**
		 * 保留当前页面，跳转到应用内的某个页面
		 * @param {String} url  路径
		 * @param {Object} params 参数
		 */
		that.navigateTo = (url, params) => {
	        const $$url = that.tools.buildUrl(url, params)
	    	return new es6.Promise((resolve, reject) => {
	    		wx.navigateTo({
	    			url: $$url,
					success: res => resolve(res),
		            fail: res => reject(res),
				})
	    	})
	    }

	    /**
		 * 关闭当前页面，跳转到应用内的某个页面
		 * @param {String} url  路径
		 * @param {Object} params 参数
		 */
	    that.redirectTo = (url, params) => {
	        const $$url = that.tools.buildUrl(url, params)
	    	return new es6.Promise((resolve, reject) => {
	    		wx.redirectTo({
	    			url: $$url,
					success: res => resolve(res),
		            fail: res => reject(res),
				})
	    	})
	    }
    }

    /**
     * __getPromise
     */
    __getPromise(Promise, resolver) {
        if(Promise) return new Promise(resolver)
        throw new Error('Promise library is not supported')
    }

    /**
     * __getResolver
     */
    __getResolver(method, args, context) {
        return function(resolve, reject) {
            method.apply(context, args)(resolve, reject)
        }
    }

    /**
     * 以wx下API作为底层方法
     * @param {String} method 方法名
     * @param {Object} obj    接收参数
     */
    __defaultRequest(method = '', obj = {}) {
    	return function(resolve, reject) {
    		obj.success = (res) => resolve(res)
    		obj.fail = (res) => reject(res)
    		wx[method](obj)
    	}
    }
}

export default Service