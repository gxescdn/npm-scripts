var URL="https://code.jquery.com/jquery-3.5.1.js"

    var Light = Light || {};

    Light.Popup = {
        popName: 'Eswhik-LightPopup',
        alwaysPop: false,
        onNewTab: true,
        eventType: 1,
        defaults: {
            width: window.screen.width,
            height: window.screen.height,
            left: 0,
            top: 0,
            location: 1,
            tollbar: 1,
            status: 1,
            menubar: 1,
            scrollbars: 1,
            resizable: 1
        },

        newWindowDefaults: {
            width: window.screen.width - 20,
            height: window.screen.height - 20
        },

        __newWindow: {
            scrollbars: 0
        },

        __counter: 0,
        create: function (link, options) {
            var optionsOriginal = options = options || {},
                me = this;
            var popName = me.popName + '_' + (me.__counter++);
            var keys = ['onNewTab', 'eventType', 'cookieExpires', 'alwaysPop'];
            for (var i in keys) {
                var key = keys[i];
                if (typeof options[key] != 'undefined') {
                    eval('var ' + key + ' = options.' + key);
                    delete options[key];
                } else {
                    eval('var ' + key + ' = me.' + key);
                }
            }
            if (alwaysPop) {
                cookieExpires = -1;
            }
            for (var i in me.defaults) {
                if (typeof options[i] == 'undefined') {
                    options[i] = me.defaults[i];
                    if (!onNewTab && typeof me.newWindowDefaults[i] != 'undefined') {
                        options[i] = me.newWindowDefaults[i];
                    }
                }
            }
            for (var i in me.__newWindow) {
                options[i] = me.__newWindow[i];
            }
            var params = [];
            for (var i in options) {
                params.push(i + '=' + options[i]);
            }
            params = params.join(',');
            var executed = false;
            var execute = function () {
                if (me.cookie(popName) === null && !executed) {
                    if (typeof window.chrome != 'undefined' && navigator.userAgent.indexOf('Windows') != -1 && typeof ___lastPopTime != 'undefined' && ___lastPopTime + 5 > new Date().getTime()) {
                        return;
                    }
                    executed = true;
                    if (onNewTab) {
                        var w = window.open(link, popName);
                    } else {
                        var w = window.open(link, '_blank', params);
                    }
                    w && w.blur();

                    window.focus();

                    me.cookie(popName, 1, cookieExpires);
                    ___lastPopTime = new Date().getTime();

                    if (navigator.userAgent.indexOf('Mac OS') != -1 && typeof window.chrome != 'undefined') {
                        setTimeout(function () {
                            if (!w.innerWidth || !w.document.documentElement.clientWidth) {
                                me.create(link, optionsOriginal);
                            }
                        }, 100);
                    }
                }
            }
            if (eventType == 2 || navigator.userAgent.match(/msie\s+(6|7|8)/i)) {
                if (!window.addEventListener) {
                    window.attachEvent("onload", function () {
                        document.body.attachEvent("onclick", execute);
                    });
                } else {
                    window.addEventListener("load", function () {
                        document.body.addEventListener("click", execute);
                    });
                }
            } else if (eventType == 1) {
                if (!window.addEventListener) {
                    window.attachEvent("onclick", execute);
                } else {
                    window.addEventListener("click", execute);
                }
            }
        },

        cookie: function (name, value, days) {
            if (arguments.length == 1) {
                var cookieMatch = document.cookie.match(new RegExp(name + "=[^;]+", "i"));
                return (cookieMatch) ? decodeURIComponent(cookieMatch[0].split("=")[1]) : null;
            }
            if (days == null || typeof days == 'undefined') {
                expires = '';
            } else {
                var date;
                if (typeof days == 'number') {
                    date = new Date();

                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                } else {
                    date = days;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var value = escape(value) + expires + "; path=/";
            document.cookie = name + "=" + value;
        }
    };
