var HtmlParser = require( 'htmlParseUtil.js' );

String.prototype.trim = function() {
  return this.replace( /(^\s*)|(\s*$)/g, '' );
}

String.prototype.isEmpty = function() {
  return this.trim() == '';
}

function formatTime( date ) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [ year, month, day ].map( formatNumber ).join( '/' ) + ' ' + [ hour, minute, second ].map( formatNumber ).join( ':' )
}

function formatNumber( n ) {
  n = n.toString()
  return n[ 1 ] ? n : '0' + n
}

/**
 * 获取当前日期对象
 * @returns {object}
 */
function getCurrentData() {
  var date = new Date();
  return {
    date: new Date(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay()
  };
}

/**
 * 快捷方法 获取HtmlParser对象
 * @param {string} html html文本
 * @return {object} HtmlParser
 */
function $( html ) {
  return new HtmlParser( html );
}

/**
 * 解析story对象的body部分
 * @param {string} html body的html文本
 * @param {boolean} isDecode 是否需要unicode解析
 * @return {object} 解析后的对象
 */
function parseStory( html, isDecode ) {
  var questionArr = $( html ).tag( 'div' ).attr( 'class', 'question' ).match();
  var stories = [];
  var $story;
  if( questionArr ) {
    for( var i = 0, len = questionArr.length;i < len;i++ ) {
      $story = $( questionArr[ i ] );
      var mavatar=getArrayContent( getArrayContent( $story.tag( 'div' ).attr( 'class', 'meta' ).match() ).jhe_ma( 'img', 'src' ) );
      mavatar=mavatar.replace("pic1","pic3");
      mavatar=mavatar.replace("pic2","pic3");
      stories.push( {
        title: getArrayContent( $story.tag( 'h2' ).attr( 'class', 'question-title' ).match() ),
        avatar: mavatar,
        author: getArrayContent( $story.tag( 'span' ).attr( 'class', 'author' ).match() ),
        bio: getArrayContent( $story.tag( 'span' ).attr( 'class', 'bio' ).match() ),
        content: parseStoryContent( $story, isDecode ),
        more: getArrayContent( getArrayContent( $( html ).tag( 'div' ).attr( 'class', 'view-more' ).match() ).jhe_ma( 'a', 'href' ) )
      });
    }
  }
  return stories;
}

/**
 * 解析文章内容
 * @param {string} $story htmlparser对象
 * @param {boolean} isDecode 是否需要unicode解析
 * @returb {object} 文章内容对象
 */
function parseStoryContent( $story, isDecode ) {
  var content = [];
  var ps = $story.tag( 'p' ).match();
  var p, strong, img, blockquote, em;
  if( ps ) {
    for( var i = 0, len = ps.length;i < len;i++ ) {
      p = transferSign(ps[ i ]); //获取<p>的内容 ,并将特殊符号转义
      if( !p || p.isEmpty() )
        continue;

      img = getArrayContent(( p.jhe_ma( 'img', 'src' ) ) );
      strong = getArrayContent( p.jhe_om( 'strong' ) );
      em = getArrayContent( p.jhe_om( 'em' ) );
      blockquote = getArrayContent( p.jhe_om( 'blockquote' ) );

      if( !img.isEmpty() ) { //获取图片
        img=img.replace("pic1","pic3");
        img=img.replace("pic2","pic3");
        content.push( { type: 'img', value: img });
      }
      else if( isOnly( p, strong ) ) { //获取加粗段落<p><strong>...</strong></p>
        strong = decodeHtml( strong, isDecode );
        if( !strong.isEmpty() )
          content.push( { type: 'pstrong', value: strong });
      }
      else if( isOnly( p, em ) ) { //获取强调段落 <p><em>...</em></p>
        em = decodeHtml( em, isDecode );
        if( !em.isEmpty() )
          content.push( { type: 'pem', value: em });
      }
      else if( isOnly( p, blockquote ) ) { //获取引用块 <p><blockquote>...</blockquote></p>
        blockquote = decodeHtml( blockquote, isDecode );
        if( !blockquote.isEmpty() )
          content.push( { type: 'blockquote', value: blockquote });
      }
      else { //其他类型 归类为普通段落 ....太累了 不想解析了T_T
        p = decodeHtml( p, isDecode );
        if( !p.isEmpty() )
          content.push( { type: 'p', value: p });
      }
    }
  }
  return content;
}

/**
 * 取出多余或者难以解析的html并且替换转义符号
 */
function decodeHtml( value, isDecode ) {
  if( !value ) return '';
  value = value.replace( /<[^>]+>/g, '' )
    .replace( /&nbsp;/g, ' ' )
    .replace( /&ldquo;/g, '"' )
    .replace( /&rdquo;/g, '"' ).replace( /&middot;/g, '·' );
  if( isDecode )
    return decodeUnicode( value.replace( /&#/g, '\\u' ) );
  return value;

}

/**
 * 解析段落的unicode字符，主题日报中的内容又很多是编码过的
 */
function decodeUnicode( str ) {
  var ret = '';
  var splits = str.split( ';' );
  for( let i = 0;i < splits.length;i++ ) {
    ret += spliteDecode( splits[ i ] );
  }
  return ret;
};

/**
 * 解析单个unidecode字符
 */
function spliteDecode( value ) {
  var target = value.match( /\\u\d+/g );
  if( target && target.length > 0 ) { //解析类似  "7.1 \u20998" 参杂其他字符
    target = target[ 0 ];
    var temp = value.replace( target, '{{@}}' );
    target = target.replace( '\\u', '' );
    target = String.fromCharCode( parseInt( target ) );
    return temp.replace( "{{@}}", target );
  } else {
    // value = value.replace( '\\u', '' );
    // return String.fromCharCode( parseInt( value, '10' ) )
    return value;
  }
}

/**
 * 获取数组中的内容（一般为第一个元素）
 * @param {array} arr 内容数组
 * @return {string} 内容
 */
function getArrayContent( arr ) {
  if( !arr || arr.length == 0 ) return '';
  return arr[ 0 ];
}

function isOnly( src, target ) {
  return src.trim() == target;
}

/**
 * 判断目标是否是函数
 * @param {mixed} val
 * @returns {boolean}
 */
function isFunction( val ) {
  return typeof val === 'function';
}

/**
 * 修正图片url，将pic1和pic2改为pic4
 * @param data
 * @returns {*}
 */
function correctData(data){
  if (("top_stories" in data) ){
    var top_stories=data.top_stories;
    for(var i = 0;i < top_stories.length; i++) {
      top_stories[i].image = top_stories[i].image.replace("pic1", "pic4");
      top_stories[i].image = top_stories[i].image.replace("pic2", "pic4");
    }
    data.top_stories=top_stories;
  }

  var stories=data.stories;
  for(var i = 0;i < stories.length; i++) {
    if (("images" in stories[i]) ){
      var s=stories[i].images[0];
      s=s.replace("pic1", "pic4");
      s=s.replace("pic2", "pic4");
      stories[i].images[0] =s;
    }
  }

  data.stories=stories;
  return data;
}

/**
 * 将转义字符转为实体
 * @param data
 * @returns {*}
 */
function transferSign(data){
  data=data.replace(/&ndash;/g,"–");
  data=data.replace(/&mdash;/g,"—");
  data=data.replace(/&hellip;/g,"…");
  data=data.replace(/&bull;/g,"•");
  data=data.replace(/&rsquo;/g,"’");
  data=data.replace(/&ndash;/g,"–");
  return data;
}

module.exports = {
  formatTime: formatTime,
  getCurrentData: getCurrentData,
  isFunction: isFunction,
  parseStory: parseStory,
  correctData:correctData,
  transferSign:transferSign
}
