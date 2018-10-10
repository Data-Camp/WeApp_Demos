
var hexcase = 0; var b64pad = ""; var chrsz = 8;

var MD5 = function () { };

MD5.hex_md5 = function (s) {
  return this.binl2hex(this.core_md5(this.str2binl(s), s.length * chrsz));
}

MD5.b64_md5 = function (s) {
  return this.binl2b64(this.core_md5(this.str2binl(s), s.length * chrsz));
}

MD5.hex_hmac_md5 = function (key, data) {
  return this.binl2hex(this.core_hmac_md5(key, data));
}

MD5.b64_hmac_md5 = function (key, data) {
  return this.binl2b64(this.core_hmac_md5(key, data));
}

MD5.calcMD5 = function (s) {
  return this.binl2hex(this.core_md5(str2binl(s), s.length * chrsz));
}

MD5.md5_vm_test = function () {
  return this.hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

MD5.core_md5 = function (x, len) {

  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = this.safe_add(a, olda);
    b = this.safe_add(b, oldb);
    c = this.safe_add(c, oldc);
    d = this.safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

MD5.md5_cmn = function (q, a, b, x, s, t) {
  return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
}

MD5.md5_ff = function (a, b, c, d, x, s, t) {
  return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

MD5.md5_gg = function (a, b, c, d, x, s, t) {
  return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

MD5.md5_hh = function (a, b, c, d, x, s, t) {
  return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

MD5.md5_ii = function (a, b, c, d, x, s, t) {
  return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

MD5.core_hmac_md5 = function (key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = this.core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = this.core_md5(ipad.concat(this.str2binl(data)), 512 + data.length * chrsz);
  return this.core_md5(opad.concat(hash), 512 + 128);
}

MD5.safe_add = function (x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

MD5.bit_rol = function (num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

MD5.str2binl = function (str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
  return bin;
}

MD5.binl2hex = function (binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
      hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
  }
  return str;
}

MD5.binl2b64 = function (binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
      | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
      | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
    }
  }
  return str;
}

module.exports = MD5;