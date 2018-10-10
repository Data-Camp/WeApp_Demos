// 懒加载文件路径
const obj = {
    store: {
        name : 'store',
        files: [
            '/assets/plugins/store/store.js', 
        ]
    },
}

// 配置路径
const renderPath = (obj, basePath) => {
    let data = {}
    for(let i in obj) {
        let item = obj[i].files
        if (item && angular.isArray(item)) {
            data[i] = obj[i]
            data[i].files = item.map(function(n) {
                return basePath + n
            })
        }
    }
    return data
}

// 懒加载方法，接受一个数组参数
const loadPlugin = (array) => {
    return ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(array)
    }]
}

// 配置路径
const plugin = renderPath(obj, 'build')

export { plugin, loadPlugin }