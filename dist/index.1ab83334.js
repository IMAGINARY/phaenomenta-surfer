(function() {
    "use strict";
    CindyJS.registerPlugin(1, "symbolic", function(h) {
        function k(a) {
            if (null == a || "object" != typeof a) return a;
            if (a instanceof Array) {
                var b = [];
                for(var g = 0, c = a.length; g < c; g++)b[g] = k(a[g]);
                return b;
            }
            if (a instanceof Object) {
                b = {};
                for(g in a)a.hasOwnProperty(g) && 0 <= "oper impl args ctype stack name arglist value real imag key obj body".split(" ").indexOf(g) && (b[g] = k(a[g]));
                a.modifs && (b.modifs = a.modifs);
                return b;
            }
        }
        var c = function(a) {
            return {
                ctype: "number",
                value: {
                    real: a,
                    imag: 0
                }
            };
        }, d = function(a, b) {
            return {
                ctype: "function",
                oper: a,
                args: b,
                modifs: {}
            };
        }, u = {
            sin$1: function(a) {
                return [
                    d("cos$1", [
                        a[0]
                    ])
                ];
            },
            cos$1: function(a) {
                return [
                    d("sub$2", [
                        c(0),
                        d("sin$1", [
                            a[0]
                        ])
                    ])
                ];
            },
            exp$1: function(a) {
                return [
                    d("exp$1", [
                        a[0]
                    ])
                ];
            },
            log$1: function(a) {
                return [
                    d("div$2", [
                        c(1),
                        a[0]
                    ])
                ];
            },
            sqrt$1: function(a) {
                return [
                    d("div$2", [
                        c(.5),
                        d("sqrt$1", [
                            a[0]
                        ])
                    ])
                ];
            },
            add$2: function(a) {
                return [
                    c(1),
                    c(1)
                ];
            },
            sub$2: function(a) {
                return [
                    c(1),
                    c(-1)
                ];
            },
            mult$2: function(a) {
                return [
                    a[1],
                    a[0]
                ];
            },
            div$2: function(a) {
                return [
                    d("div$2", [
                        c(1),
                        a[1]
                    ]),
                    d("div$2", [
                        d("sub$2", [
                            c(0),
                            a[0]
                        ]),
                        d("mult$2", [
                            a[1],
                            a[1]
                        ])
                    ])
                ];
            },
            pow$2: function(a) {
                return [
                    d("mult$2", [
                        a[1],
                        d("pow$2", [
                            a[0],
                            d("sub$2", [
                                a[1],
                                c(1)
                            ])
                        ])
                    ]),
                    d("mult$2", [
                        d("log$1", [
                            a[0]
                        ]),
                        d("pow$2", [
                            a[0],
                            a[1]
                        ])
                    ])
                ];
            },
            ";": function(a) {
                return "void" == a[1].ctype ? [
                    c(1),
                    c(0)
                ] : [
                    c(0),
                    c(1)
                ];
            }
        }, w = {
            sin$1: function(a, b) {
                return Infinity;
            },
            cos$1: function(a, b) {
                return Infinity;
            },
            exp$1: function(a, b) {
                return Infinity;
            },
            log$1: function(a, b) {
                return Infinity;
            },
            sqrt$1: function(a, b) {
                return Infinity;
            },
            add$2: function(a, b) {
                return Math.max(e(a[0], b), e(a[1], b));
            },
            sub$2: function(a, b) {
                return Math.max(e(a[0], b), e(a[1], b));
            },
            mult$2: function(a, b) {
                return e(a[0], b) + e(a[1], b);
            },
            div$2: function(a, b) {
                return 0 === e(a[1], b) ? e(a[0], b) : Infinity;
            },
            pow$2: function(a, b) {
                return 0 === e(a[1], b) ? e(a[0], b) * h.evaluate(a[1]).value.real : Infinity;
            },
            ";": function(a, b) {
                if ("void" === a[1].ctype) return e(a[0], b);
                h.evaluate(a[0]);
                return e(a[1], b);
            }
        }, q = {
            "+": "add$2",
            "-": "sub$2",
            "*": "mult$2",
            "/": "div$2",
            "^": "pow$2"
        }, p = function(a, b) {
            if ("variable" === a.ctype && b[a.name]) return b[a.name];
            a.args && (a.args = a.args.map(function(a) {
                return p(a, b);
            }));
            return a;
        }, f = function(a, b) {
            return a && "number" === a.ctype && 0 === a.value.imag && a.value.real === b;
        }, m = function(a) {
            if (a.args && (a.args = a.args.map(m), a.args.every(function(a) {
                return "number" === a.ctype;
            }))) return h.evaluate(a);
            if ("add$2" === a.oper || "+" === a.oper) {
                if (f(a.args[0], 0)) return a.args[1];
                if (f(a.args[1], 0)) return a.args[0];
            } else if ("sub$2" === a.oper || "-" === a.oper) {
                if (f(a.args[1], 0)) return a.args[0];
            } else if ("mult$2" === a.oper || "*" === a.oper) {
                if (f(a.args[0], 0) || f(a.args[1], 0)) return c(0);
                if (f(a.args[0], 1)) return a.args[1];
                if (f(a.args[1], 1)) return a.args[0];
            } else if (("pow$2" === a.oper || "^" === a.oper) && f(a.args[1], 1)) return a.args[0];
            return a;
        }, r = function(a, b) {
            if ("variable" === a.ctype) return b[a.name] ? b[a.name] : c(0);
            if ("number" === a.ctype) return c(0);
            if ("infix" === a.ctype || "function" === a.ctype) {
                var g = h.getMyfunction(a.oper), e = c(0), v = {};
                if (g) for(var n in a.args)v[g.arglist[n].name] = a.args[n];
                for(var m in a.args){
                    n = r(a.args[m], b);
                    var l = c(0);
                    f(n, 0) || (g ? (l = {}, l[g.arglist[m].name] = c(1), l = p(k(r(k(g.body), l)), v)) : u[q[a.oper] || a.oper] && (l = u[q[a.oper] || a.oper](a.args)[m]), f(l, 0) || (f(n, 1) || (l = d("mult$2", [
                        l,
                        n
                    ])), e = f(e, 0) ? l : d("add$2", [
                        e,
                        l
                    ])));
                }
                return e;
            }
            console.error("Do not know how to differentiate:");
            console.log(a);
            return c(0);
        }, e = function(a, b) {
            if ("variable" === a.ctype) return b[a.name] ? b[a.name] : 0;
            if ("number" === a.ctype) return 0;
            if ("infix" === a.ctype || "function" === a.ctype) {
                if (";" != a.oper && a.args.every(function(a) {
                    return 0 === e(a, b);
                })) return 0;
                var c = h.getMyfunction(a.oper);
                if (c) {
                    var d = {}, f;
                    for(f in a.args)d[c.arglist[f].name] = e(a.args[f], b);
                    return e(m(k(c.body)), d);
                }
                if (c = w[q[a.oper] || a.oper]) return c(a.args, b);
            } else if ("void" === a.ctype) return 0;
            console.log("Do not know how to compute the degree of:");
            console.log(a);
            return Infinity;
        };
        h.defineFunction("diff", 3, function(a, b) {
            b = {};
            if (!a[1].name) return h.nada;
            b[a[1].name] = c(1);
            b = m(r(k(a[0]), b));
            return h.evaluate(p(k(a[2]), {
                "#": b
            }));
        });
        h.defineFunction("simplify", 2, function(a, b) {
            return h.evaluate(p(k(a[1]), {
                "#": m(k(a[0]))
            }));
        });
        for(var x = function(a, b) {
            b = {};
            for(var d in a)if (1 <= d) {
                if ("variable" === a[d].ctype) b[a[d].name] = 1;
                else return h.nada;
            }
            a = e(m(k(a[0])), b);
            Infinity == a && (a = -1);
            return c(a);
        }, t = 1; 3 >= t; t++)h.defineFunction("degree", 1 + t, x);
    });
}).call(this); //# sourceMappingURL=symbolic.js.map

//# sourceMappingURL=index.1ab83334.js.map
