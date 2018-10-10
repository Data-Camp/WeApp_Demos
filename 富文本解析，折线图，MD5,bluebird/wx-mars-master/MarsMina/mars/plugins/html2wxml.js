/**
 * Created by kevenfeng on 2016/10/12.
 */
// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("script,style");

var HTMLParser = function (html, handler) {
    var index, chars, match, stack = [], last = html;
    stack.last = function () {
        return this[this.length - 1];
    };

    while (html) {
        chars = true;

        // Make sure we're not in a script or style element
        if (!stack.last() || !special[stack.last()]) {

            // Comment
            if (html.indexOf("<!--") == 0) {
                index = html.indexOf("-->");

                if (index >= 0) {
                    if (handler.comment)
                        handler.comment(html.substring(4, index));
                    html = html.substring(index + 3);
                    chars = false;
                }

                // end tag
            } else if (html.indexOf("</") == 0) {
                match = html.match(endTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(endTag, parseEndTag);
                    chars = false;
                }

                // start tag
            } else if (html.indexOf("<") == 0) {
                match = html.match(startTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(startTag, parseStartTag);
                    chars = false;
                }
            }

            if (chars) {
                index = html.indexOf("<");

                var text = index < 0 ? html : html.substring(0, index);
                html = index < 0 ? "" : html.substring(index);
                text = text.replace(/&nbsp;/g, " "); //转义字符处理
                text = text.replace(/<br>/g, "<block></block>");
                if (handler.chars)
                    handler.chars(text);
            }

        } else {
            html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
                text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
                text = text.replace(/&nbsp;/g, " "); //转义字符处理
                if (handler.chars)
                    handler.chars(text);

                return "";
            });

            parseEndTag("", stack.last());
        }

        if (html == last)
            throw "Parse Error: " + html;
        last = html;
    }

    // Clean up any remaining tags
    parseEndTag();

    function parseStartTag(tag, tagName, rest, unary) {
        tagName = tagName.toLowerCase();

        if (block[tagName]) {
            while (stack.last() && inline[stack.last()]) {
                parseEndTag("", stack.last());
            }
        }

        if (closeSelf[tagName] && stack.last() == tagName) {
            parseEndTag("", tagName);
        }

        unary = empty[tagName] || !!unary;

        if (!unary)
            stack.push(tagName);

        if (handler.start) {
            var attrs = [];

            rest.replace(attr, function (match, name) {
                var value = arguments[2] ? arguments[2] :
                    arguments[3] ? arguments[3] :
                        arguments[4] ? arguments[4] :
                            fillAttrs[name] ? name : "";

                attrs.push({
                    name: name,
                    value: value,
                    escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
                });
            });

            if (handler.start)
                handler.start(tagName, attrs, unary);
        }
    }

    function parseEndTag(tag, tagName) {
        // If no tag name is provided, clean shop
        if (!tagName)
            var pos = 0;

        // Find the closest opened tag of the same type
        else
            for (var pos = stack.length - 1; pos >= 0; pos--)
                if (stack[pos] == tagName)
                    break;

        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--)
                if (handler.end)
                    handler.end(stack[i]);

            // Remove the open elements from the stack
            stack.length = pos;
        }
    }
};

function makeMap(str) {
    var obj = {}, items = str.split(",");
    for (var i = 0; i < items.length; i++)
        obj[items[i]] = true;
    return obj;
}
var global = {};
var debug = function () { };

function q(v) {
    return '"' + v + '"';
}

function removeDOCTYPE(html) {
    return html
        .replace(/<\?xml.*\?>\n/, '')
        .replace(/<!doctype.*\>\n/, '')
        .replace(/<!DOCTYPE.*\>\n/, '');
}
global.html2json = function html2json(html) {
    html = removeDOCTYPE(html);
    var bufArray = [];
    var results = {
        node: 'root',
        child: [],
    };
    HTMLParser(html, {
        start: function (tag, attrs, unary) {
            debug(tag, attrs, unary);
            // node for this element
            var node = {
                node: 'element',
                tag: tag,
            };
            if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                    var name = attr.name;
                    var value = attr.value;

                    // has multi attibutes
                    // make it array of attribute
                    if (value.match(/ /)) {
                        value = value.split(' ');
                    }

                    // if attr already exists
                    // merge it
                    if (pre[name]) {
                        if (Array.isArray(pre[name])) {
                            // already array, push to last
                            pre[name].push(value);
                        } else {
                            // single value, make it array
                            pre[name] = [pre[name], value];
                        }
                    } else {
                        // not exist, put it
                        pre[name] = value;
                    }

                    return pre;
                }, {});
            }
            if (unary) {
                // if this tag dosen't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;
                if (parent.child === undefined) {
                    parent.child = [];
                }
                parent.child.push(node);
            } else {
                bufArray.unshift(node);
            }
        },
        end: function (tag) {
            debug(tag);
            // merge into parent tag
            var node = bufArray.shift();
            if (node.tag !== tag) console.error('invalid state: mismatch end tag');

            if (bufArray.length === 0) {
                results.child.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.child === undefined) {
                    parent.child = [];
                }
                parent.child.push(node);
            }
        },
        chars: function (text) {
            debug(text);
            var node = {
                node: 'text',
                text: text,
            };
            if (bufArray.length === 0) {
                results.child.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.child === undefined) {
                    parent.child = [];
                }
                parent.child.push(node);
            }
        },
        comment: function (text) {
            debug(text);
            var node = {
                node: 'comment',
                text: text,
            };
            var parent = bufArray[0];
            if (parent.child === undefined) {
                parent.child = [];
            }
            parent.child.push(node);
        },
    });
    return results;
};

global.json2html = function json2html(json) {
    // Empty Elements - HTML 4.01
    var empty = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'embed'];

    var child = '';
    if (json.child) {
        child = json.child.map(function (c) {
            return json2html(c);
        }).join('');
    }

    //console.log(json)

    var attr = '';
    if (json.attr) {
        attr = Object.keys(json.attr).map(function (key) {
            var value = json.attr[key];
            if (Array.isArray(value)) value = value.join(' ');
            return key + '=' + q(value);
        }).join(' ');
        if (attr !== '') attr = ' ' + attr;
    }

    if (json.node === 'element') {
        var tag = json.tag;
        if (empty.indexOf(tag) > -1) {
            // empty element
            return '<' + json.tag + attr + '/>';
        }

        // non empty element
        var open = '<' + json.tag + attr + '>';
        var close = '</' + json.tag + '>';
        return open + child + close;
    }

    if (json.node === 'text') {
        return json.text;
    }

    if (json.node === 'comment') {
        return '<!--' + json.text + '-->';
    }

    if (json.node === 'root') {
        return child;
    }
};

var html2wxwebview = function (html) {
    var htmlNode = global.html2json(html);
    //console.log("htmlNode:",htmlNode);
    htmlNode = parseHtmlNode(htmlNode);
    //console.log("parseHtmlNode:",htmlNode);
    htmlNode = arrangeNode(htmlNode);
    //console.log("arrangeNode:",htmlNode);
    return htmlNode;
}
//整理节点
var arrangeNode = function (htmlNode) {
    var arrangeArray = [];
    var nodeObj = [];
    for (var i = 0, j = htmlNode.length; i < j; i++) {
        if (i == 0) {
            if (htmlNode[i].type == "view") {
                continue;
            }
            arrangeArray.push(htmlNode[i]);
        } else {
            if (htmlNode[i].type == "view") {
                if (arrangeArray.length > 0) {
                    var obj = {
                        type: "view",
                        child: arrangeArray
                    }
                    nodeObj.push(obj);
                }
                arrangeArray = [];
            } else if (htmlNode[i].type == "img") {
                if (arrangeArray.length > 0) {
                    var obj = {
                        type: "view",
                        child: arrangeArray
                    }
                    nodeObj.push(obj);
                }

                var obj = {
                    type: "img",
                    attr: htmlNode[i].attr
                }
                nodeObj.push(obj);

                arrangeArray = [];
            } else {
                arrangeArray.push(htmlNode[i]);
                if (i == (j - 1)) {
                    var obj = {
                        type: "view",
                        child: arrangeArray
                    }
                    nodeObj.push(obj);
                }
            }
        }
    }

    return nodeObj;
}

//将html节点转成小程序可用的接口
var parseHtmlNode = function (htmlNode) {
    var tagsArray = [];
    var parsetags = function (node) {
        var tag = {};
        if (node.node == "root") {

        } else if (node.node == "element") {
            switch (node.tag) {
                case "a":
                    tag = {
                        type: "a",
                        text: node.child[0].text,
                    }
                    break;
                case "img":
                    tag = {
                        type: "img",
                        text: node.text,
                    }
                    break;
                case "p":
                    tag = {
                        type: "view",
                        text: node.text,
                    }
                    break;
                case "div":
                    tag = {
                        type: "view",
                        text: node.text,
                    }
                    break;
            }
        } else if (node.node == "text") {
            tag = {
                type: "text",
                text: node.text,
            }
        }

        if (node.attr) {
            tag.attr = node.attr;
        }

        if (Object.keys(tag).length != 0) {
            // if(tag.text||node.tag=="img"){
            tagsArray.push(tag);
            // }
        }

        if (node.tag == "a") {//如果是a标签就不去解析他的child
            return;
        }

        var child = node.child;

        if (child) {
            for (var val in child) {
                parsetags(child[val]);
            }
        }
    }

    parsetags(htmlNode);
    return tagsArray;
}

module.exports = {
    html2json: html2wxwebview
}

