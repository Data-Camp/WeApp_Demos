class taba{
    constructor(){
        this.restrict   = 'E'
        this.template   = '<a ng-transclude></a>'
        this.replace    = true
        this.transclude = true
    }

    controller() {
        var items = []
        this.gotOpened = function(selectedItem) {
            angular.forEach(items, function(item) {
                if (selectedItem != item) {
                    item.active = false
                    item.selector = { }
                }
            })
            // selectedItem.active = true
        }
        this.addItem = function(item) {
            items.push(item)
        }
    }
}

export default taba