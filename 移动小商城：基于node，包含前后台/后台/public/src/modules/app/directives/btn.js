import btnHtml from 'ngtemplate!html!../../common/tpl/btn.html'

class btn{
    constructor(){
        this.restrict    = 'E'
        this.templateUrl = btnHtml
        this.replace     = true
        this.transclude  = true
        this.scope = { 
        	title: '@',
            btnClass: '@',
        	btnHref: '@',
        }
    }

    link(scope, element, attrs, controller) {

    }
}

export default btn