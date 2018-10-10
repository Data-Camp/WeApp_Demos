class Ctrl {
    constructor($state, WebService, BannerResource){
        Object.assign(this, {
            $state, 
            WebService, 
            BannerResource, 
        })
        
        this.init()
    }

    init() {
        this.getBanners()
    }

    getBanners() {
        this.banners = {}
        this.BannerResource.get({is_show: true}).$promise
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.banners.items = data.data.items
            }
        })
    }
}

Ctrl.$inject = [
    '$state', 
    'WebService', 
    'BannerResource', 
] 

export default Ctrl