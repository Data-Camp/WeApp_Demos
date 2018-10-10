import __config from 'etc/config'

class Header{
    constructor(features) {
        this.head = angular.element(document.head)
        this.execute()
    }

    title(t) {
        const title = angular.element('<title></title>')
        title.text(t)
        this.head.append(title)
    }

    meta(attr) {
        const meta = angular.element('<meta>')
        meta.attr(attr)
        this.head.append(meta)
    }

    execute() {
        this.title(__config.appname)
        this.meta({'charset': 'utf-8'})
        this.meta({
            'name': 'viewport',
            'content': 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.0, user-scalable=yes, minimal-ui'
        })
        this.meta({
        	'name': 'renderer', 
        	'content': 'webkit'
        })
        this.meta({
            'http-equiv': 'X-UA-Compatible',
            'content': 'IE=edge,chrome=1'
        })
        this.meta({
            'name': 'apple-mobile-web-app-capable',
            'content': 'yes'
        })
        this.meta({
            'name': 'apple-mobile-web-app-capable',
            'content': 'yes'
        })
    }
}

export default Header