var items = ['item1', 'item2', 'item3', 'item4']
var pageObject = {
  data: {
    actionSheetHidden: true,
    actionSheetItems: items
  },
  actionSheetTap: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  }
}

for (var i = 0; i < items.length; ++i) {
  (function(itemName) {
    pageObject['bind' + itemName] = function(e) {
      console.log('click' + itemName, e)
    }
  })(items[i])
}

Page(pageObject)
