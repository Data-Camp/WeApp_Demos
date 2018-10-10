const { request, api, filterHtml, dateFormat, addCommas } = require('../../utils/util.js');

var app = getApp();

Page({
	data: {
		windowWidth: 0,
		windowHeight: 0,
		shotWidth: 0,
		shotHeight: 0,

    isShowLoading: true,
		designers: [],
		shots: {},
		pageIndex: 1
	},
	scroll: function(e){
		let { detail, currentTarget } = e;
		console.log('scroll:' ,e, detail.scrollLeft);

		let obj = {
			designers: this.data.designers
		};
		obj['designers'][currentTarget.dataset.index]['isScrolled'] = detail.scrollLeft > 0;

		this.setData(obj)
	},
	scrolltoupper: function(e) {
		console.log('scrolltoupper',e)
	},
	scrolltolower: function(e) {
		let { userid } = e.currentTarget.dataset;
		let { page } = this.data.shots[userid];

		this.getDesignerShots(userid, page);
	},
	/* 
	 * 获取单个设计师的 shots
	 *
	 * @param  {number} user_id   用户id
	 * @param  {number} page      页码
	*/
	getDesignerShots: function(user_id, page = 2) {
		request({
			url: api.getDesignerShots,
			data: {
				user_id,
				page
			}
		})
		.then(res => {
			console.log('[get designer shots]: ', res.data)

			let obj = {
				shots: this.data.shots
			};
			let data = res.data && res.data[0];
			// shots
			obj.shots[user_id] = {
				shots: obj.shots[user_id].shots.concat(data.shots || []),
				page: page + 1,
			};

			this.setData(obj);
		})
	},
	/* 
	 * 获取多个设计师的 shots
	 *
	 * @param  {array} ids  用户数组id
	*/
	getDesignersShots: function(ids) {
		console.log('[get designers shots]: ', ids);

    wx.request({
      	url: api.getDesignersShots(ids),
      	success: res => {
	        if (res.statusCode === 200){
						console.log('[get designers shots]: ', res);

	        	let { data } = res;
	        	if (data.length > 0) {
		        	let { shots } = this.data;

	        		for (d of data) {
	        			shots[d.user_id] = {
	        				shots: d.shots,
	        				page: 2 // 当前函数已经获取到了第一页，接下来获取要从第二页开始
	        			};
	        		}

	  	      	this.setData({
		        		shots
	    	    	});

	        	}

	        }
      	}
    })
	},
	/* 
	 * 获取设计师列表
	 *
	 * @param  {number} page      页码
	*/
	getDesigners: function(page){

		let _page = page || 1;

		this.setData({
			isShowLoading: true,
		})

		request({
			url: api.getDesigners,
			data: {
				page: _page
			}
		})
		.then(res => {
			let obj = {
				isShowLoading: false,
				designers: this.data.designers
			};

			let { datas } = res.data;
			if (datas.length > 0) {
				let ids = datas.map(d => d.id); // return -> [1,2,3,4,5]
				this.getDesignersShots(ids); // 获取用户 shots

				// filter html and concat
				for (d of datas) {
					d.bio = filterHtml(d.bio);
					d.followers_count = addCommas(d.followers_count);
					obj['designers'].push(d);
				}
				
				obj['pageIndex'] = _page;
			}
			this.setData(obj)
		})
	},
	/*
		滚动到底部加载数据
	 */
	loadMore: function(){
		let page = ++this.data.pageIndex;
		console.log('loadMore:', page);
		this.getDesigners(page);
	},
	/*
		关注按钮事件
	 */
	followDesigner: function(e){
		let { id } = e.currentTarget.dataset;
		console.log('follow designer:', id);
	},
	onLoad: function(options) {
		this.getDesigners();
    wx.getSystemInfo({
        success: (res) => {
        	let shotWidth = (res.windowWidth - 40) * 0.475;
            this.setData({
            	windowWidth: res.windowWidth,
            	windowHeight: res.windowHeight,
              shotWidth: shotWidth,
              shotHeight: shotWidth * 0.75
            })
        }
    });
	}
})