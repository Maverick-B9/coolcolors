(window.themeInfo = { name: "Testament" }),
    (function (e) {
        var t;
        if (("function" == typeof define && define.amd && (define(e), (t = !0)), "object" == typeof exports && ((module.exports = e()), (t = !0)), !t)) {
            var i = window.Cookies,
                n = (window.Cookies = e());
            n.noConflict = function () {
                return (window.Cookies = i), n;
            };
        }
    })(function () {
        function e() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var i = arguments[e];
                for (var n in i) t[n] = i[n];
            }
            return t;
        }
        function t(e) {
            return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        }
        return (function i(n) {
            function r() {}
            function o(t, i, o) {
                if ("undefined" != typeof document) {
                    "number" == typeof (o = e({ path: "/" }, r.defaults, o)).expires && (o.expires = new Date(1 * new Date() + 864e5 * o.expires)), (o.expires = o.expires ? o.expires.toUTCString() : "");
                    try {
                        var a = JSON.stringify(i);
                        /^[\{\[]/.test(a) && (i = a);
                    } catch (s) {}
                    (i = n.write ? n.write(i, t) : encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
                        (t = encodeURIComponent(String(t))
                            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                            .replace(/[\(\)]/g, escape));
                    var l = "";
                    for (var c in o) o[c] && ((l += "; " + c), !0 !== o[c] && (l += "=" + o[c].split(";")[0]));
                    return (document.cookie = t + "=" + i + l);
                }
            }
            function a(e, i) {
                if ("undefined" != typeof document) {
                    for (var r = {}, o = document.cookie ? document.cookie.split("; ") : [], a = 0; a < o.length; a++) {
                        var s = o[a].split("="),
                            l = s.slice(1).join("=");
                        i || '"' !== l.charAt(0) || (l = l.slice(1, -1));
                        try {
                            var c = t(s[0]);
                            if (((l = (n.read || n)(l, c) || t(l)), i))
                                try {
                                    l = JSON.parse(l);
                                } catch (u) {}
                            if (((r[c] = l), e === c)) break;
                        } catch (d) {}
                    }
                    return e ? r[e] : r;
                }
            }
            return (
                (r.set = o),
                (r.get = function (e) {
                    return a(e, !1);
                }),
                (r.getJSON = function (e) {
                    return a(e, !0);
                }),
                (r.remove = function (t, i) {
                    o(t, "", e(i, { expires: -1 }));
                }),
                (r.defaults = {}),
                (r.withConverter = i),
                r
            );
        })(function () {});
    }),
    (function e() {
        var t, i, n, r;
        (t = this),
            (i = function () {
                return function (e, t, i, n) {
                    var r = {
                        features: null,
                        bind: function (e, t, i, n) {
                            var r = (n ? "remove" : "add") + "EventListener";
                            t = t.split(" ");
                            for (var o = 0; o < t.length; o++) t[o] && e[r](t[o], i, !1);
                        },
                        isArray: function (e) {
                            return e instanceof Array;
                        },
                        createEl: function (e, t) {
                            var i = document.createElement(t || "div");
                            return e && (i.className = e), i;
                        },
                        getScrollY: function () {
                            var e = window.pageYOffset;
                            return void 0 !== e ? e : document.documentElement.scrollTop;
                        },
                        unbind: function (e, t, i) {
                            r.bind(e, t, i, !0);
                        },
                        removeClass: function (e, t) {
                            var i = RegExp("(\\s|^)" + t + "(\\s|$)");
                            e.className = e.className
                                .replace(i, " ")
                                .replace(/^\s\s*/, "")
                                .replace(/\s\s*$/, "");
                        },
                        addClass: function (e, t) {
                            r.hasClass(e, t) || (e.className += (e.className ? " " : "") + t);
                        },
                        hasClass: function (e, t) {
                            return e.className && RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className);
                        },
                        getChildByClass: function (e, t) {
                            for (var i = e.firstChild; i; ) {
                                if (r.hasClass(i, t)) return i;
                                i = i.nextSibling;
                            }
                        },
                        arraySearch: function (e, t, i) {
                            for (var n = e.length; n--; ) if (e[n][i] === t) return n;
                            return -1;
                        },
                        extend: function (e, t, i) {
                            for (var n in t)
                                if (t.hasOwnProperty(n)) {
                                    if (i && e.hasOwnProperty(n)) continue;
                                    e[n] = t[n];
                                }
                        },
                        easing: {
                            sine: {
                                out: function (e) {
                                    return Math.sin(e * (Math.PI / 2));
                                },
                                inOut: function (e) {
                                    return -(Math.cos(Math.PI * e) - 1) / 2;
                                },
                            },
                            cubic: {
                                out: function (e) {
                                    return --e * e * e + 1;
                                },
                            },
                        },
                        detectFeatures: function () {
                            if (r.features) return r.features;
                            var e = r.createEl().style,
                                t = "",
                                i = {};
                            if (
                                ((i.oldIE = document.all && !document.addEventListener),
                                (i.touch = "ontouchstart" in window),
                                window.requestAnimationFrame && ((i.raf = window.requestAnimationFrame), (i.caf = window.cancelAnimationFrame)),
                                (i.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled),
                                !i.pointerEvent)
                            ) {
                                var n = navigator.userAgent;
                                if (/iP(hone|od)/.test(navigator.platform)) {
                                    var o = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                                    o && o.length > 0 && (o = parseInt(o[1], 10)) >= 1 && o < 8 && (i.isOldIOSPhone = !0);
                                }
                                var a = n.match(/Android\s([0-9\.]*)/),
                                    s = a ? a[1] : 0;
                                (s = parseFloat(s)) >= 1 && (s < 4.4 && (i.isOldAndroid = !0), (i.androidVersion = s)), (i.isMobileOpera = /opera mini|opera mobi/i.test(n));
                            }
                            for (var l, c, u = ["transform", "perspective", "animationName"], d = ["", "webkit", "Moz", "ms", "O"], h = 0; h < 4; h++) {
                                t = d[h];
                                for (var p = 0; p < 3; p++) (l = u[p]), (c = t + (t ? l.charAt(0).toUpperCase() + l.slice(1) : l)), !i[l] && c in e && (i[l] = c);
                                t && !i.raf && ((t = t.toLowerCase()), (i.raf = window[t + "RequestAnimationFrame"]), i.raf && (i.caf = window[t + "CancelAnimationFrame"] || window[t + "CancelRequestAnimationFrame"]));
                            }
                            if (!i.raf) {
                                var f = 0;
                                (i.raf = function (e) {
                                    var t = new Date().getTime(),
                                        i = Math.max(0, 16 - (t - f)),
                                        n = window.setTimeout(function () {
                                            e(t + i);
                                        }, i);
                                    return (f = t + i), n;
                                }),
                                    (i.caf = function (e) {
                                        clearTimeout(e);
                                    });
                            }
                            return (i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), (r.features = i), i;
                        },
                    };
                    r.detectFeatures(),
                        r.features.oldIE &&
                            (r.bind = function (e, t, i, n) {
                                t = t.split(" ");
                                for (
                                    var r,
                                        o = (n ? "detach" : "attach") + "Event",
                                        a = function () {
                                            i.handleEvent.call(i);
                                        },
                                        s = 0;
                                    s < t.length;
                                    s++
                                )
                                    if ((r = t[s])) {
                                        if ("object" == typeof i && i.handleEvent) {
                                            if (n) {
                                                if (!i["oldIE" + r]) return !1;
                                            } else i["oldIE" + r] = a;
                                            e[o]("on" + r, i["oldIE" + r]);
                                        } else e[o]("on" + r, i);
                                    }
                            });
                    var o = this,
                        a = {
                            allowPanToNext: !0,
                            spacing: 0.12,
                            bgOpacity: 1,
                            mouseUsed: !1,
                            loop: !0,
                            pinchToClose: !0,
                            closeOnScroll: !0,
                            closeOnVerticalDrag: !0,
                            verticalDragRange: 0.75,
                            hideAnimationDuration: 333,
                            showAnimationDuration: 333,
                            showHideOpacity: !1,
                            focus: !0,
                            escKey: !0,
                            arrowKeys: !0,
                            mainScrollEndFriction: 0.35,
                            panEndFriction: 0.35,
                            isClickableElement: function (e) {
                                return "A" === e.tagName;
                            },
                            getDoubleTapZoom: function (e, t) {
                                return e ? 1 : t.initialZoomLevel < 0.7 ? 1 : 1.33;
                            },
                            maxSpreadZoom: 1.33,
                            modal: !0,
                            scaleMode: "fit",
                        };
                    r.extend(a, n);
                    var s,
                        l,
                        c,
                        u,
                        d,
                        h,
                        p,
                        f,
                        m,
                        v,
                        y,
                        g,
                        b,
                        S,
                        $,
                        E,
                        w,
                        x,
                        L,
                        C,
                        k,
                        q,
                        A,
                        I,
                        D,
                        j,
                        T,
                        P,
                        F,
                        M,
                        z,
                        O,
                        H,
                        B,
                        N,
                        R,
                        U,
                        W,
                        V,
                        G,
                        Z,
                        X,
                        K,
                        Q,
                        Y,
                        J,
                        ee,
                        et,
                        ei,
                        en,
                        er,
                        eo,
                        ea,
                        es,
                        el,
                        ec,
                        eu,
                        ed = function () {
                            return { x: 0, y: 0 };
                        },
                        eh = ed(),
                        ep = ed(),
                        ef = ed(),
                        em = {},
                        ev = 0,
                        ey = {},
                        eg = ed(),
                        eb = 0,
                        eS = !0,
                        e$ = [],
                        eE = {},
                        ew = !1,
                        ex = function (e, t) {
                            r.extend(o, t.publicMethods), e$.push(e);
                        },
                        eL = function (e) {
                            var t = tF();
                            return e > t - 1 ? e - t : e < 0 ? t + e : e;
                        },
                        e8 = {},
                        e_ = function (e, t) {
                            return e8[e] || (e8[e] = []), e8[e].push(t);
                        },
                        eC = function (e) {
                            var t = e8[e];
                            if (t) {
                                var i = Array.prototype.slice.call(arguments);
                                i.shift();
                                for (var n = 0; n < t.length; n++) t[n].apply(o, i);
                            }
                        },
                        ek = function () {
                            return new Date().getTime();
                        },
                        eq = function (e) {
                            (el = e), (o.bg.style.opacity = e * a.bgOpacity);
                        },
                        eA = function (e, t, i, n, r) {
                            (!ew || (r && r !== o.currItem)) && (n /= r ? r.fitRatio : o.currItem.fitRatio), (e[q] = g + t + "px, " + i + "px" + b + " scale(" + n + ")");
                        },
                        eI = function (e) {
                            en && (e && (v > o.currItem.fitRatio ? ew || (t1(o.currItem, !1, !0), (ew = !0)) : ew && (t1(o.currItem), (ew = !1))), eA(en, ef.x, ef.y, v));
                        },
                        eD = function (e) {
                            e.container && eA(e.container.style, e.initialPosition.x, e.initialPosition.y, e.initialZoomLevel, e);
                        },
                        ej = function (e, t) {
                            t[q] = g + e + "px, 0px" + b;
                        },
                        eT = function (e, t) {
                            if (!a.loop && t) {
                                var i = u + (eg.x * ev - e) / eg.x,
                                    n = Math.round(e - to.x);
                                ((i < 0 && n > 0) || (i >= tF() - 1 && n < 0)) && (e = to.x + n * a.mainScrollEndFriction);
                            }
                            (to.x = e), ej(e, d);
                        },
                        eP = function (e, t) {
                            var i = ta[e] - ey[e];
                            return ep[e] + eh[e] + i - i * (t / y);
                        },
                        eF = function (e, t) {
                            (e.x = t.x), (e.y = t.y), t.id && (e.id = t.id);
                        },
                        eM = function (e) {
                            (e.x = Math.round(e.x)), (e.y = Math.round(e.y));
                        },
                        ez = null,
                        eO = function () {
                            ez && (r.unbind(document, "mousemove", eO), r.addClass(e, "pswp--has_mouse"), (a.mouseUsed = !0), eC("mouseUsed")),
                                (ez = setTimeout(function () {
                                    ez = null;
                                }, 100));
                        },
                        eH = function () {
                            r.bind(document, "keydown", o), z.transform && r.bind(o.scrollWrap, "click", o), a.mouseUsed || r.bind(document, "mousemove", eO), r.bind(window, "resize scroll orientationchange", o), eC("bindEvents");
                        },
                        eB = function () {
                            r.unbind(window, "resize scroll orientationchange", o),
                                r.unbind(window, "scroll", m.scroll),
                                r.unbind(document, "keydown", o),
                                r.unbind(document, "mousemove", eO),
                                z.transform && r.unbind(o.scrollWrap, "click", o),
                                V && r.unbind(window, p, o),
                                clearTimeout(O),
                                eC("unbindEvents");
                        },
                        eN = function (e, t) {
                            var i = tU(o.currItem, em, e);
                            return t && (ei = i), i;
                        },
                        eR = function (e) {
                            return e || (e = o.currItem), e.initialZoomLevel;
                        },
                        eU = function (e) {
                            return e || (e = o.currItem), e.w > 0 ? a.maxSpreadZoom : 1;
                        },
                        eW = function (e, t, i, n) {
                            return n === o.currItem.initialZoomLevel ? ((i[e] = o.currItem.initialPosition[e]), !0) : ((i[e] = eP(e, n)), i[e] > t.min[e] ? ((i[e] = t.min[e]), !0) : i[e] < t.max[e] && ((i[e] = t.max[e]), !0));
                        },
                        e0 = function () {
                            if (q) return (g = "translate" + (z.perspective && !I ? "3d(" : "(")), void (b = z.perspective ? ", 0px)" : ")");
                            (q = "left"),
                                r.addClass(e, "pswp--ie"),
                                (ej = function (e, t) {
                                    t.left = e + "px";
                                }),
                                (eD = function (e) {
                                    var t = e.fitRatio > 1 ? 1 : e.fitRatio,
                                        i = e.container.style,
                                        n = t * e.w,
                                        r = t * e.h;
                                    (i.width = n + "px"), (i.height = r + "px"), (i.left = e.initialPosition.x + "px"), (i.top = e.initialPosition.y + "px");
                                }),
                                (eI = function () {
                                    if (en) {
                                        var e = en,
                                            t = o.currItem,
                                            i = t.fitRatio > 1 ? 1 : t.fitRatio,
                                            n = i * t.w,
                                            r = i * t.h;
                                        (e.width = n + "px"), (e.height = r + "px"), (e.left = ef.x + "px"), (e.top = ef.y + "px");
                                    }
                                });
                        },
                        eV = function (e) {
                            var t = "";
                            a.escKey && 27 === e.keyCode ? (t = "close") : a.arrowKeys && (37 === e.keyCode ? (t = "prev") : 39 === e.keyCode && (t = "next")),
                                t && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), o[t]()));
                        },
                        e1 = function (e) {
                            e && (X || Z || er || U) && (e.preventDefault(), e.stopPropagation());
                        },
                        eG = function () {
                            o.setScrollOffset(0, r.getScrollY());
                        },
                        e3 = {},
                        e9 = 0,
                        eZ = function (e) {
                            e3[e] && (e3[e].raf && j(e3[e].raf), e9--, delete e3[e]);
                        },
                        eX = function (e) {
                            e3[e] && eZ(e), e3[e] || (e9++, (e3[e] = {}));
                        },
                        eK = function () {
                            for (var e in e3) e3.hasOwnProperty(e) && eZ(e);
                        },
                        e7 = function (e, t, i, n, r, o, a) {
                            var s,
                                l = ek();
                            eX(e);
                            var c = function () {
                                if (e3[e]) {
                                    if ((s = ek() - l) >= n) return eZ(e), o(i), void (a && a());
                                    o((i - t) * r(s / n) + t), (e3[e].raf = D(c));
                                }
                            };
                            c();
                        },
                        e2 = {},
                        eQ = {},
                        eY = {},
                        e5 = {},
                        e4 = {},
                        e6 = [],
                        eJ = {},
                        te = [],
                        tt = {},
                        ti = 0,
                        tn = ed(),
                        tr = 0,
                        to = ed(),
                        ta = ed(),
                        ts = ed(),
                        tl = function (e, t) {
                            return (tt.x = Math.abs(e.x - t.x)), (tt.y = Math.abs(e.y - t.y)), Math.sqrt(tt.x * tt.x + tt.y * tt.y);
                        },
                        tc = function () {
                            K && (j(K), (K = null));
                        },
                        tu = function () {
                            V && ((K = D(tu)), tL());
                        },
                        td = function (e, t) {
                            return !(!e || e === document) && !(e.getAttribute("class") && e.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (t(e) ? e : td(e.parentNode, t));
                        },
                        th = {},
                        tp = function (e, t) {
                            return (th.prevent = !td(e.target, a.isClickableElement)), eC("preventDragEvent", e, t, th), th.prevent;
                        },
                        tf = function (e, t) {
                            return (t.x = e.pageX), (t.y = e.pageY), (t.id = e.identifier), t;
                        },
                        tm = function (e, t, i) {
                            (i.x = 0.5 * (e.x + t.x)), (i.y = 0.5 * (e.y + t.y));
                        },
                        tv = function (e, t, i) {
                            if (e - B > 50) {
                                var n = te.length > 2 ? te.shift() : {};
                                (n.x = t), (n.y = i), te.push(n), (B = e);
                            }
                        },
                        ty = function () {
                            return 1 - Math.abs((ef.y - o.currItem.initialPosition.y) / (em.y / 2));
                        },
                        tg = {},
                        tb = {},
                        tS = [],
                        t$ = function (e) {
                            for (; tS.length > 0; ) tS.pop();
                            return (
                                A
                                    ? ((eu = 0),
                                      e6.forEach(function (e) {
                                          0 === eu ? (tS[0] = e) : 1 === eu && (tS[1] = e), eu++;
                                      }))
                                    : e.type.indexOf("touch") > -1
                                    ? e.touches && e.touches.length > 0 && ((tS[0] = tf(e.touches[0], tg)), e.touches.length > 1 && (tS[1] = tf(e.touches[1], tb)))
                                    : ((tg.x = e.pageX), (tg.y = e.pageY), (tg.id = ""), (tS[0] = tg)),
                                tS
                            );
                        },
                        tE = function (e, t) {
                            var i,
                                n,
                                r,
                                s,
                                l = 0,
                                c = ef[e] + t[e],
                                u = t[e] > 0,
                                d = to.x + t.x,
                                h = to.x - eJ.x;
                            return (
                                (i = c > ei.min[e] || c < ei.max[e] ? a.panEndFriction : 1),
                                (c = ef[e] + t[e] * i),
                                (a.allowPanToNext || v === o.currItem.initialZoomLevel) &&
                                (en
                                    ? "h" !== eo ||
                                      "x" !== e ||
                                      Z ||
                                      (u
                                          ? (c > ei.min[e] && ((i = a.panEndFriction), (l = ei.min[e] - c), (n = ei.min[e] - ep[e])),
                                            (n <= 0 || h < 0) && tF() > 1 ? ((s = d), h < 0 && d > eJ.x && (s = eJ.x)) : ei.min.x !== ei.max.x && (r = c))
                                          : (c < ei.max[e] && ((i = a.panEndFriction), (l = c - ei.max[e]), (n = ep[e] - ei.max[e])),
                                            (n <= 0 || h > 0) && tF() > 1 ? ((s = d), h > 0 && d < eJ.x && (s = eJ.x)) : ei.min.x !== ei.max.x && (r = c)))
                                    : (s = d),
                                "x" === e)
                                    ? (void 0 !== s && (eT(s, !0), (Q = s !== eJ.x)), ei.min.x !== ei.max.x && (void 0 !== r ? (ef.x = r) : Q || (ef.x += t.x * i)), void 0 !== s)
                                    : void (er || Q || (v > o.currItem.fitRatio && (ef[e] += t[e] * i)))
                            );
                        },
                        tw = function (e) {
                            if (!("mousedown" === e.type && e.button > 0)) {
                                if (tT) return void e.preventDefault();
                                if (!W || "mousedown" !== e.type) {
                                    if ((tp(e, !0) && e.preventDefault(), eC("pointerDown"), A)) {
                                        var t = r.arraySearch(e6, e.pointerId, "id");
                                        t < 0 && (t = e6.length), (e6[t] = { x: e.pageX, y: e.pageY, id: e.pointerId });
                                    }
                                    var i = t$(e),
                                        n = i.length;
                                    (Y = null),
                                        eK(),
                                        (V && 1 !== n) ||
                                            ((V = ea = !0),
                                            r.bind(window, p, o),
                                            (R = ec = es = U = Q = X = G = Z = !1),
                                            (eo = null),
                                            eC("firstTouchStart", i),
                                            eF(ep, ef),
                                            (eh.x = eh.y = 0),
                                            eF(e5, i[0]),
                                            eF(e4, e5),
                                            (eJ.x = eg.x * ev),
                                            (te = [{ x: e5.x, y: e5.y }]),
                                            (B = H = ek()),
                                            eN(v, !0),
                                            tc(),
                                            tu()),
                                        J ||
                                            !(n > 1) ||
                                            er ||
                                            Q ||
                                            ((y = v),
                                            (Z = !1),
                                            (J = G = !0),
                                            (eh.y = eh.x = 0),
                                            eF(ep, ef),
                                            eF(e2, i[0]),
                                            eF(eQ, i[1]),
                                            tm(e2, eQ, ts),
                                            (ta.x = Math.abs(ts.x) - ef.x),
                                            (ta.y = Math.abs(ts.y) - ef.y),
                                            (ee = et = tl(e2, eQ)));
                                }
                            }
                        },
                        tx = function (e) {
                            if ((e.preventDefault(), A)) {
                                var t = r.arraySearch(e6, e.pointerId, "id");
                                if (t > -1) {
                                    var i = e6[t];
                                    (i.x = e.pageX), (i.y = e.pageY);
                                }
                            }
                            if (V) {
                                var n = t$(e);
                                if (eo || X || J) Y = n;
                                else if (to.x !== eg.x * ev) eo = "h";
                                else {
                                    var o = Math.abs(n[0].x - e5.x) - Math.abs(n[0].y - e5.y);
                                    Math.abs(o) >= 10 && ((eo = o > 0 ? "h" : "v"), (Y = n));
                                }
                            }
                        },
                        tL = function () {
                            if (Y) {
                                var e = Y.length;
                                if (0 !== e) {
                                    if ((eF(e2, Y[0]), (eY.x = e2.x - e5.x), (eY.y = e2.y - e5.y), J && e > 1)) {
                                        if (((e5.x = e2.x), (e5.y = e2.y), !eY.x && !eY.y && ((l = Y[1]), (c = eQ), l.x === c.x && l.y === c.y))) return;
                                        eF(eQ, Y[1]), Z || ((Z = !0), eC("zoomGestureStarted"));
                                        var t = tl(e2, eQ),
                                            i = tq(t);
                                        i > o.currItem.initialZoomLevel + o.currItem.initialZoomLevel / 15 && (ec = !0);
                                        var n = 1,
                                            r = eR(),
                                            s = eU();
                                        if (i < r) {
                                            if (a.pinchToClose && !ec && y <= o.currItem.initialZoomLevel) {
                                                var l,
                                                    c,
                                                    u = 1 - (r - i) / (r / 1.2);
                                                eq(u), eC("onPinchClose", u), (es = !0);
                                            } else (n = (r - i) / r) > 1 && (n = 1), (i = r - n * (r / 3));
                                        } else i > s && ((n = (i - s) / (6 * r)) > 1 && (n = 1), (i = s + n * r));
                                        n < 0 && (n = 0), (ee = t), tm(e2, eQ, tn), (eh.x += tn.x - ts.x), (eh.y += tn.y - ts.y), eF(ts, tn), (ef.x = eP("x", i)), (ef.y = eP("y", i)), (R = i > v), (v = i), eI();
                                    } else {
                                        if (!eo || (ea && ((ea = !1), Math.abs(eY.x) >= 10 && (eY.x -= Y[0].x - e4.x), Math.abs(eY.y) >= 10 && (eY.y -= Y[0].y - e4.y)), (e5.x = e2.x), (e5.y = e2.y), 0 === eY.x && 0 === eY.y)) return;
                                        if ("v" === eo && a.closeOnVerticalDrag && "fit" === a.scaleMode && v === o.currItem.initialZoomLevel) {
                                            (eh.y += eY.y), (ef.y += eY.y);
                                            var d = ty();
                                            return (U = !0), eC("onVerticalDrag", d), eq(d), void eI();
                                        }
                                        tv(ek(), e2.x, e2.y), (X = !0), (ei = o.currItem.bounds), tE("x", eY) || (tE("y", eY), eM(ef), eI());
                                    }
                                }
                            }
                        },
                        t8 = function (e) {
                            if (z.isOldAndroid) {
                                if (W && "mouseup" === e.type) return;
                                e.type.indexOf("touch") > -1 &&
                                    (clearTimeout(W),
                                    (W = setTimeout(function () {
                                        W = 0;
                                    }, 600)));
                            }
                            if ((eC("pointerUp"), tp(e, !1) && e.preventDefault(), A)) {
                                var t = r.arraySearch(e6, e.pointerId, "id");
                                t > -1 &&
                                    (((i = e6.splice(t, 1)[0]), navigator.msPointerEnabled)
                                        ? ((i.type = { 4: "mouse", 2: "touch", 3: "pen" }[e.pointerType]), i.type || (i.type = e.pointerType || "mouse"))
                                        : (i.type = e.pointerType || "mouse"));
                            }
                            var i,
                                n,
                                s = t$(e),
                                l = s.length;
                            if (("mouseup" === e.type && (l = 0), 2 === l)) return (Y = null), !0;
                            1 === l && eF(e4, s[0]),
                                0 !== l ||
                                    eo ||
                                    er ||
                                    (i ||
                                        ("mouseup" === e.type
                                            ? (i = { x: e.pageX, y: e.pageY, type: "mouse" })
                                            : e.changedTouches && e.changedTouches[0] && (i = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type: "touch" })),
                                    eC("touchRelease", e, i));
                            var c = -1;
                            if (
                                (0 === l && ((V = !1), r.unbind(window, p, o), tc(), J ? (c = 0) : -1 !== tr && (c = ek() - tr)),
                                (tr = 1 === l ? ek() : -1),
                                (n = -1 !== c && c < 150 ? "zoom" : "swipe"),
                                J && l < 2 && ((J = !1), 1 === l && (n = "zoomPointerUp"), eC("zoomGestureEnded")),
                                (Y = null),
                                X || Z || er || U)
                            ) {
                                if ((eK(), N || (N = t_()), N.calculateSwipeSpeed("x"), U)) {
                                    if (ty() < a.verticalDragRange) o.close();
                                    else {
                                        var u = ef.y,
                                            d = el;
                                        e7("verticalDrag", 0, 1, 300, r.easing.cubic.out, function (e) {
                                            (ef.y = (o.currItem.initialPosition.y - u) * e + u), eq((1 - d) * e + d), eI();
                                        }),
                                            eC("onVerticalDrag", 1);
                                    }
                                } else {
                                    if ((Q || er) && 0 === l) {
                                        if (tk(n, N)) return;
                                        n = "zoomPointerUp";
                                    }
                                    if (!er) return "swipe" !== n ? void tA() : void (!Q && v > o.currItem.fitRatio && tC(N));
                                }
                            }
                        },
                        t_ = function () {
                            var e,
                                t,
                                i = {
                                    lastFlickOffset: {},
                                    lastFlickDist: {},
                                    lastFlickSpeed: {},
                                    slowDownRatio: {},
                                    slowDownRatioReverse: {},
                                    speedDecelerationRatio: {},
                                    speedDecelerationRatioAbs: {},
                                    distanceOffset: {},
                                    backAnimDestination: {},
                                    backAnimStarted: {},
                                    calculateSwipeSpeed: function (n) {
                                        te.length > 1 ? ((e = ek() - B + 50), (t = te[te.length - 2][n])) : ((e = ek() - H), (t = e4[n])),
                                            (i.lastFlickOffset[n] = e5[n] - t),
                                            (i.lastFlickDist[n] = Math.abs(i.lastFlickOffset[n])),
                                            i.lastFlickDist[n] > 20 ? (i.lastFlickSpeed[n] = i.lastFlickOffset[n] / e) : (i.lastFlickSpeed[n] = 0),
                                            0.1 > Math.abs(i.lastFlickSpeed[n]) && (i.lastFlickSpeed[n] = 0),
                                            (i.slowDownRatio[n] = 0.95),
                                            (i.slowDownRatioReverse[n] = 1 - i.slowDownRatio[n]),
                                            (i.speedDecelerationRatio[n] = 1);
                                    },
                                    calculateOverBoundsAnimOffset: function (e, t) {
                                        i.backAnimStarted[e] ||
                                            (ef[e] > ei.min[e] ? (i.backAnimDestination[e] = ei.min[e]) : ef[e] < ei.max[e] && (i.backAnimDestination[e] = ei.max[e]),
                                            void 0 !== i.backAnimDestination[e] &&
                                                ((i.slowDownRatio[e] = 0.7),
                                                (i.slowDownRatioReverse[e] = 1 - i.slowDownRatio[e]),
                                                i.speedDecelerationRatioAbs[e] < 0.05 &&
                                                    ((i.lastFlickSpeed[e] = 0),
                                                    (i.backAnimStarted[e] = !0),
                                                    e7("bounceZoomPan" + e, ef[e], i.backAnimDestination[e], t || 300, r.easing.sine.out, function (t) {
                                                        (ef[e] = t), eI();
                                                    }))));
                                    },
                                    calculateAnimOffset: function (e) {
                                        i.backAnimStarted[e] ||
                                            ((i.speedDecelerationRatio[e] = i.speedDecelerationRatio[e] * (i.slowDownRatio[e] + i.slowDownRatioReverse[e] - (i.slowDownRatioReverse[e] * i.timeDiff) / 10)),
                                            (i.speedDecelerationRatioAbs[e] = Math.abs(i.lastFlickSpeed[e] * i.speedDecelerationRatio[e])),
                                            (i.distanceOffset[e] = i.lastFlickSpeed[e] * i.speedDecelerationRatio[e] * i.timeDiff),
                                            (ef[e] += i.distanceOffset[e]));
                                    },
                                    panAnimLoop: function () {
                                        if (
                                            e3.zoomPan &&
                                            ((e3.zoomPan.raf = D(i.panAnimLoop)),
                                            (i.now = ek()),
                                            (i.timeDiff = i.now - i.lastNow),
                                            (i.lastNow = i.now),
                                            i.calculateAnimOffset("x"),
                                            i.calculateAnimOffset("y"),
                                            eI(),
                                            i.calculateOverBoundsAnimOffset("x"),
                                            i.calculateOverBoundsAnimOffset("y"),
                                            i.speedDecelerationRatioAbs.x < 0.05 && i.speedDecelerationRatioAbs.y < 0.05)
                                        )
                                            return (ef.x = Math.round(ef.x)), (ef.y = Math.round(ef.y)), eI(), void eZ("zoomPan");
                                    },
                                };
                            return i;
                        },
                        tC = function (e) {
                            return (
                                e.calculateSwipeSpeed("y"),
                                (ei = o.currItem.bounds),
                                (e.backAnimDestination = {}),
                                (e.backAnimStarted = {}),
                                0.05 >= Math.abs(e.lastFlickSpeed.x) && 0.05 >= Math.abs(e.lastFlickSpeed.y)
                                    ? ((e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y = 0), e.calculateOverBoundsAnimOffset("x"), e.calculateOverBoundsAnimOffset("y"), !0)
                                    : (eX("zoomPan"), (e.lastNow = ek()), void e.panAnimLoop())
                            );
                        },
                        tk = function (e, t) {
                            if ((er || (ti = u), "swipe" === e)) {
                                var i = e5.x - e4.x,
                                    n = t.lastFlickDist.x < 10;
                                i > 30 && (n || t.lastFlickOffset.x > 20) ? (l = -1) : i < -30 && (n || t.lastFlickOffset.x < -20) && (l = 1);
                            }
                            l && ((u += l) < 0 ? ((u = a.loop ? tF() - 1 : 0), (c = !0)) : u >= tF() && ((u = a.loop ? 0 : tF() - 1), (c = !0)), (c && !a.loop) || ((eb += l), (ev -= l), (s = !0)));
                            var s,
                                l,
                                c,
                                d,
                                h = eg.x * ev,
                                p = Math.abs(h - to.x);
                            return (
                                (d = s || h > to.x == t.lastFlickSpeed.x > 0 ? Math.max((d = Math.min((d = Math.abs(t.lastFlickSpeed.x) > 0 ? p / Math.abs(t.lastFlickSpeed.x) : 333), 400)), 250) : 333),
                                ti === u && (s = !1),
                                (er = !0),
                                eC("mainScrollAnimStart"),
                                e7("mainScroll", to.x, h, d, r.easing.cubic.out, eT, function () {
                                    eK(), (er = !1), (ti = -1), (s || ti !== u) && o.updateCurrItem(), eC("mainScrollAnimComplete");
                                }),
                                s && o.updateCurrItem(!0),
                                s
                            );
                        },
                        tq = function (e) {
                            return (1 / et) * e * y;
                        },
                        tA = function () {
                            var e = v,
                                t = eR(),
                                i = eU();
                            v < t ? (e = t) : v > i && (e = i);
                            var n,
                                a = el;
                            return es && !R && !ec && v < t
                                ? (o.close(), !0)
                                : (es &&
                                      (n = function (e) {
                                          eq((1 - a) * e + a);
                                      }),
                                  o.zoomTo(e, 0, 200, r.easing.cubic.out, n),
                                  !0);
                        };
                    ex("Gestures", {
                        publicMethods: {
                            initGestures: function () {
                                var e = function (e, t, i, n, r) {
                                    (x = e + t), (L = e + i), (C = e + n), (k = r ? e + r : "");
                                };
                                (A = z.pointerEvent) && z.touch && (z.touch = !1),
                                    A
                                        ? navigator.msPointerEnabled
                                            ? e("MSPointer", "Down", "Move", "Up", "Cancel")
                                            : e("pointer", "down", "move", "up", "cancel")
                                        : z.touch
                                        ? (e("touch", "start", "move", "end", "cancel"), (I = !0))
                                        : e("mouse", "down", "move", "up"),
                                    (p = L + " " + C + " " + k),
                                    (f = x),
                                    A && !I && (I = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1),
                                    (o.likelyTouchDevice = I),
                                    (m[x] = tw),
                                    (m[L] = tx),
                                    (m[C] = t8),
                                    k && (m[k] = m[C]),
                                    z.touch && ((f += " mousedown"), (p += " mousemove mouseup"), (m.mousedown = m[x]), (m.mousemove = m[L]), (m.mouseup = m[C])),
                                    I || (a.allowPanToNext = !1);
                            },
                        },
                    });
                    var tI,
                        tD,
                        tj,
                        tT,
                        tP,
                        tF,
                        tM,
                        tz = function (t, i, n, s) {
                            tI && clearTimeout(tI), (tT = !0), (tj = !0), t.initialLayout ? ((h = t.initialLayout), (t.initialLayout = null)) : (h = a.getThumbBoundsFn && a.getThumbBoundsFn(u));
                            var l,
                                d,
                                h,
                                p = n ? a.hideAnimationDuration : a.showAnimationDuration,
                                f = function () {
                                    eZ("initialZoom"),
                                        n ? (o.template.removeAttribute("style"), o.bg.removeAttribute("style")) : (eq(1), i && (i.style.display = "block"), r.addClass(e, "pswp--animated-in"), eC("initialZoom" + (n ? "OutEnd" : "InEnd"))),
                                        s && s(),
                                        (tT = !1);
                                };
                            if (!p || !h || void 0 === h.x)
                                return (
                                    eC("initialZoom" + (n ? "Out" : "In")),
                                    (v = t.initialZoomLevel),
                                    eF(ef, t.initialPosition),
                                    eI(),
                                    (e.style.opacity = n ? 0 : 1),
                                    eq(1),
                                    void (p
                                        ? setTimeout(function () {
                                              f();
                                          }, p)
                                        : f())
                                );
                            (l = c),
                                (d = !o.currItem.src || o.currItem.loadError || a.showHideOpacity),
                                t.miniImg && (t.miniImg.style.webkitBackfaceVisibility = "hidden"),
                                n || ((v = h.w / t.w), (ef.x = h.x), (ef.y = h.y - P), (o[d ? "template" : "bg"].style.opacity = 0.001), eI()),
                                eX("initialZoom"),
                                n && !l && r.removeClass(e, "pswp--animated-in"),
                                d &&
                                    (n
                                        ? r[(l ? "remove" : "add") + "Class"](e, "pswp--animate_opacity")
                                        : setTimeout(function () {
                                              r.addClass(e, "pswp--animate_opacity");
                                          }, 30)),
                                (tI = setTimeout(
                                    function () {
                                        if ((eC("initialZoom" + (n ? "Out" : "In")), n)) {
                                            var i = h.w / t.w,
                                                o = { x: ef.x, y: ef.y },
                                                a = v,
                                                s = el,
                                                c = function (t) {
                                                    1 === t ? ((v = i), (ef.x = h.x), (ef.y = h.y - M)) : ((v = (i - a) * t + a), (ef.x = (h.x - o.x) * t + o.x), (ef.y = (h.y - M - o.y) * t + o.y)),
                                                        eI(),
                                                        d ? (e.style.opacity = 1 - t) : eq(s - t * s);
                                                };
                                            l ? e7("initialZoom", 0, 1, p, r.easing.cubic.out, c, f) : (c(1), (tI = setTimeout(f, p + 20)));
                                        } else (v = t.initialZoomLevel), eF(ef, t.initialPosition), eI(), eq(1), d ? (e.style.opacity = 1) : eq(1), (tI = setTimeout(f, p + 20));
                                    },
                                    n ? 25 : 90
                                ));
                        },
                        tO = {},
                        tH = [],
                        tB = {
                            index: 0,
                            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                            forceProgressiveLoading: !1,
                            preload: [1, 1],
                            getNumItemsFn: function () {
                                return tD.length;
                            },
                        },
                        tN = function () {
                            return { center: { x: 0, y: 0 }, max: { x: 0, y: 0 }, min: { x: 0, y: 0 } };
                        },
                        tR = function (e, t, i) {
                            var n = e.bounds;
                            (n.center.x = Math.round((tO.x - t) / 2)),
                                (n.center.y = Math.round((tO.y - i) / 2) + e.vGap.top),
                                (n.max.x = t > tO.x ? Math.round(tO.x - t) : n.center.x),
                                (n.max.y = i > tO.y ? Math.round(tO.y - i) + e.vGap.top : n.center.y),
                                (n.min.x = t > tO.x ? 0 : n.center.x),
                                (n.min.y = i > tO.y ? e.vGap.top : n.center.y);
                        },
                        tU = function (e, t, i) {
                            if (e.src && !e.loadError) {
                                var n = !i;
                                if ((n && (e.vGap || (e.vGap = { top: 0, bottom: 0 }), eC("parseVerticalMargin", e)), (tO.x = t.x), (tO.y = t.y - e.vGap.top - e.vGap.bottom), n)) {
                                    var r = tO.x / e.w,
                                        o = tO.y / e.h;
                                    e.fitRatio = r < o ? r : o;
                                    var s = a.scaleMode;
                                    "orig" === s ? (i = 1) : "fit" === s && (i = e.fitRatio), i > 1 && (i = 1), (e.initialZoomLevel = i), e.bounds || (e.bounds = tN());
                                }
                                if (!i) return;
                                return tR(e, e.w * i, e.h * i), n && i === e.initialZoomLevel && (e.initialPosition = e.bounds.center), e.bounds;
                            }
                            return (e.w = e.h = 0), (e.initialZoomLevel = e.fitRatio = 1), (e.bounds = tN()), (e.initialPosition = e.bounds.center), e.bounds;
                        },
                        tW = function (e, t, i, n, r, a) {
                            t.loadError ||
                                (n &&
                                    ((t.imageAppended = !0),
                                    t1(t, n, t === o.currItem && ew),
                                    i.appendChild(n),
                                    a &&
                                        setTimeout(function () {
                                            t && t.loaded && t.placeholder && ((t.placeholder.style.display = "none"), (t.placeholder = null));
                                        }, 500)));
                        },
                        t0 = function (e) {
                            (e.loading = !0), (e.loaded = !1);
                            var t = (e.img = r.createEl("pswp__img", "img")),
                                i = function () {
                                    (e.loading = !1), (e.loaded = !0), e.loadComplete ? e.loadComplete(e) : (e.img = null), (t.onload = t.onerror = null), (t = null);
                                };
                            return (
                                (t.onload = i),
                                (t.onerror = function () {
                                    (e.loadError = !0), i();
                                }),
                                (t.src = e.src),
                                t
                            );
                        },
                        tV = function (e, t) {
                            if (e.src && e.loadError && e.container) return t && (e.container.innerHTML = ""), (e.container.innerHTML = a.errorMsg.replace("%url%", e.src)), !0;
                        },
                        t1 = function (e, t, i) {
                            if (e.src) {
                                t || (t = e.container.lastChild);
                                var n = i ? e.w : Math.round(e.w * e.fitRatio),
                                    r = i ? e.h : Math.round(e.h * e.fitRatio);
                                e.placeholder && !e.loaded && ((e.placeholder.style.width = n + "px"), (e.placeholder.style.height = r + "px")), (t.style.width = n + "px"), (t.style.height = r + "px");
                            }
                        },
                        tG = function () {
                            if (tH.length) {
                                for (var e, t = 0; t < tH.length; t++) (e = tH[t]).holder.index === e.index && tW(e.index, e.item, e.baseDiv, e.img, !1, e.clearPlaceholder);
                                tH = [];
                            }
                        };
                    ex("Controller", {
                        publicMethods: {
                            lazyLoadItem: function (e) {
                                e = eL(e);
                                var t = tP(e);
                                t && ((!t.loaded && !t.loading) || $) && (eC("gettingData", e, t), t.src && t0(t));
                            },
                            initController: function () {
                                r.extend(a, tB, !0),
                                    (o.items = tD = i),
                                    (tP = o.getItemAt),
                                    (tF = a.getNumItemsFn),
                                    (tM = a.loop),
                                    3 > tF() && (a.loop = !1),
                                    e_("beforeChange", function (e) {
                                        var t,
                                            i = a.preload,
                                            n = null === e || e >= 0,
                                            r = Math.min(i[0], tF()),
                                            s = Math.min(i[1], tF());
                                        for (t = 1; t <= (n ? s : r); t++) o.lazyLoadItem(u + t);
                                        for (t = 1; t <= (n ? r : s); t++) o.lazyLoadItem(u - t);
                                    }),
                                    e_("initialLayout", function () {
                                        o.currItem.initialLayout = a.getThumbBoundsFn && a.getThumbBoundsFn(u);
                                    }),
                                    e_("mainScrollAnimComplete", tG),
                                    e_("initialZoomInEnd", tG),
                                    e_("destroy", function () {
                                        for (var e, t = 0; t < tD.length; t++)
                                            (e = tD[t]).container && (e.container = null), e.placeholder && (e.placeholder = null), e.img && (e.img = null), e.preloader && (e.preloader = null), e.loadError && (e.loaded = e.loadError = !1);
                                        tH = null;
                                    });
                            },
                            getItemAt: function (e) {
                                return e >= 0 && void 0 !== tD[e] && tD[e];
                            },
                            allowProgressiveImg: function () {
                                return a.forceProgressiveLoading || !I || a.mouseUsed || screen.width > 1200;
                            },
                            setContent: function (e, t) {
                                a.loop && (t = eL(t));
                                var i = o.getItemAt(e.index);
                                i && (i.container = null);
                                var n,
                                    l = o.getItemAt(t);
                                if (!l) return void (e.el.innerHTML = "");
                                eC("gettingData", t, l), (e.index = t), (e.item = l);
                                var c = (l.container = r.createEl("pswp__zoom-wrap"));
                                if ((!l.src && l.html && (l.html.tagName ? c.appendChild(l.html) : (c.innerHTML = l.html)), tV(l), tU(l, em), !l.src || l.loadError || l.loaded))
                                    l.src && !l.loadError && (((n = r.createEl("pswp__img", "img")).style.opacity = 1), (n.src = l.src), t1(l, n), tW(t, l, c, n, !0));
                                else {
                                    if (
                                        ((l.loadComplete = function (i) {
                                            if (s) {
                                                if (e && e.index === t) {
                                                    if (tV(i, !0)) return (i.loadComplete = i.img = null), tU(i, em), eD(i), void (e.index === u && o.updateCurrZoomItem());
                                                    i.imageAppended
                                                        ? !tT && i.placeholder && ((i.placeholder.style.display = "none"), (i.placeholder = null))
                                                        : z.transform && (er || tT)
                                                        ? tH.push({ item: i, baseDiv: c, img: i.img, index: t, holder: e, clearPlaceholder: !0 })
                                                        : tW(t, i, c, i.img, er || tT, !0);
                                                }
                                                (i.loadComplete = null), (i.img = null), eC("imageLoadComplete", t, i);
                                            }
                                        }),
                                        r.features.transform)
                                    ) {
                                        var d = "pswp__img pswp__img--placeholder";
                                        d += l.msrc ? "" : " pswp__img--placeholder--blank";
                                        var h = r.createEl(d, l.msrc ? "img" : "");
                                        l.msrc && (h.src = l.msrc), t1(l, h), c.appendChild(h), (l.placeholder = h);
                                    }
                                    l.loading || t0(l), o.allowProgressiveImg() && (!tj && z.transform ? tH.push({ item: l, baseDiv: c, img: l.img, index: t, holder: e }) : tW(t, l, c, l.img, !0, !0));
                                }
                                tj || t !== u ? eD(l) : ((en = c.style), tz(l, n || l.img)), (e.el.innerHTML = ""), e.el.appendChild(c);
                            },
                            cleanSlide: function (e) {
                                e.img && (e.img.onload = e.img.onerror = null), (e.loaded = e.loading = e.img = e.imageAppended = !1);
                            },
                        },
                    });
                    var t3,
                        t9 = {},
                        tZ = function (e, t, i) {
                            var n = document.createEvent("CustomEvent"),
                                r = { origEvent: e, target: e.target, releasePoint: t, pointerType: i || "touch" };
                            n.initCustomEvent("pswpTap", !0, !0, r), e.target.dispatchEvent(n);
                        };
                    ex("Tap", {
                        publicMethods: {
                            initTap: function () {
                                e_("firstTouchStart", o.onTapStart),
                                    e_("touchRelease", o.onTapRelease),
                                    e_("destroy", function () {
                                        (t9 = {}), (t3 = null);
                                    });
                            },
                            onTapStart: function (e) {
                                e.length > 1 && (clearTimeout(t3), (t3 = null));
                            },
                            onTapRelease: function (e, t) {
                                if (t && !X && !G && !e9) {
                                    var i,
                                        n,
                                        o = t;
                                    if (t3 && (clearTimeout(t3), (t3 = null), (i = o), (n = t9), 25 > Math.abs(i.x - n.x) && 25 > Math.abs(i.y - n.y))) return void eC("doubleTap", o);
                                    if ("mouse" === t.type) return void tZ(e, t, "mouse");
                                    if ("BUTTON" === e.target.tagName.toUpperCase() || r.hasClass(e.target, "pswp__single-tap")) return void tZ(e, t);
                                    eF(t9, o),
                                        (t3 = setTimeout(function () {
                                            tZ(e, t), (t3 = null);
                                        }, 300));
                                }
                            },
                        },
                    }),
                        ex("DesktopZoom", {
                            publicMethods: {
                                initDesktopZoom: function () {
                                    F ||
                                        (I
                                            ? e_("mouseUsed", function () {
                                                  o.setupDesktopZoom();
                                              })
                                            : o.setupDesktopZoom(!0));
                                },
                                setupDesktopZoom: function (t) {
                                    tX = {};
                                    var i = "wheel mousewheel DOMMouseScroll";
                                    e_("bindEvents", function () {
                                        r.bind(e, i, o.handleMouseWheel);
                                    }),
                                        e_("unbindEvents", function () {
                                            tX && r.unbind(e, i, o.handleMouseWheel);
                                        }),
                                        (o.mouseZoomedIn = !1);
                                    var n,
                                        a = function () {
                                            o.mouseZoomedIn && (r.removeClass(e, "pswp--zoomed-in"), (o.mouseZoomedIn = !1)), v < 1 ? r.addClass(e, "pswp--zoom-allowed") : r.removeClass(e, "pswp--zoom-allowed"), s();
                                        },
                                        s = function () {
                                            n && (r.removeClass(e, "pswp--dragging"), (n = !1));
                                        };
                                    e_("resize", a),
                                        e_("afterChange", a),
                                        e_("pointerDown", function () {
                                            o.mouseZoomedIn && ((n = !0), r.addClass(e, "pswp--dragging"));
                                        }),
                                        e_("pointerUp", s),
                                        t || a();
                                },
                                handleMouseWheel: function (e) {
                                    if (v <= o.currItem.fitRatio) return a.modal && (!a.closeOnScroll || e9 || V ? e.preventDefault() : q && Math.abs(e.deltaY) > 2 && ((c = !0), o.close())), !0;
                                    if ((e.stopPropagation(), (tX.x = 0), "deltaX" in e)) 1 === e.deltaMode ? ((tX.x = 18 * e.deltaX), (tX.y = 18 * e.deltaY)) : ((tX.x = e.deltaX), (tX.y = e.deltaY));
                                    else if ("wheelDelta" in e) e.wheelDeltaX && (tX.x = -0.16 * e.wheelDeltaX), e.wheelDeltaY ? (tX.y = -0.16 * e.wheelDeltaY) : (tX.y = -0.16 * e.wheelDelta);
                                    else {
                                        if (!("detail" in e)) return;
                                        tX.y = e.detail;
                                    }
                                    eN(v, !0);
                                    var t = ef.x - tX.x,
                                        i = ef.y - tX.y;
                                    (a.modal || (t <= ei.min.x && t >= ei.max.x && i <= ei.min.y && i >= ei.max.y)) && e.preventDefault(), o.panTo(t, i);
                                },
                                toggleDesktopZoom: function (t) {
                                    t = t || { x: em.x / 2 + ey.x, y: em.y / 2 + ey.y };
                                    var i = a.getDoubleTapZoom(!0, o.currItem),
                                        n = v === i;
                                    (o.mouseZoomedIn = !n), o.zoomTo(n ? o.currItem.initialZoomLevel : i, t, 333), r[(n ? "remove" : "add") + "Class"](e, "pswp--zoomed-in");
                                },
                            },
                        });
                    var tX,
                        tK,
                        t7,
                        t2,
                        tQ,
                        tY,
                        t5,
                        t4,
                        t6,
                        tJ,
                        ie,
                        it,
                        ii,
                        ir = { history: !0, galleryUID: 1 },
                        io = function () {
                            return it.hash.substring(1);
                        },
                        ia = function () {
                            tK && clearTimeout(tK), t2 && clearTimeout(t2);
                        },
                        is = function () {
                            var e = io(),
                                t = {};
                            if (e.length < 5) return t;
                            var i,
                                n = e.split("&");
                            for (i = 0; i < n.length; i++)
                                if (n[i]) {
                                    var r = n[i].split("=");
                                    r.length < 2 || (t[r[0]] = r[1]);
                                }
                            if (a.galleryPIDs) {
                                var o = t.pid;
                                for (t.pid = 0, i = 0; i < tD.length; i++)
                                    if (tD[i].pid === o) {
                                        t.pid = i;
                                        break;
                                    }
                            } else t.pid = parseInt(t.pid, 10) - 1;
                            return t.pid < 0 && (t.pid = 0), t;
                        },
                        il = function () {
                            if ((t2 && clearTimeout(t2), e9 || V)) return void (t2 = setTimeout(il, 500));
                            tQ ? clearTimeout(t7) : (tQ = !0);
                            var e = u + 1,
                                t = tP(u);
                            t.hasOwnProperty("pid") && (e = t.pid);
                            var i = t4 + "&gid=" + a.galleryUID + "&pid=" + e;
                            t6 || (-1 === it.hash.indexOf(i) && (ie = !0));
                            var n = it.href.split("#")[0] + "#" + i;
                            ii ? "#" + i !== window.location.hash && history[t6 ? "replaceState" : "pushState"]("", document.title, n) : t6 ? it.replace(n) : (it.hash = i),
                                (t6 = !0),
                                (t7 = setTimeout(function () {
                                    tQ = !1;
                                }, 60));
                        };
                    ex("History", {
                        publicMethods: {
                            initHistory: function () {
                                if ((r.extend(a, ir, !0), a.history)) {
                                    (it = window.location),
                                        (ie = !1),
                                        (tJ = !1),
                                        (t6 = !1),
                                        (t4 = io()),
                                        (ii = "pushState" in history),
                                        t4.indexOf("gid=") > -1 && (t4 = (t4 = t4.split("&gid=")[0]).split("?gid=")[0]),
                                        e_("afterChange", o.updateURL),
                                        e_("unbindEvents", function () {
                                            r.unbind(window, "hashchange", o.onHashChange);
                                        });
                                    var e = function () {
                                        (t5 = !0), tJ || (ie ? history.back() : t4 ? (it.hash = t4) : ii ? history.pushState("", document.title, it.pathname + it.search) : (it.hash = "")), ia();
                                    };
                                    e_("unbindEvents", function () {
                                        c && e();
                                    }),
                                        e_("destroy", function () {
                                            t5 || e();
                                        }),
                                        e_("firstUpdate", function () {
                                            u = is().pid;
                                        });
                                    var t = t4.indexOf("pid=");
                                    t > -1 && "&" === (t4 = t4.substring(0, t)).slice(-1) && (t4 = t4.slice(0, -1)),
                                        setTimeout(function () {
                                            s && r.bind(window, "hashchange", o.onHashChange);
                                        }, 40);
                                }
                            },
                            onHashChange: function () {
                                return io() === t4 ? ((tJ = !0), void o.close()) : void (tQ || ((tY = !0), o.goTo(is().pid), (tY = !1)));
                            },
                            updateURL: function () {
                                ia(), tY || (t6 ? (tK = setTimeout(il, 800)) : il());
                            },
                        },
                    }),
                        r.extend(o, {
                            shout: eC,
                            listen: e_,
                            viewportSize: em,
                            options: a,
                            isMainScrollAnimating: function () {
                                return er;
                            },
                            getZoomLevel: function () {
                                return v;
                            },
                            getCurrentIndex: function () {
                                return u;
                            },
                            isDragging: function () {
                                return V;
                            },
                            isZooming: function () {
                                return J;
                            },
                            setScrollOffset: function (e, t) {
                                (ey.x = e), (M = ey.y = t), eC("updateScrollOffset", ey);
                            },
                            applyZoomPan: function (e, t, i, n) {
                                (ef.x = t), (ef.y = i), (v = e), eI(n);
                            },
                            init: function () {
                                if (!s && !l) {
                                    (o.framework = r),
                                        (o.template = e),
                                        (o.bg = r.getChildByClass(e, "pswp__bg")),
                                        (T = e.className),
                                        (s = !0),
                                        (D = (z = r.detectFeatures()).raf),
                                        (j = z.caf),
                                        (q = z.transform),
                                        (F = z.oldIE),
                                        (o.scrollWrap = r.getChildByClass(e, "pswp__scroll-wrap")),
                                        (o.container = r.getChildByClass(o.scrollWrap, "pswp__container")),
                                        (d = o.container.style),
                                        (o.itemHolders = E = [
                                            { el: o.container.children[0], wrap: 0, index: -1 },
                                            { el: o.container.children[1], wrap: 0, index: -1 },
                                            { el: o.container.children[2], wrap: 0, index: -1 },
                                        ]),
                                        (E[0].el.style.display = E[2].el.style.display = "none"),
                                        e0(),
                                        (m = {
                                            resize: o.updateSize,
                                            orientationchange: function () {
                                                clearTimeout(O),
                                                    (O = setTimeout(function () {
                                                        em.x !== o.scrollWrap.clientWidth && o.updateSize();
                                                    }, 500));
                                            },
                                            scroll: eG,
                                            keydown: eV,
                                            click: e1,
                                        });
                                    var i,
                                        n = z.isOldIOSPhone || z.isOldAndroid || z.isMobileOpera;
                                    for ((z.animationName && z.transform && !n) || (a.showAnimationDuration = a.hideAnimationDuration = 0), i = 0; i < e$.length; i++) o["init" + e$[i]]();
                                    t && (o.ui = new t(o, r)).init(),
                                        eC("firstUpdate"),
                                        (u = u || a.index || 0),
                                        (isNaN(u) || u < 0 || u >= tF()) && (u = 0),
                                        (o.currItem = tP(u)),
                                        (z.isOldIOSPhone || z.isOldAndroid) && (eS = !1),
                                        e.setAttribute("aria-hidden", "false"),
                                        a.modal && (eS ? (e.style.position = "fixed") : ((e.style.position = "absolute"), (e.style.top = r.getScrollY() + "px"))),
                                        void 0 === M && (eC("initialLayout"), (M = P = r.getScrollY()));
                                    var c = "pswp--open ";
                                    for (
                                        a.mainClass && (c += a.mainClass + " "),
                                            a.showHideOpacity && (c += "pswp--animate_opacity "),
                                            c += I ? "pswp--touch" : "pswp--notouch",
                                            c += z.animationName ? " pswp--css_animation" : "",
                                            c += z.svg ? " pswp--svg" : "",
                                            r.addClass(e, c),
                                            o.updateSize(),
                                            h = -1,
                                            eb = null,
                                            i = 0;
                                        i < 3;
                                        i++
                                    )
                                        ej((i + h) * eg.x, E[i].el.style);
                                    F || r.bind(o.scrollWrap, f, o),
                                        e_("initialZoomInEnd", function () {
                                            o.setContent(E[0], u - 1), o.setContent(E[2], u + 1), (E[0].el.style.display = E[2].el.style.display = "block"), a.focus && e.focus(), eH();
                                        }),
                                        o.setContent(E[1], u),
                                        o.updateCurrItem(),
                                        eC("afterInit"),
                                        eS ||
                                            (S = setInterval(function () {
                                                e9 || V || J || v !== o.currItem.initialZoomLevel || o.updateSize();
                                            }, 1e3)),
                                        r.addClass(e, "pswp--visible");
                                }
                            },
                            close: function () {
                                s && ((s = !1), (l = !0), eC("close"), eB(), tz(o.currItem, null, !0, o.destroy));
                            },
                            destroy: function () {
                                eC("destroy"), tI && clearTimeout(tI), e.setAttribute("aria-hidden", "true"), (e.className = T), S && clearInterval(S), r.unbind(o.scrollWrap, f, o), r.unbind(window, "scroll", o), tc(), eK(), (e8 = null);
                            },
                            panTo: function (e, t, i) {
                                i || (e > ei.min.x ? (e = ei.min.x) : e < ei.max.x && (e = ei.max.x), t > ei.min.y ? (t = ei.min.y) : t < ei.max.y && (t = ei.max.y)), (ef.x = e), (ef.y = t), eI();
                            },
                            handleEvent: function (e) {
                                m[(e = e || window.event).type] && m[e.type](e);
                            },
                            goTo: function (e) {
                                var t = (e = eL(e)) - u;
                                (eb = t), (u = e), (o.currItem = tP(u)), (ev -= t), eT(eg.x * ev), eK(), (er = !1), o.updateCurrItem();
                            },
                            next: function () {
                                o.goTo(u + 1);
                            },
                            prev: function () {
                                o.goTo(u - 1);
                            },
                            updateCurrZoomItem: function (e) {
                                if ((e && eC("beforeChange", 0), E[1].el.children.length)) {
                                    var t = E[1].el.children[0];
                                    en = r.hasClass(t, "pswp__zoom-wrap") ? t.style : null;
                                } else en = null;
                                (ei = o.currItem.bounds), (y = v = o.currItem.initialZoomLevel), (ef.x = ei.center.x), (ef.y = ei.center.y), e && eC("afterChange");
                            },
                            invalidateCurrItems: function () {
                                $ = !0;
                                for (var e = 0; e < 3; e++) E[e].item && (E[e].item.needsUpdate = !0);
                            },
                            updateCurrItem: function (e) {
                                if (0 !== eb) {
                                    var t,
                                        i = Math.abs(eb);
                                    if (!(e && i < 2)) {
                                        (o.currItem = tP(u)), (ew = !1), eC("beforeChange", eb), i >= 3 && ((h += eb + (eb > 0 ? -3 : 3)), (i = 3));
                                        for (var n = 0; n < i; n++)
                                            eb > 0
                                                ? ((t = E.shift()), (E[2] = t), ej((++h + 2) * eg.x, t.el.style), o.setContent(t, u - i + n + 1 + 1))
                                                : ((t = E.pop()), E.unshift(t), ej(--h * eg.x, t.el.style), o.setContent(t, u + i - n - 1 - 1));
                                        if (en && 1 === Math.abs(eb)) {
                                            var r = tP(w);
                                            r.initialZoomLevel !== v && (tU(r, em), t1(r), eD(r));
                                        }
                                        (eb = 0), o.updateCurrZoomItem(), (w = u), eC("afterChange");
                                    }
                                }
                            },
                            updateSize: function (t) {
                                if (!eS && a.modal) {
                                    var i = r.getScrollY();
                                    if ((M !== i && ((e.style.top = i + "px"), (M = i)), !t && eE.x === window.innerWidth && eE.y === window.innerHeight)) return;
                                    (eE.x = window.innerWidth), (eE.y = window.innerHeight), (e.style.height = eE.y + "px");
                                }
                                if (((em.x = o.scrollWrap.clientWidth), (em.y = o.scrollWrap.clientHeight), eG(), (eg.x = em.x + Math.round(em.x * a.spacing)), (eg.y = em.y), eT(eg.x * ev), eC("beforeResize"), void 0 !== h)) {
                                    for (var n, s, l, c = 0; c < 3; c++)
                                        (n = E[c]),
                                            ej((c + h) * eg.x, n.el.style),
                                            (l = u + c - 1),
                                            a.loop && tF() > 2 && (l = eL(l)),
                                            (s = tP(l)) && ($ || s.needsUpdate || !s.bounds)
                                                ? (o.cleanSlide(s), o.setContent(n, l), 1 === c && ((o.currItem = s), o.updateCurrZoomItem(!0)), (s.needsUpdate = !1))
                                                : -1 === n.index && l >= 0 && o.setContent(n, l),
                                            s && s.container && (tU(s, em), t1(s), eD(s));
                                    $ = !1;
                                }
                                (y = v = o.currItem.initialZoomLevel), (ei = o.currItem.bounds) && ((ef.x = ei.center.x), (ef.y = ei.center.y), eI(!0)), eC("resize");
                            },
                            zoomTo: function (e, t, i, n, o) {
                                t && ((y = v), (ta.x = Math.abs(t.x) - ef.x), (ta.y = Math.abs(t.y) - ef.y), eF(ep, ef));
                                var a = eN(e, !1),
                                    s = {};
                                eW("x", a, s, e), eW("y", a, s, e);
                                var l = v,
                                    c = { x: ef.x, y: ef.y };
                                eM(s);
                                var u = function (t) {
                                    1 === t ? ((v = e), (ef.x = s.x), (ef.y = s.y)) : ((v = (e - l) * t + l), (ef.x = (s.x - c.x) * t + c.x), (ef.y = (s.y - c.y) * t + c.y)), o && o(t), eI(1 === t);
                                };
                                i ? e7("customZoomTo", 0, 1, i, n || r.easing.sine.inOut, u) : u(1);
                            },
                        });
                };
            }),
            "function" == typeof define && define.amd ? define(i) : "object" == typeof exports ? (module.exports = i()) : (t.PhotoSwipe = i()),
            (n = this),
            (r = function () {
                return function (e, t) {
                    var i,
                        n,
                        r,
                        o,
                        a,
                        s,
                        l,
                        c,
                        u,
                        d,
                        h,
                        p,
                        f,
                        m,
                        v,
                        y,
                        g,
                        b,
                        S,
                        $ = this,
                        E = !1,
                        w = !0,
                        x = !0,
                        L = {
                            barsSize: { top: 44, bottom: "auto" },
                            closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                            timeToIdle: 4e3,
                            timeToIdleOutside: 1e3,
                            loadingIndicatorDelay: 1e3,
                            addCaptionHTMLFn: function (e, t) {
                                return e.title ? ((t.children[0].innerHTML = e.title), !0) : ((t.children[0].innerHTML = ""), !1);
                            },
                            closeEl: !0,
                            captionEl: !0,
                            fullscreenEl: !0,
                            zoomEl: !0,
                            shareEl: !0,
                            counterEl: !0,
                            arrowEl: !0,
                            preloaderEl: !0,
                            tapToClose: !1,
                            tapToToggleControls: !0,
                            clickToCloseNonZoomable: !0,
                            shareButtons: [
                                { id: "facebook", label: "Share on Facebook", url: "https://www.facebook.com/sharer/sharer.php?u={{url}}" },
                                { id: "twitter", label: "Tweet", url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}" },
                                { id: "pinterest", label: "Pin it", url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}" },
                                { id: "download", label: "Download image", url: "{{raw_image_url}}", download: !0 },
                            ],
                            getImageURLForShare: function () {
                                return e.currItem.src || "";
                            },
                            getPageURLForShare: function () {
                                return window.location.href;
                            },
                            getTextForShare: function () {
                                return e.currItem.title || "";
                            },
                            indexIndicatorSep: " / ",
                            fitControlsWidth: 1200,
                        },
                        C = function (e) {
                            if (y) return !0;
                            (e = e || window.event), v.timeToIdle && v.mouseUsed && !u && F();
                            for (var i, n, r = e.target || e.srcElement, o = r.getAttribute("class") || "", a = 0; a < U.length; a++) (i = U[a]).onTap && o.indexOf("pswp__" + i.name) > -1 && (i.onTap(), (n = !0));
                            n &&
                                (e.stopPropagation && e.stopPropagation(),
                                (y = !0),
                                (g = setTimeout(
                                    function () {
                                        y = !1;
                                    },
                                    t.features.isOldAndroid ? 600 : 30
                                )));
                        },
                        k = function (e, i, n) {
                            t[(n ? "add" : "remove") + "Class"](e, "pswp__" + i);
                        },
                        q = function () {
                            var e = 1 === v.getNumItemsFn();
                            e !== m && (k(n, "ui--one-slide", e), (m = e));
                        },
                        A = function () {
                            k(l, "share-modal--hidden", x);
                        },
                        I = function () {
                            return (
                                (x = !x)
                                    ? (t.removeClass(l, "pswp__share-modal--fade-in"),
                                      setTimeout(function () {
                                          x && A();
                                      }, 300))
                                    : (A(),
                                      setTimeout(function () {
                                          x || t.addClass(l, "pswp__share-modal--fade-in");
                                      }, 30)),
                                x || j(),
                                !1
                            );
                        },
                        D = function (t) {
                            var i = (t = t || window.event).target || t.srcElement;
                            return (
                                e.shout("shareLinkClick", t, i),
                                !!i.href &&
                                    (!!i.hasAttribute("download") ||
                                        (window.open(i.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)),
                                        x || I(),
                                        !1))
                            );
                        },
                        j = function () {
                            for (var e, t, i, n, r, o = "", a = 0; a < v.shareButtons.length; a++)
                                (e = v.shareButtons[a]),
                                    (i = v.getImageURLForShare(e)),
                                    (n = v.getPageURLForShare(e)),
                                    (r = v.getTextForShare(e)),
                                    (t = e.url.replace("{{url}}", encodeURIComponent(n)).replace("{{image_url}}", encodeURIComponent(i)).replace("{{raw_image_url}}", i).replace("{{text}}", encodeURIComponent(r))),
                                    (o += '<a href="' + t + '" target="_blank" class="pswp__share--' + e.id + '"' + (e.download ? "download" : "") + ">" + e.label + "</a>"),
                                    v.parseShareButtonOut && (o = v.parseShareButtonOut(e, o));
                            (l.children[0].innerHTML = o), (l.children[0].onclick = D);
                        },
                        T = function (e) {
                            for (var i = 0; i < v.closeElClasses.length; i++) if (t.hasClass(e, "pswp__" + v.closeElClasses[i])) return !0;
                        },
                        P = 0,
                        F = function () {
                            clearTimeout(S), (P = 0), u && $.setIdle(!1);
                        },
                        M = function (e) {
                            var t = (e = e || window.event).relatedTarget || e.toElement;
                            (t && "HTML" !== t.nodeName) ||
                                (clearTimeout(S),
                                (S = setTimeout(function () {
                                    $.setIdle(!0);
                                }, v.timeToIdleOutside)));
                        },
                        z = function () {
                            v.fullscreenEl &&
                                !t.features.isOldAndroid &&
                                (i || (i = $.getFullscreenAPI()), i ? (t.bind(document, i.eventK, $.updateFullscreen), $.updateFullscreen(), t.addClass(e.template, "pswp--supports-fs")) : t.removeClass(e.template, "pswp--supports-fs"));
                        },
                        O = function () {
                            v.preloaderEl &&
                                (H(!0),
                                d("beforeChange", function () {
                                    clearTimeout(f),
                                        (f = setTimeout(function () {
                                            e.currItem && e.currItem.loading ? (e.allowProgressiveImg() && (!e.currItem.img || e.currItem.img.naturalWidth)) || H(!1) : H(!0);
                                        }, v.loadingIndicatorDelay));
                                }),
                                d("imageLoadComplete", function (t, i) {
                                    e.currItem === i && H(!0);
                                }));
                        },
                        H = function (e) {
                            p !== e && (k(h, "preloader--active", !e), (p = e));
                        },
                        B = function (i) {
                            var a = i.vGap;
                            if (!e.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth) {
                                var s = v.barsSize;
                                if (v.captionEl && "auto" === s.bottom) {
                                    if ((o || ((o = t.createEl("pswp__caption pswp__caption--fake")).appendChild(t.createEl("pswp__caption__center")), n.insertBefore(o, r), t.addClass(n, "pswp__ui--fit")), v.addCaptionHTMLFn(i, o, !0))) {
                                        var l = o.clientHeight;
                                        a.bottom = parseInt(l, 10) || 44;
                                    } else a.bottom = s.top;
                                } else a.bottom = "auto" === s.bottom ? 0 : s.bottom;
                                a.top = s.top;
                            } else a.top = a.bottom = 0;
                        },
                        N = function () {
                            v.timeToIdle &&
                                d("mouseUsed", function () {
                                    t.bind(document, "mousemove", F),
                                        t.bind(document, "mouseout", M),
                                        (b = setInterval(function () {
                                            2 == ++P && $.setIdle(!0);
                                        }, v.timeToIdle / 2));
                                });
                        },
                        R = function () {
                            var e;
                            d("onVerticalDrag", function (e) {
                                w && e < 0.95 ? $.hideControls() : !w && e >= 0.95 && $.showControls();
                            }),
                                d("onPinchClose", function (t) {
                                    w && t < 0.9 ? ($.hideControls(), (e = !0)) : e && !w && t > 0.9 && $.showControls();
                                }),
                                d("zoomGestureEnded", function () {
                                    e = !1;
                                });
                        },
                        U = [
                            {
                                name: "caption",
                                option: "captionEl",
                                onInit: function (e) {
                                    r = e;
                                },
                            },
                            {
                                name: "share-modal",
                                option: "shareEl",
                                onInit: function (e) {
                                    l = e;
                                },
                                onTap: function () {
                                    I();
                                },
                            },
                            {
                                name: "button--share",
                                option: "shareEl",
                                onInit: function (e) {
                                    s = e;
                                },
                                onTap: function () {
                                    I();
                                },
                            },
                            { name: "button--zoom", option: "zoomEl", onTap: e.toggleDesktopZoom },
                            {
                                name: "counter",
                                option: "counterEl",
                                onInit: function (e) {
                                    a = e;
                                },
                            },
                            { name: "button--close", option: "closeEl", onTap: e.close },
                            { name: "button--arrow--left", option: "arrowEl", onTap: e.prev },
                            { name: "button--arrow--right", option: "arrowEl", onTap: e.next },
                            {
                                name: "button--fs",
                                option: "fullscreenEl",
                                onTap: function () {
                                    i.isFullscreen() ? i.exit() : i.enter();
                                },
                            },
                            {
                                name: "preloader",
                                option: "preloaderEl",
                                onInit: function (e) {
                                    h = e;
                                },
                            },
                        ],
                        W = function () {
                            var e,
                                i,
                                r,
                                o = function (n) {
                                    if (n)
                                        for (var o = n.length, a = 0; a < o; a++) {
                                            i = (e = n[a]).className;
                                            for (var s = 0; s < U.length; s++)
                                                (r = U[s]), i.indexOf("pswp__" + r.name) > -1 && (v[r.option] ? (t.removeClass(e, "pswp__element--disabled"), r.onInit && r.onInit(e)) : t.addClass(e, "pswp__element--disabled"));
                                        }
                                };
                            o(n.children);
                            var a = t.getChildByClass(n, "pswp__top-bar");
                            a && o(a.children);
                        };
                    ($.init = function () {
                        t.extend(e.options, L, !0),
                            (v = e.options),
                            (n = t.getChildByClass(e.scrollWrap, "pswp__ui")),
                            (d = e.listen),
                            R(),
                            d("beforeChange", $.update),
                            d("doubleTap", function (t) {
                                var i = e.currItem.initialZoomLevel;
                                e.getZoomLevel() !== i ? e.zoomTo(i, t, 333) : e.zoomTo(v.getDoubleTapZoom(!1, e.currItem), t, 333);
                            }),
                            d("preventDragEvent", function (e, t, i) {
                                var n = e.target || e.srcElement;
                                n && n.getAttribute("class") && e.type.indexOf("mouse") > -1 && (n.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(n.tagName)) && (i.prevent = !1);
                            }),
                            d("bindEvents", function () {
                                t.bind(n, "pswpTap click", C), t.bind(e.scrollWrap, "pswpTap", $.onGlobalTap), e.likelyTouchDevice || t.bind(e.scrollWrap, "mouseover", $.onMouseOver);
                            }),
                            d("unbindEvents", function () {
                                x || I(),
                                    b && clearInterval(b),
                                    t.unbind(document, "mouseout", M),
                                    t.unbind(document, "mousemove", F),
                                    t.unbind(n, "pswpTap click", C),
                                    t.unbind(e.scrollWrap, "pswpTap", $.onGlobalTap),
                                    t.unbind(e.scrollWrap, "mouseover", $.onMouseOver),
                                    i && (t.unbind(document, i.eventK, $.updateFullscreen), i.isFullscreen() && ((v.hideAnimationDuration = 0), i.exit()), (i = null));
                            }),
                            d("destroy", function () {
                                v.captionEl && (o && n.removeChild(o), t.removeClass(r, "pswp__caption--empty")),
                                    l && (l.children[0].onclick = null),
                                    t.removeClass(n, "pswp__ui--over-close"),
                                    t.addClass(n, "pswp__ui--hidden"),
                                    $.setIdle(!1);
                            }),
                            v.showAnimationDuration || t.removeClass(n, "pswp__ui--hidden"),
                            d("initialZoomIn", function () {
                                v.showAnimationDuration && t.removeClass(n, "pswp__ui--hidden");
                            }),
                            d("initialZoomOut", function () {
                                t.addClass(n, "pswp__ui--hidden");
                            }),
                            d("parseVerticalMargin", B),
                            W(),
                            v.shareEl && s && l && (x = !0),
                            q(),
                            N(),
                            z(),
                            O();
                    }),
                        ($.setIdle = function (e) {
                            (u = e), k(n, "ui--idle", e);
                        }),
                        ($.update = function () {
                            w && e.currItem ? ($.updateIndexIndicator(), v.captionEl && (v.addCaptionHTMLFn(e.currItem, r), k(r, "caption--empty", !e.currItem.title)), (E = !0)) : (E = !1), x || I(), q();
                        }),
                        ($.updateFullscreen = function (n) {
                            n &&
                                setTimeout(function () {
                                    e.setScrollOffset(0, t.getScrollY());
                                }, 50),
                                t[(i.isFullscreen() ? "add" : "remove") + "Class"](e.template, "pswp--fs");
                        }),
                        ($.updateIndexIndicator = function () {
                            v.counterEl && (a.innerHTML = e.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn());
                        }),
                        ($.onGlobalTap = function (i) {
                            var n = (i = i || window.event).target || i.srcElement;
                            if (!y) {
                                if (i.detail && "mouse" === i.detail.pointerType) {
                                    if (T(n)) return void e.close();
                                    t.hasClass(n, "pswp__img") && (1 === e.getZoomLevel() && e.getZoomLevel() <= e.currItem.fitRatio ? v.clickToCloseNonZoomable && e.close() : e.toggleDesktopZoom(i.detail.releasePoint));
                                } else if ((v.tapToToggleControls && (w ? $.hideControls() : $.showControls()), v.tapToClose && (t.hasClass(n, "pswp__img") || T(n)))) return void e.close();
                            }
                        }),
                        ($.onMouseOver = function (e) {
                            k(n, "ui--over-close", T((e = e || window.event).target || e.srcElement));
                        }),
                        ($.hideControls = function () {
                            t.addClass(n, "pswp__ui--hidden"), (w = !1);
                        }),
                        ($.showControls = function () {
                            (w = !0), E || $.update(), t.removeClass(n, "pswp__ui--hidden");
                        }),
                        ($.supportsFullscreen = function () {
                            var e = document;
                            return !!(e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen);
                        }),
                        ($.getFullscreenAPI = function () {
                            var t,
                                i = document.documentElement,
                                n = "fullscreenchange";
                            return (
                                i.requestFullscreen
                                    ? (t = { enterK: "requestFullscreen", exitK: "exitFullscreen", elementK: "fullscreenElement", eventK: n })
                                    : i.mozRequestFullScreen
                                    ? (t = { enterK: "mozRequestFullScreen", exitK: "mozCancelFullScreen", elementK: "mozFullScreenElement", eventK: "moz" + n })
                                    : i.webkitRequestFullscreen
                                    ? (t = { enterK: "webkitRequestFullscreen", exitK: "webkitExitFullscreen", elementK: "webkitFullscreenElement", eventK: "webkit" + n })
                                    : i.msRequestFullscreen && (t = { enterK: "msRequestFullscreen", exitK: "msExitFullscreen", elementK: "msFullscreenElement", eventK: "MSFullscreenChange" }),
                                t &&
                                    ((t.enter = function () {
                                        return (c = v.closeOnScroll), (v.closeOnScroll = !1), "webkitRequestFullscreen" !== this.enterK ? e.template[this.enterK]() : void e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT);
                                    }),
                                    (t.exit = function () {
                                        return (v.closeOnScroll = c), document[this.exitK]();
                                    }),
                                    (t.isFullscreen = function () {
                                        return document[this.elementK];
                                    })),
                                t
                            );
                        });
                };
            }),
            "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? (module.exports = r()) : (n.PhotoSwipeUI_Default = r());
    })(),
    (function e() {
        var t, i, n, r, o, a, s, l, c, u, d, h, p, f, m, v, y, g, b, S, $, E, w, x, L, C, k, q, A, I, D, j, T, P, F, M, z, O, H, B, N, R, U, W, V, G;
        (t = window),
            (i = function (e, t) {
                "use strict";
                var i = Array.prototype.slice,
                    n = e.console,
                    r =
                        void 0 === n
                            ? function () {}
                            : function (e) {
                                  n.error(e);
                              };
                function o(n, o, s) {
                    (s = s || t || e.jQuery) &&
                        (o.prototype.option ||
                            (o.prototype.option = function (e) {
                                s.isPlainObject(e) && (this.options = s.extend(!0, this.options, e));
                            }),
                        (s.fn[n] = function (e) {
                            var t, a, l, c, u;
                            return "string" == typeof e
                                ? ((t = this),
                                  (a = e),
                                  (l = i.call(arguments, 1)),
                                  (u = "$()." + n + '("' + a + '")'),
                                  t.each(function (e, t) {
                                      var i = s.data(t, n);
                                      if (i) {
                                          var o = i[a];
                                          if (o && "_" != a.charAt(0)) {
                                              var d = o.apply(i, l);
                                              c = void 0 === c ? d : c;
                                          } else r(u + " is not a valid method");
                                      } else r(n + " not initialized. Cannot call methods, i.e. " + u);
                                  }),
                                  void 0 !== c ? c : t)
                                : ((function (e, t) {
                                      e.each(function (e, i) {
                                          var r = s.data(i, n);
                                          r ? (r.option(t), r._init()) : ((r = new o(i, t)), s.data(i, n, r));
                                      });
                                  })(this, e),
                                  this);
                        }),
                        a(s));
                }
                function a(e) {
                    !e || (e && e.bridget) || (e.bridget = o);
                }
                return a(t || e.jQuery), o;
            }),
            "function" == typeof define && define.amd
                ? define("jquery-bridget/jquery-bridget", ["jquery"], function (e) {
                      return i(t, e);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = i(t, require("jquery")))
                : (t.jQueryBridget = i(t, t.jQuery)),
            (n = "undefined" != typeof window ? window : this),
            (r = function () {
                function e() {}
                var t = e.prototype;
                return (
                    (t.on = function (e, t) {
                        if (e && t) {
                            var i = (this._events = this._events || {}),
                                n = (i[e] = i[e] || []);
                            return -1 == n.indexOf(t) && n.push(t), this;
                        }
                    }),
                    (t.once = function (e, t) {
                        if (e && t) {
                            this.on(e, t);
                            var i = (this._onceEvents = this._onceEvents || {});
                            return ((i[e] = i[e] || {})[t] = !0), this;
                        }
                    }),
                    (t.off = function (e, t) {
                        var i = this._events && this._events[e];
                        if (i && i.length) {
                            var n = i.indexOf(t);
                            return -1 != n && i.splice(n, 1), this;
                        }
                    }),
                    (t.emitEvent = function (e, t) {
                        var i = this._events && this._events[e];
                        if (i && i.length) {
                            (i = i.slice(0)), (t = t || []);
                            for (var n = this._onceEvents && this._onceEvents[e], r = 0; r < i.length; r++) {
                                var o = i[r];
                                n && n[o] && (this.off(e, o), delete n[o]), o.apply(this, t);
                            }
                            return this;
                        }
                    }),
                    (t.allOff = function () {
                        delete this._events, delete this._onceEvents;
                    }),
                    e
                );
            }),
            "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", r) : "object" == typeof module && module.exports ? (module.exports = r()) : (n.EvEmitter = r()),
            (o = window),
            (a = function () {
                "use strict";
                function e(e) {
                    var t = parseFloat(e);
                    return -1 == e.indexOf("%") && !isNaN(t) && t;
                }
                var t =
                        "undefined" == typeof console
                            ? function () {}
                            : function (e) {
                                  console.error(e);
                              },
                    i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
                    n = i.length;
                function r(e) {
                    var i = getComputedStyle(e);
                    return i || t("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), i;
                }
                var o,
                    a = !1;
                function s(t) {
                    if (
                        ((function () {
                            if (!a) {
                                a = !0;
                                var t = document.createElement("div");
                                (t.style.width = "200px"), (t.style.padding = "1px 2px 3px 4px"), (t.style.borderStyle = "solid"), (t.style.borderWidth = "1px 2px 3px 4px"), (t.style.boxSizing = "border-box");
                                var i = document.body || document.documentElement;
                                i.appendChild(t), (o = 200 == Math.round(e(r(t).width))), (s.isBoxSizeOuter = o), i.removeChild(t);
                            }
                        })(),
                        "string" == typeof t && (t = document.querySelector(t)),
                        t && "object" == typeof t && t.nodeType)
                    ) {
                        var l = r(t);
                        if ("none" == l.display)
                            return (function () {
                                for (var e = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, t = 0; t < n; t++) e[i[t]] = 0;
                                return e;
                            })();
                        var c = {};
                        (c.width = t.offsetWidth), (c.height = t.offsetHeight);
                        for (var u = (c.isBorderBox = "border-box" == l.boxSizing), d = 0; d < n; d++) {
                            var h = i[d],
                                p = parseFloat(l[h]);
                            c[h] = isNaN(p) ? 0 : p;
                        }
                        var f = c.paddingLeft + c.paddingRight,
                            m = c.paddingTop + c.paddingBottom,
                            v = c.marginLeft + c.marginRight,
                            y = c.marginTop + c.marginBottom,
                            g = c.borderLeftWidth + c.borderRightWidth,
                            b = c.borderTopWidth + c.borderBottomWidth,
                            S = u && o,
                            $ = e(l.width);
                        !1 !== $ && (c.width = $ + (S ? 0 : f + g));
                        var E = e(l.height);
                        return !1 !== E && (c.height = E + (S ? 0 : m + b)), (c.innerWidth = c.width - (f + g)), (c.innerHeight = c.height - (m + b)), (c.outerWidth = c.width + v), (c.outerHeight = c.height + y), c;
                    }
                }
                return s;
            }),
            "function" == typeof define && define.amd ? define("get-size/get-size", a) : "object" == typeof module && module.exports ? (module.exports = a()) : (o.getSize = a()),
            (s = window),
            (l = function () {
                "use strict";
                var e = (function () {
                    var e = window.Element.prototype;
                    if (e.matches) return "matches";
                    if (e.matchesSelector) return "matchesSelector";
                    for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
                        var n = t[i] + "MatchesSelector";
                        if (e[n]) return n;
                    }
                })();
                return function (t, i) {
                    return t[e](i);
                };
            }),
            "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", l) : "object" == typeof module && module.exports ? (module.exports = l()) : (s.matchesSelector = l()),
            (c = window),
            (u = function (e, t) {
                var i = {
                        extend: function (e, t) {
                            for (var i in t) e[i] = t[i];
                            return e;
                        },
                        modulo: function (e, t) {
                            return ((e % t) + t) % t;
                        },
                    },
                    n = Array.prototype.slice;
                (i.makeArray = function (e) {
                    return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? n.call(e) : [e];
                }),
                    (i.removeFrom = function (e, t) {
                        var i = e.indexOf(t);
                        -1 != i && e.splice(i, 1);
                    }),
                    (i.getParent = function (e, i) {
                        for (; e.parentNode && e != document.body; ) if (t((e = e.parentNode), i)) return e;
                    }),
                    (i.getQueryElement = function (e) {
                        return "string" == typeof e ? document.querySelector(e) : e;
                    }),
                    (i.handleEvent = function (e) {
                        var t = "on" + e.type;
                        this[t] && this[t](e);
                    }),
                    (i.filterFindElements = function (e, n) {
                        e = i.makeArray(e);
                        var r = [];
                        return (
                            e.forEach(function (e) {
                                if (e instanceof HTMLElement) {
                                    if (n) {
                                        t(e, n) && r.push(e);
                                        for (var i = e.querySelectorAll(n), o = 0; o < i.length; o++) r.push(i[o]);
                                    } else r.push(e);
                                }
                            }),
                            r
                        );
                    }),
                    (i.debounceMethod = function (e, t, i) {
                        i = i || 100;
                        var n = e.prototype[t],
                            r = t + "Timeout";
                        e.prototype[t] = function () {
                            clearTimeout(this[r]);
                            var e = arguments,
                                t = this;
                            this[r] = setTimeout(function () {
                                n.apply(t, e), delete t[r];
                            }, i);
                        };
                    }),
                    (i.docReady = function (e) {
                        var t = document.readyState;
                        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e);
                    }),
                    (i.toDashed = function (e) {
                        return e
                            .replace(/(.)([A-Z])/g, function (e, t, i) {
                                return t + "-" + i;
                            })
                            .toLowerCase();
                    });
                var r = e.console;
                return (
                    (i.htmlInit = function (t, n) {
                        i.docReady(function () {
                            var o = i.toDashed(n),
                                a = "data-" + o,
                                s = document.querySelectorAll("[" + a + "]"),
                                l = document.querySelectorAll(".js-" + o),
                                c = i.makeArray(s).concat(i.makeArray(l)),
                                u = a + "-options",
                                d = e.jQuery;
                            c.forEach(function (e) {
                                var i,
                                    o = e.getAttribute(a) || e.getAttribute(u);
                                try {
                                    i = o && JSON.parse(o);
                                } catch (s) {
                                    return void (r && r.error("Error parsing " + a + " on " + e.className + ": " + s));
                                }
                                var l = new t(e, i);
                                d && d.data(e, n, l);
                            });
                        });
                    }),
                    i
                );
            }),
            "function" == typeof define && define.amd
                ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (e) {
                      return u(c, e);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = u(c, require("desandro-matches-selector")))
                : (c.fizzyUIUtils = u(c, c.matchesSelector)),
            (d = window),
            (h = function (e, t) {
                function i(e, t) {
                    (this.element = e), (this.parent = t), this.create();
                }
                var n = i.prototype;
                return (
                    (n.create = function () {
                        (this.element.style.position = "absolute"), this.element.setAttribute("aria-hidden", "true"), (this.x = 0), (this.shift = 0);
                    }),
                    (n.destroy = function () {
                        this.unselect(), (this.element.style.position = "");
                        var e = this.parent.originSide;
                        this.element.style[e] = "";
                    }),
                    (n.getSize = function () {
                        this.size = t(this.element);
                    }),
                    (n.setPosition = function (e) {
                        (this.x = e), this.updateTarget(), this.renderPosition(e);
                    }),
                    (n.updateTarget = n.setDefaultTarget = function () {
                        var e = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
                        this.target = this.x + this.size[e] + this.size.width * this.parent.cellAlign;
                    }),
                    (n.renderPosition = function (e) {
                        var t = this.parent.originSide;
                        this.element.style[t] = this.parent.getPositionValue(e);
                    }),
                    (n.select = function () {
                        this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden");
                    }),
                    (n.unselect = function () {
                        this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true");
                    }),
                    (n.wrapShift = function (e) {
                        (this.shift = e), this.renderPosition(this.x + this.parent.slideableWidth * e);
                    }),
                    (n.remove = function () {
                        this.element.parentNode.removeChild(this.element);
                    }),
                    i
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/cell", ["get-size/get-size"], function (e) {
                      return h(d, e);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = h(d, require("get-size")))
                : ((d.Flickity = d.Flickity || {}), (d.Flickity.Cell = h(d, d.getSize))),
            (p = window),
            (f = function () {
                "use strict";
                function e(e) {
                    (this.parent = e), (this.isOriginLeft = "left" == e.originSide), (this.cells = []), (this.outerWidth = 0), (this.height = 0);
                }
                var t = e.prototype;
                return (
                    (t.addCell = function (e) {
                        if ((this.cells.push(e), (this.outerWidth += e.size.outerWidth), (this.height = Math.max(e.size.outerHeight, this.height)), 1 == this.cells.length)) {
                            this.x = e.x;
                            var t = this.isOriginLeft ? "marginLeft" : "marginRight";
                            this.firstMargin = e.size[t];
                        }
                    }),
                    (t.updateTarget = function () {
                        var e = this.isOriginLeft ? "marginRight" : "marginLeft",
                            t = this.getLastCell(),
                            i = t ? t.size[e] : 0,
                            n = this.outerWidth - (this.firstMargin + i);
                        this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
                    }),
                    (t.getLastCell = function () {
                        return this.cells[this.cells.length - 1];
                    }),
                    (t.select = function () {
                        this.cells.forEach(function (e) {
                            e.select();
                        });
                    }),
                    (t.unselect = function () {
                        this.cells.forEach(function (e) {
                            e.unselect();
                        });
                    }),
                    (t.getCellElements = function () {
                        return this.cells.map(function (e) {
                            return e.element;
                        });
                    }),
                    e
                );
            }),
            "function" == typeof define && define.amd ? define("flickity/js/slide", f) : "object" == typeof module && module.exports ? (module.exports = f()) : ((p.Flickity = p.Flickity || {}), (p.Flickity.Slide = f())),
            (m = window),
            (v = function (e, t) {
                return {
                    startAnimation: function () {
                        this.isAnimating || ((this.isAnimating = !0), (this.restingFrames = 0), this.animate());
                    },
                    animate: function () {
                        this.applyDragForce(), this.applySelectedAttraction();
                        var e = this.x;
                        if ((this.integratePhysics(), this.positionSlider(), this.settle(e), this.isAnimating)) {
                            var t = this;
                            requestAnimationFrame(function () {
                                t.animate();
                            });
                        }
                    },
                    positionSlider: function () {
                        var e = this.x;
                        this.options.wrapAround && 1 < this.cells.length && ((e = t.modulo(e, this.slideableWidth)), (e -= this.slideableWidth), this.shiftWrapCells(e)), this.setTranslateX(e, this.isAnimating), this.dispatchScrollEvent();
                    },
                    setTranslateX: function (e, t) {
                        (e += this.cursorPosition), (e = this.options.rightToLeft ? -e : e);
                        var i = this.getPositionValue(e);
                        this.slider.style.transform = t ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
                    },
                    dispatchScrollEvent: function () {
                        var e = this.slides[0];
                        if (e) {
                            var t = -this.x - e.target,
                                i = t / this.slidesWidth;
                            this.dispatchEvent("scroll", null, [i, t]);
                        }
                    },
                    positionSliderAtSelected: function () {
                        this.cells.length && ((this.x = -this.selectedSlide.target), (this.velocity = 0), this.positionSlider());
                    },
                    getPositionValue: function (e) {
                        return this.options.percentPosition ? 0.01 * Math.round((e / this.size.innerWidth) * 1e4) + "%" : Math.round(e) + "px";
                    },
                    settle: function (e) {
                        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * e) || this.restingFrames++,
                            2 < this.restingFrames && ((this.isAnimating = !1), delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]));
                    },
                    shiftWrapCells: function (e) {
                        var t = this.cursorPosition + e;
                        this._shiftCells(this.beforeShiftCells, t, -1);
                        var i = this.size.innerWidth - (e + this.slideableWidth + this.cursorPosition);
                        this._shiftCells(this.afterShiftCells, i, 1);
                    },
                    _shiftCells: function (e, t, i) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n],
                                o = 0 < t ? i : 0;
                            r.wrapShift(o), (t -= r.size.outerWidth);
                        }
                    },
                    _unshiftCells: function (e) {
                        if (e && e.length) for (var t = 0; t < e.length; t++) e[t].wrapShift(0);
                    },
                    integratePhysics: function () {
                        (this.x += this.velocity), (this.velocity *= this.getFrictionFactor());
                    },
                    applyForce: function (e) {
                        this.velocity += e;
                    },
                    getFrictionFactor: function () {
                        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
                    },
                    getRestingPosition: function () {
                        return this.x + this.velocity / (1 - this.getFrictionFactor());
                    },
                    applyDragForce: function () {
                        if (this.isDraggable && this.isPointerDown) {
                            var e = this.dragX - this.x - this.velocity;
                            this.applyForce(e);
                        }
                    },
                    applySelectedAttraction: function () {
                        if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                            var e = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                            this.applyForce(e);
                        }
                    },
                };
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (e) {
                      return v(m, e);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = v(m, require("fizzy-ui-utils")))
                : ((m.Flickity = m.Flickity || {}), (m.Flickity.animatePrototype = v(m, m.fizzyUIUtils))),
            (function (e, t) {
                if ("function" == typeof define && define.amd)
                    define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (i, n, r, o, a, s) {
                        return t(e, i, n, r, o, a, s);
                    });
                else if ("object" == typeof module && module.exports) module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
                else {
                    var i = e.Flickity;
                    e.Flickity = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype);
                }
            })(window, function (e, t, i, n, r, o, a) {
                var s = e.jQuery,
                    l = e.getComputedStyle,
                    c = e.console;
                function u(e, t) {
                    for (e = n.makeArray(e); e.length; ) t.appendChild(e.shift());
                }
                var d = 0,
                    h = {};
                function p(e, t) {
                    var i = n.getQueryElement(e);
                    if (i) {
                        if (((this.element = i), this.element.flickityGUID)) {
                            var r = h[this.element.flickityGUID];
                            return r.option(t), r;
                        }
                        s && (this.$element = s(this.element)), (this.options = n.extend({}, this.constructor.defaults)), this.option(t), this._create();
                    } else c && c.error("Bad element for Flickity: " + (i || e));
                }
                (p.defaults = { accessibility: !0, cellAlign: "center", freeScrollFriction: 0.075, friction: 0.28, namespaceJQueryEvents: !0, percentPosition: !0, resize: !0, selectedAttraction: 0.025, setGallerySize: !0 }),
                    (p.createMethods = []);
                var f = p.prototype;
                n.extend(f, t.prototype),
                    (f._create = function () {
                        var t = (this.guid = ++d);
                        for (var i in ((this.element.flickityGUID = t),
                        ((h[t] = this).selectedIndex = 0),
                        (this.restingFrames = 0),
                        (this.x = 0),
                        (this.velocity = 0),
                        (this.originSide = this.options.rightToLeft ? "right" : "left"),
                        (this.viewport = document.createElement("div")),
                        (this.viewport.className = "flickity-viewport"),
                        this._createSlider(),
                        (this.options.resize || this.options.watchCSS) && e.addEventListener("resize", this),
                        this.options.on)) {
                            var n = this.options.on[i];
                            this.on(i, n);
                        }
                        p.createMethods.forEach(function (e) {
                            this[e]();
                        }, this),
                            this.options.watchCSS ? this.watchCSS() : this.activate();
                    }),
                    (f.option = function (e) {
                        n.extend(this.options, e);
                    }),
                    (f.activate = function () {
                        this.isActive ||
                            ((this.isActive = !0),
                            this.element.classList.add("flickity-enabled"),
                            this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
                            this.getSize(),
                            u(this._filterFindCellElements(this.element.children), this.slider),
                            this.viewport.appendChild(this.slider),
                            this.element.appendChild(this.viewport),
                            this.reloadCells(),
                            this.options.accessibility && ((this.element.tabIndex = 0), this.element.addEventListener("keydown", this)),
                            this.emitEvent("activate"),
                            this.selectInitialIndex(),
                            (this.isInitActivated = !0),
                            this.dispatchEvent("ready"));
                    }),
                    (f._createSlider = function () {
                        var e = document.createElement("div");
                        (e.className = "flickity-slider"), (e.style[this.originSide] = 0), (this.slider = e);
                    }),
                    (f._filterFindCellElements = function (e) {
                        return n.filterFindElements(e, this.options.cellSelector);
                    }),
                    (f.reloadCells = function () {
                        (this.cells = this._makeCells(this.slider.children)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize();
                    }),
                    (f._makeCells = function (e) {
                        return this._filterFindCellElements(e).map(function (e) {
                            return new r(e, this);
                        }, this);
                    }),
                    (f.getLastCell = function () {
                        return this.cells[this.cells.length - 1];
                    }),
                    (f.getLastSlide = function () {
                        return this.slides[this.slides.length - 1];
                    }),
                    (f.positionCells = function () {
                        this._sizeCells(this.cells), this._positionCells(0);
                    }),
                    (f._positionCells = function (e) {
                        (e = e || 0), (this.maxCellHeight = (e && this.maxCellHeight) || 0);
                        var t = 0;
                        if (0 < e) {
                            var i = this.cells[e - 1];
                            t = i.x + i.size.outerWidth;
                        }
                        for (var n = this.cells.length, r = e; r < n; r++) {
                            var o = this.cells[r];
                            o.setPosition(t), (t += o.size.outerWidth), (this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight));
                        }
                        (this.slideableWidth = t), this.updateSlides(), this._containSlides(), (this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0);
                    }),
                    (f._sizeCells = function (e) {
                        e.forEach(function (e) {
                            e.getSize();
                        });
                    }),
                    (f.updateSlides = function () {
                        if (((this.slides = []), this.cells.length)) {
                            var e = new o(this);
                            this.slides.push(e);
                            var t = "left" == this.originSide ? "marginRight" : "marginLeft",
                                i = this._getCanCellFit();
                            this.cells.forEach(function (n, r) {
                                if (e.cells.length) {
                                    var a = e.outerWidth - e.firstMargin + (n.size.outerWidth - n.size[t]);
                                    i.call(this, r, a) || (e.updateTarget(), (e = new o(this)), this.slides.push(e)), e.addCell(n);
                                } else e.addCell(n);
                            }, this),
                                e.updateTarget(),
                                this.updateSelectedSlide();
                        }
                    }),
                    (f._getCanCellFit = function () {
                        var e = this.options.groupCells;
                        if (!e)
                            return function () {
                                return !1;
                            };
                        if ("number" == typeof e) {
                            var t = parseInt(e, 10);
                            return function (e) {
                                return e % t != 0;
                            };
                        }
                        var i = "string" == typeof e && e.match(/^(\d+)%$/),
                            n = i ? parseInt(i[1], 10) / 100 : 1;
                        return function (e, t) {
                            return t <= (this.size.innerWidth + 1) * n;
                        };
                    }),
                    (f._init = f.reposition = function () {
                        this.positionCells(), this.positionSliderAtSelected();
                    }),
                    (f.getSize = function () {
                        (this.size = i(this.element)), this.setCellAlign(), (this.cursorPosition = this.size.innerWidth * this.cellAlign);
                    });
                var m = { center: { left: 0.5, right: 0.5 }, left: { left: 0, right: 1 }, right: { right: 0, left: 1 } };
                return (
                    (f.setCellAlign = function () {
                        var e = m[this.options.cellAlign];
                        this.cellAlign = e ? e[this.originSide] : this.options.cellAlign;
                    }),
                    (f.setGallerySize = function () {
                        if (this.options.setGallerySize) {
                            var e = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                            this.viewport.style.height = e + "px";
                        }
                    }),
                    (f._getWrapShiftCells = function () {
                        if (this.options.wrapAround) {
                            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
                            var e = this.cursorPosition,
                                t = this.cells.length - 1;
                            (this.beforeShiftCells = this._getGapCells(e, t, -1)), (e = this.size.innerWidth - this.cursorPosition), (this.afterShiftCells = this._getGapCells(e, 0, 1));
                        }
                    }),
                    (f._getGapCells = function (e, t, i) {
                        for (var n = []; 0 < e; ) {
                            var r = this.cells[t];
                            if (!r) break;
                            n.push(r), (t += i), (e -= r.size.outerWidth);
                        }
                        return n;
                    }),
                    (f._containSlides = function () {
                        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                            var e = this.options.rightToLeft,
                                t = this.slideableWidth - this.getLastCell().size[e ? "marginLeft" : "marginRight"],
                                i = t < this.size.innerWidth,
                                n = this.cursorPosition + this.cells[0].size[e ? "marginRight" : "marginLeft"],
                                r = t - this.size.innerWidth * (1 - this.cellAlign);
                            this.slides.forEach(function (e) {
                                i ? (e.target = t * this.cellAlign) : ((e.target = Math.max(e.target, n)), (e.target = Math.min(e.target, r)));
                            }, this);
                        }
                    }),
                    (f.dispatchEvent = function (e, t, i) {
                        var n = t ? [t].concat(i) : i;
                        if ((this.emitEvent(e, n), s && this.$element)) {
                            var r = (e += this.options.namespaceJQueryEvents ? ".flickity" : "");
                            if (t) {
                                var o = s.Event(t);
                                (o.type = e), (r = o);
                            }
                            this.$element.trigger(r, i);
                        }
                    }),
                    (f.select = function (e, t, i) {
                        if (this.isActive && ((e = parseInt(e, 10)), this._wrapSelect(e), (this.options.wrapAround || t) && (e = n.modulo(e, this.slides.length)), this.slides[e])) {
                            var r = this.selectedIndex;
                            (this.selectedIndex = e),
                                this.updateSelectedSlide(),
                                i ? this.positionSliderAtSelected() : this.startAnimation(),
                                this.options.adaptiveHeight && this.setGallerySize(),
                                this.dispatchEvent("select", null, [e]),
                                e != r && this.dispatchEvent("change", null, [e]),
                                this.dispatchEvent("cellSelect");
                        }
                    }),
                    (f._wrapSelect = function (e) {
                        var t = this.slides.length;
                        if (!(this.options.wrapAround && 1 < t)) return e;
                        var i = n.modulo(e, t),
                            r = Math.abs(i - this.selectedIndex),
                            o = Math.abs(i + t - this.selectedIndex),
                            a = Math.abs(i - t - this.selectedIndex);
                        !this.isDragSelect && o < r ? (e += t) : !this.isDragSelect && a < r && (e -= t), e < 0 ? (this.x -= this.slideableWidth) : t <= e && (this.x += this.slideableWidth);
                    }),
                    (f.previous = function (e, t) {
                        this.select(this.selectedIndex - 1, e, t);
                    }),
                    (f.next = function (e, t) {
                        this.select(this.selectedIndex + 1, e, t);
                    }),
                    (f.updateSelectedSlide = function () {
                        var e = this.slides[this.selectedIndex];
                        e &&
                            (this.unselectSelectedSlide(),
                            (this.selectedSlide = e).select(),
                            (this.selectedCells = e.cells),
                            (this.selectedElements = e.getCellElements()),
                            (this.selectedCell = e.cells[0]),
                            (this.selectedElement = this.selectedElements[0]));
                    }),
                    (f.unselectSelectedSlide = function () {
                        this.selectedSlide && this.selectedSlide.unselect();
                    }),
                    (f.selectInitialIndex = function () {
                        var e = this.options.initialIndex;
                        if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);
                        else {
                            if (e && "string" == typeof e && this.queryCell(e)) return void this.selectCell(e, !1, !0);
                            var t = 0;
                            e && this.slides[e] && (t = e), this.select(t, !1, !0);
                        }
                    }),
                    (f.selectCell = function (e, t, i) {
                        var n = this.queryCell(e);
                        if (n) {
                            var r = this.getCellSlideIndex(n);
                            this.select(r, t, i);
                        }
                    }),
                    (f.getCellSlideIndex = function (e) {
                        for (var t = 0; t < this.slides.length; t++) if (-1 != this.slides[t].cells.indexOf(e)) return t;
                    }),
                    (f.getCell = function (e) {
                        for (var t = 0; t < this.cells.length; t++) {
                            var i = this.cells[t];
                            if (i.element == e) return i;
                        }
                    }),
                    (f.getCells = function (e) {
                        e = n.makeArray(e);
                        var t = [];
                        return (
                            e.forEach(function (e) {
                                var i = this.getCell(e);
                                i && t.push(i);
                            }, this),
                            t
                        );
                    }),
                    (f.getCellElements = function () {
                        return this.cells.map(function (e) {
                            return e.element;
                        });
                    }),
                    (f.getParentCell = function (e) {
                        return this.getCell(e) || ((e = n.getParent(e, ".flickity-slider > *")), this.getCell(e));
                    }),
                    (f.getAdjacentCellElements = function (e, t) {
                        if (!e) return this.selectedSlide.getCellElements();
                        t = void 0 === t ? this.selectedIndex : t;
                        var i = this.slides.length;
                        if (i <= 1 + 2 * e) return this.getCellElements();
                        for (var r = [], o = t - e; o <= t + e; o++) {
                            var a = this.options.wrapAround ? n.modulo(o, i) : o,
                                s = this.slides[a];
                            s && (r = r.concat(s.getCellElements()));
                        }
                        return r;
                    }),
                    (f.queryCell = function (e) {
                        if ("number" == typeof e) return this.cells[e];
                        if ("string" == typeof e) {
                            if (e.match(/^[#\.]?[\d\/]/)) return;
                            e = this.element.querySelector(e);
                        }
                        return this.getCell(e);
                    }),
                    (f.uiChange = function () {
                        this.emitEvent("uiChange");
                    }),
                    (f.childUIPointerDown = function (e) {
                        "touchstart" != e.type && e.preventDefault(), this.focus();
                    }),
                    (f.onresize = function () {
                        this.watchCSS(), this.resize();
                    }),
                    n.debounceMethod(p, "onresize", 150),
                    (f.resize = function () {
                        if (this.isActive) {
                            this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
                            var e = this.selectedElements && this.selectedElements[0];
                            this.selectCell(e, !1, !0);
                        }
                    }),
                    (f.watchCSS = function () {
                        this.options.watchCSS && (-1 != l(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate());
                    }),
                    (f.onkeydown = function (e) {
                        var t = document.activeElement && document.activeElement != this.element;
                        if (this.options.accessibility && !t) {
                            var i = p.keyboardHandlers[e.keyCode];
                            i && i.call(this);
                        }
                    }),
                    (p.keyboardHandlers = {
                        37: function () {
                            var e = this.options.rightToLeft ? "next" : "previous";
                            this.uiChange(), this[e]();
                        },
                        39: function () {
                            var e = this.options.rightToLeft ? "previous" : "next";
                            this.uiChange(), this[e]();
                        },
                    }),
                    (f.focus = function () {
                        var t = e.pageYOffset;
                        this.element.focus({ preventScroll: !0 }), e.pageYOffset != t && e.scrollTo(e.pageXOffset, t);
                    }),
                    (f.deactivate = function () {
                        this.isActive &&
                            (this.element.classList.remove("flickity-enabled"),
                            this.element.classList.remove("flickity-rtl"),
                            this.unselectSelectedSlide(),
                            this.cells.forEach(function (e) {
                                e.destroy();
                            }),
                            this.element.removeChild(this.viewport),
                            u(this.slider.children, this.element),
                            this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)),
                            (this.isActive = !1),
                            this.emitEvent("deactivate"));
                    }),
                    (f.destroy = function () {
                        this.deactivate(), e.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), s && this.$element && s.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete h[this.guid];
                    }),
                    n.extend(f, a),
                    (p.data = function (e) {
                        var t = (e = n.getQueryElement(e)) && e.flickityGUID;
                        return t && h[t];
                    }),
                    n.htmlInit(p, "flickity"),
                    s && s.bridget && s.bridget("flickity", p),
                    (p.setJQuery = function (e) {
                        s = e;
                    }),
                    (p.Cell = r),
                    (p.Slide = o),
                    p
                );
            }),
            (y = window),
            (g = function (e, t) {
                function i() {}
                var n = (i.prototype = Object.create(t.prototype));
                (n.bindStartEvent = function (e) {
                    this._bindStartEvent(e, !0);
                }),
                    (n.unbindStartEvent = function (e) {
                        this._bindStartEvent(e, !1);
                    }),
                    (n._bindStartEvent = function (t, i) {
                        var n = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener",
                            r = "mousedown";
                        e.PointerEvent ? (r = "pointerdown") : "ontouchstart" in e && (r = "touchstart"), t[n](r, this);
                    }),
                    (n.handleEvent = function (e) {
                        var t = "on" + e.type;
                        this[t] && this[t](e);
                    }),
                    (n.getTouch = function (e) {
                        for (var t = 0; t < e.length; t++) {
                            var i = e[t];
                            if (i.identifier == this.pointerIdentifier) return i;
                        }
                    }),
                    (n.onmousedown = function (e) {
                        var t = e.button;
                        (t && 0 !== t && 1 !== t) || this._pointerDown(e, e);
                    }),
                    (n.ontouchstart = function (e) {
                        this._pointerDown(e, e.changedTouches[0]);
                    }),
                    (n.onpointerdown = function (e) {
                        this._pointerDown(e, e);
                    }),
                    (n._pointerDown = function (e, t) {
                        e.button || this.isPointerDown || ((this.isPointerDown = !0), (this.pointerIdentifier = void 0 !== t.pointerId ? t.pointerId : t.identifier), this.pointerDown(e, t));
                    }),
                    (n.pointerDown = function (e, t) {
                        this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]);
                    });
                var r = { mousedown: ["mousemove", "mouseup"], touchstart: ["touchmove", "touchend", "touchcancel"], pointerdown: ["pointermove", "pointerup", "pointercancel"] };
                return (
                    (n._bindPostStartEvents = function (t) {
                        if (t) {
                            var i = r[t.type];
                            i.forEach(function (t) {
                                e.addEventListener(t, this);
                            }, this),
                                (this._boundPointerEvents = i);
                        }
                    }),
                    (n._unbindPostStartEvents = function () {
                        this._boundPointerEvents &&
                            (this._boundPointerEvents.forEach(function (t) {
                                e.removeEventListener(t, this);
                            }, this),
                            delete this._boundPointerEvents);
                    }),
                    (n.onmousemove = function (e) {
                        this._pointerMove(e, e);
                    }),
                    (n.onpointermove = function (e) {
                        e.pointerId == this.pointerIdentifier && this._pointerMove(e, e);
                    }),
                    (n.ontouchmove = function (e) {
                        var t = this.getTouch(e.changedTouches);
                        t && this._pointerMove(e, t);
                    }),
                    (n._pointerMove = function (e, t) {
                        this.pointerMove(e, t);
                    }),
                    (n.pointerMove = function (e, t) {
                        this.emitEvent("pointerMove", [e, t]);
                    }),
                    (n.onmouseup = function (e) {
                        this._pointerUp(e, e);
                    }),
                    (n.onpointerup = function (e) {
                        e.pointerId == this.pointerIdentifier && this._pointerUp(e, e);
                    }),
                    (n.ontouchend = function (e) {
                        var t = this.getTouch(e.changedTouches);
                        t && this._pointerUp(e, t);
                    }),
                    (n._pointerUp = function (e, t) {
                        this._pointerDone(), this.pointerUp(e, t);
                    }),
                    (n.pointerUp = function (e, t) {
                        this.emitEvent("pointerUp", [e, t]);
                    }),
                    (n._pointerDone = function () {
                        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
                    }),
                    (n._pointerReset = function () {
                        (this.isPointerDown = !1), delete this.pointerIdentifier;
                    }),
                    (n.pointerDone = function () {}),
                    (n.onpointercancel = function (e) {
                        e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e);
                    }),
                    (n.ontouchcancel = function (e) {
                        var t = this.getTouch(e.changedTouches);
                        t && this._pointerCancel(e, t);
                    }),
                    (n._pointerCancel = function (e, t) {
                        this._pointerDone(), this.pointerCancel(e, t);
                    }),
                    (n.pointerCancel = function (e, t) {
                        this.emitEvent("pointerCancel", [e, t]);
                    }),
                    (i.getPointerPoint = function (e) {
                        return { x: e.pageX, y: e.pageY };
                    }),
                    i
                );
            }),
            "function" == typeof define && define.amd
                ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (e) {
                      return g(y, e);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = g(y, require("ev-emitter")))
                : (y.Unipointer = g(y, y.EvEmitter)),
            (b = window),
            (S = function (e, t) {
                function i() {}
                var n = (i.prototype = Object.create(t.prototype));
                (n.bindHandles = function () {
                    this._bindHandles(!0);
                }),
                    (n.unbindHandles = function () {
                        this._bindHandles(!1);
                    }),
                    (n._bindHandles = function (t) {
                        for (var i = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", n = t ? this._touchActionValue : "", r = 0; r < this.handles.length; r++) {
                            var o = this.handles[r];
                            this._bindStartEvent(o, t), o[i]("click", this), e.PointerEvent && (o.style.touchAction = n);
                        }
                    }),
                    (n._touchActionValue = "none"),
                    (n.pointerDown = function (e, t) {
                        this.okayPointerDown(e) && ((this.pointerDownPointer = t), e.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]));
                    });
                var r = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
                    o = { radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0 };
                return (
                    (n.okayPointerDown = function (e) {
                        var t = r[e.target.nodeName],
                            i = o[e.target.type],
                            n = !t || i;
                        return n || this._pointerReset(), n;
                    }),
                    (n.pointerDownBlur = function () {
                        var e = document.activeElement;
                        e && e.blur && e != document.body && e.blur();
                    }),
                    (n.pointerMove = function (e, t) {
                        var i = this._dragPointerMove(e, t);
                        this.emitEvent("pointerMove", [e, t, i]), this._dragMove(e, t, i);
                    }),
                    (n._dragPointerMove = function (e, t) {
                        var i = { x: t.pageX - this.pointerDownPointer.pageX, y: t.pageY - this.pointerDownPointer.pageY };
                        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(e, t), i;
                    }),
                    (n.hasDragStarted = function (e) {
                        return 3 < Math.abs(e.x) || 3 < Math.abs(e.y);
                    }),
                    (n.pointerUp = function (e, t) {
                        this.emitEvent("pointerUp", [e, t]), this._dragPointerUp(e, t);
                    }),
                    (n._dragPointerUp = function (e, t) {
                        this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t);
                    }),
                    (n._dragStart = function (e, t) {
                        (this.isDragging = !0), (this.isPreventingClicks = !0), this.dragStart(e, t);
                    }),
                    (n.dragStart = function (e, t) {
                        this.emitEvent("dragStart", [e, t]);
                    }),
                    (n._dragMove = function (e, t, i) {
                        this.isDragging && this.dragMove(e, t, i);
                    }),
                    (n.dragMove = function (e, t, i) {
                        e.preventDefault(), this.emitEvent("dragMove", [e, t, i]);
                    }),
                    (n._dragEnd = function (e, t) {
                        (this.isDragging = !1),
                            setTimeout(
                                function () {
                                    delete this.isPreventingClicks;
                                }.bind(this)
                            ),
                            this.dragEnd(e, t);
                    }),
                    (n.dragEnd = function (e, t) {
                        this.emitEvent("dragEnd", [e, t]);
                    }),
                    (n.onclick = function (e) {
                        this.isPreventingClicks && e.preventDefault();
                    }),
                    (n._staticClick = function (e, t) {
                        (this.isIgnoringMouseUp && "mouseup" == e.type) ||
                            (this.staticClick(e, t),
                            "mouseup" != e.type &&
                                ((this.isIgnoringMouseUp = !0),
                                setTimeout(
                                    function () {
                                        delete this.isIgnoringMouseUp;
                                    }.bind(this),
                                    400
                                )));
                    }),
                    (n.staticClick = function (e, t) {
                        this.emitEvent("staticClick", [e, t]);
                    }),
                    (i.getPointerPoint = t.getPointerPoint),
                    i
                );
            }),
            "function" == typeof define && define.amd
                ? define("unidragger/unidragger", ["unipointer/unipointer"], function (e) {
                      return S(b, e);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = S(b, require("unipointer")))
                : (b.Unidragger = S(b, b.Unipointer)),
            ($ = window),
            (E = function (e, t, i, n) {
                n.extend(t.defaults, { draggable: ">1", dragThreshold: 3 }), t.createMethods.push("_createDrag");
                var r = t.prototype;
                n.extend(r, i.prototype), (r._touchActionValue = "pan-y");
                var o = "createTouch" in document,
                    a = !1;
                (r._createDrag = function () {
                    this.on("activate", this.onActivateDrag),
                        this.on("uiChange", this._uiChangeDrag),
                        this.on("deactivate", this.onDeactivateDrag),
                        this.on("cellChange", this.updateDraggable),
                        o && !a && (e.addEventListener("touchmove", function () {}), (a = !0));
                }),
                    (r.onActivateDrag = function () {
                        (this.handles = [this.viewport]), this.bindHandles(), this.updateDraggable();
                    }),
                    (r.onDeactivateDrag = function () {
                        this.unbindHandles(), this.element.classList.remove("is-draggable");
                    }),
                    (r.updateDraggable = function () {
                        ">1" == this.options.draggable ? (this.isDraggable = 1 < this.slides.length) : (this.isDraggable = this.options.draggable),
                            this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable");
                    }),
                    (r.bindDrag = function () {
                        (this.options.draggable = !0), this.updateDraggable();
                    }),
                    (r.unbindDrag = function () {
                        (this.options.draggable = !1), this.updateDraggable();
                    }),
                    (r._uiChangeDrag = function () {
                        delete this.isFreeScrolling;
                    }),
                    (r.pointerDown = function (t, i) {
                        this.isDraggable
                            ? this.okayPointerDown(t) &&
                              (this._pointerDownPreventDefault(t),
                              this.pointerDownFocus(t),
                              document.activeElement != this.element && this.pointerDownBlur(),
                              (this.dragX = this.x),
                              this.viewport.classList.add("is-pointer-down"),
                              (this.pointerDownScroll = l()),
                              e.addEventListener("scroll", this),
                              this._pointerDownDefault(t, i))
                            : this._pointerDownDefault(t, i);
                    }),
                    (r._pointerDownDefault = function (e, t) {
                        (this.pointerDownPointer = { pageX: t.pageX, pageY: t.pageY }), this._bindPostStartEvents(e), this.dispatchEvent("pointerDown", e, [t]);
                    });
                var s = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };
                function l() {
                    return { x: e.pageXOffset, y: e.pageYOffset };
                }
                return (
                    (r.pointerDownFocus = function (e) {
                        s[e.target.nodeName] || this.focus();
                    }),
                    (r._pointerDownPreventDefault = function (e) {
                        var t = "touchstart" == e.type,
                            i = "touch" == e.pointerType,
                            n = s[e.target.nodeName];
                        t || i || n || e.preventDefault();
                    }),
                    (r.hasDragStarted = function (e) {
                        return Math.abs(e.x) > this.options.dragThreshold;
                    }),
                    (r.pointerUp = function (e, t) {
                        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", e, [t]), this._dragPointerUp(e, t);
                    }),
                    (r.pointerDone = function () {
                        e.removeEventListener("scroll", this), delete this.pointerDownScroll;
                    }),
                    (r.dragStart = function (t, i) {
                        this.isDraggable && ((this.dragStartPosition = this.x), this.startAnimation(), e.removeEventListener("scroll", this), this.dispatchEvent("dragStart", t, [i]));
                    }),
                    (r.pointerMove = function (e, t) {
                        var i = this._dragPointerMove(e, t);
                        this.dispatchEvent("pointerMove", e, [t, i]), this._dragMove(e, t, i);
                    }),
                    (r.dragMove = function (e, t, i) {
                        if (this.isDraggable) {
                            e.preventDefault(), (this.previousDragX = this.dragX);
                            var n = this.options.rightToLeft ? -1 : 1;
                            this.options.wrapAround && (i.x = i.x % this.slideableWidth);
                            var r = this.dragStartPosition + i.x * n;
                            if (!this.options.wrapAround && this.slides.length) {
                                var o = Math.max(-this.slides[0].target, this.dragStartPosition);
                                r = o < r ? 0.5 * (r + o) : r;
                                var a = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                                r = r < a ? 0.5 * (r + a) : r;
                            }
                            (this.dragX = r), (this.dragMoveTime = new Date()), this.dispatchEvent("dragMove", e, [t, i]);
                        }
                    }),
                    (r.dragEnd = function (e, t) {
                        if (this.isDraggable) {
                            this.options.freeScroll && (this.isFreeScrolling = !0);
                            var i = this.dragEndRestingSelect();
                            if (this.options.freeScroll && !this.options.wrapAround) {
                                var n = this.getRestingPosition();
                                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target;
                            } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
                            delete this.previousDragX, (this.isDragSelect = this.options.wrapAround), this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", e, [t]);
                        }
                    }),
                    (r.dragEndRestingSelect = function () {
                        var e = this.getRestingPosition(),
                            t = Math.abs(this.getSlideDistance(-e, this.selectedIndex)),
                            i = this._getClosestResting(e, t, 1),
                            n = this._getClosestResting(e, t, -1);
                        return i.distance < n.distance ? i.index : n.index;
                    }),
                    (r._getClosestResting = function (e, t, i) {
                        for (
                            var n = this.selectedIndex,
                                r = 1 / 0,
                                o =
                                    this.options.contain && !this.options.wrapAround
                                        ? function (e, t) {
                                              return e <= t;
                                          }
                                        : function (e, t) {
                                              return e < t;
                                          };
                            o(t, r) && ((n += i), (r = t), null !== (t = this.getSlideDistance(-e, n)));

                        )
                            t = Math.abs(t);
                        return { distance: r, index: n - i };
                    }),
                    (r.getSlideDistance = function (e, t) {
                        var i = this.slides.length,
                            r = this.options.wrapAround && 1 < i,
                            o = r ? n.modulo(t, i) : t,
                            a = this.slides[o];
                        if (!a) return null;
                        var s = r ? this.slideableWidth * Math.floor(t / i) : 0;
                        return e - (a.target + s);
                    }),
                    (r.dragEndBoostSelect = function () {
                        if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date() - this.dragMoveTime) return 0;
                        var e = this.getSlideDistance(-this.dragX, this.selectedIndex),
                            t = this.previousDragX - this.dragX;
                        return 0 < e && 0 < t ? 1 : e < 0 && t < 0 ? -1 : 0;
                    }),
                    (r.staticClick = function (e, t) {
                        var i = this.getParentCell(e.target),
                            n = i && i.element,
                            r = i && this.cells.indexOf(i);
                        this.dispatchEvent("staticClick", e, [t, n, r]);
                    }),
                    (r.onscroll = function () {
                        var e = l(),
                            t = this.pointerDownScroll.x - e.x,
                            i = this.pointerDownScroll.y - e.y;
                        (3 < Math.abs(t) || 3 < Math.abs(i)) && this._pointerDone();
                    }),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (e, t, i) {
                      return E($, e, t, i);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = E($, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")))
                : ($.Flickity = E($, $.Flickity, $.Unidragger, $.fizzyUIUtils)),
            (w = window),
            (x = function (e, t, i, n) {
                "use strict";
                var r = "http://www.w3.org/2000/svg";
                function o(e, t) {
                    (this.direction = e), (this.parent = t), this._create();
                }
                ((o.prototype = Object.create(i.prototype))._create = function () {
                    (this.isEnabled = !0), (this.isPrevious = -1 == this.direction);
                    var e = this.parent.options.rightToLeft ? 1 : -1;
                    this.isLeft = this.direction == e;
                    var t = (this.element = document.createElement("button"));
                    (t.className = "flickity-button flickity-prev-next-button"),
                        (t.className += this.isPrevious ? " previous" : " next"),
                        t.setAttribute("type", "button"),
                        this.disable(),
                        t.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
                    var i = this.createSVG();
                    t.appendChild(i), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
                }),
                    (o.prototype.activate = function () {
                        this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element);
                    }),
                    (o.prototype.deactivate = function () {
                        this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this);
                    }),
                    (o.prototype.createSVG = function () {
                        var e,
                            t = document.createElementNS(r, "svg");
                        t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");
                        var i = document.createElementNS(r, "path"),
                            n =
                                "string" != typeof (e = this.parent.options.arrowShape)
                                    ? "M " + e.x0 + ",50 L " + e.x1 + "," + (e.y1 + 50) + " L " + e.x2 + "," + (e.y2 + 50) + " L " + e.x3 + ",50  L " + e.x2 + "," + (50 - e.y2) + " L " + e.x1 + "," + (50 - e.y1) + " Z"
                                    : e;
                        return i.setAttribute("d", n), i.setAttribute("class", "arrow"), this.isLeft || i.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(i), t;
                    }),
                    (o.prototype.handleEvent = n.handleEvent),
                    (o.prototype.onclick = function () {
                        if (this.isEnabled) {
                            this.parent.uiChange();
                            var e = this.isPrevious ? "previous" : "next";
                            this.parent[e]();
                        }
                    }),
                    (o.prototype.enable = function () {
                        this.isEnabled || ((this.element.disabled = !1), (this.isEnabled = !0));
                    }),
                    (o.prototype.disable = function () {
                        this.isEnabled && ((this.element.disabled = !0), (this.isEnabled = !1));
                    }),
                    (o.prototype.update = function () {
                        var e = this.parent.slides;
                        if (this.parent.options.wrapAround && 1 < e.length) this.enable();
                        else {
                            var t = e.length ? e.length - 1 : 0,
                                i = this.isPrevious ? 0 : t;
                            this[this.parent.selectedIndex == i ? "disable" : "enable"]();
                        }
                    }),
                    (o.prototype.destroy = function () {
                        this.deactivate(), this.allOff();
                    }),
                    n.extend(t.defaults, { prevNextButtons: !0, arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 } }),
                    t.createMethods.push("_createPrevNextButtons");
                var a = t.prototype;
                return (
                    (a._createPrevNextButtons = function () {
                        this.options.prevNextButtons && ((this.prevButton = new o(-1, this)), (this.nextButton = new o(1, this)), this.on("activate", this.activatePrevNextButtons));
                    }),
                    (a.activatePrevNextButtons = function () {
                        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons);
                    }),
                    (a.deactivatePrevNextButtons = function () {
                        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons);
                    }),
                    (t.PrevNextButton = o),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (e, t, i) {
                      return x(w, e, t, i);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = x(w, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")))
                : x(w, w.Flickity, w.Unipointer, w.fizzyUIUtils),
            (L = window),
            (C = function (e, t, i, n) {
                function r(e) {
                    (this.parent = e), this._create();
                }
                ((r.prototype = Object.create(i.prototype))._create = function () {
                    (this.holder = document.createElement("ol")),
                        (this.holder.className = "flickity-page-dots"),
                        (this.dots = []),
                        (this.handleClick = this.onClick.bind(this)),
                        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
                }),
                    (r.prototype.activate = function () {
                        this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder);
                    }),
                    (r.prototype.deactivate = function () {
                        this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder);
                    }),
                    (r.prototype.setDots = function () {
                        var e = this.parent.slides.length - this.dots.length;
                        0 < e ? this.addDots(e) : e < 0 && this.removeDots(-e);
                    }),
                    (r.prototype.addDots = function (e) {
                        for (var t = document.createDocumentFragment(), i = [], n = this.dots.length, r = n + e, o = n; o < r; o++) {
                            var a = document.createElement("li");
                            (a.className = "dot"), a.setAttribute("aria-label", "Page dot " + (o + 1)), t.appendChild(a), i.push(a);
                        }
                        this.holder.appendChild(t), (this.dots = this.dots.concat(i));
                    }),
                    (r.prototype.removeDots = function (e) {
                        this.dots.splice(this.dots.length - e, e).forEach(function (e) {
                            this.holder.removeChild(e);
                        }, this);
                    }),
                    (r.prototype.updateSelected = function () {
                        this.selectedDot && ((this.selectedDot.className = "dot"), this.selectedDot.removeAttribute("aria-current")),
                            this.dots.length && ((this.selectedDot = this.dots[this.parent.selectedIndex]), (this.selectedDot.className = "dot is-selected"), this.selectedDot.setAttribute("aria-current", "step"));
                    }),
                    (r.prototype.onTap = r.prototype.onClick = function (e) {
                        var t = e.target;
                        if ("LI" == t.nodeName) {
                            this.parent.uiChange();
                            var i = this.dots.indexOf(t);
                            this.parent.select(i);
                        }
                    }),
                    (r.prototype.destroy = function () {
                        this.deactivate(), this.allOff();
                    }),
                    (t.PageDots = r),
                    n.extend(t.defaults, { pageDots: !0 }),
                    t.createMethods.push("_createPageDots");
                var o = t.prototype;
                return (
                    (o._createPageDots = function () {
                        this.options.pageDots &&
                            ((this.pageDots = new r(this)),
                            this.on("activate", this.activatePageDots),
                            this.on("select", this.updateSelectedPageDots),
                            this.on("cellChange", this.updatePageDots),
                            this.on("resize", this.updatePageDots),
                            this.on("deactivate", this.deactivatePageDots));
                    }),
                    (o.activatePageDots = function () {
                        this.pageDots.activate();
                    }),
                    (o.updateSelectedPageDots = function () {
                        this.pageDots.updateSelected();
                    }),
                    (o.updatePageDots = function () {
                        this.pageDots.setDots();
                    }),
                    (o.deactivatePageDots = function () {
                        this.pageDots.deactivate();
                    }),
                    (t.PageDots = r),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (e, t, i) {
                      return C(L, e, t, i);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = C(L, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")))
                : C(L, L.Flickity, L.Unipointer, L.fizzyUIUtils),
            (k = window),
            (q = function (e, t, i) {
                function n(e) {
                    (this.parent = e), (this.state = "stopped"), (this.onVisibilityChange = this.visibilityChange.bind(this)), (this.onVisibilityPlay = this.visibilityPlay.bind(this));
                }
                ((n.prototype = Object.create(e.prototype)).play = function () {
                    "playing" != this.state &&
                        (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : ((this.state = "playing"), document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()));
                }),
                    (n.prototype.tick = function () {
                        if ("playing" == this.state) {
                            var e = this.parent.options.autoPlay;
                            e = "number" == typeof e ? e : 3e3;
                            var t = this;
                            this.clear(),
                                (this.timeout = setTimeout(function () {
                                    t.parent.next(!0), t.tick();
                                }, e));
                        }
                    }),
                    (n.prototype.stop = function () {
                        (this.state = "stopped"), this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange);
                    }),
                    (n.prototype.clear = function () {
                        clearTimeout(this.timeout);
                    }),
                    (n.prototype.pause = function () {
                        "playing" == this.state && ((this.state = "paused"), this.clear());
                    }),
                    (n.prototype.unpause = function () {
                        "paused" == this.state && this.play();
                    }),
                    (n.prototype.visibilityChange = function () {
                        this[document.hidden ? "pause" : "unpause"]();
                    }),
                    (n.prototype.visibilityPlay = function () {
                        this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay);
                    }),
                    t.extend(i.defaults, { pauseAutoPlayOnHover: !0 }),
                    i.createMethods.push("_createPlayer");
                var r = i.prototype;
                return (
                    (r._createPlayer = function () {
                        (this.player = new n(this)), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer);
                    }),
                    (r.activatePlayer = function () {
                        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this));
                    }),
                    (r.playPlayer = function () {
                        this.player.play();
                    }),
                    (r.stopPlayer = function () {
                        this.player.stop();
                    }),
                    (r.pausePlayer = function () {
                        this.player.pause();
                    }),
                    (r.unpausePlayer = function () {
                        this.player.unpause();
                    }),
                    (r.deactivatePlayer = function () {
                        this.player.stop(), this.element.removeEventListener("mouseenter", this);
                    }),
                    (r.onmouseenter = function () {
                        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this));
                    }),
                    (r.onmouseleave = function () {
                        this.player.unpause(), this.element.removeEventListener("mouseleave", this);
                    }),
                    (i.Player = n),
                    i
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (e, t, i) {
                      return q(e, t, i);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = q(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")))
                : q(k.EvEmitter, k.fizzyUIUtils, k.Flickity),
            (A = window),
            (I = function (e, t, i) {
                var n = t.prototype;
                return (
                    (n.insert = function (e, t) {
                        var i = this._makeCells(e);
                        if (i && i.length) {
                            var n,
                                r,
                                o = this.cells.length;
                            t = void 0 === t ? o : t;
                            var a =
                                    ((n = i),
                                    (r = document.createDocumentFragment()),
                                    n.forEach(function (e) {
                                        r.appendChild(e.element);
                                    }),
                                    r),
                                s = t == o;
                            if (s) this.slider.appendChild(a);
                            else {
                                var l = this.cells[t].element;
                                this.slider.insertBefore(a, l);
                            }
                            if (0 === t) this.cells = i.concat(this.cells);
                            else if (s) this.cells = this.cells.concat(i);
                            else {
                                var c = this.cells.splice(t, o - t);
                                this.cells = this.cells.concat(i).concat(c);
                            }
                            this._sizeCells(i), this.cellChange(t, !0);
                        }
                    }),
                    (n.append = function (e) {
                        this.insert(e, this.cells.length);
                    }),
                    (n.prepend = function (e) {
                        this.insert(e, 0);
                    }),
                    (n.remove = function (e) {
                        var t = this.getCells(e);
                        if (t && t.length) {
                            var n = this.cells.length - 1;
                            t.forEach(function (e) {
                                e.remove(), (n = Math.min(this.cells.indexOf(e), n)), i.removeFrom(this.cells, e);
                            }, this),
                                this.cellChange(n, !0);
                        }
                    }),
                    (n.cellSizeChange = function (e) {
                        var t = this.getCell(e);
                        if (t) {
                            t.getSize();
                            var i = this.cells.indexOf(t);
                            this.cellChange(i);
                        }
                    }),
                    (n.cellChange = function (e, t) {
                        var i = this.selectedElement;
                        this._positionCells(e), this._getWrapShiftCells(), this.setGallerySize();
                        var n = this.getCell(i);
                        n && (this.selectedIndex = this.getCellSlideIndex(n)),
                            (this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex)),
                            this.emitEvent("cellChange", [e]),
                            this.select(this.selectedIndex),
                            t && this.positionSliderAtSelected();
                    }),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (e, t) {
                      return I(A, e, t);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = I(A, require("./flickity"), require("fizzy-ui-utils")))
                : I(A, A.Flickity, A.fizzyUIUtils),
            (D = window),
            (j = function (e, t, i) {
                "use strict";
                t.createMethods.push("_createLazyload");
                var n = t.prototype;
                function r(e, t) {
                    (this.img = e), (this.flickity = t), this.load();
                }
                return (
                    (n._createLazyload = function () {
                        this.on("select", this.lazyLoad);
                    }),
                    (n.lazyLoad = function () {
                        var e = this.options.lazyLoad;
                        if (e) {
                            var t = this.getAdjacentCellElements("number" == typeof e ? e : 0),
                                n = [];
                            t.forEach(function (e) {
                                var t = (function (e) {
                                    if ("IMG" == e.nodeName) {
                                        var t = e.getAttribute("data-flickity-lazyload"),
                                            n = e.getAttribute("data-flickity-lazyload-src"),
                                            r = e.getAttribute("data-flickity-lazyload-srcset");
                                        if (t || n || r) return [e];
                                    }
                                    var o = e.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
                                    return i.makeArray(o);
                                })(e);
                                n = n.concat(t);
                            }),
                                n.forEach(function (e) {
                                    new r(e, this);
                                }, this);
                        }
                    }),
                    (r.prototype.handleEvent = i.handleEvent),
                    (r.prototype.load = function () {
                        this.img.addEventListener("load", this), this.img.addEventListener("error", this);
                        var e = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
                            t = this.img.getAttribute("data-flickity-lazyload-srcset");
                        (this.img.src = e),
                            t && this.img.setAttribute("srcset", t),
                            this.img.removeAttribute("data-flickity-lazyload"),
                            this.img.removeAttribute("data-flickity-lazyload-src"),
                            this.img.removeAttribute("data-flickity-lazyload-srcset");
                    }),
                    (r.prototype.onload = function (e) {
                        this.complete(e, "flickity-lazyloaded");
                    }),
                    (r.prototype.onerror = function (e) {
                        this.complete(e, "flickity-lazyerror");
                    }),
                    (r.prototype.complete = function (e, t) {
                        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
                        var i = this.flickity.getParentCell(this.img),
                            n = i && i.element;
                        this.flickity.cellSizeChange(n), this.img.classList.add(t), this.flickity.dispatchEvent("lazyLoad", e, n);
                    }),
                    (t.LazyLoader = r),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (e, t) {
                      return j(D, e, t);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = j(D, require("./flickity"), require("fizzy-ui-utils")))
                : j(D, D.Flickity, D.fizzyUIUtils),
            window,
            (P = function (e) {
                return e;
            }),
            "function" == typeof define && define.amd
                ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], P)
                : "object" == typeof module &&
                  module.exports &&
                  (module.exports = P(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload"))),
            (F = window),
            (M = function (e, t) {
                e.createMethods.push("_createAsNavFor");
                var i = e.prototype;
                return (
                    (i._createAsNavFor = function () {
                        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
                        var e = this.options.asNavFor;
                        if (e) {
                            var t = this;
                            setTimeout(function () {
                                t.setNavCompanion(e);
                            });
                        }
                    }),
                    (i.setNavCompanion = function (i) {
                        i = t.getQueryElement(i);
                        var n = e.data(i);
                        if (n && n != this) {
                            this.navCompanion = n;
                            var r = this;
                            (this.onNavCompanionSelect = function () {
                                r.navCompanionSelect();
                            }),
                                n.on("select", this.onNavCompanionSelect),
                                this.on("staticClick", this.onNavStaticClick),
                                this.navCompanionSelect(!0);
                        }
                    }),
                    (i.navCompanionSelect = function (e) {
                        var t = this.navCompanion && this.navCompanion.selectedCells;
                        if (t) {
                            var i,
                                n,
                                r,
                                o = t[0],
                                a = this.navCompanion.cells.indexOf(o),
                                s = a + t.length - 1,
                                l = Math.floor(((i = a), (n = s), (n - i) * (r = this.navCompanion.cellAlign) + i));
                            if ((this.selectCell(l, !1, e), this.removeNavSelectedElements(), !(l >= this.cells.length))) {
                                var c = this.cells.slice(a, 1 + s);
                                (this.navSelectedElements = c.map(function (e) {
                                    return e.element;
                                })),
                                    this.changeNavSelectedClass("add");
                            }
                        }
                    }),
                    (i.changeNavSelectedClass = function (e) {
                        this.navSelectedElements.forEach(function (t) {
                            t.classList[e]("is-nav-selected");
                        });
                    }),
                    (i.activateAsNavFor = function () {
                        this.navCompanionSelect(!0);
                    }),
                    (i.removeNavSelectedElements = function () {
                        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements);
                    }),
                    (i.onNavStaticClick = function (e, t, i, n) {
                        "number" == typeof n && this.navCompanion.selectCell(n);
                    }),
                    (i.deactivateAsNavFor = function () {
                        this.removeNavSelectedElements();
                    }),
                    (i.destroyAsNavFor = function () {
                        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion);
                    }),
                    e
                );
            }),
            "function" == typeof define && define.amd
                ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], M)
                : "object" == typeof module && module.exports
                ? (module.exports = M(require("flickity"), require("fizzy-ui-utils")))
                : (F.Flickity = M(F.Flickity, F.fizzyUIUtils)),
            (z = "undefined" != typeof window ? window : this),
            (O = function (e, t) {
                var i = e.jQuery,
                    n = e.console;
                function r(e, t) {
                    for (var i in t) e[i] = t[i];
                    return e;
                }
                var o = Array.prototype.slice;
                function a(e, t, s) {
                    if (!(this instanceof a)) return new a(e, t, s);
                    var l,
                        c = e;
                    "string" == typeof e && (c = document.querySelectorAll(e)),
                        c
                            ? ((this.elements = Array.isArray((l = c)) ? l : "object" == typeof l && "number" == typeof l.length ? o.call(l) : [l]),
                              (this.options = r({}, this.options)),
                              "function" == typeof t ? (s = t) : r(this.options, t),
                              s && this.on("always", s),
                              this.getImages(),
                              i && (this.jqDeferred = new i.Deferred()),
                              setTimeout(this.check.bind(this)))
                            : n.error("Bad element for imagesLoaded " + (c || e));
                }
                ((a.prototype = Object.create(t.prototype)).options = {}),
                    (a.prototype.getImages = function () {
                        (this.images = []), this.elements.forEach(this.addElementImages, this);
                    }),
                    (a.prototype.addElementImages = function (e) {
                        "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
                        var t = e.nodeType;
                        if (t && s[t]) {
                            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                                var r = i[n];
                                this.addImage(r);
                            }
                            if ("string" == typeof this.options.background) {
                                var o = e.querySelectorAll(this.options.background);
                                for (n = 0; n < o.length; n++) {
                                    var a = o[n];
                                    this.addElementBackgroundImages(a);
                                }
                            }
                        }
                    });
                var s = { 1: !0, 9: !0, 11: !0 };
                function l(e) {
                    this.img = e;
                }
                function c(e, t) {
                    (this.url = e), (this.element = t), (this.img = new Image());
                }
                return (
                    (a.prototype.addElementBackgroundImages = function (e) {
                        var t = getComputedStyle(e);
                        if (t)
                            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n; ) {
                                var r = n && n[2];
                                r && this.addBackground(r, e), (n = i.exec(t.backgroundImage));
                            }
                    }),
                    (a.prototype.addImage = function (e) {
                        var t = new l(e);
                        this.images.push(t);
                    }),
                    (a.prototype.addBackground = function (e, t) {
                        var i = new c(e, t);
                        this.images.push(i);
                    }),
                    (a.prototype.check = function () {
                        var e = this;
                        function t(t, i, n) {
                            setTimeout(function () {
                                e.progress(t, i, n);
                            });
                        }
                        (this.progressedCount = 0),
                            (this.hasAnyBroken = !1),
                            this.images.length
                                ? this.images.forEach(function (e) {
                                      e.once("progress", t), e.check();
                                  })
                                : this.complete();
                    }),
                    (a.prototype.progress = function (e, t, i) {
                        this.progressedCount++,
                            (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
                            this.emitEvent("progress", [this, e, t]),
                            this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                            this.progressedCount == this.images.length && this.complete(),
                            this.options.debug && n && n.log("progress: " + i, e, t);
                    }),
                    (a.prototype.complete = function () {
                        var e = this.hasAnyBroken ? "fail" : "done";
                        if (((this.isComplete = !0), this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred)) {
                            var t = this.hasAnyBroken ? "reject" : "resolve";
                            this.jqDeferred[t](this);
                        }
                    }),
                    ((l.prototype = Object.create(t.prototype)).check = function () {
                        this.getIsImageComplete()
                            ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                            : ((this.proxyImage = new Image()),
                              this.proxyImage.addEventListener("load", this),
                              this.proxyImage.addEventListener("error", this),
                              this.img.addEventListener("load", this),
                              this.img.addEventListener("error", this),
                              (this.proxyImage.src = this.img.src));
                    }),
                    (l.prototype.getIsImageComplete = function () {
                        return this.img.complete && this.img.naturalWidth;
                    }),
                    (l.prototype.confirm = function (e, t) {
                        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
                    }),
                    (l.prototype.handleEvent = function (e) {
                        var t = "on" + e.type;
                        this[t] && this[t](e);
                    }),
                    (l.prototype.onload = function () {
                        this.confirm(!0, "onload"), this.unbindEvents();
                    }),
                    (l.prototype.onerror = function () {
                        this.confirm(!1, "onerror"), this.unbindEvents();
                    }),
                    (l.prototype.unbindEvents = function () {
                        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
                    }),
                    ((c.prototype = Object.create(l.prototype)).check = function () {
                        this.img.addEventListener("load", this),
                            this.img.addEventListener("error", this),
                            (this.img.src = this.url),
                            this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
                    }),
                    (c.prototype.unbindEvents = function () {
                        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
                    }),
                    (c.prototype.confirm = function (e, t) {
                        (this.isLoaded = e), this.emitEvent("progress", [this, this.element, t]);
                    }),
                    (a.makeJQueryPlugin = function (t) {
                        (t = t || e.jQuery) &&
                            ((i = t).fn.imagesLoaded = function (e, t) {
                                return new a(this, e, t).jqDeferred.promise(i(this));
                            });
                    }),
                    a.makeJQueryPlugin(),
                    a
                );
            }),
            "function" == typeof define && define.amd
                ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (e) {
                      return O(z, e);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = O(z, require("ev-emitter")))
                : (z.imagesLoaded = O(z, z.EvEmitter)),
            (H = window),
            (B = function (e, t, i) {
                "use strict";
                t.createMethods.push("_createImagesLoaded");
                var n = t.prototype;
                return (
                    (n._createImagesLoaded = function () {
                        this.on("activate", this.imagesLoaded);
                    }),
                    (n.imagesLoaded = function () {
                        if (this.options.imagesLoaded) {
                            var e = this;
                            i(this.slider).on("progress", function (t, i) {
                                var n = e.getParentCell(i.img);
                                e.cellSizeChange(n && n.element), e.options.freeScroll || e.positionSliderAtSelected();
                            });
                        }
                    }),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (e, t) {
                      return B(H, e, t);
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = B(H, require("flickity"), require("imagesloaded")))
                : (H.Flickity = B(H, H.Flickity, H.imagesLoaded)),
            (N = this),
            (R = function e(t, i) {
                var n = t.Slide,
                    r = n.prototype.updateTarget;
                (n.prototype.updateTarget = function () {
                    if ((r.apply(this, arguments), this.parent.options.fade)) {
                        var e = this.target - this.x,
                            t = this.cells[0].x;
                        this.cells.forEach(function (i) {
                            var n = i.x - t - e;
                            i.renderPosition(n);
                        });
                    }
                }),
                    (n.prototype.setOpacity = function (e) {
                        this.cells.forEach(function (t) {
                            t.element.style.opacity = e;
                        });
                    });
                var o = t.prototype;
                t.createMethods.push("_createFade"),
                    (o._createFade = function () {
                        (this.fadeIndex = this.selectedIndex),
                            (this.prevSelectedIndex = this.selectedIndex),
                            this.on("select", this.onSelectFade),
                            this.on("dragEnd", this.onDragEndFade),
                            this.on("settle", this.onSettleFade),
                            this.on("activate", this.onActivateFade),
                            this.on("deactivate", this.onDeactivateFade);
                    });
                var a = o.updateSlides;
                (o.updateSlides = function () {
                    a.apply(this, arguments),
                        this.options.fade &&
                            this.slides.forEach(function (e, t) {
                                var i = t == this.selectedIndex ? 1 : 0;
                                e.setOpacity(i);
                            }, this);
                }),
                    (o.onSelectFade = function () {
                        (this.fadeIndex = Math.min(this.prevSelectedIndex, this.slides.length - 1)), (this.prevSelectedIndex = this.selectedIndex);
                    }),
                    (o.onSettleFade = function () {
                        delete this.didDragEnd, this.options.fade && (this.selectedSlide.setOpacity(1), this.slides[this.fadeIndex] && this.fadeIndex != this.selectedIndex && this.slides[this.fadeIndex].setOpacity(0));
                    }),
                    (o.onDragEndFade = function () {
                        this.didDragEnd = !0;
                    }),
                    (o.onActivateFade = function () {
                        this.options.fade && this.element.classList.add("is-fade");
                    }),
                    (o.onDeactivateFade = function () {
                        this.options.fade &&
                            (this.element.classList.remove("is-fade"),
                            this.slides.forEach(function (e) {
                                e.setOpacity("");
                            }));
                    });
                var s = o.positionSlider;
                o.positionSlider = function () {
                    if (!this.options.fade) {
                        s.apply(this, arguments);
                        return;
                    }
                    this.fadeSlides(), this.dispatchScrollEvent();
                };
                var l = o.positionSliderAtSelected;
                (o.positionSliderAtSelected = function () {
                    this.options.fade && this.setTranslateX(0), l.apply(this, arguments);
                }),
                    (o.fadeSlides = function () {
                        if (!(this.slides.length < 2)) {
                            var e = this.getFadeIndexes(),
                                t = this.slides[e.a],
                                i = this.slides[e.b],
                                n = this.wrapDifference(t.target, i.target),
                                r = this.wrapDifference(t.target, -this.x);
                            (r /= n), t.setOpacity(1 - r), i.setOpacity(r);
                            var o = e.a;
                            this.isDragging && (o = r > 0.5 ? e.a : e.b),
                                void 0 != this.fadeHideIndex && this.fadeHideIndex != o && this.fadeHideIndex != e.a && this.fadeHideIndex != e.b && this.slides[this.fadeHideIndex].setOpacity(0),
                                (this.fadeHideIndex = o);
                        }
                    }),
                    (o.getFadeIndexes = function () {
                        return this.isDragging || this.didDragEnd ? (this.options.wrapAround ? this.getFadeDragWrapIndexes() : this.getFadeDragLimitIndexes()) : { a: this.fadeIndex, b: this.selectedIndex };
                    }),
                    (o.getFadeDragWrapIndexes = function () {
                        var e = this.slides.map(function (e, t) {
                                return this.getSlideDistance(-this.x, t);
                            }, this),
                            t = e.map(function (e) {
                                return Math.abs(e);
                            }),
                            n = Math.min.apply(Math, t),
                            r = t.indexOf(n),
                            o = e[r],
                            a = this.slides.length;
                        return { a: r, b: i.modulo(r + (o >= 0 ? 1 : -1), a) };
                    }),
                    (o.getFadeDragLimitIndexes = function () {
                        for (var e = 0, t = 0; t < this.slides.length - 1; t++) {
                            var i = this.slides[t];
                            if (-this.x < i.target) break;
                            e = t;
                        }
                        return { a: e, b: e + 1 };
                    }),
                    (o.wrapDifference = function (e, t) {
                        var i = t - e;
                        if (!this.options.wrapAround) return i;
                        var n = i + this.slideableWidth,
                            r = i - this.slideableWidth;
                        return Math.abs(n) < Math.abs(i) && (i = n), Math.abs(r) < Math.abs(i) && (i = r), i;
                    });
                var c = o._getWrapShiftCells;
                o._getWrapShiftCells = function () {
                    this.options.fade || c.apply(this, arguments);
                };
                var u = o.shiftWrapCells;
                return (
                    (o.shiftWrapCells = function () {
                        this.options.fade || u.apply(this, arguments);
                    }),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define(["flickity/js/index", "fizzy-ui-utils/utils"], R)
                : "object" == typeof module && module.exports
                ? (module.exports = R(require("flickity"), require("fizzy-ui-utils")))
                : R(N.Flickity, N.fizzyUIUtils),
            (U = window),
            (W = function e(t, i) {
                return (
                    t.createMethods.push("_createSync"),
                    (t.prototype._createSync = function () {
                        this.syncers = {};
                        var e = this.options.sync;
                        if ((this.on("destroy", this.unsyncAll), e)) {
                            var t = this;
                            setTimeout(function i() {
                                t.sync(e);
                            });
                        }
                    }),
                    (t.prototype.sync = function (e) {
                        e = i.getQueryElement(e);
                        var n = t.data(e);
                        n && (this._syncCompanion(n), n._syncCompanion(this));
                    }),
                    (t.prototype._syncCompanion = function (e) {
                        var t = this;
                        function i() {
                            var i = t.selectedIndex;
                            e.selectedIndex != i && e.select(i);
                        }
                        this.on("select", i), (this.syncers[e.guid] = { flickity: e, listener: i });
                    }),
                    (t.prototype.unsync = function (e) {
                        e = i.getQueryElement(e);
                        var n = t.data(e);
                        this._unsync(n);
                    }),
                    (t.prototype._unsync = function (e) {
                        e && (this._unsyncCompanion(e), e._unsyncCompanion(this));
                    }),
                    (t.prototype._unsyncCompanion = function (e) {
                        var t = e.guid,
                            i = this.syncers[t];
                        this.off("select", i.listener), delete this.syncers[t];
                    }),
                    (t.prototype.unsyncAll = function () {
                        for (var e in this.syncers) {
                            var t = this.syncers[e];
                            this._unsync(t.flickity);
                        }
                    }),
                    t
                );
            }),
            "function" == typeof define && define.amd
                ? define(["flickity/js/index", "fizzy-ui-utils/utils"], W)
                : "object" == typeof module && module.exports
                ? (module.exports = W(require("flickity"), require("fizzy-ui-utils")))
                : (U.Flickity = W(U.Flickity, U.fizzyUIUtils)),
            (V = this),
            (G = function (e, t) {
                var i = e.Slide,
                    n = i.prototype.updateTarget;
                (i.prototype.updateTarget = function () {
                    var e, t;
                    n.apply(this, arguments),
                        this.parent.options.fade &&
                            ((e = this.target - this.x),
                            (t = this.cells[0].x),
                            this.cells.forEach(function (i) {
                                var n = i.x - t - e;
                                i.renderPosition(n);
                            }));
                }),
                    (i.prototype.setOpacity = function (e) {
                        this.cells.forEach(function (t) {
                            t.element.style.opacity = e;
                        });
                    });
                var r = e.prototype;
                e.createMethods.push("_createFade"),
                    (r._createFade = function () {
                        (this.fadeIndex = this.selectedIndex),
                            (this.prevSelectedIndex = this.selectedIndex),
                            this.on("select", this.onSelectFade),
                            this.on("dragEnd", this.onDragEndFade),
                            this.on("settle", this.onSettleFade),
                            this.on("activate", this.onActivateFade),
                            this.on("deactivate", this.onDeactivateFade);
                    });
                var o = r.updateSlides;
                (r.updateSlides = function () {
                    o.apply(this, arguments),
                        this.options.fade &&
                            this.slides.forEach(function (e, t) {
                                var i = t == this.selectedIndex ? 1 : 0;
                                e.setOpacity(i);
                            }, this);
                }),
                    (r.onSelectFade = function () {
                        (this.fadeIndex = Math.min(this.prevSelectedIndex, this.slides.length - 1)), (this.prevSelectedIndex = this.selectedIndex);
                    }),
                    (r.onSettleFade = function () {
                        delete this.didDragEnd, this.options.fade && (this.selectedSlide.setOpacity(1), this.slides[this.fadeIndex] && this.fadeIndex != this.selectedIndex && this.slides[this.fadeIndex].setOpacity(0));
                    }),
                    (r.onDragEndFade = function () {
                        this.didDragEnd = !0;
                    }),
                    (r.onActivateFade = function () {
                        this.options.fade && this.element.classList.add("is-fade");
                    }),
                    (r.onDeactivateFade = function () {
                        this.options.fade &&
                            (this.element.classList.remove("is-fade"),
                            this.slides.forEach(function (e) {
                                e.setOpacity("");
                            }));
                    });
                var a = r.positionSlider;
                r.positionSlider = function () {
                    this.options.fade ? (this.fadeSlides(), this.dispatchScrollEvent()) : a.apply(this, arguments);
                };
                var s = r.positionSliderAtSelected;
                (r.positionSliderAtSelected = function () {
                    this.options.fade && this.setTranslateX(0), s.apply(this, arguments);
                }),
                    (r.fadeSlides = function () {
                        var e, t, i, n, r, o;
                        this.slides.length < 2 ||
                            ((e = this.getFadeIndexes()),
                            (t = this.slides[e.a]),
                            (i = this.slides[e.b]),
                            (n = this.wrapDifference(t.target, i.target)),
                            (r = this.wrapDifference(t.target, -this.x)),
                            (r /= n),
                            t.setOpacity(1 - r),
                            i.setOpacity(r),
                            (o = e.a),
                            this.isDragging && (o = 0.5 < r ? e.a : e.b),
                            null != this.fadeHideIndex && this.fadeHideIndex != o && this.fadeHideIndex != e.a && this.fadeHideIndex != e.b && this.slides[this.fadeHideIndex].setOpacity(0),
                            (this.fadeHideIndex = o));
                    }),
                    (r.getFadeIndexes = function () {
                        return this.isDragging || this.didDragEnd ? (this.options.wrapAround ? this.getFadeDragWrapIndexes() : this.getFadeDragLimitIndexes()) : { a: this.fadeIndex, b: this.selectedIndex };
                    }),
                    (r.getFadeDragWrapIndexes = function () {
                        var e = this.slides.map(function (e, t) {
                                return this.getSlideDistance(-this.x, t);
                            }, this),
                            i = e.map(function (e) {
                                return Math.abs(e);
                            }),
                            n = Math.min.apply(Math, i),
                            r = i.indexOf(n),
                            o = e[r],
                            a = this.slides.length;
                        return { a: r, b: t.modulo(r + (0 <= o ? 1 : -1), a) };
                    }),
                    (r.getFadeDragLimitIndexes = function () {
                        for (var e = 0, t = 0; t < this.slides.length - 1; t++) {
                            var i = this.slides[t];
                            if (-this.x < i.target) break;
                            e = t;
                        }
                        return { a: e, b: e + 1 };
                    }),
                    (r.wrapDifference = function (e, t) {
                        var i = t - e;
                        if (!this.options.wrapAround) return i;
                        var n = i + this.slideableWidth,
                            r = i - this.slideableWidth;
                        return Math.abs(n) < Math.abs(i) && (i = n), Math.abs(r) < Math.abs(i) && (i = r), i;
                    });
                var l = r._getWrapShiftCells;
                r._getWrapShiftCells = function () {
                    this.options.fade || l.apply(this, arguments);
                };
                var c = r.shiftWrapCells;
                return (
                    (r.shiftWrapCells = function () {
                        this.options.fade || c.apply(this, arguments);
                    }),
                    e
                );
            }),
            "function" == typeof define && define.amd
                ? define(["flickity/js/index", "fizzy-ui-utils/utils"], G)
                : "object" == typeof module && module.exports
                ? (module.exports = G(require("flickity"), require("fizzy-ui-utils")))
                : G(V.Flickity, V.fizzyUIUtils);
    })(),
    (function e() {
        (function () {
            function e(e, t) {
                for (var i = -1, n = t.length, r = e.length; ++i < n; ) e[r + i] = t[i];
                return e;
            }
            function t(e, t, i) {
                for (var n = -1, r = e.length; ++n < r; ) {
                    var o = e[n],
                        a = t(o);
                    if (null != a && (s === et ? a == a : i(a, s)))
                        var s = a,
                            l = o;
                }
                return l;
            }
            function i(e) {
                return e && e.Object === Object ? e : null;
            }
            function n(e) {
                return ea[e];
            }
            function r(e) {
                var t = !1;
                if (null != e && "function" != typeof e.toString)
                    try {
                        t = !!(e + "");
                    } catch (i) {}
                return t;
            }
            function o(e, t) {
                return (e = "number" == typeof e || eo.test(e) ? +e : -1) > -1 && 0 == e % 1 && (null == t ? 9007199254740991 : t) > e;
            }
            function a(e) {
                if (R(e) && !eP(e)) {
                    if (e instanceof s) return e;
                    if (ey.call(e, "__wrapped__")) {
                        var t = new s(e.__wrapped__, e.__chain__);
                        return (t.__actions__ = E(e.__actions__)), t;
                    }
                }
                return new s(e);
            }
            function s(e, t) {
                (this.__wrapped__ = e), (this.__actions__ = []), (this.__chain__ = !!t);
            }
            function l(e, t, i, n) {
                var r;
                return (r = e === et) || (r = (e === (r = ev[i]) || (e != e && r != r)) && !ey.call(n, i)), r ? t : e;
            }
            function c(e) {
                return N(e) ? ew(e) : {};
            }
            function u(e, t, i) {
                if ("function" != typeof e) throw TypeError("Expected a function");
                return setTimeout(function () {
                    e.apply(et, i);
                }, t);
            }
            function d(e, t) {
                var i = [];
                return (
                    eC(e, function (e, n, r) {
                        t(e, n, r) && i.push(e);
                    }),
                    i
                );
            }
            function h(t, i, n, r) {
                r || (r = []);
                for (var o = -1, a = t.length; ++o < a; ) {
                    var s = t[o];
                    i > 0 && R(s) && O(s) && (n || eP(s) || z(s)) ? (i > 1 ? h(s, i - 1, n, r) : e(r, s)) : n || (r[r.length] = s);
                }
                return r;
            }
            function p(e, t) {
                return e && ek(e, t, Z);
            }
            function f(e, t) {
                return d(t, function (t) {
                    return H(e[t]);
                });
            }
            function m(e, t, i, n, o) {
                var a, s, l, c, u, d, h, p, f, v, y;
                return (
                    e === t ||
                    (null != e && null != t && (N(e) || R(t))
                        ? ((a = e),
                          (s = t),
                          (l = m),
                          (c = i),
                          (u = n),
                          (d = o),
                          (h = eP(a)),
                          (p = eP(s)),
                          (f = "[object Array]"),
                          (v = "[object Array]"),
                          h || ("[object Arguments]" == (f = eb.call(a)) && (f = "[object Object]")),
                          p || ("[object Arguments]" == (v = eb.call(s)) && (v = "[object Object]")),
                          (y = "[object Object]" == f && !r(a)),
                          (p = "[object Object]" == v && !r(s)),
                          (v = f == v) && !h && !y
                              ? (function e(t, i, n) {
                                    switch (n) {
                                        case "[object Boolean]":
                                        case "[object Date]":
                                            return +t == +i;
                                        case "[object Error]":
                                            return t.name == i.name && t.message == i.message;
                                        case "[object Number]":
                                            return t != +t ? i != +i : t == +i;
                                        case "[object RegExp]":
                                        case "[object String]":
                                            return t == i + "";
                                    }
                                    return !1;
                                })(a, s, f)
                              : !(2 & u) && ((f = y && ey.call(a, "__wrapped__")), (p = p && ey.call(s, "__wrapped__")), f || p)
                              ? l(f ? a.value() : a, p ? s.value() : s, c, u, d)
                              : !!v &&
                                (d || (d = []),
                                (f = D(d, function (e) {
                                    return e[0] === a;
                                })) && f[1]
                                    ? f[1] == s
                                    : (d.push([a, s]), (s = (h ? C : k)(a, s, l, c, u, d)), d.pop(), s)))
                        : e != e && t != t)
                );
            }
            function v(e) {
                var t = typeof e;
                return "function" == t ? e : null == e ? Q : ("object" == t ? b : S)(e);
            }
            function y(e) {
                e = null == e ? e : Object(e);
                var t,
                    i = [];
                for (t in e) i.push(t);
                return i;
            }
            function g(e, t) {
                var i = -1,
                    n = O(e) ? Array(e.length) : [];
                return (
                    eC(e, function (e, r, o) {
                        n[++i] = t(e, r, o);
                    }),
                    n
                );
            }
            function b(e) {
                var t = Z(e);
                return function (i) {
                    var n = t.length;
                    if (null == i) return !n;
                    for (i = Object(i); n--; ) {
                        var r = t[n];
                        if (!(r in i && m(e[r], i[r], et, 3))) return !1;
                    }
                    return !0;
                };
            }
            function S(e) {
                return function (t) {
                    return null == t ? et : t[e];
                };
            }
            function $(e, t, i) {
                var n = -1,
                    r = e.length;
                for (0 > t && (t = -t > r ? 0 : r + t), 0 > (i = i > r ? r : i) && (i += r), r = t > i ? 0 : (i - t) >>> 0, t >>>= 0, i = Array(r); ++n < r; ) i[n] = e[n + t];
                return i;
            }
            function E(e) {
                return $(e, 0, e.length);
            }
            function w(e, t) {
                var i;
                return (
                    eC(e, function (e, n, r) {
                        return !(i = t(e, n, r));
                    }),
                    !!i
                );
            }
            function x(e, t, i, n) {
                i || (i = {});
                for (var r = -1, o = t.length; ++r < o; ) {
                    var a = t[r],
                        s = n ? n(i[a], e[a], a, i, e) : e[a],
                        l = i,
                        c = l[a];
                    (ey.call(l, a) && (c === s || (c != c && s != s)) && (s !== et || a in l)) || (l[a] = s);
                }
                return i;
            }
            function L(e) {
                return F(function (t, i) {
                    var n = -1,
                        r = i.length,
                        o = r > 1 ? i[r - 1] : et,
                        o = "function" == typeof o ? (r--, o) : et;
                    for (t = Object(t); ++n < r; ) {
                        var a = i[n];
                        a && e(t, a, n, o);
                    }
                    return t;
                });
            }
            function C(e, t, i, n, r, o) {
                var a = -1,
                    s = 1 & r,
                    l = e.length,
                    c = t.length;
                if (l != c && !(2 & r && c > l)) return !1;
                for (c = !0; ++a < l; ) {
                    var u = e[a],
                        d = t[a];
                    if (void 0 !== et) {
                        c = !1;
                        break;
                    }
                    if (s) {
                        if (
                            !w(t, function (e) {
                                return u === e || i(u, e, n, r, o);
                            })
                        ) {
                            c = !1;
                            break;
                        }
                    } else if (u !== d && !i(u, d, n, r, o)) {
                        c = !1;
                        break;
                    }
                }
                return c;
            }
            function k(e, t, i, n, r, o) {
                var a = 2 & r,
                    s = Z(e),
                    l = s.length,
                    c = Z(t).length;
                if (l != c && !a) return !1;
                for (var u = l; u--; ) {
                    var d = s[u];
                    if (!(a ? d in t : ey.call(t, d))) return !1;
                }
                for (c = !0; ++u < l; ) {
                    var d = s[u],
                        h = e[d],
                        p = t[d];
                    if (void 0 !== et || (h !== p && !i(h, p, n, r, o))) {
                        c = !1;
                        break;
                    }
                    a || (a = "constructor" == d);
                }
                return c && !a && (i = e.constructor) != (n = t.constructor) && "constructor" in e && "constructor" in t && !("function" == typeof i && i instanceof i && "function" == typeof n && n instanceof n) && (c = !1), c;
            }
            function q(e) {
                var t = e ? e.length : et;
                if (B(t) && (eP(e) || W(e) || z(e))) {
                    e = String;
                    for (var i = -1, n = Array(t); ++i < t; ) n[i] = e(i);
                    t = n;
                } else t = null;
                return t;
            }
            function A(e) {
                var t = e && e.constructor,
                    t = (H(t) && t.prototype) || ev;
                return e === t;
            }
            function I(e) {
                return e ? e[0] : et;
            }
            function D(e, t) {
                var i, n, r, o;
                return (
                    (i = e),
                    (n = v(t)),
                    (r = eC)(i, function (e, t, i) {
                        return n(e, t, i) ? ((o = e), !1) : void 0;
                    }),
                    o
                );
            }
            function j(e, t) {
                return eC(e, "function" == typeof t ? t : Q);
            }
            function T(e, t, i) {
                var n, r, o, a, s;
                return (
                    (n = e),
                    (r = v(t)),
                    (o = i),
                    (a = 3 > arguments.length),
                    (s = eC)(n, function (e, t, i) {
                        o = a ? ((a = !1), e) : r(o, e, t, i);
                    }),
                    o
                );
            }
            function P(e, t) {
                var i;
                if ("function" != typeof t) throw TypeError("Expected a function");
                return (
                    (e = eF(e)),
                    function () {
                        return 0 < --e && (i = t.apply(this, arguments)), 1 >= e && (t = et), i;
                    }
                );
            }
            function F(e) {
                var t;
                if ("function" != typeof e) throw TypeError("Expected a function");
                return (
                    (t = e_(t === et ? e.length - 1 : eF(t), 0)),
                    function () {
                        for (var i = arguments, n = -1, r = e_(i.length - t, 0), o = Array(r); ++n < r; ) o[n] = i[t + n];
                        for (r = Array(t + 1), n = -1; ++n < t; ) r[n] = i[n];
                        return (r[t] = o), e.apply(this, r);
                    }
                );
            }
            function M(e, t) {
                return e > t;
            }
            function z(e) {
                return R(e) && O(e) && ey.call(e, "callee") && (!ex.call(e, "callee") || "[object Arguments]" == eb.call(e));
            }
            function O(e) {
                return null != e && !("function" == typeof e && H(e)) && B(eA(e));
            }
            function H(e) {
                return "[object Function]" == (e = N(e) ? eb.call(e) : "") || "[object GeneratorFunction]" == e;
            }
            function B(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && 9007199254740991 >= e;
            }
            function N(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t);
            }
            function R(e) {
                return !!e && "object" == typeof e;
            }
            function U(e) {
                return "number" == typeof e || (R(e) && "[object Number]" == eb.call(e));
            }
            function W(e) {
                return "string" == typeof e || (!eP(e) && R(e) && "[object String]" == eb.call(e));
            }
            function V(e, t) {
                return t > e;
            }
            function G(e) {
                return "string" == typeof e ? e : null == e ? "" : e + "";
            }
            function Z(e) {
                var t = A(e);
                if (!t && !O(e)) return e8(Object(e));
                var i,
                    n = q(e),
                    r = !!n,
                    n = n || [],
                    a = n.length;
                for (i in e) !ey.call(e, i) || (r && ("length" == i || o(i, a))) || (t && "constructor" == i) || n.push(i);
                return n;
            }
            function X(e) {
                for (var t = -1, i = A(e), n = y(e), r = n.length, a = q(e), s = !!a, a = a || [], l = a.length; ++t < r; ) {
                    var c = n[t];
                    (s && ("length" == c || o(c, l))) || ("constructor" == c && (i || !ey.call(e, c))) || a.push(c);
                }
                return a;
            }
            function K(e) {
                var t, i;
                return e
                    ? ((t = e),
                      (i = Z(e)),
                      g(i, function (e) {
                          return t[e];
                      }))
                    : [];
            }
            function Q(e) {
                return e;
            }
            function Y(t, i, n) {
                var r = Z(i),
                    o = f(i, r);
                null != n || (N(i) && (o.length || !r.length)) || ((n = i), (i = t), (t = this), (o = f(i, Z(i))));
                var a = !N(n) || !("chain" in n) || n.chain,
                    s = H(t);
                return (
                    eC(o, function (n) {
                        var r = i[n];
                        (t[n] = r),
                            s &&
                                (t.prototype[n] = function () {
                                    var i = this.__chain__;
                                    if (a || i) {
                                        var n = t(this.__wrapped__);
                                        return (n.__actions__ = E(this.__actions__)).push({ func: r, args: arguments, thisArg: t }), (n.__chain__ = i), n;
                                    }
                                    return r.apply(t, e([this.value()], arguments));
                                });
                    }),
                    t
                );
            }
            var J,
                ee,
                et,
                ei = 1 / 0,
                en = /[&<>"'`]/g,
                er = RegExp(en.source),
                eo = /^(?:0|[1-9]\d*)$/,
                ea = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" },
                es = { function: !0, object: !0 },
                el = es[typeof exports] && exports && !exports.nodeType ? exports : et,
                ec = es[typeof module] && module && !module.nodeType ? module : et,
                eu = ec && ec.exports === el ? el : et,
                ed = i(es[typeof self] && self),
                eh = i(es[typeof window] && window),
                ep = i(es[typeof this] && this),
                ef = i(el && ec && "object" == typeof global && global) || (eh !== (ep && ep.window) && eh) || ed || ep || Function("return this")(),
                em = Array.prototype,
                ev = Object.prototype,
                ey = ev.hasOwnProperty,
                eg = 0,
                eb = ev.toString,
                eS = ef._,
                e$ = ef.Reflect,
                eE = e$ ? e$.f : et,
                ew = Object.create,
                ex = ev.propertyIsEnumerable,
                eL = ef.isFinite,
                e8 = Object.keys,
                e_ = Math.max,
                eC =
                    ((J = p),
                    function (e, t) {
                        if (null == e) return e;
                        if (!O(e)) return J(e, t);
                        for (var i = e.length, n = ee ? i : -1, r = Object(e); (ee ? n-- : ++n < i) && !1 !== t(r[n], n, r); );
                        return e;
                    }),
                ek = function (e, t, i) {
                    var n = -1,
                        r = Object(e);
                    i = i(e);
                    for (var o = i.length; o--; ) {
                        var a = i[++n];
                        if (!1 === t(r[a], a, r)) break;
                    }
                    return e;
                };
            eE &&
                !ex.call({ valueOf: 1 }, "valueOf") &&
                (y = function (e) {
                    e = eE(e);
                    for (var t, i = []; !(t = e.next()).done; ) i.push(t.value);
                    return i;
                });
            var eq,
                eA = S("length"),
                eI = F(function (t, i) {
                    return eP(t) || (t = null == t ? [] : [Object(t)]), h(i, 1), e(E(t), K);
                }),
                eD = F(function (e, t, i) {
                    return (function e(t, i, n) {
                        if ("function" != typeof t) throw TypeError("Expected a function");
                        var r,
                            o =
                                ((r = t),
                                function () {
                                    var e = arguments,
                                        t = c(r.prototype),
                                        e = r.apply(t, e);
                                    return N(e) ? e : t;
                                });
                        return function e() {
                            for (var r = -1, a = arguments.length, s = -1, l = n.length, c = Array(l + a), u = this && this !== ef && this instanceof e ? o : t; ++s < l; ) c[s] = n[s];
                            for (; a--; ) c[s++] = arguments[++r];
                            return u.apply(i, c);
                        };
                    })(e, t, i);
                }),
                ej = F(function (e, t) {
                    return u(e, 1, t);
                }),
                eT = F(function (e, t, i) {
                    return u(e, eM(t) || 0, i);
                }),
                eP = Array.isArray,
                eF = Number,
                eM = Number,
                ez = L(function (e, t) {
                    x(t, Z(t), e);
                }),
                eO = L(function (e, t) {
                    x(t, X(t), e);
                }),
                eH = L(function (e, t, i, n) {
                    x(t, X(t), e, n);
                }),
                eB = F(function (e) {
                    return e.push(et, l), eH.apply(et, e);
                }),
                eN = F(function (e, t) {
                    var i, n;
                    return null == e
                        ? {}
                        : ((i = e),
                          (n = h(t, 1)),
                          (i = Object(i)),
                          T(
                              n,
                              function (e, t) {
                                  return t in i && (e[t] = i[t]), e;
                              },
                              {}
                          ));
                });
            (s.prototype = c(a.prototype)),
                (s.prototype.constructor = s),
                (a.assignIn = eO),
                (a.before = P),
                (a.bind = eD),
                (a.chain = function (e) {
                    return ((e = a(e)).__chain__ = !0), e;
                }),
                (a.compact = function (e) {
                    return d(e, Boolean);
                }),
                (a.concat = eI),
                (a.create = function (e, t) {
                    var i = c(e);
                    return t ? ez(i, t) : i;
                }),
                (a.defaults = eB),
                (a.defer = ej),
                (a.delay = eT),
                (a.filter = function (e, t) {
                    return d(e, v(t));
                }),
                (a.flatten = function (e) {
                    return e && e.length ? h(e, 1) : [];
                }),
                (a.flattenDeep = function (e) {
                    return e && e.length ? h(e, ei) : [];
                }),
                (a.iteratee = v),
                (a.keys = Z),
                (a.map = function (e, t) {
                    return g(e, v(t));
                }),
                (a.matches = function (e) {
                    return b(ez({}, e));
                }),
                (a.mixin = Y),
                (a.negate = function (e) {
                    if ("function" != typeof e) throw TypeError("Expected a function");
                    return function () {
                        return !e.apply(this, arguments);
                    };
                }),
                (a.once = function (e) {
                    return P(2, e);
                }),
                (a.pick = eN),
                (a.slice = function (e, t, i) {
                    var n = e ? e.length : 0;
                    return (i = i === et ? n : +i), n ? $(e, null == t ? 0 : +t, i) : [];
                }),
                (a.sortBy = function (e, t) {
                    var i = 0;
                    return (
                        (t = v(t)),
                        g(
                            g(e, function (e, n, r) {
                                return { c: e, b: i++, a: t(e, n, r) };
                            }).sort(function (e, t) {
                                var i;
                                n: {
                                    i = e.a;
                                    var n = t.a;
                                    if (i !== n) {
                                        var r = null === i,
                                            o = i === et,
                                            a = i == i,
                                            s = null === n,
                                            l = n === et,
                                            c = n == n;
                                        if ((i > n && !s) || !a || (r && !l && c) || (o && c)) {
                                            i = 1;
                                            break n;
                                        }
                                        if ((n > i && !r) || !c || (s && !o && a) || (l && a)) {
                                            i = -1;
                                            break n;
                                        }
                                    }
                                    i = 0;
                                }
                                return i || e.b - t.b;
                            }),
                            S("c")
                        )
                    );
                }),
                (a.tap = function (e, t) {
                    return t(e), e;
                }),
                (a.thru = function (e, t) {
                    return t(e);
                }),
                (a.toArray = function (e) {
                    return O(e) ? (e.length ? E(e) : []) : K(e);
                }),
                (a.values = K),
                (a.extend = eO),
                Y(a, a),
                (a.clone = function (e) {
                    return N(e) ? (eP(e) ? E(e) : x(e, Z(e))) : e;
                }),
                (a.escape = function (e) {
                    return (e = G(e)) && er.test(e) ? e.replace(en, n) : e;
                }),
                (a.every = function (e, t, i) {
                    var n, r, o;
                    return (
                        (t = i ? et : t),
                        (n = e),
                        (r = v(t)),
                        (o = !0),
                        eC(n, function (e, t, i) {
                            return (o = !!r(e, t, i));
                        }),
                        o
                    );
                }),
                (a.find = D),
                (a.forEach = j),
                (a.has = function (e, t) {
                    return null != e && ey.call(e, t);
                }),
                (a.head = I),
                (a.identity = Q),
                (a.indexOf = function (e, t, i) {
                    var n = e ? e.length : 0;
                    i = ((i = "number" == typeof i ? (0 > i ? e_(n + i, 0) : i) : 0) || 0) - 1;
                    for (var r = t == t; ++i < n; ) {
                        var o = e[i];
                        if (r ? o === t : o != o) return i;
                    }
                    return -1;
                }),
                (a.isArguments = z),
                (a.isArray = eP),
                (a.isBoolean = function (e) {
                    return !0 === e || !1 === e || (R(e) && "[object Boolean]" == eb.call(e));
                }),
                (a.isDate = function (e) {
                    return R(e) && "[object Date]" == eb.call(e);
                }),
                (a.isEmpty = function (e) {
                    if (O(e) && (eP(e) || W(e) || H(e.splice) || z(e))) return !e.length;
                    for (var t in e) if (ey.call(e, t)) return !1;
                    return !0;
                }),
                (a.isEqual = function (e, t) {
                    return m(e, t);
                }),
                (a.isFinite = function (e) {
                    return "number" == typeof e && eL(e);
                }),
                (a.isFunction = H),
                (a.isNaN = function (e) {
                    return U(e) && e != +e;
                }),
                (a.isNull = function (e) {
                    return null === e;
                }),
                (a.isNumber = U),
                (a.isObject = N),
                (a.isRegExp = function (e) {
                    return N(e) && "[object RegExp]" == eb.call(e);
                }),
                (a.isString = W),
                (a.isUndefined = function (e) {
                    return e === et;
                }),
                (a.last = function (e) {
                    var t = e ? e.length : 0;
                    return t ? e[t - 1] : et;
                }),
                (a.max = function (e) {
                    return e && e.length ? t(e, Q, M) : et;
                }),
                (a.min = function (e) {
                    return e && e.length ? t(e, Q, V) : et;
                }),
                (a.noConflict = function () {
                    return ef._ === this && (ef._ = eS), this;
                }),
                (a.noop = function () {}),
                (a.reduce = T),
                (a.result = function (e, t, i) {
                    return (t = null == e ? et : e[t]) === et && (t = i), H(t) ? t.call(e) : t;
                }),
                (a.size = function (e) {
                    return null == e ? 0 : (e = O(e) ? e : Z(e)).length;
                }),
                (a.some = function (e, t, i) {
                    return (t = i ? et : t), w(e, v(t));
                }),
                (a.uniqueId = function (e) {
                    var t = ++eg;
                    return G(e) + t;
                }),
                (a.each = j),
                (a.first = I),
                Y(
                    a,
                    ((eq = {}),
                    p(a, function (e, t) {
                        ey.call(a.prototype, t) || (eq[t] = e);
                    }),
                    eq),
                    { chain: !1 }
                ),
                (a.VERSION = "4.5.1"),
                eC("pop join replace reverse split push shift sort splice unshift".split(" "), function (e) {
                    var t = (/^(?:replace|split)$/.test(e) ? String.prototype : em)[e],
                        i = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
                        n = /^(?:pop|join|replace|shift)$/.test(e);
                    a.prototype[e] = function () {
                        var e = arguments;
                        return n && !this.__chain__
                            ? t.apply(this.value(), e)
                            : this[i](function (i) {
                                  return t.apply(i, e);
                              });
                    };
                }),
                (a.prototype.toJSON = a.prototype.valueOf = a.prototype.value = function () {
                    var t, i;
                    return (
                        (t = this.__wrapped__),
                        T(
                            (i = this.__actions__),
                            function (t, i) {
                                return i.func.apply(i.thisArg, e([t], i.args));
                            },
                            t
                        )
                    );
                }),
                ((eh || ed || {})._ = a),
                "function" == typeof define && "object" == typeof define.amd && define.amd
                    ? define(function () {
                          return a;
                      })
                    : el && ec
                    ? (eu && ((ec.exports = a)._ = a), (el._ = a))
                    : (ef._ = a);
        }.call(this));
    })(),
    (window.WAU = window.WAU || {}),
    (WAU.Slideout = (function () {
        var e = void 0;
        function t() {
            let e = document.querySelector(".slideout--active"),
                t = e.getAttribute("data-wau-slideout"),
                i = document.querySelector('.js-slideout-open[data-wau-slideout-target="' + t + '"]'),
                n = i.getAttribute("data-slideout-direction");
            r(n, i);
        }
        function i() {
            return (e = document.querySelector(".js-slideout-toggle-wrapper")).classList.contains("slideout-left--open") || e.classList.contains("slideout-right--open");
        }
        function n(t, i, n) {
            e.classList.add("slideout-" + t + "--open"), e.classList.remove("slideout-" + t + "--closed"), i.classList.add("slideout--active"), n.setAttribute("aria-expanded", "true");
            let r = Math.abs(0 - document.querySelector(".site-wrap").getBoundingClientRect().top);
            i.querySelectorAll("*").forEach((e, t) => {
                e.removeAttribute("tabIndex");
            }),
                (e.style.overflow = "hidden"),
                (e.style.position = "fixed"),
                (e.style.top = `-${r}px`),
                (e.style.width = "100%");
        }
        function r(t, i) {
            let n = document.querySelectorAll(".slideout--active"),
                r = document.querySelectorAll(".js-slideout-open"),
                o = document.querySelectorAll(".js-slideout-close");
            e.classList.remove("slideout-" + t + "--open"),
                e.classList.add("slideout-" + t + "--closed"),
                n.forEach(function (e) {
                    e.classList.remove("slideout--active"),
                        "quickview" == e.getAttribute("data-wau-slideout") && (document.querySelector(".js-quickview-content").innerHTML = ""),
                        e.querySelectorAll("*").forEach((e, t) => {
                            e.setAttribute("tabIndex", "-1");
                        });
                }),
                r.forEach(function (e) {
                    e.setAttribute("aria-expanded", "false");
                }),
                o.forEach(function (e) {
                    e.setAttribute("aria-expanded", "false");
                });
            let a = Math.abs(0 - document.querySelector(".site-wrap").getBoundingClientRect().top);
            e.style.removeProperty("overflow"), e.style.removeProperty("position"), e.style.removeProperty("top"), e.style.removeProperty("width"), window.scrollTo(0, a);
        }
        function o(t, i, n) {
            let r = document.createElement("aside"),
                o = document.querySelector('[data-wau-slideout-target="' + i + '"]'),
                a = "slideout-" + i;
            return (n = n || e), r.classList.add("slideout"), r.classList.add("slideout__drawer-" + t), r.setAttribute("data-wau-slideout", i), r.setAttribute("id", a), o.setAttribute("aria-controls", a), n.appendChild(r), r;
        }
        document.addEventListener("keyup", function (e) {
            "Escape" === e.key && (e.preventDefault(), t());
        }),
            document.addEventListener("click", function (e) {
                e.target === document.querySelector(".js-slideout-overlay") && t();
            });
        let a = {
                openByName: function e(t) {
                    let i = document.querySelector('[data-wau-slideout-target="' + t + '"]'),
                        r = i.getAttribute("data-slideout-direction"),
                        o = document.querySelector('[data-wau-slideout="' + t + '"]');
                    n(r, o, i);
                },
                closeByName: function e(t) {
                    let i = document.querySelector('[data-wau-slideout-target="' + t + '"]'),
                        n = i.getAttribute("data-slideout-direction"),
                        o = document.querySelector('.js-slideout-open[data-wau-slideout-target="' + t + '"]');
                    r(n, o);
                },
                createSlideoutEl: o,
            },
            s = {};
        return (
            (s.init = function t(i) {
    if (void 0 === i) {
        console.log("The Slideout must have an associated name.");
        return;
    }
    e = document.querySelector(".js-slideout-toggle-wrapper");
    let a = document.querySelectorAll(".js-slideout-close"),
        s = document.querySelector('.js-slideout-open[data-wau-slideout-target="' + i + '"]');

    // Trigger button not on this page: skip this slideout instead of crashing
    if (!s) return;

    let l = s.getAttribute("data-slideout-direction"),
        c = document.querySelector(`aside[data-wau-slideout=${i}]`);

    c || (c = o(l)),
        c.querySelectorAll("*").forEach((e, t) => {
            e.setAttribute("tabIndex", "-1");
        }),
        s.addEventListener("click", function () {
            n(l, c, s);
        }),
        a.forEach(function (e) {
            let t = e.getAttribute("data-slideout-direction");
            e.addEventListener("click", function (i) {
                r(t, e);
            });
        });
}),
            Object.keys(a).forEach(function (e) {
                s["_" + e] = a[e];
            }),
            s
        );
    })()),
    (WAU.Modal = (function () {
        var e = void 0;
        function t() {
            let e = document.querySelector(".modal--active");
            e.getAttribute("data-wau-modal");
            let t = e.querySelector(".js-modal-close");
            r(t);
        }
        function i() {
            return (e = document.querySelector(".js-modal-toggle-wrapper")).classList.contains("modal--open");
        }
        function n(t, i) {
            let n = Math.abs(0 - document.querySelector(".site-wrap").getBoundingClientRect().top);
            if (((e.style.width = "100%"), (t.style.top = `calc(${n}px + 10vh)`), e.classList.add("modal--open"), e.classList.remove("modal--closed"), t.classList.add("modal--active"), t.getAttribute("data-wau-modal"))) {
                var r = t.getAttribute("data-wau-modal"),
                    r = "modal-" + r + "--open";
                e.classList.add(r);
            }
            i.setAttribute("aria-expanded", "true");
        }
        function r(t) {
            let i = document.querySelectorAll(".modal--active"),
                n = document.querySelectorAll(".js-modal-open"),
                r = document.querySelectorAll(".js-modal-close");
            "modal-quickview" == t.getAttribute("aria-controls") && (document.querySelector(".js-quickview-content").innerHTML = ""),
                e.classList.remove("modal--open"),
                e.classList.add("modal--closed"),
                i.forEach(function (t) {
                    if (t.getAttribute("data-wau-modal")) {
                        var i = t.getAttribute("data-wau-modal"),
                            i = "modal-" + i + "--open";
                        e.classList.remove(i);
                    }
                    t.classList.remove("modal--active");
                }),
                n.forEach(function (e) {
                    e.setAttribute("aria-expanded", "false");
                }),
                r.forEach(function (e) {
                    e.setAttribute("aria-expanded", "false");
                }),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("position"),
                e.style.removeProperty("padding-right"),
                e.style.removeProperty("top"),
                e.style.removeProperty("width");
        }
        function o(t, i) {
            let n = document.createElement("div"),
                r = document.createElement("div"),
                o = document.createElement("div"),
                a = document.querySelector('[data-wau-modal-target="' + t + '"]'),
                s = document.querySelector('[data-wau-modal-content="' + t + '"]'),
                l = "modal-" + t;
            (i = i || e),
                n.classList.add("modal"),
                n.classList.add("modal__container"),
                n.setAttribute("data-wau-modal", t),
                n.setAttribute("id", l),
                r.classList.add("modal__inner-wrapper"),
                r.classList.add("modal__general-modal__wrapper"),
                s.hasAttribute("data-wau-modal-remove-original") ? o.appendChild(s) : (o.innerHTML = s.innerHTML),
                o.classList.add("modal__inner-content-container");
            let c = (function e(t) {
                let i = document.createElement("div"),
                    n = document.createElement("button"),
                    r = document.createElement("div");
                return (
                    i.classList.add("slideout__trigger--close"),
                    i.classList.add("slideout__trigger-" + t + "__wrapper"),
                    i.classList.add("slideout__trigger-general-modal__wrapper"),
                    n.classList.add("slideout__trigger-" + t),
                    n.classList.add("slideout__trigger-general-modal"),
                    n.classList.add("js-modal-close"),
                    n.setAttribute("aria-controls", "modal-" + t),
                    n.setAttribute("aria-label", "Close modal"),
                    r.classList.add("icn-close"),
                    n.appendChild(r),
                    i.appendChild(n),
                    i
                );
            })(t);
            return r.prepend(c), n.appendChild(r), r.appendChild(o), a.setAttribute("aria-controls", l), i.appendChild(n), n;
        }
        document.addEventListener("keyup", function (e) {
            "Escape" === e.key && (e.preventDefault(), t());
        }),
            document.addEventListener("click", function (e) {
                e.target === document.querySelector(".js-modal-overlay") && t();
            });
        let a = {
                openByName: function e(t) {
                    let i = document.querySelector('[data-wau-modal-target="' + t + '"]'),
                        r = document.querySelector('[data-wau-modal="' + t + '"]');
                    n(r, i);
                },
                closeByName: function e(t) {
                    document.querySelector('[data-wau-modal-target="' + t + '"]');
                    let i = document.querySelector('.js-modal-open[data-wau-modal-target="' + t + '"]');
                    r(i);
                },
                createModalEl: o,
            },
            s = {};
        return (
            (s.init = function t(i) {
                if (void 0 === i) {
                    console.log("The Modal must have an associated name.");
                    return;
                }
                e = document.querySelector(".js-modal-toggle-wrapper");
                let a = document.querySelectorAll('.js-modal-open[data-wau-modal-target="' + i + '"]'),
                    s;
                a && (s = document.querySelector(`div[data-wau-modal=${i}]`)),
                    s || (s = o(i, e)),
                    a.forEach((e, t) => {
                        e.addEventListener("click", function () {
                            n(s, e);
                        });
                    });
                let l = document.querySelectorAll(".js-modal-close");
                l.forEach(function (e) {
                    e.addEventListener("click", function () {
                        r(e);
                    });
                });
            }),
            Object.keys(a).forEach(function (e) {
                s["_" + e] = a[e];
            }),
            s
        );
    })()),
    (WAU.Accordion = (function () {
        let e = { show: "is-active", open: "js-accordion-is-open", mobileNavAccordion: "js-accordion-mobile-nav" },
            t = { accordion: ".js-accordion", accordionItem: ".c-accordion__item", accordionLink: ".js-accordion-link", accordionHeader: ".js-accordion-header", accordionPanel: ".c-accordion__panel" },
            i = {},
            n = function (e) {
                if (e) return e.split(".")[1];
            };
        return (
            (i.getConfigClass = function (t) {
                if (t) return !!e[t] && "" != e[t] && e[t];
            }),
            (i.hide = function (t) {
                t.setAttribute("aria-expanded", "false");
                let i = document.querySelector(`#${t.getAttribute("aria-controls")}`);
                i.setAttribute("hidden", ""),
                    i.classList.remove(e.show),
                    setTimeout(function () {
                        i.style.display = "none";
                    }, 350);
            }),
            (i.show = function (t, n) {
                let r = document.querySelector(`#${t.getAttribute("aria-controls")}`),
                    o = t.closest(r.getAttribute("data-parent")),
                    a = !!(n || o.hasAttribute("data-accordion-allow-multiple")),
                    s = o.classList.contains(e.mobileNavAccordion);
                if (!a && r.hasAttribute("data-parent")) {
                    let l = "";
                    if (!(l = s ? ':scope > li > [aria-expanded="true"]' : ':scope > [aria-expanded="true"]')) return;
                    let c = t.closest(r.getAttribute("data-parent")).querySelectorAll(l);
                    if (!c) return;
                    c.forEach(function (e) {
                        i.hide(e);
                    });
                }
                t.setAttribute("aria-expanded", "true"),
                    r.removeAttribute("hidden"),
                    (r.style.display = "block"),
                    setTimeout(function () {
                        r.classList.add(e.show);
                    }, 500);
            }),
            (i.toggle = function (e, t) {
                if ("true" == e.getAttribute("aria-expanded")) {
                    i.hide(e);
                    return;
                }
                i.show(e, t);
            }),
            (i.init = function () {
                document.querySelectorAll(`[data-toggle="accordion"]:not(.${e.open})`).forEach(function (e, t) {
                    i.hide(e);
                }),
                    document.addEventListener("keydown", function (i) {
                        let r = i.target,
                            o = i.code,
                            a = { preventScroll: !1 },
                            s = r.classList.contains("dropdown-arrow");
                        if ((r.classList.contains(n(t.accordionHeader)) || r.classList.contains(n(t.accordionLink)) || s) && ("ArrowUp" == o || "ArrowDown" == o)) {
                            let l = !!r.closest(t.accordion).classList.contains(e.mobileNavAccordion),
                                c = l ? `:scope > li > ${t.accordionLink}` : `:scope > ${t.accordionHeader}`,
                                u = r.closest(t.accordion).querySelectorAll(c);
                            if (l && s) {
                                r.previousElementSibling.focus(a);
                                return;
                            }
                            let d;
                            u.forEach(function (e, t) {
                                e == r && (d = t);
                            });
                            let h = u.length,
                                p = (d + h + ("PageDown" == o || "ArrowDown" == o ? 1 : -1)) % h;
                            u[p].focus(a);
                        }
                    }),
                    document.addEventListener("click", function (e) {
                        let t = e.target.matches('[data-toggle="accordion"]') ? e.target : e.target.closest('[data-toggle="accordion"]');
                        if (!t) return !1;
                        i.toggle(t), e.preventDefault();
                    });
            }),
            i
        );
    })()),
    (WAU.ProductColorSwatches = (function () {
        let e = { list: ":scope > ul.options", swatches: ".js-collection-swatch", listing: ".product-index", image: ".js-product-image" },
            t = { active: "js-is-active", fadeOut: "fadeOut", fadeIn: "fadeIn" };
        class i extends HTMLElement {
            constructor() {
                super(),
                    (this.duration = this.hasAttribute("data-duration") ? this.getAttribute("data-duration") : 300),
                    (this.original = this.getAttribute("data-original")),
                    (this.firstMedia = this.getAttribute("data-featured-media")),
                    (this.list = this.querySelector(e.list)),
                    (this.swatches = this.querySelectorAll(e.swatches)),
                    (this.image = this.closest(e.listing).querySelector(e.image)),
                    this.setDuration(this.duration),
                    this.swatches.forEach((e) => {
                        e.addEventListener("mouseover", () => {
                            this.handleMouseOver(e);
                        }),
                            e.addEventListener("mouseout", () => {
                                this.handleMouseOut(e);
                            });
                    });
            }
            handleMouseOut(t) {
                if (!t || this.firstMedia == t.getAttribute("data-media")) return !1;
                let i = this.original;
                this.removeActiveClass(),
                    theme.Helpers.animateCSS(t.closest(e.listing).querySelector(e.image), "fadeOut", "")
                        .then(() => {
                            t.closest(e.listing).querySelector(`${e.image} img`).setAttribute("srcset", i);
                        })
                        .then(() => {
                            theme.Helpers.animateCSS(t.closest(e.listing).querySelector(e.image), "fadeIn", "");
                        });
            }
            handleMouseOver(i) {
                if (!i || this.firstMedia == i.getAttribute("data-media")) return !1;
                let n = i.getAttribute("data-href");
                if (!n) return !1;
                i.classList.contains(t.active) ||
                    (this.removeActiveClass(),
                    i.classList.add(t.active),
                    theme.Helpers.animateCSS(i.closest(e.listing).querySelector(e.image), "fadeOut", "")
                        .then(() => {
                            i.closest(e.listing).querySelector(`${e.image} img`).setAttribute("srcset", n);
                        })
                        .then(() => {
                            theme.Helpers.animateCSS(i.closest(e.listing).querySelector(e.image), "fadeIn", "");
                        }));
            }
            setDuration() {
                this.image.style.animationDuration = `${this.duration}ms`;
            }
            removeActiveClass() {
                this.swatches.forEach((e) => {
                    e.classList.contains(t.active) && e.classList.remove(t.active);
                });
            }
        }
        customElements.define("product-swatches", i);
    })()),
    (WAU.ProductGridVideo = {
        init: function e() {
            console.count("WAU:Product Grid Video: Init"),
                document.querySelectorAll(".js-bg-video-wrapper").forEach(function (e) {
                    WAU.ProductGridVideo.initVideo(e);
                });
        },
        initVideo: function e(t) {
            var i = t.dataset.productId,
                n = t.dataset.videoUrl,
                r = ".js-bg-video-" + i + ":not(.is-active)",
                o = document.querySelector(r);
            if (!o) return !1;
            var a = { mp4: n },
                s = new vidbg(r, a);
            o.classList.add("is-active"),
                document.addEventListener("shopify:section:unload", function (e) {
                    WAU.ProductGridVideo.destroyVideo(s);
                }),
                document.addEventListener("shopify:section:select", function (e) {
                    WAU.ProductGridVideo.reinitVideo(r, a);
                }),
                WAU.ProductGridVideo.addIntersectionObserver(s);
        },
        addIntersectionObserver: function e(t) {
            if (!t) return console.error("No instance provided to the function."), !1;
            if ("IntersectionObserver" in window) {
                let i = t.videoEl;
                if (!i) return console.error("Error. not a valid target to observe."), !1;
                function n(e, i) {
                    e.forEach((e) => {
                        e.isIntersecting ? t.isVideoPlaying() || t.playVideo() : t.isVideoPlaying() && t.pauseVideo();
                    });
                }
                function r(e) {
                    new IntersectionObserver(n).observe(i), i.removeEventListener("playing", r);
                }
                i.addEventListener("playing", r);
            } else console.log("Intersection observer API not supported in this browser.");
        },
        destroyVideo: function e(t) {
            t.destroy();
        },
        reinitVideo: function e(t, i) {
            return new vidbg(t, i);
        },
    }),
    (window.theme = window.theme || {}),
    (theme.a11yHelpers = (function () {
        let e = !1;
        function t(e, t, i) {
            let n = e.querySelectorAll('a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'),
                r = n.length;
            var o = 0;
            for (let a = 0; a < n.length; a += 1) n[a] === t && (o = a);
            return "next" === i ? (o === r - 1 ? n[0] : n[o + 1]) : "prev" === i ? (0 === o ? n[r - 1] : n[o - 1]) : void 0;
        }
        function i(e, i) {
            return t(e, i, "next");
        }
        function n(e, i) {
            return t(e, i, "prev");
        }
        return {
            setUpAriaExpansion: function e() {
                let t = document.querySelectorAll(".js-aria-expand");
                t.forEach(function (e) {
                    e.addEventListener("mouseover", function (t) {
                        e.setAttribute("aria-expanded", "true");
                    }),
                        e.addEventListener("mouseout", function (t) {
                            e.setAttribute("aria-expanded", "false");
                        });
                });
            },
            setUpAccessibleNavigationMenus: function t() {
                function i() {
                    let e = document.querySelectorAll(".navigation__menuitem--active");
                    e.forEach(function (e) {
                        e.classList.remove("navigation__menuitem--active"), e.setAttribute("aria-expanded", "false");
                    });
                }
                function n() {
                    let e = document.querySelectorAll(".js-menuitem-with-nested-dropdown");
                    e.forEach(function (e) {
                        e.classList.remove("dropdown__menuitem--active"), e.setAttribute("aria-expanded", "false");
                    });
                }
                e ||
                    document.addEventListener("keyup", function (e) {
                        if ("Escape" === e.key) {
                            let t = document.querySelectorAll(".dropdown__menuitem--active"),
                                r = document.querySelectorAll(".navigation__menuitem--active");
                            if ((e.preventDefault(), t.length >= 1)) {
                                n();
                                return;
                            }
                            if (r.length >= 1) {
                                i();
                                return;
                            }
                        }
                    }),
                    e ||
                        document.addEventListener("keydown", function (e) {
                            if ("Enter" === e.key) {
                                if (
                                    ((document.activeElement.classList.contains("js-open-dropdown-on-key") || document.activeElement.parentNode.classList.contains("js-menuitem-with-nested-dropdown")) &&
                                        (e.stopPropagation(), e.preventDefault()),
                                    document.activeElement.parentNode.classList.contains("navigation__menuitem--active"))
                                ) {
                                    i();
                                    return;
                                }
                                if (document.activeElement.parentNode.classList.contains("dropdown__menuitem--active")) {
                                    n();
                                    return;
                                }
                                if (document.activeElement.classList.contains("js-open-dropdown-on-key")) {
                                    document.activeElement.parentNode.classList.add("navigation__menuitem--active");
                                    return;
                                }
                                if (document.activeElement.parentNode.classList.contains("js-menuitem-with-nested-dropdown")) {
                                    var t;
                                    document.activeElement.parentNode.classList.add("dropdown__menuitem--active"),
                                        (t = document.activeElement.parentNode),
                                        setTimeout(function () {
                                            theme.DOMHelpers.isElementPastEdge(t) ? t.classList.add("dropdown--edge") : t.classList.remove("dropdown--edge");
                                        }, 0);
                                    return;
                                }
                            }
                        }),
                    (e = !0);
            },
            focusOnElement: function e(t) {
                let i = t.querySelector('a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])');
                i && i.focus();
            },
        };
    })()),
    (theme.DOMHelpers = (function () {
        function e(e, t) {
            let i = e.getBoundingClientRect(),
                n = i.left,
                r = i.width,
                o = (document.documentElement.clientHeight, document.documentElement.clientWidth),
                a = n + r - o;
            return a > 0 && ((e.style.transform = `translateX(-${a + t}px)`), !0);
        }
        return {
            isElementPastEdge: function e(t) {
                let i = t.getBoundingClientRect(),
                    n = i.left,
                    r = i.width,
                    o = (document.documentElement.clientHeight, document.documentElement.clientWidth);
                return n + r >= o;
            },
            isOutOfBounds: function e(t) {
                if (!t) return console.log("Error. Must provide element to check out of bounds"), !1;
                var i = t.getBoundingClientRect(),
                    n = {};
                return (
                    (n.left = i.left < 0),
                    (n.leftAmount = i.left),
                    (n.right = i.right > (window.innerWidth || document.documentElement.clientWidth)),
                    (n.rightAmount = i.right - (window.innerWidth || document.documentElement.clientWidth)),
                    n
                );
            },
        };
    })()),
    (theme.Helpers = (function () {
        var e = !1;
        function t() {
            return e;
        }
        return {
            setTouch: function t() {
                e = !0;
            },
            isTouch: t,
            debounce: function e(t, i, n) {
                var r;
                return function () {
                    var e = this,
                        o = arguments,
                        a = function () {
                            (r = null), n || t.apply(e, o);
                        },
                        s = n && !r;
                    clearTimeout(r), (r = setTimeout(a, i)), s && t.apply(e, o);
                };
            },
            animateCSS: function e(t, i, n = "animate__") {
                return new Promise(function (e, r) {
                    let o = `${n}${i}`,
                        a = t;
                    a.classList.add(`${n}animated`, o),
                        a.addEventListener(
                            "animationend",
                            function t() {
                                a.classList.remove(`${n}animated`, o), e("Animation ended");
                            },
                            { once: !0 }
                        );
                });
            },
            Toggle: function e(t) {
                var i = document.getElementById(t);
                i.classList.contains("animate-hide")
                    ? (i.classList.remove("animate-hide", "fadeOut"), i.classList.add("animate-show", "fadeIn"), (i.style.visibility = "visible"))
                    : (i.classList.remove("animate-show", "fadeIn"), i.classList.add("animate-hide", "fadeOut"), (i.style.visibility = "hidden"));
            },
            toggleClass: function e(t, i) {
                var n = document.getElementById(t);
                if (!n) return !1;
                n.classList.contains(i) ? n.classList.remove(i) : n.classList.add(i);
            },
            Accordion: function e(t, i, n) {
                let r = t.querySelector(n);
                if (!t.querySelector(i)) return !1;
                t.querySelector(i).addEventListener("click", function (e) {
                    e.preventDefault(),
                        this.classList.contains("closed")
                            ? (this.classList.remove("closed"), this.parentElement.classList.remove("closed"), this.setAttribute("aria-expanded", "true"))
                            : (this.classList.add("closed"), this.parentElement.classList.add("closed"), this.setAttribute("aria-expanded", "false")),
                        r.classList.contains("closed") ? (r.classList.remove("closed"), (r.style.display = "block")) : (r.classList.add("closed"), (r.style.display = "none"));
                });
            },
            fadeOut: function e(t) {
                (t.style.opacity = 1),
                    (function e() {
                        (t.style.opacity -= 0.1) < 0 ? (t.style.display = "none") : requestAnimationFrame(e);
                    })();
            },
            fadeIn: function e(t, i) {
                (t.style.opacity = 0),
                    (t.style.display = i || "block"),
                    (function e() {
                        var i = parseFloat(t.style.opacity);
                        (i += 0.1) > 1 || ((t.style.opacity = i), requestAnimationFrame(e));
                    })();
            },
            getScrollbarWidth: function e() {
                let t = document.createElement("div");
                (t.style.visibility = "hidden"), (t.style.overflow = "scroll"), (t.style.msOverflowStyle = "scrollbar"), document.body.appendChild(t);
                let i = document.createElement("div");
                t.appendChild(i);
                let n = t.offsetWidth - i.offsetWidth;
                return t.parentNode.removeChild(t), n;
            },
            smoothScrollTo: function e(t, i, n) {
                let r = window.scrollX || window.pageXOffset,
                    o = window.scrollY || window.pageYOffset,
                    a = t - r,
                    s = i - o,
                    l = new Date().getTime(),
                    c = function (e, t, i, n) {
                        return (e /= n / 2) < 1 ? (i / 2) * e * e * e * e + t : (-i / 2) * ((e -= 2) * e * e * e - 2) + t;
                    },
                    u = window.setInterval(function () {
                        let e = new Date().getTime() - l,
                            t = c(e, r, a, n),
                            i = c(e, o, s, n);
                        e >= n && window.clearInterval(u), window.scrollTo(t, i);
                    }, 1e3 / 60);
            },
            formatMoney: function e(t, i) {
                "string" == typeof t && (t = t.replace(".", ""));
                let n = "",
                    r = /\{\{\s*(\w+)\s*\}\}/,
                    o = i || "${{amount}}";
                function a(e, t = 2, i = ",", n = ".") {
                    if (isNaN(e) || null == e) return 0;
                    e = (e / 100).toFixed(t);
                    let r = e.split("."),
                        o = r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${i}`),
                        a = r[1] ? n + r[1] : "";
                    return o + a;
                }
                switch (o.match(r)[1]) {
                    case "amount":
                        n = a(t, 2);
                        break;
                    case "amount_no_decimals":
                        n = a(t, 0);
                        break;
                    case "amount_with_comma_separator":
                        n = a(t, 2, ".", ",");
                        break;
                    case "amount_no_decimals_with_comma_separator":
                        n = a(t, 0, ".", ",");
                }
                return o.replace(r, n);
            },
        };
    })()),
    (theme.LibraryLoader = (function () {
        var e = { link: "link", script: "script" },
            t = { requested: "requested", loaded: "loaded" },
            i = "https://cdn.shopify.com/shopifycloud/",
            n = {
                youtubeSdk: { tagId: "youtube-sdk", src: "https://www.youtube.com/iframe_api", type: e.script },
                plyrShopifyStyles: { tagId: "plyr-shopify-styles", src: i + "shopify-plyr/v1.0/shopify-plyr.css", type: e.link },
                modelViewerUiStyles: { tagId: "shopify-model-viewer-ui-styles", src: i + "model-viewer-ui/assets/v1.0/model-viewer-ui.css", type: e.link },
            };
        return {
            load: function i(r, o) {
                var a,
                    s = n[r];
                if (s && s.status !== t.requested) {
                    if (((o = o || function () {}), s.status === t.loaded)) {
                        o();
                        return;
                    }
                    switch (((s.status = t.requested), s.type)) {
                        case e.script:
                            a =
                                ((l = s),
                                (c = o),
                                (u = document.createElement("script")),
                                (u.src = l.src),
                                u.addEventListener("load", function () {
                                    (l.status = t.loaded), c();
                                }),
                                u);
                            break;
                        case e.link:
                            a =
                                ((d = s),
                                (h = o),
                                (p = document.createElement("link")),
                                (p.href = d.src),
                                (p.rel = "stylesheet"),
                                (p.type = "text/css"),
                                p.addEventListener("load", function () {
                                    (d.status = t.loaded), h();
                                }),
                                p);
                    }
                    (a.id = s.tagId), (s.element = a);
                    var l,
                        c,
                        u,
                        d,
                        h,
                        p,
                        f = document.getElementsByTagName(s.type)[0];
                    f.parentNode.insertBefore(a, f);
                }
            },
        };
    })()),
    (theme.Sections = function e() {
        (this.constructors = {}),
            (this.instances = []),
            document.addEventListener("shopify:section:load", this._onSectionLoad.bind(this)),
            document.addEventListener("shopify:section:unload", this._onSectionUnload.bind(this)),
            document.addEventListener("shopify:section:select", this._onSelect.bind(this)),
            document.addEventListener("shopify:section:deselect", this._onDeselect.bind(this)),
            document.addEventListener("shopify:block:select", this._onBlockSelect.bind(this)),
            document.addEventListener("shopify:block:deselect", this._onBlockDeselect.bind(this));
    }),
    (theme.Sections.prototype = Object.assign({}, theme.Sections.prototype, {
        _createInstance: function (e, t) {
            var i = e.getAttribute("data-section-id"),
                n = e.getAttribute("data-section-type");
            if (void 0 !== (t = t || this.constructors[n])) {
                var r = Object.assign(new t(e), { id: i, type: n, container: e });
                this.instances.push(r);
            }
        },
        _onSectionLoad: function (e) {
            var t = document.querySelector('[data-section-id="' + e.detail.sectionId + '"]');
            t && this._createInstance(t);
        },
        _onSectionUnload: function (e) {
            this.instances = this.instances.filter(function (t) {
                var i = t.id === e.detail.sectionId;
                return i && "function" == typeof t.onUnload && t.onUnload(e), !i;
            });
        },
        _onSelect: function (e) {
            var t = this.instances.find(function (t) {
                return t.id === e.detail.sectionId;
            });
            void 0 !== t && "function" == typeof t.onSelect && t.onSelect(e);
        },
        _onDeselect: function (e) {
            var t = this.instances.find(function (t) {
                return t.id === e.detail.sectionId;
            });
            void 0 !== t && "function" == typeof t.onDeselect && t.onDeselect(e);
        },
        _onBlockSelect: function (e) {
            var t = this.instances.find(function (t) {
                return t.id === e.detail.sectionId;
            });
            void 0 !== t && "function" == typeof t.onBlockSelect && t.onBlockSelect(e);
        },
        _onBlockDeselect: function (e) {
            var t = this.instances.find(function (t) {
                return t.id === e.detail.sectionId;
            });
            void 0 !== t && "function" == typeof t.onBlockDeselect && t.onBlockDeselect(e);
        },
        register: function (e, t) {
            (this.constructors[e] = t),
                document.querySelectorAll('[data-section-type="' + e + '"]').forEach(
                    function (e) {
                        this._createInstance(e, t);
                    }.bind(this)
                );
        },
    })),
    (theme.Disclosure = (function () {
        var e = { disclosureForm: "[data-disclosure-form]", disclosureList: "[data-disclosure-list]", disclosureToggle: "[data-disclosure-toggle]", disclosureInput: "[data-disclosure-input]", disclosureOptions: "[data-disclosure-option]" },
            t = { listVisible: "disclosure-list--visible" };
        function i(e) {
            (this.container = e), this._cacheSelectors(), this._setupListeners();
        }
        return (
            (i.prototype = Object.assign({}, i.prototype, {
                _cacheSelectors: function () {
                    this.cache = {
                        disclosureForm: this.container.closest(e.disclosureForm),
                        disclosureList: this.container.querySelector(e.disclosureList),
                        disclosureToggle: this.container.querySelector(e.disclosureToggle),
                        disclosureInput: this.container.querySelector(e.disclosureInput),
                        disclosureOptions: this.container.querySelectorAll(e.disclosureOptions),
                    };
                },
                _setupListeners: function () {
                    (this.eventHandlers = this._setupEventHandlers()),
                        this.cache.disclosureToggle.addEventListener("click", this.eventHandlers.toggleList),
                        this.cache.disclosureOptions.forEach(function (e) {
                            e.addEventListener("click", this.eventHandlers.connectOptions);
                        }, this),
                        this.container.addEventListener("keyup", this.eventHandlers.onDisclosureKeyUp),
                        this.cache.disclosureList.addEventListener("focusout", this.eventHandlers.onDisclosureListFocusOut),
                        this.cache.disclosureToggle.addEventListener("focusout", this.eventHandlers.onDisclosureToggleFocusOut),
                        document.body.addEventListener("click", this.eventHandlers.onBodyClick);
                },
                _setupEventHandlers: function () {
                    return {
                        connectOptions: this._connectOptions.bind(this),
                        toggleList: this._toggleList.bind(this),
                        onBodyClick: this._onBodyClick.bind(this),
                        onDisclosureKeyUp: this._onDisclosureKeyUp.bind(this),
                        onDisclosureListFocusOut: this._onDisclosureListFocusOut.bind(this),
                        onDisclosureToggleFocusOut: this._onDisclosureToggleFocusOut.bind(this),
                    };
                },
                _connectOptions: function (e) {
                    e.preventDefault(), this._submitForm(e.currentTarget.dataset.value);
                },
                _onDisclosureToggleFocusOut: function (e) {
                    !1 === this.container.contains(e.relatedTarget) && this._hideList();
                },
                _onDisclosureListFocusOut: function (e) {
                    var i = e.currentTarget.contains(e.relatedTarget);
                    this.cache.disclosureList.classList.contains(t.listVisible) && !i && this._hideList();
                },
                _onDisclosureKeyUp: function (e) {
                    27 === e.which && (this._hideList(), this.cache.disclosureToggle.focus());
                },
                _onBodyClick: function (e) {
                    var i = this.container.contains(e.target);
                    this.cache.disclosureList.classList.contains(t.listVisible) && !i && this._hideList();
                },
                _submitForm: function (e) {
                    (this.cache.disclosureInput.value = e), this.cache.disclosureForm.submit();
                },
                _hideList: function () {
                    this.cache.disclosureList.classList.remove(t.listVisible), this.cache.disclosureToggle.setAttribute("aria-expanded", !1);
                },
                _toggleList: function () {
                    var e = "true" === this.cache.disclosureToggle.getAttribute("aria-expanded");
                    this.cache.disclosureList.classList.toggle(t.listVisible), this.cache.disclosureToggle.setAttribute("aria-expanded", !e);
                },
                destroy: function () {
                    this.cache.disclosureToggle.removeEventListener("click", this.eventHandlers.toggleList),
                        this.cache.disclosureOptions.forEach(function (e) {
                            e.removeEventListener("click", this.eventHandlers.connectOptions);
                        }, this),
                        this.container.removeEventListener("keyup", this.eventHandlers.onDisclosureKeyUp),
                        this.cache.disclosureList.removeEventListener("focusout", this.eventHandlers.onDisclosureListFocusOut),
                        this.cache.disclosureToggle.removeEventListener("focusout", this.eventHandlers.onDisclosureToggleFocusOut),
                        document.body.removeEventListener("click", this.eventHandlers.onBodyClick);
                },
            })),
            i
        );
    })()),
    document.addEventListener("DOMContentLoaded", (e) => {
        WAU.Accordion.init(),
            (function e() {
                document.querySelector('[data-wau-modal-content="create-customer"]') && WAU.Modal.init("create-customer"),
                    document.querySelector('[data-wau-modal-content="recover-password"]') && WAU.Modal.init("recover-password"),
                    document.querySelector('[data-wau-modal-content="password-success"]') && WAU.Modal.init("password-success"),
                    document.querySelector('[data-wau-modal-content="new-address"]') && WAU.Modal.init("new-address");
                var t = document.querySelectorAll("[data-wau-modal-content]");
                if (!t) return !1;
                t.forEach((e, t) => {
                    e.dataset.wauModalContent.includes("edit-address") && WAU.Modal.init(e.dataset.wauModalContent);
                });
            })(),
            (function e() {
                if (window.IntersectionObserver) {
                    var t = document.querySelector("footer"),
                        i = document.querySelector(".scrollup");
                    document.documentElement,
                        i.addEventListener("click", function e() {
                            theme.Helpers.smoothScrollTo(0, 0, 500);
                        });
                    new IntersectionObserver(function e(t, n) {
                        t.forEach((e) => {
                            e.isIntersecting ? i.classList.add("showBtn") : i.classList.remove("showBtn");
                        });
                    }).observe(t);
                }
            })(),
            (function e() {
                var t = document.querySelector(".rte > iframe");
                if (!t) return !1;
                var i = document.createElement("div");
                (i.className = "video-wrapper"), t.parentNode.insertBefore(i, t), i.appendChild(t);
            })(),
            (function e() {
                let t = { input: 'input[type="search"]', results: "#predictive-search" };
                class i extends HTMLElement {
                    constructor() {
                        super(),
                            this.featureDetections(),
                            (this.routesPredictiveSearchURL = this.dataset.routes),
                            (this.inputSelector = this.dataset.inputSelector),
                            (this.resultsSelector = this.dataset.resultsSelector),
                            (this.input = this.querySelector(this.inputSelector) ? this.querySelector(this.inputSelector) : this.querySelector(t.input)),
                            (this.predictiveSearchResults = this.querySelector(this.resultsSelector) ? this.querySelector(this.resultsSelector) : this.querySelector(t.results)),
                            this.input.addEventListener(
                                "input",
                                theme.Helpers.debounce((e) => {
                                    this.onChange(e);
                                }, 300).bind(this)
                            );
                    }
                    featureDetections() {
                        return this.isFunction(theme.Helpers.debounce)
                            ? window.fetch
                                ? void 0
                                : (console.log("Error. Web browser does not support fetch required for predictive search"), !1)
                            : (console.log("Error. Missing debouce theme helper method for predictive search."), !1);
                    }
                    getTypeOf(e) {
                        return Object.prototype.toString.call(e);
                    }
                    isFunction(e) {
                        return "[object Function]" === this.getTypeOf(e);
                    }
                    onChange() {
                        let e = this.input.value.trim();
                        if (!e.length) {
                            this.close();
                            return;
                        }
                        this.getSearchResults(e);
                    }
                    getSearchResults(e) {
                        fetch(`${this.routesPredictiveSearchURL}?q=${encodeURIComponent(e)}&section_id=predictive-search`)
                            .then((e) => {
                                if (!e.ok) {
                                    var t = Error(e.status);
                                    throw (this.close(), t);
                                }
                                return e.text();
                            })
                            .then((e) => {
                                let t = new DOMParser().parseFromString(e, "text/html").querySelector("#shopify-section-predictive-search").innerHTML;
                                (this.predictiveSearchResults.innerHTML = t), this.open();
                            })
                            .catch((e) => {
                                throw (this.close(), e);
                            });
                    }
                    open() {
                        WAU.ProductGridVideo.init(), "function" == typeof theme.Helpers.fadeIn ? theme.Helpers.fadeIn(this.predictiveSearchResults) : (this.predictiveSearchResults.style.display = "block");
                    }
                    close() {
                        "function" == typeof theme.Helpers.fadeOut ? theme.Helpers.fadeOut(this.predictiveSearchResults) : (this.predictiveSearchResults.style.display = "none");
                    }
                }
                customElements.define("predictive-search", i);
            })();
    }),
    (Shopify.theme.cart = (function (e) {
        "use strict";
        function t() {
            return JSON.parse(JSON.stringify({ credentials: "same-origin", headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json;" } }));
        }
        function i(e, t) {
            return fetch(e, t).then(function (e) {
                if (!e.ok) throw e;
                return e.json();
            });
        }
        function n() {
            return i("/cart.js", t());
        }
        function r(e, n) {
            var r = t();
            return (n = n || {}), (r.method = "POST"), (r.body = JSON.stringify({ line: e, quantity: n.quantity, properties: n.properties })), i("/cart/change.js", r);
        }
        function o(e) {
            var n = t();
            return (n.method = "POST"), (n.body = JSON.stringify(e)), i("/cart/update.js", n);
        }
        function a(e) {
            if ("string" != typeof e || 2 !== e.split(":").length) throw TypeError("Theme Cart: Provided key value is not a string with the format xxx:xxx");
        }
        function s(e) {
            if ("number" != typeof e || isNaN(e)) throw TypeError("Theme Cart: Variant ID must be a number");
        }
        function l(e) {
            return (
                a(e),
                n().then(function (t) {
                    var i = -1;
                    return (t.items.forEach(function (t, n) {
                        i = t.key === e ? n + 1 : i;
                    }),
                    -1 === i)
                        ? Promise.reject(Error("Theme Cart: Unable to match line item with provided key"))
                        : i;
                })
            );
        }
        function c() {
            return n().then(function (e) {
                return e.attributes;
            });
        }
        function u(e) {
            return o({ attributes: e });
        }
        return (
            (e.getState = function e() {
                return n().then(function (e) {
                    Events.trigger("cart:ready", e);
                });
            }),
            (e.getCart = function e() {
                return n().then(function (e) {
                    return e;
                });
            }),
            (e.getItemIndex = l),
            (e.getItem = function e(t) {
                return (
                    a(t),
                    n().then(function (e) {
                        var i = null;
                        return (e.items.forEach(function (e) {
                            i = e.key === t ? e : i;
                        }),
                        null === i)
                            ? Promise.reject(Error("Theme Cart: Unable to match line item with provided key"))
                            : i;
                    })
                );
            }),
            (e.addItem = function e(n, r) {
                var o, a, l, c;
                return (r = r || {}), s(n), (o = n), (a = r.quantity), (l = r.properties), ((c = t()).method = "POST"), (c.body = JSON.stringify({ id: o, quantity: a, properties: l })), i("/cart/add.js", c);
            }),
            (e.addItemFromForm = function e(n) {
                !(function e(t) {
                    if (!(t instanceof HTMLFormElement)) throw TypeError("Theme Cart: Form must be an instance of HTMLFormElement");
                })(n);
                var r,
                    o,
                    a = new FormData(n);
                return s(parseInt(a.get("id"), 10)), (r = a), delete (o = t()).headers["Content-Type"], (o.method = "POST"), (o.body = r), i("/cart/add.js", o);
            }),
            (e.getDefaultRequestConfig = t),
            (e.updateItem = function e(t, i) {
                return (
                    a(t),
                    (function e(t) {
                        if ("object" != typeof t) throw TypeError("Theme Cart: Options must be an object");
                        if (void 0 === t.quantity && void 0 === t.properties) throw Error("Theme Cart: You muse define a value for quantity or properties");
                        void 0 !== t.quantity &&
                            (function e(t) {
                                if ("number" != typeof t || isNaN(t)) throw TypeError("Theme Cart: An object which specifies a quantity or properties value is required");
                            })(t.quantity),
                            void 0 !== t.properties &&
                                (function e(t) {
                                    if ("object" != typeof t) throw TypeError("Theme Cart: Properties must be an object");
                                })(t.properties);
                    })(i),
                    l(t).then(function (e) {
                        return r(e, i);
                    })
                );
            }),
            (e.removeItem = function e(t) {
                return (
                    a(t),
                    l(t).then(function (e) {
                        return r(e, { quantity: 0 });
                    })
                );
            }),
            (e.clearItems = function e() {
                var n;
                return (((n = t()).method = "POST"), i("/cart/clear.js", n)).then(function () {
                    Events.trigger("cart:clear");
                });
            }),
            (e.getAttributes = c),
            (e.updateAttributes = u),
            (e.clearAttributes = function e() {
                return c().then(function (e) {
                    for (var t in e) e[t] = "";
                    return u(e);
                });
            }),
            (e.getNote = function e() {
                return n().then(function (e) {
                    return e.note;
                });
            }),
            (e.updateNote = function e(t) {
                return o({ note: t });
            }),
            (e.clearNote = function e() {
                return o({ note: "" });
            }),
            (e.getShippingRates = function e() {
                return i("/cart/shipping_rates.json", t());
            }),
            e
        );
    })({})),
    (Shopify.theme.ajaxCart = {
        init: function e() {
            let t = document.getElementById("cart-config");
            if (!t) return !1;
            t = JSON.parse(t.innerHTML || "{}");
            var i = { cartTrigger: ".js-mini-cart-trigger", cartPageLoader: ".ajax-cart__page-wrapper .js-mini-cart-loader", addToCart: ".js-ajax-submit" };
            this.initializeAjaxCart(t),
                "no_js_cart" == t.cart_action
                    ? document.querySelector(".js-ajax-cart-content") && document.querySelector(".js-ajax-cart-content").remove()
                    : document.querySelector(".js-ajax-cart-content-nojs") && document.querySelector(".js-ajax-cart-content-nojs").remove(),
                "drawer" == t.cart_action ? WAU.Slideout.init("ajax-cart") : "modal_cart" == t.cart_action && WAU.Modal.init("ajax-cart"),
                document.querySelectorAll(i.addToCart).forEach((e, i) => {
                    e.addEventListener("click", function (i) {
                        i.preventDefault();
                        var n = this.closest("form");
                        return Shopify.theme.ajaxCart.addToCart(n, e.parentNode, t, !1), !1;
                    });
                }),
                document.querySelector("body").classList.contains("template-cart") &&
                    Shopify.theme.cart.getCart().then((e) => {
                        Shopify.theme.ajaxCart.updateView(t, e),
                            setTimeout(function () {
                                theme.Helpers.fadeOut(document.querySelector(i.cartPageLoader));
                            }, 800);
                    });
            document.querySelectorAll(i.cartTrigger).forEach((e, i) => {
                e.addEventListener("click", function (e) {
                    return (
                        e.preventDefault(),
                        Shopify.theme.cart.getCart().then((e) => {
                            Shopify.theme.ajaxCart.updateView(t, e),
                                "drawer" == t.cart_action ? Shopify.theme.ajaxCart.showDrawer(t) : "modal_cart" == t.cart_action ? Shopify.theme.ajaxCart.showModal(t) : (window.location.href = t.cart_url);
                        }),
                        !1
                    );
                });
            });
        },
        cartEvents: function e(t) {
            var i = { cartDrawerRemove: ".js-cart-remove", cartDrawerQty: "[data-item-qty]", cartDrawerQtyDecrease: "[data-ajax-qty-decrease]", cartDrawerQtyIncrease: "[data-ajax-qty-increase]", cartNote: ".js-cart-note" },
                n = document.querySelectorAll(i.cartDrawerQty);
            n.length &&
                (n.forEach((e, i) => {
                    e.addEventListener("change", function (i) {
                        i.preventDefault();
                        var n = parseInt(this.value),
                            r = this.dataset.itemKey,
                            o = this.dataset.limit,
                            a = e.closest(".ajax-cart__cart-item");
                        return (
                            (e.value = n),
                            setTimeout(function () {
                                0 === n
                                    ? Shopify.theme.ajaxCart.removeFromCart(r, t)
                                    : (Shopify.theme.ajaxCart.checkLimit(o, n, a, t),
                                      Shopify.theme.cart.updateItem(r, { quantity: n }).then((e) => {
                                          Shopify.theme.ajaxCart.updateView(t, e);
                                      }));
                            }, 250),
                            !1
                        );
                    });
                }),
                document.querySelectorAll(i.cartDrawerRemove).forEach((e, i) => {
                    e.addEventListener("click", function (e) {
                        e.preventDefault();
                        var i = this.dataset.itemKey;
                        return Shopify.theme.ajaxCart.removeFromCart(i, t), !1;
                    });
                }),
                document.querySelectorAll(i.cartDrawerQtyDecrease).forEach((e, i) => {
                    e.addEventListener("click", function (e) {
                        if ((e.preventDefault(), "1" === this.nextElementSibling.value)) {
                            var i = this.dataset.itemKey;
                            Shopify.theme.ajaxCart.removeFromCart(i, t);
                        } else {
                            var n = this.dataset.ajaxQtyDecrease;
                            Shopify.theme.ajaxCart.adjustQty(-1, n, t);
                        }
                        return !1;
                    });
                }),
                document.querySelectorAll(i.cartDrawerQtyIncrease).forEach((e, i) => {
                    e.addEventListener("click", function (e) {
                        e.preventDefault();
                        var i = this.dataset.ajaxQtyIncrease;
                        return Shopify.theme.ajaxCart.adjustQty(1, i, t), !1;
                    });
                }),
                document.querySelectorAll(i.cartNote).forEach((e, i) => {
                    e.addEventListener("blur", (i) => {
                        let n = e.value;
                        Shopify.theme.cart.updateNote(n).then((e) => {
                            Shopify.theme.ajaxCart.updateView(t, e);
                        });
                    });
                }),
                t.show_calculator &&
                    setTimeout(function () {
                        Shopify.theme.shippingCalculator.init();
                    }, 1e3),
                Shopify && Shopify.StorefrontExpressButtons && Shopify.StorefrontExpressButtons.initialize());
        },
        showDrawer: function e(t) {
            if ("drawer" != t.cart_action) return !1;
            WAU.Slideout._openByName("ajax-cart"),
                setTimeout(function () {
                    theme.Helpers.fadeOut(document.querySelector(".ajax-cart__drawer-wrapper .js-mini-cart-loader"));
                }, 800);
        },
        hideDrawer: function e(t) {
            if ("drawer" != t.cart_action) return !1;
            WAU.Slideout._closeByName("ajax-cart"),
                setTimeout(function () {
                    theme.Helpers.fadeIn(document.querySelector(".ajax-cart__drawer-wrapper .js-mini-cart-loader"));
                }, 800);
        },
        showModal: function e(t) {
            if ("modal_cart" != t.cart_action) return !1;
            WAU.Modal._openByName("ajax-cart"),
                setTimeout(function () {
                    theme.Helpers.fadeOut(document.querySelector(".ajax-cart__modal-wrapper .js-mini-cart-loader"));
                }, 800);
        },
        hideModal: function e(t) {
            if ("modal_cart" != t.cart_action) return !1;
            WAU.Modal._closeByName("ajax-cart"),
                setTimeout(function () {
                    theme.Helpers.fadeIn(document.querySelector(".ajax-cart__modal-wrapper .js-mini-cart-loader"));
                }, 800);
        },
        removeFromCart: function e(t, i, n) {
            Shopify.theme.cart.removeItem(t).then((e) => {
                Shopify.theme.ajaxCart.updateView(i, e);
            });
        },
        adjustQty: function e(t, i, n) {
            var r = { lineItem: ".item_" + i, updatesItem: ".updates_" + i };
            document.querySelectorAll(r.lineItem).forEach((e, i) => {
                if (
                    ((key = (elementInput = e.querySelector(r.updatesItem)).dataset.itemKey),
                    (max = elementInput.dataset.limit),
                    (quantity = parseInt(elementInput.value) + parseInt(t)),
                    Shopify.theme.ajaxCart.checkLimit(max, quantity, e, n) || 0 === quantity)
                )
                    return !1;
                (elementInput.value = quantity),
                    setTimeout(function () {
                        Shopify.theme.cart.updateItem(key, { quantity }).then((e) => {
                            Shopify.theme.ajaxCart.updateView(n, e);
                        });
                    }, 250);
            });
        },
        checkLimit: function e(t, i, n, r) {
            if ("" != t && i > t) {
                let o = document.createElement("div");
                o.classList.add("mini-cart__cart-note"), (o.innerHTML = "<p><b>" + r.cart_error + "</b>&nbsp;&nbsp;" + r.update_qty_error + "</p>");
                let a = n.querySelector(".js-item-quantity"),
                    s = a.parentNode;
                return (
                    s.appendChild(o, a),
                    setTimeout(function () {
                        theme.Helpers.fadeOut(o), s.removeChild(o);
                    }, 2e3),
                    !0
                );
            }
        },
        addToCart: function e(t, i, n, r) {
            var o = { addToCart: ".js-ajax-submit", cartAddedMsg: ".js-added-msg" };
            let a;
            a = r ? document.querySelector(".js-quickview-content") : i;
            let s = 0 !== [...t.elements].filter((e) => "properties[__shopify_send_gift_card_to_recipient]" == e.name && e.checked).length;
            if (s) {
                let l = Shopify.theme.cart.getDefaultRequestConfig(),
                    c = new FormData(t);
                delete l.headers["Content-Type"],
                    (l.method = "POST"),
                    (l.body = c),
                    fetch("/cart/add.js", l)
                        .then(function (e) {
                            return e.json();
                        })
                        .then(function (e) {
                            if (422 == e.status) {
                                let i = e.description,
                                    r = e.message;
                                Events.trigger("recipientform:errors", r, i, n, t);
                            }
                        })
                        .catch(function (e) {
                            console.error(e);
                        });
            }
            !1 !== theme.ProductProperties.checkLineItemProperties(t) &&
                ((a.querySelector(o.addToCart).value = n.adding_to_cart),
                a.querySelector(o.addToCart).classList.add("disabled"),
                a.querySelector(o.addToCart).getAttribute("disabled", "disabled"),
                document.querySelectorAll(".required-error").forEach((e, t) => {
                    e.classList.remove("required-error");
                }),
                Shopify.theme.cart
                    .addItemFromForm(t)
                    .then((e) => {
                        (a.querySelector(o.addToCart).value = n.added_to_cart),
                            a.querySelector(o.addToCart).classList.remove("disabled"),
                            a.querySelector(o.addToCart).removeAttribute("disabled", "disabled"),
                            setTimeout(function () {
                                a.querySelector(o.addToCart).hasAttribute("data-preorder") ? (a.querySelector(o.addToCart).value = n.pre_order) : (a.querySelector(o.addToCart).value = n.add_to_cart);
                            }, 3e3),
                            Shopify.theme.cart.getCart().then((e) => {
                                r && "product_page" != n.cart_added_event
                                    ? document.querySelector('[data-wau-modal="quickview"]')
                                        ? Shopify.theme.quickview.hideModal()
                                        : Shopify.theme.quickview.hideSlideout()
                                    : r &&
                                      "product_page" == n.cart_added_event &&
                                      (theme.Helpers.fadeIn(a.querySelector(o.cartAddedMsg)),
                                      setTimeout(function () {
                                          theme.Helpers.fadeOut(a.querySelector(o.cartAddedMsg));
                                      }, 3e3)),
                                    "drawer" == n.cart_action && "go_to_active_cart" == n.cart_added_event
                                        ? Shopify.theme.ajaxCart.showDrawer(n)
                                        : "modal_cart" == n.cart_action && "go_to_active_cart" == n.cart_added_event
                                        ? Shopify.theme.ajaxCart.showModal(n)
                                        : "page_only" == n.cart_action && "go_to_active_cart" == n.cart_added_event
                                        ? (window.location.href = n.cart_url)
                                        : "product_page" == n.cart_added_event
                                        ? (theme.Helpers.fadeIn(a.querySelector(o.cartAddedMsg)),
                                          setTimeout(function () {
                                              theme.Helpers.fadeOut(a.querySelector(o.cartAddedMsg));
                                          }, 3e3))
                                        : (window.location.href = n.cart_url),
                                    Shopify.theme.ajaxCart.updateView(n, e);
                            });
                    })
                    .catch((e) => {
                        422 == e.status
                            ? (theme.Helpers.fadeIn(a.querySelector(".js-error-msg")),
                              a.querySelector(o.addToCart).hasAttribute("data-preorder") ? (a.querySelector(o.addToCart).value = n.pre_order) : (a.querySelector(o.addToCart).value = n.add_to_cart),
                              a.querySelector(o.addToCart).classList.remove("disabled"),
                              a.querySelector(o.addToCart).removeAttribute("disabled", "disabled"),
                              setTimeout(function () {
                                  theme.Helpers.fadeOut(a.querySelector(".js-error-msg"));
                              }, 3e3))
                            : console.log(e);
                    }));
        },
        getAjaxCart: function e(t) {
            let i = document.createElement("div");
            (i.innerHTML = t), JSON.parse(i.querySelector("[data-options]").innerHTML);
            let n = i.querySelectorAll("[data-html]"),
                r = {};
            if (1 === n.length && "" === n[0].getAttribute("data-html")) r = n[0].innerHTML;
            else for (let o = 0; o < n.length; o++) r[n[o].getAttribute("data-html")] = n[o].innerHTML;
            return r;
        },
        initializeAjaxCart: function e(t) {
            let i, n;
            fetch((n = t.cart_url + "/?view=ajax"), i)
                .then((e) => e.text())
                .then((e) => {
                    let t = Shopify.theme.ajaxCart.getAjaxCart(e);
                    document.querySelectorAll(".js-ajax-cart-content").forEach((e, i) => {
                        e.innerHTML = t.content;
                    });
                })
                .then((e) => {
                    t.show_calculator &&
                        setTimeout(function () {
                            Shopify.theme.shippingCalculator.init();
                        }, 1e3);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        updateView: function e(t, i) {
            let n, r;
            fetch((r = t.cart_url + "/?view=ajax"), n)
                .then((e) => e.text())
                .then((e) => {
                    let n = Shopify.theme.ajaxCart.getAjaxCart(e);
                    var r = { cartContent: ".js-ajax-cart-content", cartEmpty: ".js-cart-empty", cartForm: ".js-cart-form", cartAccordion: ".js-cart-accordion", cartCount: ".js-cart-count" };
                    0 === i.item_count
    ? (document.querySelectorAll(r.cartContent).forEach((e, t) => {
          e.innerHTML = n.content;
      }),
      document.querySelectorAll(r.cartCount).forEach((e, t) => {
          e.innerHTML = "0";
      }),
      document.querySelectorAll(r.cartEmpty).forEach((e, t) => {
          e.classList.remove("hide");
      }))
    : (document.querySelectorAll(r.cartEmpty).forEach((e, t) => {
                              e.classList.add("hide");
                          }),
                          document.querySelectorAll(r.cartCount).forEach((e, t) => {
                              e.innerHTML = i.item_count;
                          }),
                          document.querySelectorAll(r.cartContent).forEach((e, t) => {
                              e.innerHTML = n.content;
                          }),
                          document.querySelectorAll(r.cartAccordion).forEach((e, t) => {
                              theme.Helpers.Accordion(e, ".tlink.has_sub_menu a", ".accordion-content.sub"), theme.Helpers.Accordion(e, ".tlink2.has_sub_menu a", ".accordion-content2.sub");
                          }),
                          Shopify.theme.ajaxCart.cartEvents(t)),
                        setTimeout(function () {
                            document.querySelector("body").classList.add("cart-loaded"), 2 == document.querySelectorAll("#dynamic-checkout-cart").length && document.querySelectorAll("#dynamic-checkout-cart")[1].remove();
                        }, 500);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    }),
    (Shopify.theme.shippingCalculator = {
        init: function e() {
            var t = document.getElementById("cart-config");
            if (!t) return !1;
            var t = JSON.parse(t.innerHTML || "{}"),
                i = {
                    container: ".js-shipping-calc-wrapper",
                    submitButton: ".js-shipping-calc-submit",
                    addressZip: ".js-shipping-calc-address-zip",
                    addressCountry: ".js-shipping-calc-address-country",
                    addressProvince: ".js-shipping-calc-address-province",
                    addressProvinceLabel: ".js-shipping-calc-address-province-label",
                    response: ".js-shipping-calc-response",
                };
            document.querySelectorAll(i.container).forEach((e, t) => {
                e.classList.add("shipping-calculator-" + t);
            });
            let n = document.querySelector(".shipping-calculator-0");
            if (void 0 === Shopify.CountryProvinceSelector) return !1;
            new Shopify.CountryProvinceSelector("address_country", "address_province", { hideElement: "address_province_container" });
            var r = n.querySelector(i.addressCountry),
                o = n.querySelector(i.addressProvinceLabel);
            "undefined" != typeof Countries &&
                (Countries.updateProvinceLabel(r.val(), o),
                r.change(function () {
                    Countries.updateProvinceLabel(r.val(), o);
                }));
            n.querySelector(i.submitButton).addEventListener("click", function (e) {
                e.preventDefault(), Shopify.theme.shippingCalculator.disableButtons(t, n), (n.querySelector(i.response).style.display = "none");
                let r = {};
                (r.zip = n.querySelector(i.addressZip).value || ""),
                    (r.country = n.querySelector(i.addressCountry).value || ""),
                    (r.province = n.querySelector(i.addressProvince).value || ""),
                    Shopify.theme.shippingCalculator.getRates(t, r, n);
            });
        },
        enableButtons: function e(t, i) {
            var n = { submitButton: ".js-shipping-calc-submit" };
            i.querySelector(n.submitButton).removeAttribute("disabled"), i.querySelector(n.submitButton).classList.remove("disabled"), (i.querySelector(n.submitButton).value = t.calculator_submit);
        },
        disableButtons: function e(t, i) {
            var n = { submitButton: ".js-shipping-calc-submit" };
            i.querySelector(n.submitButton).setAttribute("disabled", "disabled"), i.querySelector(n.submitButton).classList.add("disabled"), (i.querySelector(n.submitButton).value = t.calculator_calculating);
        },
        getRates: function e(t, i, n) {
            fetch("/cart/shipping_rates.json?shipping_address%5Bzip%5D=" + i.zip + "&shipping_address%5Bcountry%5D=" + i.country + "&shipping_address%5Bprovince%5D=" + i.province, {
                method: "GET",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.shipping_rates) {
                        let r = e.shipping_rates;
                        Shopify.theme.shippingCalculator.onRatesUpdate(r, i, t, n);
                    } else Shopify.theme.shippingCalculator.onError(e, t, n);
                })
                .catch((e) => {
                    Shopify.theme.shippingCalculator.onError(e, t, n);
                });
        },
        onError: function e(t, i, n) {
            Shopify.theme.shippingCalculator.enableButtons(i, n);
            let r = i.calculator_error + " " + Object.keys(t)[0] + " " + Object.values(t)[0];
            Shopify.theme.shippingCalculator.render({ rates: [], errorFeedback: r, success: !1 }, n, i),
                (n.querySelector(".js-shipping-calc-rates").style.display = "none"),
                (n.querySelector(".js-shipping-calc-response").style.display = "block");
        },
        onRatesUpdate: function e(t, i, n, r) {
            Shopify.theme.shippingCalculator.enableButtons(n, r);
            var o = "";
            if ((i.zip && (o += i.zip + ", "), i.province && (o += i.province + ", "), (o += i.country), !t)) return !1;
            t.forEach((e, t) => {
                e.price = Shopify.theme.shippingCalculator.formatRate(e.price, n);
            }),
                Shopify.theme.shippingCalculator.render({ rates: t, address: o, success: !0 }, r, n);
        },
        formatRate: function e(t, i) {
            var n;
            let r = ((n = ((n = t) + "").replace(/[^\d.-]/g, "")) && n.includes(".") && (n = n.substring(0, n.indexOf(".") + 3)), n ? Math.round(100 * parseFloat(n)) : 0);
            return theme.Helpers.formatMoney(r, i.money_format);
        },
        render: function e(t, i, n) {
            let r = document.querySelector(".js-shipping-calc-rates-feedback"),
                o = document.querySelector(".js-shipping-calc-rates");
            (r.innerHTML = ""),
                t.rates.length > 1
                    ? (r.innerHTML = n.shipping_multi_rate_one + t.rates.length + n.shipping_multi_rate_two + t.address + n.shipping_multi_rate_three + t.rates[0].price)
                    : 1 === t.rates.length
                    ? (r.innerHTML = n.shipping_single_rate + t.address)
                    : (r.innerHTML = n.shipping_no_destination),
                (o.innerHTML = ""),
                t.rates.forEach((e, t) => {
                    let i = document.createElement("li");
                    i.classList.add("shipping-calc__rate"), (i.innerHTML = e.name + " at " + e.price), o.appendChild(i);
                }),
                (i.querySelector(".js-shipping-calc-rates").style.display = "block"),
                (document.querySelector(".js-shipping-calc-response").style.display = "block");
        },
    }),
    (Shopify.theme.quickview = {
        init: function e() {
            document.querySelectorAll(".js-quickview-trigger").forEach((e, t) => {
                e.addEventListener("click", function (e) {
                    e.preventDefault(), document.querySelector('[data-wau-modal="quickview"]') ? WAU.Modal.init("quickview") : WAU.Slideout.init("quickview");
                    var t = this.dataset.productUrl,
                        t = Shopify.theme.quickview.cleanUrl(t, "variant");
                    Shopify.theme.quickview.getTemplate(t);
                });
            }),
                this.handleEvents();
        },
        handleEvents() {
            var e = { quickviewButton: ".js-quickview-trigger" };
            document.addEventListener("click", (t) => {
                let i = t.target.matches(e.quickviewButton) ? t.target : t.target.closest(e.quickviewButton);
                if (!i || !i.matches(e.quickviewButton)) return !1;
                t.preventDefault(), document.querySelector('[data-wau-modal="quickview"]') ? WAU.Modal.init("quickview") : WAU.Slideout.init("quickview");
                let n = i.dataset.productUrl,
                    r = Shopify.theme.quickview.cleanUrl(n, "variant");
                Shopify.theme.quickview.getTemplate(r);
            });
        },
        formatTemplate: function e(t) {
            let i = document.createElement("div");
            i.innerHTML = t;
            let n = i.querySelectorAll("[data-html]"),
                r = {};
            if (1 === n.length && "" === n[0].getAttribute("data-html")) r = n[0].innerHTML;
            else for (let o = 0; o < n.length; o++) r[n[o].getAttribute("data-html")] = n[o].innerHTML;
            return r;
        },
        showModal: function e() {
            WAU.Modal._openByName("quickview");
        },
        showSlideout: function e() {
            WAU.Slideout._openByName("quickview");
        },
        hideModal: function e() {
            (document.querySelector(".js-quickview-content").innerHTML = ""), WAU.Modal._closeByName("quickview");
        },
        hideSlideout: function e() {
            (document.querySelector(".js-quickview-content").innerHTML = ""), WAU.Slideout._closeByName("quickview");
        },
        cleanUrl: function e(t, i) {
            return t.split("?")[0] + "?view=quick";
        },
        getTemplate: function e(t) {
            let i, n;
            fetch((n = t), i)
                .then((e) => e.text())
                .then((e) => {
                    let t = Shopify.theme.quickview.formatTemplate(e);
                    document.querySelector(".js-quickview-content").innerHTML = t.content;
                })
                .then((e) => {
                    let t = document.querySelector(".js-quickview-wrapper");
                    theme.Product(t);
                })
                .then((e) => {
                    "true" == document.querySelector(".js-quickview-wrapper").dataset.paymentButton && Shopify.PaymentButton && Shopify.PaymentButton.init();
                })
                .then((e) => {
                    document
                        .querySelector(".js-quickview-wrapper")
                        .querySelector(".js-ajax-submit")
                        .addEventListener("click", function (e) {
                            e.preventDefault();
                            var t = this.closest("form");
                            let i = document.getElementById("cart-config");
                            return !!i && ((i = JSON.parse(i.innerHTML || "{}")), Shopify.theme.ajaxCart.addToCart(t, null, i, !0), !1);
                        });
                })
                .then((e) => {
                    document.querySelector('[data-wau-modal="quickview"]') ? Shopify.theme.quickview.showModal() : Shopify.theme.quickview.showSlideout();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    }),
    Shopify.theme.quickview.init(),
    Shopify.theme.ajaxCart.init(),
    document.addEventListener("shopify:section:select", function (e) {
        Shopify.theme.quickview.init(), Shopify.theme.ajaxCart.init();
    });
const ViewedProducts = function (e) {
    let t = {};
    var i = { howManyToShow: 3, howManyToStoreInMemory: 30, wrapperId: "recently-viewed-products", onComplete: null },
        n = [],
        r = null,
        o = 0,
        a = {
            configuration: { expires: 90, path: "/", domain: window.location.hostname, sameSite: "none", secure: !0 },
            name: "shopify_recently_viewed",
            write: function (e) {
                Cookies.set(this.name, e.join(" "), this.configuration);
            },
            read: function () {
                var e = [],
                    t = Cookies.get(this.name);
                return void 0 !== t && "" !== t && (e = t.split(" ")), e;
            },
            destroy: function () {
                Cookies.remove(this.name, null, this.configuration);
            },
            remove: function (e) {
                var t = this.read(),
                    i = t.indexOf(e);
                -1 !== i && (t.splice(i, 1), this.write(t));
            },
        },
        s = function () {
            if (!(o > 0)) return console.log("No recently viewed products to show"), !1;
            if ((r.classList.contains("recently-viewed-products--hidden") && r.classList.remove("recently-viewed-products--hidden"), i.onComplete))
                try {
                    i.onComplete();
                } catch (e) {}
        },
        l = (e) => {
            if (!e) return console.log("Error. Must provide a valid product in order to format it"), !1;
            var t = new DOMParser().parseFromString(e, "text/html").querySelector('[data-html="listing"]');
            if (!t) return console.log("Error. Could not find template elment."), !1;
            let i = document.createElement("div");
            return i.classList.add("product", "product-index", "recently-viewed-products__product", "js-product-listing"), i.appendChild(t.content), i;
        },
        c = function () {
            n.length && o < i.howManyToShow
                ? fetch(`/products/${n[0]}?view=listing`)
                      .then((e) => e.text())
                      .then((e) => {
                          let t = l(e);
                          r.appendChild(t), n.shift(), o++, c();
                      })
                      .catch((e) => {
                          console.log(e.message), a.remove(n[0]), n.shift(), c();
                      })
                : s();
        };
    return (
        (t.showRecentlyViewed = function (e) {
            var e = e || {};
            (i = Object.assign(i, e)), (o = 0), (n = []), (r = null), (template = null), (n = a.read()), (r = document.getElementById(i.wrapperId)), i.howManyToShow && r && c();
        }),
        (t.getConfig = function () {
            return i;
        }),
        (t.clearList = function () {
            a.destroy();
        }),
        (t.getCount = function () {
            return a.read().length;
        }),
        t.showRecentlyViewed(e),
        t
    );
};
(Shopify.RecordViewedProducts = (function () {
    var e = { howManyToShow: 3, howManyToStoreInMemory: 30, wrapperId: "recently-viewed-products", onComplete: null },
        t = {
            configuration: { expires: 90, path: "/", domain: window.location.hostname, sameSite: "none", secure: !0 },
            name: "shopify_recently_viewed",
            write: function (e) {
                Cookies.set(this.name, e.join(" "), this.configuration);
            },
            read: function () {
                var e = [],
                    t = Cookies.get(this.name);
                return void 0 !== t && "" !== t && (e = t.split(" ")), e;
            },
            destroy: function () {
                Cookies.remove(this.name, null, this.configuration);
            },
            remove: function (e) {
                var t = this.read(),
                    i = t.indexOf(e);
                -1 !== i && (t.splice(i, 1), this.write(t));
            },
        };
    return {
        getConfig: function () {
            return e;
        },
        clearList: function () {
            t.destroy();
        },
        getCount: function () {
            return t.read().length;
        },
        recordRecentlyViewed: function (i) {
            var i = i || {};
            e = Object.assign(e, i);
            var n = t.read();
            if (-1 !== window.location.pathname.indexOf("/products/")) {
                var r = new URL(window.location).pathname,
                    o = decodeURIComponent(r).split("/"),
                    a = o[o.indexOf("products") + 1];
                if (!a) return console.log("Error, no product handle found."), !1;
                var s = n.indexOf(a);
                -1 === s ? (n.unshift(a), (n = n.splice(0, e.howManyToStoreInMemory))) : (n.splice(s, 1), n.unshift(a)), t.write(n);
            }
        },
    };
})()),
    (theme.Slideshow = function e(t) {
        let i = document.querySelectorAll(".js-slideshow");
        i.forEach((e) => {
            let t = e.getAttribute("data-flickity"),
                i = JSON.parse(t);
            new Flickity(e, i);
        });
    }),
    (theme.Slideshow.prototype = _.assignIn({}, theme.Slideshow.prototype, {
        onLoad: function (e) {
            let t = e.target.closest(".js-slideshow"),
                i = t.getAttribute("data-flickity"),
                n = JSON.parse(i);
            new Flickity(".js-slideshow", n);
        },
        onBlockSelect: function (e) {
            let t = e.target.closest(".js-slideshow"),
                i = Flickity.data(t),
                n = e.target.getAttribute("data-slider-index");
            i.select(n), i.pausePlayer();
        },
        onBlockDeselect: function () {
            let e = event.target.closest(".js-slideshow"),
                t = Flickity.data(e);
            t.unpausePlayer();
        },
    })),
    (theme.FeaturedProducts = (function () {
        function e(e) {
            var t = document.querySelectorAll(".featured__collection-carousel");
            if (!t) return !1;
            t.forEach((e) => {
                let t = e.getAttribute("data-flickity-config"),
                    i = JSON.parse(t);
                if (e.hasAttribute("data-product-count")) {
                    let n = e.getAttribute("data-product-count");
                    window.matchMedia("(max-width: 740px)").matches && n > 2 && ((i.wrapAround = !0), (i.draggable = !0), (i.prevNextButtons = !0)),
                        window.matchMedia("(max-width: 979px) and (min-width: 741px)").matches && n > 3 && ((i.wrapAround = !0), (i.draggable = !0), (i.prevNextButtons = !0));
                }
                new Flickity(e, i);
            }),
                document.addEventListener("shopify:section:unload", function (e) {
                    var t = e.target.closest(".featured__collection-carousel");
                    if (!t) return !1;
                    let i = Flickity.data(t);
                    i.destroy();
                }),
                document.addEventListener("shopify:section:load", function (e) {
                    var t = e.target.closest(".js-carousel");
                    if (!t) return !1;
                    let i = t.getAttribute("data-flickity"),
                        n = JSON.parse(i);
                    new Flickity(".js-carousel", n);
                }),
                (function t() {
                    let i = e.querySelector(".js-tabbed-collection-container");
                    if (!i) return !1;
                    let n, r, o, a;
                    (r = (n = (a = i.querySelectorAll(".js-tab-trigger"))[0]).dataset.content),
                        (o = document.getElementById(r)),
                        n.classList.add("active"),
                        e.querySelectorAll(".js-tab-collection-content").forEach((t, i) => {
                            if (0 === i) {
                                t.classList.add("js-tab-coll-active");
                                let n = e.querySelector(".js-tab-coll-active"),
                                    r = n.querySelector(".js-carousel");
                                if (!r) return !1;
                                let o = Flickity.data(r);
                                o.resize();
                            } else t.classList.remove("js-tab-coll-active");
                        }),
                        a.forEach((t, i) => {
                            t.addEventListener("click", function (i) {
                                i.preventDefault(),
                                    n.classList.remove("active"),
                                    o.classList.remove("js-tab-coll-active"),
                                    (r = (n = t).dataset.content),
                                    (o = document.getElementById(r)),
                                    n.classList.add("active"),
                                    o.classList.add("js-tab-coll-active");
                                let a = e.querySelector(".js-tab-coll-active"),
                                    s = a.querySelector(".js-carousel");
                                if (!s) return !1;
                                let l = Flickity.data(s);
                                return l.resize(), !1;
                            });
                        });
                })();
        }
        return (e.prototype = _.assignIn({}, e.prototype, {})), e;
    })());
var Events = new EventEmitter3();
Events.trigger = Events.emit;
var mobile = window.matchMedia("(max-width: 740px)"),
    tablet = window.matchMedia("(max-width: 979px) and (min-width: 741px)"),
    device = window.matchMedia("(max-width: 980px)"),
    desktop = window.matchMedia("(min-width: 980px)");
function onYouTubeIframeAPIReady() {
    theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
}
(theme.ProductForm = function (e, t, i, n) {
    var r,
        o,
        a,
        s,
        l,
        c,
        u = JSON.parse(e.querySelector(`#product-form-${t}`).dataset.productForm || "{}");
    if (
        (e.querySelectorAll(".formVariantId").forEach((e, t) => {
            e.setAttribute("name", "id");
        }),
        n.has_only_default_variant)
    )
        return !1;
    function d(e) {
        return theme.Helpers.formatMoney(e, u.money_format);
    }
    (s = e.querySelectorAll(".js-variant-selector")).forEach((t, r) => {
        t.addEventListener("change", function (t) {
            if ((t.preventDefault(), "swatches" == u.swatches)) {
                let r = Array.from(s);
                l = r.map((e) => Array.from(e.querySelectorAll("input")).find((e) => e.checked).value);
            } else l = Array.from(e.querySelectorAll("select.js-variant-selector"), (e) => e.value);
            (function e(t, r, o) {
                var a, s;
                if (!r) {
                    i.trigger("variantunavailable", o), Events.trigger("storeavailability:unavailable");
                    return;
                }
                if (1 == n.variants.length) {
                    !r.available && (t.querySelector(".product-price").innerHTML = o.sold_out);
                    return;
                }
                i.trigger("variantchange", r, o),
                    i.trigger("variantchange:option1:" + r.option1),
                    i.trigger("variantchange:option2:" + r.option2),
                    i.trigger("variantchange:option3:" + r.option3),
                    t.querySelector("[data-store-availability-container]") && i.trigger("storeavailability:variant", r.id, n.title, t),
                    r.featured_media && Events.trigger("variantchange:image", r.featured_media.id, t),
                    o.enable_history && ((a = r), (s = t), a && window.history.replaceState({}, "", `${s.dataset.url}?variant=${a.id}`)),
                    (function e(t, i) {
                        i.querySelectorAll(".formVariantId").forEach((e, i) => {
                            e.setAttribute("name", "id"), (e.value = t.id), e.dispatchEvent(new Event("change", { bubbles: !0 }));
                        });
                    })(r, t);
            })(e, (c = n.variants.find((e) => !e.options.map((e, t) => l[t] === e).includes(!1))), u);
        });
    }),
        e.querySelectorAll(".single-option-selector").forEach(function e(t, n) {
            i.on("swatch:change:" + (n + 1), function e(i) {
                (t.value = i), t.dispatchEvent(new CustomEvent("change", { bubbles: !0, cancelable: !0 }));
            });
        }),
        (r = e.querySelectorAll("[type=radio]")),
        (o = {
            sold_out: function (e) {
                e.parentElement.classList.add("soldout");
            },
            available: function (e) {
                e.parentElement.classList.remove("soldout");
            },
        }),
        i.on("variantunavailable", function e() {
            var t = {};
            document.querySelectorAll("[type=radio]:checked").forEach(function (e) {
                var i = "option" + e.getAttribute("data-position"),
                    n = e.value;
                t[i] = n;
            }),
                r.forEach(function (e) {
                    var i = !1,
                        r = "option" + e.getAttribute("data-position"),
                        a = e.value,
                        s = ["option1", "option2", "option3"].filter(function (e) {
                            return t[e] && e != r;
                        });
                    n.variants.forEach(function (e) {
                        if (e.available && e[r] == a && e[s[0]] == t[s[0]] && e[s[1]] == t[s[1]]) {
                            i = !0;
                            return;
                        }
                    }),
                        i ? o.available(e) : o.sold_out(e);
                });
        }),
        r.forEach(function t(r) {
            var a = r.getAttribute("data-position"),
                s = "option" + a,
                l = ["option1", "option2", "option3"].filter(function (e) {
                    return e != s;
                });
            r.addEventListener("change", function (t) {
                (e.querySelector("#selected-option-" + a).innerHTML = r.value), i.trigger("swatch:change:" + a, r.value);
            }),
                i.on("variantchange:option" + a + ":" + r.value, function e() {
                    r.checked = !0;
                }),
                i.on("variantchange", function e(t) {
                    var i = !1;
                    n.variants.forEach(function (e) {
                        e.available && e[s] == r.value && e[l[0]] == t[l[0]] && e[l[1]] == t[l[1]] && (i = !0);
                    }),
                        i ? o.available(r) : o.sold_out(r);
                });
        }),
        e.querySelectorAll(".swatches__form--label").forEach(function e(t) {
            t.addEventListener("keyup", function (e) {
                if (13 === e.keyCode) {
                    e.preventDefault();
                    let t = e.target.parentNode.querySelector(".swatches__form--input");
                    t.click();
                }
            });
        }),
        (function t() {
            var n = e.querySelector(".price__regular .price-item--regular");
            if (!n) return !1;
            i.on("variantchange", function (e) {
                var t = d(e.price);
                (n.innerHTML = t),
                    i.on("variantunavailable", function (e) {
                        (t = u.unavailable), (n.innerHTML = t);
                    });
            });
        })(),
        (a = e.querySelector("[data-price]")),
        i.on("variantchange", function (e) {
            e.available && e.compare_at_price > e.price
                ? (a.classList.add("price--on-sale"), a.classList.remove("price--sold-out"))
                : !e.available && e.compare_at_price > e.price
                ? (a.classList.add("price--sold-out"), a.classList.add("price--on-sale"))
                : e.available
                ? (a.classList.remove("price--on-sale"), a.classList.remove("price--sold-out"))
                : (a.classList.add("price--sold-out"), a.classList.remove("price--on-sale")),
                e.unit_price_measurement ? a.classList.add("price--unit-available") : a.classList.remove("price--unit-available");
        }),
        (function t() {
            var n = e.querySelector("[data-unit-price]"),
                r = e.querySelector(".price__unit");
            if (!n) return !1;
            i.on("variantchange", function (e) {
                var t,
                    i = "";
                e.unit_price
                    ? ((i = theme.Helpers.formatMoney(e.unit_price, u.money_format)),
                      u.unit_price_separator,
                      1 === (t = e).unit_price_measurement.reference_value ? t.unit_price_measurement.reference_unit : (t.unit_price_measurement.reference_value, t.unit_price_measurement.reference_unit),
                      (r.style.display = "flex"))
                    : (r.style.display = "none"),
                    (n.innerHTML = i);
            });
        })(),
        (function t() {
            var n = e.querySelector(".price__sale .price-item--sale"),
                r = e.querySelector(".price__sale .price-item--regular");
            if (!n) return !1;
            i.on("variantchange", function (e) {
                var t = "",
                    i = "";
                e.compare_at_price > e.price && ((i = d(e.compare_at_price)), (t = d(e.price))), (n.innerHTML = t), (r.innerHTML = i);
            });
        })(),
        (function t() {
            var n = e.querySelector(".variant_sku");
            if (!n) return !1;
            i.on("variantchange", function (e) {
                var t = e.sku;
                n.innerHTML = t;
            }),
                i.on("variantunavailable", function (e) {
                    var t = u.unavailable;
                    n.innerHTML = t;
                });
        })(),
        (function t() {
            var n = e.querySelector(".js-ajax-submit");
            if (!n) return !1;
            i.on("variantchange", function (e) {
                var t = u.button,
                    i = !1;
                e.available || ((t = u.sold_out), (i = !0)), (n.value = t), (n.disabled = i);
            }),
                i.on("variantunavailable", function () {
                    (n.value = u.unavailable), (n.disabled = !0);
                });
        })(),
        (function t() {
            let n = e.querySelector("#product-form-installment");
            if (!n) return !1;
            let r = n.querySelector('input[name="id"]'),
                o = n.querySelector('select[name="id"]');
            i.on("variantchange", function (e) {
                (o.value = parseInt(e.id)), (r.value = e.id), o.dispatchEvent(new Event("change", { bubbles: !0 })), r.dispatchEvent(new Event("change", { bubbles: !0 }));
            });
        })(),
        (function t() {
            var n = e.querySelector(".shopify-payment-button");
            if (!n) return !1;
            i.on("variantchange", function (e) {
                e.available ? (n.style.display = "block") : (n.style.display = "none");
            });
        })(),
        (function t() {
            let n = { icon: "icon", percentage: "percentage", amount: "amount" },
                r = e.querySelector(".price__badge.price__badge--sale"),
                o = e.dataset.saleFormat,
                a = u.savings;
            return o == n.icon
                ? (console.log("sale_icon:: Error. Format does not match an accepted format."), !1)
                : u
                ? r
                    ? void i.on("variantchange", function e(t) {
                          t.compare_at_price > t.price &&
                              (r.innerHTML = (function e(t, i, r, o = /{{ savings }}/i) {
                                  if (!t) return console.log("Error. No variant passed into function."), !1;
                                  if (!i) return console.log("Error. No format was passed into function."), !1;
                                  if (!r) return console.log("Error. No string passed into function."), !1;
                                  switch (i) {
                                      case n.percentage:
                                          return r.replace(
                                              o,
                                              (function e(t) {
                                                  let i = t.compare_at_price - t.price,
                                                      n = Math.floor((i / t.compare_at_price) * 100);
                                                  return n + "%";
                                              })(t)
                                          );
                                      case n.amount:
                                          return r.replace(
                                              o,
                                              (function e(t) {
                                                  let i = t.compare_at_price - t.price;
                                                  return d(i);
                                              })(t)
                                          );
                                  }
                              })(t, o, a));
                      })
                    : (console.log("sale_icon:: Error. No Sale icon element to work with."), !1)
                : (console.log("sale_icon:: Error. Do not have access to the config object for translations."), !1);
        })(),
        (function t() {
            let n = { variantStockLevels: "js-variant-stock-levels", variantStockLevelsMessage: "js-variant-stock-levels__message", hide: "visually-hidden" },
                r = { variantStockLevels: "." + n.variantStockLevels, variantStockLevelsMessage: "." + n.variantStockLevelsMessage, variantStockLevelsTheshold: "data-variant-stock-level-threshold" },
                o = e.querySelector(r.variantStockLevels),
                a = e.querySelector(r.variantStockLevelsMessage);
            if (!o) return !1;
            let s = void 0 !== o.getAttribute(r.variantStockLevelsTheshold) ? parseInt(o.dataset.stockLevelThreshold, 10) : 11,
                l = () => "function" == typeof theme.Helpers.fadeIn && "function" == typeof theme.Helpers.fadeOut,
                c = (e) => {
                    e && (e.classList.remove(n.hide), l && theme.Helpers.fadeIn(e));
                },
                d = (e) => {
                    e && l && theme.Helpers.fadeOut(e);
                },
                h = (e, t, i = /{{ count }}/) => (1 == t ? (e.only_left.one.includes(i.source) ? e.only_left.one.replace(i, t) : e.only_left.one) : e.only_left.one.includes(i.source) ? e.only_left.other.replace(i, t) : e.only_left.other);
            i.on("variantchange", (e) => {
                e.inventory_management && e.inventory_quantity < s && e.inventory_quantity > 0 ? ((a.innerHTML = h(u, e.inventory_quantity)), c(o)) : d(o);
            }),
                i.on("variantunavailable", (e) => {
                    d(o);
                });
        })();
}),
    (theme.ProductScrollGallery = {
        init: function e(t, i, n, r) {
            let o = JSON.parse(t.querySelector(".js-product-gallery").dataset.galleryConfig || "{}"),
                a = t.querySelector(".js-carousel-main");
            return (
                !!a &&
                (mobile.matches && theme.ProductScrollGallery.enableCarousel(a, o, t),
                Events.on("mediaquery:mobile", function () {
                    theme.ProductScrollGallery.enableCarousel(a, o, t);
                }),
                Events.on("mediaquery:tablet", function () {
                    theme.ProductScrollGallery.enableCarousel(a, o, t);
                }),
                o.clickToEnlarge && theme.ProductScrollGallery.enlargePhoto(t),
                Events.on("variantchange:image", function (e, t) {
                    if ("quickview" === t.dataset.sectionId || null === e) return !1;
                    let i = t.querySelector(".js-carousel-main").querySelector("[data-image-id='" + e + "']"),
                        n = i.dataset.slideIndex;
                    desktop.matches && theme.ProductScrollGallery.scrollToImage(n, t, i);
                }),
                !mobile.matches &&
                    void t.querySelectorAll(".product-media-container").forEach((e, i) => {
                        e.addEventListener("YTVideoStart", function () {
                            theme.ProductScrollGallery.switchMedia(e.dataset.mediaNumber, t);
                        }),
                            document.body.addEventListener("click", function (i) {
                                e.contains(i.target) && theme.ProductScrollGallery.switchMedia(e.dataset.mediaNumber, t);
                            });
                    }))
            );
        },
        enableCarousel: function e(t, i, n) {
            let r = t.querySelector("[data-image-id='" + n.dataset.initialVariant + "']"),
                o;
            if (((o = r ? r.dataset.slideIndex : 0), "dots" == i.navStyle))
                var a = !0,
                    s = !1;
            else
                var a = !1,
                    s = !0;
            var l = new Flickity(t, {
                fade: !0,
                wrapAround: !0,
                cellAlign: "left",
                draggable: !0,
                contain: !0,
                pageDots: a,
                prevNextButtons: s,
                autoPlay: !1,
                selectedAttraction: 0.01,
                dragThreshold: 5,
                accessibility: !1,
                adaptiveHeight: !1,
                imagesLoaded: !0,
                initialIndex: o,
                on: {
                    ready: function () {
                        this.selectedElement.dataset.imageId, (n.querySelector(".js-product-gallery").style.visibility = "visible");
                    },
                    change: function () {
                        theme.ProductScrollGallery.removeFocus(n),
                            theme.ProductScrollGallery.addFocus(this.selectedElement, n),
                            theme.ProductScrollGallery.switchMedia(this.selectedElement.dataset.imageId, n),
                            this.selectedElement.classList.contains("model-slide") && this.isDraggable && ((this.options.draggable = !this.options.draggable), this.updateDraggable());
                    },
                },
            });
            theme.ProductScrollGallery.galleryEvents(l, t, i, n);
        },
        disableCarousel: function e(t) {
            t.destroy();
        },
        galleryEvents: function e(t, i, n, r) {
            Events.on("variantchange:image", function (e, i) {
                if ("quickview" === i.dataset.sectionId || null === e) return !1;
                let n = i.querySelector(".js-carousel-main").querySelector("[data-image-id='" + e + "']"),
                    r = n.dataset.slideIndex;
                theme.ProductScrollGallery.switchMedia(e, i), desktop.matches ? theme.ProductScrollGallery.scrollToImage(r, i, n) : t.select(r);
            }),
                Events.on("mediaquery:desktop", function () {
                    theme.ProductScrollGallery.disableCarousel(t);
                }),
                Events.on("editor:section:select", function () {
                    desktop.matches ? theme.ProductScrollGallery.disableCarousel(t) : theme.ProductScrollGallery.enableCarousel(i, n, r);
                });
        },
        addFocus: function e(t, i) {
            t.classList.contains("image-slide")
                ? t.querySelector("img").setAttribute("tabIndex", "0")
                : t.classList.contains("video-slide")
                ? t.querySelectorAll(".plyr__controls *").forEach((e, t) => {
                      e.setAttribute("tabIndex", "0");
                  })
                : t.classList.contains("external_video-slide")
                ? t.querySelector("iframe").setAttribute("tabIndex", "0")
                : t.classList.contains("model-slide") &&
                  t.querySelectorAll(".shopify-model-viewer-ui__controls-area *").forEach((e, t) => {
                      e.setAttribute("tabIndex", "0");
                  });
        },
        removeFocus: function e(t) {
            let i;
            (i = t || t.querySelector(".js-carousel-main")),
                t.querySelectorAll(".js-carousel-main *").forEach((e, t) => {
                    e.setAttribute("tabIndex", "-1"), e.blur();
                });
            t.querySelectorAll(".flickity-button *").forEach((e, t) => {
                e.setAttribute("tabIndex", "-1"), e.classList.add("js-hide-focus");
            }),
                i.classList.contains(".flickity-enabled") && (i.setAttribute("tabIndex", "-1"), i.classList.add("js-hide-focus"));
        },
        scrollToImage: function e(t, i, n) {
            if (
                (i.querySelectorAll(".js-product-image-item").forEach((e, t) => {
                    e.classList.remove("selected");
                }),
                !n)
            )
                return !1;
            if ((n.classList.add("selected"), document.querySelector("body").classList.contains("template-index"))) n.scrollIntoView();
            else {
                let r = document.querySelector("header").offsetHeight;
                document.documentElement.scrollTo({ top: n.offsetTop - r + 250, left: 0, behavior: "smooth" });
            }
        },
        enlargePhoto: function e(t) {
            let i = t.querySelectorAll(".zoom_btn");
            if (!i) return !1;
            i.forEach((e, t) => {
                e.addEventListener("click", function (e) {
                    e.preventDefault(), e.target, n(t);
                });
            });
            var n = function (e) {
                var i = document.querySelectorAll(".pswp")[0];
                let n = t.querySelectorAll(".js-image-slide");
                if (n.length < 2) var r = !1;
                else var r = !0;
                let o = [];
                n.forEach((e, t) => {
                    let i = e.querySelector(".product__image"),
                        n = { src: i.getAttribute("data-zoom-src"), w: i.getAttribute("data-width"), h: i.getAttribute("data-height") };
                    o.push(n);
                });
                var a = new PhotoSwipe(i, PhotoSwipeUI_Default, o, {
                    index: e,
                    arrowEl: r,
                    captionEl: !1,
                    closeOnScroll: !1,
                    counterEl: !1,
                    history: !1,
                    fullscreenEl: !1,
                    preloaderEl: !1,
                    shareEl: !1,
                    tapToClose: !1,
                    getThumbBoundsFn: function (e) {
                        var i = window.pageYOffset || document.documentElement.scrollTop,
                            n = t.querySelector(".product__image").getBoundingClientRect();
                        return { x: n.left, y: n.top + i, w: n.width };
                    },
                });
                a.init(),
                    a.listen("afterChange", function () {
                        var e = Flickity.data(".js-carousel-main");
                        if (!e) return !1;
                        var t = a.getCurrentIndex();
                        e.select(t);
                    });
            };
        },
        switchMedia: function e(t, i) {
            let n = i.querySelector(".js-carousel-main"),
                r = n.querySelector("[data-product-single-media-wrapper]:not(.inactive)"),
                o = n.querySelector("[data-product-single-media-wrapper][data-thumbnail-id='product-template-" + t + "']"),
                a = n.querySelectorAll("[data-product-single-media-wrapper]:not([data-thumbnail-id='product-template-" + t + "'])");
            r && r.dispatchEvent(new CustomEvent("mediaHidden", { bubbles: !0, cancelable: !0 })),
                o && (o.classList.add("active-slide"), o.classList.remove("inactive"), o.dispatchEvent(new CustomEvent("mediaVisible", { bubbles: !0, cancelable: !0 }))),
                a &&
                    a.forEach(
                        function (e) {
                            e.classList.add("inactive"), e.classList.remove("active-slide");
                        }.bind(this)
                    );
        },
    }),
    (theme.ProductGallery = {
        init: function e(t, i, n, r) {
            let o = JSON.parse(t.querySelector(".js-product-gallery").dataset.galleryConfig || "{}"),
                a = t.querySelector(".js-carousel-main"),
                s = t.querySelector(".js-thumb-carousel-nav");
            if (!a) return !1;
            this.mainSlider(a, s, o, t),
                "bottom" == o.thumbPosition && !0 == o.thumbSlider && this.thumbSlider(s, a, t),
                "bottom" != o.thumbPosition && !0 == o.thumbSlider && this.sideThumbSlider(s, a, t),
                o.clickToEnlarge && theme.ProductGallery.enlargePhoto(t);
        },
        mainSlider: function e(t, i, n, r) {
            if (!n.mainSlider) return !1;
            let o = t.querySelector("[data-image-id='" + r.dataset.initialVariant + "']"),
                a;
            a = o ? o.dataset.slideIndex : 0;
            var s = new Flickity(t, {
                fade: !0,
                wrapAround: !0,
                cellAlign: "left",
                draggable: !0,
                contain: !0,
                pageDots: !1,
                prevNextButtons: n.mainSlider,
                autoPlay: !1,
                accessibility: !1,
                selectedAttraction: 0.01,
                dragThreshold: 5,
                adaptiveHeight: !1,
                imagesLoaded: !0,
                initialIndex: a,
                on: {
                    dragStart: function () {
                        document.ontouchmove = (e) => e.preventDefault();
                    },
                    dragEnd: function () {
                        document.ontouchmove = () => !0;
                    },
                    ready: function () {
                        this.selectedElement.dataset.imageId, (r.querySelector(".js-product-gallery").style.visibility = "visible");
                    },
                    change: function () {
                        theme.ProductGallery.removeFocus(r),
                            theme.ProductGallery.addFocus(this.selectedElement, r),
                            theme.ProductGallery.setActiveThumbnail(this.selectedElement.dataset.imageId, this.selectedElement, r),
                            theme.ProductGallery.switchMedia(this.selectedElement.dataset.imageId, r),
                            this.selectedElement.classList.contains("model-slide") && this.isDraggable && ((this.options.draggable = !this.options.draggable), this.updateDraggable());
                    },
                },
            });
            theme.ProductGallery.galleryEvents(s, r), i && theme.ProductGallery.thumbnails(s, i, n, r);
        },
        thumbSlider: function e(t, i, n) {
            new Flickity(t, { asNavFor: i, wrapAround: !1, groupCells: !0, cellAlign: "left", draggable: !1, contain: !0, imagesLoaded: !0, pageDots: !1, autoPlay: !1, selectedAttraction: 0.01, dragThreshold: 5, accessibility: !1 });
        },
        sideThumbSlider: function e(t, i, n) {
            var r = Flickity.data(i);
            n.querySelectorAll(".carousel-nav .carousel-cell"),
                r.on("select", function (e) {
                    n.querySelectorAll(".carousel-nav .carousel-cell"), r.selectedIndex;
                });
        },
        thumbnails: function e(t, i, n, r) {
            if (!i) return !1;
            let o = i.querySelectorAll(".js-thumb-item");
            if (!o) return !1;
            o.forEach((e, n) => {
                e.addEventListener("click", function (e) {
                    e.preventDefault();
                    let n = this.dataset.slideIndex,
                        o = i.querySelectorAll(".js-thumb-item")[n],
                        a = this.dataset.imageId;
                    theme.ProductGallery.setActiveThumbnail(a, o, r), theme.ProductGallery.switchMedia(a, r), theme.ProductGallery.setThumbPos(this, i), t.select(n);
                }),
                    e.addEventListener("keypress", function (e) {
                        if ((e.preventDefault(), 13 == e.which)) {
                            let n = this.dataset.slideIndex,
                                o = i.querySelectorAll(".js-thumb-item")[n],
                                a = this.dataset.imageId;
                            theme.ProductGallery.setActiveThumbnail(a, o, r), theme.ProductGallery.switchMedia(a, r), theme.ProductGallery.setThumbPos(this, i), t.select(n);
                        }
                    });
            });
        },
        setThumbPos: function e(t, i) {
            i.scrollTo({ top: t.offsetTop - 20, left: 0, behavior: "smooth" });
        },
        galleryEvents: function e(t, i) {
            Events.on("variantchange:image", function (e, t) {
                var i, n, r, o;
                if (null === e) return !1;
                (r = (n = (i = t.querySelector(".js-carousel-main")).querySelector("[data-image-id='" + e + "']")).dataset.slideIndex),
                    theme.ProductGallery.setActiveThumbnail(e, n, t),
                    theme.ProductGallery.switchMedia(e, t),
                    (o = Flickity.data(i)).select(r);
            });
        },
        removeFocus: function e(t) {
            let i;
            (i = t || t.querySelector(".js-carousel-main")),
                t.querySelectorAll(".js-carousel-main *").forEach((e, t) => {
                    e.setAttribute("tabIndex", "-1"), e.blur();
                });
            t.querySelectorAll(".flickity-button *").forEach((e, t) => {
                e.setAttribute("tabIndex", "-1"), e.classList.add("js-hide-focus");
            }),
                i.classList.contains(".flickity-enabled") && (i.setAttribute("tabIndex", "-1"), i.classList.add("js-hide-focus"));
        },
        addFocus: function e(t, i) {
            t.classList.contains("image-slide")
                ? t.querySelector("img").setAttribute("tabIndex", "0")
                : t.classList.contains("video-slide")
                ? t.querySelectorAll(".plyr__controls *").forEach((e, t) => {
                      e.setAttribute("tabIndex", "0");
                  })
                : t.classList.contains("external_video-slide")
                ? t.querySelector("iframe").setAttribute("tabIndex", "0")
                : t.classList.contains("model-slide") &&
                  t.querySelectorAll(".shopify-model-viewer-ui__controls-area *").forEach((e, t) => {
                      e.setAttribute("tabIndex", "0");
                  });
        },
        enlargePhoto: function e(t) {
            let i = t.querySelectorAll(".zoom_btn");
            if (!i) return !1;
            i.forEach((e, t) => {
                e.addEventListener("click", function (e) {
                    e.preventDefault();
                    var t = e.target.getAttribute("data-ps-slide-index"),
                        t = parseInt(t, 10);
                    n(t);
                });
            });
            var n = function (e) {
                var i = document.querySelectorAll(".pswp")[0];
                let n = t.querySelectorAll("#slider .slides.carousel-main .image-slide");
                if (n.length < 2) var r = !1;
                else var r = !0;
                let o = [];
                n.forEach((e, t) => {
                    let i = e.querySelector(".product__image"),
                        n = { src: i.getAttribute("data-zoom-src"), w: i.getAttribute("data-width"), h: i.getAttribute("data-height") };
                    o.push(n);
                });
                var a = new PhotoSwipe(i, PhotoSwipeUI_Default, o, {
                    index: e,
                    arrowEl: r,
                    captionEl: !1,
                    closeOnScroll: !1,
                    counterEl: !1,
                    history: !1,
                    fullscreenEl: !1,
                    preloaderEl: !1,
                    shareEl: !1,
                    tapToClose: !1,
                    getThumbBoundsFn: function (e) {
                        var i = window.pageYOffset || document.documentElement.scrollTop,
                            n = t.querySelector(".product__image").getBoundingClientRect();
                        return { x: n.left, y: n.top + i, w: n.width };
                    },
                });
                a.init(),
                    a.listen("afterChange", function () {
                        var e = t.querySelector(".slides.carousel-main");
                        e || console.log("Error. Could not find contextual gallery");
                        var i = Flickity.data(e),
                            n = a.getCurrentIndex();
                        let r = parseInt(document.querySelector(`[data-ps-slide-index="${n}"]`).dataset.index, 10);
                        i.select(r);
                    });
            };
        },
        switchMedia: function e(t, i) {
            let n = i.querySelector(".js-carousel-main"),
                r = n.querySelector("[data-product-single-media-wrapper]:not(.inactive)"),
                o = n.querySelector("[data-product-single-media-wrapper][data-thumbnail-id='product-template-" + t + "']"),
                a = n.querySelectorAll("[data-product-single-media-wrapper]:not([data-thumbnail-id='product-template-" + t + "'])");
            r.dispatchEvent(new CustomEvent("mediaHidden", { bubbles: !0, cancelable: !0 })),
                o.classList.add("active-slide"),
                o.classList.remove("inactive"),
                o.dispatchEvent(new CustomEvent("mediaVisible", { bubbles: !0, cancelable: !0 })),
                a.forEach(
                    function (e) {
                        e.classList.add("inactive"), e.classList.remove("active-slide");
                    }.bind(this)
                );
        },
        setActiveThumbnail: function e(t, i, n) {
            let r = n.querySelector(".js-carousel-main"),
                o = n.querySelector(".js-thumb-carousel-nav");
            void 0 === t && (t = r.querySelector("[data-product-single-media-wrapper]:not(.hide)").dataset.mediaId),
                o &&
                    o.querySelectorAll(".js-thumb-item").forEach((e, t) => {
                        e.classList.remove("is-nav-selected"), e.classList.remove("active-slide"), e.removeAttribute("aria-current");
                    });
            let a = n.querySelector(".js-thumb-item[data-image-id='" + t + "']");
            a && (a.classList.add("is-nav-selected"), a.classList.add("active-slide"), a.setAttribute("aria-current", !0));
        },
    }),
    (theme.ProductVideo = (function (e, t) {
        var i = {},
            n = { html5: "html5", youtube: "youtube" },
            r = { productMediaWrapper: "[data-product-single-media-wrapper]" },
            o = { enableVideoLooping: "enable-video-looping", videoId: "video-id" };
        function a(e) {
            if (e) {
                (function e() {
                    for (var t in i)
                        if (i.hasOwnProperty(t)) {
                            var r = i[t];
                            if (r.nativeVideo) continue;
                            r.host === n.html5 && (r.element.setAttribute("controls", "controls"), (r.nativeVideo = !0));
                        }
                })();
                return;
            }
            l(n.html5);
        }
        function s() {
            window.YT.Player && l(n.youtube);
        }
        function l(e) {
            for (var t in i)
                if (i.hasOwnProperty(t)) {
                    var n = i[t];
                    n.host === e && n.ready();
                }
        }
        return {
            init: function e(t, l) {
                if (t) {
                    var c = t.querySelector("iframe, video");
                    if (c) {
                        var u,
                            d = t.getAttribute("data-media-id");
                        i[d] = {
                            mediaId: d,
                            sectionId: l,
                            host: ((u = c), "VIDEO" === u.tagName ? n.html5 : "IFRAME" === u.tagName && /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(u.src) ? n.youtube : null),
                            container: t,
                            element: c,
                            ready: function () {
                                (function e(t) {
                                    if (!t.player) {
                                        var i = t.container.closest(r.productMediaWrapper),
                                            a = "true" === i.getAttribute("data-" + o.enableVideoLooping);
                                        switch (t.host) {
                                            case n.html5:
                                                (t.player = new Shopify.Plyr(t.element, { loop: { active: a }, muted: !0, hideControlsOnPause: !0, tooltips: { controls: !1, seek: !0 } })),
                                                    t.player.on("ready", (e) => {
                                                        t.container.querySelector(".plyr--full-ui").setAttribute("tabindex", "-1"),
                                                            t.container.querySelectorAll(".plyr--full-ui *").forEach((e, t) => {
                                                                e.setAttribute("tabindex", "-1");
                                                            });
                                                    }),
                                                    t.player.on("play", (e) => {
                                                        t.container.querySelectorAll(".plyr__controls *").forEach((e, t) => {
                                                            e.setAttribute("tabIndex", "0");
                                                        });
                                                    });
                                                break;
                                            case n.youtube:
                                                var s = i.getAttribute("data-" + o.videoId);
                                                t.player = new YT.Player(t.element, {
                                                    videoId: s,
                                                    events: {
                                                        onStateChange: function (e) {
                                                            0 === e.data && a && e.target.seekTo(0);
                                                        },
                                                        onReady: function (e) {
                                                            t.player.mute();
                                                        },
                                                    },
                                                });
                                        }
                                        var l = function () {
                                            t.player && (t.host === n.html5 && t.player.pause(), t.host === n.youtube && t.player.pauseVideo && t.player.pauseVideo());
                                        };
                                        i.addEventListener("mediaHidden", l),
                                            i.addEventListener("xrLaunch", l),
                                            i.addEventListener("mediaHidden xrLaunch", function () {
                                                t.player && (t.host === n.html5 && t.player.pause(), t.host === n.youtube && t.player.pauseVideo && t.player.pauseVideo());
                                            }),
                                            i.addEventListener("mediaVisible", function () {
                                                !theme.Helpers.isTouch() && t.player && (t.host === n.html5 && desktop.matches && t.player.play(), t.host === n.youtube && t.player.playVideo && desktop.matches && t.player.playVideo());
                                            });
                                    }
                                })(this);
                            },
                        };
                        var h = i[d];
                        switch (h.host) {
                            case n.html5:
                                window.Shopify.loadFeatures([{ name: "video-ui", version: "1.0", onLoad: a }]), theme.LibraryLoader.load("plyrShopifyStyles");
                                break;
                            case n.youtube:
                                theme.LibraryLoader.load("youtubeSdk", s);
                        }
                    }
                }
            },
            hosts: n,
            loadVideos: l,
            removeSectionVideos: function e(t) {
                for (var n in i)
                    if (i.hasOwnProperty(n)) {
                        var r = i[n];
                        r.sectionId === t && (r.player && r.player.destroy(), delete i[n]);
                    }
            },
        };
    })()),
    (theme.ProductModel = (function () {
        var e = {},
            t = {},
            i = {},
            n = { mediaGroup: "[data-product-single-media-group]", xrButton: "[data-shopify-xr]" };
        function r(e) {
            if (!e) {
                for (var i in t)
                    if (t.hasOwnProperty(i)) {
                        var n = t[i];
                        n.modelViewerUi || (n.modelViewerUi = new Shopify.ModelViewerUI(n.element)), o(n);
                    }
            }
        }
        function o(e) {
            var t = i[e.sectionId];
            e.container.addEventListener("mediaVisible", function () {
                t.element.setAttribute("data-shopify-model3d-id", e.modelId), mobile.matches || e.modelViewerUi.play();
            }),
                e.container.addEventListener("mediaHidden", function () {
                    t.element.setAttribute("data-shopify-model3d-id", t.defaultId), e.modelViewerUi.pause();
                }),
                e.container.addEventListener("xrLaunch", function () {
                    e.modelViewerUi.pause();
                });
        }
        return {
            init: function o(a, s) {
                (e[s] = { loaded: !1 }),
                    a.forEach(function (e, r) {
                        var o = e.getAttribute("data-media-id"),
                            a = e.querySelector("model-viewer"),
                            l = a.getAttribute("data-model-id");
                        if (0 === r) {
                            var c = e.closest(n.mediaGroup).querySelector(n.xrButton);
                            i[s] = { element: c, defaultId: l };
                        }
                        t[o] = { modelId: l, sectionId: s, container: e, element: a };
                    }),
                    window.Shopify.loadFeatures([
                        {
                            name: "shopify-xr",
                            version: "1.0",
                            onLoad: function t(i) {
                                if (!i) {
                                    if (!window.ShopifyXR) {
                                        document.addEventListener("shopify_xr_initialized", function () {
                                            t();
                                        });
                                        return;
                                    }
                                    for (var n in e)
                                        if (e.hasOwnProperty(n)) {
                                            var r = e[n];
                                            if (r.loaded) continue;
                                            var o = document.querySelector("#ModelJson-" + n);
                                            window.ShopifyXR.addModels(JSON.parse(o.innerHTML)), (r.loaded = !0);
                                        }
                                    window.ShopifyXR.setupXRElements();
                                }
                            },
                        },
                        { name: "model-viewer-ui", version: "1.0", onLoad: r },
                    ]),
                    theme.LibraryLoader.load("modelViewerUiStyles");
            },
            removeSectionModels: function i(n) {
                for (var r in t) t.hasOwnProperty(r) && t[r].sectionId === n && (t[r].modelViewerUi.destroy(), delete t[r]);
                delete e[n];
            },
        };
    })()),
    (theme.ProductAccordion = function (e, t) {
        document.addEventListener("shopify:block:select", function (e) {
            !e.target.classList.contains(WAU.Accordion.getConfigClass("mobileNavAccordion")) && WAU.Accordion.show(e.target, !0);
        }),
            document.addEventListener("shopify:block:deselect", function (e) {
                !e.target.classList.contains(WAU.Accordion.getConfigClass("mobileNavAccordion")) && (e.target.classList.contains(WAU.Accordion.getConfigClass("open")) || WAU.Accordion.hide(e.target, !0));
            });
    }),
    (theme.ProductQty = function (e, t) {
        var i = e.querySelectorAll(".js-qty-input, .formQty");
        let n = e.querySelector(".js-qty-input"),
            r = e.querySelector(".formQty");
        function o(i, n) {
            var r = e.querySelector(i);
            if (!r) return !1;
            r.addEventListener("click", function (e) {
                e.preventDefault(), t.trigger("quantitycontrol:click", n);
            });
        }
        n.addEventListener("change", () => {
            r.value = n.value;
        }),
            i.forEach((e, i) => {
                t.on("quantitycontrol:click", function t(i) {
                    var n = parseInt(e.value) + i;
                    if (n < 1) return !1;
                    e.value = n;
                });
            }),
            o(".quantity-control-up", 1),
            o(".quantity-control-down", -1);
    }),
    (theme.complementaryProducts = function (e, t) {
        !(function t() {
            var i = e.querySelector(".js-complementary-products");
            if (!i) return !1;
            !(function () {
                var e = i.dataset.baseUrl;
                if (null !== i) {
                    var t,
                        n = i.dataset.productId,
                        r = i.dataset.sectionId,
                        o = i.dataset.limit;
                    fetch(e + "?section_id=" + r + "&product_id=" + n + "&limit=" + o + "&intent=" + i.dataset.intent)
                        .then((e) => e.text())
                        .then((e) => {
                            let t = document.createElement("div");
                            t.innerHTML = e;
                            let n = t.querySelector(".js-complementary-products");
                            n && n.innerHTML.trim().length && (i.innerHTML = n.innerHTML),
                                Shopify.theme.ajaxCart.init(),
                                Shopify.theme.quickview.init(),
                                o > 1 &&
                                    (function e() {
                                        let t = i.querySelector(".js-carousel");
                                        if (!t) return !1;
                                        let n = t.getAttribute("data-flickity");
                                        if (!n) return console.warn("Error. No Flickity data."), !1;
                                        let r = JSON.parse(n);
                                        new Flickity(t, r);
                                    })();
                        });
                }
            })();
        })();
    }),
    (theme.ProductProperties = (function () {
        let e = {},
            t = function (e) {
                let t = [...e.elements].filter((e) => e.hasAttribute("data-product-property"));
                if (!t) {
                    console.error("Error. No elements.");
                    return;
                }
                let i = [],
                    n = 0,
                    r;
                t.forEach((e) => {
                    i.push(e.getAttribute("name"));
                }),
                    t.forEach((e, i) => {
                        var o, a;
                        let s = e.getAttribute("name");
                        r != s ? (r = s) : t[i].setAttribute("name", ((o = s), (a = n++), `properties[${o.split("properties[")[1].split("]")[0]}${a}]`));
                    });
            },
            i = function () {
                if ("function" != typeof window.scrollTo) return;
                let e = document.querySelector(".required-error");
                if (e) {
                    let t = e.getBoundingClientRect();
                    window.scrollTo({ top: t.y, left: t.x, behavior: "smooth" });
                }
            };
        return (
            (e.init = function (e, t) {
                e.querySelectorAll("[data-product-property]").forEach((e, t) => {
                    e.addEventListener("blur", (e) => {
                        "" != e.target.value ? e.target.classList.add("is__filled") : e.target.classList.remove("is__filled");
                    });
                });
            }),
            (e.checkLineItemProperties = function (e) {
                if (e.elements.length > 0) {
                    t(e);
                    let n = [...e.elements].filter((e) => e.hasAttribute("data-product-property") && e.required);
                    if (n.length > 0) {
                        let r = !1;
                        if (
                            (n.forEach((e) => {
                                e.classList.remove("required-error"), "" === e.value && ((r = !0), e.classList.add("required-error"));
                            }),
                            i(),
                            r)
                        )
                            return !1;
                    }
                }
            }),
            e
        );
    })()),
    (theme.Product = (function () {
        function e(e) {
            var t = new EventEmitter3();
            t.trigger = t.emit;
            var i = e.querySelector(".product-json");
            if (!i) return !1;
            var n = i.innerHTML,
                n = JSON.parse(n || "{}"),
                r = e.dataset.sectionId;
            document.body.className.includes("template-product") && Shopify.RecordViewedProducts.recordRecentlyViewed(),
                e.querySelector("[data-product-gallery]") && theme.ProductGallery.init(e, r, t, n),
                e.querySelector("[data-scroll-gallery]") && theme.ProductScrollGallery.init(e, r, t, n),
                e.querySelector("[data-product-qty]") && theme.ProductQty(e, t),
                e.querySelectorAll("[data-product-property]").length > 0 && theme.ProductProperties.init(e, t),
                e.querySelector("[data-product-form]") && theme.ProductForm(e, r, t, n),
                e.querySelector("[data-complementary-products]") && theme.complementaryProducts(e, r, t, n),
                e.querySelector('[data-wau-modal-content="contact-form"]') && WAU.Modal.init("contact-form"),
                e.querySelector('[data-wau-modal-content="popup-content"]') && WAU.Modal.init("popup-content"),
                e.querySelector("[data-store-availability-container]") && theme.StoreAvailability(e, n, t),
                e.querySelector("[data-recipient-form]") && theme.GiftCardRecipient(e, r, t, n),
                e.querySelectorAll("[data-product-media-type-video]").forEach(function (e, t) {
                    theme.ProductVideo.init(e, t);
                });
            let o = e.querySelectorAll("[data-product-media-type-model]");
            o.length > 0 && theme.ProductModel.init(o, r);
            var a = this;
            document.addEventListener("shopify_xr_launch", function () {
                document.querySelector("[data-product-single-media-wrapper]:not(.inactive)", a).dispatchEvent(new CustomEvent("xrLaunch", { bubbles: !0, cancelable: !0 }));
            });
        }
        return (
            document.addEventListener("shopify:section:load", function (t) {
                if (t.target.querySelector('[data-section-type="product__section"]')) return e;
            }),
            e
        );
    })()),
    (theme.StoreAvailability = function (e, t, i) {
        var n = e.querySelector("[data-store-availability-container]").dataset.variantId;
        function r(e, t, i) {
            let n = i.querySelector("[data-store-availability-container]");
            (n.innerHTML = ""),
                fetch("/variants/" + e + "/?section_id=pickup-availability")
                    .then(function (e) {
                        return e.text();
                    })
                    .then(function (e) {
                        if ("" === e.trim()) return;
                        if (
                            ((n.innerHTML = e),
                            (n.innerHTML = n.firstElementChild.innerHTML),
                            (n.style.opacity = 1),
                            (n.style.visibility = "visible"),
                            n.querySelector(".store-availability-container").classList.remove("fadeOut"),
                            (n.querySelector(".store-availability-container").style.display = "block"),
                            Events.on("storeavailability:unavailable", function () {
                                n.querySelector(".store-availability-container").classList.add("fadeOut"), (n.querySelector(".store-availability-container").style.display = "none");
                            }),
                            document.querySelector('[data-pick-up-available="false"]'))
                        )
                            return (n.style.display = "none"), !1;
                        n.style.display = "block";
                        let i = document.getElementById("StoreAvailabilityModal"),
                            r = document.querySelector(".js-slideout-toggle-wrapper"),
                            o = document.getElementById("slideout-store-availability");
                        if (o) (o.innerHTML = ""), o.appendChild(i);
                        else {
                            let a = WAU.Slideout._createSlideoutEl("right", "store-availability", r);
                            a.appendChild(i);
                        }
                        WAU.Slideout.init("store-availability");
                        let s = document.querySelector("[data-store-availability-modal-product-title]");
                        s.textContent = t;
                    });
        }
        r(n, e.querySelector("[data-store-availability-container]").dataset.productTitle, e),
            i.on("storeavailability:variant", function (e, t, i) {
                r(e, t, i);
            });
    }),
    (theme.ProductRecommendations = function e() {
        var t = function () {
            var e = document.querySelector(".js-product-rec-wrapper");
            if (!e) return !1;
            var t = e.dataset.baseUrl;
            if (null !== e) {
                var i,
                    n = e.dataset.productId,
                    r = e.dataset.sectionId;
                fetch(t + "?section_id=" + r + "&product_id=" + n + "&intent=" + e.dataset.intent)
                    .then(function (e) {
                        return e.text();
                    })
                    .then(function (t) {
                        "" !== t.trim() && ((e.innerHTML = t), (e.innerHTML = e.firstElementChild.innerHTML), Shopify.theme.ajaxCart.init(), Shopify.theme.quickview.init(), WAU.ProductGridVideo.init());
                    });
            }
        };
        document.addEventListener("shopify:section:select", function (e) {
            e.detail.sectionId.includes("product-recommendations") && t();
        }),
            t();
    }),
    (theme.GiftCardRecipient = function (e, t, i, n) {
        let r = e.querySelector(".recipient-form");
        if (!r) return !1;
        let o = r.querySelector(`#Recipient-Checkbox-${t}`);
        o.disabled = !1;
        let a = r.querySelector(`#Recipient-email-${t}`),
            s = r.querySelector(`#Recipient-name-${t}`),
            l = r.querySelector(`#Recipient-message-${t}`),
            c = r.querySelector(`#Recipient-Control-${t}`);
        c.disabled = !0;
        let u = r.closest(".js-prod-form-submit");
        u.querySelector(".js-ajax-submit");
        let d = e.querySelector(".js-error-msg").innerHTML;
        function h() {
            r.querySelectorAll(".recipient-fields .form__message").forEach((e) => {
                e.classList.add("hidden");
                let t = e.querySelector(".error-message");
                t && (t.innerText = "");
            });
        }
        u.addEventListener("change", function e(t) {
            o.checked ? (a.required = !0) : (h(), (a.value = ""), (s.value = ""), (l.value = ""), (a.required = !1));
        }),
            Events.on("recipientform:errors", function (i, n, o, a) {
                (function e(i, n, o) {
                    if (u.isSameNode(o) && (h(), "object" == typeof n))
                        return Object.entries(n).forEach(([e, i]) => {
                            let n = `RecipientForm-${e}-error-${t}`,
                                o = `#Recipient-${e}-${t}`,
                                a = r.querySelector(`${o}`),
                                s = a?.getAttribute("placeholder") || e,
                                l = `${s} ${i}`,
                                c = r.querySelector(`#${n}`),
                                u = c?.querySelector(".error-message");
                            u && ((u.innerText = `${l}.`), c.classList.remove("hidden"));
                        });
                })(i, n, a),
                    (function t(i, n, r) {
                        if (!u.isSameNode(r)) return;
                        let o = e.querySelector(".js-error-msg");
                        if (!o) {
                            console.warn("No error message found.");
                            return;
                        }
                        (o.innerHTML = `<b>${n.form_error}</b> ${i}`),
                            setTimeout(() => {
                                o.innerHTML = d;
                            }, 4e3);
                    })(i, o, a);
            });
    }),
    (theme.RecentlyViewed = function e(t) {
        if (!t) return console.log("Error. Recently viewed section must be provided a container in order to work."), !1;
        let i = t.dataset.limit ? t.dataset.limit : 6,
            n = t.dataset.grid,
            r = !!t.dataset.carousel && t.dataset.carousel,
            o = t.dataset.wrapperId,
            a = (e = "recently-viewed") => {
                if (!e) return console.log("Error. must provide a wrapperId as an argument."), !1;
                let t = document.getElementById(e);
                if (!t) return console.log("Error. No wrapper element was found."), !1;
                theme.Helpers.fadeIn, "function" == typeof theme.Helpers.fadeIn && theme.Helpers.fadeIn(t);
            },
            s = (e) => {
                if (!e) return console.log("Error. Must provide a wrapper element to initialze the carousel on."), !1;
                let t = document.getElementById(e);
                if (!t) return console.log("Error. No carousel element for recently viewed products found!"), !1;
                let i = t.dataset.flickityConfig,
                    r = JSON.parse(i);
                Shopify.RecordViewedProducts.getCount() > n && ((r.wrapAround = !0), (r.prevNextButtons = !0), (r.draggable = !0)), new Flickity(t, r);
            },
            l = (e, t, i) => {
                a(t.id), !0 === e && s(i, this.container), Shopify.theme.quickview.init();
            };
        new ViewedProducts({ howManyToShow: i, wrapperId: o, onComplete: l.bind(this, "true" === r, t, o) });
    }),
    (theme.Maps = (function () {
        var e = !1,
            t = new EventEmitter3();
        (t.trigger = t.emit),
            (window.gm_authFailure = function () {
                (e = !1), Shopify.designMode ? t.trigger("gmauthfailure:themeeditor") : t.trigger("gmauthfailure");
            });
        let i = (e) =>
            new Promise((t, i) => {
                let n = document.createElement("script");
                (n.src = e),
                    (n.async = !0),
                    (n.onerror = i),
                    (n.onload = n.onreadystatechange = function () {
                        let e = this.readyState;
                        (e && "loaded" !== e && "complete" !== e) || ((n.onload = n.onreadystatechange = null), t());
                    }),
                    document.head.appendChild(n);
            });
        function n(n) {
            var r,
                o,
                a = n.querySelector("[data-map-config]").innerHTML,
                a = JSON.parse(a);
            if (!a.api_key) return !1;
            (function e() {
                var i = n;
                function r() {
                    i.classList.add("map-section-load-error");
                }
                t.on("gmauthfailure:themeeditor", r), t.on("map:error", r);
            })(),
                (r = n.querySelector("[data-bg-image]")),
                t.on("gmauthfailure", function e() {
                    r.classList.add("show-image");
                }),
                (function e() {
                    var i = n.querySelector("[data-map-overlay]");
                    function r(e) {
                        (e = e || a.auth_error), (i.innerHTML = '<div class="map-section-error errors text-center">' + e + "</div>");
                    }
                    t.on("gmauthfailure:themeeditor", r), t.on("map:error", r);
                })(),
                (o = n.querySelector("[data-map]")),
                t.on("ready", function e() {
                    new google.maps.Geocoder().geocode({ address: a.address }, function (e, i) {
                        var n, r, s;
                        i == google.maps.GeocoderStatus.OK
                            ? ((n = e),
                              (o.innerHTML = ""),
                              (r = new google.maps.Map(o, { zoom: a.zoom, center: n[0].geometry.location, draggable: !1, clickableIcons: !1, scrollwheel: !1, disableDoubleClickZoom: !0, styles: a.styles, disableDefaultUI: !0 })),
                              (s = r.getCenter()),
                              new google.maps.Marker({ map: r, position: s }),
                              google.maps.event.addDomListener(window, "resize", function () {
                                  theme.Helpers.debounce(function () {
                                      google.maps.event.trigger(r, "resize"), r.setCenter(s);
                                  }, 250);
                              }),
                              document.addEventListener("shopify:section:unload", function () {
                                  google.maps.event.clearListeners(r, "resize");
                              }))
                            : (function e(i) {
                                  var n = a.address_error;
                                  switch (i) {
                                      case "ZERO_RESULTS":
                                          n = a.address_no_results;
                                          break;
                                      case "OVER_QUERY_LIMIT":
                                          n = a.address_query_limit;
                                          break;
                                      case "REQUEST_DENIED":
                                          n = a.auth_error;
                                  }
                                  Shopify.designMode && t.trigger("map:error", n);
                              })(i);
                    });
                }),
                !0 === e
                    ? t.trigger("ready")
                    : "loading" !== e &&
                      ((e = "loading"),
                      void 0 === window.google &&
                          i("https://maps.googleapis.com/maps/api/js?key=" + a.api_key)
                              .then(() => {
                                  (e = !0), t.trigger("ready");
                              })
                              .catch(() => {
                                  t.trigger("map:error", "Could not load map with API key. Check billing with Google."), console.error("Could not load script with api given");
                              }));
        }
        return (n.prototype = _.assignIn({}, n.prototype, {})), n;
    })()),
    (theme.Collection = (function () {
        function e(e) {
            (e.querySelector("[data-collection-filters]") || e.querySelector("[data-collection-sidebar-filters]")) && theme.CollectionFilters.init(e, e.dataset.sectionId);
        }
        return (
            (function e() {
                function t() {
                    let e = document.querySelectorAll(".js-parent-menu");
                    e.forEach(function (e) {
                        let t = e.querySelector(".js-collection-sidemenu-toggle"),
                            i = e.querySelector("ul.nested");
                        e.classList.contains("open") || ((i.style.display = "none"), e.classList.add("closed")),
                            t.addEventListener("click", function (n) {
                                n.preventDefault(),
                                    e.classList.toggle("open"),
                                    (i.style.display = e.classList.contains("open") ? "block" : "none"),
                                    e.classList.toggle("closed"),
                                    t.setAttribute("aria-expanded", e.classList.contains("open"));
                            });
                    });
                }
                t(), document.addEventListener("shopify:section:load", t), document.addEventListener("shopify:section:unload", t);
            })(),
            (e.prototype = _.assignIn({}, e.prototype, {})),
            e
        );
    })()),
    (theme.CollectionFilters = {
        init: function e(t, i) {
            (t.querySelector("[data-collection-filters-hz]") || t.querySelector("[data-collection-sort-by]")) && (theme.CollectionFilters.horizontalFilters(t), theme.CollectionFilters.currentFilters(t)),
                t.querySelector("[data-collection-filters-price-range]") && (theme.CollectionFilters.priceRange(t), theme.CollectionFilters.priceSlider()),
                t.querySelector("[data-collection-sidebar-filters]") && theme.CollectionFilters.sidebarFilters(t),
                (this.filterData = []);
        },
        gatherForm: function e() {
            console.count("gatherForm"), console.trace();
            let t = document.querySelector("#main-collection-form");
            if (!t) {
                console.warn("Error. No main collection form found.");
                return;
            }
            let i = new FormData(t);
            for (let n of i.entries()) console.log(`${n[0]}, ${n[1]}`);
            return i;
        },
        horizontalFilters: function e(t) {
            let i = document.querySelectorAll(".js-hz-filter");
            i.forEach((e, i) => {
                let n = e.querySelector(".js-hz-filter-input"),
                    r = "sort-by" === n.getAttribute("data-filter-type"),
                    o = e.querySelector(".js-hz-filter-list"),
                    a = [...e.querySelectorAll("li")],
                    s = [];
                a.forEach((e) => {
                    let t = e.querySelector(".js-hz-filter-label");
                    if (!t) return !1;
                    s.push(t.textContent);
                }),
                    n.addEventListener("input", () => {
                        o.classList.add("open");
                        let e = n.value.toLowerCase();
                        if (e.length > 0) for (let t = 0; t < s.length; t++) e.substring(0, e.length) !== s[t].substring(0, e.length).toLowerCase() ? a[t].classList.add("closed") : a[t].classList.remove("closed");
                        else for (let i = 0; i < a.length; i++) a[i].classList.remove("closed");
                    }),
                    a.forEach((e) => {
                        e.addEventListener("click", (i) => {
                            r
                                ? a.forEach((t) => {
                                      t == e ? (t.classList.add("current"), (t.querySelector('input[type="checkbox"]').checked = !0)) : (t.classList.remove("current"), (t.querySelector('input[type="checkbox"]').checked = !1));
                                  })
                                : e.querySelector('input[type="checkbox"]').checked
                                ? (e.classList.remove("current"), (e.querySelector('input[type="checkbox"]').checked = !1))
                                : (e.classList.add("current"), (e.querySelector('input[type="checkbox"]').checked = !0)),
                                e.getAttribute("data-placeholder") && (n.placeholder = e.dataset.placeholder);
                            let o = theme.CollectionFilters.gatherForm(),
                                s = new URLSearchParams(o).toString();
                            theme.CollectionFilters.renderPage(s, t),
                                a.forEach((e) => {
                                    e.classList.add("closed");
                                });
                        });
                    }),
                    n.addEventListener("focus", () => {
                        (n.placeholder = n.dataset.genericPlaceholder),
                            n.classList.add("active"),
                            o.classList.add("open"),
                            a.forEach((e) => {
                                e.classList.remove("closed");
                            });
                    }),
                    n.addEventListener("blur", () => {
                        (n.placeholder = n.dataset.placeholder),
                            n.classList.remove("active"),
                            setTimeout(() => {
                                o.classList.remove("open");
                            }, 500);
                    }),
                    document.addEventListener("click", (e) => {
                        let t = o.contains(e.target),
                            i = n.contains(e.target);
                        t || i || o.classList.remove("open");
                    });
            });
            let n = document.querySelector(".js-show-filters");
            if (!n) return !1;
            n.addEventListener("click", function (e) {
                e.preventDefault(), theme.Helpers.toggleClass("collection__filter-wrapper", "open");
            }),
                document.querySelector(".js-filters-reset") && theme.Helpers.toggleClass("collection__filter-wrapper", "open");
        },
        priceRange: function e(t) {
            let i = document.querySelectorAll("input.js-filter-range-input");
            function n() {
                let e = i[0],
                    t = i[1];
                t.value && e.setAttribute("max", parseInt(t.value).toFixed()), e.value && t.setAttribute("min", parseInt(e.value).toFixed());
                let n = parseInt(t.getAttribute("max")).toFixed();
                "" === e.value && t.setAttribute("min", 0), "" === t.value && e.setAttribute("max", n);
            }
            n(i),
                i.forEach((e) => {
                    e.addEventListener("change", (e) => {
                        var t, i;
                        (function e(t) {
                            let i = Number(t.value),
                                n = Number(t.getAttribute("min")),
                                r = Number(t.getAttribute("max"));
                            i < n && (t.value = n), i > r && (t.value = r);
                        })((t = e).currentTarget),
                            n(),
                            (i = e),
                            setTimeout(function () {
                                let e = theme.CollectionFilters.gatherForm(),
                                    t = new URLSearchParams(e).toString();
                                theme.CollectionFilters.renderPage(t);
                            }, 3e3);
                    });
                });
            let r = document.querySelectorAll(".js-hz-filter-price-trigger");
            r.forEach((e, t) => {
                document.addEventListener("click", function (t) {
                    let i = e.nextElementSibling,
                        n = t.target.classList.contains("js-hz-filter-price-trigger"),
                        r = i.contains(t.target);
                    if ((n && t.preventDefault(), r || n || (e.classList.remove("active"), (i.style.display = "none")), !n)) return !1;
                    "inline-block" == i.style.display ? (e.classList.remove("active"), (i.style.display = "none")) : (e.classList.add("active"), (i.style.display = "inline-block"));
                });
                let i = !1;
                e.addEventListener("mousedown", () => {
                    i = !0;
                }),
                    e.addEventListener("mouseup", () => {
                        i = !1;
                    }),
                    e.addEventListener("focus", (t) => {
                        if (!i) {
                            let n = t.target.nextElementSibling;
                            e.classList.add("active"), (n.style.display = "inline-block");
                        }
                    }),
                    document.addEventListener("keyup", (t) => {
                        if (9 == t.keyCode) {
                            let i = document.querySelector(".js-hz-filter-price-dropdown");
                            document.querySelector(".js-hz-filter-price").contains(t.target) || (e.classList.remove("active"), (i.style.display = "none"));
                        }
                    });
            });
        },
        priceSlider: function e() {
            var t = document.querySelectorAll(".js-price-range");
            if (!t) return !1;
            t.forEach((e, t) => {
                var i = e.querySelectorAll("input[type=range]"),
                    n = e.querySelectorAll("input[type=number]");
                i.forEach(function (e) {
                    e.oninput = function () {
                        var e = parseFloat(i[0].value),
                            t = parseFloat(i[1].value),
                            r = (Math.round(100 * e) / 100).toFixed(),
                            o = (Math.round(100 * t) / 100).toFixed();
                        parseFloat(r) > parseFloat(o) && ([r, o] = [o, r]), (n[0].value = r), (n[1].value = o);
                    };
                }),
                    (i[0].onchange = function () {
                        n[0].dispatchEvent(new Event("change", { bubbles: !0 }));
                    }),
                    (i[1].onchange = function () {
                        n[1].dispatchEvent(new Event("change", { bubbles: !0 }));
                    });
            });
        },
        currentFilters: function e(t) {
            let i = document.querySelectorAll(".js-current-filter");
            i.forEach((e, i) => {
                e.addEventListener("click", (e) => {
                    e.preventDefault(), theme.CollectionFilters.onActiveFilterClick(e, t);
                });
            });
        },
        sidebarFilters: function e(t) {
            let i = document.querySelectorAll(".js-collection-side-filter");
            i.forEach((e, i) => {
                e.addEventListener("click", (i) => {
                    i.preventDefault(),
                        e.querySelector('input[type="checkbox"]').checked
                            ? (e.classList.remove("current"), (e.querySelector('input[type="checkbox"]').checked = !1))
                            : (e.classList.add("current"), (e.querySelector('input[type="checkbox"]').checked = !0));
                    let n = theme.CollectionFilters.gatherForm(),
                        r = new URLSearchParams(n).toString();
                    theme.CollectionFilters.renderPage(r, t);
                });
            });
            let n = document.querySelector(".js-collection-side-toggle");
            if (!n) return !1;
            n.addEventListener("click", function (e) {
                e.preventDefault(), theme.Helpers.toggleClass("sidebar", "open");
            });
        },
        renderFilters: function e() {
            if (
                ((document.querySelector("[data-collection-filters-hz]") || document.querySelector("[data-collection-sort-by]")) && (theme.CollectionFilters.horizontalFilters(), theme.CollectionFilters.currentFilters()),
                document.querySelector("[data-collection-filters-price-range]") && (theme.CollectionFilters.priceRange(), theme.CollectionFilters.priceSlider()),
                document.querySelector("[data-collection-sidebar-filters]") && theme.CollectionFilters.sidebarFilters(),
                document.querySelector("[data-collection-sort-by]") && document.querySelector("[data-collection-sort-by]").querySelector(".current"))
            ) {
                let t = document.querySelector("[data-collection-sort-by]").querySelector(".current").dataset.placeholder;
                document.querySelector("[data-collection-sort-by]").querySelector(".js-hz-filter-input").placeholder = t;
            }
            Shopify.theme.quickview.init(), WAU.ProductGridVideo.init();
        },
        renderSectionFromFetch: function e(t, i, n) {
            fetch(i)
                .then((e) => e.text())
                .then((e) => {
                    let n = e;
                    (this.filterData = [...this.filterData, { html: n, url: i }]), theme.CollectionFilters.renderProductGrid(n), theme.CollectionFilters.renderFilters(t);
                });
        },
        renderSectionFromCache: function e(t, i, n) {
            let r = this.filterData.find(i).html;
            theme.CollectionFilters.renderProductGrid(r), theme.CollectionFilters.renderFilters(t);
        },
        renderPage: function e(t, i, n = !0) {
            let r = theme.CollectionFilters.getSections();
            r.forEach((e) => {
                let n = `${window.location.pathname}?section_id=${e.section}&${t}`,
                    r = (e) => e.url === n;
                this.filterData.some(r) ? theme.CollectionFilters.renderSectionFromCache(i, r, e) : theme.CollectionFilters.renderSectionFromFetch(i, n, e);
            }),
                n && theme.CollectionFilters.updateURLHash(t);
        },
        renderProductGrid: function e(t) {
            let i = new DOMParser().parseFromString(t, "text/html").getElementById("CollectionProductGrid").innerHTML;
            document.getElementById("CollectionProductGrid").innerHTML = i;
        },
        onActiveFilterClick: function e(t, i) {
            t.preventDefault(), theme.CollectionFilters.renderPage(new URL(t.currentTarget.href).searchParams.toString(), i);
        },
        updateURLHash: function e(t) {
            history.pushState({ searchParams: t }, "", `${window.location.pathname}${t && "?".concat(t)}`);
        },
        getSections: function e() {
            return [{ id: "main-collection-product-grid", section: document.getElementById("main-collection-product-grid").dataset.id }];
        },
    }),
    (theme.Testimonials = function e(t) {
        let i = document.querySelectorAll(".js-testimonial-carousel");
        i.forEach((e) => {
            let t = e.getAttribute("data-flickity"),
                i = JSON.parse(t);
            new Flickity(e, i);
        });
    }),
    (theme.Testimonials.prototype = _.assignIn({}, theme.Testimonials.prototype, {
        onLoad: function (e) {
            let t = e.target.closest(".js-testimonial-carousel"),
                i = t.getAttribute("data-flickity"),
                n = JSON.parse(i);
            new Flickity(".js-testimonial-carousel", n);
        },
        onBlockSelect: function (e) {
            let t = e.target.closest(".js-testimonial-carousel"),
                i = Flickity.data(t),
                n = e.target.getAttribute("data-slider-index");
            i.select(n), i.pausePlayer();
        },
        onBlockDeselect: function () {
            let e = event.target.closest(".js-testimonial-carousel"),
                t = Flickity.data(e);
            t.unpausePlayer();
        },
    })),
    (theme.ShopTheLook = (function () {
        function e(e) {
            let t = (e) => {
                    let t = e.target;
                    if (!t || "#document" === t.nodeName || !t.matches(".hotspot")) return !1;
                    let i = t.querySelector(".product-hotspot"),
                        n = theme.DOMHelpers.isOutOfBounds(i);
                    n.left && (i.style.transform = `translateX(${Math.round(Math.abs(n.leftAmount)) + 10}px)`), n.right && (i.style.transform = `translateX(${-((Math.round(n.rightAmount) + 20) * 1)}px)`);
                },
                i = e.querySelectorAll(".hotspot");
            i.length > 0 &&
                i.forEach((e) => {
                    e.addEventListener("click", t), e.addEventListener("mouseenter", t);
                });
        }
        return (e.prototype = _.assignIn({}, e.prototype, {})), e;
    })()),
    (theme.Search = (function () {
        function e(e) {
            e.querySelector("[data-search-filters]") && theme.SearchFilters.init(e, e.dataset.sectionId);
        }
        return (e.prototype = _.assignIn({}, e.prototype, {})), e;
    })()),
    (theme.SearchFilters = {
        init: function e(t, i) {
            theme.SearchFilters.horizontalFilters(),
                theme.SearchFilters.currentFilters(),
                t.querySelector("[data-search-filters-price-range]") && (theme.SearchFilters.priceRange(), theme.SearchFilters.priceSlider()),
                (this.filterData = []);
        },
        horizontalFilters: function e() {
            let t = document.querySelectorAll(".js-hz-filter");
            t.forEach((e, t) => {
                let i = e.querySelector(".js-hz-filter-input"),
                    n = e.querySelector(".js-hz-filter-list"),
                    r = [...e.querySelectorAll("li")],
                    o = [];
                r.forEach((e) => {
                    let t = e.querySelector(".js-hz-filter-label");
                    if (!t) return !1;
                    o.push(t.textContent);
                }),
                    i.addEventListener("input", () => {
                        n.classList.add("open");
                        let e = i.value.toLowerCase();
                        if (e.length > 0) for (let t = 0; t < o.length; t++) e.substring(0, e.length) !== o[t].substring(0, e.length).toLowerCase() ? r[t].classList.add("closed") : r[t].classList.remove("closed");
                        else for (let a = 0; a < r.length; a++) r[a].classList.remove("closed");
                    }),
                    r.forEach((e) => {
                        e.addEventListener("click", (t) => {
                            e.querySelector('input[type="checkbox"]').checked
                                ? (e.classList.remove("current"), (e.querySelector('input[type="checkbox"]').checked = !1))
                                : (e.classList.add("current"), (e.querySelector('input[type="checkbox"]').checked = !0)),
                                e.getAttribute("data-placeholder") && (i.placeholder = e.dataset.placeholder);
                            let n = new FormData(i.closest("form")),
                                o = new URLSearchParams(n).toString();
                            var a = window.location.search.toString(),
                                a = a.replace("?", "");
                            theme.SearchFilters.renderPage(a + "&" + o),
                                r.forEach((e) => {
                                    e.classList.add("closed");
                                });
                        });
                    }),
                    i.addEventListener("focus", () => {
                        (i.placeholder = i.dataset.genericPlaceholder),
                            i.classList.add("active"),
                            n.classList.add("open"),
                            r.forEach((e) => {
                                e.classList.remove("closed");
                            });
                    }),
                    i.addEventListener("blur", () => {
                        (i.placeholder = i.dataset.placeholder),
                            i.classList.remove("active"),
                            setTimeout(() => {
                                n.classList.remove("open");
                            }, 500);
                    }),
                    document.addEventListener("click", (e) => {
                        let t = n.contains(e.target),
                            r = i.contains(e.target);
                        t || r || n.classList.remove("open");
                    });
            });
        },
        priceRange: function e() {
            let t = document.querySelectorAll(".js-filter-range-input");
            t.length > 0 &&
                t.forEach((e, t) => {
                    e.addEventListener("change", function (t) {
                        setTimeout(function () {
                            let t = new FormData(e.closest("form")),
                                i = new URLSearchParams(t).toString();
                            var n = window.location.search.toString(),
                                n = n.replace("?", "");
                            theme.SearchFilters.renderPage(n + "&" + i);
                        }, 1e3);
                    });
                });
            let i = document.querySelectorAll(".js-hz-filter-price-trigger");
            i.forEach((e, t) => {
                document.addEventListener("click", function (t) {
                    let i = e.nextElementSibling,
                        n = t.target.classList.contains("js-hz-filter-price-trigger"),
                        r = i.contains(t.target);
                    if ((n && t.preventDefault(), r || n || (e.classList.remove("active"), (i.style.display = "none")), !n)) return !1;
                    "inline-block" == i.style.display ? (e.classList.remove("active"), (i.style.display = "none")) : (e.classList.add("active"), (i.style.display = "inline-block"));
                });
                let i = !1;
                e.addEventListener("mousedown", () => {
                    i = !0;
                }),
                    e.addEventListener("mouseup", () => {
                        i = !1;
                    }),
                    e.addEventListener("focus", (t) => {
                        if (!i) {
                            let n = t.target.nextElementSibling;
                            e.classList.add("active"), (n.style.display = "inline-block");
                        }
                    }),
                    document.addEventListener("keyup", (t) => {
                        if (9 == t.keyCode) {
                            let i = document.querySelector(".js-hz-filter-price-dropdown");
                            document.querySelector(".js-hz-filter-price").contains(t.target) || (e.classList.remove("active"), (i.style.display = "none"));
                        }
                    });
            });
        },
        priceSlider: function e() {
            var t = document.querySelectorAll(".js-price-range");
            if (!t) return !1;
            t.forEach((e, t) => {
                var i = e.querySelectorAll("input[type=range]"),
                    n = e.querySelectorAll("input[type=number]");
                i.forEach(function (e) {
                    e.oninput = function () {
                        var e = parseFloat(i[0].value),
                            t = parseFloat(i[1].value),
                            r = (Math.round(100 * e) / 100).toFixed(),
                            o = (Math.round(100 * t) / 100).toFixed();
                        parseFloat(r) > parseFloat(o) && ([r, o] = [o, r]), (n[0].value = r), (n[1].value = o);
                    };
                }),
                    (i[0].onchange = function () {
                        n[0].dispatchEvent(new Event("change", { bubbles: !0 }));
                    }),
                    (i[1].onchange = function () {
                        n[1].dispatchEvent(new Event("change", { bubbles: !0 }));
                    }),
                    n.forEach(function (e) {
                        e.oninput = function () {
                            var e = parseFloat(n[0].value),
                                t = parseFloat(n[1].value),
                                r = (Math.round(100 * e) / 100).toFixed(),
                                o = (Math.round(100 * t) / 100).toFixed();
                            r > o && ((n[0].value = o), (n[1].value = r)), (i[0].value = r), (i[1].value = o);
                        };
                    });
            });
        },
        currentFilters: function e() {
            let t = document.querySelectorAll(".js-current-filter");
            t.forEach((e, t) => {
                e.addEventListener("click", (e) => {
                    e.preventDefault(), theme.SearchFilters.onActiveFilterClick(e);
                });
            });
        },
        renderFilters: function e() {
            theme.SearchFilters.horizontalFilters(),
                theme.SearchFilters.currentFilters(),
                document.querySelector("[data-search-filters-price-range]") && (theme.SearchFilters.priceRange(), theme.SearchFilters.priceSlider()),
                WAU.ProductGridVideo.init(),
                Shopify.theme.quickview.init();
        },
        renderSectionFromFetch: function e(t, i) {
            fetch(t)
                .then((e) => e.text())
                .then((e) => {
                    let i = e;
                    (this.filterData = [...this.filterData, { html: i, url: t }]), theme.SearchFilters.renderSearchGrid(i), theme.SearchFilters.renderFilters();
                });
        },
        renderSectionFromCache: function e(t, i) {
            let n = this.filterData.find(t).html;
            theme.SearchFilters.renderSearchGrid(n), theme.SearchFilters.renderFilters();
        },
        renderPage: function e(t, i = !0) {
            let n = theme.SearchFilters.getSections();
            n.forEach((e) => {
                let i = `${window.location.pathname}?section_id=${e.section}&${t}`,
                    n = (e) => e.url === i;
                this.filterData.some(n) ? theme.SearchFilters.renderSectionFromCache(n, e) : theme.SearchFilters.renderSectionFromFetch(i, e);
            }),
                i && theme.SearchFilters.updateURLHash(t);
        },
        renderSearchGrid: function e(t) {
            let i = new DOMParser().parseFromString(t, "text/html").getElementById("searchResultsWrapper").innerHTML;
            document.getElementById("searchResultsWrapper").innerHTML = i;
        },
        onActiveFilterClick: function e(t) {
            t.preventDefault();
            let i = new URL(t.currentTarget.href).searchParams.toString(),
                n = new URL(window.location).searchParams.get("q");
            theme.SearchFilters.renderPage(i || "q=" + n);
        },
        updateURLHash: function e(t) {
            history.pushState({ searchParams: t }, "", `${window.location.pathname}${t && "?".concat(t)}`);
        },
        getSections: function e() {
            return [{ id: "main-search-results", section: document.getElementById("main-search-results").dataset.id }];
        },
    });
var selectors = { disclosureLocale: "[data-disclosure-locale]", disclosureCurrency: "[data-disclosure-country]" };
(theme.AnnouncementBar = (function () {
    function e(e) {
        (this.container = e),
            (this.cache = {}),
            this.cacheSelectors(),
            this.cache.localeDisclosure && (this.localeDisclosure = new theme.Disclosure(this.cache.localeDisclosure)),
            this.cache.currencyDisclosure && (this.currencyDisclosure = new theme.Disclosure(this.cache.currencyDisclosure));
    }
    function t() {
        let e = document.querySelectorAll(".js-announcement-carousel");
        if (!e) return !1;
        e.forEach((e) => {
            let t = e.getAttribute("data-flickity"),
                i = JSON.parse(t);
            new Flickity(e, i);
        });
    }
    return (
        (e.prototype = _.assignIn({}, e.prototype, {
            cacheSelectors: function () {
                this.cache = { localeDisclosure: this.container.querySelector(selectors.disclosureLocale), currencyDisclosure: this.container.querySelector(selectors.disclosureCurrency) };
            },
            onUnload: function () {
                this.cache.localeDisclosure && this.localeDisclosure.destroy(), this.cache.currencyDisclosure && this.currencyDisclosure.destroy();
            },
        })),
        document.addEventListener("shopify:section:load", function (e) {
            let t = e.target.closest(".js-announcement-carousel");
            if (!t) return !1;
            let i = Flickity.data(t);
            i.destroy();
        }),
        document.addEventListener("shopify:section:unload", function (e) {
            let t = e.target.closest(".js-announcement-carousel");
            if (!t) return !1;
            let i = Flickity.data(t);
            i.destroy();
        }),
        document.addEventListener("shopify:section:select", function (e) {
            t();
        }),
        document.addEventListener("shopify:section:deselect", function (e) {
            let t = e.target.closest(".js-announcement-carousel");
            if (!t) return !1;
            let i = Flickity.data(t);
            i.destroy();
        }),
        document.addEventListener("shopify:section:load", t),
        e
    );
})()),
    (theme.Header = (function () {
        function e(e) {
            WAU.Slideout.init("search-sidebar");
            let t = document.querySelectorAll(".js-menuitem-with-nested-dropdown"),
                i = document.querySelectorAll(".js-doubletap-to-go");
            theme.a11yHelpers.setUpAriaExpansion(),
                theme.a11yHelpers.setUpAccessibleNavigationMenus(),
                t.forEach(function (e) {
                    e.addEventListener("mouseenter", function (t) {
                        let i = e.querySelector(".js-dropdown-nested");
                        i && theme.DOMHelpers.isElementPastEdge(i) && i.classList.add("dropdown--edge");
                    });
                }),
                i.forEach(function (e) {
                    let t = !1,
                        i,
                        n = e.getAttribute("data-active-class");
                    Events.on("device:touchstart", function () {
                        t = !0;
                    }),
                        e.addEventListener("click", function (e) {
                            t && e.preventDefault();
                        }),
                        e.addEventListener("touchstart", function (e) {
                            e.target.setAttribute("aria-expanded", "false"),
                                (function e(t) {
                                    document.querySelectorAll(`[data-active-class="${t}"]`).forEach(function (e) {
                                        e.classList.remove(t);
                                    });
                                })(n),
                                i === e.target ? (t = !1) : (e.target.classList.toggle(n), e.target.setAttribute("aria-expanded", "true")),
                                (i = e.target);
                        });
                });
        }
        return (
            customElements.get("theme-header") ||
                document.addEventListener("DOMContentLoaded", () => {
                    customElements.define(
                        "theme-header",
                        class e extends HTMLElement {
                            constructor() {
                                super();
                            }
                            connectedCallback() {
                                (this.elements = {
                                    header: document.querySelector(".js-header"),
                                    topBar: document.querySelector(".js-top-bar"),
                                    navigation: document.querySelector(".js-navigation"),
                                    headerWrapper: document.querySelector(".js-header-wrapper"),
                                    navContainer: document.querySelector(".nav-container"),
                                    fullNav: document.querySelector(".navigation__menu"),
                                    jsHeader: document.querySelector(".js-site-header"),
                                }),
                                    (this.getAmountToScroll = this.getAmountToScroll.bind(this)),
                                    (this.setHeaderHeight = this.setHeaderHeight.bind(this)),
                                    (this.makeNavigationSticky = this.makeNavigationSticky.bind(this)),
                                    (this.getPreviousElements = this.getPreviousElements.bind(this)),
                                    (this.getPreviousSectionsHeights = this.getPreviousSectionsHeights.bind(this)),
                                    (this.headerHeight = this.elements.headerWrapper.offsetHeight + "px"),
                                    (this.navHeight = this.elements.navContainer.offsetHeight),
                                    (this.previousElements = this.getPreviousElements(this.elements.jsHeader)),
                                    (this.amountToScroll = this.getAmountToScroll()),
                                    (this.stickyClass = this.elements.navigation.getAttribute("data-sticky-class")),
                                    this.setHeaderHeight(),
                                    window.matchMedia("(max-width: 980px)").addEventListener("change", this.handleChange.bind(this)),
                                    document.addEventListener("shopify:section:load", this.handleSectionLoad.bind(this)),
                                    document.addEventListener("shopify:section:unload", this.handleSectionUnload.bind(this)),
                                    document.addEventListener("shopify:section:reorder", this.handleSectionReorder.bind(this)),
                                    document.addEventListener("scroll", this.makeNavigationSticky),
                                    document.addEventListener("resize", this.makeNavigationSticky),
                                    this.makeNavigationSticky();
                            }
                            getPreviousSectionsHeights(e) {
                                let t = 0;
                                return (
                                    e &&
                                        e.length > 0 &&
                                        e.forEach((e) => {
                                            t += e.clientHeight;
                                        }),
                                    t
                                );
                            }
                            getAmountToScroll() {
                                let e = 0,
                                    t = window.matchMedia("(max-width: 980px)");
                                return (e += this.getPreviousSectionsHeights(this.previousElements)), this.elements.headerWrapper.classList.contains("nav__option-full") && (t.matches || (e += this.elements.navContainer.clientHeight)), e;
                            }
                            getPreviousElements(e) {
                                for (var t = e.previousElementSibling, i = []; t; ) i.push(t), (t = t.previousElementSibling);
                                return i;
                            }
                            disconnectedCallback() {
                                document.removeEventListener("scroll", this.makeNavigationSticky), document.removeEventListener("resize", this.makeNavigationSticky);
                            }
                            handleSectionReorder(e) {
                                (e.target.classList.contains("js-site-announcement-bar") || e.target.classList.contains("js-site-header")) &&
                                    setTimeout(() => {
                                        (this.previousElements = this.getPreviousElements(this.elements.jsHeader)), (this.amountToScroll = this.getAmountToScroll()), this.makeNavigationSticky();
                                    }, 200);
                            }
                            handleSectionLoad(e) {
                                e.target.classList.contains("js-site-announcement-bar") &&
                                    setTimeout(() => {
                                        (this.previousElements = this.getPreviousElements(this.elements.jsHeader)), (this.amountToScroll = this.getAmountToScroll()), this.makeNavigationSticky();
                                    }, 200);
                            }
                            handleSectionUnload(e) {
                                e.target.classList.contains("js-site-announcement-bar") &&
                                    setTimeout(() => {
                                        (this.previousElements = this.getPreviousElements(this.elements.jsHeader)), (this.amountToScroll = this.getAmountToScroll()), this.makeNavigationSticky();
                                    }, 200);
                            }
                            setHeaderHeight() {
                                document.documentElement.style.setProperty("--header-height", this.headerHeight);
                            }
                            makeNavigationSticky() {
                                window.pageYOffset > this.amountToScroll ? this.elements.navigation.classList.add(this.stickyClass) : this.elements.navigation.classList.remove(this.stickyClass);
                            }
                            handleChange() {
                                setTimeout(() => {
                                    (this.amountToScroll = this.getAmountToScroll()), document.documentElement.style.setProperty("--header-height", this.elements.headerWrapper?.offsetHeight + "px");
                                }, 200);
                            }
                        }
                    );
                }),
            (e.prototype = _.assignIn({}, e.prototype, {
                onSelect: function () {
                    WAU.Slideout.init("mobile-navigation");
                },
            })),
            e
        );
    })()),
    (theme.mobileNav = (function () {
        function e(e) {
            e.getAttribute("data-section-id"), WAU.Slideout.init("mobile-navigation");
        }
        return (
            (e.prototype = _.assignIn({}, e.prototype, {
                onSelect: function () {
                    WAU.Slideout._openByName("mobile-navigation");
                },
                onDeselect: function () {
                    WAU.Slideout._closeByName("mobile-navigation");
                },
                onBlockSelect: function () {
                    WAU.Slideout._openByName("mobile-navigation");
                },
            })),
            e
        );
    })()),
    (theme.Password = (function () {
        function e(e) {
            window.addEventListener("DOMContentLoaded", (e) => {
                let t = document.querySelector(".errors");
                if (!t) return !1;
                WAU.Slideout._openByName("password");
            }),
                WAU.Slideout.init("password"),
                window.addEventListener("shopify:section:select", (e) => {
                    WAU.Slideout.init("password");
                });
        }
        return (e.prototype = _.assignIn({}, e.prototype, {})), e;
    })());
var selectors = { disclosureLocale: "[data-disclosure-locale]", disclosureCurrency: "[data-disclosure-country]" };
(theme.Footer = (function () {
    function e(e) {
        (this.container = e),
            (this.cache = {}),
            this.cacheSelectors(),
            this.cache.localeDisclosure && (this.localeDisclosure = new theme.Disclosure(this.cache.localeDisclosure)),
            this.cache.currencyDisclosure && (this.currencyDisclosure = new theme.Disclosure(this.cache.currencyDisclosure));
        let t = e.querySelectorAll(".disclosure__toggle");
        t.length > 0
            ? t.forEach((e) => {
                  e.addEventListener("click", (e) => {
                      let t = e.target.closest(".disclosure").querySelector(".disclosure-list");
                      if (!t) return console.warn("Error. Could not find disclosure list."), !1;
                      if (t.classList.contains("disclosure-list--visible")) {
                          let i = theme.DOMHelpers.isOutOfBounds(t);
                          i.left && (t.style.transform = `translateX(${Math.round(Math.abs(i.leftAmount)) + 10}px)`);
                      }
                  });
              })
            : console.warn("Error. No buttons found.");
    }
    return (
        (e.prototype = _.assignIn({}, e.prototype, {
            cacheSelectors: function () {
                this.cache = { localeDisclosure: this.container.querySelector(selectors.disclosureLocale), currencyDisclosure: this.container.querySelector(selectors.disclosureCurrency) };
            },
            onUnload: function () {
                this.cache.localeDisclosure && this.localeDisclosure.destroy(), this.cache.currencyDisclosure && this.currencyDisclosure.destroy();
            },
        })),
        e
    );
})()),
    (theme.MailingPopup = (function () {
        let e = (function () {
            let e = {
                    selectors: { popupContainer: ".newsletter__popup-container", popupOverlay: ".newsletter__popup-overlay", popupCloseButton: ".newsletter__popup-container-close" },
                    classes: { visible: "is-visible" },
                    viewportWidth: 1,
                    overlay: !0,
                    defaultFrequency: 5,
                    defaultPopupDelay: 5e3,
                    cookieSetName: "popupShown",
                    debug: !1,
                    escape: !0,
                    successMessage: !1,
                    fadeAnimation: !1,
                    formId: "#mailing-popup-form",
                },
                t,
                i,
                n = {},
                r = () => {
                    if ((settings.debug && console.log("checkURLQueryString() ran"), settings.successMessage)) {
                        let e = new URL(location);
                        if (e.hash == settings.formId && "true" == e.searchParams.get("customer_posted")) return !0;
                    }
                    return !1;
                },
                o = () => window.innerWidth || document.documentElement.clientWidth,
                a = (e) => {
                    e.target === document.querySelector(`${settings.selectors.popupOverlay}.${settings.classes.visible}`) && n.close();
                },
                s = (e) => {
                    "Escape" === e.key && (e.preventDefault(), n.close());
                },
                l = () => "function" == typeof theme.Helpers.fadeIn && "function" == typeof theme.Helpers.fadeOut,
                c = () => settings.fadeAnimation && l(),
                u = (e) => {
                    n.close(e);
                },
                d = () => Shopify.designMode;
            return (
                (n.open = () => {
                    !(o() < settings.viewportWidth) &&
                        (settings.overlay && document.querySelector(settings.selectors.popupOverlay) && document.querySelector(settings.selectors.popupOverlay).classList.add(settings.classes.visible),
                        document.querySelector(settings.selectors.popupContainer) &&
                            (c() ? theme.Helpers.fadeIn(document.querySelector(settings.selectors.popupContainer)) : (document.querySelector(settings.selectors.popupContainer).style.display = "block")),
                        !0 !== d() && Cookies.set(settings.cookieSetName, "yes", { expires: i }),
                        "function" == typeof theme.a11yHelpers.focusOnElement && theme.a11yHelpers.focusOnElement(document.querySelector(settings.selectors.popupContainer)));
                }),
                (n.close = (e) => {
                    document.querySelector(settings.selectors.popupContainer) &&
                        (c() ? theme.Helpers.fadeOut(document.querySelector(settings.selectors.popupContainer)) : (document.querySelector(settings.selectors.popupContainer).style.display = "none")),
                        settings.overlay && document.querySelector(settings.selectors.popupOverlay) && document.querySelector(settings.selectors.popupOverlay).classList.remove(settings.classes.visible),
                        e && e.preventDefault(),
                        t && t.focus();
                }),
                (n.init = (o) => {
                    (settings = Object.assign({}, e, o)),
                        (i = document.querySelector(settings.selectors.popupContainer).getAttribute("data-popup-frequency")
                            ? Number(document.querySelector(settings.selectors.popupContainer).getAttribute("data-popup-frequency"))
                            : settings.defaultFrequency);
                    let l = document.querySelector(settings.selectors.popupContainer).getAttribute("data-popup-delay"),
                        c = 1e3 * Number(l),
                        h = document.querySelector(settings.selectors.popupCloseButton);
                    !h && settings.debug && console.log("err. no popup close button");
                    let p = document.querySelector(settings.selectors.popupContainer).getAttribute("data-popup-enabled");
                    h.addEventListener("click", u),
                        settings.escape && document.addEventListener("keyup", s),
                        settings.overlay && document.addEventListener("click", a),
                        d() ||
                            "true" != p ||
                            (r() && (c = 10),
                            setTimeout(function () {
                                if (r()) (t = document.activeElement), n.open();
                                else {
                                    let e = Cookies.get(settings.cookieSetName);
                                    e || ((t = document.activeElement), n.open());
                                }
                            }, c));
                }),
                n
            );
        })();
        function t(t) {
            e.init({ selectors: { popupContainer: ".js-popup", popupOverlay: ".js-popup-overlay", popupCloseButton: ".js-mailing-popup-close" }, overlay: !1, successMessage: !0, fadeAnimation: !0 });
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                onSelect: function () {
                    e.open();
                },
                onDeselect: function () {
                    e.close();
                },
            })),
            t
        );
    })()),
    (theme.Article = function e(t) {
        !(function () {
            "use strict";
            let e = document.querySelector("#back-forth");
            if (!e) return;
            let t = e.getAttribute("data-blog-url");
            if (!t) return;
            let i = e.getAttribute("data-shop-url");
            if (!i) return;
            let n = e.getAttribute("data-article-url");
            if (!n) return;
            let r = i + n,
                o = e.getAttribute("data-older-post-text"),
                a = e.getAttribute("data-newer-post-text"),
                s = function (e, t, i) {
                    let n = document.createElement("span");
                    n.classList.add(i);
                    let r = document.createElement("a");
                    return (r.href = e), (r.innerHTML = t), n.appendChild(r), n;
                };
            fetch(`${t}.atom`)
                .then((e) => e.text())
                .then((e) => new window.DOMParser().parseFromString(e, "text/xml"))
                .then((t) => {
                    let i = [...t.getElementsByTagName("entry")];
                    if (i.length > 0) {
                        let n = [];
                        if (
                            (i.forEach((e) => {
                                let t = e.getElementsByTagName("id")[0].textContent;
                                n.push(t);
                            }),
                            n.length <= 0)
                        )
                            return;
                        let l = n.indexOf(r),
                            c = n[l + 1],
                            u = n[l - 1];
                        if (((e.innerHTML = ""), void 0 !== c)) {
                            let d = s(c, `&larr; ${o}`, "prev-prod");
                            e.appendChild(d);
                        }
                        if (void 0 !== u) {
                            let h = s(u, `${a} &rarr;`, "next-prod");
                            e.appendChild(h);
                        }
                    } else console.warn("No items from fetch.");
                })
                .catch((e) => {
                    console.warn(e);
                });
        })();
    }),
    (theme.BeforeAfter = function e(t) {
        let i = t.querySelector(".before--after"),
            n = t.querySelector(".before-image"),
            r = n.querySelector("img") || n.querySelector(".before--image_placeholder"),
            o = t.querySelector(".before--after_slider"),
            a = !1,
            s = i.offsetWidth;
        !(function e() {
            r.style.width = s + "px";
            let t;
            function l(e) {
                let t = Math.max(0, Math.min(e, s));
                (n.style.width = t + "px"), (o.style.left = t + "px");
            }
            function c(e) {
                e.stopPropagation(), e.preventDefault();
            }
            window.addEventListener("resize", function () {
                cancelAnimationFrame(t),
                    (t = requestAnimationFrame(function () {
                        (s = i.offsetWidth), (r.style.width = s + "px");
                    }));
            }),
                o.addEventListener("mousedown", function () {
                    (a = !0), o.classList.add("resize");
                }),
                document.body.addEventListener("mouseup", function () {
                    (a = !1), o.classList.remove("resize");
                }),
                document.body.addEventListener("mouseleave", function () {
                    (a = !1), o.classList.remove("resize");
                }),
                document.body.addEventListener("mousemove", function (e) {
                    if (!a) return;
                    let t = e.pageX - i.getBoundingClientRect().left;
                    l(t), c(e);
                }),
                o.addEventListener(
                    "touchstart",
                    function (e) {
                        (a = !0), o.classList.add("resize"), e.preventDefault();
                    },
                    { passive: !0 }
                ),
                document.body.addEventListener("touchend", function () {
                    (a = !1), o.classList.remove("resize");
                }),
                document.body.addEventListener("touchcancel", function () {
                    (a = !1), o.classList.remove("resize");
                }),
                document.body.addEventListener(
                    "touchmove",
                    function (e) {
                        if (!a) return;
                        let t = e.changedTouches[e.changedTouches.length - 1].pageX - i.getBoundingClientRect().left;
                        l(t), c(e);
                    },
                    { passive: !0 }
                );
        })();
    }),
    (theme.BeforeAfter.prototype = _.assignIn({}, theme.BeforeAfter.prototype, {})),
    (theme.Countdown = (function () {
        function e(e) {
            setTimeout(function () {
                e.querySelectorAll(".countdown__time--wrapper").forEach((e, t) => {
                    e.style.opacity = 1;
                });
            }, 100);
            var t = e.getAttribute("data-launch-date"),
                t = parseInt(t);
            if (!t) return !1;
            var i = setInterval(function () {
                var n = new Date(),
                    r = new Date(1e3 * t).getTime() - n.getTime(),
                    o = Math.floor(r / 1e3 / 60 / 60 / 24),
                    a = Math.floor((r / 1e3 / 60 / 60) % 24),
                    s = Math.floor((r / 1e3 / 60) % 60),
                    l = Math.floor((r / 1e3) % 60);
                o < 10 && (o = "0" + o),
                    a < 10 && (a = "0" + a),
                    s < 10 && (s = "0" + s),
                    l < 10 && (l = "0" + l),
                    o >= 0 && (e.querySelector("[data-launch-days]").innerHTML = o),
                    a >= 0 && (e.querySelector("[data-launch-hours]").innerHTML = a),
                    s >= 0 && (e.querySelector("[data-launch-mins]").innerHTML = s),
                    l > 0 && (e.querySelector("[data-launch-secs]").innerHTML = l),
                    r < 0 &&
                        (clearInterval(i),
                        (function e(t) {
                            let i = t.dataset.sectionId,
                                n = `${t.dataset.baseUrl}?section_id=${i}`;
                            fetch(n)
                                .then(function (e) {
                                    return e.text();
                                })
                                .then(function (e) {
                                    if ("" !== e.trim()) {
                                        var i = new DOMParser().parseFromString(e, "text/html").querySelector("#countdownWrapper");
                                        if (i) {
                                            var n = t.querySelector("#countdownWrapper");
                                            n && (n.innerHTML = i.innerHTML);
                                        }
                                    }
                                });
                        })(e));
            }, 1e3);
        }
        return (
            document.querySelectorAll('[data-section-type="countdown"]').forEach(function (t, i) {
                e(t);
            }),
            document.addEventListener("shopify:section:select", function (t) {
                if (!t.target.querySelector('[data-section-type="countdown"]')) return !1;
                e(t.target.querySelector('[data-section-type="countdown"]'));
            }),
            e
        );
    })()),
    (theme.CustomerLogin = function e(t) {
        window.addEventListener("DOMContentLoaded", (e) => {
            "#recover" == window.location.hash && WAU.Modal && WAU.Modal._openByName("recover-password"),
                document.querySelector('[data-wau-modal-content="password-success"]') &&
                    setTimeout(() => {
                        WAU.Modal._openByName("password-success");
                    }, 1e3);
        });
    }),
    document.addEventListener("DOMContentLoaded", (e) => {
        var t,
            i = window.matchMedia("(max-width: 740px)"),
            n = window.matchMedia("(max-width: 979px) and (min-width: 741px)"),
            r = window.matchMedia("(max-width: 980px)"),
            o = window.matchMedia("(min-width: 980px)");
        i.matches && Events.trigger("mediaquery:mobile"),
            n.matches && Events.trigger("mediaquery:tablet"),
            r.matches && Events.trigger("mediaquery:device"),
            o.matches && Events.trigger("mediaquery:desktop"),
            window.addEventListener("resize", function () {
                i.matches && Events.trigger("mediaquery:mobile"), n.matches && Events.trigger("mediaquery:tablet"), r.matches && Events.trigger("mediaquery:device"), o.matches && Events.trigger("mediaquery:desktop");
            }),
            (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
                window.addEventListener("touchstart", function e() {
                    Events.trigger("device:touchstart"), window.removeEventListener("touchstart", e, !1);
                }),
            document.addEventListener("shopify:section:select", function (e) {
                console.log("Editor Events: Section Select"), Events.trigger("editor:section:select", e);
            }),
            document.addEventListener("shopify:section:deselect", function (e) {
                console.log("Editor Events: Section Deselect"), Events.trigger("editor:section:deselect", e);
            }),
            document.addEventListener("shopify:section:load", function (e) {
                console.log("Editor Events: Section Load"), Events.trigger("editor:section:load", e);
            }),
            document.addEventListener("shopify:section:unload", function (e) {
                console.log("Editor Events: Section Unload"), Events.trigger("editor:section:unload", e);
            }),
            document.addEventListener("shopify:block:select", function (e) {
                console.log("Editor Events: Block Select"), Events.trigger("editor:block:select", e);
            }),
            document.addEventListener("shopify:block:deselect", function (e) {
                console.log("Editor Events: Block Deselect"), Events.trigger("editor:block:deselect", e);
            }),
            document.querySelectorAll(".js-bg-video-wrapper") && WAU.ProductGridVideo.init();
    }),
    document.addEventListener("DOMContentLoaded", (e) => {
        var t = new theme.Sections();
        t.register("featured-collection", theme.FeaturedProducts),
            t.register("slideshow-section", theme.Slideshow),
            t.register("product__section", theme.Product),
            t.register("product-recommendations", theme.ProductRecommendations),
            t.register("recently-viewed", theme.RecentlyViewed),
            t.register("store-availability", theme.StoreAvailability),
            t.register("announcement-bar-section", theme.AnnouncementBar),
            t.register("header-section", theme.Header),
            t.register("collection-section", theme.Collection),
            t.register("testimonials-section", theme.Testimonials),
            t.register("shop-the-look", theme.ShopTheLook),
            t.register("search-section", theme.Search),
            t.register("mobile-navigation", theme.mobileNav),
            t.register("map", theme.Maps),
            t.register("video-section", theme.VideoSection),
            t.register("password-page", theme.Password),
            t.register("footer-section", theme.Footer),
            t.register("mailing-popup", theme.MailingPopup),
            t.register("article-section", theme.Article),
            t.register("customer-login", theme.CustomerLogin),
            t.register("before-after", theme.BeforeAfter),
            t.register("countdown", theme.Countdown);
    }),
    (log = function () {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(console), Function.prototype.bind.apply(console.log, e);
    })("Testament Version 12.2.0 by Underground", { bar: 1 })(),
    customElements.get("wau-size-swatch") ||
        customElements.define(
            "wau-size-swatch",
            class e extends HTMLElement {
                constructor() {
                    super(),
                        (this.formId = this.getAttribute("data-product-form-id")),
                        (this.form = document.querySelector(`#product_form_${this.formId}`)),
                        (this.button = this.form.querySelector(".js-ajax-submit")),
                        (this.variantIdField = this.form.querySelector('[name="id"]')),
                        (this.sizeButtons = this.querySelectorAll(".add")),
                        this.sizeButtons.length > 0 &&
                            this.sizeButtons.forEach((e) => {
                                e.addEventListener("click", (e) => {
                                    e.preventDefault(), (this.variantIdField.value = e.target.getAttribute("data-variant-id")), this.button.click();
                                });
                            });
                }
            }
        );
