/* 封装一个指令实现默认图片 */ 
class image404{
    constructor(){
        this.restrict = 'A'
    }

    link(scope, element, attrs, controller) {

        const loading = '/build/assets/img/loading.jpg'

        const changeSCR = () => {
            if(element.attr('src') === attrs.image404) {
                throw new Error('The supplied fallback image doesn\'t exist')
            }
            element.attr('src', attrs.image404 ? attrs.image404 : loading)
        }

        !attrs.src && changeSCR()

        element.on('error', changeSCR)
    }
}

export default image404