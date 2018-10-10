/* 封装一个指令用以上传图片及附件预览 */
class fileModel{
    constructor($parse){
        this.$parse   = $parse
        this.restrict = 'A'
    }

    link(scope, element, attrs, ngModel) {
        var model       = this.$parse(attrs.fileModel),
            modelSetter = model.assign;
        element.bind('change', (event) => {
            scope.$apply( () => {
                modelSetter(scope, element[0].files[0])
            })
            //附件预览
            scope.file = (event.srcElement || event.target).files[0]
            scope.$apply(attrs.fileFn)
        })
    }
}

fileModel.$inject = ['$parse']

export default fileModel