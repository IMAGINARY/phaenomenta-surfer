/* CindyJS - (C) 2014-2016  The CindyJS Project
 * Mostly licensed under the Apache License 2.0, but subprojects may use different licensing.
 * See https://github.com/CindyJS/CindyJS/tree/131b593c48ec6a2c773b580bea773a6298f7e901
 * for corresponding sources and their respective licensing conditions.
 */ /*
 npm.im/iphone-inline-video 2.0.2  npm.im/intervalometer  https://github.com/paulmillr/es6-shim
 @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
   and contributors,  MIT License
 es6-shim: v0.35.4
 see https://github.com/paulmillr/es6-shim/blob/0.35.3/LICENSE
 Details and documentation:
 https://github.com/paulmillr/es6-shim/
*/ "use strict";
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(d, n, t) {
    d != Array.prototype && d != Object.prototype && (d[n] = t.value);
};
$jscomp.getGlobal = function(d) {
    return "undefined" != typeof window && window === d ? d : "undefined" != typeof global && null != global ? global : d;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
    var d = 0;
    return function(n) {
        return $jscomp.SYMBOL_PREFIX + (n || "") + d++;
    };
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var d = $jscomp.global.Symbol.iterator;
    d || (d = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[d] && $jscomp.defineProperty(Array.prototype, d, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this);
        }
    });
    $jscomp.initSymbolIterator = function() {};
};
$jscomp.arrayIterator = function(d) {
    var n = 0;
    return $jscomp.iteratorPrototype(function() {
        return n < d.length ? {
            done: !1,
            value: d[n++]
        } : {
            done: !0
        };
    });
};
$jscomp.iteratorPrototype = function(d) {
    $jscomp.initSymbolIterator();
    d = {
        next: d
    };
    d[$jscomp.global.Symbol.iterator] = function() {
        return this;
    };
    return d;
};
$jscomp.makeIterator = function(d) {
    $jscomp.initSymbolIterator();
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var n = d[Symbol.iterator];
    return n ? n.call(d) : $jscomp.arrayIterator(d);
};
$jscomp.arrayFromIterator = function(d) {
    for(var n, t = []; !(n = d.next()).done;)t.push(n.value);
    return t;
};
$jscomp.arrayFromIterable = function(d) {
    return d instanceof Array ? d : $jscomp.arrayFromIterator($jscomp.makeIterator(d));
};
$jscomp.polyfill = function(d, n, t, G) {
    if (n) {
        t = $jscomp.global;
        d = d.split(".");
        for(G = 0; G < d.length - 1; G++){
            var B = d[G];
            B in t || (t[B] = {});
            t = t[B];
        }
        d = d[d.length - 1];
        G = t[d];
        n = n(G);
        n != G && null != n && $jscomp.defineProperty(t, d, {
            configurable: !0,
            writable: !0,
            value: n
        });
    }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(d) {
    function n() {
        this.batch_ = null;
    }
    function t(d) {
        return d instanceof B ? d : new B(function(h, n) {
            h(d);
        });
    }
    if (d && !$jscomp.FORCE_POLYFILL_PROMISE) return d;
    n.prototype.asyncExecute = function(d) {
        null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
        this.batch_.push(d);
        return this;
    };
    n.prototype.asyncExecuteBatch_ = function() {
        var d = this;
        this.asyncExecuteFunction(function() {
            d.executeBatch_();
        });
    };
    var G = $jscomp.global.setTimeout;
    n.prototype.asyncExecuteFunction = function(d) {
        G(d, 0);
    };
    n.prototype.executeBatch_ = function() {
        for(; this.batch_ && this.batch_.length;){
            var d = this.batch_;
            this.batch_ = [];
            for(var h = 0; h < d.length; ++h){
                var n = d[h];
                d[h] = null;
                try {
                    n();
                } catch (p) {
                    this.asyncThrow_(p);
                }
            }
        }
        this.batch_ = null;
    };
    n.prototype.asyncThrow_ = function(d) {
        this.asyncExecuteFunction(function() {
            throw d;
        });
    };
    var B = function(d) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var h = this.createResolveAndReject_();
        try {
            d(h.resolve, h.reject);
        } catch (X) {
            h.reject(X);
        }
    };
    B.prototype.createResolveAndReject_ = function() {
        function d(d) {
            return function(p) {
                n || (n = !0, d.call(h, p));
            };
        }
        var h = this, n = !1;
        return {
            resolve: d(this.resolveTo_),
            reject: d(this.reject_)
        };
    };
    B.prototype.resolveTo_ = function(d) {
        if (d === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (d instanceof B) this.settleSameAsPromise_(d);
        else {
            a: switch(typeof d){
                case "object":
                    var h = null != d;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1;
            }
            h ? this.resolveToNonPromiseObj_(d) : this.fulfill_(d);
        }
    };
    B.prototype.resolveToNonPromiseObj_ = function(d) {
        var h = void 0;
        try {
            h = d.then;
        } catch (X) {
            this.reject_(X);
            return;
        }
        "function" == typeof h ? this.settleSameAsThenable_(h, d) : this.fulfill_(d);
    };
    B.prototype.reject_ = function(d) {
        this.settle_(2, d);
    };
    B.prototype.fulfill_ = function(d) {
        this.settle_(1, d);
    };
    B.prototype.settle_ = function(d, h) {
        if (0 != this.state_) throw Error("Cannot settle(" + d + ", " + h + "): Promise already settled in state" + this.state_);
        this.state_ = d;
        this.result_ = h;
        this.executeOnSettledCallbacks_();
    };
    B.prototype.executeOnSettledCallbacks_ = function() {
        if (null != this.onSettledCallbacks_) {
            for(var d = 0; d < this.onSettledCallbacks_.length; ++d)I.asyncExecute(this.onSettledCallbacks_[d]);
            this.onSettledCallbacks_ = null;
        }
    };
    var I = new n;
    B.prototype.settleSameAsPromise_ = function(d) {
        var h = this.createResolveAndReject_();
        d.callWhenSettled_(h.resolve, h.reject);
    };
    B.prototype.settleSameAsThenable_ = function(d, h) {
        var n = this.createResolveAndReject_();
        try {
            d.call(h, n.resolve, n.reject);
        } catch (p) {
            n.reject(p);
        }
    };
    B.prototype.then = function(d, h) {
        function n(h, d) {
            return "function" == typeof h ? function(d) {
                try {
                    p(h(d));
                } catch (ta) {
                    t(ta);
                }
            } : d;
        }
        var p, t, G = new B(function(h, d) {
            p = h;
            t = d;
        });
        this.callWhenSettled_(n(d, p), n(h, t));
        return G;
    };
    B.prototype.catch = function(d) {
        return this.then(void 0, d);
    };
    B.prototype.callWhenSettled_ = function(d, h) {
        function n() {
            switch(p.state_){
                case 1:
                    d(p.result_);
                    break;
                case 2:
                    h(p.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + p.state_);
            }
        }
        var p = this;
        null == this.onSettledCallbacks_ ? I.asyncExecute(n) : this.onSettledCallbacks_.push(n);
    };
    B.resolve = t;
    B.reject = function(d) {
        return new B(function(h, n) {
            n(d);
        });
    };
    B.race = function(d) {
        return new B(function(h, n) {
            for(var p = $jscomp.makeIterator(d), B = p.next(); !B.done; B = p.next())t(B.value).callWhenSettled_(h, n);
        });
    };
    B.all = function(d) {
        var h = $jscomp.makeIterator(d), n = h.next();
        return n.done ? t([]) : new B(function(d, B) {
            function p(h) {
                return function(n) {
                    G[h] = n;
                    X--;
                    0 == X && d(G);
                };
            }
            var G = [], X = 0;
            do G.push(void 0), X++, t(n.value).callWhenSettled_(p(G.length - 1), B), n = h.next();
            while (!n.done);
        });
    };
    return B;
}, "es6", "es3");
$jscomp.iteratorFromArray = function(d, n) {
    $jscomp.initSymbolIterator();
    d instanceof String && (d += "");
    var t = 0, G = {
        next: function() {
            if (t < d.length) {
                var B = t++;
                return {
                    value: n(B, d[B]),
                    done: !1
                };
            }
            G.next = function() {
                return {
                    done: !0,
                    value: void 0
                };
            };
            return G.next();
        }
    };
    G[Symbol.iterator] = function() {
        return G;
    };
    return G;
};
$jscomp.polyfill("Array.prototype.keys", function(d) {
    return d ? d : function() {
        return $jscomp.iteratorFromArray(this, function(d) {
            return d;
        });
    };
}, "es6", "es3");
$jscomp.polyfill("Number.isNaN", function(d) {
    return d ? d : function(d) {
        return "number" === typeof d && isNaN(d);
    };
}, "es6", "es3");
$jscomp.polyfill("Number.isFinite", function(d) {
    return d ? d : function(d) {
        return "number" !== typeof d ? !1 : !isNaN(d) && Infinity !== d && -Infinity !== d;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.sign", function(d) {
    return d ? d : function(d) {
        d = Number(d);
        return 0 === d || isNaN(d) ? d : 0 < d ? 1 : -1;
    };
}, "es6", "es3");
$jscomp.polyfill("Number.EPSILON", function(d) {
    return Math.pow(2, -52);
}, "es6", "es3");
$jscomp.polyfill("Number.MAX_SAFE_INTEGER", function() {
    return 9007199254740991;
}, "es6", "es3");
$jscomp.checkStringArgs = function(d, n, t) {
    if (null == d) throw new TypeError("The 'this' value for String.prototype." + t + " must not be null or undefined");
    if (n instanceof RegExp) throw new TypeError("First argument to String.prototype." + t + " must not be a regular expression");
    return d + "";
};
$jscomp.polyfill("String.prototype.startsWith", function(d) {
    return d ? d : function(d, t) {
        var n = $jscomp.checkStringArgs(this, d, "startsWith");
        d += "";
        var B = n.length, I = d.length;
        t = Math.max(0, Math.min(t | 0, n.length));
        for(var O = 0; O < I && t < B;)if (n[t++] != d[O++]) return !1;
        return O >= I;
    };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(d) {
    return d ? d : function(d, t) {
        var n = $jscomp.checkStringArgs(this, d, "endsWith");
        d += "";
        void 0 === t && (t = n.length);
        t = Math.max(0, Math.min(t | 0, n.length));
        for(var B = d.length; 0 < B && 0 < t;)if (n[--t] != d[--B]) return !1;
        return 0 >= B;
    };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(d) {
    return d ? d : function(d, t) {
        return d === t ? 0 !== d || 1 / d === 1 / t : d !== d && t !== t;
    };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(d) {
    return d ? d : function(d, t) {
        var n = this;
        n instanceof String && (n = String(n));
        var B = n.length;
        t = t || 0;
        for(0 > t && (t = Math.max(t + B, 0)); t < B; t++){
            var I = n[t];
            if (I === d || Object.is(I, d)) return !0;
        }
        return !1;
    };
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function(d) {
    return d ? d : function(d, t) {
        return -1 !== $jscomp.checkStringArgs(this, d, "includes").indexOf(d, t || 0);
    };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(d) {
    return d ? d : function() {
        return $jscomp.iteratorFromArray(this, function(d, t) {
            return t;
        });
    };
}, "es8", "es3");
$jscomp.polyfill("Array.from", function(d) {
    return d ? d : function(d, t, G) {
        $jscomp.initSymbolIterator();
        t = null != t ? t : function(h) {
            return h;
        };
        var n = [], I = d[Symbol.iterator];
        if ("function" == typeof I) for(d = I.call(d); !(I = d.next()).done;)n.push(t.call(G, I.value));
        else {
            I = d.length;
            for(var O = 0; O < I; O++)n.push(t.call(G, d[O]));
        }
        return n;
    };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.entries", function(d) {
    return d ? d : function() {
        return $jscomp.iteratorFromArray(this, function(d, t) {
            return [
                d,
                t
            ];
        });
    };
}, "es6", "es3");
$jscomp.polyfill("Number.isInteger", function(d) {
    return d ? d : function(d) {
        return Number.isFinite(d) ? d === Math.floor(d) : !1;
    };
}, "es6", "es3");
$jscomp.findInternal = function(d, n, t) {
    d instanceof String && (d = String(d));
    for(var G = d.length, B = 0; B < G; B++){
        var I = d[B];
        if (n.call(t, I, B, d)) return {
            i: B,
            v: I
        };
    }
    return {
        i: -1,
        v: void 0
    };
};
$jscomp.polyfill("Array.prototype.find", function(d) {
    return d ? d : function(d, t) {
        return $jscomp.findInternal(this, d, t).v;
    };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.findIndex", function(d) {
    return d ? d : function(d, t) {
        return $jscomp.findInternal(this, d, t).i;
    };
}, "es6", "es3");
$jscomp.polyfill("Object.getOwnPropertySymbols", function(d) {
    return d ? d : function() {
        return [];
    };
}, "es6", "es5");
$jscomp.polyfill("Math.expm1", function(d) {
    return d ? d : function(d) {
        d = Number(d);
        if (.25 > d && -0.25 < d) {
            for(var n = d, G = 1, B = d, I = 0; I != B;)n *= d / ++G, B = (I = B) + n;
            return B;
        }
        return Math.exp(d) - 1;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.sinh", function(d) {
    if (d) return d;
    var n = Math.exp;
    return function(d) {
        d = Number(d);
        return 0 === d ? d : (n(d) - n(-d)) / 2;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.cosh", function(d) {
    if (d) return d;
    var n = Math.exp;
    return function(d) {
        d = Number(d);
        return (n(d) + n(-d)) / 2;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.log1p", function(d) {
    return d ? d : function(d) {
        d = Number(d);
        if (.25 > d && -0.25 < d) {
            for(var n = d, G = 1, B = d, I = 0, O = 1; I != B;)n *= d, O *= -1, B = (I = B) + O * n / ++G;
            return B;
        }
        return Math.log(1 + d);
    };
}, "es6", "es3");
$jscomp.polyfill("Math.asinh", function(d) {
    return d ? d : function(d) {
        d = Number(d);
        if (0 === d) return d;
        var n = Math.log(Math.abs(d) + Math.sqrt(d * d + 1));
        return 0 > d ? -n : n;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.atanh", function(d) {
    if (d) return d;
    var n = Math.log1p;
    return function(d) {
        d = Number(d);
        return (n(d) - n(-d)) / 2;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.tanh", function(d) {
    return d ? d : function(d) {
        d = Number(d);
        if (0 === d) return d;
        var n = Math.exp(-2 * Math.abs(d));
        n = (1 - n) / (1 + n);
        return 0 > d ? -n : n;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.acosh", function(d) {
    return d ? d : function(d) {
        d = Number(d);
        return Math.log(d + Math.sqrt(d * d - 1));
    };
}, "es6", "es3");
$jscomp.polyfill("Math.cbrt", function(d) {
    return d ? d : function(d) {
        if (0 === d) return d;
        d = Number(d);
        var n = Math.pow(Math.abs(d), 1 / 3);
        return 0 > d ? -n : n;
    };
}, "es6", "es3");
$jscomp.polyfill("Math.imul", function(d) {
    return d ? d : function(d, t) {
        d = Number(d);
        t = Number(t);
        var n = d & 65535, B = t & 65535;
        return n * B + ((d >>> 16 & 65535) * B + n * (t >>> 16 & 65535) << 16 >>> 0) | 0;
    };
}, "es6", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
    try {
        var d = {}, n = Object.create(new $jscomp.global.Proxy(d, {
            get: function(t, G, B) {
                return t == d && "q" == G && B == n;
            }
        }));
        return !0 === n.q;
    } catch (t) {
        return !1;
    }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(d, n) {
    return Object.prototype.hasOwnProperty.call(d, n);
};
$jscomp.polyfill("WeakMap", function(d) {
    function n() {
        if (!d || !Object.seal) return !1;
        try {
            var h = Object.seal({}), n = Object.seal({}), p = new d([
                [
                    h,
                    2
                ],
                [
                    n,
                    3
                ]
            ]);
            if (2 != p.get(h) || 3 != p.get(n)) return !1;
            p.delete(h);
            p.set(n, 4);
            return !p.has(h) && 4 == p.get(n);
        } catch (ia) {
            return !1;
        }
    }
    function t(d) {
        $jscomp.owns(d, B) || $jscomp.defineProperty(d, B, {
            value: {}
        });
    }
    function G(d) {
        var h = Object[d];
        h && (Object[d] = function(d) {
            t(d);
            return h(d);
        });
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (d && $jscomp.ES6_CONFORMANCE) return d;
    } else if (n()) return d;
    var B = "$jscomp_hidden_" + Math.random();
    G("freeze");
    G("preventExtensions");
    G("seal");
    var I = 0, O = function(d) {
        this.id_ = (I += Math.random() + 1).toString();
        if (d) {
            $jscomp.initSymbol();
            $jscomp.initSymbolIterator();
            d = $jscomp.makeIterator(d);
            for(var h; !(h = d.next()).done;)h = h.value, this.set(h[0], h[1]);
        }
    };
    O.prototype.set = function(d, n) {
        t(d);
        if (!$jscomp.owns(d, B)) throw Error("WeakMap key fail: " + d);
        d[B][this.id_] = n;
        return this;
    };
    O.prototype.get = function(d) {
        return $jscomp.owns(d, B) ? d[B][this.id_] : void 0;
    };
    O.prototype.has = function(d) {
        return $jscomp.owns(d, B) && $jscomp.owns(d[B], this.id_);
    };
    O.prototype.delete = function(d) {
        return $jscomp.owns(d, B) && $jscomp.owns(d[B], this.id_) ? delete d[B][this.id_] : !1;
    };
    return O;
}, "es6", "es3");
$jscomp.MapEntry = function() {};
$jscomp.polyfill("Map", function(d) {
    function n() {
        if ($jscomp.ASSUME_NO_NATIVE_MAP || !d || "function" != typeof d || !d.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
            var h = Object.seal({
                x: 4
            }), n = new d($jscomp.makeIterator([
                [
                    h,
                    "s"
                ]
            ]));
            if ("s" != n.get(h) || 1 != n.size || n.get({
                x: 4
            }) || n.set({
                x: 4
            }, "t") != n || 2 != n.size) return !1;
            var B = n.entries(), t = B.next();
            if (t.done || t.value[0] != h || "s" != t.value[1]) return !1;
            t = B.next();
            return t.done || 4 != t.value[0].x || "t" != t.value[1] || !B.next().done ? !1 : !0;
        } catch (nc) {
            return !1;
        }
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (d && $jscomp.ES6_CONFORMANCE) return d;
    } else if (n()) return d;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var t = new WeakMap, G = function(d) {
        this.data_ = {};
        this.head_ = O();
        this.size = 0;
        if (d) {
            d = $jscomp.makeIterator(d);
            for(var h; !(h = d.next()).done;)h = h.value, this.set(h[0], h[1]);
        }
    };
    G.prototype.set = function(d, h) {
        d = 0 === d ? 0 : d;
        var n = B(this, d);
        n.list || (n.list = this.data_[n.id] = []);
        n.entry ? n.entry.value = h : (n.entry = {
            next: this.head_,
            previous: this.head_.previous,
            head: this.head_,
            key: d,
            value: h
        }, n.list.push(n.entry), this.head_.previous.next = n.entry, this.head_.previous = n.entry, this.size++);
        return this;
    };
    G.prototype.delete = function(d) {
        d = B(this, d);
        return d.entry && d.list ? (d.list.splice(d.index, 1), d.list.length || delete this.data_[d.id], d.entry.previous.next = d.entry.next, d.entry.next.previous = d.entry.previous, d.entry.head = null, this.size--, !0) : !1;
    };
    G.prototype.clear = function() {
        this.data_ = {};
        this.head_ = this.head_.previous = O();
        this.size = 0;
    };
    G.prototype.has = function(d) {
        return !!B(this, d).entry;
    };
    G.prototype.get = function(d) {
        return (d = B(this, d).entry) && d.value;
    };
    G.prototype.entries = function() {
        return I(this, function(d) {
            return [
                d.key,
                d.value
            ];
        });
    };
    G.prototype.keys = function() {
        return I(this, function(d) {
            return d.key;
        });
    };
    G.prototype.values = function() {
        return I(this, function(d) {
            return d.value;
        });
    };
    G.prototype.forEach = function(d, h) {
        for(var n = this.entries(), p; !(p = n.next()).done;)p = p.value, d.call(h, p[1], p[0], this);
    };
    G.prototype[Symbol.iterator] = G.prototype.entries;
    var B = function(d, n) {
        var p = n && typeof n;
        "object" == p || "function" == p ? t.has(n) ? p = t.get(n) : (p = "" + ++h, t.set(n, p)) : p = "p_" + n;
        var B = d.data_[p];
        if (B && $jscomp.owns(d.data_, p)) for(d = 0; d < B.length; d++){
            var G = B[d];
            if (n !== n && G.key !== G.key || n === G.key) return {
                id: p,
                list: B,
                index: d,
                entry: G
            };
        }
        return {
            id: p,
            list: B,
            index: -1,
            entry: void 0
        };
    }, I = function(d, h) {
        var n = d.head_;
        return $jscomp.iteratorPrototype(function() {
            if (n) {
                for(; n.head != d.head_;)n = n.previous;
                for(; n.next != n.head;)return n = n.next, {
                    done: !1,
                    value: h(n)
                };
                n = null;
            }
            return {
                done: !0,
                value: void 0
            };
        });
    }, O = function() {
        var d = {};
        return d.previous = d.next = d.head = d;
    }, h = 0;
    return G;
}, "es6", "es3");
$jscomp.polyfill("Set", function(d) {
    function n() {
        if ($jscomp.ASSUME_NO_NATIVE_SET || !d || "function" != typeof d || !d.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
            var n = Object.seal({
                x: 4
            }), B = new d($jscomp.makeIterator([
                n
            ]));
            if (!B.has(n) || 1 != B.size || B.add(n) != B || 1 != B.size || B.add({
                x: 4
            }) != B || 2 != B.size) return !1;
            var t = B.entries(), O = t.next();
            if (O.done || O.value[0] != n || O.value[1] != n) return !1;
            O = t.next();
            return O.done || O.value[0] == n || 4 != O.value[0].x || O.value[1] != O.value[0] ? !1 : t.next().done;
        } catch (h) {
            return !1;
        }
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (d && $jscomp.ES6_CONFORMANCE) return d;
    } else if (n()) return d;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var t = function(d) {
        this.map_ = new Map;
        if (d) {
            d = $jscomp.makeIterator(d);
            for(var n; !(n = d.next()).done;)this.add(n.value);
        }
        this.size = this.map_.size;
    };
    t.prototype.add = function(d) {
        d = 0 === d ? 0 : d;
        this.map_.set(d, d);
        this.size = this.map_.size;
        return this;
    };
    t.prototype.delete = function(d) {
        d = this.map_.delete(d);
        this.size = this.map_.size;
        return d;
    };
    t.prototype.clear = function() {
        this.map_.clear();
        this.size = 0;
    };
    t.prototype.has = function(d) {
        return this.map_.has(d);
    };
    t.prototype.entries = function() {
        return this.map_.entries();
    };
    t.prototype.values = function() {
        return this.map_.values();
    };
    t.prototype.keys = t.prototype.values;
    t.prototype[Symbol.iterator] = t.prototype.values;
    t.prototype.forEach = function(d, n) {
        var t = this;
        this.map_.forEach(function(B) {
            return d.call(n, B, B, t);
        });
    };
    return t;
}, "es6", "es3");
$jscomp.underscoreProtoCanBeSet = function() {
    var d = {
        a: !0
    }, n = {};
    try {
        return n.__proto__ = d, n.a;
    } catch (t) {}
    return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(d, n) {
    d.__proto__ = n;
    if (d.__proto__ !== n) throw new TypeError(d + " is not extensible");
    return d;
} : null;
$jscomp.polyfill("Object.setPrototypeOf", function(d) {
    return d || $jscomp.setPrototypeOf;
}, "es6", "es5");
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(d, n) {
    for(var t = 1; t < arguments.length; t++){
        var G = arguments[t];
        if (G) for(var B in G)$jscomp.owns(G, B) && (d[B] = G[B]);
    }
    return d;
};
$jscomp.polyfill("Object.assign", function(d) {
    return d || $jscomp.assign;
}, "es6", "es3");
$jscomp.polyfill("Object.values", function(d) {
    return d ? d : function(d) {
        var n = [], G;
        for(G in d)$jscomp.owns(d, G) && n.push(d[G]);
        return n;
    };
}, "es8", "es3");
$jscomp.polyfill("Array.prototype.fill", function(d) {
    return d ? d : function(d, t, G) {
        var n = this.length || 0;
        0 > t && (t = Math.max(0, n + t));
        if (null == G || G > n) G = n;
        G = Number(G);
        0 > G && (G = Math.max(0, n + G));
        for(t = Number(t || 0); t < G; t++)this[t] = d;
        return this;
    };
}, "es6", "es3");
var enableInlineVideo = function() {
    function d(f, d, h, n) {
        function p(h) {
            t = d(p, n);
            f(h - (B || h));
            B = h;
        }
        var t, B;
        return {
            start: function() {
                t || p(0);
            },
            stop: function() {
                h(t);
                t = null;
                B = 0;
            }
        };
    }
    function n(f, d, h, n) {
        function p(d) {
            !!f[h] === !!n && d.stopImmediatePropagation();
            delete f[h];
        }
        return f.addEventListener(d, p, !1), p;
    }
    function t(f, d, h, n) {
        function p(f) {
            h[d] = f;
        }
        n && p(f[d]);
        Object.defineProperty(f, d, {
            get: function() {
                return h[d];
            },
            set: p
        });
    }
    function G(f, d, h) {
        h.addEventListener(d, function() {
            return f.dispatchEvent(new Event(d));
        });
    }
    function B(f, d) {
        Promise.resolve().then(function() {
            f.dispatchEvent(new Event(d));
        });
    }
    function I(f) {
        var d = new Audio;
        return G(f, "play", d), G(f, "playing", d), G(f, "pause", d), d.crossOrigin = f.crossOrigin, d.src = f.src || f.currentSrc || "data:", d;
    }
    function O(d, h, n) {
        (Wa || 0) + 200 < Date.now() && (d[K] = !0, Wa = Date.now());
        n || (d.currentTime = h);
        f[++ba % 3] = 100 * h | 0;
    }
    function h(f) {
        this.video.readyState >= this.video.HAVE_FUTURE_DATA ? (this.hasAudio || (this.driver.currentTime = this.video.currentTime + f * this.video.playbackRate / 1E3, this.video.loop && this.driver.currentTime >= this.video.duration && (this.driver.currentTime = 0)), O(this.video, this.driver.currentTime)) : this.video.networkState === this.video.NETWORK_IDLE && 0 === this.video.buffered.length && this.video.load();
        this.video.ended && (delete this.video[K], this.video.pause(!0));
    }
    function X() {
        var f = this[db];
        return this.webkitDisplayingFullscreen ? void this[ta]() : ("data:" !== f.driver.src && f.driver.src !== this.src && (O(this, 0, !0), f.driver.src = this.src), void (this.paused && (f.paused = !1, 0 === this.buffered.length && this.load(), f.driver.play(), f.updater.start(), f.hasAudio || (B(this, "play"), f.video.readyState >= f.video.HAVE_ENOUGH_DATA && B(this, "playing")))));
    }
    function p(f) {
        var d = this[db];
        d.driver.pause();
        d.updater.stop();
        this.webkitDisplayingFullscreen && this[Na]();
        d.paused && !f || (d.paused = !0, d.hasAudio || B(this, "pause"), this.ended && (this[K] = !0, B(this, "ended")));
    }
    function ia(n, p) {
        var t = n[db] = {};
        t.paused = !0;
        t.hasAudio = p;
        t.video = n;
        t.updater = d(h.bind(t), requestAnimationFrame, cancelAnimationFrame);
        p ? t.driver = I(n) : (n.addEventListener("canplay", function() {
            n.paused || B(n, "playing");
        }), t.driver = {
            src: n.src || n.currentSrc || "data:",
            muted: !0,
            paused: !0,
            pause: function() {
                t.driver.paused = !0;
            },
            play: function() {
                t.driver.paused = !1;
                t.driver.currentTime >= t.video.duration && O(n, 0);
            },
            get ended () {
                return t.driver.currentTime >= t.video.duration;
            }
        });
        n.addEventListener("emptied", function() {
            var f = !t.driver.src || "data:" === t.driver.src;
            t.driver.src && t.driver.src !== n.src && (O(n, 0, !0), t.driver.src = n.src, f ? t.driver.play() : t.updater.stop());
        }, !1);
        n.addEventListener("webkitbeginfullscreen", function() {
            n.paused ? p && 0 === t.driver.buffered.length && t.driver.load() : (n.pause(), n[ta]());
        });
        p && (n.addEventListener("webkitendfullscreen", function() {
            t.driver.currentTime = n.currentTime;
        }), n.addEventListener("seeking", function() {
            0 > f.indexOf(100 * n.currentTime | 0) && (t.driver.currentTime = n.currentTime);
        }));
    }
    var Wa, nc = "object" == typeof document && "object-fit" in document.head.style && !matchMedia("(-webkit-video-playable-inline)").matches, db = "bfred-it:iphone-inline-video", K = "bfred-it:iphone-inline-video:event", ta = "bfred-it:iphone-inline-video:nativeplay", Na = "bfred-it:iphone-inline-video:nativepause", f = [], ba = 0;
    return function(f, d) {
        if (void 0 === d && (d = {}), !f[db]) {
            if (d.everywhere || nc && (d.iPad || d.ipad ? /iPhone|iPod|iPad/ : /iPhone|iPod/).test(navigator.userAgent)) !f.paused && f.webkitDisplayingFullscreen && f.pause(), ia(f, !f.muted), d = f[db], f[ta] = f.play, f[Na] = f.pause, f.play = X, f.pause = p, t(f, "paused", d.driver), t(f, "muted", d.driver, !0), t(f, "playbackRate", d.driver, !0), t(f, "ended", d.driver), t(f, "loop", d.driver, !0), n(f, "seeking"), n(f, "seeked"), n(f, "timeupdate", K, !1), n(f, "ended", K, !1), f.classList.add("IIV"), f.muted && f.autoplay && f.play(), /iPhone|iPod|iPad/.test(navigator.platform) || console.warn("iphone-inline-video is not guaranteed to work in emulated environments");
        }
    };
}();
(function() {
    function d(b, c, k) {
        f.biginteger_used = 1;
        null != b && ("number" == typeof b && "undefined" == typeof c ? this.fromInt(b) : "number" == typeof b ? this.fromNumber(b, c, k) : null == c && "string" != typeof b ? this.fromString(b, 256) : this.fromString(b, c));
    }
    function n() {
        return new d(null, void 0, void 0);
    }
    function t(b, c, k, U, f, d) {
        for(; 0 <= --d;){
            var ca = c * this[b++] + k[U] + f;
            f = Math.floor(ca / 67108864);
            k[U++] = ca & 67108863;
        }
        return f;
    }
    function G(b, c, k, U, f, d) {
        var ca = c & 32767;
        for(c >>= 15; 0 <= --d;){
            var h = this[b] & 32767, Z = this[b++] >> 15, n = c * h + Z * ca;
            h = ca * h + ((n & 32767) << 15) + k[U] + (f & 1073741823);
            f = (h >>> 30) + (n >>> 15) + c * Z + (f >>> 30);
            k[U++] = h & 1073741823;
        }
        return f;
    }
    function B(b, c, k, U, f, d) {
        var ca = c & 16383;
        for(c >>= 14; 0 <= --d;){
            var h = this[b] & 16383, Z = this[b++] >> 14, n = c * h + Z * ca;
            h = ca * h + ((n & 16383) << 14) + k[U] + f;
            f = (h >> 28) + (n >> 14) + c * Z;
            k[U++] = h & 268435455;
        }
        return f;
    }
    function I(b, c) {
        b = Xa[b.charCodeAt(c)];
        return null == b ? -1 : b;
    }
    function O(b) {
        var c = n();
        c.fromInt(b);
        return c;
    }
    function h(b) {
        var c = 1, k;
        0 != (k = b >>> 16) && (b = k, c += 16);
        0 != (k = b >> 8) && (b = k, c += 8);
        0 != (k = b >> 4) && (b = k, c += 4);
        0 != (k = b >> 2) && (b = k, c += 2);
        0 != b >> 1 && (c += 1);
        return c;
    }
    function X(b) {
        this.m = b;
    }
    function p(b) {
        this.m = b;
        this.mp = b.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << b.DB - 15) - 1;
        this.mt2 = 2 * b.t;
    }
    function ia(b, c) {
        return b & c;
    }
    function Wa(b, c) {
        return b | c;
    }
    function nc(b, c) {
        return b ^ c;
    }
    function db(b, c) {
        return b & ~c;
    }
    function K() {}
    function ta(b) {
        return b;
    }
    function Na(b) {
        this.r2 = n();
        this.q3 = n();
        d.ONE.dlShiftTo(2 * b.t, this.r2);
        this.mu = this.r2.divide(b);
        this.m = b;
    }
    var f = {
        use_lines: !0,
        use_xyz: !1
    }, ba = !1;
    "undefined" !== typeof module && module.exports ? (module.exports = f, ba = !0) : "undefined" !== typeof document ? window.ClipperLib = f : self.ClipperLib = f;
    if (ba) {
        va = "chrome";
        var ua = "Netscape";
    } else {
        var va = navigator.userAgent.toString().toLowerCase();
        ua = navigator.appName;
    }
    var F = -1 != va.indexOf("chrome") && -1 == va.indexOf("chromium") ? 1 : 0;
    ba = -1 != va.indexOf("chromium") ? 1 : 0;
    var ub = -1 != va.indexOf("safari") && -1 == va.indexOf("chrome") && -1 == va.indexOf("chromium") ? 1 : 0;
    var Wb = -1 != va.indexOf("firefox") ? 1 : 0;
    va.indexOf("firefox/17");
    va.indexOf("firefox/15");
    va.indexOf("firefox/3");
    var Ab = -1 != va.indexOf("opera") ? 1 : 0;
    va.indexOf("msie 10");
    va.indexOf("msie 9");
    var Bb = -1 != va.indexOf("msie 8") ? 1 : 0;
    var zb = -1 != va.indexOf("msie 7") ? 1 : 0;
    va = -1 != va.indexOf("msie ") ? 1 : 0;
    f.biginteger_used = null;
    "Microsoft Internet Explorer" == ua ? (d.prototype.am = G, ua = 30) : "Netscape" != ua ? (d.prototype.am = t, ua = 26) : (d.prototype.am = B, ua = 28);
    d.prototype.DB = ua;
    d.prototype.DM = (1 << ua) - 1;
    d.prototype.DV = 1 << ua;
    d.prototype.FV = Math.pow(2, 52);
    d.prototype.F1 = 52 - ua;
    d.prototype.F2 = 2 * ua - 52;
    var Xa = [], Oa;
    ua = 48;
    for(Oa = 0; 9 >= Oa; ++Oa)Xa[ua++] = Oa;
    ua = 97;
    for(Oa = 10; 36 > Oa; ++Oa)Xa[ua++] = Oa;
    ua = 65;
    for(Oa = 10; 36 > Oa; ++Oa)Xa[ua++] = Oa;
    X.prototype.convert = function(b) {
        return 0 > b.s || 0 <= b.compareTo(this.m) ? b.mod(this.m) : b;
    };
    X.prototype.revert = function(b) {
        return b;
    };
    X.prototype.reduce = function(b) {
        b.divRemTo(this.m, null, b);
    };
    X.prototype.mulTo = function(b, c, k) {
        b.multiplyTo(c, k);
        this.reduce(k);
    };
    X.prototype.sqrTo = function(b, c) {
        b.squareTo(c);
        this.reduce(c);
    };
    p.prototype.convert = function(b) {
        var c = n();
        b.abs().dlShiftTo(this.m.t, c);
        c.divRemTo(this.m, null, c);
        0 > b.s && 0 < c.compareTo(d.ZERO) && this.m.subTo(c, c);
        return c;
    };
    p.prototype.revert = function(b) {
        var c = n();
        b.copyTo(c);
        this.reduce(c);
        return c;
    };
    p.prototype.reduce = function(b) {
        for(; b.t <= this.mt2;)b[b.t++] = 0;
        for(var c = 0; c < this.m.t; ++c){
            var k = b[c] & 32767, U = k * this.mpl + ((k * this.mph + (b[c] >> 15) * this.mpl & this.um) << 15) & b.DM;
            k = c + this.m.t;
            for(b[k] += this.m.am(0, U, b, c, 0, this.m.t); b[k] >= b.DV;)b[k] -= b.DV, b[++k]++;
        }
        b.clamp();
        b.drShiftTo(this.m.t, b);
        0 <= b.compareTo(this.m) && b.subTo(this.m, b);
    };
    p.prototype.mulTo = function(b, c, k) {
        b.multiplyTo(c, k);
        this.reduce(k);
    };
    p.prototype.sqrTo = function(b, c) {
        b.squareTo(c);
        this.reduce(c);
    };
    d.prototype.copyTo = function(b) {
        for(var c = this.t - 1; 0 <= c; --c)b[c] = this[c];
        b.t = this.t;
        b.s = this.s;
    };
    d.prototype.fromInt = function(b) {
        this.t = 1;
        this.s = 0 > b ? -1 : 0;
        0 < b ? this[0] = b : -1 > b ? this[0] = b + this.DV : this.t = 0;
    };
    d.prototype.fromString = function(b, c) {
        if (16 == c) c = 4;
        else if (8 == c) c = 3;
        else if (256 == c) c = 8;
        else if (2 == c) c = 1;
        else if (32 == c) c = 5;
        else if (4 == c) c = 2;
        else {
            this.fromRadix(b, c);
            return;
        }
        this.s = this.t = 0;
        for(var k = b.length, U = !1, f = 0; 0 <= --k;){
            var h = 8 == c ? b[k] & 255 : I(b, k);
            0 > h ? "-" == b.charAt(k) && (U = !0) : (U = !1, 0 == f ? this[this.t++] = h : f + c > this.DB ? (this[this.t - 1] |= (h & (1 << this.DB - f) - 1) << f, this[this.t++] = h >> this.DB - f) : this[this.t - 1] |= h << f, f += c, f >= this.DB && (f -= this.DB));
        }
        8 == c && 0 != (b[0] & 128) && (this.s = -1, 0 < f && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f));
        this.clamp();
        U && d.ZERO.subTo(this, this);
    };
    d.prototype.clamp = function() {
        for(var b = this.s & this.DM; 0 < this.t && this[this.t - 1] == b;)--this.t;
    };
    d.prototype.dlShiftTo = function(b, c) {
        var k;
        for(k = this.t - 1; 0 <= k; --k)c[k + b] = this[k];
        for(k = b - 1; 0 <= k; --k)c[k] = 0;
        c.t = this.t + b;
        c.s = this.s;
    };
    d.prototype.drShiftTo = function(b, c) {
        for(var k = b; k < this.t; ++k)c[k - b] = this[k];
        c.t = Math.max(this.t - b, 0);
        c.s = this.s;
    };
    d.prototype.lShiftTo = function(b, c) {
        var k = b % this.DB, f = this.DB - k, d = (1 << f) - 1;
        b = Math.floor(b / this.DB);
        var h = this.s << k & this.DM, n;
        for(n = this.t - 1; 0 <= n; --n)c[n + b + 1] = this[n] >> f | h, h = (this[n] & d) << k;
        for(n = b - 1; 0 <= n; --n)c[n] = 0;
        c[b] = h;
        c.t = this.t + b + 1;
        c.s = this.s;
        c.clamp();
    };
    d.prototype.rShiftTo = function(b, c) {
        c.s = this.s;
        var k = Math.floor(b / this.DB);
        if (k >= this.t) c.t = 0;
        else {
            b %= this.DB;
            var f = this.DB - b, d = (1 << b) - 1;
            c[0] = this[k] >> b;
            for(var h = k + 1; h < this.t; ++h)c[h - k - 1] |= (this[h] & d) << f, c[h - k] = this[h] >> b;
            0 < b && (c[this.t - k - 1] |= (this.s & d) << f);
            c.t = this.t - k;
            c.clamp();
        }
    };
    d.prototype.subTo = function(b, c) {
        for(var k = 0, f = 0, d = Math.min(b.t, this.t); k < d;)f += this[k] - b[k], c[k++] = f & this.DM, f >>= this.DB;
        if (b.t < this.t) {
            for(f -= b.s; k < this.t;)f += this[k], c[k++] = f & this.DM, f >>= this.DB;
            f += this.s;
        } else {
            for(f += this.s; k < b.t;)f -= b[k], c[k++] = f & this.DM, f >>= this.DB;
            f -= b.s;
        }
        c.s = 0 > f ? -1 : 0;
        -1 > f ? c[k++] = this.DV + f : 0 < f && (c[k++] = f);
        c.t = k;
        c.clamp();
    };
    d.prototype.multiplyTo = function(b, c) {
        var k = this.abs(), f = b.abs(), ca = k.t;
        for(c.t = ca + f.t; 0 <= --ca;)c[ca] = 0;
        for(ca = 0; ca < f.t; ++ca)c[ca + k.t] = k.am(0, f[ca], c, ca, 0, k.t);
        c.s = 0;
        c.clamp();
        this.s != b.s && d.ZERO.subTo(c, c);
    };
    d.prototype.squareTo = function(b) {
        for(var c = this.abs(), k = b.t = 2 * c.t; 0 <= --k;)b[k] = 0;
        for(k = 0; k < c.t - 1; ++k){
            var f = c.am(k, c[k], b, 2 * k, 0, 1);
            (b[k + c.t] += c.am(k + 1, 2 * c[k], b, 2 * k + 1, f, c.t - k - 1)) >= c.DV && (b[k + c.t] -= c.DV, b[k + c.t + 1] = 1);
        }
        0 < b.t && (b[b.t - 1] += c.am(k, c[k], b, 2 * k, 0, 1));
        b.s = 0;
        b.clamp();
    };
    d.prototype.divRemTo = function(b, c, k) {
        var f = b.abs();
        if (!(0 >= f.t)) {
            var ca = this.abs();
            if (ca.t < f.t) null != c && c.fromInt(0), null != k && this.copyTo(k);
            else {
                null == k && (k = n());
                var Z = n(), J = this.s;
                b = b.s;
                var p = this.DB - h(f[f.t - 1]);
                0 < p ? (f.lShiftTo(p, Z), ca.lShiftTo(p, k)) : (f.copyTo(Z), ca.copyTo(k));
                f = Z.t;
                ca = Z[f - 1];
                if (0 != ca) {
                    var t = ca * (1 << this.F1) + (1 < f ? Z[f - 2] >> this.F2 : 0), B = this.FV / t;
                    t = (1 << this.F1) / t;
                    var F = 1 << this.F2, G = k.t, I = G - f, K = null == c ? n() : c;
                    Z.dlShiftTo(I, K);
                    0 <= k.compareTo(K) && (k[k.t++] = 1, k.subTo(K, k));
                    d.ONE.dlShiftTo(f, K);
                    for(K.subTo(Z, Z); Z.t < f;)Z[Z.t++] = 0;
                    for(; 0 <= --I;){
                        var ia = k[--G] == ca ? this.DM : Math.floor(k[G] * B + (k[G - 1] + F) * t);
                        if ((k[G] += Z.am(0, ia, k, I, 0, f)) < ia) for(Z.dlShiftTo(I, K), k.subTo(K, k); k[G] < --ia;)k.subTo(K, k);
                    }
                    null != c && (k.drShiftTo(f, c), J != b && d.ZERO.subTo(c, c));
                    k.t = f;
                    k.clamp();
                    0 < p && k.rShiftTo(p, k);
                    0 > J && d.ZERO.subTo(k, k);
                }
            }
        }
    };
    d.prototype.invDigit = function() {
        if (1 > this.t) return 0;
        var b = this[0];
        if (0 == (b & 1)) return 0;
        var c = b & 3;
        c = c * (2 - (b & 15) * c) & 15;
        c = c * (2 - (b & 255) * c) & 255;
        c = c * (2 - ((b & 65535) * c & 65535)) & 65535;
        c = c * (2 - b * c % this.DV) % this.DV;
        return 0 < c ? this.DV - c : -c;
    };
    d.prototype.isEven = function() {
        return 0 == (0 < this.t ? this[0] & 1 : this.s);
    };
    d.prototype.exp = function(b, c) {
        if (4294967295 < b || 1 > b) return d.ONE;
        var k = n(), f = n(), ca = c.convert(this), Z = h(b) - 1;
        for(ca.copyTo(k); 0 <= --Z;)if (c.sqrTo(k, f), 0 < (b & 1 << Z)) c.mulTo(f, ca, k);
        else {
            var J = k;
            k = f;
            f = J;
        }
        return c.revert(k);
    };
    d.prototype.toString = function(b) {
        if (0 > this.s) return "-" + this.negate().toString(b);
        if (16 == b) b = 4;
        else if (8 == b) b = 3;
        else if (2 == b) b = 1;
        else if (32 == b) b = 5;
        else if (4 == b) b = 2;
        else return this.toRadix(b);
        var c = (1 << b) - 1, k, f = !1, d = "", h = this.t, n = this.DB - h * this.DB % b;
        if (0 < h--) for(n < this.DB && 0 < (k = this[h] >> n) && (f = !0, d = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(k)); 0 <= h;)n < b ? (k = (this[h] & (1 << n) - 1) << b - n, k |= this[--h] >> (n += this.DB - b)) : (k = this[h] >> (n -= b) & c, 0 >= n && (n += this.DB, --h)), 0 < k && (f = !0), f && (d += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(k));
        return f ? d : "0";
    };
    d.prototype.negate = function() {
        var b = n();
        d.ZERO.subTo(this, b);
        return b;
    };
    d.prototype.abs = function() {
        return 0 > this.s ? this.negate() : this;
    };
    d.prototype.compareTo = function(b) {
        var c = this.s - b.s;
        if (0 != c) return c;
        var k = this.t;
        c = k - b.t;
        if (0 != c) return 0 > this.s ? -c : c;
        for(; 0 <= --k;)if (0 != (c = this[k] - b[k])) return c;
        return 0;
    };
    d.prototype.bitLength = function() {
        return 0 >= this.t ? 0 : this.DB * (this.t - 1) + h(this[this.t - 1] ^ this.s & this.DM);
    };
    d.prototype.mod = function(b) {
        var c = n();
        this.abs().divRemTo(b, null, c);
        0 > this.s && 0 < c.compareTo(d.ZERO) && b.subTo(c, c);
        return c;
    };
    d.prototype.modPowInt = function(b, c) {
        c = 256 > b || c.isEven() ? new X(c) : new p(c);
        return this.exp(b, c);
    };
    d.ZERO = O(0);
    d.ONE = O(1);
    K.prototype.convert = ta;
    K.prototype.revert = ta;
    K.prototype.mulTo = function(b, c, k) {
        b.multiplyTo(c, k);
    };
    K.prototype.sqrTo = function(b, c) {
        b.squareTo(c);
    };
    Na.prototype.convert = function(b) {
        if (0 > b.s || b.t > 2 * this.m.t) return b.mod(this.m);
        if (0 > b.compareTo(this.m)) return b;
        var c = n();
        b.copyTo(c);
        this.reduce(c);
        return c;
    };
    Na.prototype.revert = function(b) {
        return b;
    };
    Na.prototype.reduce = function(b) {
        b.drShiftTo(this.m.t - 1, this.r2);
        b.t > this.m.t + 1 && (b.t = this.m.t + 1, b.clamp());
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        for(this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > b.compareTo(this.r2);)b.dAddOffset(1, this.m.t + 1);
        for(b.subTo(this.r2, b); 0 <= b.compareTo(this.m);)b.subTo(this.m, b);
    };
    Na.prototype.mulTo = function(b, c, k) {
        b.multiplyTo(c, k);
        this.reduce(k);
    };
    Na.prototype.sqrTo = function(b, c) {
        b.squareTo(c);
        this.reduce(c);
    };
    var T = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
        101,
        103,
        107,
        109,
        113,
        127,
        131,
        137,
        139,
        149,
        151,
        157,
        163,
        167,
        173,
        179,
        181,
        191,
        193,
        197,
        199,
        211,
        223,
        227,
        229,
        233,
        239,
        241,
        251,
        257,
        263,
        269,
        271,
        277,
        281,
        283,
        293,
        307,
        311,
        313,
        317,
        331,
        337,
        347,
        349,
        353,
        359,
        367,
        373,
        379,
        383,
        389,
        397,
        401,
        409,
        419,
        421,
        431,
        433,
        439,
        443,
        449,
        457,
        461,
        463,
        467,
        479,
        487,
        491,
        499,
        503,
        509,
        521,
        523,
        541,
        547,
        557,
        563,
        569,
        571,
        577,
        587,
        593,
        599,
        601,
        607,
        613,
        617,
        619,
        631,
        641,
        643,
        647,
        653,
        659,
        661,
        673,
        677,
        683,
        691,
        701,
        709,
        719,
        727,
        733,
        739,
        743,
        751,
        757,
        761,
        769,
        773,
        787,
        797,
        809,
        811,
        821,
        823,
        827,
        829,
        839,
        853,
        857,
        859,
        863,
        877,
        881,
        883,
        887,
        907,
        911,
        919,
        929,
        937,
        941,
        947,
        953,
        967,
        971,
        977,
        983,
        991,
        997
    ], Gb = 67108864 / T[T.length - 1];
    d.prototype.chunkSize = function(b) {
        return Math.floor(Math.LN2 * this.DB / Math.log(b));
    };
    d.prototype.toRadix = function(b) {
        null == b && (b = 10);
        if (0 == this.signum() || 2 > b || 36 < b) return "0";
        var c = this.chunkSize(b);
        c = Math.pow(b, c);
        var k = O(c), f = n(), d = n(), h = "";
        for(this.divRemTo(k, f, d); 0 < f.signum();)h = (c + d.intValue()).toString(b).substr(1) + h, f.divRemTo(k, f, d);
        return d.intValue().toString(b) + h;
    };
    d.prototype.fromRadix = function(b, c) {
        this.fromInt(0);
        null == c && (c = 10);
        for(var k = this.chunkSize(c), f = Math.pow(c, k), ca = !1, h = 0, n = 0, p = 0; p < b.length; ++p){
            var t = I(b, p);
            0 > t ? "-" == b.charAt(p) && 0 == this.signum() && (ca = !0) : (n = c * n + t, ++h >= k && (this.dMultiply(f), this.dAddOffset(n, 0), n = h = 0));
        }
        0 < h && (this.dMultiply(Math.pow(c, h)), this.dAddOffset(n, 0));
        ca && d.ZERO.subTo(this, this);
    };
    d.prototype.fromNumber = function(b, c, k) {
        if ("number" == typeof c) {
            if (2 > b) this.fromInt(1);
            else for(this.fromNumber(b, k), this.testBit(b - 1) || this.bitwiseTo(d.ONE.shiftLeft(b - 1), Wa, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(c);)this.dAddOffset(2, 0), this.bitLength() > b && this.subTo(d.ONE.shiftLeft(b - 1), this);
        } else {
            k = [];
            var f = b & 7;
            k.length = (b >> 3) + 1;
            c.nextBytes(k);
            k[0] = 0 < f ? k[0] & (1 << f) - 1 : 0;
            this.fromString(k, 256);
        }
    };
    d.prototype.bitwiseTo = function(b, c, k) {
        var f, d = Math.min(b.t, this.t);
        for(f = 0; f < d; ++f)k[f] = c(this[f], b[f]);
        if (b.t < this.t) {
            var h = b.s & this.DM;
            for(f = d; f < this.t; ++f)k[f] = c(this[f], h);
            k.t = this.t;
        } else {
            h = this.s & this.DM;
            for(f = d; f < b.t; ++f)k[f] = c(h, b[f]);
            k.t = b.t;
        }
        k.s = c(this.s, b.s);
        k.clamp();
    };
    d.prototype.changeBit = function(b, c) {
        b = d.ONE.shiftLeft(b);
        this.bitwiseTo(b, c, b);
        return b;
    };
    d.prototype.addTo = function(b, c) {
        for(var k = 0, f = 0, d = Math.min(b.t, this.t); k < d;)f += this[k] + b[k], c[k++] = f & this.DM, f >>= this.DB;
        if (b.t < this.t) {
            for(f += b.s; k < this.t;)f += this[k], c[k++] = f & this.DM, f >>= this.DB;
            f += this.s;
        } else {
            for(f += this.s; k < b.t;)f += b[k], c[k++] = f & this.DM, f >>= this.DB;
            f += b.s;
        }
        c.s = 0 > f ? -1 : 0;
        0 < f ? c[k++] = f : -1 > f && (c[k++] = this.DV + f);
        c.t = k;
        c.clamp();
    };
    d.prototype.dMultiply = function(b) {
        this[this.t] = this.am(0, b - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
    };
    d.prototype.dAddOffset = function(b, c) {
        if (0 != b) {
            for(; this.t <= c;)this[this.t++] = 0;
            for(this[c] += b; this[c] >= this.DV;)this[c] -= this.DV, ++c >= this.t && (this[this.t++] = 0), ++this[c];
        }
    };
    d.prototype.multiplyLowerTo = function(b, c, k) {
        var f = Math.min(this.t + b.t, c);
        k.s = 0;
        for(k.t = f; 0 < f;)k[--f] = 0;
        var d;
        for(d = k.t - this.t; f < d; ++f)k[f + this.t] = this.am(0, b[f], k, f, 0, this.t);
        for(d = Math.min(b.t, c); f < d; ++f)this.am(0, b[f], k, f, 0, c - f);
        k.clamp();
    };
    d.prototype.multiplyUpperTo = function(b, c, k) {
        --c;
        var f = k.t = this.t + b.t - c;
        for(k.s = 0; 0 <= --f;)k[f] = 0;
        for(f = Math.max(c - this.t, 0); f < b.t; ++f)k[this.t + f - c] = this.am(c - f, b[f], k, 0, 0, this.t + f - c);
        k.clamp();
        k.drShiftTo(1, k);
    };
    d.prototype.modInt = function(b) {
        if (0 >= b) return 0;
        var c = this.DV % b, k = 0 > this.s ? b - 1 : 0;
        if (0 < this.t) {
            if (0 == c) k = this[0] % b;
            else for(var f = this.t - 1; 0 <= f; --f)k = (c * k + this[f]) % b;
        }
        return k;
    };
    d.prototype.millerRabin = function(b) {
        var c = this.subtract(d.ONE), k = c.getLowestSetBit();
        if (0 >= k) return !1;
        var f = c.shiftRight(k);
        b = b + 1 >> 1;
        b > T.length && (b = T.length);
        for(var ca = n(), h = 0; h < b; ++h){
            ca.fromInt(T[Math.floor(Math.random() * T.length)]);
            var J = ca.modPow(f, this);
            if (0 != J.compareTo(d.ONE) && 0 != J.compareTo(c)) {
                for(var p = 1; (p++) < k && 0 != J.compareTo(c);)if (J = J.modPowInt(2, this), 0 == J.compareTo(d.ONE)) return !1;
                if (0 != J.compareTo(c)) return !1;
            }
        }
        return !0;
    };
    d.prototype.clone = function() {
        var b = n();
        this.copyTo(b);
        return b;
    };
    d.prototype.intValue = function() {
        if (0 > this.s) {
            if (1 == this.t) return this[0] - this.DV;
            if (0 == this.t) return -1;
        } else {
            if (1 == this.t) return this[0];
            if (0 == this.t) return 0;
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    };
    d.prototype.byteValue = function() {
        return 0 == this.t ? this.s : this[0] << 24 >> 24;
    };
    d.prototype.shortValue = function() {
        return 0 == this.t ? this.s : this[0] << 16 >> 16;
    };
    d.prototype.signum = function() {
        return 0 > this.s ? -1 : 0 >= this.t || 1 == this.t && 0 >= this[0] ? 0 : 1;
    };
    d.prototype.toByteArray = function() {
        var b = this.t, c = [];
        c[0] = this.s;
        var k = this.DB - b * this.DB % 8, f, d = 0;
        if (0 < b--) {
            for(k < this.DB && (f = this[b] >> k) != (this.s & this.DM) >> k && (c[d++] = f | this.s << this.DB - k); 0 <= b;)if (8 > k ? (f = (this[b] & (1 << k) - 1) << 8 - k, f |= this[--b] >> (k += this.DB - 8)) : (f = this[b] >> (k -= 8) & 255, 0 >= k && (k += this.DB, --b)), 0 != (f & 128) && (f |= -256), 0 == d && (this.s & 128) != (f & 128) && ++d, 0 < d || f != this.s) c[d++] = f;
        }
        return c;
    };
    d.prototype.equals = function(b) {
        return 0 == this.compareTo(b);
    };
    d.prototype.min = function(b) {
        return 0 > this.compareTo(b) ? this : b;
    };
    d.prototype.max = function(b) {
        return 0 < this.compareTo(b) ? this : b;
    };
    d.prototype.and = function(b) {
        var c = n();
        this.bitwiseTo(b, ia, c);
        return c;
    };
    d.prototype.or = function(b) {
        var c = n();
        this.bitwiseTo(b, Wa, c);
        return c;
    };
    d.prototype.xor = function(b) {
        var c = n();
        this.bitwiseTo(b, nc, c);
        return c;
    };
    d.prototype.andNot = function(b) {
        var c = n();
        this.bitwiseTo(b, db, c);
        return c;
    };
    d.prototype.not = function() {
        for(var b = n(), c = 0; c < this.t; ++c)b[c] = this.DM & ~this[c];
        b.t = this.t;
        b.s = ~this.s;
        return b;
    };
    d.prototype.shiftLeft = function(b) {
        var c = n();
        0 > b ? this.rShiftTo(-b, c) : this.lShiftTo(b, c);
        return c;
    };
    d.prototype.shiftRight = function(b) {
        var c = n();
        0 > b ? this.lShiftTo(-b, c) : this.rShiftTo(b, c);
        return c;
    };
    d.prototype.getLowestSetBit = function() {
        for(var b = 0; b < this.t; ++b)if (0 != this[b]) {
            var c = b * this.DB;
            b = this[b];
            if (0 == b) b = -1;
            else {
                var k = 0;
                0 == (b & 65535) && (b >>= 16, k += 16);
                0 == (b & 255) && (b >>= 8, k += 8);
                0 == (b & 15) && (b >>= 4, k += 4);
                0 == (b & 3) && (b >>= 2, k += 2);
                0 == (b & 1) && ++k;
                b = k;
            }
            return c + b;
        }
        return 0 > this.s ? this.t * this.DB : -1;
    };
    d.prototype.bitCount = function() {
        for(var b = 0, c = this.s & this.DM, k = 0; k < this.t; ++k){
            for(var f = this[k] ^ c, d = 0; 0 != f;)f &= f - 1, ++d;
            b += d;
        }
        return b;
    };
    d.prototype.testBit = function(b) {
        var c = Math.floor(b / this.DB);
        return c >= this.t ? 0 != this.s : 0 != (this[c] & 1 << b % this.DB);
    };
    d.prototype.setBit = function(b) {
        return this.changeBit(b, Wa);
    };
    d.prototype.clearBit = function(b) {
        return this.changeBit(b, db);
    };
    d.prototype.flipBit = function(b) {
        return this.changeBit(b, nc);
    };
    d.prototype.add = function(b) {
        var c = n();
        this.addTo(b, c);
        return c;
    };
    d.prototype.subtract = function(b) {
        var c = n();
        this.subTo(b, c);
        return c;
    };
    d.prototype.multiply = function(b) {
        var c = n();
        this.multiplyTo(b, c);
        return c;
    };
    d.prototype.divide = function(b) {
        var c = n();
        this.divRemTo(b, c, null);
        return c;
    };
    d.prototype.remainder = function(b) {
        var c = n();
        this.divRemTo(b, null, c);
        return c;
    };
    d.prototype.divideAndRemainder = function(b) {
        var c = n(), k = n();
        this.divRemTo(b, c, k);
        return [
            c,
            k
        ];
    };
    d.prototype.modPow = function(b, c) {
        var k = b.bitLength(), f = O(1);
        if (0 >= k) return f;
        var d = 18 > k ? 1 : 48 > k ? 3 : 144 > k ? 4 : 768 > k ? 5 : 6;
        c = 8 > k ? new X(c) : c.isEven() ? new Na(c) : new p(c);
        var Z = [], J = 3, t = d - 1, B = (1 << d) - 1;
        Z[1] = c.convert(this);
        if (1 < d) for(k = n(), c.sqrTo(Z[1], k); J <= B;)Z[J] = n(), c.mulTo(k, Z[J - 2], Z[J]), J += 2;
        var F = b.t - 1, G, K = !0, I = n();
        for(k = h(b[F]) - 1; 0 <= F;){
            k >= t ? G = b[F] >> k - t & B : (G = (b[F] & (1 << k + 1) - 1) << t - k, 0 < F && (G |= b[F - 1] >> this.DB + k - t));
            for(J = d; 0 == (G & 1);)G >>= 1, --J;
            0 > (k -= J) && (k += this.DB, --F);
            if (K) Z[G].copyTo(f), K = !1;
            else {
                for(; 1 < J;)c.sqrTo(f, I), c.sqrTo(I, f), J -= 2;
                0 < J ? c.sqrTo(f, I) : (J = f, f = I, I = J);
                c.mulTo(I, Z[G], f);
            }
            for(; 0 <= F && 0 == (b[F] & 1 << k);)c.sqrTo(f, I), J = f, f = I, I = J, 0 > --k && (k = this.DB - 1, --F);
        }
        return c.revert(f);
    };
    d.prototype.modInverse = function(b) {
        var c = b.isEven();
        if (this.isEven() && c || 0 == b.signum()) return d.ZERO;
        for(var k = b.clone(), f = this.clone(), h = O(1), n = O(0), J = O(0), p = O(1); 0 != k.signum();){
            for(; k.isEven();)k.rShiftTo(1, k), c ? (h.isEven() && n.isEven() || (h.addTo(this, h), n.subTo(b, n)), h.rShiftTo(1, h)) : n.isEven() || n.subTo(b, n), n.rShiftTo(1, n);
            for(; f.isEven();)f.rShiftTo(1, f), c ? (J.isEven() && p.isEven() || (J.addTo(this, J), p.subTo(b, p)), J.rShiftTo(1, J)) : p.isEven() || p.subTo(b, p), p.rShiftTo(1, p);
            0 <= k.compareTo(f) ? (k.subTo(f, k), c && h.subTo(J, h), n.subTo(p, n)) : (f.subTo(k, f), c && J.subTo(h, J), p.subTo(n, p));
        }
        if (0 != f.compareTo(d.ONE)) return d.ZERO;
        if (0 <= p.compareTo(b)) return p.subtract(b);
        if (0 > p.signum()) p.addTo(b, p);
        else return p;
        return 0 > p.signum() ? p.add(b) : p;
    };
    d.prototype.pow = function(b) {
        return this.exp(b, new K);
    };
    d.prototype.gcd = function(b) {
        var c = 0 > this.s ? this.negate() : this.clone();
        b = 0 > b.s ? b.negate() : b.clone();
        if (0 > c.compareTo(b)) {
            var k = c;
            c = b;
            b = k;
        }
        k = c.getLowestSetBit();
        var f = b.getLowestSetBit();
        if (0 > f) return c;
        k < f && (f = k);
        for(0 < f && (c.rShiftTo(f, c), b.rShiftTo(f, b)); 0 < c.signum();)0 < (k = c.getLowestSetBit()) && c.rShiftTo(k, c), 0 < (k = b.getLowestSetBit()) && b.rShiftTo(k, b), 0 <= c.compareTo(b) ? (c.subTo(b, c), c.rShiftTo(1, c)) : (b.subTo(c, b), b.rShiftTo(1, b));
        0 < f && b.lShiftTo(f, b);
        return b;
    };
    d.prototype.isProbablePrime = function(b) {
        var c, k = this.abs();
        if (1 == k.t && k[0] <= T[T.length - 1]) {
            for(c = 0; c < T.length; ++c)if (k[0] == T[c]) return !0;
            return !1;
        }
        if (k.isEven()) return !1;
        for(c = 1; c < T.length;){
            for(var f = T[c], d = c + 1; d < T.length && f < Gb;)f *= T[d++];
            for(f = k.modInt(f); c < d;)if (0 == f % T[c++]) return !1;
        }
        return k.millerRabin(b);
    };
    d.prototype.square = function() {
        var b = n();
        this.squareTo(b);
        return b;
    };
    d.prototype.IsNegative = function() {
        return -1 == this.compareTo(d.ZERO) ? !0 : !1;
    };
    d.op_Equality = function(b, c) {
        return 0 == b.compareTo(c) ? !0 : !1;
    };
    d.op_Inequality = function(b, c) {
        return 0 != b.compareTo(c) ? !0 : !1;
    };
    d.op_GreaterThan = function(b, c) {
        return 0 < b.compareTo(c) ? !0 : !1;
    };
    d.op_LessThan = function(b, c) {
        return 0 > b.compareTo(c) ? !0 : !1;
    };
    d.op_Addition = function(b, c) {
        return new d(b).add(new d(c));
    };
    d.op_Subtraction = function(b, c) {
        return new d(b).subtract(new d(c));
    };
    d.Int128Mul = function(b, c) {
        return new d(b).multiply(new d(c));
    };
    d.op_Division = function(b, c) {
        return b.divide(c);
    };
    d.prototype.ToDouble = function() {
        return parseFloat(this.toString());
    };
    ua = function(b, c) {
        var k;
        if ("undefined" == typeof Object.getOwnPropertyNames) {
            for(k in c.prototype)if ("undefined" == typeof b.prototype[k] || b.prototype[k] == Object.prototype[k]) b.prototype[k] = c.prototype[k];
        } else for(var f = Object.getOwnPropertyNames(c.prototype), d = 0; d < f.length; d++)"undefined" == typeof Object.getOwnPropertyDescriptor(b.prototype, f[d]) && Object.defineProperty(b.prototype, f[d], Object.getOwnPropertyDescriptor(c.prototype, f[d]));
        for(k in c)"undefined" == typeof b[k] && (b[k] = c[k]);
        b.$baseCtor = c;
    };
    f.Path = function() {
        return [];
    };
    f.Paths = function() {
        return [];
    };
    f.DoublePoint = function() {
        var b = arguments;
        this.Y = this.X = 0;
        1 == b.length ? (this.X = b[0].X, this.Y = b[0].Y) : 2 == b.length && (this.X = b[0], this.Y = b[1]);
    };
    f.DoublePoint0 = function() {
        this.Y = this.X = 0;
    };
    f.DoublePoint1 = function(b) {
        this.X = b.X;
        this.Y = b.Y;
    };
    f.DoublePoint2 = function(b, c) {
        this.X = b;
        this.Y = c;
    };
    f.PolyNode = function() {
        this.m_Parent = null;
        this.m_polygon = new f.Path;
        this.m_endtype = this.m_jointype = this.m_Index = 0;
        this.m_Childs = [];
        this.IsOpen = !1;
    };
    f.PolyNode.prototype.IsHoleNode = function() {
        for(var b = !0, c = this.m_Parent; null !== c;)b = !b, c = c.m_Parent;
        return b;
    };
    f.PolyNode.prototype.ChildCount = function() {
        return this.m_Childs.length;
    };
    f.PolyNode.prototype.Contour = function() {
        return this.m_polygon;
    };
    f.PolyNode.prototype.AddChild = function(b) {
        var c = this.m_Childs.length;
        this.m_Childs.push(b);
        b.m_Parent = this;
        b.m_Index = c;
    };
    f.PolyNode.prototype.GetNext = function() {
        return 0 < this.m_Childs.length ? this.m_Childs[0] : this.GetNextSiblingUp();
    };
    f.PolyNode.prototype.GetNextSiblingUp = function() {
        return null === this.m_Parent ? null : this.m_Index == this.m_Parent.m_Childs.length - 1 ? this.m_Parent.GetNextSiblingUp() : this.m_Parent.m_Childs[this.m_Index + 1];
    };
    f.PolyNode.prototype.Childs = function() {
        return this.m_Childs;
    };
    f.PolyNode.prototype.Parent = function() {
        return this.m_Parent;
    };
    f.PolyNode.prototype.IsHole = function() {
        return this.IsHoleNode();
    };
    f.PolyTree = function() {
        this.m_AllPolys = [];
        f.PolyNode.call(this);
    };
    f.PolyTree.prototype.Clear = function() {
        for(var b = 0, c = this.m_AllPolys.length; b < c; b++)this.m_AllPolys[b] = null;
        this.m_AllPolys.length = 0;
        this.m_Childs.length = 0;
    };
    f.PolyTree.prototype.GetFirst = function() {
        return 0 < this.m_Childs.length ? this.m_Childs[0] : null;
    };
    f.PolyTree.prototype.Total = function() {
        var b = this.m_AllPolys.length;
        0 < b && this.m_Childs[0] != this.m_AllPolys[0] && b--;
        return b;
    };
    ua(f.PolyTree, f.PolyNode);
    f.Math_Abs_Int64 = f.Math_Abs_Int32 = f.Math_Abs_Double = function(b) {
        return Math.abs(b);
    };
    f.Math_Max_Int32_Int32 = function(b, c) {
        return Math.max(b, c);
    };
    f.Cast_Int32 = va || Ab || ub ? function(b) {
        return b | 0;
    } : function(b) {
        return ~~b;
    };
    f.Cast_Int64 = F ? function(b) {
        return -2147483648 > b || 2147483647 < b ? 0 > b ? Math.ceil(b) : Math.floor(b) : ~~b;
    } : Wb && "function" == typeof Number.toInteger ? function(b) {
        return Number.toInteger(b);
    } : zb || Bb ? function(b) {
        return parseInt(b, 10);
    } : va ? function(b) {
        return -2147483648 > b || 2147483647 < b ? 0 > b ? Math.ceil(b) : Math.floor(b) : b | 0;
    } : function(b) {
        return 0 > b ? Math.ceil(b) : Math.floor(b);
    };
    f.Clear = function(b) {
        b.length = 0;
    };
    f.PI = 3.141592653589793;
    f.PI2 = 6.283185307179586;
    f.IntPoint = function() {
        var b = arguments, c = b.length;
        this.Y = this.X = 0;
        f.use_xyz ? (this.Z = 0, 3 == c ? (this.X = b[0], this.Y = b[1], this.Z = b[2]) : 2 == c ? (this.X = b[0], this.Y = b[1], this.Z = 0) : 1 == c ? b[0] instanceof f.DoublePoint ? (b = b[0], this.X = f.Clipper.Round(b.X), this.Y = f.Clipper.Round(b.Y), this.Z = 0) : (b = b[0], "undefined" == typeof b.Z && (b.Z = 0), this.X = b.X, this.Y = b.Y, this.Z = b.Z) : this.Z = this.Y = this.X = 0) : 2 == c ? (this.X = b[0], this.Y = b[1]) : 1 == c ? b[0] instanceof f.DoublePoint ? (b = b[0], this.X = f.Clipper.Round(b.X), this.Y = f.Clipper.Round(b.Y)) : (b = b[0], this.X = b.X, this.Y = b.Y) : this.Y = this.X = 0;
    };
    f.IntPoint.op_Equality = function(b, c) {
        return b.X == c.X && b.Y == c.Y;
    };
    f.IntPoint.op_Inequality = function(b, c) {
        return b.X != c.X || b.Y != c.Y;
    };
    f.use_xyz ? (f.IntPoint0 = function() {
        this.Z = this.Y = this.X = 0;
    }, f.IntPoint1 = function(b) {
        this.X = b.X;
        this.Y = b.Y;
        this.Z = b.Z;
    }, f.IntPoint1dp = function(b) {
        this.X = f.Clipper.Round(b.X);
        this.Y = f.Clipper.Round(b.Y);
        this.Z = 0;
    }, f.IntPoint2 = function(b, c) {
        this.X = b;
        this.Y = c;
        this.Z = 0;
    }, f.IntPoint3 = function(b, c, k) {
        this.X = b;
        this.Y = c;
        this.Z = k;
    }) : (f.IntPoint0 = function() {
        this.Y = this.X = 0;
    }, f.IntPoint1 = function(b) {
        this.X = b.X;
        this.Y = b.Y;
    }, f.IntPoint1dp = function(b) {
        this.X = f.Clipper.Round(b.X);
        this.Y = f.Clipper.Round(b.Y);
    }, f.IntPoint2 = function(b, c) {
        this.X = b;
        this.Y = c;
    });
    f.IntRect = function() {
        var b = arguments, c = b.length;
        4 == c ? (this.left = b[0], this.top = b[1], this.right = b[2], this.bottom = b[3]) : 1 == c ? (this.left = b[0].left, this.top = b[0].top, this.right = b[0].right, this.bottom = b[0].bottom) : this.bottom = this.right = this.top = this.left = 0;
    };
    f.IntRect0 = function() {
        this.bottom = this.right = this.top = this.left = 0;
    };
    f.IntRect1 = function(b) {
        this.left = b.left;
        this.top = b.top;
        this.right = b.right;
        this.bottom = b.bottom;
    };
    f.IntRect4 = function(b, c, k, f) {
        this.left = b;
        this.top = c;
        this.right = k;
        this.bottom = f;
    };
    f.ClipType = {
        ctIntersection: 0,
        ctUnion: 1,
        ctDifference: 2,
        ctXor: 3
    };
    f.PolyType = {
        ptSubject: 0,
        ptClip: 1
    };
    f.PolyFillType = {
        pftEvenOdd: 0,
        pftNonZero: 1,
        pftPositive: 2,
        pftNegative: 3
    };
    f.JoinType = {
        jtSquare: 0,
        jtRound: 1,
        jtMiter: 2
    };
    f.EndType = {
        etOpenSquare: 0,
        etOpenRound: 1,
        etOpenButt: 2,
        etClosedLine: 3,
        etClosedPolygon: 4
    };
    f.EdgeSide = {
        esLeft: 0,
        esRight: 1
    };
    f.Direction = {
        dRightToLeft: 0,
        dLeftToRight: 1
    };
    f.TEdge = function() {
        this.Bot = new f.IntPoint;
        this.Curr = new f.IntPoint;
        this.Top = new f.IntPoint;
        this.Delta = new f.IntPoint;
        this.Dx = 0;
        this.PolyTyp = f.PolyType.ptSubject;
        this.Side = f.EdgeSide.esLeft;
        this.OutIdx = this.WindCnt2 = this.WindCnt = this.WindDelta = 0;
        this.PrevInSEL = this.NextInSEL = this.PrevInAEL = this.NextInAEL = this.NextInLML = this.Prev = this.Next = null;
    };
    f.IntersectNode = function() {
        this.Edge2 = this.Edge1 = null;
        this.Pt = new f.IntPoint;
    };
    f.MyIntersectNodeSort = function() {};
    f.MyIntersectNodeSort.Compare = function(b, c) {
        b = c.Pt.Y - b.Pt.Y;
        return 0 < b ? 1 : 0 > b ? -1 : 0;
    };
    f.LocalMinima = function() {
        this.Y = 0;
        this.Next = this.RightBound = this.LeftBound = null;
    };
    f.Scanbeam = function() {
        this.Y = 0;
        this.Next = null;
    };
    f.OutRec = function() {
        this.Idx = 0;
        this.IsOpen = this.IsHole = !1;
        this.PolyNode = this.BottomPt = this.Pts = this.FirstLeft = null;
    };
    f.OutPt = function() {
        this.Idx = 0;
        this.Pt = new f.IntPoint;
        this.Prev = this.Next = null;
    };
    f.Join = function() {
        this.OutPt2 = this.OutPt1 = null;
        this.OffPt = new f.IntPoint;
    };
    f.ClipperBase = function() {
        this.m_CurrentLM = this.m_MinimaList = null;
        this.m_edges = [];
        this.PreserveCollinear = this.m_HasOpenPaths = this.m_UseFullRange = !1;
        this.m_CurrentLM = this.m_MinimaList = null;
        this.m_HasOpenPaths = this.m_UseFullRange = !1;
    };
    f.ClipperBase.horizontal = -9007199254740992;
    f.ClipperBase.Skip = -2;
    f.ClipperBase.Unassigned = -1;
    f.ClipperBase.tolerance = 1E-20;
    f.ClipperBase.loRange = 47453132;
    f.ClipperBase.hiRange = 0xfffffffffffff;
    f.ClipperBase.near_zero = function(b) {
        return b > -f.ClipperBase.tolerance && b < f.ClipperBase.tolerance;
    };
    f.ClipperBase.IsHorizontal = function(b) {
        return 0 === b.Delta.Y;
    };
    f.ClipperBase.prototype.PointIsVertex = function(b, c) {
        var k = c;
        do {
            if (f.IntPoint.op_Equality(k.Pt, b)) return !0;
            k = k.Next;
        }while (k != c);
        return !1;
    };
    f.ClipperBase.prototype.PointOnLineSegment = function(b, c, k, f) {
        return f ? b.X == c.X && b.Y == c.Y || b.X == k.X && b.Y == k.Y || b.X > c.X == b.X < k.X && b.Y > c.Y == b.Y < k.Y && d.op_Equality(d.Int128Mul(b.X - c.X, k.Y - c.Y), d.Int128Mul(k.X - c.X, b.Y - c.Y)) : b.X == c.X && b.Y == c.Y || b.X == k.X && b.Y == k.Y || b.X > c.X == b.X < k.X && b.Y > c.Y == b.Y < k.Y && (b.X - c.X) * (k.Y - c.Y) == (k.X - c.X) * (b.Y - c.Y);
    };
    f.ClipperBase.prototype.PointOnPolygon = function(b, c, k) {
        for(var f = c;;){
            if (this.PointOnLineSegment(b, f.Pt, f.Next.Pt, k)) return !0;
            f = f.Next;
            if (f == c) break;
        }
        return !1;
    };
    f.ClipperBase.prototype.SlopesEqual = f.ClipperBase.SlopesEqual = function() {
        var b = arguments, c = b.length, k, U;
        if (3 == c) return c = b[0], k = b[1], b[2] ? d.op_Equality(d.Int128Mul(c.Delta.Y, k.Delta.X), d.Int128Mul(c.Delta.X, k.Delta.Y)) : f.Cast_Int64(c.Delta.Y * k.Delta.X) == f.Cast_Int64(c.Delta.X * k.Delta.Y);
        if (4 == c) return c = b[0], k = b[1], U = b[2], b[3] ? d.op_Equality(d.Int128Mul(c.Y - k.Y, k.X - U.X), d.Int128Mul(c.X - k.X, k.Y - U.Y)) : 0 === f.Cast_Int64((c.Y - k.Y) * (k.X - U.X)) - f.Cast_Int64((c.X - k.X) * (k.Y - U.Y));
        c = b[0];
        k = b[1];
        U = b[2];
        var h = b[3];
        return b[4] ? d.op_Equality(d.Int128Mul(c.Y - k.Y, U.X - h.X), d.Int128Mul(c.X - k.X, U.Y - h.Y)) : 0 === f.Cast_Int64((c.Y - k.Y) * (U.X - h.X)) - f.Cast_Int64((c.X - k.X) * (U.Y - h.Y));
    };
    f.ClipperBase.SlopesEqual3 = function(b, c, k) {
        return k ? d.op_Equality(d.Int128Mul(b.Delta.Y, c.Delta.X), d.Int128Mul(b.Delta.X, c.Delta.Y)) : f.Cast_Int64(b.Delta.Y * c.Delta.X) == f.Cast_Int64(b.Delta.X * c.Delta.Y);
    };
    f.ClipperBase.SlopesEqual4 = function(b, c, k, U) {
        return U ? d.op_Equality(d.Int128Mul(b.Y - c.Y, c.X - k.X), d.Int128Mul(b.X - c.X, c.Y - k.Y)) : 0 === f.Cast_Int64((b.Y - c.Y) * (c.X - k.X)) - f.Cast_Int64((b.X - c.X) * (c.Y - k.Y));
    };
    f.ClipperBase.SlopesEqual5 = function(b, c, k, U, h) {
        return h ? d.op_Equality(d.Int128Mul(b.Y - c.Y, k.X - U.X), d.Int128Mul(b.X - c.X, k.Y - U.Y)) : 0 === f.Cast_Int64((b.Y - c.Y) * (k.X - U.X)) - f.Cast_Int64((b.X - c.X) * (k.Y - U.Y));
    };
    f.ClipperBase.prototype.Clear = function() {
        this.DisposeLocalMinimaList();
        for(var b = 0, c = this.m_edges.length; b < c; ++b){
            for(var k = 0, d = this.m_edges[b].length; k < d; ++k)this.m_edges[b][k] = null;
            f.Clear(this.m_edges[b]);
        }
        f.Clear(this.m_edges);
        this.m_HasOpenPaths = this.m_UseFullRange = !1;
    };
    f.ClipperBase.prototype.DisposeLocalMinimaList = function() {
        for(; null !== this.m_MinimaList;){
            var b = this.m_MinimaList.Next;
            this.m_MinimaList = null;
            this.m_MinimaList = b;
        }
        this.m_CurrentLM = null;
    };
    f.ClipperBase.prototype.RangeTest = function(b, c) {
        if (c.Value) (b.X > f.ClipperBase.hiRange || b.Y > f.ClipperBase.hiRange || -b.X > f.ClipperBase.hiRange || -b.Y > f.ClipperBase.hiRange) && f.Error("Coordinate outside allowed range in RangeTest().");
        else if (b.X > f.ClipperBase.loRange || b.Y > f.ClipperBase.loRange || -b.X > f.ClipperBase.loRange || -b.Y > f.ClipperBase.loRange) c.Value = !0, this.RangeTest(b, c);
    };
    f.ClipperBase.prototype.InitEdge = function(b, c, k, d) {
        b.Next = c;
        b.Prev = k;
        b.Curr.X = d.X;
        b.Curr.Y = d.Y;
        f.use_xyz && (b.Curr.Z = d.Z);
        b.OutIdx = -1;
    };
    f.ClipperBase.prototype.InitEdge2 = function(b, c) {
        b.Curr.Y >= b.Next.Curr.Y ? (b.Bot.X = b.Curr.X, b.Bot.Y = b.Curr.Y, f.use_xyz && (b.Bot.Z = b.Curr.Z), b.Top.X = b.Next.Curr.X, b.Top.Y = b.Next.Curr.Y, f.use_xyz && (b.Top.Z = b.Next.Curr.Z)) : (b.Top.X = b.Curr.X, b.Top.Y = b.Curr.Y, f.use_xyz && (b.Top.Z = b.Curr.Z), b.Bot.X = b.Next.Curr.X, b.Bot.Y = b.Next.Curr.Y, f.use_xyz && (b.Bot.Z = b.Next.Curr.Z));
        this.SetDx(b);
        b.PolyTyp = c;
    };
    f.ClipperBase.prototype.FindNextLocMin = function(b) {
        for(var c;;){
            for(; f.IntPoint.op_Inequality(b.Bot, b.Prev.Bot) || f.IntPoint.op_Equality(b.Curr, b.Top);)b = b.Next;
            if (b.Dx != f.ClipperBase.horizontal && b.Prev.Dx != f.ClipperBase.horizontal) break;
            for(; b.Prev.Dx == f.ClipperBase.horizontal;)b = b.Prev;
            for(c = b; b.Dx == f.ClipperBase.horizontal;)b = b.Next;
            if (b.Top.Y != b.Prev.Bot.Y) {
                c.Prev.Bot.X < b.Bot.X && (b = c);
                break;
            }
        }
        return b;
    };
    f.ClipperBase.prototype.ProcessBound = function(b, c) {
        var k, d = b, h;
        if (d.OutIdx == f.ClipperBase.Skip) {
            b = d;
            if (c) {
                for(; b.Top.Y == b.Next.Bot.Y;)b = b.Next;
                for(; b != d && b.Dx == f.ClipperBase.horizontal;)b = b.Prev;
            } else {
                for(; b.Top.Y == b.Prev.Bot.Y;)b = b.Prev;
                for(; b != d && b.Dx == f.ClipperBase.horizontal;)b = b.Next;
            }
            b == d ? d = c ? b.Next : b.Prev : (b = c ? d.Next : d.Prev, k = new f.LocalMinima, k.Next = null, k.Y = b.Bot.Y, k.LeftBound = null, k.RightBound = b, b.WindDelta = 0, d = this.ProcessBound(b, c), this.InsertLocalMinima(k));
            return d;
        }
        b.Dx == f.ClipperBase.horizontal && (k = c ? b.Prev : b.Next, k.OutIdx != f.ClipperBase.Skip && (k.Dx == f.ClipperBase.horizontal ? k.Bot.X != b.Bot.X && k.Top.X != b.Bot.X && this.ReverseHorizontal(b) : k.Bot.X != b.Bot.X && this.ReverseHorizontal(b)));
        k = b;
        if (c) {
            for(; d.Top.Y == d.Next.Bot.Y && d.Next.OutIdx != f.ClipperBase.Skip;)d = d.Next;
            if (d.Dx == f.ClipperBase.horizontal && d.Next.OutIdx != f.ClipperBase.Skip) {
                for(h = d; h.Prev.Dx == f.ClipperBase.horizontal;)h = h.Prev;
                h.Prev.Top.X == d.Next.Top.X ? c || (d = h.Prev) : h.Prev.Top.X > d.Next.Top.X && (d = h.Prev);
            }
            for(; b != d;)b.NextInLML = b.Next, b.Dx == f.ClipperBase.horizontal && b != k && b.Bot.X != b.Prev.Top.X && this.ReverseHorizontal(b), b = b.Next;
            b.Dx == f.ClipperBase.horizontal && b != k && b.Bot.X != b.Prev.Top.X && this.ReverseHorizontal(b);
            d = d.Next;
        } else {
            for(; d.Top.Y == d.Prev.Bot.Y && d.Prev.OutIdx != f.ClipperBase.Skip;)d = d.Prev;
            if (d.Dx == f.ClipperBase.horizontal && d.Prev.OutIdx != f.ClipperBase.Skip) {
                for(h = d; h.Next.Dx == f.ClipperBase.horizontal;)h = h.Next;
                h.Next.Top.X == d.Prev.Top.X ? c || (d = h.Next) : h.Next.Top.X > d.Prev.Top.X && (d = h.Next);
            }
            for(; b != d;)b.NextInLML = b.Prev, b.Dx == f.ClipperBase.horizontal && b != k && b.Bot.X != b.Next.Top.X && this.ReverseHorizontal(b), b = b.Prev;
            b.Dx == f.ClipperBase.horizontal && b != k && b.Bot.X != b.Next.Top.X && this.ReverseHorizontal(b);
            d = d.Prev;
        }
        return d;
    };
    f.ClipperBase.prototype.AddPath = function(b, c, k) {
        f.use_lines ? k || c != f.PolyType.ptClip || f.Error("AddPath: Open paths must be subject.") : k || f.Error("AddPath: Open paths have been disabled.");
        var d = b.length - 1;
        if (k) for(; 0 < d && f.IntPoint.op_Equality(b[d], b[0]);)--d;
        for(; 0 < d && f.IntPoint.op_Equality(b[d], b[d - 1]);)--d;
        if (k && 2 > d || !k && 1 > d) return !1;
        for(var h = [], n = 0; n <= d; n++)h.push(new f.TEdge);
        var J = !0;
        h[1].Curr.X = b[1].X;
        h[1].Curr.Y = b[1].Y;
        f.use_xyz && (h[1].Curr.Z = b[1].Z);
        var p = {
            Value: this.m_UseFullRange
        };
        this.RangeTest(b[0], p);
        this.m_UseFullRange = p.Value;
        p.Value = this.m_UseFullRange;
        this.RangeTest(b[d], p);
        this.m_UseFullRange = p.Value;
        this.InitEdge(h[0], h[1], h[d], b[0]);
        this.InitEdge(h[d], h[0], h[d - 1], b[d]);
        for(n = d - 1; 1 <= n; --n)p.Value = this.m_UseFullRange, this.RangeTest(b[n], p), this.m_UseFullRange = p.Value, this.InitEdge(h[n], h[n + 1], h[n - 1], b[n]);
        for(n = b = d = h[0];;)if (b.Curr != b.Next.Curr || !k && b.Next == d) {
            if (b.Prev == b.Next) break;
            else if (k && f.ClipperBase.SlopesEqual(b.Prev.Curr, b.Curr, b.Next.Curr, this.m_UseFullRange) && (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(b.Prev.Curr, b.Curr, b.Next.Curr))) {
                b == d && (d = b.Next);
                b = this.RemoveEdge(b);
                n = b = b.Prev;
                continue;
            }
            b = b.Next;
            if (b == n || !k && b.Next == d) break;
        } else {
            if (b == b.Next) break;
            b == d && (d = b.Next);
            n = b = this.RemoveEdge(b);
        }
        if (!k && b == b.Next || k && b.Prev == b.Next) return !1;
        k || (this.m_HasOpenPaths = !0, d.Prev.OutIdx = f.ClipperBase.Skip);
        b = d;
        do this.InitEdge2(b, c), b = b.Next, J && b.Curr.Y != d.Curr.Y && (J = !1);
        while (b != d);
        if (J) {
            if (k) return !1;
            b.Prev.OutIdx = f.ClipperBase.Skip;
            b.Prev.Bot.X < b.Prev.Top.X && this.ReverseHorizontal(b.Prev);
            c = new f.LocalMinima;
            c.Next = null;
            c.Y = b.Bot.Y;
            c.LeftBound = null;
            c.RightBound = b;
            c.RightBound.Side = f.EdgeSide.esRight;
            for(c.RightBound.WindDelta = 0; b.Next.OutIdx != f.ClipperBase.Skip;)b.NextInLML = b.Next, b.Bot.X != b.Prev.Top.X && this.ReverseHorizontal(b), b = b.Next;
            this.InsertLocalMinima(c);
            this.m_edges.push(h);
            return !0;
        }
        this.m_edges.push(h);
        J = null;
        for(f.IntPoint.op_Equality(b.Prev.Bot, b.Prev.Top) && (b = b.Next);;){
            b = this.FindNextLocMin(b);
            if (b == J) break;
            else null == J && (J = b);
            c = new f.LocalMinima;
            c.Next = null;
            c.Y = b.Bot.Y;
            b.Dx < b.Prev.Dx ? (c.LeftBound = b.Prev, c.RightBound = b, h = !1) : (c.LeftBound = b, c.RightBound = b.Prev, h = !0);
            c.LeftBound.Side = f.EdgeSide.esLeft;
            c.RightBound.Side = f.EdgeSide.esRight;
            c.LeftBound.WindDelta = k ? c.LeftBound.Next == c.RightBound ? -1 : 1 : 0;
            c.RightBound.WindDelta = -c.LeftBound.WindDelta;
            b = this.ProcessBound(c.LeftBound, h);
            b.OutIdx == f.ClipperBase.Skip && (b = this.ProcessBound(b, h));
            d = this.ProcessBound(c.RightBound, !h);
            d.OutIdx == f.ClipperBase.Skip && (d = this.ProcessBound(d, !h));
            c.LeftBound.OutIdx == f.ClipperBase.Skip ? c.LeftBound = null : c.RightBound.OutIdx == f.ClipperBase.Skip && (c.RightBound = null);
            this.InsertLocalMinima(c);
            h || (b = d);
        }
        return !0;
    };
    f.ClipperBase.prototype.AddPaths = function(b, c, k) {
        for(var f = !1, d = 0, h = b.length; d < h; ++d)this.AddPath(b[d], c, k) && (f = !0);
        return f;
    };
    f.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function(b, c, k) {
        return f.IntPoint.op_Equality(b, k) || f.IntPoint.op_Equality(b, c) || f.IntPoint.op_Equality(k, c) ? !1 : b.X != k.X ? c.X > b.X == c.X < k.X : c.Y > b.Y == c.Y < k.Y;
    };
    f.ClipperBase.prototype.RemoveEdge = function(b) {
        b.Prev.Next = b.Next;
        b.Next.Prev = b.Prev;
        var c = b.Next;
        b.Prev = null;
        return c;
    };
    f.ClipperBase.prototype.SetDx = function(b) {
        b.Delta.X = b.Top.X - b.Bot.X;
        b.Delta.Y = b.Top.Y - b.Bot.Y;
        b.Dx = 0 === b.Delta.Y ? f.ClipperBase.horizontal : b.Delta.X / b.Delta.Y;
    };
    f.ClipperBase.prototype.InsertLocalMinima = function(b) {
        if (null === this.m_MinimaList) this.m_MinimaList = b;
        else if (b.Y >= this.m_MinimaList.Y) b.Next = this.m_MinimaList, this.m_MinimaList = b;
        else {
            for(var c = this.m_MinimaList; null !== c.Next && b.Y < c.Next.Y;)c = c.Next;
            b.Next = c.Next;
            c.Next = b;
        }
    };
    f.ClipperBase.prototype.PopLocalMinima = function() {
        null !== this.m_CurrentLM && (this.m_CurrentLM = this.m_CurrentLM.Next);
    };
    f.ClipperBase.prototype.ReverseHorizontal = function(b) {
        var c = b.Top.X;
        b.Top.X = b.Bot.X;
        b.Bot.X = c;
        f.use_xyz && (c = b.Top.Z, b.Top.Z = b.Bot.Z, b.Bot.Z = c);
    };
    f.ClipperBase.prototype.Reset = function() {
        this.m_CurrentLM = this.m_MinimaList;
        if (null != this.m_CurrentLM) for(var b = this.m_MinimaList; null != b;){
            var c = b.LeftBound;
            null != c && (c.Curr.X = c.Bot.X, c.Curr.Y = c.Bot.Y, f.use_xyz && (c.Curr.Z = c.Bot.Z), c.Side = f.EdgeSide.esLeft, c.OutIdx = f.ClipperBase.Unassigned);
            c = b.RightBound;
            null != c && (c.Curr.X = c.Bot.X, c.Curr.Y = c.Bot.Y, f.use_xyz && (c.Curr.Z = c.Bot.Z), c.Side = f.EdgeSide.esRight, c.OutIdx = f.ClipperBase.Unassigned);
            b = b.Next;
        }
    };
    f.Clipper = function(b) {
        "undefined" == typeof b && (b = 0);
        this.m_PolyOuts = null;
        this.m_ClipType = f.ClipType.ctIntersection;
        this.m_IntersectNodeComparer = this.m_IntersectList = this.m_SortedEdges = this.m_ActiveEdges = this.m_Scanbeam = null;
        this.m_ExecuteLocked = !1;
        this.m_SubjFillType = this.m_ClipFillType = f.PolyFillType.pftEvenOdd;
        this.m_GhostJoins = this.m_Joins = null;
        this.StrictlySimple = this.ReverseSolution = this.m_UsingPolyTree = !1;
        f.ClipperBase.call(this);
        this.m_SortedEdges = this.m_ActiveEdges = this.m_Scanbeam = null;
        this.m_IntersectList = [];
        this.m_IntersectNodeComparer = f.MyIntersectNodeSort.Compare;
        this.m_UsingPolyTree = this.m_ExecuteLocked = !1;
        this.m_PolyOuts = [];
        this.m_Joins = [];
        this.m_GhostJoins = [];
        this.ReverseSolution = 0 !== (1 & b);
        this.StrictlySimple = 0 !== (2 & b);
        this.PreserveCollinear = 0 !== (4 & b);
        f.use_xyz && (this.ZFillFunction = null);
    };
    f.Clipper.ioReverseSolution = 1;
    f.Clipper.ioStrictlySimple = 2;
    f.Clipper.ioPreserveCollinear = 4;
    f.Clipper.prototype.Clear = function() {
        0 !== this.m_edges.length && (this.DisposeAllPolyPts(), f.ClipperBase.prototype.Clear.call(this));
    };
    f.Clipper.prototype.DisposeScanbeamList = function() {
        for(; null !== this.m_Scanbeam;){
            var b = this.m_Scanbeam.Next;
            this.m_Scanbeam = null;
            this.m_Scanbeam = b;
        }
    };
    f.Clipper.prototype.Reset = function() {
        f.ClipperBase.prototype.Reset.call(this);
        this.m_SortedEdges = this.m_ActiveEdges = this.m_Scanbeam = null;
        for(var b = this.m_MinimaList; null !== b;)this.InsertScanbeam(b.Y), b = b.Next;
    };
    f.Clipper.prototype.InsertScanbeam = function(b) {
        if (null === this.m_Scanbeam) this.m_Scanbeam = new f.Scanbeam, this.m_Scanbeam.Next = null, this.m_Scanbeam.Y = b;
        else if (b > this.m_Scanbeam.Y) {
            var c = new f.Scanbeam;
            c.Y = b;
            c.Next = this.m_Scanbeam;
            this.m_Scanbeam = c;
        } else {
            for(var k = this.m_Scanbeam; null !== k.Next && b <= k.Next.Y;)k = k.Next;
            b != k.Y && (c = new f.Scanbeam, c.Y = b, c.Next = k.Next, k.Next = c);
        }
    };
    f.Clipper.prototype.Execute = function() {
        var b = arguments, c = b.length, k = b[1] instanceof f.PolyTree;
        if (4 != c || k) {
            if (4 == c && k) {
                c = b[0];
                var d = b[1];
                k = b[2];
                b = b[3];
                if (this.m_ExecuteLocked) return !1;
                this.m_ExecuteLocked = !0;
                this.m_SubjFillType = k;
                this.m_ClipFillType = b;
                this.m_ClipType = c;
                this.m_UsingPolyTree = !0;
                try {
                    (h = this.ExecuteInternal()) && this.BuildResult2(d);
                } finally{
                    this.DisposeAllPolyPts(), this.m_ExecuteLocked = !1;
                }
                return h;
            }
            if (2 == c && !k || 2 == c && k) return c = b[0], d = b[1], this.Execute(c, d, f.PolyFillType.pftEvenOdd, f.PolyFillType.pftEvenOdd);
        } else {
            c = b[0];
            d = b[1];
            k = b[2];
            b = b[3];
            if (this.m_ExecuteLocked) return !1;
            this.m_HasOpenPaths && f.Error("Error: PolyTree struct is need for open path clipping.");
            this.m_ExecuteLocked = !0;
            f.Clear(d);
            this.m_SubjFillType = k;
            this.m_ClipFillType = b;
            this.m_ClipType = c;
            this.m_UsingPolyTree = !1;
            try {
                var h = this.ExecuteInternal();
                h && this.BuildResult(d);
            } finally{
                this.DisposeAllPolyPts(), this.m_ExecuteLocked = !1;
            }
            return h;
        }
    };
    f.Clipper.prototype.FixHoleLinkage = function(b) {
        if (null !== b.FirstLeft && (b.IsHole == b.FirstLeft.IsHole || null === b.FirstLeft.Pts)) {
            for(var c = b.FirstLeft; null !== c && (c.IsHole == b.IsHole || null === c.Pts);)c = c.FirstLeft;
            b.FirstLeft = c;
        }
    };
    f.Clipper.prototype.ExecuteInternal = function() {
        try {
            this.Reset();
            if (null === this.m_CurrentLM) return !1;
            var b = this.PopScanbeam();
            do {
                this.InsertLocalMinimaIntoAEL(b);
                f.Clear(this.m_GhostJoins);
                this.ProcessHorizontals(!1);
                if (null === this.m_Scanbeam) break;
                var c = this.PopScanbeam();
                if (!this.ProcessIntersections(c)) return !1;
                this.ProcessEdgesAtTopOfScanbeam(c);
                b = c;
            }while (null !== this.m_Scanbeam || null !== this.m_CurrentLM);
            b = 0;
            for(var k = this.m_PolyOuts.length; b < k; b++){
                var d = this.m_PolyOuts[b];
                null === d.Pts || d.IsOpen || (d.IsHole ^ this.ReverseSolution) == 0 < this.Area(d) && this.ReversePolyPtLinks(d.Pts);
            }
            this.JoinCommonEdges();
            b = 0;
            for(k = this.m_PolyOuts.length; b < k; b++)d = this.m_PolyOuts[b], null === d.Pts || d.IsOpen || this.FixupOutPolygon(d);
            this.StrictlySimple && this.DoSimplePolygons();
            return !0;
        } finally{
            f.Clear(this.m_Joins), f.Clear(this.m_GhostJoins);
        }
    };
    f.Clipper.prototype.PopScanbeam = function() {
        var b = this.m_Scanbeam.Y;
        this.m_Scanbeam = this.m_Scanbeam.Next;
        return b;
    };
    f.Clipper.prototype.DisposeAllPolyPts = function() {
        for(var b = 0, c = this.m_PolyOuts.length; b < c; ++b)this.DisposeOutRec(b);
        f.Clear(this.m_PolyOuts);
    };
    f.Clipper.prototype.DisposeOutRec = function(b) {
        this.m_PolyOuts[b].Pts = null;
        this.m_PolyOuts[b] = null;
    };
    f.Clipper.prototype.AddJoin = function(b, c, k) {
        var d = new f.Join;
        d.OutPt1 = b;
        d.OutPt2 = c;
        d.OffPt.X = k.X;
        d.OffPt.Y = k.Y;
        f.use_xyz && (d.OffPt.Z = k.Z);
        this.m_Joins.push(d);
    };
    f.Clipper.prototype.AddGhostJoin = function(b, c) {
        var k = new f.Join;
        k.OutPt1 = b;
        k.OffPt.X = c.X;
        k.OffPt.Y = c.Y;
        f.use_xyz && (k.OffPt.Z = c.Z);
        this.m_GhostJoins.push(k);
    };
    f.Clipper.prototype.SetZ = function(b, c, k) {
        null !== this.ZFillFunction && 0 == b.Z && null !== this.ZFillFunction && (f.IntPoint.op_Equality(b, c.Bot) ? b.Z = c.Bot.Z : f.IntPoint.op_Equality(b, c.Top) ? b.Z = c.Top.Z : f.IntPoint.op_Equality(b, k.Bot) ? b.Z = k.Bot.Z : f.IntPoint.op_Equality(b, k.Top) ? b.Z = k.Top.Z : this.ZFillFunction(c.Bot, c.Top, k.Bot, k.Top, b));
    };
    f.Clipper.prototype.InsertLocalMinimaIntoAEL = function(b) {
        for(; null !== this.m_CurrentLM && this.m_CurrentLM.Y == b;){
            var c = this.m_CurrentLM.LeftBound, k = this.m_CurrentLM.RightBound;
            this.PopLocalMinima();
            var d = null;
            null === c ? (this.InsertEdgeIntoAEL(k, null), this.SetWindingCount(k), this.IsContributing(k) && (d = this.AddOutPt(k, k.Bot))) : (null == k ? (this.InsertEdgeIntoAEL(c, null), this.SetWindingCount(c), this.IsContributing(c) && (d = this.AddOutPt(c, c.Bot))) : (this.InsertEdgeIntoAEL(c, null), this.InsertEdgeIntoAEL(k, c), this.SetWindingCount(c), k.WindCnt = c.WindCnt, k.WindCnt2 = c.WindCnt2, this.IsContributing(c) && (d = this.AddLocalMinPoly(c, k, c.Bot))), this.InsertScanbeam(c.Top.Y));
            null != k && (f.ClipperBase.IsHorizontal(k) ? this.AddEdgeToSEL(k) : this.InsertScanbeam(k.Top.Y));
            if (null != c && null != k) {
                if (null !== d && f.ClipperBase.IsHorizontal(k) && 0 < this.m_GhostJoins.length && 0 !== k.WindDelta) for(var h = 0, n = this.m_GhostJoins.length; h < n; h++){
                    var J = this.m_GhostJoins[h];
                    this.HorzSegmentsOverlap(J.OutPt1.Pt.X, J.OffPt.X, k.Bot.X, k.Top.X) && this.AddJoin(J.OutPt1, d, J.OffPt);
                }
                0 <= c.OutIdx && null !== c.PrevInAEL && c.PrevInAEL.Curr.X == c.Bot.X && 0 <= c.PrevInAEL.OutIdx && f.ClipperBase.SlopesEqual(c.PrevInAEL, c, this.m_UseFullRange) && 0 !== c.WindDelta && 0 !== c.PrevInAEL.WindDelta && (h = this.AddOutPt(c.PrevInAEL, c.Bot), this.AddJoin(d, h, c.Top));
                if (c.NextInAEL != k && (0 <= k.OutIdx && 0 <= k.PrevInAEL.OutIdx && f.ClipperBase.SlopesEqual(k.PrevInAEL, k, this.m_UseFullRange) && 0 !== k.WindDelta && 0 !== k.PrevInAEL.WindDelta && (h = this.AddOutPt(k.PrevInAEL, k.Bot), this.AddJoin(d, h, k.Top)), d = c.NextInAEL, null !== d)) for(; d != k;)this.IntersectEdges(k, d, c.Curr, !1), d = d.NextInAEL;
            }
        }
    };
    f.Clipper.prototype.InsertEdgeIntoAEL = function(b, c) {
        if (null === this.m_ActiveEdges) b.PrevInAEL = null, b.NextInAEL = null, this.m_ActiveEdges = b;
        else if (null === c && this.E2InsertsBeforeE1(this.m_ActiveEdges, b)) b.PrevInAEL = null, b.NextInAEL = this.m_ActiveEdges, this.m_ActiveEdges = this.m_ActiveEdges.PrevInAEL = b;
        else {
            for(null === c && (c = this.m_ActiveEdges); null !== c.NextInAEL && !this.E2InsertsBeforeE1(c.NextInAEL, b);)c = c.NextInAEL;
            b.NextInAEL = c.NextInAEL;
            null !== c.NextInAEL && (c.NextInAEL.PrevInAEL = b);
            b.PrevInAEL = c;
            c.NextInAEL = b;
        }
    };
    f.Clipper.prototype.E2InsertsBeforeE1 = function(b, c) {
        return c.Curr.X == b.Curr.X ? c.Top.Y > b.Top.Y ? c.Top.X < f.Clipper.TopX(b, c.Top.Y) : b.Top.X > f.Clipper.TopX(c, b.Top.Y) : c.Curr.X < b.Curr.X;
    };
    f.Clipper.prototype.IsEvenOddFillType = function(b) {
        return b.PolyTyp == f.PolyType.ptSubject ? this.m_SubjFillType == f.PolyFillType.pftEvenOdd : this.m_ClipFillType == f.PolyFillType.pftEvenOdd;
    };
    f.Clipper.prototype.IsEvenOddAltFillType = function(b) {
        return b.PolyTyp == f.PolyType.ptSubject ? this.m_ClipFillType == f.PolyFillType.pftEvenOdd : this.m_SubjFillType == f.PolyFillType.pftEvenOdd;
    };
    f.Clipper.prototype.IsContributing = function(b) {
        var c, k;
        b.PolyTyp == f.PolyType.ptSubject ? (c = this.m_SubjFillType, k = this.m_ClipFillType) : (c = this.m_ClipFillType, k = this.m_SubjFillType);
        switch(c){
            case f.PolyFillType.pftEvenOdd:
                if (0 === b.WindDelta && 1 != b.WindCnt) return !1;
                break;
            case f.PolyFillType.pftNonZero:
                if (1 != Math.abs(b.WindCnt)) return !1;
                break;
            case f.PolyFillType.pftPositive:
                if (1 != b.WindCnt) return !1;
                break;
            default:
                if (-1 != b.WindCnt) return !1;
        }
        switch(this.m_ClipType){
            case f.ClipType.ctIntersection:
                switch(k){
                    case f.PolyFillType.pftEvenOdd:
                    case f.PolyFillType.pftNonZero:
                        return 0 !== b.WindCnt2;
                    case f.PolyFillType.pftPositive:
                        return 0 < b.WindCnt2;
                    default:
                        return 0 > b.WindCnt2;
                }
            case f.ClipType.ctUnion:
                switch(k){
                    case f.PolyFillType.pftEvenOdd:
                    case f.PolyFillType.pftNonZero:
                        return 0 === b.WindCnt2;
                    case f.PolyFillType.pftPositive:
                        return 0 >= b.WindCnt2;
                    default:
                        return 0 <= b.WindCnt2;
                }
            case f.ClipType.ctDifference:
                if (b.PolyTyp == f.PolyType.ptSubject) switch(k){
                    case f.PolyFillType.pftEvenOdd:
                    case f.PolyFillType.pftNonZero:
                        return 0 === b.WindCnt2;
                    case f.PolyFillType.pftPositive:
                        return 0 >= b.WindCnt2;
                    default:
                        return 0 <= b.WindCnt2;
                }
                else switch(k){
                    case f.PolyFillType.pftEvenOdd:
                    case f.PolyFillType.pftNonZero:
                        return 0 !== b.WindCnt2;
                    case f.PolyFillType.pftPositive:
                        return 0 < b.WindCnt2;
                    default:
                        return 0 > b.WindCnt2;
                }
            case f.ClipType.ctXor:
                if (0 === b.WindDelta) switch(k){
                    case f.PolyFillType.pftEvenOdd:
                    case f.PolyFillType.pftNonZero:
                        return 0 === b.WindCnt2;
                    case f.PolyFillType.pftPositive:
                        return 0 >= b.WindCnt2;
                    default:
                        return 0 <= b.WindCnt2;
                }
        }
        return !0;
    };
    f.Clipper.prototype.SetWindingCount = function(b) {
        for(var c = b.PrevInAEL; null !== c && (c.PolyTyp != b.PolyTyp || 0 === c.WindDelta);)c = c.PrevInAEL;
        if (null === c) b.WindCnt = 0 === b.WindDelta ? 1 : b.WindDelta, b.WindCnt2 = 0, c = this.m_ActiveEdges;
        else {
            if (0 === b.WindDelta && this.m_ClipType != f.ClipType.ctUnion) b.WindCnt = 1;
            else if (this.IsEvenOddFillType(b)) {
                if (0 === b.WindDelta) {
                    for(var k = !0, d = c.PrevInAEL; null !== d;)d.PolyTyp == c.PolyTyp && 0 !== d.WindDelta && (k = !k), d = d.PrevInAEL;
                    b.WindCnt = k ? 0 : 1;
                } else b.WindCnt = b.WindDelta;
            } else b.WindCnt = 0 > c.WindCnt * c.WindDelta ? 1 < Math.abs(c.WindCnt) ? 0 > c.WindDelta * b.WindDelta ? c.WindCnt : c.WindCnt + b.WindDelta : 0 === b.WindDelta ? 1 : b.WindDelta : 0 === b.WindDelta ? 0 > c.WindCnt ? c.WindCnt - 1 : c.WindCnt + 1 : 0 > c.WindDelta * b.WindDelta ? c.WindCnt : c.WindCnt + b.WindDelta;
            b.WindCnt2 = c.WindCnt2;
            c = c.NextInAEL;
        }
        if (this.IsEvenOddAltFillType(b)) for(; c != b;)0 !== c.WindDelta && (b.WindCnt2 = 0 === b.WindCnt2 ? 1 : 0), c = c.NextInAEL;
        else for(; c != b;)b.WindCnt2 += c.WindDelta, c = c.NextInAEL;
    };
    f.Clipper.prototype.AddEdgeToSEL = function(b) {
        null === this.m_SortedEdges ? (this.m_SortedEdges = b, b.PrevInSEL = null, b.NextInSEL = null) : (b.NextInSEL = this.m_SortedEdges, b.PrevInSEL = null, this.m_SortedEdges = this.m_SortedEdges.PrevInSEL = b);
    };
    f.Clipper.prototype.CopyAELToSEL = function() {
        var b = this.m_ActiveEdges;
        for(this.m_SortedEdges = b; null !== b;)b.PrevInSEL = b.PrevInAEL, b = b.NextInSEL = b.NextInAEL;
    };
    f.Clipper.prototype.SwapPositionsInAEL = function(b, c) {
        if (b.NextInAEL != b.PrevInAEL && c.NextInAEL != c.PrevInAEL) {
            if (b.NextInAEL == c) {
                var k = c.NextInAEL;
                null !== k && (k.PrevInAEL = b);
                var f = b.PrevInAEL;
                null !== f && (f.NextInAEL = c);
                c.PrevInAEL = f;
                c.NextInAEL = b;
                b.PrevInAEL = c;
                b.NextInAEL = k;
            } else c.NextInAEL == b ? (k = b.NextInAEL, null !== k && (k.PrevInAEL = c), f = c.PrevInAEL, null !== f && (f.NextInAEL = b), b.PrevInAEL = f, b.NextInAEL = c, c.PrevInAEL = b, c.NextInAEL = k) : (k = b.NextInAEL, f = b.PrevInAEL, b.NextInAEL = c.NextInAEL, null !== b.NextInAEL && (b.NextInAEL.PrevInAEL = b), b.PrevInAEL = c.PrevInAEL, null !== b.PrevInAEL && (b.PrevInAEL.NextInAEL = b), c.NextInAEL = k, null !== c.NextInAEL && (c.NextInAEL.PrevInAEL = c), c.PrevInAEL = f, null !== c.PrevInAEL && (c.PrevInAEL.NextInAEL = c));
            null === b.PrevInAEL ? this.m_ActiveEdges = b : null === c.PrevInAEL && (this.m_ActiveEdges = c);
        }
    };
    f.Clipper.prototype.SwapPositionsInSEL = function(b, c) {
        if (null !== b.NextInSEL || null !== b.PrevInSEL) {
            if (null !== c.NextInSEL || null !== c.PrevInSEL) {
                if (b.NextInSEL == c) {
                    var k = c.NextInSEL;
                    null !== k && (k.PrevInSEL = b);
                    var f = b.PrevInSEL;
                    null !== f && (f.NextInSEL = c);
                    c.PrevInSEL = f;
                    c.NextInSEL = b;
                    b.PrevInSEL = c;
                    b.NextInSEL = k;
                } else c.NextInSEL == b ? (k = b.NextInSEL, null !== k && (k.PrevInSEL = c), f = c.PrevInSEL, null !== f && (f.NextInSEL = b), b.PrevInSEL = f, b.NextInSEL = c, c.PrevInSEL = b, c.NextInSEL = k) : (k = b.NextInSEL, f = b.PrevInSEL, b.NextInSEL = c.NextInSEL, null !== b.NextInSEL && (b.NextInSEL.PrevInSEL = b), b.PrevInSEL = c.PrevInSEL, null !== b.PrevInSEL && (b.PrevInSEL.NextInSEL = b), c.NextInSEL = k, null !== c.NextInSEL && (c.NextInSEL.PrevInSEL = c), c.PrevInSEL = f, null !== c.PrevInSEL && (c.PrevInSEL.NextInSEL = c));
                null === b.PrevInSEL ? this.m_SortedEdges = b : null === c.PrevInSEL && (this.m_SortedEdges = c);
            }
        }
    };
    f.Clipper.prototype.AddLocalMaxPoly = function(b, c, k) {
        this.AddOutPt(b, k);
        0 == c.WindDelta && this.AddOutPt(c, k);
        b.OutIdx == c.OutIdx ? (b.OutIdx = -1, c.OutIdx = -1) : b.OutIdx < c.OutIdx ? this.AppendPolygon(b, c) : this.AppendPolygon(c, b);
    };
    f.Clipper.prototype.AddLocalMinPoly = function(b, c, k) {
        var d, h;
        f.ClipperBase.IsHorizontal(c) || b.Dx > c.Dx ? (d = this.AddOutPt(b, k), c.OutIdx = b.OutIdx, b.Side = f.EdgeSide.esLeft, c.Side = f.EdgeSide.esRight, h = b, b = h.PrevInAEL == c ? c.PrevInAEL : h.PrevInAEL) : (d = this.AddOutPt(c, k), b.OutIdx = c.OutIdx, b.Side = f.EdgeSide.esRight, c.Side = f.EdgeSide.esLeft, h = c, b = h.PrevInAEL == b ? b.PrevInAEL : h.PrevInAEL);
        null !== b && 0 <= b.OutIdx && f.Clipper.TopX(b, k.Y) == f.Clipper.TopX(h, k.Y) && f.ClipperBase.SlopesEqual(h, b, this.m_UseFullRange) && 0 !== h.WindDelta && 0 !== b.WindDelta && (k = this.AddOutPt(b, k), this.AddJoin(d, k, h.Top));
        return d;
    };
    f.Clipper.prototype.CreateOutRec = function() {
        var b = new f.OutRec;
        b.Idx = -1;
        b.IsHole = !1;
        b.IsOpen = !1;
        b.FirstLeft = null;
        b.Pts = null;
        b.BottomPt = null;
        b.PolyNode = null;
        this.m_PolyOuts.push(b);
        b.Idx = this.m_PolyOuts.length - 1;
        return b;
    };
    f.Clipper.prototype.AddOutPt = function(b, c) {
        var k = b.Side == f.EdgeSide.esLeft;
        if (0 > b.OutIdx) {
            var d = this.CreateOutRec();
            d.IsOpen = 0 === b.WindDelta;
            var h = new f.OutPt;
            d.Pts = h;
            h.Idx = d.Idx;
            h.Pt.X = c.X;
            h.Pt.Y = c.Y;
            f.use_xyz && (h.Pt.Z = c.Z);
            h.Next = h;
            h.Prev = h;
            d.IsOpen || this.SetHoleState(b, d);
            b.OutIdx = d.Idx;
        } else {
            d = this.m_PolyOuts[b.OutIdx];
            b = d.Pts;
            if (k && f.IntPoint.op_Equality(c, b.Pt)) return b;
            if (!k && f.IntPoint.op_Equality(c, b.Prev.Pt)) return b.Prev;
            h = new f.OutPt;
            h.Idx = d.Idx;
            h.Pt.X = c.X;
            h.Pt.Y = c.Y;
            f.use_xyz && (h.Pt.Z = c.Z);
            h.Next = b;
            h.Prev = b.Prev;
            h.Prev.Next = h;
            b.Prev = h;
            k && (d.Pts = h);
        }
        return h;
    };
    f.Clipper.prototype.SwapPoints = function(b, c) {
        var k = new f.IntPoint(b.Value);
        b.Value.X = c.Value.X;
        b.Value.Y = c.Value.Y;
        f.use_xyz && (b.Value.Z = c.Value.Z);
        c.Value.X = k.X;
        c.Value.Y = k.Y;
        f.use_xyz && (c.Value.Z = k.Z);
    };
    f.Clipper.prototype.HorzSegmentsOverlap = function(b, c, k, f) {
        var d;
        b > c && (d = b, b = c, c = d);
        k > f && (d = k, k = f, f = d);
        return b < f && k < c;
    };
    f.Clipper.prototype.SetHoleState = function(b, c) {
        var k = !1;
        for(b = b.PrevInAEL; null !== b;)0 <= b.OutIdx && 0 != b.WindDelta && (k = !k, null === c.FirstLeft && (c.FirstLeft = this.m_PolyOuts[b.OutIdx])), b = b.PrevInAEL;
        k && (c.IsHole = !0);
    };
    f.Clipper.prototype.GetDx = function(b, c) {
        return b.Y == c.Y ? f.ClipperBase.horizontal : (c.X - b.X) / (c.Y - b.Y);
    };
    f.Clipper.prototype.FirstIsBottomPt = function(b, c) {
        for(var k = b.Prev; f.IntPoint.op_Equality(k.Pt, b.Pt) && k != b;)k = k.Prev;
        var d = Math.abs(this.GetDx(b.Pt, k.Pt));
        for(k = b.Next; f.IntPoint.op_Equality(k.Pt, b.Pt) && k != b;)k = k.Next;
        b = Math.abs(this.GetDx(b.Pt, k.Pt));
        for(k = c.Prev; f.IntPoint.op_Equality(k.Pt, c.Pt) && k != c;)k = k.Prev;
        var h = Math.abs(this.GetDx(c.Pt, k.Pt));
        for(k = c.Next; f.IntPoint.op_Equality(k.Pt, c.Pt) && k != c;)k = k.Next;
        k = Math.abs(this.GetDx(c.Pt, k.Pt));
        return d >= h && d >= k || b >= h && b >= k;
    };
    f.Clipper.prototype.GetBottomPt = function(b) {
        for(var c = null, k = b.Next; k != b;)k.Pt.Y > b.Pt.Y ? (b = k, c = null) : k.Pt.Y == b.Pt.Y && k.Pt.X <= b.Pt.X && (k.Pt.X < b.Pt.X ? (c = null, b = k) : k.Next != b && k.Prev != b && (c = k)), k = k.Next;
        if (null !== c) for(; c != k;)for(this.FirstIsBottomPt(k, c) || (b = c), c = c.Next; f.IntPoint.op_Inequality(c.Pt, b.Pt);)c = c.Next;
        return b;
    };
    f.Clipper.prototype.GetLowermostRec = function(b, c) {
        null === b.BottomPt && (b.BottomPt = this.GetBottomPt(b.Pts));
        null === c.BottomPt && (c.BottomPt = this.GetBottomPt(c.Pts));
        var k = b.BottomPt, f = c.BottomPt;
        return k.Pt.Y > f.Pt.Y ? b : k.Pt.Y < f.Pt.Y ? c : k.Pt.X < f.Pt.X ? b : k.Pt.X > f.Pt.X ? c : k.Next == k ? c : f.Next == f ? b : this.FirstIsBottomPt(k, f) ? b : c;
    };
    f.Clipper.prototype.Param1RightOfParam2 = function(b, c) {
        do if (b = b.FirstLeft, b == c) return !0;
        while (null !== b);
        return !1;
    };
    f.Clipper.prototype.GetOutRec = function(b) {
        for(b = this.m_PolyOuts[b]; b != this.m_PolyOuts[b.Idx];)b = this.m_PolyOuts[b.Idx];
        return b;
    };
    f.Clipper.prototype.AppendPolygon = function(b, c) {
        var k = this.m_PolyOuts[b.OutIdx], d = this.m_PolyOuts[c.OutIdx];
        var h = this.Param1RightOfParam2(k, d) ? d : this.Param1RightOfParam2(d, k) ? k : this.GetLowermostRec(k, d);
        var n = k.Pts, J = n.Prev, p = d.Pts, t = p.Prev;
        b.Side == f.EdgeSide.esLeft ? (c.Side == f.EdgeSide.esLeft ? (this.ReversePolyPtLinks(p), p.Next = n, n.Prev = p, J.Next = t, t.Prev = J, k.Pts = t) : (t.Next = n, n.Prev = t, p.Prev = J, J.Next = p, k.Pts = p), n = f.EdgeSide.esLeft) : (c.Side == f.EdgeSide.esRight ? (this.ReversePolyPtLinks(p), J.Next = t, t.Prev = J, p.Next = n, n.Prev = p) : (J.Next = p, p.Prev = J, n.Prev = t, t.Next = n), n = f.EdgeSide.esRight);
        k.BottomPt = null;
        h == d && (d.FirstLeft != k && (k.FirstLeft = d.FirstLeft), k.IsHole = d.IsHole);
        d.Pts = null;
        d.BottomPt = null;
        d.FirstLeft = k;
        h = b.OutIdx;
        J = c.OutIdx;
        b.OutIdx = -1;
        c.OutIdx = -1;
        for(p = this.m_ActiveEdges; null !== p;){
            if (p.OutIdx == J) {
                p.OutIdx = h;
                p.Side = n;
                break;
            }
            p = p.NextInAEL;
        }
        d.Idx = k.Idx;
    };
    f.Clipper.prototype.ReversePolyPtLinks = function(b) {
        if (null !== b) {
            var c = b;
            do {
                var k = c.Next;
                c.Next = c.Prev;
                c = c.Prev = k;
            }while (c != b);
        }
    };
    f.Clipper.SwapSides = function(b, c) {
        var k = b.Side;
        b.Side = c.Side;
        c.Side = k;
    };
    f.Clipper.SwapPolyIndexes = function(b, c) {
        var k = b.OutIdx;
        b.OutIdx = c.OutIdx;
        c.OutIdx = k;
    };
    f.Clipper.prototype.IntersectEdges = function(b, c, k) {
        var d = 0 <= b.OutIdx, h = 0 <= c.OutIdx;
        f.use_xyz && this.SetZ(k, b, c);
        if (!f.use_lines || 0 !== b.WindDelta && 0 !== c.WindDelta) {
            if (b.PolyTyp == c.PolyTyp) {
                if (this.IsEvenOddFillType(b)) {
                    var n = b.WindCnt;
                    b.WindCnt = c.WindCnt;
                    c.WindCnt = n;
                } else b.WindCnt = 0 === b.WindCnt + c.WindDelta ? -b.WindCnt : b.WindCnt + c.WindDelta, c.WindCnt = 0 === c.WindCnt - b.WindDelta ? -c.WindCnt : c.WindCnt - b.WindDelta;
            } else this.IsEvenOddFillType(c) ? b.WindCnt2 = 0 === b.WindCnt2 ? 1 : 0 : b.WindCnt2 += c.WindDelta, this.IsEvenOddFillType(b) ? c.WindCnt2 = 0 === c.WindCnt2 ? 1 : 0 : c.WindCnt2 -= b.WindDelta;
            var J, p, t;
            b.PolyTyp == f.PolyType.ptSubject ? (J = this.m_SubjFillType, t = this.m_ClipFillType) : (J = this.m_ClipFillType, t = this.m_SubjFillType);
            c.PolyTyp == f.PolyType.ptSubject ? (p = this.m_SubjFillType, n = this.m_ClipFillType) : (p = this.m_ClipFillType, n = this.m_SubjFillType);
            switch(J){
                case f.PolyFillType.pftPositive:
                    J = b.WindCnt;
                    break;
                case f.PolyFillType.pftNegative:
                    J = -b.WindCnt;
                    break;
                default:
                    J = Math.abs(b.WindCnt);
            }
            switch(p){
                case f.PolyFillType.pftPositive:
                    p = c.WindCnt;
                    break;
                case f.PolyFillType.pftNegative:
                    p = -c.WindCnt;
                    break;
                default:
                    p = Math.abs(c.WindCnt);
            }
            if (d && h) 0 != J && 1 != J || 0 != p && 1 != p || b.PolyTyp != c.PolyTyp && this.m_ClipType != f.ClipType.ctXor ? this.AddLocalMaxPoly(b, c, k) : (this.AddOutPt(b, k), this.AddOutPt(c, k), f.Clipper.SwapSides(b, c), f.Clipper.SwapPolyIndexes(b, c));
            else if (d) {
                if (0 === p || 1 == p) this.AddOutPt(b, k), f.Clipper.SwapSides(b, c), f.Clipper.SwapPolyIndexes(b, c);
            } else if (h) {
                if (0 === J || 1 == J) this.AddOutPt(c, k), f.Clipper.SwapSides(b, c), f.Clipper.SwapPolyIndexes(b, c);
            } else if (!(0 != J && 1 != J || 0 != p && 1 != p)) {
                switch(t){
                    case f.PolyFillType.pftPositive:
                        d = b.WindCnt2;
                        break;
                    case f.PolyFillType.pftNegative:
                        d = -b.WindCnt2;
                        break;
                    default:
                        d = Math.abs(b.WindCnt2);
                }
                switch(n){
                    case f.PolyFillType.pftPositive:
                        h = c.WindCnt2;
                        break;
                    case f.PolyFillType.pftNegative:
                        h = -c.WindCnt2;
                        break;
                    default:
                        h = Math.abs(c.WindCnt2);
                }
                if (b.PolyTyp != c.PolyTyp) this.AddLocalMinPoly(b, c, k);
                else if (1 == J && 1 == p) switch(this.m_ClipType){
                    case f.ClipType.ctIntersection:
                        0 < d && 0 < h && this.AddLocalMinPoly(b, c, k);
                        break;
                    case f.ClipType.ctUnion:
                        0 >= d && 0 >= h && this.AddLocalMinPoly(b, c, k);
                        break;
                    case f.ClipType.ctDifference:
                        (b.PolyTyp == f.PolyType.ptClip && 0 < d && 0 < h || b.PolyTyp == f.PolyType.ptSubject && 0 >= d && 0 >= h) && this.AddLocalMinPoly(b, c, k);
                        break;
                    case f.ClipType.ctXor:
                        this.AddLocalMinPoly(b, c, k);
                }
                else f.Clipper.SwapSides(b, c);
            }
        } else if (0 != b.WindDelta || 0 != c.WindDelta) b.PolyTyp == c.PolyTyp && b.WindDelta != c.WindDelta && this.m_ClipType == f.ClipType.ctUnion ? 0 === b.WindDelta ? h && (this.AddOutPt(b, k), d && (b.OutIdx = -1)) : d && (this.AddOutPt(c, k), h && (c.OutIdx = -1)) : b.PolyTyp != c.PolyTyp && (0 !== b.WindDelta || 1 != Math.abs(c.WindCnt) || this.m_ClipType == f.ClipType.ctUnion && 0 !== c.WindCnt2 ? 0 !== c.WindDelta || 1 != Math.abs(b.WindCnt) || this.m_ClipType == f.ClipType.ctUnion && 0 !== b.WindCnt2 || (this.AddOutPt(c, k), h && (c.OutIdx = -1)) : (this.AddOutPt(b, k), d && (b.OutIdx = -1)));
    };
    f.Clipper.prototype.DeleteFromAEL = function(b) {
        var c = b.PrevInAEL, k = b.NextInAEL;
        if (null !== c || null !== k || b == this.m_ActiveEdges) null !== c ? c.NextInAEL = k : this.m_ActiveEdges = k, null !== k && (k.PrevInAEL = c), b.NextInAEL = null, b.PrevInAEL = null;
    };
    f.Clipper.prototype.DeleteFromSEL = function(b) {
        var c = b.PrevInSEL, k = b.NextInSEL;
        if (null !== c || null !== k || b == this.m_SortedEdges) null !== c ? c.NextInSEL = k : this.m_SortedEdges = k, null !== k && (k.PrevInSEL = c), b.NextInSEL = null, b.PrevInSEL = null;
    };
    f.Clipper.prototype.UpdateEdgeIntoAEL = function(b) {
        null === b.NextInLML && f.Error("UpdateEdgeIntoAEL: invalid call");
        var c = b.PrevInAEL, k = b.NextInAEL;
        b.NextInLML.OutIdx = b.OutIdx;
        null !== c ? c.NextInAEL = b.NextInLML : this.m_ActiveEdges = b.NextInLML;
        null !== k && (k.PrevInAEL = b.NextInLML);
        b.NextInLML.Side = b.Side;
        b.NextInLML.WindDelta = b.WindDelta;
        b.NextInLML.WindCnt = b.WindCnt;
        b.NextInLML.WindCnt2 = b.WindCnt2;
        b = b.NextInLML;
        b.Curr.X = b.Bot.X;
        b.Curr.Y = b.Bot.Y;
        f.use_xyz && (b.Curr.Z = b.Bot.Z);
        b.PrevInAEL = c;
        b.NextInAEL = k;
        f.ClipperBase.IsHorizontal(b) || this.InsertScanbeam(b.Top.Y);
        return b;
    };
    f.Clipper.prototype.ProcessHorizontals = function(b) {
        for(var c = this.m_SortedEdges; null !== c;)this.DeleteFromSEL(c), this.ProcessHorizontal(c, b), c = this.m_SortedEdges;
    };
    f.Clipper.prototype.GetHorzDirection = function(b, c) {
        b.Bot.X < b.Top.X ? (c.Left = b.Bot.X, c.Right = b.Top.X, c.Dir = f.Direction.dLeftToRight) : (c.Left = b.Top.X, c.Right = b.Bot.X, c.Dir = f.Direction.dRightToLeft);
    };
    f.Clipper.prototype.ProcessHorizontal = function(b, c) {
        var k = {
            Dir: null,
            Left: null,
            Right: null
        };
        this.GetHorzDirection(b, k);
        for(var d = k.Dir, h = k.Left, n = k.Right, J = b, p = null; null !== J.NextInLML && f.ClipperBase.IsHorizontal(J.NextInLML);)J = J.NextInLML;
        for(null === J.NextInLML && (p = this.GetMaximaPair(J));;){
            for(var t = b == J, B = this.GetNextInAEL(b, d); null !== B && !(B.Curr.X == b.Top.X && null !== b.NextInLML && B.Dx < b.NextInLML.Dx);){
                k = this.GetNextInAEL(B, d);
                if (d == f.Direction.dLeftToRight && B.Curr.X <= n || d == f.Direction.dRightToLeft && B.Curr.X >= h) {
                    if (B == p && t) {
                        if (0 <= b.OutIdx) {
                            d = this.AddOutPt(b, b.Top);
                            for(k = this.m_SortedEdges; null !== k;)0 <= k.OutIdx && this.HorzSegmentsOverlap(b.Bot.X, b.Top.X, k.Bot.X, k.Top.X) && (h = this.AddOutPt(k, k.Bot), this.AddJoin(h, d, k.Top)), k = k.NextInSEL;
                            this.AddGhostJoin(d, b.Bot);
                            this.AddLocalMaxPoly(b, p, b.Top);
                        }
                        this.DeleteFromAEL(b);
                        this.DeleteFromAEL(p);
                        return;
                    }
                    if (d == f.Direction.dLeftToRight) {
                        var F = new f.IntPoint(B.Curr.X, b.Curr.Y);
                        this.IntersectEdges(b, B, F);
                    } else F = new f.IntPoint(B.Curr.X, b.Curr.Y), this.IntersectEdges(B, b, F);
                    this.SwapPositionsInAEL(b, B);
                } else if (d == f.Direction.dLeftToRight && B.Curr.X >= n || d == f.Direction.dRightToLeft && B.Curr.X <= h) break;
                B = k;
            }
            if (null !== b.NextInLML && f.ClipperBase.IsHorizontal(b.NextInLML)) b = this.UpdateEdgeIntoAEL(b), 0 <= b.OutIdx && this.AddOutPt(b, b.Bot), k = {
                Dir: d,
                Left: h,
                Right: n
            }, this.GetHorzDirection(b, k), d = k.Dir, h = k.Left, n = k.Right;
            else break;
        }
        null !== b.NextInLML ? 0 <= b.OutIdx ? (d = this.AddOutPt(b, b.Top), c && this.AddGhostJoin(d, b.Bot), b = this.UpdateEdgeIntoAEL(b), 0 !== b.WindDelta && (p = b.PrevInAEL, k = b.NextInAEL, null !== p && p.Curr.X == b.Bot.X && p.Curr.Y == b.Bot.Y && 0 !== p.WindDelta && 0 <= p.OutIdx && p.Curr.Y > p.Top.Y && f.ClipperBase.SlopesEqual(b, p, this.m_UseFullRange) ? (h = this.AddOutPt(p, b.Bot), this.AddJoin(d, h, b.Top)) : null !== k && k.Curr.X == b.Bot.X && k.Curr.Y == b.Bot.Y && 0 !== k.WindDelta && 0 <= k.OutIdx && k.Curr.Y > k.Top.Y && f.ClipperBase.SlopesEqual(b, k, this.m_UseFullRange) && (h = this.AddOutPt(k, b.Bot), this.AddJoin(d, h, b.Top)))) : this.UpdateEdgeIntoAEL(b) : (0 <= b.OutIdx && this.AddOutPt(b, b.Top), this.DeleteFromAEL(b));
    };
    f.Clipper.prototype.GetNextInAEL = function(b, c) {
        return c == f.Direction.dLeftToRight ? b.NextInAEL : b.PrevInAEL;
    };
    f.Clipper.prototype.IsMinima = function(b) {
        return null !== b && b.Prev.NextInLML != b && b.Next.NextInLML != b;
    };
    f.Clipper.prototype.IsMaxima = function(b, c) {
        return null !== b && b.Top.Y == c && null === b.NextInLML;
    };
    f.Clipper.prototype.IsIntermediate = function(b, c) {
        return b.Top.Y == c && null !== b.NextInLML;
    };
    f.Clipper.prototype.GetMaximaPair = function(b) {
        var c = null;
        f.IntPoint.op_Equality(b.Next.Top, b.Top) && null === b.Next.NextInLML ? c = b.Next : f.IntPoint.op_Equality(b.Prev.Top, b.Top) && null === b.Prev.NextInLML && (c = b.Prev);
        return null === c || -2 != c.OutIdx && (c.NextInAEL != c.PrevInAEL || f.ClipperBase.IsHorizontal(c)) ? c : null;
    };
    f.Clipper.prototype.ProcessIntersections = function(b) {
        if (null == this.m_ActiveEdges) return !0;
        try {
            this.BuildIntersectList(b);
            if (0 == this.m_IntersectList.length) return !0;
            if (1 == this.m_IntersectList.length || this.FixupIntersectionOrder()) this.ProcessIntersectList();
            else return !1;
        } catch (c) {
            this.m_SortedEdges = null, this.m_IntersectList.length = 0, f.Error("ProcessIntersections error");
        }
        this.m_SortedEdges = null;
        return !0;
    };
    f.Clipper.prototype.BuildIntersectList = function(b) {
        if (null !== this.m_ActiveEdges) {
            var c = this.m_ActiveEdges;
            for(this.m_SortedEdges = c; null !== c;)c.PrevInSEL = c.PrevInAEL, c.NextInSEL = c.NextInAEL, c.Curr.X = f.Clipper.TopX(c, b), c = c.NextInAEL;
            for(var k = !0; k && null !== this.m_SortedEdges;){
                k = !1;
                for(c = this.m_SortedEdges; null !== c.NextInSEL;){
                    b = c.NextInSEL;
                    var d = new f.IntPoint;
                    c.Curr.X > b.Curr.X ? (this.IntersectPoint(c, b, d), k = new f.IntersectNode, k.Edge1 = c, k.Edge2 = b, k.Pt.X = d.X, k.Pt.Y = d.Y, f.use_xyz && (k.Pt.Z = d.Z), this.m_IntersectList.push(k), this.SwapPositionsInSEL(c, b), k = !0) : c = b;
                }
                if (null !== c.PrevInSEL) c.PrevInSEL.NextInSEL = null;
                else break;
            }
            this.m_SortedEdges = null;
        }
    };
    f.Clipper.prototype.EdgesAdjacent = function(b) {
        return b.Edge1.NextInSEL == b.Edge2 || b.Edge1.PrevInSEL == b.Edge2;
    };
    f.Clipper.IntersectNodeSort = function(b, c) {
        return c.Pt.Y - b.Pt.Y;
    };
    f.Clipper.prototype.FixupIntersectionOrder = function() {
        this.m_IntersectList.sort(this.m_IntersectNodeComparer);
        this.CopyAELToSEL();
        for(var b = this.m_IntersectList.length, c = 0; c < b; c++){
            if (!this.EdgesAdjacent(this.m_IntersectList[c])) {
                for(var k = c + 1; k < b && !this.EdgesAdjacent(this.m_IntersectList[k]);)k++;
                if (k == b) return !1;
                var f = this.m_IntersectList[c];
                this.m_IntersectList[c] = this.m_IntersectList[k];
                this.m_IntersectList[k] = f;
            }
            this.SwapPositionsInSEL(this.m_IntersectList[c].Edge1, this.m_IntersectList[c].Edge2);
        }
        return !0;
    };
    f.Clipper.prototype.ProcessIntersectList = function() {
        for(var b = 0, c = this.m_IntersectList.length; b < c; b++){
            var k = this.m_IntersectList[b];
            this.IntersectEdges(k.Edge1, k.Edge2, k.Pt);
            this.SwapPositionsInAEL(k.Edge1, k.Edge2);
        }
        this.m_IntersectList.length = 0;
    };
    F = function(b) {
        return 0 > b ? Math.ceil(b - .5) : Math.round(b);
    };
    Wb = function(b) {
        return 0 > b ? Math.ceil(b - .5) : Math.floor(b + .5);
    };
    Ab = function(b) {
        return 0 > b ? -Math.round(Math.abs(b)) : Math.round(b);
    };
    Bb = function(b) {
        if (0 > b) return b -= .5, -2147483648 > b ? Math.ceil(b) : b | 0;
        b += .5;
        return 2147483647 < b ? Math.floor(b) : b | 0;
    };
    f.Clipper.Round = va ? F : ba ? Ab : ub ? Bb : Wb;
    f.Clipper.TopX = function(b, c) {
        return c == b.Top.Y ? b.Top.X : b.Bot.X + f.Clipper.Round(b.Dx * (c - b.Bot.Y));
    };
    f.Clipper.prototype.IntersectPoint = function(b, c, k) {
        k.X = 0;
        k.Y = 0;
        var d, h;
        if (b.Dx == c.Dx) k.Y = b.Curr.Y, k.X = f.Clipper.TopX(b, k.Y);
        else {
            if (0 === b.Delta.X) k.X = b.Bot.X, f.ClipperBase.IsHorizontal(c) ? k.Y = c.Bot.Y : (h = c.Bot.Y - c.Bot.X / c.Dx, k.Y = f.Clipper.Round(k.X / c.Dx + h));
            else if (0 === c.Delta.X) k.X = c.Bot.X, f.ClipperBase.IsHorizontal(b) ? k.Y = b.Bot.Y : (d = b.Bot.Y - b.Bot.X / b.Dx, k.Y = f.Clipper.Round(k.X / b.Dx + d));
            else {
                d = b.Bot.X - b.Bot.Y * b.Dx;
                h = c.Bot.X - c.Bot.Y * c.Dx;
                var n = (h - d) / (b.Dx - c.Dx);
                k.Y = f.Clipper.Round(n);
                k.X = Math.abs(b.Dx) < Math.abs(c.Dx) ? f.Clipper.Round(b.Dx * n + d) : f.Clipper.Round(c.Dx * n + h);
            }
            if (k.Y < b.Top.Y || k.Y < c.Top.Y) {
                if (b.Top.Y > c.Top.Y) return k.Y = b.Top.Y, k.X = f.Clipper.TopX(c, b.Top.Y), k.X < b.Top.X;
                k.Y = c.Top.Y;
                k.X = Math.abs(b.Dx) < Math.abs(c.Dx) ? f.Clipper.TopX(b, k.Y) : f.Clipper.TopX(c, k.Y);
            }
            k.Y > b.Curr.Y && (k.Y = b.Curr.Y, k.X = Math.abs(b.Dx) > Math.abs(c.Dx) ? f.Clipper.TopX(c, k.Y) : f.Clipper.TopX(b, k.Y));
        }
    };
    f.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function(b) {
        for(var c = this.m_ActiveEdges; null !== c;){
            var k = this.IsMaxima(c, b);
            k && (k = this.GetMaximaPair(c), k = null === k || !f.ClipperBase.IsHorizontal(k));
            if (k) {
                var d = c.PrevInAEL;
                this.DoMaxima(c);
                c = null === d ? this.m_ActiveEdges : d.NextInAEL;
            } else {
                this.IsIntermediate(c, b) && f.ClipperBase.IsHorizontal(c.NextInLML) ? (c = this.UpdateEdgeIntoAEL(c), 0 <= c.OutIdx && this.AddOutPt(c, c.Bot), this.AddEdgeToSEL(c)) : (c.Curr.X = f.Clipper.TopX(c, b), c.Curr.Y = b);
                if (this.StrictlySimple && (d = c.PrevInAEL, 0 <= c.OutIdx && 0 !== c.WindDelta && null !== d && 0 <= d.OutIdx && d.Curr.X == c.Curr.X && 0 !== d.WindDelta)) {
                    var h = new f.IntPoint(c.Curr);
                    f.use_xyz && this.SetZ(h, d, c);
                    k = this.AddOutPt(d, h);
                    d = this.AddOutPt(c, h);
                    this.AddJoin(k, d, h);
                }
                c = c.NextInAEL;
            }
        }
        this.ProcessHorizontals(!0);
        for(c = this.m_ActiveEdges; null !== c;)this.IsIntermediate(c, b) && (k = null, 0 <= c.OutIdx && (k = this.AddOutPt(c, c.Top)), c = this.UpdateEdgeIntoAEL(c), d = c.PrevInAEL, h = c.NextInAEL, null !== d && d.Curr.X == c.Bot.X && d.Curr.Y == c.Bot.Y && null !== k && 0 <= d.OutIdx && d.Curr.Y > d.Top.Y && f.ClipperBase.SlopesEqual(c, d, this.m_UseFullRange) && 0 !== c.WindDelta && 0 !== d.WindDelta ? (d = this.AddOutPt(d, c.Bot), this.AddJoin(k, d, c.Top)) : null !== h && h.Curr.X == c.Bot.X && h.Curr.Y == c.Bot.Y && null !== k && 0 <= h.OutIdx && h.Curr.Y > h.Top.Y && f.ClipperBase.SlopesEqual(c, h, this.m_UseFullRange) && 0 !== c.WindDelta && 0 !== h.WindDelta && (d = this.AddOutPt(h, c.Bot), this.AddJoin(k, d, c.Top))), c = c.NextInAEL;
    };
    f.Clipper.prototype.DoMaxima = function(b) {
        var c = this.GetMaximaPair(b);
        if (null === c) 0 <= b.OutIdx && this.AddOutPt(b, b.Top), this.DeleteFromAEL(b);
        else {
            for(var k = b.NextInAEL; null !== k && k != c;)this.IntersectEdges(b, k, b.Top), this.SwapPositionsInAEL(b, k), k = b.NextInAEL;
            -1 == b.OutIdx && -1 == c.OutIdx ? (this.DeleteFromAEL(b), this.DeleteFromAEL(c)) : 0 <= b.OutIdx && 0 <= c.OutIdx ? (0 <= b.OutIdx && this.AddLocalMaxPoly(b, c, b.Top), this.DeleteFromAEL(b), this.DeleteFromAEL(c)) : f.use_lines && 0 === b.WindDelta ? (0 <= b.OutIdx && (this.AddOutPt(b, b.Top), b.OutIdx = -1), this.DeleteFromAEL(b), 0 <= c.OutIdx && (this.AddOutPt(c, b.Top), c.OutIdx = -1), this.DeleteFromAEL(c)) : f.Error("DoMaxima error");
        }
    };
    f.Clipper.ReversePaths = function(b) {
        for(var c = 0, k = b.length; c < k; c++)b[c].reverse();
    };
    f.Clipper.Orientation = function(b) {
        return 0 <= f.Clipper.Area(b);
    };
    f.Clipper.prototype.PointCount = function(b) {
        if (null === b) return 0;
        var c = 0, k = b;
        do c++, k = k.Next;
        while (k != b);
        return c;
    };
    f.Clipper.prototype.BuildResult = function(b) {
        f.Clear(b);
        for(var c = 0, k = this.m_PolyOuts.length; c < k; c++){
            var d = this.m_PolyOuts[c];
            if (null !== d.Pts) {
                d = d.Pts.Prev;
                var h = this.PointCount(d);
                if (!(2 > h)) {
                    for(var n = Array(h), p = 0; p < h; p++)n[p] = d.Pt, d = d.Prev;
                    b.push(n);
                }
            }
        }
    };
    f.Clipper.prototype.BuildResult2 = function(b) {
        b.Clear();
        for(var c = 0, k = this.m_PolyOuts.length; c < k; c++){
            var d = this.m_PolyOuts[c], h = this.PointCount(d.Pts);
            if (!(d.IsOpen && 2 > h || !d.IsOpen && 3 > h)) {
                this.FixHoleLinkage(d);
                var n = new f.PolyNode;
                b.m_AllPolys.push(n);
                d.PolyNode = n;
                n.m_polygon.length = h;
                d = d.Pts.Prev;
                for(var p = 0; p < h; p++)n.m_polygon[p] = d.Pt, d = d.Prev;
            }
        }
        c = 0;
        for(k = this.m_PolyOuts.length; c < k; c++)d = this.m_PolyOuts[c], null !== d.PolyNode && (d.IsOpen ? (d.PolyNode.IsOpen = !0, b.AddChild(d.PolyNode)) : null !== d.FirstLeft && null != d.FirstLeft.PolyNode ? d.FirstLeft.PolyNode.AddChild(d.PolyNode) : b.AddChild(d.PolyNode));
    };
    f.Clipper.prototype.FixupOutPolygon = function(b) {
        var c = null;
        b.BottomPt = null;
        for(var k = b.Pts;;){
            if (k.Prev == k || k.Prev == k.Next) {
                b.Pts = null;
                return;
            }
            if (f.IntPoint.op_Equality(k.Pt, k.Next.Pt) || f.IntPoint.op_Equality(k.Pt, k.Prev.Pt) || f.ClipperBase.SlopesEqual(k.Prev.Pt, k.Pt, k.Next.Pt, this.m_UseFullRange) && (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(k.Prev.Pt, k.Pt, k.Next.Pt))) c = null, k.Prev.Next = k.Next, k = k.Next.Prev = k.Prev;
            else if (k == c) break;
            else null === c && (c = k), k = k.Next;
        }
        b.Pts = k;
    };
    f.Clipper.prototype.DupOutPt = function(b, c) {
        var k = new f.OutPt;
        k.Pt.X = b.Pt.X;
        k.Pt.Y = b.Pt.Y;
        f.use_xyz && (k.Pt.Z = b.Pt.Z);
        k.Idx = b.Idx;
        c ? (k.Next = b.Next, k.Prev = b, b.Next.Prev = k, b.Next = k) : (k.Prev = b.Prev, k.Next = b, b.Prev.Next = k, b.Prev = k);
        return k;
    };
    f.Clipper.prototype.GetOverlap = function(b, c, k, f, d) {
        b < c ? k < f ? (d.Left = Math.max(b, k), d.Right = Math.min(c, f)) : (d.Left = Math.max(b, f), d.Right = Math.min(c, k)) : k < f ? (d.Left = Math.max(c, k), d.Right = Math.min(b, f)) : (d.Left = Math.max(c, f), d.Right = Math.min(b, k));
        return d.Left < d.Right;
    };
    f.Clipper.prototype.JoinHorz = function(b, c, k, d, h, n) {
        var U = b.Pt.X > c.Pt.X ? f.Direction.dRightToLeft : f.Direction.dLeftToRight;
        d = k.Pt.X > d.Pt.X ? f.Direction.dRightToLeft : f.Direction.dLeftToRight;
        if (U == d) return !1;
        if (U == f.Direction.dLeftToRight) {
            for(; b.Next.Pt.X <= h.X && b.Next.Pt.X >= b.Pt.X && b.Next.Pt.Y == h.Y;)b = b.Next;
            n && b.Pt.X != h.X && (b = b.Next);
            c = this.DupOutPt(b, !n);
            f.IntPoint.op_Inequality(c.Pt, h) && (b = c, b.Pt.X = h.X, b.Pt.Y = h.Y, f.use_xyz && (b.Pt.Z = h.Z), c = this.DupOutPt(b, !n));
        } else {
            for(; b.Next.Pt.X >= h.X && b.Next.Pt.X <= b.Pt.X && b.Next.Pt.Y == h.Y;)b = b.Next;
            n || b.Pt.X == h.X || (b = b.Next);
            c = this.DupOutPt(b, n);
            f.IntPoint.op_Inequality(c.Pt, h) && (b = c, b.Pt.X = h.X, b.Pt.Y = h.Y, f.use_xyz && (b.Pt.Z = h.Z), c = this.DupOutPt(b, n));
        }
        if (d == f.Direction.dLeftToRight) {
            for(; k.Next.Pt.X <= h.X && k.Next.Pt.X >= k.Pt.X && k.Next.Pt.Y == h.Y;)k = k.Next;
            n && k.Pt.X != h.X && (k = k.Next);
            d = this.DupOutPt(k, !n);
            f.IntPoint.op_Inequality(d.Pt, h) && (k = d, k.Pt.X = h.X, k.Pt.Y = h.Y, f.use_xyz && (k.Pt.Z = h.Z), d = this.DupOutPt(k, !n));
        } else {
            for(; k.Next.Pt.X >= h.X && k.Next.Pt.X <= k.Pt.X && k.Next.Pt.Y == h.Y;)k = k.Next;
            n || k.Pt.X == h.X || (k = k.Next);
            d = this.DupOutPt(k, n);
            f.IntPoint.op_Inequality(d.Pt, h) && (k = d, k.Pt.X = h.X, k.Pt.Y = h.Y, f.use_xyz && (k.Pt.Z = h.Z), d = this.DupOutPt(k, n));
        }
        U == f.Direction.dLeftToRight == n ? (b.Prev = k, k.Next = b, c.Next = d, d.Prev = c) : (b.Next = k, k.Prev = b, c.Prev = d, d.Next = c);
        return !0;
    };
    f.Clipper.prototype.JoinPoints = function(b, c, k) {
        var d = b.OutPt1, h;
        new f.OutPt;
        var n = b.OutPt2, p;
        new f.OutPt;
        if ((p = b.OutPt1.Pt.Y == b.OffPt.Y) && f.IntPoint.op_Equality(b.OffPt, b.OutPt1.Pt) && f.IntPoint.op_Equality(b.OffPt, b.OutPt2.Pt)) {
            if (c != k) return !1;
            for(h = b.OutPt1.Next; h != d && f.IntPoint.op_Equality(h.Pt, b.OffPt);)h = h.Next;
            h = h.Pt.Y > b.OffPt.Y;
            for(p = b.OutPt2.Next; p != n && f.IntPoint.op_Equality(p.Pt, b.OffPt);)p = p.Next;
            if (h == p.Pt.Y > b.OffPt.Y) return !1;
            h ? (h = this.DupOutPt(d, !1), p = this.DupOutPt(n, !0), d.Prev = n, n.Next = d, h.Next = p, p.Prev = h) : (h = this.DupOutPt(d, !0), p = this.DupOutPt(n, !1), d.Next = n, n.Prev = d, h.Prev = p, p.Next = h);
            b.OutPt1 = d;
            b.OutPt2 = h;
            return !0;
        }
        if (p) {
            for(h = d; d.Prev.Pt.Y == d.Pt.Y && d.Prev != h && d.Prev != n;)d = d.Prev;
            for(; h.Next.Pt.Y == h.Pt.Y && h.Next != d && h.Next != n;)h = h.Next;
            if (h.Next == d || h.Next == n) return !1;
            for(p = n; n.Prev.Pt.Y == n.Pt.Y && n.Prev != p && n.Prev != h;)n = n.Prev;
            for(; p.Next.Pt.Y == p.Pt.Y && p.Next != n && p.Next != d;)p = p.Next;
            if (p.Next == n || p.Next == d) return !1;
            k = {
                Left: null,
                Right: null
            };
            if (!this.GetOverlap(d.Pt.X, h.Pt.X, n.Pt.X, p.Pt.X, k)) return !1;
            c = k.Left;
            var t = k.Right;
            k = new f.IntPoint;
            d.Pt.X >= c && d.Pt.X <= t ? (k.X = d.Pt.X, k.Y = d.Pt.Y, f.use_xyz && (k.Z = d.Pt.Z), c = d.Pt.X > h.Pt.X) : n.Pt.X >= c && n.Pt.X <= t ? (k.X = n.Pt.X, k.Y = n.Pt.Y, f.use_xyz && (k.Z = n.Pt.Z), c = n.Pt.X > p.Pt.X) : h.Pt.X >= c && h.Pt.X <= t ? (k.X = h.Pt.X, k.Y = h.Pt.Y, f.use_xyz && (k.Z = h.Pt.Z), c = h.Pt.X > d.Pt.X) : (k.X = p.Pt.X, k.Y = p.Pt.Y, f.use_xyz && (k.Z = p.Pt.Z), c = p.Pt.X > n.Pt.X);
            b.OutPt1 = d;
            b.OutPt2 = n;
            return this.JoinHorz(d, h, n, p, k, c);
        }
        for(h = d.Next; f.IntPoint.op_Equality(h.Pt, d.Pt) && h != d;)h = h.Next;
        if (t = h.Pt.Y > d.Pt.Y || !f.ClipperBase.SlopesEqual(d.Pt, h.Pt, b.OffPt, this.m_UseFullRange)) {
            for(h = d.Prev; f.IntPoint.op_Equality(h.Pt, d.Pt) && h != d;)h = h.Prev;
            if (h.Pt.Y > d.Pt.Y || !f.ClipperBase.SlopesEqual(d.Pt, h.Pt, b.OffPt, this.m_UseFullRange)) return !1;
        }
        for(p = n.Next; f.IntPoint.op_Equality(p.Pt, n.Pt) && p != n;)p = p.Next;
        var B = p.Pt.Y > n.Pt.Y || !f.ClipperBase.SlopesEqual(n.Pt, p.Pt, b.OffPt, this.m_UseFullRange);
        if (B) {
            for(p = n.Prev; f.IntPoint.op_Equality(p.Pt, n.Pt) && p != n;)p = p.Prev;
            if (p.Pt.Y > n.Pt.Y || !f.ClipperBase.SlopesEqual(n.Pt, p.Pt, b.OffPt, this.m_UseFullRange)) return !1;
        }
        if (h == d || p == n || h == p || c == k && t == B) return !1;
        t ? (h = this.DupOutPt(d, !1), p = this.DupOutPt(n, !0), d.Prev = n, n.Next = d, h.Next = p, p.Prev = h) : (h = this.DupOutPt(d, !0), p = this.DupOutPt(n, !1), d.Next = n, n.Prev = d, h.Prev = p, p.Next = h);
        b.OutPt1 = d;
        b.OutPt2 = h;
        return !0;
    };
    f.Clipper.GetBounds = function(b) {
        for(var c = 0, k = b.length; c < k && 0 == b[c].length;)c++;
        if (c == k) return new f.IntRect(0, 0, 0, 0);
        var d = new f.IntRect;
        d.left = b[c][0].X;
        d.right = d.left;
        d.top = b[c][0].Y;
        for(d.bottom = d.top; c < k; c++)for(var h = 0, n = b[c].length; h < n; h++)b[c][h].X < d.left ? d.left = b[c][h].X : b[c][h].X > d.right && (d.right = b[c][h].X), b[c][h].Y < d.top ? d.top = b[c][h].Y : b[c][h].Y > d.bottom && (d.bottom = b[c][h].Y);
        return d;
    };
    f.Clipper.prototype.GetBounds2 = function(b) {
        var c = b, k = new f.IntRect;
        k.left = b.Pt.X;
        k.right = b.Pt.X;
        k.top = b.Pt.Y;
        k.bottom = b.Pt.Y;
        for(b = b.Next; b != c;)b.Pt.X < k.left && (k.left = b.Pt.X), b.Pt.X > k.right && (k.right = b.Pt.X), b.Pt.Y < k.top && (k.top = b.Pt.Y), b.Pt.Y > k.bottom && (k.bottom = b.Pt.Y), b = b.Next;
        return k;
    };
    f.Clipper.PointInPolygon = function(b, c) {
        var k = 0, f = c.length;
        if (3 > f) return 0;
        for(var d = c[0], h = 1; h <= f; ++h){
            var n = h == f ? c[0] : c[h];
            if (n.Y == b.Y && (n.X == b.X || d.Y == b.Y && n.X > b.X == d.X < b.X)) return -1;
            if (d.Y < b.Y != n.Y < b.Y) {
                if (d.X >= b.X) {
                    if (n.X > b.X) k = 1 - k;
                    else {
                        var p = (d.X - b.X) * (n.Y - b.Y) - (n.X - b.X) * (d.Y - b.Y);
                        if (0 == p) return -1;
                        0 < p == n.Y > d.Y && (k = 1 - k);
                    }
                } else if (n.X > b.X) {
                    p = (d.X - b.X) * (n.Y - b.Y) - (n.X - b.X) * (d.Y - b.Y);
                    if (0 == p) return -1;
                    0 < p == n.Y > d.Y && (k = 1 - k);
                }
            }
            d = n;
        }
        return k;
    };
    f.Clipper.prototype.PointInPolygon = function(b, c) {
        var k = 0, f = c, d = b.X;
        b = b.Y;
        var h = c.Pt.X, n = c.Pt.Y;
        do {
            c = c.Next;
            var p = c.Pt.X, t = c.Pt.Y;
            if (t == b && (p == d || n == b && p > d == h < d)) return -1;
            if (n < b != t < b) {
                if (h >= d) {
                    if (p > d) k = 1 - k;
                    else {
                        h = (h - d) * (t - b) - (p - d) * (n - b);
                        if (0 == h) return -1;
                        0 < h == t > n && (k = 1 - k);
                    }
                } else if (p > d) {
                    h = (h - d) * (t - b) - (p - d) * (n - b);
                    if (0 == h) return -1;
                    0 < h == t > n && (k = 1 - k);
                }
            }
            h = p;
            n = t;
        }while (f != c);
        return k;
    };
    f.Clipper.prototype.Poly2ContainsPoly1 = function(b, c) {
        var k = b;
        do {
            var f = this.PointInPolygon(k.Pt, c);
            if (0 <= f) return 0 < f;
            k = k.Next;
        }while (k != b);
        return !0;
    };
    f.Clipper.prototype.FixupFirstLefts1 = function(b, c) {
        for(var k = 0, f = this.m_PolyOuts.length; k < f; k++){
            var d = this.m_PolyOuts[k];
            null != d.Pts && null != d.FirstLeft && this.ParseFirstLeft(d.FirstLeft) == b && this.Poly2ContainsPoly1(d.Pts, c.Pts) && (d.FirstLeft = c);
        }
    };
    f.Clipper.prototype.FixupFirstLefts2 = function(b, c) {
        for(var k = 0, f = this.m_PolyOuts, d = f.length, h = f[k]; k < d; k++, h = f[k])h.FirstLeft == b && (h.FirstLeft = c);
    };
    f.Clipper.ParseFirstLeft = function(b) {
        for(; null != b && null == b.Pts;)b = b.FirstLeft;
        return b;
    };
    f.Clipper.prototype.JoinCommonEdges = function() {
        for(var b = 0, c = this.m_Joins.length; b < c; b++){
            var k = this.m_Joins[b], d = this.GetOutRec(k.OutPt1.Idx), h = this.GetOutRec(k.OutPt2.Idx);
            if (null != d.Pts && null != h.Pts) {
                var n = d == h ? d : this.Param1RightOfParam2(d, h) ? h : this.Param1RightOfParam2(h, d) ? d : this.GetLowermostRec(d, h);
                if (this.JoinPoints(k, d, h)) {
                    if (d == h) {
                        d.Pts = k.OutPt1;
                        d.BottomPt = null;
                        h = this.CreateOutRec();
                        h.Pts = k.OutPt2;
                        this.UpdateOutPtIdxs(h);
                        if (this.m_UsingPolyTree) {
                            n = 0;
                            for(var p = this.m_PolyOuts.length; n < p - 1; n++){
                                var t = this.m_PolyOuts[n];
                                null != t.Pts && f.Clipper.ParseFirstLeft(t.FirstLeft) == d && t.IsHole != d.IsHole && this.Poly2ContainsPoly1(t.Pts, k.OutPt2) && (t.FirstLeft = h);
                            }
                        }
                        this.Poly2ContainsPoly1(h.Pts, d.Pts) ? (h.IsHole = !d.IsHole, h.FirstLeft = d, this.m_UsingPolyTree && this.FixupFirstLefts2(h, d), (h.IsHole ^ this.ReverseSolution) == 0 < this.Area(h) && this.ReversePolyPtLinks(h.Pts)) : this.Poly2ContainsPoly1(d.Pts, h.Pts) ? (h.IsHole = d.IsHole, d.IsHole = !h.IsHole, h.FirstLeft = d.FirstLeft, d.FirstLeft = h, this.m_UsingPolyTree && this.FixupFirstLefts2(d, h), (d.IsHole ^ this.ReverseSolution) == 0 < this.Area(d) && this.ReversePolyPtLinks(d.Pts)) : (h.IsHole = d.IsHole, h.FirstLeft = d.FirstLeft, this.m_UsingPolyTree && this.FixupFirstLefts1(d, h));
                    } else h.Pts = null, h.BottomPt = null, h.Idx = d.Idx, d.IsHole = n.IsHole, n == h && (d.FirstLeft = h.FirstLeft), h.FirstLeft = d, this.m_UsingPolyTree && this.FixupFirstLefts2(h, d);
                }
            }
        }
    };
    f.Clipper.prototype.UpdateOutPtIdxs = function(b) {
        var c = b.Pts;
        do c.Idx = b.Idx, c = c.Prev;
        while (c != b.Pts);
    };
    f.Clipper.prototype.DoSimplePolygons = function() {
        for(var b = 0; b < this.m_PolyOuts.length;){
            var c = this.m_PolyOuts[b++], k = c.Pts;
            if (null != k && !c.IsOpen) do {
                for(var d = k.Next; d != c.Pts;){
                    if (f.IntPoint.op_Equality(k.Pt, d.Pt) && d.Next != k && d.Prev != k) {
                        var h = k.Prev, n = d.Prev;
                        k.Prev = n;
                        n.Next = k;
                        d.Prev = h;
                        h.Next = d;
                        c.Pts = k;
                        h = this.CreateOutRec();
                        h.Pts = d;
                        this.UpdateOutPtIdxs(h);
                        this.Poly2ContainsPoly1(h.Pts, c.Pts) ? (h.IsHole = !c.IsHole, h.FirstLeft = c, this.m_UsingPolyTree && this.FixupFirstLefts2(h, c)) : this.Poly2ContainsPoly1(c.Pts, h.Pts) ? (h.IsHole = c.IsHole, c.IsHole = !h.IsHole, h.FirstLeft = c.FirstLeft, c.FirstLeft = h, this.m_UsingPolyTree && this.FixupFirstLefts2(c, h)) : (h.IsHole = c.IsHole, h.FirstLeft = c.FirstLeft, this.m_UsingPolyTree && this.FixupFirstLefts1(c, h));
                        d = k;
                    }
                    d = d.Next;
                }
                k = k.Next;
            }while (k != c.Pts);
        }
    };
    f.Clipper.Area = function(b) {
        var c = b.length;
        if (3 > c) return 0;
        for(var k = 0, d = 0, f = c - 1; d < c; ++d)k += (b[f].X + b[d].X) * (b[f].Y - b[d].Y), f = d;
        return .5 * -k;
    };
    f.Clipper.prototype.Area = function(b) {
        var c = b.Pts;
        if (null == c) return 0;
        var k = 0;
        do k += (c.Prev.Pt.X + c.Pt.X) * (c.Prev.Pt.Y - c.Pt.Y), c = c.Next;
        while (c != b.Pts);
        return .5 * k;
    };
    f.Clipper.SimplifyPolygon = function(b, c) {
        var k = [], d = new f.Clipper(0);
        d.StrictlySimple = !0;
        d.AddPath(b, f.PolyType.ptSubject, !0);
        d.Execute(f.ClipType.ctUnion, k, c, c);
        return k;
    };
    f.Clipper.SimplifyPolygons = function(b, c) {
        "undefined" == typeof c && (c = f.PolyFillType.pftEvenOdd);
        var k = [], d = new f.Clipper(0);
        d.StrictlySimple = !0;
        d.AddPaths(b, f.PolyType.ptSubject, !0);
        d.Execute(f.ClipType.ctUnion, k, c, c);
        return k;
    };
    f.Clipper.DistanceSqrd = function(b, c) {
        var k = b.X - c.X;
        b = b.Y - c.Y;
        return k * k + b * b;
    };
    f.Clipper.DistanceFromLineSqrd = function(b, c, k) {
        var d = c.Y - k.Y;
        k = k.X - c.X;
        c = d * c.X + k * c.Y;
        c = d * b.X + k * b.Y - c;
        return c * c / (d * d + k * k);
    };
    f.Clipper.SlopesNearCollinear = function(b, c, k, d) {
        return Math.abs(b.X - c.X) > Math.abs(b.Y - c.Y) ? b.X > c.X == b.X < k.X ? f.Clipper.DistanceFromLineSqrd(b, c, k) < d : c.X > b.X == c.X < k.X ? f.Clipper.DistanceFromLineSqrd(c, b, k) < d : f.Clipper.DistanceFromLineSqrd(k, b, c) < d : b.Y > c.Y == b.Y < k.Y ? f.Clipper.DistanceFromLineSqrd(b, c, k) < d : c.Y > b.Y == c.Y < k.Y ? f.Clipper.DistanceFromLineSqrd(c, b, k) < d : f.Clipper.DistanceFromLineSqrd(k, b, c) < d;
    };
    f.Clipper.PointsAreClose = function(b, c, k) {
        var d = b.X - c.X;
        b = b.Y - c.Y;
        return d * d + b * b <= k;
    };
    f.Clipper.ExcludeOp = function(b) {
        var c = b.Prev;
        c.Next = b.Next;
        b.Next.Prev = c;
        c.Idx = 0;
        return c;
    };
    f.Clipper.CleanPolygon = function(b, c) {
        "undefined" == typeof c && (c = 1.415);
        var k = b.length;
        if (0 == k) return [];
        for(var d = Array(k), h = 0; h < k; ++h)d[h] = new f.OutPt;
        for(h = 0; h < k; ++h)d[h].Pt = b[h], d[h].Next = d[(h + 1) % k], d[h].Next.Prev = d[h], d[h].Idx = 0;
        h = c * c;
        for(d = d[0]; 0 == d.Idx && d.Next != d.Prev;)f.Clipper.PointsAreClose(d.Pt, d.Prev.Pt, h) ? (d = f.Clipper.ExcludeOp(d), k--) : f.Clipper.PointsAreClose(d.Prev.Pt, d.Next.Pt, h) ? (f.Clipper.ExcludeOp(d.Next), d = f.Clipper.ExcludeOp(d), k -= 2) : f.Clipper.SlopesNearCollinear(d.Prev.Pt, d.Pt, d.Next.Pt, h) ? (d = f.Clipper.ExcludeOp(d), k--) : (d.Idx = 1, d = d.Next);
        3 > k && (k = 0);
        b = Array(k);
        for(h = 0; h < k; ++h)b[h] = new f.IntPoint(d.Pt), d = d.Next;
        return b;
    };
    f.Clipper.CleanPolygons = function(b, c) {
        for(var d = Array(b.length), h = 0, n = b.length; h < n; h++)d[h] = f.Clipper.CleanPolygon(b[h], c);
        return d;
    };
    f.Clipper.Minkowski = function(b, c, d, h) {
        h = h ? 1 : 0;
        var k = b.length, n = c.length, p = [];
        if (d) for(d = 0; d < n; d++){
            for(var t = Array(k), B = 0, U = b.length, F = b[B]; B < U; B++, F = b[B])t[B] = new f.IntPoint(c[d].X + F.X, c[d].Y + F.Y);
            p.push(t);
        }
        else for(d = 0; d < n; d++){
            t = Array(k);
            B = 0;
            U = b.length;
            for(F = b[B]; B < U; B++, F = b[B])t[B] = new f.IntPoint(c[d].X - F.X, c[d].Y - F.Y);
            p.push(t);
        }
        b = [];
        for(d = 0; d < n - 1 + h; d++)for(B = 0; B < k; B++)c = [], c.push(p[d % n][B % k]), c.push(p[(d + 1) % n][B % k]), c.push(p[(d + 1) % n][(B + 1) % k]), c.push(p[d % n][(B + 1) % k]), f.Clipper.Orientation(c) || c.reverse(), b.push(c);
        return b;
    };
    f.Clipper.MinkowskiSum = function(b, c, d) {
        if (c[0] instanceof Array) {
            p = c;
            c = new f.Paths;
            for(var k = new f.Clipper, h = 0; h < p.length; ++h){
                var n = f.Clipper.Minkowski(b, p[h], !0, d);
                k.AddPaths(n, f.PolyType.ptSubject, !0);
                d && (n = f.Clipper.TranslatePath(p[h], b[0]), k.AddPath(n, f.PolyType.ptClip, !0));
            }
            k.Execute(f.ClipType.ctUnion, c, f.PolyFillType.pftNonZero, f.PolyFillType.pftNonZero);
            return c;
        }
        var p = f.Clipper.Minkowski(b, c, !0, d);
        k = new f.Clipper;
        k.AddPaths(p, f.PolyType.ptSubject, !0);
        k.Execute(f.ClipType.ctUnion, p, f.PolyFillType.pftNonZero, f.PolyFillType.pftNonZero);
        return p;
    };
    f.Clipper.TranslatePath = function(b, c) {
        for(var d = new f.Path, h = 0; h < b.length; h++)d.push(new f.IntPoint(b[h].X + c.X, b[h].Y + c.Y));
        return d;
    };
    f.Clipper.MinkowskiDiff = function(b, c) {
        b = f.Clipper.Minkowski(b, c, !1, !0);
        c = new f.Clipper;
        c.AddPaths(b, f.PolyType.ptSubject, !0);
        c.Execute(f.ClipType.ctUnion, b, f.PolyFillType.pftNonZero, f.PolyFillType.pftNonZero);
        return b;
    };
    f.Clipper.PolyTreeToPaths = function(b) {
        var c = [];
        f.Clipper.AddPolyNodeToPaths(b, f.Clipper.NodeType.ntAny, c);
        return c;
    };
    f.Clipper.AddPolyNodeToPaths = function(b, c, d) {
        var k = !0;
        switch(c){
            case f.Clipper.NodeType.ntOpen:
                return;
            case f.Clipper.NodeType.ntClosed:
                k = !b.IsOpen;
        }
        0 < b.m_polygon.length && k && d.push(b.m_polygon);
        k = 0;
        b = b.Childs();
        for(var h = b.length, n = b[k]; k < h; k++, n = b[k])f.Clipper.AddPolyNodeToPaths(n, c, d);
    };
    f.Clipper.OpenPathsFromPolyTree = function(b) {
        for(var c = new f.Paths, d = 0, h = b.ChildCount(); d < h; d++)b.Childs()[d].IsOpen && c.push(b.Childs()[d].m_polygon);
        return c;
    };
    f.Clipper.ClosedPathsFromPolyTree = function(b) {
        var c = new f.Paths;
        f.Clipper.AddPolyNodeToPaths(b, f.Clipper.NodeType.ntClosed, c);
        return c;
    };
    ua(f.Clipper, f.ClipperBase);
    f.Clipper.NodeType = {
        ntAny: 0,
        ntOpen: 1,
        ntClosed: 2
    };
    f.ClipperOffset = function(b, c) {
        "undefined" == typeof b && (b = 2);
        "undefined" == typeof c && (c = f.ClipperOffset.def_arc_tolerance);
        this.m_destPolys = new f.Paths;
        this.m_srcPoly = new f.Path;
        this.m_destPoly = new f.Path;
        this.m_normals = [];
        this.m_StepsPerRad = this.m_miterLim = this.m_cos = this.m_sin = this.m_sinA = this.m_delta = 0;
        this.m_lowest = new f.IntPoint;
        this.m_polyNodes = new f.PolyNode;
        this.MiterLimit = b;
        this.ArcTolerance = c;
        this.m_lowest.X = -1;
    };
    f.ClipperOffset.two_pi = 6.28318530717959;
    f.ClipperOffset.def_arc_tolerance = .25;
    f.ClipperOffset.prototype.Clear = function() {
        f.Clear(this.m_polyNodes.Childs());
        this.m_lowest.X = -1;
    };
    f.ClipperOffset.Round = f.Clipper.Round;
    f.ClipperOffset.prototype.AddPath = function(b, c, d) {
        var k = b.length - 1;
        if (!(0 > k)) {
            var h = new f.PolyNode;
            h.m_jointype = c;
            h.m_endtype = d;
            if (d == f.EndType.etClosedLine || d == f.EndType.etClosedPolygon) for(; 0 < k && f.IntPoint.op_Equality(b[0], b[k]);)k--;
            h.m_polygon.push(b[0]);
            var n = 0;
            c = 0;
            for(var p = 1; p <= k; p++)f.IntPoint.op_Inequality(h.m_polygon[n], b[p]) && (n++, h.m_polygon.push(b[p]), b[p].Y > h.m_polygon[c].Y || b[p].Y == h.m_polygon[c].Y && b[p].X < h.m_polygon[c].X) && (c = n);
            if (!(d == f.EndType.etClosedPolygon && 2 > n) && (this.m_polyNodes.AddChild(h), d == f.EndType.etClosedPolygon)) {
                if (0 > this.m_lowest.X) this.m_lowest = new f.IntPoint(this.m_polyNodes.ChildCount() - 1, c);
                else if (b = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y], h.m_polygon[c].Y > b.Y || h.m_polygon[c].Y == b.Y && h.m_polygon[c].X < b.X) this.m_lowest = new f.IntPoint(this.m_polyNodes.ChildCount() - 1, c);
            }
        }
    };
    f.ClipperOffset.prototype.AddPaths = function(b, c, d) {
        for(var k = 0, f = b.length; k < f; k++)this.AddPath(b[k], c, d);
    };
    f.ClipperOffset.prototype.FixOrientations = function() {
        if (0 <= this.m_lowest.X && !f.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon)) for(var b = 0; b < this.m_polyNodes.ChildCount(); b++){
            var c = this.m_polyNodes.Childs()[b];
            (c.m_endtype == f.EndType.etClosedPolygon || c.m_endtype == f.EndType.etClosedLine && f.Clipper.Orientation(c.m_polygon)) && c.m_polygon.reverse();
        }
        else for(b = 0; b < this.m_polyNodes.ChildCount(); b++)c = this.m_polyNodes.Childs()[b], c.m_endtype != f.EndType.etClosedLine || f.Clipper.Orientation(c.m_polygon) || c.m_polygon.reverse();
    };
    f.ClipperOffset.GetUnitNormal = function(b, c) {
        var d = c.X - b.X;
        b = c.Y - b.Y;
        if (0 == d && 0 == b) return new f.DoublePoint(0, 0);
        c = 1 / Math.sqrt(d * d + b * b);
        return new f.DoublePoint(b * c, -(d * c));
    };
    f.ClipperOffset.prototype.DoOffset = function(b) {
        this.m_destPolys = [];
        this.m_delta = b;
        if (f.ClipperBase.near_zero(b)) for(var c = 0; c < this.m_polyNodes.ChildCount(); c++){
            var d = this.m_polyNodes.Childs()[c];
            d.m_endtype == f.EndType.etClosedPolygon && this.m_destPolys.push(d.m_polygon);
        }
        else {
            this.m_miterLim = 2 < this.MiterLimit ? 2 / (this.MiterLimit * this.MiterLimit) : .5;
            var h = 3.14159265358979 / Math.acos(1 - (0 >= this.ArcTolerance ? f.ClipperOffset.def_arc_tolerance : this.ArcTolerance > Math.abs(b) * f.ClipperOffset.def_arc_tolerance ? Math.abs(b) * f.ClipperOffset.def_arc_tolerance : this.ArcTolerance) / Math.abs(b));
            this.m_sin = Math.sin(f.ClipperOffset.two_pi / h);
            this.m_cos = Math.cos(f.ClipperOffset.two_pi / h);
            this.m_StepsPerRad = h / f.ClipperOffset.two_pi;
            0 > b && (this.m_sin = -this.m_sin);
            for(c = 0; c < this.m_polyNodes.ChildCount(); c++){
                d = this.m_polyNodes.Childs()[c];
                this.m_srcPoly = d.m_polygon;
                var n = this.m_srcPoly.length;
                if (!(0 == n || 0 >= b && (3 > n || d.m_endtype != f.EndType.etClosedPolygon))) {
                    this.m_destPoly = [];
                    if (1 == n) {
                        if (d.m_jointype == f.JoinType.jtRound) {
                            d = 1;
                            n = 0;
                            for(var p = 1; p <= h; p++){
                                this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[0].X + d * b), f.ClipperOffset.Round(this.m_srcPoly[0].Y + n * b)));
                                var t = d;
                                d = d * this.m_cos - this.m_sin * n;
                                n = t * this.m_sin + n * this.m_cos;
                            }
                        } else for(n = d = -1, p = 0; 4 > p; ++p)this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[0].X + d * b), f.ClipperOffset.Round(this.m_srcPoly[0].Y + n * b))), 0 > d ? d = 1 : 0 > n ? n = 1 : d = -1;
                    } else {
                        for(p = this.m_normals.length = 0; p < n - 1; p++)this.m_normals.push(f.ClipperOffset.GetUnitNormal(this.m_srcPoly[p], this.m_srcPoly[p + 1]));
                        d.m_endtype == f.EndType.etClosedLine || d.m_endtype == f.EndType.etClosedPolygon ? this.m_normals.push(f.ClipperOffset.GetUnitNormal(this.m_srcPoly[n - 1], this.m_srcPoly[0])) : this.m_normals.push(new f.DoublePoint(this.m_normals[n - 2]));
                        if (d.m_endtype == f.EndType.etClosedPolygon) for(t = n - 1, p = 0; p < n; p++)t = this.OffsetPoint(p, t, d.m_jointype);
                        else if (d.m_endtype == f.EndType.etClosedLine) {
                            t = n - 1;
                            for(p = 0; p < n; p++)t = this.OffsetPoint(p, t, d.m_jointype);
                            this.m_destPolys.push(this.m_destPoly);
                            this.m_destPoly = [];
                            t = this.m_normals[n - 1];
                            for(p = n - 1; 0 < p; p--)this.m_normals[p] = new f.DoublePoint(-this.m_normals[p - 1].X, -this.m_normals[p - 1].Y);
                            this.m_normals[0] = new f.DoublePoint(-t.X, -t.Y);
                            t = 0;
                            for(p = n - 1; 0 <= p; p--)t = this.OffsetPoint(p, t, d.m_jointype);
                        } else {
                            t = 0;
                            for(p = 1; p < n - 1; ++p)t = this.OffsetPoint(p, t, d.m_jointype);
                            d.m_endtype == f.EndType.etOpenButt ? (p = n - 1, t = new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[p].X + this.m_normals[p].X * b), f.ClipperOffset.Round(this.m_srcPoly[p].Y + this.m_normals[p].Y * b)), this.m_destPoly.push(t), t = new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[p].X - this.m_normals[p].X * b), f.ClipperOffset.Round(this.m_srcPoly[p].Y - this.m_normals[p].Y * b)), this.m_destPoly.push(t)) : (p = n - 1, t = n - 2, this.m_sinA = 0, this.m_normals[p] = new f.DoublePoint(-this.m_normals[p].X, -this.m_normals[p].Y), d.m_endtype == f.EndType.etOpenSquare ? this.DoSquare(p, t) : this.DoRound(p, t));
                            for(p = n - 1; 0 < p; p--)this.m_normals[p] = new f.DoublePoint(-this.m_normals[p - 1].X, -this.m_normals[p - 1].Y);
                            this.m_normals[0] = new f.DoublePoint(-this.m_normals[1].X, -this.m_normals[1].Y);
                            t = n - 1;
                            for(p = t - 1; 0 < p; --p)t = this.OffsetPoint(p, t, d.m_jointype);
                            d.m_endtype == f.EndType.etOpenButt ? (t = new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * b), f.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * b)), this.m_destPoly.push(t), t = new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * b), f.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * b)), this.m_destPoly.push(t)) : (this.m_sinA = 0, d.m_endtype == f.EndType.etOpenSquare ? this.DoSquare(0, 1) : this.DoRound(0, 1));
                        }
                    }
                    this.m_destPolys.push(this.m_destPoly);
                }
            }
        }
    };
    f.ClipperOffset.prototype.Execute = function() {
        var b = arguments;
        if (b[0] instanceof f.PolyTree) {
            if (c = b[0], d = b[1], c.Clear(), this.FixOrientations(), this.DoOffset(d), b = new f.Clipper(0), b.AddPaths(this.m_destPolys, f.PolyType.ptSubject, !0), 0 < d) b.Execute(f.ClipType.ctUnion, c, f.PolyFillType.pftPositive, f.PolyFillType.pftPositive);
            else if (d = f.Clipper.GetBounds(this.m_destPolys), h = new f.Path, h.push(new f.IntPoint(d.left - 10, d.bottom + 10)), h.push(new f.IntPoint(d.right + 10, d.bottom + 10)), h.push(new f.IntPoint(d.right + 10, d.top - 10)), h.push(new f.IntPoint(d.left - 10, d.top - 10)), b.AddPath(h, f.PolyType.ptSubject, !0), b.ReverseSolution = !0, b.Execute(f.ClipType.ctUnion, c, f.PolyFillType.pftNegative, f.PolyFillType.pftNegative), 1 == c.ChildCount() && 0 < c.Childs()[0].ChildCount()) for(b = c.Childs()[0], c.Childs()[0] = b.Childs()[0], c.Childs()[0].m_Parent = c, d = 1; d < b.ChildCount(); d++)c.AddChild(b.Childs()[d]);
            else c.Clear();
        } else {
            var c = b[0], d = b[1];
            f.Clear(c);
            this.FixOrientations();
            this.DoOffset(d);
            b = new f.Clipper(0);
            b.AddPaths(this.m_destPolys, f.PolyType.ptSubject, !0);
            if (0 < d) b.Execute(f.ClipType.ctUnion, c, f.PolyFillType.pftPositive, f.PolyFillType.pftPositive);
            else {
                d = f.Clipper.GetBounds(this.m_destPolys);
                var h = new f.Path;
                h.push(new f.IntPoint(d.left - 10, d.bottom + 10));
                h.push(new f.IntPoint(d.right + 10, d.bottom + 10));
                h.push(new f.IntPoint(d.right + 10, d.top - 10));
                h.push(new f.IntPoint(d.left - 10, d.top - 10));
                b.AddPath(h, f.PolyType.ptSubject, !0);
                b.ReverseSolution = !0;
                b.Execute(f.ClipType.ctUnion, c, f.PolyFillType.pftNegative, f.PolyFillType.pftNegative);
                0 < c.length && c.splice(0, 1);
            }
        }
    };
    f.ClipperOffset.prototype.OffsetPoint = function(b, c, d) {
        this.m_sinA = this.m_normals[c].X * this.m_normals[b].Y - this.m_normals[b].X * this.m_normals[c].Y;
        if (1 > Math.abs(this.m_sinA * this.m_delta)) {
            if (0 < this.m_normals[c].X * this.m_normals[b].X + this.m_normals[b].Y * this.m_normals[c].Y) return this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + this.m_normals[c].X * this.m_delta), f.ClipperOffset.Round(this.m_srcPoly[b].Y + this.m_normals[c].Y * this.m_delta))), c;
        } else 1 < this.m_sinA ? this.m_sinA = 1 : -1 > this.m_sinA && (this.m_sinA = -1);
        if (0 > this.m_sinA * this.m_delta) this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + this.m_normals[c].X * this.m_delta), f.ClipperOffset.Round(this.m_srcPoly[b].Y + this.m_normals[c].Y * this.m_delta))), this.m_destPoly.push(new f.IntPoint(this.m_srcPoly[b])), this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + this.m_normals[b].X * this.m_delta), f.ClipperOffset.Round(this.m_srcPoly[b].Y + this.m_normals[b].Y * this.m_delta)));
        else switch(d){
            case f.JoinType.jtMiter:
                d = 1 + (this.m_normals[b].X * this.m_normals[c].X + this.m_normals[b].Y * this.m_normals[c].Y);
                d >= this.m_miterLim ? this.DoMiter(b, c, d) : this.DoSquare(b, c);
                break;
            case f.JoinType.jtSquare:
                this.DoSquare(b, c);
                break;
            case f.JoinType.jtRound:
                this.DoRound(b, c);
        }
        return b;
    };
    f.ClipperOffset.prototype.DoSquare = function(b, c) {
        var d = Math.tan(Math.atan2(this.m_sinA, this.m_normals[c].X * this.m_normals[b].X + this.m_normals[c].Y * this.m_normals[b].Y) / 4);
        this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + this.m_delta * (this.m_normals[c].X - this.m_normals[c].Y * d)), f.ClipperOffset.Round(this.m_srcPoly[b].Y + this.m_delta * (this.m_normals[c].Y + this.m_normals[c].X * d))));
        this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + this.m_delta * (this.m_normals[b].X + this.m_normals[b].Y * d)), f.ClipperOffset.Round(this.m_srcPoly[b].Y + this.m_delta * (this.m_normals[b].Y - this.m_normals[b].X * d))));
    };
    f.ClipperOffset.prototype.DoMiter = function(b, c, d) {
        d = this.m_delta / d;
        this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + (this.m_normals[c].X + this.m_normals[b].X) * d), f.ClipperOffset.Round(this.m_srcPoly[b].Y + (this.m_normals[c].Y + this.m_normals[b].Y) * d)));
    };
    f.ClipperOffset.prototype.DoRound = function(b, c) {
        var d = Math.max(f.Cast_Int32(f.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(Math.atan2(this.m_sinA, this.m_normals[c].X * this.m_normals[b].X + this.m_normals[c].Y * this.m_normals[b].Y)))), 1), h = this.m_normals[c].X;
        c = this.m_normals[c].Y;
        for(var n, p = 0; p < d; ++p)this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + h * this.m_delta), f.ClipperOffset.Round(this.m_srcPoly[b].Y + c * this.m_delta))), n = h, h = h * this.m_cos - this.m_sin * c, c = n * this.m_sin + c * this.m_cos;
        this.m_destPoly.push(new f.IntPoint(f.ClipperOffset.Round(this.m_srcPoly[b].X + this.m_normals[b].X * this.m_delta), f.ClipperOffset.Round(this.m_srcPoly[b].Y + this.m_normals[b].Y * this.m_delta)));
    };
    f.Error = function(b) {
        try {
            throw Error(b);
        } catch (c) {
            alert(c.message);
        }
    };
    f.JS = {};
    f.JS.AreaOfPolygon = function(b, c) {
        c || (c = 1);
        return f.Clipper.Area(b) / (c * c);
    };
    f.JS.AreaOfPolygons = function(b, c) {
        c || (c = 1);
        for(var d = 0, h = 0; h < b.length; h++)d += f.Clipper.Area(b[h]);
        return d / (c * c);
    };
    f.JS.BoundsOfPath = function(b, c) {
        return f.JS.BoundsOfPaths([
            b
        ], c);
    };
    f.JS.BoundsOfPaths = function(b, c) {
        c || (c = 1);
        b = f.Clipper.GetBounds(b);
        b.left /= c;
        b.bottom /= c;
        b.right /= c;
        b.top /= c;
        return b;
    };
    f.JS.Clean = function(b, c) {
        if (!(b instanceof Array)) return [];
        var d = b[0] instanceof Array;
        b = f.JS.Clone(b);
        if ("number" != typeof c || null === c) return f.Error("Delta is not a number in Clean()."), b;
        if (0 === b.length || 1 == b.length && 0 === b[0].length || 0 > c) return b;
        d || (b = [
            b
        ]);
        for(var h = b.length, n, p, t, B, F, G, I, K = [], ia = 0; ia < h; ia++)if (p = b[ia], n = p.length, 0 !== n) {
            if (3 > n) t = p, K.push(t);
            else {
                t = p;
                B = c * c;
                F = p[0];
                for(I = G = 1; I < n; I++)(p[I].X - F.X) * (p[I].X - F.X) + (p[I].Y - F.Y) * (p[I].Y - F.Y) <= B || (t[G] = p[I], F = p[I], G++);
                F = p[G - 1];
                (p[0].X - F.X) * (p[0].X - F.X) + (p[0].Y - F.Y) * (p[0].Y - F.Y) <= B && G--;
                G < n && t.splice(G, n - G);
                t.length && K.push(t);
            }
        }
        !d && K.length ? K = K[0] : d || 0 !== K.length ? d && 0 === K.length && (K = [
            []
        ]) : K = [];
        return K;
    };
    f.JS.Clone = function(b) {
        if (!(b instanceof Array) || 0 === b.length) return [];
        if (1 == b.length && 0 === b[0].length) return [
            []
        ];
        var c = b[0] instanceof Array;
        c || (b = [
            b
        ]);
        var d = b.length, f, h, n = Array(d);
        for(f = 0; f < d; f++){
            var p = b[f].length;
            var t = Array(p);
            for(h = 0; h < p; h++)t[h] = {
                X: b[f][h].X,
                Y: b[f][h].Y
            };
            n[f] = t;
        }
        c || (n = n[0]);
        return n;
    };
    f.JS.Lighten = function(b, c) {
        if (!(b instanceof Array)) return [];
        if ("number" != typeof c || null === c) return f.Error("Tolerance is not a number in Lighten()."), f.JS.Clone(b);
        if (0 === b.length || 1 == b.length && 0 === b[0].length || 0 > c) return f.JS.Clone(b);
        b[0] instanceof Array || (b = [
            b
        ]);
        var d, h, n, p, t, B = b.length, F = c * c, G = [];
        for(c = 0; c < B; c++)if (h = b[c], p = h.length, 0 != p) {
            for(n = 0; 1E6 > n; n++){
                var I = [];
                p = h.length;
                h[p - 1].X != h[0].X || h[p - 1].Y != h[0].Y ? (t = 1, h.push({
                    X: h[0].X,
                    Y: h[0].Y
                }), p = h.length) : t = 0;
                var K = [];
                for(d = 0; d < p - 2; d++){
                    var ia = h[d];
                    var O = h[d + 1];
                    var T = h[d + 2];
                    var X = ia.X;
                    var Wa = ia.Y;
                    ia = T.X - X;
                    var ba = T.Y - Wa;
                    if (0 !== ia || 0 !== ba) {
                        var db = ((O.X - X) * ia + (O.Y - Wa) * ba) / (ia * ia + ba * ba);
                        1 < db ? (X = T.X, Wa = T.Y) : 0 < db && (X += ia * db, Wa += ba * db);
                    }
                    ia = O.X - X;
                    ba = O.Y - Wa;
                    T = ia * ia + ba * ba;
                    T <= F && (K[d + 1] = 1, d++);
                }
                I.push({
                    X: h[0].X,
                    Y: h[0].Y
                });
                for(d = 1; d < p - 1; d++)K[d] || I.push({
                    X: h[d].X,
                    Y: h[d].Y
                });
                I.push({
                    X: h[p - 1].X,
                    Y: h[p - 1].Y
                });
                t && h.pop();
                if (K.length) h = I;
                else break;
            }
            p = I.length;
            I[p - 1].X == I[0].X && I[p - 1].Y == I[0].Y && I.pop();
            2 < I.length && G.push(I);
        }
        b[0] instanceof Array || (G = G[0]);
        "undefined" == typeof G && (G = [
            []
        ]);
        return G;
    };
    f.JS.PerimeterOfPath = function(b, c, d) {
        if ("undefined" == typeof b) return 0;
        var f = Math.sqrt, k = 0, h = b.length;
        if (2 > h) return 0;
        for(c && (b[h] = b[0], h++); --h;){
            var n = b[h];
            var p = n.X;
            n = n.Y;
            var t = b[h - 1];
            var B = t.X;
            t = t.Y;
            k += f((p - B) * (p - B) + (n - t) * (n - t));
        }
        c && b.pop();
        return k / d;
    };
    f.JS.PerimeterOfPaths = function(b, c, d) {
        d || (d = 1);
        for(var k = 0, h = 0; h < b.length; h++)k += f.JS.PerimeterOfPath(b[h], c, d);
        return k;
    };
    f.JS.ScaleDownPath = function(b, c) {
        var d;
        c || (c = 1);
        for(d = b.length; d--;){
            var f = b[d];
            f.X /= c;
            f.Y /= c;
        }
    };
    f.JS.ScaleDownPaths = function(b, c) {
        var d, f;
        c || (c = 1);
        for(d = b.length; d--;)for(f = b[d].length; f--;){
            var h = b[d][f];
            h.X /= c;
            h.Y /= c;
        }
    };
    f.JS.ScaleUpPath = function(b, c) {
        var d, f = Math.round;
        c || (c = 1);
        for(d = b.length; d--;){
            var h = b[d];
            h.X = f(h.X * c);
            h.Y = f(h.Y * c);
        }
    };
    f.JS.ScaleUpPaths = function(b, c) {
        var d, f, h = Math.round;
        c || (c = 1);
        for(d = b.length; d--;)for(f = b[d].length; f--;){
            var n = b[d][f];
            n.X = h(n.X * c);
            n.Y = h(n.Y * c);
        }
    };
    f.ExPolygons = function() {
        return [];
    };
    f.ExPolygon = function() {
        this.holes = this.outer = null;
    };
    f.JS.AddOuterPolyNodeToExPolygons = function(b, c) {
        var d = new f.ExPolygon;
        d.outer = b.Contour();
        b = b.Childs();
        var h = b.length;
        d.holes = Array(h);
        var n, p;
        for(n = 0; n < h; n++){
            var t = b[n];
            d.holes[n] = t.Contour();
            var B = 0;
            var F = t.Childs();
            for(p = F.length; B < p; B++)t = F[B], f.JS.AddOuterPolyNodeToExPolygons(t, c);
        }
        c.push(d);
    };
    f.JS.ExPolygonsToPaths = function(b) {
        var c, d, h = new f.Paths;
        var n = 0;
        for(c = b.length; n < c; n++){
            h.push(b[n].outer);
            var p = 0;
            for(d = b[n].holes.length; p < d; p++)h.push(b[n].holes[p]);
        }
        return h;
    };
    f.JS.PolyTreeToExPolygons = function(b) {
        var c = new f.ExPolygons, d;
        var h = 0;
        var n = b.Childs();
        for(d = n.length; h < d; h++)b = n[h], f.JS.AddOuterPolyNodeToExPolygons(b, c);
        return c;
    };
})();
(function(d, n) {
    "function" === typeof define && define.amd ? define(n) : "object" === typeof exports ? module.exports = n() : d.returnExports = n();
})(this, function() {
    var d = Function.call.bind(Function.apply), n = Function.call.bind(Function.call), t = Array.isArray, G = Object.keys, B = function(b) {
        try {
            return b(), !1;
        } catch (Ka) {
            return !0;
        }
    }, I = function(b) {
        try {
            return b();
        } catch (Ka) {
            return !1;
        }
    }, O = function(b) {
        return function() {
            return !d(b, this, arguments);
        };
    }(B), h = function() {
        return !B(function() {
            return Object.defineProperty({}, "x", {
                get: function() {}
            });
        });
    }, X = !!Object.defineProperty && h(), p = "foo" === (function() {}).name, ia = Function.call.bind(Array.prototype.forEach), Wa = Function.call.bind(Array.prototype.reduce), nc = Function.call.bind(Array.prototype.filter), db = Function.call.bind(Array.prototype.some), K = function(b, c, g, d) {
        !d && c in b || (X ? Object.defineProperty(b, c, {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: g
        }) : b[c] = g);
    }, ta = function(b, c, g) {
        ia(G(c), function(d) {
            K(b, d, c[d], !!g);
        });
    }, Na = Function.call.bind(Object.prototype.toString), f = "function" === typeof /abc/ ? function(b) {
        return "function" === typeof b && "[object Function]" === Na(b);
    } : function(b) {
        return "function" === typeof b;
    }, ba = {
        getter: function(b, c, g) {
            if (!X) throw new TypeError("getters require true ES5 support");
            Object.defineProperty(b, c, {
                configurable: !0,
                enumerable: !1,
                get: g
            });
        },
        proxy: function(b, c, g) {
            if (!X) throw new TypeError("getters require true ES5 support");
            var d = Object.getOwnPropertyDescriptor(b, c);
            Object.defineProperty(g, c, {
                configurable: d.configurable,
                enumerable: d.enumerable,
                get: function() {
                    return b[c];
                },
                set: function(g) {
                    b[c] = g;
                }
            });
        },
        redefine: function(b, c, g) {
            if (X) {
                var d = Object.getOwnPropertyDescriptor(b, c);
                d.value = g;
                Object.defineProperty(b, c, d);
            } else b[c] = g;
        },
        defineByDescriptor: function(b, c, g) {
            X ? Object.defineProperty(b, c, g) : "value" in g && (b[c] = g.value);
        },
        preserveToString: function(b, c) {
            c && f(c.toString) && K(b, "toString", c.toString.bind(c), !0);
        }
    }, ua = Object.create || function(b, c) {
        var g = function() {};
        g.prototype = b;
        var d = new g;
        "undefined" !== typeof c && G(c).forEach(function(b) {
            ba.defineByDescriptor(d, b, c[b]);
        });
        return d;
    }, va = function(b, c) {
        return Object.setPrototypeOf ? I(function() {
            var g = function L(c) {
                c = new b(c);
                Object.setPrototypeOf(c, L.prototype);
                return c;
            };
            Object.setPrototypeOf(g, b);
            g.prototype = ua(b.prototype, {
                constructor: {
                    value: g
                }
            });
            return c(g);
        }) : !1;
    }, F = function() {
        if ("undefined" !== typeof self) return self;
        if ("undefined" !== typeof window) return window;
        if ("undefined" !== typeof global) return global;
        throw Error("unable to locate global object");
    }(), ub = F.isFinite, Wb = Function.call.bind(String.prototype.indexOf), Ab = Function.apply.bind(Array.prototype.indexOf), Bb = Function.call.bind(Array.prototype.concat), zb = Function.call.bind(String.prototype.slice), Xa = Function.call.bind(Array.prototype.push), Oa = Function.apply.bind(Array.prototype.push), T = Function.call.bind(Array.prototype.shift), Gb = Math.max, b = Math.min, c = Math.floor, k = Math.abs, U = Math.exp, ca = Math.log, Z = Math.sqrt, J = Function.call.bind(Object.prototype.hasOwnProperty), Xb = function() {}, Ga = F.Map, gd = Ga && Ga.prototype["delete"], da = Ga && Ga.prototype.get, Fb = Ga && Ga.prototype.has, oc = Ga && Ga.prototype.set, oa = F.Symbol || {}, pc = oa.species || "@@species", Sa = Number.isNaN || function(b) {
        return b !== b;
    }, Ic = Number.isFinite || function(b) {
        return "number" === typeof b && ub(b);
    }, Yb = f(Math.sign) ? Math.sign : function(b) {
        b = Number(b);
        return 0 === b || Sa(b) ? b : 0 > b ? -1 : 1;
    }, Hb = function(b) {
        b = Number(b);
        return -1 > b || Sa(b) ? NaN : 0 === b || Infinity === b ? b : -1 === b ? -Infinity : 0 === 1 + b - 1 ? b : b * (ca(1 + b) / (1 + b - 1));
    }, hd = function(b) {
        return "[object Arguments]" === Na(b);
    }, Hd = function(b) {
        return null !== b && "object" === typeof b && "number" === typeof b.length && 0 <= b.length && "[object Array]" !== Na(b) && "[object Function]" === Na(b.callee);
    }, Jc = hd(arguments) ? hd : Hd, Da = {
        primitive: function(b) {
            return null === b || "function" !== typeof b && "object" !== typeof b;
        },
        string: function(b) {
            return "[object String]" === Na(b);
        },
        regex: function(b) {
            return "[object RegExp]" === Na(b);
        },
        symbol: function(b) {
            return "function" === typeof F.Symbol && "symbol" === typeof b;
        }
    }, R = function(b, c, g) {
        var d = b[c];
        K(b, c, g, !0);
        ba.preserveToString(b[c], d);
    }, qc = "function" === typeof oa && "function" === typeof oa["for"] && Da.symbol(oa()), eb = Da.symbol(oa.iterator) ? oa.iterator : "_es6-shim iterator_";
    F.Set && "function" === typeof (new F.Set)["@@iterator"] && (eb = "@@iterator");
    F.Reflect || K(F, "Reflect", {}, !0);
    var Ib = F.Reflect, Kc = String, Lc = "undefined" !== typeof document && document ? document.all : null, rb = null == Lc ? function(b) {
        return null == b;
    } : function(b) {
        return null == b && b !== Lc;
    }, A = {
        Call: function(b, c) {
            var g = 2 < arguments.length ? arguments[2] : [];
            if (!A.IsCallable(b)) throw new TypeError(b + " is not a function");
            return d(b, c, g);
        },
        RequireObjectCoercible: function(b, c) {
            if (rb(b)) throw new TypeError(c || "Cannot call method on " + b);
            return b;
        },
        TypeIsObject: function(b) {
            return void 0 === b || null === b || !0 === b || !1 === b ? !1 : "function" === typeof b || "object" === typeof b || b === Lc;
        },
        ToObject: function(b, c) {
            return Object(A.RequireObjectCoercible(b, c));
        },
        IsCallable: f,
        IsConstructor: function(b) {
            return A.IsCallable(b);
        },
        ToInt32: function(b) {
            return A.ToNumber(b) >> 0;
        },
        ToUint32: function(b) {
            return A.ToNumber(b) >>> 0;
        },
        ToNumber: function(b) {
            if ("[object Symbol]" === Na(b)) throw new TypeError("Cannot convert a Symbol value to a number");
            return +b;
        },
        ToInteger: function(b) {
            b = A.ToNumber(b);
            return Sa(b) ? 0 : 0 !== b && Ic(b) ? (0 < b ? 1 : -1) * c(k(b)) : b;
        },
        ToLength: function(b) {
            b = A.ToInteger(b);
            return 0 >= b ? 0 : b > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : b;
        },
        SameValue: function(b, c) {
            return b === c ? 0 === b ? 1 / b === 1 / c : !0 : Sa(b) && Sa(c);
        },
        SameValueZero: function(b, c) {
            return b === c || Sa(b) && Sa(c);
        },
        IsIterable: function(b) {
            return A.TypeIsObject(b) && ("undefined" !== typeof b[eb] || Jc(b));
        },
        GetIterator: function(b) {
            if (Jc(b)) return new Pa(b, "value");
            var c = A.GetMethod(b, eb);
            if (!A.IsCallable(c)) throw new TypeError("value is not an iterable");
            b = A.Call(c, b);
            if (!A.TypeIsObject(b)) throw new TypeError("bad iterator");
            return b;
        },
        GetMethod: function(b, c) {
            b = A.ToObject(b)[c];
            if (!rb(b)) {
                if (!A.IsCallable(b)) throw new TypeError("Method not callable: " + c);
                return b;
            }
        },
        IteratorComplete: function(b) {
            return !!b.done;
        },
        IteratorClose: function(b, c) {
            var g = A.GetMethod(b, "return");
            if (void 0 !== g) {
                try {
                    var d = A.Call(g, b);
                } catch (L) {
                    var f = L;
                }
                if (!c) {
                    if (f) throw f;
                    if (!A.TypeIsObject(d)) throw new TypeError("Iterator's return method returned a non-object.");
                }
            }
        },
        IteratorNext: function(b) {
            var c = 1 < arguments.length ? b.next(arguments[1]) : b.next();
            if (!A.TypeIsObject(c)) throw new TypeError("bad iterator");
            return c;
        },
        IteratorStep: function(b) {
            b = A.IteratorNext(b);
            return A.IteratorComplete(b) ? !1 : b;
        },
        Construct: function(b, c, g, d) {
            g = "undefined" === typeof g ? b : g;
            if (!d && Ib.construct) return Ib.construct(b, c, g);
            d = g.prototype;
            A.TypeIsObject(d) || (d = Object.prototype);
            d = ua(d);
            b = A.Call(b, d, c);
            return A.TypeIsObject(b) ? b : d;
        },
        SpeciesConstructor: function(b, c) {
            b = b.constructor;
            if (void 0 === b) return c;
            if (!A.TypeIsObject(b)) throw new TypeError("Bad constructor");
            b = b[pc];
            if (rb(b)) return c;
            if (!A.IsConstructor(b)) throw new TypeError("Bad @@species");
            return b;
        },
        CreateHTML: function(b, c, g, d) {
            b = A.ToString(b);
            var f = "<" + c;
            "" !== g && (d = A.ToString(d).replace(/"/g, "&quot;"), f += " " + g + '="' + d + '"');
            return f + ">" + b + "</" + c + ">";
        },
        IsRegExp: function(b) {
            if (!A.TypeIsObject(b)) return !1;
            var c = b[oa.match];
            return "undefined" !== typeof c ? !!c : Da.regex(b);
        },
        ToString: function(b) {
            return Kc(b);
        }
    };
    if (X && qc) {
        var Zb = function(b) {
            if (Da.symbol(oa[b])) return oa[b];
            var c = oa["for"]("Symbol." + b);
            Object.defineProperty(oa, b, {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: c
            });
            return c;
        };
        if (!Da.symbol(oa.search)) {
            var Id = Zb("search"), dc = String.prototype.search;
            K(RegExp.prototype, Id, function(b) {
                return A.Call(dc, b, [
                    this
                ]);
            });
            R(String.prototype, "search", function(b) {
                var c = A.RequireObjectCoercible(this);
                if (!rb(b)) {
                    var g = A.GetMethod(b, Id);
                    if ("undefined" !== typeof g) return A.Call(g, b, [
                        c
                    ]);
                }
                return A.Call(dc, c, [
                    A.ToString(b)
                ]);
            });
        }
        if (!Da.symbol(oa.replace)) {
            var id = Zb("replace"), Ya = String.prototype.replace;
            K(RegExp.prototype, id, function(b, c) {
                return A.Call(Ya, b, [
                    this,
                    c
                ]);
            });
            R(String.prototype, "replace", function(b, c) {
                var g = A.RequireObjectCoercible(this);
                if (!rb(b)) {
                    var d = A.GetMethod(b, id);
                    if ("undefined" !== typeof d) return A.Call(d, b, [
                        g,
                        c
                    ]);
                }
                return A.Call(Ya, g, [
                    A.ToString(b),
                    c
                ]);
            });
        }
        if (!Da.symbol(oa.split)) {
            var Jb = Zb("split"), jd = String.prototype.split;
            K(RegExp.prototype, Jb, function(b, c) {
                return A.Call(jd, b, [
                    this,
                    c
                ]);
            });
            R(String.prototype, "split", function(b, c) {
                var g = A.RequireObjectCoercible(this);
                if (!rb(b)) {
                    var d = A.GetMethod(b, Jb);
                    if ("undefined" !== typeof d) return A.Call(d, b, [
                        g,
                        c
                    ]);
                }
                return A.Call(jd, g, [
                    A.ToString(b),
                    c
                ]);
            });
        }
        var xa = Da.symbol(oa.match), $b = xa && function() {
            var b = {};
            b[oa.match] = function() {
                return 42;
            };
            return 42 !== "a".match(b);
        }();
        if (!xa || $b) {
            var rc = Zb("match"), kd = String.prototype.match;
            K(RegExp.prototype, rc, function(b) {
                return A.Call(kd, b, [
                    this
                ]);
            });
            R(String.prototype, "match", function(b) {
                var c = A.RequireObjectCoercible(this);
                if (!rb(b)) {
                    var g = A.GetMethod(b, rc);
                    if ("undefined" !== typeof g) return A.Call(g, b, [
                        c
                    ]);
                }
                return A.Call(kd, c, [
                    A.ToString(b)
                ]);
            });
        }
    }
    var ld = function(b, c, g) {
        ba.preserveToString(c, b);
        Object.setPrototypeOf && Object.setPrototypeOf(b, c);
        X ? ia(Object.getOwnPropertyNames(b), function(d) {
            d in Xb || g[d] || ba.proxy(b, d, c);
        }) : ia(Object.keys(b), function(d) {
            d in Xb || g[d] || (c[d] = b[d]);
        });
        c.prototype = b.prototype;
        ba.redefine(b.prototype, "constructor", c);
    }, sc = function() {
        return this;
    }, w = function(b) {
        X && !J(b, pc) && ba.getter(b, pc, sc);
    }, D = function(b, c) {
        c = c || function() {
            return this;
        };
        K(b, eb, c);
        !b[eb] && Da.symbol(eb) && (b[eb] = c);
    }, Q = function(b, c, g) {
        X ? Object.defineProperty(b, c, {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: g
        }) : b[c] = g;
        if (!A.SameValue(b[c], g)) throw new TypeError("property is nonconfigurable");
    }, lb = function(b, c, g, d) {
        if (!A.TypeIsObject(b)) throw new TypeError("Constructor requires `new`: " + c.name);
        b = c.prototype;
        A.TypeIsObject(b) || (b = g);
        g = ua(b);
        for(var f in d)J(d, f) && K(g, f, d[f], !0);
        return g;
    };
    if (String.fromCodePoint && 1 !== String.fromCodePoint.length) {
        var le = String.fromCodePoint;
        R(String, "fromCodePoint", function(b) {
            return A.Call(le, this, arguments);
        });
    }
    var sa = {
        fromCodePoint: function(b) {
            for(var c = [], g, d = 0, f = arguments.length; d < f; d++){
                g = Number(arguments[d]);
                if (!A.SameValue(g, A.ToInteger(g)) || 0 > g || 1114111 < g) throw new RangeError("Invalid code point " + g);
                65536 > g ? Xa(c, String.fromCharCode(g)) : (g -= 65536, Xa(c, String.fromCharCode((g >> 10) + 55296)), Xa(c, String.fromCharCode(g % 1024 + 56320)));
            }
            return c.join("");
        },
        raw: function(b) {
            var c = A.ToObject(b, "bad callSite");
            c = A.ToObject(c.raw, "bad raw value");
            var g = A.ToLength(c.length);
            if (0 >= g) return "";
            for(var d = [], f = 0, h; f < g;){
                h = A.ToString(f);
                h = A.ToString(c[h]);
                Xa(d, h);
                if (f + 1 >= g) break;
                h = f + 1 < arguments.length ? arguments[f + 1] : "";
                h = A.ToString(h);
                Xa(d, h);
                f += 1;
            }
            return d.join("");
        }
    };
    String.raw && "xy" !== String.raw({
        raw: {
            0: "x",
            1: "y",
            length: 2
        }
    }) && R(String, "raw", sa.raw);
    ta(String, sa);
    var Jd = function q(b, c) {
        if (1 > c) return "";
        if (c % 2) return q(b, c - 1) + b;
        b = q(b, c / 2);
        return b + b;
    }, Kb = {
        repeat: function(b) {
            var c = A.ToString(A.RequireObjectCoercible(this));
            b = A.ToInteger(b);
            if (0 > b || Infinity <= b) throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
            return Jd(c, b);
        },
        startsWith: function(b) {
            var c = A.ToString(A.RequireObjectCoercible(this));
            if (A.IsRegExp(b)) throw new TypeError('Cannot call method "startsWith" with a regex');
            var g = A.ToString(b), d;
            1 < arguments.length && (d = arguments[1]);
            d = Gb(A.ToInteger(d), 0);
            return zb(c, d, d + g.length) === g;
        },
        endsWith: function(c) {
            var g = A.ToString(A.RequireObjectCoercible(this));
            if (A.IsRegExp(c)) throw new TypeError('Cannot call method "endsWith" with a regex');
            var d = A.ToString(c), f = g.length, h;
            1 < arguments.length && (h = arguments[1]);
            h = "undefined" === typeof h ? f : A.ToInteger(h);
            f = b(Gb(h, 0), f);
            return zb(g, f - d.length, f) === d;
        },
        includes: function(b) {
            if (A.IsRegExp(b)) throw new TypeError('"includes" does not accept a RegExp');
            var c = A.ToString(b), g;
            1 < arguments.length && (g = arguments[1]);
            return -1 !== Wb(this, c, g);
        },
        codePointAt: function(b) {
            var c = A.ToString(A.RequireObjectCoercible(this)), g = A.ToInteger(b), d = c.length;
            if (0 <= g && g < d) {
                b = c.charCodeAt(g);
                if (55296 > b || 56319 < b || g + 1 === d) return b;
                c = c.charCodeAt(g + 1);
                return 56320 > c || 57343 < c ? b : 1024 * (b - 55296) + (c - 56320) + 65536;
            }
        }
    };
    String.prototype.includes && !1 !== "a".includes("a", Infinity) && R(String.prototype, "includes", Kb.includes);
    if (String.prototype.startsWith && String.prototype.endsWith) {
        var Kd = B(function() {
            return "/a/".startsWith(/a/);
        }), me = I(function() {
            return !1 === "abc".startsWith("a", Infinity);
        });
        Kd && me || (R(String.prototype, "startsWith", Kb.startsWith), R(String.prototype, "endsWith", Kb.endsWith));
    }
    qc && (I(function() {
        var b = /a/;
        b[oa.match] = !1;
        return "/a/".startsWith(b);
    }) || R(String.prototype, "startsWith", Kb.startsWith), I(function() {
        var b = /a/;
        b[oa.match] = !1;
        return "/a/".endsWith(b);
    }) || R(String.prototype, "endsWith", Kb.endsWith), I(function() {
        var b = /a/;
        b[oa.match] = !1;
        return "/a/".includes(b);
    }) || R(String.prototype, "includes", Kb.includes));
    ta(String.prototype, Kb);
    var ne = /(^[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]+)|([\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]+$)/g, tc = function() {
        return A.ToString(A.RequireObjectCoercible(this)).replace(ne, "");
    }, Ld = /[\u0085\u200b\ufffe]/g, Lb = /^[-+]0x[0-9a-f]+$/i;
    K(String.prototype, "trim", tc, !0);
    var Mb = function(b) {
        return {
            value: b,
            done: 0 === arguments.length
        };
    }, Mc = function(b) {
        A.RequireObjectCoercible(b);
        this._s = A.ToString(b);
        this._i = 0;
    };
    Mc.prototype.next = function() {
        var b = this._s, c = this._i;
        if ("undefined" === typeof b || c >= b.length) return this._s = void 0, Mb();
        var g = b.charCodeAt(c);
        55296 > g || 56319 < g || c + 1 === b.length ? g = 1 : (g = b.charCodeAt(c + 1), g = 56320 > g || 57343 < g ? 1 : 2);
        this._i = c + g;
        return Mb(b.substr(c, g));
    };
    D(Mc.prototype);
    D(String.prototype, function() {
        return new Mc(this);
    });
    var Nb = {
        from: function(b) {
            var c;
            1 < arguments.length && (c = arguments[1]);
            var g;
            if ("undefined" === typeof c) var d = !1;
            else {
                if (!A.IsCallable(c)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                2 < arguments.length && (g = arguments[2]);
                d = !0;
            }
            var f;
            if ("undefined" !== typeof (Jc(b) || A.GetMethod(b, eb))) {
                var h = A.IsConstructor(this) ? Object(new this) : [];
                var k = A.GetIterator(b);
                for(f = 0;;){
                    var l = A.IteratorStep(k);
                    if (!1 === l) break;
                    l = l.value;
                    try {
                        d && (l = "undefined" === typeof g ? c(l, f) : n(c, g, l, f)), h[f] = l;
                    } catch (Oc) {
                        throw A.IteratorClose(k, !0), Oc;
                    }
                    f += 1;
                }
                k = f;
            } else for(l = A.ToObject(b), k = A.ToLength(l.length), h = A.IsConstructor(this) ? Object(new this(k)) : Array(k), f = 0; f < k; ++f){
                var Ka = l[f];
                d && (Ka = "undefined" === typeof g ? c(Ka, f) : n(c, g, Ka, f));
                Q(h, f, Ka);
            }
            h.length = k;
            return h;
        },
        of: function() {
            for(var b = arguments.length, c = t(this) || !A.IsCallable(this) ? Array(b) : A.Construct(this, [
                b
            ]), g = 0; g < b; ++g)Q(c, g, arguments[g]);
            c.length = b;
            return c;
        }
    };
    ta(Array, Nb);
    w(Array);
    var Pa = function(b, c) {
        this.i = 0;
        this.array = b;
        this.kind = c;
    };
    ta(Pa.prototype, {
        next: function() {
            var b = this.i, c = this.array;
            if (!(this instanceof Pa)) throw new TypeError("Not an ArrayIterator");
            if ("undefined" !== typeof c) for(var g = A.ToLength(c.length); b < g;){
                g = this.kind;
                var d;
                "key" === g ? d = b : "value" === g ? d = c[b] : "entry" === g && (d = [
                    b,
                    c[b]
                ]);
                this.i = b + 1;
                return Mb(d);
            }
            this.array = void 0;
            return Mb();
        }
    });
    D(Pa.prototype);
    Array.of === Nb.of || function() {
        var b = function(b) {
            this.length = b;
        };
        b.prototype = [];
        var c = Array.of.apply(b, [
            1,
            2
        ]);
        return c instanceof b && 2 === c.length;
    }() || R(Array, "of", Nb.of);
    var Ob = {
        copyWithin: function(c, g) {
            var d = A.ToObject(this), f = A.ToLength(d.length), h = A.ToInteger(c), k = A.ToInteger(g);
            h = 0 > h ? Gb(f + h, 0) : b(h, f);
            k = 0 > k ? Gb(f + k, 0) : b(k, f);
            var l;
            2 < arguments.length && (l = arguments[2]);
            l = "undefined" === typeof l ? f : A.ToInteger(l);
            l = 0 > l ? Gb(f + l, 0) : b(l, f);
            f = b(l - k, f - h);
            l = 1;
            k < h && h < k + f && (l = -1, k += f - 1, h += f - 1);
            for(; 0 < f;)k in d ? d[h] = d[k] : delete d[h], k += l, h += l, --f;
            return d;
        },
        fill: function(c) {
            var g;
            1 < arguments.length && (g = arguments[1]);
            var d;
            2 < arguments.length && (d = arguments[2]);
            var f = A.ToObject(this), h = A.ToLength(f.length);
            g = A.ToInteger("undefined" === typeof g ? 0 : g);
            d = A.ToInteger("undefined" === typeof d ? h : d);
            g = 0 > g ? Gb(h + g, 0) : b(g, h);
            for(d = 0 > d ? h + d : d; g < h && g < d; ++g)f[g] = c;
            return f;
        },
        find: function(b) {
            var c = A.ToObject(this), g = A.ToLength(c.length);
            if (!A.IsCallable(b)) throw new TypeError("Array#find: predicate must be a function");
            for(var d = 1 < arguments.length ? arguments[1] : null, f = 0, h; f < g; f++)if (h = c[f], d) {
                if (n(b, d, h, f, c)) return h;
            } else if (b(h, f, c)) return h;
        },
        findIndex: function(b) {
            var c = A.ToObject(this), g = A.ToLength(c.length);
            if (!A.IsCallable(b)) throw new TypeError("Array#findIndex: predicate must be a function");
            for(var d = 1 < arguments.length ? arguments[1] : null, f = 0; f < g; f++)if (d) {
                if (n(b, d, c[f], f, c)) return f;
            } else if (b(c[f], f, c)) return f;
            return -1;
        },
        keys: function() {
            return new Pa(this, "key");
        },
        values: function() {
            return new Pa(this, "value");
        },
        entries: function() {
            return new Pa(this, "entry");
        }
    };
    Array.prototype.keys && !A.IsCallable([
        1
    ].keys().next) && delete Array.prototype.keys;
    Array.prototype.entries && !A.IsCallable([
        1
    ].entries().next) && delete Array.prototype.entries;
    Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[eb] && (ta(Array.prototype, {
        values: Array.prototype[eb]
    }), Da.symbol(oa.unscopables) && (Array.prototype[oa.unscopables].values = !0));
    if (p && Array.prototype.values && "values" !== Array.prototype.values.name) {
        var nd = Array.prototype.values;
        R(Array.prototype, "values", function() {
            return A.Call(nd, this, arguments);
        });
        K(Array.prototype, eb, Array.prototype.values, !0);
    }
    ta(Array.prototype, Ob);
    0 > 1 / [
        !0
    ].indexOf(!0, -0) && K(Array.prototype, "indexOf", function(b) {
        var c = Ab(this, arguments);
        return 0 === c && 0 > 1 / c ? 0 : c;
    }, !0);
    D(Array.prototype, function() {
        return this.values();
    });
    Object.getPrototypeOf && D(Object.getPrototypeOf([].values()));
    var Md = function() {
        return I(function() {
            return 0 === Array.from({
                length: -1
            }).length;
        });
    }(), Nd = function() {
        var b = Array.from([
            0
        ].entries());
        return 1 === b.length && t(b[0]) && 0 === b[0][0] && 0 === b[0][1];
    }();
    Md && Nd || R(Array, "from", Nb.from);
    if (!function() {
        return I(function() {
            return Array.from([
                0
            ], void 0);
        });
    }()) {
        var Pc = Array.from;
        R(Array, "from", function(b) {
            return 1 < arguments.length && "undefined" !== typeof arguments[1] ? A.Call(Pc, this, arguments) : n(Pc, this, b);
        });
    }
    var ac = -(Math.pow(2, 32) - 1), Pb = function(b, c) {
        var g = {
            length: ac
        };
        g[c ? (g.length >>> 0) - 1 : 0] = !0;
        return I(function() {
            n(b, g, function() {
                throw new RangeError("should not reach here");
            }, []);
            return !0;
        });
    };
    if (!Pb(Array.prototype.forEach)) {
        var Od = Array.prototype.forEach;
        R(Array.prototype, "forEach", function(b) {
            return A.Call(Od, 0 <= this.length ? this : [], arguments);
        }, !0);
    }
    if (!Pb(Array.prototype.map)) {
        var ec = Array.prototype.map;
        R(Array.prototype, "map", function(b) {
            return A.Call(ec, 0 <= this.length ? this : [], arguments);
        }, !0);
    }
    if (!Pb(Array.prototype.filter)) {
        var Qc = Array.prototype.filter;
        R(Array.prototype, "filter", function(b) {
            return A.Call(Qc, 0 <= this.length ? this : [], arguments);
        }, !0);
    }
    if (!Pb(Array.prototype.some)) {
        var oe = Array.prototype.some;
        R(Array.prototype, "some", function(b) {
            return A.Call(oe, 0 <= this.length ? this : [], arguments);
        }, !0);
    }
    if (!Pb(Array.prototype.every)) {
        var pe = Array.prototype.every;
        R(Array.prototype, "every", function(b) {
            return A.Call(pe, 0 <= this.length ? this : [], arguments);
        }, !0);
    }
    if (!Pb(Array.prototype.reduce)) {
        var Pd = Array.prototype.reduce;
        R(Array.prototype, "reduce", function(b) {
            return A.Call(Pd, 0 <= this.length ? this : [], arguments);
        }, !0);
    }
    if (!Pb(Array.prototype.reduceRight, !0)) {
        var Qd = Array.prototype.reduceRight;
        R(Array.prototype, "reduceRight", function(b) {
            return A.Call(Qd, 0 <= this.length ? this : [], arguments);
        }, !0);
    }
    var fc = 8 !== Number("0o10"), Rd = 2 !== Number("0b10"), Sd = db("\x85​￾", function(b) {
        return 0 === Number(b + 0 + b);
    });
    if (fc || Rd || Sd) {
        var vb = Number, Za = /^0b[01]+$/i, od = /^0o[0-7]+$/i, Rc = Za.test.bind(Za), qe = od.test.bind(od), Td = function(b) {
            if ("function" === typeof b.valueOf) {
                var c = b.valueOf();
                if (Da.primitive(c)) return c;
            }
            if ("function" === typeof b.toString && (c = b.toString(), Da.primitive(c))) return c;
            throw new TypeError("No default value");
        }, pd = Ld.test.bind(Ld), Ud = Lb.test.bind(Lb), Sc = function() {
            var b = function(c) {
                var g = 0 < arguments.length ? Da.primitive(c) ? c : Td(c, "number") : 0;
                if ("string" === typeof g) {
                    if (g = A.Call(tc, g), Rc(g)) g = parseInt(zb(g, 2), 2);
                    else if (qe(g)) g = parseInt(zb(g, 2), 8);
                    else if (pd(g) || Ud(g)) g = NaN;
                }
                var d = this, f = I(function() {
                    vb.prototype.valueOf.call(d);
                    return !0;
                });
                return d instanceof b && !f ? new vb(g) : vb(g);
            };
            return b;
        }();
        ld(vb, Sc, {});
        ta(Sc, {
            NaN: vb.NaN,
            MAX_VALUE: vb.MAX_VALUE,
            MIN_VALUE: vb.MIN_VALUE,
            NEGATIVE_INFINITY: vb.NEGATIVE_INFINITY,
            POSITIVE_INFINITY: vb.POSITIVE_INFINITY
        });
        Number = Sc;
        ba.redefine(F, "Number", Sc);
    }
    var Vd = Math.pow(2, 53) - 1;
    ta(Number, {
        MAX_SAFE_INTEGER: Vd,
        MIN_SAFE_INTEGER: -Vd,
        EPSILON: 2.220446049250313E-16,
        parseInt: F.parseInt,
        parseFloat: F.parseFloat,
        isFinite: Ic,
        isInteger: function(b) {
            return Ic(b) && A.ToInteger(b) === b;
        },
        isSafeInteger: function(b) {
            return Number.isInteger(b) && k(b) <= Number.MAX_SAFE_INTEGER;
        },
        isNaN: Sa
    });
    K(Number, "parseInt", F.parseInt, Number.parseInt !== F.parseInt);
    1 === [
        ,
        1
    ].find(function() {
        return !0;
    }) && R(Array.prototype, "find", Ob.find);
    0 !== [
        ,
        1
    ].findIndex(function() {
        return !0;
    }) && R(Array.prototype, "findIndex", Ob.findIndex);
    var Cb = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable), Tc = function(b, c) {
        X && Cb(b, c) && Object.defineProperty(b, c, {
            enumerable: !1
        });
    }, gc = function() {
        var b = Number(this), c = arguments.length, g = c - b;
        g = Array(0 > g ? 0 : g);
        for(var d = b; d < c; ++d)g[d - b] = arguments[d];
        return g;
    }, uc = function(b) {
        return function(c, g) {
            c[g] = b[g];
            return c;
        };
    }, Wd = function(b, c) {
        var g = G(Object(c)), d;
        A.IsCallable(Object.getOwnPropertySymbols) && (d = nc(Object.getOwnPropertySymbols(Object(c)), Cb(c)));
        return Wa(Bb(g, d || []), uc(c), b);
    }, Xd = {
        assign: function(b, c) {
            var g = A.ToObject(b, "Cannot convert undefined or null to object");
            return Wa(A.Call(gc, 1, arguments), Wd, g);
        },
        is: function(b, c) {
            return A.SameValue(b, c);
        }
    };
    Object.assign && Object.preventExtensions && function() {
        var b = Object.preventExtensions({
            1: 2
        });
        try {
            Object.assign(b, "xy");
        } catch (S) {
            return "y" === b[1];
        }
    }() && R(Object, "assign", Xd.assign);
    ta(Object, Xd);
    if (X) {
        var Ta = {
            setPrototypeOf: function(b, c) {
                var g = function(b, c) {
                    if (!A.TypeIsObject(b)) throw new TypeError("cannot set prototype on a non-object");
                    if (null !== c && !A.TypeIsObject(c)) throw new TypeError("can only set prototype to an object or null" + c);
                    n(d, b, c);
                    return b;
                };
                try {
                    var d = b.getOwnPropertyDescriptor(b.prototype, c).set;
                    n(d, {}, null);
                } catch (L) {
                    if (b.prototype !== ({})[c]) return;
                    d = function(b) {
                        this[c] = b;
                    };
                    g.polyfill = g(g({}, null), b.prototype) instanceof b;
                }
                return g;
            }(Object, "__proto__")
        };
        ta(Object, Ta);
    }
    Object.setPrototypeOf && Object.getPrototypeOf && null !== Object.getPrototypeOf(Object.setPrototypeOf({}, null)) && null === Object.getPrototypeOf(Object.create(null)) && function() {
        var b = Object.create(null), c = Object.getPrototypeOf, g = Object.setPrototypeOf;
        Object.getPrototypeOf = function(g) {
            g = c(g);
            return g === b ? null : g;
        };
        Object.setPrototypeOf = function(c, d) {
            return g(c, null === d ? b : d);
        };
        Object.setPrototypeOf.polyfill = !1;
    }();
    if (B(function() {
        return Object.keys("foo");
    })) {
        var Yd = Object.keys;
        R(Object, "keys", function(b) {
            return Yd(A.ToObject(b));
        });
        G = Object.keys;
    }
    if (B(function() {
        return Object.keys(/a/g);
    })) {
        var Zd = Object.keys;
        R(Object, "keys", function(b) {
            if (Da.regex(b)) {
                var c = [], g;
                for(g in b)J(b, g) && Xa(c, g);
                return c;
            }
            return Zd(b);
        });
        G = Object.keys;
    }
    if (Object.getOwnPropertyNames && B(function() {
        return Object.getOwnPropertyNames("foo");
    })) {
        var $d = "object" === typeof window ? Object.getOwnPropertyNames(window) : [], ae = Object.getOwnPropertyNames;
        R(Object, "getOwnPropertyNames", function(b) {
            b = A.ToObject(b);
            if ("[object Window]" === Na(b)) try {
                return ae(b);
            } catch (S) {
                return Bb([], $d);
            }
            return ae(b);
        });
    }
    if (Object.getOwnPropertyDescriptor && B(function() {
        return Object.getOwnPropertyDescriptor("foo", "bar");
    })) {
        var re = Object.getOwnPropertyDescriptor;
        R(Object, "getOwnPropertyDescriptor", function(b, c) {
            return re(A.ToObject(b), c);
        });
    }
    if (Object.seal && B(function() {
        return Object.seal("foo");
    })) {
        var hc = Object.seal;
        R(Object, "seal", function(b) {
            return A.TypeIsObject(b) ? hc(b) : b;
        });
    }
    if (Object.isSealed && B(function() {
        return Object.isSealed("foo");
    })) {
        var ha = Object.isSealed;
        R(Object, "isSealed", function(b) {
            return A.TypeIsObject(b) ? ha(b) : !0;
        });
    }
    if (Object.freeze && B(function() {
        return Object.freeze("foo");
    })) {
        var wb = Object.freeze;
        R(Object, "freeze", function(b) {
            return A.TypeIsObject(b) ? wb(b) : b;
        });
    }
    if (Object.isFrozen && B(function() {
        return Object.isFrozen("foo");
    })) {
        var ea = Object.isFrozen;
        R(Object, "isFrozen", function(b) {
            return A.TypeIsObject(b) ? ea(b) : !0;
        });
    }
    if (Object.preventExtensions && B(function() {
        return Object.preventExtensions("foo");
    })) {
        var mb = Object.preventExtensions;
        R(Object, "preventExtensions", function(b) {
            return A.TypeIsObject(b) ? mb(b) : b;
        });
    }
    if (Object.isExtensible && B(function() {
        return Object.isExtensible("foo");
    })) {
        var qd = Object.isExtensible;
        R(Object, "isExtensible", function(b) {
            return A.TypeIsObject(b) ? qd(b) : !1;
        });
    }
    if (Object.getPrototypeOf && B(function() {
        return Object.getPrototypeOf("foo");
    })) {
        var rd = Object.getPrototypeOf;
        R(Object, "getPrototypeOf", function(b) {
            return rd(A.ToObject(b));
        });
    }
    var se = X && function() {
        var b = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags");
        return b && A.IsCallable(b.get);
    }();
    X && !se && ba.getter(RegExp.prototype, "flags", function() {
        if (!A.TypeIsObject(this)) throw new TypeError("Method called on incompatible type: must be an object.");
        var b = "";
        this.global && (b += "g");
        this.ignoreCase && (b += "i");
        this.multiline && (b += "m");
        this.unicode && (b += "u");
        this.sticky && (b += "y");
        return b;
    });
    var be = X && I(function() {
        return "/a/i" === String(new RegExp(/a/g, "i"));
    }), vc = qc && X && function() {
        var b = /./;
        b[oa.match] = !1;
        return RegExp(b) === b;
    }(), qa = I(function() {
        return "/abc/" === RegExp.prototype.toString.call({
            source: "abc"
        });
    }), Qb = qa && I(function() {
        return "/a/b" === RegExp.prototype.toString.call({
            source: "a",
            flags: "b"
        });
    });
    if (!qa || !Qb) {
        var sd = RegExp.prototype.toString;
        K(RegExp.prototype, "toString", function() {
            var b = A.RequireObjectCoercible(this);
            if (Da.regex(b)) return n(sd, b);
            var c = Kc(b.source);
            b = Kc(b.flags);
            return "/" + c + "/" + b;
        }, !0);
        ba.preserveToString(RegExp.prototype.toString, sd);
    }
    if (X && (!be || vc)) {
        var wc = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get, td = Object.getOwnPropertyDescriptor(RegExp.prototype, "source") || {}, ce = function() {
            return this.source;
        }, de = A.IsCallable(td.get) ? td.get : ce, Uc = RegExp, fb = function() {
            return function E(b, c) {
                var g = A.IsRegExp(b);
                return this instanceof E || !g || "undefined" !== typeof c || b.constructor !== E ? Da.regex(b) ? (g = A.Call(de, b), b = "undefined" === typeof c ? A.Call(wc, b) : c, new E(g, b)) : new Uc(b, c) : b;
            };
        }();
        ld(Uc, fb, {
            $input: !0
        });
        RegExp = fb;
        ba.redefine(F, "RegExp", fb);
    }
    if (X) {
        var ud = {
            input: "$_",
            lastMatch: "$&",
            lastParen: "$+",
            leftContext: "$`",
            rightContext: "$'"
        };
        ia(G(ud), function(b) {
            b in RegExp && !(ud[b] in RegExp) && ba.getter(RegExp, ud[b], function() {
                return RegExp[b];
            });
        });
    }
    w(RegExp);
    var Vc = 1 / Number.EPSILON, Wc = Math.pow(2, -23), te = Math.pow(2, 127) * (2 - Wc), vd = Math.pow(2, -126), Rb = Math.E, Ia = Math.LOG2E, Qa = Math.LOG10E, V = Number.prototype.clz;
    delete Number.prototype.clz;
    var Ba = {
        acosh: function(b) {
            var c = Number(b);
            if (Sa(c) || 1 > b) return NaN;
            if (1 === c) return 0;
            if (Infinity === c) return c;
            b = 1 / (c * c);
            if (2 > c) return Hb(c - 1 + Z(1 - b) * c);
            c /= 2;
            return Hb(c + Z(1 - b) * c - 1) + 1 / Ia;
        },
        asinh: function(b) {
            var c = Number(b);
            if (0 === c || !ub(c)) return c;
            b = k(c);
            var g = b * b;
            c = Yb(c);
            return 1 > b ? c * Hb(b + g / (Z(g + 1) + 1)) : c * (Hb(b / 2 + Z(1 + 1 / g) * b / 2 - 1) + 1 / Ia);
        },
        atanh: function(b) {
            b = Number(b);
            if (0 === b) return b;
            if (-1 === b) return -Infinity;
            if (1 === b) return Infinity;
            if (Sa(b) || -1 > b || 1 < b) return NaN;
            var c = k(b);
            return Yb(b) * Hb(2 * c / (1 - c)) / 2;
        },
        cbrt: function(b) {
            b = Number(b);
            if (0 === b) return b;
            var c = 0 > b;
            c && (b = -b);
            if (Infinity === b) var g = Infinity;
            else g = U(ca(b) / 3), g = (b / (g * g) + 2 * g) / 3;
            return c ? -g : g;
        },
        clz32: function(b) {
            b = A.ToUint32(Number(b));
            return 0 === b ? 32 : V ? A.Call(V, b) : 31 - c(ca(b + .5) * Ia);
        },
        cosh: function(b) {
            b = Number(b);
            if (0 === b) return 1;
            if (Sa(b)) return NaN;
            if (!ub(b)) return Infinity;
            b = U(k(b) - 1);
            return Rb / 2 * (b + 1 / (b * Rb * Rb));
        },
        expm1: function(b) {
            b = Number(b);
            if (-Infinity === b) return -1;
            if (!ub(b) || 0 === b) return b;
            if (.5 < k(b)) return U(b) - 1;
            for(var c = b, g = 0, d = 1; g + c !== g;)g += c, d += 1, c *= b / d;
            return g;
        },
        hypot: function(b, c) {
            for(var g = 0, d = 0, f = 0; f < arguments.length; ++f){
                var h = k(Number(arguments[f]));
                d < h ? (g *= d / h * (d / h), g += 1, d = h) : g += 0 < h ? h / d * (h / d) : h;
            }
            return Infinity === d ? Infinity : d * Z(g);
        },
        log2: function(b) {
            return ca(b) * Ia;
        },
        log10: function(b) {
            return ca(b) * Qa;
        },
        log1p: Hb,
        sign: Yb,
        sinh: function(b) {
            b = Number(b);
            if (!ub(b) || 0 === b) return b;
            var c = k(b);
            if (1 > c) return c = Math.expm1(c), Yb(b) * c * (1 + 1 / (c + 1)) / 2;
            c = U(c - 1);
            return Yb(b) * (c - 1 / (c * Rb * Rb)) * (Rb / 2);
        },
        tanh: function(b) {
            b = Number(b);
            return Sa(b) || 0 === b ? b : 20 <= b ? 1 : -20 >= b ? -1 : (Math.expm1(b) - Math.expm1(-b)) / (U(b) + U(-b));
        },
        trunc: function(b) {
            b = Number(b);
            return 0 > b ? -c(-b) : c(b);
        },
        imul: function(b, c) {
            b = A.ToUint32(b);
            c = A.ToUint32(c);
            var g = b & 65535, d = c & 65535;
            return g * d + ((b >>> 16 & 65535) * d + g * (c >>> 16 & 65535) << 16 >>> 0) | 0;
        },
        fround: function(b) {
            var c = Number(b);
            if (0 === c || Infinity === c || -Infinity === c || Sa(c)) return c;
            b = Yb(c);
            c = k(c);
            if (c < vd) return b * (c / vd / Wc + Vc - Vc) * vd * Wc;
            var g = (1 + Wc / Number.EPSILON) * c;
            c = g - (g - c);
            return c > te || Sa(c) ? Infinity * b : b * c;
        }
    };
    ta(Math, Ba);
    K(Math, "sinh", Ba.sinh, Infinity === Math.sinh(710));
    K(Math, "cosh", Ba.cosh, Infinity === Math.cosh(710));
    K(Math, "log1p", Ba.log1p, -0.00000000000000001 !== Math.log1p(-0.00000000000000001));
    K(Math, "asinh", Ba.asinh, Math.asinh(-10000000) !== -Math.asinh(1E7));
    K(Math, "asinh", Ba.asinh, Infinity === Math.asinh(1E300));
    K(Math, "atanh", Ba.atanh, 0 === Math.atanh(1E-300));
    K(Math, "tanh", Ba.tanh, -0.00000000000000002 !== Math.tanh(-0.00000000000000002));
    K(Math, "acosh", Ba.acosh, Infinity === Math.acosh(Number.MAX_VALUE));
    K(Math, "acosh", Ba.acosh, !(8 > k(1 - Math.acosh(1 + Number.EPSILON) / Math.sqrt(2 * Number.EPSILON)) / Number.EPSILON));
    K(Math, "cbrt", Ba.cbrt, !(8 > k(1 - Math.cbrt(1E-300) / 1E-100) / Number.EPSILON));
    K(Math, "sinh", Ba.sinh, -0.00000000000000002 !== Math.sinh(-0.00000000000000002));
    var xc = Math.expm1(10);
    K(Math, "expm1", Ba.expm1, 22025.465794806718 < xc || 22025.465794806718 > xc);
    var yc = Math.round, ee = 0 === Math.round(.5 - Number.EPSILON / 4) && 1 === Math.round(-0.5 + Number.EPSILON / 3.99), wd = [
        Vc + 1,
        2 * Vc - 1
    ].every(function(b) {
        return Math.round(b) === b;
    });
    K(Math, "round", function(b) {
        var g = c(b);
        return .5 > b - g ? g : -1 === g ? -0 : g + 1;
    }, !ee || !wd);
    ba.preserveToString(Math.round, yc);
    var zc = Math.imul;
    -5 !== Math.imul(4294967295, 5) && (Math.imul = Ba.imul, ba.preserveToString(Math.imul, zc));
    2 !== Math.imul.length && R(Math, "imul", function(b, c) {
        return A.Call(zc, Math, arguments);
    });
    var Bc = function() {
        var b = F.setTimeout;
        if ("function" === typeof b || "object" === typeof b) {
            A.IsPromise = function(b) {
                return A.TypeIsObject(b) && "undefined" !== typeof b._promise ? !0 : !1;
            };
            var c = function(b) {
                if (!A.IsConstructor(b)) throw new TypeError("Bad promise constructor");
                var c = this;
                c.resolve = void 0;
                c.reject = void 0;
                c.promise = new b(function(b, g) {
                    if (void 0 !== c.resolve || void 0 !== c.reject) throw new TypeError("Bad Promise implementation!");
                    c.resolve = b;
                    c.reject = g;
                });
                if (!A.IsCallable(c.resolve) || !A.IsCallable(c.reject)) throw new TypeError("Bad promise constructor");
            }, g;
            "undefined" !== typeof window && A.IsCallable(window.postMessage) && (g = function() {
                var b = [];
                window.addEventListener("message", function(c) {
                    c.source === window && "zero-timeout-message" === c.data && (c.stopPropagation(), 0 !== b.length && T(b)());
                }, !0);
                return function(c) {
                    Xa(b, c);
                    window.postMessage("zero-timeout-message", "*");
                };
            });
            var d = function() {
                var b = F.Promise, c = b && b.resolve && b.resolve();
                return c && function(b) {
                    return c.then(b);
                };
            }, f = A.IsCallable(F.setImmediate) ? F.setImmediate : "object" === typeof process && process.nextTick ? process.nextTick : d() || (A.IsCallable(g) ? g() : function(c) {
                b(c, 0);
            }), h = function(b) {
                return b;
            }, k = function(b) {
                throw b;
            }, l = {}, p = function(b, c, g) {
                f(function() {
                    if (c === l) b(g);
                    else {
                        try {
                            var d = b(g);
                            var f = c.resolve;
                        } catch (Xc) {
                            d = Xc, f = c.reject;
                        }
                        f(d);
                    }
                });
            }, r = function(b, c) {
                var g = b._promise, d = g.reactionLength;
                if (0 < d && (p(g.fulfillReactionHandler0, g.reactionCapability0, c), g.fulfillReactionHandler0 = void 0, g.rejectReactions0 = void 0, g.reactionCapability0 = void 0, 1 < d)) for(var f = 1, h = 0; f < d; f++, h += 3)p(g[h + 0], g[h + 2], c), b[h + 0] = void 0, b[h + 1] = void 0, b[h + 2] = void 0;
                g.result = c;
                g.state = 1;
                g.reactionLength = 0;
            }, t = function(b, c) {
                var g = b._promise, d = g.reactionLength;
                if (0 < d && (p(g.rejectReactionHandler0, g.reactionCapability0, c), g.fulfillReactionHandler0 = void 0, g.rejectReactions0 = void 0, g.reactionCapability0 = void 0, 1 < d)) for(var f = 1, h = 0; f < d; f++, h += 3)p(g[h + 1], g[h + 2], c), b[h + 0] = void 0, b[h + 1] = void 0, b[h + 2] = void 0;
                g.result = c;
                g.state = 2;
                g.reactionLength = 0;
            }, w = function(b) {
                var c = !1;
                return {
                    resolve: function(g) {
                        if (!c) {
                            c = !0;
                            if (g === b) return t(b, new TypeError("Self resolution"));
                            if (!A.TypeIsObject(g)) return r(b, g);
                            try {
                                var d = g.then;
                            } catch (Ua) {
                                return t(b, Ua);
                            }
                            if (!A.IsCallable(d)) return r(b, g);
                            f(function() {
                                var c = d, f = w(b), h = f.resolve;
                                f = f.reject;
                                try {
                                    z(c, g, h, f);
                                } catch (xe) {
                                    f(xe);
                                }
                            });
                        }
                    },
                    reject: function(g) {
                        if (!c) return c = !0, t(b, g);
                    }
                };
            }, z = function(b, c, g, d) {
                b === I ? n(b, c, g, d, l) : n(b, c, g, d);
            }, B = function() {
                var b = function(c) {
                    if (!(this instanceof b)) throw new TypeError('Constructor Promise requires "new"');
                    if (this && this._promise) throw new TypeError("Bad construction");
                    if (!A.IsCallable(c)) throw new TypeError("not a valid resolver");
                    var g = lb(this, b, D, {
                        _promise: {
                            result: void 0,
                            state: 0,
                            reactionLength: 0,
                            fulfillReactionHandler0: void 0,
                            rejectReactionHandler0: void 0,
                            reactionCapability0: void 0
                        }
                    }), d = w(g), f = d.reject;
                    try {
                        c(d.resolve, f);
                    } catch (Xc) {
                        f(Xc);
                    }
                    return g;
                };
                return b;
            }();
            var D = B.prototype;
            var G = function(b, c, g, d) {
                var f = !1;
                return function(h) {
                    f || (f = !0, c[b] = h, 0 === --d.count && (h = g.resolve, h(c)));
                };
            };
            ta(B, {
                all: function(b) {
                    if (!A.TypeIsObject(this)) throw new TypeError("Promise is not object");
                    var g = new c(this), d;
                    try {
                        var f = A.GetIterator(b);
                        b = d = {
                            iterator: f,
                            done: !1
                        };
                        for(var h = b.iterator, k = [], l = {
                            count: 1
                        }, n, p, q = 0;;){
                            try {
                                n = A.IteratorStep(h);
                                if (!1 === n) {
                                    b.done = !0;
                                    break;
                                }
                                p = n.value;
                            } catch (zd) {
                                throw b.done = !0, zd;
                            }
                            k[q] = void 0;
                            var r = this.resolve(p), t = G(q, k, g, l);
                            l.count += 1;
                            z(r.then, r, t, g.reject);
                            q += 1;
                        }
                        if (0 === --l.count) {
                            var w = g.resolve;
                            w(k);
                        }
                        return g.promise;
                    } catch (zd1) {
                        h = zd1;
                        if (d && !d.done) try {
                            A.IteratorClose(f, !0);
                        } catch (Sb) {
                            h = Sb;
                        }
                        f = g.reject;
                        f(h);
                        return g.promise;
                    }
                },
                race: function(b) {
                    if (!A.TypeIsObject(this)) throw new TypeError("Promise is not object");
                    var g = new c(this), d;
                    try {
                        var f = A.GetIterator(b);
                        b = d = {
                            iterator: f,
                            done: !1
                        };
                        for(var h = b.iterator, k, l, n;;){
                            try {
                                k = A.IteratorStep(h);
                                if (!1 === k) {
                                    b.done = !0;
                                    break;
                                }
                                l = k.value;
                            } catch (Ac) {
                                throw b.done = !0, Ac;
                            }
                            n = this.resolve(l);
                            z(n.then, n, g.resolve, g.reject);
                        }
                        return g.promise;
                    } catch (Ac1) {
                        h = Ac1;
                        if (d && !d.done) try {
                            A.IteratorClose(f, !0);
                        } catch (fe) {
                            h = fe;
                        }
                        f = g.reject;
                        f(h);
                        return g.promise;
                    }
                },
                reject: function(b) {
                    if (!A.TypeIsObject(this)) throw new TypeError("Bad promise constructor");
                    var g = new c(this), d = g.reject;
                    d(b);
                    return g.promise;
                },
                resolve: function(b) {
                    if (!A.TypeIsObject(this)) throw new TypeError("Bad promise constructor");
                    if (A.IsPromise(b) && b.constructor === this) return b;
                    var g = new c(this), d = g.resolve;
                    d(b);
                    return g.promise;
                }
            });
            ta(D, {
                "catch": function(b) {
                    return this.then(null, b);
                },
                then: function(b, g) {
                    if (!A.IsPromise(this)) throw new TypeError("not a promise");
                    var d = A.SpeciesConstructor(this, B);
                    d = 2 < arguments.length && arguments[2] === l && d === B ? l : new c(d);
                    var f = A.IsCallable(b) ? b : h, n = A.IsCallable(g) ? g : k, q = this._promise;
                    if (0 === q.state) {
                        if (0 === q.reactionLength) q.fulfillReactionHandler0 = f, q.rejectReactionHandler0 = n, q.reactionCapability0 = d;
                        else {
                            var r = 3 * (q.reactionLength - 1);
                            q[r + 0] = f;
                            q[r + 1] = n;
                            q[r + 2] = d;
                        }
                        q.reactionLength += 1;
                    } else if (1 === q.state) q = q.result, p(f, d, q);
                    else if (2 === q.state) q = q.result, p(n, d, q);
                    else throw new TypeError("unexpected Promise state");
                    return d.promise;
                }
            });
            l = new c(B);
            var I = D.then;
            return B;
        }
    }();
    F.Promise && (delete F.Promise.accept, delete F.Promise.defer, delete F.Promise.prototype.chain);
    if ("function" === typeof Bc) {
        ta(F, {
            Promise: Bc
        });
        var ze = va(F.Promise, function(b) {
            return b.resolve(42).then(function() {}) instanceof b;
        }), Yc = !B(function() {
            return F.Promise.reject(42).then(null, 5).then(null, Xb);
        }), Va = B(function() {
            return F.Promise.call(3, Xb);
        }), Ad = function(b) {
            var c = b.resolve(5);
            c.constructor = {};
            b = b.resolve(c);
            try {
                b.then(null, Xb).then(null, Xb);
            } catch (q) {
                return !0;
            }
            return c === b;
        }(F.Promise), Cc = X && function() {
            var b = 0, c = Object.defineProperty({}, "then", {
                get: function() {
                    b += 1;
                }
            });
            Promise.resolve(c);
            return 1 === b;
        }(), Tb = function q(b) {
            var c = new Promise(b);
            b(3, function() {});
            this.then = c.then;
            this.constructor = q;
        };
        Tb.prototype = Promise.prototype;
        Tb.all = Promise.all;
        var Dc = I(function() {
            return !!Tb.all([
                1,
                2
            ]);
        });
        ze && Yc && Va && !Ad && Cc && !Dc || (Promise = Bc, R(F, "Promise", Bc));
        if (1 !== Promise.all.length) {
            var Zc = Promise.all;
            R(Promise, "all", function(b) {
                return A.Call(Zc, this, arguments);
            });
        }
        if (1 !== Promise.race.length) {
            var $c = Promise.race;
            R(Promise, "race", function(b) {
                return A.Call($c, this, arguments);
            });
        }
        if (1 !== Promise.resolve.length) {
            var wa = Promise.resolve;
            R(Promise, "resolve", function(b) {
                return A.Call(wa, this, arguments);
            });
        }
        if (1 !== Promise.reject.length) {
            var ra = Promise.reject;
            R(Promise, "reject", function(b) {
                return A.Call(ra, this, arguments);
            });
        }
        Tc(Promise, "all");
        Tc(Promise, "race");
        Tc(Promise, "resolve");
        Tc(Promise, "reject");
        w(Promise);
    }
    var ic = function(b) {
        var c = G(Wa(b, function(b, c) {
            b[c] = !0;
            return b;
        }, {}));
        return b.join(":") === c.join(":");
    }, $a = ic([
        "z",
        "a",
        "bb"
    ]), Ma = ic([
        "z",
        1,
        "a",
        "3",
        2
    ]);
    if (X) {
        var z = function(b, c) {
            return c || $a ? rb(b) ? "^" + A.ToString(b) : "string" === typeof b ? "$" + b : "number" === typeof b ? Ma ? b : "n" + b : "boolean" === typeof b ? "b" + b : null : null;
        }, ma = function() {
            return Object.create ? Object.create(null) : {};
        }, pa = function(b, c, g) {
            if (t(g) || Da.string(g)) ia(g, function(b) {
                if (!A.TypeIsObject(b)) throw new TypeError("Iterator value " + b + " is not an entry object");
                c.set(b[0], b[1]);
            });
            else if (g instanceof b) n(b.prototype.forEach, g, function(b, g) {
                c.set(g, b);
            });
            else {
                if (!rb(g)) {
                    var d = c.set;
                    if (!A.IsCallable(d)) throw new TypeError("bad map");
                    var f = A.GetIterator(g);
                }
                if ("undefined" !== typeof f) for(;;){
                    b = A.IteratorStep(f);
                    if (!1 === b) break;
                    b = b.value;
                    try {
                        if (!A.TypeIsObject(b)) throw new TypeError("Iterator value " + b + " is not an entry object");
                        n(d, c, b[0], b[1]);
                    } catch (Ha) {
                        throw A.IteratorClose(f, !0), Ha;
                    }
                }
            }
        }, r = function(b, c, g) {
            if (t(g) || Da.string(g)) ia(g, function(b) {
                c.add(b);
            });
            else if (g instanceof b) n(b.prototype.forEach, g, function(b) {
                c.add(b);
            });
            else {
                if (!rb(g)) {
                    var d = c.add;
                    if (!A.IsCallable(d)) throw new TypeError("bad set");
                    var f = A.GetIterator(g);
                }
                if ("undefined" !== typeof f) for(;;){
                    b = A.IteratorStep(f);
                    if (!1 === b) break;
                    b = b.value;
                    try {
                        n(d, c, b);
                    } catch (Ha) {
                        throw A.IteratorClose(f, !0), Ha;
                    }
                }
            }
        }, gb = {
            Map: function() {
                var b = {}, c = function(b, c) {
                    this.key = b;
                    this.value = c;
                    this.prev = this.next = null;
                };
                c.prototype.isRemoved = function() {
                    return this.key === b;
                };
                var g = function(b, c) {
                    if (!A.TypeIsObject(b) || !b._es6map) throw new TypeError("Method Map.prototype." + c + " called on incompatible receiver " + A.ToString(b));
                }, d = function(b, c) {
                    g(b, "[[MapIterator]]");
                    this.i = this.head = b._head;
                    this.kind = c;
                };
                d.prototype = {
                    isMapIterator: !0,
                    next: function() {
                        if (!this.isMapIterator) throw new TypeError("Not a MapIterator");
                        var b = this.i, c = this.kind, g = this.head;
                        if ("undefined" === typeof this.i) return Mb();
                        for(; b.isRemoved() && b !== g;)b = b.prev;
                        for(; b.next !== g;)if (b = b.next, !b.isRemoved()) return c = "key" === c ? b.key : "value" === c ? b.value : [
                            b.key,
                            b.value
                        ], this.i = b, Mb(c);
                        this.i = void 0;
                        return Mb();
                    }
                };
                D(d.prototype);
                var f = function md() {
                    if (!(this instanceof md)) throw new TypeError('Constructor Map requires "new"');
                    if (this && this._es6map) throw new TypeError("Bad construction");
                    var b = lb(this, md, h, {
                        _es6map: !0,
                        _head: null,
                        _map: Ga ? new Ga : null,
                        _size: 0,
                        _storage: ma()
                    }), g = new c(null, null);
                    g.next = g.prev = g;
                    b._head = g;
                    0 < arguments.length && pa(md, b, arguments[0]);
                    return b;
                };
                var h = f.prototype;
                ba.getter(h, "size", function() {
                    if ("undefined" === typeof this._size) throw new TypeError("size method called on incompatible Map");
                    return this._size;
                });
                ta(h, {
                    get: function(b) {
                        g(this, "get");
                        var c = z(b, !0);
                        if (null !== c) {
                            if (b = this._storage[c]) return b.value;
                        } else if (this._map) {
                            if (b = da.call(this._map, b)) return b.value;
                        } else for(var d = c = this._head; (d = d.next) !== c;)if (A.SameValueZero(d.key, b)) return d.value;
                    },
                    has: function(b) {
                        g(this, "has");
                        var c = z(b, !0);
                        if (null !== c) return "undefined" !== typeof this._storage[c];
                        if (this._map) return Fb.call(this._map, b);
                        for(var d = c = this._head; (d = d.next) !== c;)if (A.SameValueZero(d.key, b)) return !0;
                        return !1;
                    },
                    set: function(b, d) {
                        g(this, "set");
                        var f = this._head, h = f, k = z(b, !0);
                        if (null !== k) {
                            if ("undefined" !== typeof this._storage[k]) return this._storage[k].value = d, this;
                            var l = this._storage[k] = new c(b, d);
                            h = f.prev;
                        } else this._map && (Fb.call(this._map, b) ? da.call(this._map, b).value = d : (l = new c(b, d), oc.call(this._map, b, l), h = f.prev));
                        for(; (h = h.next) !== f;)if (A.SameValueZero(h.key, b)) return h.value = d, this;
                        l = l || new c(b, d);
                        A.SameValue(-0, b) && (l.key = 0);
                        l.next = this._head;
                        l.prev = this._head.prev;
                        l.prev.next = l;
                        l.next.prev = l;
                        this._size += 1;
                        return this;
                    },
                    "delete": function(c) {
                        g(this, "delete");
                        var d = this._head, f = d, h = z(c, !0);
                        if (null !== h) {
                            if ("undefined" === typeof this._storage[h]) return !1;
                            f = this._storage[h].prev;
                            delete this._storage[h];
                        } else if (this._map) {
                            if (!Fb.call(this._map, c)) return !1;
                            f = da.call(this._map, c).prev;
                            gd.call(this._map, c);
                        }
                        for(; (f = f.next) !== d;)if (A.SameValueZero(f.key, c)) return f.key = b, f.value = b, f.prev.next = f.next, f.next.prev = f.prev, --this._size, !0;
                        return !1;
                    },
                    clear: function() {
                        g(this, "clear");
                        this._map = Ga ? new Ga : null;
                        this._size = 0;
                        this._storage = ma();
                        for(var c = this._head, d, f = c.next; (d = f) !== c;)d.key = b, d.value = b, f = d.next, d.next = d.prev = c;
                        c.next = c.prev = c;
                    },
                    keys: function() {
                        g(this, "keys");
                        return new d(this, "key");
                    },
                    values: function() {
                        g(this, "values");
                        return new d(this, "value");
                    },
                    entries: function() {
                        g(this, "entries");
                        return new d(this, "key+value");
                    },
                    forEach: function(b) {
                        g(this, "forEach");
                        for(var c = 1 < arguments.length ? arguments[1] : null, d = this.entries(), f = d.next(); !f.done; f = d.next())c ? n(b, c, f.value[1], f.value[0], this) : b(f.value[1], f.value[0], this);
                    }
                });
                D(h, h.entries);
                return f;
            }(),
            Set: function() {
                var b = function(b, c) {
                    if (!A.TypeIsObject(b) || !b._es6set || "undefined" === typeof b._storage) throw new TypeError("Set.prototype." + c + " called on incompatible receiver " + A.ToString(b));
                }, c = function Nc() {
                    if (!(this instanceof Nc)) throw new TypeError('Constructor Set requires "new"');
                    if (this && this._es6set) throw new TypeError("Bad construction");
                    var b = lb(this, Nc, g, {
                        _es6set: !0,
                        "[[SetData]]": null,
                        _storage: ma()
                    });
                    if (!b._es6set) throw new TypeError("bad set");
                    0 < arguments.length && r(Nc, b, arguments[0]);
                    return b;
                };
                var g = c.prototype;
                var d = function(b) {
                    if (!b["[[SetData]]"]) {
                        var c = new gb.Map;
                        b["[[SetData]]"] = c;
                        ia(G(b._storage), function(b) {
                            if ("^null" === b) b = null;
                            else if ("^undefined" !== b) {
                                var g = b.charAt(0);
                                b = "$" === g ? zb(b, 1) : "n" === g ? +zb(b, 1) : "b" === g ? "btrue" === b : +b;
                            } else b = void 0;
                            c.set(b, b);
                        });
                        b["[[SetData]]"] = c;
                    }
                    b._storage = null;
                };
                ba.getter(c.prototype, "size", function() {
                    b(this, "size");
                    if (this._storage) return G(this._storage).length;
                    d(this);
                    return this["[[SetData]]"].size;
                });
                ta(c.prototype, {
                    has: function(c) {
                        b(this, "has");
                        var g;
                        if (this._storage && null !== (g = z(c))) return !!this._storage[g];
                        d(this);
                        return this["[[SetData]]"].has(c);
                    },
                    add: function(c) {
                        b(this, "add");
                        var g;
                        if (this._storage && null !== (g = z(c))) return this._storage[g] = !0, this;
                        d(this);
                        this["[[SetData]]"].set(c, c);
                        return this;
                    },
                    "delete": function(c) {
                        b(this, "delete");
                        var g;
                        if (this._storage && null !== (g = z(c))) return c = J(this._storage, g), (delete this._storage[g]) && c;
                        d(this);
                        return this["[[SetData]]"]["delete"](c);
                    },
                    clear: function() {
                        b(this, "clear");
                        this._storage && (this._storage = ma());
                        this["[[SetData]]"] && this["[[SetData]]"].clear();
                    },
                    values: function() {
                        b(this, "values");
                        d(this);
                        return new f(this["[[SetData]]"].values());
                    },
                    entries: function() {
                        b(this, "entries");
                        d(this);
                        return new f(this["[[SetData]]"].entries());
                    },
                    forEach: function(c) {
                        b(this, "forEach");
                        var g = 1 < arguments.length ? arguments[1] : null, f = this;
                        d(f);
                        this["[[SetData]]"].forEach(function(b, d) {
                            g ? n(c, g, d, d, f) : c(d, d, f);
                        });
                    }
                });
                K(c.prototype, "keys", c.prototype.values, !0);
                D(c.prototype, c.prototype.values);
                var f = function(b) {
                    this.it = b;
                };
                f.prototype = {
                    isSetIterator: !0,
                    next: function() {
                        if (!this.isSetIterator) throw new TypeError("Not a SetIterator");
                        return this.it.next();
                    }
                };
                D(f.prototype);
                return c;
            }()
        };
        F.Set && !Set.prototype["delete"] && Set.prototype.remove && Set.prototype.items && Set.prototype.map && Array.isArray((new Set).keys) && (F.Set = gb.Set);
        if (F.Map || F.Set) {
            I(function() {
                return 2 === new Map([
                    [
                        1,
                        2
                    ]
                ]).get(1);
            }) || (F.Map = function S() {
                if (!(this instanceof S)) throw new TypeError('Constructor Map requires "new"');
                var b = new Ga;
                0 < arguments.length && pa(S, b, arguments[0]);
                delete b.constructor;
                Object.setPrototypeOf(b, F.Map.prototype);
                return b;
            }, F.Map.prototype = ua(Ga.prototype), K(F.Map.prototype, "constructor", F.Map, !0), ba.preserveToString(F.Map, Ga));
            var ad = new Map, bd = function() {
                var b = new Map([
                    [
                        1,
                        0
                    ],
                    [
                        2,
                        0
                    ],
                    [
                        3,
                        0
                    ],
                    [
                        4,
                        0
                    ]
                ]);
                b.set(-0, b);
                return b.get(0) === b && b.get(-0) === b && b.has(0) && b.has(-0);
            }(), xb = ad.set(1, 2) === ad;
            bd && xb || R(Map.prototype, "set", function(b, c) {
                n(oc, this, 0 === b ? 0 : b, c);
                return this;
            });
            bd || (ta(Map.prototype, {
                get: function(b) {
                    return n(da, this, 0 === b ? 0 : b);
                },
                has: function(b) {
                    return n(Fb, this, 0 === b ? 0 : b);
                }
            }, !0), ba.preserveToString(Map.prototype.get, da), ba.preserveToString(Map.prototype.has, Fb));
            var Ec = new Set, jc = Set.prototype["delete"] && Set.prototype.add && Set.prototype.has && function(b) {
                b["delete"](0);
                b.add(-0);
                return !b.has(0);
            }(Ec), ge = Ec.add(1) === Ec;
            if (!jc || !ge) {
                var kc = Set.prototype.add;
                Set.prototype.add = function(b) {
                    n(kc, this, 0 === b ? 0 : b);
                    return this;
                };
                ba.preserveToString(Set.prototype.add, kc);
            }
            if (!jc) {
                var Db = Set.prototype.has;
                Set.prototype.has = function(b) {
                    return n(Db, this, 0 === b ? 0 : b);
                };
                ba.preserveToString(Set.prototype.has, Db);
                var Fc = Set.prototype["delete"];
                Set.prototype["delete"] = function(b) {
                    return n(Fc, this, 0 === b ? 0 : b);
                };
                ba.preserveToString(Set.prototype["delete"], Fc);
            }
            var La = va(F.Map, function(b) {
                var c = new b([]);
                c.set(42, 42);
                return c instanceof b;
            }), Bd = Object.setPrototypeOf && !La;
            try {
                var Gc = !(F.Map() instanceof F.Map);
            } catch (Ka) {
                Gc = Ka instanceof TypeError;
            }
            if (0 !== F.Map.length || Bd || !Gc) F.Map = function S() {
                if (!(this instanceof S)) throw new TypeError('Constructor Map requires "new"');
                var b = new Ga;
                0 < arguments.length && pa(S, b, arguments[0]);
                delete b.constructor;
                Object.setPrototypeOf(b, S.prototype);
                return b;
            }, F.Map.prototype = Ga.prototype, K(F.Map.prototype, "constructor", F.Map, !0), ba.preserveToString(F.Map, Ga);
            var ja = va(F.Set, function(b) {
                var c = new b([]);
                c.add(42, 42);
                return c instanceof b;
            }), ya = Object.setPrototypeOf && !ja;
            try {
                var Cd = !(F.Set() instanceof F.Set);
            } catch (Ka1) {
                Cd = Ka1 instanceof TypeError;
            }
            if (0 !== F.Set.length || ya || !Cd) {
                var cd = F.Set;
                F.Set = function S() {
                    if (!(this instanceof S)) throw new TypeError('Constructor Set requires "new"');
                    var b = new cd;
                    0 < arguments.length && r(S, b, arguments[0]);
                    delete b.constructor;
                    Object.setPrototypeOf(b, S.prototype);
                    return b;
                };
                F.Set.prototype = cd.prototype;
                K(F.Set.prototype, "constructor", F.Set, !0);
                ba.preserveToString(F.Set, cd);
            }
            var ab = new F.Map, Eb = !I(function() {
                return ab.keys().next().done;
            });
            ("function" !== typeof F.Map.prototype.clear || 0 !== (new F.Set).size || 0 !== ab.size || "function" !== typeof F.Map.prototype.keys || "function" !== typeof F.Set.prototype.keys || "function" !== typeof F.Map.prototype.forEach || "function" !== typeof F.Set.prototype.forEach || O(F.Map) || O(F.Set) || "function" !== typeof ab.keys().next || Eb || !La) && ta(F, {
                Map: gb.Map,
                Set: gb.Set
            }, !0);
            F.Set.prototype.keys !== F.Set.prototype.values && K(F.Set.prototype, "keys", F.Set.prototype.values, !0);
            D(Object.getPrototypeOf((new F.Map).keys()));
            D(Object.getPrototypeOf((new F.Set).keys()));
            if (p && "has" !== F.Set.prototype.has.name) {
                var bc = F.Set.prototype.has;
                R(F.Set.prototype, "has", function(b) {
                    return n(bc, this, b);
                });
            }
        }
        ta(F, gb);
        w(F.Map);
        w(F.Set);
    }
    var hb = function(b) {
        if (!A.TypeIsObject(b)) throw new TypeError("target must be an object");
    }, bb = {
        apply: function() {
            return A.Call(A.Call, null, arguments);
        },
        construct: function(b, c) {
            if (!A.IsConstructor(b)) throw new TypeError("First argument must be a constructor.");
            var g = 2 < arguments.length ? arguments[2] : b;
            if (!A.IsConstructor(g)) throw new TypeError("new.target must be a constructor.");
            return A.Construct(b, c, g, "internal");
        },
        deleteProperty: function(b, c) {
            hb(b);
            if (X) {
                var g = Object.getOwnPropertyDescriptor(b, c);
                if (g && !g.configurable) return !1;
            }
            return delete b[c];
        },
        has: function(b, c) {
            hb(b);
            return c in b;
        }
    };
    Object.getOwnPropertyNames && Object.assign(bb, {
        ownKeys: function(b) {
            hb(b);
            var c = Object.getOwnPropertyNames(b);
            A.IsCallable(Object.getOwnPropertySymbols) && Oa(c, Object.getOwnPropertySymbols(b));
            return c;
        }
    });
    Object.preventExtensions && Object.assign(bb, {
        isExtensible: function(b) {
            hb(b);
            return Object.isExtensible(b);
        },
        preventExtensions: function(b) {
            hb(b);
            return !B(function() {
                return Object.preventExtensions(b);
            });
        }
    });
    if (X) {
        var he = function(b, c, g) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            if (!d) return b = Object.getPrototypeOf(b), null === b ? void 0 : he(b, c, g);
            if ("value" in d) return d.value;
            if (d.get) return A.Call(d.get, g);
        }, l = function(b, c, g, d) {
            var f = Object.getOwnPropertyDescriptor(b, c);
            if (!f) {
                b = Object.getPrototypeOf(b);
                if (null !== b) return l(b, c, g, d);
                f = {
                    value: void 0,
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                };
            }
            return "value" in f ? f.writable && A.TypeIsObject(d) ? Object.getOwnPropertyDescriptor(d, c) ? Ib.defineProperty(d, c, {
                value: g
            }) : Ib.defineProperty(d, c, {
                value: g,
                writable: !0,
                enumerable: !0,
                configurable: !0
            }) : !1 : f.set ? (n(f.set, d, g), !0) : !1;
        };
        Object.assign(bb, {
            defineProperty: function(b, c, g) {
                hb(b);
                return !B(function() {
                    return Object.defineProperty(b, c, g);
                });
            },
            getOwnPropertyDescriptor: function(b, c) {
                hb(b);
                return Object.getOwnPropertyDescriptor(b, c);
            },
            get: function(b, c) {
                hb(b);
                return he(b, c, 2 < arguments.length ? arguments[2] : b);
            },
            set: function(b, c, g) {
                hb(b);
                return l(b, c, g, 3 < arguments.length ? arguments[3] : b);
            }
        });
    }
    if (Object.getPrototypeOf) {
        var Dd = Object.getPrototypeOf;
        bb.getPrototypeOf = function(b) {
            hb(b);
            return Dd(b);
        };
    }
    Object.setPrototypeOf && bb.getPrototypeOf && Object.assign(bb, {
        setPrototypeOf: function(b, c) {
            hb(b);
            if (null !== c && !A.TypeIsObject(c)) throw new TypeError("proto must be an object or null");
            if (c === Ib.getPrototypeOf(b)) return !0;
            if (Ib.isExtensible && !Ib.isExtensible(b)) return !1;
            var g;
            a: {
                for(g = c; g;){
                    if (b === g) {
                        g = !0;
                        break a;
                    }
                    g = bb.getPrototypeOf(g);
                }
                g = !1;
            }
            if (g) return !1;
            Object.setPrototypeOf(b, c);
            return !0;
        }
    });
    var Ae = function(b, c) {
        A.IsCallable(F.Reflect[b]) ? I(function() {
            F.Reflect[b](1);
            F.Reflect[b](NaN);
            F.Reflect[b](!0);
            return !0;
        }) && R(F.Reflect, b, c) : K(F.Reflect, b, c);
    };
    Object.keys(bb).forEach(function(b) {
        Ae(b, bb[b]);
    });
    var Hc = F.Reflect.getPrototypeOf;
    p && Hc && "getPrototypeOf" !== Hc.name && R(F.Reflect, "getPrototypeOf", function(b) {
        return n(Hc, F.Reflect, b);
    });
    F.Reflect.setPrototypeOf && I(function() {
        F.Reflect.setPrototypeOf(1, {});
        return !0;
    }) && R(F.Reflect, "setPrototypeOf", bb.setPrototypeOf);
    F.Reflect.defineProperty && (I(function() {
        var b = !F.Reflect.defineProperty(1, "test", {
            value: 1
        }), c = "function" !== typeof Object.preventExtensions || !F.Reflect.defineProperty(Object.preventExtensions({}), "test", {});
        return b && c;
    }) || R(F.Reflect, "defineProperty", bb.defineProperty));
    F.Reflect.construct && (I(function() {
        var b = function() {};
        return F.Reflect.construct(function() {}, [], b) instanceof b;
    }) || R(F.Reflect, "construct", bb.construct));
    if ("Invalid Date" !== String(new Date(NaN))) {
        var Be = Date.prototype.toString;
        R(Date.prototype, "toString", function() {
            var b = +this;
            return b !== b ? "Invalid Date" : A.Call(Be, this);
        });
    }
    var ie = {
        anchor: function(b) {
            return A.CreateHTML(this, "a", "name", b);
        },
        big: function() {
            return A.CreateHTML(this, "big", "", "");
        },
        blink: function() {
            return A.CreateHTML(this, "blink", "", "");
        },
        bold: function() {
            return A.CreateHTML(this, "b", "", "");
        },
        fixed: function() {
            return A.CreateHTML(this, "tt", "", "");
        },
        fontcolor: function(b) {
            return A.CreateHTML(this, "font", "color", b);
        },
        fontsize: function(b) {
            return A.CreateHTML(this, "font", "size", b);
        },
        italics: function() {
            return A.CreateHTML(this, "i", "", "");
        },
        link: function(b) {
            return A.CreateHTML(this, "a", "href", b);
        },
        small: function() {
            return A.CreateHTML(this, "small", "", "");
        },
        strike: function() {
            return A.CreateHTML(this, "strike", "", "");
        },
        sub: function() {
            return A.CreateHTML(this, "sub", "", "");
        },
        sup: function() {
            return A.CreateHTML(this, "sup", "", "");
        }
    };
    ia(Object.keys(ie), function(b) {
        var c = String.prototype[b];
        if (A.IsCallable(c)) {
            c = n(c, "", ' " ');
            var g = Bb([], c.match(/"/g)).length;
            c = c !== c.toLowerCase() || 2 < g;
        } else c = !0;
        c && R(String.prototype, b, ie[b]);
    });
    var g = function() {
        if (!qc) return !1;
        var b = "object" === typeof JSON && "function" === typeof JSON.stringify ? JSON.stringify : null;
        if (!b) return !1;
        if ("undefined" !== typeof b(oa()) || "[null]" !== b([
            oa()
        ])) return !0;
        var c = {
            a: oa()
        };
        c[oa()] = !0;
        return "{}" !== b(c) ? !0 : !1;
    }(), Ea = I(function() {
        return qc ? "{}" === JSON.stringify(Object(oa())) && "[{}]" === JSON.stringify([
            Object(oa())
        ]) : !0;
    });
    if (g || !Ea) {
        var nb = JSON.stringify;
        R(JSON, "stringify", function(b) {
            if ("symbol" !== typeof b) {
                var c;
                1 < arguments.length && (c = arguments[1]);
                var g = [
                    b
                ];
                if (t(c)) g.push(c);
                else {
                    var d = A.IsCallable(c) ? c : null;
                    g.push(function(b, c) {
                        b = d ? n(d, this, b, c) : c;
                        if ("symbol" !== typeof b) return Da.symbol(b) ? uc({})(b) : b;
                    });
                }
                2 < arguments.length && g.push(arguments[2]);
                return nb.apply(this, g);
            }
        });
    }
    return F;
});
var CindyJS = function() {
    function d(d) {
        if (0 === t) return console.error("Waiting for " + d + " after we finished waiting."), function() {};
        0 > t && (t = 0);
        ++t;
        return function() {
            --t;
            0 > t && console.error("Wait count mismatch: " + d);
            if (0 === t) for(var h = 0, n = G.length; h < n;)G[h++].startup();
        };
    }
    function n(d) {
        var h = n.newInstance(d);
        0 >= t ? h.startup() : !1 !== d.autostart && G.push(h);
        return h;
    }
    var t = -1, G = [];
    Math.sign || (Math.sign = function(d) {
        return (0 < d) - (0 > d) || +d;
    });
    "undefined" === typeof document || "undefined" === typeof window || "undefined" === typeof document.addEventListener || "undefined" !== typeof window.cindyDontWait && !0 === window.cindyDontWait || document.addEventListener("DOMContentLoaded", d("DOMContentLoaded"));
    var B = null, I = null, O = {};
    n.getBaseDir = function() {
        if (null !== B) return B;
        for(var d = document.getElementsByTagName("script"), h = 0; h < d.length; ++h){
            var n = d[h], t = n.src;
            if (t) {
                var G = /Cindy\.js$/.exec(t);
                if (G) return B = t.substr(0, G.index), console.log("Will load extensions from " + B), I = n, B;
            }
        }
        console.error("Could not find <script> tag for Cindy.js");
        return B = I = !1;
    };
    n.addNewScript = function(d, h) {
        h || console.error.bind(console);
        var p = n.getBaseDir();
        if (!1 === p) return !1;
        h = document.createElement("script");
        h.src = p + d;
        d = I.nextSibling;
        p = I.parentElement;
        d ? p.insertBefore(h, d) : p.appendChild(h);
        return h;
    };
    n.loadScript = function(d, h, t, B) {
        for(var p = String(d).split("."), G = window; p.length && "object" === typeof G && null !== G;)G = G[p.shift()];
        if (G && !p.length) return t(), !0;
        B || (B = console.error.bind(console));
        p = O[d];
        if (!p) {
            p = n.addNewScript(h, B);
            if (!1 === p) return B("Can't load additional components."), !1;
            O[d] = p;
        }
        p.addEventListener("load", t);
        p.addEventListener("error", B);
        return null;
    };
    n._autoLoadingPlugin = {};
    n.autoLoadPlugin = function(d, h, t) {
        if (n._pluginRegistry[d]) return t(), !0;
        var p = n._autoLoadingPlugin[d];
        if (!p) {
            h || (h = d + "-plugin.js");
            p = n._autoLoadingPlugin[d] = [];
            d = n.addNewScript(h);
            if (!1 === d) return !1;
            d.addEventListener("error", console.error.bind(console));
        }
        p.push(t);
        return null;
    };
    var h = {
        ctype: "undefined"
    };
    n.waitFor = d;
    n._pluginRegistry = {};
    n.instances = [];
    n.registerPlugin = function(d, h, t) {
        if (1 !== d) return console.error("Plugin API version " + d + " not supported"), !1;
        n._pluginRegistry[h] = t;
        (n._autoLoadingPlugin[h] || []).forEach(function(d) {
            d();
        });
    };
    var X = 0;
    n.dumpState = function(d) {
        d = n.instances[d || 0].saveState();
        console.log(JSON.stringify(d));
    };
    n.debugState = function(d) {
        n.instances.map(function(d) {
            var h = d.config;
            h = JSON.parse(JSON.stringify(h));
            var n = d.saveState();
            console.log(JSON.stringify(n));
            for(var p in n)h[p] = n[p];
            d.shutdown();
            return h;
        }).forEach(function(d) {
            n(d);
        });
    };
    n.newInstance = function(d) {
        function n() {
            ra.width = ma = ra.clientWidth;
            ra.height = pa = ra.clientHeight;
            wa = 1;
            if (Zc || $c) wa = Math.max(Zc ? Zc / ra.width : 0, $c ? $c / ra.height : 0), ma = wa * ra.clientWidth, pa = wa * ra.clientHeight;
            z.setTransform(1 / wa, 0, 0, 1 / wa, 0, 0);
            C.setMat(25, 0, 0, 25, 250.5, 250.5);
            if (ic) for(var a1 = 0; a1 < ic.length; a1++){
                var e = ic[a1], b = Object.keys(e)[0];
                "scale" === b && (Yc = e.scale, C[b](e.scale));
                if ("translate" === b) C[b](e.translate[0], e.translate[1]);
                "scaleAndOrigin" === b && (Yc = e[b][0] / 25, C[b].apply(null, e[b]));
                "visibleRect" === b && (C[b].apply(null, e[b]), Yc = C.drawingstate.initialmatrix.a / 25);
            }
            C.createnewbackup();
            C.greset();
            a1 = 1;
            "undefined" !== typeof window && window.devicePixelRatio && (a1 = window.devicePixelRatio);
            e = z.webkitBackingStorePixelRatio || z.mozBackingStorePixelRatio || z.msBackingStorePixelRatio || z.oBackingStorePixelRatio || z.backingStorePixelRatio || 1;
            a1 !== e && (a1 /= e, ra.width = ma * a1, ra.height = pa * a1, z.scale(a1, a1));
        }
        function p(a1) {
            if ("canvas" !== a1.tagName.toLowerCase()) {
                var e = a1;
                for(ra = document.createElement("canvas"); e.firstChild;)e.removeChild(e.firstChild);
            } else {
                ra = a1;
                e = document.createElement("div");
                var b = null, v = null;
                Array.prototype.slice.call(ra.attributes).forEach(function(a1) {
                    "width" === a1.name ? b = a1.value : "height" === a1.name ? v = a1.value : e.setAttributeNodeNS(ra.removeAttributeNode(a1));
                });
                null === b || e.style.width || (e.style.width = b + "px");
                null === v || e.style.height || (e.style.height = v + "px");
                ra.parentNode.replaceChild(e, ra);
            }
            e.classList.add("CindyJS-widget");
            a1 = ra.style;
            a1.position = "absolute";
            a1.border = "none";
            a1.margin = a1.padding = a1.left = a1.top = "0px";
            a1.width = a1.height = "100%";
            a1 = "static";
            window.getComputedStyle && (a1 = window.getComputedStyle(e).getPropertyValue("position"), a1 = String(a1 || "static"));
            "static" === a1 && (e.style.position = "relative");
            e.appendChild(ra);
            return ra;
        }
        function t() {
            var a1 = d.cinderella;
            if (!a1 || !a1.version) return !1;
            for(var e = 0; e < arguments.length; ++e){
                var b = a1.version[e], v = arguments[e];
                if (b !== v) return typeof b === typeof v && b < v;
            }
            return !1;
        }
        function B() {
            Bd = !0;
            if (0 === Gc) {
                if (d.exclusive) for(c = Ia.instances.length; 0 < c;)Ia.instances[--c].shutdown();
                void 0 !== d.csconsole && (Qa = d.csconsole);
                Qa = null === Qa ? new Oa : !0 === Qa ? new zb : "string" === typeof Qa ? new Xa(Qa) : "object" === typeof Qa && "function" === typeof Qa.appendChild ? new Xa(Qa) : new Oa;
                Ma = [
                    100,
                    100
                ];
                var a1 = null;
                ic = d.transform;
                if (d.ports && 0 < d.ports.length) {
                    c = d.ports[0];
                    (a1 = c.element) || (a1 = document.getElementById(c.id));
                    a1 = p(a1);
                    var e = a1.parentNode.style;
                    "window" === c.fill ? (e.width = "100vw", e.height = "100vh") : "parent" === c.fill ? (e.width = "100%", e.height = "100%") : c.width && c.height && (e.width = c.width + "px", e.height = c.height + "px");
                    c.virtualwidth && (Zc = c.virtualwidth);
                    c.virtualheight && ($c = c.virtualheight);
                    c.background && (a1.style.backgroundColor = c.background);
                    void 0 !== c.transform && (ic = c.transform);
                    $a(c.grid) && 0 < c.grid && (Va = c.grid);
                    $a(c.tgrid) && 0 < c.tgrid && (Ad = c.tgrid);
                    c.snap && (Cc = !0);
                    Number.isFinite(c.snapdistance) && (Tb = Math.max(c.snapdistance, 0));
                    c.axes && (Dc = !0);
                }
                a1 || (a1 = d.canvas, a1 || "undefined" === typeof document || (a1 = document.getElementById(d.canvasname)) && (a1 = p(a1)));
                a1 && (ra = a1, z = a1.getContext("2d"), n(), z.setLineDash || (z.setLineDash = function() {}), (d.animation ? d.animation.controls : d.animcontrols) && I(d), d.animation && $a(d.animation.speed) && (void 0 === d.animation.accuracy && t(2, 9, 1875) ? O(.5 * d.animation.speed) : O(d.animation.speed)), d.animation && $a(d.animation.accuracy) && (zc = d.animation.accuracy));
                d.statusbar && (ve = "string" === typeof d.statusbar ? document.getElementById(d.statusbar) : d.statusbar);
                var b = d.scripts, v = null;
                "string" === typeof b && b.search(/\*/) && (v = b);
                "object" !== typeof b && (b = null);
                "move keydown keyup keytyped keytype mousedown mouseup mousedrag mousemove mouseclick multidown multiup multidrag init tick draw simulationstep simulationstart simulationstop ondrop".split(" ").forEach(function(a1) {
                    if (null !== b && b[a1]) var e = b[a1];
                    else {
                        e = a1 + "script";
                        if (d[e]) e = document.getElementById(d[e]);
                        else if (v) {
                            if (e = document.getElementById(v.replace(/\*/, a1)), !e) return;
                        } else return;
                        e = e.text;
                    }
                    e = lb(e, !1);
                    "error" === e.ctype ? console.error("Error compiling " + a1 + " script: " + e.message) : V[a1] = le(e, a1);
                });
                t(2, 9, 1888) && !V.keydown && (V.keydown = V.keytyped, V.keytyped = V.keytype, V.keytype = void 0);
                $a(d.grid) && 0 < d.grid && (Va = d.grid);
                d.snap && (Cc = !0);
                Number.isFinite(d.snapdistance) && (Tb = Math.max(d.snapdistance, 0));
                r = {};
                var c = 0;
                gb = {};
                d.geometry || (d.geometry = []);
                pe(d.geometry);
                d.behavior || (d.behavior = []);
                "function" === typeof Rb && Rb(d.behavior);
                for(var g in d.images)c = G(d.images[g], !1), c !== h && (gb[g] = c);
                for(var f in d.videos)g = G(d.videos[f], !0), g !== h && (gb[f] = g);
                La.canvas = a1;
                if (d.oninit) d.oninit(La);
                Ia.instances.push(La);
                d.use && d.use.forEach(function(a1) {
                    q.use$1([
                        u.wrap(a1)
                    ], {});
                });
                Sb.convexhull3d$1 && ba("QuickHull3D", "QuickHull3D.js");
                (Sb.colorplot$1 || Sb.colorplot$2 || Sb.colorplot$3 || Sb.colorplot$4) && ba("CindyGL", "CindyGL.js");
                (Sb.playtone$1 || Sb.playmelody$1) && ba("midi", "midi-plugin.js");
                ua();
            }
        }
        function G(a1, e) {
            if ("string" === typeof a1) {
                if (e) {
                    var b = document.createElement("video");
                    b.preload = "auto";
                    b.loop = !0;
                    b.setAttribute("playsinline", "");
                    enableInlineVideo(b);
                } else b = new Image;
                b.src = a1;
            } else b = a1;
            if (!b.tagName) return console.error("Not a valid image element", b), h;
            var v = {
                img: b,
                width: NaN,
                height: NaN,
                ready: !0,
                live: !1,
                generation: 0,
                whenReady: f
            };
            a1 = b.tagName.toLowerCase();
            var c = [];
            if ("img" === a1) b.complete ? (v.width = b.width, v.height = b.height) : (v.ready = !1, b.addEventListener("load", function() {
                v.width = b.width;
                v.height = b.height;
                v.ready = !0;
                v.whenReady = f;
                c.forEach(f);
                k();
            }), v.whenReady = c.push.bind(c));
            else if ("video" === a1) v.live = !0, b.readyState >= b.HAVE_METADATA ? (v.width = b.videoWidth, v.height = b.videoHeight) : (v.ready = !1, b.addEventListener("loadedmetadata", function() {
                v.width = b.videoWidth;
                v.height = b.videoHeight;
                v.ready = !0;
                v.whenReady = f;
                c.forEach(f);
                k();
            }), v.whenReady = c.push.bind(c));
            else if ("canvas" === a1) v.width = b.width, v.height = b.height;
            else return console.error("Not a valid image element", a1, b), h;
            return {
                ctype: "image",
                value: v
            };
        }
        function I(a1) {
            function e(a1, e) {
                var b = document.createElement("button"), x = document.createElement("img");
                b.appendChild(x);
                k.appendChild(b);
                jc(x, a1);
                b.addEventListener("click", e);
                xb[a1] = function(a1) {
                    a1 ? b.classList.add("CindyJS-active") : b.classList.remove("CindyJS-active");
                };
            }
            function b(a1) {
                if (l) {
                    var e = f.getBoundingClientRect();
                    O(d * (a1.clientX - e.left - f.clientLeft + .5) / e.width + c);
                }
            }
            var v = document.createElement("div");
            v.className = "CindyJS-animcontrols";
            ra.parentNode.appendChild(v);
            var c = 0, g = 1, d = 1;
            a1.animation && a1.animation.speedRange && $a(a1.animation.speedRange[0]) && $a(a1.animation.speedRange[1]) && (c = a1.animation.speedRange[0], g = a1.animation.speedRange[1], d = g - c);
            var f = document.createElement("div");
            f.className = "CindyJS-animspeed";
            v.appendChild(f);
            var h = document.createElement("div");
            f.appendChild(h);
            T(f, "mousedown", function(a1) {
                l = !0;
                b(a1);
            });
            T(f, "mousemove", b);
            T(ra.parentNode, "mouseup", function(a1) {
                l = !1;
            }, !0);
            var k = document.createElement("div");
            k.className = "CindyJS-animbuttons";
            v.appendChild(k);
            e("play", F);
            e("pause", ub);
            e("stop", Wb);
            xb.stop(!0);
            Ec = function(a1) {
                a1 = (a1 - c) / d;
                a1 = Math.max(0, Math.min(1, a1));
                a1 = .1 * Math.round(1E3 * a1);
                h.style.width = a1 + "%";
            };
            var l = !1;
        }
        function O(a1) {
            ee = a1;
            Ec && Ec(a1);
        }
        function f(a1) {
            return a1();
        }
        function ba(a1, e, b) {
            var x = null;
            d.plugins && (x = d.plugins[a1]);
            x || (x = Ia._pluginRegistry[a1]);
            x ? q.use$1([
                u.wrap(a1)
            ], {}) : (++ge, Ia.autoLoadPlugin(a1, e, function() {
                q.use$1([
                    u.wrap(a1)
                ], {});
                ua(b);
            }));
        }
        function ua(a1) {
            0 === --ge && (a1 ? k() : (w(V.init), (d.animation || d).autoplay && F(), La.canvas && Gb(La.canvas, d)));
        }
        function va() {
            null !== kc && (Ja.set(kc.state), Object.keys(kc.speeds).forEach(function(a1) {
                var e = r.csnames[a1];
                "undefined" !== typeof e.behavior && (a1 = kc.speeds[a1], e.behavior.vx = a1[0], e.behavior.vy = a1[1], e.behavior.vz = a1[2], e.behavior.fx = 0, e.behavior.fy = 0, e.behavior.fz = 0);
            }), Zd());
        }
        function F() {
            if (!Ba) {
                if (xc) {
                    var a1 = Ub.backup;
                    a1.set(Ja);
                    for(var e = {}, b = 0; b < r.points.length; b++){
                        var v = r.points[b];
                        "undefined" !== typeof v.behavior && (e[v.name] = [
                            v.behavior.vx,
                            v.behavior.vy,
                            v.behavior.vz
                        ]);
                    }
                    kc = {
                        state: a1,
                        speeds: e
                    };
                    yc = 0;
                    xc = !1;
                    xb.stop(!1);
                } else xb.pause(!1);
                wd = Date.now();
                xb.play(!0);
                "function" === typeof Rb && Ce && vd();
                Ba = !0;
                w(V.simulationstart);
                k();
            }
        }
        function ub() {
            Ba && (xb.play(!1), xb.pause(!0), Ba = !1);
        }
        function Wb() {
            xc || (Ba ? (w(V.simulationstop), Ba = !1, xb.play(!1)) : xb.pause(!1), xb.stop(!0), xc = !0, va());
        }
        function Ab() {
            if (!Fc) {
                Fc = !0;
                for(var a1 = Ia.instances.length; 0 < a1;)if (Ia.instances[--a1] === La) {
                    Ia.instances.splice(a1, 1);
                    break;
                }
                for(a1 = Db.length; 0 < a1;)try {
                    Db[--a1]();
                } catch (e) {
                    console.error(e);
                }
            }
        }
        function Bb(a1) {
            this.in = function(a1, b) {
                console.log(a1);
                b ? this.append(this.createTextNode("span", "blue", a1)) : this.append(this.createTextNode("p", "blue", a1));
            };
            this.out = function(a1, b) {
                console.log(a1);
                b ? this.append(this.createTextNode("span", "red", a1)) : this.append(this.createTextNode("p", "red", a1));
            };
            this.err = function(a1, b) {
                console.log(a1);
                b ? this.append(this.createTextNode("span", "red", a1)) : this.append(this.createTextNode("p", "red", a1));
            };
            this.createTextNode = function(a1, b, v) {
                return "undefined" !== typeof document ? (a1 = document.createElement(a1), a1.appendChild(document.createTextNode(v)), a1.style.color = b, a1) : v + "\n";
            };
        }
        function zb() {
            var a1 = this, e = document.createElement("div");
            e.innerHTML = '<div id="console" style="border-top: 1px solid #333333; bottom: 0px; position: absolute; width: 100%;"><div id="log" style="height: 150px; overflow-y: auto;"></div><input id="cmd" type="text" style="box-sizing: border-box; height: 30px; width: 100%;"></div>';
            document.body.appendChild(e);
            var b = document.getElementById("cmd");
            var v = document.getElementById("log");
            b.onkeydown = function(e) {
                13 === e.keyCode && "" !== b.value && (a1.in(b.value), e = q.parse$1([
                    u.wrap(b.value)
                ], []), e = w(e), console.log(da(e)), "undefined" !== e.ctype && Qa.out(da(e)), b.value = "", v.scrollTop = v.scrollHeight);
            };
            this.append = function(a1) {
                v.appendChild(a1);
            };
            this.clear = function() {
                v.innerHTML = "";
            };
        }
        function Xa(a1) {
            var e = a1;
            "string" === typeof a1 && (e = document.getElementById(a1));
            this.append = function(a1) {
                e.appendChild(a1);
            };
            this.clear = function() {
                e.innerHTML = "";
            };
        }
        function Oa() {
            this.append = function(a1) {};
            this.clear = function() {};
        }
        function T(a1, e, b, v) {
            void 0 === v && (v = !1);
            Db.push(function() {
                a1.removeEventListener(e, b, v);
            });
            a1.addEventListener(e, b, v);
        }
        function Gb(a1, e) {
            function b(e, b) {
                for(var x = 0; x < e.changedTouches.length; x++){
                    var v = e.changedTouches[x], c = d(v.identifier);
                    if (b || Eb[c]) {
                        var g = a1.getBoundingClientRect();
                        v = C.to(v.clientX - g.left - a1.clientLeft + .5, v.clientY - g.top - a1.clientTop + .5);
                        Eb[c] = [
                            v[0],
                            v[1]
                        ];
                    }
                }
                k();
            }
            function v(e) {
                var b = a1.getBoundingClientRect();
                e = C.to(e.clientX - b.left - a1.clientLeft + .5, e.clientY - b.top - a1.clientTop + .5);
                ja.prevx = ja.x;
                ja.prevy = ja.y;
                ja.x = e[0];
                ja.y = e[1];
                Ma[0] = ja.x;
                Ma[1] = ja.y;
                k();
            }
            function d(a1) {
                if (bc.hasOwnProperty(a1)) return bc[a1];
                var e = Object.values(bc);
                e = e.sort(function(a1, e) {
                    return a1 - e;
                });
                var b = !1, x;
                for(x in e)!b && e[x] > (x | 0) + 1 && (bc[a1] = (x | 0) + 1, b = !0);
                b || (bc[a1] = e.length + 1);
                return bc[a1];
            }
            function f(a1) {
                var e = a1.changedTouches;
                b(a1, !1);
                for(var x = 0; x < a1.changedTouches.length; x++)ab = d(a1.changedTouches[x].identifier), Xb(ab), delete bc[a1.changedTouches[x].identifier];
                x = !1;
                for(var v = 0; v < e.length; v++)e[v].identifier === fa && (x = !0);
                x && (fa = -1, ja.down = !1, ya = void 0, w(V.mouseup), Ob("mouseup"), m || w(V.mouseclick), k(), a1.preventDefault());
            }
            var l = null, za = null, m = !1;
            "undefined" !== typeof MutationObserver && (l = MutationObserver);
            l || "undefined" === typeof WebKitMutationObserver || (l = WebKitMutationObserver);
            l ? (l = new l(function(e) {
                document.body.contains(a1) || Ab();
            }), l.observe(document.documentElement, {
                childList: !0,
                subtree: !0
            }), Db.push(function() {
                l.disconnect();
            })) : (T(a1, "DOMNodeRemovedFromDocument", Ab), T(a1, "DOMNodeRemoved", Ab));
            if (!0 === e.keylistener) T(document, "keydown", function(a1) {
                Z(a1, V.keydown);
                return !1;
            }), T(document, "keyup", function(a1) {
                Z(a1, V.keyup);
                return !1;
            }), T(document, "keypress", function(a1) {
                Z(a1, V.keytyped);
                return !1;
            });
            else if (V.keydown || V.keyup || V.keytyped) a1.setAttribute("tabindex", "0"), T(a1, "mousedown", function() {
                a1.focus();
            }), T(a1, "keydown", function(a1) {
                9 !== a1.keyCode && (Z(a1, V.keydown), V.keytyped || a1.preventDefault());
            }), T(a1, "keyup", function(a1) {
                Z(a1, V.keyup);
                a1.preventDefault();
            }), T(a1, "keypress", function(a1) {
                9 !== a1.keyCode && (Z(a1, V.keytyped), a1.preventDefault());
            });
            T(a1, "mousedown", function(a1) {
                za = a1;
                m = !1;
                ja.button = a1.which;
                v(a1);
                J(0);
                w(V.mousedown);
                Ob("mousedown");
                ja.down = !0;
                a1.preventDefault();
            });
            T(a1, "mouseup", function(a1) {
                ja.down = !1;
                ya = void 0;
                w(V.mouseup);
                Xb(0);
                Ob("mouseup");
                delete Eb[0];
                k();
                a1.preventDefault();
            });
            T(a1, "mousemove", function(a1) {
                v(a1);
                ja.down ? (za && (2 < Math.abs(za.clientX - a1.clientX) || 2 < Math.abs(za.clientY - a1.clientY)) && (m = !0), w(V.mousedrag), Eb[0] && (ab = 0, w(V.multidrag), ab = 0)) : w(V.mousemove);
                Ob("mousemove");
                a1.preventDefault();
            });
            T(a1, "click", function(a1) {
                v(a1);
                m || w(V.mouseclick);
                a1.preventDefault();
            });
            T(a1, "dragenter", function(a1) {
                a1.preventDefault();
            });
            T(a1, "dragover", function(a1) {
                a1.preventDefault();
            });
            T(a1, "drop", function(e) {
                function b(a1, e) {
                    function b() {
                        N.readyState === XMLHttpRequest.DONE && (200 !== N.status ? (console.error("GET request for " + a1 + " failed: " + (N.responseText || "(no error message)")), d(e, h)) : v(e, N.responseText));
                    }
                    var g = a1.replace(/[?#][^]*/, "");
                    g = g.replace(/[^]*\/([^\/])/, "$1");
                    f[e] = {
                        type: "",
                        name: g
                    };
                    var N = new XMLHttpRequest;
                    N.onreadystatechange = function() {
                        if (N.readyState === XMLHttpRequest.DONE) {
                            if (200 !== N.status) console.error("HEAD request for " + a1 + " failed: " + (N.responseText || "(no error message)")), d(e, h);
                            else {
                                var v = N.getResponseHeader("Content-Type");
                                f[e].type = v;
                                /^image\//.test(v) ? c(e, a1) : x(v) ? (N = new XMLHttpRequest, N.onreadystatechange = b, N.open("GET", a1), N.send()) : d(e, h);
                            }
                        }
                    };
                    N.open("HEAD", a1);
                    N.send();
                }
                function x(a1) {
                    a1 = a1.replace(/;[^]*/, "");
                    return /^text\//.test(a1) ? 1 : "application/json" === a1 ? 2 : 0;
                }
                function v(a1, e) {
                    switch(x(f[a1].type)){
                        case 1:
                            d(a1, u.string(e));
                            break;
                        case 2:
                            try {
                                var b = JSON.parse(e);
                                var v = u.wrapJSON(b);
                            } catch (Xe) {
                                console.error(Xe), v = h;
                            }
                            d(a1, v);
                            break;
                        default:
                            d(a1, h);
                    }
                }
                function c(a1, e) {
                    var b = new Image, x = !1;
                    b.onload = function() {
                        x || (x = !0, d(a1, G(b, !1)));
                    };
                    b.onerror = function(e) {
                        x || (x = !0, console.error(e), d(a1, h));
                    };
                    b.src = e;
                }
                function d(a1, e, b) {
                    Y[a1] = g.turnIntoCSList([
                        e,
                        u.string(b || e.ctype),
                        u.string(f[a1].type),
                        u.string(f[a1].name)
                    ]);
                    0 === --l && (a1 = za, ad = g.turnIntoCSList(Y), bd = a1, w(V.ondrop), bd = ad = h, k());
                }
                e.preventDefault();
                var N = e.dataTransfer, f = N.files, Y = Array(f.length), l = f.length, ka = e.currentTarget.getBoundingClientRect(), za = g.realVector(C.to(e.clientX - ka.left - a1.clientLeft + .5, e.clientY - ka.top - a1.clientTop + .5));
                if (0 < f.length) Array.prototype.forEach.call(f, function(a1, e) {
                    var b = new FileReader;
                    x(a1.type) ? (b.onload = function() {
                        v(e, b.result);
                    }, b.readAsText(a1)) : /^image\//.test(a1.type) ? (b.onload = function() {
                        c(e, b.result);
                    }, b.readAsDataURL(a1)) : (console.log("Unknown MIME type: " + a1.type), d(e, h));
                });
                else if (e = N.getData("text/uri-list")) e = e.split("\n").filter(function(a1) {
                    return !/^\s*(#|$)/.test(a1);
                }), l = e.length, Y = Array(l), f = Array(l), e.forEach(b);
            });
            var fa = -1;
            T(a1, "touchstart", function(a1) {
                b(a1, !0);
                for(var e = 0; e < a1.changedTouches.length; e++)J(d(a1.changedTouches[e].identifier));
                -1 === fa && (e = a1.changedTouches, 0 !== e.length && (fa = e[0].identifier, v(a1.targetTouches[0]), w(V.mousedown), ja.down = !0, za = a1.targetTouches[0], m = !1, Ob("mousedown"), a1.preventDefault()));
            }, !1);
            T(a1, "touchmove", function(a1) {
                b(a1, !1);
                for(var e = 0; e < a1.changedTouches.length; e++)ab = d(a1.changedTouches[e].identifier), w(V.multidrag), ab = 0;
                e = a1.changedTouches;
                for(var x = !1, c = 0; c < e.length; c++)e[c].identifier === fa && (x = !0);
                x && (v(a1.targetTouches[0]), ja.down ? (za && (2 < Math.abs(za.clientX - a1.targetTouches[0].clientX) || 2 < Math.abs(za.clientY - a1.targetTouches[0].clientY)) && (m = !0), ab = d(fa), w(V.mousedrag)) : w(V.mousemove), Ob("mousemove"), a1.preventDefault());
            }, !0);
            T(a1, "touchend", f, !1);
            "undefined" !== typeof document && document.body && T(document.body, "touchcancel", f, !1);
            "undefined" !== typeof window && T(window, "resize", function() {
                hb(function() {
                    n();
                    k();
                });
            }, !1);
            c(a1.parentNode);
            k();
        }
        function b(a1, e) {
            var b = document.createElement("div");
            b.setAttribute("style", e);
            a1.appendChild(b);
            return b;
        }
        function c(a1) {
            function e() {
                v.scrollLeft = v.scrollTop = c.scrollLeft = c.scrollTop = 1E5;
            }
            function x() {
                if (g !== a1.clientWidth || d !== a1.clientHeight) g = a1.clientWidth, d = a1.clientHeight, f || (f = !0, hb(function() {
                    f = !1;
                    n();
                    k();
                }));
                e();
            }
            if ("undefined" !== typeof document) {
                var v = b(a1, "position: absolute; transition: 0s; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;");
                b(v, "position: absolute; transition: 0s; left: 0; top: 0; width: 100000px; height: 100000px");
                var c = b(a1, "position: absolute; transition: 0s; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;");
                b(c, "position: absolute; transition: 0s; left: 0; top: 0; width: 200%; height: 200%");
                e();
                var g = a1.clientWidth, d = a1.clientHeight, f = !1;
                v.addEventListener("scroll", x);
                c.addEventListener("scroll", x);
            }
        }
        function k() {
            bb || (bb = hb(U));
        }
        function U() {
            bb = null;
            if (!Fc) {
                if (Ba) {
                    var a1 = Date.now(), e = Math.min(50, a1 - wd) * ee * ze;
                    wd = a1;
                    a1 = yc + e;
                    Ce && "undefined" !== typeof cb && cb.tick(e);
                    yc = a1;
                    Ba && w(V.tick);
                }
                ca();
                Ba && k();
            }
        }
        function ca() {
            C.reset();
            z.save();
            z.clearRect(0, 0, ma, pa);
            var a1 = C.drawingstate.matrix, e, b;
            if (0 !== Va) {
                z.beginPath();
                z.strokeStyle = "rgba(0,0,0,0.1)";
                z.lineWidth = 1;
                z.lineCap = "butt";
                var v = Va * a1.a;
                for(e = Math.ceil(-a1.tx / v); (b = e * v + a1.tx) < ma;){
                    if (e || !Dc) z.moveTo(b, 0), z.lineTo(b, pa);
                    e++;
                }
                for(e = Math.floor(a1.ty / v); (b = e * v - a1.ty) < pa;){
                    if (e || !Dc) z.moveTo(0, b), z.lineTo(ma, b);
                    e++;
                }
                z.stroke();
            }
            if (0 !== Ad) {
                z.beginPath();
                z.strokeStyle = "rgba(0,0,0,0.1)";
                z.lineWidth = 1;
                z.lineCap = "butt";
                v = Ad * a1.a;
                var c = Math.sqrt(3);
                var d = a1.ty / c;
                var f = (pa + a1.ty) / c;
                for(e = Math.ceil(-(a1.tx + f) / v); (b = e * v + a1.tx) + d < ma;)z.moveTo(b + d, 0), z.lineTo(b + f, pa), e++;
                for(e = Math.ceil(-(a1.tx - d) / v); (b = e * v + a1.tx) - f < ma;)z.moveTo(b - d, 0), z.lineTo(b - f, pa), e++;
                v *= .5 * c;
                for(e = Math.floor(a1.ty / v); (b = e * v - a1.ty) < pa;){
                    if (e || !Dc) z.moveTo(0, b), z.lineTo(ma, b);
                    e++;
                }
                z.stroke();
            }
            Dc && (z.beginPath(), z.strokeStyle = "rgba(0,0,0,0.2)", z.lineWidth = 3, z.lineCap = "butt", z.lineJoin = "miter", z.miterLimit = 10, z.beginPath(), z.moveTo(0, -a1.ty), z.lineTo(ma - 6, -a1.ty), z.moveTo(ma - 13, -5 - a1.ty), z.lineTo(ma - 3, -a1.ty), z.lineTo(ma - 13, 5 - a1.ty), z.moveTo(a1.tx, pa), z.lineTo(a1.tx, 6), z.moveTo(a1.tx - 5, 13), z.lineTo(a1.tx, 3), z.lineTo(a1.tx + 5, 13), z.stroke());
            Xd();
            C.greset();
            Vd();
            for(a1 = 0; a1 < r.polygons.length; a1++)v = r.polygons[a1], v.isshowing && !1 !== v.visible && (d = {
                color: v.color,
                alpha: v.alpha,
                fillcolor: v.fillcolor,
                fillalpha: v.fillalpha,
                size: v.size,
                lineJoin: u.string("miter"),
                fillrule: u.string(v.fillrule)
            }, E.drawpolygon([
                v.vertices
            ], d, "D", !0));
            for(a1 = 0; a1 < r.conics.length; a1++)r.conics[a1].isArc ? (v = r.conics[a1], v.isshowing && !1 !== v.visible && (d = {}, d.color = v.color, d.alpha = v.alpha, d.size = v.size, E.drawarc(v, d, v.filled ? "F" : "D"))) : (v = r.conics[a1], v.isshowing && !1 !== v.visible && (d = {}, d.color = v.color, d.alpha = v.alpha, d.size = v.size, E.drawconic(v.matrix, d)));
            for(a1 = 0; a1 < r.lines.length; a1++)a: if (v = r.lines[a1], v.isshowing && !1 !== v.visible && g._helper.isAlmostReal(v.homog)) {
                if ("S" === v.kind) d = {
                    overhang: v.overhang,
                    dashtype: v.dashtype,
                    size: v.size,
                    color: v.color,
                    alpha: v.alpha,
                    arrow: v.arrow,
                    arrowsize: v.arrowsize,
                    arrowposition: v.arrowposition,
                    arrowshape: v.arrowshape,
                    arrowsides: v.arrowsides
                }, 0 <= l.mult(v.startpos.value[2], l.conjugate(v.endpos.value[2])).value.real ? (q.draw$2([
                    v.startpos,
                    v.endpos
                ], d), v.labeled && !v.tmp && (d = v.printname || v.name || "S", f = g.scalmult(l.real(Math.sign(v.startpos.value[2].value.real) * Math.sign(v.endpos.value[2].value.real)), g.cross(v.startpos, v.endpos)), f = {
                    x: f.value[0].value.real,
                    y: f.value[1].value.real
                }, e = Math.sqrt(f.x * f.x + f.y * f.y), f = {
                    x: 8 * f.x / e - 3,
                    y: 8 * f.y / e - 3
                }, f = v.labelpos || f, e = y.makeColor(Aa.textColor), b = m._helper.midpoint(m._helper.midpoint(v.startpos, v.endpos), v.endpos), Ud(v, d, b, f, e))) : (y.handleModifs(d, y.lineModifs), y.drawRaySegment(v.startpos, v.endpos));
                else if ("end" === v.clip.value && "Join" === v.type) e = r.csnames[v.args[0]], d = r.csnames[v.args[1]], q.draw$2([
                    e.homog,
                    d.homog
                ], {
                    overhang: v.overhang,
                    dashtype: v.dashtype,
                    size: v.size,
                    color: v.color,
                    alpha: v.alpha
                });
                else {
                    if ("inci" === v.clip.value) {
                        e = [
                            1E6,
                            0
                        ];
                        d = [
                            -1000000,
                            0
                        ];
                        b = [
                            1E6,
                            0
                        ];
                        f = [
                            -1000000,
                            0
                        ];
                        for(c = 0; c < v.incidences.length; c++){
                            var h = r.csnames[v.incidences[c]].homog, k = h.value[0], fa = h.value[1], n = h.value[2];
                            l._helper.isAlmostZero(n) || (k = l.div(k, n), fa = l.div(fa, n), l._helper.isAlmostReal(k) && l._helper.isAlmostReal(fa) && (k.value.real < e[0] && (e = [
                                k.value.real,
                                h
                            ]), k.value.real > d[0] && (d = [
                                k.value.real,
                                h
                            ]), fa.value.real < b[0] && (b = [
                                fa.value.real,
                                h
                            ]), fa.value.real > f[0] && (f = [
                                fa.value.real,
                                h
                            ])));
                        }
                        d[0] - e[0] > f[0] - b[0] ? (e = e[1], d = d[1]) : (e = b[1], d = f[1]);
                        if (e !== d) {
                            q.draw$2([
                                e,
                                d
                            ], {
                                dashtype: v.dashtype,
                                size: v.size,
                                color: v.color,
                                alpha: v.alpha,
                                overhang: v.overhang
                            });
                            break a;
                        }
                    }
                    q.draw$1([
                        v.homog
                    ], {
                        dashtype: v.dashtype,
                        size: v.size,
                        color: v.color,
                        alpha: v.alpha
                    });
                }
            }
            for(a1 = 0; a1 < r.points.length; a1++)if (v = r.points[a1], v.isshowing && !1 !== v.visible && g._helper.isAlmostReal(v.homog) && (d = v.color, v.behavior && (d = v.color), q.draw$1([
                v.homog
            ], {
                size: v.size,
                color: d,
                alpha: v.alpha,
                noborder: v.noborder,
                border: v.border
            }), v.labeled && !v.tmp)) {
                f = v.printname || v.name || "P";
                e = v.labelpos || {
                    x: 3,
                    y: 3
                };
                b = y.makeColor(Aa.textColor);
                if (!0 === v.noborder.value || !1 === v.border.value) b = d;
                Ud(v, f, v.homog, e, b);
            }
            for(a1 = 0; a1 < r.texts.length; a1++)Sc(r.texts[a1]);
            if (r.ifs.length) {
                if (la.dirty || !u.deeplyEqual(la.mat, C.drawingstate.matrix)) m.IFS.updateParameters(), la.dirty = !1;
                la.img && z.drawImage(la.img, 0, 0, ma, pa);
            }
            z.restore();
        }
        function Z(a1, e) {
            a1 = window.event ? event : a1;
            a1 = a1.charCode ? a1.charCode : a1.keyCode;
            Cd = String.fromCharCode(a1);
            cd = a1;
            w(e);
            k();
        }
        function J(a1) {
            ab = a1;
            0 === a1 && (Eb[0] = Ma);
            w(V.multidown);
            ab = 0;
        }
        function Xb(a1) {
            ab = a1;
            w(V.multiup);
            delete Eb[a1];
            ab = 0;
        }
        function Ga(a1) {
            var e = a1.value;
            a1 = e[0].value;
            var b = e[1].value;
            e = e[2].value;
            return g.turnIntoCSList([
                a1[0],
                l.add(a1[1], b[0]),
                l.add(a1[2], e[0]),
                b[1],
                l.add(b[2], e[1]),
                e[2]
            ]);
        }
        function gd(a1) {
            var e = !0;
            return function(b, v) {
                e && (console.error("Operator " + a1 + " is not supported yet."), e = !1);
                return h;
            };
        }
        function da(a1, e) {
            if ("undefined" === typeof a1) return "_??_";
            if (null === a1) return "_???_";
            if ("undefined" === a1.ctype) return "___";
            if ("number" === a1.ctype) return l.niceprint(a1);
            if ("string" === a1.ctype || "boolean" === a1.ctype) return a1.value;
            if ("list" === a1.ctype) {
                e = "[";
                for(var b = 0; b < a1.value.length; b++)e += da(w(a1.value[b])), b !== a1.value.length - 1 && (e += ", ");
                return e + "]";
            }
            if ("JSON" === a1.ctype) try {
                return Ea.niceprint(a1, e);
            } catch (v) {
                return Ea._helper.handlePrintException(v);
            }
            return "dict" === a1.ctype ? nb.niceprint(a1) : "function" === a1.ctype ? "FUNCTION" : "infix" === a1.ctype ? "INFIX" : "modifier" === a1.ctype ? a1.key + "->" + da(a1.value) : "shape" === a1.ctype ? a1.type : "error" === a1.ctype ? "Error: " + a1.message : "variable" === a1.ctype ? da(L.getvar(a1.name)) : "geo" === a1.ctype ? a1.value.name : "image" === a1.ctype ? "IMAGE" : "_?_";
        }
        function Fb(a1, e) {
            e = "undefined" === a1[0].ctype;
            var b = "undefined" === a1[1].ctype, v = w(a1[1]);
            if (e || b) return h;
            "variable" === a1[0].ctype ? L.setvar(a1[0].name, v) : "infix" === a1[0].ctype ? "_" === a1[0].oper ? E.assigntake(a1[0], v) : sa("Can't use infix expression as lvalue") : "field" === a1[0].ctype ? E.assigndot(a1[0], v) : "userdata" === a1[0].ctype ? E.assigncolon(a1[0], v) : "function" === a1[0].ctype && "genList" === a1[0].oper ? "list" === v.ctype ? E.assignlist(a1[0].args, v.value) : sa("Expected list in rhs of assignment") : sa("Left hand side of assignment is not a recognized lvalue");
            return v;
        }
        function oc(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            if (e.ctype === a1.ctype) {
                if ("number" === e.ctype) return u.bool(e.value.real === a1.value.real && e.value.imag === a1.value.imag);
                if ("string" === e.ctype || "boolean" === e.ctype) return u.bool(e.value === a1.value);
                if ("list" === e.ctype) return g.equals(e, a1);
                if ("geo" === e.ctype) return u.bool(e.value === a1.value);
            }
            return {
                ctype: "boolean",
                value: !1
            };
        }
        function oa(a1, e) {
            return u.not(oc(a1, e));
        }
        function pc(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype ? {
                ctype: "boolean",
                value: l._helper.isAlmostEqual(e, a1)
            } : "string" === e.ctype && "string" === a1.ctype || "boolean" === e.ctype && "boolean" === a1.ctype ? {
                ctype: "boolean",
                value: e.value === a1.value
            } : "list" === e.ctype && "list" === a1.ctype ? g.almostequals(e, a1) : {
                ctype: "boolean",
                value: !1
            };
        }
        function Sa(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "boolean" === e.ctype && "boolean" === a1.ctype ? {
                ctype: "boolean",
                value: e.value && a1.value
            } : h;
        }
        function Ic(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "boolean" === e.ctype && "boolean" === a1.ctype ? {
                ctype: "boolean",
                value: e.value || a1.value
            } : h;
        }
        function Yb(a1, e) {
            e = a1[0];
            "void" !== e.ctype && (e = D(e));
            a1 = D(a1[1]);
            var b = u.add(e, a1);
            "Angle" === e.usage && "Angle" === a1.usage && (b = u.withUsage(b, "Angle"));
            return b;
        }
        function Hb(a1, e) {
            e = a1[0];
            "void" !== e.ctype && (e = D(e));
            a1 = D(a1[1]);
            var b = u.sub(e, a1);
            "Angle" === e.usage && "Angle" === a1.usage && (b = u.withUsage(b, "Angle"));
            return b;
        }
        function hd(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            var b = u.mult(e, a1);
            "Angle" !== e.usage || a1.usage ? "Angle" !== a1.usage || e.usage || (b = u.withUsage(b, "Angle")) : b = u.withUsage(b, "Angle");
            return b;
        }
        function Hd(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            "number" === a1.ctype && l._helper.isZero(a1) && sa("WARNING: Division by zero!");
            var b = u.div(e, a1);
            "Angle" !== e.usage || a1.usage ? "Angle" !== a1.usage || e.usage || (b = u.withUsage(b, "Angle")) : b = u.withUsage(b, "Angle");
            return b;
        }
        function Jc(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype ? l.pow(e, a1) : h;
        }
        function Da(a1, e) {
            e = Q(a1[0]);
            a1 = Q(a1[1]);
            if (e !== h && a1 !== h) {
                var b = g.cross(e, a1);
                "Point" === e.usage && "Point" === a1.usage && (b = u.withUsage(b, "Line"));
                "Line" === e.usage && "Line" === a1.usage && (b = u.withUsage(b, "Point"));
                return b;
            }
            return h;
        }
        function R(a1) {
            var e = a1.length;
            if (0 === e) return [];
            if (1 === e) return [
                0
            ];
            if (2 === e) return a1[0][0] + a1[1][1] <= a1[0][1] + a1[1][0] ? [
                0,
                1
            ] : [
                1,
                0
            ];
            if (4 < e) return qc(a1);
            for(var b = md[e], v = Number.POSITIVE_INFINITY, c = b[0], g = 0; g < b.length; ++g){
                for(var d = b[g], f = 0, h = 0; h < e; ++h)f += a1[h][d[h]];
                f < v && (v = f, c = d);
            }
            return c;
        }
        function qc(a1) {
            function e() {
                return {
                    matched: -1,
                    prev: -1,
                    start: -1,
                    cost: 0,
                    used: !1,
                    leaf: !1
                };
            }
            function b(a1) {
                for(var e = 0; e < g; ++e)0 < k[a1][e] || l[e].used || (l[e].used = !0, b(l[e].matched));
            }
            function v(a1) {
                for(var e = 0; e < g; ++e)0 < k[e][a1] || h[e].used || (h[e].used = !0, v(h[e].matched));
            }
            var c = Math.abs, g = a1.length, d, f, h = Array(g), l = Array(g), k = Array(g);
            for(d = 0; d < g; ++d)k[d] = Array(g);
            for(d = 0; d < g; ++d)for(h[d] = e(), l[d] = e(), h[d].cost = a1[d][0], f = 1; f < g; ++f)h[d].cost > a1[d][f] && (h[d].cost = a1[d][f]);
            for(;;){
                for(d = 0; d < g; ++d)for(f = 0; f < g; ++f)k[d][f] = a1[d][f] - h[d].cost - l[f].cost, k[d][f] < 1E-14 * (c(a1[d][f]) + c(h[d].cost) + c(l[f].cost)) && (k[d][f] = 0);
                for(d = 0; d < g; ++d)h[d].matched = l[d].matched = -1;
                for(var m = 0;;){
                    for(d = 0; d < g; ++d)h[d].used = h[d].leaf = l[d].used = l[d].leaf = !1, -1 === h[d].matched && (h[d].start = d, h[d].used = h[d].leaf = !0, h[d].prev = -1);
                    for(var n = !1, p = !1; !p;){
                        for(d = 0; d < g; ++d)if (h[d].leaf) {
                            for(h[d].leaf = !1, f = 0; f < g; ++f)if (!(l[f].used || 0 < k[d][f]) && h[d].matched !== f && (l[f].prev = d, l[f].start = h[d].start, l[f].used = l[f].leaf = !0, -1 === l[f].matched)) {
                                h[l[f].start].prev = f;
                                n = !0;
                                break;
                            }
                        }
                        if (n) break;
                        p = !0;
                        for(f = 0; f < g; ++f)l[f].leaf && (l[f].leaf = !1, d = l[f].matched, h[d].used || (h[d].prev = f, h[d].start = l[f].start, h[d].used = h[d].leaf = !0, p = !1));
                    }
                    if (!n) break;
                    for(n = 0; n < g; ++n)if (-1 === h[n].matched && -1 !== h[n].prev) {
                        f = h[n].prev;
                        do d = l[f].prev, l[f].matched = d, h[d].matched = f, f = h[d].prev;
                        while (d !== n);
                        ++m;
                    }
                }
                if (m === g) break;
                for(d = 0; d < g; ++d)h[d].used = h[d].leaf = l[d].used = l[d].leaf = !1;
                for(d = 0; d < g; ++d)-1 === h[d].matched && b(d);
                for(f = 0; f < g; ++f)-1 === l[f].matched && v(f);
                for(d = 0; d < g; ++d)-1 === h[d].matched || h[d].used || l[h[d].matched].used || (h[d].used = !0);
                m = Number.POSITIVE_INFINITY;
                for(d = 0; d < g; ++d)if (!h[d].used) for(f = 0; f < g; ++f)l[f].used || m > k[d][f] && (m = k[d][f]);
                for(d = 0; d < g; ++d)h[d].used || (h[d].cost += m), l[d].used && (l[d].cost -= m);
            }
            a1 = Array(g);
            for(d = 0; d < g; ++d)f = h[d].matched, a1[d] = f;
            return a1;
        }
        function eb(a1, e) {
            e = w(a1[0]);
            a1 = D(a1[1]);
            "string" !== e.ctype && "JSON" !== e.ctype && (e = g.asList(e));
            if ("JSON" !== e.ctype && "number" === a1.ctype) {
                a1 = Math.floor(a1.value.real);
                0 > a1 && (a1 = e.value.length + a1 + 1);
                if (0 < a1 && a1 < e.value.length + 1) return "list" === e.ctype ? e.value[a1 - 1] : {
                    ctype: "string",
                    value: e.value.charAt(a1 - 1)
                };
                sa("WARNING: Index out of range!");
                return h;
            }
            if ("JSON" === e.ctype) {
                a1 = da(a1);
                if (-1 !== da.errorTypes.indexOf(a1)) return h;
                e = e.value[a1];
                return void 0 !== e && e.ctype ? e : h;
            }
            if ("list" === a1.ctype) {
                for(var b = [], v = 0; v < a1.value.length; v++){
                    var c = D(a1.value[v]);
                    b[v] = eb([
                        e,
                        c
                    ], []);
                }
                return g.turnIntoCSList(b);
            }
            return h;
        }
        function Ib(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            if ("shape" === e.ctype && "shape" === a1.ctype) return E.shapeconcat(e, a1);
            e = g.asList(e);
            a1 = g.asList(a1);
            return "list" === e.ctype && "list" === a1.ctype ? g.concat(e, a1) : h;
        }
        function Kc(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === e.ctype && "list" === a1.ctype ? g.set(g.common(e, a1)) : "shape" === e.ctype && "shape" === a1.ctype ? E.shapecommon(e, a1) : h;
        }
        function Lc(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === e.ctype && "list" === a1.ctype ? g.remove(e, a1) : "shape" === e.ctype && "shape" === a1.ctype ? E.shaperemove(e, a1) : h;
        }
        function rb(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === e.ctype ? g.append(e, a1) : h;
        }
        function A(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === a1.ctype ? g.prepend(e, a1) : h;
        }
        function Zb(a1, e) {
            a1 |= 0;
            e |= 0;
            if (0 === a1 && 0 === e) return 0;
            for(; 0 !== e;){
                var b = a1;
                a1 = e;
                e = b % e | 0;
            }
            return a1;
        }
        function Id(a1) {
            return 1 === a1 ? 0 : 1;
        }
        function dc(a1, e, b) {
            var x = e * e - 4 * a1 * b;
            0 <= x ? (x = Math.sqrt(x), 0 < e && (x = -x), e = [
                [
                    x - e,
                    2 * a1
                ],
                [
                    2 * b,
                    x - e
                ]
            ]) : e = null;
            if (null === e) return null;
            a1 = e[0][0] / e[0][1];
            e = e[1][0] / e[1][1];
            return e < a1 ? [
                e,
                a1
            ] : [
                a1,
                e
            ];
        }
        function id(a1, e, b, v, c, d, g, f) {
            f = void 0 === f ? 0 : f;
            if (-1 !== e.indexOf("\n")) {
                var x = Infinity, N = -Infinity, h = Infinity, Y = -Infinity;
                e.split("\n").forEach(function(e) {
                    e = id(a1, e, b, v, c, d);
                    x > e.left && (x = e.left);
                    N < e.right && (N = e.right);
                    h > e.top && (h = e.top);
                    Y < e.bottom && (Y = e.bottom);
                    v += g;
                });
                return {
                    left: x,
                    right: N,
                    top: h,
                    bottom: Y
                };
            }
            var l = a1.measureText(e);
            f ? (a1.save(), a1.translate(b, v), a1.rotate(-f), a1.fillText(e, -l.width * c, 0), a1.restore()) : a1.fillText(e, b - l.width * c, v);
            return {
                left: b - l.width * c,
                right: b + l.width * (1 - c),
                top: v - .84 * d,
                bottom: v + .36 * d
            };
        }
        function Ya(a1) {
            return "image" === a1.ctype ? a1.value : "string" === a1.ctype && gb.hasOwnProperty(a1.value) ? gb[a1.value].value : null;
        }
        function Jb(a1, e, b, v, c) {
            var x = [];
            if (a1.readPixels) x = a1.readPixels(e, b, v, c);
            else {
                if (a1.img.getContext) {
                    var d = a1.img.getContext("2d");
                    var g = d.getImageData(e, b, v, c).data;
                } else try {
                    xd || (xd = document.createElement("canvas")), xd.width = v, xd.height = c, d = xd.getContext("2d"), d.drawImage(a1.img, e, b, v, c, 0, 0, v, c), g = d.getImageData(0, 0, v, c).data;
                } catch (fa) {
                    console.log(fa);
                }
                for(var N in g)x.push(g[N] / 255);
            }
            return x;
        }
        function jd(a1) {
            return a1.replace(/[^A-Za-z0-9 \u0080-\uffff]/ig, "\\$&");
        }
        function xa(a1, e, b) {
            var x = a1;
            e && (x = x + " at " + e.row + ":" + e.col);
            b && (x = x + ": ‘" + b + "’");
            x = Error(x);
            x.name = "CindyScriptParseError";
            x.description = a1;
            x.location = e;
            x.text = b;
            return x;
        }
        function $b(a1) {
            this.input = a1;
            this.re = new RegExp(Ke, "g");
            for(var e = [], b = a1.indexOf("\n") + 1; b;)e.push(b), b = a1.indexOf("\n", b) + 1;
            e.push(a1.length);
            this.bols = e;
            this.bol = this.pos = 0;
            this.line = 1;
        }
        function rc(a1) {
            var e = a1[a1.length - 2], b = a1[a1.length - 3], v = a1[a1.length - 1];
            if (b) {
                if (b.isSuperscript && e.precedence <= b.precedence) throw xa("Operator not allowed after superscript", e.start, e.text);
                if (v) {
                    if (!e.op.infix) throw xa("Operator may not be used infix", e.start, e.text);
                } else if (!e.op.postfix) throw xa("Operator may not be used postfix", e.start, e.text);
            } else if (v) {
                if (!e.op.prefix) throw xa("Operator may not be used prefix", e.start, e.text);
            } else if (!e.op.bare) throw xa("Operator without operands", e.start, e.text);
            e.ctype = "infix";
            e.oper = e.op.sym;
            e.args = [
                b,
                v
            ];
            a1.splice(a1.length - 3, 3, e);
        }
        function kd(a1, e, b, v) {
            a1.length & 1 || a1.push(null);
            for(b = Ua[b]; 3 <= a1.length && a1[a1.length - 2].precedence <= b.precedence;)rc(a1);
            a1.push({
                op: b,
                precedence: b.precedence + (b.rassoc ? 1 : 0),
                start: e.start,
                end: e.end,
                text: e.text,
                rawtext: e.rawtext
            });
            b = "";
            for(var x = e.text, c = 0; c < x.length; ++c)b += "0123456789+-".charAt(v.indexOf(x.charAt(c)));
            e.ctype = "number";
            e.value = {
                real: +b,
                imag: 0
            };
            a1.push(e);
            rc(a1);
        }
        function ld(a1, e) {
            var b = [], v = "}" === e;
            a: for(;;){
                var c = a1.next();
                switch(c.toktype){
                    case "OP":
                        var d = Ua[c.text];
                        "_" !== d.sym || !b.length || b.length & 1 || "OP" !== b[b.length - 1].toktype || ":=" !== b[b.length - 1].op.sym || (b.pop(), d = Ua[":=_"], c.text = d.sym);
                        c.op = d;
                        c.precedence = d.precedence;
                        for(b.length & 1 || b.push(null); 3 <= b.length && b[b.length - 2].precedence <= c.precedence;)rc(b);
                        d.rassoc && c.precedence++;
                        v && ":" === d.sym && (c.jsonatom = !0, c.precedence = Ua[","].precedence, v = !1);
                        "}" === e && "," === d.sym && 0 < b.length && b[b.length - 1].jsonatom && (v = !0);
                        b.push(c);
                        break;
                    case "ID":
                        c.ctype = "variable";
                        c.name = c.text;
                        if (b.length & 1) throw xa("Missing operator", c.start, c.text);
                        b.push(c);
                        break;
                    case "NUM":
                        c.ctype = "number";
                        c.value = {
                            real: +c.text,
                            imag: 0
                        };
                        if (b.length & 1) throw xa("Missing operator", c.start, c.text);
                        b.push(c);
                        break;
                    case "STR":
                        c.ctype = "string";
                        c.value = c.raw.substring(1, c.raw.length - 1);
                        if (b.length & 1) throw xa("Missing operator", c.start, c.text);
                        b.push(c);
                        break;
                    case "SUB":
                        kd(b, c, "_", "₀₁₂₃₄₅₆₇₈₉₊₋");
                        break;
                    case "SUP":
                        kd(b, c, "^", "⁰\xb9\xb2\xb3⁴⁵⁶⁷⁸⁹⁺⁻");
                        b[b.length - 1].isSuperscript = !0;
                        break;
                    case "BRA":
                        d = "[](){}||".indexOf(c.text);
                        if (c.text === e || d & 1) break a;
                        d = "[](){}||".charAt(d + 1);
                        var g = ld(a1, d), f = g.closedBy;
                        if (f.text !== d) throw xa("Opening " + c.text + " at " + c.start.row + ":" + c.start.col + " closed by " + (f.text || "EOF") + " at " + f.start.row + ":" + f.start.col);
                        f = c.text + f.text;
                        d = [];
                        if (g = g.expr) {
                            for(; g && "infix" === g.ctype && "," === g.oper;)d.push(g.args[0]), g = g.args[1];
                            d.push(g);
                        }
                        if (b.length & 1) {
                            if ("{}" === f) throw xa("{…} not yet defined for operators.", c.start);
                            g = b[b.length - 1];
                            if ("variable" !== g.ctype) throw xa("Function name must be an identifier", g.start);
                            if (2 < b.length && b[b.length - 2].precedence < Xc) throw xa("Function call in indexing construct must be enclosed in parentheses", c.start);
                            g.ctype = "function";
                            c = g.args = [];
                            f = g.modifs = {};
                            for(var h = 0; h < d.length; ++h){
                                var l = d[h];
                                if (l && "infix" === l.ctype && "->" === l.oper) {
                                    var k = l.args[0];
                                    if ("variable" !== k.ctype) throw xa("Modifier name must be an identifier", l.start);
                                    f[k.name] = l.args[1];
                                } else c.push(l);
                            }
                            g.oper = g.name.toLowerCase() + "$" + g.args.length;
                        } else if ("||" === f) {
                            if (1 === d.length) b.push({
                                ctype: "function",
                                oper: "abs_infix",
                                args: d,
                                modifs: {}
                            });
                            else if (2 === d.length) b.push({
                                ctype: "function",
                                oper: "dist_infix",
                                args: d,
                                modifs: {}
                            });
                            else throw xa("Don't support |…| with " + d.length + " arguments", c.start);
                        } else "{}" === f ? b.push({
                            ctype: "function",
                            oper: "genJSON",
                            args: d,
                            modifs: {}
                        }) : "[]" !== f && 1 === d.length ? b.push({
                            ctype: "paren",
                            args: d
                        }) : 0 === d.length ? b.push({
                            ctype: "list",
                            value: []
                        }) : b.push({
                            ctype: "function",
                            oper: "genList",
                            args: d,
                            modifs: {}
                        });
                        break;
                    case "EOF":
                        break a;
                }
            }
            for(b.length & 1 || b.push(null); 3 <= b.length;)rc(b);
            return {
                expr: b[0],
                closedBy: c
            };
        }
        function sc(a1) {
            this.usedFunctions = {};
            this.usedVariables = {};
        }
        function w(a1) {
            if (void 0 === a1) return h;
            if ("infix" === a1.ctype) return a1.impl(a1.args, {}, a1);
            if ("variable" === a1.ctype) return w(L.getvar(a1.name));
            if ("function" === a1.ctype) return Ed.push(a1), a1 = E.evaluate(a1.oper, a1.args, a1.modifs), Ed.pop(), a1;
            if ("void" === a1.ctype) return h;
            if ("field" === a1.ctype) {
                var e = w(a1.obj);
                return "geo" === e.ctype ? Ha.getField(e.value, a1.key) : "list" === e.ctype ? g.getField(e, a1.key) : "JSON" === e.ctype ? Ea.getField(e, a1.key) : h;
            }
            return "userdata" === a1.ctype ? (e = w(a1.obj), a1 = u.string(da(w(a1.key))), "_?_" === a1.value && (a1 = h), "geo" === e.ctype ? Ha.getuserData(e.value, a1) : "list" === e.ctype || "string" === e.ctype ? Ha.getuserData(e, a1) : h) : a1;
        }
        function D(a1) {
            a1 = w(a1);
            if ("geo" === a1.ctype) {
                var e = a1.value;
                if ("P" === e.kind) return Ha.getField(e, "xy");
                if ("V" === e.kind) return e.value;
            }
            return a1;
        }
        function Q(a1) {
            a1 = w(a1);
            if ("geo" === a1.ctype) {
                var e = a1.value;
                if ("P" === e.kind || "L" === e.kind) return Ha.getField(e, "homog");
            }
            return g._helper.isNumberVecN(a1, 3) ? a1 : g._helper.isNumberVecN(a1, 2) ? (e = g.turnIntoCSList([
                a1.value[0],
                a1.value[1],
                l.real(1)
            ]), a1.usage && (e = u.withUsage(e, a1.usage)), e) : h;
        }
        function lb(a1) {
            var e = new sc;
            e.usedFunctions = Sb;
            e.infixmap = S;
            a1 = e.parse(a1);
            for(var b in e.usedVariables)L.create(b);
            return a1;
        }
        function le(a1, e) {
            return {
                ctype: "infix",
                args: [],
                impl: function() {
                    Ed = [
                        {
                            oper: e
                        }
                    ];
                    var b = w(a1);
                    Ed = [];
                    return b;
                }
            };
        }
        function sa(a1) {
            Qa.err(a1 + Ed.map(function(a1) {
                return "\n  at " + a1.oper;
            }).join("\n"));
        }
        function Jd() {
            this._path = [];
            this._defs = [
                "<defs>"
            ];
            this._imgcache = [];
            this._body = [];
            this._saveStack = [
                ""
            ];
            this._clipIndex = 0;
            this._stroke = this._fill = "#000";
            this._strokeOpacity = this._fillOpacity = null;
            this.height = this.width = 0;
            this.lineWidth = 1;
            this.lineCap = "butt";
            this.lineJoin = "miter";
            this.miterLimit = 10;
            this.globalAlpha = 1;
        }
        function Kb() {
            this._body = [];
            this._yPos = this._xPos = NaN;
            this._extGState = {
                Af255: "<< /ca 1 >>",
                As255: "<< /CA 1 >>"
            };
            this._objects = [
                [
                    "%PDF-1.4\n"
                ]
            ];
            this._offset = this._objects[0][0].length;
            this._nextIndex = 5;
            this._imgcache = [];
            this._xobjects = {};
            this._pathUsed = -1;
            this._fillAlpha = this._strokeAlpha = this._globalAlpha = 1;
            this.height = this.width = 0;
            this.lineWidth = 1;
            this.lineCap = "butt";
            this.lineJoin = "miter";
            this.miterLimit = 10;
        }
        function Kd(a1, e) {
            var b = a1.width, v = a1.height, c = document.createElement("canvas");
            c.setAttribute("width", b);
            c.setAttribute("height", v);
            c.setAttribute("style", "display:none;");
            var d = La.canvas;
            d.parentNode.insertBefore(c, d.nextSibling);
            try {
                return c.getContext("2d").drawImage(a1, 0, 0, b, v), c.toDataURL(e || "image/png");
            } finally{
                c.parentNode.removeChild(c);
            }
        }
        function me(a1) {
            a1 = a1.replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/]+/g, "");
            var e = new Uint8Array(3 * a1.length >> 2), b, v;
            for(v = b = 0; b + 3 < a1.length; b += 4){
                var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b));
                var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b + 1));
                var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b + 2));
                var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b + 3));
                e[v++] = c << 2 | d >> 4;
                e[v++] = d << 4 | g >> 2;
                e[v++] = g << 6 | f;
            }
            switch(a1.length - b){
                case 0:
                    break;
                case 2:
                    c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b));
                    d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b + 1));
                    e[v++] = c << 2 | d >> 4;
                    break;
                case 3:
                    c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b));
                    d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b + 1));
                    g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a1.charAt(b + 2));
                    e[v++] = c << 2 | d >> 4;
                    e[v++] = d << 4 | g >> 2;
                    break;
                default:
                    throw Error("Malformed Base64 input: " + (a1.length - b) + " chars left: " + a1.substr(b));
            }
            if (v !== e.length) throw Error("Failed assertion: " + v + " should be " + e.length);
            return e;
        }
        function ne(a1) {
            function e(e) {
                return (a1[e] << 24 | a1[e + 1] << 16 | a1[e + 2] << 8 | a1[e + 3]) >>> 0;
            }
            if (57 > a1.length) throw Error("Too short to be a PNG file");
            if (2303741511 !== e(0) || 218765834 !== e(4)) throw Error("PNG signature missing");
            for(var b = [], v = 8; v < a1.length;){
                if (v + 12 > a1.length) throw Error("Incomplete chunk at offset 0x" + v.toString(16));
                var c = e(v);
                if (2147483648 <= c) throw Error("Chunk too long");
                var d = v + 12 + c;
                if (d > a1.length) throw Error("Incomplete chunk at offset 0x" + v.toString(16));
                var g = a1.subarray(v + 4, v + 8);
                g = String.fromCharCode.apply(String, g);
                b.push({
                    len: c,
                    type: g,
                    data: a1.subarray(v + 8, v + 8 + c),
                    crc: e(v + 8 + c)
                });
                v = d;
            }
            return b;
        }
        function tc(a1, e) {
            var b;
            if (b = /^rgba\(([0-9.]+), *([0-9.]+), *([0-9.]+), *([0-9.]+)\)$/.exec(a1)) e(+b[1], +b[2], +b[3], +b[4]);
            else if (b = /^rgb\(([0-9.]+), *([0-9.]+), *([0-9.]+)\)$/.exec(a1)) e(+b[1], +b[2], +b[3], 1);
            else throw Error("Can't handle color style " + a1);
        }
        function Ld(a1) {
            var e = 1;
            Object.keys(gb).forEach(function(b) {
                var x = gb[b].value.img;
                if (void 0 === x.cachedDataURL && x.src) {
                    if ("data:" === x.src.substr(0, 5)) x.cachedDataURL = x.src;
                    else {
                        ++e;
                        x.cachedDataURL = null;
                        var c = new XMLHttpRequest;
                        c.responseType = "blob";
                        c.onreadystatechange = function() {
                            if (c.readyState === XMLHttpRequest.DONE) {
                                if (200 === c.status) {
                                    var b = new FileReader;
                                    b.onloadend = function() {
                                        x.cachedDataURL = b.result;
                                        console.log("Cached data for image " + x.src);
                                        0 === --e && a1();
                                    };
                                    b.readAsDataURL(c.response);
                                } else console.error("Failed to load " + x.src + ": " + c.statusText), 0 === --e && a1();
                            }
                        };
                        c.open("GET", x.src, !0);
                        c.send();
                    }
                }
            });
            0 === --e && a1();
        }
        function Lb(a1, e, b) {
            for(b || (b = "0"); a1.length < e;)a1 = b + a1;
            return a1;
        }
        function Mb() {
            null !== Fd && (window.URL.revokeObjectURL(Fd), Fd = null);
        }
        function Mc(a1) {
            Ld(function() {
                var e = z;
                try {
                    z = new a1;
                    z.width = ma;
                    z.height = pa;
                    ca();
                    var b = z.toBlob();
                    Fd = window.URL.createObjectURL(b);
                    Me(Fd);
                } finally{
                    z = e;
                }
            });
        }
        function Nb(a1) {
            var e = null, b = 1E6;
            console.log("getElementAtMouse");
            for(var v = 0; v < r.gslp.length; v++){
                var c = r.gslp[v];
                if (!c.pinned && !1 !== c.visible && !0 !== c.tmp) {
                    var d = C.drawingstate.matrix.sdet;
                    if ("P" === c.kind) {
                        var f = g.normalizeZ(c.homog);
                        if (!g._helper.isAlmostReal(f)) continue;
                        var h = f.value[0].value.real - a1.x;
                        var k = f.value[1].value.real - a1.y;
                        var m = Math.sqrt(h * h + k * k);
                        c.narrow & m > 20 / d && (m = 1E4);
                    } else if ("C" === c.kind) k = r.csnames[c.args[0]], m = 0, "undefined" !== typeof c.radius && (m = c.radius.value.real), h = l.div(k.homog.value[0], k.homog.value[2]).value.real, k = l.div(k.homog.value[1], k.homog.value[2]).value.real, h -= a1.x, k -= a1.y, m = Math.sqrt(h * h + k * k) - m, k = h = 0, 0 > m && (m = -m), m += 30 / d;
                    else if ("L" === c.kind || "S" === c.kind) h = c.homog, m = l, k = m.add(m.mult(h.value[0], m.conjugate(h.value[0])), m.mult(h.value[1], m.conjugate(h.value[1]))), k = g.scaldiv(m.sqrt(k), h), m = k.value[0].value.real * a1.x + k.value[1].value.real * a1.y + k.value[2].value.real, h = k.value[0].value.real * m, k = k.value[1].value.real * m, 0 > m && (m = -m), m += 1;
                    if (m < b + .2 / d) {
                        b = m;
                        e = c;
                        var n = {
                            x: h,
                            y: k
                        };
                    }
                }
            }
            return null === e ? null : {
                mover: e,
                offset: n,
                prev: {
                    x: a1.x,
                    y: a1.y
                }
            };
        }
        function Pa() {
            return "P" + Ye++;
        }
        function Ob(a1) {
            var e = H[De].actions;
            e[dd].event === a1 && e[dd].do() && (k(), dd === e.length - 1 ? (ib = [], dd = Vb = 0) : dd++);
        }
        function nd(a1) {
            return a1 && .5 > Math.abs(a1.offset.x) && .5 > Math.abs(a1.offset.y) && !a1.mover.tmp;
        }
        function Md(a1) {
            return nd(a1) && "P" === a1.mover.kind;
        }
        function Nd(a1) {
            return nd(a1) && ("L" === a1.mover.kind || "S" === a1.mover.kind);
        }
        function Pc(a1) {
            ya = {
                mover: a1,
                offset: {
                    x: 0,
                    y: 0
                },
                prev: {
                    x: ja.x,
                    y: ja.y
                }
            };
        }
        function ac() {
            var a1 = Nb(ja);
            Md(a1) ? ib[Vb] = a1.mover : (ib[Vb] = {
                type: "Free",
                name: Pa(),
                labeled: !0,
                pos: [
                    Ma[0],
                    Ma[1],
                    1
                ]
            }, Za(ib[Vb]));
            Vb++;
        }
        function Pb() {
            var a1 = Nb(ja);
            return Nd(a1) ? (ib[Vb] = a1.mover, Vb++, !0) : !1;
        }
        function Od() {
            var a1 = Nb(ja), e;
            (e = Nd(a1)) || (e = nd(a1) && "C" === a1.mover.kind);
            return e ? (ib[Vb] = a1.mover, Vb++, !0) : !1;
        }
        function ec() {
            var a1 = Nb(ja);
            if (Md(a1)) for(Gd.args[1] = a1.mover.name, a1 = 0; a1 < r.gslp.length; a1++){
                var e = r.gslp[a1];
                !0 === e.tmp && Rc(e.name);
            }
            else for(a1 = 0; a1 < r.gslp.length; a1++)e = r.gslp[a1], !0 === e.tmp && (e.tmp = !1);
        }
        function Qc(a1) {
            var e = {
                type: "Free",
                name: Pa(),
                labeled: !0,
                pos: [
                    Ma[0],
                    Ma[1],
                    1
                ],
                tmp: !0
            };
            e = Za(e);
            Gd = Za({
                type: a1,
                name: Pa(),
                labeled: !0,
                args: [
                    ib[0].name,
                    e.name
                ]
            });
            Pc(e);
        }
        function oe(a1) {
            for(var e in a1)null !== a1[e] && (Aa[e] = a1[e]);
        }
        function pe(a1) {
            Object.keys(m).forEach(function(a1) {
                var e = m[a1];
                Cb(e.signature || "_helper" === a1, a1 + " has no signature");
                void 0 !== e.updatePosition && void 0 === e.stateSize && (e.stateSize = 0);
            });
            r.gslp = [];
            r.csnames = {};
            r.points = [];
            r.lines = [];
            r.conics = [];
            r.texts = [];
            r.free = [];
            r.polygons = [];
            r.ifs = [];
            r.sets = {
                points: [],
                lines: [],
                conics: []
            };
            a1.forEach(od);
            de();
        }
        function Pd(a1) {
            "undefined" === typeof a1.tracedim && (a1.tracedim = 1);
            "undefined" === typeof a1.tracelength && (a1.tracelength = 100);
            "undefined" === typeof a1.traceskip && (a1.traceskip = 1);
            a1._traces = Array(a1.tracelength);
            a1._traces_index = 0;
            a1._traces_tick = 0;
        }
        function Qd(a1) {
            void 0 === a1.size && (a1.size = Aa.pointSize);
            a1.size = l.real(a1.size);
            !a1.movable || a1.pinned ? (a1.color = g.realVector(a1.color || Aa.pointColor), a1.color = g.scalmult(l.real(Aa.dimDependent), a1.color)) : a1.color = g.realVector(a1.color || Aa.pointColor);
            void 0 === a1.alpha && (a1.alpha = Aa.alpha);
            a1.alpha = l.real(a1.alpha);
            "boolean" !== typeof a1.noborder && (a1.noborder = Aa.noborder);
            a1.noborder = u.bool(a1.noborder);
            "boolean" !== typeof a1.border && (a1.border = !Aa.noborder);
            a1.border = u.bool(a1.border);
            a1.drawtrace && Pd(a1);
        }
        function fc(a1) {
            void 0 === a1.size && (a1.size = Aa.lineSize);
            a1.size = l.real(a1.size);
            a1.color = g.realVector(a1.color || Aa.lineColor);
            void 0 === a1.alpha && (a1.alpha = Aa.alpha);
            a1.alpha = l.real(a1.alpha);
            a1.clip = u.string(a1.clip || Aa.clip);
            void 0 === a1.overhang && (a1.overhang = Aa.overhangLine);
            a1.overhang = l.real(a1.overhang);
            a1.dashtype && (a1.dashtype = u.wrap(a1.dashtype));
        }
        function Rd(a1) {
            void 0 === a1.overhang && (a1.overhang = Aa.overhangSeg);
            a1.arrow && (a1.arrow = u.bool(a1.arrow));
            a1.arrowsize && (a1.arrowsize = l.real(a1.arrowsize));
            a1.arrowposition && (a1.arrowposition = l.real(a1.arrowposition));
            a1.arrowshape && (a1.arrowshape = u.string(a1.arrowshape));
            a1.arrowsides && (a1.arrowsides = u.string(a1.arrowsides));
            fc(a1);
            a1.clip = u.string("end");
        }
        function Sd(a1) {
            a1.size = void 0 !== a1.textsize ? a1.textsize : void 0 !== a1.size ? a1.size : Aa.textsize;
            a1.size = l.real(+a1.size);
        }
        function vb(a1) {
            a1.filled = void 0 !== a1.filled ? u.bool(a1.filled) : u.bool(!0);
            a1.fillcolor = void 0 === a1.fillcolor ? h : g.realVector(a1.fillcolor);
            void 0 === a1.fillalpha && (a1.fillalpha = 0);
            a1.fillalpha = l.real(a1.fillalpha);
            fc(a1);
        }
        function Za(a1, e) {
            a1 = od(a1);
            de();
            return "boolean" === typeof e && e && a1.Duplicate ? (e = a1.Duplicate, console.log("duplication detected: removing " + a1.name + " (type " + a1.kind + ") (duplicate of " + e.name + ")."), Rc(a1.name), e) : a1;
        }
        function od(a1) {
            if (void 0 !== r.csnames[a1.name]) {
                console.log("Element name '" + a1.name + "' already exists");
                var e = r.csnames[a1.name];
                m[e.type].isMovable && "P" === m[e.type].kind && Ta(e, a1.pos, "homog");
                return e;
            }
            for(; ed.hasOwnProperty(a1.type);)a1.type = ed[a1.type];
            if (e = Ee[a1.type]) {
                var b = e(a1), v = null;
                for(e = 0; e < b.length; ++e)v = Za(b[e]);
                return v;
            }
            var c = m[a1.type];
            b = !1;
            if (!c) return console.error(a1), console.error("Operation " + a1.type + " not implemented yet"), null;
            if ("**" !== c.signature) {
                if (!Array.isArray(c.signature) && "*" === c.signature.charAt(1)) b = !0, a1.args.forEach(function(e) {
                    if (r.csnames[e].kind !== c.signature.charAt(0)) return console.error("Not all elements in set are of same type: " + a1.name + " expects " + c.signature + " but " + e + " is of kind " + r.csnames[e].kind), "undefined" !== typeof window && window.alert("Not all elements in set are of same type: " + a1.name), null;
                });
                else if (c.signature.length !== (a1.args ? a1.args.length : 0)) return console.error("Wrong number of arguments for " + a1.name + " of type " + a1.type), "undefined" !== typeof window && window.alert("Wrong number of arguments for " + a1.name), null;
            }
            if (a1.args) for(e = 0; e < a1.args.length; ++e){
                if (!r.csnames.hasOwnProperty(a1.args[e])) return console.log("Dropping " + a1.name + " due to missing argument " + a1.args[e]), null;
                if ("**" !== c.signature && !b && (v = r.csnames[a1.args[e]].kind, c.signature[e] !== v && ("S" !== v || "L" !== c.signature[e]))) return window.alert("Wrong argument kind " + v + " as argument " + e + " to element " + a1.name + " of type " + a1.type), null;
            }
            c.signatureConstraints && !c.signatureConstraints(a1) && window.alert("signature constraints violated for element " + a1.name);
            r.gslp.push(a1);
            r.csnames[a1.name] = a1;
            e = ob.length;
            a1.kind = c.kind;
            a1.stateIdx = e;
            e += c.stateSize;
            a1.incidences = [];
            a1.isshowing = !0;
            a1.movable = !1;
            c.isMovable && (a1.movable = !0, r.free.push(a1));
            "P" === a1.kind && (r.points.push(a1), Qd(a1));
            "L" === a1.kind && (r.lines.push(a1), fc(a1));
            "C" === a1.kind && (r.conics.push(a1), fc(a1));
            "S" === a1.kind && (r.lines.push(a1), Rd(a1));
            "Text" === a1.kind && (r.texts.push(a1), Sd(a1));
            "Poly" === a1.kind && (r.polygons.push(a1), vb(a1));
            "IFS" === a1.kind && r.ifs.push(a1);
            /^[P|L|S|C]s$/.test(a1.kind) && r.sets[({
                P: "points",
                L: "lines",
                S: "lines",
                C: "conics"
            })[a1.kind[0]]].push(a1);
            Tc(e);
            Ja = yb = ob;
            lc = !0;
            c.initialize && (jb = pb = a1.stateIdx, a1.param = c.initialize(a1), Cb(pb === a1.stateIdx + c.stateSize, "State fully initialized"));
            jb = pb = a1.stateIdx;
            c.updatePosition(a1, !1);
            Cb(jb === a1.stateIdx + c.stateSize, "State fully consumed");
            Cb(pb === a1.stateIdx + c.stateSize, "State fully updated");
            lc = !1;
            Ja = Ub.in;
            Ja.set(ob);
            yb = Ub.out;
            pd(a1, c);
            je = {};
            try {
                qa(a1), Qb(a1);
            } catch (Y) {
                console.error(Y);
            }
            return r.csnames[a1.name];
        }
        function Rc(a1) {
            if (r.csnames.hasOwnProperty(a1)) {
                var e = {};
                Object.keys(r.csnames).forEach(function(a1) {
                    var b = r.csnames[a1];
                    b.hasOwnProperty("args") && b.args.forEach(function(b) {
                        e.hasOwnProperty(b) || (e[b] = {});
                        e[b][a1] = !0;
                    });
                });
                var b = function(a1, x) {
                    x[a1] = !0;
                    if (!e.hasOwnProperty(a1)) return x;
                    for(var c in e[a1])x[c] || b(c, x);
                    return x;
                };
                a1 = b(a1, {});
                qe(a1);
            } else console.log("removeElement: name " + a1 + "does not exist.");
        }
        function qe(a1) {
            var e = Object.keys(a1), b = function(a1, e) {
                return function(e) {
                    return a1[e.name] ? !1 : !0;
                };
            }, c = {};
            e.forEach(function(e) {
                r.csnames[e].incidences.forEach(function(e) {
                    c[e] || (r.csnames[e].incidences = r.csnames[e].incidences.filter(function(e) {
                        return !a1[e];
                    }), c[e] = !0);
                });
            });
            "conics free gslp ifs lines points polygons texts".split(" ").map(function(e) {
                r[e] = r[e].filter(b(a1, e));
            });
            for(var d in r.sets)r.sets[d] = r.sets[d].filter(b(a1, "set of " + d));
            e.forEach(function(a1) {
                delete r.csnames[a1];
            });
            je = {};
        }
        function Td(a1, e) {
            var b = r.csnames[e.args[0]].homog, c = r.csnames[e.args[1]].homog;
            e = a1.homog;
            a1 = l.div(b.value[0], b.value[2]);
            b = l.div(b.value[1], b.value[2]);
            var d = l.div(c.value[0], c.value[2]);
            c = l.div(c.value[1], c.value[2]);
            var g = l.div(e.value[0], e.value[2]);
            e = l.div(e.value[1], e.value[2]);
            return l._helper.isAlmostReal(a1) && l._helper.isAlmostReal(b) && l._helper.isAlmostReal(d) && l._helper.isAlmostReal(c) && l._helper.isAlmostReal(g) && l._helper.isAlmostReal(e) ? (a1 = a1.value.real, b = b.value.real, d = d.value.real, c = c.value.real, g = g.value.real, e = e.value.real, a1 = Math.sqrt((a1 - d) * (a1 - d) + (b - c) * (b - c)) - Math.sqrt((a1 - g) * (a1 - g) + (b - e) * (b - e)) - Math.sqrt((d - g) * (d - g) + (c - e) * (c - e)), 1E-15 > a1 * a1) : !1;
        }
        function pd(a1, e) {
            a1.isshowing = !0;
            if (a1.args) {
                for(var b = 0; b < a1.args.length; b++)if (!r.csnames[a1.args[b]].isshowing) {
                    a1.isshowing = !1;
                    return;
                }
            }
            e.visiblecheck && e.visiblecheck(a1);
        }
        function Ud(a1, e, b, c, d) {
            var x = a1.textsize || Aa.textsize, v = !0 === a1.textbold, g = !0 === a1.textitalics, f = a1.text_fontfamily || Aa.fontFamily, N = c.x * c.x + c.y * c.y, h = 1;
            0 < N && (h = 1 + a1.size.value.real / Math.sqrt(N));
            a1 = a1.alpha || l.real(Aa.alpha);
            E.drawtext([
                b,
                u.wrap(e)
            ], {
                x_offset: u.wrap(h * c.x),
                y_offset: u.wrap(h * c.y),
                size: u.wrap(x),
                bold: u.wrap(v),
                italics: u.wrap(g),
                family: u.wrap(f),
                color: d,
                alpha: a1
            });
        }
        function Sc(a1) {
            a1._bbox = null;
            if (a1.isshowing && !1 !== a1.visible) {
                var e = {
                    size: a1.size
                }, b = a1.homog, c = a1.text, d = m[a1.type].getText;
                c = d ? d(a1) : c.replace(/@[$#]"([^"\\]|\\.)*"/g, function(a1) {
                    try {
                        var e = JSON.parse(a1.substring(2));
                        var b = r.csnames[e];
                        if (!b) return "?";
                    } catch (cf) {
                        return "?";
                    }
                    switch(a1.charAt(1)){
                        case "$":
                            return b.printname || e;
                        case "#":
                            return "V" !== b.kind ? "?" : da(b.value);
                    }
                });
                d = null;
                if (a1.html) {
                    var g = a1._textCache || {
                        text: !1
                    }, f = a1.html, h = f.parentNode, l = h.parentNode;
                    d = function(e, b, x, c, v) {
                        b /= wa;
                        x /= wa;
                        v = y.bold + y.italics + Math.round(v / wa * 10) / 10 + "px " + y.family;
                        g.invisible && l.style.removeProperty("display");
                        if (e !== g.text || v !== g.font || b !== g.x || x !== g.y || c !== g.align) {
                            v !== g.font && (f.style.font = v, f.style.lineHeight = Aa.lineHeight);
                            e !== g.text && !1 !== e && !1 === Je(f, e, v) && (e = !1);
                            l.style.left = b + "px";
                            l.style.top = x + "px";
                            if (c || h.style.transform) h.style.transform = "translateX(" + -100 * c + "%)";
                            a1._textCache = {
                                text: e,
                                font: v,
                                x: b,
                                y: x,
                                align: c
                            };
                        }
                    };
                }
                c = u.string(c);
                a1.dock && (a1.dock.to ? b = r.csnames[a1.dock.to].homog : Ne.hasOwnProperty(a1.dock.corner) && (b = q.screenbounds$0([], {}), b = b.value[Ne[a1.dock.corner]]), e.offset = a1.dock.offset);
                a1.align && (e.align = u.string(a1.align));
                b && (a1._bbox = E.drawtext([
                    b,
                    c
                ], e, d));
            } else a1.html && (a1.html.parentNode.parentNode.style.display = "none", a1._textCache = {
                invisible: !0
            });
        }
        function Vd() {
            function a1() {
                var a1 = (h++) / b._traces.length, e = b._traces[f];
                e && (a1 *= c * a1 * a1, q.draw$1([
                    e
                ], {
                    size: l.real(d),
                    color: b.color,
                    alpha: l.real(a1)
                }));
                d *= g;
            }
            for(var e = 0; e < r.points.length; e++){
                var b = r.points[e];
                if (b.drawtrace) {
                    b._traces_tick === b.traceskip ? (b._traces[b._traces_index] = b.homog, b._traces_index = (b._traces_index + 1) % b._traces.length, b._traces_tick = 0) : b._traces_tick++;
                    var c = b.alpha.value.real, d = b.size.value.real, g = 1;
                    1 !== b.tracedim && (d *= b.tracedim, g = Math.pow(b.tracedim, -1 / b._traces.length));
                    var f, h = 0;
                    for(f = b._traces_index; f < b._traces.length; ++f)a1();
                    for(f = 0; f < b._traces_index; ++f)a1();
                }
            }
        }
        function Cb(a1, e) {
            e = "Assertion failed: " + e;
            if (!a1) throw console.log(e), Ab(), "undefined" !== typeof alert && alert(e), Error(e);
        }
        function Tc(a1) {
            if (a1 !== ob.length) {
                var e, b = Fe.length;
                if (mc.length < a1 * b) {
                    var c = 2 * a1;
                    mc = new Float64Array(b * c);
                } else c = mc.length / b | 0;
                for(e = 0; e < b; ++e)Ub[Fe[e]] = mc.subarray(e * c, e * c + a1);
                a1 = ob;
                Ja = Ub.in;
                yb = Ub.out;
                ob = Ub.good;
                ob.set(a1);
            }
        }
        function gc() {
            ob.set(Ja);
            sb = !1;
            $d(!1);
            for(var a1 = ob.length, e = Math.abs, b = 0; b < a1; b += 2)e(ob[b]) > 1E12 * e(ob[b + 1]) && (ob[b + 1] = 0);
        }
        function uc() {
            if (fd) sb = !0;
            else throw Oe;
        }
        function Wd(a1, e, b, c, d) {
            return u.add(c, u.mult(b, u.sub(d, c)));
        }
        function Xd() {
            P && (P.currentMouseAndScripts = []);
            Ge = !0;
            if (ya) {
                var a1 = ya.mover, e = g.realVector([
                    ja.x + ya.offset.x,
                    ja.y + ya.offset.y,
                    1
                ]);
                Yd(a1, e, "mouse");
                ya.prev.x = ja.x;
                ya.prev.y = ja.y;
            }
            w(V.move);
            w(V.draw);
            sb || gc();
            Ge = !1;
            P && (P.fullLog.push(g.turnIntoCSList([
                g.turnIntoCSList(P.currentMouseAndScripts)
            ])), P.length > P.logLength && P.splice(0, P.length - P.logLength), P.currentMouseAndScripts = null, P.postMouseHooks.forEach(function(a1) {
                a1();
            }));
        }
        function Ta(a1, e, b) {
            Yd(a1, e, b);
            Ge || sb || gc();
        }
        function Yd(a1, e, b) {
            P && P.currentMouseAndScripts && (P.currentMover = []);
            a1 === Pe ? (Ja.set(ob), sb = !1) : (Pe = a1, gc());
            yb.set(Ja);
            var x = 1E4;
            var c = je[a1.name];
            if (!c) {
                var d = {}, f = 0;
                c = [];
                d[a1.name] = a1;
                for(var h = r.gslp, k = 0; k < h.length; ++k){
                    var n = h[k], na = n.args;
                    if (na) for(var p = 0; p < na.length; ++p)d.hasOwnProperty(na[p]) && (d[n.name] = n, c[f++] = n);
                }
                je[a1.name] = c;
            }
            d = -1;
            f = .9;
            var q;
            h = m[a1.type];
            k = h.parameterPath || Wd;
            jb = a1.stateIdx;
            n = h.getParamFromState(a1);
            jb = pb = a1.stateIdx;
            na = h.getParamForInput(a1, e, b);
            for(p = d + f; d !== p;){
                var t = p * p, w = .5 / (1 + t);
                w = l.complex(2 * p * w + .5, (1 - t) * w);
                fd = d + .5 * f <= d || 0 === x;
                0 === x && console.log("tracing limit Reached");
                t = !1;
                P && P.currentMouseAndScripts && (P.currentStep = []);
                try {
                    jb = pb = a1.stateIdx;
                    var y = k(a1, p, w, n, na);
                    P && (P.currentParam = y);
                    w = yb;
                    yb = Ja;
                    h.putParamToState(a1, y);
                    yb = w;
                    pb = a1.stateIdx;
                    P && (P.currentElement = a1);
                    h.updatePosition(a1, !0);
                    Cb(jb === a1.stateIdx + h.stateSize, "State fully consumed");
                    Cb(pb === a1.stateIdx + h.stateSize, "State fully updated");
                    for(q = 0; q < c.length; ++q){
                        var z = c[q];
                        var C = m[z.type];
                        jb = pb = z.stateIdx;
                        P && (P.currentElement = z);
                        C.updatePosition(z, !1);
                        Cb(jb === z.stateIdx + C.stateSize, "State fully consumed");
                        Cb(pb === z.stateIdx + C.stateSize, "State fully updated");
                    }
                    P && (P.currentElement = null);
                    d = p;
                    f *= 1.25;
                    p += f;
                    1 <= p && (p = 1);
                    yb = Ja;
                    Ja = w;
                } catch (Le) {
                    if (Le !== Oe) throw Le;
                    f *= .5;
                    p = d + f;
                    --x;
                    t = !0;
                }
                P && P.currentMouseAndScripts && (P.currentMover.push(g.turnIntoCSList([
                    g.turnIntoCSList(P.currentStep),
                    u.wrap(t),
                    u.wrap(d),
                    u.wrap(p),
                    u.wrap(P.currentParam)
                ])), P.currentStep = null, P.currentParam = null);
            }
            $d(sb);
            for(q = 0; q < c.length; ++q)z = c[q], C = m[z.type], pd(z, C);
            P && P.currentMouseAndScripts && (P.currentMouseAndScripts.push(g.turnIntoCSList([
                g.turnIntoCSList(P.currentMover),
                u.wrap(sb),
                u.wrap(a1.name),
                e,
                u.wrap(b),
                n,
                na
            ])), P.currentMover = null);
        }
        function Zd() {
            gc();
            fd = !0;
            for(var a1 = r.gslp, e = 0; e < a1.length; e++){
                var b = a1[e], c = m[b.type];
                jb = pb = b.stateIdx;
                c.updatePosition(b, !1);
                pd(b, c);
            }
            a1 = yb;
            yb = Ja;
            Ja = a1;
            gc();
        }
        function $d(a1) {
            var e = d.tracingStateReport;
            "string" === typeof e && (document.getElementById(e).textContent = a1 ? "BAD" : "GOOD");
        }
        function ae() {
            return g.turnIntoCSList(P.fullLog.slice());
        }
        function re(a1) {
            var e = JSON.stringify(P.fullLog);
            a1 = new Blob([
                e
            ], {
                type: a1 ? "application/octet-stream" : "application/json"
            });
            return window.URL.createObjectURL(a1);
        }
        function hc() {
            var a1 = jb;
            jb += 2;
            return l.complex(Ja[a1], Ja[a1 + 1]);
        }
        function ha(a1) {
            for(var e = Array(a1), b = 0; b < a1; ++b)e[b] = hc();
            return g.turnIntoCSList(e);
        }
        function wb(a1) {
            yb[pb] = a1.value.real;
            yb[pb + 1] = a1.value.imag;
            pb += 2;
        }
        function ea(a1) {
            for(var e = 0, b = a1.value.length; e < b; ++e)wb(a1.value[e]);
        }
        function mb(a1, e) {
            var b = ha(3), c = ha(3);
            a1 = qd(a1, e, b, c);
            ea(a1[0]);
            ea(a1[1]);
            return g.turnIntoCSList(a1);
        }
        function qd(a1, e, b, c) {
            if (lc) return [
                a1,
                e
            ];
            var x = g.projectiveDistMinScal(b, a1), v = g.projectiveDistMinScal(b, e), d = g.projectiveDistMinScal(c, a1), f = g.projectiveDistMinScal(c, e), l = g.projectiveDistMinScal(b, c), k = g.projectiveDistMinScal(a1, e), m = x + f, n = v + d;
            if (m > n) {
                var p = [
                    e,
                    a1
                ];
                m = n;
            } else p = [
                a1,
                e
            ];
            n = function() {};
            if (P && P.currentStep) {
                var q = [
                    P.labelTracing2,
                    u.wrap(P.currentElement.name),
                    g.turnIntoCSList(p),
                    g.turnIntoCSList([
                        b,
                        c
                    ]),
                    g.realMatrix([
                        [
                            x,
                            v
                        ],
                        [
                            d,
                            f
                        ]
                    ]),
                    u.wrap(m),
                    u.wrap(l),
                    u.wrap(k),
                    h
                ];
                P.currentStep.push(g.turnIntoCSList(q));
                n = function(a1) {
                    P.hasOwnProperty(a1) || (P[a1] = u.wrap(a1));
                    q[q.length - 1] = P[a1];
                };
            }
            g._helper.isNaN(a1) || g._helper.isNaN(e) ? (n("Tracing failed due to NaNs."), sb = !0) : l > 3 * m && k > 3 * m ? n("Normal case, everything all right.") : 1E-5 > k ? 1E-5 > l ? n("Staying inside singularity.") : (n("Moved into singularity."), sb = !0) : 1E-5 > l ? n("Moved out of singularity.") : (fd ? n("Reached refinement limit, giving up.") : n("Need to refine."), uc());
            return p;
        }
        function rd(a1, e, b, c) {
            var x = ha(3), v = ha(3), d = ha(3), f = ha(3);
            a1 = se(a1, e, b, c, x, v, d, f);
            ea(a1[0]);
            ea(a1[1]);
            ea(a1[2]);
            ea(a1[3]);
            return g.turnIntoCSList(a1);
        }
        function se(a1, e, b, c, d, f, l, k) {
            var x = function() {};
            d = [
                d,
                f,
                l,
                k
            ];
            a1 = [
                a1,
                e,
                b,
                c
            ];
            if (lc) return a1;
            f = 0;
            c = Array(4);
            for(b = 0; 4 > b; b++)for(c[b] = Array(4), k = 0; 4 > k; k++)l = g.projectiveDistMinScal(d[b], a1[k]), c[b][k] = l;
            l = R(c);
            e = Array(4);
            for(b = 0; 4 > b; ++b)e[b] = a1[l[b]], f += c[b][l[b]];
            var v = 1 * f, N = Infinity, Y = Infinity;
            for(b = 0; 4 > b; b++){
                if (g._helper.isNaN(a1[b])) return x("Tracing failed due to NaNs."), sb = !0, e;
                for(k = b + 1; 4 > k; k++)l = g.projectiveDistMinScal(d[b], d[k]), N > l && (N = l), l = g.projectiveDistMinScal(e[b], e[k]), Y > l && (Y = l);
            }
            if (P && P.currentStep) {
                var m = [
                    P.labelTracing4,
                    u.wrap(P.currentElement.name),
                    g.turnIntoCSList(e),
                    g.turnIntoCSList(d),
                    g.realMatrix(c),
                    u.wrap(f),
                    u.wrap(N),
                    u.wrap(Y),
                    h
                ];
                P.currentStep.push(g.turnIntoCSList(m));
                x = function(a1) {
                    P.hasOwnProperty(a1) || (P[a1] = u.wrap(a1));
                    m[m.length - 1] = P[a1];
                };
            }
            N > v && Y > v || (1E-5 > Y ? 1E-5 > N ? x("Staying inside singularity.") : (x("Moved into singularity."), sb = !0) : 1E-5 > N ? x("Moved out of singularity.") : (fd ? x("Reached refinement limit, giving up.") : x("Need to refine."), uc()));
            return e;
        }
        function be(a1) {
            var e = a1.length, b, c;
            if (lc) {
                for(b = 0; b < e; ++b)jb += 2 * a1[b].value.length, ea(a1[b]);
                return a1;
            }
            var d = Array(e), f = Array(e), l = Array(e), k = 99, m = 99, n = Array(e);
            for(b = 0; b < e; ++b)d[b] = ha(a1[b].value.length), f[b] = g.normSquared(d[b]).value.real, l[b] = g.normSquared(a1[b]).value.real, n[b] = Array(e);
            for(b = 0; b < e; ++b){
                for(c = 0; c < e; ++c){
                    var na = g.sesquilinearproduct(d[b], a1[c]).value;
                    na = (na.real * na.real + na.imag * na.imag) / (f[b] * l[c]);
                    n[b][c] = 1 - na;
                }
                for(c = b + 1; c < e; ++c)na = g.sesquilinearproduct(d[b], d[c]).value, na = (na.real * na.real + na.imag * na.imag) / (f[b] * f[c]), k > 1 - na && (k = 1 - na), na = g.sesquilinearproduct(a1[b], a1[c]).value, na = (na.real * na.real + na.imag * na.imag) / (l[b] * l[c]), m > 1 - na && (m = 1 - na);
            }
            na = R(n);
            c = Array(e);
            f = 0;
            l = !1;
            for(b = 0; b < e; ++b){
                f += n[b][na[b]];
                var p = c[b] = a1[na[b]];
                ea(p);
                l |= g._helper.isNaN(p);
            }
            l |= isNaN(f);
            a1 = function() {};
            if (P && P.currentStep) {
                var q = [
                    P.labelTracingSesq,
                    u.wrap(P.currentElement.name),
                    g.turnIntoCSList(c),
                    g.turnIntoCSList(d),
                    g.realMatrix(n),
                    u.wrap(f),
                    u.wrap(k),
                    u.wrap(m),
                    h
                ];
                P.currentStep.push(g.turnIntoCSList(q));
                a1 = function(a1) {
                    P.hasOwnProperty(a1) || (P[a1] = u.wrap(a1));
                    q[q.length - 1] = P[a1];
                };
            }
            l ? (a1("Tracing failed due to NaNs."), sb = !0) : k > 3 * f && m > 3 * f ? a1("Normal case, everything all right.") : 1E-5 > m ? 1E-5 > k ? a1("Staying inside singularity.") : (a1("Moved into singularity."), sb = !0) : 1E-5 > k ? a1("Moved out of singularity.") : (fd ? a1("Reached refinement limit, giving up.") : a1("Need to refine."), uc());
            return c;
        }
        function vc(a1, e) {
            a1 = m._helper.flattenConicMatrix(a1);
            e = m._helper.flattenConicMatrix(e);
            var b = ha(6), c = ha(6);
            e = qd(a1, e, b, c);
            ea(e[0]);
            ea(e[1]);
            a1 = m._helper.buildConicMatrix(e[0].value);
            e = m._helper.buildConicMatrix(e[1].value);
            return g.turnIntoCSList([
                a1,
                e
            ]);
        }
        function qa(a1) {
            if (qa.hasOwnProperty(a1.kind)) qa[a1.kind](a1);
        }
        function Qb(a1) {
            Qb.hasOwnProperty(a1.kind) && (a1.incidences = [], Qb[a1.kind](a1));
        }
        function sd(a1, e) {
            return function() {
                a1.incidences.push(e.name);
                e.incidences.push(a1.name);
            };
        }
        function wc(a1, e) {
            return function() {
                a1.Duplicate = e;
            };
        }
        function td(a1, e) {
            return {
                getInvolved: function() {
                    return [
                        a1,
                        e
                    ];
                },
                toString: function() {
                    return "point " + a1.name + " incident line " + e.name;
                },
                apply: sd(a1, e),
                holds: function() {
                    var b = g.scaldiv(g.abs(a1.homog), a1.homog), c = g.scaldiv(g.abs(e.homog), e.homog);
                    return l.abs(g.scalproduct(b, c)).value.real < l.epsbig;
                }
            };
        }
        function ce(a1, e) {
            return {
                getInvolved: function() {
                    return [
                        a1,
                        e
                    ];
                },
                toString: function() {
                    return "point " + a1.name + " incident conic " + e.name;
                },
                apply: sd(a1, e),
                holds: function() {
                    var b = u.mult(e.matrix, a1.homog);
                    b = u.mult(a1.homog, b);
                    b = l.abs(b);
                    return b.value.real < l.epsbig;
                }
            };
        }
        function de() {
            if (0 !== Ra.length) {
                Ub.prover.set(Ja);
                var a1, e = function() {
                    a1 = {};
                    Ra.forEach(function(e) {
                        var x;
                        e.getInvolved().forEach(function(e) {
                            a1[e.name] || (a1[e.name] = !0, x = b(e, {}), x.forEach(function(e) {
                                a1[e] = !0;
                            }));
                        });
                    });
                }, b = function(a1, e) {
                    a1.incidences.forEach(function(a1) {
                        e[a1] || (e[a1] = !0, b(r.csnames[a1], e));
                    });
                    return Object.keys(e);
                };
                e();
                var c = function(a1) {
                    return a1.holds();
                };
                Object.keys(a1).forEach(function(e) {
                    e = r.csnames[e].args;
                    "undefined" !== typeof e && e.forEach(function(e) {
                        a1[e] = !0;
                    });
                });
                for(var d, g = 0; 3 > g; g++){
                    for(var f in a1){
                        var h = r.csnames[f];
                        !h.pinned && m[h.type].isMovable && (d = m[h.type].getRandomMove(h), Ta(h, d.value, d.type), Ra = Ra.filter(c));
                    }
                    e();
                }
                Ja.set(Ub.prover);
                Zd();
                for(e = 0; e < Ra.length; ++e)Ra[e].apply();
                Ra = [];
            }
        }
        function Uc(a1, e, b) {
            var x = document.createElement("div"), c = document.createElement("img");
            c.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAPoCAQAAAC1v1zVAAAAGklEQVR42u3BMQEAAADCoPVPbQ0PoAAAgHcDC7gAAVI8ZnwAAAAASUVORK5CYII=";
            x.className = "CindyJS-baseline";
            x.appendChild(c);
            c = document.createElement("div");
            c.className = "CindyJS-button";
            x.appendChild(c);
            for(var g = 2; g < arguments.length; ++g)c.appendChild(arguments[g]);
            ra.parentNode.appendChild(x);
            a1.html = arguments[arguments.length - 1];
            $a(a1.fillalpha) || (a1.fillalpha = 1);
            a1.fillcolor && (a1.html.style.backgroundColor = y.makeColor(a1.fillcolor, a1.fillalpha));
            $a(a1.alpha) || (a1.alpha = 1);
            a1.color && (a1.html.style.color = y.makeColor(a1.color, a1.alpha));
            x = k;
            if (a1.script) {
                var f = lb(a1.script);
                x = function() {
                    w(f);
                    k();
                };
            }
            b.addEventListener(e, x);
            !d.keylistener && (V.keydown || V.keyup || V.keytyped) && (b.addEventListener("keydown", function(a1) {
                9 !== a1.keyCode && Z(a1, V.keydown);
            }), b.addEventListener("keyup", function(a1) {
                Z(a1, V.keyup);
            }), b.addEventListener("keypress", function(a1) {
                9 !== a1.keyCode && Z(a1, V.keytyped);
            }));
            m.Text.initialize(a1);
        }
        function fb() {}
        function ud(a1) {
            if (!/^Select/.test(a1.type) && !m[a1.type].isMovable) return null;
            var e = u.unwrap, b = l.add;
            switch(a1.kind){
                case "P":
                case "L":
                case "Text":
                    return e(a1.homog);
                case "C":
                    return a1 = a1.matrix.value, {
                        xx: e(a1[0].value[0]),
                        yy: e(a1[1].value[1]),
                        zz: e(a1[2].value[2]),
                        xy: e(b(a1[0].value[1], a1[1].value[0])),
                        xz: e(b(a1[0].value[2], a1[2].value[0])),
                        yz: e(b(a1[1].value[2], a1[2].value[1]))
                    };
                default:
                    return null;
            }
        }
        function Vc(a1) {
            var e = {};
            e.offset = u.unwrap(a1.offset);
            a1.to && (e.to = a1.to);
            a1.corner && (e.corner = a1.corner);
            return e;
        }
        function Wc(a1) {
            var e = {}, b = {
                pinned: !1,
                movable: !0
            };
            "P" === a1.kind && Qd(b);
            "L" === a1.kind && fc(b);
            "C" === a1.kind && fc(b);
            "S" === a1.kind && Rd(b);
            "Text" === a1.kind && Sd(b);
            "Poly" === a1.kind && vb(b);
            Ze.forEach(function(x) {
                if (a1.hasOwnProperty(x)) {
                    var c = u.unwrap(a1[x]), v = u.unwrap(b[x]);
                    null !== c && void 0 !== c && c !== v && JSON.stringify(c) !== JSON.stringify(v) && (e[x] = c);
                }
            });
            if ("P" === a1.kind && (!a1.movable || a1.pinned) && e.color) {
                var c = l.real(1 / Aa.dimDependent);
                e.color = u.unwrap(g.scalmult(c, a1.color));
            }
            if (c = ud(a1)) e.pos = c;
            a1.dock && (e.dock = Vc(a1.dock));
            return e;
        }
        function te() {
            var a1 = [];
            r.gslp.forEach(function(e) {
                e.tmp || a1.push(Wc(e));
            });
            return a1;
        }
        function vd() {
            qb.forEach(function(a1) {
                var e = (a1.geo || []).map(function(a1) {
                    return r.csnames[a1];
                });
                W[a1.type].reset(a1, e[0], e);
            });
        }
        function Rb(a1) {
            Ce = 0 !== a1.length;
            qb = [];
            Ca = [];
            He = [];
            W.Environment.init({});
            a1.forEach(function(a1) {
                a1.behavior ? (a1.name && (a1.behavior.geo = [
                    a1.name
                ]), a1 = a1.behavior, a1.gravity && (a1.gravity = -a1.gravity)) : e = a1.geo;
                var e = (a1.geo || []).map(function(a1) {
                    return r.csnames[a1];
                }), b = e[0], c = W[a1.type];
                c ? (c.init && c.init(a1, b, e), b && (b.behavior = a1, "Mass" === a1.type ? Ca.push(b) : "Spring" === a1.type && He.push(b)), qb.push(a1)) : (console.error(a1), console.error("Behavior " + a1.type + " not implemented yet"));
            });
        }
        var Ia = this, Qa, V = {}, Ba = !1, xc = !0, yc = 0, ee = .5, wd = 0, zc = 10, Bc = 5 / 360, ze = .32 / Bc / 1E3 * 2, Yc = 1, Va = 0, Ad = 0, Cc = !1, Tb = .2, Dc = !1, Zc = 0, $c = 0, wa = 1, ra, ic, $a = Number.isFinite || function(a1) {
            return "number" === typeof a1 && isFinite(a1);
        }, Ma, z, ma, pa, r, gb, ad = h, bd = h, xb = {
            play: fb,
            pause: fb,
            stop: fb
        }, Ec = null, jc = function(a1, e) {
            var b = [];
            jc = function(a1, e) {
                b.push({
                    img: a1,
                    id: e
                });
            };
            jc(a1, e);
            var c = Ia.getBaseDir() + "images/Icons.svg", d = new XMLHttpRequest;
            d.onreadystatechange = function() {
                if (d.readyState === XMLHttpRequest.DONE) {
                    if (200 !== d.status) console.error("Failed to load CindyJS Icons.svg from " + c + ": " + d.statusText);
                    else {
                        var a1 = d.responseXML, e = a1.documentElement, x = {}, v;
                        for(v = e.firstChild; v; v = g){
                            var g = v.nextSibling;
                            v.nodeType === Node.ELEMENT_NODE && "http://www.w3.org/2000/svg" === v.namespaceURI && "g" === v.localName.toLowerCase() && (e.removeChild(v), v.setAttribute("style", "display:inline"), x[v.getAttribute("id")] = v);
                        }
                        var f = new XMLSerializer;
                        jc = function(b, c) {
                            if (x.hasOwnProperty(c)) {
                                c = x[c];
                                e.appendChild(c);
                                try {
                                    var v = f.serializeToString(a1);
                                } finally{
                                    e.removeChild(c);
                                }
                                b.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(v);
                            }
                        };
                        b.forEach(function(a1) {
                            jc(a1.img, a1.id);
                        });
                        b = null;
                    }
                }
            };
            d.responseType = "document";
            d.open("GET", c);
            d.send();
        }, ge = 1, kc = null, Db = [], Fc = !1, La = {
            config: d,
            startup: B,
            shutdown: Ab,
            evokeCS: function(a1) {
                a1 = lb(a1, !1);
                w(a1);
                k();
            },
            play: F,
            pause: ub,
            stop: Wb,
            evalcs: function(a1) {
                return w(lb(a1, !1));
            },
            parse: function(a1) {
                return lb(a1);
            },
            niceprint: da,
            canvas: null
        }, Bd = !1, Gc = 0;
        d.use && d.use.forEach(function(a1) {
            var e = null;
            d.plugins && (e = d.plugins[a1]);
            e || (e = Ia._pluginRegistry[a1]);
            e || (++Gc, console.log("Loading script for plugin " + a1), Ia.loadScript(a1 + "-plugin", a1 + "-plugin.js", function() {
                console.log("Successfully loaded plugin " + a1);
                0 === --Gc && Bd && B();
            }, function() {
                console.error("Failed to auto-load plugin " + a1);
                0 === --Gc && Bd && B();
            }));
        });
        zb.prototype = new Bb;
        Xa.prototype = new Bb;
        Oa.prototype = new Bb;
        var ja = {}, ya, Cd = "", cd = 0, ab = 0, Eb = {}, bc = {};
        var hb = d.isNode ? process.nextTick : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a1) {
            window.setTimeout(a1, 0);
        };
        var bb = null, he = [
            0,
            8,
            7,
            501,
            "g131b593"
        ], l = {
            _helper: {}
        };
        l._helper.roundingfactor = 1E4;
        l._helper.angleroundingfactor = 10;
        l._helper.niceround = function(a1, e) {
            return Math.round(a1 * e) / e;
        };
        l.niceprint = function(a1, e) {
            e = e || l._helper.roundingfactor;
            if ("Angle" === a1.usage) return l._helper.niceangle(a1);
            var b = l._helper.niceround(a1.value.real, e);
            a1 = l._helper.niceround(a1.value.imag, e);
            return 0 === a1 ? "" + b : 0 < a1 ? "" + b + " + i*" + a1 : "" + b + " - i*" + -a1;
        };
        var Dd = d.angleUnit || "\xb0", Ae = Dd.replace(/\s+/g, ""), Hc = 2 * Math.PI, Be = 1 / Hc, ie = {
            rad: Hc,
            "\xb0": 360,
            deg: 360,
            degree: 360,
            gra: 400,
            grad: 400,
            turn: 1,
            cyc: 1,
            rev: 1,
            rot: 1,
            "π": 2,
            pi: 2,
            quad: 4
        };
        l._helper.niceangle = function(a1) {
            var e = ie[Ae];
            if (!e) return l.niceprint(u.withUsage(a1, null));
            if ("function" === typeof e) return e(a1);
            a1 = l.niceprint(l.realmult(e * Be, a1), 200 < e ? l._helper.angleroundingfactor : null);
            return -1 === a1.indexOf("i*") ? a1 + Dd : "(" + a1 + ")" + Dd;
        };
        l.complex = function(a1, e) {
            return {
                ctype: "number",
                value: {
                    real: a1,
                    imag: e
                }
            };
        };
        l.real = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: a1,
                    imag: 0
                }
            };
        };
        l.zero = l.real(0);
        l.one = l.real(1);
        l.infinity = l.complex(Infinity, Infinity);
        l.nan = l.complex(NaN, NaN);
        l._helper.input = function(a1) {
            return "object" === typeof a1 ? l.complex(+a1.r, +a1.i) : l.real(+a1);
        };
        l.argmax = function(a1, e) {
            return a1.value.real * a1.value.real + a1.value.imag * a1.value.imag < e.value.real * e.value.real + e.value.imag * e.value.imag ? e : a1;
        };
        l.max = function(a1, e) {
            return {
                ctype: "number",
                value: {
                    real: Math.max(a1.value.real, e.value.real),
                    imag: Math.max(a1.value.imag, e.value.imag)
                }
            };
        };
        l.min = function(a1, e) {
            return {
                ctype: "number",
                value: {
                    real: Math.min(a1.value.real, e.value.real),
                    imag: Math.min(a1.value.imag, e.value.imag)
                }
            };
        };
        l.add = function(a1, e) {
            return {
                ctype: "number",
                value: {
                    real: a1.value.real + e.value.real,
                    imag: a1.value.imag + e.value.imag
                }
            };
        };
        l.sub = function(a1, e) {
            return {
                ctype: "number",
                value: {
                    real: a1.value.real - e.value.real,
                    imag: a1.value.imag - e.value.imag
                }
            };
        };
        l.neg = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: -a1.value.real,
                    imag: -a1.value.imag
                }
            };
        };
        l.re = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: a1.value.real,
                    imag: 0
                }
            };
        };
        l.im = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: a1.value.imag,
                    imag: 0
                }
            };
        };
        l.conjugate = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: a1.value.real,
                    imag: -a1.value.imag
                }
            };
        };
        l.round = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: Math.round(a1.value.real),
                    imag: Math.round(a1.value.imag)
                }
            };
        };
        l.ceil = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: Math.ceil(a1.value.real),
                    imag: Math.ceil(a1.value.imag)
                }
            };
        };
        l.floor = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: Math.floor(a1.value.real),
                    imag: Math.floor(a1.value.imag)
                }
            };
        };
        l.mult = function(a1, e) {
            return {
                ctype: "number",
                value: {
                    real: a1.value.real * e.value.real - a1.value.imag * e.value.imag,
                    imag: a1.value.real * e.value.imag + a1.value.imag * e.value.real
                }
            };
        };
        l.realmult = function(a1, e) {
            return {
                ctype: "number",
                value: {
                    real: a1 * e.value.real,
                    imag: a1 * e.value.imag
                }
            };
        };
        l.multiMult = function(a1) {
            var e = a1[0];
            if ("number" !== e.ctype) return h;
            for(var b = 1; b < a1.length; b++){
                if ("number" !== a1[b].ctype) return h;
                e = l.mult(e, a1[b]);
            }
            return e;
        };
        l.abs2 = function(a1) {
            return {
                ctype: "number",
                value: {
                    real: a1.value.real * a1.value.real + a1.value.imag * a1.value.imag,
                    imag: 0
                }
            };
        };
        l.abs = function(a1) {
            return l.sqrt(l.abs2(a1));
        };
        l.inv = function(a1) {
            var e = a1.value.real * a1.value.real + a1.value.imag * a1.value.imag;
            return {
                ctype: "number",
                value: {
                    real: a1.value.real / e,
                    imag: -a1.value.imag / e
                }
            };
        };
        l.div = function(a1, e) {
            var b = a1.value.real;
            a1 = a1.value.imag;
            var c = e.value.real;
            e = e.value.imag;
            var d = c * c + e * e;
            return {
                ctype: "number",
                value: {
                    real: (b * c + a1 * e) / d,
                    imag: (a1 * c - b * e) / d
                }
            };
        };
        l.eps = 1E-10;
        l.epsbig = 1E-6;
        l.snap = function(a1) {
            var e = a1.value.real;
            a1 = a1.value.imag;
            Math.floor(e + l.eps) !== Math.floor(e - l.eps) && (e = Math.round(e));
            Math.floor(a1 + l.eps) !== Math.floor(a1 - l.eps) && (a1 = Math.round(a1));
            return {
                ctype: "number",
                value: {
                    real: e,
                    imag: a1
                }
            };
        };
        l.exp = function(a1) {
            var e = Math.exp(a1.value.real);
            return {
                ctype: "number",
                value: {
                    real: e * Math.cos(a1.value.imag),
                    imag: e * Math.sin(a1.value.imag)
                }
            };
        };
        l.cos = function(a1) {
            var e = a1.value.real;
            a1 = a1.value.imag;
            var b = Math.exp(a1), c = b * Math.sin(-e), d = b * Math.cos(-e);
            b = Math.exp(-a1);
            return {
                ctype: "number",
                value: {
                    real: (d + b * Math.cos(e)) / 2,
                    imag: (c + b * Math.sin(e)) / 2
                }
            };
        };
        l.sin = function(a1) {
            var e = a1.value.real;
            a1 = a1.value.imag;
            var b = Math.exp(a1), c = b * Math.sin(-e), d = b * Math.cos(-e);
            b = Math.exp(-a1);
            return {
                ctype: "number",
                value: {
                    real: -(c - b * Math.sin(e)) / 2,
                    imag: (d - b * Math.cos(e)) / 2
                }
            };
        };
        l.tan = function(a1) {
            var e = l.sin(a1);
            a1 = l.cos(a1);
            return l.div(e, a1);
        };
        l.arccos = function(a1) {
            var e = l.mult(a1, l.neg(a1));
            e = l.sqrt(l.add(l.real(1), e));
            a1 = l.add(l.mult(a1, l.complex(0, 1)), e);
            a1 = l.add(l.mult(l.log(a1), l.complex(0, 1)), l.real(.5 * Math.PI));
            return u.withUsage(a1, "Angle");
        };
        l.arcsin = function(a1) {
            var e = l.mult(a1, l.neg(a1));
            e = l.sqrt(l.add(l.real(1), e));
            a1 = l.add(l.mult(a1, l.complex(0, 1)), e);
            a1 = l.mult(l.log(a1), l.complex(0, -1));
            return u.withUsage(a1, "Angle");
        };
        l.arctan = function(a1) {
            var e = l.log(l.add(l.mult(a1, l.complex(0, -1)), l.real(1)));
            a1 = l.log(l.add(l.mult(a1, l.complex(0, 1)), l.real(1)));
            e = l.mult(l.sub(e, a1), l.complex(0, .5));
            return u.withUsage(e, "Angle");
        };
        l.arctan2 = function(a1, e) {
            if (void 0 === e) var b = l.real(Math.atan2(a1.value.imag, a1.value.real));
            else l._helper.isReal(a1) && l._helper.isReal(e) ? b = l.real(Math.atan2(e.value.real, a1.value.real)) : (b = l.add(a1, l.mult(l.complex(0, 1), e)), a1 = l.sqrt(l.add(l.mult(a1, a1), l.mult(e, e))), b = l.mult(l.complex(0, -1), l.log(l.div(b, a1))));
            return u.withUsage(b, "Angle");
        };
        l.sqrt = function(a1) {
            var e = a1.value.real, b = a1.value.imag;
            a1 = Math.sqrt(Math.sqrt(e * e + b * b));
            e = Math.atan2(b, e);
            return {
                ctype: "number",
                value: {
                    real: a1 * Math.cos(e / 2),
                    imag: a1 * Math.sin(e / 2)
                }
            };
        };
        l.powRealExponent = function(a1, e) {
            var b = a1.value.real, c = a1.value.imag;
            a1 = Math.pow(Math.sqrt(b * b + c * c), e);
            b = Math.atan2(c, b);
            return {
                ctype: "number",
                value: {
                    real: a1 * Math.cos(b * e),
                    imag: a1 * Math.sin(b * e)
                }
            };
        };
        l.log = function(a1) {
            var e = a1.value.real;
            a1 = a1.value.imag;
            var b = Math.sqrt(e * e + a1 * a1), c = Math.atan2(a1, e);
            0 > a1 && (c += 2 * Math.PI);
            0 === a1 && 0 > e && (c = Math.PI);
            c > Math.PI && (c -= 2 * Math.PI);
            return l.snap({
                ctype: "number",
                value: {
                    real: Math.log(b),
                    imag: c
                }
            });
        };
        l.pow = function(a1, e) {
            return l._helper.isZero(e) ? l.one : l._helper.isZero(a1) ? l.zero : l._helper.isReal(e) ? l.powRealExponent(a1, e.value.real) : l.exp(l.mult(l.log(a1), e));
        };
        l.mod = function(a1, e) {
            var b = a1.value.real, c = e.value.real;
            a1 = a1.value.imag;
            e = e.value.imag;
            b -= Math.floor(b / c) * c;
            a1 -= Math.floor(a1 / e) * e;
            0 === c && (b = 0);
            0 === e && (a1 = 0);
            return l.snap({
                ctype: "number",
                value: {
                    real: b,
                    imag: a1
                }
            });
        };
        l._helper.seed = "NO";
        l._helper.seedrandom = function(a1) {
            a1 -= Math.floor(a1);
            l._helper.seed = .8 * a1 + .1;
        };
        l._helper.rand = function() {
            if ("NO" === l._helper.seed) return Math.random();
            var a1 = l._helper.seed;
            a1 = 1E3 * Math.sin(1E3 * a1);
            a1 -= Math.floor(a1);
            return l._helper.seed = a1;
        };
        l._helper.randnormal = function() {
            var a1 = l._helper.rand(), e = l._helper.rand();
            return Math.sqrt(-2 * Math.log(a1)) * Math.cos(2 * Math.PI * e);
        };
        l._helper.isEqual = function(a1, e) {
            return a1.value.real === e.value.real && a1.value.imag === e.value.imag;
        };
        l._helper.isLessThan = function(a1, e) {
            return a1.value.real < e.value.real || a1.value.real === e.value.real && a1.value.imag < e.value.imag;
        };
        l._helper.compare = function(a1, e) {
            return l._helper.isLessThan(a1, e) ? -1 : l._helper.isEqual(a1, e) ? 0 : 1;
        };
        l._helper.isAlmostEqual = function(a1, e, b) {
            var x = l.eps;
            "undefined" !== typeof b && (x = b);
            b = a1.value.real - e.value.real;
            a1 = a1.value.imag - e.value.imag;
            return b < x && b > -x && a1 < x && a1 > -x;
        };
        l._helper.isZero = function(a1) {
            return 0 === a1.value.real && 0 === a1.value.imag;
        };
        l._helper.isAlmostZero = function(a1) {
            var e = a1.value.real;
            a1 = a1.value.imag;
            return e < l.eps && e > -l.eps && a1 < l.eps && a1 > -l.eps;
        };
        l._helper.isReal = function(a1) {
            return 0 === a1.value.imag;
        };
        l._helper.isAlmostReal = function(a1) {
            a1 = a1.value.imag;
            return a1 < l.epsbig && a1 > -l.epsbig;
        };
        l._helper.isNaN = function(a1) {
            return isNaN(a1.value.real) || isNaN(a1.value.imag);
        };
        l._helper.isFinite = function(a1) {
            return isFinite(a1.value.real) && isFinite(a1.value.imag);
        };
        l._helper.isAlmostImag = function(a1) {
            a1 = a1.value.real;
            return a1 < l.epsbig && a1 > -l.epsbig;
        };
        l._helper.z3a = l.complex(-0.5, .5 * Math.sqrt(3));
        l._helper.z3b = l.complex(-0.5, -0.5 * Math.sqrt(3));
        l._helper.cub1 = {
            ctype: "list",
            value: [
                l.one,
                l.one,
                l.one
            ]
        };
        l._helper.cub2 = {
            ctype: "list",
            value: [
                l._helper.z3a,
                l.one,
                l._helper.z3b
            ]
        };
        l._helper.cub3 = {
            ctype: "list",
            value: [
                l._helper.z3b,
                l.one,
                l._helper.z3a
            ]
        };
        l.solveCubic = function(a1, e, b, c) {
            a1 = l._helper.solveCubicHelper(a1, e, b, c);
            return [
                g.scalproduct(l._helper.cub1, a1),
                g.scalproduct(l._helper.cub2, a1),
                g.scalproduct(l._helper.cub3, a1)
            ];
        };
        l._helper.solveCubicHelper = function(a1, e, b, c) {
            var x = a1.value.real;
            a1 = a1.value.imag;
            var v = e.value.real;
            e = e.value.imag;
            var d = b.value.real, f = b.value.imag, h = c.value.real, k = c.value.imag, m = x * d - a1 * f;
            b = x * f + a1 * d;
            c = 4 * m - (v * v - e * e);
            var n = 4 * b - 2 * v * e, p = x * v - a1 * e, q = x * e + a1 * v, r = c * d - n * f - 18 * (p * h - q * k);
            n = c * f + n * d - 18 * (p * k + q * h);
            c = 27 * (x * x - a1 * a1);
            var t = 54 * a1 * x, u = c * h - t * k, w = c * k + t * h, y = v * v - e * e, z = 2 * v * e, C = y * v - z * e, A = y * e + z * v, B = u + 4 * C;
            t = w + 4 * A;
            c = 27 * (r * d - n * f + B * h - t * k);
            n = 27 * (r * f + n * d + B * k + t * h);
            B = Math.sqrt(Math.sqrt(c * c + n * n));
            t = Math.atan2(n, c);
            n = B * Math.sin(t / 2);
            c = B * Math.cos(t / 2);
            C = -2 * C + 9 * (p * d - q * f) - u + (c * x - n * a1);
            A = -2 * A + 9 * (p * f + q * d) - w + (c * a1 + n * x);
            c = Math.exp(Math.log(Math.sqrt(C * C + A * A)) / 3);
            d = Math.atan2(A, C);
            t = c * Math.sin(d / 3);
            n = c * Math.cos(d / 3);
            c *= c;
            d *= 2;
            m = 2 * y - 6 * m;
            b = 2 * z - 6 * b;
            z = -1.5874010519681996 * (v * n - e * t);
            v = -1.5874010519681996 * (v * t + e * n);
            e = 1.2599210498948732 * c * Math.cos(d / 3);
            d = 1.2599210498948732 * c * Math.sin(d / 3);
            c = 4.762203155904599 * (n * x - t * a1);
            n = 4.762203155904599 * (n * a1 + t * x);
            x = c * c + n * n;
            t = (-m * n + b * c) / x;
            m = (m * c + b * n) / x;
            b = t;
            t = (-z * n + v * c) / x;
            z = (z * c + v * n) / x;
            v = t;
            t = (-e * n + d * c) / x;
            e = (e * c + d * n) / x;
            d = t;
            return g.turnIntoCSList([
                l.complex(m, b),
                l.complex(z, v),
                l.complex(e, d)
            ]);
        };
        l._helper.getRangeRand = function(a1, e) {
            return Math.random() * (e - a1) + a1;
        };
        l.getRandReal = function(a1, e) {
            a1 = l._helper.getRangeRand(a1, e);
            return l.real(a1);
        };
        l.getRandComplex = function(a1, e) {
            var b = l._helper.getRangeRand(a1, e);
            a1 = l._helper.getRangeRand(a1, e);
            return l.complex(b, a1);
        };
        var g = {
            _helper: {},
            turnIntoCSList: function(a1) {
                return {
                    ctype: "list",
                    value: a1
                };
            }
        };
        g.EMPTY = g.turnIntoCSList([]);
        g.asList = function(a1) {
            return "list" === a1.ctype ? a1 : "number" === a1.ctype || "boolean" === a1.ctype || "geo" === a1.ctype ? g.turnIntoCSList([
                a1
            ]) : g.EMPTY;
        };
        g.realVector = function(a1) {
            for(var e = [], b = 0; b < a1.length; b++)e[b] = {
                ctype: "number",
                value: {
                    real: a1[b],
                    imag: 0
                }
            };
            return {
                ctype: "list",
                value: e
            };
        };
        g._helper.unitvector = function(a1, e) {
            a1 = g.zerovector(a1);
            a1.value[Math.floor(e.value.real - 1)] = l.real(1);
            return a1;
        };
        g.idMatrix = function(a1) {
            for(var e = g.zeromatrix(a1, a1), b = l.real(1), c = 0; c < a1.value.real; c++)e.value[c].value[c] = b;
            return e;
        };
        g._helper.flippedidMatrix = function(a1) {
            for(var e = g.zeromatrix(a1, a1), b = l.real(1), c = 0; c < a1.value.real; c++)e.value[c].value[a1.value.real - c - 1] = b;
            return e;
        };
        g.println = function(a1) {
            for(var e = [], b = 0; b < a1.value.length; b++)if ("number" === a1.value[b].ctype) e[b] = l.niceprint(a1.value[b]);
            else if ("list" === a1.value[b].ctype) g.println(a1.value[b]);
            else return h;
            "number" === a1.value[0].ctype && console.log(e);
        };
        g.matrix = function(a1) {
            return g.turnIntoCSList(a1.map(g.turnIntoCSList));
        };
        g.realMatrix = function(a1) {
            for(var e = a1.length, b = Array(e), c = 0; c < e; c++)b[c] = g.realVector(a1[c]);
            return g.turnIntoCSList(b);
        };
        g.ex = g.realVector([
            1,
            0,
            0
        ]);
        g.ey = g.realVector([
            0,
            1,
            0
        ]);
        g.ez = g.realVector([
            0,
            0,
            1
        ]);
        g.linfty = g.realVector([
            0,
            0,
            1
        ]);
        g.ii = g.turnIntoCSList([
            l.complex(1, 0),
            l.complex(0, 1),
            l.complex(0, 0)
        ]);
        g.jj = g.turnIntoCSList([
            l.complex(1, 0),
            l.complex(0, -1),
            l.complex(0, 0)
        ]);
        g.fundDual = g.realMatrix([
            [
                1,
                0,
                0
            ],
            [
                0,
                1,
                0
            ],
            [
                0,
                0,
                0
            ]
        ]);
        g.fund = g.realMatrix([
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                1
            ]
        ]);
        g.sequence = function(a1, e) {
            var b = [], c = 0;
            for(a1 = Math.round(a1.value.real); a1 < Math.round(e.value.real) + 1; a1++)b[c] = {
                ctype: "number",
                value: {
                    real: a1,
                    imag: 0
                }
            }, c++;
            return {
                ctype: "list",
                value: b
            };
        };
        g.pairs = function(a1) {
            for(var e = [], b = 0; b < a1.value.length - 1; b++)for(var c = b + 1; c < a1.value.length; c++)e.push({
                ctype: "list",
                value: [
                    a1.value[b],
                    a1.value[c]
                ]
            });
            return {
                ctype: "list",
                value: e
            };
        };
        g.triples = function(a1) {
            for(var e = [], b = 0; b < a1.value.length - 2; b++)for(var c = b + 1; c < a1.value.length - 1; c++)for(var d = c + 1; d < a1.value.length; d++)e.push({
                ctype: "list",
                value: [
                    a1.value[b],
                    a1.value[c],
                    a1.value[d]
                ]
            });
            return {
                ctype: "list",
                value: e
            };
        };
        g.cycle = function(a1) {
            for(var e = [], b = 0; b < a1.value.length - 1; b++)e[b] = {
                ctype: "list",
                value: [
                    a1.value[b],
                    a1.value[b + 1]
                ]
            };
            e.push({
                ctype: "list",
                value: [
                    a1.value[a1.value.length - 1],
                    a1.value[0]
                ]
            });
            return {
                ctype: "list",
                value: e
            };
        };
        g.consecutive = function(a1) {
            for(var e = [], b = 0; b < a1.value.length - 1; b++)e[b] = {
                ctype: "list",
                value: [
                    a1.value[b],
                    a1.value[b + 1]
                ]
            };
            return {
                ctype: "list",
                value: e
            };
        };
        g.reverse = function(a1) {
            for(var e = Array(a1.value.length), b = a1.value.length - 1, c = 0; 0 <= b; b--, c++)e[c] = a1.value[b];
            return {
                ctype: "list",
                value: e
            };
        };
        g.directproduct = function(a1, e) {
            for(var b = [], c = 0; c < a1.value.length; c++)for(var d = 0; d < e.value.length; d++)b.push({
                ctype: "list",
                value: [
                    a1.value[c],
                    e.value[d]
                ]
            });
            return {
                ctype: "list",
                value: b
            };
        };
        g.concat = function(a1, e) {
            for(var b = [], c = 0; c < a1.value.length; c++)b.push(a1.value[c]);
            for(a1 = 0; a1 < e.value.length; a1++)b.push(e.value[a1]);
            return {
                ctype: "list",
                value: b
            };
        };
        g.prepend = function(a1, e) {
            var b = [];
            b[0] = a1;
            for(a1 = 0; a1 < e.value.length; a1++)b[a1 + 1] = e.value[a1];
            return {
                ctype: "list",
                value: b
            };
        };
        g.append = function(a1, e) {
            for(var b = [], c = 0; c < a1.value.length; c++)b[c] = a1.value[c];
            b.push(e);
            return {
                ctype: "list",
                value: b
            };
        };
        g.contains = function(a1, e) {
            for(var b = 0; b < a1.value.length; b++)if (E.equals(a1.value[b], e).value) return {
                ctype: "boolean",
                value: !0
            };
            return {
                ctype: "boolean",
                value: !1
            };
        };
        g.common = function(a1, e) {
            for(var b = [], c = 0, d = 0; d < a1.value.length; d++){
                for(var g = !1, f = a1.value[d], h = 0; h < e.value.length; h++)g = g || E.equals(f, e.value[h]).value;
                g && (b[c] = a1.value[d], c++);
            }
            return {
                ctype: "list",
                value: b
            };
        };
        g.remove = function(a1, e) {
            for(var b = [], c = 0, d = 0; d < a1.value.length; d++){
                for(var g = !1, f = a1.value[d], h = 0; h < e.value.length; h++)g = g || E.equals(f, e.value[h]).value;
                g || (b[c] = a1.value[d], c++);
            }
            return {
                ctype: "list",
                value: b
            };
        };
        g.sort1 = function(a1) {
            a1 = a1.value.slice();
            a1.sort(u.compare);
            return g.turnIntoCSList(a1);
        };
        g._helper.isEqual = function(a1, e) {
            return g.equals(a1, e).value;
        };
        g._helper.isLessThan = function(a1, e) {
            for(var b = a1.value.length, c = e.value.length, d = 0; !(d >= b || d >= c) && u.isEqual(a1.value[d], e.value[d]);)d++;
            return d === b && d < c ? !0 : d === c && d < b || d === b && d === c ? !1 : u.isLessThan(a1.value[d], e.value[d]);
        };
        g._helper.compare = function(a1, e) {
            return g._helper.isLessThan(a1, e) ? -1 : g._helper.isEqual(a1, e) ? 0 : 1;
        };
        g.equals = function(a1, e) {
            if (a1.value.length !== e.value.length) return {
                ctype: "boolean",
                value: !1
            };
            for(var b = !0, c = 0; c < a1.value.length; c++){
                var d = a1.value[c], f = e.value[c];
                b = "list" === d.ctype && "list" === f.ctype ? b && g.equals(d, f).value : b && oc([
                    d,
                    f
                ], []).value;
            }
            return {
                ctype: "boolean",
                value: b
            };
        };
        g.almostequals = function(a1, e) {
            if (a1.value.length !== e.value.length) return {
                ctype: "boolean",
                value: !1
            };
            for(var b = !0, c = 0; c < a1.value.length; c++){
                var d = a1.value[c], f = e.value[c];
                b = "list" === d.ctype && "list" === f.ctype ? b && g.almostequals(d, f).value : b && pc([
                    d,
                    f
                ], []).value;
            }
            return {
                ctype: "boolean",
                value: b
            };
        };
        g._helper.isAlmostReal = function(a1) {
            for(var e = !0, b = 0; b < a1.value.length; b++){
                var c = a1.value[b];
                e = "list" === c.ctype ? e && g._helper.isAlmostReal(c) : e && l._helper.isAlmostReal(c);
            }
            return e;
        };
        g._helper.isAlmostZero = function(a1) {
            for(var e = 0; e < a1.value.length; e++){
                var b = a1.value[e];
                if ("list" === b.ctype) {
                    if (!g._helper.isAlmostZero(b)) return !1;
                } else if (!l._helper.isAlmostZero(b)) return !1;
            }
            return !0;
        };
        g._helper.isNaN = function(a1) {
            for(var e = !1, b = 0; b < a1.value.length; b++){
                var c = a1.value[b];
                e = "list" === c.ctype ? e || g._helper.isNaN(c) : e || l._helper.isNaN(c);
            }
            return e;
        };
        g.set = function(a1) {
            var e = [], b = 0;
            a1 = a1.value.slice();
            a1.sort(u.compare);
            for(var c = 0; c < a1.length; c++)0 !== c && oc([
                e[e.length - 1],
                a1[c]
            ], []).value || (e[b] = a1[c], b++);
            return {
                ctype: "list",
                value: e
            };
        };
        g.maxval = function(a1) {
            for(var e = l.zero, b = 0; b < a1.value.length; b++){
                var c = a1.value[b];
                "number" === c.ctype && (e = l.argmax(e, c));
                "list" === c.ctype && (e = l.argmax(e, g.maxval(c)));
            }
            return e;
        };
        g.maxIndex = function(a1, e, b) {
            var c = 0;
            void 0 !== b && (c = b);
            b = c;
            for(var x = e(a1.value[c]).value.real; c < a1.value.length; ++c){
                var d = e(a1.value[c]).value.real;
                d > x && (b = c, x = d);
            }
            return b;
        };
        g.normalizeMax = function(a1) {
            var e = l.inv(g.maxval(a1));
            return l._helper.isFinite(e) ? g.scalmult(e, a1) : a1;
        };
        g.normalizeZ = function(a1) {
            var e = l.inv(a1.value[2]);
            return g.scalmult(e, a1);
        };
        g.dehom = function(a1) {
            a1 = a1.value.slice();
            var e = a1.length - 1, b = l.inv(a1[e]);
            a1.length = e;
            for(var c = 0; c < e; ++c)a1[c] = l.mult(b, a1[c]);
            return g.turnIntoCSList(a1);
        };
        g.normalizeAbs = function(a1) {
            var e = l.inv(g.abs(a1));
            return g.scalmult(e, a1);
        };
        g.max = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = [], c = 0; c < a1.value.length; c++)b[c] = u.max(a1.value[c], e.value[c]);
            return {
                ctype: "list",
                value: b
            };
        };
        g.min = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = [], c = 0; c < a1.value.length; c++)b[c] = u.min(a1.value[c], e.value[c]);
            return {
                ctype: "list",
                value: b
            };
        };
        g.scaldiv = function(a1, e) {
            if ("number" !== a1.ctype) return h;
            for(var b = [], c = 0; c < e.value.length; c++){
                var d = e.value[c];
                b[c] = "number" === d.ctype ? u.div(d, a1) : "list" === d.ctype ? g.scaldiv(a1, d) : h;
            }
            return {
                ctype: "list",
                value: b
            };
        };
        g.scalmult = function(a1, e) {
            if ("number" !== a1.ctype) return h;
            for(var b = [], c = 0; c < e.value.length; c++){
                var d = e.value[c];
                b[c] = "number" === d.ctype ? u.mult(d, a1) : "list" === d.ctype ? g.scalmult(a1, d) : h;
            }
            return {
                ctype: "list",
                value: b
            };
        };
        g.add = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = [], c = 0; c < a1.value.length; c++){
                var d = a1.value[c], f = e.value[c];
                b[c] = "number" === d.ctype && "number" === f.ctype ? u.add(d, f) : "list" === d.ctype && "list" === f.ctype ? g.add(d, f) : h;
            }
            return {
                ctype: "list",
                value: b
            };
        };
        g.sub = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = [], c = 0; c < a1.value.length; c++){
                var d = a1.value[c], f = e.value[c];
                b[c] = "number" === d.ctype && "number" === f.ctype ? l.sub(d, f) : "list" === d.ctype && "list" === f.ctype ? g.sub(d, f) : h;
            }
            return {
                ctype: "list",
                value: b
            };
        };
        g.abs2 = function(a1) {
            for(var e = 0, b = 0; b < a1.value.length; b++){
                var c = a1.value[b];
                if ("number" === c.ctype) e += l.abs2(c).value.real;
                else if ("list" === c.ctype) e += g.abs2(c).value.real;
                else return h;
            }
            return {
                ctype: "number",
                value: {
                    real: e,
                    imag: 0
                }
            };
        };
        g.abs = function(a1) {
            return l.sqrt(g.abs2(a1));
        };
        g.normalizeMaxXX = function(a1) {
            for(var e = -10000, b = l.real(1), c = 0; c < a1.value.length; c++){
                var d = l.abs(a1.value[c]);
                d.value.real > e && (b = a1.value[c], e = d.value.real);
            }
            return g.scaldiv(b, a1);
        };
        g.recursive = function(a1, e) {
            for(var b = [], c = 0; c < a1.value.length; c++){
                var d = D(a1.value[c]);
                b[c] = "number" === d.ctype ? l[e](d) : "list" === d.ctype ? g[e](d) : h;
            }
            return {
                ctype: "list",
                value: b
            };
        };
        g.re = function(a1) {
            return g.recursive(a1, "re");
        };
        g.neg = function(a1) {
            return g.recursive(a1, "neg");
        };
        g.im = function(a1) {
            return g.recursive(a1, "im");
        };
        g.conjugate = function(a1) {
            return g.recursive(a1, "conjugate");
        };
        g.transjugate = function(a1) {
            return g.transpose(g.conjugate(a1));
        };
        g.round = function(a1) {
            return g.recursive(a1, "round");
        };
        g.ceil = function(a1) {
            return g.recursive(a1, "ceil");
        };
        g.floor = function(a1) {
            return g.recursive(a1, "floor");
        };
        g._helper.colNumb = function(a1) {
            if ("list" !== a1.ctype) return -1;
            for(var e = -1, b = 0; b < a1.value.length; b++){
                if ("list" !== a1.value[b].ctype) return -1;
                if (0 === b) e = a1.value[b].value.length;
                else if (e !== a1.value[b].value.length) return -1;
            }
            return e;
        };
        g._helper.isNumberVecN = function(a1, e) {
            if ("list" !== a1.ctype || a1.value.length !== e) return !1;
            for(e = 0; e < a1.value.length; e++)if ("number" !== a1.value[e].ctype) return !1;
            return !0;
        };
        g.isNumberVector = function(a1) {
            if ("list" !== a1.ctype) return {
                ctype: "boolean",
                value: !1
            };
            for(var e = 0; e < a1.value.length; e++)if ("number" !== a1.value[e].ctype) return {
                ctype: "boolean",
                value: !1
            };
            return {
                ctype: "boolean",
                value: !0
            };
        };
        g.isNumberVectorN = function(a1, e) {
            if ("list" !== a1.ctype) return {
                ctype: "boolean",
                value: !1
            };
            if (a1.value) {
                for(e = 0; e < a1.value.length; e++)if ("number" !== a1.value[e].ctype) return {
                    ctype: "boolean",
                    value: !1
                };
            }
            return {
                ctype: "boolean",
                value: !0
            };
        };
        g.isNumberMatrix = function(a1) {
            if (-1 === g._helper.colNumb(a1)) return {
                ctype: "boolean",
                value: !1
            };
            for(var e = 0; e < a1.value.length; e++)if (!g.isNumberVector(a1.value[e]).value) return {
                ctype: "boolean",
                value: !1
            };
            return {
                ctype: "boolean",
                value: !0
            };
        };
        g._helper.isNumberMatrixMN = function(a1, e, b) {
            return g.isNumberMatrix(a1).value && a1.value.length === e && a1.value[0].value.length === b;
        };
        g.scalproduct = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = {
                ctype: "number",
                value: {
                    real: 0,
                    imag: 0
                }
            }, c = 0; c < e.value.length; c++){
                var d = a1.value[c], g = e.value[c];
                if ("number" === d.ctype && "number" === g.ctype) b = l.add(l.mult(d, g), b);
                else return h;
            }
            return b;
        };
        g.sesquilinearproduct = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = 0, c = 0, d = 0; d < e.value.length; d++){
                var g = a1.value[d].value, f = e.value[d].value;
                b += g.real * f.real + g.imag * f.imag;
                c += g.real * f.imag - g.imag * f.real;
            }
            return l.complex(b, c);
        };
        g.normSquared = function(a1) {
            for(var e = 0, b = 0; b < a1.value.length; b++){
                var c = a1.value[b].value;
                e += c.real * c.real + c.imag * c.imag;
            }
            return l.real(e);
        };
        g.productMV = function(a1, e) {
            if (a1.value[0].value.length !== e.value.length) return h;
            for(var b = [], c = 0; c < a1.value.length; c++){
                for(var d = {
                    ctype: "number",
                    value: {
                        real: 0,
                        imag: 0
                    }
                }, f = a1.value[c], k = 0; k < e.value.length; k++){
                    var m = f.value[k], n = e.value[k];
                    if ("number" === m.ctype && "number" === n.ctype) d = l.add(l.mult(m, n), d);
                    else return h;
                }
                b[c] = d;
            }
            return g.turnIntoCSList(b);
        };
        g.productVM = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = [], c = 0; c < e.value[0].value.length; c++){
                for(var d = {
                    ctype: "number",
                    value: {
                        real: 0,
                        imag: 0
                    }
                }, f = 0; f < a1.value.length; f++){
                    var k = a1.value[f], m = e.value[f].value[c];
                    if ("number" === k.ctype && "number" === m.ctype) d = l.add(l.mult(k, m), d);
                    else return h;
                }
                b[c] = d;
            }
            return g.turnIntoCSList(b);
        };
        g.productMM = function(a1, e) {
            if (a1.value[0].value.length !== e.value.length) return h;
            for(var b = [], c = 0; c < a1.value.length; c++){
                var d = g.productVM(a1.value[c], e);
                b[c] = d;
            }
            return g.turnIntoCSList(b);
        };
        g.mult = function(a1, e) {
            return a1.value.length === e.value.length && g.isNumberVector(a1).value && g.isNumberVector(e).value ? g.scalproduct(a1, e) : g.isNumberMatrix(a1).value && e.value.length === a1.value[0].value.length && g.isNumberVector(e).value ? g.productMV(a1, e) : g.isNumberMatrix(e).value && a1.value.length === e.value.length && g.isNumberVector(a1).value ? g.productVM(a1, e) : g.isNumberMatrix(a1).value && g.isNumberMatrix(e).value && e.value.length === a1.value[0].value.length ? g.productMM(a1, e) : h;
        };
        g.projectiveDistMinScal = function(a1, e) {
            var b = g.abs(a1), c = g.abs(e);
            if (0 === b.value.real || 0 === c.value.real) return 0;
            var d = g.conjugate(e);
            d = g.scalproduct(a1, d);
            d = l._helper.isAlmostZero(d) ? l.real(1) : l.div(d, l.abs(d));
            a1 = g.scaldiv(b, a1);
            e = g.scaldiv(c, e);
            e = g.scalmult(d, e);
            c = g.abs(g.add(a1, e));
            e = g.abs(g.sub(a1, e));
            return Math.min(c.value.real, e.value.real);
        };
        g.conicDist = function(a1, e) {
            a1 = Ga(a1);
            e = Ga(e);
            return g.projectiveDistMinScal(a1, e);
        };
        g.crossOperator = function(a1) {
            var e = a1.value[0], b = a1.value[1];
            a1 = a1.value[2];
            return g.turnIntoCSList([
                g.turnIntoCSList([
                    l.zero,
                    l.neg(a1),
                    b
                ]),
                g.turnIntoCSList([
                    a1,
                    l.zero,
                    l.neg(e)
                ]),
                g.turnIntoCSList([
                    l.neg(b),
                    e,
                    l.zero
                ])
            ]);
        };
        g.cross = function(a1, e) {
            var b = l.sub(l.mult(a1.value[1], e.value[2]), l.mult(a1.value[2], e.value[1])), c = l.sub(l.mult(a1.value[2], e.value[0]), l.mult(a1.value[0], e.value[2]));
            a1 = l.sub(l.mult(a1.value[0], e.value[1]), l.mult(a1.value[1], e.value[0]));
            return g.turnIntoCSList([
                b,
                c,
                a1
            ]);
        };
        g.crossratio3harm = function(a1, e, b, c, d) {
            var x = g.det3(a1, b, d), v = g.det3(e, c, d);
            a1 = g.det3(a1, c, d);
            e = g.det3(e, b, d);
            x = l.mult(x, v);
            v = l.mult(a1, e);
            return g.turnIntoCSList([
                x,
                v
            ]);
        };
        g.crossratio3 = function(a1, e, b, c, d) {
            a1 = g.crossratio3harm(a1, e, b, c, d);
            return l.div(a1.value[0], a1.value[1]);
        };
        g.veronese = function(a1) {
            var e = l.mult(a1.value[0], a1.value[0]), b = l.mult(a1.value[1], a1.value[1]), c = l.mult(a1.value[2], a1.value[2]), d = l.mult(a1.value[0], a1.value[1]), f = l.mult(a1.value[0], a1.value[2]);
            a1 = l.mult(a1.value[1], a1.value[2]);
            return g.turnIntoSCList([
                e,
                b,
                c,
                d,
                f,
                a1
            ]);
        };
        g.matrixFromVeronese = function(a1) {
            var e = a1.value[0], b = a1.value[1], c = a1.value[2], d = l.realmult(.5, a1.value[3]), f = l.realmult(.5, a1.value[4]);
            a1 = l.realmult(.5, a1.value[5]);
            return g.turnIntoCSList([
                g.turnIntoCSList([
                    e,
                    d,
                    f
                ]),
                g.turnIntoCSList([
                    d,
                    b,
                    a1
                ]),
                g.turnIntoCSList([
                    f,
                    a1,
                    c
                ])
            ]);
        };
        g.det2 = function(a1, e) {
            var b = l.mult(a1.value[0], e.value[1]);
            return b = l.sub(b, l.mult(a1.value[1], e.value[0]));
        };
        g.det3 = function(a1, e, b) {
            return l.complex(a1.value[0].value.real * e.value[1].value.real * b.value[2].value.real - a1.value[0].value.imag * e.value[1].value.imag * b.value[2].value.real - a1.value[0].value.imag * e.value[1].value.real * b.value[2].value.imag - a1.value[0].value.real * e.value[1].value.imag * b.value[2].value.imag + a1.value[2].value.real * e.value[0].value.real * b.value[1].value.real - a1.value[2].value.imag * e.value[0].value.imag * b.value[1].value.real - a1.value[2].value.imag * e.value[0].value.real * b.value[1].value.imag - a1.value[2].value.real * e.value[0].value.imag * b.value[1].value.imag + a1.value[1].value.real * e.value[2].value.real * b.value[0].value.real - a1.value[1].value.imag * e.value[2].value.imag * b.value[0].value.real - a1.value[1].value.imag * e.value[2].value.real * b.value[0].value.imag - a1.value[1].value.real * e.value[2].value.imag * b.value[0].value.imag - a1.value[0].value.real * e.value[2].value.real * b.value[1].value.real + a1.value[0].value.imag * e.value[2].value.imag * b.value[1].value.real + a1.value[0].value.imag * e.value[2].value.real * b.value[1].value.imag + a1.value[0].value.real * e.value[2].value.imag * b.value[1].value.imag - a1.value[2].value.real * e.value[1].value.real * b.value[0].value.real + a1.value[2].value.imag * e.value[1].value.imag * b.value[0].value.real + a1.value[2].value.imag * e.value[1].value.real * b.value[0].value.imag + a1.value[2].value.real * e.value[1].value.imag * b.value[0].value.imag - a1.value[1].value.real * e.value[0].value.real * b.value[2].value.real + a1.value[1].value.imag * e.value[0].value.imag * b.value[2].value.real + a1.value[1].value.imag * e.value[0].value.real * b.value[2].value.imag + a1.value[1].value.real * e.value[0].value.imag * b.value[2].value.imag, -a1.value[0].value.imag * e.value[1].value.imag * b.value[2].value.imag + a1.value[0].value.imag * e.value[1].value.real * b.value[2].value.real + a1.value[0].value.real * e.value[1].value.real * b.value[2].value.imag + a1.value[0].value.real * e.value[1].value.imag * b.value[2].value.real - a1.value[2].value.imag * e.value[0].value.imag * b.value[1].value.imag + a1.value[2].value.imag * e.value[0].value.real * b.value[1].value.real + a1.value[2].value.real * e.value[0].value.real * b.value[1].value.imag + a1.value[2].value.real * e.value[0].value.imag * b.value[1].value.real - a1.value[1].value.imag * e.value[2].value.imag * b.value[0].value.imag + a1.value[1].value.imag * e.value[2].value.real * b.value[0].value.real + a1.value[1].value.real * e.value[2].value.real * b.value[0].value.imag + a1.value[1].value.real * e.value[2].value.imag * b.value[0].value.real + a1.value[0].value.imag * e.value[2].value.imag * b.value[1].value.imag - a1.value[0].value.imag * e.value[2].value.real * b.value[1].value.real - a1.value[0].value.real * e.value[2].value.real * b.value[1].value.imag - a1.value[0].value.real * e.value[2].value.imag * b.value[1].value.real + a1.value[2].value.imag * e.value[1].value.imag * b.value[0].value.imag - a1.value[2].value.imag * e.value[1].value.real * b.value[0].value.real - a1.value[2].value.real * e.value[1].value.real * b.value[0].value.imag - a1.value[2].value.real * e.value[1].value.imag * b.value[0].value.real + a1.value[1].value.imag * e.value[0].value.imag * b.value[2].value.imag - a1.value[1].value.imag * e.value[0].value.real * b.value[2].value.real - a1.value[1].value.real * e.value[0].value.real * b.value[2].value.imag - a1.value[1].value.real * e.value[0].value.imag * b.value[2].value.real);
        };
        g.det4m = function(a1) {
            var e = a1.value, b = e[0].value, c = b[0].value, d = +c.real, g = +c.imag;
            c = b[1].value;
            var f = +c.real, h = +c.imag;
            c = b[2].value;
            var k = +c.real, m = +c.imag;
            c = b[3].value;
            var n = +c.real, p = +c.imag;
            b = e[1].value;
            c = b[0].value;
            var q = +c.real, r = +c.imag;
            c = b[1].value;
            var t = +c.real, u = +c.imag;
            c = b[2].value;
            var w = +c.real, y = +c.imag;
            c = b[3].value;
            b = +c.real;
            c = +c.imag;
            a1 = d * t - g * u - f * q + h * r;
            var z = d * u + g * t - f * r - h * q, C = d * w - g * y - k * q + m * r, A = d * y + g * w - k * r - m * q, B = d * b - g * c - n * q + p * r, D = d * c + g * b - n * r - p * q, E = f * w - h * y - k * t + m * u, F = f * y + h * w - k * u - m * t, G = f * b - h * c - n * t + p * u, H = f * c + h * b - n * u - p * t, I = k * b - m * c - n * w + p * y, J = k * c + m * b - n * y - p * w;
            b = e[2].value;
            c = b[0].value;
            d = +c.real;
            g = +c.imag;
            c = b[1].value;
            f = +c.real;
            h = +c.imag;
            c = b[2].value;
            k = +c.real;
            m = +c.imag;
            c = b[3].value;
            n = +c.real;
            p = +c.imag;
            b = e[3].value;
            c = b[0].value;
            q = +c.real;
            r = +c.imag;
            c = b[1].value;
            t = +c.real;
            u = +c.imag;
            c = b[2].value;
            w = +c.real;
            y = +c.imag;
            c = b[3].value;
            b = +c.real;
            c = +c.imag;
            e = d * t - g * u - f * q + h * r;
            var L = d * u + g * t - f * r - h * q, K = d * w - g * y - k * q + m * r, M = d * y + g * w - k * r - m * q, P = d * b - g * c - n * q + p * r;
            d = d * c + g * b - n * r - p * q;
            g = f * w - h * y - k * t + m * u;
            q = f * y + h * w - k * u - m * t;
            r = f * b - h * c - n * t + p * u;
            f = f * c + h * b - n * u - p * t;
            h = k * b - m * c - n * w + p * y;
            k = k * c + m * b - n * y - p * w;
            return l.complex(a1 * h - z * k - C * r + A * f + B * g - D * q + E * P - F * d - G * K + H * M + I * e - J * L, a1 * k + z * h - C * f - A * r + B * q + D * g + E * d + F * P - G * M - H * K + I * L + J * e);
        };
        g.eucangle = function(a1, e) {
            var b = g.cross(a1, g.linfty);
            a1 = g.cross(e, g.linfty);
            e = g.det3(g.ez, b, g.ii);
            b = g.det3(g.ez, b, g.jj);
            var c = g.det3(g.ez, a1, g.ii);
            a1 = g.det3(g.ez, a1, g.jj);
            e = l.div(l.mult(e, a1), l.mult(c, b));
            e = l.log(e);
            return e = l.mult(e, l.complex(0, .5));
        };
        g.zerovector = function(a1) {
            a1 = Math.floor(a1.value.real);
            for(var e = Array(a1), b = 0; b < a1; b++)e[b] = 0;
            return g.realVector(e);
        };
        g.zeromatrix = function(a1, e) {
            a1 = Math.floor(a1.value.real);
            for(var b = Array(a1), c = 0; c < a1; c++)b[c] = g.zerovector(e);
            return g.turnIntoCSList(b);
        };
        g.vandermonde = function(a1) {
            for(var e = a1.value.length, b = g.zeromatrix(e, e), c = 0; c < e; c++)for(var d = 0; d < e; d++)b.value[c].value[d] = l.pow(a1.value[c], l.real(d - 1));
            return b;
        };
        g.transpose = function(a1) {
            for(var e = [], b = a1.value[0].value.length, c = a1.value.length, d = 0; d < b; d++){
                for(var f = [], h = 0; h < c; h++)f[h] = a1.value[h].value[d];
                e[d] = g.turnIntoCSList(f);
            }
            return g.turnIntoCSList(e);
        };
        g.column = function(a1, e) {
            var b = [], c = a1.value.length;
            e = Math.floor(e.value.real - 1);
            for(var d = 0; d < c; d++)b[d] = a1.value[d].value[e];
            return g.turnIntoCSList(b);
        };
        g.row = function(a1, e) {
            var b = [], c = a1.value[0].value.length;
            e = Math.floor(e.value.real - 1);
            for(var d = 0; d < c; d++)b[d] = a1.value[e].value[d];
            return g.turnIntoCSList(b);
        };
        g.adjoint2 = function(a1) {
            var e = a1.value[0].value[0], b = a1.value[1].value[0], c = Array(2);
            c[0] = g.turnIntoCSList([
                a1.value[1].value[1],
                l.neg(a1.value[0].value[1])
            ]);
            c[1] = g.turnIntoCSList([
                l.neg(b),
                e
            ]);
            return c = g.turnIntoCSList(c);
        };
        g.adjoint3 = function(a1) {
            var e = a1.value[0].value;
            var b = e[0].value;
            var c = b.real;
            var d = b.imag;
            b = e[1].value;
            var g = b.real;
            var f = b.imag;
            b = e[2].value;
            var h = b.real;
            var k = b.imag;
            e = a1.value[1].value;
            b = e[0].value;
            var l = b.real;
            var m = b.imag;
            b = e[1].value;
            var n = b.real;
            var p = b.imag;
            b = e[2].value;
            var q = b.real;
            var r = b.imag;
            e = a1.value[2].value;
            b = e[0].value;
            a1 = b.real;
            var t = b.imag;
            b = e[1].value;
            var u = b.real;
            var w = b.imag;
            b = e[2].value;
            e = b.real;
            b = b.imag;
            return {
                ctype: "list",
                value: [
                    {
                        ctype: "list",
                        value: [
                            {
                                ctype: "number",
                                value: {
                                    real: n * e - q * u - p * b + r * w,
                                    imag: n * b - q * w - u * r + e * p
                                }
                            },
                            {
                                ctype: "number",
                                value: {
                                    real: -g * e + h * u + f * b - k * w,
                                    imag: -g * b + h * w + u * k - e * f
                                }
                            },
                            {
                                ctype: "number",
                                value: {
                                    real: g * q - h * n - f * r + k * p,
                                    imag: g * r - h * p - n * k + q * f
                                }
                            }
                        ]
                    },
                    {
                        ctype: "list",
                        value: [
                            {
                                ctype: "number",
                                value: {
                                    real: -l * e + q * a1 + m * b - r * t,
                                    imag: -l * b + q * t + a1 * r - e * m
                                }
                            },
                            {
                                ctype: "number",
                                value: {
                                    real: c * e - h * a1 - d * b + k * t,
                                    imag: c * b - h * t - a1 * k + e * d
                                }
                            },
                            {
                                ctype: "number",
                                value: {
                                    real: -c * q + h * l + d * r - k * m,
                                    imag: -c * r + h * m + l * k - q * d
                                }
                            }
                        ]
                    },
                    {
                        ctype: "list",
                        value: [
                            {
                                ctype: "number",
                                value: {
                                    real: l * u - n * a1 - m * w + p * t,
                                    imag: l * w - n * t - a1 * p + u * m
                                }
                            },
                            {
                                ctype: "number",
                                value: {
                                    real: -c * u + g * a1 + d * w - f * t,
                                    imag: -c * w + g * t + a1 * f - u * d
                                }
                            },
                            {
                                ctype: "number",
                                value: {
                                    real: c * n - g * l - d * p + f * m,
                                    imag: c * p - g * m - l * f + n * d
                                }
                            }
                        ]
                    }
                ]
            };
        };
        g.inverse = function(a1) {
            var e = a1.value.length;
            if (e !== a1.value[0].value.length) return console.log("Inverse works only for square matrices"), h;
            if (2 === e) return g.scaldiv(g.det(a1), g.adjoint2(a1));
            if (3 === e) return g.scaldiv(g.det(a1), g.adjoint3(a1));
            e = g.LUdecomp(a1);
            a1 = a1.value.length;
            var b = l.real(0), c = l.real(1), d = g.zerovector(l.real(a1));
            d.value[0] = c;
            for(var f = Array(a1), k = 0; k < a1; k++)f[k] = g._helper.LUsolve(e, d), d.value[k] = b, d.value[k + 1] = c;
            f = g.turnIntoCSList(f);
            return f = g.transpose(f);
        };
        g.linearsolve = function(a1, e) {
            return 2 === a1.value.length ? g.linearsolveCramer2(a1, e) : 3 === a1.value.length ? g.linearsolveCramer3(a1, e) : g.LUsolve(a1, e);
        };
        g.getDiag = function(a1) {
            if (a1.value.length !== a1.value[0].value.length) return h;
            for(var e = Array(a1.value.length), b = 0; b < a1.value.length; b++)e[b] = a1.value[b].value[b];
            return g.turnIntoCSList(e);
        };
        g.getSubDiag = function(a1) {
            if (a1.value.length !== a1.value[0].value.length) return h;
            for(var e = Array(a1.value.length - 1), b = 0; b < a1.value.length - 1; b++)e[b] = a1.value[b + 1].value[b];
            return g.turnIntoCSList(e);
        };
        g.eig2 = function(a1) {
            var e = l.add(a1.value[0].value[0], a1.value[1].value[1]);
            a1 = g.det2(a1.value[0], a1.value[1]);
            var b = l.mult(e, e), c = e = l.mult(e, l.real(.5));
            a1 = l.sqrt(l.sub(l.div(b, l.real(4)), a1));
            e = l.add(e, a1);
            c = l.sub(c, a1);
            return g.turnIntoCSList([
                e,
                c
            ]);
        };
        g.eig = function(a1, e) {
            var b = e || !0, c = a1, d = l.real(c.value.length);
            e = d.value.real;
            l.real(0);
            c = g._helper.QRIteration(c)[0];
            c = g.getDiag(c);
            c = g.sort1(c);
            d = g.idMatrix(d, d);
            var f = Array(e);
            f = g.turnIntoCSList(f);
            if (b) {
                var h, k = 0, m = !1;
                for(b = 0; b < e; b++){
                    if (m) var n = p.value[k];
                    else {
                        var p = c.value[b];
                        p = g.sub(a1, g.scalmult(p, d));
                        p = g.nullSpace(p);
                        n = p.value[0];
                        void 0 !== n && (h = n);
                    }
                    void 0 === n && (n = h);
                    1E-8 > g.abs(n).value.real && 0 === k && (n = g._helper.inverseIteration(a1, c.value[b]));
                    f.value[b] = g._helper.isAlmostZeroVec(n) ? n : g.scaldiv(g.abs(n), n);
                    b < e - 1 && ((m = 1E-6 > l.abs(l.sub(c.value[b], c.value[b + 1])).value.real) ? k++ : k = 0);
                }
                f = g.transpose(f);
            }
            return g.turnIntoCSList([
                c,
                f
            ]);
        };
        g._helper.isNormalMatrix = function(a1) {
            return 1E-10 > g.abs(g.sub(a1, g.transjugate(a1))).value.real;
        };
        g._helper.QRIteration = function(a1, e) {
            var b = l.real(a1.value.length), c = b.value.real, d = b.value.real;
            l.real(0);
            g.idMatrix(b, b);
            var f = g.zeromatrix(b, b);
            b = g.idMatrix(b, b);
            var h = e ? e : 2500, k = 0, m = Array(d);
            for(e = 0; e < h; e++){
                var n = g._helper.getBlock(a1, [
                    d - 2,
                    d - 1
                ], [
                    d - 2,
                    d - 1
                ]);
                var p = g.eig2(n);
                n = p.value[0];
                p = p.value[1];
                g.abs(n);
                g.abs(p);
                var q = a1.value[d - 1].value[d - 1];
                var r = l.abs(l.sub(q, n)).value.real;
                q = l.abs(l.sub(q, p)).value.real;
                p = r < q ? n : p;
                n = g.idMatrix(l.real(d), l.real(d));
                p = g.scalmult(p, n);
                n = g.QRdecomp(g.sub(a1, p));
                a1 = u.mult(n.R, n.Q);
                a1 = g.add(a1, p);
                n.Q = g._helper.buildBlockMatrix(n.Q, g.idMatrix(l.real(k), l.real(k)));
                b = u.mult(b, n.Q);
                if (1E-48 > l.abs2(a1.value[a1.value.length - 1].value[a1.value[0].value.length - 2]).value.real && 1 < d) {
                    m[c - k - 1] = a1.value[d - 1].value[d - 1];
                    for(e = 0; e < d; e++)f.value[d - 1].value[e] = a1.value[d - 1].value[e], f.value[e].value[d - 1] = a1.value[e].value[d - 1];
                    a1 = g._helper.getBlock(a1, [
                        0,
                        d - 2
                    ], [
                        0,
                        d - 2
                    ]);
                    k++;
                    d--;
                }
                if (1 === d) {
                    f.value[0].value[0] = a1.value[0].value[0];
                    break;
                }
                if (g._helper.isUpperTriangular(a1)) {
                    for(e = 0; e < d; e++)f.value[e].value[e] = a1.value[e].value[e];
                    break;
                }
            }
            return [
                f,
                b
            ];
        };
        g.rank = function(a1, e) {
            return g.RRQRdecomp(a1, e).rank;
        };
        g._helper.isAlmostZeroVec = function(a1) {
            for(var e = a1.value.length, b = 0; b < e; b++)if (!l._helper.isAlmostZero(a1.value[b])) return !1;
            return !0;
        };
        g._helper.isLowerTriangular = function(a1) {
            for(var e = a1.value.length, b = a1.value[0].value.length, c = 0; c < e; c++)for(var d = c + 1; d < b; d++)if (!l._helper.isAlmostZero(a1.value[c].value[d])) return !1;
            return !0;
        };
        g._helper.isUpperTriangular = function(a1) {
            return g._helper.isLowerTriangular(g.transpose(a1));
        };
        g._helper.isAlmostId = function(a1) {
            var e = a1.value.length, b = l.real(e);
            if (e !== a1.value[0].value.length) return !1;
            a1 = g.sub(a1, g.idMatrix(b), b);
            for(b = 0; b < e; b++)for(var c = 0; c < e; c++)if (1E-16 < l.abs(a1.value[b].value[c]).value.real) return !1;
            return !0;
        };
        g.nullSpace = function(a1, e) {
            var b = a1.value.length;
            e = g.RRQRdecomp(g.transjugate(a1), e);
            a1 = g.transpose(e.Q);
            e = b - e.rank.value.real;
            var c = Array(e);
            a1.value.reverse();
            for(var d, f = 0; f < e; f++)d = a1.value[f], c[f] = g.scaldiv(g.abs(d), d);
            c = g.turnIntoCSList(c);
            return 0 < c.value.length ? c : g.turnIntoCSList([
                g.zerovector(l.real(b))
            ]);
        };
        g._helper.isAlmostDiagonal = function(a1) {
            var e = a1.value.length;
            l.real(e);
            l.real(0);
            if (e !== a1.value[0].value.length) return !1;
            for(var b = 0; b < e; b++)for(var c = 0; c < e; c++)if (b !== c && 1E-16 < l.abs(a1.value[b].value[c]).value.real) return !1;
            return !0;
        };
        g._helper.inverseIteration = function(a1, e) {
            console.log("warning: code untested");
            for(var b = a1.value.length, c = Array(b), d = 0; d < b; d++)c[d] = 2 * Math.random() - .5;
            c = g.realVector(c);
            b = g.idMatrix(l.real(b), l.real(b));
            e = l.add(e, l.real(.1 * Math.random() - .5));
            for(d = 0; 100 > d; d++)c = g.scaldiv(g.abs(c), c), c = g.LUsolve(g.sub(a1, g.scalmult(e, b)), JSON.parse(JSON.stringify(c)));
            return g.scaldiv(g.abs(c), c);
        };
        g._helper.toHessenberg = function(a1) {
            var e = JSON.parse(JSON.stringify(a1)), b = e.value.length, c = l.real(b - 1), d = l.real(b);
            l.real(1);
            if (g._helper.isUpperTriangular(e)) return [
                g.idMatrix(c, c),
                a1
            ];
            a1 = g.idMatrix(d, d);
            for(d = 1; d < b - 1; d++){
                var f = g.column(e, l.real(d));
                f.value = f.value.splice(d);
                var h = g.abs2(f).value.real;
                1E-16 < h && (f = g._helper.getHouseHolder(f), a1 = u.mult(a1, f), e = u.mult(u.mult(f, e), f));
                c.value.real--;
            }
            return [
                a1,
                e
            ];
        };
        g._helper.swapEl = function(a1, e, b) {
            if ("[object Array]" === Object.prototype.toString.call(a1)) {
                var c = a1[e];
                a1[e] = a1[b];
                a1[b] = c;
            } else "list" === a1.ctype && (c = a1.value[e], a1.value[e] = a1.value[b], a1.value[b] = c);
        };
        g.RRQRdecomp = function(a1, e) {
            var b = Math.sqrt(l.eps);
            void 0 !== e && (b = .1 * e.value.real);
            e = b * b;
            var c;
            b = a1.value.length;
            var d = l.real(b), f = l.real(1), h = g._helper.unitvector(l.real(a1.value.length), f), k = g.idMatrix(d, d), m = JSON.parse(JSON.stringify(a1)), n = g.transpose(a1);
            a1 = Array(b);
            for(c = 0; c < b; c++)a1[c] = g.abs2(n.value[c]);
            a1 = g.turnIntoCSList(a1);
            n = Array(b);
            for(c = 0; c < b; c++)n[c] = c;
            c = g.maxIndex(a1, l.abs);
            for(var p = a1.value[c], q = 0, r = 0; 1E-16 < l.abs2(p).value.real; r++){
                q++;
                g._helper.swapColumn(m, r, c);
                g._helper.swapEl(a1, r, c);
                g._helper.swapEl(n, r, c);
                c = g._helper.getBlock(m, [
                    r
                ], [
                    r
                ]);
                c = g.column(c, f);
                p = g.abs2(c).value.real;
                1E-8 < p && (c = g._helper.getHouseHolder(c), c = g._helper.buildBlockMatrix(g.idMatrix(l.real(r), l.real(r)), c), k = u.mult(k, g.transjugate(c)), m = u.mult(c, m));
                for(c = r + 1; c < b; c++)a1.value[c] = l.sub(a1.value[c], l.mult(m.value[r].value[c], l.conjugate(m.value[r].value[c])));
                c = g.maxIndex(a1, l.abs2, r + 1);
                p = a1.value[c];
                if (r + 2 === b) {
                    l.abs(p).value.real > e && q++;
                    break;
                }
                d = l.sub(d, f);
                h.value = h.value.splice(0, h.value.length - 1);
            }
            return {
                Q: k,
                R: m,
                P: g.turnIntoCSList(n),
                rank: l.real(q)
            };
        };
        g._helper.getHouseHolder = function(a1) {
            var e = l.real(a1.value.length);
            if (1E-16 > g.abs2(a1)) return g.idMatrix(e, e);
            var b = l.real(1), c = g._helper.unitvector(l.real(a1.value.length), b);
            var d = g._helper.QRgetAlpha(a1, 0);
            d = g.sub(a1, g.scalmult(d, c));
            d = g.scaldiv(g.abs(d), d);
            a1 = l.div(g.sesquilinearproduct(a1, d), g.sesquilinearproduct(d, a1));
            e = g.idMatrix(e, e);
            return e = g.sub(e, g.scalmult(l.add(b, a1), g._helper.transposeMult(d, g.conjugate(d))));
        };
        g._helper.reOrderbyPivots = function(a1, e) {
            var b = a1.value.length.length;
            a1 = g.transpose(a1);
            b = Array(b);
            for(var c = 0; c < e.length; c++)b[e[c]] = a1.value[c];
            b = g.turnIntoCSList(b);
            return g.transpose(b);
        };
        g.QRdecomp = function(a1) {
            var e = a1.value.length, b = l.real(e);
            if (g._helper.isUpperTriangular(a1)) return {
                Q: g.idMatrix(b, b),
                R: a1
            };
            var c = l.real(1), d = g._helper.unitvector(l.real(a1.value.length), c), f = g.idMatrix(b, b);
            a1 = JSON.parse(JSON.stringify(a1));
            for(var h = 0;; h++){
                var k = g._helper.getBlock(a1, [
                    h
                ], [
                    h
                ]);
                k = g.column(k, c);
                var m = g.abs2(k).value.real;
                1E-8 < m && (k = g._helper.getHouseHolder(k), k = g._helper.buildBlockMatrix(g.idMatrix(l.real(h), l.real(h)), k), f = u.mult(f, g.transjugate(k)), a1 = u.mult(k, a1));
                if (h + 2 === e) break;
                b = l.sub(b, c);
                d.value = d.value.splice(0, d.value.length - 1);
            }
            return {
                Q: f,
                R: a1
            };
        };
        g._helper.swapColumn = function(a1, e, b) {
            for(var c, d = 0; d < a1.value.length; d++)c = a1.value[d].value[e], a1.value[d].value[e] = a1.value[d].value[b], a1.value[d].value[b] = c;
        };
        g._helper.buildBlockMatrix = function(a1, e) {
            if (0 === a1.value.length) return e;
            if (0 === e.value.length) return a1;
            var b = a1.value.length, c = a1.value[0].value.length, d = c + e.value[0].value.length;
            d = g.zeromatrix(l.real(b + e.value.length), l.real(d));
            for(var f = 0; f < a1.value.length; f++)for(var h = 0; h < a1.value[0].value.length; h++)d.value[f].value[h] = a1.value[f].value[h];
            for(a1 = 0; a1 < e.value.length; a1++)for(f = 0; f < e.value[0].value.length; f++)d.value[b + a1].value[c + f] = e.value[a1].value[f];
            return d;
        };
        g._helper.getBlock = function(a1, e, b) {
            a1 = JSON.parse(JSON.stringify(a1));
            var c = e[0], d = b[0];
            e = void 0 === e[1] ? a1.value.length : e[1];
            b = void 0 === b[1] ? a1.value[0].value.length : b[1];
            e++;
            b++;
            a1.value = a1.value.slice(c, e);
            for(c = 0; c < a1.value.length; c++)a1.value[c].value = a1.value[c].value.slice(d, b);
            return a1;
        };
        g._helper.setBlock = function(a1, e, b) {
            a1 = JSON.parse(JSON.stringify(a1));
            var c = b[0];
            b = b[1];
            for(var d = e.value.length, x = e.value[0].value.length, g = 0; g < d; g++)for(var f = 0; f < x; f++)a1.value[c + g].value[b + f] = e.value[g].value[f];
            return a1;
        };
        g._helper.transposeMult = function(a1, e) {
            if (a1.value.length !== e.value.length) return h;
            for(var b = a1.value.length, c = Array(b), d = 0; d < b; d++)c[d] = g.scalmult(a1.value[d], e);
            return g.turnIntoCSList(c);
        };
        g._helper.QRgetAlpha = function(a1, e) {
            return 0 > a1.value[e].value.real ? g.abs(a1) : l.neg(g.abs(a1));
        };
        g.LUdecomp = function(a1) {
            a1 = JSON.parse(JSON.stringify(a1));
            var e, b, c = 0, d = a1.value.length, g = d - 1, f = Array(d);
            for(b = 0; b < d; ++b){
                var h = b;
                var k = a1.value[b];
                var m = l.abs(k.value[b]).value.real;
                for(e = b + 1; e < d; ++e){
                    var n = l.abs(a1.value[e].value[b]);
                    m < n.value.real && (m = n.value.real, h = e);
                }
                m < l.eps && console.log("Warning: singular matrix!");
                f[b] = h;
                h !== b && (a1.value[b] = a1.value[h], a1.value[h] = k, k = a1.value[b], c++);
                e = k.value[b];
                for(n = b + 1; n < d; ++n)a1.value[n].value[b] = l.div(a1.value[n].value[b], e);
                for(n = b + 1; n < d; ++n){
                    h = a1.value[n];
                    for(e = b + 1; e < g; ++e)h.value[e] = l.sub(h.value[e], l.mult(h.value[b], k.value[e])), ++e, h.value[e] = l.sub(h.value[e], l.mult(h.value[b], k.value[e]));
                    e === g && (h.value[e] = l.sub(h.value[e], l.mult(h.value[b], k.value[e])));
                }
            }
            return {
                LU: a1,
                P: f,
                TransPos: c
            };
        };
        g.LUsolve = function(a1, e) {
            a1 = g.LUdecomp(a1);
            return g._helper.LUsolve(a1, e);
        };
        g._helper.LUsolve = function(a1, e) {
            var b = JSON.parse(JSON.stringify(e));
            e = a1.LU;
            var c = e.value.length, d = JSON.parse(JSON.stringify(b)), g = a1.P;
            for(a1 = c - 1; -1 !== a1; --a1)d.value[a1] = b.value[a1];
            for(a1 = 0; a1 < c; ++a1){
                b = g[a1];
                if (g[a1] !== a1) {
                    var f = d.value[a1];
                    d.value[a1] = d.value[b];
                    d.value[b] = f;
                }
                f = e.value[a1];
                for(b = 0; b < a1; ++b)d.value[a1] = l.sub(d.value[a1], l.mult(d.value[b], f.value[b]));
            }
            for(a1 = c - 1; 0 <= a1; --a1){
                f = e.value[a1];
                for(b = a1 + 1; b < c; ++b)d.value[a1] = l.sub(d.value[a1], l.mult(d.value[b], f.value[b]));
                d.value[a1] = l.div(d.value[a1], f.value[a1]);
            }
            return d;
        };
        g.linearsolveCramer2 = function(a1, e) {
            var b = g.column(a1, l.real(1)), c = g.column(a1, l.real(2));
            a1 = g.det2(b, c);
            l._helper.isZero(a1) && console.log("A is not regular!");
            c = g.det2(e, c);
            c = l.div(c, a1);
            e = g.det2(b, e);
            e = l.div(e, a1);
            return g.turnIntoCSList([
                c,
                e
            ]);
        };
        g.linearsolveCramer3 = function(a1, e) {
            var b = g.column(a1, l.real(1)), c = g.column(a1, l.real(2)), d = g.column(a1, l.real(3));
            a1 = g.det3(b, c, d);
            l._helper.isZero(a1) && console.log("A is not regular!");
            var f = g.det3(e, c, d);
            d = g.det3(b, e, d);
            e = g.det3(b, c, e);
            e = g.turnIntoCSList([
                f,
                d,
                e
            ]);
            return e = g.scaldiv(a1, e);
        };
        g.linearsolveCGNR = function(a1, e) {
            var b = g.transpose(a1);
            a1 = u.mult(b, a1);
            e = u.mult(b, e);
            return g.linearsolveCG(a1, e);
        };
        g.linearsolveCG = function(a1, e) {
            var b;
            var c = e;
            var d = e = g.sub(e, u.mult(a1, e));
            for(var f = Math.ceil(1.2 * a1.value.length), h = 0; h < f;){
                h++;
                var k = u.mult(a1, d);
                var m = b = g.scalproduct(e, e);
                b = l.div(b, g.scalproduct(d, k));
                c = g.add(c, u.mult(b, d));
                e = g.sub(e, u.mult(b, k));
                if (g.abs(e).value.real < l.eps) break;
                b = g.scalproduct(e, e);
                b = l.div(b, m);
                d = g.add(e, u.mult(b, d));
            }
            h >= f && console.log("CG did not converge");
            return c;
        };
        g.det = function(a1) {
            if (1 === a1.value.length) return a1.value[0].value[0];
            if (2 === a1.value.length) return g.det2(a1.value[0], a1.value[1]);
            if (3 === a1.value.length) return g.det3(a1.value[0], a1.value[1], a1.value[2]);
            if (4 === a1.value.length) return g.det4m(a1);
            var e = a1.value.length, b = l.real(1), c, d = JSON.parse(JSON.stringify(a1));
            for(a1 = 0; a1 < e - 1; a1++){
                var f = a1;
                for(c = a1 + 1; c < e; c++)l.abs(d.value[c].value[a1]).value.real > l.abs(d.value[f].value[a1]).value.real && (f = c);
                f !== a1 && (c = d.value[f], d.value[f] = d.value[a1], d.value[a1] = c, b = l.neg(b));
                var h = d.value[a1];
                for(c = a1 + 1; c < e; c++){
                    var k = d.value[c];
                    var m = l.div(k.value[a1], h.value[a1]);
                    for(f = a1 + 1; f < e - 1; f += 2){
                        var n = f + 1;
                        k.value[f] = l.sub(k.value[f], l.mult(h.value[f], m));
                        k.value[n] = l.sub(k.value[n], l.mult(h.value[n], m));
                    }
                    f !== e && (k.value[f] = l.sub(k.value[f], l.mult(h.value[f], m)));
                }
                if (l._helper.isZero(h.value[a1])) return l.real(0);
                b = l.mult(b, h.value[a1]);
            }
            return l.mult(b, d.value[a1].value[a1]);
        };
        g.LUdet = function(a1) {
            a1 = g.LUdecomp(a1);
            for(var e = a1.LU, b = e.value.length, c = e.value[0].value[0], d = 1; d < b; d++)c = l.mult(c, e.value[d].value[d]);
            1 === a1.TransPos % 2 && (c = l.neg(c));
            return c;
        };
        g.getField = function(a1, e) {
            if ("homog" === e) {
                if (g._helper.isNumberVecN(a1, 3)) return a1;
                if (g._helper.isNumberVecN(a1, 2)) return g.turnIntoCSList([
                    a1.value[0],
                    a1.value[1],
                    l.real(1)
                ]);
            }
            if ("xy" === e) {
                if (g._helper.isNumberVecN(a1, 2)) return a1;
                if (g._helper.isNumberVecN(a1, 3)) return g.turnIntoCSList([
                    l.div(a1.value[0], a1.value[2]),
                    l.div(a1.value[1], a1.value[2])
                ]);
            }
            if ("x" === e && g.isNumberVector(a1)) {
                var b = a1.value.length;
                if (0 < b && 3 !== b) return a1.value[0];
                if (3 === b) return "Point" === a1.usage ? l.div(a1.value[0], a1.value[2]) : a1.value[0];
            }
            if ("y" === e && g.isNumberVector(a1)) {
                b = a1.value.length;
                if (1 < b && 3 !== b) return a1.value[1];
                if (3 === b) return "Point" === a1.usage ? l.div(a1.value[1], a1.value[2]) : a1.value[1];
            }
            return "z" === e && g.isNumberVector(a1) && (b = a1.value.length, 2 < b) ? a1.value[2] : h;
        };
        g.nil = g.turnIntoCSList([]);
        g.ofGeos = function(a1) {
            return g.turnIntoCSList(a1.map(function(a1) {
                return {
                    ctype: "geo",
                    value: a1
                };
            }));
        };
        g._helper.isAlmostFarpoint = function(a1) {
            a1 = g.normalizeMax(a1).value[2];
            return l.abs(a1).value.real < l.eps;
        };
        g.getRandRealVec3 = function(a1, e) {
            var b = l.getRandReal;
            return g.turnIntoCSList([
                b(a1, e),
                b(a1, e),
                b(a1, e)
            ]);
        };
        g.getRandComplexVec3 = function(a1, e) {
            var b = l.getRandComplex;
            return g.turnIntoCSList([
                b(a1, e),
                b(a1, e),
                b(a1, e)
            ]);
        };
        var Ea = {
            _helper: {},
            turnIntoCSJson: function(a1) {
                return {
                    ctype: "JSON",
                    value: a1
                };
            }
        };
        Ea._helper.ShallowClone = function(a1) {
            var e;
            var b = Array.isArray(a1) ? [] : {};
            for(e in a1){
                var c = a1[e];
                b[e] = c;
            }
            return b;
        };
        Ea.getField = function(a1, e) {
            return a1.value && a1.value[e] ? a1.value[e] : h;
        };
        Ea.setField = function(a1, e, b) {
            "undefined" === b.ctype && a1[e] ? delete a1[e] : a1[e] = b;
        };
        Ea.GenFromUserDataEl = function(a1) {
            var e = a1.key;
            a1 = a1.value;
            if (!e || "string" !== e.ctype) return console.log("Error: JSON keys have to be strings."), h;
            if (a1) return {
                key: e.value,
                val: w(a1)
            };
            console.log("Warning: JSON object not defined.");
            return {
                key: e.value,
                val: h
            };
        };
        Ea._helper.GenJSONAtom = function(a1, e) {
            return {
                ctype: "JSON",
                value: {
                    key: u.string(a1),
                    value: e
                }
            };
        };
        Ea._helper.forall = function(a1, e, b, c) {
            var d = "value";
            if (void 0 !== c.iterator) {
                c = w(c.iterator);
                var x = [
                    "key",
                    "value",
                    "pair"
                ];
                "string" === c.ctype && -1 !== x.indexOf(c.value) && (d = c.value);
            }
            if ("value" === d) for(var g in a1){
                L.setvar(e, a1[g]);
                var f = w(b);
            }
            else if ("key" === d) for(var v in a1)L.setvar(e, u.string(v)), f = w(b);
            else for(var h in a1)L.setvar(e, Ea._helper.GenJSONAtom(h, a1[h])), f = w(b);
            return f;
        };
        Ea._helper.niceprint = function(a1, e, b) {
            return "JSON" === a1.ctype ? Ea.niceprint(a1, e, b) : da(a1);
        };
        Ea.niceprint = function(a1, e, b) {
            if (!b && (b = {
                printedWarning: !1,
                visitedMap: {}
            }, b.visitedMap.tracker = new WeakMap, b.visitedMap.level = 0, b.visitedMap.maxLevel = 1E3, b.visitedMap.maxElVisit = 5E3, e && e.maxDepth)) {
                var c = w(e.maxDepth);
                "number" === c.ctype && (b.visitedMap.maxLevel = c.value.real);
            }
            var d = b.visitedMap;
            d.newLevel = !0;
            d.level += 1;
            return "{" + Object.keys(a1.value).sort().map(function(c) {
                var x = a1.value[c];
                if (d.tracker.has(x)) {
                    if (d[x] > d.maxElVisit || d.level > d.maxLevel) return b.printedWarning || (console.log("Warning: We visited a key-value pair very often or encountered a very deeply nested dictionary. Dictionary is probably cyclic. Output will be probably incomplete."), b.printedWarning = !0), c + ":...";
                    d.newLevel && (d.tracker.set(x, d.tracker.get(x) + 1), d.newLevel = !1);
                } else d.tracker.set(x, 1);
                return c + ":" + Ea._helper.niceprint(x, e, b);
            }).join(", ") + "}";
        };
        Ea._helper.handlePrintException = function(a1) {
            a1 instanceof RangeError ? console.log("Warning: Dictionary string could not be generated! Probably large cyclic Dictionary!") : a1 instanceof SyntaxError ? console.log("Warning: Dictionary string could not be parsed!") : console.log("Warning: Dictionary printing failed!");
        };
        var nb = {
            key: function(a1) {
                if ("string" === a1.ctype) return "s" + a1.value.length + ":" + a1.value + ";";
                if ("number" === a1.ctype) return "n" + a1.value.real + "," + a1.value.imag + ";";
                if ("list" === a1.ctype) return "l" + a1.value.length + ":" + a1.value.map(nb.key).join(",") + ";";
                if ("boolean" === a1.ctype) return "b" + a1.value + ";";
                if ("dict" === a1.ctype) return a1 = Object.keys(a1.value).sort(), "d" + a1.length + ":" + a1.join(",") + ";";
                "undefined" !== a1.ctype && Qa.err("Bad dictionary key: " + da(a1));
                return "undef";
            },
            create: function() {
                return {
                    ctype: "dict",
                    value: {}
                };
            },
            clone: function(a1) {
                var e = nb.create(), b;
                for(b in a1.value)a1.value.hasOwnProperty(b) && (e.value[b] = a1.value[b]);
                return e;
            },
            put: function(a1, e, b) {
                a1.value[nb.key(e)] = {
                    key: e,
                    value: b
                };
            },
            get: function(a1, e, b) {
                return (a1 = a1.value[nb.key(e)]) ? a1.value : b;
            },
            niceprint: function(a1) {
                return "{" + Object.keys(a1.value).sort().map(function(e) {
                    e = a1.value[e];
                    return da(e.key) + ":" + da(e.value);
                }).join(", ") + "}";
            }
        }, u = {
            _helper: {},
            order: {
                undefined: 0,
                boolean: 1,
                number: 2,
                term: 3,
                atomic: 4,
                variable: 5,
                geo: 6,
                string: 7,
                list: 8
            },
            string: function(a1) {
                return {
                    ctype: "string",
                    value: a1
                };
            },
            bool: function(a1) {
                return {
                    ctype: "boolean",
                    value: a1
                };
            },
            not: function(a1) {
                return u.bool(!a1.value);
            },
            isLessThan: function(a1, e) {
                return -1 === u.compare(a1, e);
            },
            isEqual: function(a1, e) {
                return 0 === u.compare(a1, e);
            },
            compareResults: function(a1, e) {
                return u.compare(a1.result, e.result);
            },
            compare: function(a1, e) {
                if (a1.ctype !== e.ctype) return u.order[a1.ctype] - u.order[e.ctype];
                if ("number" === a1.ctype) return l._helper.compare(a1, e);
                if ("list" === a1.ctype) return g._helper.compare(a1, e);
                if ("geo" === a1.ctype) return a1.value.name === e.value.name ? 0 : a1.value.name < e.value.name ? -1 : 1;
                if ("string" === a1.ctype) return a1.value === e.value ? 0 : a1.value < e.value ? -1 : 1;
                if ("boolean" === a1.ctype) return a1.value === e.value ? 0 : !1 === a1.value ? -1 : 1;
            },
            add: function(a1, e) {
                return "void" === a1.ctype && "number" === e.ctype || "void" === a1.ctype && "list" === e.ctype ? e : "number" === a1.ctype && "number" === e.ctype ? l.add(a1, e) : "string" === a1.ctype || "string" === e.ctype ? {
                    ctype: "string",
                    value: da(a1) + da(e)
                } : "list" === a1.ctype && "list" === e.ctype ? g.add(a1, e) : h;
            },
            sub: function(a1, e) {
                return "void" === a1.ctype && "number" === e.ctype ? l.neg(e) : "void" === a1.ctype && "list" === e.ctype ? g.neg(e) : "number" === a1.ctype && "number" === e.ctype ? l.sub(a1, e) : "list" === a1.ctype && "list" === e.ctype ? g.sub(a1, e) : h;
            },
            mult: function(a1, e) {
                return "number" === a1.ctype && "number" === e.ctype ? l.mult(a1, e) : "number" === a1.ctype && "list" === e.ctype ? g.scalmult(a1, e) : "list" === a1.ctype && "number" === e.ctype ? g.scalmult(e, a1) : "list" === a1.ctype && "list" === e.ctype ? g.mult(a1, e) : h;
            },
            div: function(a1, e) {
                return "number" === a1.ctype && "number" === e.ctype ? l.div(a1, e) : "list" === a1.ctype && "number" === e.ctype ? g.scaldiv(e, a1) : h;
            },
            max: function(a1, e) {
                return "number" === a1.ctype && "number" === e.ctype ? l.max(a1, e) : "list" === a1.ctype && "list" === e.ctype ? g.max(a1, e) : h;
            },
            min: function(a1, e) {
                return "number" === a1.ctype && "number" === e.ctype ? l.min(a1, e) : "list" === a1.ctype && "list" === e.ctype ? g.min(a1, e) : h;
            },
            wrap: function(a1) {
                if ("number" === typeof a1) return l.real(a1);
                if ("object" === typeof a1 && void 0 !== a1.length) {
                    for(var e = [], b = 0; b < a1.length; b++)e[b] = u.wrap(a1[b]);
                    return g.turnIntoCSList(e);
                }
                return "string" === typeof a1 ? {
                    ctype: "string",
                    value: a1
                } : "boolean" === typeof a1 ? {
                    ctype: "boolean",
                    value: a1
                } : h;
            },
            unwrap: function(a1) {
                if ("object" !== typeof a1 || null === a1) return a1;
                if (Array.isArray(a1)) return a1.map(u.unwrap);
                switch(a1.ctype){
                    case "string":
                    case "boolean":
                        return a1.value;
                    case "number":
                        return 0 === a1.value.imag ? a1.value.real : {
                            r: a1.value.real,
                            i: a1.value.imag
                        };
                    case "list":
                        return a1.value.map(u.unwrap);
                    default:
                        return null;
                }
            },
            withUsage: function(a1, e) {
                return {
                    ctype: a1.ctype,
                    value: a1.value,
                    usage: e
                };
            },
            wrapJSON: function(a1) {
                switch(typeof a1){
                    case "number":
                        return l.real(a1);
                    case "string":
                        return u.string(a1);
                    case "boolean":
                        return u.bool(a1);
                    case "object":
                        if (null === a1) return h;
                        if (Array.isArray(a1)) return g.turnIntoCSList(a1.map(u.wrapJSON));
                        var e = nb.create(), b;
                        for(b in a1)nb.put(e, u.string(b), u.wrapJSON(a1[b]));
                        return e;
                    default:
                        return console.log("Failed to convert " + typeof a1 + " to CindyJS data type"), h;
                }
            },
            identity: function(a1) {
                return a1;
            },
            deeplyEqual: function(a1, e) {
                if ("object" !== typeof a1 || "object" !== typeof e || null === a1 || null === e) return a1 === e;
                var b = 0, c;
                for(c in a1)if (++b, !(c in e && u.deeplyEqual(a1[c], e[c]))) return !1;
                for(c in e)--b;
                return 0 === b;
            }
        }, Ka = {}, S = {};
        S[":"] = gd(":");
        S["\xb0"] = function(a1, e) {
            e = D(a1[0]);
            return "number" === e.ctype && "void" === a1[1].ctype ? u.withUsage(l.realmult(Math.PI / 180, e), "Angle") : h;
        };
        S._ = eb;
        S["^"] = Jc;
        S["√"] = function(a1, e) {
            return "void" === a1[0].ctype ? q.sqrt$1([
                a1[1]
            ], e) : h;
        };
        S["*"] = hd;
        S["\xd7"] = Da;
        S["/"] = Hd;
        S["+"] = Yb;
        S["-"] = Hb;
        S["!"] = function(a1, e) {
            e = D(a1[1]);
            return "void" === a1[0].ctype && "boolean" === e.ctype ? {
                ctype: "boolean",
                value: !e.value
            } : h;
        };
        S["=="] = oc;
        S["~="] = pc;
        S["~<"] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real - a1.value.real <= -l.eps
            } : h;
        };
        S["~>"] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real - a1.value.real >= l.eps
            } : h;
        };
        S["=:="] = gd("=:=");
        S[">="] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real >= a1.value.real
            } : "string" === e.ctype && "string" === a1.ctype ? {
                ctype: "boolean",
                value: e.value >= a1.value
            } : h;
        };
        S["<="] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real <= a1.value.real
            } : "string" === e.ctype && "string" === a1.ctype ? {
                ctype: "boolean",
                value: e.value <= a1.value
            } : h;
        };
        S["~>="] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real - a1.value.real > -l.eps
            } : h;
        };
        S["~<="] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real - a1.value.real < l.eps
            } : h;
        };
        S[">"] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real > a1.value.real
            } : "string" === e.ctype && "string" === a1.ctype ? {
                ctype: "boolean",
                value: e.value > a1.value
            } : h;
        };
        S["<"] = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype && l._helper.isAlmostReal(e) && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: e.value.real < a1.value.real
            } : "string" === e.ctype && "string" === a1.ctype ? {
                ctype: "boolean",
                value: e.value < a1.value
            } : h;
        };
        S["<>"] = oa;
        S["∈"] = function(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === a1.ctype ? g.contains(a1, e) : h;
        };
        S["∉"] = function(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === a1.ctype ? u.not(g.contains(a1, e)) : h;
        };
        S["&"] = Sa;
        S["%"] = Ic;
        S["!="] = oa;
        S["~!="] = function(a1, e) {
            return u.not(pc(a1, e));
        };
        S[".."] = function(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype ? g.sequence(e, a1) : h;
        };
        S["++"] = Ib;
        S["--"] = Lc;
        S["~~"] = Kc;
        S[":>"] = rb;
        S["<:"] = A;
        S["="] = Fb;
        S[":="] = function(a1, e, b) {
            e = "undefined" === a1[1].ctype;
            if ("undefined" === a1[0].ctype || e) return h;
            if ("function" === a1[0].ctype) {
                e = a1[0].oper;
                var c = a1[0].args, d = a1[1], x = 1;
                if (Ka.hasOwnProperty(e)) {
                    x = Ka[e];
                    if (x.definer === b) return h;
                    x = x.generation + 1;
                }
                Ka[e] = {
                    oper: e,
                    body: d,
                    arglist: c,
                    definer: b,
                    generation: x
                };
            }
            "variable" === a1[0].ctype && L.setvar(a1[0].name, a1[1]);
            return h;
        };
        S[":=_"] = function(a1, e) {
            if ("void" !== a1[1].ctype) return h;
            "function" === a1[0].ctype && delete Ka[a1[0].oper];
            return h;
        };
        S["::="] = gd("::=");
        S[";"] = function(a1, e) {
            e = "void" === a1[0].ctype;
            var b = "void" === a1[1].ctype;
            if (e && b) return h;
            if (!e && b) return w(a1[0]);
            e || b || w(a1[0]);
            return b ? h : w(a1[1]);
        };
        da.errorTypes = [
            "_?_",
            "_??_",
            "_???_",
            "___"
        ];
        var q = {}, E = {
            evaluate: function(a1, e, b) {
                if (Ka.hasOwnProperty(a1)) {
                    a1 = Ka[a1];
                    if (void 0 === a1) e = h;
                    else {
                        var c = [];
                        for(b = 0; b < a1.arglist.length; b++)c[b] = w(e[b]);
                        for(b = 0; b < a1.arglist.length; b++)L.newvar(a1.arglist[b].name), L.setvar(a1.arglist[b].name, c[b]);
                        L.pushVstack("*");
                        e = w(a1.body);
                        L.cleanVstack();
                        for(b = 0; b < a1.arglist.length; b++)L.removevar(a1.arglist[b].name);
                    }
                    return e;
                }
                if (c = q[a1]) return c(e, b);
                var d = a1.lastIndexOf("$");
                if (-1 !== d && (d = a1.substr(0, d), c = q[d])) return c(e, b);
                Qa.err("Called undefined function " + d + " (as " + a1 + ")");
                return h;
            },
            equals: function(a1, e) {
                return "number" === a1.ctype && "number" === e.ctype ? {
                    ctype: "boolean",
                    value: a1.value.real === e.value.real && a1.value.imag === e.value.imag
                } : "string" === a1.ctype && "string" === e.ctype || "boolean" === a1.ctype && "boolean" === e.ctype ? {
                    ctype: "boolean",
                    value: a1.value === e.value
                } : "list" === a1.ctype && "list" === e.ctype ? g.equals(a1, e) : "geo" === a1.ctype && "geo" === e.ctype ? {
                    ctype: "boolean",
                    value: a1.value === e.value
                } : {
                    ctype: "boolean",
                    value: !1
                };
            }
        }, L = {};
        L.vars = function() {
            var a1 = {
                pi: l.real(Math.PI),
                "π": l.real(Math.PI),
                i: l.complex(0, 1),
                "true": u.bool(!0),
                "false": u.bool(!1),
                "#": h,
                nil: g.turnIntoCSList([]),
                newline: u.string("\n"),
                tab: u.string("	")
            }, e = [], b;
            for(b in a1)e[b] = [
                a1[b]
            ];
            return e;
        }();
        L.isVariable = function(a1) {
            return this.vars.hasOwnProperty(a1);
        };
        L.create = function(a1) {
            if (this.vars.hasOwnProperty(a1)) return this.vars[a1];
            var e = [
                null
            ];
            return this.vars[a1] = e;
        };
        L.newvar = function(a1) {
            a1 = this.vars[a1];
            a1.push(h);
            return a1;
        };
        L.removevar = function(a1) {
            var e = this.vars[a1];
            0 === e.length && console.error("Removing non-existing " + a1);
            e.pop();
            0 === e.length && console.warn("Removing last " + a1);
        };
        L.setvar = function(a1, e) {
            var b = this.vars[a1];
            0 === b.length && console.error("Setting non-existing variable " + a1);
            void 0 === e && (console.error("Setting variable " + a1 + " to undefined value"), e = h);
            "undefined" === e.ctype ? b[b.length - 1] = e : (a1 = e, null === a1 && (a1 = h), b[b.length - 1] = a1);
        };
        L.undefinedWarning = {};
        L.getvar = function(a1) {
            var e = this.vars[a1] || [];
            0 === e.length && console.error("Getting non-existing variable " + a1);
            e = e[e.length - 1];
            if (null === e) {
                if (r.csnames.hasOwnProperty(a1)) return {
                    ctype: "geo",
                    value: r.csnames[a1]
                };
                console && console.log && void 0 === this.undefinedWarning[a1] && (this.undefinedWarning[a1] = !0, console.log("Warning: Accessing undefined variable: " + a1));
                return h;
            }
            return e;
        };
        L.dump = function(a1) {
            var e = this.vars[a1];
            console.log("*** Dump " + a1);
            for(a1 = 0; a1 < e.length; a1++)console.log(a1 + ":> " + da(e[a1]));
        };
        L.vstack = [];
        L.pushVstack = function(a1) {
            this.vstack.push(a1);
        };
        L.popVstack = function() {
            this.vstack.pop();
        };
        L.cleanVstack = function() {
            for(var a1 = this.vstack; 0 < a1.length && "*" !== a1[a1.length - 1];)this.removevar(a1[a1.length - 1]), a1.pop();
            0 < a1.length && a1.pop();
        };
        var Ha = {
            generalFields: {
                color: "color",
                colorhsb: "",
                size: "size",
                alpha: "alpha",
                fillcolor: "fillcolor",
                fillalpha: "fillalpha",
                isshowing: "isshowing",
                visible: "visible",
                name: "name",
                caption: "caption",
                trace: "",
                tracelength: "",
                selected: "",
                labeled: "labeled",
                labelled: "labeled"
            },
            getGeoField: function(a1, e) {
                return "undefined" !== typeof r.csnames[a1] ? Ha.getField(r.csnames[a1], e) : h;
            },
            setGeoField: function(a1, e, b) {
                return "undefined" !== typeof r.csnames[a1] ? Ha.setField(r.csnames[a1], e, b) : h;
            },
            getField: function(a1, e) {
                if ("P" === a1.kind) {
                    if ("xy" === e) return a1 = g.dehom(a1.homog), u.withUsage(a1, "Point");
                    if ("homog" === e) return u.withUsage(a1.homog, "Point");
                    if ("x" === e) return l.div(a1.homog.value[0], a1.homog.value[2]);
                    if ("y" === e) return l.div(a1.homog.value[1], a1.homog.value[2]);
                    if ("narrow" === e) return u.wrap(a1.narrow);
                }
                if ("L" === a1.kind || "S" === a1.kind) {
                    if ("homog" === e) return u.withUsage(a1.homog, "Line");
                    if ("angle" === e) return a1 = g.eucangle(g.ey, a1.homog), u.withUsage(a1, "Angle");
                    if ("slope" === e) return l.neg(l.div(a1.homog.value[0], a1.homog.value[1]));
                }
                if ("Tr" === a1.kind && "matrix" === e) return a1.matrix;
                if ("C" === a1.kind) {
                    if ("radius" === e) {
                        var b = a1.matrix;
                        a1 = b.value[0].value[0];
                        var c = b.value[0].value[2];
                        e = b.value[1].value[2];
                        b = b.value[2].value[2];
                        l.mult(a1, a1);
                        c = l.div(c, a1);
                        e = l.div(e, a1);
                        a1 = l.div(b, a1);
                        return a1 = l.sqrt(l.sub(l.add(l.mult(c, c), l.mult(e, e)), a1));
                    }
                    if ("size" === e) return a1.size;
                    if ("matrix" === e) return a1.matrix;
                    if ("center" === e) return a1 = m._helper.CenterOfConic(a1.matrix), a1 = g.dehom(a1), u.withUsage(a1, "Point");
                    if ("dualMatrix" === e) return g.normalizeMax(g.adjoint3(a1.matrix));
                    if ("narrow" === e) return u.wrap(a1.narrow);
                }
                if ("Text" === a1.kind) {
                    if ("pressed" === e) return a1.checkbox ? u.bool(a1.checkbox.checked) : u.bool(!1);
                    if ("xy" === e) return a1 = g.dehom(a1.homog), u.withUsage(a1, "Point");
                    if ("homog" === e) return u.withUsage(a1.homog, "Point");
                    if ("x" === e) return l.div(a1.homog.value[0], a1.homog.value[2]);
                    if ("y" === e) return l.div(a1.homog.value[1], a1.homog.value[2]);
                }
                if ("trace" === e) return u.bool(!!a1.drawtrace);
                if ("pinned" === e) return u.bool(!!a1.pinned);
                if (Ha.generalFields[e]) return (a1 = a1[Ha.generalFields[e]]) && a1.ctype ? a1 : "object" !== typeof a1 ? u.wrap(a1) : h;
                if (a1.behavior) {
                    if ("mass" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.mass);
                    if ("radius" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.radius);
                    if ("charge" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.charge);
                    if ("friction" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.friction);
                    if ("vx" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.vx);
                    if ("vy" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.vy);
                    if ("v" === e && "Mass" === a1.behavior.type) return g.realVector([
                        a1.behavior.vx,
                        a1.behavior.vy
                    ]);
                    if ("fx" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.fx);
                    if ("fy" === e && "Mass" === a1.behavior.type) return l.real(a1.behavior.fy);
                    if ("f" === e && "Mass" === a1.behavior.type) return g.realVector([
                        a1.behavior.fx,
                        a1.behavior.fy
                    ]);
                    if ("ldiff" === e && "Spring" === a1.behavior.type) return l.real(a1.behavior.ldiff);
                }
                e = m[a1.type]["get_" + e];
                return "function" === typeof e ? e(a1) : h;
            },
            setField: function(a1, e, b) {
                "color" === e && g._helper.isNumberVecN(b, 3) && (a1.color = b);
                "size" === e && "number" === b.ctype && (a1.size = b);
                "alpha" === e && "number" === b.ctype && (a1.alpha = b);
                "fillcolor" === e && g._helper.isNumberVecN(b, 3) && (a1.fillcolor = b);
                "fillalpha" === e && "number" === b.ctype && (a1.fillalpha = b);
                "visible" === e && "boolean" === b.ctype && (a1.visible = b.value);
                "pinned" === e && "boolean" === b.ctype && (a1.pinned = b.value);
                "labeled" !== e && "labelled" !== e || "boolean" !== b.ctype || (a1.labeled = b.value);
                "printlabel" === e && (a1.printname = da(b));
                "trace" === e && "boolean" === b.ctype && (b.value && !a1.drawtrace ? (a1.drawtrace = !0, Pd(a1)) : a1.drawtrace = b.value);
                "P" === a1.kind && a1.movable && ("xy" === e && g._helper.isNumberVecN(b, 2) && Ta(a1, g.turnIntoCSList([
                    b.value[0],
                    b.value[1],
                    l.real(1)
                ]), "homog"), "xy" === e && g._helper.isNumberVecN(b, 3) && Ta(a1, b, "homog"), "x" === e && "number" === b.ctype && Ta(a1, g.turnIntoCSList([
                    l.mult(b, a1.homog.value[2]),
                    a1.homog.value[1],
                    a1.homog.value[2]
                ]), "homog"), "y" === e && "number" === b.ctype && Ta(a1, g.turnIntoCSList([
                    a1.homog.value[0],
                    l.mult(b, a1.homog.value[2]),
                    a1.homog.value[2]
                ]), "homog"), "homog" === e && g._helper.isNumberVecN(b, 3) && Ta(a1, b, "homog"));
                "homog" === e && "L" === a1.kind && a1.movable && g._helper.isNumberVecN(b, 3) && Ta(a1, b, "homog");
                "Text" === a1.kind && ("pressed" === e && "boolean" === b.ctype && a1.checkbox && (a1.checkbox.checked = b.value), a1.movable && ("xy" === e ? g._helper.isNumberVecN(b, 2) ? a1.homog = g.turnIntoCSList([
                    b.value[0],
                    b.value[1],
                    l.real(1)
                ]) : g._helper.isNumberVecN(b, 3) && (a1.homog = b) : "homog" === e && g._helper.isNumberVecN(b, 3) ? a1.homog = b : "x" === e && "number" === b.ctype ? a1.homog = g.turnIntoCSList([
                    l.mult(b, a1.homog.value[2]),
                    a1.homog.value[1],
                    a1.homog.value[2]
                ]) : "y" === e && "number" === b.ctype && (a1.homog = g.turnIntoCSList([
                    a1.homog.value[0],
                    l.mult(b, a1.homog.value[2]),
                    a1.homog.value[2]
                ]))));
                a1.behavior && ("mass" === e && "Mass" === a1.behavior.type && "number" === b.ctype && (a1.behavior.mass = b.value.real), "mass" === e && "Sun" === a1.behavior.type && "number" === b.ctype && (a1.behavior.mass = b.value.real), "friction" === e && "Mass" === a1.behavior.type && "number" === b.ctype && (a1.behavior.friction = b.value.real), "charge" === e && "Mass" === a1.behavior.type && "number" === b.ctype && (a1.behavior.charge = b.value.real), "radius" === e && "Mass" === a1.behavior.type && "number" === b.ctype && (a1.behavior.radius = b.value.real), "vx" === e && "Mass" === a1.behavior.type && "number" === b.ctype && (a1.behavior.vx = b.value.real), "vy" === e && "Mass" === a1.behavior.type && "number" === b.ctype && (a1.behavior.vy = b.value.real), "v" === e && "Mass" === a1.behavior.type && g._helper.isNumberVecN(b, 2) && (a1.behavior.vx = b.value[0].value.real, a1.behavior.vy = b.value[1].value.real));
                "narrow" === e && -1 !== [
                    "P",
                    "C"
                ].indexOf(a1.kind) && ("boolean" === b.ctype && (a1.narrow = b.value), "number" === b.ctype && l._helper.isAlmostReal(b) && (a1.narrow = b.value.real));
                e = m[a1.type]["set_" + e];
                if ("function" === typeof e) return e(a1, b);
            },
            getuserData: function(a1, e) {
                var b;
                "string" === e.ctype && a1.userData && a1.userData[e.value] && (b = a1.userData[e.value]);
                return b && b.ctype ? b : "object" !== typeof b ? u.wrap(b) : h;
            },
            setuserData: function(a1, e, b) {
                e && "string" === e.ctype && a1 && b && (a1.userData || (a1.userData = {}), a1.userData[e.value] = b);
            }
        };
        q.version$0 = function(a1, e) {
            a1 = [
                "CindyJS"
            ].concat(he);
            return g.turnIntoCSList(a1.map(u.wrap));
        };
        q.clearconsole$0 = function(a1, e) {
            Qa.clear();
        };
        q.err$1 = function(a1, e) {
            e = "";
            "variable" === a1[0].ctype ? (e = a1[0].name, a1 = L.getvar(a1[0].name)) : a1 = a1[0];
            a1 = e + " ===> " + da(w(a1));
            sa(a1);
            return h;
        };
        q.errc$1 = function(a1, e) {
            "variable" === a1[0].ctype ? (e = w(L.getvar(a1[0].name)), console.log(a1[0].name + " ===> " + da(e))) : (e = w(a1[0]), console.log(" ===> " + da(e)));
            return h;
        };
        q.print$1 = function(a1, e) {
            Qa.out(da(w(a1[0]), e), !0);
            return h;
        };
        q.println$1 = function(a1, e) {
            Qa.out(da(w(a1[0], e)));
            return h;
        };
        q.assert$2 = function(a1, e) {
            var b = w(a1[0]);
            if ("boolean" === b.ctype) {
                if (!1 === b.value) return q.println$1([
                    a1[1]
                ], e);
            } else sa("Condition for assert is not boolean");
            return h;
        };
        q.dump$1 = function(a1, e) {
            console.log(JSON.stringify(a1[0]));
            return h;
        };
        q.repeat$2 = function(a1, e) {
            return q.repeat$3([
                a1[0],
                null,
                a1[1]
            ], e);
        };
        q.repeat$3 = function(a1, e) {
            var b = D(a1[0]), c = "#";
            null !== a1[1] && "variable" === a1[1].ctype && (c = a1[1].name);
            if ("number" !== b.ctype) return h;
            b = Math.round(b.value.real);
            var d = 1, g = 1, f = b + 1, k = !1, l = !1, m = !1;
            if (void 0 !== e.start) {
                var n = w(e.start);
                "number" === n.ctype && (k = !0, g = n.value.real);
            }
            void 0 !== e.step && (n = w(e.step), "number" === n.ctype && (m = !0, d = n.value.real));
            void 0 !== e.stop && (n = w(e.stop), "number" === n.ctype && (l = !0, f = n.value.real));
            !k || l || m || (f = d * b + g);
            k || !l || m || (g = -d * (b - 1) + f, f += d);
            k || l || !m || (f = d * b + g);
            k && l && !m && (d = (f - g) / (b - 1), f += d);
            k && !l && m && (f = d * b + g);
            !k && l && m && (g = -d * (b - 1) + f, f += d);
            k && l && m && (f += d);
            (g <= f && 0 < d || g >= f && 0 > d) && k && l && m && (b = Math.floor((f - g) / d));
            L.newvar(c);
            e = h;
            for(f = 0; f < b; f++)L.setvar(c, {
                ctype: "number",
                value: {
                    real: f * d + g,
                    imag: 0
                }
            }), e = w(a1[2]);
            L.removevar(c);
            return e;
        };
        q.while$2 = function(a1, e) {
            e = a1[1];
            a1 = a1[0];
            for(var b = w(a1), c = h; "list" !== b.ctype && b.value;)c = w(e), b = w(a1);
            return c;
        };
        q.apply$2 = function(a1, e) {
            return q.apply$3([
                a1[0],
                null,
                a1[1]
            ], e);
        };
        q.apply$3 = function(a1, e) {
            return q.apply$4([
                a1[0],
                a1[1],
                null,
                a1[2]
            ], e);
        };
        q.apply$4 = function(a1, e) {
            e = D(a1[0]);
            if ("list" !== e.ctype && "JSON" !== e.ctype) return h;
            var b = "#";
            null !== a1[1] && "variable" === a1[1].ctype && (b = a1[1].name);
            if (null !== a1[2] && "variable" === a1[2].ctype) {
                var c = a1[2].name;
                L.newvar(c);
            }
            var d = e.value, f = "list" === e.ctype ? [] : {};
            L.newvar(b);
            if (void 0 !== c) {
                if ("list" === e.ctype) for(var k = 0; k < d.length; k++)L.setvar(c, l.real(k + 1)), L.setvar(b, d[k]), f[k] = w(a1[3]);
                else for(k in d)L.setvar(c, u.string(k)), L.setvar(b, d[k]), f[k] = w(a1[3]);
                L.removevar(c);
            } else if ("list" === e.ctype) for(f = [], c = 0; c < d.length; c++)L.setvar(b, d[c]), f[c] = w(a1[3]);
            else for(var m in d)L.setvar(b, d[m]), f[m] = w(a1[3]);
            L.removevar(b);
            return "list" === e.ctype ? g.turnIntoCSList(f) : Ea.turnIntoCSJson(f);
        };
        q.forall$2 = function(a1, e) {
            return q.forall$3([
                a1[0],
                null,
                a1[1]
            ], e);
        };
        q.forall$3 = function(a1, e) {
            var b = D(a1[0]);
            if ("list" !== b.ctype && "JSON" !== b.ctype) return h;
            var c = "#";
            null !== a1[1] && "variable" === a1[1].ctype && (c = a1[1].name);
            var d = b.value;
            L.newvar(c);
            if ("list" === b.ctype) for(e = 0; e < d.length; e++){
                L.setvar(c, d[e]);
                var g = w(a1[2]);
            }
            else g = Ea._helper.forall(d, c, a1[2], e);
            L.removevar(c);
            return g;
        };
        q.select$2 = function(a1, e) {
            return q.select$3([
                a1[0],
                null,
                a1[1]
            ], e);
        };
        q.select$3 = function(a1, e) {
            var b = D(a1[0]);
            if ("list" !== b.ctype && "JSON" !== b.ctype) return h;
            e = "#";
            null !== a1[1] && "variable" === a1[1].ctype && (e = a1[1].name);
            var c = b.value;
            L.newvar(e);
            if ("list" === b.ctype) {
                b = [];
                for(var d = 0, g = 0; g < c.length; g++){
                    L.setvar(e, c[g]);
                    var f = w(a1[2]);
                    "boolean" === f.ctype && !0 === f.value && (b[d] = c[g], d++);
                }
                a1 = {
                    ctype: "list",
                    value: b
                };
            } else {
                b = {};
                for(d in c)L.setvar(e, c[d]), f = w(a1[2]), "boolean" === f.ctype && !0 === f.value && (b[d] = c[d]);
                a1 = {
                    ctype: "JSON",
                    value: b
                };
            }
            L.removevar(e);
            return a1;
        };
        q.flatten$1 = function(a1, e) {
            function b(a1, e) {
                return -1 === e || "list" !== a1.ctype ? a1 : [].concat.apply([], a1.value.map(function(a1) {
                    return b(a1, e - 1);
                }));
            }
            a1 = D(a1[0]);
            if ("list" !== a1.ctype) return a1;
            e = e.levels;
            void 0 === e ? e = 1 : (e = w(e), e = "number" === e.ctype ? e.value.real : "string" === e.ctype && "all" === e.value ? -2 : 1);
            return {
                ctype: "list",
                value: b(a1, e)
            };
        };
        q.createvar$1 = function(a1, e) {
            "variable" === a1[0].ctype && L.newvar(a1[0].name);
            return h;
        };
        q.local = function(a1, e) {
            for(e = 0; e < a1.length; e++)"variable" === a1[e].ctype && L.newvar(a1[e].name);
            return h;
        };
        q.removevar$1 = function(a1, e) {
            e = w(a1[0]);
            "variable" === a1[0].ctype && L.removevar(a1[0].name);
            return e;
        };
        q.release = function(a1, e) {
            if (0 === a1.length) return h;
            e = w(a1[a1.length - 1]);
            for(var b = 0; b < a1.length; b++)"variable" === a1[b].ctype && L.removevar(a1[b].name);
            return e;
        };
        q.regional = function(a1, e) {
            for(e = 0; e < a1.length; e++)if ("variable" === a1[e].ctype) {
                var b = a1[e].name;
                L.newvar(b);
                L.pushVstack(b);
            }
            return h;
        };
        q.genList = function(a1, e) {
            return g.turnIntoCSList(a1.map(w));
        };
        q.genJSON = function(a1, e) {
            e = {};
            for(var b = 0; b < a1.length; b++){
                var c = Ea.GenFromUserDataEl(a1[b]);
                c.key && (e[c.key] = c.val);
            }
            return {
                ctype: "JSON",
                value: e
            };
        };
        E.assigntake = function(a1, e) {
            var b = a1.args[0], c = w(b);
            a1 = D(a1.args[1]);
            var d = h;
            if ("list" === c.ctype || "string" === c.ctype) {
                var f = Math.floor(a1.value.real);
                0 > f && (f = c.value.length + f + 1);
                0 < f && f <= c.value.length && ("list" === c.ctype ? (d = c.value.slice(), d[f - 1] = w(e), d = g.turnIntoCSList(d), c.userData && (d.userData = c.userData)) : (d = c.value, d = d.substring(0, f - 1) + da(w(e)) + d.substring(f, d.length), d = u.string(d)));
            }
            "JSON" === c.ctype && (a1 = da(a1), -1 === da.errorTypes.indexOf(a1) && (d = Ea._helper.ShallowClone(c), d.value[a1] = w(e)));
            Fb([
                b,
                d
            ]);
        };
        E.assigndot = function(a1, e) {
            var b = w(a1.obj);
            a1 = a1.key;
            "geo" === b.ctype && "string" === typeof a1 && Ha.setField(b.value, a1, D(e));
            "JSON" === b.ctype && "string" === typeof a1 && Ea.setField(b.value, a1, D(e));
            return h;
        };
        E.assigncolon = function(a1, e) {
            var b = a1.obj, c = w(b);
            a1 = u.string(da(w(a1.key)));
            "_?_" === a1.value && (a1 = h);
            if ("geo" === c.ctype && a1) Ha.setuserData(c.value, a1, D(e));
            else if ("list" === c.ctype || "string" === c.ctype && a1) {
                var d = {}, g;
                for(g in c)d[g] = c[g];
                if (d.userData) {
                    c = {};
                    for(var f in d.userData)c[f] = d.userData[f];
                    d.userData = c;
                } else d.userData = {};
                d.userData[a1.value] = D(e);
                Fb([
                    b,
                    d
                ]);
            } else a1 && "string" === a1.ctype ? console.log("User data can only be assigned to geo objects and lists.") : console.log("Key is undefined");
            return h;
        };
        q.keys$1 = function(a1, e) {
            e = w(a1[0]);
            var b = e.ctype;
            return "geo" === b || "list" === b || "JSON" === b ? (a1 = [], (e = "geo" === b ? e.value.userData : "list" === b ? e.userData : e.value) && (a1 = Object.keys(e).map(u.string).sort()), g.turnIntoCSList(a1)) : h;
        };
        q.values$1 = function(a1, e) {
            a1 = w(a1[0]);
            e = a1.ctype;
            if ("list" === e) return a1;
            if ("geo" === e || "JSON" === e) {
                var b = [], c;
                (c = "geo" === e ? a1.value.userData : a1.value) && (b = Object.keys(c).sort().map(function(a1) {
                    return c[a1];
                }));
                return g.turnIntoCSList(b);
            }
            return h;
        };
        E.assignlist = function(a1, e) {
            var b = a1.length, c = e.length;
            c < b && (b = c);
            for(c = 0; c < b; c++)Fb([
                a1[c],
                e[c]
            ], []);
        };
        q.if$2 = function(a1, e) {
            return q.if$3(a1, e);
        };
        q.if$3 = function(a1, e) {
            e = D(a1[0]);
            if ("boolean" === e.ctype) {
                if (!0 === e.value) return w(a1[1]);
                if (3 === a1.length) return w(a1[2]);
            } else sa("Condition for if is not boolean");
            return h;
        };
        q.and$2 = Sa;
        q.or$2 = Ic;
        q.xor$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "boolean" === e.ctype && "boolean" === a1.ctype ? {
                ctype: "boolean",
                value: e.value !== a1.value
            } : h;
        };
        q.not$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "boolean" === a1.ctype ? {
                ctype: "boolean",
                value: !a1.value
            } : h;
        };
        E.genericListMathGen = function(a1, e, b) {
            q[a1 + "$1"] = function(a1, c) {
                a1 = w(a1[0]);
                if ("list" !== a1.ctype) return h;
                a1 = a1.value;
                if (0 === a1.length) return b;
                c = a1[0];
                for(var d = 1; d < a1.length; d++)c = e(c, a1[d]);
                return c;
            };
            var c = a1 + "$3";
            q[a1 + "$2"] = function(a1, e) {
                return q[c]([
                    a1[0],
                    null,
                    a1[1]
                ]);
            };
            q[c] = function(a1, c) {
                c = D(a1[0]);
                if ("list" !== c.ctype) return h;
                c = c.value;
                if (0 === c.length) return b;
                var d = "#";
                null !== a1[1] && "variable" === a1[1].ctype && (d = a1[1].name);
                L.newvar(d);
                L.setvar(d, c[0]);
                for(var g = w(a1[2]), x = 1; x < c.length; x++){
                    L.setvar(d, c[x]);
                    var f = w(a1[2]);
                    g = e(g, f);
                }
                L.removevar(d);
                return g;
            };
        };
        E.genericListMathGen("product", u.mult, l.real(1));
        E.genericListMathGen("sum", u.add, l.real(0));
        E.genericListMathGen("max", u.max, h);
        E.genericListMathGen("min", u.min, h);
        q.max$2 = function(a1, e) {
            e = D(a1[0]);
            if ("list" === e.ctype) return q.max$3([
                e,
                null,
                a1[1]
            ]);
            a1 = D(a1[1]);
            return q.max$1([
                g.turnIntoCSList([
                    e,
                    a1
                ])
            ]);
        };
        q.min$2 = function(a1, e) {
            e = D(a1[0]);
            if ("list" === e.ctype) return q.min$3([
                e,
                null,
                a1[1]
            ]);
            a1 = D(a1[1]);
            return q.min$1([
                g.turnIntoCSList([
                    e,
                    a1
                ])
            ]);
        };
        q.add$2 = Yb;
        q.sub$2 = Hb;
        q.mult$2 = hd;
        q.div$2 = Hd;
        q.mod$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype ? l.mod(e, a1) : h;
        };
        q.pow$2 = Jc;
        q.exp$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.exp(a1) : h;
        };
        q.sin$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.sin(a1) : h;
        };
        q.sqrt$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.sqrt(a1) : h;
        };
        E.laguerre = function(a1, e, b) {
            if ("list" !== a1.ctype) return h;
            var c = a1.value.length - 1, d;
            for(d = 0; d <= c; d++)if ("number" !== a1.value[d].ctype) return h;
            if ("number" !== e.ctype) return h;
            for(var g = [
                1,
                .3141,
                .5926,
                .5358,
                .9793,
                .2385,
                .6264,
                .3383,
                .2795,
                .0288
            ], x, f, k, m = 1; m <= b; m++){
                f = k = l.zero;
                x = a1.value[c];
                for(d = c - 1; 0 <= d; d--)k = l.add(f, l.mult(k, e)), f = l.add(x, l.mult(f, e)), x = l.add(a1.value[d], l.mult(x, e));
                if (l._helper.isLessThan(l.abs(x), l.real(1E-14))) break;
                d = l.div(f, x);
                f = l.mult(d, d);
                x = l.sub(f, l.div(l.mult(l.real(2), k), x));
                k = l.sqrt(l.mult(l.real(c - 1), l.sub(l.mult(l.real(c), x), f)));
                x = l.add(d, k);
                d = l.sub(d, k);
                l._helper.isLessThan(l.abs(x), l.abs(d)) && (x = d);
                d = l._helper.isLessThan(l.real(1E-14), l.abs(x)) ? l.div(l.real(c), x) : l.mult(l.add(l.abs(e), l.one), l.complex(Math.cos(m), Math.sin(m)));
                if (l._helper.isLessThan(l.abs(d), l.real(1E-14))) break;
                0 === m % 20 && m < b - 19 && (d = l.mult(d, l.real(g[Math.floor(m / 20)])));
                e = l.sub(e, d);
            }
            return e;
        };
        E.quadratic_roots = function(a1) {
            if ("list" !== a1.ctype) return h;
            var e = a1.value[2], b = a1.value[1];
            a1 = a1.value[0];
            if (l._helper.isZero(a1)) return [
                l.zero,
                l.neg(l.div(b, e))
            ];
            var c = l.sqrt(l.sub(l.mult(b, b), l.mult(l.real(4), l.mult(e, a1))));
            0 <= l.re(b) && (c = l.neg(c));
            return [
                l.div(l.sub(c, b), l.mult(l.real(2), e)),
                l.div(l.mult(l.real(2), a1), l.sub(c, b))
            ];
        };
        E.roots = function(a1) {
            var e = [], b = a1, c = a1.value.length - 1;
            if (0 >= c) return g.turnIntoCSList([]);
            if (l._helper.isZero(a1.value[c])) return e = E.roots(g.turnIntoCSList(a1.value.slice(0, c))), g.append(e, l.infinity);
            if (1 === c) e[0] = l.neg(l.div(a1.value[0], a1.value[1]));
            else if (2 === c) e = E.quadratic_roots(a1);
            else {
                for(var d = 0; d < c - 2; d++){
                    e[d] = E.laguerre(a1, l.zero, 200);
                    e[d] = E.laguerre(b, e[d], 1);
                    var f = [];
                    f[c - d] = a1.value[c - d];
                    for(var h = c - d; 0 < h; h--)f[h - 1] = l.add(a1.value[h - 1], l.mult(f[h], e[d]));
                    f.shift();
                    a1 = g.turnIntoCSList(f);
                }
                a1 = E.quadratic_roots(a1);
                e[c - 2] = a1[0];
                e[c - 1] = a1[1];
            }
            return g.turnIntoCSList(e);
        };
        q.roots$1 = function(a1, e) {
            a1 = D(a1[0]);
            if ("list" === a1.ctype) {
                for(e = 0; e < a1.value.length; e++)if ("number" !== a1.value[e].ctype) return h;
                a1 = E.roots(a1);
                return g.sort1(a1);
            }
            return h;
        };
        q.autodiff$3 = function(a1, e) {
            e = "x";
            if ("function" === a1[0].ctype) {
                var b = Ka[a1[0].oper].body;
                e = a1[0].args[0].name;
            } else if ("function" === typeof a1[0].impl) b = a1[0];
            else return sa("could not parse function"), h;
            var c = D(a1[1]);
            a1 = D(a1[2]);
            if (1 > a1.value.real) return sa("grade cant be < 1"), h;
            a1 = l.add(a1, l.real(1));
            return aa.autodiff(b, e, c, a1);
        };
        q.cos$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.cos(a1) : h;
        };
        q.tan$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.tan(a1) : h;
        };
        q.arccos$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.arccos(a1) : h;
        };
        q.arcsin$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.arcsin(a1) : h;
        };
        q.arctan$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.arctan(a1) : h;
        };
        q.arctan2$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype ? l.arctan2(e, a1) : h;
        };
        q.arctan2$1 = function(a1, e) {
            a1 = D(a1[0]);
            if ("list" === a1.ctype && 2 === a1.value.length) {
                if (a1 = a1.value, "number" === a1[0].ctype && "number" === a1[1].ctype) return q.arctan2$2(a1, e);
            } else if ("number" === a1.ctype) return l.arctan2(a1);
            return h;
        };
        q.log$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.log(a1) : h;
        };
        E.recursiveGen = function(a1) {
            var e = l[a1], b = g[a1];
            q[a1 + "$1"] = function(a1, c) {
                a1 = D(a1[0]);
                return "number" === a1.ctype ? e(a1) : "list" === a1.ctype ? b(a1) : h;
            };
        };
        E.recursiveGen("im");
        E.recursiveGen("re");
        E.recursiveGen("conjugate");
        E.recursiveGen("round");
        E.recursiveGen("ceil");
        E.recursiveGen("floor");
        E.recursiveGen("abs");
        q.abs_infix = q.abs$1;
        q.random$0 = function(a1, e) {
            return l.real(l._helper.rand());
        };
        q.random$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? l.complex(a1.value.real * l._helper.rand(), a1.value.imag * l._helper.rand()) : h;
        };
        q.seedrandom$1 = function(a1, e) {
            a1 = D(a1[0]);
            "number" === a1.ctype && l._helper.seedrandom(a1.value.real);
            return h;
        };
        q.randomnormal$0 = function(a1, e) {
            return l.real(l._helper.randnormal());
        };
        q.randominteger$1 = function(a1, e) {
            e = D(a1[0]);
            return "number" === e.ctype ? (a1 = e.value.real | 0, e = e.value.imag | 0, a1 = a1 * l._helper.rand() | 0, e = e * l._helper.rand() | 0, l.complex(a1, e)) : h;
        };
        q.randomint$1 = q.randominteger$1;
        q.randombool$0 = function(a1, e) {
            return .5 < l._helper.rand() ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isreal$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype && l._helper.isAlmostReal(a1) ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isinteger$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype && l._helper.isAlmostReal(a1) && a1.value.real === Math.floor(a1.value.real) ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.iseven$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype && l._helper.isAlmostReal(a1) && a1.value.real / 2 === Math.floor(a1.value.real / 2) ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isodd$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype && l._helper.isAlmostReal(a1) && (a1.value.real - 1) / 2 === Math.floor((a1.value.real - 1) / 2) ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.iscomplex$1 = function(a1, e) {
            return "number" === w(a1[0]).ctype ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isstring$1 = function(a1, e) {
            return "string" === w(a1[0]).ctype ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.islist$1 = function(a1, e) {
            return "list" === w(a1[0]).ctype ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.ismatrix$1 = function(a1, e) {
            a1 = w(a1[0]);
            return -1 !== g._helper.colNumb(a1) ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.iscircle$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && "C" === a1.value.kind && "Circle" === a1.value.matrix.usage ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isconic$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && "C" === a1.value.kind ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isline$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && "L" === a1.value.kind ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.ispoint$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && "P" === a1.value.kind ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isgeometric$1 = function(a1, e) {
            return "geo" === w(a1[0]).ctype ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isnumbermatrix$1 = function(a1, e) {
            a1 = w(a1[0]);
            return g.isNumberMatrix(a1);
        };
        q.isnumbervector$1 = function(a1, e) {
            a1 = w(a1[0]);
            return g.isNumberVector(a1);
        };
        q.issun$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && void 0 !== a1.value.behavior && "Sun" === a1.value.behavior.type ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.ismass$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && void 0 !== a1.value.behavior && "Mass" === a1.value.behavior.type ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isspring$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && void 0 !== a1.value.behavior && "Spring" === a1.value.behavior.type ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isbouncer$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && void 0 !== a1.value.behavior && "Bouncer" === a1.value.behavior.type ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        q.isundefined$1 = function(a1, e) {
            return "undefined" === w(a1[0]).ctype ? {
                ctype: "boolean",
                value: !0
            } : {
                ctype: "boolean",
                value: !1
            };
        };
        var Nc = {
            ArcBy3: "Arc",
            CenterOfConic: "Center",
            ConicBy1p4l: "Conic1P4L",
            ConicBy4p1l: "Conic4P1L",
            ConicBy5lines: "Conic5L",
            ConicBy2Foci1P: "ConicFoci",
            ConicFromPrincipalDirections: "ConicPrincipleDirs",
            Free: "FreePoint",
            PolarOfLine: "PolarLine",
            PolarOfPoint: "PolarPoint",
            PointOnSegment: "PointOnLine",
            Button: "Text",
            ToggleButton: "Text",
            TrReflectionL: "TrReflection",
            TrReflectionP: "TrReflection",
            TrReflectionC: "TrReflection",
            TrTranslation: "TrProjection",
            TrSimilarity: "TrProjection",
            TrAffine: "TrProjection",
            TransformP: "Transform",
            TransformL: "Transform",
            TransformSegment: "Transform",
            TransformS: "Transform",
            TransformPolygon: "Transform",
            TransformArc: "Transform",
            TransformConic: "Transform",
            TransformC: "Transform",
            TrMoebiusP: "Transform",
            TrMoebiusL: "Transform",
            TrMoebiusSegment: "Transform",
            TrMoebiusS: "Transform",
            TrMoebiusPolygon: "Transform",
            TrMoebiusArc: "Transform",
            TrMoebiusCircle: "Transform",
            TrMoebiusC: "Transform",
            TrInverseMoebius: "TrInverse",
            Perp: "Orthogonal",
            Para: "Parallel",
            AngleBisector: "AngularBisector",
            IntersectLC: "IntersectionConicLine",
            IntersectCirCir: "IntersectionCircleCircle",
            OtherPointOnCircle: "PointOnCircle"
        };
        q.algorithm$1 = function(a1, e) {
            a1 = w(a1[0]);
            if ("geo" === a1.ctype) {
                a1 = a1.value;
                var b = a1.type;
                e = D(e.compatibility);
                "string" === e.ctype && /^cinderella$/i.test(e.value) && (/^Select/.test(b) && (a1 = r.csnames[a1.args[0]], b = a1.type), Nc.hasOwnProperty(b) ? b = Nc[b] : "CircleMr" === b && (b = a1.pinned ? "CircleByFixedRadius" : "CircleByRadius"));
                return u.string(b);
            }
            return h;
        };
        q.inputs$1 = function(a1, e) {
            a1 = w(a1[0]);
            if ("geo" === a1.ctype) {
                a1 = a1.value;
                e = a1.type;
                var b = [];
                a1.args && (b = a1.args.map(function(a1) {
                    return {
                        ctype: "geo",
                        value: r.csnames[a1]
                    };
                }));
                if (/^Select/.test(e) || m[e].isMovable) switch(a1.kind){
                    case "P":
                    case "L":
                        b.push(a1.homog);
                        break;
                    case "C":
                        b.push(a1.matrix);
                }
                return g.turnIntoCSList(b);
            }
            return h;
        };
        q.moveto$2 = function(a1, e) {
            e = w(a1[0]);
            a1 = D(a1[1]);
            "geo" === e.ctype && (e = e.value, g._helper.isNumberVecN(a1, 2) ? Ha.setField(e, "xy", a1) : g._helper.isNumberVecN(a1, 3) && Ha.setField(e, "homog", a1));
            return h;
        };
        q.continuefromhere$0 = function(a1, e) {
            gc();
            return h;
        };
        q.matrixrowcolumn$1 = function(a1, e) {
            a1 = w(a1[0]);
            return -1 !== g._helper.colNumb(a1) ? g.realVector([
                a1.value.length,
                a1.value[0].value.length
            ]) : h;
        };
        q.rowmatrix$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.turnIntoCSList([
                a1
            ]) : h;
        };
        q.columnmatrix$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.turnIntoCSList(a1.value.map(function(a1) {
                return g.turnIntoCSList([
                    a1
                ]);
            })) : h;
        };
        q.submatrix$3 = function(a1, e) {
            e = w(a1[0]);
            var b = w(a1[1]);
            a1 = w(a1[2]);
            if ("list" === e.ctype && "number" === b.ctype && "number" === a1.ctype) {
                var c = Math.round(b.value.real);
                a1 = Math.round(a1.value.real);
                e = e.value.slice();
                0 < a1 && a1 <= e.length && e.splice(a1 - 1, 1);
                var d = !0;
                e = e.map(function(a1) {
                    if ("list" !== a1.ctype) d = !1;
                    else return a1 = a1.value.slice(), 0 < c && c <= a1.length && a1.splice(c - 1, 1), g.turnIntoCSList(a1);
                });
                return d ? g.turnIntoCSList(e) : h;
            }
            return h;
        };
        q.complex$1 = function(a1, e) {
            var b = D(a1[0]);
            if ("list" === b.ctype && g.isNumberVector(b)) {
                if (2 === b.value.length) return a1 = b.value[0], e = b.value[1], l.complex(a1.value.real - e.value.imag, e.value.real + a1.value.imag);
                if (3 === b.value.length) return a1 = b.value[0], e = b.value[1], b = b.value[2], a1 = l.div(a1, b), e = l.div(e, b), l.complex(a1.value.real - e.value.imag, e.value.real + a1.value.imag);
            }
            return h;
        };
        q.gauss$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? g.realVector([
                a1.value.real,
                a1.value.imag
            ]) : h;
        };
        q.cross$2 = Da;
        q.crossratio$4 = function(a1, e) {
            e = w(a1[0]);
            var b = w(a1[1]), c = w(a1[2]);
            a1 = w(a1[3]);
            var d = Q(e), f = Q(b), k = Q(c), m = Q(a1);
            return d !== h && f !== h && k !== h && m !== h ? g.crossratio3(d, f, k, m, g.ii) : "number" === e.ctype && "number" === b.ctype && "number" === c.ctype && "number" === a1.ctype ? l.div(l.mult(l.sub(e, c), l.sub(b, a1)), l.mult(l.sub(e, a1), l.sub(b, c))) : h;
        };
        q.para$2 = function(a1, e) {
            e = D(a1[0]);
            var b = D(a1[1]);
            a1 = Q(e);
            var c = Q(b);
            if (e !== h && b !== h) {
                b = b.usage;
                var d = a1, f = c;
                if ("Line" === e.usage || "Point" === b) d = c, f = a1;
                e = g.cross(g.cross(g.linfty, f), d);
                return u.withUsage(e, "Line");
            }
            return h;
        };
        q.perp$2 = function(a1, e) {
            e = D(a1[0]);
            var b = D(a1[1]);
            a1 = Q(e);
            var c = Q(b);
            if (e !== h && b !== h) {
                var d = b.usage || c.usage;
                b = a1;
                var f = c;
                if ("Line" === (e.usage || a1.usage) || "Point" === d) b = c, f = a1;
                e = g.turnIntoCSList([
                    f.value[0],
                    f.value[1],
                    l.zero
                ]);
                e = g.cross(e, b);
                return u.withUsage(e, "Line");
            }
            return h;
        };
        q.perp$1 = function(a1, e) {
            a1 = D(a1[0]);
            return g._helper.isNumberVecN(a1, 2) ? g.turnIntoCSList([
                l.neg(a1.value[1]),
                a1.value[0]
            ]) : h;
        };
        q.parallel$2 = q.para$2;
        q.perpendicular$2 = q.perp$2;
        q.perpendicular$1 = q.perp$1;
        q.meet$2 = function(a1, e) {
            e = Q(a1[0]);
            a1 = Q(a1[1]);
            return e !== h && a1 !== h ? (a1 = g.cross(e, a1), u.withUsage(a1, "Point")) : h;
        };
        q.join$2 = function(a1, e) {
            e = Q(a1[0]);
            a1 = Q(a1[1]);
            return e !== h && a1 !== h ? (a1 = g.cross(e, a1), u.withUsage(a1, "Line")) : h;
        };
        q.dist$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            a1 = Hb([
                e,
                a1
            ], []);
            return q.abs$1([
                a1
            ], []);
        };
        q.dist_infix = q.dist$2;
        q.point$1 = function(a1, e) {
            a1 = w(a1[0]);
            return g._helper.isNumberVecN(a1, 3) || g._helper.isNumberVecN(a1, 2) ? u.withUsage(a1, "Point") : a1;
        };
        q.line$1 = function(a1, e) {
            a1 = w(a1[0]);
            return g._helper.isNumberVecN(a1, 3) ? u.withUsage(a1, "Line") : a1;
        };
        q.det$3 = function(a1, e) {
            e = Q(a1[0]);
            var b = Q(a1[1]);
            a1 = Q(a1[2]);
            if (e !== h && b !== h && a1 !== h) return g.det3(e, b, a1);
        };
        q.det$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "list" === a1.ctype && (e = g._helper.colNumb(a1), -1 !== e && e === a1.value.length) ? g.det(a1) : h;
        };
        q.eig$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "list" === a1.ctype && (e = g._helper.colNumb(a1), -1 !== e && e === a1.value.length) ? g.eig(a1) : h;
        };
        q.eigenvalues$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "list" === a1.ctype && (e = g._helper.colNumb(a1), -1 !== e && e === a1.value.length) ? g.eig(a1, !1).value[0] : h;
        };
        q.rank$1 = function(a1, e) {
            a1 = D(a1[0]);
            if ("list" === a1.ctype) {
                var b = g._helper.colNumb(a1);
                if (-1 !== b && b === a1.value.length) return g.rank(a1, e.precision);
            }
            return h;
        };
        q.kernel$1 = function(a1, e) {
            a1 = D(a1[0]);
            if ("list" === a1.ctype) {
                var b = g._helper.colNumb(a1);
                if (-1 !== b && b === a1.value.length) return e = g.nullSpace(a1, e.precision), g.transpose(e);
            }
            return h;
        };
        q.eigenvectors$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "list" === a1.ctype && (e = g._helper.colNumb(a1), -1 !== e && e === a1.value.length) ? g.eig(a1).value[1] : h;
        };
        q.area$3 = function(a1, e) {
            e = Q(a1[0]);
            var b = Q(a1[1]);
            a1 = Q(a1[2]);
            if (e !== h && b !== h && a1 !== h) {
                var c = e.value[2], d = b.value[2], f = a1.value[2];
                if (!l._helper.isAlmostZero(c) && !l._helper.isAlmostZero(d) && !l._helper.isAlmostZero(f)) return e = g.scaldiv(c, e), b = g.scaldiv(d, b), a1 = g.scaldiv(f, a1), e = g.det3(e, b, a1), l.realmult(.5, e);
            }
            return h;
        };
        q.inverse$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "list" === a1.ctype && (e = g._helper.colNumb(a1), -1 !== e && e === a1.value.length) ? g.inverse(a1) : h;
        };
        q.linearsolve$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            if ("list" === e.ctype) {
                var b = g._helper.colNumb(e);
                if (-1 !== b && b === e.value.length && g._helper.isNumberVecN(a1, b)) return g.linearsolve(e, a1);
            }
            return h;
        };
        var md = [
            [
                []
            ],
            [
                [
                    0
                ]
            ],
            [
                [
                    0,
                    1
                ],
                [
                    1,
                    0
                ]
            ],
            [
                [
                    0,
                    1,
                    2
                ],
                [
                    0,
                    2,
                    1
                ],
                [
                    1,
                    0,
                    2
                ],
                [
                    1,
                    2,
                    0
                ],
                [
                    2,
                    0,
                    1
                ],
                [
                    2,
                    1,
                    0
                ]
            ],
            [
                [
                    0,
                    1,
                    2,
                    3
                ],
                [
                    0,
                    1,
                    3,
                    2
                ],
                [
                    0,
                    2,
                    1,
                    3
                ],
                [
                    0,
                    2,
                    3,
                    1
                ],
                [
                    0,
                    3,
                    1,
                    2
                ],
                [
                    0,
                    3,
                    2,
                    1
                ],
                [
                    1,
                    0,
                    2,
                    3
                ],
                [
                    1,
                    0,
                    3,
                    2
                ],
                [
                    1,
                    2,
                    0,
                    3
                ],
                [
                    1,
                    2,
                    3,
                    0
                ],
                [
                    1,
                    3,
                    0,
                    2
                ],
                [
                    1,
                    3,
                    2,
                    0
                ],
                [
                    2,
                    0,
                    1,
                    3
                ],
                [
                    2,
                    0,
                    3,
                    1
                ],
                [
                    2,
                    1,
                    0,
                    3
                ],
                [
                    2,
                    1,
                    3,
                    0
                ],
                [
                    2,
                    3,
                    0,
                    1
                ],
                [
                    2,
                    3,
                    1,
                    0
                ],
                [
                    3,
                    0,
                    1,
                    2
                ],
                [
                    3,
                    0,
                    2,
                    1
                ],
                [
                    3,
                    1,
                    0,
                    2
                ],
                [
                    3,
                    1,
                    2,
                    0
                ],
                [
                    3,
                    2,
                    0,
                    1
                ],
                [
                    3,
                    2,
                    1,
                    0
                ]
            ]
        ];
        q.mincostmatching$1 = function(a1, e) {
            var b = w(a1[0]);
            if (g.isNumberMatrix(b).value) {
                a1 = b.value.length;
                e = g._helper.colNumb(b);
                var c = a1 < e ? e : a1, d, f, k = Array(c);
                for(d = 0; d < c; ++d)for(k[d] = Array(c), f = 0; f < c; ++f)k[d][f] = d < a1 && f < e ? b.value[d].value[f].value.real : 0;
                b = R(k);
                c = Array(a1);
                for(d = 0; d < a1; ++d)f = b[d], c[d] = f < e ? l.real(f + 1) : l.real(0);
                return g.turnIntoCSList(c);
            }
            return h;
        };
        q.take$2 = eb;
        q.length$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype || "string" === a1.ctype ? l.real(a1.value.length) : h;
        };
        q.pairs$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.pairs(a1) : h;
        };
        q.triples$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.triples(a1) : h;
        };
        q.cycle$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.cycle(a1) : h;
        };
        q.consecutive$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.consecutive(a1) : h;
        };
        q.reverse$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.reverse(a1) : h;
        };
        q.directproduct$2 = function(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === e.ctype && "list" === a1.ctype ? g.directproduct(e, a1) : h;
        };
        q.concat$2 = Ib;
        q.common$2 = Kc;
        q.remove$2 = Lc;
        q.append$2 = rb;
        q.prepend$2 = A;
        q.contains$2 = function(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "list" === e.ctype ? g.contains(e, a1) : h;
        };
        q.sort$2 = function(a1, e) {
            return q.sort$3([
                a1[0],
                null,
                a1[1]
            ], e);
        };
        q.sort$3 = function(a1, e) {
            var b = D(a1[0]);
            if ("list" !== b.ctype) return h;
            e = "#";
            null !== a1[1] && "variable" === a1[1].ctype && (e = a1[1].name);
            b = b.value;
            var c = [];
            L.newvar(e);
            var d;
            for(d = 0; d < b.length; d++)L.setvar(e, b[d]), c[d] = {
                val: b[d],
                result: w(a1[2])
            };
            L.removevar(e);
            c.sort(u.compareResults);
            a1 = [];
            for(d = 0; d < b.length; d++)a1[d] = c[d].val;
            return {
                ctype: "list",
                value: a1
            };
        };
        q.sort$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.sort1(a1) : h;
        };
        q.set$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "list" === a1.ctype ? g.set(a1) : h;
        };
        q.combinations$2 = function(a1, e) {
            function b(a1, e) {
                a1 === d ? p.push(g.turnIntoCSList(q.slice())) : e < f && (q[a1] = c.value[e], b(a1 + 1, e + 1), b(a1, e + 1));
            }
            var c = w(a1[0]);
            a1 = w(a1[1]);
            if ("number" === a1.ctype) {
                var d = a1.value.real | 0;
                if ("number" === c.ctype) {
                    var f = c.value.real | 0;
                    f - d < d && (d = f - d);
                    if (0 > d) return l.real(0);
                    if (0 === d) return l.real(1);
                    if (1 === d) return c;
                    for(var k = e = a1 = 1; k <= d; ++k){
                        var m = f - d + k | 0, n = k | 0, fa = Zb(m, n) | 0;
                        m = m / fa | 0;
                        n = n / fa | 0;
                        fa = Zb(a1, n) | 0;
                        a1 = a1 / fa | 0;
                        n = n / fa | 0;
                        fa = Zb(m, e) | 0;
                        m = m / fa | 0;
                        e = e / fa | 0;
                        a1 = a1 * m | 0;
                        e = e * n | 0;
                    }
                    return l.real(a1 / e);
                }
                if ("list" === c.ctype) {
                    f = c.value.length;
                    if (0 > d || d > f) return g.turnIntoCSList([]);
                    if (0 === d) return g.turnIntoCSList([
                        g.turnIntoCSList([])
                    ]);
                    if (d === f) return g.turnIntoCSList([
                        c
                    ]);
                    var p = [];
                    var q = Array(d);
                    b(0, 0);
                    return g.turnIntoCSList(p);
                }
            }
            return h;
        };
        q.zeromatrix$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === e.ctype && "number" === a1.ctype ? g.zeromatrix(e, a1) : h;
        };
        q.zerovector$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "number" === a1.ctype ? g.zerovector(a1) : h;
        };
        q.transpose$1 = function(a1, e) {
            a1 = D(a1[0]);
            return "list" === a1.ctype && -1 !== g._helper.colNumb(a1) ? g.transpose(a1) : h;
        };
        q.row$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === a1.ctype && "list" === e.ctype && -1 !== g._helper.colNumb(e) ? g.row(e, a1) : h;
        };
        q.column$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            return "number" === a1.ctype && "list" === e.ctype && -1 !== g._helper.colNumb(e) ? g.column(e, a1) : h;
        };
        q.dict$0 = function(a1, e) {
            a1 = nb.create();
            for(var b in e)e.hasOwnProperty(b) && nb.put(a1, u.string(b), w(e[b]));
            return a1;
        };
        q.put$3 = function(a1, e) {
            e = w(a1[0]);
            var b = w(a1[1]);
            a1 = w(a1[2]);
            return "dict" === e.ctype ? (e = nb.clone(e), nb.put(e, b, a1), e) : h;
        };
        q.get$2 = function(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "dict" === e.ctype ? nb.get(e, a1, h) : h;
        };
        q.red$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype ? g.realVector([
                Math.min(1, Math.max(0, a1.value.real)),
                0,
                0
            ]) : h;
        };
        q.green$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype ? g.realVector([
                0,
                Math.min(1, Math.max(0, a1.value.real)),
                0
            ]) : h;
        };
        q.blue$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype ? g.realVector([
                0,
                0,
                Math.min(1, Math.max(0, a1.value.real))
            ]) : h;
        };
        q.gray$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype ? (a1 = Math.min(1, Math.max(0, a1.value.real)), g.realVector([
                a1,
                a1,
                a1
            ])) : h;
        };
        q.grey$1 = q.gray$1;
        E.HSVtoRGB = function(a1, e, b) {
            a1 && void 0 === e && void 0 === b && (e = a1.s, b = a1.v, a1 = a1.h);
            var c = Math.floor(6 * a1);
            var d = 6 * a1 - c;
            a1 = b * (1 - e);
            var f = b * (1 - d * e);
            e = b * (1 - (1 - d) * e);
            switch(c % 6){
                case 0:
                    var x = b;
                    var h = e;
                    var k = a1;
                    break;
                case 1:
                    x = f;
                    h = b;
                    k = a1;
                    break;
                case 2:
                    x = a1;
                    h = b;
                    k = e;
                    break;
                case 3:
                    x = a1;
                    h = f;
                    k = b;
                    break;
                case 4:
                    x = e;
                    h = a1;
                    k = b;
                    break;
                case 5:
                    x = b, h = a1, k = f;
            }
            return g.realVector([
                x,
                h,
                k
            ]);
        };
        q.hue$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "number" === a1.ctype ? (a1 = a1.value.real, a1 -= Math.floor(a1), E.HSVtoRGB(a1, 1, 1)) : h;
        };
        E.shapeconvert = function(a1) {
            if ("circle" === a1.type) {
                var e = a1.value.value[0];
                e = u.div(e, e.value[2]);
                var b = e.value[0].value.real, c = e.value[1].value.real;
                a1 = a1.value.value[1].value.real;
                var d = Array(125);
                var g = 2 * Math.PI / 125;
                for(e = 0; 125 > e; e++)d[e] = {
                    X: b + Math.cos(e * g) * a1,
                    Y: c + Math.sin(e * g) * a1
                };
                return [
                    d
                ];
            }
            if ("polygon" === a1.type) {
                b = [];
                for(e = 0; e < a1.value.length; e++){
                    c = a1.value[e];
                    d = [];
                    for(g = 0; g < c.length; g++)d[g] = {
                        X: c[g].X,
                        Y: c[g].Y
                    };
                    b[e] = d;
                }
                return b;
            }
        };
        E.shapeop = function(a1, e, b) {
            a1 = E.shapeconvert(a1);
            var c = E.shapeconvert(e);
            ClipperLib.JS.ScaleUpPaths(a1, 1E3);
            ClipperLib.JS.ScaleUpPaths(c, 1E3);
            e = new ClipperLib.Clipper;
            e.AddPaths(a1, ClipperLib.PolyType.ptSubject, !0);
            e.AddPaths(c, ClipperLib.PolyType.ptClip, !0);
            c = a1 = ClipperLib.PolyFillType.pftNonZero;
            var d = new ClipperLib.Paths;
            e.Execute(b, d, a1, c);
            ClipperLib.JS.ScaleDownPaths(d, 1E3);
            return {
                ctype: "shape",
                type: "polygon",
                value: d
            };
        };
        E.shapecommon = function(a1, e) {
            return E.shapeop(a1, e, ClipperLib.ClipType.ctIntersection);
        };
        E.shaperemove = function(a1, e) {
            return E.shapeop(a1, e, ClipperLib.ClipType.ctDifference);
        };
        E.shapeconcat = function(a1, e) {
            return E.shapeop(a1, e, ClipperLib.ClipType.ctUnion);
        };
        q.key$0 = function(a1, e) {
            return {
                ctype: "string",
                value: Cd
            };
        };
        q.keycode$0 = function(a1, e) {
            return l.real(cd);
        };
        q.mouse$0 = function(a1, e) {
            return e.id ? (a1 = w(e.id), "number" === a1.ctype && (a1 = a1.value.real, Eb[a1]) ? g.realVector(Eb[a1]) : h) : g.realVector(Ma);
        };
        q.mover$0 = function(a1, e) {
            return ya && ya.mover ? {
                ctype: "geo",
                value: ya.mover
            } : h;
        };
        q.multiid$0 = function(a1, e) {
            return l.real(ab);
        };
        q.multiidlist$0 = function(a1, e) {
            a1 = [];
            for(var b in Eb)a1.push(b);
            return g.realVector(a1);
        };
        q.translate$1 = function(a1, e) {
            a1 = D(a1[0]);
            "list" === a1.ctype && g.isNumberVector(a1) && 2 === a1.value.length && C.translate(a1.value[0].value.real, a1.value[1].value.real);
            return h;
        };
        q.rotate$1 = function(a1, e) {
            a1 = D(a1[0]);
            "number" === a1.ctype && C.rotate(a1.value.real);
            return h;
        };
        q.scale$1 = function(a1, e) {
            a1 = D(a1[0]);
            "number" === a1.ctype && C.scale(a1.value.real);
            return h;
        };
        q.greset$0 = function(a1, e) {
            a1 = cc.stack.length;
            C.greset();
            for(e = 0; e < a1; e++)z.restore();
            return h;
        };
        q.gsave$0 = function(a1, e) {
            C.gsave();
            z.save();
            return h;
        };
        q.grestore$0 = function(a1, e) {
            C.grestore();
            z.restore();
            return h;
        };
        q.color$1 = function(a1, e) {
            a1 = D(a1[0]);
            "list" === a1.ctype && g.isNumberVector(a1).value && C.setcolor(a1);
            return h;
        };
        q.linecolor$1 = function(a1, e) {
            a1 = D(a1[0]);
            "list" === a1.ctype && g.isNumberVector(a1).value && C.setlinecolor(a1);
            return h;
        };
        q.pointcolor$1 = function(a1, e) {
            a1 = D(a1[0]);
            "list" === a1.ctype && g.isNumberVector(a1).value && C.setpointcolor(a1);
            return h;
        };
        q.alpha$1 = function(a1, e) {
            a1 = D(a1[0]);
            "number" === a1.ctype && C.setalpha(a1);
            return h;
        };
        q.pointsize$1 = function(a1, e) {
            a1 = D(a1[0]);
            "number" === a1.ctype && C.setpointsize(a1);
            return h;
        };
        q.linesize$1 = function(a1, e) {
            a1 = D(a1[0]);
            "number" === a1.ctype && C.setlinesize(a1);
            return h;
        };
        q.textsize$1 = function(a1, e) {
            a1 = D(a1[0]);
            "number" === a1.ctype && C.settextsize(a1);
            return h;
        };
        q.playanimation$0 = function(a1, e) {
            F();
            return h;
        };
        q.pauseanimation$0 = function(a1, e) {
            ub();
            return h;
        };
        q.stopanimation$0 = function(a1, e) {
            Wb();
            return h;
        };
        q.text$1 = function(a1, e) {
            a1 = D(a1[0]);
            return u.string(da(a1));
        };
        q.replace$3 = function(a1, e) {
            var b = w(a1[0]);
            e = w(a1[1]);
            a1 = w(a1[2]);
            if ("string" === b.ctype && "string" === e.ctype && "string" === a1.ctype) return b = b.value, e = e.value.replace(/[^A-Za-z0-9]/g, "\\$&"), a1 = a1.value.replace(/\$/g, "$$$$"), b = b.replace(new RegExp(e, "g"), a1), {
                ctype: "string",
                value: b
            };
        };
        q.replace$2 = function(a1, e) {
            function b(a1, e, b) {
                var d = "";
                c = k = -1;
                for(var g = 0; g < e.length; g++){
                    var f = e[g][0], x = a1.indexOf(f, b);
                    -1 !== x && (-1 === k ? (d = f, k = x, c = g) : x < k && (d = f, k = x, c = g));
                }
                return d;
            }
            var c;
            e = w(a1[0]);
            var d = w(a1[1]);
            if ("string" === e.ctype && "list" === d.ctype) {
                a1 = e.value;
                e = [];
                for(var g = 0; g < d.value.length; g++){
                    var f = d.value[g];
                    "list" === f.ctype && 2 === f.value.length && "string" === f.value[0].ctype && "string" === f.value[1].ctype && (e[e.length] = [
                        f.value[0].value,
                        f.value[1].value
                    ]);
                }
                var k = -1;
                for(d = b(a1, e, 0); -1 !== k;)a1 = a1.substring(0, k) + e[c][1] + a1.substring(k + d.length, a1.length), d = k + e[c][1].length, d = b(a1, e, d);
                return {
                    ctype: "string",
                    value: a1
                };
            }
            return h;
        };
        q.substring$3 = function(a1, e) {
            e = w(a1[0]);
            var b = D(a1[1]);
            a1 = D(a1[2]);
            return "string" === e.ctype && "number" === b.ctype && "number" === a1.ctype ? {
                ctype: "string",
                value: e.value.substring(Math.floor(b.value.real), Math.floor(a1.value.real))
            } : h;
        };
        q.tokenize$2 = function(a1, e) {
            var b = w(a1[0]);
            a1 = w(a1[1]);
            if ("string" === b.ctype && "string" === a1.ctype) return q.tokenize$2([
                b,
                g.turnIntoCSList([
                    a1
                ])
            ], e);
            if ("string" === b.ctype && "list" === a1.ctype) {
                b = b.value;
                if (0 === a1.value.length) {
                    a1 = !0;
                    if (void 0 !== e.autoconvert) {
                        var c = w(e.autoconvert);
                        "boolean" === c.ctype && (a1 = c.value);
                    }
                    return a1 && "" !== b && (a1 = Number(b), !isNaN(a1)) ? l.real(a1) : u.string(b);
                }
                c = a1.value[0];
                var d = g.turnIntoCSList(a1.value.slice(1));
                b = b.split(c.value);
                return g.turnIntoCSList(b.map(function(a1) {
                    return q.tokenize$2([
                        u.string(a1),
                        d
                    ], e);
                }));
            }
            return h;
        };
        q.indexof$2 = function(a1, e) {
            e = w(a1[0]);
            a1 = w(a1[1]);
            return "string" === e.ctype && "string" === a1.ctype ? (a1 = e.value.indexOf(a1.value), l.real(a1 + 1)) : h;
        };
        q.indexof$3 = function(a1, e) {
            e = w(a1[0]);
            var b = w(a1[1]);
            a1 = w(a1[2]);
            return "string" === e.ctype && "string" === b.ctype && "number" === a1.ctype ? (a1 = e.value.indexOf(b.value, Math.round(a1.value.real) - 1), l.real(a1 + 1)) : h;
        };
        q.parse$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "string" === a1.ctype ? (a1 = lb(a1.value), w(a1)) : h;
        };
        q.unicode$1 = function(a1, e) {
            a1 = w(a1[0]);
            var b = 16;
            e.base && (e = w(e.base), "number" === e.ctype && (b = e.value.real));
            if ("string" === a1.ctype) e = parseInt(a1.value, b);
            else if ("number" === a1.ctype) e = a1.value.real;
            else return h;
            "undefined" !== typeof String.fromCodePoint ? e = String.fromCodePoint(e) : 65535 >= e ? e = String.fromCharCode(e) : (e -= 65536, e = String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
            return u.string(e);
        };
        q.international$1 = function(a1, e) {
            return q.international$2([
                a1[0],
                null
            ], e);
        };
        q.international$2 = function(a1, e) {
            e = w(a1[0]);
            if ("string" !== e.ctype) return h;
            var b = (d.translations || {})[d.language || "en"] || {};
            if (!b.hasOwnProperty(e.value)) return e;
            var c = b[e.value];
            if ("string" === typeof c) return u.string(c);
            if (null === a1[1]) return e;
            a1 = w(a1[1]);
            a1 = "number" === a1.ctype ? a1.value.real : 0;
            a1 = (b._pluralFormFunction || Id)(a1);
            return a1 < c.length ? u.string(c[a1]) : e;
        };
        q.currentlanguage$0 = function(a1, e) {
            return u.string(d.language || "en");
        };
        E.basismap = function(a1, e, b, c) {
            var d = g.turnIntoCSList([
                a1,
                e,
                b
            ]);
            d = g.adjoint3(g.transpose(d));
            c = u.mult(d, c);
            d = g.turnIntoCSList([
                u.mult(c.value[0], a1),
                u.mult(c.value[1], e),
                u.mult(c.value[2], b)
            ]);
            return g.transpose(d);
        };
        q.map$8 = function(a1, e) {
            e = Q(a1[0]);
            var b = Q(a1[1]), c = Q(a1[2]), d = Q(a1[3]), f = Q(a1[4]), k = Q(a1[5]), l = Q(a1[6]);
            a1 = Q(a1[7]);
            return f !== h && k !== h && l !== h && a1 !== h && e !== h && b !== h && c !== h && d !== h ? (a1 = E.basismap(f, k, l, a1), e = E.basismap(e, b, c, d), e = u.mult(a1, g.adjoint3(e)), g.normalizeMax(e)) : h;
        };
        q.map$6 = function(a1, e) {
            e = Q(a1[0]);
            var b = Q(a1[1]), c = Q(a1[2]), d = g.realVector([
                0,
                0,
                1
            ]), f = g.cross, k = f(f(c, f(d, f(e, b))), f(b, f(d, f(e, c)))), l = Q(a1[3]), m = Q(a1[4]);
            a1 = Q(a1[5]);
            d = f(f(a1, f(d, f(l, m))), f(m, f(d, f(l, a1))));
            return l !== h && m !== h && a1 !== h && d !== h && e !== h && b !== h && c !== h && k !== h ? (l = E.basismap(l, m, a1, d), e = E.basismap(e, b, c, k), e = u.mult(l, g.adjoint3(e)), g.normalizeMax(e)) : h;
        };
        q.map$4 = function(a1, e) {
            e = g.ii;
            var b = g.jj, c = Q(a1[0]), d = Q(a1[1]), f = Q(a1[2]);
            a1 = Q(a1[3]);
            return f !== h && a1 !== h && c !== h && d !== h ? (a1 = E.basismap(f, a1, e, b), e = E.basismap(c, d, e, b), e = u.mult(a1, g.adjoint3(e)), g.normalizeMax(e)) : h;
        };
        q.map$2 = function(a1, e) {
            e = g.ii;
            var b = g.jj, c = Q(a1[0]), d = u.add(g.realVector([
                1,
                0,
                0
            ]), c);
            a1 = Q(a1[1]);
            var f = u.add(g.realVector([
                1,
                0,
                0
            ]), a1);
            return a1 !== h && f !== h && c !== h && d !== h ? (a1 = E.basismap(a1, f, e, b), e = E.basismap(c, d, e, b), e = u.mult(a1, g.adjoint3(e)), g.normalizeMax(e)) : h;
        };
        q.pointreflect$1 = function(a1, e) {
            e = g.ii;
            var b = g.jj;
            a1 = Q(a1[0]);
            var c = u.add(g.realVector([
                1,
                0,
                0
            ]), a1), d = u.add(g.realVector([
                -1,
                0,
                0
            ]), a1);
            return d !== h && a1 !== h && c !== h ? (d = E.basismap(a1, d, e, b), e = E.basismap(a1, c, e, b), e = u.mult(d, g.adjoint3(e)), g.normalizeMax(e)) : h;
        };
        q.linereflect$1 = function(a1, e) {
            e = g.ii;
            var b = g.jj;
            a1 = Q(a1[0]);
            var c = g.realVector([
                Math.random(),
                Math.random(),
                Math.random()
            ]), d = g.realVector([
                Math.random(),
                Math.random(),
                Math.random()
            ]);
            c = g.cross(c, a1);
            d = g.cross(d, a1);
            return a1 !== h && c !== h ? (a1 = E.basismap(c, d, e, b), e = E.basismap(c, d, b, e), e = u.mult(a1, g.adjoint3(e)), g.normalizeMax(e)) : h;
        };
        E.extractPointVec = function(a1) {
            var e = {
                ok: !1
            };
            if ("geo" === a1.ctype) {
                var b = a1.value;
                if ("P" === b.kind) return e.x = Ha.getField(b, "x"), e.y = Ha.getField(b, "y"), e.z = l.real(1), e.ok = !0, e;
            }
            if ("list" !== a1.ctype) return e;
            var c = a1.value;
            if (2 === c.length && (a1 = c[0], b = c[1], "number" === a1.ctype && "number" === b.ctype)) return e.x = a1, e.y = b, e.z = l.real(1), e.ok = !0, e;
            3 === c.length && (a1 = c[0], b = c[1], c = c[2], "number" === a1.ctype && "number" === b.ctype && "number" === c.ctype && (e.x = l.div(a1, c), e.y = l.div(b, c), e.z = l.real(1), e.ok = !0));
            return e;
        };
        q.polygon$1 = function(a1, e) {
            a1 = w(a1[0]);
            if ("list" === a1.ctype) {
                e = [];
                for(var b = 0; b < a1.value.length; b++){
                    var c = E.extractPoint(a1.value[b]);
                    if (!c.ok) return h;
                    e[b] = {
                        X: c.x,
                        Y: c.y
                    };
                }
                return {
                    ctype: "shape",
                    type: "polygon",
                    value: [
                        e
                    ]
                };
            }
            return h;
        };
        q.circle$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            e = E.extractPointVec(e);
            if (!e.ok || "number" !== a1.ctype) return h;
            e = g.turnIntoCSList([
                e.x,
                e.y,
                e.z
            ]);
            return {
                ctype: "shape",
                type: "circle",
                value: g.turnIntoCSList([
                    e,
                    a1
                ])
            };
        };
        q.screen$0 = function(a1, e) {
            var b = C.drawingstate.initialmatrix;
            a1 = function(a1, e) {
                a1 -= b.tx;
                e += b.ty;
                return {
                    X: (a1 * b.d - e * b.b) / b.det,
                    Y: -(-a1 * b.c + e * b.a) / b.det
                };
            };
            return {
                ctype: "shape",
                type: "polygon",
                value: [
                    [
                        a1(0, 0),
                        a1(ma, 0),
                        a1(ma, pa),
                        a1(0, pa)
                    ]
                ]
            };
        };
        q.halfplane$2 = function(a1, e) {
            e = D(a1[0]);
            a1 = D(a1[1]);
            var b = Q(e), c = Q(a1);
            if (e !== h && a1 !== h) {
                var d = a1.usage;
                a1 = b;
                var f = c;
                if ("Line" === e.usage || "Point" === d) a1 = c, f = b;
                e = g.turnIntoCSList([
                    f.value[0],
                    f.value[1],
                    l.zero
                ]);
                e = g.cross(e, a1);
                f = g.cross(f, e);
                f = u.div(f, f.value[2]);
                a1 = u.div(a1, a1.value[2]);
                a1 = g.sub(a1, f);
                e = g.abs(a1);
                a1 = u.div(a1, e);
                e = f.value[0].value.real;
                f = f.value[1].value.real;
                b = 1E3 * a1.value[0].value.real;
                a1 = 1E3 * a1.value[1].value.real;
                return {
                    ctype: "shape",
                    type: "polygon",
                    value: [
                        [
                            {
                                X: e + a1 / 2,
                                Y: f - b / 2
                            },
                            {
                                X: e + a1 / 2 + b,
                                Y: f - b / 2 + a1
                            },
                            {
                                X: e - a1 / 2 + b,
                                Y: f + b / 2 + a1
                            },
                            {
                                X: e - a1 / 2,
                                Y: f + b / 2
                            }
                        ]
                    ]
                };
            }
            return h;
        };
        q.element$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "string" === a1.ctype && r.csnames.hasOwnProperty(a1.value) ? {
                ctype: "geo",
                value: r.csnames[a1.value]
            } : h;
        };
        E.all$1 = function(a1, e) {
            a1 = w(a1[0]);
            return "geo" === a1.ctype && a1.value.incidences ? g.ofGeos(a1.value.incidences.map(function(a1) {
                return r.csnames[a1];
            }).filter(e)) : g.nil;
        };
        q.allpoints$0 = function(a1, e) {
            return g.ofGeos(r.points);
        };
        q.allpoints$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return "P" === a1.kind;
            });
        };
        q.allmasses$0 = function(a1, e) {
            return g.ofGeos(Ca);
        };
        q.allmasses$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return "P" === a1.kind && a1.behavior && "Mass" === a1.behavior.type;
            });
        };
        q.allsprings$0 = function(a1, e) {
            return g.ofGeos(He);
        };
        q.allsprings$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return "S" === a1.kind && a1.behavior && "Spring" === a1.behavior.type;
            });
        };
        q.alllines$0 = function(a1, e) {
            return g.ofGeos(r.lines);
        };
        q.alllines$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return "L" === a1.kind || "S" === a1.kind;
            });
        };
        q.allsegments$0 = function(a1, e) {
            return g.ofGeos(r.lines.filter(function(a1) {
                return "S" === a1.kind;
            }));
        };
        q.allsegments$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return "S" === a1.kind;
            });
        };
        q.allconics$0 = function(a1, e) {
            return g.ofGeos(r.conics);
        };
        q.allconics$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return "C" === a1.kind;
            });
        };
        q.allcircles$0 = function(a1, e) {
            return g.ofGeos(r.conics.filter(function(a1) {
                return "Circle" === a1.matrix.usage;
            }));
        };
        q.allcircles$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return "C" === a1.kind && "Circle" === a1.matrix.usage;
            });
        };
        q.allelements$0 = function(a1, e) {
            return g.ofGeos(r.gslp);
        };
        q.allelements$1 = function(a1, e) {
            return E.all$1(a1, function(a1) {
                return !0;
            });
        };
        q.elementsatmouse$0 = function(a1, e) {
            var b = g.realVector([
                Ma[0],
                Ma[1],
                1
            ]), c = function(a1) {
                if (l._helper.isAlmostZero(a1.value[2])) return Infinity;
                a1 = g.normalizeZ(a1);
                return g.abs(g.sub(a1, b)).value.real;
            }, d = function(a1) {
                a1 = g.turnIntoCSList([
                    a1.value[0],
                    a1.value[1],
                    l.zero
                ]);
                return g.normalizeMax(g.cross(b, a1));
            }, f = function(a1) {
                var e = u.mult(a1.matrix, b);
                e = d(e);
                a1 = m._helper.IntersectLC(e, a1.matrix).map(function(a1) {
                    return c(a1);
                });
                return .5 > Math.min(a1[0], a1[1]);
            };
            a1 = r.points.filter(function(a1) {
                return .5 > c(a1.homog);
            });
            e = r.lines.filter(function(a1) {
                var e = d(a1.homog);
                e = g.normalizeMax(g.cross(a1.homog, e));
                if ((e = .5 > c(e)) && "S" === a1.kind) {
                    var f = a1.homog;
                    f = g.turnIntoCSList([
                        f.value[0],
                        f.value[1],
                        l.zero
                    ]);
                    a1 = g.crossratio3(a1.farpoint, a1.startpos, a1.endpos, b, f).value.real;
                    if (0 > a1 || 1 < a1) e = !1;
                }
                return e;
            });
            var h = r.conics.filter(function(a1) {
                var e = f(a1);
                if (e && a1.isArc) {
                    var c = g.crossratio3harm(a1.startPoint, a1.endPoint, a1.viaPoint, b, g.ii);
                    a1 = c.value[0];
                    c = c.value[1];
                    l._helper.isAlmostZero(a1) ? (a1 = l.div(a1, c), c = l.real(1)) : (c = l.div(c, a1), a1 = l.real(1));
                    var d = g.abs(g.turnIntoCSList([
                        c,
                        a1
                    ]));
                    a1 = l.div(a1, d);
                    c = l.div(c, d);
                    c = l.mult(c, a1);
                    0 > a1.value.real && (c = l.neg(c));
                    0 > c.value.real && (e = !1);
                }
                return e;
            });
            a1 = a1.concat(e, h);
            return g.ofGeos(a1);
        };
        q.incidences$1 = q.allelements$1;
        q.createpoint$2 = function(a1, e) {
            e = w(a1[0]);
            a1 = Q(a1[1]);
            return "string" !== e.ctype ? (sa("Name must be a string"), h) : "list" !== a1.ctype && g.isNumberVector(a1) ? (sa("Position must be a number vector"), h) : {
                ctype: "geo",
                value: Za({
                    name: e.value,
                    type: "Free",
                    labeled: !0,
                    pos: a1
                }, !0)
            };
        };
        q.create$3 = function(a1, e) {
            var b = w(a1[0]), c = w(a1[1]), d = w(a1[2]);
            a1 = {};
            for(var f in e)a1[f] = D(e[f]);
            if ("string" === b.ctype) f = b.value;
            else {
                if ("list" !== b.ctype) return sa("Names must be a string or a list of strings"), h;
                if (1 !== b.value.length) {
                    f = u.string(b.value.map(function(a1) {
                        return a1.value;
                    }).join("__"));
                    d = q.create$3([
                        f,
                        c,
                        d
                    ], a1);
                    var k = [];
                    if (d !== h) for(c = u.string(d.value.kind.replace(/^(.*)s$/, "Select$1")), d = g.turnIntoCSList([
                        u.string(d.value.name)
                    ]), e = 0; e < b.value.length; ++e)a1.index = l.real(e + 1), k.push(q.create$3([
                        b.value[e],
                        c,
                        d
                    ], a1));
                    return g.turnIntoCSList(k);
                }
                if ("string" !== b.value[0].ctype) return sa("Element of names list must be a string"), h;
                f = b.value[0].value;
            }
            if ("string" !== c.ctype) return sa("Type must be a string"), h;
            if ("list" !== d.ctype) return sa("Arguments must be a list"), h;
            if (!m.hasOwnProperty(c.value) && !ed.hasOwnProperty(c.value) && !Ee.hasOwnProperty(c.value)) return sa("Invalid geometric operation: '" + c.value + "'"), h;
            b = [];
            var n = null;
            for(e = 0; e < d.value.length; e++){
                var p = d.value[e];
                if ("string" === p.ctype) b.push(p.value);
                else if ("geo" === p.ctype) b.push(p.value.name);
                else if (n = Q(p), n === h) return sa("Unknown argument type"), h;
            }
            d = {
                name: f,
                type: c.value,
                labeled: !0
            };
            n && (d.pos = n);
            0 < b.length && (d.args = b);
            for(k in a1)d[k] = u.unwrap(a1[k]);
            return {
                ctype: "geo",
                value: Za(d, !0)
            };
        };
        q.create$2 = function(a1, e) {
            function b(a1) {
                function e(a1) {
                    r.csnames[a1] || (b = a1);
                }
                var b = !1, c;
                if ("P" === a1) for(c = 0; 26 > c & !b; c++)8 !== c && 9 !== c && e(String.fromCharCode(65 + c));
                else if ("L" === a1 || "S" === a1) for(c = 0; 26 > c & !b; c++)8 !== c && 9 !== c && e(String.fromCharCode(97 + c));
                for(c = 0; !b; c++)e(a1 + c);
                return b;
            }
            var c = w(a1[0]);
            a1 = w(a1[1]);
            var d = {};
            for(f in e)d[f] = D(e[f]);
            if (!m.hasOwnProperty(c.value) && !ed.hasOwnProperty(c.value) && !Ee.hasOwnProperty(c.value)) return sa("Invalid geometric operation: '" + c.value + "'"), h;
            for(; ed.hasOwnProperty(c.value);)c.value = ed[c.value];
            var f = m[c.value];
            e = u.string(b(f.kind));
            if (a1.value.length > f.signature.length) {
                var k = "Operation " + c.value + " requieres only " + f.signature.length + " argument" + (1 === f.signature.length ? "" : "s") + " (" + a1.value.length + " argument" + (1 === a1.value.length ? "" : "s") + " given) to create " + e.value + ". Ignoring the last arguments.";
                if (!d.pos) {
                    var n = Q(a1.value[a1.value.length - 1]);
                    n !== h && (k += " Use the last argument as modifier `pos`.", d.pos = n);
                }
                sa(k);
                a1 = g.turnIntoCSList(a1.value.slice(0, f.signature.length));
            }
            f = q.create$3([
                e,
                c,
                a1
            ], d);
            if (f !== h && "s" === f.value.kind[1] && f.value.results) {
                c = u.string("Select" + f.value.kind[0]);
                a1 = g.turnIntoCSList([
                    u.string(f.value.name)
                ]);
                if (d.pos) return e = u.string(b(f.value.kind[0])), q.create$3([
                    e,
                    c,
                    a1
                ], d);
                k = [];
                for(n = 0; n < f.value.results.value.length; n++)d.index = l.real(n + 1), e = u.string(b(f.value.kind[0])), k.push(q.create$3([
                    e,
                    c,
                    a1
                ], d));
                return g.turnIntoCSList(k);
            }
            f.isDuplicate && delete f.isDuplicate;
            return f;
        };
        q.javascript$1 = function(a1, e) {
            a1 = w(a1[0]);
            "string" === a1.ctype && new Function(a1.value).call(La);
            return h;
        };
        q.use$1 = function(a1, e) {
            function b(a1, e, b) {
                q[a1.toLowerCase() + "$" + e] = b;
            }
            a1 = w(a1[0]);
            if ("string" === a1.ctype) {
                a1 = a1.value;
                var c;
                d.plugins && (c = d.plugins[a1]);
                c || (c = Ia._pluginRegistry[a1]);
                if (c) return c({
                    instance: La,
                    config: d,
                    nada: h,
                    evaluate: w,
                    extractPoint: E.extractPoint,
                    evaluateAndVal: D,
                    defineFunction: b,
                    addShutdownHook: Db.push.bind(Db),
                    addAutoCleaningEventListener: T,
                    getVariable: L.getvar.bind(L),
                    getInitialMatrix: function() {
                        return C.drawingstate.initialmatrix;
                    },
                    setTextRenderer: function(a1, e) {
                        we = a1;
                        e && (Je = e);
                    },
                    getImage: function(a1, e) {
                        "string" === typeof a1 && (a1 = u.string(a1));
                        a1 = Ya(a1);
                        if (!a1) return null;
                        !e && a1.cdyUpdate && a1.cdyUpdate();
                        return a1;
                    },
                    getMyfunction: function(a1) {
                        return Ka.hasOwnProperty(a1) ? Ka[a1] : null;
                    },
                    scheduleUpdate: k
                }), {
                    ctype: "boolean",
                    value: !0
                };
                sa("Plugin " + a1 + " not found");
                return {
                    ctype: "boolean",
                    value: !1
                };
            }
            return h;
        };
        q.format$2 = function(a1, e) {
            function b(a1, b) {
                a1 = a1.toFixed(k);
                do {
                    var c = a1;
                    a1 = a1.substring(0, a1.length - 1);
                }while (b && "" !== a1 && "-" !== a1 && +a1 === +c);
                b = "" + c;
                e.delimiter && "string" === e.delimiter.ctype && (b = b.replace(".", e.delimiter.value));
                return b;
            }
            function c(a1, e) {
                if ("number" === a1.ctype) {
                    var d = b(a1.value.real, g);
                    var f = b(a1.value.imag, g);
                    a1 = Math.abs(a1.value.imag) < Math.pow(10, -e) ? d : "-" === f.substring(0, 1) ? d + " - i*" + f.substring(1) : d + " + i*" + f;
                    return {
                        ctype: "string",
                        value: a1
                    };
                }
                return "list" === a1.ctype ? {
                    ctype: "list",
                    value: a1.value.map(c)
                } : {
                    ctype: "string",
                    value: da(a1).toString()
                };
            }
            var d = D(a1[0]);
            a1 = D(a1[1]);
            var g = !0;
            if (e.truncate) {
                var f = w(e.truncate);
                "boolean" === f.ctype && (g = f.value);
            }
            if (("number" === d.ctype || "list" === d.ctype) && "number" === a1.ctype) {
                var k = Math.max(0, Math.min(20, Math.round(a1.value.real)));
                return c(d, k);
            }
            return h;
        };
        Date.now || (Date.now = function() {
            return (new Date).getTime();
        });
        var Ie = 0;
        q.timestamp$0 = function(a1, e) {
            return l.real(Date.now());
        };
        q.seconds$0 = function(a1, e) {
            return l.real((Date.now() - Ie) / 1E3);
        };
        q.resetclock$0 = function(a1, e) {
            Ie = Date.now();
            return h;
        };
        q.time$0 = function(a1, e) {
            a1 = new Date;
            return g.realVector([
                a1.getHours(),
                a1.getMinutes(),
                a1.getSeconds(),
                a1.getMilliseconds()
            ]);
        };
        q.date$0 = function(a1, e) {
            a1 = new Date;
            return g.realVector([
                a1.getFullYear(),
                a1.getMonth() + 1,
                a1.getDate()
            ]);
        };
        q.simulationtime$0 = function(a1, e) {
            return l.real(yc * Bc);
        };
        q.settimeout$2 = function(a1, e) {
            function b() {
                w(c);
                k();
            }
            e = w(a1[0]);
            var c = a1[1];
            "number" === e.ctype && "undefined" !== typeof window && window.setTimeout(b, 1E3 * e.value.real);
            return h;
        };
        E.formatForWebGL = function(a1) {
            return a1.toFixed(10);
        };
        q.generateWebGL$2 = function(a1, e) {
            var b = E.formatForWebGL;
            e = a1[0];
            a1 = w(a1[1]);
            console.log(a1);
            if ("list" !== a1.ctype) return h;
            for(var c = [], d = 0; d < a1.value.length; d++)"string" === a1.value[d].ctype && c.push(a1.value[d].value);
            console.log("***********");
            console.log(c);
            a1 = E.plotvars(e);
            console.log(a1);
            -1 === a1.indexOf("a") && -1 === a1.indexOf("b") && -1 === a1.indexOf("c") && -1 === a1.indexOf("d") && -1 === a1.indexOf("e") && -1 === a1.indexOf("f") && (e = D(e));
            if ("number" === e.ctype) return {
                ctype: "string",
                value: "vec2(" + b(e.value.real) + "," + b(e.value.imag) + ")"
            };
            if ("variable" === e.ctype) return {
                ctype: "string",
                value: e.name
            };
            if ("string" === e.ctype || "void" === e.ctype) return e;
            if (2 === e.args.length && ("infix" === e.ctype || "function" === e.ctype)) {
                b = q.compileToWebGL$1([
                    e.args[0]
                ], {});
                a1 = q.compileToWebGL$1([
                    e.args[1]
                ], {});
                if ("+" === e.oper || "add" === e.oper) return void 0 === b.value || "void" === b.ctype ? {
                    ctype: "string",
                    value: a1.value
                } : {
                    ctype: "string",
                    value: "addc(" + b.value + "," + a1.value + ")"
                };
                if ("*" === e.oper || "mult" === e.oper) return {
                    ctype: "string",
                    value: "multc(" + b.value + "," + a1.value + ")"
                };
                if ("/" === e.oper || "div" === e.oper) return {
                    ctype: "string",
                    value: "divc(" + b.value + "," + a1.value + ")"
                };
                if ("-" === e.oper || "sub" === e.oper) return void 0 === b.value || "void" === b.ctype ? {
                    ctype: "string",
                    value: "negc(" + a1.value + ")"
                } : {
                    ctype: "string",
                    value: "subc(" + b.value + "," + a1.value + ")"
                };
                if ("^" === e.oper || "pow" === e.oper) return {
                    ctype: "string",
                    value: "powc(" + b.value + "," + a1.value + ")"
                };
            }
            if ("function" === e.ctype && 1 === e.args.length) {
                b = q.compileToWebGL$1([
                    e.args[0]
                ], {});
                if ("sin$1" === e.oper) return {
                    ctype: "string",
                    value: "sinc(" + b.value + ")"
                };
                if ("cos$1" === e.oper) return {
                    ctype: "string",
                    value: "cosc(" + b.value + ")"
                };
                if ("tan$1" === e.oper) return {
                    ctype: "string",
                    value: "tanc(" + b.value + ")"
                };
                if ("exp$1" === e.oper) return {
                    ctype: "string",
                    value: "expc(" + b.value + ")"
                };
                if ("log$1" === e.oper) return {
                    ctype: "string",
                    value: "logc(" + b.value + ")"
                };
                if ("arctan$1" === e.oper) return {
                    ctype: "string",
                    value: "arctanc(" + b.value + ")"
                };
                if ("arcsin$1" === e.oper) return {
                    ctype: "string",
                    value: "arcsinc(" + b.value + ")"
                };
                if ("arccos$1" === e.oper) return {
                    ctype: "string",
                    value: "arccosc(" + b.value + ")"
                };
                if ("sqrt$1" === e.oper) return {
                    ctype: "string",
                    value: "sqrtc(" + b.value + ")"
                };
            }
            return h;
        };
        q.compileToWebGL$1 = function(a1, e) {
            e = E.formatForWebGL;
            a1 = a1[0];
            var b = E.plotvars(a1);
            -1 === b.indexOf("a") && -1 === b.indexOf("b") && -1 === b.indexOf("c") && -1 === b.indexOf("d") && -1 === b.indexOf("e") && -1 === b.indexOf("f") && (a1 = D(a1));
            if ("number" === a1.ctype) return {
                ctype: "string",
                value: "vec2(" + e(a1.value.real) + "," + e(a1.value.imag) + ")"
            };
            if ("variable" === a1.ctype) return {
                ctype: "string",
                value: a1.name
            };
            if ("string" === a1.ctype || "void" === a1.ctype) return a1;
            if (2 === a1.args.length && ("infix" === a1.ctype || "function" === a1.ctype)) {
                e = q.compileToWebGL$1([
                    a1.args[0]
                ], {});
                b = q.compileToWebGL$1([
                    a1.args[1]
                ], {});
                if ("+" === a1.oper || "add" === a1.oper) return void 0 === e.value || "void" === e.ctype ? {
                    ctype: "string",
                    value: b.value
                } : {
                    ctype: "string",
                    value: "addc(" + e.value + "," + b.value + ")"
                };
                if ("*" === a1.oper || "mult" === a1.oper) return {
                    ctype: "string",
                    value: "multc(" + e.value + "," + b.value + ")"
                };
                if ("/" === a1.oper || "div" === a1.oper) return {
                    ctype: "string",
                    value: "divc(" + e.value + "," + b.value + ")"
                };
                if ("-" === a1.oper || "sub" === a1.oper) return void 0 === e.value || "void" === e.ctype ? {
                    ctype: "string",
                    value: "negc(" + b.value + ")"
                } : {
                    ctype: "string",
                    value: "subc(" + e.value + "," + b.value + ")"
                };
                if ("^" === a1.oper || "pow" === a1.oper) return {
                    ctype: "string",
                    value: "powc(" + e.value + "," + b.value + ")"
                };
            }
            if ("function" === a1.ctype && 1 === a1.args.length) {
                e = q.compileToWebGL$1([
                    a1.args[0]
                ], {});
                if ("sin$1" === a1.oper) return {
                    ctype: "string",
                    value: "sinc(" + e.value + ")"
                };
                if ("cos$1" === a1.oper) return {
                    ctype: "string",
                    value: "cosc(" + e.value + ")"
                };
                if ("tan$1" === a1.oper) return {
                    ctype: "string",
                    value: "tanc(" + e.value + ")"
                };
                if ("exp$1" === a1.oper) return {
                    ctype: "string",
                    value: "expc(" + e.value + ")"
                };
                if ("log$1" === a1.oper) return {
                    ctype: "string",
                    value: "logc(" + e.value + ")"
                };
                if ("arctan$1" === a1.oper) return {
                    ctype: "string",
                    value: "arctanc(" + e.value + ")"
                };
                if ("arcsin$1" === a1.oper) return {
                    ctype: "string",
                    value: "arcsinc(" + e.value + ")"
                };
                if ("arccos$1" === a1.oper) return {
                    ctype: "string$1",
                    value: "arccosc(" + e.value + ")"
                };
                if ("sqrt$1" === a1.oper) return {
                    ctype: "string",
                    value: "sqrtc(" + e.value + ")"
                };
            }
            return h;
        };
        q.setsimulationspeed$1 = function(a1, b) {
            a1 = D(a1[0]);
            "number" === a1.ctype && O(a1.value.real);
            return h;
        };
        q.setsimulationaccuracy$1 = function(a1, b) {
            a1 = D(a1[0]);
            "number" === a1.ctype && "undefined" !== typeof W && "undefined" !== typeof W.env && (W.env.accuracy = Math.max(1, a1.value.real | 0));
            return h;
        };
        q.setsimulationquality$1 = function(a1, b) {
            a1 = D(a1[0]);
            "number" === a1.ctype && "undefined" !== typeof W && "undefined" !== typeof W.env && (a1 = a1.value.real, 0 === a1 && (W.env.errorbound = .01, W.env.lowestdeltat = 1E-5, W.env.slowdownfactor = 2), 1 === a1 && (W.env.errorbound = .001, W.env.lowestdeltat = 1E-7, W.env.slowdownfactor = 2), 2 === a1 && (W.env.errorbound = 1E-5, W.env.lowestdeltat = 1E-10, W.env.slowdownfactor = 4), 3 === a1 && (W.env.errorbound = 1E-6, W.env.lowestdeltat = 1E-12, W.env.slowdownfactor = 4));
            return h;
        };
        var Oc = null, ve = null;
        q.createtool$3 = function(a1, b) {
            var e = "left", c = "top", d = null;
            if (b.space) {
                var g = w(b.space);
                "number" === g.ctype && (d = g.value.real / 2);
            }
            var f = null;
            b.toolbar && (g = w(b.toolbar), "string" === g.ctype && ((f = document.getElementById(g.value)) || console.warn("Element #" + g.value + " not found")));
            if (!f) {
                if (b.reference && (g = w(b.reference), "string" === g.ctype)) switch(g.value){
                    case "UR":
                        e = "right";
                        break;
                    case "LL":
                        c = "bottom";
                        break;
                    case "LR":
                        e = "right", c = "bottom";
                }
                f = document.createElement("div");
                f.className = "CindyJS-toolbar";
                ra.parentNode.appendChild(f);
                g = w(a1[1]);
                var k = w(a1[2]);
                "number" === g.ctype && (f.style[e] = g.value.real + "px");
                "number" === k.ctype && (f.style[c] = k.value.real + "px");
                null !== d && (f.style.margin = -d + "px");
            }
            a1 = w(a1[0]);
            if ("string" === a1.ctype) a1 = [
                [
                    a1.value
                ]
            ];
            else if ("list" === a1.ctype) a1 = a1.value.map(function(a1) {
                return "string" === a1.ctype ? [
                    a1.value
                ] : "list" === a1.ctype ? a1.value.map(function(a1) {
                    return "string" === a1.ctype ? a1.value : null;
                }) : [
                    null
                ];
            });
            else return sa("Name must be a string or a list of strings"), h;
            if (b.flipped && (g = w(b.flipped), "boolean" === g.ctype && g.value)) {
                sa("Flipping");
                var l = 0;
                b = a1.length;
                a1.forEach(function(a1) {
                    a1.length > l && (l = a1.length);
                });
                g = [];
                for(k = 0; k < l; ++k){
                    g[k] = [];
                    for(var m = 0; m < b; ++m)g[k][m] = a1[m][k] || null;
                }
                a1 = g;
            }
            "bottom" === c && a1.reverse();
            a1.forEach(function(a1) {
                "right" === e && a1.reverse();
                var b = document.createElement("div");
                f.appendChild(b);
                a1.forEach(function(a1) {
                    function e() {
                        Oc && Oc.classList.remove("CindyJS-active");
                        Oc = g;
                        g.classList.add("CindyJS-active");
                        De = a1;
                        var b = H[De].actions;
                        ve && (ve.textContent = b[0].tooltip || "");
                        ib = [];
                        dd = Vb = 0;
                    }
                    H.hasOwnProperty(a1) || (sa("Tool '" + a1 + "' not implemented yet."), a1 = null);
                    if (null === a1) {
                        var c = document.createElement("span");
                        c.className = "CindyJS-spacer";
                        b.appendChild(c);
                    } else {
                        var g = document.createElement("button");
                        c = document.createElement("img");
                        c.src = Ia.getBaseDir() + "images/" + a1 + ".png";
                        g.appendChild(c);
                        g.addEventListener("click", e);
                        Oc || e();
                        null !== d && (g.style.margin = d + "px");
                        b.appendChild(g);
                    }
                });
            });
            return h;
        };
        q.dropped$0 = function() {
            return ad;
        };
        q.droppoint$0 = function() {
            return bd;
        };
        q.parsecsv$1 = function(a1, b) {
            var e = !0, c = D(b.autoconvert);
            "boolean" === c.ctype && (e = c.value);
            c = null;
            b = D(b.delimiter);
            "string" === b.ctype && /^[^"\r\n]$/.test(b.value) && (c = b.value);
            a1 = D(a1[0]);
            if ("string" !== a1.ctype) return sa("CSV data is not a string"), h;
            a1 = a1.value;
            b = '(?:"((?:[^"]+|"")*)"|([^]*?))(\r\n|(,)|[\r\n]|$)';
            c && (c = c.replace(/[^A-Za-z0-9]/g, "\\$&").replace(/\$/g, "$$$$"), b = b.replace(/,/g, c));
            b = new RegExp(b, "g");
            c = [];
            for(var d = [], f = null; b.lastIndex < a1.length;){
                var k = b.exec(a1), m = k[2];
                "string" === typeof k[1] && (m = k[1].replace(/""/g, '"'));
                m = e ? /^[Tt]rue$/.test(m) ? u.bool(!0) : /^[Ff]alse$/.test(m) ? u.bool(!1) : /^[\-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+|Infinity)$/.test(m) ? l.real(Number(m)) : u.string(m) : u.string(m);
                c.push(m);
                k[4] && b.lastIndex === a1.length && (c.push(u.string("")), k = {});
                if (!k[4]) {
                    null === f && (f = c.length);
                    if (f < c.length) for(f = c.length, k = 0; k < d.length; ++k)for(m = d[k].length; m < f; ++m)d[k][m] = h;
                    else if (f > c.length) for(k = c.length; k < f; ++k)c[k] = h;
                    d.push(c);
                    c = [];
                }
            }
            return g.turnIntoCSList(d.map(g.turnIntoCSList));
        };
        q.load$2 = function(a1, b) {
            return q.load$3([
                a1[0],
                null,
                a1[1]
            ], b);
        };
        q.load$3 = function(a1, b) {
            function e() {
                if (g.readyState === XMLHttpRequest.DONE) {
                    if (200 === g.status) var b = u.string(String(g.responseText));
                    else sa("Failed to load " + d + ": " + g.statusText), b = h;
                    L.newvar(c);
                    L.setvar(c, b);
                    w(a1[2]);
                    L.removevar(c);
                    k();
                }
            }
            var c = "#";
            null !== a1[1] && "variable" === a1[1].ctype && (c = a1[1].name);
            b = D(a1[0]);
            var d = null, g = null;
            "string" === b.ctype && /^https?:\/\//.test(b.value) && (d = b.value);
            return null !== d ? (g = new XMLHttpRequest, g.onreadystatechange = e, g.open("GET", d), g.send(), u.bool(!0)) : h;
        };
        q.removeelement$1 = function(a1, b) {
            a1 = w(a1[0]);
            "geo" === a1.ctype ? Rc(a1.value.name) : console.log("argument of removeelement is undefined or not of type <geo>");
        };
        q.guess$1 = function(a1, b) {
            function e(a1) {
                if ((a1 = kb.doPSLQ([
                    a1,
                    1,
                    Math.PI * Math.E
                ], 15)) && 0 === a1[2]) return [
                    Math.round(a1[0]),
                    Math.round(a1[1])
                ];
            }
            function c(a1) {
                if (l._helper.isAlmostZero(a1)) return "0";
                if (!l._helper.isAlmostReal(a1)) {
                    var b = a1.value.real, c = a1.value.imag, x = e(b), h = e(b * b + c * c);
                    if (x && h) {
                        b = -x[0] * h[0];
                        var v = -x[1] * h[0] * 2, m = x[0] * h[1];
                        x = g(-v, 2 * b);
                        h = v * v - 4 * m * b;
                        a1 = f(h);
                        h /= a1 * a1;
                        h = a1 === 2 * b ? "+i*sqrt(" + -h + ")" : a1 === -2 * b ? "+i*sqrt(" + -h + ")" : "+i*" + g(a1, 2 * b).substring(1) + "*sqrt(" + -h + ")";
                        a1 = "-" + h.substring(1);
                        v = Math.abs((v * v - 4 * m * b) / (4 * b * b));
                        b = Math.sqrt(v);
                        v = -Math.sqrt(v);
                        if ("+0" === x || "-0" === x) x = "";
                        c = Math.abs(c - b) < Math.abs(c - v) ? x + h : x + a1;
                        c.startsWith("+") && (c = c.substring(1));
                    } else c = da(a1);
                    return c;
                }
                var n = kb.doPSLQ([
                    Math.PI,
                    a1.value.real,
                    1
                ], 15);
                c = "" + a1.value.real;
                m = b = "";
                var N = v = 1E4;
                x = 1E5;
                if (n && 3E3 > (x = d(n))) {
                    b = a1.value.real;
                    v = n[0];
                    h = -n[1];
                    n = n[2];
                    var Y = "";
                    if (0 !== v) {
                        var ka = Math.round(v);
                        var p = Math.round(h);
                        Y = g(ka, p) + "*pi";
                    }
                    ka = "";
                    0 !== n && (ka = Math.round(n), p = Math.round(h), ka = g(ka, p));
                    k = Math.abs(b - (n / h + Math.PI * v / h));
                    b = ka + Y;
                    "" === b ? b = "0" : b.startsWith("+") && (b = b.substring(1));
                    v = k;
                }
                Y = kb.doPSLQ([
                    a1.value.real * a1.value.real,
                    a1.value.real,
                    1
                ], 15);
                h = 1E5;
                if (Y && 9E3 > (h = 10 + d(Y))) {
                    a1 = a1.value.real;
                    N = Y[0];
                    n = Y[1];
                    Y = Y[2];
                    ka = Math.round(N);
                    p = Math.round(n);
                    var za = Math.round(Y);
                    m = g(-p, 2 * ka);
                    p = p * p - 4 * za * ka;
                    za = f(p);
                    p /= za * za;
                    ka = za === 2 * ka ? "+sqrt(" + p + ")" : za === -2 * ka ? "-sqrt(" + p + ")" : g(za, 2 * ka) + "*sqrt(" + p + ")";
                    p = -n / (2 * N);
                    Y = Math.abs((n * n - 4 * Y * N) / (4 * N * N));
                    ka = "+" + ka.substring(1);
                    N = "-" + ka.substring(1);
                    n = p + Math.sqrt(Y);
                    Y = p - Math.sqrt(Y);
                    if ("+0" === m || "-0" === m) m = "";
                    Math.abs(a1 - n) < Math.abs(a1 - Y) ? (k = Math.abs(a1 - n), a1 = m + ka) : (k = Math.abs(a1 - Y), a1 = m + N);
                    a1.startsWith("+") && (a1 = a1.substring(1));
                    m = a1;
                    N = k;
                }
                x < h && 1E-12 > v && (c = b);
                h < x && 1E-12 > N && (c = m);
                return c;
            }
            function d(a1) {
                var b = Math.abs(a1[0]);
                Math.abs(a1[1]) > b && (b = Math.abs(a1[1]));
                Math.abs(a1[2]) > b && (b = Math.abs(a1[2]));
                return b;
            }
            function g(a1, b) {
                var e = "+";
                0 > a1 * b && (a1 = Math.abs(a1), b = Math.abs(b), e = "-");
                var c = Zb(a1, b);
                a1 /= c;
                b /= c;
                0 > a1 && 0 > b && (a1 = -a1, b = -b);
                return 1 === b ? e + a1 : e + a1 + "/" + b;
            }
            function f(a1) {
                for(var b = 3E3; 0 < b; b--)if (0 === a1 % (b * b)) return b;
                return 1;
            }
            var k = 0;
            a1 = D(a1[0]);
            return "number" === a1.ctype && l._helper.isFinite(a1) ? (a1 = void 0 === c(a1) ? "no guess" : c(a1), u.string(a1)) : h;
        };
        E.extractPoint = function(a1) {
            var b = {
                ok: !1
            };
            if ("geo" === a1.ctype) {
                var c = a1.value;
                if ("P" === c.kind) return b.x = Ha.getField(c, "x").value.real, b.y = Ha.getField(c, "y").value.real, b.ok = !0, b;
            }
            if ("list" !== a1.ctype) return b;
            var d = a1.value;
            if (2 === d.length && (a1 = d[0], c = d[1], "number" === a1.ctype && "number" === c.ctype)) return b.x = a1.value.real, b.y = c.value.real, b.ok = !0, b;
            3 === d.length && (a1 = d[0], c = d[1], d = d[2], "number" === a1.ctype && "number" === c.ctype && "number" === d.ctype && (a1 = l.div(a1, d), c = l.div(c, d), b.x = a1.value.real, b.y = c.value.real, b.ok = !0));
            return b;
        };
        q.draw$1 = function(a1, b) {
            a1 = D(a1[0]);
            if ("shape" === a1.ctype) E.drawshape(a1, b);
            else if ("Line" === a1.usage) y.handleModifs(b, y.lineModifs), y.drawline(a1);
            else {
                var e = E.extractPoint(a1);
                if (!e.ok) {
                    if ("undefined" !== typeof a1.value && 2 === a1.value.length) return q.draw$2(a1.value, b);
                    return;
                }
                null !== b && y.handleModifs(b, y.pointModifs);
                y.drawpoint(e);
            }
            return h;
        };
        q.draw$2 = function(a1, b) {
            var e = D(a1[0]);
            a1 = D(a1[1]);
            e = E.extractPoint(e);
            a1 = E.extractPoint(a1);
            if (!e.ok || !a1.ok) return h;
            null !== b && y.handleModifs(b, y.lineModifs);
            y.drawsegcore(e, a1);
            return h;
        };
        q.drawcircle$2 = function(a1, b) {
            return E.drawcircle(a1, b, "D");
        };
        E.arcHelper = function(a1) {
            var b = {};
            b.startPoint = Q(a1[0]);
            b.viaPoint = Q(a1[1]);
            b.endPoint = Q(a1[2]);
            return b;
        };
        q.fillcircle$2 = function(a1, b) {
            return E.drawcircle(a1, b, "F");
        };
        q.drawarc$3 = function(a1, b) {
            a1 = E.arcHelper(a1);
            return E.drawarc(a1, b, "D");
        };
        q.fillarc$3 = function(a1, b) {
            a1 = E.arcHelper(a1);
            return E.drawarc(a1, b, "F");
        };
        E.drawarc = function(a1, b, c) {
            var e = a1.startPoint, d = a1.viaPoint;
            a1 = a1.endPoint;
            if (!g._helper.isAlmostReal(g.turnIntoCSList([
                e,
                d,
                a1
            ]))) return h;
            y.handleModifs(b, y.conicModifs);
            y.preDrawCurve();
            b = g.det3(e, d, a1);
            if (1E-12 < Math.abs(b.value.real)) {
                b = m._helper.ConicBy5(null, e, d, a1, g.ii, g.jj);
                var f = m._helper.CenterOfConic(b);
                f = g.normalizeMax(f);
                b = l.real(0);
                var x = g.turnIntoCSList([
                    g.turnIntoCSList([
                        f.value[2],
                        b,
                        l.neg(f.value[0])
                    ]),
                    g.turnIntoCSList([
                        b,
                        f.value[2],
                        l.neg(f.value[1])
                    ]),
                    g.turnIntoCSList([
                        b,
                        b,
                        f.value[2]
                    ])
                ]);
                b = g.normalizeZ(u.mult(x, e));
                g.normalizeZ(u.mult(x, d));
                x = g.normalizeZ(u.mult(x, a1));
                b = -Math.atan2(b.value[1].value.real, b.value[0].value.real);
                x = -Math.atan2(x.value[1].value.real, x.value[0].value.real);
                f = g.normalizeZ(f);
                e = g.normalizeZ(e);
                d = g.normalizeZ(d);
                a1 = g.normalizeZ(a1);
                var k = g.abs(g.sub(e, f)), n = [
                    f.value[0].value.real,
                    f.value[1].value.real
                ];
                f = C.drawingstate.matrix;
                var p = n[0] * f.a - n[1] * f.b + f.tx;
                n = n[0] * f.c - n[1] * f.d - f.ty;
                e = 0 < g.det3(e, d, a1).value.real;
                z.save();
                z.beginPath();
                z.translate(p, n);
                z.arc(0, 0, k.value.real * f.sdet, b, x, e);
                "F" === c && (z.fillStyle = y.lineColor, z.closePath(), z.fill());
                "D" === c && z.stroke();
                z.restore();
            } else {
                if ("D" !== c) return h;
                c = E.extractPoint(e);
                b = E.extractPoint(d);
                x = E.extractPoint(a1);
                if (!c.ok || !b.ok || !x.ok) return h;
                k = (c.x - x.x) * (c.x - x.x) + (c.y - x.y) * (c.y - x.y);
                f = (x.x - b.x) * (x.x - b.x) + (x.y - b.y) * (x.y - b.y);
                if (1E-12 > (c.x - b.x) * (c.x - b.x) + (c.y - b.y) * (c.y - b.y) || 1E-12 > k || 1E-12 > f) return h;
                0 > g.crossratio3(e, a1, d, g.cross(g.cross(e, d), g.linfty), g.ii).value.real ? y.drawsegcore(c, x) : y.drawRaySegment(e, a1);
            }
            return h;
        };
        E.drawcircle = function(a1, b, c) {
            var e = D(a1[0]);
            a1 = D(a1[1]);
            var d = E.extractPoint(e);
            if (!d.ok || "number" !== a1.ctype || !l._helper.isAlmostReal(a1)) return h;
            e = C.drawingstate.matrix;
            var g = d.x * e.a - d.y * e.b + e.tx;
            d = d.x * e.c - d.y * e.d - e.ty;
            y.handleModifs(b, y.conicModifs);
            y.preDrawCurve();
            z.lineJoin = "miter";
            z.beginPath();
            z.arc(g, d, Math.abs(a1.value.real) * e.sdet, 0, 2 * Math.PI);
            z.closePath();
            "D" === c && z.stroke();
            "F" === c && (z.fillStyle = y.lineColor, z.fill());
            "C" === c && z.clip();
            return h;
        };
        q.drawconic$1 = function(a1, b) {
            a1 = D(a1[0]);
            if ("list" !== a1.ctype || 3 !== a1.value.length && 6 !== a1.value.length) return console.error("could not parse conic"), h;
            if (6 === a1.value.length) {
                for(var e = 0; 6 > e; e++)if ("number" !== a1.value[e].ctype) return console.error("could not parse conic"), h;
                var c = l.real(.5);
                e = a1.value[0];
                var d = a1.value[2];
                d = l.mult(d, c);
                var f = a1.value[1], k = a1.value[3];
                k = l.mult(k, c);
                var m = a1.value[4];
                m = l.mult(m, c);
                a1 = a1.value[5];
                a1 = g.turnIntoCSList([
                    g.turnIntoCSList([
                        e,
                        d,
                        k
                    ]),
                    g.turnIntoCSList([
                        d,
                        f,
                        m
                    ]),
                    g.turnIntoCSList([
                        k,
                        m,
                        a1
                    ])
                ]);
            } else {
                if (!g.isNumberMatrix(a1).value || 3 !== a1.value.length || 3 !== a1.value[0].value.length) return h;
                e = g.transpose(a1);
                g.equals(a1, e).value || (a1 = g.add(e, a1));
            }
            return E.drawconic(a1, b);
        };
        E.drawconic = function(a1, b) {
            function e(a1, b) {
                a1 = (l * a1 + m * b + n) * a1 + (p * b + q) * b + r;
                return 0 <= a1 ? 1 : 0 > a1 ? -1 : NaN;
            }
            function c(a1) {
                L.next = a1;
                a1.prev = L;
                return L = a1;
            }
            function d(a1, b, c, d) {
                return {
                    a: a1,
                    b1: b,
                    b2: c,
                    vertical: !0,
                    index: d,
                    sign: function(b) {
                        return e(a1, b);
                    },
                    mkp: function(b) {
                        return {
                            x: a1,
                            y: b
                        };
                    },
                    sol: dc(p, m * a1 + q, (l * a1 + n) * a1 + r),
                    discr: function() {
                        return dc(D, -2 * w, t);
                    },
                    tpt: function(a1) {
                        return {
                            x: a1,
                            y: -0.5 * (m * a1 + q) / p
                        };
                    }
                };
            }
            function f(a1, b, c, d) {
                return {
                    a: a1,
                    b1: b,
                    b2: c,
                    vertical: !1,
                    index: d,
                    sign: function(b) {
                        return e(b, a1);
                    },
                    mkp: function(b) {
                        return {
                            x: b,
                            y: a1
                        };
                    },
                    sol: dc(l, m * a1 + n, (p * a1 + q) * a1 + r),
                    discr: function() {
                        return dc(D, -2 * B, A);
                    },
                    tpt: function(a1) {
                        return {
                            x: -0.5 * (m * a1 + n) / l,
                            y: a1
                        };
                    }
                };
            }
            function h(a1) {
                var b = Math.min(a1.b1, a1.b2), e = Math.max(a1.b1, a1.b2), d = a1.sign(b), g = a1.sign(e);
                if (!isFinite(d * g)) return !1;
                var f = a1.sol;
                if (d !== g) {
                    if (null === f) return !1;
                    var x = .5 * (f[0] + f[1]);
                    x > b && x < e ? (b = a1.sign(x), x = f[b === g ? 0 : 1]) : (d = .5 * (b + e), x = f[Math.abs(d - f[0]) < Math.abs(d - f[1]) ? 0 : 1]);
                    J.push(c(a1.mkp(x)));
                } else {
                    if (null === f) {
                        if (0 >= E) return !0;
                        f = a1.discr();
                        if (null === f) return !0;
                        a1 = a1.tpt(f[a1.index]);
                        a1.x >= F && a1.x <= H && a1.y >= G && a1.y <= I && c(a1);
                        return !0;
                    }
                    x = .5 * (f[0] + f[1]);
                    if (!(x > b && x < e)) return !0;
                    b = a1.sign(x);
                    if (b === d || isNaN(b)) return !0;
                    a1.b1 > a1.b2 && (f = [
                        f[1],
                        f[0]
                    ]);
                    J.push(c(a1.mkp(f[0])));
                    J.push(c(a1.mkp(f[1])));
                }
                return !0;
            }
            function k(a1, b, e, c, d) {
                var g = b - c, f = e - a1, x = a1 * c - b * e, h = w * g + B * f + D * x;
                if (1E-14 > Math.abs(h)) return z.lineTo(e, c);
                var v = (t * g + u * f + w * x) / h;
                g = (u * g + A * f + B * x) / h;
                if (!isFinite(v) || !isFinite(g) || .04 > Math.abs(a1 * g + v * c + e * b - e * g - v * b - a1 * c)) return z.lineTo(e, c);
                do if (!(10 < d)) {
                    x = .5 * (a1 + e);
                    f = .5 * (b + c);
                    var N = v - x;
                    h = g - f;
                    if (!(.04 > N * N + h * h)) {
                        var Y = l * N * N + m * N * h + p * h * h, ka = 2 * l * N * x + m * (N * f + h * x) + 2 * p * h * f + n * N + q * h, za = (l * x + m * f + n) * x + (p * f + q) * f + r, fa = dc(Y, ka, za);
                        fa || (fa = [
                            -0.5 * ka / Y,
                            -2 * za / ka
                        ]);
                        if (0 < fa[0]) fa = fa[0];
                        else if (0 <= fa[1]) fa = fa[1];
                        else break;
                        N = x + fa * N;
                        h = f + fa * h;
                        x = N - .5 * (v + x);
                        f = h - .5 * (g + f);
                        if (!(.04 > x * x + f * f)) {
                            k(a1, b, N, h, d + 1);
                            k(N, h, e, c, d + 1);
                            return;
                        }
                    }
                }
                while (0);
                z.quadraticCurveTo(v, g, e, c);
            }
            y.handleModifs(b, y.conicModifs);
            if (0 !== y.lsize && (y.preDrawCurve(), a1 = g.normalizeMax(a1), g._helper.isAlmostReal(a1))) {
                b = C.toMat();
                a1 = g.mult(g.transpose(b), a1);
                a1 = g.mult(a1, b);
                a1 = g.normalizeMax(a1);
                var l = a1.value[0].value[0].value.real, m = 2 * a1.value[0].value[1].value.real, n = 2 * a1.value[0].value[2].value.real, p = a1.value[1].value[1].value.real, q = 2 * a1.value[1].value[2].value.real, r = a1.value[2].value[2].value.real, t = 4 * r * p - q * q, u = q * n - 2 * r * m, w = q * m - 2 * p * n, A = 4 * r * l - n * n, B = n * m - 2 * q * l, D = 4 * p * l - m * m, E = D;
                a1 = p * A + m * u + l * t - r * D;
                0 > a1 && (l = -l, m = -m, n = -n, p = -p, q = -q, r = -r, a1 = -a1);
                a1 = y.lsize;
                var F = -a1, G = -a1, H = ma + a1, I = pa + a1, J = [], L = a1 = {};
                if (h(d(F, G, I, 0)) && h(f(I, F, H, 1)) && h(d(H, I, G, 1)) && h(f(G, H, F, 0)) && L !== a1) {
                    L.next = a1.next;
                    a1.next.prev = L;
                    z.beginPath();
                    if (0 === J.length) {
                        var K = L;
                        z.moveTo(K.x, K.y);
                        do {
                            var M = K.next;
                            k(K.x, K.y, M.x, M.y, 0);
                            K = M;
                        }while (K !== L);
                        z.closePath();
                    }
                    b = 1 === e(F, G) ? 0 : 1;
                    if (4 === J.length) {
                        var P = 0;
                        for(a1 = 0; 2 > a1; ++a1){
                            K = J[a1];
                            M = J[a1 + 2];
                            var O = M.x - K.x;
                            K = M.y - K.y;
                            K = (l * O + m * K) * O + p * K * K;
                            Math.abs(K) > Math.abs(P) && (P = K);
                        }
                        if (isNaN(P)) return;
                        0 <= P && (b = 1 - b);
                    }
                    for(a1 = b; a1 < J.length; a1 += 2)for(K = J[a1], b = J[(a1 + 1) % J.length], z.moveTo(K.x, K.y), M = K.next; K !== b; M = (K = M).next)k(K.x, K.y, M.x, M.y, 0);
                    z.stroke();
                }
            }
        };
        q.drawall$1 = function(a1, b) {
            a1 = w(a1[0]);
            if ("list" === a1.ctype) for(y.handleModifs(b, y.pointAndLineModifs), b = 0; b < a1.value.length; b++)q.draw$1([
                a1.value[b]
            ], null);
            return h;
        };
        q.connect$1 = function(a1, b) {
            return E.drawpolygon(a1, b, "D", !1);
        };
        q.drawpoly$1 = function(a1, b) {
            return E.drawpolygon(a1, b, "D", !0);
        };
        q.fillpoly$1 = function(a1, b) {
            return E.drawpolygon(a1, b, "F", !0);
        };
        q.drawpolygon$1 = function(a1, b) {
            return E.drawpolygon(a1, b, "D", !0);
        };
        q.fillpolygon$1 = function(a1, b) {
            return E.drawpolygon(a1, b, "F", !0);
        };
        E.drawpolygon = function(a1, b, c, d) {
            function e() {
                for(var a1 = x.value, b = 0; b < a1.length; b++){
                    var e = a1[b], c;
                    for(c = 0; c < e.length; c++){
                        var d = e[c], g = d.X * f.a - d.Y * f.b + f.tx;
                        d = d.X * f.c - d.Y * f.d - f.ty;
                        0 === c ? z.moveTo(g, d) : z.lineTo(g, d);
                    }
                    z.closePath();
                }
            }
            function g() {
                var a1;
                for(a1 = 0; a1 < x.value.length; a1++){
                    var b = E.extractPoint(x.value[a1]);
                    if (!b.ok) return;
                    var e = b.x * f.a - b.y * f.b + f.tx;
                    b = b.x * f.c - b.y * f.d - f.ty;
                    0 === a1 ? z.moveTo(e, b) : z.lineTo(e, b);
                }
                d && z.closePath();
            }
            y.handleModifs(b, d ? y.conicModifs : y.lineModifs);
            y.preDrawCurve();
            var f = C.drawingstate.matrix, x = w(a1[0]);
            z.beginPath();
            "list" === x.ctype && g();
            "shape" === x.ctype && e();
            "D" === c && (y.fillColor && (z.fillStyle = y.fillColor, z.fill(y.fillrule)), z.stroke());
            "F" === c && (z.fillStyle = y.lineColor, z.fill(y.fillrule));
            "C" === c && z.clip();
            return h;
        };
        var we = id, Je = function(a1, b, c) {
            if (-1 !== b.indexOf("\n")) for(b = b.split("\n"), a1.textContent = b[0], c = 1; c < b.length; ++c)a1.appendChild(document.createElement("br")), a1.appendChild(document.createTextNode(b[c]));
            else a1.textContent = b;
        };
        E.drawtext = function(a1, b, c) {
            var e = D(a1[0]);
            a1 = w(a1[1]);
            var d = E.extractPoint(e);
            if (!d.ok) return null;
            y.handleModifs(b, y.textModifs);
            b = C.drawingstate.textsize;
            null === b && (b = Aa.textsize);
            null !== y.size && (b = y.size);
            z.fillStyle = y.textColor;
            var g = C.drawingstate.matrix;
            e = d.x * g.a - d.y * g.b + g.tx + y.xOffset;
            d = d.x * g.c - d.y * g.d - g.ty - y.yOffset;
            a1 = da(a1);
            Ia._pluginRegistry.katex || "string" !== typeof a1 || 3 <= a1.split("$").length && ba("katex", "katex-plugin.js", !0);
            z.font = y.bold + y.italics + Math.round(10 * b) / 10 + "px " + y.family;
            return c ? c(a1, e, d, y.align, b) : we(z, a1, e, d, y.align, b, b * Aa.lineHeight, y.angle);
        };
        q.drawtext$2 = function(a1, b) {
            E.drawtext(a1, b, null);
            return h;
        };
        q.drawtable$2 = function(a1, b) {
            var e = D(a1[0]);
            a1 = D(a1[1]);
            var c = E.extractPoint(e);
            if (!c.ok || "list" !== a1.ctype) return h;
            e = a1.value;
            a1 = e.length;
            var d = -1, f;
            for(f = 0; f < a1; ++f)"list" === e[f].ctype && e[f].value.length > d && (d = e[f].value.length);
            -1 === d ? (e = e.map(function(a1) {
                return [
                    a1
                ];
            }), d = 1) : e = e.map(function(a1) {
                return g.asList(a1).value;
            });
            var k = 100, l = null, m = !0, n = C.drawingstate.textcolor;
            y.handleModifs(b, {
                size: !0,
                color: function(a1) {
                    g._helper.isNumberVecN(a1, 3) && (n = y.makeColor([
                        a1.value[0].value.real,
                        a1.value[1].value.real,
                        a1.value[2].value.real
                    ]));
                },
                alpha: !0,
                bold: !0,
                italics: !0,
                family: !0,
                align: !0,
                x_offset: !0,
                y_offset: !0,
                offset: !0,
                width: function(a1) {
                    "number" === a1.ctype && (k = a1.value.real);
                },
                height: function(a1) {
                    "number" === a1.ctype && (l = a1.value.real);
                },
                border: function(a1) {
                    "boolean" === a1.ctype && (m = a1.value);
                }
            });
            f = C.drawingstate.textsize;
            null === f && (f = Aa.textsize);
            null !== y.size && (f = y.size);
            null === l && (l = 1.6 * f);
            z.font = y.bold + y.italics + Math.round(10 * f) / 10 + "px " + y.family;
            f = C.drawingstate.matrix;
            var p = d * k, q = a1 * l;
            b = c.x * f.a - c.y * f.b + f.tx + y.xOffset;
            var r = c.x * f.c - c.y * f.d - f.ty - y.yOffset - q;
            if (m) {
                y.preDrawCurve();
                z.strokeStyle = y.lineColor;
                z.beginPath();
                for(f = 1; f < a1; ++f)z.moveTo(b, r + f * l), z.lineTo(b + p, r + f * l);
                for(c = 1; c < d; ++c)z.moveTo(b + c * k, r), z.lineTo(b + c * k, r + q);
                z.stroke();
                z.lineWidth = y.lsize + 1;
                z.beginPath();
                z.rect(b, r, p, q);
                z.stroke();
            }
            b += y.align * k + (1 - 2 * y.align) * l * .3;
            r += .7 * l;
            z.fillStyle = n;
            for(f = 0; f < a1; ++f)for(c = 0; c < d; ++c)p = da(e[f][c]), we(z, p, b + c * k, r + f * l, y.align);
            return h;
        };
        E.drawshape = function(a1, b) {
            return "polygon" === a1.type ? E.drawpolygon([
                a1
            ], b, "D", 1) : "circle" === a1.type ? E.drawcircle([
                a1.value.value[0],
                a1.value.value[1]
            ], b, "D") : h;
        };
        E.fillshape = function(a1, b) {
            return "polygon" === a1.type ? E.drawpolygon([
                a1
            ], b, "F", 1) : "circle" === a1.type ? E.drawcircle([
                a1.value.value[0],
                a1.value.value[1]
            ], b, "F") : h;
        };
        E.clipshape = function(a1, b) {
            return "polygon" === a1.type ? E.drawpolygon([
                a1
            ], b, "C", 1) : "circle" === a1.type ? E.drawcircle([
                a1.value.value[0],
                a1.value.value[1]
            ], b, "C") : h;
        };
        q.fill$1 = function(a1, b) {
            a1 = w(a1[0]);
            return "shape" === a1.ctype ? E.fillshape(a1, b) : h;
        };
        q.clip$1 = function(a1, b) {
            var e = w(a1[0]);
            return "shape" === e.ctype ? E.clipshape(e, b) : "list" === e.ctype ? (a1 = q.polygon$1(a1, []), q.clip$1([
                a1
            ], [])) : h;
        };
        q.plot$1 = function(a1, b) {
            return q.plot$2([
                a1[0],
                null
            ], b);
        };
        q.plot$2 = function(a1, b) {
            function e(a1) {
                return "number" === a1.ctype && l._helper.isAlmostReal(a1);
            }
            function c(a1, b, e, c, d) {
                m++;
                b = +b.value.real;
                d = +c.value.real;
                c = b * B.a - d * B.b + B.tx;
                b = b * B.c - d * B.d - B.ty;
                a1 = +a1.value.real;
                d = +e.value.real;
                e = a1 * B.a - d * B.b + B.tx;
                a1 = a1 * B.c - d * B.d - B.ty;
                n ? (z.lineTo(e, a1), z.lineTo(c, b)) : (z.beginPath(), z.moveTo(e, a1), z.lineTo(c, b), n = !0);
            }
            function d(a1, b, g, x, h) {
                var v = e(g), m = e(x);
                if (.001 > h) !f && n && (z.stroke(), n = !1);
                else if (v || m) {
                    var N = l.real((a1.value.real + b.value.real) / 2);
                    L.setvar(A, N);
                    var Y = w(u), p = e(Y);
                    if (v && m && p) {
                        var ka = g.value.real;
                        m = Y.value.real;
                        p = x.value.real;
                        if (v = 1 > Math.abs(ka + p - 2 * m) / k) {
                            var q = l.real((a1.value.real + N.value.real) / 2);
                            L.setvar(A, q);
                            q = w(u);
                            var za = l.real((N.value.real + b.value.real) / 2);
                            L.setvar(A, za);
                            za = w(u);
                            ka = Math.abs(ka + m - 2 * q.value.real) / k;
                            m = Math.abs(m + p - 2 * za.value.real) / k;
                            v = v && 1 > ka && 1 > m;
                        }
                        v ? (c(a1, N, g, Y, h / 2), c(N, b, Y, x, h / 2)) : (d(a1, N, g, Y, h / 2), d(N, b, Y, x, h / 2));
                    } else d(a1, N, g, Y, h / 2), d(N, b, Y, x, h / 2);
                }
            }
            var f = !1, k = .2 / Yc, m = 0, n = !1, p = -10, q = 10, r = .1, t = 1E3, u = a1[0];
            if (null !== a1[1] && "variable" === a1[1].ctype) var A = a1[1].name;
            else a1 = E.plotvars(u), A = "#", -1 !== a1.indexOf("t") && (A = "t"), -1 !== a1.indexOf("z") && (A = "z"), -1 !== a1.indexOf("y") && (A = "y"), -1 !== a1.indexOf("x") && (A = "x");
            L.newvar(A);
            var B = C.drawingstate.matrix;
            y.handleModifs(b, {
                color: !0,
                alpha: !0,
                size: !0,
                dashpattern: !0,
                dashtype: !0,
                dashing: !0,
                lineCap: !0,
                lineJoin: !0,
                miterLimit: !0,
                connect: function(a1) {
                    "boolean" === a1.ctype && (f = a1.value);
                },
                start: function(a1) {
                    "number" === a1.ctype && (p = a1.value.real);
                },
                stop: function(a1) {
                    "number" === a1.ctype && (q = a1.value.real);
                },
                steps: function(a1) {
                    "number" === a1.ctype && (t = a1.value.real);
                }
            });
            z.strokeStyle = y.lineColor;
            z.lineWidth = y.lsize;
            n = !1;
            b = l.real(14.32);
            L.setvar(A, b);
            var D = w(u);
            if ("number" !== D.ctype) {
                if (g.isNumberVector(D).value && 2 === D.value.length) {
                    n = !1;
                    r = (q - p) / t;
                    for(b = p; b < q; b += r){
                        L.setvar(A, l.real(b));
                        var F = w(u);
                        if (g.isNumberVector(F).value && 2 === F.value.length) {
                            var G = +F.value[0].value.real;
                            F = +F.value[1].value.real;
                            a1 = G * B.a - F * B.b + B.tx;
                            G = G * B.c - F * B.d - B.ty;
                            n ? z.lineTo(a1, G) : (z.beginPath(), z.moveTo(a1, G), n = !0);
                        }
                    }
                    z.stroke();
                    L.removevar(A);
                }
                return h;
            }
            for(a1 = p; a1 < q + r; a1 += r)b = l.real(a1), L.setvar(A, b), D = w(u), b.value.real > p && d(G, b, F, D, r), G = b, F = D;
            L.removevar(A);
            n && z.stroke();
            return h;
        };
        q.plotX$1 = function(a1, b) {
            a1 = a1[0];
            var e = E.plotvars(a1);
            b = "#";
            -1 !== e.indexOf("t") && (b = "t");
            -1 !== e.indexOf("z") && (b = "z");
            -1 !== e.indexOf("y") && (b = "y");
            -1 !== e.indexOf("x") && (b = "x");
            L.newvar(b);
            e = C.drawingstate.matrix;
            z.fillStyle = C.drawingstate.linecolor;
            z.lineWidth = 1;
            z.lineCap = y.lineCap;
            z.lineJoin = y.lineJoin;
            z.miterLimit = y.miterLimit;
            for(var c = !1, d = -10; 10 > d; d += .01){
                L.setvar(b, l.real(d));
                var g = w(a1);
                if ("number" === g.ctype) {
                    var f = +g.value.real;
                    g = d * e.a - f * e.b + e.tx;
                    f = d * e.c - f * e.d - e.ty;
                    c ? z.lineTo(g, f) : (z.beginPath(), z.moveTo(g, f), c = !0);
                }
            }
            z.stroke();
            L.removevar(b);
            return h;
        };
        E.plotvars = function(a1) {
            function b(a1, b) {
                var e = {}, c;
                for(c = a1.length - 1; 0 <= c; --c)e[a1[c]] = a1[c];
                for(c = b.length - 1; 0 <= c; --c)e[b[c]] = b[c];
                a1 = [];
                for(var d in e)e.hasOwnProperty(d) && a1.push(e[d]);
                return a1;
            }
            function c(a1, b) {
                for(var e = 0; e < a1.length; e++)a1[e] === b && (a1.splice(e, 1), e--);
                return a1;
            }
            var d;
            if ("variable" === a1.ctype) return [
                a1.name
            ];
            if ("infix" === a1.ctype) {
                var g = E.plotvars(a1.args[0]);
                a1 = E.plotvars(a1.args[1]);
                return b(g, a1);
            }
            if ("list" === a1.ctype) {
                var f = a1.value;
                var h = [];
                for(d = 0; d < f.length; d++)g = E.plotvars(f[d]), h = b(h, g);
                return h;
            }
            if ("function" === a1.ctype) {
                f = a1.args;
                h = [];
                for(d = 0; d < f.length; d++)g = E.plotvars(f[d]), h = b(h, g);
                "apply" !== a1.oper && "select" !== a1.oper && "forall" !== a1.oper && "sum" !== a1.oper && "product" !== a1.oper && "repeat" !== a1.oper && "min" !== a1.oper && "max" !== a1.oper && "sort" !== a1.oper || "variable" !== a1.args[1].ctype || (h = c(h, a1.args[1].name));
                return h;
            }
            return [];
        };
        q.clrscr$0 = function(a1, b) {
            "undefined" !== typeof ma && "undefined" !== typeof pa && z.clearRect(0, 0, ma, pa);
            return h;
        };
        q.repaint$0 = function(a1, b) {
            k();
            return h;
        };
        q.screenbounds$0 = function(a1, b) {
            a1 = u.withUsage(g.realVector(C.to(0, 0)), "Point");
            b = u.withUsage(g.realVector(C.to(ra.clientWidth, 0)), "Point");
            var e = u.withUsage(g.realVector(C.to(ra.clientWidth, ra.clientHeight)), "Point"), c = u.withUsage(g.realVector(C.to(0, ra.clientHeight)), "Point");
            return g.turnIntoCSList([
                a1,
                b,
                e,
                c
            ]);
        };
        q.createimage$3 = function(a1, b) {
            b = w(a1[0]);
            var e = D(a1[1]);
            a1 = D(a1[2]);
            if ("number" !== e.ctype || "number" !== a1.ctype || "string" !== b.ctype) return h;
            var c = document.createElement("canvas");
            c.id = b.value;
            c.width = e.value.real;
            c.height = a1.value.real;
            c.style.display = "none";
            document.body.appendChild(c);
            gb[b.value] = G(c, !1);
            return h;
        };
        q.clearimage$1 = function(a1, b) {
            a1 = w(a1[0]);
            if ("string" !== a1.ctype && "image" !== a1.ctype) return h;
            a1 = Ya(a1);
            if (!a1) return h;
            b = a1.img;
            if ("undefined" === typeof b || null === b) return h;
            var e = a1.width, c = a1.height;
            b.getContext("2d").clearRect(0, 0, e, c);
            a1.generation++;
            return h;
        };
        q.canvas$4 = function(a1, b) {
            var e = D(a1[0]), c = D(a1[1]);
            b = w(a1[2]);
            a1 = a1[3];
            var d = E.extractPoint(e), g = E.extractPoint(c);
            if (!d.ok || !g.ok || "string" !== b.ctype && "image" !== b.ctype) return h;
            b = Ya(b);
            if (!b || !b.img.getContext) return h;
            c = b.img;
            var f = b.width;
            e = b.height;
            var k = g.x - d.x, l = g.y - d.y, m = d.x - l * e / f, n = d.y + k * e / f;
            l = g.x - l * e / f;
            k = g.y + k * e / f;
            g = C.from(d.x, d.y, 1);
            m = C.from(m, n, 1);
            l = C.from(l, k, 1);
            d = g[0] * wa;
            n = g[1] * wa;
            k = m[0] * wa;
            var p = m[1] * wa, q = l[0] * wa, r = l[1] * wa;
            m = f * (n - p) / ((d - k) * (n - r) - (d - q) * (n - p));
            f = f * (d - k) / ((n - p) * (d - q) - (n - r) * (d - k));
            l = -m * d - f * n;
            g = (e * (n - r) - e * (n - p)) / ((d - k) * (n - r) - (d - q) * (n - p));
            k = (e * (d - q) - e * (d - k)) / ((n - p) * (d - q) - (n - r) * (d - k));
            e = e - g * d - k * n;
            c = c.getContext("2d");
            d = z;
            z = c;
            z.save();
            z.transform(m, g, f, k, l, e);
            b.generation++;
            w(a1);
            z.restore();
            z = d;
        };
        q.canvas$5 = function(a1, b) {
            var e = D(a1[0]), c = D(a1[1]), d = D(a1[2]);
            b = w(a1[3]);
            a1 = a1[4];
            e = E.extractPoint(e);
            var g = E.extractPoint(c), f = E.extractPoint(d);
            if (!e.ok || !g.ok || !f.ok || "string" !== b.ctype && "image" !== b.ctype) return h;
            b = Ya(b);
            if (!b || !b.img.getContext) return h;
            d = b.img;
            var k = b.width;
            c = b.height;
            var l = C.from(e.x, e.y, 1), m = C.from(g.x, g.y, 1);
            g = C.from(f.x, f.y, 1);
            e = l[0] * wa;
            f = l[1] * wa;
            var n = m[0] * wa, p = m[1] * wa, q = g[0] * wa, r = g[1] * wa;
            g = ((0 - k) * (f - r) - 0 * (f - p)) / ((e - n) * (f - r) - (e - q) * (f - p));
            k = ((0 - k) * (e - q) - 0 * (e - n)) / ((f - p) * (e - q) - (f - r) * (e - n));
            m = -(g * e) - k * f;
            l = ((c - c) * (f - r) - (c - 0) * (f - p)) / ((e - n) * (f - r) - (e - q) * (f - p));
            n = ((c - c) * (e - q) - (c - 0) * (e - n)) / ((f - p) * (e - q) - (f - r) * (e - n));
            c = c - l * e - n * f;
            d = d.getContext("2d");
            e = z;
            z = d;
            z.save();
            z.transform(g, l, k, n, m, c);
            b.generation++;
            w(a1);
            z.restore();
            z = e;
        };
        q.screenresolution$0 = function(a1, b) {
            return l.real(C.drawingstate.matrix.a);
        };
        q.layer$1 = function(a1, b) {};
        q.imagesize$1 = function(a1, b) {
            return (a1 = Ya(D(a1[0]))) ? g.realVector([
                +a1.width,
                +a1.height
            ]) : h;
        };
        q.imageready$1 = function(a1, b) {
            a1 = Ya(D(a1[0]));
            return u.bool(!(!a1 || !a1.ready));
        };
        q.drawimage$2 = function(a1, b) {
            function e() {
                var a1 = 1, e = 1, c = 1, x = 1, k = 0, v = 1, l = E.extractPoint(d);
                if (!l.ok) return h;
                f = Ya(f);
                if (!f) return h;
                z.save();
                if (void 0 !== b.angle) {
                    var m = w(b.angle);
                    "number" === m.ctype && (k = m.value.real);
                }
                void 0 !== b.rotation && (m = w(b.rotation), "number" === m.ctype && (k = m.value.real));
                void 0 !== b.scale && (m = D(b.scale), "number" === m.ctype && (e = a1 = m.value.real), g.isNumberVector(m).value && 2 === m.value.length && (a1 = m.value[0].value.real, e = m.value[1].value.real));
                void 0 !== b.scalex && (m = w(b.scalex), "number" === m.ctype && (a1 = m.value.real));
                void 0 !== b.scaley && (m = w(b.scaley), "number" === m.ctype && (e = m.value.real));
                void 0 !== b.flipx && (m = w(b.flipx), "boolean" === m.ctype && m.value && (c = -1));
                void 0 !== b.flipy && (m = w(b.flipy), "boolean" === m.ctype && m.value && (x = -1));
                void 0 !== b.alpha && (m = w(b.alpha), "number" === m.ctype && (v = m.value.real));
                z.imageSmoothingEnabled = !0;
                void 0 !== b.interpolate && (m = w(b.interpolate), "boolean" === m.ctype && (z.imageSmoothingEnabled = m.value));
                var n = C.drawingstate.matrix, N = C.drawingstate.initialmatrix, p = f.width, Y = f.height;
                m = l.x * n.a - l.y * n.b + n.tx;
                var q = l.x * n.c - l.y * n.d - n.ty, r = (l.x + 1) * n.a - l.y * n.b + n.tx - m;
                n = (l.x + 1) * n.c - l.y * n.d - n.ty - q;
                var ka = (l.x + 1) * N.a - l.y * N.b + N.tx - (l.x * N.a - l.y * N.b + N.tx);
                N = (l.x + 1) * N.c - l.y * N.d - N.ty - (l.x * N.c - l.y * N.d - N.ty);
                l = Math.sqrt(r * r + n * n) / Math.sqrt(ka * ka + N * N);
                r = -Math.atan2(r, n) + Math.atan2(ka, N);
                n = C.drawingstate.matrix.sdet / 72;
                a1 *= n;
                e *= n;
                1 !== v && (z.globalAlpha = v);
                z.translate(m, q);
                z.scale(a1 * c * l, e * x * l);
                z.rotate(k + r);
                z.translate(-m, -q);
                z.translate(-p / 2, -Y / 2);
                a1 = f;
                a1.drawTo ? a1.drawTo(z, m, q) : z.drawImage(a1.img, m, q);
                z.globalAlpha = 1;
                z.restore();
            }
            function c() {
                var a1 = 1, e = 1, c = 1, g = 1, x = E.extractPoint(d), v = E.extractPoint(k);
                if (!x.ok || !v.ok) return h;
                f = Ya(f);
                if (!f) return h;
                var m = f.width, n = f.height;
                if (0 === l) {
                    var N = {};
                    N.x = x.x - (v.y - x.y);
                    N.y = x.y + (v.x - x.x);
                    g = n / m;
                } else if (N = E.extractPoint(l), !x.ok) return h;
                z.save();
                if (void 0 !== b.alpha) {
                    var p = w(b.alpha);
                    "number" === p.ctype && (a1 = p.value.real);
                }
                void 0 !== b.aspect && (p = w(b.aspect), "number" === p.ctype && (g = p.value.real));
                void 0 !== b.flipx && (p = w(b.flipx), "boolean" === p.ctype && p.value && (e = -1));
                void 0 !== b.flipy && (p = w(b.flipy), "boolean" === p.ctype && p.value && (c = -1));
                z.imageSmoothingEnabled = !0;
                void 0 !== b.interpolate && (p = w(b.interpolate), "boolean" === p.ctype && (z.imageSmoothingEnabled = p.value));
                p = C.drawingstate.matrix;
                1 !== a1 && (z.globalAlpha = a1);
                a1 = x.x * p.a - x.y * p.b + p.tx;
                x = x.x * p.c - x.y * p.d - p.ty;
                z.transform(v.x * p.a - v.y * p.b + p.tx - a1, v.x * p.c - v.y * p.d - p.ty - x, N.x * p.a - N.y * p.b + p.tx - a1, N.x * p.c - N.y * p.d - p.ty - x, a1, x);
                z.scale(1 / m, -1 / n * g);
                z.translate(m / 2, -n / 2);
                z.scale(e, c);
                z.translate(-m / 2, n / 2);
                z.translate(0, -n);
                e = f;
                e.drawTo ? e.drawTo(z, 0, 0) : z.drawImage(e.img, 0, 0);
                z.globalAlpha = 1;
                z.restore();
            }
            if (2 === a1.length) {
                var d = D(a1[0]);
                var f = D(a1[1]);
                return e();
            }
            if (3 === a1.length) {
                d = D(a1[0]);
                var k = D(a1[1]);
                var l = 0;
                f = D(a1[2]);
                return c();
            }
            return 4 === a1.length ? (d = D(a1[0]), k = D(a1[1]), l = D(a1[2]), f = D(a1[3]), c()) : h;
        };
        q.drawimage$3 = q.drawimage$2;
        q.drawimage$4 = q.drawimage$2;
        q.allimages$0 = function() {
            var a1 = [];
            Object.keys(gb).forEach(function(b) {
                a1.push({
                    ctype: "string",
                    value: b
                });
            });
            return g.turnIntoCSList(a1);
        };
        var yd = {};
        q.cameravideo$0 = function(a1, b) {
            function e(a1) {
                return {
                    video: {
                        width: a1,
                        advanced: [
                            {
                                width: {
                                    max: a1,
                                    min: a1
                                }
                            },
                            {
                                width: {
                                    ideal: a1
                                }
                            }
                        ]
                    },
                    audio: !1
                };
            }
            a1 = !0;
            var c = {};
            void 0 !== b.resolution && (b = w(b.resolution), "string" === b.ctype && "maximal" === b.value ? a1 = !0 : "number" === b.ctype ? (a1 = !1, c = e(b.value.real)) : g._helper.isNumberVecN(b, 2) && (a1 = !1, c = e(b.value[0].value.real), b = b.value[1].value.real, 10 > b || !Number.isInteger(b) ? (c.video.aspectRatio = b, c.video.advanced[0].aspectRatio = {
                min: b,
                max: b
            }, c.video.advanced[1].aspectRatio = {
                ideal: b
            }) : (c.video.height = b, c.video.advanced[0].height = {
                min: b,
                max: b
            }, c.video.advanced[1].height = {
                ideal: b
            })));
            a1 && (c = [
                320,
                640,
                1024,
                1280,
                1920,
                2560
            ], c = c.map(function(a1) {
                return {
                    width: {
                        min: a1
                    }
                };
            }), c = {
                video: {
                    width: 16E3,
                    height: 9E3,
                    advanced: c
                },
                audio: !1
            });
            a1 = JSON.stringify(c);
            if (yd[a1]) return yd[a1];
            b = null;
            var d = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
            d ? b = function(a1, b) {
                navigator.mediaDevices.getUserMedia(c).then(a1, b);
            } : (d = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) && (b = function(a1, b) {
                d.call(navigator, c, a1, b);
            });
            if (!b) return console.warn("getUserMedia call not supported"), yd[a1] = h;
            var f = document.createElement("video");
            f.autoplay = !0;
            yd[a1] = G(f, !0);
            console.log("Opening stream.");
            b(function(a1) {
                f.srcObject = a1;
                f.setAttribute("autoplay", "");
                f.setAttribute("muted", "");
                f.setAttribute("playsinline", "");
                f.play();
                f.addEventListener("loadeddata", F);
            }, function(a1) {
                console.error("Could not get user video:", String(a1), a1);
            });
            return yd[a1];
        };
        q.playvideo$1 = function(a1, b) {
            a1 = Ya(D(a1[0]));
            a1.live && a1.img.play && a1.img.play();
            return h;
        };
        q.pausevideo$1 = function(a1, b) {
            a1 = Ya(D(a1[0]));
            a1.live && a1.img.pause && a1.img.pause();
            return h;
        };
        var xd;
        q.imagergba$3 = function(a1, b) {
            b = Ya(D(a1[0]));
            var e = D(a1[1]);
            a1 = D(a1[2]);
            if (!b || "number" !== e.ctype || "number" !== a1.ctype || !b.ready) return h;
            e = Math.round(e.value.real);
            a1 = Math.round(a1.value.real);
            if (!$a(e) || !$a(a1)) return h;
            a1 = Jb(b, e, a1, 1, 1);
            return g.realVector([
                255 * a1[0],
                255 * a1[1],
                255 * a1[2],
                a1[3]
            ]);
        };
        q.imagergb$3 = q.imagergba$3;
        q.imagergba$4 = function(a1, b) {
            var e = Ya(D(a1[2]));
            if (!e || !e.ready) return h;
            var c = e.width, d = e.height, f = Q(a1[0]), k = Q(a1[1]), l = Q(g.realVector([
                0,
                d,
                1
            ]));
            c = Q(g.realVector([
                c,
                d,
                1
            ]));
            if (f === h || k === h || m === h) return h;
            m = g.ii;
            d = g.jj;
            l = E.basismap(l, c, m, d);
            f = E.basismap(f, k, d, m);
            var m = Q(a1[3]);
            d = E.extractPoint(u.mult(l, u.mult(g.adjoint3(f), m)));
            if (d.ok) {
                if (a1 = e.width, f = e.height, k = !0, l = !1, void 0 !== b.interpolate && (m = w(b.interpolate), "boolean" === m.ctype && (k = m.value)), void 0 !== b.repeat && (m = w(b.repeat), "boolean" === m.ctype && (l = m.value)), k && (d.x -= .5, d.y -= .5), l && (d.x = (d.x % a1 + a1) % a1, d.y = (d.y % f + f) % f), m = Math.floor(d.x), c = Math.floor(d.y), $a(m) && $a(c)) {
                    b = [
                        0,
                        0,
                        0,
                        0
                    ];
                    if (k) {
                        k = d.x - m;
                        d = d.y - c;
                        var n = Jb(e, m, c, 2, 2);
                        if (l) {
                            if (m === a1 - 1 || c === f - 1) {
                                l = Jb(e, (m + 1) % a1, c, 1, 1);
                                var p = Jb(e, m, (c + 1) % f, 1, 1);
                                e = Jb(e, (m + 1) % a1, (c + 1) % f, 1, 1);
                                n = n.slice(0, 4).concat(l, p, e);
                            }
                        } else {
                            if (-1 === m || m === a1 - 1) k = Math.round(k);
                            if (-1 === c || c === f - 1) d = Math.round(d);
                        }
                        for(e = 0; 4 > e; e++)b[e] = (1 - d) * ((1 - k) * n[e] + k * n[e + 4]) + d * ((1 - k) * n[e + 8] + k * n[e + 12]);
                    } else b = Jb(e, m, c, 1, 1);
                    e = g.realVector(b);
                } else e = h;
            } else e = h;
            return e;
        };
        q.imagergb$4 = function(a1, b) {
            a1 = q.imagergba$4(a1, b);
            return a1 === h ? h : g.turnIntoCSList(a1.value.slice(0, 3));
        };
        q.readpixels$1 = function(a1, b) {
            a1 = Ya(D(a1[0]));
            a1 = Jb(a1, 0, 0, a1.width, a1.height);
            b = [];
            for(var e = 0; e + 3 < a1.length; e += 4)b.push(g.turnIntoCSList([
                l.real(a1[e + 0]),
                l.real(a1[e + 1]),
                l.real(a1[e + 2]),
                l.real(a1[e + 3])
            ]));
            return g.turnIntoCSList(b);
        };
        "use strict";
        var Ve = [
            {
                key: [
                    ":"
                ],
                field: [
                    "."
                ],
                deg: [
                    "\xb0"
                ],
                take: [
                    "_"
                ]
            },
            {
                functionCall: !0
            },
            {
                rassoc: !0,
                pow: [
                    "^"
                ],
                sqrt: [
                    "√"
                ]
            },
            {
                mul: [
                    "*",
                    "⁢",
                    "⋅",
                    "\xb7"
                ],
                cross: [
                    "\xd7"
                ],
                div: [
                    "/",
                    "\xf7",
                    "∕",
                    "∶"
                ]
            },
            {
                add: [
                    "+"
                ],
                sub: [
                    "-",
                    "−"
                ],
                neg: [
                    "!",
                    "\xac"
                ]
            },
            {
                seq: [
                    ".."
                ]
            },
            {
                eq: [
                    "==",
                    "≟"
                ],
                ne: [
                    "!=",
                    "<>",
                    "≠"
                ],
                lt: [
                    "<"
                ],
                gt: [
                    ">"
                ],
                le: [
                    "<=",
                    "≤",
                    "≦"
                ],
                ge: [
                    ">=",
                    "≥",
                    "≧"
                ],
                aeq: [
                    "~=",
                    "≈"
                ],
                ane: [
                    "~!=",
                    "≉"
                ],
                alt: [
                    "~<",
                    "⪉"
                ],
                agt: [
                    "~>",
                    "⪊"
                ],
                ale: [
                    "~<=",
                    "⪅"
                ],
                age: [
                    "~>=",
                    "⪆"
                ],
                "in": [
                    "∈"
                ],
                nin: [
                    "∉"
                ]
            },
            {
                and: [
                    "&",
                    "∧"
                ],
                or: [
                    "%",
                    "∨"
                ]
            },
            {
                rassoc: !0,
                prepend: [
                    "<:"
                ]
            },
            {
                concat: [
                    "++",
                    "∪"
                ],
                remove: [
                    "--",
                    "∖"
                ],
                common: [
                    "~~",
                    "∩"
                ],
                append: [
                    ":>"
                ]
            },
            {
                rassoc: !0,
                assign: [
                    "="
                ],
                define: [
                    ":="
                ],
                undefine: [
                    ":=_"
                ],
                bdefine: [
                    "::="
                ]
            },
            {
                seq: [
                    ";"
                ]
            },
            {
                modif: [
                    "->",
                    "→"
                ]
            },
            {
                rassoc: !0,
                list: [
                    ","
                ]
            }
        ], Ue = [
            "+",
            "-"
        ], Qe = [
            "!",
            "√"
        ], Re = [
            "\xb0",
            ":=_"
        ], Se = [
            ";",
            ","
        ], ue = [], Ua = {}, Xc;
        (function() {
            var a1 = 0;
            Ve.forEach(function(b) {
                a1 += 2;
                var e = !!b.rassoc;
                b.functionCall && (Xc = a1);
                for(var c in b){
                    var d = b[c];
                    if ("boolean" !== typeof d) for(var g = {
                        name: c,
                        sym: d[0],
                        symbols: d,
                        rassoc: e,
                        precedence: a1,
                        prefix: !1,
                        postfix: !1,
                        infix: !0,
                        bare: !1
                    }, f = 0; f < d.length; ++f){
                        var h = d[f];
                        if (Ua.hasOwnProperty(h)) throw Error("Duplicate operator: " + h);
                        Ua[h] = g;
                        ue.push(h);
                    }
                }
            });
            Ue.forEach(function(a1) {
                Ua[a1].prefix = !0;
            });
            Qe.forEach(function(a1) {
                Ua[a1].prefix = !0;
                Ua[a1].infix = !1;
            });
            Re.forEach(function(a1) {
                Ua[a1].postfix = !0;
                Ua[a1].infix = !1;
            });
            Se.forEach(function(a1) {
                Ua[a1].prefix = !0;
                Ua[a1].postfix = !0;
                Ua[a1].infix = !0;
                Ua[a1].bare = !0;
            });
        })();
        ue.sort(function(a1, b) {
            return b.length - a1.length;
        });
        var Te = "(?:[⁺⁻] )?[⁰\xb9\xb2\xb3⁴⁵⁶⁷⁸⁹](?: [⁰\xb9\xb2\xb3⁴⁵⁶⁷⁸⁹])*".replace(/ /g, "[ 	]*"), xe = "(?:[₊₋] )?[₀₁₂₃₄₅₆₇₈₉](?: [₀₁₂₃₄₅₆₇₈₉])*".replace(/ /g, "[ 	]*"), Ac = function(a1, b, c) {
            var e, d = 0, g = "(?:[", f = b.length;
            for(e = 0; e < f; ++e){
                var h = b.charCodeAt(e);
                55296 <= h ? (g += "]|" + b.charAt(e) + "[", d = 56320) : (g += String.fromCharCode(h = d = a1[h - 32] + d), d += a1[b.charCodeAt(++e) - 32], d !== h && (d !== h + 1 && (g += "-"), g += String.fromCharCode(d)));
            }
            return g + "]|[" + c + "][\udc00-\udfff])";
        }([
            2,
            0,
            106,
            3,
            4,
            1,
            6,
            5,
            7,
            11,
            17,
            8,
            12,
            21,
            9,
            22,
            30,
            10,
            15,
            24,
            25,
            16,
            13,
            42,
            46,
            14,
            18,
            19,
            29,
            37,
            27,
            28,
            35,
            26,
            32,
            36,
            40,
            43,
            47,
            53,
            20,
            48,
            50,
            56,
            33,
            34,
            39,
            51,
            52,
            55,
            63,
            64,
            65,
            68,
            85,
            23,
            31,
            38,
            45,
            49,
            105,
            59,
            66,
            69,
            72,
            88,
            102,
            114,
            117,
            128,
            157,
            191,
            41,
            44,
            54,
            60,
            67,
            70,
            71,
            73,
            74,
            75,
            76,
            80,
            81,
            82,
            83,
            84,
            86,
            87,
            89,
            93,
            94,
            98,
            99,
            107,
            108,
            116,
            122,
            130,
            132,
            134,
            138,
            160,
            165,
            185,
            195,
            196,
            255,
            268,
            277,
            310,
            332,
            339,
            362,
            365,
            390,
            449,
            457,
            470,
            512,
            513,
            541,
            568,
            582,
            619,
            673,
            726,
            768,
            820,
            921,
            991,
            1164,
            2684,
            6581,
            8453,
            11171,
            20949
        ], "T4(4I!)!'!&/ 0 \x96')2$+! !\x83$ %## !(!   ! ; u \x86.\x88 =#!+YoA& 87C% } !5%+%) #!*! <0a,!4B1%'!&-'!1!$!33`HsG$!;!+.52'(#%#- & !$#$!*!9%  2%H''%#- & % % %B# !H *+   - & % $$!;!5%3!,(#%#- & % $$!X%  5!:! '$  #$% ! %$%$ $)W!G(   / 2$!> &%C(   / . $$!L! %5%;(   D#!*!* 4'&*$W + !#&]F %6&]% !#% !#!(# &   ! !#% # %1!#$ !/#L!S( @?$\x817-!*''#$!$%+ ',6!:= !&!#7 \x90 ##& ! ##D ##B ##& ! ##9 K ##^Y2*V#'$\x9d#5 4&p((+, #2*2*2,  5OC!'!Uy.D !&_)0J<#$,E'4Q/1Pv!|8:&K<9%)E>@7 )@\x80# #$%1gT\x8e#'#=#'#( ! ! ! 0#P & !$  &$##'',&  &d!9!*,b!'!#. !$$(! ! ! # 1##&$'!G%\xa58 8 \x84(#$%6= !&!#Q+!*/1& & & & & & & &t!\x97%E$&%'V(  z #&D${:Aj2\x99\xa6q\xa9E\xa4UZ#\x8d$2)%-8*0#_J+#b#M#(S1   # /0O2[R'$! !6>)/A?+8<!*$ .)$ D3  (-/$!$[ !$%#$#! !4 #1+ 6'#'#'1& & 7 .)c0\xa86/'I\xa7\x93#\\N&6$&! . , $ ! % % \x7fM\x92;R#Gh)d$ \x85=4(4,a$'#'#'# \ud800!) 4 : % 9#6@\x82\x94?$IIX*5 ((=)<#@'(\ud801!f~N.Of\x8f1-)(\ud802!'#! E %$!#/)/10^: %)-)4nQ(%T!5#   AZ?$?C( >?G)-):9*\ud803!`KJ9J\ud804#PriL3>@7M$!6F2#/! !C* 3V& ! # 9 .+8N(#%#- & % $$!;!6$\ud805eF-% !\x8987#=F-!k7x4\ud806\x87RB!\x95K\ud808!\xa2\ud809e\x8a\ud80d!8\ud811!\x9c\ud81a!\x9b+0c<;F*#BH&:\ud81b\xa0U,!l,\ud82c!%\ud82f!\"&,$++.\ud835!w m %#!#%## ) ! & S ##( & > # $ !$& \x91#3 3 0 3 0 3 0 3 0 3 (\ud83a!\x8b\ud83b\x98# A % !#! . # ! !(!'! ! !   % !#! ! ! ! ! % !## & # # ! . 5&  $ 5\ud869!\x9f7\x8c\ud86d!\xa1,g\ud86e!<#\xa3\ud873!\x9e\ud87e!\x9a", "\ud80c\ud840-\ud868\ud86a-\ud86c\ud86f-\ud872"), fe = ("#(?: [1-9])?|(?:'|" + Ac + ")(?: (?:[0-9']|" + Ac + "))*").replace(/ /g, "[ 	]*"), Ke = [
            "([ 	\n\r]+)|(//.*)|(/\\*)",
            "(" + ("(?:[0-9](?: [0-9])*(?: \\.(?! \\.)(?:(?! " + fe + ")|(?= (?: [Ee](?: [+-])?(?: [0-9])+)))(?: [0-9])*)?|\\.(?: [0-9])+)(?: [Ee](?: [+-])?(?: [0-9])+)?").replace(/ /g, "[ 	]*") + ")",
            "(" + ue.map(jd).join("|") + ")",
            "(" + "[](){}||".split("").map(jd).join("|") + ")",
            "(" + xe + ")",
            "(" + Te + ")",
            "(" + fe + ")",
            '("[^"]*")|($)'
        ].join("|"), We = new RegExp("[ 	]*".replace(/\*$/, "+"), "g"), ye = "ANY WS COMMENT START_COMMENT NUM OP BRA SUB SUP ID STR EOF".split(" ");
        (function() {
            var a1 = new RegExp(Ke, "g").exec("");
            if (a1.hasOwnProperty(ye.length)) throw Error("RE has more groups than expected");
            if (!a1.hasOwnProperty(ye.length - 1)) throw Error("RE has fewer groups than expected");
        })();
        $b.prototype.advanceBy = function(a1) {
            this.advanceTo(this.pos + a1);
        };
        $b.prototype.advanceTo = function(a1) {
            for(this.pos = a1; this.bols[0] <= a1;)this.bol = this.bols.shift(), this.line++;
        };
        $b.prototype.curPos = function() {
            return {
                row: this.line,
                col: this.pos - this.bol,
                pos: this.pos
            };
        };
        $b.prototype.nextInternal = function() {
            var a1 = this.re.exec(this.input);
            if (a1.index !== this.pos) throw xa("Invalid token", this.curPos(), this.input.substring(this.pos, a1.index));
            var b = this.curPos();
            this.advanceBy(a1[0].length);
            var c = this.curPos(), d;
            for(d = 1; null == a1[d]; ++d);
            return {
                start: b,
                end: c,
                raw: a1[0],
                text: a1[0].replace(We, ""),
                toktype: ye[d]
            };
        };
        $b.prototype.next = function() {
            do {
                var a1 = this.nextInternal();
                if ("START_COMMENT" === a1.toktype) {
                    var b = /\*\/|\/\*/g;
                    b.lastIndex = a1.start.pos + 2;
                    for(var c = 1, d; 0 < c;)if (d = b.exec(this.input)) "/*" === d[0] ? ++c : --c;
                    else throw xa("Unterminated comment", a1.start, a1.text);
                    this.re.lastIndex = b.lastIndex;
                    this.advanceTo(b.lastIndex);
                    a1.end = this.curPos();
                    a1.raw = this.input.substring(a1.start.pos, a1.end.pos);
                    a1.text = a1.raw;
                    a1.toktype = "COMMENT";
                }
            }while ("WS" === a1.toktype || "COMMENT" === a1.toktype);
            return a1;
        };
        var zd = {
            ctype: "void"
        };
        sc.prototype.postprocess = function(a1) {
            if (null === a1) return zd;
            if (a1) {
                if ("infix" === a1.ctype) {
                    if (":=" === a1.oper) {
                        var b = a1.args[0];
                        if ("function" === b.ctype) b.args.forEach(function(b) {
                            if (null === b || "variable" !== b.ctype) throw xa("Function argument must be an identifier", b.start || a1.start);
                        });
                        else if ("variable" !== b.ctype) throw xa(a1.oper + " can only be used to define functions or variables", a1.start);
                    } else if ("," === a1.oper) throw xa("comma may only be used to delimit list elements", a1.start);
                }
                a1.args && (a1.args = a1.args.map(this.postprocess, this));
                if (a1.modifs) for(var c in a1.modifs)a1.modifs[c] = this.postprocess(a1.modifs[c]);
                if ("paren" === a1.ctype) return a1.args[0];
                if ("infix" === a1.ctype) {
                    if ("." === a1.oper) {
                        if (!a1.args[1] || "variable" !== a1.args[1].ctype) throw xa("Field name must be identifier", a1.start, a1.text);
                        a1.ctype = "field";
                        a1.obj = a1.args[0];
                        a1.key = a1.args[1].name;
                        delete a1.args;
                    }
                    if (":" === a1.oper) {
                        if (a1.jsonatom) {
                            if (!a1.args[1]) throw xa("JSON: Value undefined", a1.start, a1.text);
                            a1.ctype = "jsonatom";
                            a1.key = a1.args[0];
                            a1.value = a1.args[1];
                            delete a1.jsonatom;
                        } else {
                            if (!a1.args[1]) throw xa("UserData: Key undefined", a1.start, a1.text);
                            a1.ctype = "userdata";
                            a1.obj = a1.args[0];
                            a1.key = a1.args[1];
                        }
                        delete a1.args;
                    }
                    this.infixmap && (a1.impl = this.infixmap[a1.oper]);
                } else "variable" === a1.ctype ? this.usedVariables[a1.name] = !0 : "function" === a1.ctype && (this.usedFunctions[a1.oper] = !0);
            }
            if ("infix" === a1.ctype) return {
                ctype: "infix",
                oper: String(a1.oper),
                args: [
                    a1.args[0],
                    a1.args[1]
                ],
                impl: a1.impl
            };
            if ("variable" === a1.ctype) return {
                ctype: "variable",
                name: String(a1.name)
            };
            if ("number" === a1.ctype) return {
                ctype: "number",
                value: {
                    real: +a1.value.real,
                    imag: +a1.value.imag
                }
            };
            if ("string" === a1.ctype) return {
                ctype: "string",
                value: String(a1.value)
            };
            if ("list" === a1.ctype) return {
                ctype: "list",
                value: a1.value
            };
            if ("function" === a1.ctype) return {
                ctype: "function",
                oper: String(a1.oper),
                args: a1.args,
                modifs: a1.modifs
            };
            if ("field" === a1.ctype) return {
                ctype: "field",
                obj: a1.obj,
                key: String(a1.key)
            };
            if ("userdata" === a1.ctype) return {
                ctype: "userdata",
                obj: a1.obj,
                key: a1.key
            };
            if ("jsonatom" === a1.ctype) return {
                ctype: "jsonatom",
                key: a1.key,
                value: a1.value
            };
            throw Error("Unsupported AST node of type " + a1.ctype);
        };
        sc.prototype.parse = function(a1) {
            try {
                var b = ld(new $b(a1));
                if ("EOF" !== b.closedBy.toktype) throw xa("Closing bracket never opened.", b.closedBy.start, b.closedBy.text);
                return this.postprocess(b.expr);
            } catch (x) {
                return x.ctype = "error", x;
            }
        };
        "undefined" !== typeof process && "undefined" !== typeof module && "undefined" !== typeof module.exports && "undefined" === typeof window && (module.exports.Parser = sc, module.exports.Tokenizer = $b, module.exports.unicodeLetters = Ac, module.exports.parse = function(a1) {
            return (new sc).parse(a1);
        });
        var Sb = {}, Ed = [], M = {
            lines: {},
            audioCtx: null,
            getAudioContext: function() {
                if (this.audioCtx) return this.audioCtx;
                window.AudioContext || window.webkitAudioContext ? this.audioCtx = new (window.AudioContext || window.webkitAudioContext) : console.warn("Web Audio API not supported in this browser");
                return this.audioCtx;
            },
            handleModif: function(a1, b, c) {
                if (void 0 !== a1) {
                    if (a1 = w(a1), a1.ctype === b) {
                        if ("number" === a1.ctype) return a1.value.real;
                        if ("list" === a1.ctype) {
                            b = a1.value;
                            a1 = [];
                            for(c = 0; c < b.length; c++)a1[c] = b[c].value.real;
                            return a1;
                        }
                        return a1.value;
                    }
                } else return c;
            },
            handleLineModif: function(a1, b) {
                return void 0 !== a1 ? (a1 = w(a1), da(a1)) : b;
            },
            getBufferNode: function(a1, b) {
                var e = this.getAudioContext();
                if (b * e.sampleRate > a1.length) {
                    for(var c = [], d = 0, g = 0; d < e.sampleRate * b; d++, g++)g > a1.length && (g = 0), c[d] = a1[g];
                    a1 = c;
                }
                b = new Float32Array(a1);
                a1 = e.createBuffer(1, b.length, e.sampleRate);
                a1.copyToChannel(b, 0);
                e = e.createBufferSource();
                e.buffer = a1;
                return e;
            },
            createMonoOscillator: function(a1, b) {
                var e = this.getAudioContext().createOscillator();
                if (0 !== b) {
                    var c = new Float32Array(2), d = new Float32Array(2);
                    c[1] = Math.sin(b);
                    d[1] = Math.cos(b);
                    b = this.getAudioContext().createPeriodicWave(c, d, {
                        disableNormalization: !0
                    });
                    e.setPeriodicWave(b);
                } else e.type = "sine";
                e.mono = !0;
                e.frequency.value = a1;
                return e;
            },
            createWaveOscillator: function(a1, b, c) {
                for(var e = this.getAudioContext().createOscillator(), d = new Float32Array(b.length + 1), g = new Float32Array(b.length + 1), f = 0; f < b.length; f++)g[f + 1] = b[f] * Math.cos(c[f]), d[f + 1] = b[f] * Math.sin(c[f]);
                b = this.getAudioContext().createPeriodicWave(d, g, {
                    disableNormalization: !0
                });
                e.setPeriodicWave(b);
                e.frequency.value = a1;
                return e;
            },
            cleanup: function() {
                for(var a1 in this.lines)if ("sin" === this.lines[a1].lineType) {
                    if (this.lines[a1].oscNodes.every(function(a1) {
                        return !a1.oscNode.isplaying;
                    })) delete this.lines[a1];
                    else for(var b = 0; b < this.lines[a1].oscNodes.length; b++)this.lines[a1].oscNodes[b] && !this.lines[a1].oscNodes[b].oscNode.isplaying && delete this.lines[a1].oscNodes[b];
                }
            },
            registerInput: function(a1) {
                a1.cnt ? a1.cnt++ : a1.cnt = 1;
            },
            deregisterInput: function(a1) {
                a1.cnt && a1.cnt--;
            },
            hasRegisteredInput: function(a1) {
                return a1.cnt && 0 !== a1.cnt;
            },
            playOscillator: function(a1, b, c, d, g, f) {
                var e = this.getAudioContext(), h = e.createGain();
                h.gain.value = 0;
                a1.connect(h);
                h.connect(b);
                M.registerInput(b);
                a1.start(0);
                a1.isplaying = !0;
                a1.onended = function() {
                    this.isplaying = !1;
                    h.disconnect();
                    M.deregisterInput(b);
                    M.hasRegisteredInput(b) || (b.disconnect(), b.panNode && b.panNode.disconnect());
                    M.cleanup();
                };
                h.gain.linearRampToValueAtTime(c, e.currentTime + d);
                0 <= g && (h.gain.setValueAtTime(c, e.currentTime + d + g), h.gain.linearRampToValueAtTime(0, e.currentTime + d + g + f), this.triggerStop(a1, g + d + f));
                return {
                    oscNode: a1,
                    gainNode: h
                };
            },
            softStop: function(a1, b) {
                var e = this.getAudioContext();
                a1.gainNode.gain.cancelScheduledValues(e.currentTime);
                a1.gainNode.gain.setValueAtTime(a1.gainNode.gain.value, e.currentTime);
                a1.gainNode.gain.linearRampToValueAtTime(0, e.currentTime + b);
                this.triggerStop(a1.oscNode, b);
            },
            extendDuration: function(a1, b, c) {
                var e = this.getAudioContext();
                a1.gainNode.gain.cancelScheduledValues(e.currentTime);
                a1.gainNode.gain.setValueAtTime(a1.gainNode.gain.value, e.currentTime);
                a1.gainNode.gain.setValueAtTime(a1.gainNode.gain.value, e.currentTime + b);
                a1.gainNode.gain.linearRampToValueAtTime(0, e.currentTime + b + c);
                this.triggerStop(a1.oscNode, b + c);
            },
            triggerStop: function(a1, b) {
                a1.timeoutId && clearTimeout(a1.timeoutId);
                a1.timeoutId = setTimeout(function() {
                    a1.stop(0);
                }, 1E3 * b + 10);
            }
        }, tb = function(a1) {
            this.audioCtx = a1;
            this.lineType = "sin";
            this.oscNodes = [];
        };
        tb.prototype.handleModif = function(a1, b, c, d) {
            if ("phaseshift" === b) d = this.handlePhaseshiftModif(a1.phaseshift, this.harmonics.length);
            else if (void 0 !== a1[b] && (a1 = w(a1[b]), a1.ctype === c)) {
                if ("number" === a1.ctype) d = a1.value.real;
                else if ("list" === a1.ctype) {
                    c = a1.value;
                    a1 = [];
                    for(d = 0; d < c.length; d++)a1[d] = c[d].value.real;
                    d = a1;
                } else d = a1.value;
            }
            return this[b] = d;
        };
        tb.prototype.handlePhaseshiftModif = function(a1, b) {
            this.phaseshift = Array(b).fill(0);
            if (void 0 !== a1) {
                if (a1 = w(a1), "list" === a1.ctype) for(b = a1.value, a1 = 0; a1 < b.length; a1++)this.phaseshift[a1] = b[a1].value.real;
                else if ("number" === a1.ctype) for(var e = 0; e < b; e++)this.phaseshift[e] = (e + 1) * a1.value.real;
            }
            return this.phaseshift;
        };
        tb.prototype.cleanparameters = function(a1) {
            this.partials.length < this.harmonics.length && (this.partials = Array(this.harmonics.length).fill(1), a1.partials && console.warn("Ignore partials because the given length does not match with the length of harmonics"));
            this.phaseshift.length < this.harmonics.length && (this.phaseshift = Array(this.harmonics.length).fill(0), a1.phaseshift && console.warn("Ignore phaseshift because the given length does not match with the length of harmonics"));
            this.precompute &= this.partials.every(function(a1) {
                return 1E-8 > Math.abs(a1 - 1);
            });
            0 < this.damp && (this.duration = Math.min(this.duration, 6 / this.damp));
        };
        tb.prototype.panit = function() {
            0 === this.pan || this.masterGain.panNode || (this.masterGain.disconnect(this.audioCtx.destination), this.masterGain.panNode = this.audioCtx.createStereoPanner(), this.masterGain.connect(this.masterGain.panNode), this.masterGain.panNode.connect(this.audioCtx.destination));
            this.masterGain.panNode && (this.masterGain.panNode.pan.value = this.pan);
        };
        tb.prototype.dampit = function() {
            this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
            this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
            0 < this.damp ? this.masterGain.gain.setTargetAtTime(0, this.audioCtx.currentTime + this.attack, 1 / this.damp) : 0 > this.damp && this.masterGain.gain.setTargetAtTime(1, this.audioCtx.currentTime + this.attack, -this.damp);
        };
        tb.prototype.startOscillators = function() {
            if (this.precompute) this.oscNodes[0] = M.playOscillator(M.createWaveOscillator(this.freq, this.harmonics, this.phaseshift), this.masterGain, 1, this.attack, this.duration, this.release);
            else for(var a1 = 0; a1 < this.harmonics.length; a1++)this.oscNodes[a1] = M.playOscillator(M.createMonoOscillator(this.partials[a1] * (a1 + 1) * this.freq, this.phaseshift[a1]), this.masterGain, this.harmonics[a1], this.attack, this.duration, this.release);
        };
        tb.prototype.stopOscillators = function() {
            for(var a1 in this.oscNodes)M.softStop(this.oscNodes[a1], this.release), delete this.oscNodes[a1];
        };
        tb.prototype.stop = function() {
            this.stopOscillators();
        };
        tb.prototype.updateFrequencyAndGain = function() {
            if (this.precompute) this.harmonicsdidnotchange() && this.oscNodes[0] && this.oscNodes[0].oscNode.isplaying && !this.oscNodes[0].oscNode.mono ? (this.oscNodes[0].oscNode.frequency.value = this.freq, M.extendDuration(this.oscNodes[0], this.duration, this.release)) : (this.stopOscillators(), this.startOscillators());
            else {
                for(var a1 = 0; a1 < this.harmonics.length; a1++)0 < this.harmonics[a1] && (this.oscNodes[a1] && this.oscNodes[a1].oscNode.isplaying && this.oscNodes[a1].oscNode.mono ? (this.oscNodes[a1].oscNode.frequency.value = this.partials[a1] * (a1 + 1) * this.freq, this.oscNodes[a1].gainNode.gain.value = this.harmonics[a1], M.extendDuration(this.oscNodes[a1], this.duration, this.release)) : (this.oscNodes[a1] && this.oscNodes[a1].oscNode.isplaying && !this.oscNodes[a1].oscNode.mono && M.softStop(this.oscNodes[a1], this.release), this.oscNodes[a1] = M.playOscillator(M.createMonoOscillator(this.partials[a1] * (a1 + 1) * this.freq, this.phaseshift[a1]), this.masterGain, this.harmonics[a1], this.attack, this.duration, this.release)));
                for(var b in this.oscNodes)this.harmonics[b] || (M.softStop(this.oscNodes[b], this.release), delete this.oscNodes[b]);
            }
        };
        tb.prototype.generateNewMasterGain = function(a1) {
            this.masterGain = this.audioCtx.createGain();
            this.masterGain.connect(this.audioCtx.destination);
            this.masterGain.gain.value = a1;
        };
        tb.prototype.harmonicsdidnotchange = function() {
            if (this.lastharmonics) {
                var a1 = 1 & this.lastharmonics.length === this.harmonics.length;
                for(var b in this.harmonics)a1 && (a1 &= this.harmonics[b] === this.lastharmonics[b]);
            } else a1 = !1;
            return a1;
        };
        tb.prototype.evokeplaysin = function(a1, b, c) {
            this.cleanparameters(c);
            if (0 === this.duration) return this.stop(), h;
            a1 || b && 0 !== this.damp ? (b && !a1 && this.stopOscillators(), this.generateNewMasterGain(this.amp), this.startOscillators()) : (this.masterGain || this.generateNewMasterGain(this.amp), this.updateFrequencyAndGain());
            this.panit();
            this.dampit();
            this.lastharmonics = this.harmonics;
        };
        q.stopsound$0 = function() {
            if (M.audioCtx) {
                for(var a1 in M.lines)M.lines[a1].stop(), delete M.lines[a1];
                M.audioCtx.close();
                M.audioCtx = null;
            }
        };
        q.playsin$1 = function(a1, b) {
            var e = M.getAudioContext(), c = M.handleLineModif(b.line, "0"), d = !1;
            M.lines[c] && "sin" === M.lines[c].lineType || (M.lines[c] && M.lines[c].stop(), M.lines[c] = new tb(e), d = !0);
            e = M.lines[c];
            e.freq = w(a1[0]).value.real;
            e.handleModif(b, "amp", "number", .5);
            e.handleModif(b, "damp", "number", 0);
            e.handleModif(b, "duration", "number", M.handleModif(b.stop, "number", 1));
            e.handleModif(b, "harmonics", "list", [
                1
            ]);
            e.handleModif(b, "partials", "list", [
                1
            ]);
            e.handleModif(b, "attack", "number", .01);
            e.handleModif(b, "release", "number", .01);
            e.handleModif(b, "pan", "number", 0);
            e.handleModif(b, "precompute", "boolean", !1);
            e.handleModif(b, "phaseshift", "phaseshift", Array(e.harmonics.length).fill(0));
            a1 = M.handleModif(b.restart, "boolean", !0);
            e.evokeplaysin(d, a1, b);
            return h;
        };
        q.playsin$0 = function(a1, b) {
            if (void 0 !== b.line && (a1 = M.handleLineModif(b.line, "0"), a1 = M.lines[a1])) {
                a1.handleModif(b, "freq", "number", a1.freq);
                a1.handleModif(b, "amp", "number", a1.amp);
                a1.handleModif(b, "damp", "number", a1.damp);
                a1.handleModif(b, "duration", "number", M.handleModif(b.stop, "number", a1.duration));
                a1.handleModif(b, "harmonics", "list", a1.harmonics);
                a1.handleModif(b, "partials", "list", a1.partials);
                a1.handleModif(b, "attack", "number", a1.attack);
                a1.handleModif(b, "release", "number", a1.release);
                a1.handleModif(b, "pan", "number", a1.pan);
                a1.handleModif(b, "precompute", "boolean", a1.precompute);
                a1.handleModif(b, "phaseshift", "phaseshift", a1.phaseshift);
                var e = M.handleModif(b.restart, "boolean", !1);
                a1.evokeplaysin(!1, e, b);
            }
            return h;
        };
        q.playfunction$1 = function(a1, b) {
            var e = M.getAudioContext(), c = a1[0];
            a1 = function(a1) {
                var b = [];
                for(b.push(a1); 0 !== b.length;){
                    a1 = b.pop();
                    if ("variable" === a1.ctype && w(a1) === h && -1 !== [
                        "x",
                        "y",
                        "t"
                    ].indexOf(a1.name)) return a1.name;
                    if (a1.args) for(var e in a1.args)b.push(a1.args[e]);
                }
                return h;
            }(c);
            a1 !== h && L.newvar(a1);
            var d = M.handleLineModif(b.line, "0"), g = M.handleModif(b.start, "number", 0), f = M.handleModif(b.amp, "number", .5), k = M.handleModif(b.damp, "number", 0);
            M.handleModif(b.stop, "number", 1);
            var m = M.handleModif(b.duration, "number", 1), n = M.handleModif(b.attack, "number", .01), p = M.handleModif(b.release, "number", .01), q = M.handleModif(b.export, "boolean", !1), r = M.handleModif(b.silent, "boolean", !1);
            b = [];
            for(var t = 0; t < e.sampleRate * m; t++){
                a1 !== h && L.setvar(a1, l.real(t / e.sampleRate));
                var u = w(c);
                b[t] = u.value.real * f * Math.exp(-k * t / e.sampleRate);
            }
            r || (M.lines[d] && "function" === M.lines[d].lineType ? (c = M.lines[d], c.masterGain.gain.linearRampToValueAtTime(0, e.currentTime + p), c.bufferNode.stop(e.currentTime + p), c.bufferNode = M.getBufferNode(b, m), c.bufferNode.connect(c.masterGain), c.bufferNode.start(g + p), c.masterGain.gain.linearRampToValueAtTime(f, e.currentTime + p + n)) : (M.lines[d] && M.lines[d].stop(), M.lines[d] = {
                lineType: "function",
                bufferNode: M.getBufferNode(b, m),
                masterGain: e.createGain(),
                stop: function() {
                    this.bufferNode.stop();
                }
            }, m = M.lines[d], m.masterGain.gain.value = 0, m.masterGain.connect(e.destination), m.bufferNode.connect(m.masterGain), m.bufferNode.start(g), m.masterGain.gain.linearRampToValueAtTime(f, e.currentTime + n)));
            a1 !== h && L.removevar(a1);
            return q ? b : h;
        };
        q.playwave$1 = function(a1, b) {
            var e = M.getAudioContext(), c = w(a1[0]), d = M.handleLineModif(b.line, "0");
            a1 = M.handleModif(b.amp, "number", .5);
            M.handleModif(b.damp, "number", 0);
            var g = M.handleModif(b.duration, "number", 1), f = M.handleModif(b.attack, "number", .01), k = M.handleModif(b.release, "number", .01);
            b = M.handleModif(b.start, "number", 0);
            if ("list" !== c.ctype) return h;
            M.lines[d] && "wave" === M.lines[d].lineType ? (d = M.lines[d], d.masterGain.gain.linearRampToValueAtTime(0, e.currentTime + k), d.bufferNode.stop(e.currentTime + k), d.bufferNode = M.getBufferNode(u.unwrap(c), g), d.bufferNode.connect(d.masterGain), d.bufferNode.start(b + k), d.masterGain.gain.linearRampToValueAtTime(a1, e.currentTime + k + f)) : (M.lines[d] && M.lines[d].stop(), M.lines[d] = {
                lineType: "wave",
                bufferNode: M.getBufferNode(u.unwrap(c), g),
                masterGain: e.createGain(),
                stop: function() {
                    this.bufferNode.stop();
                }
            }, c = M.lines[d], c.masterGain.gain.value = 0, c.masterGain.connect(e.destination), c.bufferNode.connect(c.masterGain), c.bufferNode.start(0), c.masterGain.gain.linearRampToValueAtTime(a1, e.currentTime + f));
            return h;
        };
        var aa = {
            printArr: function(a1) {
                for(var b = a1.value.length, c = [], d = [], g = !1, f = 0; f < b; f++)c[f] = a1.value[f].value.real, d[f] = a1.value[f].value.imag, 0 !== d[f] && (g = !0);
                console.log(c);
                g && console.log(d);
            },
            zero: function(a1) {
                for(var b = [], c = l.real(0), d = 0; d < a1.value.real; d++)b[d] = c;
                return g.turnIntoCSList(b);
            },
            number: function(a1, b) {
                b = aa.zero(b);
                b.value[0] = a1;
                return b;
            },
            variable: function(a1, b) {
                b = aa.zero(b);
                b.value[0] = a1;
                b.value[1] = l.real(1);
                return b;
            },
            add: function(a1, b) {
                return g.add(a1, b);
            },
            sub: function(a1, b) {
                return g.sub(a1, b);
            },
            mult: function(a1, b) {
                if (a1.value.length !== b.value.length) return console.error("dims don't fit return nada"), h;
                for(var e = a1.value.length, c = aa.zero(l.real(e)), d = l.real(0), g = 0; g < e; g++){
                    for(var f = 0; f <= g; f++)d = l.add(d, l.mult(a1.value[f], b.value[g - f]));
                    c.value[g] = d;
                    d = l.real(0);
                }
                return c;
            },
            pow: function(a1, b) {
                if (0 > b.value.real || b.value.real !== Math.floor(b.value.real)) return aa.root(a1, b);
                for(var e = a1, c = 1; c < b.value.real; c++)e = aa.mult(e, a1);
                return e;
            },
            root: function(a1, b) {
                var e = l.real(0), c = l.real(1), d = l.add(c, b), g = a1.value.length, f = aa.zero(l.real(g));
                f.value[0] = l.pow(a1.value[0], b);
                var h = e;
                for(b = 1; b < g; b++){
                    var k = l.real(b);
                    for(var m = 1; m <= b; m++){
                        var n = l.mult(d, l.real(m));
                        n = l.div(n, k);
                        n = l.sub(n, c);
                        n = l.mult(n, a1.value[m]);
                        n = l.mult(n, f.value[b - m]);
                        h = l.add(h, n);
                    }
                    h = l.div(h, a1.value[0]);
                    f.value[b] = h;
                    h = e;
                }
                return f;
            },
            findFirstNoneZero: function(a1, b, c) {
                for(var e = Infinity, d = Infinity, g = c; g < a1.value.length; g++)if (1E-12 < l.abs2(a1.value[g]).value.real) {
                    e = g;
                    break;
                }
                for(a1 = c; a1 < b.value.length; a1++)if (1E-12 < l.abs2(b.value[a1]).value.real) {
                    d = a1;
                    break;
                }
                return [
                    e,
                    d
                ];
            },
            div: function(a1, b) {
                if (a1.value.length !== b.value.length) return console.log("dims don't fit - return nada"), h;
                for(var e = a1.value.length, c = l.real(0), d = aa.zero(l.real(e)), g = c, f, k = 0; k < e; k++){
                    f = aa.findFirstNoneZero(a1, b, k);
                    k < f[0] && f[0] === f[1] && Infinity !== f[0] && (a1.value.splice(k, f[0]), b.value.splice(k, f[0]), d.value.splice(k, f[0]), e -= f[0]);
                    f = a1.value[k];
                    for(var m = 0; m < k; m++)g = l.add(g, l.mult(d.value[m], b.value[k - m]));
                    f = l.sub(f, g);
                    f = l.div(f, b.value[0]);
                    d.value[k] = f;
                    g = c;
                }
                return d;
            },
            exp: function(a1) {
                var b = l.real(0), c = a1.value.length, d = aa.zero(l.real(c)), g = b;
                d.value[0] = l.exp(a1.value[0]);
                for(var f = 1; f < c; f++){
                    for(var h = 1; h <= f; h++){
                        var k = l.mult(l.real(h), a1.value[h]);
                        k = l.mult(k, d.value[f - h]);
                        g = l.add(g, k);
                    }
                    d.value[f] = l.div(g, l.real(f));
                    g = b;
                }
                return d;
            },
            log: function(a1) {
                var b = l.real(0), c = a1.value.length, d = aa.zero(l.real(c));
                d.value[0] = l.log(a1.value[0]);
                for(var g = b, f, h, k = 1; k < c; k++){
                    f = a1.value[k];
                    for(var m = 1; m < k; m++)h = l.mult(l.real(m), d.value[m]), h = l.mult(h, a1.value[k - m]), g = l.add(g, h);
                    g = l.div(g, l.real(k));
                    f = l.sub(f, g);
                    f = l.div(f, a1.value[0]);
                    d.value[k] = f;
                    g = b;
                }
                return d;
            },
            sincos: function(a1) {
                var b = l.real(0), c = a1.value.length, d = aa.zero(l.real(c)), g = aa.zero(l.real(c));
                d.value[0] = l.sin(a1.value[0]);
                g.value[0] = l.cos(a1.value[0]);
                for(var f = b, h = b, k, m, n, p = 1; p < c; p++){
                    n = l.real(p);
                    for(var q = 1; q <= p; q++)m = l.mult(l.real(q), a1.value[q]), k = l.mult(m, g.value[p - q]), m = l.mult(m, d.value[p - q]), h = l.add(h, k), f = l.add(f, m);
                    h = l.div(h, n);
                    f = l.div(f, l.neg(n));
                    d.value[p] = h;
                    g.value[p] = f;
                    f = h = b;
                }
                aa.sinsave = d;
                aa.cossave = g;
                return [
                    d,
                    g
                ];
            },
            sin: function(a1) {
                return aa.sincos(a1)[0];
            },
            cos: function(a1) {
                return aa.sincos(a1)[1];
            },
            faculty: function(a1) {
                var b = [];
                b[0] = l.real(1);
                for(var c = 1, d = 1; d <= a1.value.real; d++)c *= d, b[d] = l.real(c);
                return b = g.turnIntoCSList(b);
            },
            diff: function(a1, b, c, d) {
                if ("variable" === a1.ctype) var e = a1.name !== b ? aa.number(w(a1), d) : aa.variable(c, d);
                else if ("number" === a1.ctype) e = aa.number(a1, d);
                else {
                    if ("infix" === a1.ctype) {
                        if ("*" === a1.oper) return aa.mult(aa.diff(a1.args[0], b, c, d), aa.diff(a1.args[1], b, c, d));
                        if ("^" === a1.oper) return aa.pow(aa.diff(a1.args[0], b, c, d), aa.diff(a1.args[1], b, c, d).value[0]);
                        if ("/" === a1.oper) return aa.div(aa.diff(a1.args[0], b, c, d), aa.diff(a1.args[1], b, c, d));
                        if ("+" === a1.oper) return aa.add(aa.diff(a1.args[0], b, c, d), aa.diff(a1.args[1], b, c, d));
                        if ("-" === a1.oper) return aa.sub(aa.diff(a1.args[0], b, c, d), aa.diff(a1.args[1], b, c, d));
                        console.log("infix not found", a1.oper);
                        return h;
                    }
                    if ("function" === a1.ctype) {
                        if ("exp$1" === a1.oper) return aa.exp(aa.diff(a1.args[0], b, c, d));
                        if ("log$1" === a1.oper) return aa.log(aa.diff(a1.args[0], b, c, d));
                        if ("sin$1" === a1.oper) return aa.sin(aa.diff(a1.args[0], b, c, d));
                        if ("cos$1" === a1.oper) return aa.cos(aa.diff(a1.args[0], b, c, d));
                    } else return console.log("ctype not found", a1.ctype), h;
                }
                return e;
            },
            adevaluate: function(a1, b, c, d) {
                a1 = aa.diff(a1, b, c, d);
                d = aa.faculty(d);
                for(b = 2; b < a1.value.length; b++)a1.value[b] = l.mult(a1.value[b], d.value[b]);
                return a1;
            },
            autodiff: function(a1, b, c, d) {
                for(var e = [], f = c.value.length, h, k = 0; k < f; k++)h = aa.adevaluate(a1, b, c.value[k], d), e[k] = h;
                return e = g.turnIntoCSList(e);
            }
        }, y = {
            handleModifs: function(a1, b) {
                y.dashing && y.unSetDash();
                y.colorraw = null;
                y.fillcolorraw = null;
                y.fillrule = "nonzero";
                y.size = null;
                0 >= y.psize && (y.psize = 0);
                0 >= y.lsize && (y.lsize = 0);
                y.overhang = 1;
                y.dashing = !1;
                y.isArrow = !1;
                y.arrowSides = "==>";
                y.arrowposition = 1;
                y.headlen = 10;
                y.arrowShape = y.arrowShapes.line;
                y.alpha = C.drawingstate.alpha;
                y.fillalpha = 0;
                y.bold = "";
                y.italics = "";
                y.family = "sans-serif";
                y.align = 0;
                y.angle = 0;
                y.xOffset = 0;
                y.yOffset = 0;
                y.lineCap = "round";
                y.lineJoin = "round";
                y.miterLimit = 10;
                y.noborder = !1;
                var e, c;
                for(e in a1){
                    var d = a1[e];
                    d && ((c = b[e]) ? (!0 === c && (c = y.modifHandlers[e]), c(w(d))) : console.log("Modifier not supported: " + e));
                }
                null !== y.size ? y.psize = y.lsize = y.size : (y.psize = C.drawingstate.pointsize, y.lsize = C.drawingstate.linesize);
                y.dashing && y.dashing(y.lsize);
                null !== y.colorraw ? y.pointColor = y.lineColor = y.textColor = y.makeColor(y.colorraw) : 1 === y.alpha ? (y.pointColor = C.drawingstate.pointcolor, y.lineColor = C.drawingstate.linecolor, y.textColor = C.drawingstate.textcolor) : (y.pointColor = y.makeColor(C.drawingstate.pointcolorraw), y.lineColor = y.makeColor(C.drawingstate.linecolorraw), y.textColor = y.makeColor(C.drawingstate.textcolorraw));
                y.black = 1 === y.alpha ? "rgb(0,0,0)" : "rgba(0,0,0," + y.alpha + ")";
                y.fillColor = y.fillcolorraw && 0 < y.fillalpha ? y.makeColor(y.fillcolorraw, y.fillalpha) : null;
            },
            modifHandlers: {
                size: function(a1) {
                    "number" === a1.ctype && (y.size = a1.value.real, 0 > y.size && (y.size = 0), 1E3 < y.size && (y.size = 1E3));
                },
                color: function(a1) {
                    g.isNumberVector(a1).value && 3 === a1.value.length && (y.colorraw = [
                        a1.value[0].value.real,
                        a1.value[1].value.real,
                        a1.value[2].value.real
                    ]);
                },
                fillcolor: function(a1) {
                    g.isNumberVector(a1).value && 3 === a1.value.length && (y.fillcolorraw = [
                        a1.value[0].value.real,
                        a1.value[1].value.real,
                        a1.value[2].value.real
                    ]);
                },
                alpha: function(a1) {
                    "number" === a1.ctype && (y.alpha = a1.value.real);
                },
                fillalpha: function(a1) {
                    "number" === a1.ctype && (y.fillalpha = a1.value.real);
                },
                dashpattern: function(a1) {
                    if ("list" === a1.ctype) {
                        for(var b = [], c = 0, d = 0; c < a1.value.length; c++)"number" === a1.value[c].ctype && (b[d++] = a1.value[c].value.real);
                        y.dashing = y.setDash.bind(null, b);
                    }
                },
                dashtype: function(a1) {
                    if ("number" === a1.ctype) a1 = Math.floor(a1.value.real);
                    else if ("string" === a1.ctype) a1 = a1.value;
                    else return;
                    if (a1 = y.dashTypes[a1]) y.dashing = y.setDash.bind(null, a1);
                },
                dashing: function(a1) {
                    "number" === a1.ctype && (a1 = Math.floor(a1.value.real), y.dashing = y.setDash.bind(null, [
                        2 * a1,
                        a1
                    ]));
                },
                overhang: function(a1) {
                    "number" === a1.ctype && (y.overhang = y.overhang * a1.value.real + (1 - y.overhang) * (1 - a1.value.real));
                },
                arrow: function(a1) {
                    "boolean" === a1.ctype ? y.isArrow = a1.value : console.error("arrow needs to be of type boolean");
                },
                arrowshape: function(a1) {
                    "string" !== a1.ctype ? console.error("arrowshape needs to be of type string") : y.arrowShapes.hasOwnProperty(a1.value) ? (y.arrowShape = y.arrowShapes[a1.value], y.isArrow = !0, y.arrowShape.deprecated && (console.log("arrowshape " + a1.value + " is deprecated, use " + y.arrowShape.deprecated + " instead."), y.arrowShape.deprecated = null)) : (a1 = Object.keys(y.arrowShapes), a1.sort(), a1 = a1.join(", "), console.error("arrowshape needs to be one of " + a1));
                },
                arrowsides: function(a1) {
                    "string" !== a1.ctype ? console.error("arrowsides is not of type string") : "==>" !== a1.value && "<==>" !== a1.value && "<==" !== a1.value ? console.error("arrowsides is unknows") : (y.arrowSides = a1.value, y.isArrow = !0);
                },
                arrowposition: function(a1) {
                    "number" !== a1.ctype ? console.error("arrowposition is not of type number") : 0 > a1.value.real ? console.error("arrowposition has to be positive") : 1 < a1.value.real ? y.overhang = y.overhang * a1.value.real + (1 - y.overhang) * (1 - a1.value.real) : (y.arrowposition = a1.value.real, y.isArrow = !0);
                },
                arrowsize: function(a1) {
                    "number" !== a1.ctype ? console.error("arrowsize is not of type number") : 0 > a1.value.real ? console.error("arrowsize has to be positive") : y.headlen *= a1.value.real;
                },
                bold: function(a1) {
                    "boolean" === a1.ctype && a1.value && (y.bold = "bold ");
                },
                italics: function(a1) {
                    "boolean" === a1.ctype && a1.value && (y.italics = "italic ");
                },
                family: function(a1) {
                    "string" === a1.ctype && (y.family = a1.value);
                },
                align: function(a1) {
                    "string" === a1.ctype && (a1 = a1.value, "left" === a1 && (y.align = 0), "right" === a1 && (y.align = 1), "mid" === a1 || "center" === a1) && (y.align = .5);
                },
                angle: function(a1) {
                    "number" === a1.ctype && (y.angle = a1.value.real);
                },
                x_offset: function(a1) {
                    "number" === a1.ctype && (y.xOffset = a1.value.real);
                },
                y_offset: function(a1) {
                    "number" === a1.ctype && (y.yOffset = a1.value.real);
                },
                offset: function(a1) {
                    "list" === a1.ctype && 2 === a1.value.length && "number" === a1.value[0].ctype && "number" === a1.value[1].ctype && (y.xOffset = a1.value[0].value.real, y.yOffset = a1.value[1].value.real);
                },
                lineCap: function(a1) {
                    "string" !== a1.ctype || "round" !== a1.value && "square" !== a1.value && "butt" !== a1.value || (y.lineCap = a1.value);
                },
                lineJoin: function(a1) {
                    "string" !== a1.ctype || "round" !== a1.value && "bevel" !== a1.value && "miter" !== a1.value || (y.lineJoin = a1.value);
                },
                fillrule: function(a1) {
                    "string" !== a1.ctype || "nonzero" !== a1.value && "evenodd" !== a1.value || (y.fillrule = a1.value);
                },
                miterLimit: function(a1) {
                    "number" === a1.ctype && 0 < a1.value.real && (y.miterLimit = Math.round(a1.value.real));
                },
                noborder: function(a1) {
                    "boolean" === a1.ctype ? y.noborder = a1.value : console.error("noborder needs to be of type boolean");
                },
                border: function(a1) {
                    "boolean" === a1.ctype ? y.noborder = !a1.value : console.error("border needs to be of type boolean");
                }
            },
            lineModifs: {
                size: !0,
                color: !0,
                alpha: !0,
                dashpattern: !0,
                dashtype: !0,
                dashing: !0,
                overhang: !0,
                arrow: !0,
                arrowshape: !0,
                arrowsides: !0,
                arrowposition: !0,
                arrowsize: !0,
                lineCap: !0,
                lineJoin: !0,
                miterLimit: !0
            },
            pointModifs: {
                size: !0,
                color: !0,
                alpha: !0,
                noborder: !0,
                border: !0
            }
        };
        y.pointAndLineModifs = y.lineModifs;
        y.conicModifs = {
            size: !0,
            color: !0,
            alpha: !0,
            dashing: !0,
            dashpattern: !0,
            dashtype: !0,
            fillcolor: !0,
            fillrule: !0,
            fillalpha: !0,
            lineCap: !0,
            lineJoin: !0,
            miterLimit: !0
        };
        y.textModifs = {
            size: !0,
            color: !0,
            alpha: !0,
            bold: !0,
            italics: !0,
            family: !0,
            align: !0,
            angle: !0,
            x_offset: !0,
            y_offset: !0,
            offset: !0
        };
        y.makeColor = function(a1, b) {
            void 0 === b && (b = y.alpha);
            return "rgba(" + Math.floor(255 * a1[0]) + "," + Math.floor(255 * a1[1]) + "," + Math.floor(255 * a1[2]) + "," + b + ")";
        };
        y.preDrawCurve = function() {
            z.lineWidth = y.lsize;
            z.lineCap = y.lineCap;
            z.lineJoin = y.lineJoin;
            z.mozFillRule = y.fillrule;
            z.fillrule = y.fillrule;
            z.miterLimit = y.miterLimit;
            z.strokeStyle = y.lineColor;
        };
        y.arrowShapes = {
            "default": {
                close: !1,
                fill: !1,
                ratio: 1,
                deprecated: "line"
            },
            line: {
                close: !1,
                fill: !1,
                ratio: 1
            },
            empty: {
                close: !0,
                fill: !1,
                ratio: 1
            },
            hollow: {
                close: !0,
                fill: !1,
                ratio: 1,
                deprecated: "empty"
            },
            full: {
                close: !0,
                fill: !0,
                ratio: 1
            },
            jet: {
                close: !0,
                fill: !0,
                ratio: 1.5
            },
            delta: {
                close: !0,
                fill: !0,
                ratio: 1.5,
                deprecated: "jet"
            }
        };
        y.clipSegment = function(a1, b) {
            var e = b.x - a1.x, c = b.y - a1.y, d = y.clipLineCore(-c, e, a1.x * b.y - b.x * a1.y);
            if (2 !== d.length) return [];
            var g = d[0];
            d = d[1];
            var f = 1 / (e * e + c * c), h = ((g.x - a1.x) * e + (g.y - a1.y) * c) * f;
            e = ((d.x - a1.x) * e + (d.y - a1.y) * c) * f;
            0 > h && (g = a1);
            1 < h && (g = b);
            0 > e && (d = a1);
            1 < e && (d = b);
            return g === d ? [] : [
                g,
                d
            ];
        };
        y.drawsegcore = function(a1, b) {
            function e(a1, b, e, c) {
                var d = a1 - c * m + .5 * n, g = b - c * n - .5 * m, f = a1 - c * m - .5 * n;
                c = b - c * n + .5 * m;
                z.beginPath();
                y.arrowShape.fill && (z.lineWidth = y.lsize / 2);
                z.moveTo(d, g);
                z.lineTo(a1, b);
                z.lineTo(f, c);
                y.arrowShape.close && (z.fillStyle = y.lineColor, z.lineTo(a1 - e * m, b - e * n), z.closePath(), y.arrowShape.fill && z.fill());
                z.stroke();
            }
            var c = C.drawingstate.matrix, d = a1.x * c.a - a1.y * c.b + c.tx, g = a1.x * c.c - a1.y * c.d - c.ty, f = b.x * c.a - b.y * c.b + c.tx, h = b.x * c.c - b.y * c.d - c.ty, k = y.overhang, l = 1 - k;
            b = k * d + l * f;
            c = k * g + l * h;
            a1 = k * f + l * d;
            k = k * h + l * g;
            if (0 > b || b > ma || 0 > c || c > pa || 0 > a1 || a1 > ma || 0 > k || k > pa) {
                k = y.clipSegment({
                    x: b,
                    y: c
                }, {
                    x: a1,
                    y: k
                });
                if (2 !== k.length || .01 > y.lsize) return;
                b = k[0].x;
                c = k[0].y;
                a1 = k[1].x;
                k = k[1].y;
            }
            y.preDrawCurve();
            if (!y.isArrow || d === g && f === h) .01 > y.lsize || (z.beginPath(), z.moveTo(b, c), z.lineTo(a1, k), z.stroke());
            else {
                d = f - d;
                g = h - g;
                f = y.headlen / Math.sqrt(d * d + g * g);
                var m = d * f, n = g * f;
                h = y.arrowposition;
                l = 1 - h;
                d = h * b + l * a1;
                g = h * c + l * k;
                f = h * a1 + l * b;
                h = h * k + l * c;
                l = y.arrowSides;
                z.beginPath();
                y.arrowShape.close ? ("<==>" === l || "<==" === l ? (1 > y.arrowposition && (z.moveTo(b, c), z.lineTo(d, g)), z.moveTo(d + m, g + n)) : z.moveTo(b, c), "==>" === l || "<==>" === l ? (z.lineTo(f - m, h - n), 1 > y.arrowposition && (z.moveTo(f, h), z.lineTo(a1, k))) : z.lineTo(a1, k)) : (z.moveTo(b, c), z.lineTo(a1, k));
                z.stroke();
                "==>" !== l && "<==>" !== l || e(f, h, 1, y.arrowShape.ratio);
                "<==" !== l && "<==>" !== l || e(d, g, -1, -y.arrowShape.ratio);
            }
        };
        y.drawpoint = function(a1) {
            var b = C.drawingstate.matrix, c = a1.x * b.a - a1.y * b.b + b.tx;
            a1 = a1.x * b.c - a1.y * b.d - b.ty;
            z.lineWidth = .3 * y.psize;
            z.beginPath();
            z.arc(c, a1, y.psize, 0, 2 * Math.PI);
            z.fillStyle = y.pointColor;
            z.fill();
            y.noborder || (z.beginPath(), z.arc(c, a1, 1.15 * y.psize, 0, 2 * Math.PI), z.fillStyle = y.black, z.strokeStyle = y.black, z.stroke());
        };
        y.clipLineCore = function(a1, b, c) {
            var e = Math.SQRT1_2 * y.lsize, d = 0 - e, g = ma + e, f = 0 - e;
            e = pa + e;
            var h = 0 > d * a1 + f * b + c, k = 0 > g * a1 + f * b + c, l = 0 > d * a1 + e * b + c, x = 0 > g * a1 + e * b + c, m = [];
            h !== k && m.push({
                x: (-c - b * f) / a1,
                y: f
            });
            k !== x && m.push({
                x: g,
                y: (-c - a1 * g) / b
            });
            l !== x && m.push({
                x: (-c - b * e) / a1,
                y: e
            });
            h !== l && m.push({
                x: d,
                y: (-c - a1 * d) / b
            });
            return m;
        };
        y.clipLine = function(a1) {
            a1 = g.normalizeMax(g.productVM(a1, C.toMat()));
            return y.clipLineCore(a1.value[0].value.real, a1.value[1].value.real, a1.value[2].value.real);
        };
        y.drawline = function(a1) {
            g._helper.isAlmostReal(a1) && (a1 = y.clipLine(a1), 2 === a1.length && .01 <= y.lsize && (y.preDrawCurve(), z.beginPath(), z.moveTo(a1[0].x, a1[0].y), z.lineTo(a1[1].x, a1[1].y), z.stroke()));
        };
        y.drawRaySegment = function(a1, b) {
            a1 = E.extractPoint(a1);
            b = E.extractPoint(b);
            if (a1.ok && b.ok) {
                var e = a1.x - b.x, c = a1.y - b.y, d = 25E3 / C.drawingstate.matrix.sdet / Math.sqrt(e * e + c * c);
                e *= d;
                c *= d;
                y.drawsegcore(a1, {
                    x: a1.x + e,
                    y: a1.y + c
                });
                y.drawsegcore(b, {
                    x: b.x - e,
                    y: b.y - c
                });
            }
        };
        y.dashTypes = {
            solid: [],
            dashed: [
                10,
                10
            ],
            tightdash: [
                10,
                4
            ],
            dotted: [
                1,
                3
            ],
            dashdot: [
                10,
                5,
                1,
                5
            ],
            "dashvalue.solid": [],
            "dashvalue.dashed": [
                10,
                10
            ],
            "dashvalue.tightdash": [
                10,
                4
            ],
            "dashvalue.dotted": [
                1,
                3
            ],
            "dashvalue.dashdot": [
                10,
                5,
                1,
                5
            ],
            0: [],
            1: [
                10,
                10
            ],
            2: [
                10,
                4
            ],
            3: [
                1,
                3
            ],
            4: [
                10,
                5,
                1,
                5
            ]
        };
        y.setDash = function(a1, b) {
            b = Math.sqrt(b);
            a1 = a1.slice();
            for(var e = 0; e < a1.length; e++)a1[e] *= b;
            z.webkitLineDash = a1;
            z.setLineDash(a1);
            z.mozDash = a1;
        };
        y.unSetDash = function() {
            z.webkitLineDash = [];
            z.setLineDash([]);
            z.mozDash = [];
        };
        Jd.prototype = {
            set fillStyle (a){
                var b1 = this;
                tc(a, function(a1, e, c, d) {
                    b1._fill = "#" + Lb(a1.toString(16), 2) + Lb(e.toString(16), 2) + Lb(c.toString(16), 2);
                    b1._fillOpacity = 255 === d ? null : d;
                });
            },
            set strokeStyle (a){
                var b2 = this;
                tc(a, function(a1, e, c, d) {
                    b2._stroke = "#" + Lb(a1.toString(16), 2) + Lb(e.toString(16), 2) + Lb(c.toString(16), 2);
                    b2._strokeOpacity = 255 === d ? null : d;
                });
            },
            clearRect: function() {},
            beginPath: function() {
                this._path = [];
            },
            _pathcmd: function() {
                this._path.push.apply(this._path, arguments);
            },
            closePath: function() {
                this._pathcmd("Z");
            },
            moveTo: function(a1, b) {
                this._pathcmd("M", a1, b);
            },
            lineTo: function(a1, b) {
                this._pathcmd("L", a1, b);
            },
            bezierCurveTo: function(a1, b, c, d, g, f) {
                this._pathcmd("C", a1, b, c, d, g, f);
            },
            quadraticCurveTo: function(a1, b, c, d) {
                this._pathcmd("Q", a1, b, c, d);
            },
            arc: function(a1, b, c, d, g, f) {
                var e = c * Math.cos(d) + a1, h = c * Math.sin(d) + b, k = c * Math.cos(g) + a1, l = c * Math.sin(g) + b;
                g = f ? d - g : g - d;
                g >= 2 * Math.PI ? this._pathcmd(this._path.length ? "L" : "M", e, h, "A", c, c, 0, 0, f ? 1 : 0, a1 - c * Math.cos(d), b - c * Math.sin(d), "A", c, c, 0, 0, f ? 1 : 0, e, h) : this._pathcmd(this._path.length ? "L" : "M", e, h, "A", c, c, 0, g > Math.PI ? 1 : 0, f ? 1 : 0, k, l);
            },
            rect: function(a1, b, c, d) {
                this._pathcmd("M", a1, b, "h", c, "v", d, "h", -c, "z");
            },
            _cmd: function(a1) {
                1 !== this.globalAlpha ? (this._body.push('<g opacity="' + this.globalAlpha + '">'), this._body.push(a1), this._body.push("</g>")) : this._body.push(a1);
            },
            _attrs: function(a1) {
                var b = "", c;
                for(c in a1)null !== a1[c] && (b += " " + c + '="' + a1[c] + '"');
                return b;
            },
            fill: function() {
                this._cmd("<path" + this._attrs({
                    d: this._path.join(" "),
                    fill: this._fill,
                    "fill-opacity": this._fillOpacity
                }) + "/>");
            },
            stroke: function() {
                this._cmd("<path" + this._attrs({
                    d: this._path.join(" "),
                    stroke: this._stroke,
                    "stroke-opacity": this._strokeOpacity,
                    "stroke-width": this.lineWidth,
                    "stroke-linecap": this.lineCap,
                    "stroke-linejoin": this.lineJoin,
                    "stroke-miterlimit": "miter" === this.lineJoin ? this.miterLimit : null
                }) + "/>");
            },
            clip: function() {
                ++this._clipIndex;
                this._body.push('<clipPath id="clip' + this._clipIndex + '"><path d="' + this._path.join(" ") + '"/></clipPath>', '<g clip-path="url(#clip' + this._clipIndex + ')">');
                this._saveStack[this._saveStack.length - 1] += "</g>";
            },
            save: function() {
                this._saveStack.push("");
            },
            restore: function() {
                this._body.push(this._saveStack.pop());
                0 === this._saveStack.length && this._saveStack.push("");
            },
            _transform: function(a1) {
                this._body.push('<g transform="' + a1 + '">');
                this._saveStack[this._saveStack.length - 1] += "</g>";
            },
            translate: function(a1, b) {
                this._transform("translate(" + a1 + " " + b + ")");
            },
            rotate: function(a1) {
                this._transform("rotate(" + Math.PI / 180 * a1 + ")");
            },
            scale: function(a1, b) {
                this._transform("scale(" + a1 + " " + b + ")");
            },
            transform: function(a1, b, c, d, g, f) {
                this._transform("matrix(" + [
                    a1,
                    b,
                    c,
                    d,
                    g,
                    f
                ].join(" ") + ")");
            },
            drawImage: function(a1, b, c) {
                if (3 !== arguments.length) throw Error("SvgWriterContext only supports 3-argument version of drawImage");
                var e = this._imgcache.indexOf(a1);
                if (-1 === e) {
                    e = this._imgcache.length;
                    var d = a1.cachedDataURL ? a1.cachedDataURL : Kd(a1);
                    this._defs.push('<image id="img' + e + '" x="0" y="0" width="' + a1.width + '" height="' + a1.height + '" xlink:href="' + d + '"/>');
                    this._imgcache.push(a1);
                }
                this._cmd('<use x="' + b + '" y="' + c + '" xlink:href="#img' + e + '"/>');
            },
            toBlob: function() {
                for(; 1 < this._saveStack.length || "" !== this._saveStack[0];)this.restore();
                var a1 = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="' + this.width + 'px" height="' + this.height + 'px">\n' + this._defs.join("\n") + '\n</defs>\n<g stroke="none" fill="none">\n' + this._body.join("\n") + "\n</g>\n</svg>\n";
                return new Blob([
                    a1
                ], {
                    type: "image/svg+xml"
                });
            }
        };
        Kb.prototype = {
            _cmd: function() {
                this._body.push(Array.prototype.join.call(arguments, " "));
            },
            _setAlpha: function(a1, b, c) {
                var e = Math.round(255 * a1 * this._globalAlpha);
                b += e;
                this._extGState[b] = "<< /" + c + " " + e / 255 + " >>";
                this._cmd("/" + b, "gs");
                return a1;
            },
            set globalAlpha (a){
                this._globalAlpha = a;
                this._setAlpha(this._strokeAlpha, "As", "CA");
                this._setAlpha(this._fillAlpha, "Af", "ca");
            },
            set fillStyle (a){
                var b3 = this;
                tc(a, function(a1, e, c, d) {
                    b3._cmd(a1 / 255, e / 255, c / 255, "rg");
                    b3._setAlpha(b3._fillAlpha = d, "Af", "ca");
                });
            },
            set strokeStyle (a){
                var b4 = this;
                tc(a, function(a1, e, c, d) {
                    b4._cmd(a1 / 255, e / 255, c / 255, "RG");
                    b4._setAlpha(b4._strokeAlpha = d, "As", "CA");
                });
            },
            set lineWidth (a){
                this._cmd(a, "w");
            },
            set lineCap (a){
                this._cmd({
                    butt: 0,
                    round: 1,
                    square: 2
                }[a], "J");
            },
            set lineJoin (a){
                this._cmd({
                    miter: 0,
                    round: 1,
                    bevel: 2
                }[a], "j");
            },
            set miterLimit (a){
                this._cmd(a, "M");
            },
            clearRect: function() {},
            beginPath: function() {
                this._pathUsed = !1;
            },
            closePath: function() {
                this._cmd("h");
            },
            moveTo: function(a1, b) {
                this._cmd(this._xPos = a1, this._yPos = -b, "m");
            },
            lineTo: function(a1, b) {
                this._cmd(this._xPos = a1, this._yPos = -b, "l");
            },
            bezierCurveTo: function(a1, b, c, d, g, f) {
                this._cmd(a1, -b, c, -d, this._xPos = g, this._yPos = -f, "c");
            },
            quadraticCurveTo: function(a1, b, c, d) {
                this.bezierCurveTo((2 * a1 + this._xPos) / 3, (2 * b - this._yPos) / 3, (c + 2 * a1) / 3, (d + 2 * b) / 3, c, d);
            },
            _kappa: .5522847498307935,
            arc: function(a1, b, c, d, g, f) {
                if (0 === d && g === 2 * Math.PI) d = this._kappa * c, this.moveTo(a1 + c, b), this.bezierCurveTo(a1 + c, b + d, a1 + d, b + c, a1, b + c), this.bezierCurveTo(a1 - d, b + c, a1 - c, b + d, a1 - c, b), this.bezierCurveTo(a1 - c, b - d, a1 - d, b - c, a1, b - c), this.bezierCurveTo(a1 + d, b - c, a1 + c, b - d, a1 + c, b);
                else throw Error("PdfWriterContext.arc only supports full circles");
            },
            rect: function(a1, b, c, d) {
                this._cmd(a1, -b, c, -d, "re");
            },
            _usePath: function(a1) {
                if (this._pathUsed) {
                    var b = this._body[this._pathUsed], c = {
                        "S + f": "B",
                        "f + S": "B",
                        "W n + S": "W S",
                        "W n + f": "W f",
                        "S + W n": "W S",
                        "f + W n": "W f",
                        "B + W n": "W B",
                        "W S + f": "W B",
                        "W f + S": "W B"
                    }[b + " + " + a1];
                    if (!c) throw Error("Don't know how to combine '" + b + "' and '" + a1 + "'");
                    this._body.splice(this._pathUsed, 1);
                    a1 = c;
                }
                this._pathUsed = this._body.length;
                this._cmd(a1);
            },
            fill: function() {
                this._usePath("f");
            },
            stroke: function() {
                this._usePath("S");
            },
            clip: function() {
                this._usePath("W n");
            },
            save: function() {
                this._cmd("q");
            },
            restore: function() {
                this._cmd("Q");
            },
            translate: function(a1, b) {
                this.transform(1, 0, 0, 1, a1, b);
            },
            rotate: function(a1) {
                var b = Math.cos(a1);
                a1 = Math.sin(a1);
                this.transform(b, a1, -a1, b, 0, 0);
            },
            scale: function(a1, b) {
                this.transform(a1, 0, 0, b, 0, 0);
            },
            transform: function(a1, b, c, d, g, f) {
                this._cmd(a1, -b, -c, d, g, -f, "cm");
            },
            _png: function(a1) {
                if ("data:image/png;base64," !== a1.substr(0, 22)) return {
                    error: "Not a base64-encoded PNG file"
                };
                a1 = me(a1.substr(22));
                var b = ne(a1);
                console.log("PNG chunks:", b.map(function(a1) {
                    return a1.type;
                }));
                if ("IHDR" !== b[0].type) throw Error("Image does not start with an IHDR");
                var c = b[0].data;
                a1 = (c[0] << 24 | c[1] << 16 | c[2] << 8 | c[3]) >>> 0;
                var d = (c[4] << 24 | c[5] << 16 | c[6] << 8 | c[7]) >>> 0, g = c[8], f = c[9], h = 0 === (f & 2), k = 0 !== (f & 4), l = c[10], m = c[11];
                c = c[12];
                if (0 !== l) throw Error("Unsupported PNG compression method: " + l);
                if (0 !== m) throw Error("Unsupported PNG filter method: " + m);
                if (0 !== c) return {
                    error: "Interlaced image not supported"
                };
                if (0 !== (f & 1)) return {
                    error: "Indexed PNG image not supported"
                };
                m = null;
                f = h ? 1 : 3;
                l = b.filter(function(a1) {
                    return "IDAT" === a1.type;
                }).map(function(a1) {
                    return a1.data;
                });
                if (k) {
                    k = window.pako;
                    m = new k.Inflate;
                    for(b = 0; b < l.length; ++b)m.push(l[b], b + 1 === l.length);
                    if (m.err) throw Error(m.err);
                    m = m.result;
                    c = g >>> 3;
                    if (m.length !== d * (a1 * (f + 1) * c + 1)) throw Error("Data length mismatch");
                    var n = f * c;
                    l = new Uint8Array(d * (a1 * n + 1));
                    for(var p = new Uint8Array(d * (a1 * c + 1)), q = 0, r = 0, t = 0, u = 0; u < d; ++u){
                        l[r++] = p[t++] = m[q++];
                        for(var w = 0; w < a1; ++w){
                            for(b = 0; b < n; ++b)l[r++] = m[q++];
                            for(b = 0; b < c; ++b)p[t++] = m[q++];
                        }
                    }
                    if (q !== m.length || r !== l.length || t !== p.length) throw Error("Seems we garbled our index computation somehow");
                    p = k.deflate(p);
                    m = this._strm({
                        Type: "/XObject",
                        Subtype: "/Image",
                        Width: a1,
                        Height: d,
                        ColorSpace: "/DeviceGray",
                        BitsPerComponent: g,
                        Filter: "/FlateDecode",
                        DecodeParms: this._dict({
                            Predictor: 15,
                            Colors: 1,
                            BitsPerComponent: g,
                            Columns: a1
                        })
                    }, p).ref;
                    l = [
                        k.deflate(l)
                    ];
                }
                var y = 0;
                l.forEach(function(a1) {
                    y += a1.length;
                });
                return this._obj([
                    this._dict({
                        Type: "/XObject",
                        Subtype: "/Image",
                        Name: "/img" + this._imgcache.length,
                        Width: a1,
                        Height: d,
                        ColorSpace: h ? "/DeviceGray" : "/DeviceRGB",
                        SMask: m,
                        BitsPerComponent: g,
                        Length: y,
                        Filter: "/FlateDecode",
                        DecodeParms: this._dict({
                            Predictor: 15,
                            Colors: f,
                            BitsPerComponent: g,
                            Columns: a1
                        })
                    }),
                    "\nstream\n"
                ].concat(l, [
                    "\nendstream"
                ]));
            },
            drawImage: function(a1, b, c) {
                if (3 !== arguments.length) throw Error("PdfWriterContext only supports 3-argument version of drawImage");
                var e = this._imgcache.indexOf(a1);
                if (-1 === e) {
                    e = this._imgcache.length;
                    this._imgcache.push(a1);
                    var d = this._png(a1.cachedDataURL || "");
                    d.hasOwnProperty("error") && (d = this._png(Kd(a1)));
                    if (d.hasOwnProperty("error")) throw Error(d.error);
                    this._xobjects["img" + e] = d.ref;
                }
                this._cmd("q");
                this._setAlpha(1, "Af", "ca");
                this._cmd(a1.width, 0, 0, a1.height, b, -c - a1.height, "cm");
                this._cmd("/img" + e, "Do");
                this._cmd("Q");
            },
            _dict: function(a1) {
                var b = "<<", c;
                for(c in a1)b += " /" + c + " " + a1[c];
                return b + " >>";
            },
            _obj: function(a1, b) {
                b || (b = this._nextIndex++);
                Array.isArray(a1) || (a1 = [
                    this._dict(a1)
                ]);
                a1.index = b;
                a1.ref = b + " 0 R";
                a1.offset = this._offset;
                var e = 0;
                a1.unshift(b + " 0 obj\n");
                a1.push("\nendobj\n");
                for(b = 0; b < a1.length; ++b)e += a1[b].length;
                this._offset += e;
                this._objects.push(a1);
                return a1;
            },
            _strm: function(a1, b, c) {
                a1.Length = b.length;
                return this._obj([
                    this._dict(a1),
                    "\nstream\n",
                    b,
                    "\nendstream"
                ], c);
            },
            toBlob: function() {
                var a1 = "[" + [
                    0,
                    -this.height,
                    this.width,
                    0
                ].join(" ") + "]";
                this._obj({
                    Type: "/Catalog",
                    Pages: "2 0 R"
                }, 1);
                this._obj({
                    Type: "/Pages",
                    Kids: "[3 0 R]",
                    Count: 1
                }, 2);
                this._obj({
                    Type: "/Page",
                    Parent: "2 0 R",
                    MediaBox: a1,
                    Contents: "4 0 R",
                    Resources: this._dict({
                        ProcSet: "[/PDF /Text /ImageB /ImageC /ImageI]",
                        XObject: this._dict(this._xobjects),
                        ExtGState: this._dict(this._extGState)
                    })
                }, 3);
                var b = this._body.join("\n"), c = new Uint8Array(b.length);
                for(a1 = 0; a1 < b.length; ++a1)c[a1] = b.charCodeAt(a1) & 255;
                b = window.pako.deflate(c);
                this._strm({
                    Filter: "/FlateDecode"
                }, b, 4);
                b = this._objects;
                var d = [];
                for(a1 = 1; a1 < b.length; ++a1)d[b[a1].index] = b[a1];
                c = "xref\n0 " + d.length + "\n";
                for(a1 = 0; a1 < d.length; ++a1)c = d[a1] ? c + (Lb(String(d[a1].offset), 10) + " 00000 n \n") : c + "0000000000 65535 f \n";
                a1 = "trailer\n" + this._dict({
                    Size: d.length,
                    Root: "1 0 R"
                }) + "\nstartxref\n" + this._offset + "\n%%EOF\n";
                b = Array.prototype.concat.apply([], b);
                b.push(c, a1);
                return new Blob(b, {
                    type: "application/pdf"
                });
            }
        };
        var Fd = null;
        Db.push(Mb);
        La.exportSVG = function() {
            Mc(Jd);
        };
        La.exportPDF = function() {
            Ia.loadScript("pako", "pako.min.js", function() {
                Mc(Kb);
            });
        };
        La.exportPNG = function() {
            Me(z.canvas.toDataURL());
        };
        var Me = function(a1) {
            var b = document.createElement("a");
            document.body.appendChild(b);
            b.style = "display: none";
            b.href = a1;
            b.download = "CindyJSExport";
            b.click();
            setTimeout(function() {
                document.body.removeChild(b);
                Mb();
            }, 100);
        }, De = "Move", Gd, ib = [], Vb = 0, Ye = 0, dd = 0, H = {
            Delete: {}
        };
        H.Delete.actions = [];
        H.Delete.actions[0] = {};
        H.Delete.actions[0].event = "mousedown";
        H.Delete.actions[0].tooltip = "...";
        H.Delete.actions[0].do = function() {
            ya = Nb(ja);
            null !== ya && Rc(ya.mover.name);
            return !0;
        };
        H.Move = {};
        H.Move.actions = [];
        H.Move.actions[0] = {};
        H.Move.actions[0].event = "mousedown";
        H.Move.actions[0].tooltip = "Move free elements by dragging the mouse";
        H.Move.actions[0].do = function() {
            for(var a1 = ja, b = null, c = 1E6, d, f = 0; f < r.free.length; f++){
                var h = r.free[f];
                if (!h.pinned && !1 !== h.visible && !0 !== h.tmp) {
                    var k = C.drawingstate.matrix.sdet;
                    if ("P" === h.kind) {
                        var m = g.normalizeZ(h.homog);
                        if (!g._helper.isAlmostReal(m)) continue;
                        var n = m.value[0].value.real - a1.x;
                        m = m.value[1].value.real - a1.y;
                        var p = Math.sqrt(n * n + m * m);
                        if (h.narrow && p > ("number" === typeof h.narrow ? h.narrow : 20) / k) continue;
                    } else if ("C" === h.kind) {
                        m = g.normalizeZ(r.csnames[h.args[0]].homog);
                        n = h.radius;
                        if (!g._helper.isAlmostReal(m) || !l._helper.isAlmostReal(n)) continue;
                        p = m.value[0].value.real;
                        var q = m.value[1].value.real;
                        m = a1.x - p;
                        var t = a1.y - q, u = Math.sqrt(m * m + t * t);
                        if (0 === u) continue;
                        q += t / u * n.value.real;
                        n = p + m / u * n.value.real - a1.x;
                        m = q - a1.y;
                        p = Math.sqrt(n * n + m * m);
                        p += 30 / k;
                        if (h.narrow && p > (("number" === typeof h.narrow ? h.narrow : 20) + 30) / k) continue;
                    } else if ("L" === h.kind) n = h.homog, p = l, m = p.add(p.mult(n.value[0], p.conjugate(n.value[0])), p.mult(n.value[1], p.conjugate(n.value[1]))), m = g.scaldiv(p.sqrt(m), n), p = m.value[0].value.real * a1.x + m.value[1].value.real * a1.y + m.value[2].value.real, n = -m.value[0].value.real * p, m = -m.value[1].value.real * p, 0 > p && (p = -p), p += 25 / k;
                    else if ("Text" === h.kind) {
                        if (!h.homog || h.dock || !h._bbox) continue;
                        m = C.from(a1.x, a1.y, 1);
                        n = Math.max(0, m[0] - h._bbox.right, h._bbox.left - m[0]);
                        m = Math.max(0, m[1] - h._bbox.bottom, h._bbox.top - m[1]);
                        p = Math.sqrt(n * n + m * m);
                        if (20 < p) continue;
                        p /= k;
                        m = g.normalizeZ(h.homog);
                        if (!g._helper.isAlmostReal(m)) continue;
                        n = m.value[0].value.real - a1.x;
                        m = m.value[1].value.real - a1.y;
                    } else continue;
                    p < c + .2 / k && (c = p, b = h, d = {
                        x: n,
                        y: m
                    });
                }
            }
            console.log("Moving " + (b ? b.name : "nothing"));
            ya = null === b ? null : {
                mover: b,
                offset: d,
                prev: {
                    x: a1.x,
                    y: a1.y
                }
            };
            return !0;
        };
        H.Point = {};
        H.Point.actions = [];
        H.Point.actions[0] = {};
        H.Point.actions[0].event = "mousedown";
        H.Point.actions[0].tooltip = "Add a single point with the mouse";
        H.Point.actions[0].do = function() {
            Za({
                type: "Free",
                name: Pa(),
                labeled: !0,
                pos: [
                    Ma[0],
                    Ma[1],
                    1
                ]
            });
            return !0;
        };
        H.Mid = {};
        H.Mid.actions = [];
        H.Mid.actions[0] = {};
        H.Mid.actions[0].event = "mousedown";
        H.Mid.actions[0].tooltip = "Construct two points and their midpoint by dragging";
        H.Mid.actions[0].do = function() {
            ac();
            return !0;
        };
        H.Mid.actions[1] = {};
        H.Mid.actions[1].event = "mousemove";
        H.Mid.actions[1].do = function() {
            Qc("Mid");
            return !0;
        };
        H.Mid.actions[2] = {};
        H.Mid.actions[2].event = "mouseup";
        H.Mid.actions[2].do = function() {
            ec();
            return !0;
        };
        H.Circle = {};
        H.Circle.actions = [];
        H.Circle.actions[0] = {};
        H.Circle.actions[0].event = "mousedown";
        H.Circle.actions[0].tooltip = "Construct two points and a circle by dragging the mouse";
        H.Circle.actions[0].do = function() {
            ac();
            return !0;
        };
        H.Circle.actions[1] = {};
        H.Circle.actions[1].event = "mousemove";
        H.Circle.actions[1].do = function() {
            Qc("CircleMP");
            return !0;
        };
        H.Circle.actions[2] = {};
        H.Circle.actions[2].event = "mouseup";
        H.Circle.actions[2].do = function() {
            ec();
            return !0;
        };
        H.Compass = {};
        H.Compass.actions = [];
        H.Compass.actions[0] = {};
        H.Compass.actions[0].event = "mousedown";
        H.Compass.actions[0].tooltip = "...";
        H.Compass.actions[0].do = function() {
            ac();
            return !0;
        };
        H.Compass.actions[1] = {};
        H.Compass.actions[1].event = "mousedown";
        H.Compass.actions[1].tooltip = "...";
        H.Compass.actions[1].do = function() {
            ac();
            return !0;
        };
        H.Compass.actions[2] = {};
        H.Compass.actions[2].event = "mousedown";
        H.Compass.actions[2].tooltip = "...";
        H.Compass.actions[2].do = function() {
            ac();
            Za({
                type: "Compass",
                name: Pa(),
                labeled: !0,
                args: [
                    ib[0].name,
                    ib[1].name,
                    ib[2].name
                ]
            });
            return !0;
        };
        H.Line = {};
        H.Line.actions = [];
        H.Line.actions[0] = {};
        H.Line.actions[0].event = "mousedown";
        H.Line.actions[0].tooltip = "Construct two points and their connecting line by dragging the mouse";
        H.Line.actions[0].do = function() {
            ac();
            return !0;
        };
        H.Line.actions[1] = {};
        H.Line.actions[1].event = "mousemove";
        H.Line.actions[1].do = function() {
            Qc("Join");
            return !0;
        };
        H.Line.actions[2] = {};
        H.Line.actions[2].event = "mouseup";
        H.Line.actions[2].do = function() {
            ec();
            return !0;
        };
        H.Segment = {};
        H.Segment.actions = [];
        H.Segment.actions[0] = {};
        H.Segment.actions[0].event = "mousedown";
        H.Segment.actions[0].tooltip = "Draw a segment by dragging the mouse";
        H.Segment.actions[0].do = function() {
            ac();
            return !0;
        };
        H.Segment.actions[1] = {};
        H.Segment.actions[1].event = "mousemove";
        H.Segment.actions[1].do = function() {
            Qc("Segment");
            return !0;
        };
        H.Segment.actions[2] = {};
        H.Segment.actions[2].event = "mouseup";
        H.Segment.actions[2].do = function() {
            ec();
            return !0;
        };
        H.Parallel = {};
        H.Parallel.actions = [];
        H.Parallel.actions[0] = {};
        H.Parallel.actions[0].event = "mousedown";
        H.Parallel.actions[0].tooltip = "Construct a parallel line by dragging a line";
        H.Parallel.actions[0].do = function() {
            return Pb();
        };
        H.Parallel.actions[1] = {};
        H.Parallel.actions[1].event = "mousemove";
        H.Parallel.actions[1].do = function() {
            var a1 = {
                type: "Free",
                name: Pa(),
                labeled: !0,
                pos: [
                    Ma[0],
                    Ma[1],
                    1
                ],
                tmp: !0
            };
            a1 = Za(a1);
            Gd = Za({
                type: "Para",
                name: Pa(),
                labeled: !0,
                args: [
                    ib[0].name,
                    a1.name
                ]
            });
            Pc(a1);
            return !0;
        };
        H.Parallel.actions[2] = {};
        H.Parallel.actions[2].event = "mouseup";
        H.Parallel.actions[2].do = function() {
            ec();
            return !0;
        };
        H.Orthogonal = {};
        H.Orthogonal.actions = [];
        H.Orthogonal.actions[0] = {};
        H.Orthogonal.actions[0].event = "mousedown";
        H.Orthogonal.actions[0].tooltip = "Construct a orthogonal line by dragging a line";
        H.Orthogonal.actions[0].do = function() {
            if (Pb()) {
                var a1 = {
                    type: "Free",
                    name: Pa(),
                    labeled: !0,
                    pos: [
                        Ma[0],
                        Ma[1],
                        1
                    ],
                    tmp: !0
                };
                a1 = Za(a1);
                Gd = Za({
                    type: "Perp",
                    name: Pa(),
                    labeled: !0,
                    args: [
                        ib[0].name,
                        a1.name
                    ]
                });
                Pc(a1);
                return !0;
            }
            return !1;
        };
        H.Orthogonal.actions[1] = {};
        H.Orthogonal.actions[1].event = "mouseup";
        H.Orthogonal.actions[1].do = function() {
            ec();
            return !0;
        };
        H.Intersection = {};
        H.Intersection.actions = [];
        H.Intersection.actions[0] = {};
        H.Intersection.actions[0].event = "mousedown";
        H.Intersection.actions[0].tooltip = "Select two elements to define their intersection";
        H.Intersection.actions[0].do = function() {
            return Od();
        };
        H.Intersection.actions[1] = {};
        H.Intersection.actions[1].event = "mousedown";
        H.Intersection.actions[1].do = function() {
            return Od() ? (Gd = Za({
                type: "Meet",
                name: Pa(),
                labeled: !0,
                args: [
                    ib[0].name,
                    ib[1].name
                ]
            }), !0) : !1;
        };
        var Fa = function(a1) {
            a1 ? (this._e = [], this._e[0] = a1[0][0], this._e[1] = a1[1][0], this._e[2] = a1[2][0], this._e[3] = a1[0][1], this._e[4] = a1[1][1], this._e[5] = a1[2][1], this._e[6] = a1[0][2], this._e[7] = a1[1][2], this._e[8] = a1[2][2]) : this._e = [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ];
        };
        Fa.prototype.clone = function() {
            var a1 = [].concat($jscomp.arrayFromIterable(this._e)), b = new Fa;
            b.set(a1);
            return b;
        };
        Fa.prototype.get = function(a1) {
            return this._e[a1];
        };
        Fa.prototype.getRow = function(a1) {
            var b = this._e;
            return [
                b[a1],
                b[3 + a1],
                b[6 + a1]
            ];
        };
        Fa.prototype.set = function(a1, b) {
            1 === arguments.length && (this._e = a1);
            2 === arguments.length && (this._e[a1] = b);
        };
        Fa.prototype.exchange = function(a1, b) {
            var e = $jscomp.makeIterator([
                this._e[b],
                this._e[a1]
            ]);
            this._e[a1] = e.next().value;
            this._e[b] = e.next().value;
        };
        Fa.prototype.inverse = function() {
            var a1 = this._e, b = -a1[2] * a1[4] * a1[6] + a1[1] * a1[5] * a1[6] + a1[2] * a1[3] * a1[7] - a1[0] * a1[5] * a1[7] - a1[1] * a1[3] * a1[8] + a1[0] * a1[4] * a1[8];
            a1 = [
                -a1[4] * a1[7] + a1[4] * a1[8],
                a1[5] * a1[6] - a1[3] * a1[8],
                -a1[4] * a1[6] + a1[3] * a1[7],
                a1[2] * a1[7] - a1[1] * a1[8],
                -a1[2] * a1[6] + a1[0] * a1[8],
                a1[1] * a1[6] - a1[0] * a1[7],
                -a1[2] * a1[4] + a1[1] * a1[5],
                a1[2] * a1[3] - a1[0] * a1[5],
                -a1[1] * a1[3] + a1[0] * a1[4]
            ];
            1E-10 > Math.abs(b) && console.log("PSLQ: inverting singular matrix!");
            this._e = a1.map(function(a1) {
                return a1 / b;
            });
            return this;
        };
        Fa.prototype.swRow = function(a1, b) {
            for(var e = 0; 9 > e;)this.exchange(e + a1, e + b), e += 3;
        };
        Fa.prototype.swCol = function(a1, b) {
            for(var e = 0; 3 > e; ++e)this.exchange(3 * a1 + e, 3 * b + e);
        };
        Fa.mult = function(a1, b, c) {
            a1 = [
                a1.get(0) * b.get(0) + a1.get(3) * b.get(1) + a1.get(6) * b.get(2),
                a1.get(1) * b.get(0) + a1.get(4) * b.get(1) + a1.get(7) * b.get(2),
                a1.get(2) * b.get(0) + a1.get(5) * b.get(1) + a1.get(8) * b.get(2),
                a1.get(0) * b.get(3) + a1.get(3) * b.get(4) + a1.get(6) * b.get(5),
                a1.get(1) * b.get(3) + a1.get(4) * b.get(4) + a1.get(7) * b.get(5),
                a1.get(2) * b.get(3) + a1.get(5) * b.get(4) + a1.get(8) * b.get(5),
                a1.get(0) * b.get(6) + a1.get(3) * b.get(7) + a1.get(6) * b.get(8),
                a1.get(1) * b.get(6) + a1.get(4) * b.get(7) + a1.get(7) * b.get(8),
                a1.get(2) * b.get(6) + a1.get(5) * b.get(7) + a1.get(8) * b.get(8)
            ];
            c.set(a1);
        };
        Fa.prototype.getString = function() {
            var a1 = this._e;
            return "/" + a1[0] + "	 " + a1[3] + "	 " + a1[6] + "\\\n|" + a1[1] + "	 " + a1[4] + "	 " + a1[7] + "|\n\\" + a1[2] + "	 " + a1[5] + "	 " + a1[8] + "/\n";
        };
        Fa.prototype.transpose = function() {
            this.exchange(1, 3);
            this.exchange(2, 6);
            this.exchange(5, 7);
            return this;
        };
        Fa.VMmult = function(a1, b, c) {
            c[0] = b.get(0) * a1[0] + b.get(1) * a1[1] + b.get(2) * a1[2];
            c[1] = b.get(3) * a1[0] + b.get(4) * a1[1] + b.get(5) * a1[2];
            c[2] = b.get(6) * a1[0] + b.get(7) * a1[1] + b.get(8) * a1[2];
        };
        var kb = function() {};
        kb.dot = function(a1, b) {
            for(var e = 0, c = 0; c < a1.length; c++)e += a1[c] * b[c];
            return e;
        };
        kb.scale = function(a1, b) {
            for(var e = 0; e < a1.length; ++e)a1[e] *= b;
        };
        kb.maxIndex = function(a1) {
            for(var b = 0, c = 1; c < a1.length; ++c)a1[c] > a1[b] && (b = c);
            return b;
        };
        kb.hermiteReduce = function(a1) {
            for(var b = [
                [
                    1,
                    0,
                    0
                ],
                [
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    1
                ]
            ], c = a1.length, d = a1.map(function(a1) {
                return [].concat($jscomp.arrayFromIterable(a1));
            }), g, f = 1; f < c; f++)for(var h = f - 1; 0 <= h; h--){
                g = Math.round(a1[f][h] / a1[h][h]);
                for(var k = 0; k <= h; k++)d[f][k] -= g * d[h][k];
                for(k = 0; k < c; k++)b[f][k] -= g * b[h][k];
            }
            for(c = 0; 3 > c; c++)a1[c] = d[c];
            return new Fa(b);
        };
        kb.doPSLQ = function(a1, b) {
            for(var e = a1.length, c = [], d = [], g = 0; g < e; ++g){
                c[g] = a1[g] / Math.sqrt(kb.dot(a1, a1));
                for(var f = 0, h = g; h < e; ++h)f += Math.pow(a1[h], 2);
                d[g] = Math.sqrt(f);
            }
            kb.scale(d, 1 / d[0]);
            g = new Fa;
            a1 = new Fa;
            f = [];
            for(h = 0; h < e; h++)f[h] = [];
            for(h = 0; h < e; ++h)for(var k = 0; k < e - 1; ++k)f[h][k] = h > k ? -c[h] * c[k] / d[k] / d[k + 1] : h === k ? d[h + 1] / d[h] : 0;
            h = kb.hermiteReduce(f);
            k = h.clone().inverse().transpose();
            Fa.VMmult(c, k, c);
            Fa.mult(h, g, g);
            Fa.mult(a1, k, a1);
            for(d = 0; d < kb.MAX_ITER; ++d){
                k = [
                    f[0][0],
                    f[1][1]
                ];
                h = 0;
                Math.pow(this.GAMMA, 2) * Math.abs(k[1]) > Math.pow(this.GAMMA, 1) * Math.abs(k[0]) && (h = 1);
                var l = k = 0, m = 0;
                h < e - 2 && (k = f[h + 1][h], l = f[h + 1][h + 1], m = Math.sqrt(Math.pow(k, 2) + Math.pow(l, 2)));
                var n = c[h];
                c[h] = c[h + 1];
                c[h + 1] = n;
                n = [].concat($jscomp.arrayFromIterable(f[h]));
                f[h] = f[h + 1];
                f[h + 1] = n;
                g.swRow(h, h + 1);
                a1.swCol(h, h + 1);
                n = Array(2);
                for(var p = 0; 3 > p; p++)n[p] = [];
                if (h < e - 2) {
                    for(p = 0; p < e - 1; ++p)for(var q = 0; q < e - 1; ++q)n[p][q] = p === h && q === h ? k / m : p === h && q === h + 1 ? -l / m : p === h + 1 && q === h ? l / m : p === h + 1 && q === h + 1 ? k / m : p === q && q !== h || p === q && q !== h + 1 ? 1 : 0;
                    f = [
                        [
                            f[0][0] * n[0][0] + f[0][1] * n[1][0],
                            f[0][0] * n[0][1] + f[0][1] * n[1][1]
                        ],
                        [
                            f[1][0] * n[0][0] + f[1][1] * n[1][0],
                            f[1][0] * n[0][1] + f[1][1] * n[1][1]
                        ],
                        [
                            f[2][0] * n[0][0] + f[2][1] * n[1][0],
                            f[2][0] * n[0][1] + f[2][1] * n[1][1]
                        ]
                    ];
                }
                h = kb.hermiteReduce(f);
                k = h.clone().inverse().transpose();
                Fa.VMmult(c, k, c);
                Fa.mult(h, g, g);
                Fa.mult(a1, k, a1);
                h = [
                    c[0],
                    c[1],
                    c[2],
                    f[0][0],
                    f[1][1]
                ];
                for(k = 0; k < h.length; ++k)if (Math.abs(h[k]) <= Math.pow(10, -b + 5)) {
                    a1.transpose();
                    for(b = 0; b < c.length; ++b)c[b] = -Math.abs(c[b]);
                    return a1.getRow(kb.maxIndex(c));
                }
            }
        };
        $jscomp.global.Object.defineProperties(kb, {
            MAX_ITER: {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return 20;
                }
            },
            GAMMA: {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return 2 / Math.sqrt(3);
                }
            }
        });
        var cc = {}, C = {
            drawingstate: {}
        };
        C.drawingstate.linecolor = "rgb(0,0,255)";
        C.drawingstate.linecolorraw = [
            0,
            0,
            1
        ];
        C.drawingstate.pointcolor = "rgb(0,255,0)";
        C.drawingstate.pointcolorraw = [
            0,
            1,
            0
        ];
        C.drawingstate.textcolor = "rgb(0,0,0)";
        C.drawingstate.textcolorraw = [
            0,
            0,
            0
        ];
        C.drawingstate.alpha = 1;
        C.drawingstate.pointsize = 4;
        C.drawingstate.linesize = 1;
        C.drawingstate.textsize = null;
        C.drawingstate.matrix = {};
        C.drawingstate.matrix.a = 25;
        C.drawingstate.matrix.b = 0;
        C.drawingstate.matrix.c = 0;
        C.drawingstate.matrix.d = 25;
        C.drawingstate.matrix.tx = 250.5;
        C.drawingstate.matrix.ty = 250.5;
        C.drawingstate.matrix.det = C.drawingstate.matrix.a * C.drawingstate.matrix.d - C.drawingstate.matrix.b * C.drawingstate.matrix.c;
        C.drawingstate.matrix.sdet = Math.sqrt(C.drawingstate.matrix.det);
        C.drawingstate.initialmatrix = {};
        C.drawingstate.initialmatrix.a = C.drawingstate.matrix.a;
        C.drawingstate.initialmatrix.b = C.drawingstate.matrix.b;
        C.drawingstate.initialmatrix.c = C.drawingstate.matrix.c;
        C.drawingstate.initialmatrix.d = C.drawingstate.matrix.d;
        C.drawingstate.initialmatrix.tx = C.drawingstate.matrix.tx;
        C.drawingstate.initialmatrix.ty = C.drawingstate.matrix.ty;
        C.drawingstate.initialmatrix.det = C.drawingstate.matrix.det;
        C.drawingstate.initialmatrix.sdet = C.drawingstate.matrix.sdet;
        C.clone = function(a1) {
            if (null === a1 || "object" !== typeof a1) return a1;
            var b = a1.constructor(), c;
            for(c in a1)b[c] = C.clone(a1[c]);
            return b;
        };
        cc.backup = C.clone(C.drawingstate);
        cc.stack = [];
        C.clone(C.drawingstate);
        C.reset = function() {
            C.drawingstate.matrix.a = C.drawingstate.initialmatrix.a;
            C.drawingstate.matrix.b = C.drawingstate.initialmatrix.b;
            C.drawingstate.matrix.c = C.drawingstate.initialmatrix.c;
            C.drawingstate.matrix.d = C.drawingstate.initialmatrix.d;
            C.drawingstate.matrix.tx = C.drawingstate.initialmatrix.tx;
            C.drawingstate.matrix.ty = C.drawingstate.initialmatrix.ty;
            C.drawingstate.matrix.det = C.drawingstate.initialmatrix.det;
            C.drawingstate.matrix.sdet = C.drawingstate.initialmatrix.sdet;
        };
        C.from = function(a1, b, c) {
            a1 /= c;
            b /= c;
            c = C.drawingstate.matrix;
            return [
                (a1 * c.a - b * c.b + c.tx) / wa,
                (a1 * c.c - b * c.d - c.ty) / wa
            ];
        };
        C.to = function(a1, b) {
            var e = C.drawingstate.matrix;
            a1 = a1 * wa - e.tx;
            b = b * wa + e.ty;
            return [
                (a1 * e.d - b * e.b) / e.det,
                -(-a1 * e.c + b * e.a) / e.det,
                1
            ];
        };
        C.toMat = function() {
            var a1 = C.drawingstate.matrix;
            return g.realMatrix([
                [
                    a1.d,
                    -a1.b,
                    -a1.tx * a1.d - a1.ty * a1.b
                ],
                [
                    a1.c,
                    -a1.a,
                    -a1.tx * a1.c - a1.ty * a1.a
                ],
                [
                    0,
                    0,
                    a1.det
                ]
            ]);
        };
        C.dumpTrafo = function() {
            function a1(a1) {
                return Math.round(1E3 * a1) / 1E3;
            }
            var b = C.drawingstate.matrix;
            console.log("a:" + a1(b.a) + " b:" + a1(b.b) + " c:" + a1(b.c) + " d:" + a1(b.d) + " tx:" + a1(b.ty) + " ty:" + a1(b.tx));
        };
        C.setMat = function(a1, b, c, d, g, f) {
            var e = C.drawingstate.matrix;
            e.a = a1;
            e.b = b;
            e.c = c;
            e.d = d;
            e.tx = g;
            e.ty = f;
            e.det = a1 * d - b * c;
            e.sdet = Math.sqrt(e.det);
        };
        C.scaleAndOrigin = function(a1, b, c) {
            C.setMat(a1, 0, 0, a1, b, c);
        };
        C.visibleRect = function(a1, b, c, d) {
            var e = c - a1, g = b - d;
            e = ma * g < pa * e ? ma / e : pa / g;
            C.setMat(e, 0, 0, e, (ma - e * (a1 + c)) / 2, (pa - e * (b + d)) / 2);
        };
        C.applyMat = function(a1, b, c, d, g, f) {
            var e = C.drawingstate.matrix;
            C.setMat(e.a * a1 + e.c * b, e.b * a1 + e.d * b, e.a * c + e.c * d, e.b * c + e.d * d, e.a * g + e.c * f + e.tx, e.b * g + e.d * f + e.ty);
        };
        C.translate = function(a1, b) {
            C.applyMat(1, 0, 0, 1, a1, b);
        };
        C.rotate = function(a1) {
            var b = Math.cos(a1);
            a1 = Math.sin(a1);
            C.applyMat(b, a1, -a1, b, 0, 0);
        };
        C.scale = function(a1) {
            C.applyMat(a1, 0, 0, a1, 0, 0);
        };
        C.gsave = function() {
            cc.stack.push(C.clone(C.drawingstate));
        };
        C.grestore = function() {
            0 !== cc.stack.length && (C.drawingstate = cc.stack.pop());
        };
        C.greset = function() {
            C.drawingstate = C.clone(cc.backup);
            C.drawingstate.matrix.ty -= pa;
            C.drawingstate.initialmatrix.ty -= pa;
            cc.stack = [];
        };
        C.createnewbackup = function() {
            C.drawingstate.initialmatrix.a = C.drawingstate.matrix.a;
            C.drawingstate.initialmatrix.b = C.drawingstate.matrix.b;
            C.drawingstate.initialmatrix.c = C.drawingstate.matrix.c;
            C.drawingstate.initialmatrix.d = C.drawingstate.matrix.d;
            C.drawingstate.initialmatrix.tx = C.drawingstate.matrix.tx;
            C.drawingstate.initialmatrix.ty = C.drawingstate.matrix.ty;
            C.drawingstate.initialmatrix.det = C.drawingstate.matrix.det;
            C.drawingstate.initialmatrix.sdet = C.drawingstate.matrix.sdet;
            cc.backup = C.clone(C.drawingstate);
        };
        C.makecolor = function(a1, b, c) {
            a1 = Math.floor(255 * a1);
            b = Math.floor(255 * b);
            c = Math.floor(255 * c);
            return 1 === C.drawingstate.alpha ? "rgb(" + a1 + "," + b + "," + c + ")" : "rgba(" + a1 + "," + b + "," + c + "," + C.drawingstate.alpha + ")";
        };
        C.setcolor = function(a1) {
            var b = a1.value[0].value.real, c = a1.value[1].value.real;
            a1 = a1.value[2].value.real;
            C.drawingstate.linecolor = C.drawingstate.pointcolor = C.makecolor(b, c, a1);
            C.drawingstate.linecolorraw = C.drawingstate.pointcolorraw = [
                b,
                c,
                a1
            ];
        };
        C.setlinecolor = function(a1) {
            var b = a1.value[0].value.real, c = a1.value[1].value.real;
            a1 = a1.value[2].value.real;
            C.drawingstate.linecolor = C.makecolor(b, c, a1);
            C.drawingstate.linecolorraw = [
                b,
                c,
                a1
            ];
        };
        C.settextcolor = function(a1) {
            var b = a1.value[0].value.real, c = a1.value[1].value.real;
            a1 = a1.value[2].value.real;
            C.drawingstate.textcolor = C.makecolor(b, c, a1);
            C.drawingstate.textcolorraw = [
                b,
                c,
                a1
            ];
        };
        C.setpointcolor = function(a1) {
            var b = a1.value[0].value.real, c = a1.value[1].value.real;
            a1 = a1.value[2].value.real;
            C.drawingstate.pointcolor = C.makecolor(b, c, a1);
            C.drawingstate.pointcolorraw = [
                b,
                c,
                a1
            ];
        };
        C.setalpha = function(a1) {
            C.drawingstate.alpha = a1.value.real;
            C.drawingstate.linecolor = C.makecolor(C.drawingstate.linecolorraw[0], C.drawingstate.linecolorraw[1], C.drawingstate.linecolorraw[2]);
            C.drawingstate.pointcolor = C.makecolor(C.drawingstate.pointcolorraw[0], C.drawingstate.pointcolorraw[1], C.drawingstate.pointcolorraw[2]);
            C.drawingstate.textcolor = C.makecolor(C.drawingstate.textcolorraw[0], C.drawingstate.textcolorraw[1], C.drawingstate.textcolorraw[2]);
        };
        C.setpointsize = function(a1) {
            C.drawingstate.pointsize = a1.value.real;
        };
        C.setlinesize = function(a1) {
            C.drawingstate.linesize = a1.value.real;
        };
        C.settextsize = function(a1) {
            C.drawingstate.textsize = a1.value.real;
        };
        var Aa = {
            clip: "none",
            pointColor: [
                1,
                0,
                0
            ],
            lineColor: [
                0,
                0,
                1
            ],
            pointSize: 5,
            lineSize: 1,
            alpha: 1,
            overhangLine: 1,
            overhangSeg: 1,
            dimDependent: .7,
            fontFamily: "sans-serif",
            textColor: [
                0,
                0,
                0
            ],
            textsize: 20,
            noborder: !1,
            lineHeight: 1.45
        };
        d.defaultAppearance && oe(d.defaultAppearance);
        var je = {}, Ne = {
            UL: 0,
            UR: 1,
            LR: 2,
            LL: 3
        }, Fe = [
            "in",
            "out",
            "good",
            "backup",
            "prover"
        ], mc = new Float64Array(0), Ub = {};
        Fe.forEach(function(a1) {
            Ub[a1] = mc;
        });
        var Ja = mc, yb = mc, ob = mc, jb, pb, lc, sb, fd, Ge = !1, Oe = {
            toString: function() {
                return "RefineException";
            }
        }, Pe = null, P = null;
        d.enableTraceLog && (P = {
            logLength: Infinity,
            fullLog: [],
            currentMouseAndScripts: null,
            currentMover: null,
            currentStep: null,
            currentElement: null,
            currentParam: null,
            labelTracing2: u.wrap("tracing2"),
            labelTracing4: u.wrap("tracing4"),
            labelTracingSesq: u.wrap("tracingSesq"),
            postMouseHooks: []
        }, "number" === typeof d.enableTraceLog && (P.logLength = d.enableTraceLog), La.getTraceLog = ae, La.formatTraceLog = re, La.addTraceHook = P.postMouseHooks.push.bind(P.postMouseHooks));
        mb.stateSize = 12;
        rd.stateSize = 24;
        vc.stateSize = 24;
        var Ra = [];
        qa._helper = {};
        qa._helper.duplicatePPLL = function(a1, b) {
            return {
                getInvolved: function() {
                    return [
                        a1,
                        b
                    ];
                },
                toString: function() {
                    return ({
                        P: "point",
                        L: "line"
                    })[a1.kind] + " " + a1.name + " is duplicate of " + b.name;
                },
                apply: wc(a1, b),
                holds: function() {
                    return g.projectiveDistMinScal(a1.homog, b.homog) < l.epsbig;
                }
            };
        };
        qa._helper.duplicatePsLs = function(a1, b) {
            return {
                getInvolved: function() {
                    return [
                        a1,
                        b
                    ];
                },
                toString: function() {
                    return ({
                        Ps: "point set",
                        Ls: "line set"
                    })[a1.kind] + " " + a1.name + " is duplicate of " + b.name;
                },
                apply: wc(a1, b),
                holds: function() {
                    return qa._helper.isSetEq(a1.results.value, b.results.value, g.projectiveDistMinScal);
                }
            };
        };
        qa._helper.duplicateCC = function(a1, b) {
            return {
                getInvolved: function() {
                    return [
                        a1,
                        b
                    ];
                },
                toString: function() {
                    return "Conic " + a1.name + " is duplicate of " + b.name;
                },
                apply: wc(a1, b),
                holds: function() {
                    return g.conicDist(a1.matrix, b.matrix) < l.epsbig;
                }
            };
        };
        qa._helper.duplicateCs = function(a1, b) {
            return {
                getInvolved: function() {
                    return [
                        a1,
                        b
                    ];
                },
                toString: function() {
                    return "Conic set" + a1.name + " is duplicate of " + b.name;
                },
                apply: wc(a1, b),
                holds: function() {
                    return qa._helper.isSetEq(a1.results, b.results, g.conicDist);
                }
            };
        };
        qa._helper.duplicateSS = function(a1, b) {
            return {
                getInvolved: function() {
                    return [
                        a1,
                        b
                    ];
                },
                toString: function() {
                    return "Segment " + a1.name + " is duplicate of " + b.name;
                },
                apply: wc(a1, b),
                holds: function() {
                    var e = a1.startpos, c = a1.endpos, d = b.startpos, f = b.endpos, h = g.projectiveDistMinScal(e, d);
                    h += g.projectiveDistMinScal(c, f);
                    c = g.projectiveDistMinScal(c, d);
                    c += g.projectiveDistMinScal(e, f);
                    return Math.min(h, c) < l.epsbig;
                }
            };
        };
        qa.P = function(a1) {
            r.points.forEach(function(b) {
                a1.name !== b.name && (b = qa._helper.duplicatePPLL(a1, b), b.holds() && Ra.push(b));
            });
        };
        qa.Ps = function(a1) {
            r.sets.points.forEach(function(b) {
                a1.name !== b.name && (b = qa._helper.duplicatePsLs(a1, b), b.holds() && Ra.push(b));
            });
        };
        qa.Ls = function(a1) {
            r.sets.lines.forEach(function(b) {
                a1.name !== b.name && (b = qa._helper.duplicatePsLs(a1, b), b.holds() && Ra.push(b));
            });
        };
        qa.Cs = function(a1) {
            r.sets.conics.forEach(function(b) {
                a1.name !== b.name && (b = qa._helper.duplicateCs(a1, b), b.holds() && Ra.push(b));
            });
        };
        qa.L = function(a1) {
            r.lines.forEach(function(b) {
                a1.name !== b.name && a1.kind === b.kind && (b = qa._helper.duplicatePPLL(a1, b), b.holds() && Ra.push(b));
            });
        };
        qa.S = function(a1) {
            r.lines.forEach(function(b) {
                a1.name !== b.name && "S" === b.kind && (b = qa._helper.duplicateSS(a1, b), b.holds() && Ra.push(b));
            });
        };
        qa.C = function(a1) {
            r.conics.forEach(function(b) {
                a1.name !== b.name && (b = qa._helper.duplicateCC(a1, b), b.holds() && Ra.push(b));
            });
        };
        qa._helper.isSetEq = function(a1, b, c) {
            a1 = a1.slice();
            b = b.slice();
            if (a1.length !== b.length) return !1;
            if (0 === a1.length && 0 === b.length) return !0;
            var e = a1.shift(), d = b.reduce(function(a1, b, d, g) {
                return c(b, e) < c(g[a1], e) ? d : a1;
            }, 0);
            return c(b[d], e) < l.epsbig ? (b.splice(d, 1), qa._helper.isSetEq(a1, b, c)) : !1;
        };
        Qb.P = function(a1) {
            r.lines.forEach(function(b) {
                b = td(a1, b);
                b.holds() && Ra.push(b);
            });
            r.conics.forEach(function(b) {
                b = ce(a1, b);
                b.holds() && Ra.push(b);
            });
        };
        Qb.L = function(a1) {
            r.points.forEach(function(b) {
                b = td(b, a1);
                b.holds() && Ra.push(b);
            });
        };
        Qb.S = Qb.L;
        Qb.C = function(a1) {
            r.points.forEach(function(b) {
                b = ce(b, a1);
                b.holds() && Ra.push(b);
            });
        };
        var m = {
            _helper: {},
            RandomLine: {}
        };
        m.RandomLine.kind = "L";
        m.RandomLine.signature = [];
        m.RandomLine.updatePosition = function(a1) {
            a1.homog = g.realVector([
                Math.random() - .5,
                Math.random() - .5,
                Math.random() - .5
            ]);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m._helper.getRandMove = function(a1) {
            a1 = a1.homog;
            var b = g.getRandComplexVec3(-0.05, .05);
            return {
                type: "homog",
                value: g.add(a1, b)
            };
        };
        m._helper.getRandPointMove = function(a1) {
            a1 = g.normalizeMax(a1.homog);
            var b = a1.value[2], c = l.abs(b).value.real, d = l.real(0);
            c < l.eps && (d = l.getRandComplex(-0.05, .05), b = l.real(1));
            c = g.turnIntoCSList([
                l.getRandComplex(-0.1, .1),
                l.getRandComplex(-0.1, .1),
                d
            ]);
            b = g.scalmult(b, c);
            b = g.add(a1, b);
            return {
                type: "homog",
                value: b
            };
        };
        m.FreeLine = {};
        m.FreeLine.kind = "L";
        m.FreeLine.signature = [];
        m.FreeLine.isMovable = !0;
        m.FreeLine.initialize = function(a1) {
            a1 = m._helper.initializeLine(a1);
            ea(a1);
        };
        m.FreeLine.getParamForInput = function(a1, b, c) {
            "mouse" === c ? (a1 = g.cross(b, g.ez), a1 = g.cross(a1, b)) : a1 = "homog" === c ? b : g.turnIntoCSList([
                l.zero,
                l.zero,
                l.zero
            ]);
            return g.normalizeMax(a1);
        };
        m.FreeLine.getParamFromState = function(a1) {
            return ha(3);
        };
        m.FreeLine.putParamToState = function(a1, b) {
            ea(b);
        };
        m.FreeLine.updatePosition = function(a1) {
            var b = ha(3);
            ea(b);
            a1.homog = u.withUsage(b, "Line");
        };
        m.FreeLine.getRandomMove = m._helper.getRandMove;
        m.FreeLine.stateSize = 6;
        m.RandomPoint = {};
        m.RandomPoint.kind = "P";
        m.RandomPoint.signature = [];
        m.RandomPoint.updatePosition = function(a1) {
            a1.homog = g.realVector([
                100 * Math.random(),
                100 * Math.random(),
                100 * Math.random()
            ]);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Point");
        };
        m.Join = {};
        m.Join.kind = "L";
        m.Join.signature = [
            "P",
            "P"
        ];
        m.Join.updatePosition = function(a1) {
            a1.homog = g.cross(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m.Segment = {};
        m.Segment.kind = "S";
        m.Segment.signature = [
            "P",
            "P"
        ];
        m.Segment.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]];
            m.Segment.setSegmentPos(a1, g.cross(b.homog, c.homog), g.scalmult(c.homog.value[2], b.homog), g.scalmult(b.homog.value[2], c.homog));
        };
        m.Segment.setSegmentPos = function(a1, b, c, d) {
            b = g.normalizeMax(b);
            a1.homog = u.withUsage(b, "Line");
            b = g.turnIntoCSList([
                c,
                d
            ]);
            b = g.normalizeMax(b);
            a1.startpos = b.value[0];
            a1.endpos = b.value[1];
        };
        m.Meet = {};
        m.Meet.kind = "P";
        m.Meet.signature = [
            "L",
            "L"
        ];
        m.Meet.updatePosition = function(a1) {
            a1.homog = g.cross(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Point");
        };
        m.Meet.visiblecheck = function(a1) {
            var b = !0, c = r.csnames[a1.args[0]], d = r.csnames[a1.args[1]];
            "S" === c.kind && (b = Td(a1, c));
            b && "S" === d.kind && (b = Td(a1, d));
            a1.isshowing = b;
        };
        m._helper.midpoint = function(a1, b) {
            return g.normalizeMax(g.add(g.scalmult(b.value[2], a1), g.scalmult(a1.value[2], b)));
        };
        m.Mid = {};
        m.Mid.kind = "P";
        m.Mid.signature = [
            "P",
            "P"
        ];
        m.Mid.updatePosition = function(a1) {
            var b = m._helper.midpoint(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog);
            a1.homog = u.withUsage(b, "Point");
        };
        m.Perp = {};
        m.Perp.kind = "L";
        m.Perp.signature = [
            "L",
            "P"
        ];
        m.Perp.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog;
            b = g.turnIntoCSList([
                b.value[0],
                b.value[1],
                l.zero
            ]);
            a1.homog = g.cross(b, c);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m.Para = {};
        m.Para.kind = "L";
        m.Para.signature = [
            "L",
            "P"
        ];
        m.Para.updatePosition = function(a1) {
            var b = r.csnames[a1.args[1]].homog;
            a1.homog = g.cross(g.cross(g.linfty, r.csnames[a1.args[0]].homog), b);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m.Horizontal = {};
        m.Horizontal.kind = "L";
        m.Horizontal.signature = [
            "P"
        ];
        m.Horizontal.updatePosition = function(a1) {
            a1.homog = g.cross(g.ex, r.csnames[a1.args[0]].homog);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m.HorizontalLine = {};
        m.HorizontalLine.kind = "L";
        m.HorizontalLine.signature = [];
        m.HorizontalLine.isMovable = !0;
        m.HorizontalLine.initialize = function(a1) {
            a1 = m._helper.initializeLine(a1);
            a1 = g.turnIntoCSList([
                l.zero,
                a1.value[1],
                a1.value[2]
            ]);
            a1 = g.normalizeMax(a1);
            ea(a1);
        };
        m.HorizontalLine.getParamForInput = function(a1, b, c) {
            if ("mouse" === c) b = g.cross(b, g.ex);
            else if ("homog" === c) {
                if (0 !== b.value[0].real || 0 !== b.value[0].imag) b = g.turnIntoCSList([
                    l.zero,
                    b.value[1],
                    b.value[2]
                ]);
            } else b = g.turnIntoCSList([
                l.zero,
                l.zero,
                l.zero
            ]);
            return g.normalizeMax(b);
        };
        m.HorizontalLine.getParamFromState = function(a1) {
            return ha(3);
        };
        m.HorizontalLine.putParamToState = function(a1, b) {
            ea(b);
        };
        m.HorizontalLine.updatePosition = function(a1) {
            var b = ha(3);
            ea(b);
            a1.homog = u.withUsage(b, "Line");
        };
        m.HorizontalLine.getRandomMove = m._helper.getRandMove;
        m.HorizontalLine.stateSize = 6;
        m.Vertical = {};
        m.Vertical.kind = "L";
        m.Vertical.signature = [
            "P"
        ];
        m.Vertical.updatePosition = function(a1) {
            a1.homog = g.cross(g.ey, r.csnames[a1.args[0]].homog);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m.VerticalLine = {};
        m.VerticalLine.kind = "L";
        m.VerticalLine.signature = [];
        m.VerticalLine.isMovable = !0;
        m.VerticalLine.initialize = function(a1) {
            a1 = m._helper.initializeLine(a1);
            a1 = g.turnIntoCSList([
                a1.value[0],
                l.zero,
                a1.value[2]
            ]);
            a1 = g.normalizeMax(a1);
            ea(a1);
        };
        m.VerticalLine.getParamForInput = function(a1, b, c) {
            if ("mouse" === c) b = g.cross(b, g.ey);
            else if ("homog" === c) {
                if (0 !== b.value[1].real || 0 !== b.value[1].imag) b = g.turnIntoCSList([
                    b.value[0],
                    l.zero,
                    b.value[2]
                ]);
            } else b = g.turnIntoCSList([
                l.zero,
                l.zero,
                l.zero
            ]);
            return g.normalizeMax(b);
        };
        m.VerticalLine.getParamFromState = function(a1) {
            return ha(3);
        };
        m.VerticalLine.putParamToState = function(a1, b) {
            ea(b);
        };
        m.VerticalLine.updatePosition = function(a1) {
            var b = ha(3);
            ea(b);
            a1.homog = u.withUsage(b, "Line");
        };
        m.VerticalLine.getRandomMove = m._helper.getRandMove;
        m.VerticalLine.stateSize = 6;
        m.LineByFixedAngle = {};
        m.LineByFixedAngle.kind = "L";
        m.LineByFixedAngle.signature = [
            "L",
            "P"
        ];
        m.LineByFixedAngle.initialize = function(a1) {
            var b = l._helper.input(a1.angle), c = l.cos(b);
            b = l.sin(b);
            a1.rot = g.turnIntoCSList([
                g.turnIntoCSList([
                    b,
                    c,
                    l.zero
                ]),
                g.turnIntoCSList([
                    l.neg(c),
                    b,
                    l.zero
                ]),
                g.turnIntoCSList([
                    l.zero,
                    l.zero,
                    l.zero
                ])
            ]);
        };
        m.LineByFixedAngle.updatePosition = function(a1) {
            var b = r.csnames[a1.args[1]], c = g.productMV(a1.rot, r.csnames[a1.args[0]].homog);
            a1.homog = g.cross(b.homog, c);
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m.Through = {};
        m.Through.kind = "L";
        m.Through.signature = [
            "P"
        ];
        m.Through.isMovable = !0;
        m.Through.initialize = function(a1) {
            a1 = a1.dir ? u.wrap(a1.dir) : g.realVector([
                a1.pos[1],
                -a1.pos[0],
                0
            ]);
            ea(a1);
        };
        m.Through.getParamForInput = function(a1, b, c) {
            a1 = "dir" === c || "mouse" === c ? g.cross(r.csnames[a1.args[0]].homog, b) : "homog" === c ? b : g.turnIntoCSList([
                l.zero,
                l.zero,
                l.zero
            ]);
            a1 = g.cross(g.linfty, a1);
            return g.normalizeMax(a1);
        };
        m.Through.getParamFromState = function(a1) {
            return ha(3);
        };
        m.Through.putParamToState = function(a1, b) {
            ea(b);
        };
        m.Through.updatePosition = function(a1) {
            var b = ha(3);
            ea(b);
            b = g.cross(r.csnames[a1.args[0]].homog, b);
            b = g.normalizeMax(b);
            a1.homog = u.withUsage(b, "Line");
        };
        m.Through.getRandomMove = m._helper.getRandMove;
        m.Through.stateSize = 6;
        m.Through.set_angle = function(a1, b) {
            if ("number" === b.ctype) {
                var e = l.cos(b);
                b = l.sin(b);
                e = g.turnIntoCSList([
                    e,
                    b,
                    l.real(0)
                ]);
                Ta(a1, e, "dir");
            }
        };
        m.Through.set_slope = function(a1, b) {
            "number" === b.ctype && (b = g.turnIntoCSList([
                l.real(1),
                b,
                l.real(0)
            ]), Ta(a1, b, "dir"));
        };
        m.Free = {};
        m.Free.kind = "P";
        m.Free.signature = [];
        m.Free.isMovable = !0;
        m.Free.initialize = function(a1) {
            a1 = m._helper.initializePoint(a1);
            ea(a1);
        };
        m.Free.getParamForInput = function(a1, b, c) {
            if ("mouse" === c && Cc && 0 !== Va) {
                b = g.normalizeZ(b);
                a1 = b.value[0].value.real;
                c = b.value[1].value.real;
                var e = Math.round(a1 / Va) * Va, d = Math.round(c / Va) * Va;
                Math.abs(e - a1) < Tb && Math.abs(d - c) < Tb && (b = g.realVector([
                    e,
                    d,
                    1
                ]));
            }
            return g.normalizeMax(b);
        };
        m.Free.getParamFromState = function(a1) {
            return ha(3);
        };
        m.Free.putParamToState = function(a1, b) {
            ea(b);
        };
        m.Free.updatePosition = function(a1) {
            var b = ha(3);
            ea(b);
            a1.homog = u.withUsage(b, "Point");
        };
        m.Free.getRandomMove = m._helper.getRandPointMove;
        m.Free.stateSize = 6;
        m._helper.projectPointToLine = function(a1, b) {
            var e = g.turnIntoCSList([
                b.value[0],
                b.value[1],
                l.zero
            ]);
            a1 = g.cross(e, a1);
            return g.normalizeMax(g.cross(a1, b));
        };
        m.PointOnLine = {};
        m.PointOnLine.kind = "P";
        m.PointOnLine.signature = [
            "L"
        ];
        m.PointOnLine.isMovable = !0;
        m.PointOnLine.initialize = function(a1) {
            var b = m._helper.initializePoint(a1);
            a1 = r.csnames[a1.args[0]].homog;
            b = m._helper.projectPointToLine(b, a1);
            b = g.normalizeMax(b);
            var c = g.cross(g.linfty, b);
            g.normalizeMax(c);
            ea(b);
            ea(a1);
            lc = !1;
        };
        m.PointOnLine.updatePosition = function(a1, b) {
            var e = r.csnames[a1.args[0]].homog;
            var c = ha(3);
            ha(3);
            if (!b) {
                jb = a1.stateIdx;
                var d = Ja;
                Ja = ob;
                b = ha(3);
                var f = ha(3);
                Ja = d;
                d = g.cross(f, e);
                g._helper.isAlmostZero(d) && (d = g.cross(g.linfty, e));
                b = m._helper.CircleMP(d, b);
                b = m._helper.IntersectLC(e, b);
                d = m._helper.pointReflection(d, c);
                c = qd(b[0], b[1], c, d)[0];
            }
            c = g.normalizeMax(c);
            ea(c);
            ea(e);
            a1.homog = u.withUsage(c, "Point");
        };
        m.PointOnLine.getParamForInput = function(a1, b, c) {
            a1 = r.csnames[a1.args[0]].homog;
            b = m._helper.projectPointToLine(b, a1);
            "mouse" === c && Cc && 0 !== Va && (b = m._helper.snapPointToLine(b, a1));
            return b;
        };
        m.PointOnLine.getParamFromState = function(a1) {
            return ha(3);
        };
        m.PointOnLine.putParamToState = function(a1, b) {
            return ea(b);
        };
        m.PointOnLine.getRandomMove = m._helper.getRandPointMove;
        m.PointOnLine.stateSize = 12;
        m.PointOnCircle = {};
        m.PointOnCircle.kind = "P";
        m.PointOnCircle.signature = [
            "C"
        ];
        m.PointOnCircle.isMovable = !0;
        m.PointOnCircle.initialize = function(a1) {
            var b = r.csnames[a1.args[0]];
            a1 = g.normalizeZ(m._helper.initializePoint(a1));
            var c = g.normalizeZ(m._helper.CenterOfCircle(b.matrix)), d = g.sub(a1, c);
            d = g.turnIntoCSList([
                d.value[1],
                l.neg(d.value[0]),
                l.zero
            ]);
            c = g.cross(a1, c);
            b = m._helper.IntersectLC(c, b.matrix);
            c = g.projectiveDistMinScal(a1, b[0]);
            g.projectiveDistMinScal(a1, b[1]) < c ? (a1 = b[1], b = b[0]) : (a1 = b[0], b = b[1]);
            ea(d);
            ea(a1);
            ea(b);
            lc = !1;
        };
        m.PointOnCircle.putParamToState = function(a1, b) {
            ea(b);
        };
        m.PointOnCircle.getParamFromState = function(a1) {
            return ha(3);
        };
        m.PointOnCircle.getParamForInput = function(a1, b, c) {
            c = g.normalizeZ(m._helper.CenterOfCircle(r.csnames[a1.args[0]].matrix));
            b = g.sub(b, c);
            jb = a1.stateIdx;
            a1 = ha(3);
            var e = g.normalizeZ(ha(3));
            c = g.sub(e, c);
            0 > l.sub(l.mult(a1.value[0], c.value[1]), l.mult(a1.value[1], c.value[0])).value.real && (b = g.neg(b));
            return g.turnIntoCSList([
                b.value[1],
                l.neg(b.value[0]),
                l.zero
            ]);
        };
        m.PointOnCircle.parameterPath = function(a1, b, c, d, f) {
            d = g.normalizeAbs(d);
            f = g.normalizeAbs(f);
            var e = g.scalproduct(d, f);
            if (0 <= e.value.real) return Wd(a1, b, c, d, f);
            a1 = g.turnIntoCSList([
                l.sub(d.value[1], f.value[1]),
                l.sub(f.value[0], d.value[0]),
                l.zero
            ]);
            e = g.scalproduct(d, a1);
            0 > e.value.real && (a1 = g.neg(a1));
            0 > b ? (b = 2 * b + 1, c = b * b, e = .25 / (1 + c), c = l.complex(2 * b * e + .25, (1 - c) * e)) : (b = 2 * b - 1, c = b * b, e = .25 / (1 + c), c = l.complex(2 * b * e + .75, (1 - c) * e));
            var h = l.sub(l.real(1), c);
            b = l.mult(c, c);
            e = l.mult(h, h);
            c = l.mult(c, h);
            d = g.scalmult(e, d);
            d = g.add(d, g.scalmult(c, a1));
            return d = g.add(d, g.scalmult(b, f));
        };
        m.PointOnCircle.updatePosition = function(a1) {
            var b = ha(3);
            ea(b);
            var c = r.csnames[a1.args[0]];
            b = g.productMV(c.matrix, b);
            c = m._helper.IntersectLC(b, c.matrix);
            c = mb(c[0], c[1]);
            b = g.normalizeMax(c.value[0]);
            a1.homog = u.withUsage(b, "Point");
            a1.antipodalPoint = c.value[1];
        };
        m.PointOnCircle.getRandomMove = m._helper.getRandPointMove;
        m.PointOnCircle.stateSize = 6 + mb.stateSize;
        m.PointOnCircle.get_angle = function(a1) {
            var b = m._helper.CenterOfCircle(r.csnames[a1.args[0]].matrix), c = g._helper.isAlmostFarpoint;
            if (c(a1.homog) || c(b)) return h;
            a1 = g.normalizeZ(a1.homog);
            b = g.normalizeZ(b);
            b = g.sub(a1, b);
            b = l.arctan2(b.value[0], b.value[1]);
            a1 = l.real(Hc);
            b = l.mod(l.add(b, a1), a1);
            return u.withUsage(b, "Angle");
        };
        m.PointOnCircle.set_angle = function(a1, b) {
            if ("number" === b.ctype) {
                var e = r.csnames[a1.args[0]], c = m._helper.CenterOfCircle(e.matrix);
                if (!g._helper.isAlmostFarpoint(c)) {
                    c = g.normalizeZ(c);
                    var d = l.cos(b);
                    b = l.sin(b);
                    e = g.turnIntoCSList([
                        l.mult(d, e.radius),
                        l.mult(b, e.radius),
                        l.real(0)
                    ]);
                    Ta(a1, g.add(c, e), "homog");
                }
            }
            return h;
        };
        m.OtherPointOnCircle = {};
        m.OtherPointOnCircle.kind = "P";
        m.OtherPointOnCircle.signature = [
            "P"
        ];
        m.OtherPointOnCircle.signatureConstraints = function(a1) {
            return "PointOnCircle" === r.csnames[a1.args[0]].type;
        };
        m.OtherPointOnCircle.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].antipodalPoint;
            b = g.normalizeMax(b);
            a1.homog = u.withUsage(b, "Point");
        };
        m.PointOnSegment = {};
        m.PointOnSegment.kind = "P";
        m.PointOnSegment.signature = [
            "S"
        ];
        m.PointOnSegment.isMovable = !0;
        m.PointOnSegment.initialize = function(a1) {
            var b = m._helper.initializePoint(a1);
            a1 = m.PointOnSegment.getParamForInput(a1, b);
            wb(a1);
        };
        m.PointOnSegment.getParamForInput = function(a1, b, c) {
            a1 = r.csnames[a1.args[0]];
            var e = a1.homog;
            "mouse" === c && Cc && 0 !== Va && (b = m._helper.snapPointToLine(b, e));
            c = g.turnIntoCSList([
                e.value[0],
                e.value[1],
                l.zero
            ]);
            e = g.sub(a1.startpos, a1.endpos);
            b = g.crossratio3(e, a1.startpos, a1.endpos, b, c);
            0 > b.value.real && (b = l.complex(0, b.value.imag));
            1 < b.value.real && (b = l.complex(1, b.value.imag));
            return b;
        };
        m.PointOnSegment.getParamFromState = function(a1) {
            return hc();
        };
        m.PointOnSegment.putParamToState = function(a1, b) {
            wb(b);
        };
        m.PointOnSegment.updatePosition = function(a1) {
            var b = hc();
            wb(b);
            var c = r.csnames[a1.args[0]], d = c.startpos;
            c = g.sub(c.endpos, d);
            b = g.add(d, g.scalmult(b, c));
            b = g.normalizeMax(b);
            a1.homog = u.withUsage(b, "Point");
        };
        m.PointOnSegment.getRandomMove = m._helper.getRandPointMove;
        m.PointOnSegment.stateSize = 2;
        m._helper.projectPointToCircle = function(a1, b) {
            var e = m._helper.CenterOfCircle(a1.matrix);
            e = g.normalizeMax(e);
            e = g.normalizeMax(g.cross(b, e));
            a1 = m._helper.IntersectLC(e, a1.matrix);
            e = g.projectiveDistMinScal(b, a1[0]);
            b = g.projectiveDistMinScal(b, a1[1]);
            return e < b ? a1[0] : a1[1];
        };
        m.PointOnArc = {};
        m.PointOnArc.kind = "P";
        m.PointOnArc.signature = [
            "C"
        ];
        m.PointOnArc.signatureConstraints = function(a1) {
            return r.csnames[a1.args[0]].isArc;
        };
        m.PointOnArc.isMovable = !0;
        m.PointOnArc.initialize = function(a1) {
            var b = m._helper.initializePoint(a1);
            a1 = m.PointOnArc.getParamForInput(a1, b);
            ea(a1);
        };
        m.PointOnArc.getParamForInput = function(a1, b) {
            a1 = r.csnames[a1.args[0]];
            b = m._helper.projectPointToCircle(a1, b);
            b = g.normalizeMax(g.crossratio3harm(a1.startPoint, a1.endPoint, a1.viaPoint, b, g.ii));
            a1 = l.div(b.value[0], b.value[1]);
            0 > a1.value.real && (b = -1 > a1.value.real ? g.realVector([
                1,
                0
            ]) : g.realVector([
                0,
                1
            ]));
            return b;
        };
        m.PointOnArc.getParamFromState = function(a1) {
            return ha(2);
        };
        m.PointOnArc.putParamToState = function(a1, b) {
            ea(b);
        };
        m.PointOnArc.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = b.startPoint, d = b.viaPoint, f = b.endPoint, h = g.ii, k = g.cross(c, h);
            d = g.cross(d, h);
            var n = g.cross(f, h);
            n = g.turnIntoCSList([
                k,
                n
            ]);
            k = g.transpose(n);
            n = g.conjugate(n);
            k = g.productMM(n, k);
            d = g.productMV(n, d);
            k = g.productMV(g.adjoint2(k), d);
            d = k.value[0];
            k = k.value[1];
            n = ha(2);
            ea(n);
            c = g.normalizeMax(g.add(g.scalmult(l.mult(d, n.value[0]), c), g.scalmult(l.mult(k, n.value[1]), f)));
            b = m._helper.conicOtherIntersection(b.matrix, h, c);
            a1.homog = u.withUsage(b, "Point");
        };
        m.PointOnArc.getRandomMove = m._helper.getRandPointMove;
        m.PointOnArc.stateSize = 4;
        m._helper.CenterOfCircle = function(a1) {
            return g.turnIntoCSList([
                a1.value[2].value[0],
                a1.value[2].value[1],
                l.neg(a1.value[0].value[0])
            ]);
        };
        m._helper.CenterOfConic = function(a1) {
            a1 = g.adjoint3(a1);
            return {
                ctype: "list",
                value: [
                    a1.value[2].value[0],
                    a1.value[2].value[1],
                    a1.value[2].value[2]
                ]
            };
        };
        m.CenterOfConic = {};
        m.CenterOfConic.kind = "P";
        m.CenterOfConic.signature = [
            "C"
        ];
        m.CenterOfConic.updatePosition = function(a1) {
            var b = m._helper.CenterOfConic(r.csnames[a1.args[0]].matrix);
            a1.homog = b;
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Point");
        };
        m._helper.CircleMP = function(a1, b) {
            var e = a1.value[0], c = a1.value[1];
            a1 = l.neg(a1.value[2]);
            var d = l.zero;
            e = g.turnIntoCSList([
                g.turnIntoCSList([
                    a1,
                    d,
                    e
                ]),
                g.turnIntoCSList([
                    d,
                    a1,
                    c
                ]),
                g.turnIntoCSList([
                    e,
                    c,
                    d
                ])
            ]);
            c = u.mult(u.mult(b, e), b);
            b = u.mult(u.mult(b, g.fund), b);
            c = u.mult(c, g.fund);
            b = u.mult(b, e);
            return g.sub(c, b);
        };
        m.CircleMP = {};
        m.CircleMP.kind = "C";
        m.CircleMP.signature = [
            "P",
            "P"
        ];
        m.CircleMP.updatePosition = function(a1) {
            a1.matrix = m._helper.CircleMP(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog);
            a1.matrix = g.normalizeMax(a1.matrix);
            a1.matrix = u.withUsage(a1.matrix, "Circle");
        };
        m.CircleMr = {};
        m.CircleMr.kind = "C";
        m.CircleMr.signature = [
            "P"
        ];
        m.CircleMr.isMovable = !0;
        m.CircleMr.initialize = function(a1) {
            wb(l.real(a1.radius));
        };
        m.CircleMr.getParamForInput = function(a1, b, c) {
            if ("radius" === c) return b;
            a1 = r.csnames[a1.args[0]].homog;
            a1 = g.normalizeZ(a1);
            b = g.normalizeZ(b);
            b = g.sub(a1, b);
            return b = g.abs(b);
        };
        m.CircleMr.getParamFromState = function(a1) {
            return hc();
        };
        m.CircleMr.putParamToState = function(a1, b) {
            wb(b);
        };
        m.CircleMr.updatePosition = function(a1) {
            var b = hc();
            wb(b);
            var c = r.csnames[a1.args[0]].homog, d = l.mult(c.value[2], b);
            d = l.mult(d, d);
            if (!l._helper.isFinite(d) && !l._helper.isNaN(d)) return g.fund;
            c = m._helper.ScaledCircleMrr(c, d);
            a1.matrix = u.withUsage(c, "Circle");
            a1.radius = b;
        };
        m.CircleMr.getRandomMove = function(a1) {
            a1 = a1.radius;
            return {
                type: "radius",
                value: l.abs(a1).value.real < l.eps ? l.getRandComplex(.05, .1) : l.mult(a1, l.getRandReal(.95, 1.05))
            };
        };
        m.CircleMr.stateSize = 2;
        m.CircleMr.set_radius = function(a1, b) {
            "number" === b.ctype && Ta(a1, b, "radius");
        };
        m._helper.ScaledCircleMrr = function(a1, b) {
            var e = a1.value[0], c = a1.value[1];
            a1 = l.neg(a1.value[2]);
            a1 = g.scalmult(a1, g.turnIntoCSList([
                e,
                c,
                a1
            ])).value;
            e = g.turnIntoCSList([
                e,
                c
            ]);
            b = l.sub(g.scalproduct(e, e), b);
            b = m._helper.buildConicMatrix([
                a1[2],
                l.zero,
                a1[2],
                a1[0],
                a1[1],
                b
            ]);
            return g.normalizeMax(b);
        };
        m.Compass = {};
        m.Compass.kind = "C";
        m.Compass.signature = [
            "P",
            "P",
            "P"
        ];
        m.Compass.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = b.value[2], h = c.value[2], k = d.value[2];
            b = g.scalmult(l.mult(h, k), b);
            c = g.scalmult(l.mult(f, k), c);
            d = g.scalmult(l.mult(f, h), d);
            b = g.sub(c, b);
            d = m._helper.ScaledCircleMrr(d, g.scalproduct(b, b));
            a1.matrix = u.withUsage(d, "Circle");
        };
        m._helper.getConicType = function(a1) {
            if (1E-16 > l.abs(g.det(a1)).value.real) return "degenerate";
            var b = l.mult(a1.value[0].value[0], a1.value[1].value[1]);
            b = l.sub(b, l.pow(a1.value[0].value[1], l.real(2)));
            b = b.value.real;
            return 1E-16 > Math.abs(b) ? "parabola" : 1E-16 < b ? "ellipsoid" : "hyperbola";
        };
        m._helper.ConicBy5 = function(a1, b, c, d, f, h) {
            a1 = g.turnIntoCSList([
                g.cross(c, d)
            ]);
            var e = g.turnIntoCSList([
                g.cross(b, f)
            ]);
            b = g.turnIntoCSList([
                g.cross(b, c)
            ]);
            d = g.turnIntoCSList([
                g.cross(d, f)
            ]);
            return m._helper.conicFromTwoDegenerates(a1, e, b, d, h);
        };
        m._helper.conicFromTwoDegenerates = function(a1, b, c, d, f) {
            a1 = u.mult(g.transpose(b), a1);
            c = u.mult(g.transpose(d), c);
            a1 = g.add(a1, g.transpose(a1));
            c = g.add(c, g.transpose(c));
            d = u.mult(u.mult(f, a1), f);
            f = u.mult(u.mult(f, c), f);
            c = u.mult(d, c);
            f = u.mult(f, a1);
            return g.sub(c, f);
        };
        m.ConicBy5 = {};
        m.ConicBy5.kind = "C";
        m.ConicBy5.signature = [
            "P",
            "P",
            "P",
            "P",
            "P"
        ];
        m.ConicBy5.updatePosition = function(a1) {
            var b = m._helper.ConicBy5(a1, r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog);
            a1.matrix = b;
            a1.matrix = g.normalizeMax(a1.matrix);
            a1.matrix = u.withUsage(a1.matrix, "Conic");
        };
        m.FreeConic = {};
        m.FreeConic.kind = "C";
        m.FreeConic.signature = [];
        m.FreeConic.initialize = function(a1) {
            var b = a1.pos ? m._helper.inputConic(a1.pos) : g.zeromatrix(l.real(3), l.real(3));
            m.FreeConic.putParamToState(a1, b);
        };
        m.FreeConic.getParamForInput = function(a1, b, c) {
            return g.normalizeMax(b);
        };
        m.FreeConic.getParamFromState = function(a1) {
            return m._helper.buildConicMatrix(ha(6).value);
        };
        m.FreeConic.putParamToState = function(a1, b) {
            for(a1 = 0; 3 > a1; ++a1)for(var e = 0; e <= a1; ++e)wb(b.value[a1].value[e]);
        };
        m.FreeConic.updatePosition = function(a1) {
            var b = ha(6);
            ea(b);
            a1.matrix = m._helper.buildConicMatrix(b.value);
            a1.matrix = g.normalizeMax(a1.matrix);
            a1.matrix = u.withUsage(a1.matrix, "Conic");
        };
        m.FreeConic.set_matrix = function(a1, b) {
            g._helper.isNumberMatrixMN(b, 3, 3) && Ta(a1, g.add(b, g.transpose(b)), "matrix");
        };
        m.FreeConic.stateSize = 12;
        m._helper.buildConicMatrix = function(a1) {
            var b = a1[1], c = a1[2], d = a1[3], f = a1[4], h = a1[5];
            return g.turnIntoCSList([
                g.turnIntoCSList([
                    a1[0],
                    b,
                    d
                ]),
                g.turnIntoCSList([
                    b,
                    c,
                    f
                ]),
                g.turnIntoCSList([
                    d,
                    f,
                    h
                ])
            ]);
        };
        m._helper.flattenConicMatrix = function(a1) {
            return g.turnIntoCSList([
                a1.value[0].value[0],
                a1.value[0].value[1],
                a1.value[1].value[1],
                a1.value[0].value[2],
                a1.value[1].value[2],
                a1.value[2].value[2]
            ]);
        };
        m._helper.splitDegenConic = function(a1) {
            var b = g.adjoint3(a1), c = 0, d, f = l.abs2(b.value[0].value[0]).value.real;
            for(d = 1; 3 > d; d++){
                var h = l.abs2(b.value[d].value[d]).value.real;
                h > f && (c = d, f = h);
            }
            d = l.sqrt(l.mult(l.real(-1), b.value[c].value[c]));
            if (1E-16 > l.abs2(d).value.real) return a1 = g.turnIntoCSList([
                l.zero,
                l.zero,
                l.zero
            ]), [
                a1,
                a1
            ];
            c = l.real(c + 1);
            h = g.column(b, c);
            h = g.scaldiv(d, h);
            d = h.value[0];
            f = h.value[1];
            h = h.value[2];
            d = g.turnIntoCSList([
                g.turnIntoCSList([
                    l.real(0),
                    h,
                    l.mult(l.real(-1), f)
                ]),
                g.turnIntoCSList([
                    l.mult(l.real(-1), h),
                    l.real(0),
                    d
                ]),
                g.turnIntoCSList([
                    f,
                    l.mult(l.real(-1), d),
                    l.real(0)
                ])
            ]);
            a1 = g.add(a1, d);
            var k = 0;
            for(d = f = b = 0; 3 > d; d++)for(c = 0; 3 > c; c++)h = l.abs2(a1.value[d].value[c]).value.real, h > f && (k = d, b = c, f = h);
            d = a1.value[k];
            a1 = g.transpose(a1);
            a1 = a1.value[b];
            d = g.normalizeMax(d);
            a1 = g.normalizeMax(a1);
            d = u.withUsage(d, "Line");
            a1 = u.withUsage(a1, "Line");
            return [
                d,
                a1
            ];
        };
        m._helper.inputConic = function(a1) {
            var b = "xx xy yy xz yz zz".split(" ").map(function(b) {
                var e = l._helper.input(a1[b]);
                b[0] !== b[1] && (e = l.realmult(.5, e));
                return e;
            });
            return m._helper.buildConicMatrix(b);
        };
        m.SelectConic = {};
        m.SelectConic.kind = "C";
        m.SelectConic.signature = [
            "Cs"
        ];
        m.SelectConic.initialize = function(a1) {
            if (void 0 !== a1.index) return a1.index - 1;
            var b = m._helper.inputConic(a1.pos);
            a1 = r.csnames[a1.args[0]].results;
            for(var c = g.conicDist(b, a1[0]), d = 0, f = 1; f < a1.length; ++f){
                var h = g.conicDist(b, a1[f]);
                h < c && (c = h, d = f);
            }
            return d;
        };
        m.SelectConic.updatePosition = function(a1) {
            a1.matrix = r.csnames[a1.args[0]].results[a1.param];
            a1.matrix = g.normalizeMax(a1.matrix);
            a1.matrix = u.withUsage(a1.matrix, "Conic");
        };
        m._helper.ConicBy4p1l = function(a1, b, c, d, f, h) {
            var e = g.scalproduct(b, h), k = g.scalproduct(c, h), n = g.scalproduct(d, h), x = g.scalproduct(f, h), v = g.det3(c, d, f), p = g.det3(b, c, f), q = g.det3(b, d, f), r = g.det3(b, c, d), t = l.mult;
            k = l.sqrt(t(t(k, x), t(v, p)));
            e = l.sqrt(t(t(e, n), t(q, r)));
            n = g.cross(g.cross(b, d), h);
            h = g.cross(g.cross(c, f), h);
            n = g.scalmult(k, n);
            e = g.scalmult(e, h);
            h = g.normalizeMax(g.add(n, e));
            e = g.normalizeMax(g.sub(n, e));
            e = mb(h, e);
            h = m._helper.ConicBy5(a1, b, c, d, f, e.value[0]);
            a1 = m._helper.ConicBy5(a1, b, c, d, f, e.value[1]);
            return [
                g.normalizeMax(h),
                g.normalizeMax(a1)
            ];
        };
        m.ConicBy4p1l = {};
        m.ConicBy4p1l.kind = "Cs";
        m.ConicBy4p1l.signature = [
            "P",
            "P",
            "P",
            "P",
            "L"
        ];
        m.ConicBy4p1l.updatePosition = function(a1) {
            var b = m._helper.ConicBy4p1l(a1, r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog);
            a1.results = b;
        };
        m.ConicBy4p1l.stateSize = mb.stateSize;
        m._helper.ConicBy3p2l = function(a1, b, c, d, f) {
            function e(a1, b, e, c) {
                return l.sub(l.mult(a1, c), l.mult(b, e));
            }
            var h = g.cross(a1, b), k = g.cross(d, f);
            d = g.cross(d, h);
            f = g.cross(f, h);
            h = g.turnIntoCSList([
                d,
                f,
                k
            ]);
            c = g.productVM(c, g.adjoint3(h));
            k = g.adjoint3(g.turnIntoCSList([
                g.scalmult(c.value[0], d),
                g.scalmult(c.value[1], f),
                g.scalmult(c.value[2], k)
            ]));
            c = g.transpose(k);
            d = l.mult;
            f = g.productMV(c, a1);
            a1 = f.value[0];
            f = f.value[1];
            h = g.productMV(c, b);
            b = h.value[0];
            h = h.value[1];
            var m = l.sqrt(d(a1, f)), n = l.sqrt(d(b, h)), x, v = Array(4);
            for(x = 0; 4 > x; ++x){
                var p = (x & 2) - 1, q = d(l.real(((x & 1) << 1) - 1), m), r = d(l.real(p), n), t = e(f, q, h, r), u = e(b, r, a1, q);
                p = e(a1, f, b, h);
                var N = l.add(l.add(e(b, h, a1, f), e(h, r, f, q)), e(r, b, q, a1));
                q = d(t, t);
                r = d(u, u);
                var w = d(N, N), y = d(t, u);
                t = d(t, N);
                u = d(u, N);
                y = l.sub(y, d(l.real(.5), d(p, p)));
                p = g.turnIntoCSList([
                    g.turnIntoCSList([
                        q,
                        y,
                        t
                    ]),
                    g.turnIntoCSList([
                        y,
                        r,
                        u
                    ]),
                    g.turnIntoCSList([
                        t,
                        u,
                        w
                    ])
                ]);
                p = g.productMM(k, g.productMM(p, c));
                p = g.turnIntoCSList([
                    p.value[0].value[0],
                    p.value[0].value[1],
                    p.value[0].value[2],
                    p.value[1].value[1],
                    p.value[1].value[2],
                    p.value[2].value[2]
                ]);
                v[x] = p;
            }
            return v;
        };
        m.ConicBy3p2l = {};
        m.ConicBy3p2l.kind = "Cs";
        m.ConicBy3p2l.signature = [
            "P",
            "P",
            "P",
            "L",
            "L"
        ];
        m.ConicBy3p2l.updatePosition = function(a1) {
            var b = m._helper.ConicBy3p2l(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog);
            b = be(b);
            for(var c = Array(4), d = 0; 4 > d; ++d){
                var f = b[d].value;
                c[d] = g.turnIntoCSList([
                    g.turnIntoCSList([
                        f[0],
                        f[1],
                        f[2]
                    ]),
                    g.turnIntoCSList([
                        f[1],
                        f[3],
                        f[4]
                    ]),
                    g.turnIntoCSList([
                        f[2],
                        f[4],
                        f[5]
                    ])
                ]);
            }
            a1.results = c;
        };
        m.ConicBy3p2l.stateSize = 48;
        m.ConicBy2p3l = {};
        m.ConicBy2p3l.kind = "Cs";
        m.ConicBy2p3l.signature = [
            "P",
            "P",
            "L",
            "L",
            "L"
        ];
        m.ConicBy2p3l.updatePosition = function(a1) {
            var b = m._helper.ConicBy3p2l(r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog, r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog);
            b = be(b);
            for(var c = Array(4), d = 0; 4 > d; ++d){
                var f = b[d].value;
                f = g.turnIntoCSList([
                    g.turnIntoCSList([
                        f[0],
                        f[1],
                        f[2]
                    ]),
                    g.turnIntoCSList([
                        f[1],
                        f[3],
                        f[4]
                    ]),
                    g.turnIntoCSList([
                        f[2],
                        f[4],
                        f[5]
                    ])
                ]);
                c[d] = g.normalizeMax(g.adjoint3(f));
            }
            a1.results = c;
        };
        m.ConicBy2p3l.stateSize = 48;
        m.ConicBy1p4l = {};
        m.ConicBy1p4l.kind = "Cs";
        m.ConicBy1p4l.signature = [
            "P",
            "L",
            "L",
            "L",
            "L"
        ];
        m.ConicBy1p4l.updatePosition = function(a1) {
            var b = m._helper.ConicBy4p1l(a1, r.csnames[a1.args[1]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog, r.csnames[a1.args[0]].homog), c = b[0];
            b = b[1];
            c = g.adjoint3(c);
            b = g.adjoint3(b);
            b = [
                c,
                b
            ];
            a1.results = b;
        };
        m.ConicBy1p4l.stateSize = mb.stateSize;
        m.ConicParabolaPL = {};
        m.ConicParabolaPL.kind = "C";
        m.ConicParabolaPL.signature = [
            "P",
            "L"
        ];
        m.ConicParabolaPL.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog.value, c = r.csnames[a1.args[1]].homog.value, d = l.mult, f = l.neg, h = l.add, k = l.sub, n = b[0], p = b[1], q = b[2], t = c[0];
            b = c[1];
            c = c[2];
            var w = d(q, q), y = d(t, t), z = d(b, b), A = d(q, c), B = f(q);
            q = h(y, z);
            z = d(w, z);
            y = d(w, y);
            f = d(f(w), d(t, b));
            t = d(B, h(d(n, q), d(A, t)));
            b = d(B, h(d(p, q), d(A, b)));
            d = k(d(h(d(n, n), d(p, p)), q), d(w, d(c, c)));
            d = m._helper.buildConicMatrix([
                z,
                f,
                y,
                t,
                b,
                d
            ]);
            d = g.normalizeMax(d);
            a1.matrix = u.withUsage(d, "Conic");
        };
        m.ConicBy2Foci1P = {};
        m.ConicBy2Foci1P.kind = "Cs";
        m.ConicBy2Foci1P.signature = [
            "P",
            "P",
            "P"
        ];
        m.ConicBy2Foci1P.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = g.ii, h = g.jj, k = g.normalizeMax(g.cross(b, d)), n = g.normalizeMax(g.cross(c, d)), p = g.normalizeMax(g.cross(d, f));
            d = g.normalizeMax(g.cross(d, h));
            n = m._helper.coHarmonic(p, d, k, n);
            k = g.normalizeMax(n[0]);
            n = g.normalizeMax(n[1]);
            f = g.turnIntoCSList([
                f
            ]);
            p = g.turnIntoCSList([
                h
            ]);
            d = g.turnIntoCSList([
                b
            ]);
            var q = g.turnIntoCSList([
                c
            ]);
            h = m._helper.conicFromTwoDegenerates(f, p, d, q, k);
            h = g.normalizeMax(h);
            f = m._helper.conicFromTwoDegenerates(f, p, d, q, n);
            f = g.normalizeMax(f);
            h = g.normalizeMax(g.adjoint3(h));
            f = g.normalizeMax(g.adjoint3(f));
            "ellipsoid" !== m._helper.getConicType(h) && (k = h, h = f, f = k);
            g.almostequals(b, c).value && (b = l.real(3), f = g.zeromatrix(b, b));
            a1.results = [
                h,
                f
            ];
        };
        m.ConicBy2Pol1P = {};
        m.ConicBy2Pol1P.kind = "C";
        m.ConicBy2Pol1P.signature = [
            "P",
            "L",
            "P",
            "L",
            "P"
        ];
        m.ConicBy2Pol1P.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = r.csnames[a1.args[3]].homog, h = r.csnames[a1.args[4]].homog, k = g.scalproduct, m = g.scalmult, n = g.sub, p = g.productMM, q = l.realmult, t = g.transpose, w = g.turnIntoCSList, y = n(m(k(c, b), h), m(q(2, k(c, h)), b)), z = n(m(k(f, d), h), m(q(2, k(f, h)), d)), A = w([
                g.cross(b, h)
            ]);
            h = w([
                g.cross(d, h)
            ]);
            z = p(t(A), w([
                g.cross(b, z)
            ]));
            w = p(t(h), w([
                g.cross(d, y)
            ]));
            p = p(t(A), h);
            b = k(b, f);
            c = k(d, c);
            d = g.add(m(c, z), m(b, w));
            d = n(d, m(q(2, l.mult(b, c)), p));
            d = g.add(d, t(d));
            d = g.normalizeMax(d);
            d = u.withUsage(d, "Conic");
            a1.matrix = d;
        };
        m.ConicBy2Pol1L = {};
        m.ConicBy2Pol1L.kind = "C";
        m.ConicBy2Pol1L.signature = [
            "P",
            "L",
            "P",
            "L",
            "L"
        ];
        m.ConicBy2Pol1L.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = r.csnames[a1.args[3]].homog, h = r.csnames[a1.args[4]].homog, k = g.scalproduct, m = g.scalmult, n = g.productMM, p = l.mult, q = g.transpose, t = g.turnIntoCSList, w = k(c, b), y = k(c, d), z = k(f, b), A = k(f, d), B = k(h, b);
            k = k(h, d);
            var C = t([
                g.sub(m(p(z, k), c), m(p(y, B), f))
            ]);
            b = g.add(n(q(t([
                m(p(z, y), h)
            ])), t([
                g.sub(g.add(m(l.sub(p(w, k), p(y, B)), f), m(l.sub(p(A, B), p(z, k)), c)), m(g.det3(c, f, h), g.cross(b, d)))
            ])), n(q(C), C));
            b = g.add(b, q(b));
            b = g.normalizeMax(b);
            b = u.withUsage(b, "Conic");
            a1.matrix = b;
        };
        m._helper.conic1Pol3Inc = function(a1, b, c, d, f) {
            var e = g.scalproduct, h = g.scalmult, k = g.productMM, m = g.cross, n = l.realmult, x = l.mult, p = g.transpose, v = g.turnIntoCSList, q = g.det3, r = q(a1, c, d), t = v([
                m(c, f)
            ]), u = v([
                m(a1, f)
            ]), w = v([
                m(c, d)
            ]), y = e(b, a1), z = e(b, c);
            b = e(b, f);
            m = v([
                m(d, g.sub(h(y, f), h(n(2, b), a1)))
            ]);
            t = h(r, k(p(t), m));
            a1 = n(2, l.add(x(q(a1, d, f), z), x(r, b)));
            a1 = l.sub(x(q(c, d, f), y), a1);
            t = g.add(t, h(a1, k(p(u), w)));
            t = g.add(t, p(t));
            return t = g.normalizeMax(t);
        };
        m.ConicBy1Pol3P = {};
        m.ConicBy1Pol3P.kind = "C";
        m.ConicBy1Pol3P.signature = [
            "P",
            "L",
            "P",
            "P",
            "P"
        ];
        m.ConicBy1Pol3P.updatePosition = function(a1) {
            var b = m._helper.conic1Pol3Inc(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog);
            b = u.withUsage(b, "Conic");
            a1.matrix = b;
        };
        m.ConicBy1Pol3L = {};
        m.ConicBy1Pol3L.kind = "C";
        m.ConicBy1Pol3L.signature = [
            "P",
            "L",
            "L",
            "L",
            "L"
        ];
        m.ConicBy1Pol3L.updatePosition = function(a1) {
            var b = m._helper.conic1Pol3Inc(r.csnames[a1.args[1]].homog, r.csnames[a1.args[0]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog);
            b = g.normalizeMax(g.adjoint3(b));
            b = u.withUsage(b, "Conic");
            a1.matrix = b;
        };
        m.ConicBy1Pol2P1L = {};
        m.ConicBy1Pol2P1L.kind = "Cs";
        m.ConicBy1Pol2P1L.signature = [
            "P",
            "L",
            "P",
            "P",
            "L"
        ];
        m.ConicBy1Pol2P1L.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = r.csnames[a1.args[3]].homog, h = r.csnames[a1.args[4]].homog, k = l.add, m = g.turnIntoCSList, n = g.cross, p = g.productMM, q = l.mult, t = l.realmult, u = g.scalmult, w = g.scalproduct, y = l.sub, z = g.transpose, A = w(c, b), B = w(c, d), C = w(c, f);
            c = w(h, b);
            var D = w(h, d);
            w = w(h, f);
            h = m([
                n(b, d)
            ]);
            b = m([
                n(b, f)
            ]);
            d = m([
                n(d, f)
            ]);
            f = l.sqrt(q(q(D, w), q(y(q(A, D), t(2, q(c, B))), y(q(A, w), t(2, q(c, C))))));
            m = p(z(h), b);
            f = u(f, g.add(m, z(m)));
            k = u(y(q(A, q(D, w)), k(q(c, q(B, w)), q(c, q(D, C)))), m);
            t = g.add(g.sub(u(C, h), u(B, b)), u(t(.5, A), d));
            k = g.add(k, u(q(c, c), p(z(d), t)));
            k = g.add(k, z(k));
            p = g.normalizeMax(g.add(f, k));
            q = g.normalizeMax(g.sub(f, k));
            a1.results = vc(p, q).value;
        };
        m.ConicBy1Pol2P1L.stateSize = vc.stateSize;
        m.ConicBy1Pol1P2L = {};
        m.ConicBy1Pol1P2L.kind = "Cs";
        m.ConicBy1Pol1P2L.signature = [
            "P",
            "L",
            "P",
            "L",
            "L"
        ];
        m.ConicBy1Pol1P2L.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = r.csnames[a1.args[3]].homog, h = r.csnames[a1.args[4]].homog, k = l.add, m = g.turnIntoCSList, n = g.cross, p = g.productMM, q = l.mult, t = l.realmult, u = g.scalmult, w = g.scalproduct, y = l.sub, z = g.transpose, A = w(c, b), B = w(c, d), C = w(f, b), D = w(f, d), E = w(h, b), F = w(h, d), G = q(A, A), H = q(A, B);
            w = q(B, B);
            var I = q(C, C), J = q(C, D), K = q(D, D), L = q(E, E), M = q(E, F), P = q(F, F), O = q(q(G, K), P);
            O = y(O, t(2, q(q(H, J), P)));
            O = y(O, t(2, q(q(H, K), M)));
            O = k(O, t(.5, q(q(w, I), P)));
            O = k(O, t(3, q(q(w, J), M)));
            O = k(O, t(.5, q(q(w, K), L)));
            M = q(q(A, D), F);
            M = y(M, q(q(B, C), F));
            M = y(M, q(q(B, D), E));
            M = q(M, q(w, E));
            P = y(q(A, D), t(2, q(B, C)));
            P = q(P, q(w, q(D, E)));
            O = p(z(m([
                c
            ])), m([
                g.add(g.add(u(O, c), u(M, f)), u(P, h))
            ]));
            M = m([
                f
            ]);
            O = g.add(O, u(t(.5, q(q(w, w), L)), p(z(M), M)));
            O = g.add(O, u(w, p(z(m([
                h
            ])), m([
                g.add(u(y(y(t(2, q(H, J)), q(G, K)), t(.5, q(w, I))), h), u(q(g.det3(c, f, h), y(q(A, D), q(B, C))), n(b, d)))
            ]))));
            O = g.add(O, z(O));
            b = l.sqrt(q(q(D, F), q(y(q(A, D), t(2, q(B, C))), y(q(A, F), t(2, q(B, E))))));
            c = p(z(m([
                c
            ])), m([
                g.sub(u(y(q(B, k(q(C, F), q(D, E))), q(A, q(D, F))), c), u(w, g.add(u(E, f), u(C, h))))
            ]));
            c = g.add(c, u(q(A, w), p(z(m([
                f
            ])), m([
                h
            ]))));
            c = u(b, c);
            c = g.add(c, z(c));
            f = g.normalizeMax(g.add(O, c));
            h = g.normalizeMax(g.sub(O, c));
            a1.results = vc(f, h).value;
        };
        m.ConicBy1Pol1P2L.stateSize = vc.stateSize;
        m._helper.coHarmonic = function(a1, b, c, d) {
            var e = g.realVector([
                100 * Math.random(),
                100 * Math.random(),
                1
            ]), f = g.det3(e, c, a1), h = g.det3(e, c, b);
            c = g.det3(e, d, a1);
            d = g.det3(e, d, b);
            d = l.sqrt(l.mult(d, h));
            f = l.sqrt(l.mult(c, f));
            a1 = u.mult(a1, d);
            f = u.mult(b, f);
            b = g.add(a1, f);
            a1 = g.sub(a1, f);
            return [
                b,
                a1
            ];
        };
        m.ConicInSquare = {};
        m.ConicInSquare.kind = "C";
        m.ConicInSquare.signature = [
            "P",
            "P",
            "P",
            "P"
        ];
        m.ConicInSquare.updatePosition = function(a1) {
            var b = E.basismap(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog), c = l.one;
            c = m._helper.buildConicMatrix([
                c,
                c,
                c,
                l.real(-3),
                c,
                c
            ]);
            b = g.adjoint3(b);
            b = g.productMM(g.productMM(g.transpose(b), c), b);
            b = g.normalizeMax(b);
            a1.matrix = u.withUsage(b, "Conic");
        };
        m.ConicBy5lines = {};
        m.ConicBy5lines.kind = "C";
        m.ConicBy5lines.signature = [
            "L",
            "L",
            "L",
            "L",
            "L"
        ];
        m.ConicBy5lines.updatePosition = function(a1) {
            var b = m._helper.ConicBy5(a1, r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[4]].homog);
            b = g.adjoint3(b);
            a1.matrix = b;
            a1.matrix = g.normalizeMax(a1.matrix);
            a1.matrix = u.withUsage(a1.matrix, "Conic");
        };
        m.ConicFromPrincipalDirections = {};
        m.ConicFromPrincipalDirections.kind = "C";
        m.ConicFromPrincipalDirections.signature = [
            "P",
            "P",
            "P"
        ];
        m.ConicFromPrincipalDirections.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = m._helper.pointReflection(b, c), h = g.cross(c, b);
            b = g.turnIntoCSList([
                h.value[0],
                h.value[1],
                l.zero
            ]);
            h = g.turnIntoCSList([
                h
            ]);
            c = g.turnIntoCSList([
                g.cross(c, b)
            ]);
            f = g.turnIntoCSList([
                g.cross(f, b)
            ]);
            a1.matrix = m._helper.conicFromTwoDegenerates(h, h, c, f, d);
            a1.matrix = g.normalizeMax(a1.matrix);
            a1.matrix = u.withUsage(a1.matrix, "Conic");
        };
        m.CircleBy3 = {};
        m.CircleBy3.kind = "C";
        m.CircleBy3.signature = [
            "P",
            "P",
            "P"
        ];
        m.CircleBy3.updatePosition = function(a1) {
            var b = m._helper.ConicBy5(a1, r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].homog, g.ii, g.jj, r.csnames[a1.args[2]].homog);
            a1.matrix = g.normalizeMax(b);
            a1.matrix = u.withUsage(a1.matrix, "Circle");
        };
        m.ArcBy3 = {};
        m.ArcBy3.kind = "C";
        m.ArcBy3.signature = [
            "P",
            "P",
            "P"
        ];
        m.ArcBy3.updatePosition = function(a1) {
            m.CircleBy3.updatePosition(a1);
            a1.startPoint = r.csnames[a1.args[0]].homog;
            a1.viaPoint = r.csnames[a1.args[1]].homog;
            a1.endPoint = r.csnames[a1.args[2]].homog;
        };
        m.ArcBy3.initialize = function(a1) {
            a1.startPoint = r.csnames[a1.args[0]].homog;
            a1.viaPoint = r.csnames[a1.args[1]].homog;
            a1.endPoint = r.csnames[a1.args[2]].homog;
            a1.isArc = !0;
        };
        m.PolarOfPoint = {};
        m.PolarOfPoint.kind = "L";
        m.PolarOfPoint.signature = [
            "P",
            "C"
        ];
        m.PolarOfPoint.updatePosition = function(a1) {
            var b = u.mult(r.csnames[a1.args[1]].matrix, r.csnames[a1.args[0]].homog);
            b = g.normalizeMax(b);
            a1.homog = u.withUsage(b, "Line");
        };
        m.PolarOfLine = {};
        m.PolarOfLine.kind = "P";
        m.PolarOfLine.signature = [
            "L",
            "C"
        ];
        m.PolarOfLine.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = g.adjoint3(r.csnames[a1.args[1]].matrix);
            b = u.mult(c, b.homog);
            b = g.normalizeMax(b);
            a1.homog = u.withUsage(b, "Point");
        };
        m.AngleBisector = {};
        m.AngleBisector.kind = "Ls";
        m.AngleBisector.signature = [
            "L",
            "L",
            "P"
        ];
        m.AngleBisector.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = r.csnames[a1.args[2]].homog, f = g.add, h = g.sub, k = g.abs, l = g.cross, m = g.scalmult, n = g.normalizeMax, p = g._helper.isAlmostZero, q = g.linfty, t = m(k(l(l(q, c), q)), b);
            b = m(k(l(l(q, b), q)), c);
            h = h(t, b);
            f = f(t, b);
            p(h) && (h = l(l(l(q, f), q), d));
            p(f) && (f = l(l(l(q, h), q), d));
            a1.results = mb(n(h), n(f));
        };
        m.AngleBisector.stateSize = mb.stateSize;
        m._helper.IntersectLC = function(a1, b) {
            var c = l, e = g.crossOperator(a1), d = g.transpose(e);
            b = u.mult(d, u.mult(b, e));
            d = g.maxIndex(a1, l.abs2);
            if (0 === d) {
                d = b.value[1].value[1];
                var f = b.value[1].value[2];
                var h = b.value[2].value[1];
                var k = b.value[2].value[2];
                a1 = a1.value[0];
            } else 1 === d ? (d = b.value[0].value[0], f = b.value[0].value[2], h = b.value[2].value[0], k = b.value[2].value[2], a1 = a1.value[1]) : (d = b.value[0].value[0], f = b.value[0].value[1], h = b.value[1].value[0], k = b.value[1].value[1], a1 = a1.value[2]);
            c = c.div(c.sqrt(c.sub(c.mult(f, h), c.mult(d, k))), a1);
            c = g.add(b, g.scalmult(c, e));
            d = g.maxIndex(c, g.abs2);
            e = c.value[d];
            e = g.normalizeMax(e);
            e = u.withUsage(e, "Point");
            c = g.transpose(c);
            d = g.maxIndex(c, g.abs2);
            c = c.value[d];
            c = g.normalizeMax(c);
            c = u.withUsage(c, "Point");
            return [
                e,
                c
            ];
        };
        m.IntersectLC = {};
        m.IntersectLC.kind = "Ps";
        m.IntersectLC.signature = [
            "L",
            "C"
        ];
        m.IntersectLC.updatePosition = function(a1) {
            var b = m._helper.IntersectLC(r.csnames[a1.args[0]].homog, r.csnames[a1.args[1]].matrix);
            a1.results = mb(b[0], b[1]);
        };
        m.IntersectLC.stateSize = mb.stateSize;
        m.OtherIntersectionCL = {};
        m.OtherIntersectionCL.kind = "P";
        m.OtherIntersectionCL.signature = [
            "C",
            "L",
            "P"
        ];
        m.OtherIntersectionCL.updatePosition = function(a1) {
            var b = r.csnames[a1.args[2]].homog, c = m._helper.IntersectLC(r.csnames[a1.args[1]].homog, r.csnames[a1.args[0]].matrix), d = c[0];
            c = c[1];
            var f = g.projectiveDistMinScal(d, b);
            b = g.projectiveDistMinScal(c, b);
            a1.homog = f < b ? c : d;
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Point");
        };
        m.IntersectCirCir = {};
        m.IntersectCirCir.kind = "Ps";
        m.IntersectCirCir.signature = [
            "C",
            "C"
        ];
        m.IntersectCirCir.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].matrix, c = r.csnames[a1.args[1]].matrix, d = g.scalmult(c.value[0].value[0], b.value[2]);
            c = g.scalmult(b.value[0].value[0], c.value[2]);
            d = g.sub(d, c);
            d = g.turnIntoCSList([
                d.value[0],
                d.value[1],
                l.realmult(.5, d.value[2])
            ]);
            d = g.normalizeMax(d);
            b = m._helper.IntersectLC(d, b);
            a1.results = mb(b[0], b[1]);
        };
        m.IntersectCirCir.stateSize = mb.stateSize;
        m.OtherIntersectionCC = {};
        m.OtherIntersectionCC.kind = "P";
        m.OtherIntersectionCC.signature = [
            "C",
            "C",
            "P"
        ];
        m.OtherIntersectionCC.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].matrix, c = r.csnames[a1.args[1]].matrix, d = r.csnames[a1.args[2]].homog, f = g.scalmult(c.value[0].value[0], b.value[2]);
            c = g.scalmult(b.value[0].value[0], c.value[2]);
            f = g.sub(f, c);
            f = g.turnIntoCSList([
                f.value[0],
                f.value[1],
                l.realmult(.5, f.value[2])
            ]);
            f = g.normalizeMax(f);
            f = m._helper.IntersectLC(f, b);
            b = f[0];
            f = f[1];
            c = g.projectiveDistMinScal(b, d);
            d = g.projectiveDistMinScal(f, d);
            a1.homog = c < d ? f : b;
            a1.homog = g.normalizeMax(a1.homog);
            a1.homog = u.withUsage(a1.homog, "Point");
        };
        m._helper.IntersectConicConic = function(a1, b) {
            var c = a1.value[0], e = a1.value[1], d = a1.value[2], f = b.value[0], h = b.value[1], k = b.value[2], n = g.det3(c, e, d), p = l.add(l.add(g.det3(c, e, k), g.det3(c, h, d)), g.det3(f, e, d));
            c = l.add(l.add(g.det3(c, h, k), g.det3(f, e, k)), g.det3(f, h, d));
            f = g.det3(f, h, k);
            k = l.abs2(n).value.real;
            h = l.abs2(f).value.real;
            k < h && (k = a1, a1 = b, b = k, k = f, f = n, n = k, k = c, c = p, p = k, k = h);
            1E-24 > k ? (n = a1, p = b) : (p = l.solveCubic(n, p, c, f), c = l.abs2(l.sub(p[0], p[1])).value.real, f = l.abs2(l.sub(p[0], p[2])).value.real, h = l.abs2(l.sub(p[1], p[2])).value.real, c > f ? (n = p[1], p = c > h ? p[0] : p[2]) : (n = p[2], p = f > h ? p[0] : p[1]), n = g.add(g.scalmult(n, a1), b), p = g.add(g.scalmult(p, a1), b));
            b = m._helper.splitDegenConic(n);
            a1 = b[0];
            b = b[1];
            n = m._helper.splitDegenConic(p);
            c = n[0];
            p = n[1];
            n = g.cross(a1, c);
            c = g.cross(b, c);
            a1 = g.cross(a1, p);
            b = g.cross(b, p);
            n = g.normalizeMax(n);
            c = g.normalizeMax(c);
            a1 = g.normalizeMax(a1);
            b = g.normalizeMax(b);
            n = u.withUsage(n, "Point");
            c = u.withUsage(c, "Point");
            a1 = u.withUsage(a1, "Point");
            b = u.withUsage(b, "Point");
            return [
                n,
                c,
                a1,
                b
            ];
        };
        m.IntersectConicConic = {};
        m.IntersectConicConic.kind = "Ps";
        m.IntersectConicConic.signature = [
            "C",
            "C"
        ];
        m.IntersectConicConic.updatePosition = function(a1) {
            var b = m._helper.IntersectConicConic(r.csnames[a1.args[0]].matrix, r.csnames[a1.args[1]].matrix);
            b = rd(b[0], b[1], b[2], b[3]);
            a1.results = b;
        };
        m.IntersectConicConic.stateSize = rd.stateSize;
        m.SelectP = {};
        m.SelectP.kind = "P";
        m.SelectP.signature = [
            "Ps"
        ];
        m.SelectP.initialize = function(a1) {
            if (void 0 !== a1.index) return a1.index - 1;
            var b = r.csnames[a1.args[0]].results.value;
            a1 = m._helper.initializePoint(a1);
            for(var c = g.projectiveDistMinScal(a1, b[0]), d = 0, f = 1; f < b.length; ++f){
                var h = g.projectiveDistMinScal(a1, b[f]);
                h < c && (c = h, d = f);
            }
            return d;
        };
        m.SelectP.updatePosition = function(a1) {
            a1.homog = r.csnames[a1.args[0]].results.value[a1.param];
        };
        m.SelectL = {};
        m.SelectL.kind = "L";
        m.SelectL.signature = [
            "Ls"
        ];
        m.SelectL.initialize = function(a1) {
            if (void 0 !== a1.index) return a1.index - 1;
            var b = r.csnames[a1.args[0]].results.value;
            a1 = m._helper.initializeLine(a1);
            for(var c = g.projectiveDistMinScal(a1, b[0]), d = 0, f = 1; f < b.length; ++f){
                var h = g.projectiveDistMinScal(a1, b[f]);
                h < c && (c = h, d = f);
            }
            return d;
        };
        m.SelectL.updatePosition = function(a1) {
            a1.homog = r.csnames[a1.args[0]].results.value[a1.param];
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m._helper.moebiusStep = function(a1, b, c) {
            var e = l.add, d = l.sub, f = l.mult, g = a1.value[0], h = a1.value[1];
            a1 = a1.value[2];
            var k = b.value[0], m = b.value[1];
            b = b.value[2];
            var n = c.value[0], p = c.value[1], x = c.value[2];
            c = d(f(b, n), f(k, x));
            var q = d(f(b, p), f(m, x));
            n = d(f(g, x), f(a1, n));
            p = d(f(h, x), f(a1, p));
            return [
                d(f(g, c), f(h, q)),
                e(f(h, c), f(g, q)),
                f(a1, c),
                f(a1, q),
                d(f(k, n), f(m, p)),
                e(f(m, n), f(k, p)),
                f(b, n),
                f(b, p)
            ];
        };
        m.TrMoebius = {};
        m.TrMoebius.kind = "Mt";
        m.TrMoebius.signature = "PPPPPP".split("");
        m.TrMoebius.updatePosition = function(a1) {
            var b = l.neg, c = m._helper.moebiusStep(r.csnames[a1.args[0]].homog, r.csnames[a1.args[2]].homog, r.csnames[a1.args[4]].homog), d = m._helper.moebiusStep(r.csnames[a1.args[1]].homog, r.csnames[a1.args[3]].homog, r.csnames[a1.args[5]].homog);
            d = g.normalizeMax(g.matrix([
                [
                    d[0],
                    b(d[1]),
                    d[4],
                    b(d[5])
                ],
                [
                    d[1],
                    d[0],
                    d[5],
                    d[4]
                ],
                [
                    d[2],
                    b(d[3]),
                    d[6],
                    b(d[7])
                ],
                [
                    d[3],
                    d[2],
                    d[7],
                    d[6]
                ]
            ]));
            b = g.normalizeMax(g.matrix([
                [
                    c[6],
                    b(c[4])
                ],
                [
                    c[7],
                    b(c[5])
                ],
                [
                    b(c[2]),
                    c[0]
                ],
                [
                    b(c[3]),
                    c[1]
                ]
            ]));
            b = g.normalizeMax(g.productMM(d, b));
            a1.moebius = {
                anti: !1,
                ar: b.value[0].value[0],
                ai: b.value[1].value[0],
                br: b.value[0].value[1],
                bi: b.value[1].value[1],
                cr: b.value[2].value[0],
                ci: b.value[3].value[0],
                dr: b.value[2].value[1],
                di: b.value[3].value[1]
            };
            m._helper.moebiusPair(a1);
        };
        m._helper.moebiusPair = function(a1) {
            var b = a1.moebius, c = l.neg, d = b.anti ? c : u.identity;
            b = g.normalizeMax(g.turnIntoCSList([
                g.matrix([
                    [
                        c(b.cr),
                        d(b.ci),
                        c(b.dr)
                    ],
                    [
                        b.ci,
                        d(b.cr),
                        b.di
                    ],
                    [
                        b.ar,
                        c(d(b.ai)),
                        b.br
                    ]
                ]),
                g.matrix([
                    [
                        c(b.ci),
                        c(d(b.cr)),
                        c(b.di)
                    ],
                    [
                        c(b.cr),
                        d(b.ci),
                        c(b.dr)
                    ],
                    [
                        b.ai,
                        d(b.ar),
                        b.bi
                    ]
                ])
            ]));
            a1.mat1 = b.value[0];
            a1.mat2 = b.value[1];
        };
        m._helper.inverseMoebius = function(a1) {
            var b = l.neg, c = a1.anti ? b : u.identity;
            return {
                anti: a1.anti,
                ar: a1.dr,
                ai: c(a1.di),
                br: b(a1.br),
                bi: b(c(a1.bi)),
                cr: b(a1.cr),
                ci: b(c(a1.ci)),
                dr: a1.ar,
                di: c(a1.ai)
            };
        };
        m.TrInverseMoebius = {};
        m.TrInverseMoebius.kind = "Mt";
        m.TrInverseMoebius.signature = [
            "Mt"
        ];
        m.TrInverseMoebius.updatePosition = function(a1) {
            a1.moebius = m._helper.inverseMoebius(r.csnames[a1.args[0]].moebius);
            m._helper.moebiusPair(a1);
        };
        m.TrMoebiusP = {};
        m.TrMoebiusP.kind = "P";
        m.TrMoebiusP.signature = [
            "Mt",
            "P"
        ];
        m.TrMoebiusP.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]].homog, d = g.productMV(b.mat1, c);
            b = g.productMV(b.mat2, c);
            a1.homog = g.normalizeMax(g.cross(d, b));
            a1.homog = u.withUsage(a1.homog, "Point");
        };
        m._helper.TrMoebiusP = function(a1, b) {
            var c = g.productMV(b.mat1, a1);
            a1 = g.productMV(b.mat2, a1);
            return g.normalizeMax(g.cross(c, a1));
        };
        m.TrMoebiusL = {};
        m.TrMoebiusL.kind = "C";
        m.TrMoebiusL.signature = [
            "Mt",
            "L"
        ];
        m.TrMoebiusL.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]].homog, d = function() {
                var a1 = g.realVector([
                    Math.random() - .5,
                    Math.random() - .5,
                    Math.random() - .5
                ]);
                return g.normalizeMax(a1);
            }, f = g.cross(d(), c), h = g.cross(d(), c);
            c = g.cross(d(), c);
            f = m._helper.TrMoebiusP(f, b);
            h = m._helper.TrMoebiusP(h, b);
            b = m._helper.TrMoebiusP(c, b);
            a1.matrix = g.normalizeMax(m._helper.ConicBy5(null, f, h, b, g.ii, g.jj));
            a1.matrix = u.withUsage(a1.matrix, "Circle");
        };
        m.TrMoebiusS = {};
        m.TrMoebiusS.kind = "C";
        m.TrMoebiusS.signature = [
            "Mt",
            "S"
        ];
        m.TrMoebiusS.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]], d = c.startpos;
            c = c.endpos;
            var f = g.add(d, c);
            d = m._helper.TrMoebiusP(d, b);
            f = m._helper.TrMoebiusP(f, b);
            b = m._helper.TrMoebiusP(c, b);
            a1.startPoint = d;
            a1.viaPoint = f;
            a1.endPoint = b;
            a1.isArc = !0;
            a1.matrix = g.normalizeMax(m._helper.ConicBy5(null, d, f, b, g.ii, g.jj));
            a1.matrix = u.withUsage(a1.matrix, "Circle");
        };
        m.TrMoebiusC = {};
        m.TrMoebiusC.kind = "C";
        m.TrMoebiusC.signature = [
            "Mt",
            "C"
        ];
        m.TrMoebiusC.signatureConstraints = function(a1) {
            return "Circle" === r.csnames[a1.args[1]].matrix.usage;
        };
        m.TrMoebiusC.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]].matrix, d = function() {
                var a1 = g.realVector([
                    Math.random() - .5,
                    Math.random() - .5,
                    Math.random() - .5
                ]);
                return g.normalizeMax(a1);
            }, f = m._helper.IntersectLC(d(), c);
            d = m._helper.IntersectLC(d(), c);
            c = f[1];
            d = d[1];
            f = m._helper.TrMoebiusP(f[0], b);
            c = m._helper.TrMoebiusP(c, b);
            b = m._helper.TrMoebiusP(d, b);
            a1.matrix = g.normalizeMax(m._helper.ConicBy5(null, f, c, b, g.ii, g.jj));
            a1.matrix = u.withUsage(a1.matrix, "Circle");
        };
        m.TrMoebiusArc = {};
        m.TrMoebiusArc.kind = "C";
        m.TrMoebiusArc.signature = [
            "Mt",
            "C"
        ];
        m.TrMoebiusArc.signatureConstraints = function(a1) {
            return r.csnames[a1.args[1]].isArc;
        };
        m.TrMoebiusArc.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]], d = c.viaPoint, f = c.endPoint;
            c = m._helper.TrMoebiusP(c.startPoint, b);
            d = m._helper.TrMoebiusP(d, b);
            b = m._helper.TrMoebiusP(f, b);
            a1.startPoint = c;
            a1.viaPoint = d;
            a1.endPoint = b;
            a1.isArc = !0;
            a1.matrix = g.normalizeMax(m._helper.ConicBy5(null, c, d, b, g.ii, g.jj));
            a1.matrix = u.withUsage(a1.matrix, "Circle");
        };
        m._helper.trBuildMatrix = function(a1, b) {
            var c = b(0);
            b = b(1);
            var e = g.productMM(b, g.adjoint3(c));
            a1.matrix = g.normalizeMax(e);
            e = g.transpose(g.productMM(c, g.adjoint3(b)));
            a1.dualMatrix = g.normalizeMax(e);
        };
        m.TrProjection = {};
        m.TrProjection.kind = "Tr";
        m.TrProjection.signature = "PPPPPPPP".split("");
        m.TrProjection.initialize = function(a1) {
            a1.isEuclidean = 0;
        };
        m.TrProjection.updatePosition = function(a1) {
            m._helper.trBuildMatrix(a1, function(b) {
                return E.basismap(r.csnames[a1.args[0 + b]].homog, r.csnames[a1.args[2 + b]].homog, r.csnames[a1.args[4 + b]].homog, r.csnames[a1.args[6 + b]].homog);
            });
        };
        m.TrAffine = {};
        m.TrAffine.kind = "Tr";
        m.TrAffine.signature = "PPPPPP".split("");
        m.TrAffine.initialize = function(a1) {
            a1.isEuclidean = 0;
        };
        m.TrAffine.updatePosition = function(a1) {
            var b = l.mult, c = g.scalmult, d = g.turnIntoCSList, f = g.transpose, h = g.normalizeMax, k = g.productMM, m = g.adjoint3, n = d([
                r.csnames[a1.args[0]].homog,
                r.csnames[a1.args[2]].homog,
                r.csnames[a1.args[4]].homog
            ]), p = d([
                r.csnames[a1.args[1]].homog,
                r.csnames[a1.args[3]].homog,
                r.csnames[a1.args[5]].homog
            ]), q = f(n);
            f = f(p);
            var t = q.value[2].value, u = f.value[2].value, w = [
                b(t[0], u[2]),
                b(t[1], u[0]),
                b(t[2], u[1])
            ];
            q = m(q).value;
            a1.matrix = h(k(f, d([
                c(b(w[0], u[1]), q[0]),
                c(b(w[1], u[2]), q[1]),
                c(b(w[2], u[0]), q[2])
            ])));
            q = n.value;
            a1.dualMatrix = h(k(m(p), d([
                c(b(t[2], w[1]), q[0]),
                c(b(t[0], w[2]), q[1]),
                c(b(t[1], w[0]), q[2])
            ])));
        };
        m.TrSimilarity = {};
        m.TrSimilarity.kind = "Tr";
        m.TrSimilarity.signature = [
            "P",
            "P",
            "P",
            "P"
        ];
        m.TrSimilarity.initialize = function(a1) {
            a1.isEuclidean = 1;
        };
        m.TrSimilarity.updatePosition = function(a1) {
            m._helper.trBuildMatrix(a1, function(b) {
                return E.basismap(r.csnames[a1.args[0 + b]].homog, r.csnames[a1.args[2 + b]].homog, g.ii, g.jj);
            });
        };
        m.TrTranslation = {};
        m.TrTranslation.kind = "Tr";
        m.TrTranslation.signature = [
            "P",
            "P"
        ];
        m.TrTranslation.initialize = function(a1) {
            a1.isEuclidean = 1;
        };
        m.TrTranslation.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog, c = r.csnames[a1.args[1]].homog, d = g.cross(b, c).value;
            b = l.mult(b.value[2], c.value[2]);
            c = g.turnIntoCSList;
            var f = l.neg, h = l.zero;
            d = c([
                c([
                    b,
                    h,
                    d[1]
                ]),
                c([
                    h,
                    b,
                    f(d[0])
                ]),
                c([
                    h,
                    h,
                    b
                ])
            ]);
            d = g.normalizeMax(d);
            a1.matrix = d;
            b = f(d.value[0].value[0]);
            d = c([
                c([
                    b,
                    h,
                    h
                ]),
                c([
                    h,
                    b,
                    h
                ]),
                c([
                    d.value[0].value[2],
                    d.value[1].value[2],
                    b
                ])
            ]);
            a1.dualMatrix = d;
        };
        m.TrRotationPNumb = {};
        m.TrRotationPNumb.kind = "Tr";
        m.TrRotationPNumb.signature = [
            "P",
            "V"
        ];
        m.TrRotationPNumb.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog.value, c = r.csnames[a1.args[1]].value, d = l.mult, f = l.add, h = l.sub, k = g.turnIntoCSList, m = g.normalizeMax, n = l.zero, p = b[0], q = b[1];
            b = b[2];
            var t = l.cos(c), u = l.sin(c), w = h(l.real(1), t);
            c = d(w, p);
            w = d(w, q);
            p = d(u, p);
            q = d(u, q);
            t = d(t, b);
            d = d(u, b);
            u = l.neg(d);
            a1.matrix = m(k([
                k([
                    t,
                    u,
                    f(c, q)
                ]),
                k([
                    d,
                    t,
                    h(w, p)
                ]),
                k([
                    n,
                    n,
                    b
                ])
            ]));
            a1.dualMatrix = m(k([
                k([
                    t,
                    u,
                    n
                ]),
                k([
                    d,
                    t,
                    n
                ]),
                k([
                    h(c, q),
                    f(w, p),
                    b
                ])
            ]));
        };
        m.TrReflectionP = {};
        m.TrReflectionP.kind = "Tr";
        m.TrReflectionP.signature = [
            "P"
        ];
        m.TrReflectionP.initialize = function(a1) {
            a1.isEuclidean = 1;
        };
        m.TrReflectionP.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].homog.value, c = l.realmult(-0.5, b[2]), d = l.zero;
            b = g.turnIntoCSList([
                g.turnIntoCSList([
                    c,
                    d,
                    b[0]
                ]),
                g.turnIntoCSList([
                    d,
                    c,
                    b[1]
                ]),
                g.turnIntoCSList([
                    d,
                    d,
                    l.neg(c)
                ])
            ]);
            b = g.normalizeMax(b);
            a1.matrix = b;
            a1.dualMatrix = g.transpose(b);
        };
        m.TrReflectionL = {};
        m.TrReflectionL.kind = "Tr";
        m.TrReflectionL.signature = [
            "L"
        ];
        m.TrReflectionL.initialize = function(a1) {
            a1.isEuclidean = -1;
        };
        m.TrReflectionL.updatePosition = function(a1) {
            var b = l.mult, c = l.realmult, d = l.zero, f = r.csnames[a1.args[0]].homog.value, h = f[0], k = f[1];
            f = f[2];
            var m = b(h, h), n = b(k, k), p = c(-0.5, l.sub(m, n)), q = b(h, k);
            b = g.turnIntoCSList([
                g.turnIntoCSList([
                    l.neg(p),
                    q,
                    b(h, f)
                ]),
                g.turnIntoCSList([
                    q,
                    p,
                    b(k, f)
                ]),
                g.turnIntoCSList([
                    d,
                    d,
                    c(-0.5, l.add(m, n))
                ])
            ]);
            b = g.normalizeMax(b);
            a1.matrix = b;
            a1.dualMatrix = g.transpose(b);
        };
        m.TrReflectionS = {};
        m.TrReflectionS.kind = "Tr";
        m.TrReflectionS.signature = [
            "S"
        ];
        m.TrReflectionS.updatePosition = m.TrReflectionL.updatePosition;
        m.TrReflectionC = {};
        m.TrReflectionC.kind = "Mt";
        m.TrReflectionC.signature = [
            "C"
        ];
        m.TrReflectionC.signatureConstraints = function(a1) {
            return "Circle" === r.csnames[a1.args[0]].matrix.usage;
        };
        m.TrReflectionC.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].matrix, c = b.value[0].value[2], d = b.value[1].value[2], f = l.neg;
            a1.moebius = {
                anti: !0,
                ar: c,
                ai: d,
                br: b.value[2].value[2],
                bi: l.zero,
                cr: f(b.value[0].value[0]),
                ci: l.zero,
                dr: f(c),
                di: d
            };
            m._helper.moebiusPair(a1);
        };
        m.TrInverse = {};
        m.TrInverse.kind = "Tr";
        m.TrInverse.signature = [
            "Tr"
        ];
        m.TrInverse.initialize = function(a1) {
            a1.isEuclidean = r.csnames[a1.args[0]].isEuclidean;
        };
        m.TrInverse.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]];
            a1.dualMatrix = g.transpose(b.matrix);
            a1.matrix = g.transpose(b.dualMatrix);
        };
        m.TransformC = {};
        m.TransformC.kind = "C";
        m.TransformC.signature = [
            "Tr",
            "C"
        ];
        m.TransformC.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].dualMatrix;
            b = g.productMM(g.productMM(b, r.csnames[a1.args[1]].matrix), g.transpose(b));
            b = g.normalizeMax(b);
            a1.matrix = u.withUsage(b, "Conic");
        };
        m.TransformArc = {};
        m.TransformArc.kind = "C";
        m.TransformArc.signature = [
            "Tr",
            "C"
        ];
        m.TransformArc.signatureConstraints = function(a1) {
            return r.csnames[a1.args[0]].isArc;
        };
        m.TransformArc.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].matrix, c = r.csnames[a1.args[1]], d = c.viaPoint, f = c.endPoint;
            c = g.normalizeMax(g.productMV(b, c.startPoint));
            d = g.normalizeMax(g.productMV(b, d));
            b = g.normalizeMax(g.productMV(b, f));
            a1.startPoint = c;
            a1.viaPoint = d;
            a1.endPoint = b;
            a1.isArc = !0;
            a1.matrix = g.normalizeMax(m._helper.ConicBy5(null, c, d, b, g.ii, g.jj));
            a1.matrix = u.withUsage(a1.matrix, "Circle");
        };
        m.TransformP = {};
        m.TransformP.kind = "P";
        m.TransformP.signature = [
            "Tr",
            "P"
        ];
        m.TransformP.updatePosition = function(a1) {
            a1.homog = g.normalizeMax(g.productMV(r.csnames[a1.args[0]].matrix, r.csnames[a1.args[1]].homog));
            a1.homog = u.withUsage(a1.homog, "Point");
        };
        m.TransformL = {};
        m.TransformL.kind = "L";
        m.TransformL.signature = [
            "Tr",
            "L"
        ];
        m.TransformL.updatePosition = function(a1) {
            a1.homog = g.normalizeMax(g.productMV(r.csnames[a1.args[0]].dualMatrix, r.csnames[a1.args[1]].homog));
            a1.homog = u.withUsage(a1.homog, "Line");
        };
        m.TransformS = {};
        m.TransformS.kind = "S";
        m.TransformS.signature = [
            "Tr",
            "S"
        ];
        m.TransformS.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]];
            m.Segment.setSegmentPos(a1, g.productMV(b.dualMatrix, c.homog), g.productMV(b.matrix, c.startpos), g.productMV(b.matrix, c.endpos));
        };
        m.TransformPolygon = {};
        m.TransformPolygon.kind = "Poly";
        m.TransformPolygon.signature = [
            "Tr",
            "Poly"
        ];
        m.TransformPolygon.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]].matrix;
            a1.vertices = g.turnIntoCSList(r.csnames[a1.args[1]].vertices.value.map(function(a1) {
                a1 = g.normalizeMax(g.productMV(b, a1));
                return a1 = u.withUsage(a1, "Point");
            }));
        };
        m.TrComposeTrTr = {};
        m.TrComposeTrTr.kind = "Tr";
        m.TrComposeTrTr.signature = [
            "Tr",
            "Tr"
        ];
        m.TrComposeTrTr.initialize = function(a1) {
            a1.isEuclidean = r.csnames[a1.args[0]].isEuclidean * r.csnames[a1.args[1]].isEuclidean;
        };
        m.TrComposeTrTr.updatePosition = function(a1) {
            var b = r.csnames[a1.args[0]], c = r.csnames[a1.args[1]];
            a1.matrix = g.normalizeMax(g.productMM(c.matrix, b.matrix));
            a1.dualMatrix = g.normalizeMax(g.productMM(c.dualMatrix, b.dualMatrix));
        };
        m._helper.composeMtMt = function(a1, b, c) {
            function e(a1, b, c, e) {
                return h(n(a1, b), n(c, e));
            }
            function d(a1, b, c, d, f, g, k, l) {
                return h(e(a1, b, c, d), e(f, g, k, l));
            }
            function f(a1, b, c, d, f, g, h, l) {
                return k(e(a1, b, c, d), e(f, g, h, l));
            }
            var h = l.add, k = l.sub, n = l.mult, p = c.anti ? f : d, q = c.anti ? d : f;
            p = g.normalizeMax(g.turnIntoCSList([
                q(b.ar, c.ar, b.cr, c.br, b.ai, c.ai, b.ci, c.bi),
                p(b.ar, c.ai, b.cr, c.bi, b.ai, c.ar, b.ci, c.br),
                q(b.br, c.ar, b.dr, c.br, b.bi, c.ai, b.di, c.bi),
                p(b.br, c.ai, b.dr, c.bi, b.bi, c.ar, b.di, c.br),
                q(b.ar, c.cr, b.cr, c.dr, b.ai, c.ci, b.ci, c.di),
                p(b.ar, c.ci, b.cr, c.di, b.ai, c.cr, b.ci, c.dr),
                q(b.br, c.cr, b.dr, c.dr, b.bi, c.ci, b.di, c.di),
                p(b.br, c.ci, b.dr, c.di, b.bi, c.cr, b.di, c.dr)
            ])).value;
            a1.moebius = {
                anti: b.anti !== c.anti,
                ar: p[0],
                ai: p[1],
                br: p[2],
                bi: p[3],
                cr: p[4],
                ci: p[5],
                dr: p[6],
                di: p[7]
            };
            m._helper.moebiusPair(a1);
        };
        m._helper.euc2moeb = function(a1) {
            var b = a1.matrix.value;
            return {
                anti: 0 > a1.isEuclidean,
                ar: b[0].value[0],
                ai: b[1].value[0],
                br: b[0].value[2],
                bi: b[1].value[2],
                cr: l.zero,
                ci: l.zero,
                dr: b[2].value[2],
                di: l.zero
            };
        };
        m.TrComposeMtMt = {};
        m.TrComposeMtMt.kind = "Mt";
        m.TrComposeMtMt.signature = [
            "Mt",
            "Mt"
        ];
        m.TrComposeMtMt.updatePosition = function(a1) {
            m._helper.composeMtMt(a1, r.csnames[a1.args[0]].moebius, r.csnames[a1.args[1]].moebius);
        };
        m.TrComposeTrMt = {};
        m.TrComposeTrMt.kind = "Mt";
        m.TrComposeTrMt.signature = [
            "Tr",
            "Mt"
        ];
        m.TrComposeTrMt.signatureConstraints = function(a1) {
            return !!r.csnames[a1.args[0]].isEuclidean;
        };
        m.TrComposeTrMt.updatePosition = function(a1) {
            m._helper.composeMtMt(a1, m._helper.euc2moeb(r.csnames[a1.args[0]]), r.csnames[a1.args[1]].moebius);
        };
        m.TrComposeMtTr = {};
        m.TrComposeMtTr.kind = "Mt";
        m.TrComposeMtTr.signature = [
            "Mt",
            "Tr"
        ];
        m.TrComposeMtTr.signatureConstraints = function(a1) {
            return !!r.csnames[a1.args[1]].isEuclidean;
        };
        m.TrComposeMtTr.updatePosition = function(a1) {
            m._helper.composeMtMt(a1, r.csnames[a1.args[0]].moebius, m._helper.euc2moeb(r.csnames[a1.args[1]]));
        };
        m._helper.pointReflection = function(a1, b) {
            return g.normalizeMax(g.sub(g.scalmult(l.realmult(2, b.value[2]), a1), g.scalmult(a1.value[2], b)));
        };
        m._helper.conicOtherIntersection = function(a1, b, c) {
            var e = g.productMV(a1, c);
            a1 = g.scalproduct(c, e);
            e = g.scalproduct(b, e);
            e = l.realmult(-2, e);
            b = g.scalmult(a1, b);
            c = g.scalmult(e, c);
            c = g.add(b, c);
            return c = g.normalizeMax(c);
        };
        m.Dist = {};
        m.Dist.kind = "V";
        m.Dist.signature = [
            "P",
            "P"
        ];
        m.Dist.updatePosition = function(a1) {
            var b = r.csnames[a1.args[1]].homog;
            a1.value = g.abs(g.sub(g.normalizeZ(r.csnames[a1.args[0]].homog), g.normalizeZ(b)));
        };
        m.Angle = {};
        m.Angle.kind = "V";
        m.Angle.signature = [
            "L",
            "L",
            "P"
        ];
        m.Angle.initialize = function(a1) {
            void 0 === a1.angle && (a1.angle = .5 * Math.PI);
            wb(l._helper.input(a1.angle));
        };
        m.Angle.updatePosition = function(a1) {
            var b = r.csnames[a1.args[1]].homog, c = r.csnames[a1.args[2]].homog, d = g.cross(r.csnames[a1.args[0]].homog, g.linfty);
            b = g.cross(b, g.linfty);
            c = g.crossratio3(d, b, g.ii, g.jj, c);
            c = l.mult(l.complex(0, .5), l.log(c));
            d = (hc().value.real - c.value.real) / Math.PI;
            b = Math.round(d);
            !lc && .01 < Math.abs(b - d) && uc();
            c = l.complex(b * Math.PI + c.value.real, c.value.imag);
            wb(c);
            a1.value = u.withUsage(c, "Angle");
        };
        m.Angle.stateSize = 2;
        m.Text = {};
        m.Text.kind = "Text";
        m.Text.signature = "**";
        m.Text.isMovable = !0;
        m.Text.updatePosition = fb;
        m.Text.initialize = function(a1) {
            a1.text = String(a1.text);
            a1.pos && (a1.homog = m._helper.initializePoint(a1));
            a1.dock && (a1.dock.offset = a1.dock.offset && 2 === a1.dock.offset.length ? g.realVector([
                +a1.dock.offset[0],
                +a1.dock.offset[1]
            ]) : g.realVector([
                0,
                0
            ]));
        };
        m.Text.getParamForInput = function(a1, b, c) {
            return m.Free.getParamForInput(a1, b, c);
        };
        m.Text.getParamFromState = function(a1) {
            return a1.homog;
        };
        m.Text.putParamToState = function(a1, b) {
            a1.homog = b;
        };
        m.Calculation = {};
        m.Calculation.kind = "Text";
        m.Calculation.signature = "**";
        m.Calculation.isMovable = !0;
        m.Calculation.updatePosition = fb;
        m.Calculation.initialize = function(a1) {
            m.Text.initialize(a1);
            a1.calculation = lb(a1.text);
        };
        m.Calculation.getText = function(a1) {
            return da(w(a1.calculation));
        };
        m.Calculation.getParamForInput = m.Text.getParamForInput;
        m.Calculation.getParamFromState = m.Text.getParamFromState;
        m.Calculation.putParamToState = m.Text.putParamToState;
        m.Equation = {};
        m.Equation.kind = "Text";
        m.Equation.isMovable = !0;
        m.Equation.signature = "**";
        m.Equation.updatePosition = fb;
        m.Equation.initialize = function(a1) {
            m.Text.initialize(a1);
            a1.calculation = lb(a1.text);
        };
        m.Equation.getText = function(a1) {
            return a1.text + " = " + da(w(a1.calculation));
        };
        m.Equation.getParamForInput = m.Text.getParamForInput;
        m.Equation.getParamFromState = m.Text.getParamFromState;
        m.Equation.putParamToState = m.Text.putParamToState;
        m.Evaluate = {};
        m.Evaluate.kind = "Text";
        m.Evaluate.isMovable = !0;
        m.Evaluate.signature = "**";
        m.Evaluate.updatePosition = fb;
        m.Evaluate.initialize = function(a1) {
            m.Text.initialize(a1);
            a1.calculation = lb(a1.text);
        };
        m.Evaluate.getText = function(a1) {
            w(a1.calculation);
            return a1.text;
        };
        m.Evaluate.getParamForInput = m.Text.getParamForInput;
        m.Evaluate.getParamFromState = m.Text.getParamFromState;
        m.Evaluate.putParamToState = m.Text.putParamToState;
        m.Plot = {};
        m.Plot.kind = "Text";
        m.Plot.isMovable = !0;
        m.Plot.signature = "**";
        m.Plot.updatePosition = fb;
        m.Plot.initialize = function(a1) {
            m.Text.initialize(a1);
            a1.calculation = lb("plot((" + a1.text + "))");
        };
        m.Plot.getText = function(a1) {
            w(a1.calculation);
            return a1.text;
        };
        m.Plot.getParamForInput = m.Text.getParamForInput;
        m.Plot.getParamFromState = m.Text.getParamFromState;
        m.Plot.putParamToState = m.Text.putParamToState;
        m.Button = {};
        m.Button.kind = "Text";
        m.Button.signature = "**";
        m.Button.isMovable = !0;
        m.Button.updatePosition = fb;
        m.Button.initialize = function(a1) {
            var b = document.createElement("button");
            Uc(a1, "click", b);
        };
        m.Button.getParamForInput = m.Text.getParamForInput;
        m.Button.getParamFromState = m.Text.getParamFromState;
        m.Button.putParamToState = m.Text.putParamToState;
        m.Button.set_fillcolor = function(a1, b) {
            g._helper.isNumberVecN(b, 3) && (a1.fillcolor = b.value.map(function(a1) {
                return a1.value.real;
            }), a1.html.style.backgroundColor = y.makeColor(a1.fillcolor, a1.fillalpha));
        };
        m.Button.set_color = function(a1, b) {
            g._helper.isNumberVecN(b, 3) && (a1.color = b.value.map(function(a1) {
                return a1.value.real;
            }), a1.html.style.color = y.makeColor(a1.color, a1.alpha));
        };
        m.ToggleButton = {};
        m.ToggleButton.kind = "Text";
        m.ToggleButton.signature = "**";
        m.ToggleButton.isMovable = !0;
        m.ToggleButton.updatePosition = fb;
        m.ToggleButton.initialize = function(a1) {
            var b = void 0;
            void 0 === b && (b = "CindyJSid");
            b += ++X;
            var c = document.createElement("input"), d = document.createElement("label");
            c.setAttribute("id", b);
            d.setAttribute("for", b);
            c.setAttribute("type", "checkbox");
            a1.pressed && (c.checked = !0);
            a1.checkbox = c;
            Uc(a1, "change", c, d);
        };
        m.ToggleButton.get_text = function(a1) {
            return u.string(String(a1.text));
        };
        m.ToggleButton.set_currenttext = function(a1, b) {
            a1.html.value = a1.text = da(b);
        };
        m.ToggleButton.getParamForInput = m.Text.getParamForInput;
        m.ToggleButton.getParamFromState = m.Text.getParamFromState;
        m.ToggleButton.putParamToState = m.Text.putParamToState;
        m.ToggleButton.set_fillcolor = m.Button.set_fillcolor;
        m.ToggleButton.set_color = m.Button.set_color;
        m.ToggleButton.set_text = m.ToggleButton.set_currenttext;
        m.ToggleButton.get_val = m.ToggleButton.get_text;
        m.ToggleButton.set_val = m.ToggleButton.set_currenttext;
        m.EditableText = {};
        m.EditableText.kind = "Text";
        m.EditableText.isMovable = !0;
        m.EditableText.signature = [];
        m.EditableText.updatePosition = fb;
        m.EditableText.initialize = function(a1) {
            var b = document.createElement("input");
            b.setAttribute("type", "text");
            b.className = "CindyJS-editabletext";
            $a(a1.minwidth) && (b.style.width = a1.minwidth - 3 + "px");
            "string" === typeof a1.text && (b.value = a1.text);
            b.addEventListener("keydown", function(c) {
                13 === c.keyCode && (a1.text = a1.html.value, b.blur());
            });
            b.addEventListener("change", function(b) {
                a1.text = a1.html.value;
            });
            Uc(a1, "change", b);
        };
        m.EditableText.getText = function(a1) {
            return !1;
        };
        m.EditableText.getParamForInput = m.Text.getParamForInput;
        m.EditableText.getParamFromState = m.Text.getParamFromState;
        m.EditableText.putParamToState = m.Text.putParamToState;
        m.EditableText.set_fillcolor = m.Button.set_fillcolor;
        m.EditableText.set_color = m.Button.set_color;
        m.EditableText.get_currenttext = function(a1) {
            return u.string(String(a1.html.value));
        };
        m.EditableText.get_text = m.ToggleButton.get_text;
        m.EditableText.set_currenttext = m.ToggleButton.set_currenttext;
        m.EditableText.set_text = m.EditableText.set_currenttext;
        m.EditableText.get_val = m.EditableText.get_text;
        m.EditableText.set_val = m.EditableText.set_currenttext;
        m._helper.initializePoint = function(a1) {
            var b = 0, c = 0, d = 0;
            if (a1.pos) {
                if ("list" === a1.pos.ctype && g.isNumberVector(a1.pos)) return a1.pos;
                2 === a1.pos.length && (b = a1.pos[0], c = a1.pos[1], d = 1);
                3 === a1.pos.length && (b = a1.pos[0], c = a1.pos[1], d = a1.pos[2]);
            }
            a1 = g.turnIntoCSList([
                l._helper.input(b),
                l._helper.input(c),
                l._helper.input(d)
            ]);
            return a1 = g.normalizeMax(a1);
        };
        m._helper.initializeLine = function(a1) {
            var b = 0, c = 0, d = 0;
            if (a1.pos) {
                if ("list" === a1.pos.ctype && g.isNumberVector(a1.pos)) return a1.pos;
                3 === a1.pos.length && (b = a1.pos[0], c = a1.pos[1], d = a1.pos[2]);
            }
            a1 = g.turnIntoCSList([
                l._helper.input(b),
                l._helper.input(c),
                l._helper.input(d)
            ]);
            return a1 = g.normalizeMax(a1);
        };
        m.Poly = {};
        m.Poly.kind = "Poly";
        m.Poly.signature = "P*";
        m.Poly.updatePosition = function(a1) {
            a1.vertices = g.turnIntoCSList(a1.args.map(function(a1) {
                return r.csnames[a1].homog;
            }));
        };
        var la = null;
        m.IFS = {};
        m.IFS.kind = "IFS";
        m.IFS.signature = "**";
        m.IFS.signatureConstraints = function(a1) {
            for(var b = 0; b < a1.args.length; ++b){
                var c = r.csnames[a1.args[b]].kind;
                if ("Tr" !== c && "Mt" !== c) return !1;
            }
            return 0 < a1.args.length;
        };
        m.IFS.initialize = function(a1) {
            if (la) la.dirty = !0;
            else if (a1 = Ia.getBaseDir(), !1 !== a1) {
                la = {
                    dirty: !1,
                    params: {
                        generation: 0
                    }
                };
                var b = la.worker = new Worker(a1 + "ifs.js");
                b.onmessage = function(a1) {
                    la.img && "function" === typeof la.img.close && la.img.close();
                    if (!Fc) {
                        a1 = a1.data;
                        if (a1.generation === la.params.generation) {
                            if (a1.buffer) {
                                la.canvas || (la.canvas = document.createElement("canvas"), la.ctx = la.canvas.getContext("2d"));
                                la.canvas.width = a1.width;
                                la.canvas.height = a1.height;
                                var c = new Uint8ClampedArray(a1.buffer, a1.imgPtr, a1.width * a1.height * 4);
                                c = new ImageData(c, a1.width, a1.height);
                                la.ctx.putImageData(c, 0, 0);
                                la.img = la.canvas;
                            } else la.img = a1.img;
                            k();
                        } else la.img = null;
                        a1.buffer ? b.postMessage({
                            cmd: "next",
                            buffer: a1.buffer
                        }, [
                            a1.buffer
                        ]) : b.postMessage({
                            cmd: "next"
                        });
                    }
                };
                Db.push(b.terminate.bind(b));
            }
        };
        m.IFS.updatePosition = function(a1) {
            la.dirty = !0;
        };
        m.IFS.updateParameters = function() {
            if (la.worker) {
                var a1 = {
                    cmd: "init",
                    generation: la.params.generation,
                    width: Math.round(4 * ma),
                    height: Math.round(4 * pa)
                };
                a1.systems = r.ifs.map(function(a1) {
                    var b = 0, c, e = a1.ifs || [], d = a1.args.map(function(a1, b) {
                        a1 = e[b] || {};
                        return {
                            prob: a1.prob || 1,
                            color: a1.color || [
                                0,
                                0,
                                0
                            ]
                        };
                    });
                    for(c = 0; c < d.length; ++c)b += d[c].prob;
                    c = g.realMatrix([
                        [
                            1,
                            0,
                            0
                        ],
                        [
                            0,
                            1,
                            0
                        ],
                        [
                            0,
                            0,
                            4
                        ]
                    ]);
                    var f = g.productMM(C.toMat(), c);
                    for(c = 0; c < a1.args.length; ++c){
                        var h = r.csnames[a1.args[c]], k = h.kind, n = d[c];
                        n.kind = k;
                        n.prob /= b;
                        if ("Tr" === k) h = g.normalizeMax(g.productMM(g.adjoint3(f), g.productMM(h.matrix, f))), g._helper.isAlmostReal(h) ? n.mat = h.value.map(function(a1) {
                            return a1.value.map(function(a1) {
                                return a1.value.real;
                            });
                        }) : n.kind = "cplx";
                        else if ("Mt" === k) {
                            k = C.drawingstate.matrix;
                            k = {
                                anti: 0 < k.det,
                                ar: l.real(k.a),
                                ai: l.real(k.c),
                                br: l.real(k.tx),
                                bi: l.real(-k.ty),
                                cr: l.zero,
                                ci: l.zero,
                                dr: l.real(.25),
                                di: l.zero
                            };
                            var p = {};
                            m._helper.composeMtMt(p, h.moebius, k);
                            k = m._helper.inverseMoebius(k);
                            m._helper.composeMtMt(p, k, p.moebius);
                            k = p.moebius;
                            k = g.turnIntoCSList([
                                k.ar,
                                k.ai,
                                k.br,
                                k.bi,
                                k.cr,
                                k.ci,
                                k.dr,
                                k.di
                            ]);
                            g._helper.isAlmostReal(k) ? (k = k.value, n.moebius = {
                                ar: k[0].value.real,
                                ai: k[1].value.real,
                                br: k[2].value.real,
                                bi: k[3].value.real,
                                cr: k[4].value.real,
                                ci: k[5].value.real,
                                dr: k[6].value.real,
                                di: k[7].value.real,
                                sign: h.moebius.anti ? -1 : 1
                            }) : n.kind = "cplx";
                        }
                    }
                    return {
                        trafos: d
                    };
                });
                u.deeplyEqual(a1, la.params) || (++a1.generation, la.img = null, la.params = a1, la.mat = C.drawingstate.matrix, la.worker.postMessage(a1));
            }
        };
        m.IFS.probSetter = function(a1, b, c) {
            "number" === c.ctype && (b.ifs[a1].prob = c.value.real, la.dirty = !0);
        };
        (function() {
            for(var a1 = 0; 10 > a1; ++a1)m.IFS["set_prob" + a1] = m.IFS.probSetter.bind(null, a1);
        })();
        m._helper.snapPointToLine = function(a1, b) {
            if (l._helper.isAlmostZero(a1.value[2])) return a1;
            var c = m._helper.projectPointToLine(a1, b);
            c = g.normalizeZ(c);
            var e = c.value[0].value.real;
            c = c.value[1].value.real;
            var d = Math.round(e / Va) * Va, f = Math.round(c / Va) * Va, h = g.realVector([
                d,
                f,
                1
            ]);
            Math.abs(d - e) < Tb && Math.abs(f - c) < Tb && l._helper.isAlmostZero(g.scalproduct(b, h)) && (a1 = m._helper.projectPointToLine(h, b));
            return a1;
        };
        var ed = {
            CircleByRadius: "CircleMr",
            IntersectionCircleCircle: "IntersectCirCir",
            IntersectionConicConic: "IntersectConicConic",
            FreePoint: "Free",
            Orthogonal: "Perp",
            Parallel: "Para",
            Pole: "PolarOfLine",
            Polar: "PolarOfPoint",
            Arc: "ArcBy3",
            EuclideanMid: "Mid",
            AngularBisector: "AngleBisector",
            TransformConic: "TransformC",
            TransformSegment: "TransformS",
            TrMoebiusSegment: "TrMoebiusS",
            ReflectCC: "TrMoebiusC",
            ReflectCL: "TrMoebiusL",
            ReflectCP: "TrMoebiusP",
            ReflectCArc: "TrMoebiusArc",
            ReflectCS: "TrMoebiusS",
            TrMoebiusCircle: "TrMoebiusC"
        }, Ee = {
            CircleMFixedr: function(a1) {
                a1.pinned = !0;
                a1.type = "CircleMr";
                return [
                    a1
                ];
            },
            CircleByFixedRadius: function(a1) {
                a1.pinned = !0;
                a1.type = "CircleMr";
                return [
                    a1
                ];
            },
            IntersectionConicLine: function(a1) {
                a1.args = [
                    a1.args[1],
                    a1.args[0]
                ];
                a1.type = "IntersectLC";
                return [
                    a1
                ];
            },
            angleBisector: function(a1) {
                var b = {
                    name: a1.name + "_Intersection",
                    type: "Meet",
                    args: a1.args,
                    visible: !1
                };
                a1.type = "AngleBisector";
                a1.args = [
                    a1.args[0],
                    a1.args[1],
                    b.name
                ];
                return [
                    b,
                    a1
                ];
            },
            Transform: function(a1) {
                var b = r.csnames[a1.args[1]];
                b = ({
                    Tr: "Transform",
                    Mt: "TrMoebius"
                })[r.csnames[a1.args[0]].kind] + (b.isArc ? "Arc" : b.kind);
                if (m.hasOwnProperty(b)) return a1.type = b, [
                    a1
                ];
                console.log(b + " not implemented yet");
                return [];
            },
            TrReflection: function(a1) {
                var b = "TrReflection" + r.csnames[a1.args[0]].kind;
                if (m.hasOwnProperty(b)) return a1.type = b, [
                    a1
                ];
                console.log(b + " not implemented yet");
                return [];
            },
            TrCompose: function(a1) {
                var b = "TrCompose" + a1.args.map(function(a1) {
                    return r.csnames[a1].kind;
                }).join("");
                if (m.hasOwnProperty(b)) return a1.type = b, [
                    a1
                ];
                console.log(b + " not implemented yet");
                return [];
            }
        }, Ze = "align alpha angle args arrow arrowposition arrowshape arrowsides arrowsize clip color dashtype drawtrace fillalpha fillcolor filled labeled labelpos name overhang pinned printname radius size text text_fontfamily textbold textitalics textsize tracedim tracelength traceskip tracing type visible".split(" ");
        La.saveState = function() {
            return {
                geometry: te()
            };
        };
        var cb = {};
        var $e = [
            [],
            [
                .2
            ],
            [
                .075,
                .225
            ],
            [
                44 / 45,
                -56 / 15,
                32 / 9
            ],
            [
                19372 / 6561,
                -25360 / 2187,
                64448 / 6561,
                -212 / 729
            ],
            [
                9017 / 3168,
                -355 / 33,
                46732 / 5247,
                49 / 176,
                -5103 / 18656
            ],
            [
                35 / 384,
                0,
                500 / 1113,
                125 / 192,
                -2187 / 6784,
                11 / 84
            ]
        ];
        var ke = [
            0,
            .2,
            .3,
            .8,
            8 / 9,
            1,
            1
        ];
        var af = [
            35 / 384,
            0,
            500 / 1113,
            125 / 192,
            -2187 / 6784,
            11 / 84,
            0
        ];
        var bf = [
            5179 / 57600,
            0,
            7571 / 16695,
            .6140625,
            -92097 / 339200,
            187 / 2100,
            .025
        ];
        var qb, Ca = [], He = [], Ce = !1;
        cb.tick = function(a1) {
            a1 /= zc;
            for(var b = 0; b < zc; b++)cb.tick1(a1), yc += a1, w(V.simulationstep);
        };
        cb.tick1 = function(a1) {
            for(var b = a1, c = 0; 0 < a1 && c < .999 * a1 || 0 > a1 && c > .999 * a1;)b = cb.oneRKStep(b), c += b, b = Math.min(2 * b, a1 - c), b = Math.max(b, 1E-16), cb.restorePosition(), cb.doCollisions(), cb.calculateForces(), cb.moveToFinalPos();
            return !0;
        };
        cb.restorePosition = function() {
            qb.forEach(function(a1) {
                W[a1.type].restorePos(a1, 9);
            });
        };
        cb.doCollisions = function() {
            qb.forEach(function(a1) {
                W[a1.type].doCollisions(a1);
            });
        };
        cb.calculateForces = function() {
            qb.forEach(function(a1) {
                W[a1.type].calculateForces(a1);
            });
        };
        cb.moveToFinalPos = function() {
            qb.forEach(function(a1) {
                W[a1.type].move(a1);
            });
        };
        cb.oneRKStep = function(a1) {
            for(var b = function(a1) {
                qb.forEach(function(b) {
                    W[b.type].initRK(b, a1);
                    W[b.type].storePosition(b);
                });
            }, c = function(a1) {
                qb.forEach(function(b) {
                    W[b.type].setToTimestep(b, ke[a1]);
                });
            }, d = function(a1) {
                qb.forEach(function(b) {
                    W[b.type].proceedMotion(b, ke[a1], a1, $e[a1]);
                });
            }, f = function() {
                qb.forEach(function(a1) {
                    W[a1.type].resetForces(a1);
                });
            }, g = function(a1) {
                qb.forEach(function(b) {
                    W[b.type].calculateDelta(b, a1);
                });
            }, h = function(b) {
                var c = 0;
                qb.forEach(function(a1) {
                    W[a1.type].proceedMotion(a1, ke[6], 7, af);
                    W[a1.type].savePos(a1, 8);
                    W[a1.type].proceedMotion(a1, ke[6], 7, bf);
                    W[a1.type].savePos(a1, 9);
                    c += W[a1.type].sqDist(a1, 8, 9);
                });
                return c = Math.sqrt(c) / a1;
            }, k = function(a1) {
                qb.forEach(function(a1) {
                    W[a1.type].recallPosition(a1);
                });
            }, l = !1; !l;){
                b(a1);
                for(var m = 0; 7 > m; m++)c(m), d(m), f(), cb.calculateForces(), g(m);
                h(a1) > W.env.errorbound && a1 > W.env.lowestdeltat ? (a1 /= W.env.slowdownfactor, k()) : l = !0;
            }
            return a1;
        };
        var W = {
            Mass: {
                reset: function(a1, b) {
                    a1.vel = [
                        0,
                        0,
                        0
                    ];
                    a1.pos = [
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.el = b;
                    "undefined" === typeof a1.mass && (a1.mass = 1);
                    "undefined" === typeof a1.charge && (a1.charge = 0);
                    "undefined" === typeof a1.friction && (a1.friction = 0);
                    a1.lnfrict = 0;
                    "undefined" === typeof a1.limitspeed && (a1.limitspeed = !1);
                    "undefined" === typeof a1.fixed && (a1.fixed = !1);
                    "undefined" === typeof a1.radius && (a1.radius = 1);
                    a1.internalmove = !1;
                    a1.fx = 0;
                    a1.fy = 0;
                    a1.fz = 0;
                    a1.vx = a1.vx || 0;
                    a1.vy = a1.vy || 0;
                    a1.vz = a1.vz || 0;
                    a1.mtype = 0;
                    a1.env = W.env;
                    a1.deltat = 0;
                    a1.mx = 0;
                    a1.my = 0;
                    a1.mz = 0;
                    a1.mvx = 0;
                    a1.mvy = 0;
                    a1.mvz = 0;
                    a1.dx = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.dy = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.dz = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.dvx = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.dvy = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.dvz = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.midx = 0;
                    a1.midy = 0;
                    a1.midz = 0;
                    a1.lx = 0;
                    a1.ly = 0;
                    a1.lz = 0;
                },
                resetForces: function(a1) {
                    a1.fx = 0;
                    a1.fy = 0;
                    a1.fz = 0;
                },
                getBlock: !1,
                setToTimestep: function(a1, b, c) {},
                initRK: function(a1, b) {
                    var c = E.extractPoint(a1.el.homog);
                    a1.x = c.x;
                    a1.y = c.y;
                    a1.z = 0;
                    a1.xo = a1.x;
                    a1.yo = a1.y;
                    a1.zo = a1.z;
                    a1.vxo = a1.vx;
                    a1.vyo = a1.vy;
                    a1.vzo = a1.vz;
                    a1.deltat = b;
                    a1.fx = 0;
                    a1.fy = 0;
                    a1.fz = 0;
                },
                setVelocity: function(a1, b, c, d) {
                    d || (d = 0);
                    a1.vx = b;
                    a1.vy = c;
                    a1.vz = d;
                },
                move: function(a1) {
                    a1.pos = [
                        a1.x,
                        a1.y,
                        1
                    ];
                    a1.internalmove = !0;
                    ya && ja.down && a1.el === ya.mover || Ta(a1.el, g.realVector(a1.pos), "homog");
                    a1.el.sx = a1.x;
                    a1.el.sy = a1.y;
                    a1.internalmove = !1;
                },
                proceedMotion: function(a1, b, c, d) {
                    if (!a1.fixed) for(a1.x = a1.mx, a1.y = a1.my, a1.z = a1.mz, a1.vx = a1.mvx, a1.vy = a1.mvy, a1.vz = a1.mvz, b = 0; b < c; b++)a1.x += d[b] * a1.dx[b] * a1.deltat, a1.y += d[b] * a1.dy[b] * a1.deltat, a1.z += d[b] * a1.dz[b] * a1.deltat, a1.vx += d[b] * a1.dvx[b] * a1.deltat, a1.vy += d[b] * a1.dvy[b] * a1.deltat, a1.vz += d[b] * a1.dvz[b] * a1.deltat;
                },
                calculateForces: function(a1) {
                    var b = Math.sqrt(a1.vx * a1.vx + a1.vy * a1.vy + a1.vz * a1.vz);
                    a1.lnfrict = -Math.log((1 - a1.friction) * (1 - a1.env.friction) * (.1 < b && a1.limitSpeed ? .1 / b : 1));
                    a1.fx += -a1.vx * a1.lnfrict * a1.mass;
                    a1.fy += -a1.vy * a1.lnfrict * a1.mass;
                    a1.fz += -a1.vz * a1.lnfrict * a1.mass;
                },
                calculateDelta: function(a1, b) {
                    a1.dx[b] = a1.vx;
                    a1.dy[b] = a1.vy;
                    a1.dz[b] = a1.vz;
                    a1.dvx[b] = a1.fx / a1.mass;
                    a1.dvy[b] = a1.fy / a1.mass;
                    a1.dvz[b] = a1.fz / a1.mass;
                },
                savePos: function(a1, b) {
                    a1.dx[b] = a1.x;
                    a1.dy[b] = a1.y;
                    a1.dz[b] = a1.z;
                    a1.dvx[b] = a1.vx;
                    a1.dvy[b] = a1.vy;
                    a1.dvz[b] = a1.vz;
                },
                restorePos: function(a1, b) {
                    a1.fixed || (a1.x = a1.dx[b], a1.y = a1.dy[b], a1.z = a1.dz[b], a1.vx = a1.dvx[b], a1.vy = a1.dvy[b], a1.vz = a1.dvz[b]);
                },
                sqDist: function(a1, b, c) {
                    var d = (a1.dx[b] - a1.dx[c]) * (a1.dx[b] - a1.dx[c]);
                    d += (a1.dy[b] - a1.dy[c]) * (a1.dy[b] - a1.dy[c]);
                    d += (a1.dz[b] - a1.dz[c]) * (a1.dz[b] - a1.dz[c]);
                    d += (a1.dvx[b] - a1.dvx[c]) * (a1.dvx[b] - a1.dvx[c]);
                    d += (a1.dvy[b] - a1.dvy[c]) * (a1.dvy[b] - a1.dvy[c]);
                    return d += (a1.dvz[b] - a1.dvz[c]) * (a1.dvz[b] - a1.dvz[c]);
                },
                kineticEnergy: function(a1) {
                    return .5 * a1.mass * (a1.vx * a1.vx + a1.vy * a1.vy + a1.vz * a1.vz);
                },
                storePosition: function(a1) {
                    a1.mx = a1.x;
                    a1.my = a1.y;
                    a1.mz = a1.z;
                    a1.mvx = a1.vx;
                    a1.mvy = a1.vy;
                    a1.mvz = a1.vz;
                },
                recallPosition: function(a1) {
                    a1.fixed || (a1.x = a1.mx, a1.y = a1.my, a1.z = a1.mz, a1.vx = a1.mvx, a1.vy = a1.mvy, a1.vz = a1.mvz);
                },
                doCollisions: function(a1) {}
            },
            Sun: {
                reset: function(a1, b) {
                    a1.vel = [
                        0,
                        0,
                        0
                    ];
                    a1.pos = [
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.el = b;
                    "undefined" === typeof a1.mass && (a1.mass = 10);
                    "undefined" === typeof a1.friction && (a1.friction = 0);
                    a1.charge = 0;
                    a1.x = 0;
                    a1.y = 0;
                    a1.z = 0;
                },
                resetForces: function(a1) {},
                getBlock: !1,
                setToTimestep: function(a1, b, c) {},
                initRK: function(a1, b) {
                    b = E.extractPoint(a1.el.homog);
                    a1.x = b.x;
                    a1.y = b.y;
                    a1.z = 0;
                },
                setVelocity: function(a1, b, c, d) {},
                move: function(a1) {},
                proceedMotion: function(a1, b, c, d) {},
                calculateDelta: function(a1, b) {},
                calculateForces: function(a1) {
                    for(var b = a1.x, c = a1.y, d = a1.z, f = 0; f < Ca.length; f++){
                        var g = Ca[f], h = g.behavior.x, k = g.behavior.y, l = g.behavior.z, m = Math.sqrt((b - h) * (b - h) + (c - k) * (c - k) + (d - l) * (d - l));
                        k = (c - k) * a1.mass * g.behavior.mass / (m * m * m);
                        l = (d - l) * a1.mass * g.behavior.mass / (m * m * m);
                        g.behavior.fx += (b - h) * a1.mass * g.behavior.mass / (m * m * m) * g.behavior.mass;
                        g.behavior.fy += k * g.behavior.mass;
                        g.behavior.fz += l * g.behavior.mass;
                    }
                },
                savePos: function(a1, b) {},
                restorePos: function(a1, b) {},
                sqDist: function(a1, b, c) {
                    return 0;
                },
                kineticEnergy: function(a1) {},
                storePosition: function(a1) {},
                recallPosition: function(a1) {},
                doCollisions: function(a1) {}
            },
            Velocity: {
                reset: function(a1) {
                    var b = r.csnames[a1.geo[1]];
                    console.log(b);
                    var c = E.extractPoint(b.homog);
                    a1 = E.extractPoint(r.csnames[a1.geo[2]].homog);
                    b = b.behavior;
                    W[b.type].setVelocity(b, a1.x - c.x, a1.y - c.y, 0);
                },
                resetForces: function(a1) {},
                getBlock: !1,
                setToTimestep: function(a1, b, c) {},
                initRK: function(a1, b) {},
                setVelocity: function(a1, b, c, d) {},
                move: function(a1) {
                    var b = r.csnames[a1.geo[2]];
                    if (!ya || !ja.down || b !== ya.mover) {
                        var c = r.csnames[a1.geo[1]];
                        a1 = E.extractPoint(c.homog);
                        c = c.behavior;
                        a1 = g.realVector([
                            a1.x + c.vx,
                            a1.y + c.vy,
                            1
                        ]);
                        Ta(b, a1, "homog");
                    }
                },
                proceedMotion: function(a1, b, c, d) {},
                calculateForces: function(a1) {},
                calculateDelta: function(a1, b) {},
                savePos: function(a1, b) {},
                restorePos: function(a1, b) {},
                sqDist: function(a1, b, c) {
                    return 0;
                },
                kineticEnergy: function(a1) {},
                storePosition: function(a1) {},
                recallPosition: function(a1) {},
                doCollisions: function(a1) {}
            },
            Gravity: {
                reset: function(a1, b) {
                    a1.vel = [
                        0,
                        0,
                        0
                    ];
                    a1.pos = [
                        0,
                        0,
                        0,
                        0
                    ];
                    a1.el = b;
                    "undefined" === typeof a1.strength && (a1.strength = 1);
                    a1.namea = b.args[0];
                    a1.nameb = b.args[1];
                    a1.ma = r.csnames[a1.namea];
                    a1.mb = r.csnames[a1.nameb];
                },
                resetForces: function(a1) {},
                getBlock: !1,
                setToTimestep: function(a1, b, c) {},
                initRK: function(a1, b) {},
                setVelocity: function(a1, b, c, d) {},
                move: function(a1) {},
                proceedMotion: function(a1, b, c, d) {},
                calculateDelta: function(a1, b) {},
                calculateForces: function(a1) {
                    var b = E.extractPoint(a1.ma.homog), c = E.extractPoint(a1.mb.homog), d = (c.x - b.x) * a1.strength;
                    a1 = (c.y - b.y) * a1.strength;
                    for(b = 0; b < Ca.length; b++)c = Ca[b], c.behavior.fx += d * c.behavior.mass, c.behavior.fy += a1 * c.behavior.mass, c.behavior.fz += 0 * c.behavior.mass;
                },
                savePos: function(a1, b) {},
                restorePos: function(a1, b) {},
                sqDist: function(a1, b, c) {
                    return 0;
                },
                kineticEnergy: function(a1) {},
                storePosition: function(a1) {},
                recallPosition: function(a1) {},
                doCollisions: function(a1) {}
            },
            Spring: {
                reset: function(a1, b) {
                    a1.el = b;
                    "undefined" === typeof a1.strength && (a1.strength = 1);
                    "undefined" === typeof a1.amplitude && (a1.amplitude = 0);
                    "undefined" === typeof a1.phase && (a1.phase = 0);
                    "undefined" === typeof a1.speed && (a1.speed = 1);
                    "undefined" === typeof a1.l0 && (a1.l0 = 0);
                    "undefined" === typeof a1.stype && (a1.stype = 1);
                    "undefined" === typeof a1.readOnInit && (a1.readOnInit = !1);
                    a1.namea = b.args[0];
                    a1.nameb = b.args[1];
                    a1.ma = r.csnames[a1.namea];
                    a1.mb = r.csnames[a1.nameb];
                    b = E.extractPoint(a1.ma.homog);
                    var c = E.extractPoint(a1.mb.homog);
                    a1.l0 = Math.sqrt((b.x - c.x) * (b.x - c.x) + (b.y - c.y) * (b.y - c.y));
                    a1.env = W.env;
                    a1.ldiff = 0;
                },
                resetForces: function(a1) {},
                getBlock: !1,
                setToTimestep: function(a1, b, c) {},
                initRK: function(a1, b) {},
                setVelocity: function(a1, b, c, d) {},
                move: function(a1) {},
                proceedMotion: function(a1, b, c, d) {},
                calculateForces: function(a1) {
                    if (!a1.ma.behavior || ya && ja.down && a1.ma === ya.mover) {
                        var b = E.extractPoint(a1.ma.homog);
                        var c = b.x;
                        var d = b.y;
                    } else c = a1.ma.behavior.x, d = a1.ma.behavior.y;
                    if (!a1.mb.behavior || ya && ja.down && a1.mb === ya.mover) {
                        var f = E.extractPoint(a1.mb.homog);
                        b = f.x;
                        f = f.y;
                    } else b = a1.mb.behavior.x, f = a1.mb.behavior.y;
                    var g = Math.sqrt((c - b) * (c - b) + (d - f) * (d - f)), h = a1.l0;
                    a1.ldiff = g - h;
                    var k = a1.stype;
                    1 === k && (h = 0);
                    var l = 0;
                    if (2 === k || 3 === k) l = a1.ma.behavior.mass * a1.mb.behavior.mass * a1.strength;
                    2 === k && (l = -l);
                    if (0 === g || 0 !== k && 1 !== k) {
                        if (a1.ma.behavior && a1.mb.behavior && 0 !== g) {
                            if (g *= g * g, 2 === k || 3 === k) {
                                var m = (c - b) * l / g;
                                var n = (d - f) * l / g;
                            }
                        } else m = n = 0;
                    } else m = -(c - b) * a1.strength * (g - h) / g * a1.env.springstrength, n = -(d - f) * a1.strength * (g - h) / g * a1.env.springstrength;
                    a1.ma.behavior && (a1.ma.behavior.fx += m, a1.ma.behavior.fy += n);
                    a1.mb.behavior && (a1.mb.behavior.fx -= m, a1.mb.behavior.fy -= n);
                },
                calculateDelta: function(a1, b) {},
                savePos: function(a1, b) {},
                restorePos: function(a1, b) {},
                sqDist: function(a1, b, c) {
                    return 0;
                },
                kineticEnergy: function(a1) {},
                storePosition: function(a1) {},
                recallPosition: function(a1) {},
                doCollisions: function(a1) {}
            },
            det: function(a1, b, c, d, f, g) {
                return c * g - f * d + f * b - a1 * g + a1 * d - c * b;
            },
            Bouncer: {
                reset: function(a1, b) {
                    a1.el = b;
                    "undefined" === typeof a1.xdamp && (a1.xdamp = 0);
                    "undefined" === typeof a1.ydamp && (a1.ydamp = 0);
                    "undefined" === typeof a1.motorchanger && (a1.motorchanger = !0);
                    a1.namea = b.args[0];
                    a1.nameb = b.args[1];
                    a1.ma = r.csnames[a1.namea];
                    a1.mb = r.csnames[a1.nameb];
                    b = E.extractPoint(a1.ma.homog);
                    var c = E.extractPoint(a1.mb.homog);
                    a1.x1o = 1.01 * b.x - .01 * c.x;
                    a1.y1o = 1.01 * b.y - .01 * c.y;
                    a1.x2o = 1.01 * c.x - .01 * b.x;
                    a1.y2o = 1.01 * c.y - .01 * b.y;
                    a1.env = W.env;
                },
                resetForces: function(a1) {},
                getBlock: !1,
                setToTimestep: function(a1, b, c) {},
                initRK: function(a1, b) {
                    a1.deltat = b;
                },
                setVelocity: function(a1, b, c, d) {},
                move: function(a1) {},
                proceedMotion: function(a1, b, c, d) {},
                calculateForces: function(a1) {},
                calculateDelta: function(a1, b) {},
                savePos: function(a1, b) {},
                restorePos: function(a1, b) {},
                sqDist: function(a1, b, c) {
                    return 0;
                },
                kineticEnergy: function(a1) {},
                storePosition: function(a1) {},
                recallPosition: function(a1) {},
                doCollisions: function(a1) {
                    var b = E.extractPoint(a1.ma.homog), c = E.extractPoint(a1.mb.homog), d = b.x;
                    b = b.y;
                    var f = c.x;
                    c = c.y;
                    var g = a1.x1o, h = a1.y1o, k = a1.x2o, m = a1.y2o, n = Math.sqrt((d - f) * (d - f) + (b - c) * (b - c)), p = (d - f) / n;
                    n = (b - c) / n;
                    for(var q = 0; q < Ca.length; q++){
                        var r = Ca[q], t = r.behavior.xo, u = r.behavior.yo, w = r.behavior.x, y = r.behavior.y, z = l.mult(l.complex(g, h), l.complex(f, c)), A = l.mult(l.complex(k, m), l.complex(d, b));
                        z = l.sub(z, A);
                        A = l.mult(l.complex(t, u), l.complex(d, b));
                        z = l.add(z, A);
                        A = l.mult(l.complex(t, u), l.complex(f, c));
                        z = l.sub(z, A);
                        A = l.sub(l.complex(g, h), l.complex(k, m));
                        z = l.div(z, A);
                        0 > W.det(d, b, f, c, w, y) * W.det(d, b, f, c, z.value.real, z.value.imag) && 0 > W.det(d, b, w, y, z.value.real, z.value.imag) * W.det(f, c, w, y, z.value.real, z.value.imag) && (u = r.behavior.mvx + a1.deltat * (-z.value.real + r.behavior.xo), w = r.behavior.mvy + a1.deltat * (-z.value.imag + r.behavior.yo), t = p * u + n * w, u = n * u - p * w, r.behavior.x = z.value.real, r.behavior.y = z.value.imag, r.behavior.vx = p * t * (1 - a1.xdamp), r.behavior.vy = n * t * (1 - a1.xdamp), r.behavior.vx += -n * u * (1 - a1.ydamp), r.behavior.vy += p * u * (1 - a1.ydamp));
                    }
                    a1.x1o = d;
                    a1.y1o = b;
                    a1.x2o = f;
                    a1.y2o = c;
                }
            },
            Environment: {
                init: function(a1) {
                    "undefined" === typeof a1.gravity && (a1.gravity = 0);
                    "undefined" === typeof a1.friction && (a1.friction = 0);
                    "undefined" === typeof a1.springstrength && (a1.springstrength = 1);
                    "undefined" !== typeof a1.accuracy && (zc = a1.accuracy);
                    "undefined" !== typeof a1.deltat && O(a1.deltat / .6);
                    "undefined" === typeof a1.charges && (a1.charges = !1);
                    "undefined" === typeof a1.balls && (a1.balls = !1);
                    "undefined" === typeof a1.newton && (a1.newton = !1);
                    "undefined" === typeof a1.ballInteractionBoosting && (a1.ballInteractionBoosting = 1);
                    W.env = a1;
                    a1.errorbound = .001;
                    a1.lowestdeltat = 1E-7;
                    a1.slowdownfactor = 2;
                },
                reset: function(a1) {},
                resetForces: function(a1) {},
                getBlock: !1,
                setToTimestep: function(a1, b, c) {},
                initRK: function(a1, b) {},
                setVelocity: function(a1, b, c, d) {},
                move: function(a1) {},
                proceedMotion: function(a1, b, c, d) {},
                calculateForces: function(a1) {
                    var b, c;
                    if (a1.newton) for(b = 0; b < Ca.length - 1; b++){
                        var d = Ca[b];
                        var f = d.behavior.x;
                        var g = d.behavior.y;
                        for(c = b + 1; c < Ca.length; c++){
                            var h = Ca[c];
                            var k = h.behavior.x;
                            var l = h.behavior.y;
                            var m = Math.sqrt((f - k) * (f - k) + (g - l) * (g - l));
                            k = (f - k) * d.behavior.mass * h.behavior.mass / (m * m * m);
                            l = (g - l) * d.behavior.mass * h.behavior.mass / (m * m * m);
                            d.behavior.fx -= k;
                            d.behavior.fy -= l;
                            h.behavior.fx += k;
                            h.behavior.fy += l;
                        }
                    }
                    if (a1.charges) for(b = 0; b < Ca.length - 1; b++)for(d = Ca[b], f = d.behavior.x, g = d.behavior.y, c = b + 1; c < Ca.length; c++)h = Ca[c], k = h.behavior.x, l = h.behavior.y, m = Math.sqrt((f - k) * (f - k) + (g - l) * (g - l)), k = (f - k) * d.behavior.charge * h.behavior.charge / (m * m * m), l = (g - l) * d.behavior.charge * h.behavior.charge / (m * m * m), d.behavior.fx += k, d.behavior.fy += l, h.behavior.fx -= k, h.behavior.fy -= l;
                    if (a1.balls) {
                        for(b = 0; b < Ca.length - 1; b++)if (d = Ca[b], 0 !== d.behavior.radius) {
                            for(f = d.behavior.x, g = d.behavior.y, c = b + 1; c < Ca.length; c++)if (h = Ca[c], 0 !== h.behavior.radius) {
                                k = h.behavior.x;
                                l = h.behavior.y;
                                var n = d.behavior.radius + h.behavior.radius;
                                m = Math.sqrt((f - k) * (f - k) + (g - l) * (g - l));
                                0 === a1.ballInteractionBoosting ? (k = (f - k) / (m * m * m) * (m > n ? 0 : (m - n) * (m - n)), l = (g - l) / (m * m * m) * (m > n ? 0 : (m - n) * (m - n))) : 1 === a1.ballInteractionBoosting ? (k = (f - k) / (m * m * m * m) * (m > n ? 0 : (m - n) * (m - n)), l = (g - l) / (m * m * m * m) * (m > n ? 0 : (m - n) * (m - n))) : (k = (f - k) / (m * m * m * m * m) * (m > n ? 0 : (m - n) * (m - n)), l = (g - l) / (m * m * m * m * m) * (m > n ? 0 : (m - n) * (m - n)));
                                d.behavior.fx += k;
                                d.behavior.fy += l;
                                h.behavior.fx -= k;
                                h.behavior.fy -= l;
                            }
                        }
                    }
                    for(b = 0; b < Ca.length; b++)d = Ca[b], d.behavior.fx += 0, d.behavior.fy += -a1.gravity * d.behavior.mass, d.behavior.fz += 0;
                },
                calculateDelta: function(a1, b) {},
                savePos: function(a1, b) {},
                restorePos: function(a1, b) {},
                sqDist: function(a1, b, c) {
                    return 0;
                },
                kineticEnergy: function(a1) {},
                storePosition: function(a1) {},
                recallPosition: function(a1) {},
                doCollisions: function(a1) {}
            }
        };
        return La;
    };
    return n;
}(), createCindy = CindyJS;
"undefined" !== typeof process && "undefined" !== typeof module && "undefined" !== typeof module.exports && "undefined" === typeof window && (module.exports = CindyJS); //# sourceMappingURL=Cindy.js.map

//# sourceMappingURL=index.6795d7fe.js.map
