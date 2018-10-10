
var index_data = require('../data/index_data.js');
var course_data = require("../data/course_data.js");

/*index.wxml*/
/*获取bannerArr*/
function getBanner(){
    return index_data.bannerSrc.banner;
}
/*获取navArr */
function getNav(){
    return index_data.navSrc.nav;
}
/*获取adArr */
function getAd(){
    return index_data.adSrc.ad;
}
/*获取courseArr*/
function getCourse(){
    return index_data.courseSrc.course_grp;
}

/*course.wxml*/
/*获取courses*/
function getCourses(){
    return course_data.courseItem.courses;
}


module.exports.getBanner = getBanner;
module.exports.getNav = getNav;
module.exports.getAd = getAd;
module.exports.getCourse = getCourse;
module.exports.getCourses = getCourses;





