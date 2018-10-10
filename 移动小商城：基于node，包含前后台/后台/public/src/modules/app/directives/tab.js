/* 封装一个指令tab */
class tab{
    constructor(){
        this.restrict   = 'AE'
        this.require    = '^?tabset'
        this.scope      = { active: '=?' }
        this.template   = '<li ng-class="selector" ng-click="show()" ng-transclude></li>'
        this.replace    = true
        this.transclude = true
    }

    link(scope, element, attrs, tabsetController) {
        var arr = ['red', 'green', 'purple', 'blue', 'yellow', 'navy'],
            l   = arr.length

        scope.selector = {}
        tabsetController.addItem(scope)
        
        scope.$watch('active', function(active) {
            if (active) {
                tabsetController.gotOpened(scope)
            }
        })

        scope.show = function() {
            scope.active = !scope.active
            tabsetController.gotOpened(scope)
            scope.selector.active = scope.active
            if (scope.active) {
                scope.selector[arr[Math.floor((Math.random()*l))]] = scope.active
            } else {
                scope.selector = {}
            }
        }
        
    }
}

export default tab