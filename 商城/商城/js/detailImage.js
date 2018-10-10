function wxAutoImageCal(e) {
    console.log(e);
    var originalWidth = e.detail.width;
    var originalHeight = e.detail.height;
    var windowWidth = 0;
    var windowHeight = 0;
    var autoWidth = 0;
    var autoHeight = 0;
    var results = {};
    wx.getSystemInfo({
      success: function(res) {
        // success
        var winWidth = res.windowWidth;
        var winHeight = res.windowHeight;
        if(originalWidth > winWidth){
            autoWidth = winWidth - 20;
            autoHeight = (autoWidth * originalHeight) / originalWidth;
            results.imageWidth = autoWidth + 'px';
            results.imageHeight = autoHeight + 'px';
            console.log(results.imageHeight,results.imageWidth);
        }
        else{
            results.imageWidth = originalWidth + 'px';
            results.imageHeight = originalHeight + 'px';
            console.log(results.imageHeight,results.imageWidth);
        }
      }
    })
    return results;
}
module.exports.wxAutoImageCal = wxAutoImageCal