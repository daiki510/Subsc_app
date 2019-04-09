(function () {
  var t = this;
  (function () {
    (function () {
      this.Rails = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: {
          selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
          exclude: "form button"
        },
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
      }
    }).call(this)
  }).call(t);
  var y = t.Rails;
  (function () {
    (function () {
      y.cspNonce = function () {
        var t;
        return (t = document.querySelector("meta[name=csp-nonce]")) && t.content
      }
    }).call(this),
      function () {
        var i, n;
        n = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector, y.matches = function (t, e) {
          return null != e.exclude ? n.call(t, e.selector) && !n.call(t, e.exclude) : n.call(t, e)
        }, i = "_ujsData", y.getData = function (t, e) {
          var n;
          return null != (n = t[i]) ? n[e] : void 0
        }, y.setData = function (t, e, n) {
          return null == t[i] && (t[i] = {}), t[i][e] = n
        }, y.$ = function (t) {
          return Array.prototype.slice.call(document.querySelectorAll(t))
        }
      }.call(this),
      function () {
        var n, i, r;
        n = y.$, r = y.csrfToken = function () {
          var t;
          return (t = document.querySelector("meta[name=csrf-token]")) && t.content
        }, i = y.csrfParam = function () {
          var t;
          return (t = document.querySelector("meta[name=csrf-param]")) && t.content
        }, y.CSRFProtection = function (t) {
          var e;
          if (null != (e = r())) return t.setRequestHeader("X-CSRF-Token", e)
        }, y.refreshCSRFTokens = function () {
          var t, e;
          if (e = r(), t = i(), null != e && null != t) return n('form input[name="' + t + '"]').forEach(function (t) {
            return t.value = e
          })
        }
      }.call(this),
      function () {
        var r, e, o, n;
        o = y.matches, "function" != typeof (r = window.CustomEvent) && ((r = function (t, e) {
          var n;
          return (n = document.createEvent("CustomEvent")).initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
        }).prototype = window.Event.prototype, n = r.prototype.preventDefault, r.prototype.preventDefault = function () {
          var t;
          return t = n.call(this), this.cancelable && !this.defaultPrevented && Object.defineProperty(this, "defaultPrevented", {
            get: function () {
              return !0
            }
          }), t
        }), e = y.fire = function (t, e, n) {
          var i;
          return i = new r(e, {
            bubbles: !0,
            cancelable: !0,
            detail: n
          }), t.dispatchEvent(i), !i.defaultPrevented
        }, y.stopEverything = function (t) {
          return e(t.target, "ujs:everythingStopped"), t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation()
        }, y.delegate = function (t, n, e, i) {
          return t.addEventListener(e, function (t) {
            var e;
            for (e = t.target; e instanceof Element && !o(e, n);) e = e.parentNode;
            if (e instanceof Element && !1 === i.call(e, t)) return t.preventDefault(), t.stopPropagation()
          })
        }
      }.call(this),
      function () {
        var e, i, t, o, r, s;
        o = y.cspNonce, i = y.CSRFProtection, y.fire, e = {
          "*": "*/*",
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        }, y.ajax = function (n) {
          var i;
          return n = r(n), i = t(n, function () {
            var t, e;
            return e = s(null != (t = i.response) ? t : i.responseText, i.getResponseHeader("Content-Type")), 2 === Math.floor(i.status / 100) ? "function" == typeof n.success && n.success(e, i.statusText, i) : "function" == typeof n.error && n.error(e, i.statusText, i), "function" == typeof n.complete ? n.complete(i, i.statusText) : void 0
          }), !(null != n.beforeSend && !n.beforeSend(i, n)) && (i.readyState === XMLHttpRequest.OPENED ? i.send(n.data) : void 0)
        }, r = function (t) {
          return t.url = t.url || location.href, t.type = t.type.toUpperCase(), "GET" === t.type && t.data && (t.url.indexOf("?") < 0 ? t.url += "?" + t.data : t.url += "&" + t.data), null == e[t.dataType] && (t.dataType = "*"), t.accept = e[t.dataType], "*" !== t.dataType && (t.accept += ", */*; q=0.01"), t
        }, t = function (t, e) {
          var n;
          return (n = new XMLHttpRequest).open(t.type, t.url, !0), n.setRequestHeader("Accept", t.accept), "string" == typeof t.data && n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.crossDomain || n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i(n), n.withCredentials = !!t.withCredentials, n.onreadystatechange = function () {
            if (n.readyState === XMLHttpRequest.DONE) return e(n)
          }, n
        }, s = function (t, e) {
          var n, i;
          if ("string" == typeof t && "string" == typeof e)
            if (e.match(/\bjson\b/)) try {
                t = JSON.parse(t)
              } catch (r) {} else if (e.match(/\b(?:java|ecma)script\b/))(i = document.createElement("script")).setAttribute("nonce", o()), i.text = t, document.head.appendChild(i).parentNode.removeChild(i);
              else if (e.match(/\b(xml|html|svg)\b/)) {
            n = new DOMParser, e = e.replace(/;.+/, "");
            try {
              t = n.parseFromString(t, e)
            } catch (r) {}
          }
          return t
        }, y.href = function (t) {
          return t.href
        }, y.isCrossDomain = function (t) {
          var e, n;
          (e = document.createElement("a")).href = location.href, n = document.createElement("a");
          try {
            return n.href = t, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
          } catch (i) {
            return i, !0
          }
        }
      }.call(this),
      function () {
        var r, o;
        r = y.matches, o = function (t) {
          return Array.prototype.slice.call(t)
        }, y.serializeElement = function (t, e) {
          var n, i;
          return n = [t], r(t, "form") && (n = o(t.elements)), i = [], n.forEach(function (e) {
            if (e.name && !e.disabled) return r(e, "select") ? o(e.options).forEach(function (t) {
              if (t.selected) return i.push({
                name: e.name,
                value: t.value
              })
            }) : e.checked || -1 === ["radio", "checkbox", "submit"].indexOf(e.type) ? i.push({
              name: e.name,
              value: e.value
            }) : void 0
          }), e && i.push(e), i.map(function (t) {
            return null != t.name ? encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value) : t
          }).join("&")
        }, y.formElements = function (t, e) {
          return r(t, "form") ? o(t.elements).filter(function (t) {
            return r(t, e)
          }) : o(t.querySelectorAll(e))
        }
      }.call(this),
      function () {
        var e, o, n;
        o = y.fire, n = y.stopEverything, y.handleConfirm = function (t) {
          if (!e(this)) return n(t)
        }, e = function (t) {
          var e, n, i;
          if (!(i = t.getAttribute("data-confirm"))) return !0;
          if (e = !1, o(t, "confirm")) {
            try {
              e = confirm(i)
            } catch (r) {}
            n = o(t, "confirm:complete", [e])
          }
          return e && n
        }
      }.call(this),
      function () {
        var n, i, r, o, s, a, e, l, c, u, h;
        c = y.matches, l = y.getData, u = y.setData, h = y.stopEverything, e = y.formElements, y.handleDisabledElement = function (t) {
          if (this.disabled) return h(t)
        }, y.enableElement = function (t) {
          var e;
          return e = t instanceof Event ? t.target : t, c(e, y.linkDisableSelector) ? a(e) : c(e, y.buttonDisableSelector) || c(e, y.formEnableSelector) ? o(e) : c(e, y.formSubmitSelector) ? s(e) : void 0
        }, y.disableElement = function (t) {
          var e;
          return e = t instanceof Event ? t.target : t, c(e, y.linkDisableSelector) ? r(e) : c(e, y.buttonDisableSelector) || c(e, y.formDisableSelector) ? n(e) : c(e, y.formSubmitSelector) ? i(e) : void 0
        }, r = function (t) {
          var e;
          return null != (e = t.getAttribute("data-disable-with")) && (u(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e), t.addEventListener("click", h), u(t, "ujs:disabled", !0)
        }, a = function (t) {
          var e;
          return null != (e = l(t, "ujs:enable-with")) && (t.innerHTML = e, u(t, "ujs:enable-with", null)), t.removeEventListener("click", h), u(t, "ujs:disabled", null)
        }, i = function (t) {
          return e(t, y.formDisableSelector).forEach(n)
        }, n = function (t) {
          var e;
          return null != (e = t.getAttribute("data-disable-with")) && (c(t, "button") ? (u(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e) : (u(t, "ujs:enable-with", t.value), t.value = e)), t.disabled = !0, u(t, "ujs:disabled", !0)
        }, s = function (t) {
          return e(t, y.formEnableSelector).forEach(o)
        }, o = function (t) {
          var e;
          return null != (e = l(t, "ujs:enable-with")) && (c(t, "button") ? t.innerHTML = e : t.value = e, u(t, "ujs:enable-with", null)), t.disabled = !1, u(t, "ujs:disabled", null)
        }
      }.call(this),
      function () {
        var l;
        l = y.stopEverything, y.handleMethod = function (t) {
          var e, n, i, r, o, s, a;
          if (a = (s = this).getAttribute("data-method")) return o = y.href(s), n = y.csrfToken(), e = y.csrfParam(), i = document.createElement("form"), r = "<input name='_method' value='" + a + "' type='hidden' />", null == e || null == n || y.isCrossDomain(o) || (r += "<input name='" + e + "' value='" + n + "' type='hidden' />"), r += '<input type="submit" />', i.method = "post", i.action = o, i.target = s.target, i.innerHTML = r, i.style.display = "none", document.body.appendChild(i), i.querySelector('[type="submit"]').click(), l(t)
        }
      }.call(this),
      function () {
        var l, c, u, h, d, f, p, m, g, v = [].slice;
        f = y.matches, u = y.getData, m = y.setData, c = y.fire, g = y.stopEverything, l = y.ajax, h = y.isCrossDomain, p = y.serializeElement, d = function (t) {
          var e;
          return null != (e = t.getAttribute("data-remote")) && "false" !== e
        }, y.handleRemote = function (t) {
          var e, n, i, r, o, s, a;
          return !d(r = this) || (c(r, "ajax:before") ? (a = r.getAttribute("data-with-credentials"), i = r.getAttribute("data-type") || "script", f(r, y.formSubmitSelector) ? (e = u(r, "ujs:submit-button"), o = u(r, "ujs:submit-button-formmethod") || r.method, s = u(r, "ujs:submit-button-formaction") || r.getAttribute("action") || location.href, "GET" === o.toUpperCase() && (s = s.replace(/\?.*$/, "")), "multipart/form-data" === r.enctype ? (n = new FormData(r), null != e && n.append(e.name, e.value)) : n = p(r, e), m(r, "ujs:submit-button", null), m(r, "ujs:submit-button-formmethod", null), m(r, "ujs:submit-button-formaction", null)) : f(r, y.buttonClickSelector) || f(r, y.inputChangeSelector) ? (o = r.getAttribute("data-method"), s = r.getAttribute("data-url"), n = p(r, r.getAttribute("data-params"))) : (o = r.getAttribute("data-method"), s = y.href(r), n = r.getAttribute("data-params")), l({
            type: o || "GET",
            url: s,
            data: n,
            dataType: i,
            beforeSend: function (t, e) {
              return c(r, "ajax:beforeSend", [t, e]) ? c(r, "ajax:send", [t]) : (c(r, "ajax:stopped"), !1)
            },
            success: function () {
              var t;
              return t = 1 <= arguments.length ? v.call(arguments, 0) : [], c(r, "ajax:success", t)
            },
            error: function () {
              var t;
              return t = 1 <= arguments.length ? v.call(arguments, 0) : [], c(r, "ajax:error", t)
            },
            complete: function () {
              var t;
              return t = 1 <= arguments.length ? v.call(arguments, 0) : [], c(r, "ajax:complete", t)
            },
            crossDomain: h(s),
            withCredentials: null != a && "false" !== a
          }), g(t)) : (c(r, "ajax:stopped"), !1))
        }, y.formSubmitButtonClick = function () {
          var t, e;
          if (e = (t = this).form) return t.name && m(e, "ujs:submit-button", {
            name: t.name,
            value: t.value
          }), m(e, "ujs:formnovalidate-button", t.formNoValidate), m(e, "ujs:submit-button-formaction", t.getAttribute("formaction")), m(e, "ujs:submit-button-formmethod", t.getAttribute("formmethod"))
        }, y.handleMetaClick = function (t) {
          var e, n, i;
          if (i = ((n = this).getAttribute("data-method") || "GET").toUpperCase(), e = n.getAttribute("data-params"), (t.metaKey || t.ctrlKey) && "GET" === i && !e) return t.stopImmediatePropagation()
        }
      }.call(this),
      function () {
        var t, i, e, n, r, o, s, a, l, c, u, h, d, f;
        if (o = y.fire, e = y.delegate, a = y.getData, t = y.$, f = y.refreshCSRFTokens, i = y.CSRFProtection, r = y.enableElement, n = y.disableElement, c = y.handleDisabledElement, l = y.handleConfirm, d = y.handleRemote, s = y.formSubmitButtonClick, u = y.handleMetaClick, h = y.handleMethod, "undefined" != typeof jQuery && null !== jQuery && null != jQuery.ajax) {
          if (jQuery.rails) throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
          jQuery.rails = y, jQuery.ajaxPrefilter(function (t, e, n) {
            if (!t.crossDomain) return i(n)
          })
        }
        y.start = function () {
          if (window._rails_loaded) throw new Error("rails-ujs has already been loaded!");
          return window.addEventListener("pageshow", function () {
            return t(y.formEnableSelector).forEach(function (t) {
              if (a(t, "ujs:disabled")) return r(t)
            }), t(y.linkDisableSelector).forEach(function (t) {
              if (a(t, "ujs:disabled")) return r(t)
            })
          }), e(document, y.linkDisableSelector, "ajax:complete", r), e(document, y.linkDisableSelector, "ajax:stopped", r), e(document, y.buttonDisableSelector, "ajax:complete", r), e(document, y.buttonDisableSelector, "ajax:stopped", r), e(document, y.linkClickSelector, "click", c), e(document, y.linkClickSelector, "click", l), e(document, y.linkClickSelector, "click", u), e(document, y.linkClickSelector, "click", n), e(document, y.linkClickSelector, "click", d), e(document, y.linkClickSelector, "click", h), e(document, y.buttonClickSelector, "click", c), e(document, y.buttonClickSelector, "click", l), e(document, y.buttonClickSelector, "click", n), e(document, y.buttonClickSelector, "click", d), e(document, y.inputChangeSelector, "change", c), e(document, y.inputChangeSelector, "change", l), e(document, y.inputChangeSelector, "change", d), e(document, y.formSubmitSelector, "submit", c), e(document, y.formSubmitSelector, "submit", l), e(document, y.formSubmitSelector, "submit", d), e(document, y.formSubmitSelector, "submit", function (t) {
            return setTimeout(function () {
              return n(t)
            }, 13)
          }), e(document, y.formSubmitSelector, "ajax:send", n), e(document, y.formSubmitSelector, "ajax:complete", r), e(document, y.formInputClickSelector, "click", c), e(document, y.formInputClickSelector, "click", l), e(document, y.formInputClickSelector, "click", s), document.addEventListener("DOMContentLoaded", f), window._rails_loaded = !0
        }, window.Rails === y && o(document, "rails:attachBindings") && y.start()
      }.call(this)
  }).call(this), "object" == typeof module && module.exports ? module.exports = y : "function" == typeof define && define.amd && define(y)
}).call(this),
  function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
  }(this, function (t, N, k) {
    "use strict";

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
      }
    }

    function R(t, e, n) {
      return e && i(t.prototype, e), n && i(t, n), t
    }

    function r(t, e, n) {
      return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t
    }

    function P(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {},
          i = Object.keys(n);
        "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (t) {
          return Object.getOwnPropertyDescriptor(n, t).enumerable
        }))), i.forEach(function (t) {
          r(e, t, n[t])
        })
      }
      return e
    }

    function h(t, e) {
      t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
    }

    function a(t) {
      return {}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()
    }

    function e() {
      return {
        bindType: s,
        delegateType: s,
        handle: function e(t) {
          return N(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : undefined
        }
      }
    }

    function n(t) {
      var e = this,
        n = !1;
      return N(this).one(x.TRANSITION_END, function () {
        n = !0
      }), setTimeout(function () {
        n || x.triggerTransitionEnd(e)
      }, t), this
    }

    function o() {
      N.fn.emulateTransitionEnd = n, N.event.special[x.TRANSITION_END] = e()
    }

    function c(t, e) {
      var n = t.nodeName.toLowerCase();
      if (-1 !== e.indexOf(n)) return -1 === Xt.indexOf(n) || Boolean(t.nodeValue.match(Yt) || t.nodeValue.match(Jt));
      for (var i = e.filter(function (t) {
          return t instanceof RegExp
        }), r = 0, o = i.length; r < o; r++)
        if (n.match(i[r])) return !0;
      return !1
    }

    function H(t, o, e) {
      if (0 === t.length) return t;
      if (e && "function" == typeof e) return e(t);
      for (var n = (new window.DOMParser).parseFromString(t, "text/html"), s = Object.keys(o), a = [].slice.call(n.body.querySelectorAll("*")), l = function l(t) {
          var e = a[t],
            n = e.nodeName.toLowerCase();
          if (-1 === s.indexOf(e.nodeName.toLowerCase())) return e.parentNode.removeChild(e), "continue";
          var i = [].slice.call(e.attributes),
            r = [].concat(o["*"] || [], o[n] || []);
          i.forEach(function (t) {
            c(t, r) || e.removeAttribute(t.nodeName)
          })
        }, i = 0, r = a.length; i < r; i++) l(i, r);
      return n.body.innerHTML
    }
    N = N && N.hasOwnProperty("default") ? N["default"] : N, k = k && k.hasOwnProperty("default") ? k["default"] : k;
    var s = "transitionend",
      l = 1e6,
      u = 1e3,
      x = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function cn(t) {
          for (; t += ~~(Math.random() * l), document.getElementById(t););
          return t
        },
        getSelectorFromElement: function un(t) {
          var e = t.getAttribute("data-target");
          if (!e || "#" === e) {
            var n = t.getAttribute("href");
            e = n && "#" !== n ? n.trim() : ""
          }
          try {
            return document.querySelector(e) ? e : null
          } catch (i) {
            return null
          }
        },
        getTransitionDurationFromElement: function hn(t) {
          if (!t) return 0;
          var e = N(t).css("transition-duration"),
            n = N(t).css("transition-delay"),
            i = parseFloat(e),
            r = parseFloat(n);
          return i || r ? (e = e.split(",")[0], n = n.split(",")[0], (parseFloat(e) + parseFloat(n)) * u) : 0
        },
        reflow: function dn(t) {
          return t.offsetHeight
        },
        triggerTransitionEnd: function fn(t) {
          N(t).trigger(s)
        },
        supportsTransitionEnd: function pn() {
          return Boolean(s)
        },
        isElement: function mn(t) {
          return (t[0] || t).nodeType
        },
        typeCheckConfig: function gn(t, e, n) {
          for (var i in n)
            if (Object.prototype.hasOwnProperty.call(n, i)) {
              var r = n[i],
                o = e[i],
                s = o && x.isElement(o) ? "element" : a(o);
              if (!new RegExp(r).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + r + '".')
            }
        },
        findShadowRoot: function vn(t) {
          if (!document.documentElement.attachShadow) return null;
          if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? x.findShadowRoot(t.parentNode) : null;
          var e = t.getRootNode();
          return e instanceof ShadowRoot ? e : null
        }
      };
    o();
    var d = "alert",
      f = "4.3.1",
      p = "bs.alert",
      m = "." + p,
      g = ".data-api",
      v = N.fn[d],
      y = {
        DISMISS: '[data-dismiss="alert"]'
      },
      _ = {
        CLOSE: "close" + m,
        CLOSED: "closed" + m,
        CLICK_DATA_API: "click" + m + g
      },
      E = {
        ALERT: "alert",
        FADE: "fade",
        SHOW: "show"
      },
      b = function () {
        function i(t) {
          this._element = t
        }
        var t = i.prototype;
        return t.close = function n(t) {
          var e = this._element;
          t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
        }, t.dispose = function e() {
          N.removeData(this._element, p), this._element = null
        }, t._getRootElement = function r(t) {
          var e = x.getSelectorFromElement(t),
            n = !1;
          return e && (n = document.querySelector(e)), n || (n = N(t).closest("." + E.ALERT)[0]), n
        }, t._triggerCloseEvent = function o(t) {
          var e = N.Event(_.CLOSE);
          return N(t).trigger(e), e
        }, t._removeElement = function s(e) {
          var n = this;
          if (N(e).removeClass(E.SHOW), N(e).hasClass(E.FADE)) {
            var t = x.getTransitionDurationFromElement(e);
            N(e).one(x.TRANSITION_END, function (t) {
              return n._destroyElement(e, t)
            }).emulateTransitionEnd(t)
          } else this._destroyElement(e)
        }, t._destroyElement = function a(t) {
          N(t).detach().trigger(_.CLOSED).remove()
        }, i._jQueryInterface = function l(n) {
          return this.each(function () {
            var t = N(this),
              e = t.data(p);
            e || (e = new i(this), t.data(p, e)), "close" === n && e[n](this)
          })
        }, i._handleDismiss = function c(e) {
          return function (t) {
            t && t.preventDefault(), e.close(this)
          }
        }, R(i, null, [{
          key: "VERSION",
          get: function u() {
            return f
          }
        }]), i
      }();
    N(document).on(_.CLICK_DATA_API, y.DISMISS, b._handleDismiss(new b)), N.fn[d] = b._jQueryInterface, N.fn[d].Constructor = b, N.fn[d].noConflict = function () {
      return N.fn[d] = v, b._jQueryInterface
    };
    var S = "button",
      T = "4.3.1",
      A = "bs.button",
      C = "." + A,
      I = ".data-api",
      w = N.fn[S],
      D = {
        ACTIVE: "active",
        BUTTON: "btn",
        FOCUS: "focus"
      },
      O = {
        DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
        DATA_TOGGLE: '[data-toggle="buttons"]',
        INPUT: 'input:not([type="hidden"])',
        ACTIVE: ".active",
        BUTTON: ".btn"
      },
      L = {
        CLICK_DATA_API: "click" + C + I,
        FOCUS_BLUR_DATA_API: "focus" + C + I + " blur" + C + I
      },
      M = function () {
        function n(t) {
          this._element = t
        }
        var t = n.prototype;
        return t.toggle = function o() {
          var t = !0,
            e = !0,
            n = N(this._element).closest(O.DATA_TOGGLE)[0];
          if (n) {
            var i = this._element.querySelector(O.INPUT);
            if (i) {
              if ("radio" === i.type)
                if (i.checked && this._element.classList.contains(D.ACTIVE)) t = !1;
                else {
                  var r = n.querySelector(O.ACTIVE);
                  r && N(r).removeClass(D.ACTIVE)
                } if (t) {
                if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                i.checked = !this._element.classList.contains(D.ACTIVE), N(i).trigger("change")
              }
              i.focus(), e = !1
            }
          }
          e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(D.ACTIVE)), t && N(this._element).toggleClass(D.ACTIVE)
        }, t.dispose = function e() {
          N.removeData(this._element, A), this._element = null
        }, n._jQueryInterface = function i(e) {
          return this.each(function () {
            var t = N(this).data(A);
            t || (t = new n(this), N(this).data(A, t)), "toggle" === e && t[e]()
          })
        }, R(n, null, [{
          key: "VERSION",
          get: function r() {
            return T
          }
        }]), n
      }();
    N(document).on(L.CLICK_DATA_API, O.DATA_TOGGLE_CARROT, function (t) {
      t.preventDefault();
      var e = t.target;
      N(e).hasClass(D.BUTTON) || (e = N(e).closest(O.BUTTON)), M._jQueryInterface.call(N(e), "toggle")
    }).on(L.FOCUS_BLUR_DATA_API, O.DATA_TOGGLE_CARROT, function (t) {
      var e = N(t.target).closest(O.BUTTON)[0];
      N(e).toggleClass(D.FOCUS, /^focus(in)?$/.test(t.type))
    }), N.fn[S] = M._jQueryInterface, N.fn[S].Constructor = M, N.fn[S].noConflict = function () {
      return N.fn[S] = w, M._jQueryInterface
    };
    var q = "carousel",
      W = "4.3.1",
      j = "bs.carousel",
      F = "." + j,
      B = ".data-api",
      U = N.fn[q],
      V = 37,
      G = 39,
      K = 500,
      Q = 40,
      X = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
        touch: !0
      },
      z = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean"
      },
      Y = {
        NEXT: "next",
        PREV: "prev",
        LEFT: "left",
        RIGHT: "right"
      },
      J = {
        SLIDE: "slide" + F,
        SLID: "slid" + F,
        KEYDOWN: "keydown" + F,
        MOUSEENTER: "mouseenter" + F,
        MOUSELEAVE: "mouseleave" + F,
        TOUCHSTART: "touchstart" + F,
        TOUCHMOVE: "touchmove" + F,
        TOUCHEND: "touchend" + F,
        POINTERDOWN: "pointerdown" + F,
        POINTERUP: "pointerup" + F,
        DRAG_START: "dragstart" + F,
        LOAD_DATA_API: "load" + F + B,
        CLICK_DATA_API: "click" + F + B
      },
      $ = {
        CAROUSEL: "carousel",
        ACTIVE: "active",
        SLIDE: "slide",
        RIGHT: "carousel-item-right",
        LEFT: "carousel-item-left",
        NEXT: "carousel-item-next",
        PREV: "carousel-item-prev",
        ITEM: "carousel-item",
        POINTER_EVENT: "pointer-event"
      },
      Z = {
        ACTIVE: ".active",
        ACTIVE_ITEM: ".active.carousel-item",
        ITEM: ".carousel-item",
        ITEM_IMG: ".carousel-item img",
        NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
        INDICATORS: ".carousel-indicators",
        DATA_SLIDE: "[data-slide], [data-slide-to]",
        DATA_RIDE: '[data-ride="carousel"]'
      },
      tt = {
        TOUCH: "touch",
        PEN: "pen"
      },
      et = function () {
        function o(t, e) {
          this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(Z.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
        }
        var t = o.prototype;
        return t.next = function e() {
          this._isSliding || this._slide(Y.NEXT)
        }, t.nextWhenVisible = function n() {
          !document.hidden && N(this._element).is(":visible") && "hidden" !== N(this._element).css("visibility") && this.next()
        }, t.prev = function i() {
          this._isSliding || this._slide(Y.PREV)
        }, t.pause = function r(t) {
          t || (this._isPaused = !0), this._element.querySelector(Z.NEXT_PREV) && (x.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }, t.cycle = function s(t) {
          t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }, t.to = function a(t) {
          var e = this;
          this._activeElement = this._element.querySelector(Z.ACTIVE_ITEM);
          var n = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding) N(this._element).one(J.SLID, function () {
              return e.to(t)
            });
            else {
              if (n === t) return this.pause(), void this.cycle();
              var i = n < t ? Y.NEXT : Y.PREV;
              this._slide(i, this._items[t])
            }
        }, t.dispose = function l() {
          N(this._element).off(F), N.removeData(this._element, j), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
        }, t._getConfig = function c(t) {
          return t = P({}, X, t), x.typeCheckConfig(q, t, z), t
        }, t._handleSwipe = function u() {
          var t = Math.abs(this.touchDeltaX);
          if (!(t <= Q)) {
            var e = t / this.touchDeltaX;
            0 < e && this.prev(), e < 0 && this.next()
          }
        }, t._addEventListeners = function h() {
          var e = this;
          this._config.keyboard && N(this._element).on(J.KEYDOWN, function (t) {
            return e._keydown(t)
          }), "hover" === this._config.pause && N(this._element).on(J.MOUSEENTER, function (t) {
            return e.pause(t)
          }).on(J.MOUSELEAVE, function (t) {
            return e.cycle(t)
          }), this._config.touch && this._addTouchEventListeners()
        }, t._addTouchEventListeners = function d() {
          var e = this;
          if (this._touchSupported) {
            var n = function n(t) {
                e._pointerEvent && tt[t.originalEvent.pointerType.toUpperCase()] ? e.touchStartX = t.originalEvent.clientX : e._pointerEvent || (e.touchStartX = t.originalEvent.touches[0].clientX)
              },
              i = function i(t) {
                t.originalEvent.touches && 1 < t.originalEvent.touches.length ? e.touchDeltaX = 0 : e.touchDeltaX = t.originalEvent.touches[0].clientX - e.touchStartX
              },
              r = function r(t) {
                e._pointerEvent && tt[t.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX), e._handleSwipe(), "hover" === e._config.pause && (e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
                  return e.cycle(t)
                }, K + e._config.interval))
              };
            N(this._element.querySelectorAll(Z.ITEM_IMG)).on(J.DRAG_START, function (t) {
              return t.preventDefault()
            }), this._pointerEvent ? (N(this._element).on(J.POINTERDOWN, function (t) {
              return n(t)
            }), N(this._element).on(J.POINTERUP, function (t) {
              return r(t)
            }), this._element.classList.add($.POINTER_EVENT)) : (N(this._element).on(J.TOUCHSTART, function (t) {
              return n(t)
            }), N(this._element).on(J.TOUCHMOVE, function (t) {
              return i(t)
            }), N(this._element).on(J.TOUCHEND, function (t) {
              return r(t)
            }))
          }
        }, t._keydown = function f(t) {
          if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
            case V:
              t.preventDefault(), this.prev();
              break;
            case G:
              t.preventDefault(), this.next()
          }
        }, t._getItemIndex = function p(t) {
          return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(Z.ITEM)) : [], this._items.indexOf(t)
        }, t._getItemByDirection = function m(t, e) {
          var n = t === Y.NEXT,
            i = t === Y.PREV,
            r = this._getItemIndex(e),
            o = this._items.length - 1;
          if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
          var s = (r + (t === Y.PREV ? -1 : 1)) % this._items.length;
          return -1 === s ? this._items[this._items.length - 1] : this._items[s]
        }, t._triggerSlideEvent = function g(t, e) {
          var n = this._getItemIndex(t),
            i = this._getItemIndex(this._element.querySelector(Z.ACTIVE_ITEM)),
            r = N.Event(J.SLIDE, {
              relatedTarget: t,
              direction: e,
              from: i,
              to: n
            });
          return N(this._element).trigger(r), r
        }, t._setActiveIndicatorElement = function v(t) {
          if (this._indicatorsElement) {
            var e = [].slice.call(this._indicatorsElement.querySelectorAll(Z.ACTIVE));
            N(e).removeClass($.ACTIVE);
            var n = this._indicatorsElement.children[this._getItemIndex(t)];
            n && N(n).addClass($.ACTIVE)
          }
        }, t._slide = function y(t, e) {
          var n, i, r, o = this,
            s = this._element.querySelector(Z.ACTIVE_ITEM),
            a = this._getItemIndex(s),
            l = e || s && this._getItemByDirection(t, s),
            c = this._getItemIndex(l),
            u = Boolean(this._interval);
          if (t === Y.NEXT ? (n = $.LEFT, i = $.NEXT, r = Y.LEFT) : (n = $.RIGHT, i = $.PREV, r = Y.RIGHT), l && N(l).hasClass($.ACTIVE)) this._isSliding = !1;
          else if (!this._triggerSlideEvent(l, r).isDefaultPrevented() && s && l) {
            this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(l);
            var h = N.Event(J.SLID, {
              relatedTarget: l,
              direction: r,
              from: a,
              to: c
            });
            if (N(this._element).hasClass($.SLIDE)) {
              N(l).addClass(i), x.reflow(l), N(s).addClass(n), N(l).addClass(n);
              var d = parseInt(l.getAttribute("data-interval"), 10);
              d ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = d) : this._config.interval = this._config.defaultInterval || this._config.interval;
              var f = x.getTransitionDurationFromElement(s);
              N(s).one(x.TRANSITION_END, function () {
                N(l).removeClass(n + " " + i).addClass($.ACTIVE), N(s).removeClass($.ACTIVE + " " + i + " " + n), o._isSliding = !1, setTimeout(function () {
                  return N(o._element).trigger(h)
                }, 0)
              }).emulateTransitionEnd(f)
            } else N(s).removeClass($.ACTIVE), N(l).addClass($.ACTIVE), this._isSliding = !1, N(this._element).trigger(h);
            u && this.cycle()
          }
        }, o._jQueryInterface = function _(i) {
          return this.each(function () {
            var t = N(this).data(j),
              e = P({}, X, N(this).data());
            "object" == typeof i && (e = P({}, e, i));
            var n = "string" == typeof i ? i : e.slide;
            if (t || (t = new o(this, e), N(this).data(j, t)), "number" == typeof i) t.to(i);
            else if ("string" == typeof n) {
              if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
              t[n]()
            } else e.interval && e.ride && (t.pause(), t.cycle())
          })
        }, o._dataApiClickHandler = function E(t) {
          var e = x.getSelectorFromElement(this);
          if (e) {
            var n = N(e)[0];
            if (n && N(n).hasClass($.CAROUSEL)) {
              var i = P({}, N(n).data(), N(this).data()),
                r = this.getAttribute("data-slide-to");
              r && (i.interval = !1), o._jQueryInterface.call(N(n), i), r && N(n).data(j).to(r), t.preventDefault()
            }
          }
        }, R(o, null, [{
          key: "VERSION",
          get: function b() {
            return W
          }
        }, {
          key: "Default",
          get: function b() {
            return X
          }
        }]), o
      }();
    N(document).on(J.CLICK_DATA_API, Z.DATA_SLIDE, et._dataApiClickHandler), N(window).on(J.LOAD_DATA_API, function () {
      for (var t = [].slice.call(document.querySelectorAll(Z.DATA_RIDE)), e = 0, n = t.length; e < n; e++) {
        var i = N(t[e]);
        et._jQueryInterface.call(i, i.data())
      }
    }), N.fn[q] = et._jQueryInterface, N.fn[q].Constructor = et, N.fn[q].noConflict = function () {
      return N.fn[q] = U, et._jQueryInterface
    };
    var nt = "collapse",
      it = "4.3.1",
      rt = "bs.collapse",
      ot = "." + rt,
      st = ".data-api",
      at = N.fn[nt],
      lt = {
        toggle: !0,
        parent: ""
      },
      ct = {
        toggle: "boolean",
        parent: "(string|element)"
      },
      ut = {
        SHOW: "show" + ot,
        SHOWN: "shown" + ot,
        HIDE: "hide" + ot,
        HIDDEN: "hidden" + ot,
        CLICK_DATA_API: "click" + ot + st
      },
      ht = {
        SHOW: "show",
        COLLAPSE: "collapse",
        COLLAPSING: "collapsing",
        COLLAPSED: "collapsed"
      },
      dt = {
        WIDTH: "width",
        HEIGHT: "height"
      },
      ft = {
        ACTIVES: ".show, .collapsing",
        DATA_TOGGLE: '[data-toggle="collapse"]'
      },
      pt = function () {
        function l(e, t) {
          this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
          for (var n = [].slice.call(document.querySelectorAll(ft.DATA_TOGGLE)), i = 0, r = n.length; i < r; i++) {
            var o = n[i],
              s = x.getSelectorFromElement(o),
              a = [].slice.call(document.querySelectorAll(s)).filter(function (t) {
                return t === e
              });
            null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(o))
          }
          this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
        }
        var t = l.prototype;
        return t.toggle = function e() {
            N(this._element).hasClass(ht.SHOW) ? this.hide() : this.show()
          }, t.show = function c() {
            var t, e, n = this;
            if (!this._isTransitioning && !N(this._element).hasClass(ht.SHOW) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(ft.ACTIVES)).filter(function (t) {
                return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(ht.COLLAPSE)
              })).length && (t = null), !(t && (e = N(t).not(this._selector).data(rt)) && e._isTransitioning))) {
              var i = N.Event(ut.SHOW);
              if (N(this._element).trigger(i), !i.isDefaultPrevented()) {
                t && (l._jQueryInterface.call(N(t).not(this._selector), "hide"), e || N(t).data(rt, null));
                var r = this._getDimension();
                N(this._element).removeClass(ht.COLLAPSE).addClass(ht.COLLAPSING), this._element.style[r] = 0, this._triggerArray.length && N(this._triggerArray).removeClass(ht.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                var o = function o() {
                    N(n._element).removeClass(ht.COLLAPSING).addClass(ht.COLLAPSE).addClass(ht.SHOW), n._element.style[r] = "", n.setTransitioning(!1), N(n._element).trigger(ut.SHOWN)
                  },
                  s = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                  a = x.getTransitionDurationFromElement(this._element);
                N(this._element).one(x.TRANSITION_END, o).emulateTransitionEnd(a), this._element.style[r] = this._element[s] + "px"
              }
            }
          }, t.hide = function u() {
            var t = this;
            if (!this._isTransitioning && N(this._element).hasClass(ht.SHOW)) {
              var e = N.Event(ut.HIDE);
              if (N(this._element).trigger(e), !e.isDefaultPrevented()) {
                var n = this._getDimension();
                this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", x.reflow(this._element), N(this._element).addClass(ht.COLLAPSING).removeClass(ht.COLLAPSE).removeClass(ht.SHOW);
                var i = this._triggerArray.length;
                if (0 < i)
                  for (var r = 0; r < i; r++) {
                    var o = this._triggerArray[r],
                      s = x.getSelectorFromElement(o);
                    if (null !== s) N([].slice.call(document.querySelectorAll(s))).hasClass(ht.SHOW) || N(o).addClass(ht.COLLAPSED).attr("aria-expanded", !1)
                  }
                this.setTransitioning(!0);
                var a = function a() {
                  t.setTransitioning(!1), N(t._element).removeClass(ht.COLLAPSING).addClass(ht.COLLAPSE).trigger(ut.HIDDEN)
                };
                this._element.style[n] = "";
                var l = x.getTransitionDurationFromElement(this._element);
                N(this._element).one(x.TRANSITION_END, a).emulateTransitionEnd(l)
              }
            }
          }, t.setTransitioning = function n(t) {
            this._isTransitioning = t
          }, t.dispose = function i() {
            N.removeData(this._element, rt), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
          }, t._getConfig = function r(t) {
            return (t = P({}, lt, t)).toggle = Boolean(t.toggle), x.typeCheckConfig(nt, t, ct), t
          }, t._getDimension = function o() {
            return N(this._element).hasClass(dt.WIDTH) ? dt.WIDTH : dt.HEIGHT
          }, t._getParent = function s() {
            var t, n = this;
            x.isElement(this._config.parent) ? (t = this._config.parent, "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
            var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
              i = [].slice.call(t.querySelectorAll(e));
            return N(i).each(function (t, e) {
              n._addAriaAndCollapsedClass(l._getTargetFromElement(e), [e])
            }), t
          },
          t._addAriaAndCollapsedClass = function a(t, e) {
            var n = N(t).hasClass(ht.SHOW);
            e.length && N(e).toggleClass(ht.COLLAPSED, !n).attr("aria-expanded", n)
          }, l._getTargetFromElement = function h(t) {
            var e = x.getSelectorFromElement(t);
            return e ? document.querySelector(e) : null
          }, l._jQueryInterface = function d(i) {
            return this.each(function () {
              var t = N(this),
                e = t.data(rt),
                n = P({}, lt, t.data(), "object" == typeof i && i ? i : {});
              if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new l(this, n), t.data(rt, e)), "string" == typeof i) {
                if ("undefined" == typeof e[i]) throw new TypeError('No method named "' + i + '"');
                e[i]()
              }
            })
          }, R(l, null, [{
            key: "VERSION",
            get: function f() {
              return it
            }
          }, {
            key: "Default",
            get: function f() {
              return lt
            }
          }]), l
      }();
    N(document).on(ut.CLICK_DATA_API, ft.DATA_TOGGLE, function (t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var n = N(this),
        e = x.getSelectorFromElement(this),
        i = [].slice.call(document.querySelectorAll(e));
      N(i).each(function () {
        var t = N(this),
          e = t.data(rt) ? "toggle" : n.data();
        pt._jQueryInterface.call(t, e)
      })
    }), N.fn[nt] = pt._jQueryInterface, N.fn[nt].Constructor = pt, N.fn[nt].noConflict = function () {
      return N.fn[nt] = at, pt._jQueryInterface
    };
    var mt = "dropdown",
      gt = "4.3.1",
      vt = "bs.dropdown",
      yt = "." + vt,
      _t = ".data-api",
      Et = N.fn[mt],
      bt = 27,
      St = 32,
      Tt = 9,
      At = 38,
      Ct = 40,
      It = 3,
      wt = new RegExp(At + "|" + Ct + "|" + bt),
      Dt = {
        HIDE: "hide" + yt,
        HIDDEN: "hidden" + yt,
        SHOW: "show" + yt,
        SHOWN: "shown" + yt,
        CLICK: "click" + yt,
        CLICK_DATA_API: "click" + yt + _t,
        KEYDOWN_DATA_API: "keydown" + yt + _t,
        KEYUP_DATA_API: "keyup" + yt + _t
      },
      Ot = {
        DISABLED: "disabled",
        SHOW: "show",
        DROPUP: "dropup",
        DROPRIGHT: "dropright",
        DROPLEFT: "dropleft",
        MENURIGHT: "dropdown-menu-right",
        MENULEFT: "dropdown-menu-left",
        POSITION_STATIC: "position-static"
      },
      Lt = {
        DATA_TOGGLE: '[data-toggle="dropdown"]',
        FORM_CHILD: ".dropdown form",
        MENU: ".dropdown-menu",
        NAVBAR_NAV: ".navbar-nav",
        VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
      },
      Nt = {
        TOP: "top-start",
        TOPEND: "top-end",
        BOTTOM: "bottom-start",
        BOTTOMEND: "bottom-end",
        RIGHT: "right-start",
        RIGHTEND: "right-end",
        LEFT: "left-start",
        LEFTEND: "left-end"
      },
      kt = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic"
      },
      Rt = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string"
      },
      Pt = function () {
        function c(t, e) {
          this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
        }
        var t = c.prototype;
        return t.toggle = function o() {
          if (!this._element.disabled && !N(this._element).hasClass(Ot.DISABLED)) {
            var t = c._getParentFromElement(this._element),
              e = N(this._menu).hasClass(Ot.SHOW);
            if (c._clearMenus(), !e) {
              var n = {
                  relatedTarget: this._element
                },
                i = N.Event(Dt.SHOW, n);
              if (N(t).trigger(i), !i.isDefaultPrevented()) {
                if (!this._inNavbar) {
                  if (void 0 === k) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                  var r = this._element;
                  "parent" === this._config.reference ? r = t : x.isElement(this._config.reference) && (r = this._config.reference, "undefined" != typeof this._config.reference.jquery && (r = this._config.reference[0])), "scrollParent" !== this._config.boundary && N(t).addClass(Ot.POSITION_STATIC), this._popper = new k(r, this._menu, this._getPopperConfig())
                }
                "ontouchstart" in document.documentElement && 0 === N(t).closest(Lt.NAVBAR_NAV).length && N(document.body).children().on("mouseover", null, N.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), N(this._menu).toggleClass(Ot.SHOW), N(t).toggleClass(Ot.SHOW).trigger(N.Event(Dt.SHOWN, n))
              }
            }
          }
        }, t.show = function i() {
          if (!(this._element.disabled || N(this._element).hasClass(Ot.DISABLED) || N(this._menu).hasClass(Ot.SHOW))) {
            var t = {
                relatedTarget: this._element
              },
              e = N.Event(Dt.SHOW, t),
              n = c._getParentFromElement(this._element);
            N(n).trigger(e), e.isDefaultPrevented() || (N(this._menu).toggleClass(Ot.SHOW), N(n).toggleClass(Ot.SHOW).trigger(N.Event(Dt.SHOWN, t)))
          }
        }, t.hide = function r() {
          if (!this._element.disabled && !N(this._element).hasClass(Ot.DISABLED) && N(this._menu).hasClass(Ot.SHOW)) {
            var t = {
                relatedTarget: this._element
              },
              e = N.Event(Dt.HIDE, t),
              n = c._getParentFromElement(this._element);
            N(n).trigger(e), e.isDefaultPrevented() || (N(this._menu).toggleClass(Ot.SHOW), N(n).toggleClass(Ot.SHOW).trigger(N.Event(Dt.HIDDEN, t)))
          }
        }, t.dispose = function e() {
          N.removeData(this._element, vt), N(this._element).off(yt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
        }, t.update = function n() {
          this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
        }, t._addEventListeners = function s() {
          var e = this;
          N(this._element).on(Dt.CLICK, function (t) {
            t.preventDefault(), t.stopPropagation(), e.toggle()
          })
        }, t._getConfig = function a(t) {
          return t = P({}, this.constructor.Default, N(this._element).data(), t), x.typeCheckConfig(mt, t, this.constructor.DefaultType), t
        }, t._getMenuElement = function l() {
          if (!this._menu) {
            var t = c._getParentFromElement(this._element);
            t && (this._menu = t.querySelector(Lt.MENU))
          }
          return this._menu
        }, t._getPlacement = function u() {
          var t = N(this._element.parentNode),
            e = Nt.BOTTOM;
          return t.hasClass(Ot.DROPUP) ? (e = Nt.TOP, N(this._menu).hasClass(Ot.MENURIGHT) && (e = Nt.TOPEND)) : t.hasClass(Ot.DROPRIGHT) ? e = Nt.RIGHT : t.hasClass(Ot.DROPLEFT) ? e = Nt.LEFT : N(this._menu).hasClass(Ot.MENURIGHT) && (e = Nt.BOTTOMEND), e
        }, t._detectNavbar = function h() {
          return 0 < N(this._element).closest(".navbar").length
        }, t._getOffset = function d() {
          var e = this,
            t = {};
          return "function" == typeof this._config.offset ? t.fn = function (t) {
            return t.offsets = P({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
          } : t.offset = this._config.offset, t
        }, t._getPopperConfig = function f() {
          var t = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: {
                enabled: this._config.flip
              },
              preventOverflow: {
                boundariesElement: this._config.boundary
              }
            }
          };
          return "static" === this._config.display && (t.modifiers.applyStyle = {
            enabled: !1
          }), t
        }, c._jQueryInterface = function p(e) {
          return this.each(function () {
            var t = N(this).data(vt);
            if (t || (t = new c(this, "object" == typeof e ? e : null), N(this).data(vt, t)), "string" == typeof e) {
              if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
              t[e]()
            }
          })
        }, c._clearMenus = function m(t) {
          if (!t || t.which !== It && ("keyup" !== t.type || t.which === Tt))
            for (var e = [].slice.call(document.querySelectorAll(Lt.DATA_TOGGLE)), n = 0, i = e.length; n < i; n++) {
              var r = c._getParentFromElement(e[n]),
                o = N(e[n]).data(vt),
                s = {
                  relatedTarget: e[n]
                };
              if (t && "click" === t.type && (s.clickEvent = t), o) {
                var a = o._menu;
                if (N(r).hasClass(Ot.SHOW) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && t.which === Tt) && N.contains(r, t.target))) {
                  var l = N.Event(Dt.HIDE, s);
                  N(r).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && N(document.body).children().off("mouseover", null, N.noop), e[n].setAttribute("aria-expanded", "false"), N(a).removeClass(Ot.SHOW), N(r).removeClass(Ot.SHOW).trigger(N.Event(Dt.HIDDEN, s)))
                }
              }
            }
        }, c._getParentFromElement = function g(t) {
          var e, n = x.getSelectorFromElement(t);
          return n && (e = document.querySelector(n)), e || t.parentNode
        }, c._dataApiKeydownHandler = function v(t) {
          if ((/input|textarea/i.test(t.target.tagName) ? !(t.which === St || t.which !== bt && (t.which !== Ct && t.which !== At || N(t.target).closest(Lt.MENU).length)) : wt.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !N(this).hasClass(Ot.DISABLED))) {
            var e = c._getParentFromElement(this),
              n = N(e).hasClass(Ot.SHOW);
            if (n && (!n || t.which !== bt && t.which !== St)) {
              var i = [].slice.call(e.querySelectorAll(Lt.VISIBLE_ITEMS));
              if (0 !== i.length) {
                var r = i.indexOf(t.target);
                t.which === At && 0 < r && r--, t.which === Ct && r < i.length - 1 && r++, r < 0 && (r = 0), i[r].focus()
              }
            } else {
              if (t.which === bt) {
                var o = e.querySelector(Lt.DATA_TOGGLE);
                N(o).trigger("focus")
              }
              N(this).trigger("click")
            }
          }
        }, R(c, null, [{
          key: "VERSION",
          get: function y() {
            return gt
          }
        }, {
          key: "Default",
          get: function y() {
            return kt
          }
        }, {
          key: "DefaultType",
          get: function y() {
            return Rt
          }
        }]), c
      }();
    N(document).on(Dt.KEYDOWN_DATA_API, Lt.DATA_TOGGLE, Pt._dataApiKeydownHandler).on(Dt.KEYDOWN_DATA_API, Lt.MENU, Pt._dataApiKeydownHandler).on(Dt.CLICK_DATA_API + " " + Dt.KEYUP_DATA_API, Pt._clearMenus).on(Dt.CLICK_DATA_API, Lt.DATA_TOGGLE, function (t) {
      t.preventDefault(), t.stopPropagation(), Pt._jQueryInterface.call(N(this), "toggle")
    }).on(Dt.CLICK_DATA_API, Lt.FORM_CHILD, function (t) {
      t.stopPropagation()
    }), N.fn[mt] = Pt._jQueryInterface, N.fn[mt].Constructor = Pt, N.fn[mt].noConflict = function () {
      return N.fn[mt] = Et, Pt._jQueryInterface
    };
    var Ht = "modal",
      xt = "4.3.1",
      Mt = "bs.modal",
      qt = "." + Mt,
      Wt = ".data-api",
      jt = N.fn[Ht],
      Ft = 27,
      Bt = {
        backdrop: !0,
        keyboard: !0,
        focus: !0,
        show: !0
      },
      Ut = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean"
      },
      Vt = {
        HIDE: "hide" + qt,
        HIDDEN: "hidden" + qt,
        SHOW: "show" + qt,
        SHOWN: "shown" + qt,
        FOCUSIN: "focusin" + qt,
        RESIZE: "resize" + qt,
        CLICK_DISMISS: "click.dismiss" + qt,
        KEYDOWN_DISMISS: "keydown.dismiss" + qt,
        MOUSEUP_DISMISS: "mouseup.dismiss" + qt,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + qt,
        CLICK_DATA_API: "click" + qt + Wt
      },
      Gt = {
        SCROLLABLE: "modal-dialog-scrollable",
        SCROLLBAR_MEASURER: "modal-scrollbar-measure",
        BACKDROP: "modal-backdrop",
        OPEN: "modal-open",
        FADE: "fade",
        SHOW: "show"
      },
      Kt = {
        DIALOG: ".modal-dialog",
        MODAL_BODY: ".modal-body",
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        STICKY_CONTENT: ".sticky-top"
      },
      Qt = function () {
        function r(t, e) {
          this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(Kt.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
        }
        var t = r.prototype;
        return t.toggle = function e(t) {
          return this._isShown ? this.hide() : this.show(t)
        }, t.show = function i(t) {
          var e = this;
          if (!this._isShown && !this._isTransitioning) {
            N(this._element).hasClass(Gt.FADE) && (this._isTransitioning = !0);
            var n = N.Event(Vt.SHOW, {
              relatedTarget: t
            });
            N(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), N(this._element).on(Vt.CLICK_DISMISS, Kt.DATA_DISMISS, function (t) {
              return e.hide(t)
            }), N(this._dialog).on(Vt.MOUSEDOWN_DISMISS, function () {
              N(e._element).one(Vt.MOUSEUP_DISMISS, function (t) {
                N(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
              })
            }), this._showBackdrop(function () {
              return e._showElement(t)
            }))
          }
        }, t.hide = function o(t) {
          var e = this;
          if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
            var n = N.Event(Vt.HIDE);
            if (N(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
              this._isShown = !1;
              var i = N(this._element).hasClass(Gt.FADE);
              if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), N(document).off(Vt.FOCUSIN), N(this._element).removeClass(Gt.SHOW), N(this._element).off(Vt.CLICK_DISMISS), N(this._dialog).off(Vt.MOUSEDOWN_DISMISS), i) {
                var r = x.getTransitionDurationFromElement(this._element);
                N(this._element).one(x.TRANSITION_END, function (t) {
                  return e._hideModal(t)
                }).emulateTransitionEnd(r)
              } else this._hideModal()
            }
          }
        }, t.dispose = function n() {
          [window, this._element, this._dialog].forEach(function (t) {
            return N(t).off(qt)
          }), N(document).off(Vt.FOCUSIN), N.removeData(this._element, Mt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
        }, t.handleUpdate = function s() {
          this._adjustDialog()
        }, t._getConfig = function a(t) {
          return t = P({}, Bt, t), x.typeCheckConfig(Ht, t, Ut), t
        }, t._showElement = function l(t) {
          var e = this,
            n = N(this._element).hasClass(Gt.FADE);
          this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), N(this._dialog).hasClass(Gt.SCROLLABLE) ? this._dialog.querySelector(Kt.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, n && x.reflow(this._element), N(this._element).addClass(Gt.SHOW), this._config.focus && this._enforceFocus();
          var i = N.Event(Vt.SHOWN, {
              relatedTarget: t
            }),
            r = function r() {
              e._config.focus && e._element.focus(), e._isTransitioning = !1, N(e._element).trigger(i)
            };
          if (n) {
            var o = x.getTransitionDurationFromElement(this._dialog);
            N(this._dialog).one(x.TRANSITION_END, r).emulateTransitionEnd(o)
          } else r()
        }, t._enforceFocus = function c() {
          var e = this;
          N(document).off(Vt.FOCUSIN).on(Vt.FOCUSIN, function (t) {
            document !== t.target && e._element !== t.target && 0 === N(e._element).has(t.target).length && e._element.focus()
          })
        }, t._setEscapeEvent = function u() {
          var e = this;
          this._isShown && this._config.keyboard ? N(this._element).on(Vt.KEYDOWN_DISMISS, function (t) {
            t.which === Ft && (t.preventDefault(), e.hide())
          }) : this._isShown || N(this._element).off(Vt.KEYDOWN_DISMISS)
        }, t._setResizeEvent = function h() {
          var e = this;
          this._isShown ? N(window).on(Vt.RESIZE, function (t) {
            return e.handleUpdate(t)
          }) : N(window).off(Vt.RESIZE)
        }, t._hideModal = function d() {
          var t = this;
          this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
            N(document.body).removeClass(Gt.OPEN), t._resetAdjustments(), t._resetScrollbar(), N(t._element).trigger(Vt.HIDDEN)
          })
        }, t._removeBackdrop = function f() {
          this._backdrop && (N(this._backdrop).remove(), this._backdrop = null)
        }, t._showBackdrop = function p(t) {
          var e = this,
            n = N(this._element).hasClass(Gt.FADE) ? Gt.FADE : "";
          if (this._isShown && this._config.backdrop) {
            if (this._backdrop = document.createElement("div"), this._backdrop.className = Gt.BACKDROP, n && this._backdrop.classList.add(n), N(this._backdrop).appendTo(document.body), N(this._element).on(Vt.CLICK_DISMISS, function (t) {
                e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
              }), n && x.reflow(this._backdrop), N(this._backdrop).addClass(Gt.SHOW), !t) return;
            if (!n) return void t();
            var i = x.getTransitionDurationFromElement(this._backdrop);
            N(this._backdrop).one(x.TRANSITION_END, t).emulateTransitionEnd(i)
          } else if (!this._isShown && this._backdrop) {
            N(this._backdrop).removeClass(Gt.SHOW);
            var r = function r() {
              e._removeBackdrop(), t && t()
            };
            if (N(this._element).hasClass(Gt.FADE)) {
              var o = x.getTransitionDurationFromElement(this._backdrop);
              N(this._backdrop).one(x.TRANSITION_END, r).emulateTransitionEnd(o)
            } else r()
          } else t && t()
        }, t._adjustDialog = function m() {
          var t = this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
        }, t._resetAdjustments = function g() {
          this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }, t._checkScrollbar = function v() {
          var t = document.body.getBoundingClientRect();
          this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
        }, t._setScrollbar = function y() {
          var r = this;
          if (this._isBodyOverflowing) {
            var t = [].slice.call(document.querySelectorAll(Kt.FIXED_CONTENT)),
              e = [].slice.call(document.querySelectorAll(Kt.STICKY_CONTENT));
            N(t).each(function (t, e) {
              var n = e.style.paddingRight,
                i = N(e).css("padding-right");
              N(e).data("padding-right", n).css("padding-right", parseFloat(i) + r._scrollbarWidth + "px")
            }), N(e).each(function (t, e) {
              var n = e.style.marginRight,
                i = N(e).css("margin-right");
              N(e).data("margin-right", n).css("margin-right", parseFloat(i) - r._scrollbarWidth + "px")
            });
            var n = document.body.style.paddingRight,
              i = N(document.body).css("padding-right");
            N(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
          }
          N(document.body).addClass(Gt.OPEN)
        }, t._resetScrollbar = function _() {
          var t = [].slice.call(document.querySelectorAll(Kt.FIXED_CONTENT));
          N(t).each(function (t, e) {
            var n = N(e).data("padding-right");
            N(e).removeData("padding-right"), e.style.paddingRight = n || ""
          });
          var e = [].slice.call(document.querySelectorAll("" + Kt.STICKY_CONTENT));
          N(e).each(function (t, e) {
            var n = N(e).data("margin-right");
            void 0 !== n && N(e).css("margin-right", n).removeData("margin-right")
          });
          var n = N(document.body).data("padding-right");
          N(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
        }, t._getScrollbarWidth = function E() {
          var t = document.createElement("div");
          t.className = Gt.SCROLLBAR_MEASURER, document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t), e
        }, r._jQueryInterface = function b(n, i) {
          return this.each(function () {
            var t = N(this).data(Mt),
              e = P({}, Bt, N(this).data(), "object" == typeof n && n ? n : {});
            if (t || (t = new r(this, e), N(this).data(Mt, t)), "string" == typeof n) {
              if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
              t[n](i)
            } else e.show && t.show(i)
          })
        }, R(r, null, [{
          key: "VERSION",
          get: function S() {
            return xt
          }
        }, {
          key: "Default",
          get: function S() {
            return Bt
          }
        }]), r
      }();
    N(document).on(Vt.CLICK_DATA_API, Kt.DATA_TOGGLE, function (t) {
      var e, n = this,
        i = x.getSelectorFromElement(this);
      i && (e = document.querySelector(i));
      var r = N(e).data(Mt) ? "toggle" : P({}, N(e).data(), N(this).data());
      "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
      var o = N(e).one(Vt.SHOW, function (t) {
        t.isDefaultPrevented() || o.one(Vt.HIDDEN, function () {
          N(n).is(":visible") && n.focus()
        })
      });
      Qt._jQueryInterface.call(N(e), r, this)
    }), N.fn[Ht] = Qt._jQueryInterface, N.fn[Ht].Constructor = Qt, N.fn[Ht].noConflict = function () {
      return N.fn[Ht] = jt, Qt._jQueryInterface
    };
    var Xt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
      zt = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
      },
      Yt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
      Jt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i,
      $t = "tooltip",
      Zt = "4.3.1",
      te = "bs.tooltip",
      ee = "." + te,
      ne = N.fn[$t],
      ie = "bs-tooltip",
      re = new RegExp("(^|\\s)" + ie + "\\S+", "g"),
      oe = ["sanitize", "whiteList", "sanitizeFn"],
      se = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        whiteList: "object"
      },
      ae = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left"
      },
      le = {
        animation: !0,
        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        selector: !1,
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
        sanitize: !0,
        sanitizeFn: null,
        whiteList: zt
      },
      ce = {
        SHOW: "show",
        OUT: "out"
      },
      ue = {
        HIDE: "hide" + ee,
        HIDDEN: "hidden" + ee,
        SHOW: "show" + ee,
        SHOWN: "shown" + ee,
        INSERTED: "inserted" + ee,
        CLICK: "click" + ee,
        FOCUSIN: "focusin" + ee,
        FOCUSOUT: "focusout" + ee,
        MOUSEENTER: "mouseenter" + ee,
        MOUSELEAVE: "mouseleave" + ee
      },
      he = {
        FADE: "fade",
        SHOW: "show"
      },
      de = {
        TOOLTIP: ".tooltip",
        TOOLTIP_INNER: ".tooltip-inner",
        ARROW: ".arrow"
      },
      fe = {
        HOVER: "hover",
        FOCUS: "focus",
        CLICK: "click",
        MANUAL: "manual"
      },
      pe = function () {
        function i(t, e) {
          if (void 0 === k) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
          this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
        }
        var t = i.prototype;
        return t.enable = function e() {
          this._isEnabled = !0
        }, t.disable = function n() {
          this._isEnabled = !1
        }, t.toggleEnabled = function r() {
          this._isEnabled = !this._isEnabled
        }, t.toggle = function o(t) {
          if (this._isEnabled)
            if (t) {
              var e = this.constructor.DATA_KEY,
                n = N(t.currentTarget).data(e);
              n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), N(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
            } else {
              if (N(this.getTipElement()).hasClass(he.SHOW)) return void this._leave(null, this);
              this._enter(null, this)
            }
        }, t.dispose = function s() {
          clearTimeout(this._timeout), N.removeData(this.element, this.constructor.DATA_KEY), N(this.element).off(this.constructor.EVENT_KEY), N(this.element).closest(".modal").off("hide.bs.modal"), this.tip && N(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
        }, t.show = function f() {
          var e = this;
          if ("none" === N(this.element).css("display")) throw new Error("Please use show on visible elements");
          var t = N.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            N(this.element).trigger(t);
            var n = x.findShadowRoot(this.element),
              i = N.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
            if (t.isDefaultPrevented() || !i) return;
            var r = this.getTipElement(),
              o = x.getUID(this.constructor.NAME);
            r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && N(r).addClass(he.FADE);
            var s = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
              a = this._getAttachment(s);
            this.addAttachmentClass(a);
            var l = this._getContainer();
            N(r).data(this.constructor.DATA_KEY, this), N.contains(this.element.ownerDocument.documentElement, this.tip) || N(r).appendTo(l), N(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new k(this.element, r, {
              placement: a,
              modifiers: {
                offset: this._getOffset(),
                flip: {
                  behavior: this.config.fallbackPlacement
                },
                arrow: {
                  element: de.ARROW
                },
                preventOverflow: {
                  boundariesElement: this.config.boundary
                }
              },
              onCreate: function h(t) {
                t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
              },
              onUpdate: function d(t) {
                return e._handlePopperPlacementChange(t)
              }
            }), N(r).addClass(he.SHOW), "ontouchstart" in document.documentElement && N(document.body).children().on("mouseover", null, N.noop);
            var c = function c() {
              e.config.animation && e._fixTransition();
              var t = e._hoverState;
              e._hoverState = null, N(e.element).trigger(e.constructor.Event.SHOWN), t === ce.OUT && e._leave(null, e)
            };
            if (N(this.tip).hasClass(he.FADE)) {
              var u = x.getTransitionDurationFromElement(this.tip);
              N(this.tip).one(x.TRANSITION_END, c).emulateTransitionEnd(u)
            } else c()
          }
        }, t.hide = function a(t) {
          var e = this,
            n = this.getTipElement(),
            i = N.Event(this.constructor.Event.HIDE),
            r = function r() {
              e._hoverState !== ce.SHOW && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), N(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
            };
          if (N(this.element).trigger(i), !i.isDefaultPrevented()) {
            if (N(n).removeClass(he.SHOW), "ontouchstart" in document.documentElement && N(document.body).children().off("mouseover", null, N.noop), this._activeTrigger[fe.CLICK] = !1, this._activeTrigger[fe.FOCUS] = !1, this._activeTrigger[fe.HOVER] = !1, N(this.tip).hasClass(he.FADE)) {
              var o = x.getTransitionDurationFromElement(n);
              N(n).one(x.TRANSITION_END, r).emulateTransitionEnd(o)
            } else r();
            this._hoverState = ""
          }
        }, t.update = function l() {
          null !== this._popper && this._popper.scheduleUpdate()
        }, t.isWithContent = function c() {
          return Boolean(this.getTitle())
        }, t.addAttachmentClass = function u(t) {
          N(this.getTipElement()).addClass(ie + "-" + t)
        }, t.getTipElement = function h() {
          return this.tip = this.tip || N(this.config.template)[0], this.tip
        }, t.setContent = function d() {
          var t = this.getTipElement();
          this.setElementContent(N(t.querySelectorAll(de.TOOLTIP_INNER)), this.getTitle()), N(t).removeClass(he.FADE + " " + he.SHOW)
        }, t.setElementContent = function p(t, e) {
          "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = H(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? N(e).parent().is(t) || t.empty().append(e) : t.text(N(e).text())
        }, t.getTitle = function m() {
          var t = this.element.getAttribute("data-original-title");
          return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
        }, t._getOffset = function g() {
          var e = this,
            t = {};
          return "function" == typeof this.config.offset ? t.fn = function (t) {
            return t.offsets = P({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
          } : t.offset = this.config.offset, t
        }, t._getContainer = function v() {
          return !1 === this.config.container ? document.body : x.isElement(this.config.container) ? N(this.config.container) : N(document).find(this.config.container)
        }, t._getAttachment = function y(t) {
          return ae[t.toUpperCase()]
        }, t._setListeners = function _() {
          var i = this;
          this.config.trigger.split(" ").forEach(function (t) {
            if ("click" === t) N(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (t) {
              return i.toggle(t)
            });
            else if (t !== fe.MANUAL) {
              var e = t === fe.HOVER ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                n = t === fe.HOVER ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
              N(i.element).on(e, i.config.selector, function (t) {
                return i._enter(t)
              }).on(n, i.config.selector, function (t) {
                return i._leave(t)
              })
            }
          }), N(this.element).closest(".modal").on("hide.bs.modal", function () {
            i.element && i.hide()
          }), this.config.selector ? this.config = P({}, this.config, {
            trigger: "manual",
            selector: ""
          }) : this._fixTitle()
        }, t._fixTitle = function E() {
          var t = typeof this.element.getAttribute("data-original-title");
          (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
        }, t._enter = function b(t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || N(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), N(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? fe.FOCUS : fe.HOVER] = !0), N(e.getTipElement()).hasClass(he.SHOW) || e._hoverState === ce.SHOW ? e._hoverState = ce.SHOW : (clearTimeout(e._timeout), e._hoverState = ce.SHOW, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
            e._hoverState === ce.SHOW && e.show()
          }, e.config.delay.show) : e.show())
        }, t._leave = function S(t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || N(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), N(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? fe.FOCUS : fe.HOVER] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = ce.OUT, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
            e._hoverState === ce.OUT && e.hide()
          }, e.config.delay.hide) : e.hide())
        }, t._isWithActiveTrigger = function T() {
          for (var t in this._activeTrigger)
            if (this._activeTrigger[t]) return !0;
          return !1
        }, t._getConfig = function A(t) {
          var e = N(this.element).data();
          return Object.keys(e).forEach(function (t) {
            -1 !== oe.indexOf(t) && delete e[t]
          }), "number" == typeof (t = P({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
            show: t.delay,
            hide: t.delay
          }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), x.typeCheckConfig($t, t, this.constructor.DefaultType), t.sanitize && (t.template = H(t.template, t.whiteList, t.sanitizeFn)), t
        }, t._getDelegateConfig = function C() {
          var t = {};
          if (this.config)
            for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
          return t
        }, t._cleanTipClass = function I() {
          var t = N(this.getTipElement()),
            e = t.attr("class").match(re);
          null !== e && e.length && t.removeClass(e.join(""))
        }, t._handlePopperPlacementChange = function w(t) {
          var e = t.instance;
          this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
        }, t._fixTransition = function D() {
          var t = this.getTipElement(),
            e = this.config.animation;
          null === t.getAttribute("x-placement") && (N(t).removeClass(he.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
        }, i._jQueryInterface = function O(n) {
          return this.each(function () {
            var t = N(this).data(te),
              e = "object" == typeof n && n;
            if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), N(this).data(te, t)), "string" == typeof n)) {
              if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
              t[n]()
            }
          })
        }, R(i, null, [{
          key: "VERSION",
          get: function L() {
            return Zt
          }
        }, {
          key: "Default",
          get: function L() {
            return le
          }
        }, {
          key: "NAME",
          get: function L() {
            return $t
          }
        }, {
          key: "DATA_KEY",
          get: function L() {
            return te
          }
        }, {
          key: "Event",
          get: function L() {
            return ue
          }
        }, {
          key: "EVENT_KEY",
          get: function L() {
            return ee
          }
        }, {
          key: "DefaultType",
          get: function L() {
            return se
          }
        }]), i
      }();
    N.fn[$t] = pe._jQueryInterface, N.fn[$t].Constructor = pe, N.fn[$t].noConflict = function () {
      return N.fn[$t] = ne, pe._jQueryInterface
    };
    var me = "popover",
      ge = "4.3.1",
      ve = "bs.popover",
      ye = "." + ve,
      _e = N.fn[me],
      Ee = "bs-popover",
      be = new RegExp("(^|\\s)" + Ee + "\\S+", "g"),
      Se = P({}, pe.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      }),
      Te = P({}, pe.DefaultType, {
        content: "(string|element|function)"
      }),
      Ae = {
        FADE: "fade",
        SHOW: "show"
      },
      Ce = {
        TITLE: ".popover-header",
        CONTENT: ".popover-body"
      },
      Ie = {
        HIDE: "hide" + ye,
        HIDDEN: "hidden" + ye,
        SHOW: "show" + ye,
        SHOWN: "shown" + ye,
        INSERTED: "inserted" + ye,
        CLICK: "click" + ye,
        FOCUSIN: "focusin" + ye,
        FOCUSOUT: "focusout" + ye,
        MOUSEENTER: "mouseenter" + ye,
        MOUSELEAVE: "mouseleave" + ye
      },
      we = function (t) {
        function i() {
          return t.apply(this, arguments) || this
        }
        h(i, t);
        var e = i.prototype;
        return e.isWithContent = function n() {
          return this.getTitle() || this._getContent()
        }, e.addAttachmentClass = function r(t) {
          N(this.getTipElement()).addClass(Ee + "-" + t)
        }, e.getTipElement = function o() {
          return this.tip = this.tip || N(this.config.template)[0], this.tip
        }, e.setContent = function s() {
          var t = N(this.getTipElement());
          this.setElementContent(t.find(Ce.TITLE), this.getTitle());
          var e = this._getContent();
          "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(Ce.CONTENT), e), t.removeClass(Ae.FADE + " " + Ae.SHOW)
        }, e._getContent = function a() {
          return this.element.getAttribute("data-content") || this.config.content
        }, e._cleanTipClass = function l() {
          var t = N(this.getTipElement()),
            e = t.attr("class").match(be);
          null !== e && 0 < e.length && t.removeClass(e.join(""))
        }, i._jQueryInterface = function c(n) {
          return this.each(function () {
            var t = N(this).data(ve),
              e = "object" == typeof n ? n : null;
            if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), N(this).data(ve, t)), "string" == typeof n)) {
              if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
              t[n]()
            }
          })
        }, R(i, null, [{
          key: "VERSION",
          get: function u() {
            return ge
          }
        }, {
          key: "Default",
          get: function u() {
            return Se
          }
        }, {
          key: "NAME",
          get: function u() {
            return me
          }
        }, {
          key: "DATA_KEY",
          get: function u() {
            return ve
          }
        }, {
          key: "Event",
          get: function u() {
            return Ie
          }
        }, {
          key: "EVENT_KEY",
          get: function u() {
            return ye
          }
        }, {
          key: "DefaultType",
          get: function u() {
            return Te
          }
        }]), i
      }(pe);
    N.fn[me] = we._jQueryInterface, N.fn[me].Constructor = we, N.fn[me].noConflict = function () {
      return N.fn[me] = _e, we._jQueryInterface
    };
    var De = "scrollspy",
      Oe = "4.3.1",
      Le = "bs.scrollspy",
      Ne = "." + Le,
      ke = ".data-api",
      Re = N.fn[De],
      Pe = {
        offset: 10,
        method: "auto",
        target: ""
      },
      He = {
        offset: "number",
        method: "string",
        target: "(string|element)"
      },
      xe = {
        ACTIVATE: "activate" + Ne,
        SCROLL: "scroll" + Ne,
        LOAD_DATA_API: "load" + Ne + ke
      },
      Me = {
        DROPDOWN_ITEM: "dropdown-item",
        DROPDOWN_MENU: "dropdown-menu",
        ACTIVE: "active"
      },
      qe = {
        DATA_SPY: '[data-spy="scroll"]',
        ACTIVE: ".active",
        NAV_LIST_GROUP: ".nav, .list-group",
        NAV_LINKS: ".nav-link",
        NAV_ITEMS: ".nav-item",
        LIST_ITEMS: ".list-group-item",
        DROPDOWN: ".dropdown",
        DROPDOWN_ITEMS: ".dropdown-item",
        DROPDOWN_TOGGLE: ".dropdown-toggle"
      },
      We = {
        OFFSET: "offset",
        POSITION: "position"
      },
      je = function () {
        function n(t, e) {
          var n = this;
          this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + qe.NAV_LINKS + "," + this._config.target + " " + qe.LIST_ITEMS + "," + this._config.target + " " + qe.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, N(this._scrollElement).on(xe.SCROLL, function (t) {
            return n._process(t)
          }), this.refresh(), this._process()
        }
        var t = n.prototype;
        return t.refresh = function i() {
          var e = this,
            t = this._scrollElement === this._scrollElement.window ? We.OFFSET : We.POSITION,
            r = "auto" === this._config.method ? t : this._config.method,
            o = r === We.POSITION ? this._getScrollTop() : 0;
          this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
            var e, n = x.getSelectorFromElement(t);
            if (n && (e = document.querySelector(n)), e) {
              var i = e.getBoundingClientRect();
              if (i.width || i.height) return [N(e)[r]().top + o, n]
            }
            return null
          }).filter(function (t) {
            return t
          }).sort(function (t, e) {
            return t[0] - e[0]
          }).forEach(function (t) {
            e._offsets.push(t[0]), e._targets.push(t[1])
          })
        }, t.dispose = function e() {
          N.removeData(this._element, Le), N(this._scrollElement).off(Ne), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
        }, t._getConfig = function r(t) {
          if ("string" != typeof (t = P({}, Pe,
              "object" == typeof t && t ? t : {})).target) {
            var e = N(t.target).attr("id");
            e || (e = x.getUID(De), N(t.target).attr("id", e)), t.target = "#" + e
          }
          return x.typeCheckConfig(De, t, He), t
        }, t._getScrollTop = function o() {
          return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }, t._getScrollHeight = function s() {
          return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }, t._getOffsetHeight = function a() {
          return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }, t._process = function l() {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();
          if (this._scrollHeight !== e && this.refresh(), n <= t) {
            var i = this._targets[this._targets.length - 1];
            this._activeTarget !== i && this._activate(i)
          } else {
            if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
            for (var r = this._offsets.length; r--;) {
              this._activeTarget !== this._targets[r] && t >= this._offsets[r] && ("undefined" == typeof this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
            }
          }
        }, t._activate = function c(e) {
          this._activeTarget = e, this._clear();
          var t = this._selector.split(",").map(function (t) {
              return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
            }),
            n = N([].slice.call(document.querySelectorAll(t.join(","))));
          n.hasClass(Me.DROPDOWN_ITEM) ? (n.closest(qe.DROPDOWN).find(qe.DROPDOWN_TOGGLE).addClass(Me.ACTIVE), n.addClass(Me.ACTIVE)) : (n.addClass(Me.ACTIVE), n.parents(qe.NAV_LIST_GROUP).prev(qe.NAV_LINKS + ", " + qe.LIST_ITEMS).addClass(Me.ACTIVE), n.parents(qe.NAV_LIST_GROUP).prev(qe.NAV_ITEMS).children(qe.NAV_LINKS).addClass(Me.ACTIVE)), N(this._scrollElement).trigger(xe.ACTIVATE, {
            relatedTarget: e
          })
        }, t._clear = function u() {
          [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
            return t.classList.contains(Me.ACTIVE)
          }).forEach(function (t) {
            return t.classList.remove(Me.ACTIVE)
          })
        }, n._jQueryInterface = function h(e) {
          return this.each(function () {
            var t = N(this).data(Le);
            if (t || (t = new n(this, "object" == typeof e && e), N(this).data(Le, t)), "string" == typeof e) {
              if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
              t[e]()
            }
          })
        }, R(n, null, [{
          key: "VERSION",
          get: function d() {
            return Oe
          }
        }, {
          key: "Default",
          get: function d() {
            return Pe
          }
        }]), n
      }();
    N(window).on(xe.LOAD_DATA_API, function () {
      for (var t = [].slice.call(document.querySelectorAll(qe.DATA_SPY)), e = t.length; e--;) {
        var n = N(t[e]);
        je._jQueryInterface.call(n, n.data())
      }
    }), N.fn[De] = je._jQueryInterface, N.fn[De].Constructor = je, N.fn[De].noConflict = function () {
      return N.fn[De] = Re, je._jQueryInterface
    };
    var Fe = "tab",
      Be = "4.3.1",
      Ue = "bs.tab",
      Ve = "." + Ue,
      Ge = ".data-api",
      Ke = N.fn[Fe],
      Qe = {
        HIDE: "hide" + Ve,
        HIDDEN: "hidden" + Ve,
        SHOW: "show" + Ve,
        SHOWN: "shown" + Ve,
        CLICK_DATA_API: "click" + Ve + Ge
      },
      Xe = {
        DROPDOWN_MENU: "dropdown-menu",
        ACTIVE: "active",
        DISABLED: "disabled",
        FADE: "fade",
        SHOW: "show"
      },
      ze = {
        DROPDOWN: ".dropdown",
        NAV_LIST_GROUP: ".nav, .list-group",
        ACTIVE: ".active",
        ACTIVE_UL: "> li > .active",
        DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        DROPDOWN_TOGGLE: ".dropdown-toggle",
        DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
      },
      Ye = function () {
        function i(t) {
          this._element = t
        }
        var t = i.prototype;
        return t.show = function c() {
          var n = this;
          if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && N(this._element).hasClass(Xe.ACTIVE) || N(this._element).hasClass(Xe.DISABLED))) {
            var t, i, e = N(this._element).closest(ze.NAV_LIST_GROUP)[0],
              r = x.getSelectorFromElement(this._element);
            if (e) {
              var o = "UL" === e.nodeName || "OL" === e.nodeName ? ze.ACTIVE_UL : ze.ACTIVE;
              i = (i = N.makeArray(N(e).find(o)))[i.length - 1]
            }
            var s = N.Event(Qe.HIDE, {
                relatedTarget: this._element
              }),
              a = N.Event(Qe.SHOW, {
                relatedTarget: i
              });
            if (i && N(i).trigger(s), N(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
              r && (t = document.querySelector(r)), this._activate(this._element, e);
              var l = function l() {
                var t = N.Event(Qe.HIDDEN, {
                    relatedTarget: n._element
                  }),
                  e = N.Event(Qe.SHOWN, {
                    relatedTarget: i
                  });
                N(i).trigger(t), N(n._element).trigger(e)
              };
              t ? this._activate(t, t.parentNode, l) : l()
            }
          }
        }, t.dispose = function e() {
          N.removeData(this._element, Ue), this._element = null
        }, t._activate = function l(t, e, n) {
          var i = this,
            r = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? N(e).children(ze.ACTIVE) : N(e).find(ze.ACTIVE_UL))[0],
            o = n && r && N(r).hasClass(Xe.FADE),
            s = function s() {
              return i._transitionComplete(t, r, n)
            };
          if (r && o) {
            var a = x.getTransitionDurationFromElement(r);
            N(r).removeClass(Xe.SHOW).one(x.TRANSITION_END, s).emulateTransitionEnd(a)
          } else s()
        }, t._transitionComplete = function s(t, e, n) {
          if (e) {
            N(e).removeClass(Xe.ACTIVE);
            var i = N(e.parentNode).find(ze.DROPDOWN_ACTIVE_CHILD)[0];
            i && N(i).removeClass(Xe.ACTIVE), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
          }
          if (N(t).addClass(Xe.ACTIVE), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), x.reflow(t), t.classList.contains(Xe.FADE) && t.classList.add(Xe.SHOW), t.parentNode && N(t.parentNode).hasClass(Xe.DROPDOWN_MENU)) {
            var r = N(t).closest(ze.DROPDOWN)[0];
            if (r) {
              var o = [].slice.call(r.querySelectorAll(ze.DROPDOWN_TOGGLE));
              N(o).addClass(Xe.ACTIVE)
            }
            t.setAttribute("aria-expanded", !0)
          }
          n && n()
        }, i._jQueryInterface = function r(n) {
          return this.each(function () {
            var t = N(this),
              e = t.data(Ue);
            if (e || (e = new i(this), t.data(Ue, e)), "string" == typeof n) {
              if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
              e[n]()
            }
          })
        }, R(i, null, [{
          key: "VERSION",
          get: function n() {
            return Be
          }
        }]), i
      }();
    N(document).on(Qe.CLICK_DATA_API, ze.DATA_TOGGLE, function (t) {
      t.preventDefault(), Ye._jQueryInterface.call(N(this), "show")
    }), N.fn[Fe] = Ye._jQueryInterface, N.fn[Fe].Constructor = Ye, N.fn[Fe].noConflict = function () {
      return N.fn[Fe] = Ke, Ye._jQueryInterface
    };
    var Je = "toast",
      $e = "4.3.1",
      Ze = "bs.toast",
      tn = "." + Ze,
      en = N.fn[Je],
      nn = {
        CLICK_DISMISS: "click.dismiss" + tn,
        HIDE: "hide" + tn,
        HIDDEN: "hidden" + tn,
        SHOW: "show" + tn,
        SHOWN: "shown" + tn
      },
      rn = {
        FADE: "fade",
        HIDE: "hide",
        SHOW: "show",
        SHOWING: "showing"
      },
      on = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
      },
      sn = {
        animation: !0,
        autohide: !0,
        delay: 500
      },
      an = {
        DATA_DISMISS: '[data-dismiss="toast"]'
      },
      ln = function () {
        function i(t, e) {
          this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
        }
        var t = i.prototype;
        return t.show = function r() {
          var t = this;
          N(this._element).trigger(nn.SHOW), this._config.animation && this._element.classList.add(rn.FADE);
          var e = function e() {
            t._element.classList.remove(rn.SHOWING), t._element.classList.add(rn.SHOW), N(t._element).trigger(nn.SHOWN), t._config.autohide && t.hide()
          };
          if (this._element.classList.remove(rn.HIDE), this._element.classList.add(rn.SHOWING), this._config.animation) {
            var n = x.getTransitionDurationFromElement(this._element);
            N(this._element).one(x.TRANSITION_END, e).emulateTransitionEnd(n)
          } else e()
        }, t.hide = function n(t) {
          var e = this;
          this._element.classList.contains(rn.SHOW) && (N(this._element).trigger(nn.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
            e._close()
          }, this._config.delay))
        }, t.dispose = function e() {
          clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(rn.SHOW) && this._element.classList.remove(rn.SHOW), N(this._element).off(nn.CLICK_DISMISS), N.removeData(this._element, Ze), this._element = null, this._config = null
        }, t._getConfig = function o(t) {
          return t = P({}, sn, N(this._element).data(), "object" == typeof t && t ? t : {}), x.typeCheckConfig(Je, t, this.constructor.DefaultType), t
        }, t._setListeners = function s() {
          var t = this;
          N(this._element).on(nn.CLICK_DISMISS, an.DATA_DISMISS, function () {
            return t.hide(!0)
          })
        }, t._close = function a() {
          var t = this,
            e = function e() {
              t._element.classList.add(rn.HIDE), N(t._element).trigger(nn.HIDDEN)
            };
          if (this._element.classList.remove(rn.SHOW), this._config.animation) {
            var n = x.getTransitionDurationFromElement(this._element);
            N(this._element).one(x.TRANSITION_END, e).emulateTransitionEnd(n)
          } else e()
        }, i._jQueryInterface = function l(n) {
          return this.each(function () {
            var t = N(this),
              e = t.data(Ze);
            if (e || (e = new i(this, "object" == typeof n && n), t.data(Ze, e)), "string" == typeof n) {
              if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
              e[n](this)
            }
          })
        }, R(i, null, [{
          key: "VERSION",
          get: function c() {
            return $e
          }
        }, {
          key: "DefaultType",
          get: function c() {
            return on
          }
        }, {
          key: "Default",
          get: function c() {
            return sn
          }
        }]), i
      }();
    N.fn[Je] = ln._jQueryInterface, N.fn[Je].Constructor = ln, N.fn[Je].noConflict = function () {
        return N.fn[Je] = en, ln._jQueryInterface
      },
      function () {
        if (void 0 === N) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var t = N.fn.jquery.split(" ")[0].split("."),
          e = 1,
          n = 2,
          i = 9,
          r = 1,
          o = 4;
        if (t[0] < n && t[1] < i || t[0] === e && t[1] === i && t[2] < r || t[0] >= o) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
      }(), t.Util = x, t.Alert = b, t.Button = M, t.Carousel = et, t.Collapse = pt, t.Dropdown = Pt, t.Modal = Qt, t.Popover = we, t.Scrollspy = je, t.Tab = Ye, t.Toast = ln, t.Tooltip = pe, Object.defineProperty(t, "__esModule", {
        value: !0
      })
  }),
  function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.ActiveStorage = {})
  }(this, function (t) {
    "use strict";

    function e(t, e) {
      return t(e = {
        exports: {}
      }, e.exports), e.exports
    }

    function s(t) {
      var e = i(document.head, 'meta[name="' + t + '"]');
      if (e) return e.getAttribute("content")
    }

    function r(t, e) {
      return "string" == typeof t && (e = t, t = document), o(t.querySelectorAll(e))
    }

    function i(t, e) {
      return "string" == typeof t && (e = t, t = document), t.querySelector(e)
    }

    function l(t, e, n) {
      var i = 2 < arguments.length && n !== undefined ? arguments[2] : {},
        r = t.disabled,
        o = i.bubbles,
        s = i.cancelable,
        a = i.detail,
        l = document.createEvent("Event");
      l.initEvent(e, o || !0, s || !0), l.detail = a || {};
      try {
        t.disabled = !1, t.dispatchEvent(l)
      } finally {
        t.disabled = r
      }
      return l
    }

    function o(t) {
      return Array.isArray(t) ? t : Array.from ? Array.from(t) : [].slice.call(t)
    }

    function a(t, e) {
      if (t && "function" == typeof t[e]) {
        for (var n = arguments.length, i = Array(2 < n ? n - 2 : 0), r = 2; r < n; r++) i[r - 2] = arguments[r];
        return t[e].apply(t, i)
      }
    }

    function n() {
      N || (N = !0, document.addEventListener("click", c, !0), document.addEventListener("submit", u), document.addEventListener("ajax:before", h))
    }

    function c(t) {
      var e = t.target;
      "INPUT" != e.tagName && "BUTTON" != e.tagName || "submit" != e.type || !e.form || L.set(e.form, e)
    }

    function u(t) {
      d(t)
    }

    function h(t) {
      "FORM" == t.target.tagName && d(t)
    }

    function d(t) {
      var e = t.target;
      if (e.hasAttribute(O)) t.preventDefault();
      else {
        var n = new D(e),
          i = n.inputs;
        i.length && (t.preventDefault(), e.setAttribute(O, ""), i.forEach(p), n.start(function (t) {
          e.removeAttribute(O), t ? i.forEach(m) : f(e)
        }))
      }
    }

    function f(t) {
      var e = L.get(t) || i(t, "input[type=submit], button[type=submit]");
      if (e) {
        var n = e.disabled;
        e.disabled = !1, e.focus(), e.click(), e.disabled = n
      } else(e = document.createElement("input")).type = "submit", e.style.display = "none", t.appendChild(e), e.click(), t.removeChild(e);
      L["delete"](t)
    }

    function p(t) {
      t.disabled = !0
    }

    function m(t) {
      t.disabled = !1
    }

    function g() {
      window.ActiveStorage && n()
    }
    var v = e(function (t) {
        var e;
        e = function (u) {
          function c(t, e) {
            var n = t[0],
              i = t[1],
              r = t[2],
              o = t[3];
            i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & r | ~i & o) + e[0] - 680876936 | 0) << 7 | n >>> 25) + i | 0) & i | ~n & r) + e[1] - 389564586 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & i) + e[2] + 606105819 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & n) + e[3] - 1044525330 | 0) << 22 | i >>> 10) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & r | ~i & o) + e[4] - 176418897 | 0) << 7 | n >>> 25) + i | 0) & i | ~n & r) + e[5] + 1200080426 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & i) + e[6] - 1473231341 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & n) + e[7] - 45705983 | 0) << 22 | i >>> 10) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & r | ~i & o) + e[8] + 1770035416 | 0) << 7 | n >>> 25) + i | 0) & i | ~n & r) + e[9] - 1958414417 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & i) + e[10] - 42063 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & n) + e[11] - 1990404162 | 0) << 22 | i >>> 10) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & r | ~i & o) + e[12] + 1804603682 | 0) << 7 | n >>> 25) + i | 0) & i | ~n & r) + e[13] - 40341101 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & i) + e[14] - 1502002290 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & n) + e[15] + 1236535329 | 0) << 22 | i >>> 10) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & o | r & ~o) + e[1] - 165796510 | 0) << 5 | n >>> 27) + i | 0) & r | i & ~r) + e[6] - 1069501632 | 0) << 9 | o >>> 23) + n | 0) & i | n & ~i) + e[11] + 643717713 | 0) << 14 | r >>> 18) + o | 0) & n | o & ~n) + e[0] - 373897302 | 0) << 20 | i >>> 12) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & o | r & ~o) + e[5] - 701558691 | 0) << 5 | n >>> 27) + i | 0) & r | i & ~r) + e[10] + 38016083 | 0) << 9 | o >>> 23) + n | 0) & i | n & ~i) + e[15] - 660478335 | 0) << 14 | r >>> 18) + o | 0) & n | o & ~n) + e[4] - 405537848 | 0) << 20 | i >>> 12) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & o | r & ~o) + e[9] + 568446438 | 0) << 5 | n >>> 27) + i | 0) & r | i & ~r) + e[14] - 1019803690 | 0) << 9 | o >>> 23) + n | 0) & i | n & ~i) + e[3] - 187363961 | 0) << 14 | r >>> 18) + o | 0) & n | o & ~n) + e[8] + 1163531501 | 0) << 20 | i >>> 12) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i & o | r & ~o) + e[13] - 1444681467 | 0) << 5 | n >>> 27) + i | 0) & r | i & ~r) + e[2] - 51403784 | 0) << 9 | o >>> 23) + n | 0) & i | n & ~i) + e[7] + 1735328473 | 0) << 14 | r >>> 18) + o | 0) & n | o & ~n) + e[12] - 1926607734 | 0) << 20 | i >>> 12) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i ^ r ^ o) + e[5] - 378558 | 0) << 4 | n >>> 28) + i | 0) ^ i ^ r) + e[8] - 2022574463 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ i) + e[11] + 1839030562 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ n) + e[14] - 35309556 | 0) << 23 | i >>> 9) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i ^ r ^ o) + e[1] - 1530992060 | 0) << 4 | n >>> 28) + i | 0) ^ i ^ r) + e[4] + 1272893353 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ i) + e[7] - 155497632 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ n) + e[10] - 1094730640 | 0) << 23 | i >>> 9) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i ^ r ^ o) + e[13] + 681279174 | 0) << 4 | n >>> 28) + i | 0) ^ i ^ r) + e[0] - 358537222 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ i) + e[3] - 722521979 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ n) + e[6] + 76029189 | 0) << 23 | i >>> 9) + r | 0, i = ((i += ((r = ((r += ((o = ((o += ((n = ((n += (i ^ r ^ o) + e[9] - 640364487 | 0) << 4 | n >>> 28) + i | 0) ^ i ^ r) + e[12] - 421815835 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ i) + e[15] + 530742520 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ n) + e[2] - 995338651 | 0) << 23 | i >>> 9) + r | 0, i = ((i += ((o = ((o += (i ^ ((n = ((n += (r ^ (i | ~o)) + e[0] - 198630844 | 0) << 6 | n >>> 26) + i | 0) | ~r)) + e[7] + 1126891415 | 0) << 10 | o >>> 22) + n | 0) ^ ((r = ((r += (n ^ (o | ~i)) + e[14] - 1416354905 | 0) << 15 | r >>> 17) + o | 0) | ~n)) + e[5] - 57434055 | 0) << 21 | i >>> 11) + r | 0, i = ((i += ((o = ((o += (i ^ ((n = ((n += (r ^ (i | ~o)) + e[12] + 1700485571 | 0) << 6 | n >>> 26) + i | 0) | ~r)) + e[3] - 1894986606 | 0) << 10 | o >>> 22) + n | 0) ^ ((r = ((r += (n ^ (o | ~i)) + e[10] - 1051523 | 0) << 15 | r >>> 17) + o | 0) | ~n)) + e[1] - 2054922799 | 0) << 21 | i >>> 11) + r | 0, i = ((i += ((o = ((o += (i ^ ((n = ((n += (r ^ (i | ~o)) + e[8] + 1873313359 | 0) << 6 | n >>> 26) + i | 0) | ~r)) + e[15] - 30611744 | 0) << 10 | o >>> 22) + n | 0) ^ ((r = ((r += (n ^ (o | ~i)) + e[6] - 1560198380 | 0) << 15 | r >>> 17) + o | 0) | ~n)) + e[13] + 1309151649 | 0) << 21 | i >>> 11) + r | 0, i = ((i += ((o = ((o += (i ^ ((n = ((n += (r ^ (i | ~o)) + e[4] - 145523070 | 0) << 6 | n >>> 26) + i | 0) | ~r)) + e[11] - 1120210379 | 0) << 10 | o >>> 22) + n | 0) ^ ((r = ((r += (n ^ (o | ~i)) + e[2] + 718787259 | 0) << 15 | r >>> 17) + o | 0) | ~n)) + e[9] - 343485551 | 0) << 21 | i >>> 11) + r | 0, t[0] = n + t[0] | 0, t[1] = i + t[1] | 0, t[2] = r + t[2] | 0, t[3] = o + t[3] | 0
          }

          function h(t) {
            var e, n = [];
            for (e = 0; e < 64; e += 4) n[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
            return n
          }

          function d(t) {
            var e, n = [];
            for (e = 0; e < 64; e += 4) n[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
            return n
          }

          function i(t) {
            var e, n, i, r, o, s, a = t.length,
              l = [1732584193, -271733879, -1732584194, 271733878];
            for (e = 64; e <= a; e += 64) c(l, h(t.substring(e - 64, e)));
            for (n = (t = t.substring(e - 64)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < n; e += 1) i[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
            if (i[e >> 2] |= 128 << (e % 4 << 3), 55 < e)
              for (c(l, i), e = 0; e < 16; e += 1) i[e] = 0;
            return r = (r = 8 * a).toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(r[2], 16), s = parseInt(r[1], 16) || 0, i[14] = o, i[15] = s, c(l, i), l
          }

          function r(t) {
            var e, n, i, r, o, s, a = t.length,
              l = [1732584193, -271733879, -1732584194, 271733878];
            for (e = 64; e <= a; e += 64) c(l, d(t.subarray(e - 64, e)));
            for (n = (t = e - 64 < a ? t.subarray(e - 64) : new Uint8Array(0)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < n; e += 1) i[e >> 2] |= t[e] << (e % 4 << 3);
            if (i[e >> 2] |= 128 << (e % 4 << 3), 55 < e)
              for (c(l, i), e = 0; e < 16; e += 1) i[e] = 0;
            return r = (r = 8 * a).toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(r[2], 16), s = parseInt(r[1], 16) || 0, i[14] = o, i[15] = s, c(l, i), l
          }

          function n(t) {
            var e, n = "";
            for (e = 0; e < 4; e += 1) n += m[t >> 8 * e + 4 & 15] + m[t >> 8 * e & 15];
            return n
          }

          function s(t) {
            var e;
            for (e = 0; e < t.length; e += 1) t[e] = n(t[e]);
            return t.join("")
          }

          function o(t) {
            return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))), t
          }

          function e(t, e) {
            var n, i = t.length,
              r = new ArrayBuffer(i),
              o = new Uint8Array(r);
            for (n = 0; n < i; n += 1) o[n] = t.charCodeAt(n);
            return e ? o : r
          }

          function a(t) {
            return String.fromCharCode.apply(null, new Uint8Array(t))
          }

          function l(t, e, n) {
            var i = new Uint8Array(t.byteLength + e.byteLength);
            return i.set(new Uint8Array(t)), i.set(new Uint8Array(e), t.byteLength), n ? i : i.buffer
          }

          function f(t) {
            var e, n = [],
              i = t.length;
            for (e = 0; e < i - 1; e += 2) n.push(parseInt(t.substr(e, 2), 16));
            return String.fromCharCode.apply(String, n)
          }

          function p() {
            this.reset()
          }
          var m = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
          return s(i("hello")), "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function () {
            function c(t, e) {
              return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
            }
            ArrayBuffer.prototype.slice = function (t, e) {
              var n, i, r, o, s = this.byteLength,
                a = c(t, s),
                l = s;
              return e !== u && (l = c(e, s)), l < a ? new ArrayBuffer(0) : (n = l - a, i = new ArrayBuffer(n), r = new Uint8Array(i), o = new Uint8Array(this, a, n), r.set(o), i)
            }
          }(), p.prototype.append = function (t) {
            return this.appendBinary(o(t)), this
          }, p.prototype.appendBinary = function (t) {
            this._buff += t, this._length += t.length;
            var e, n = this._buff.length;
            for (e = 64; e <= n; e += 64) c(this._hash, h(this._buff.substring(e - 64, e)));
            return this._buff = this._buff.substring(e - 64), this
          }, p.prototype.end = function (t) {
            var e, n, i = this._buff,
              r = i.length,
              o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < r; e += 1) o[e >> 2] |= i.charCodeAt(e) << (e % 4 << 3);
            return this._finish(o, r), n = s(this._hash), t && (n = f(n)), this.reset(), n
          }, p.prototype.reset = function () {
            return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
          }, p.prototype.getState = function () {
            return {
              buff: this._buff,
              length: this._length,
              hash: this._hash
            }
          }, p.prototype.setState = function (t) {
            return this._buff = t.buff, this._length = t.length, this._hash = t.hash, this
          }, p.prototype.destroy = function () {
            delete this._hash, delete this._buff, delete this._length
          }, p.prototype._finish = function (t, e) {
            var n, i, r, o = e;
            if (t[o >> 2] |= 128 << (o % 4 << 3), 55 < o)
              for (c(this._hash, t), o = 0; o < 16; o += 1) t[o] = 0;
            n = (n = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), i = parseInt(n[2], 16), r = parseInt(n[1], 16) || 0, t[14] = i, t[15] = r, c(this._hash, t)
          }, p.hash = function (t, e) {
            return p.hashBinary(o(t), e)
          }, p.hashBinary = function (t, e) {
            var n = s(i(t));
            return e ? f(n) : n
          }, p.ArrayBuffer = function () {
            this.reset()
          }, p.ArrayBuffer.prototype.append = function (t) {
            var e, n = l(this._buff.buffer, t, !0),
              i = n.length;
            for (this._length += t.byteLength, e = 64; e <= i; e += 64) c(this._hash, d(n.subarray(e - 64, e)));
            return this._buff = e - 64 < i ? new Uint8Array(n.buffer.slice(e - 64)) : new Uint8Array(0), this
          }, p.ArrayBuffer.prototype.end = function (t) {
            var e, n, i = this._buff,
              r = i.length,
              o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < r; e += 1) o[e >> 2] |= i[e] << (e % 4 << 3);
            return this._finish(o, r), n = s(this._hash), t && (n = f(n)), this.reset(), n
          }, p.ArrayBuffer.prototype.reset = function () {
            return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
          }, p.ArrayBuffer.prototype.getState = function () {
            var t = p.prototype.getState.call(this);
            return t.buff = a(t.buff), t
          }, p.ArrayBuffer.prototype.setState = function (t) {
            return t.buff = e(t.buff, !0), p.prototype.setState.call(this, t)
          }, p.ArrayBuffer.prototype.destroy = p.prototype.destroy, p.ArrayBuffer.prototype._finish = p.prototype._finish, p.ArrayBuffer.hash = function (t, e) {
            var n = s(r(new Uint8Array(t)));
            return e ? f(n) : n
          }, p
        }, t.exports = e()
      }),
      y = function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
      },
      _ = function () {
        function i(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function (t, e, n) {
          return e && i(t.prototype, e), n && i(t, n), t
        }
      }(),
      E = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      b = function () {
        function n(t) {
          y(this, n), this.file = t, this.chunkSize = 2097152, this.chunkCount = Math.ceil(this.file.size / this.chunkSize), this.chunkIndex = 0
        }
        return _(n, null, [{
          key: "create",
          value: function i(t, e) {
            new n(t).create(e)
          }
        }]), _(n, [{
          key: "create",
          value: function i(t) {
            var e = this;
            this.callback = t, this.md5Buffer = new v.ArrayBuffer, this.fileReader = new FileReader, this.fileReader.addEventListener("load", function (t) {
              return e.fileReaderDidLoad(t)
            }), this.fileReader.addEventListener("error", function (t) {
              return e.fileReaderDidError(t)
            }), this.readNextChunk()
          }
        }, {
          key: "fileReaderDidLoad",
          value: function r(t) {
            if (this.md5Buffer.append(t.target.result), !this.readNextChunk()) {
              var e = this.md5Buffer.end(!0),
                n = btoa(e);
              this.callback(null, n)
            }
          }
        }, {
          key: "fileReaderDidError",
          value: function t() {
            this.callback("Error reading " + this.file.name)
          }
        }, {
          key: "readNextChunk",
          value: function o() {
            if (this.chunkIndex < this.chunkCount || 0 == this.chunkIndex && 0 == this.chunkCount) {
              var t = this.chunkIndex * this.chunkSize,
                e = Math.min(t + this.chunkSize, this.file.size),
                n = E.call(this.file, t, e);
              return this.fileReader.readAsArrayBuffer(n), this.chunkIndex++, !0
            }
            return !1
          }
        }]), n
      }(),
      S = function () {
        function r(t, e, n) {
          var i = this;
          y(this, r), this.file = t, this.attributes = {
            filename: t.name,
            content_type: t.type,
            byte_size: t.size,
            checksum: e
          }, this.xhr = new XMLHttpRequest, this.xhr.open("POST", n, !0), this.xhr.responseType = "json", this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.setRequestHeader("Accept", "application/json"), this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xhr.setRequestHeader("X-CSRF-Token", s("csrf-token")), this.xhr.addEventListener("load", function (t) {
            return i.requestDidLoad(t)
          }), this.xhr.addEventListener("error", function (t) {
            return i.requestDidError(t)
          })
        }
        return _(r, [{
          key: "create",
          value: function e(t) {
            this.callback = t, this.xhr.send(JSON.stringify({
              blob: this.attributes
            }))
          }
        }, {
          key: "requestDidLoad",
          value: function i(t) {
            if (200 <= this.status && this.status < 300) {
              var e = this.response,
                n = e.direct_upload;
              delete e.direct_upload, this.attributes = e, this.directUploadData = n, this.callback(null, this.toJSON())
            } else this.requestDidError(t)
          }
        }, {
          key: "requestDidError",
          value: function t() {
            this.callback('Error creating Blob for "' + this.file.name + '". Status: ' + this.status)
          }
        }, {
          key: "toJSON",
          value: function n() {
            var t = {};
            for (var e in this.attributes) t[e] = this.attributes[e];
            return t
          }
        }, {
          key: "status",
          get: function o() {
            return this.xhr.status
          }
        }, {
          key: "response",
          get: function o() {
            var t = this.xhr,
              e = t.responseType,
              n = t.response;
            return "json" == e ? n : JSON.parse(n)
          }
        }]), r
      }(),
      T = function () {
        function s(t) {
          var e = this;
          y(this, s), this.blob = t, this.file = t.file;
          var n = t.directUploadData,
            i = n.url,
            r = n.headers;
          for (var o in this.xhr = new XMLHttpRequest, this.xhr.open("PUT", i, !0), this.xhr.responseType = "text", r) this.xhr.setRequestHeader(o, r[o]);
          this.xhr.addEventListener("load", function (t) {
            return e.requestDidLoad(t)
          }), this.xhr.addEventListener("error", function (t) {
            return e.requestDidError(t)
          })
        }
        return _(s, [{
          key: "create",
          value: function e(t) {
            this.callback = t, this.xhr.send(this.file.slice())
          }
        }, {
          key: "requestDidLoad",
          value: function r(t) {
            var e = this.xhr,
              n = e.status,
              i = e.response;
            200 <= n && n < 300 ? this.callback(null, i) : this.requestDidError(t)
          }
        }, {
          key: "requestDidError",
          value: function t() {
            this.callback('Error storing "' + this.file.name + '". Status: ' + this.xhr.status)
          }
        }]), s
      }(),
      A = 0,
      C = function () {
        function i(t, e, n) {
          y(this, i), this.id = ++A, this.file = t, this.url = e, this.delegate = n
        }
        return _(i, [{
          key: "create",
          value: function t(i) {
            var r = this;
            b.create(this.file, function (t, e) {
              if (t) i(t);
              else {
                var n = new S(r.file, e, r.url);
                a(r.delegate, "directUploadWillCreateBlobWithXHR", n.xhr), n.create(function (t) {
                  if (t) i(t);
                  else {
                    var e = new T(n);
                    a(r.delegate, "directUploadWillStoreFileWithXHR", e.xhr), e.create(function (t) {
                      t ? i(t) : i(null, n.toJSON())
                    })
                  }
                })
              }
            })
          }
        }]), i
      }(),
      I = function () {
        function n(t, e) {
          y(this, n), this.input = t, this.file = e, this.directUpload = new C(this.file, this.url, this), this.dispatch("initialize")
        }
        return _(n, [{
          key: "start",
          value: function t(n) {
            var i = this,
              r = document.createElement("input");
            r.type = "hidden", r.name = this.input.name, this.input.insertAdjacentElement("beforebegin", r), this.dispatch("start"), this.directUpload.create(function (t, e) {
              t ? (r.parentNode.removeChild(r), i.dispatchError(t)) : r.value = e.signed_id, i.dispatch("end"), n(t)
            })
          }
        }, {
          key: "uploadRequestDidProgress",
          value: function i(t) {
            var e = t.loaded / t.total * 100;
            e && this.dispatch("progress", {
              progress: e
            })
          }
        }, {
          key: "dispatch",
          value: function r(t, e) {
            var n = 1 < arguments.length && e !== undefined ? arguments[1] : {};
            return n.file = this.file, n.id = this.directUpload.id, l(this.input, "direct-upload:" + t, {
              detail: n
            })
          }
        }, {
          key: "dispatchError",
          value: function e(t) {
            this.dispatch("error", {
              error: t
            }).defaultPrevented || alert(t)
          }
        }, {
          key: "directUploadWillCreateBlobWithXHR",
          value: function o(t) {
            this.dispatch("before-blob-request", {
              xhr: t
            })
          }
        }, {
          key: "directUploadWillStoreFileWithXHR",
          value: function s(t) {
            var e = this;
            this.dispatch("before-storage-request", {
              xhr: t
            }), t.upload.addEventListener("progress", function (t) {
              return e.uploadRequestDidProgress(t)
            })
          }
        }, {
          key: "url",
          get: function a() {
            return this.input.getAttribute("data-direct-upload-url")
          }
        }]), n
      }(),
      w = "input[type=file][data-direct-upload-url]:not([disabled])",
      D = function () {
        function e(t) {
          y(this, e), this.form = t, this.inputs = r(t, w).filter(function (t) {
            return t.files.length
          })
        }
        return _(e, [{
          key: "start",
          value: function t(e) {
            var n = this,
              i = this.createDirectUploadControllers(),
              r = function r() {
                var t = i.shift();
                t ? t.start(function (t) {
                  t ? (e(t), n.dispatch("end")) : r()
                }) : (e(), n.dispatch("end"))
              };
            this.dispatch("start"), r()
          }
        }, {
          key: "createDirectUploadControllers",
          value: function n() {
            var i = [];
            return this.inputs.forEach(function (n) {
              o(n.files).forEach(function (t) {
                var e = new I(n, t);
                i.push(e)
              })
            }), i
          }
        }, {
          key: "dispatch",
          value: function i(t, e) {
            var n = 1 < arguments.length && e !== undefined ? arguments[1] : {};
            return l(this.form, "direct-uploads:" + t, {
              detail: n
            })
          }
        }]), e
      }(),
      O = "data-direct-uploads-processing",
      L = new WeakMap,
      N = !1;
    setTimeout(g, 1), t.start = n, t.DirectUpload = C, Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }),
  function () {
    var t = this;
    (function () {
      (function () {
        this.Turbolinks = {
          supported: null != window.history.pushState && null != window.requestAnimationFrame && null != window.addEventListener,
          visit: function (t, e) {
            return u.controller.visit(t, e)
          },
          clearCache: function () {
            return u.controller.clearCache()
          },
          setProgressBarDelay: function (t) {
            return u.controller.setProgressBarDelay(t)
          }
        }
      }).call(this)
    }).call(t);
    var u = t.Turbolinks;
    (function () {
      (function () {
        var n, i, l, t, e, r, o, s, a, c = [].slice;
        u.copyObject = function (t) {
          var e, n, i;
          for (e in n = {}, t) i = t[e], n[e] = i;
          return n
        }, u.closest = function (t, e) {
          return n.call(t, e)
        }, n = null != (a = document.documentElement.closest) ? a : function (t) {
          var e;
          for (e = this; e;) {
            if (e.nodeType === Node.ELEMENT_NODE && i.call(e, t)) return e;
            e = e.parentNode
          }
        }, u.defer = function (t) {
          return setTimeout(t, 1)
        }, u.throttle = function (n) {
          var i;
          return i = null,
            function () {
              var t, e;
              return t = 1 <= arguments.length ? c.call(arguments, 0) : [], null != i ? i : i = requestAnimationFrame((e = this, function () {
                return i = null, n.apply(e, t)
              }))
            }
        }, u.dispatch = function (t, e) {
          var n, i, r, o, s, a;
          return a = (s = null != e ? e : {}).target, n = s.cancelable, i = s.data, (r = document.createEvent("Events")).initEvent(t, !0, !0 === n), r.data = null != i ? i : {}, r.cancelable && !l && (o = r.preventDefault, r.preventDefault = function () {
            return this.defaultPrevented || Object.defineProperty(this, "defaultPrevented", {
              get: function () {
                return !0
              }
            }), o.call(this)
          }), (null != a ? a : document).dispatchEvent(r), r
        }, (s = document.createEvent("Events")).initEvent("test", !0, !0), s.preventDefault(), l = s.defaultPrevented, u.match = function (t, e) {
          return i.call(t, e)
        }, i = null != (e = null != (r = null != (o = (t = document.documentElement).matchesSelector) ? o : t.webkitMatchesSelector) ? r : t.msMatchesSelector) ? e : t.mozMatchesSelector, u.uuid = function () {
          var t, e, n;
          for (n = "", t = e = 1; e <= 36; t = ++e) n += 9 === t || 14 === t || 19 === t || 24 === t ? "-" : 15 === t ? "4" : 20 === t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16);
          return n
        }
      }).call(this),
        function () {
          u.Location = function () {
            function t(t) {
              var e, n;
              null == t && (t = ""), (n = document.createElement("a")).href = t.toString(), this.absoluteURL = n.href, (e = n.hash.length) < 2 ? this.requestURL = this.absoluteURL : (this.requestURL = this.absoluteURL.slice(0, -e), this.anchor = n.hash.slice(1))
            }
            var e, n, i, r;
            return t.wrap = function (t) {
              return t instanceof this ? t : new this(t)
            }, t.prototype.getOrigin = function () {
              return this.absoluteURL.split("/", 3).join("/")
            }, t.prototype.getPath = function () {
              var t, e;
              return null != (t = null != (e = this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/)) ? e[1] : void 0) ? t : "/"
            }, t.prototype.getPathComponents = function () {
              return this.getPath().split("/").slice(1)
            }, t.prototype.getLastPathComponent = function () {
              return this.getPathComponents().slice(-1)[0]
            }, t.prototype.getExtension = function () {
              var t, e;
              return null != (t = null != (e = this.getLastPathComponent().match(/\.[^.]*$/)) ? e[0] : void 0) ? t : ""
            }, t.prototype.isHTML = function () {
              return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)
            }, t.prototype.isPrefixedBy = function (t) {
              var e;
              return e = n(t), this.isEqualTo(t) || r(this.absoluteURL, e)
            }, t.prototype.isEqualTo = function (t) {
              return this.absoluteURL === (null != t ? t.absoluteURL : void 0)
            }, t.prototype.toCacheKey = function () {
              return this.requestURL
            }, t.prototype.toJSON = function () {
              return this.absoluteURL
            }, t.prototype.toString = function () {
              return this.absoluteURL
            }, t.prototype.valueOf = function () {
              return this.absoluteURL
            }, n = function (t) {
              return e(t.getOrigin() + t.getPath())
            }, e = function (t) {
              return i(t, "/") ? t : t + "/"
            }, r = function (t, e) {
              return t.slice(0, e.length) === e
            }, i = function (t, e) {
              return t.slice(-e.length) === e
            }, t
          }()
        }.call(this),
        function () {
          var i = function (t, e) {
            return function () {
              return t.apply(e, arguments)
            }
          };
          u.HttpRequest = function () {
            function t(t, e, n) {
              this.delegate = t, this.requestCanceled = i(this.requestCanceled, this), this.requestTimedOut = i(this.requestTimedOut, this), this.requestFailed = i(this.requestFailed, this), this.requestLoaded = i(this.requestLoaded, this), this.requestProgressed = i(this.requestProgressed, this), this.url = u.Location.wrap(e).requestURL, this.referrer = u.Location.wrap(n).absoluteURL, this.createXHR()
            }
            return t.NETWORK_FAILURE = 0, t.TIMEOUT_FAILURE = -1, t.timeout = 60, t.prototype.send = function () {
              var t;
              return this.xhr && !this.sent ? (this.notifyApplicationBeforeRequestStart(), this.setProgress(0), this.xhr.send(), this.sent = !0, "function" == typeof (t = this.delegate).requestStarted ? t.requestStarted() : void 0) : void 0
            }, t.prototype.cancel = function () {
              return this.xhr && this.sent ? this.xhr.abort() : void 0
            }, t.prototype.requestProgressed = function (t) {
              return t.lengthComputable ? this.setProgress(t.loaded / t.total) : void 0
            }, t.prototype.requestLoaded = function () {
              return this.endRequest((e = this, function () {
                var t;
                return 200 <= (t = e.xhr.status) && t < 300 ? e.delegate.requestCompletedWithResponse(e.xhr.responseText, e.xhr.getResponseHeader("Turbolinks-Location")) : (e.failed = !0, e.delegate.requestFailedWithStatusCode(e.xhr.status, e.xhr.responseText))
              }));
              var e
            }, t.prototype.requestFailed = function () {
              return this.endRequest((t = this, function () {
                return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)
              }));
              var t
            }, t.prototype.requestTimedOut = function () {
              return this.endRequest((t = this, function () {
                return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)
              }));
              var t
            }, t.prototype.requestCanceled = function () {
              return this.endRequest()
            }, t.prototype.notifyApplicationBeforeRequestStart = function () {
              return u.dispatch("turbolinks:request-start", {
                data: {
                  url: this.url,
                  xhr: this.xhr
                }
              })
            }, t.prototype.notifyApplicationAfterRequestEnd = function () {
              return u.dispatch("turbolinks:request-end", {
                data: {
                  url: this.url,
                  xhr: this.xhr
                }
              })
            }, t.prototype.createXHR = function () {
              return this.xhr = new XMLHttpRequest, this.xhr.open("GET", this.url, !0), this.xhr.timeout = 1e3 * this.constructor.timeout, this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml"), this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer), this.xhr.onprogress = this.requestProgressed, this.xhr.onload = this.requestLoaded, this.xhr.onerror = this.requestFailed, this.xhr.ontimeout = this.requestTimedOut, this.xhr.onabort = this.requestCanceled
            }, t.prototype.endRequest = function (t) {
              return this.xhr ? (this.notifyApplicationAfterRequestEnd(), null != t && t.call(this), this.destroy()) : void 0
            }, t.prototype.setProgress = function (t) {
              var e;
              return this.progress = t, "function" == typeof (e = this.delegate).requestProgressed ? e.requestProgressed(this.progress) : void 0
            }, t.prototype.destroy = function () {
              var t;
              return this.setProgress(1), "function" == typeof (t = this.delegate).requestFinished && t.requestFinished(), this.delegate = null, this.xhr = null
            }, t
          }()
        }.call(this),
        function () {
          var n = function (t, e) {
            return function () {
              return t.apply(e, arguments)
            }
          };
          u.ProgressBar = function () {
            function t() {
              this.trickle = n(this.trickle, this), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement()
            }
            var e;
            return e = 300, t.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + e + "ms ease-out, opacity " + e / 2 + "ms " + e / 2 + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}", t.prototype.show = function () {
              return this.visible ? void 0 : (this.visible = !0, this.installStylesheetElement(), this.installProgressElement(), this.startTrickling())
            }, t.prototype.hide = function () {
              return this.visible && !this.hiding ? (this.hiding = !0, this.fadeProgressElement((t = this, function () {
                return t.uninstallProgressElement(), t.stopTrickling(), t.visible = !1, t.hiding = !1
              }))) : void 0;
              var t
            }, t.prototype.setValue = function (t) {
              return this.value = t, this.refresh()
            }, t.prototype.installStylesheetElement = function () {
              return document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
            }, t.prototype.installProgressElement = function () {
              return this.progressElement.style.width = 0, this.progressElement.style.opacity = 1, document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
            }, t.prototype.fadeProgressElement = function (t) {
              return this.progressElement.style.opacity = 0, setTimeout(t, 1.5 * e)
            }, t.prototype.uninstallProgressElement = function () {
              return this.progressElement.parentNode ? document.documentElement.removeChild(this.progressElement) : void 0
            }, t.prototype.startTrickling = function () {
              return null != this.trickleInterval ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, e)
            }, t.prototype.stopTrickling = function () {
              return clearInterval(this.trickleInterval), this.trickleInterval = null
            }, t.prototype.trickle = function () {
              return this.setValue(this.value + Math.random() / 100)
            }, t.prototype.refresh = function () {
              return requestAnimationFrame((t = this, function () {
                return t.progressElement.style.width = 10 + 90 * t.value + "%"
              }));
              var t
            }, t.prototype.createStylesheetElement = function () {
              var t;
              return (t = document.createElement("style")).type = "text/css", t.textContent = this.constructor.defaultCSS, t
            }, t.prototype.createProgressElement = function () {
              var t;
              return (t = document.createElement("div")).className = "turbolinks-progress-bar", t
            }, t
          }()
        }.call(this),
        function () {
          var r = function (t, e) {
            return function () {
              return t.apply(e, arguments)
            }
          };
          u.BrowserAdapter = function () {
            function t(t) {
              this.controller = t, this.showProgressBar = r(this.showProgressBar, this), this.progressBar = new u.ProgressBar
            }
            var n, i, e;
            return e = u.HttpRequest, n = e.NETWORK_FAILURE, i = e.TIMEOUT_FAILURE, t.prototype.visitProposedToLocationWithAction = function (t, e) {
              return this.controller.startVisitToLocationWithAction(t, e)
            }, t.prototype.visitStarted = function (t) {
              return t.issueRequest(), t.changeHistory(), t.loadCachedSnapshot()
            }, t.prototype.visitRequestStarted = function (t) {
              return this.progressBar.setValue(0), t.hasCachedSnapshot() || "restore" !== t.action ? this.showProgressBarAfterDelay() : this.showProgressBar()
            }, t.prototype.visitRequestProgressed = function (t) {
              return this.progressBar.setValue(t.progress)
            }, t.prototype.visitRequestCompleted = function (t) {
              return t.loadResponse()
            }, t.prototype.visitRequestFailedWithStatusCode = function (t, e) {
              switch (e) {
                case n:
                case i:
                  return this.reload();
                default:
                  return t.loadResponse()
              }
            }, t.prototype.visitRequestFinished = function () {
              return this.hideProgressBar()
            }, t.prototype.visitCompleted = function (t) {
              return t.followRedirect()
            }, t.prototype.pageInvalidated = function () {
              return this.reload()
            }, t.prototype.showProgressBarAfterDelay = function () {
              return this.progressBarTimeout = setTimeout(this.showProgressBar, this.controller.progressBarDelay)
            }, t.prototype.showProgressBar = function () {
              return this.progressBar.show()
            }, t.prototype.hideProgressBar = function () {
              return this.progressBar.hide(), clearTimeout(this.progressBarTimeout)
            }, t.prototype.reload = function () {
              return window.location.reload()
            }, t
          }()
        }.call(this),
        function () {
          var e = function (t, e) {
            return function () {
              return t.apply(e, arguments)
            }
          };
          u.History = function () {
            function t(t) {
              this.delegate = t, this.onPageLoad = e(this.onPageLoad, this), this.onPopState = e(this.onPopState, this)
            }
            return t.prototype.start = function () {
              return this.started ? void 0 : (addEventListener("popstate", this.onPopState, !1), addEventListener("load", this.onPageLoad, !1), this.started = !0)
            }, t.prototype.stop = function () {
              return this.started ? (removeEventListener("popstate", this.onPopState, !1), removeEventListener("load", this.onPageLoad, !1), this.started = !1) : void 0
            }, t.prototype.push = function (t, e) {
              return t = u.Location.wrap(t), this.update("push", t, e)
            }, t.prototype.replace = function (t, e) {
              return t = u.Location.wrap(t), this.update("replace", t, e)
            }, t.prototype.onPopState = function (t) {
              var e, n, i, r;
              return this.shouldHandlePopState() && (r = null != (n = t.state) ? n.turbolinks : void 0) ? (e = u.Location.wrap(window.location), i = r.restorationIdentifier, this.delegate.historyPoppedToLocationWithRestorationIdentifier(e, i)) : void 0
            }, t.prototype.onPageLoad = function () {
              return u.defer((t = this, function () {
                return t.pageLoaded = !0
              }));
              var t
            }, t.prototype.shouldHandlePopState = function () {
              return this.pageIsLoaded()
            }, t.prototype.pageIsLoaded = function () {
              return this.pageLoaded || "complete" === document.readyState
            }, t.prototype.update = function (t, e, n) {
              var i;
              return i = {
                turbolinks: {
                  restorationIdentifier: n
                }
              }, history[t + "State"](i, null, e)
            }, t
          }()
        }.call(this),
        function () {
          u.HeadDetails = function () {
            function t(t) {
              var e, n, i, r, o;
              for (this.elements = {}, n = 0, r = t.length; n < r; n++)(o = t[n]).nodeType === Node.ELEMENT_NODE && (i = o.outerHTML, (null != (e = this.elements)[i] ? e[i] : e[i] = {
                type: a(o),
                tracked: s(o),
                elements: []
              }).elements.push(o))
            }
            var o, e, n, s, a;
            return t.fromHeadElement = function (t) {
              var e;
              return new this(null != (e = null != t ? t.childNodes : void 0) ? e : [])
            }, t.prototype.hasElementWithKey = function (t) {
              return t in this.elements
            }, t.prototype.getTrackedElementSignature = function () {
              var n;
              return function () {
                var t, e;
                for (n in e = [], t = this.elements) t[n].tracked && e.push(n);
                return e
              }.call(this).join("")
            }, t.prototype.getScriptElementsNotInDetails = function (t) {
              return this.getElementsMatchingTypeNotInDetails("script", t)
            }, t.prototype.getStylesheetElementsNotInDetails = function (t) {
              return this.getElementsMatchingTypeNotInDetails("stylesheet", t)
            }, t.prototype.getElementsMatchingTypeNotInDetails = function (t, e) {
              var n, i, r, o, s, a;
              for (i in s = [], r = this.elements) a = (o = r[i]).type, n = o.elements, a !== t || e.hasElementWithKey(i) || s.push(n[0]);
              return s
            }, t.prototype.getProvisionalElements = function () {
              var t, e, n, i, r, o, s;
              for (e in n = [], i = this.elements) s = (r = i[e]).type, o = r.tracked, t = r.elements, null != s || o ? 1 < t.length && n.push.apply(n, t.slice(1)) : n.push.apply(n, t);
              return n
            }, t.prototype.getMetaValue = function (t) {
              var e;
              return null != (e = this.findMetaElementByName(t)) ? e.getAttribute("content") : void 0
            }, t.prototype.findMetaElementByName = function (t) {
              var e, n, i, r;
              for (i in e = void 0, r = this.elements) n = r[i].elements, o(n[0], t) && (e = n[0]);
              return e
            }, a = function (t) {
              return e(t) ? "script" : n(t) ? "stylesheet" : void 0
            }, s = function (t) {
              return "reload" === t.getAttribute("data-turbolinks-track")
            }, e = function (t) {
              return "script" === t.tagName.toLowerCase()
            }, n = function (t) {
              var e;
              return "style" === (e = t.tagName.toLowerCase()) || "link" === e && "stylesheet" === t.getAttribute("rel")
            }, o = function (t, e) {
              return "meta" === t.tagName.toLowerCase() && t.getAttribute("name") === e
            }, t
          }()
        }.call(this),
        function () {
          u.Snapshot = function () {
            function t(t, e) {
              this.headDetails = t, this.bodyElement = e
            }
            return t.wrap = function (t) {
              return t instanceof this ? t : "string" == typeof t ? this.fromHTMLString(t) : this.fromHTMLElement(t)
            }, t.fromHTMLString = function (t) {
              var e;
              return (e = document.createElement("html")).innerHTML = t, this.fromHTMLElement(e)
            }, t.fromHTMLElement = function (t) {
              var e, n, i;
              return n = t.querySelector("head"), e = null != (i = t.querySelector("body")) ? i : document.createElement("body"), new this(u.HeadDetails.fromHeadElement(n), e)
            }, t.prototype.clone = function () {
              return new this.constructor(this.headDetails, this.bodyElement.cloneNode(!0))
            }, t.prototype.getRootLocation = function () {
              var t, e;
              return e = null != (t = this.getSetting("root")) ? t : "/", new u.Location(e)
            }, t.prototype.getCacheControlValue = function () {
              return this.getSetting("cache-control")
            }, t.prototype.getElementForAnchor = function (t) {
              try {
                return this.bodyElement.querySelector("[id='" + t + "'], a[name='" + t + "']")
              } catch (u) {}
            }, t.prototype.getPermanentElements = function () {
              return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")
            }, t.prototype.getPermanentElementById = function (t) {
              return this.bodyElement.querySelector("#" + t + "[data-turbolinks-permanent]")
            }, t.prototype.getPermanentElementsPresentInSnapshot = function (t) {
              var e, n, i, r, o;
              for (o = [], n = 0, i = (r = this.getPermanentElements()).length; n < i; n++) e = r[n], t.getPermanentElementById(e.id) && o.push(e);
              return o
            }, t.prototype.findFirstAutofocusableElement = function () {
              return this.bodyElement.querySelector("[autofocus]")
            }, t.prototype.hasAnchor = function (t) {
              return null != this.getElementForAnchor(t)
            }, t.prototype.isPreviewable = function () {
              return "no-preview" !== this.getCacheControlValue()
            }, t.prototype.isCacheable = function () {
              return "no-cache" !== this.getCacheControlValue()
            }, t.prototype.isVisitable = function () {
              return "reload" !== this.getSetting("visit-control")
            }, t.prototype.getSetting = function (t) {
              return this.headDetails.getMetaValue("turbolinks-" + t)
            }, t
          }()
        }.call(this),
        function () {
          var o = [].slice;
          u.Renderer = function () {
            function t() {}
            var n;
            return t.render = function (t, e) {
              var n, i, r;
              return i = t, n = e, (r = function (t, e, n) {
                n.prototype = t.prototype;
                var i = new n,
                  r = t.apply(i, e);
                return Object(r) === r ? r : i
              }(this, 3 <= arguments.length ? o.call(arguments, 2) : [], function () {})).delegate = i, r.render(n), r
            }, t.prototype.renderView = function (t) {
              return this.delegate.viewWillRender(this.newBody), t(), this.delegate.viewRendered(this.newBody)
            }, t.prototype.invalidateView = function () {
              return this.delegate.viewInvalidated()
            }, t.prototype.createScriptElement = function (t) {
              var e;
              return "false" === t.getAttribute("data-turbolinks-eval") ? t : ((e = document.createElement("script")).textContent = t.textContent, e.async = !1, n(e, t), e)
            }, n = function (t, e) {
              var n, i, r, o, s, a, l;
              for (a = [], n = 0, i = (o = e.attributes).length; n < i; n++) r = (s = o[n]).name, l = s.value, a.push(t.setAttribute(r, l));
              return a
            }, t
          }()
        }.call(this),
        function () {
          var a, l, n = function (t, e) {
              function n() {
                this.constructor = t
              }
              for (var i in e) r.call(e, i) && (t[i] = e[i]);
              return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            },
            r = {}.hasOwnProperty;
          u.SnapshotRenderer = function (t) {
            function e(t, e, n) {
              this.currentSnapshot = t, this.newSnapshot = e, this.isPreview = n, this.currentHeadDetails = this.currentSnapshot.headDetails, this.newHeadDetails = this.newSnapshot.headDetails, this.currentBody = this.currentSnapshot.bodyElement, this.newBody = this.newSnapshot.bodyElement
            }
            return n(e, t), e.prototype.render = function (t) {
              return this.shouldRender() ? (this.mergeHead(), this.renderView((e = this, function () {
                return e.replaceBody(), e.isPreview || e.focusFirstAutofocusableElement(), t()
              }))) : this.invalidateView();
              var e
            }, e.prototype.mergeHead = function () {
              return this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements()
            }, e.prototype.replaceBody = function () {
              var t;
              return t = this.relocateCurrentBodyPermanentElements(), this.activateNewBodyScriptElements(), this.assignNewBody(), this.replacePlaceholderElementsWithClonedPermanentElements(t)
            }, e.prototype.shouldRender = function () {
              return this.newSnapshot.isVisitable() && this.trackedElementsAreIdentical()
            }, e.prototype.trackedElementsAreIdentical = function () {
              return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature()
            }, e.prototype.copyNewHeadStylesheetElements = function () {
              var t, e, n, i, r;
              for (r = [], e = 0, n = (i = this.getNewHeadStylesheetElements()).length; e < n; e++) t = i[e], r.push(document.head.appendChild(t));
              return r
            }, e.prototype.copyNewHeadScriptElements = function () {
              var t, e, n, i, r;
              for (r = [], e = 0, n = (i = this.getNewHeadScriptElements()).length; e < n; e++) t = i[e], r.push(document.head.appendChild(this.createScriptElement(t)));
              return r
            }, e.prototype.removeCurrentHeadProvisionalElements = function () {
              var t, e, n, i, r;
              for (r = [], e = 0, n = (i = this.getCurrentHeadProvisionalElements()).length; e < n; e++) t = i[e], r.push(document.head.removeChild(t));
              return r
            }, e.prototype.copyNewHeadProvisionalElements = function () {
              var t, e, n, i, r;
              for (r = [], e = 0, n = (i = this.getNewHeadProvisionalElements()).length; e < n; e++) t = i[e], r.push(document.head.appendChild(t));
              return r
            }, e.prototype.relocateCurrentBodyPermanentElements = function () {
              var t, e, n, i, r, o, s;
              for (s = [], t = 0, e = (o = this.getCurrentBodyPermanentElements()).length; t < e; t++) i = o[t], r = a(i), n = this.newSnapshot.getPermanentElementById(i.id), l(i, r.element), l(n, i), s.push(r);
              return s
            }, e.prototype.replacePlaceholderElementsWithClonedPermanentElements = function (t) {
              var e, n, i, r, o, s;
              for (s = [], i = 0, r = t.length; i < r; i++) n = (o = t[i]).element, e = o.permanentElement.cloneNode(!0), s.push(l(n, e));
              return s
            }, e.prototype.activateNewBodyScriptElements = function () {
              var t, e, n, i, r, o;
              for (o = [], e = 0, i = (r = this.getNewBodyScriptElements()).length; e < i; e++) n = r[e], t = this.createScriptElement(n), o.push(l(n, t));
              return o
            }, e.prototype.assignNewBody = function () {
              return document.body = this.newBody
            }, e.prototype.focusFirstAutofocusableElement = function () {
              var t;
              return null != (t = this.newSnapshot.findFirstAutofocusableElement()) ? t.focus() : void 0
            }, e.prototype.getNewHeadStylesheetElements = function () {
              return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)
            }, e.prototype.getNewHeadScriptElements = function () {
              return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)
            }, e.prototype.getCurrentHeadProvisionalElements = function () {
              return this.currentHeadDetails.getProvisionalElements()
            }, e.prototype.getNewHeadProvisionalElements = function () {
              return this.newHeadDetails.getProvisionalElements()
            }, e.prototype.getCurrentBodyPermanentElements = function () {
              return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)
            }, e.prototype.getNewBodyScriptElements = function () {
              return this.newBody.querySelectorAll("script")
            }, e
          }(u.Renderer), a = function (t) {
            var e;
            return (e = document.createElement("meta")).setAttribute("name", "turbolinks-permanent-placeholder"), e.setAttribute("content", t.id), {
              element: e,
              permanentElement: t
            }
          }, l = function (t, e) {
            var n;
            return (n = t.parentNode) ? n.replaceChild(e, t) : void 0
          }
        }.call(this),
        function () {
          var n = function (t, e) {
              function n() {
                this.constructor = t
              }
              for (var i in e) r.call(e, i) && (t[i] = e[i]);
              return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            },
            r = {}.hasOwnProperty;
          u.ErrorRenderer = function (t) {
            function e(t) {
              var e;
              (e = document.createElement("html")).innerHTML = t, this.newHead = e.querySelector("head"), this.newBody = e.querySelector("body")
            }
            return n(e, t), e.prototype.render = function (t) {
              return this.renderView((e = this, function () {
                return e.replaceHeadAndBody(), e.activateBodyScriptElements(), t()
              }));
              var e
            }, e.prototype.replaceHeadAndBody = function () {
              var t, e;
              return e = document.head, t = document.body, e.parentNode.replaceChild(this.newHead, e), t.parentNode.replaceChild(this.newBody, t)
            }, e.prototype.activateBodyScriptElements = function () {
              var t, e, n, i, r, o;
              for (o = [], e = 0, n = (i = this.getScriptElements()).length; e < n; e++) r = i[e], t = this.createScriptElement(r), o.push(r.parentNode.replaceChild(t, r));
              return o
            }, e.prototype.getScriptElements = function () {
              return document.documentElement.querySelectorAll("script")
            }, e
          }(u.Renderer)
        }.call(this),
        function () {
          u.View = function () {
            function t(t) {
              this.delegate = t, this.htmlElement = document.documentElement
            }
            return t.prototype.getRootLocation = function () {
              return this.getSnapshot().getRootLocation()
            }, t.prototype.getElementForAnchor = function (t) {
              return this.getSnapshot().getElementForAnchor(t)
            }, t.prototype.getSnapshot = function () {
              return u.Snapshot.fromHTMLElement(this.htmlElement)
            }, t.prototype.render = function (t, e) {
              var n, i, r;
              return r = t.snapshot, n = t.error, i = t.isPreview, this.markAsPreview(i), null != r ? this.renderSnapshot(r, i, e) : this.renderError(n, e)
            }, t.prototype.markAsPreview = function (t) {
              return t ? this.htmlElement.setAttribute("data-turbolinks-preview", "") : this.htmlElement.removeAttribute("data-turbolinks-preview")
            }, t.prototype.renderSnapshot = function (t, e, n) {
              return u.SnapshotRenderer.render(this.delegate, n, this.getSnapshot(), u.Snapshot.wrap(t), e)
            }, t.prototype.renderError = function (t, e) {
              return u.ErrorRenderer.render(this.delegate, e, t)
            }, t
          }()
        }.call(this),
        function () {
          var e = function (t, e) {
            return function () {
              return t.apply(e, arguments)
            }
          };
          u.ScrollManager = function () {
            function t(t) {
              this.delegate = t, this.onScroll = e(this.onScroll, this), this.onScroll = u.throttle(this.onScroll)
            }
            return t.prototype.start = function () {
              return this.started ? void 0 : (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
            }, t.prototype.stop = function () {
              return this.started ? (removeEventListener("scroll", this.onScroll, !1), this.started = !1) : void 0
            }, t.prototype.scrollToElement = function (t) {
              return t.scrollIntoView()
            }, t.prototype.scrollToPosition = function (t) {
              var e, n;
              return e = t.x, n = t.y, window.scrollTo(e, n)
            }, t.prototype.onScroll = function () {
              return this.updatePosition({
                x: window.pageXOffset,
                y: window.pageYOffset
              })
            }, t.prototype.updatePosition = function (t) {
              var e;
              return this.position = t, null != (e = this.delegate) ? e.scrollPositionChanged(this.position) : void 0
            }, t
          }()
        }.call(this),
        function () {
          u.SnapshotCache = function () {
            function t(t) {
              this.size = t, this.keys = [], this.snapshots = {}
            }
            var i;
            return t.prototype.has = function (t) {
              return i(t) in this.snapshots
            }, t.prototype.get = function (t) {
              var e;
              if (this.has(t)) return e = this.read(t), this.touch(t), e
            }, t.prototype.put = function (t, e) {
              return this.write(t, e), this.touch(t), e
            }, t.prototype.read = function (t) {
              var e;
              return e = i(t), this.snapshots[e]
            }, t.prototype.write = function (t, e) {
              var n;
              return n = i(t), this.snapshots[n] = e
            }, t.prototype.touch = function (t) {
              var e, n;
              return n = i(t), -1 < (e = this.keys.indexOf(n)) && this.keys.splice(e, 1), this.keys.unshift(n), this.trim()
            }, t.prototype.trim = function () {
              var t, e, n, i, r;
              for (r = [], t = 0, n = (i = this.keys.splice(this.size)).length; t < n; t++) e = i[t], r.push(delete this.snapshots[e]);
              return r
            }, i = function (t) {
              return u.Location.wrap(t).toCacheKey()
            }, t
          }()
        }.call(this),
        function () {
          var i = function (t, e) {
            return function () {
              return t.apply(e, arguments)
            }
          };
          u.Visit = function () {
            function t(t, e, n) {
              this.controller = t, this.action = n, this.performScroll = i(this.performScroll, this), this.identifier = u.uuid(), this.location = u.Location.wrap(e), this.adapter = this.controller.adapter, this.state = "initialized", this.timingMetrics = {}
            }
            var n;
            return t.prototype.start = function () {
              return "initialized" === this.state ? (this.recordTimingMetric("visitStart"), this.state = "started", this.adapter.visitStarted(this)) : void 0
            }, t.prototype.cancel = function () {
              var t;
              return "started" === this.state ? (null != (t = this.request) && t.cancel(), this.cancelRender(), this.state = "canceled") : void 0
            }, t.prototype.complete = function () {
              var t;
              return "started" === this.state ? (this.recordTimingMetric("visitEnd"), this.state = "completed", "function" == typeof (t = this.adapter).visitCompleted && t.visitCompleted(this), this.controller.visitCompleted(this)) : void 0
            }, t.prototype.fail = function () {
              var t;
              return "started" === this.state ? (this.state = "failed", "function" == typeof (t = this.adapter).visitFailed ? t.visitFailed(this) : void 0) : void 0
            }, t.prototype.changeHistory = function () {
              var t, e;
              return this.historyChanged ? void 0 : (t = this.location.isEqualTo(this.referrer) ? "replace" : this.action, e = n(t), this.controller[e](this.location, this.restorationIdentifier), this.historyChanged = !0)
            }, t.prototype.issueRequest = function () {
              return this.shouldIssueRequest() && null == this.request ? (this.progress = 0, this.request = new u.HttpRequest(this, this.location, this.referrer), this.request.send()) : void 0
            }, t.prototype.getCachedSnapshot = function () {
              var t;
              return !(t = this.controller.getCachedSnapshotForLocation(this.location)) || null != this.location.anchor && !t.hasAnchor(this.location.anchor) || "restore" !== this.action && !t.isPreviewable() ? void 0 : t
            }, t.prototype.hasCachedSnapshot = function () {
              return null != this.getCachedSnapshot()
            }, t.prototype.loadCachedSnapshot = function () {
              var e, n;
              return (n = this.getCachedSnapshot()) ? (e = this.shouldIssueRequest(), this.render(function () {
                var t;
                return this.cacheSnapshot(), this.controller.render({
                  snapshot: n,
                  isPreview: e
                }, this.performScroll), "function" == typeof (t = this.adapter).visitRendered && t.visitRendered(this), e ? void 0 : this.complete()
              })) : void 0
            }, t.prototype.loadResponse = function () {
              return null != this.response ? this.render(function () {
                var t, e;
                return this.cacheSnapshot(), this.request.failed ? (this.controller.render({
                  error: this.response
                }, this.performScroll), "function" == typeof (t = this.adapter).visitRendered && t.visitRendered(this), this.fail()) : (this.controller.render({
                  snapshot: this.response
                }, this.performScroll), "function" == typeof (e = this.adapter).visitRendered && e.visitRendered(this), this.complete())
              }) : void 0
            }, t.prototype.followRedirect = function () {
              return this.redirectedToLocation && !this.followedRedirect ? (this.location = this.redirectedToLocation, this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = !0) : void 0
            }, t.prototype.requestStarted = function () {
              var t;
              return this.recordTimingMetric("requestStart"), "function" == typeof (t = this.adapter).visitRequestStarted ? t.visitRequestStarted(this) : void 0
            }, t.prototype.requestProgressed = function (t) {
              var e;
              return this.progress = t, "function" == typeof (e = this.adapter).visitRequestProgressed ? e.visitRequestProgressed(this) : void 0
            }, t.prototype.requestCompletedWithResponse = function (t, e) {
              return this.response = t, null != e && (this.redirectedToLocation = u.Location.wrap(e)), this.adapter.visitRequestCompleted(this)
            }, t.prototype.requestFailedWithStatusCode = function (t, e) {
              return this.response = e, this.adapter.visitRequestFailedWithStatusCode(this, t)
            }, t.prototype.requestFinished = function () {
              var t;
              return this.recordTimingMetric("requestEnd"), "function" == typeof (t = this.adapter).visitRequestFinished ? t.visitRequestFinished(this) : void 0
            }, t.prototype.performScroll = function () {
              return this.scrolled ? void 0 : ("restore" === this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = !0)
            }, t.prototype.scrollToRestoredPosition = function () {
              var t, e;
              return null != (t = null != (e = this.restorationData) ? e.scrollPosition : void 0) ? (this.controller.scrollToPosition(t), !0) : void 0
            }, t.prototype.scrollToAnchor = function () {
              return null != this.location.anchor ? (this.controller.scrollToAnchor(this.location.anchor), !0) : void 0
            }, t.prototype.scrollToTop = function () {
              return this.controller.scrollToPosition({
                x: 0,
                y: 0
              })
            }, t.prototype.recordTimingMetric = function (t) {
              var e;
              return null != (e = this.timingMetrics)[t] ? e[t] : e[t] = (new Date).getTime()
            }, t.prototype.getTimingMetrics = function () {
              return u.copyObject(this.timingMetrics)
            }, n = function (t) {
              switch (t) {
                case "replace":
                  return "replaceHistoryWithLocationAndRestorationIdentifier";
                case "advance":
                case "restore":
                  return "pushHistoryWithLocationAndRestorationIdentifier"
              }
            }, t.prototype.shouldIssueRequest = function () {
              return "restore" !== this.action || !this.hasCachedSnapshot()
            }, t.prototype.cacheSnapshot = function () {
              return this.snapshotCached ? void 0 : (this.controller.cacheSnapshot(), this.snapshotCached = !0)
            }, t.prototype.render = function (t) {
              return this.cancelRender(), this.frame = requestAnimationFrame((e = this, function () {
                return e.frame = null, t.call(e)
              }));
              var e
            }, t.prototype.cancelRender = function () {
              return this.frame ? cancelAnimationFrame(this.frame) : void 0
            }, t
          }()
        }.call(this),
        function () {
          var e = function (t, e) {
            return function () {
              return t.apply(e, arguments)
            }
          };
          u.Controller = function () {
            function t() {
              this.clickBubbled = e(this.clickBubbled, this), this.clickCaptured = e(this.clickCaptured, this), this.pageLoaded = e(this.pageLoaded, this), this.history = new u.History(this), this.view = new u.View(this), this.scrollManager = new u.ScrollManager(this), this.restorationData = {}, this.clearCache(), this.setProgressBarDelay(500)
            }
            return t.prototype.start = function () {
              return u.supported && !this.started ? (addEventListener("click", this.clickCaptured, !0), addEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.start(), this.startHistory(), this.started = !0, this.enabled = !0) : void 0
            }, t.prototype.disable = function () {
              return this.enabled = !1
            }, t.prototype.stop = function () {
              return this.started ? (removeEventListener("click", this.clickCaptured, !0), removeEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.stop(), this.stopHistory(), this.started = !1) : void 0
            }, t.prototype.clearCache = function () {
              return this.cache = new u.SnapshotCache(10)
            }, t.prototype.visit = function (t, e) {
              var n, i;
              return null == e && (e = {}), t = u.Location.wrap(t), this.applicationAllowsVisitingLocation(t) ? this.locationIsVisitable(t) ? (n = null != (i = e.action) ? i : "advance", this.adapter.visitProposedToLocationWithAction(t, n)) : window.location = t : void 0
            }, t.prototype.startVisitToLocationWithAction = function (t, e, n) {
              var i;
              return u.supported ? (i = this.getRestorationDataForIdentifier(n), this.startVisit(t, e, {
                restorationData: i
              })) : window.location = t
            }, t.prototype.setProgressBarDelay = function (t) {
              return this.progressBarDelay = t
            }, t.prototype.startHistory = function () {
              return this.location = u.Location.wrap(window.location), this.restorationIdentifier = u.uuid(), this.history.start(), this.history.replace(this.location, this.restorationIdentifier)
            }, t.prototype.stopHistory = function () {
              return this.history.stop()
            }, t.prototype.pushHistoryWithLocationAndRestorationIdentifier = function (t, e) {
              return this.restorationIdentifier = e, this.location = u.Location.wrap(t), this.history.push(this.location, this.restorationIdentifier)
            }, t.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function (t, e) {
              return this.restorationIdentifier = e, this.location = u.Location.wrap(t), this.history.replace(this.location, this.restorationIdentifier)
            }, t.prototype.historyPoppedToLocationWithRestorationIdentifier = function (t, e) {
              var n;
              return this.restorationIdentifier = e, this.enabled ? (n = this.getRestorationDataForIdentifier(this.restorationIdentifier), this.startVisit(t, "restore", {
                restorationIdentifier: this.restorationIdentifier,
                restorationData: n,
                historyChanged: !0
              }), this.location = u.Location.wrap(t)) : this.adapter.pageInvalidated()
            }, t.prototype.getCachedSnapshotForLocation = function (t) {
              var e;
              return null != (e = this.cache.get(t)) ? e.clone() : void 0
            }, t.prototype.shouldCacheSnapshot = function () {
              return this.view.getSnapshot().isCacheable()
            }, t.prototype.cacheSnapshot = function () {
              var t, e, n;
              return this.shouldCacheSnapshot() ? (this.notifyApplicationBeforeCachingSnapshot(), e = this.view.getSnapshot(), t = this.lastRenderedLocation, u.defer((n = this, function () {
                return n.cache.put(t, e.clone())
              }))) : void 0
            }, t.prototype.scrollToAnchor = function (t) {
              var e;
              return (e = this.view.getElementForAnchor(t)) ? this.scrollToElement(e) : this.scrollToPosition({
                x: 0,
                y: 0
              })
            }, t.prototype.scrollToElement = function (t) {
              return this.scrollManager.scrollToElement(t)
            }, t.prototype.scrollToPosition = function (t) {
              return this.scrollManager.scrollToPosition(t)
            }, t.prototype.scrollPositionChanged = function (t) {
              return this.getCurrentRestorationData().scrollPosition = t
            }, t.prototype.render = function (t, e) {
              return this.view.render(t, e)
            }, t.prototype.viewInvalidated = function () {
              return this.adapter.pageInvalidated()
            }, t.prototype.viewWillRender = function (t) {
              return this.notifyApplicationBeforeRender(t)
            }, t.prototype.viewRendered = function () {
              return this.lastRenderedLocation = this.currentVisit.location, this.notifyApplicationAfterRender()
            }, t.prototype.pageLoaded = function () {
              return this.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
            }, t.prototype.clickCaptured = function () {
              return removeEventListener("click", this.clickBubbled, !1), addEventListener("click", this.clickBubbled, !1)
            }, t.prototype.clickBubbled = function (t) {
              var e, n, i;
              return this.enabled && this.clickEventIsSignificant(t) && (n = this.getVisitableLinkForNode(t.target)) && (i = this.getVisitableLocationForLink(n)) && this.applicationAllowsFollowingLinkToLocation(n, i) ? (t.preventDefault(), e = this.getActionForLink(n), this.visit(i, {
                action: e
              })) : void 0
            }, t.prototype.applicationAllowsFollowingLinkToLocation = function (t, e) {
              return !this.notifyApplicationAfterClickingLinkToLocation(t, e).defaultPrevented
            }, t.prototype.applicationAllowsVisitingLocation = function (t) {
              return !this.notifyApplicationBeforeVisitingLocation(t).defaultPrevented
            }, t.prototype.notifyApplicationAfterClickingLinkToLocation = function (t, e) {
              return u.dispatch("turbolinks:click", {
                target: t,
                data: {
                  url: e.absoluteURL
                },
                cancelable: !0
              })
            }, t.prototype.notifyApplicationBeforeVisitingLocation = function (t) {
              return u.dispatch("turbolinks:before-visit", {
                data: {
                  url: t.absoluteURL
                },
                cancelable: !0
              })
            }, t.prototype.notifyApplicationAfterVisitingLocation = function (t) {
              return u.dispatch("turbolinks:visit", {
                data: {
                  url: t.absoluteURL
                }
              })
            }, t.prototype.notifyApplicationBeforeCachingSnapshot = function () {
              return u.dispatch("turbolinks:before-cache")
            }, t.prototype.notifyApplicationBeforeRender = function (t) {
              return u.dispatch("turbolinks:before-render", {
                data: {
                  newBody: t
                }
              })
            }, t.prototype.notifyApplicationAfterRender = function () {
              return u.dispatch("turbolinks:render")
            }, t.prototype.notifyApplicationAfterPageLoad = function (t) {
              return null == t && (t = {}), u.dispatch("turbolinks:load", {
                data: {
                  url: this.location.absoluteURL,
                  timing: t
                }
              })
            }, t.prototype.startVisit = function (t, e, n) {
              var i;
              return null != (i = this.currentVisit) && i.cancel(), this.currentVisit = this.createVisit(t, e, n), this.currentVisit.start(), this.notifyApplicationAfterVisitingLocation(t)
            }, t.prototype.createVisit = function (t, e, n) {
              var i, r, o, s, a;
              return s = (r = null != n ? n : {}).restorationIdentifier, o = r.restorationData, i = r.historyChanged, (a = new u.Visit(this, t, e)).restorationIdentifier = null != s ? s : u.uuid(), a.restorationData = u.copyObject(o), a.historyChanged = i, a.referrer = this.location, a
            }, t.prototype.visitCompleted = function (t) {
              return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())
            }, t.prototype.clickEventIsSignificant = function (t) {
              return !(t.defaultPrevented || t.target.isContentEditable || 1 < t.which || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey)
            }, t.prototype.getVisitableLinkForNode = function (t) {
              return this.nodeIsVisitable(t) ? u.closest(t, "a[href]:not([target]):not([download])") : void 0
            }, t.prototype.getVisitableLocationForLink = function (t) {
              var e;
              return e = new u.Location(t.getAttribute("href")), this.locationIsVisitable(e) ? e : void 0
            }, t.prototype.getActionForLink = function (t) {
              var e;
              return null != (e = t.getAttribute("data-turbolinks-action")) ? e : "advance"
            }, t.prototype.nodeIsVisitable = function (t) {
              var e;
              return !(e = u.closest(t, "[data-turbolinks]")) || "false" !== e.getAttribute("data-turbolinks")
            }, t.prototype.locationIsVisitable = function (t) {
              return t.isPrefixedBy(this.view.getRootLocation()) && t.isHTML()
            }, t.prototype.getCurrentRestorationData = function () {
              return this.getRestorationDataForIdentifier(this.restorationIdentifier)
            }, t.prototype.getRestorationDataForIdentifier = function (t) {
              var e;
              return null != (e = this.restorationData)[t] ? e[t] : e[t] = {}
            }, t
          }()
        }.call(this),
        function () {
          ! function () {
            var t, e;
            if ((t = e = document.currentScript) && !e.hasAttribute("data-turbolinks-suppress-warning"))
              for (; t = t.parentNode;)
                if (t === document.body) return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s", e.outerHTML)
          }()
        }.call(this),
        function () {
          var t, e, n;
          u.start = function () {
            return e() ? (null == u.controller && (u.controller = t()), u.controller.start()) : void 0
          }, e = function () {
            return null == window.Turbolinks && (window.Turbolinks = u), n()
          }, t = function () {
            var t;
            return (t = new u.Controller).adapter = new u.BrowserAdapter(t), t
          }, (n = function () {
            return window.Turbolinks === u
          })() && u.start()
        }.call(this)
    }).call(this), "object" == typeof module && module.exports ? module.exports = u : "function" == typeof define && define.amd && define(u)
  }.call(this),
  function () {}.call(this),
  function () {
    var t = this;
    (function () {
      (function () {
        var n = [].slice;
        this.ActionCable = {
          INTERNAL: {
            message_types: {
              welcome: "welcome",
              ping: "ping",
              confirmation: "confirm_service",
              rejection: "reject_service"
            },
            default_mount_path: "/cable",
            protocols: ["actioncable-v1-json", "actioncable-unsupported"]
          },
          WebSocket: window.WebSocket,
          logger: window.console,
          createConsumer: function (t) {
            var e;
            return null == t && (t = null != (e = this.getConfig("url")) ? e : this.INTERNAL.default_mount_path), new l.Consumer(this.createWebSocketURL(t))
          },
          getConfig: function (t) {
            var e;
            return null != (e = document.head.querySelector("meta[name='action-cable-" + t + "']")) ? e.getAttribute("content") : void 0
          },
          createWebSocketURL: function (t) {
            var e;
            return t && !/^wss?:/i.test(t) ? ((e = document.createElement("a")).href = t, e.href = e.href, e.protocol = e.protocol.replace("http", "ws"), e.href) : t
          },
          startDebugging: function () {
            return this.debugging = !0
          },
          stopDebugging: function () {
            return this.debugging = null
          },
          log: function () {
            var t, e;
            if (t = 1 <= arguments.length ? n.call(arguments, 0) : [], this.debugging) return t.push(Date.now()), (e = this.logger).log.apply(e, ["[ActionCable]"].concat(n.call(t)))
          }
        }
      }).call(this)
    }).call(t);
    var l = t.ActionCable;
    (function () {
      (function () {
        var i = function (t, e) {
          return function () {
            return t.apply(e, arguments)
          }
        };
        l.ConnectionMonitor = function () {
          function t(t) {
            this.connection = t, this.visibilityDidChange = i(this.visibilityDidChange, this), this.reconnectAttempts = 0
          }
          var r, e, n;
          return t.pollInterval = {
            min: 3,
            max: 30
          }, t.staleThreshold = 6, t.prototype.start = function () {
            if (!this.isRunning()) return this.startedAt = e(), delete this.stoppedAt, this.startPolling(), document.addEventListener("visibilitychange", this.visibilityDidChange), l.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms")
          }, t.prototype.stop = function () {
            if (this.isRunning()) return this.stoppedAt = e(), this.stopPolling(), document.removeEventListener("visibilitychange", this.visibilityDidChange), l.log("ConnectionMonitor stopped")
          }, t.prototype.isRunning = function () {
            return null != this.startedAt && null == this.stoppedAt
          }, t.prototype.recordPing = function () {
            return this.pingedAt = e()
          }, t.prototype.recordConnect = function () {
            return this.reconnectAttempts = 0, this.recordPing(), delete this.disconnectedAt, l.log("ConnectionMonitor recorded connect")
          }, t.prototype.recordDisconnect = function () {
            return this.disconnectedAt = e(), l.log("ConnectionMonitor recorded disconnect")
          }, t.prototype.startPolling = function () {
            return this.stopPolling(), this.poll()
          }, t.prototype.stopPolling = function () {
            return clearTimeout(this.pollTimeout)
          }, t.prototype.poll = function () {
            return this.pollTimeout = setTimeout((t = this, function () {
              return t.reconnectIfStale(), t.poll()
            }), this.getPollInterval());
            var t
          }, t.prototype.getPollInterval = function () {
            var t, e, n, i;
            return n = (i = this.constructor.pollInterval).min, e = i.max, t = 5 * Math.log(this.reconnectAttempts + 1), Math.round(1e3 * r(t, n, e))
          }, t.prototype.reconnectIfStale = function () {
            if (this.connectionIsStale()) return l.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + n(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s"), this.reconnectAttempts++, this.disconnectedRecently() ? l.log("ConnectionMonitor skipping reopening recent disconnect") : (l.log("ConnectionMonitor reopening"), this.connection.reopen())
          }, t.prototype.connectionIsStale = function () {
            var t;
            return n(null != (t = this.pingedAt) ? t : this.startedAt) > this.constructor.staleThreshold
          }, t.prototype.disconnectedRecently = function () {
            return this.disconnectedAt && n(this.disconnectedAt) < this.constructor.staleThreshold
          }, t.prototype.visibilityDidChange = function () {
            if ("visible" === document.visibilityState) return setTimeout((t = this, function () {
              if (t.connectionIsStale() || !t.connection.isOpen()) return l.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState), t.connection.reopen()
            }), 200);
            var t
          }, e = function () {
            return (new Date).getTime()
          }, n = function (t) {
            return (e() - t) / 1e3
          }, r = function (t, e, n) {
            return Math.max(e, Math.min(n, t))
          }, t
        }()
      }).call(this),
        function () {
          var t, r, e, n, i, o = [].slice,
            s = function (t, e) {
              return function () {
                return t.apply(e, arguments)
              }
            },
            a = [].indexOf || function (t) {
              for (var e = 0, n = this.length; e < n; e++)
                if (e in this && this[e] === t) return e;
              return -1
            };
          n = l.INTERNAL, r = n.message_types, e = n.protocols, i = 2 <= e.length ? o.call(e, 0, t = e.length - 1) : (t = 0, []), e[t++], l.Connection = function () {
            function t(t) {
              this.consumer = t, this.open = s(this.open, this), this.services = this.consumer.services, this.monitor = new l.ConnectionMonitor(this), this.disconnected = !0
            }
            return t.reopenDelay = 500, t.prototype.send = function (t) {
              return !!this.isOpen() && (this.webSocket.send(JSON.stringify(t)), !0)
            }, t.prototype.open = function () {
              return this.isActive() ? (l.log("Attempted to open WebSocket, but existing socket is " + this.getState()), !1) : (l.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + e), null != this.webSocket && this.uninstallEventHandlers(), this.webSocket = new l.WebSocket(this.consumer.url, e), this.installEventHandlers(), this.monitor.start(), !0)
            }, t.prototype.close = function (t) {
              var e;
              if ((null != t ? t : {
                  allowReconnect: !0
                }).allowReconnect || this.monitor.stop(), this.isActive()) return null != (e = this.webSocket) ? e.close() : void 0
            }, t.prototype.reopen = function () {
              var t;
              if (l.log("Reopening WebSocket, current state is " + this.getState()), !this.isActive()) return this.open();
              try {
                return this.close()
              } catch (e) {
                return t = e, l.log("Failed to reopen WebSocket", t)
              } finally {
                l.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms"), setTimeout(this.open, this.constructor.reopenDelay)
              }
            }, t.prototype.getProtocol = function () {
              var t;
              return null != (t = this.webSocket) ? t.protocol : void 0
            }, t.prototype.isOpen = function () {
              return this.isState("open")
            }, t.prototype.isActive = function () {
              return this.isState("open", "connecting")
            }, t.prototype.isProtocolSupported = function () {
              var t;
              return t = this.getProtocol(), 0 <= a.call(i, t)
            }, t.prototype.isState = function () {
              var t, e;
              return e = 1 <= arguments.length ? o.call(arguments, 0) : [], t = this.getState(), 0 <= a.call(e, t)
            }, t.prototype.getState = function () {
              var t, e;
              for (e in WebSocket)
                if (WebSocket[e] === (null != (t = this.webSocket) ? t.readyState : void 0)) return e.toLowerCase();
              return null
            }, t.prototype.installEventHandlers = function () {
              var t, e;
              for (t in this.events) e = this.events[t].bind(this), this.webSocket["on" + t] = e
            }, t.prototype.uninstallEventHandlers = function () {
              var t;
              for (t in this.events) this.webSocket["on" + t] = function () {}
            }, t.prototype.events = {
              message: function (t) {
                var e, n, i;
                if (this.isProtocolSupported()) switch (e = (i = JSON.parse(t.data)).identifier, n = i.message, i.type) {
                  case r.welcome:
                    return this.monitor.recordConnect(), this.services.reload();
                  case r.ping:
                    return this.monitor.recordPing();
                  case r.confirmation:
                    return this.services.notify(e, "connected");
                  case r.rejection:
                    return this.services.reject(e);
                  default:
                    return this.services.notify(e, "received", n)
                }
              },
              open: function () {
                if (l.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol"), this.disconnected = !1, !this.isProtocolSupported()) return l.log("Protocol is unsupported. Stopping monitor and disconnecting."), this.close({
                  allowReconnect: !1
                })
              },
              close: function () {
                if (l.log("WebSocket onclose event"), !this.disconnected) return this.disconnected = !0, this.monitor.recordDisconnect(), this.services.notifyAll("disconnected", {
                  willAttemptReconnect: this.monitor.isRunning()
                })
              },
              error: function () {
                return l.log("WebSocket onerror event")
              }
            }, t
          }()
        }.call(this),
        function () {
          var c = [].slice;
          l.Services = function () {
            function t(t) {
              this.consumer = t, this.services = []
            }
            return t.prototype.create = function (t, e) {
              var n, i, r;
              return i = "object" == typeof (n = t) ? n : {
                channel: n
              }, r = new l.Service(this.consumer, i, e), this.add(r)
            }, t.prototype.add = function (t) {
              return this.services.push(t), this.consumer.ensureActiveConnection(), this.notify(t, "initialized"), this.sendCommand(t, "subscribe"), t
            }, t.prototype.remove = function (t) {
              return this.forget(t), this.findAll(t.identifier).length || this.sendCommand(t, "unsubscribe"), t
            }, t.prototype.reject = function (t) {
              var e, n, i, r, o;
              for (r = [], e = 0, n = (i = this.findAll(t)).length; e < n; e++) o = i[e], this.forget(o), this.notify(o, "rejected"), r.push(o);
              return r
            }, t.prototype.forget = function (r) {
              var o;
              return this.services = function () {
                var t, e, n, i;
                for (i = [], t = 0, e = (n = this.services).length; t < e; t++)(o = n[t]) !== r && i.push(o);
                return i
              }.call(this), r
            }, t.prototype.findAll = function (t) {
              var e, n, i, r, o;
              for (r = [], e = 0, n = (i = this.services).length; e < n; e++)(o = i[e]).identifier === t && r.push(o);
              return r
            }, t.prototype.reload = function () {
              var t, e, n, i, r;
              for (i = [], t = 0, e = (n = this.services).length; t < e; t++) r = n[t], i.push(this.sendCommand(r, "subscribe"));
              return i
            }, t.prototype.notifyAll = function (t) {
              var e, n, i, r, o, s, a;
              for (n = t, e = 2 <= arguments.length ? c.call(arguments, 1) : [], s = [], i = 0, r = (o = this.services).length; i < r; i++) a = o[i], s.push(this.notify.apply(this, [a, n].concat(c.call(e))));
              return s
            }, t.prototype.notify = function (t, e) {
              var n, i, r, o, s, a, l;
              for (a = t, i = e, n = 3 <= arguments.length ? c.call(arguments, 2) : [], s = [], r = 0, o = (l = "string" == typeof a ? this.findAll(a) : [a]).length; r < o; r++) a = l[r], s.push("function" == typeof a[i] ? a[i].apply(a, n) : void 0);
              return s
            }, t.prototype.sendCommand = function (t, e) {
              var n;
              return n = t.identifier, this.consumer.send({
                command: e,
                identifier: n
              })
            }, t
          }()
        }.call(this),
        function () {
          l.Service = function () {
            function t(t, e, n) {
              this.consumer = t, null == e && (e = {}), this.identifier = JSON.stringify(e), i(this, n)
            }
            var i;
            return t.prototype.perform = function (t, e) {
              return null == e && (e = {}), e.action = t, this.send(e)
            }, t.prototype.send = function (t) {
              return this.consumer.send({
                command: "message",
                identifier: this.identifier,
                data: JSON.stringify(t)
              })
            }, t.prototype.unsubscribe = function () {
              return this.consumer.services.remove(this)
            }, i = function (t, e) {
              var n, i;
              if (null != e)
                for (n in e) i = e[n], t[n] = i;
              return t
            }, t
          }()
        }.call(this),
        function () {
          l.Consumer = function () {
            function t(t) {
              this.url = t, this.services = new l.Services(this), this.connection = new l.Connection(this)
            }
            return t.prototype.send = function (t) {
              return this.connection.send(t)
            }, t.prototype.connect = function () {
              return this.connection.open()
            }, t.prototype.disconnect = function () {
              return this.connection.close({
                allowReconnect: !1
              })
            }, t.prototype.ensureActiveConnection = function () {
              if (!this.connection.isActive()) return this.connection.open()
            }, t
          }()
        }.call(this)
    }).call(this), "object" == typeof module && module.exports ? module.exports = l : "function" == typeof define && define.amd && define(l)
  }.call(this),
  function () {
    this.App || (this.App = {}), App.cable = ActionCable.createConsumer()
  }.call(this),
  function () {}.call(this),
  function () {}.call(this),
  function () {}.call(this),
  function () {}.call(this);