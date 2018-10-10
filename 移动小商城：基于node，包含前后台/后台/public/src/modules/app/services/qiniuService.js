import ServiceBase from 'helpers/ServiceBase'

class Service extends ServiceBase {
	constructor($http, $q) {
		super($http, $q)
		this.url_prefix = '/qiniu'
		this.OBJ = {
            upload   : '/upload',
            download : '/download',
            saveAsURL: '/saveAsURL',
            stat     : '/stat',
            move     : '/move',
            copy     : '/copy',
            delete   : '/delete',
            list     : '/list',
            imageInfo: '/image/info',
            imageExif: '/image/exif',
            imageView: '/image/view',
            imageMogr: '/image/mogr',
            watermark: '/image/watermark',
            md2html  : 'md2html',
        }
	}

	upload(file) {
        return this.postMultipart(this.OBJ.upload, {
        	file: file
        })
    }

    download(key) {
        return this.postRequest(this.OBJ.download, {
            key: key
        })
    }

    saveAsURL(key, name) {
        return this.postRequest(this.OBJ.saveAsURL, {
            key: key, 
            name: name, 
        })
    }

    stat(key) {
        return this.postRequest(this.OBJ.stat, {
        	key: key
        })
    }

    move(key) {
        return this.postRequest(this.OBJ.move, {
        	key: key
        })
    }

    copy(key) {
        return this.postRequest(this.OBJ.copy, {
        	key: key
        })
    }

    delete(key) {
        return this.postRequest(this.OBJ.delete, {
        	key: key
        })
    }

    list() {
        return this.postRequest(this.OBJ.list)
    }

    imageInfo(key) {
        return this.postRequest(this.OBJ.imageInfo, {
        	key: key
        })
    }

    imageExif(key) {
        return this.postRequest(this.OBJ.imageExif, {
        	key: key
        })
    }

    imageView(key, opt) {
        return this.postRequest(this.OBJ.imageView, {
            key: key, 
            opt: opt, 
        })
    }

    imageMogr(key, opt) {
        return this.postRequest(this.OBJ.imageMogr, {
            key: key, 
            opt: opt, 
        })
    }

    watermark(key, opt) {
        return this.postRequest(this.OBJ.watermark, {
            key: key, 
            opt: opt, 
        })
    }

    md2html(key, opt) {
        return this.postRequest(this.OBJ.md2html, {
            key: key, 
            opt: opt, 
        })
    }
}

Service.$inject = [
	'$http', 
	'$q', 
]

export default Service