

const URI = 'http://mobi.111.com.cn/ApiControl';
const URI2 = 'http://mobi.fangkuaiyi.com/ApiControl';
const URI3 = 'http://mobi.fangkuaiyi.com/ApiControl?method=cart.shoppingcart&sign=ae0fd9b8b9942c0b1c53863ee476d3e9&timestamp=20161202230515&os=iphone&venderId=2011102716210000&signMethod=md5&format=json&type=mobile&channelName=App%20Store&cityName=%25E5%258C%2597%25E4%25BA%25AC%25E5%25B8%2582&countyName=%25E5%25A4%25A7%25E5%2585%25B4%25E5%258C%25BA&encryptversion=2&flag=4&idfa=C82036FF-F841-4E84-940F-E672A131F2C4&ids=971744%2C50092422%2C10959408&isAllProduct=true&province=2&provinceName=%25E5%258C%2597%25E4%25BA%25AC%25E5%25B8%2582&shopcartdata=%5B%7B%22id%22%3A971744%2C%22saletype%22%3A0%2C%22venderid%22%3A%22%22%2C%22moneyback%22%3A%220.0%22%2C%22adddate%22%3A%22%22%2C%22itemtype%22%3A1%2C%22promotionid%22%3A%22%22%2C%22weight%22%3A%22%22%2C%22productno%22%3A%22%22%2C%22originalprice%22%3A%22%22%2C%22itemid%22%3A971744%2C%22bigcatalogid%22%3A%22%22%2C%22materialtype%22%3A%22ZSP%22%2C%22status%22%3A0%2C%22productcount%22%3A1%7D%2C%7B%22id%22%3A50092422%2C%22saletype%22%3A0%2C%22venderid%22%3A%22%22%2C%22moneyback%22%3A%220.0%22%2C%22adddate%22%3A%22%22%2C%22itemtype%22%3A1%2C%22promotionid%22%3A%22%22%2C%22weight%22%3A%22%22%2C%22productno%22%3A%22%22%2C%22originalprice%22%3A%22%22%2C%22itemid%22%3A50092422%2C%22bigcatalogid%22%3A%22%22%2C%22materialtype%22%3A%22ZSP%22%2C%22status%22%3A0%2C%22productcount%22%3A1%7D%2C%7B%22id%22%3A10959408%2C%22saletype%22%3A0%2C%22venderid%22%3A%22%22%2C%22moneyback%22%3A%220.0%22%2C%22adddate%22%3A%22%22%2C%22itemtype%22%3A1%2C%22promotionid%22%3A%22%22%2C%22weight%22%3A%22%22%2C%22productno%22%3A%22%22%2C%22originalprice%22%3A%22%22%2C%22itemid%22%3A10959408%2C%22bigcatalogid%22%3A%22%22%2C%22materialtype%22%3A%22ZSP%22%2C%22status%22%3A0%2C%22productcount%22%3A1%7D%5D&token=&versionCode=502&versionName=4.9.7';

const params = {
  sign: '85149ecd39057ea933d4c3d1b0266535',
  timestamp: '20161125221959',
  os: 'iphone',
  venderId: '2011102716210000',
  method: 'get.homepage.layer.model',
  signMethod: 'md5',
  format: 'json',
  type: 'mobile',
  platId: '2',
  area: '0',
  province: '1',
  versionName: '4.9.1',
  idfa: '59F893F4-557B-4E44-AB8F-122519FBDB22',
  channelName: 'App%20Store',
  homepageversion: '4',
  encryptversion: '2',
  versionCode: '495'
};

const params2 = {
  method: 'products.category.getcategory.news',
  sign: '71088fa09625c1452e547e586dfb92b0',
  timestamp: '20161202225803',
  os: 'iphone',
  venderId: '2011102716210000',
  signMethod: 'md5',
  format: 'json',
  type: 'mobile',
  area: 0,
  categorytype: 1,
  categoryversion: 2,
  channelName: 'App%20Store',
  encryptversion: 2,
  fatherid: -1,
  idfa: 'C82036FF-F841-4E84-940F-E672A131F2C4',
  searchtype: 1,
  versionCode: 502,
  versionName: '4.9.7'
};

const params3 = {

  method: 'products.category.getsecondcategory.news',
  sign: '71088fa09625c1452e547e586dfb92b0',
  timestamp: '20161202225803',
  os: 'iphone',
  venderId: '2011102716210000',
  signMethod: 'md5',
  format: 'json',
  type: 'mobile',
  area: 0,
  categorytype: 2,
  categoryversion: 2,
  channelName: 'App%20Store',
  encryptversion: 2,
  fatherid: '1000845',
  idfa: 'C82036FF-F841-4E84-940F-E672A131F2C4',
  searchtype: 2,
  versionCode: 502,
  versionName: '4.9.7'
};

function fetchHomeData() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URI,
      data: params,
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    });
  });
}

function fetchFirstCategory() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URI,
      data: params2,
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    });
  });
}

function fetchSecondCategory(id = 1000000) {
  let param = params3;
  param.fatherid = id;
  return new Promise((resolve, reject) => {
    wx.request({
      url: URI,
      data: param,
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    });
  });
}

function fetchCartData() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URI3,
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    });
  });
}


module.exports = { fetchHomeData, fetchFirstCategory, fetchSecondCategory, fetchCartData };
