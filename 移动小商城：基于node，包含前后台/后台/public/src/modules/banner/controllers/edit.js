import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, BannerResource, $weuiGallery, AppService){
        super('banners', $scope, $state, $timeout, $ionicLoading, BannerResource)
        Object.assign(this, {
            $scope, 
            $state, 
            $timeout, 
            $ionicLoading, 
            BannerResource, 
            $weuiGallery, 
            AppService, 
        })
        this.init()
    }

    init() {
        this.initForm()
        this.renderHtml()
    }

    renderHtml() {
        this.banners.detailAsync({id: this.$state.params.id})
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                const detail = data.data
                this.form = {
                    id     : detail._id,
                    title  : detail.title,
                    remark : detail.remark,
                    sort   : detail.sort,
                    is_show: detail.is_show,
                    images : detail.images,
                }
            }
        })
    }

    initForm() {
        this.form = {
            title  : null,
            remark : null,
            sort   : 99,
            is_show: !1,
            images : []
        }
    }

    submitForm(isValid) {
        if (!isValid) return
        const params = angular.copy(this.form)
        console.log(params)
        this.banners.update(params, {
            callback: () => this.$state.go('web.banner.list')
        })
    }

    showGallery(id, index) {
        const vm = this
        vm.$weuiGallery.show({
            index: index,
            urls: vm.form.images.map(n => n.path),
            cancel: function() {
                console.log('cancel')
            },
            delete: function(index, item) {
                vm.delFile(id, index)
                return !0
            },
            animation: 'fade-in-right'
        })
    }

    getFile() {
        this.AppService.uploadFile({
            file: this.file
        }).then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.form.images.push(data.data)
            }
        })
    }

    delFile(id, index) {
        this.AppService.delFile(id)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.form.images.splice(index, 1)
            }
        })
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'BannerResource',
    '$weuiGallery',
    'AppService',
] 

export default Ctrl