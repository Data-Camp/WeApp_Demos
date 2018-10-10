/*
 * angular-image-lazyload - v0.0.1 - 2015-10-14
 * https://github.com/VanMess/angular-image-lazyload
 * Copyright (c) 2014 Van (http://vanmess.github.io/)
 */
 !(function(factory) {
   if (typeof define === 'function' && define.amd) {
        // AMD
        define(['angular'], factory);
    } else {
        // Global Variables
        factory(window.angular);
    }
})(function(ng) {
        'use strict';

var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),
    hasOwn = ({}).hasOwnProperty;
for (var i in {
    toString: 1
}) {
    DONT_ENUM = false;
}
Object.keys = Object.keys || (function(obj) { //ecma262v5 15.2.3.14
    return function(obj) {
        var result = [],
            key;
        for (key in obj) {
            if (hasOwn.call(obj, key)) {
                result.push(key);
            }
        }
        if (DONT_ENUM && obj) {
            for (var i = 0; i < DONT_ENUM.length; i++) {
                key = DONT_ENUM[i++];
                if (hasOwn.call(obj, key)) {
                    result.push(key);
                }
            }
        }
        return result;
    };
})();

if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp

angular.module('vgSrc', []);

/*
 *  The provider of this module, just for setting default config.
 */
var

//  default setting
    defaults = {
        debug: false,
        //  place image content when it begin to load real image resource.
        loading: 'data:image/gif;base64,R0lGODlh3ACHAPf/AM/o/HW++Pj8/9bs/dLq/cLi/Duj9Mbk/N/w/b3g+/X6/u72/jag9Nvu/S2c9Mzm/L7g++r1/pzQ+kOm9bre+0eo9Uyq9VCs9oLE+JDK+bbc+3nA+ECl9ebz/jqi9KDS+kKm9Tih9K3Y+6zY+z+k9bLb+2a292C09jSf9Mjl/FSu9nK894nH+ajW+sTj/JPM+X7C+IbG+HS992q492K194vI+Viw9m2696bV+qrX+orI+WS290ao9V2y9uf0/bTc+7je+5fO+aLT+iiZ84DD+DKe9OLx/ZLM+bDa+4TF+KTU+my691av9l6z9i+d9Fqx9nC890qq9Wi49+Py/Z7R+nzB+JbO+cDh/OLy/ZrP+o7K+ev2/lGt9k+s9bne+7jd+5vQ+ePy/iqa83K8+Pj7/8Tk/Fuy9pjO+trt/XzC+CaZ85LL+Y3J+b/h+9br/UWn9Vaw9iyb9Ge391Ku9pzQ+Tmi9IXG+C2c89Lp/VCs9eDw/tHq/azX+lSu9VKt9Uyq9nd3fba2uoCAhpKSl/b29sDAwqSkqNLS1OTk5e3t7puboP3+/9nt/a2tsfP5/t3v/eHx/d7v/dvb3ImJjuf0/uXz/tTr/eTy/uz2/uDw/f7//8rm/P7+/9Xr/e/4/vL5/vD4/vv9//f7//b7/9Dp/On1/vH4/vr9/9zu/Xi/+Pb7/k6r9Ump9ZbN+fz+/9jt/cnJy////8Hi/NHp/e73/rvf+3C799zv/cvm/O32/vn8/zGe9Mzn/Pz9/8nm/On0/kGl9Wu597Pb+9fs/aPU+tHp/PH5/p/S+vf7/uDx/eXy/q/Z+/P6/l+09tPq/T2j9c3n/OHw/dDp/fb6/srl/Cyb82O19+Lx/jGd9NTr/On1/dXr/EGm9ebz/Z7R+W+79/T5/tTq/JnP+dXs/d/v/t3v/ni/93rA+Dqh9GCz90uq9Z/S+We496jV+rzf/FKu9U6r9uz1/uj1/vr8/vv8/+z3/tDo/NDo/dnu/ff8/6TT+mO291iv9oXF+H7B+P///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NUE3MjNERDI5RkExMUU1QjcyQkJBODIwMkYzNDk3NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NUE3MjNERTI5RkExMUU1QjcyQkJBODIwMkYzNDk3NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU1QTcyM0RCMjlGQTExRTVCNzJCQkE4MjAyRjM0OTc0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1QTcyM0RDMjlGQTExRTVCNzJCQkE4MjAyRjM0OTc0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMy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',

        // element would applied this class when it is loading.
        loadingCls: '',

        // element would applied this class when it is load success.
        loadedCls: '',

        //  place image content when image resource fail to load.
        error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAACHCAYAAAB9Eze1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRENGQkY4MjI5RkExMUU1QkI5MDk4MDJGNDM0OEYxNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRENGQkY4MzI5RkExMUU1QkI5MDk4MDJGNDM0OEYxNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVEQ0ZCRjgwMjlGQTExRTVCQjkwOTgwMkY0MzQ4RjE0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVEQ0ZCRjgxMjlGQTExRTVCQjkwOTgwMkY0MzQ4RjE0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XsvVEAAACbdJREFUeNrsnVtsHFcZ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',

        // element would applied this class when it faild to load.
        errorCls: '',

        //  place image content when element's "src" attribute is empty(null,undefine).
        empty: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAYCAMAAAAGTsm6AAAAMFBMVEXy8vL6+vr+/v7+/v7+/v7v7+/+/v7+/v7+/v7+/v7+/v729vb+/v4AAADt7e3+/v673auIAAAADnRSTlPXrYhVZuwimTMRRMJ3AKjyf0QAAAH3SURBVHjaxdbZkqowGEXhzMM/ZL//2x6IEYh0Cd1addaFUhbJZyKKRv9TZ1iSHirpU6Gme3BB888h3kXwj8PLePZCc0F0lNn1Z0Irl3AQYVhZYnVYY/Zj+Nxze/Aa64ghYyRfrHieZ4Gz398qRV6KiNyL24AsS06e/RGuKqBKpJrWI31NIDo1Tsrt+foR9tfwLresBLcerYvplUu4oMlamGH6BWwXjREZIMGIruBq9jP/Co8pmLmsc9IC1ao6TXaCM0xfttUZnqO3MAkVgjwGaofXklDPQGgUaMA1Q0zW0kx9gQ0fK29hTUQCzuwqzA4TzslzxeJWtbszTPd/uTweNQ4C2eFiZc0hCoP7cQ6HqzpZwPoZbkj34RpZHmRlpAHveeT5+upwChlNpKFZKTsM6CU8Rxz6KvrGT59MRjjDDDRXlnNdQ6xHWLbSDZg4yxa7+UuOeoZTDrU22OUx+H2rCw7RHRiRt8A6KVbP8INxETJ9xgRDI3MPPk48wamBfoZJimqYr2rBtlv82YqrAesGU647nIHoyvxWI/yH8O62tMOCdvw6iQHsESag7vAHW+3buJ9LB0qE3eAe5XAcEZH1Cyv2jO52auSf9+OpMSID6RtwALiOLbdY4/DuH0jq1/gnWx3HgXTnnH2dE20M0F/DQvrlClU99Q/TJ4uko/HGBAAAAABJRU5ErkJggg==',

        // element would applied this class when src attribute is empty(null,undefine).
        emptyCls: '',

        // event occurs when it start to load something.
        'onBegin': ng.noop,

        // event occurs when it fail load something.
        'onError': ng.noop,

        // event occurs when it finish to load something.
        'onLoad': ng.noop
    },

    provider = function() {
        var moduleConfig = ng.copy(defaults),
            result = {
                $set: _setConfig,
                $get: function() {
                    return moduleConfig;
                }
            };

        return result;

        function _setConfig(cfg) {

            if (!ng.isDefined(cfg)) return;

            ng.forEach(Object.keys(moduleConfig), function(key) {
                if (cfg.hasOwnProperty(key) && key !== 'debug') {
                    moduleConfig[key] = cfg[key] + '';
                }
            });

            // init debug model
            if (cfg.hasOwnProperty('debug')) {
                moduleConfig.debug = !!cfg.debug;
            }

            // init events
            var events = ['onBegin', 'onError', 'onLoad'],
                tmp;
            ng.forEach(events, function(e) {
                tmp = ng.isFunction(cfg[e]) ? cfg[e] : ng.noop;
                moduleConfig[e] = (function(_old) {
                    return function($scope, $e) {
                        _old($e);
                    };
                })(tmp);
            });
        }
    };

angular.module('vgSrc').provider('vgSrcConfig', [provider]);

/*
 *  An angular directive for image loading status present.
 */
var directive = function($parse, defaults) {
    var status = ['loading', 'empty', 'error'],
        statusCls = ['loadingCls', 'emptyCls', 'errorCls', 'loadedCls'],
        events = ['onBegin', 'onError', 'onLoad'],
        // angular's directive define object.
        defineObj = {
            priority: 99,
            restrict: 'A',
            name: 'vgSrc',
            compile: function(element, attrs) {
                var attrName = attrs.$normalize(defineObj.name),
                    srcParser = $parse(attrs[attrName]);

                return function _link($scope, element, attrs) {
                    var opt = ng.copy(defaults),
                        $log = opt.debug ? console.log.bind(console) : ng.noop;
                    // parse everything in status lists.
                    ng.forEach(status, function(att) {
                        if (ng.isString(attrs[att])) {
                            // parse element's setting attribute use ng's '$parse'
                            // so that users can define the configuration by ng's 'expression'.
                            opt[att] = $parse(attrs[att])($scope);
                        }
                    });

                    // simply copy everything in statusCls lists.
                    ng.forEach(statusCls, function(att) {
                        if (ng.isString(attrs[att])) {
                            opt[att] = attrs[att];
                        }
                    });

                    // parse event handlers
                    // so that we can occu
                    ng.forEach(events, function(att) {
                        if (ng.isString(attrs[att])) {
                            opt[att] = $parse(attrs[att]);
                        }
                    });

                    // watching vgSrc attribute
                    // so that we could dynamicly fresh element's image when each time user change the value
                    $scope.$watch(function() {
                        return srcParser($scope);
                    }, function _bindImg(newVal, oldVal) {
                        var $e = {
                            src: newVal
                        };
                        if (ng.isString(newVal) && newVal.length > 0) {
                            attrs.$set('src', opt.loading);
                            _refreshCls(opt['loadingCls']);
                            opt['onBegin'].call($scope, $scope, $e);
                            $log('start loading resource:' + $e.src);

                            _lazyLoad(newVal, function() {
                                attrs.$set('src', newVal);
                                _refreshCls(opt['loadedCls']);
                                opt['onLoad'].call($scope, $scope, $e);
                                $log('success load resource:' + $e.src);
                            }, function() {
                                attrs.$set('src', opt.error);
                                _refreshCls(opt['errorCls']);
                                opt['onError'].call($scope, $scope, $e);
                                $log('failure load resource:' + $e.src);
                            })
                        } else {
                            attrs.$set('src', opt.empty);
                            _refreshCls(opt['emptyCls']);
                            opt['onError'].call($scope, $scope, $e);
                            $log('current img is empty');
                        }
                    });

                    // clear element's status class
                    // and add the new class
                    function _refreshCls(cls) {
                        ng.forEach(statusCls, function(cls) {
                            element.removeClass(opt[cls]);
                        });
                        element.addClass(cls);
                    }
                };

            }
        };

    return defineObj;
};

angular.module('vgSrc').directive('vgSrc', ['$parse', 'vgSrcConfig', directive]);

/*
 *  load function to excute a shadow load
 */
function _lazyLoad(src, loadCallback, errorCallback) {
    var $imgDom = ng.element(new Image());
    loadCallback = ng.isFunction(loadCallback) ? loadCallback : ng.noop;
    errorCallback = ng.isFunction(errorCallback) ? errorCallback : ng.noop;

    $imgDom.bind('error', errorCallback.bind(this)).bind('load', loadCallback.bind(this)).attr('src', src);
}

});
