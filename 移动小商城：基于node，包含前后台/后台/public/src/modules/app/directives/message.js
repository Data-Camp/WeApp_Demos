class message{
    constructor(){
		this.restrict = 'E'
		this.template = `<div class="prompt-message">
							<div class="prompt-icon">empty</div>
							<div class="prompt-text">{{ text || '空空如也'}}</div>
							<div class="prompt-button" ng-if="show" ng-click="fn()">刷新</div>
						</div>`
		this.replace  = true
		this.scope = {
			text: '@',
			fn: '&',
		}
    }

    link(scope, element, attrs, controller) {
    	scope.show = attrs.fn && angular.isFunction(scope.fn)
    }
}

export default message