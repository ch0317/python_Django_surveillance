/*! pui v0.9 |  from poohou.com */
(function (window) {
    var u = {};
    /*
     author:xxiaomao
     email:cd@poohou.com
     description:dialog方法
     created:2016.09.27
     update:0.0.1
     */
    /*提示弹窗构建*/
    u.dialogStructure = function (settings) {
        
        var str = $('<div class="dialog-wrap dialog-show alert">' +
            '<div class="dialog-main tx-c">' +
            '<div class="dialog-title">' + settings.title + '</div>' +
            '<div class="dialog-content">' + settings.msg + '</div>' +
            '<div class="dialog-footer poo">' + '</div>' +
            '</div>' +
            '</div>');
        u.ceateDialogMark(str,settings);
        var buttonsArray = new Array();
        $.each(settings.buttons, function (i) {
            str.find(".dialog-footer").find().remove();
            if (settings.buttons[i].constructor == Object) {
                buttons = $('<div class="dialog-btn dialog-show color-main p-f1">' + settings.buttons[i].buttonsName + '</div>');
                str.find(".dialog-footer").append(buttons);
                buttonsArray.push(buttons);
                buttons.on("click", function () {
                    settings.buttons[i].callback && settings.buttons[i].callback();
                });
            } else
            if (settings.buttons[i].constructor == String) {
                buttons = $('<div class="dialog-btn dialog-show color-main p-f1">' + settings.buttons[i] + '</div>');
                str.find(".dialog-footer").append(buttons);
                buttonsArray.push(buttons);
            }
            str.find(".dialog-footer").append();
        })
        $("body").append(str)
//        $(".dialog-wrap").length == 0 ? $("body").append(str) : $(".dialog-wrap").addClass("dialog-show");
        return buttonsArray;

    }

    /*提示框删除~隐藏*/
    //	u.dialogRemove = function(callback) {
    //		$(".dialog-wrap").remove();
    //		callback && callback();
    //	}

    /*Alert */
    u.alert = function (options,callback) {
        /*
        options
        @param String title 提示标题
        @param String msg 提示信息
        @param Array buttons / [{buttonsName:String,callback:Function}] 按钮文字
        @param Boolean bgTapHide 点击背景隐藏
        @param Function callback 回调
        */
        var defaults = {
            title: "提示",
            msg: "请给我传提示文字！！",
            buttons: ["确定"],
            bgTapHide: false,
            callback: ""
        };
        if (options.constructor == String) {
            defaults.msg = options
        }
        var settings = $.extend({}, defaults, options);
        $(u.dialogStructure(settings)[0]).on("click", function () {
            u.dialogHide($(this));
            callback && callback();
            settings.callback && settings.callback();
        })
    }

    /*Confirm */
    u.confirm = function (options) {
        /*
        options
        @param String title 提示标题
        @param String msg 提示信息
        @param Array buttons / [{buttonsName:String,callback:Function}] 按钮文字
        @param Function callback 回调
        */
        var defaults = {
            title: "提示",
            msg: "请给我传提示文字！！",
            buttons: ["取消", "确定"],
            callback: ""
        };
        var settings = $.extend({}, defaults, options);
        var buttonsArray = u.dialogStructure(settings);
        $(buttonsArray[0]).on("click", function () {
            u.dialogHide($(this))
        });
        $(buttonsArray[1]).on("click", function () {
            u.dialogHide($(this));
            settings.callback && settings.callback();
        })
    }

    /*Dialog */
    u.dialog = function (options) {
        /*
        options
        @param String title 提示标题
        @param String msg 提示信息
        @param Array buttons / [{buttonsName:String,callback:Function}] 按钮文字
        */
        var defaults = {
            title: "多按钮提示",
            msg: "请给我传提示文字！！",
            buttons: [{
                buttonsName: "取消",
                callback: function () {
                    u.dialogHide(str);
                }
			}],
        };
        var settings = $.extend({}, defaults, options);
        var buttonsArray = u.dialogStructure(settings);
        $.each(buttonsArray, function (i) {
            $(buttonsArray[i]).on("click", function () {
                u.dialogHide($(this));
            });
        });
    };
    /*加载 */

    u.loader = function (options) {
        /*
        options
        @param String loaderTxt 加载提示文字，默认文字为：加载中...
        @param String TxtColor 加载提示文字颜色，默认颜色为sass设定的主色
        @param Boolean autoHide 是否自动消失 默认为false
        @param String hideTime 自动消失所需时间，默认为三秒。配合autoHide使用
        @param Boolean mark 是否显示半透明层
        @param String loaderStyle 加载样式，目前有circle和dot,默认为circle
        @param Boolean tapHide 点击半透明层是否关闭加载，默认为false
        @param String loaderColor 加载动画主题颜色，默认颜色为sass设定的主色
        @param Function callback 回调函数
        */
        var str = "";
        var Timer;
        var defaults = {
            loaderTxt: "加载中...",
            TxtColor: "",
            autoHide: false,
            hideTime: "3000",
            mark: true,
            loaderStyle: "circle",
            tapHide: false,
            loaderColor: "",
            callback: ""
        };

        var settings = $.extend({}, defaults, options);

        if (settings.loaderStyle == "circle") {
            str =
                '            <div class="loader-main loader-show">' +
                '                <div class="loader"><i style="background:' + settings.loaderColor + '"></i><i style="background:' + settings.loaderColor + ';"></i><i style="background:' + settings.loaderColor + '"></i></div>' +
                '                <div class="fz24" style="color:' + settings.TxtColor + '">' + settings.loaderTxt + '</div>' +
                '            </div>';
        } else if (settings.loaderStyle == "dot") {
            str =
                '            <div class="loader-main">' +
                '                <div class="loader1" style="border-left-color:' + settings.loaderColor + ';"><i></i><i></i><i></i></div>' +
                '                <div class="fz24" style="color:' + settings.TxtColor + '">' + settings.loaderTxt + '</div>' +
                '            </div>'
        }
        if (settings.mark) {
            $("body").append($('<div class="loader-wrap loader-show">' + str + '</div>'));
            if (settings.tapHide) {
                $(".loader-wrap").on("click", function () {
                    u.loaderHide();
                    clearInterval(Timer);
                })
            };

        } else {
            $("body").append(str)

        }
        if (settings.autoHide) {
            Timer = setTimeout(function () {
                u.loaderHide();
            }, settings.hideTime)
        }
        settings.callback && settings.callback();
    };
    
    /*loader隐藏*/
    u.loaderHide = function (callback) {
        var oParent = $(".loader-wrap");
        oParent.removeClass("loader-show");
        oParent.children(".loader-main").on("animationend", function () {
            oParent.remove()
        });
        oParent.children(".loader-main").on("webkitAnimationEnd", function () {
            oParent.remove()
        });
        
        clearTimeout(toastDurationImplement);
        callback && callback();
    };
    /*loader定时关闭*/
    var loaderDurationImplement;
    u.loaderDuration = function (settings) {
        loaderDurationImplement = setTimeout(function () {
            u.loaderHide();
            settings.callback && settings.callback();
        }, settings.duration);
    };
    
    /*action*/
    u.action = function (settings) {
        var str = $('<div class="dialog-wrap dialog-show">' +
            '<div class="action-main">' +
            '<div class="action-content">' +
            '</div>' +
            '<button class="action-cancel">取消</button>' +
            ' </div>' +
            '</div>');
        u.ceateDialogMark(str,settings);
        str.find(".action-cancel").on("click", function () {
            u.dialogHide($(this));
        });
        str.find(".action-cancel").on("click", function () {
            var _this = $(this);
            u.dialogHide($(this));
        });
        var buttonsArray = [];
        $.each(settings.buttons, function (i) {
            if (settings.buttons[i].constructor == Object) {
                buttons = $('<button>' + settings.buttons[i].buttonsName + '</button>')
                str.find(".action-content").append(buttons);
                buttonsArray.push(buttons);
                buttons.on("click", function () {
                    u.dialogHide($(this))
                    settings.buttons[i].callback && settings.buttons[i].callback();
                });
            } else
            if (settings.buttons[i].constructor == String) {
                buttons = $('<button>' + settings.buttons[i].buttonsName + '</button>')
                str.find(".action-content").append(buttons);
                buttonsArray.push(buttons);
            }
        });
        $("body").append(str);
//        $(".dialog-wrap").length == 0 ? $("body").append(str) : $(".dialog-wrap").addClass("dialog-show");
        return buttonsArray;
        $("body").append(str);

    }
    u.dialogHide = function (obj) {
        var oParent = obj.parents(".dialog-wrap");
        oParent.removeClass("dialog-show");
        oParent.on("animationend", function () {
            oParent.remove()
        });
        oParent.on("webkitAnimationEnd", function () {
            oParent.remove()
        });
    };
    u.ceateDialogMark = function (obj,settings) {
        var DialogMark = $('<div class="dialog-mark"></div>');
        obj.append(DialogMark)
        if(settings.bgTapHide){
            DialogMark.on("click", function () {
                var _this = $(this)
                u.dialogHide(_this);
            });
        }
        
        return DialogMark;
    }

    
    /*
     author:xxiaomao
     email:cd@poohou.com
     description:toast、loader
     created:2016.09.27
     update:0.0.1
     */
    /*toast弹窗构建*/
    u.toastStructure = function (settings) {
        var str = $('<div class="toast-wrap toast-show"><div class="toast-main '+settings.class+'">'+settings.msg+'</div></div>');
        if (settings.style != "loader") {
            $(str[0]).find('.' + settings.style).children().remove()
        };
        $("body").append(str);
    };

    
    //toast隐藏
    u.toastHide = function (callback) {
        var oParent = $(".toast-wrap");
        oParent.removeClass("toast-show");
        oParent.on("animationend", function () {
            oParent.remove()
        });
        oParent.on("webkitAnimationEnd", function () {
            oParent.remove()
        });
        
        clearTimeout(toastDurationImplement);
        callback && callback();
    };
    /*toast定时关闭*/
    var toastDurationImplement;
    u.toastDuration = function (settings) {
        toastDurationImplement = setTimeout(function () {
            u.toastHide();
            settings.callback && settings.callback();
        }, settings.duration);
    };
    /*toast调用*/
    u.toast = function (options) {
        /*
        options
        @param String msg 提示信息
        @param String class 额外样式
        @param Int duration 自动隐藏时间（毫秒）
        @param Function callback 自动隐藏回调
        */
        var defaults = {
            msg: "提示文字",
            class:"bg-main",
            duration: 2000,
            callback: ""
        };
        if (options.constructor == String) {
            defaults.msg = options
        }
        var settings = $.extend({}, defaults, options);
        
        u.toastStructure(settings);
        if (settings.duration)
            u.toastDuration(settings);
    };
    
    
    /*
     author:xxiaomao
     email:cd@poohou.com
     description:modal
     created:2016.10.09
     update:0.0.1
     */
    /*modal
    options @param String 隐藏显示（show/hide）
    callback @param Function callback 回调
    */
    $.fn.modal = function (options, callback) {
        var _this = this;
        if (options == "") {
            options = "show";
        }
        var modalShow = function () {
            _this.addClass("dialog-show");
        }
        var modalHide = function () {
            _this.removeClass("dialog-show");
        }
        if (options == "show") {
            modalShow();
        } else if (options == "hide") {
            modalHide()
        }
        _this.find(".modal-hide").on("click", function () {
            modalHide();
        })
        callback && callback();
    };

    
    /*
     author:帅少
     email:mxl@poohou.com
     description:locStorage操作与cookie操作方法
     created:2016.09.27
     update:0.0.1
     */

    /*cookie*/

    u.setCookie = function (key, value, t) { //设置cookie
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + t);
        document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toGMTString();
    };
    u.getCookie = function (key) { //获取cookie
        var arr1 = document.cookie.split('; ');
        for (var i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split('=');
            if (arr2[0] == key) {
                return decodeURI(arr2[1]);
            }
        }
        return "null"
    };
    u.deleteCookie = function (key) { //删除cookie
        u.setCookie(key, null, -1);
    };

    /*localStorage操作*/
    u.locStorageEnabled = false;
    //设置localStorage
    u.setlocStorage = function (k, v) {
        if (v === undefined) {
            return u.deletelocStorage(k)
        };
        window.localStorage.setItem(k, JSON.stringify(v));
    };

    //localStorage长度
    u.locStorageLen = function () {
        return window.localStorage.length;
    };

    //获取localStorage的K值
    u.locStorageKey = function (num) {
        return window.localStorage.key(num);
    };

    //获取localStorage的K值
    u.getlocStorage = function (k) {
        return JSON.parse(window.localStorage.getItem(k));
    };

    //删除localStorage
    u.deletelocStorage = function (k) {
        window.localStorage.removeItem(k);
    };

    //清除所有localStorage
    u.clearlocStorage = function () {
        window.localStorage.clear();
    };

    //遍历localStorage
    u.locStorageEach = function (fn) {
        for (var i = 0; i < u.locStorageLen(); i++) {
            fn.call(this, u.locStorageKey(i), JSON.parse(window.localStorage.getItem(u.locStorageKey(i))));
        };
    };

    try {
        var testKey = '__testEnabled__';
        u.setlocStorage(testKey, testKey);
        if (u.getlocStorage(testKey) == testKey) {
            u.locStorageEnabled = true
        }
        u.deletelocStorage(testKey);
    } catch (e) {
        u.locStorageEnabled = false
    };

    //所有localStorage的当前的大小，单位为M(兆)，保留两位小数
    u.locStorageCurSize = function () {
        if (u.locStorageEnabled) {
            var size = 0;
            for (item in window.localStorage) {
                if (window.localStorage.hasOwnProperty(item)) {
                    size += window.localStorage.getItem(item).length;
                }
            }
            return (size / 1024 / 1024).toFixed(2)
        }
    }

    //localStorage剩余的多少
    u.locStorageRemainingSize = function () {
        return (5 - u.locStorageCurSize())
    }
    window.$p = u;
})(window);


$(function(){
    //**search
    $(document).on("click",".search>div",function(){
        $(this).closest(".search").addClass("search-focus");
        $(this).siblings("input").focus();
    });
    $(document).on("click",".search>p",function(){             
        $(this).siblings("input").val("").closest(".search").removeClass("search-focus");
    })
    
    /*
     author:xxiaomao
     email:cd@poohou.com
     description:tab nav slider
     created:2016.12.15
     update:0.0.1
    */
    $(document).on("click",".tabs-nav-slider li",function () {
        var NavW = $(window).width();
        $(this).addClass("active").siblings().removeClass("active");
        var scrollLeft = $(this).position().left - NavW / 2 + $(this).width() / 2;
        $(this).closest(".tabs-nav-slider-wrap").scrollLeft(scrollLeft);
        return false
    });
    
})