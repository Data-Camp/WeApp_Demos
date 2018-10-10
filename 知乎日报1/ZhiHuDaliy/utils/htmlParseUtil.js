
/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

// Regular Expressions for parsing tags and attributes
var startTag = /^<(\w+)((?:\s+[\w\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
  endTag = /^<\/(\w+)[^>]*>/,
  attr = /([\w\-]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 4.01
var empty = makeMap( "area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed" );

// Block Elements - HTML 4.01
var block = makeMap( "address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul" );

// Inline Elements - HTML 4.01
var inline = makeMap( "a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var" );

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap( "colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr" );

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap( "checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected" );

// Special Elements (can contain anything)
var special = makeMap( "script,style" );

var HTMLParser = function( html, handler ) {
  var index, chars, match, stack = [], last = html;
  stack.last = function() {
    return this[ this.length - 1 ];
  };

  while( html ) {
    chars = true;

    // Make sure we're not in a script or style element
    if( !stack.last() || !special[ stack.last() ] ) {

      // Comment, DOCTYPE INCLUDED
      if( html.indexOf( "<!--" ) == 0 ) {
        index = html.indexOf( "-->" );

        if( index >= 0 ) {
          if( handler.comment )
            handler.comment( html.substring( 4, index ) );
          html = html.substring( index + 3 );
          chars = false;
        }
        //doctype
      } else if( html.indexOf( "<!" ) == 0 ) {
        index = html.indexOf( ">" );

        if( index >= 0 ) {
          if( handler.doctype )
            handler.doctype( html.substring( 2, index ) );
          html = html.substring( index + 1 );
          chars = false;
        }
        //script
      } else if( html.indexOf( "<script" ) == 0 ) {
        index = html.indexOf( "</script>" );
        if( index >= 0 ) {
          if( handler.script )
            handler.script( html.substring( 7, index ) );
          html = html.substring( index + 9 );
          chars = false;
        }
        //style
      } else if( html.indexOf( "<style>" ) == 0 ) {
        index = html.indexOf( "</style>" );
        if( index >= 0 ) {
          if( handler.style )
            handler.style( html.substring( 7, index ) );
          html = html.substring( index + 8 );
          chars = false;
        }
        // end tag
      } else if( html.indexOf( "</" ) == 0 ) {
        match = html.match( endTag );

        if( match ) {
          html = html.substring( match[ 0 ].length );
          match[ 0 ].replace( endTag, parseEndTag );
          chars = false;
        }
        // start tag
      } else if( html.indexOf( "<" ) == 0 ) {
        match = html.match( startTag );

        if( match ) {
          html = html.substring( match[ 0 ].length );
          match[ 0 ].replace( startTag, parseStartTag );
          chars = false;
        }
      }

      if( chars ) {
        index = html.indexOf( "<" );

        var text = index < 0 ? html : html.substring( 0, index );
        html = index < 0 ? "" : html.substring( index );

        if( handler.chars )
          handler.chars( text );
      }

    } else {
      html = html.replace( new RegExp( "(.*)<\/" + stack.last() + "[^>]*>" ), function( all, text ) {
        text = text.replace( /<!--(.*?)-->/g, "$1" )
          .replace( /<!\[CDATA\[(.*?)]]>/g, "$1" );

        if( handler.chars )
          handler.chars( text );
        return "";
      });

      parseEndTag( "", stack.last() );
    }

    if( html == last )
      throw "Parse Error: " + html;
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();

  function parseStartTag( tag, tagName, rest, unary ) {
    if( block[ tagName ] ) {
      while( stack.last() && inline[ stack.last() ] ) {
        parseEndTag( "", stack.last() );
      }
    }

    if( closeSelf[ tagName ] && stack.last() == tagName ) {
      parseEndTag( "", tagName );
    }

    unary = empty[ tagName ] || !!unary;

    if( !unary )
      stack.push( tagName );

    if( handler.start ) {
      var attrs = [];

      rest.replace( attr, function( match, name ) {
        var value = arguments[ 2 ] ? arguments[ 2 ] :
          arguments[ 3 ] ? arguments[ 3 ] :
            arguments[ 4 ] ? arguments[ 4 ] :
              fillAttrs[ name ] ? name : "";
        attrs[ name ] = value;//value.replace(/(^|[^\\])"/g, '$1\\\"') //";
        //attrs.push({
        //	name: name,
        //	value: value,
        //	escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
        //});
      });

      if( handler.start )
        handler.start( tagName, attrs, unary );
    }
  }

  function parseEndTag( tag, tagName ) {
    // If no tag name is provided, clean shop
    if( !tagName )
      var pos = 0;

    // Find the closest opened tag of the same type
    else
      for( var pos = stack.length - 1;pos >= 0;pos-- )
        if( stack[ pos ] == tagName )
          break;

    if( pos >= 0 ) {
      // Close all the open elements, up the stack
      for( var i = stack.length - 1;i >= pos;i-- )
        if( handler.end )
          handler.end( stack[ i ] );

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }
};

var HTMLtoXML = function( html ) {
  var results = "";

  HTMLParser( html, {
    start: function( tag, attrs, unary ) {
      results += "<" + tag;

      for( var i = 0;i < attrs.length;i++ )
        results += " " + attrs[ i ].name + '="' + attrs[ i ].escaped + '"';

      results += ( unary ? "/" : "" ) + ">";
    },
    end: function( tag ) {
      results += "</" + tag + ">";
    },
    chars: function( text ) {
      results += text;
    },
    comment: function( text ) {
      results += "<!--" + text + "-->";
    }
  });

  return results;
};

// this.HTMLtoDOM = function( html, doc ) {
// 	// There can be only one of these elements
// 	var one = makeMap( "html,head,body,title" );

// 	// Enforce a structure for the document
// 	var structure = {
// 		link: "head",
// 		base: "head"
// 	};

// 	if( !doc ) {
// 		if( typeof DOMDocument != "undefined" )
// 			doc = new DOMDocument();
// 		else if( typeof document != "undefined" && document.implementation && document.implementation.createDocument )
// 			doc = document.implementation.createDocument( "", "", null );
// 		else if( typeof ActiveX != "undefined" )
// 			doc = new ActiveXObject( "Msxml.DOMDocument" );

// 	} else
// 		doc = doc.ownerDocument ||
// 			doc.getOwnerDocument && doc.getOwnerDocument() ||
// 			doc;

// 	var elems = [],
// 		documentElement = doc.documentElement ||
// 			doc.getDocumentElement && doc.getDocumentElement();

// 	// If we're dealing with an empty document then we
// 	// need to pre-populate it with the HTML document structure
// 	if( !documentElement && doc.createElement ) ( function() {
// 		var html = doc.createElement( "html" );
// 		var head = doc.createElement( "head" );
// 		head.appendChild( doc.createElement( "title" ) );
// 		html.appendChild( head );
// 		html.appendChild( doc.createElement( "body" ) );
// 		doc.appendChild( html );
// 	})();

// 	// Find all the unique elements
// 	if( doc.getElementsByTagName )
// 		for( var i in one )
// 			one[ i ] = doc.getElementsByTagName( i )[ 0 ];

// 	// If we're working with a document, inject contents into
// 	// the body element
// 	var curParentNode = one.body;

// 	HTMLParser( html, {
// 		start: function( tagName, attrs, unary ) {
// 			// If it's a pre-built element, then we can ignore
// 			// its construction
// 			if( one[ tagName ] ) {
// 				curParentNode = one[ tagName ];
// 				return;
// 			}

// 			var elem = doc.createElement( tagName );

// 			for( var attr in attrs )
// 				elem.setAttribute( attrs[ attr ].name, attrs[ attr ].value );

// 			if( structure[ tagName ] && typeof one[ structure[ tagName ] ] != "boolean" )
// 				one[ structure[ tagName ] ].appendChild( elem );

// 			else if( curParentNode && curParentNode.appendChild )
// 				curParentNode.appendChild( elem );

// 			if( !unary ) {
// 				elems.push( elem );
// 				curParentNode = elem;
// 			}
// 		},
// 		end: function( tag ) {
// 			elems.length -= 1;

// 			// Init the new parentNode
// 			curParentNode = elems[ elems.length - 1 ];
// 		},
// 		chars: function( text ) {
// 			curParentNode.appendChild( doc.createTextNode( text ) );
// 		},
// 		comment: function( text ) {
// 			// create comment node
// 		}
// 	});

// 	return doc;
// };

function makeMap( str ) {
  var obj = {}, items = str.split( "," );
  for( var i = 0;i < items.length;i++ )
    obj[ items[ i ] ] = true;
  return obj;
}


/**

The MIT License

Copyright (c) 2008 Pickere Yee(pickerel@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
**/
var __HTML_EXTRACTOR_VERSION__ = "v0.0.1";
var __HTML_EXTRACTOR_DEBUG__ = true;
var html_extractor = function( html ) {
  this.parser = HTMLParser;
  this.html = html;
  this.reset();
}
String.prototype.jhe = function() { return new html_extractor( this ); }

//匹配指定标记内的内容，tag是个变长参数，返回结果为匹配内容，不包括最后一个匹配标签
String.prototype.jhe_im = function( query_params ) { return html_extractor_query( this, arguments ).im( html_extractor_query_callback( arguments ) ); }
//匹配指定标记内的内容，tag是个变长参数，返回结果为匹配内容，包括最后一个匹配标签
String.prototype.jhe_om = function( query_params ) { return html_extractor_query( this, arguments ).om( html_extractor_query_callback( arguments ) ); }
//匹配指定标记内的指定属性，tag是个变长参数，attr为要获取的属性的名称
String.prototype.jhe_ma = function( query_params ) {
  var arr = [];
  for( var i = 0;i < arguments.length - 1;i++ ) { arr.push( arguments[ i ] ); }
  return html_extractor_query( this, arr ).ma( arguments[ arguments.length - 1 ] );
}
//匹配指定标记内的指定内容，tag是个变长参数，返回结果为匹配内容，不包括任何html标签，只是文本。
String.prototype.jhe_mt = function( query_params ) { return html_extractor_query( this, arguments ).mt( html_extractor_query_callback( arguments ) ); }

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function( from, to ) {
  if (!this) return;
	var rest = this.slice(( to || from ) + 1 || this.length );
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply( this, rest );
};
Array.prototype.clear = function() {
  if (!this) return;
	this.length = 0;
};

/*允许参数argus：
1.标准的html标签，相当于执行tag()
2.^+标准的html标签，执行first_tag()
3.>+标准的html标签，执行next_tag()
4.@+属性表达式，相当于执行attr，例如@id=123，相当于执行attr("id", "123")
*/
function html_extractor_query( html, argus ) {
  var extractor = new html_extractor( html );
  for( var i = 0;i < argus.length;i++ ) {
    var argu = argus[ i ];
    if( typeof argu != 'string' ) continue;
    switch( argu.substring( 0, 1 ) ) {
      case '^':
        extractor.first_tag( argu.substring( 1 ) );
        break;
      case '>':
        extractor.next_tag( argu.substring( 1 ) );
        break;
      case '@':
        var exp = argu.substring( 1 );
        var pos = exp.indexOf( "=" );
        if( exp.substring( 0, 1 ) == "@" )
          extractor.attr( exp.substring( 1, pos ), new RegExp( exp.substring( pos + 1 ) ) );
        else
          extractor.attr( exp.substring( 0, pos ), exp.substring( pos + 1 ) );
        break;
      default:
        extractor.tag( argu );
        break;
    }
  }
  return extractor;
}
function html_extractor_query_callback( argus ) {
  var f = argus[ argus.length - 1 ];
  if( typeof f == 'function' )
    return f;
  return null;
}
//预设一个tag查询条件，指定的html文档的起始tag必须与该tag匹配
html_extractor.prototype.first_tag = function( tag, callback ) {
  this.tags.push( { tag: tag.toLowerCase(), first: true });
  if( callback != undefined && callback != null )
    this.callbacks.push( callback );
  return this;
}

//预设一个连续的tag查询条件，即该tag必须是上一个tag的子元素
html_extractor.prototype.next_tag = function( tag, callback ) {
  this.tags.push( { tag: tag.toLowerCase(), child: true });
  if( callback != undefined && callback != null )
    this.callbacks.push( callback );
  return this;
}
//预设一个tag查询条件，即预设tag将会是上一个预设tag的子、孙...元素，当tag=*时表示匹配任意元素
html_extractor.prototype.tag = function( tag, callback ) {
  if( tag != "*" ) this.tags.push( { tag: tag.toLowerCase() });
  if( callback != undefined && callback != null )
    this.callbacks.push( callback );
  return this;
}
html_extractor.prototype.reset = function() { this.tags = []; this.attrs = []; this.callbacks = []; }
//预设一个属性查询条件，该条件是针对上一个预设的tag的属性的
html_extractor.prototype.attr = function( name, value ) {
  if( this.tags.length == 0 ) this.tags.push( "*" );
  var len = this.tags.length - 1;
  if( this.attrs[ len ] == undefined ) this.attrs[ len ] = [];

  this.attrs[ len ].push( { name: name.toLowerCase(), value: value });
  return this;
}
//按预设条件匹配，只返回匹配结果的标签内的文本
html_extractor.prototype.match_text = function() {
  if( this.tags.length == 0 ) this.tags.push( "*" );
  return this._match( false, true );
}

//按预设条件匹配，只返回匹配结果的标签内的指定属性
html_extractor.prototype.match_attr = function( name ) {
  var ret = [];
  if( this.tags.length == 0 ) this.tags.push( "*" );
  this.match( false, function( idx, attrs, inner_html, inner_text ) { ret.push( attrs[ name ] ) });
  return ret;
}

html_extractor.prototype.im = function( callback ) { return this.match( true, callback ); }
html_extractor.prototype.ma = function( name ) { return this.match_attr( name ); }
html_extractor.prototype.om = function( callback ) { return this.match( false, callback ); }
html_extractor.prototype.mt = function( callback ) { return this.match_text(); }
html_extractor.prototype.match = function( inner, callback ) { return this._match( true, inner, callback ) };

/**
 * 执行匹配操作
 * @param {boolean} inner 匹配的结果是否要包含最后一个预设tag的标签内容。true:不要包含，只返回标签内内容即可。
 */
html_extractor.prototype._match = function( _html_type_result, inner, callback ) {
  if( this.tags.length == 0 ) this.tags.push( "*" );
  var self = this;
  var handler = function() {
    this._tag_index = 0;
    this._matched_tags = [];
    this._matched_tags_attrs = [];
    //标记预设的tag是否已经匹配
    this._matched = [];
    this._result = "";

    this._html_type_result = _html_type_result;
    //是否已经全匹配 
    this._all_matched = false;
    this._all_matched_index = -1;
    this._stop_parse = false;
    //记录上次匹配的位置
    this._prev_matched_index = -1;
    //tag匹配标记预设为否
    for( var i = 0;i < self.tags.length;i++ )this._matched[ i ] = false;
    this.result = [];
    this.inner = true;
    if( inner != undefined && inner != null ) {
      this.inner = inner;
    }

  };

  handler.prototype = {
    start: function( tag, attrs, unary ) {
      try {
        tag = tag.toLowerCase();
        if( this._tag_index == 0 && self.tags[ 0 ].first != undefined && self.tags[ 0 ].first && self.tags[ 0 ].tag != tag ) {//检查首匹配
          this._stop_parse = true;
        }
        if( this._stop_parse ) return;
        //处理索引
        this._tag_index++;
        if( this._all_matched ) {//已经全匹配，拼合匹配下的html内容
          if( this._html_type_result ) this._result += get_start_tag( tag, attrs );
          return;
        }
        //按预设的tag atrr条件循环匹配
        for( var i = 0;i < this._matched.length;i++ ) {
          if( !this._matched[ i ] ) {//指定的预设标签尚未匹配到，做匹配检查
            var pt = self.tags[ i ];
            if( ( pt == "*" || ( pt.tag == tag && ( pt.child == undefined || pt.child == false ) ) ||
              ( pt.tag == tag && pt.child && this._prev_matched_index == this._tag_index - 1 ) )
            ) {//tag条件符合
              this._matched[ i ] = true;

              if( self.attrs[ i ] != undefined ) {//检查attr条件
                for( var n = 0;n < self.attrs[ i ].length;n++ ) {
                  var attr = self.attrs[ i ][ n ];
                  if( attr == undefined ) {//找不到符合条件的属性定义
                    this._matched[ i ] = false;
                    break;
                  }
                  if( attr != undefined ) {
                    if( ( ( typeof attr.value ) == "string" && attrs[ attr.name ] != attr.value ) ||
                      ( ( typeof attr.value ) == "object" && !( attr.value ).test( attrs[ attr.name ] ) )
                    ) {//属性值不匹配
                      this._matched[ i ] = false;
                      break;
                    }
                  };
                }
              }
              if( this._matched[ i ] ) {//指定的预设标记匹配成功
                //todo callback
                //记录当前标记的处理索引
                this._matched_tags[ this._tag_index ] = i;
                this._matched_tags_attrs[ this._tag_index ] = attrs;
                this._prev_matched_index = this._tag_index;
                if( i == self.tags.length - 1 ) {//如果已经匹配到预设条件的最后一个，说明全匹配了。
                  this._all_matched = true;
                  this._all_matched_index++;

                  if( !this.inner ) if( this._html_type_result ) this._result += get_start_tag( tag, attrs );
                }

                return;
              }
            }
            //不匹配，中止往下检查
            if( !this._matched[ i ] ) {
              var tpt = pt;
              var idx = this._tag_index;
              var midx = i;
              while( tpt.child != undefined && tpt.child ) {//如果预制的是连续匹配，回退预制到连续的根
                idx--;
                midx--;
                if (this._matched_tags)
                  this._matched_tags.remove( idx );
                tpt = this._matched[ midx ];
                this._matched[ midx ] = false;
              }

              this._prev_matched_index = -1;
              break;
            }
          }
        }
      } finally {
        if( unary ) this.end( tag, unary );

      }
    },
    end: function( tag, unary ) {
      if( this._stop_parse ) return;
      tag = tag.toLowerCase();

      if( this._matched_tags[ this._tag_index ] != undefined ) {//当前处理的标签是已匹配的标签，该标签已经处理结束，将匹配标记为否

        if( this._all_matched ) {//如果是全匹配，说明现在是一个全匹配的结束

          if( !this.inner && !unary && this._html_type_result ) this._result += "</" + tag + ">";

          //全匹配结果置入匹配结果数组中
          if( callback != undefined && callback != null ) {
            var ret = callback( this._all_matched_index, this._matched_tags_attrs[ this._tag_index ], this._result );
            this.result.push( ret );
          }
          else
            this.result.push( this._result );

          this._result = "";
          this._prev_matched_index = -1;
          //全匹配置为否
          this._all_matched = false;

          //for( var i = 0; i < self.tags.length; i++)this._matched[i] = false;
          //this._matched_tags.clear();
          //this._matched_tags_attrs.clear();
        }
        this._matched[ this._matched_tags[ this._tag_index ] ] = false;
        if (this._matched_tags)
          this._matched_tags.remove( this._tag_index );
        if (this._matched_tags_attrs)
          this._matched_tags_attrs.remove( this._tag_index );
      }
      else if( this._all_matched ) {//全匹配后的处理
        if( this._html_type_result && !unary ) this._result += "</" + tag + ">";
      }


      this._tag_index--;

    },
    chars: function( s ) {
      if( this._stop_parse ) return;
      //已经全匹配，拼合匹配下的html内容
      if( this._all_matched ) {
        this._result += s;
      }
    },
    script: function( s ) {
      if( this._stop_parse ) return;
      if( this._all_matched ) {
        this._result += s;
      }
    },
    comment: function( s ) { }
  };

  var hd = new handler;
  this.parser( this.html, hd );
  //reset
  self.reset();
  return hd.result;
}
function get_start_tag( tag, attrs ) {
  var ret = "<" + tag;
  for( var key in attrs ) {
    var value = attrs[ key ];
    if( typeof value != 'string' ) continue;
    ret += " " + key + "=\"" + value + "\"";
  }

  ret += ">";
  return ret;
}

module.exports = html_extractor;