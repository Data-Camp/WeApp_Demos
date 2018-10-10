class Paginate{
	constructor(page, perPage, total) {
		Object.assign(this, {
			page, 
			perPage, 
			total, 
		})
		this.init()
	}

	/**
	 * init
	 */
	init() {
		if(!this.page || this.page < 1) {
	        this.page = 1
	    }
	    if(!this.perPage || this.perPage < 1) {
	        this.perPage = 10
	    }
	    if(!this.total || this.total < 0) {
	        this.total = 0
	    }
	    if(this.total % this.perPage === 0) {
	        this.pages = parseInt(this.total/this.perPage)
	    } else {
	        this.pages = parseInt(this.total/this.perPage) + 1
	    }
	    if(this.page > this.pages) {
	        this.page = this.pages
	    }
	    this.item = {
			page   : this.page, 
			pages  : this.pages, 
			perPage: this.perPage, 
			total  : this.total, 
			prev   : this.prev(), 
			next   : this.next(), 
			hasNext: this.hasNext(), 
			hasPrev: this.hasPrev(), 
		}
	}

	/**
	 * 是否有上一页
	 */
	hasPrev() {
	    if(this.page > 1) return !0
	    return !1
	}

	/**
	 * 上一页
	 */
	prev() {
	    if(this.page <= 1) return 1
	    return this.page - 1
	}

	/**
	 * 是否有下一页
	 */
	hasNext() {
	    if(this.page < this.pages) return !0
	    return !1
	}

	/**
	 * 下一页
	 */
	next() {
	    if(this.page < this.pages) return this.page + 1
	    return this.pages
	}
}

export default Paginate