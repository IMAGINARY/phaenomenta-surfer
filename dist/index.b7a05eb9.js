// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"84Rv8":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jeorp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _toolcoolRangeSlider = require("toolcool-range-slider");
var _surferJsCoreGpu = require("@imaginary-maths/surfer-js-core-gpu");
var _surferJsCoreGpuDefault = parcelHelpers.interopDefault(_surferJsCoreGpu);
const sliderCssUrl = new URL(require("af13962ea65af74a"));
function createSliders() {
    const container = document.getElementById("sliders");
    const commonSliderAttributes = {
        //    type: "vertical",
        generateLabels: "false",
        "animate-onclick": "false",
        "css-links": sliderCssUrl.href,
        theme: "surfer",
        "slider-width": "256px",
        "slider-height": "0.7rem"
    };
    const paramASlider = document.createElement("tc-range-slider");
    paramASlider.setAttribute("min", "0.4");
    paramASlider.setAttribute("max", "1.2");
    paramASlider.setAttribute("step", "0.0001");
    paramASlider.setAttribute("value", "1.0");
    const opacitySlider = document.createElement("tc-range-slider");
    opacitySlider.setAttribute("min", "0.3");
    opacitySlider.setAttribute("max", "1");
    opacitySlider.setAttribute("step", "0.0001");
    opacitySlider.setAttribute("value", "0.75");
    const zoomSlider = document.createElement("tc-range-slider");
    zoomSlider.setAttribute("min", "-3");
    zoomSlider.setAttribute("max", "0.5");
    zoomSlider.setAttribute("step", "0.0001");
    zoomSlider.setAttribute("value", "-1");
    const sliders = [
        paramASlider,
        opacitySlider,
        zoomSlider
    ];
    const attrs = Object.entries(commonSliderAttributes);
    sliders.forEach((s)=>{
        attrs.forEach(([name, value])=>s.setAttribute(name, value));
        container.append(s);
    });
    return {
        paramASlider,
        opacitySlider,
        zoomSlider
    };
}
const lights = [
    {
        // light emulating a front side material #1
        direction: [
            0,
            0,
            -1
        ],
        color: [
            231 / 255,
            49 / 255,
            77 / 255
        ],
        gamma: 1,
        cameraSpace: true
    },
    {
        // light emulating a front side material #2
        direction: [
            0,
            0,
            -1
        ],
        color: [
            243 / 255,
            179 / 255,
            41 / 255
        ],
        gamma: 10,
        cameraSpace: true
    },
    {
        // light emulating a back side material #1
        direction: [
            0,
            0,
            1
        ],
        color: [
            46 / 255,
            127 / 255,
            186 / 255
        ],
        gamma: 1,
        cameraSpace: true
    },
    {
        // light emulating a back side material #2
        direction: [
            0,
            0,
            1
        ],
        color: [
            98 / 255,
            177 / 255,
            114 / 255
        ],
        gamma: 10,
        cameraSpace: true
    },
    {
        // light that is fixed in the scene #1
        direction: [
            -10,
            10,
            -2
        ],
        color: [
            0.63,
            0.72,
            0.27
        ],
        gamma: 5,
        cameraSpace: false
    },
    {
        // light that is fixed in the scene #2
        direction: [
            10,
            -8,
            3
        ],
        color: [
            0.54,
            0.09,
            0.54
        ],
        gamma: 5,
        cameraSpace: false
    }, 
];
async function init() {
    const form = document.getElementById("formula-form");
    const input = document.getElementById("formula");
    const button = document.getElementById("go");
    const { paramASlider , opacitySlider , zoomSlider  } = createSliders();
    const im = new (0, _surferJsCoreGpuDefault.default).IlluminationModels.Montag(lights);
    const container = document.getElementById("surfer-container");
    const surferCoreGpu = await (0, _surferJsCoreGpuDefault.default).create(container, 512, 512);
    surferCoreGpu.setExpression(input.value);
    surferCoreGpu.setParameter("a", paramASlider.value);
    surferCoreGpu.setZoom(Math.pow(2, zoomSlider.value));
    surferCoreGpu.setAlpha(opacitySlider.value);
    surferCoreGpu.element.classList.add("surface");
    surferCoreGpu.setIlluminationModel(im);
    paramASlider.addEventListener("change", (evt)=>{
        surferCoreGpu.setParameter("a", evt.detail.value);
    });
    opacitySlider.addEventListener("change", (evt)=>{
        surferCoreGpu.setAlpha(evt.detail.value);
    });
    zoomSlider.addEventListener("change", (evt)=>{
        surferCoreGpu.setZoom(Math.pow(2, evt.detail.value));
    });
    const submit = ()=>surferCoreGpu.setExpression(input.value);
    const submitByKey = (e)=>e.code === "Enter" ? submit() : undefined;
    form.addEventListener("submit", submit);
    button.addEventListener("click", submit);
    input.addEventListener("keydown", submitByKey);
    window.addEventListener("message", (evt)=>surferCoreGpu.setExpression(evt.data));
}
init().then();

},{"@imaginary-maths/surfer-js-core-gpu":"7pqIr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","toolcool-range-slider":"6hpco","af13962ea65af74a":"48oyx"}],"7pqIr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>p);
parcelHelpers.export(exports, "SurferCoreGpu", ()=>l);
function e(e) {
    return e && e.__esModule ? e.default : e;
}
CindyJS;
function n(e) {
    return new Array(e + 1).fill(0).map((n, i)=>i / e);
}
function i(e, n) {
    return (function(e, n) {
        return Math.cos((2 * e - 1) / (2 * n) * Math.PI);
    }(e, n) + 1) / 2;
}
function t(e) {
    return new Array(e + 1).fill(0).map((e, n)=>n + 1).map((n)=>i(n, e + 1));
}
class o {
    minDegree;
    maxDegree;
    nodeGenerator;
    constructor(e = o.nodeGeneratorEquidistant(), n = Number.POSITIVE_INFINITY, i = 0){
        this.nodeGenerator = e, this.minDegree = Math.max(0, i), this.maxDegree = Math.max(this.minDegree, n);
    }
    getMinDegree() {
        return this.minDegree;
    }
    getMaxDegree() {
        return this.maxDegree;
    }
    generateNodes(e) {
        const n = Math.max(this.minDegree, Math.min(e, this.maxDegree)), i = this.nodeGenerator(n).map((e)=>Math.max(0, Math.min(e, 1)));
        for(i.length = Math.min(i.length); i.length < n + 1;)i.push(1);
        return i;
    }
    static nodeGeneratorEquidistant() {
        return n;
    }
    static nodeGeneratorChebyshev() {
        return t;
    }
}
class a {
    lights;
    constructor(e = [
        {
            direction: [
                0,
                0,
                -1
            ],
            color: [
                .3,
                .5,
                1
            ],
            gamma: 1,
            cameraSpace: !0
        },
        {
            direction: [
                0,
                0,
                -1
            ],
            color: [
                .5,
                1,
                1
            ],
            gamma: 10,
            cameraSpace: !0
        },
        {
            direction: [
                0,
                0,
                1
            ],
            color: [
                1,
                .2,
                .1
            ],
            gamma: 1,
            cameraSpace: !0
        },
        {
            direction: [
                0,
                0,
                1
            ],
            color: [
                1,
                1,
                .5
            ],
            gamma: 10,
            cameraSpace: !0
        },
        {
            direction: [
                -10,
                10,
                -2
            ],
            color: [
                .63,
                .72,
                .27
            ],
            gamma: 5,
            cameraSpace: !1
        },
        {
            direction: [
                10,
                -8,
                3
            ],
            color: [
                .54,
                .09,
                .54
            ],
            gamma: 5,
            cameraSpace: !1
        }
    ]){
        this.lights = e;
    }
    getLights() {
        return this.lights;
    }
}
const r = `${e('//initialize some variables\nmat = [\n    [0.3513, -0.4908, -0.7973],\n    [-0.8171, -0.5765, -0.0051],\n    [-0.4571, 0.6533, -0.6036]\n];\nsx = mouse().x;\nsy = mouse().y;\ndragging = false;\nN = 5; // degree of the surface; will be overwritten\nli = []; // nodes for interpolation; will be overwritten\nzoom = 2.2;\na = 0.3;\nalpha = .7;\naspectRatio = 1.0;\nhasTwoSides = true;\n\n//we stand at position mat*(0, 0, -2.2) and watch to (0,0,0).\n//ray(pixel, t) is the point in R^3 that lies at position t the ray behind the pixel at location pixel(vec2)\n//t=0 is corresponds to points within the interesting area near (0,0,0)\nray(pixel, t) := mat * ((t+2.2) * (pixel.x, pixel.y, 1) + (0, 0, -2.2));\n\n//sphere with radius 1 for clipping\nS(r) := (r * r - 1);\n\n//fun is the user defined trivariate polynomial\nfun(x, y, z) := x^2 + 1;\n\n//F takes vec3 instead of 3 variables\nF(p) := (p=p/zoom;fun(p.x, p.y, p.z));\n    \n//casteljau algorithm to evaluate and subdivide polynomials in Bernstein form.\n//poly is a vector containing the coefficients, i.e. p(x) = sum(0..N, i, poly_(i+1) * b_(i,N)(x)) where b_(i,N)(x) = choose(N, i)*x^i*(1-x)^(N-1)\ncasteljau(poly, x) := (\n  regional(alpha, beta);\n  alpha = 1-x;\n  beta = x;\n  forall(0..N, k,\n    repeat(N-k,\n      poly_# = alpha*poly_# + beta*poly_(#+1);\n    );\n  );\n  poly //the bernstein-coefficients of the polynomial in the interval [x,1]\n);\n\n//evaluates a polynomial, represented as vector of coefficients in bernstein-form\neval(poly, x) := casteljau(poly, x)_1;\n\nInfinity = 1e100000;\n\n//this function has to be called whenever fun changes\ninit() := (\n  dx = .05; dy =.02;\n  diff(fun(x,y,z), x, dxF(x,y,z) := #);\n  diff(fun(x,y,z), y, dyF(x,y,z) := #);\n  diff(fun(x,y,z), z, dzF(x,y,z) := #);\n\n    N = degree(fun(x,y,z), x, y, z);\n    if(N == -1, N=Infinity);\n    print("Surface degree: " + text(N));\n    newLi = getInterpolationNodes(N);\n    N = length(newLi) - 1;\n    print("Degree of interpolating polynomial: " + text(N));\n    print("Interpolation nodes: " + text(newLi));\n\n    if(newLi != li,\n      li = newLi;\n      //A is the matrix of the linear map that evaluates a polynomial in bernstein-form at the interpolation nodes\n      A = apply(li, node,\n        //the i-th column contains the values of the (i,N) bernstein polynomial evaluated at the interpolation nodes\n        apply(0..N, i, eval(\n          apply(0..N, if(#==i,1,0)), // e_i = [0,0,0,1,0,0]\n          node //evaluate  b_(i,N)(node)\n        )) \n      );\n      \n      B = (inverse(A)); //B interpolates polynomials (in Bernstein basis), given the values [p(li_1), p(li_2), ...]\n    )\n);\n\n//B3 is a matrix that interpolates quadratic polynomials (in monomial basis), given the values [p(-2), p(0), p(2)]\nB3 = inverse(apply([-2, 0, 2], c, apply(0 .. 2, i, c ^ i))); \n\n//use symbolic differentation function\ndF(p) := (p=p/zoom; (\n    dxF(p.x,p.y,p.z),\n    dyF(p.x,p.y,p.z),\n    dzF(p.x,p.y,p.z)\n));\n\n//update the color color for the pixel at position pixel assuming that the surface has been intersected at ray(pixel, dst)\n//because of the alpha-transparency updatecolor should be called for the intersections with large dst first\n// color is a float[4] representing RGBA with premultiplied alpha\nupdatecolor(pixel, dst, color) := (\n  regional(x, normal, dr);\n  x = ray(pixel, dst); //the intersection point in R^3\n  color = (1 - alpha) * color;\n        \n  normal = dF(x);\n  normal = normal / |normal|;\n\n  if(hasTwoSides == false,\n    dr = ray(pixel,1)-ray(pixel,0);\n    if(normal*dr>0, normal=-normal);\n  );\n\n  colorHit = (0., 0., 0.);\n  forall(1..length(lightdirs),\n    //illuminate if the normal and lightdir point in the same direction\n    illumination = max(0, (lightdirs_# / abs(lightdirs_#)) * normal);\n    colorHit = colorHit + alpha * (illumination ^ gamma_#) * colors_#;\n  );\n  color = color + (colorHit_1, colorHit_2, colorHit_3, alpha);\n);\n\n\nnsign(pixel, a, b) := ( //Descartes rule of sign for the interval (a,b)\n  //obtain the coefficients in bernstein basis of F along the ray in interval (a,b) by interpolation within this interval\n  poly = B * apply(li,\n    F(ray(pixel, a+#*(b-a))) //evaluate F(ray(pixel, \xb7)) along Chebyshev nodes for (a,b)\n  );\n  //count the number of sign changes\n  ans = 0;\n  //last = poly_1;\n  forall(2..(N+1), k,\n    //if(last == 0, last = poly_k;); this (almost) never happens\n    if(min(poly_(k-1), poly_k) <= 0 & 0 <= max(poly_(k-1), poly_k), //sign switch; avoid products due numerics\n      ans = ans + 1;\n    );\n  );\n  ans //return value   \n);\n\n\n//bisect F(ray(pixel, \xb7)) in [x0, x1] assuming that F(ray(pixel, x0)) and F(ray(pixel, x1)) have opposite signs\nbisectf(pixel, x0, x1) := (\n    regional(v0, v1, m, vm);\n    v0 = F(ray(pixel, x0));\n    v1 = F(ray(pixel, x1));\n    repeat(11,\n        m = (x0 + x1) / 2; vm = F(ray(pixel, m));\n        if (min(v0,vm) <= 0 & 0 <= max(v0, vm), //sgn(v0)!=sgn(vm); avoid products due numerics\n            (x1 = m; v1 = vm;),\n            (x0 = m; v0 = vm;)\n        );\n    );\n    m //return value   \n);\n\n//id encodes a node in a binary tree using heap-indices\n//1 is root node and node v has children 2*v and 2*v+1\n//computes s=2^depth of a node id: Compute floor(log_2(id));\n//purpose: id corresponds interval [id-s,id+1-s]/s\ngets(id) := (\n  s = 1;\n  repeat(15,\n    if(2*s<=id,\n      s = 2*s;\n    )\n  );\n  s //return value\n);\n\n//determines the next node in the binary tree that would be visited by a regular in DFS\n//if the children of id are not supposed to be visited\n//In interval logic: finds the biggest unvisited interval directly right of the interval of id.\nnext(id) := (\n  id = id+1;\n  //now: remove zeros from right (in binary representation) while(id&1) id=id>>1;\n  repeat(15,\n    if(mod(id,2)==0, \n      id = floor(id/2);\n    )\n  );\n  if(id==1, 0, id) //return value - id 0 means we stop our DFS\n);\n\n//what color should be given to pixel with pixel-coordinate pixel (vec2)\n// color is a float[4] representing RGBA with premultiplied alpha\ncomputeColor(pixel, l, u, color) := (\n  regional(a, b);\n  //traverse binary tree (DFS) using heap-indices\n  //1 is root node and node v has children 2*v and 2*v+1\n  id = 1; \n  //maximum number of steps\n  repeat(min(N*8,80),\n    //id=0 means we are done; do only a DFS-step if we are not finished yet\n    if(id>0,\n      s = gets(id); //s = floor(log_2(id))\n      \n      //the intervals [a,b] are chossen such that (id in binary notation)\n      //id = 1   => [a,b]=[l,u]\n      //id = 10  => [a,b]=[l,(u+l)/2]\n      //id = 101 => [a,b]=[l,(u+3*l)/4]\n      //id = 11  => [a,b]=[(u+l)/2,u]\n      //...\n      if(findAllRoots,(\n        // back to front\n        a = u - (u-l)*((id+1)/s-1);\n        b = u - (u-l)*((id+0)/s-1);\n      ),(\n        // front to back\n        a = l + (u-l)*((id+0)/s-1);\n        b = l + (u-l)*((id+1)/s-1);\n      ));\n\n      //how many sign changes has F(ray(pixel, \xb7)) in (a,b)?\n      cnt = nsign(pixel, a, b);\n      if(cnt == 1, // in this case we found a root (or it is likely to have a multiple root)\n        //=>colorize and break DFS\n        color = updatecolor(pixel, bisectf(pixel, a, b), color);\n        if(findAllRoots,\n          id = next(id), // break DFS\n          id = 0 // stop searching\n        ),\n      if(cnt == 0, //there is no root\n        id = next(id), //break DFS\n        \n        //otherwise cnt>=2: there are cnt - 2*k roots.\n        id = 2*id;  //visit first child within DFS\n      )\n  );  \n  ));\n  color\n);\n')}; csInitDone();`, s = new Map;
CindyJS.registerPlugin(1, "surfer-js-core-gpu", (e)=>{
    const n = e.instance, i = s.get(n);
    if (void 0 === i) throw new Error("Unknown CindyJS instance.");
    const { onInit: t  } = i;
    e.defineFunction("csInitDone", 0, ()=>t(e));
});
class l {
    api;
    cdy;
    element;
    canvas;
    intersectionAlgorithm;
    illumnimationModel;
    expression = "x^2 - 1";
    twoSided = !0;
    alpha = 1;
    zoom = 1;
    parameters = {};
    static IntersectionAlgorithms = {
        PolynomialInterpolation: o
    };
    static IlluminationModels = {
        Montag: a
    };
    constructor(e, n, i){
        this.api = e, this.cdy = e.instance, this.element = n, this.canvas = i;
        const t = o.nodeGeneratorChebyshev();
        this.intersectionAlgorithm = new o(t, 7), this.illumnimationModel = new a, this.defineCindyScriptFunctions(), this.setIntersectionAlgorithm(this.intersectionAlgorithm), this.setIlluminationModel(this.illumnimationModel), this.setExpression(this.expression), this.setTwoSided(this.twoSided), this.setAlpha(this.alpha), this.setZoom(this.zoom), Object.entries(this.parameters).forEach(([e, n])=>this.setParameter(e, n));
    }
    defineCindyScriptFunctions() {
        const e = (e)=>({
                ctype: "list",
                value: e.map((e)=>({
                        ctype: "number",
                        value: {
                            real: e,
                            imag: 0
                        }
                    }))
            }), n = (n)=>({
                ctype: "list",
                value: n.map((n)=>e(n))
            });
        (()=>{
            this.api.defineFunction("getInterpolationNodes", 1, (n)=>{
                const i = this.api.evaluateAndVal(n[0]).value.real, t = this.getIntersectionAlgorithm().generateNodes(i);
                return e(t);
            });
        })(), (()=>{
            this.api.defineFunction("getCameraSpaceLightDirections", 0, ()=>n(this.getIlluminationModel().getLights().filter(({ cameraSpace: e  })=>e).map(({ direction: e  })=>e))), this.api.defineFunction("getSurfaceSpaceLightDirections", 0, ()=>n(this.getIlluminationModel().getLights().filter(({ cameraSpace: e  })=>!e).map(({ direction: e  })=>e))), this.api.defineFunction("getLightColors", 0, ()=>n(this.getIlluminationModel().getLights().map(({ color: e  })=>e))), this.api.defineFunction("getLightGammas", 0, ()=>e(this.getIlluminationModel().getLights().map(({ gamma: e  })=>e)));
        })();
    }
    getIntersectionAlgorithm() {
        return this.intersectionAlgorithm;
    }
    getIlluminationModel() {
        return this.illumnimationModel;
    }
    getExpression() {
        return this.expression;
    }
    getTwoSided() {
        return this.twoSided;
    }
    getAlpha() {
        return this.alpha;
    }
    getZoom() {
        return this.zoom;
    }
    getParameter(e) {
        return this.parameters[e];
    }
    getParameters() {
        return {
            ...this.parameters
        };
    }
    getParameterNames() {
        return Object.keys(this.parameters);
    }
    setExpression(e) {
        return this.expression = e, this.cdy.evokeCS(`fun(x,y,z) := (${e}); init();`), this;
    }
    setTwoSided(e) {
        return this.twoSided = e, this.cdy.evokeCS(`hasTwoSides = (${e ? "true" : "false"});`), this;
    }
    setAlpha(e) {
        return this.alpha = e, this.cdy.evokeCS(`alpha = (${e});`), this;
    }
    setZoom(e) {
        return this.zoom = e, this.cdy.evokeCS(`zoom = (${e});`), this;
    }
    setParameter(e, n) {
        return this.parameters[e] = n, this.cdy.evokeCS(`${e} = (${n});`), this;
    }
    setIntersectionAlgorithm(e) {
        this.intersectionAlgorithm = e, this.cdy.evokeCS("init();");
    }
    setIlluminationModel(e) {
        this.illumnimationModel = e, this.cdy.evokeCS("init();");
    }
    static async create(n, i = 256, t = 256) {
        const o = n.ownerDocument.createElement("canvas");
        o.width = i, o.height = t, n.appendChild(o);
        const a = CindyJS.newInstance({
            scripts: {
                init: r,
                draw: e("gsave();\nif(aspectRatio > 1.0,scale(1.0/aspectRatio));\n\n//the following is executed for every rendered frame\nif (dragging,\n    dx = 3 * (sx - mouse().x); dy = 3 * (sy - mouse().y);,\n    dx = .9*dx; dy = .9*dy;\n);\n\nsx = mouse().x;\nsy = mouse().y;\n\n//the rotation matrix: It is modified either if the user is dragging or time passes\nmat = mat * (\n    (1, 0, 0),\n    (0, cos(dy), -sin(dy)),\n    (0, sin(dy), cos(dy))\n) * (\n    (cos(dx), 0, -sin(dx)),\n    (0, 1, 0),\n    (sin(dx), 0, cos(dx))\n);\n\n\n//configuration for the lights in the scene. A light has a position, a gamma-parameter for its shininess and a color\nlightdirs = apply(getCameraSpaceLightDirections(),mat * #) ++ getSurfaceSpaceLightDirections();\ngamma = getLightGammas();\ncolors = getLightColors();\n\n\n// translucent surface: find all roots from back to front\n// opaque surface: stop after first root has been found\nfindAllRoots = alpha < .99;\n\n\ncolorplot(\n  spolyvalues = apply([-2, 0, 2], v, S(ray(#, v))); //evaluate S along ray\n  spoly = B3 * spolyvalues;                         //interpolate to monomial basis\n  D = (spoly_2 * spoly_2) - 4. * spoly_3 * spoly_1; //discriminant of spoly\n  \n  color = (0., 0., 0., 0.); // background color: fully transparent\n  if (D >= 0, //ray intersects ball\n    color = computeColor(\n      #, \n      (-spoly_2 - re(sqrt(D))) / (2 * spoly_3), //intersection entering the ball\n      (-spoly_2 + re(sqrt(D))) / (2 * spoly_3), //intersection leaving the ball\n      color\n    );              \n  );\n  color //return value: WebGL uses premultiplied alpha by default for RGBA which is already our internal representation!!!\n); //render the scene. # is the pixel coordinate\n\ngrestore();\n\n// loop animation if there is motion (and we are not dragging), otherwise stop\nif(dragging % |(dx,dy)|>.0001, playanimation(), pauseanimation());\n"),
                mousedown: e("sx = mouse().x;\nsy = mouse().y;\ndragging = sx < .5;\n"),
                mouseup: e("dragging = false;\n")
            },
            animation: {
                autoplay: !1
            },
            use: [
                "CindyGL",
                "symbolic",
                "surfer-js-core-gpu"
            ],
            ports: [
                {
                    element: o,
                    transform: [
                        {
                            visibleRect: [
                                -0.51,
                                -0.51,
                                .51,
                                .51
                            ]
                        }
                    ]
                }
            ]
        });
        return new Promise((e)=>{
            s.set(a, {
                onInit: (n)=>{
                    const i = o.parentElement;
                    if (null === i) throw new Error("Something went wrong during startup of Cinderella applet");
                    new ResizeObserver(()=>{
                        const e = o.width / o.height;
                        a.evokeCS(`aspectRatio = ${e};`);
                    }).observe(o);
                    const t = new l(n, i, o);
                    e(t);
                }
            }), a.startup();
        });
    }
}
var p = l;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6hpco":[function(require,module,exports) {
/* 
Tool Cool Range Slider 
Version: 4.0.18
Documentation: https://github.com/toolcool-org/toolcool-range-slider 
License: MIT License        
Author: Tool Cool, toolcool.org@gmail.com>                          
*/ (()=>{
    var Vn = Object.defineProperty;
    var vt = Math.pow, Nn = (r, i, t)=>i in r ? Vn(r, i, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t
        }) : r[i] = t;
    var ie = (r, i, t)=>(Nn(r, typeof i != "symbol" ? i + "" : i, t), t);
    var yt = (r, i)=>` ${i && i.length > 0 ? i.map((t)=>`<link rel="stylesheet" href="${t}" />`).join("") : ""} <style> ${r} </style> <div class="range-slider-box"> <div class="row"> <div id="range-slider" class="range-slider"> <div class="container"> <div class="panel"></div> <div class="panel-fill"></div> <div class="container"> <div class="pointer" tabindex="0" role="slider"> <div class="pointer-shape"></div> </div> </div> </div> </div> </div> </div>`;
    var xt = ":host{--width:300px;--height:.25rem;--opacity:.4;--panel-bg:#cbd5e1;--panel-bg-hover:#94a3b8;--panel-bg-fill:#475569;--panel-bg-border-radius:1rem;--pointer-width:1rem;--pointer-height:1rem;--pointer-bg:#fff;--pointer-bg-hover:#dcdcdc;--pointer-bg-focus:#dcdcdc;--pointer-shadow:0 0 2px rgba(0,0,0,0.8);--pointer-shadow-hover:0 0 2px #000;--pointer-shadow-focus:var(--pointer-shadow-hover);--pointer-border:1px solid hsla(0,0%,88%,0.5);--pointer-border-hover:1px solid #94a3b8;--pointer-border-focus:var(--pointer-border-hover);--pointer-border-radius:100%;--animate-onclick:.3s}:host{max-width:100%}.range-slider-box{display:flex;position:relative;flex-direction:column}.range-slider{position:relative;width:var(--width,100%);height:var(--height,0.25rem);touch-action:none;max-width:100%;box-sizing:border-box;cursor:pointer}.row{width:100%;display:flex;align-items:center}.range-slider.disabled{opacity:var(--opacity,0.4);cursor:default}.pointer.disabled{-webkit-filter:brightness(0.8);filter:brightness(0.8);cursor:default}.range-slider *{box-sizing:border-box}.container{position:absolute;width:100%;height:100%}.panel{position:absolute;z-index:10;width:100%;height:100%;background:var(--panel-bg,#2d4373);border-radius:var(--panel-bg-border-radius,1rem);overflow:hidden;transition:.3s all ease}.panel-fill{background:var(--panel-bg-fill,#000);border-radius:var(--panel-bg-border-radius,1rem);overflow:hidden;height:100%;position:absolute;z-index:10}.panel:hover{background:var(--panel-bg-hover,#5f79b7)}.disabled .panel:hover{background:var(--panel-bg,#5f79b7)}.pointer{position:absolute;z-index:20;outline:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.pointer-shape{background:var(--pointer-bg,#fff);background-size:contain;box-shadow:var(--pointer-shadow);border:var(--pointer-border);border-radius:var(--pointer-border-radius,100%);-webkit-transform:translateX(-50%);transform:translateX(-50%);width:var(--pointer-width,15px);height:var(--pointer-height,15px);transition:.3s all ease}.pointer-shape:hover{background:var(--pointer-bg-hover,#fff);background-size:contain;border:var(--pointer-border-hover);box-shadow:var(--pointer-shadow-hover)}.disabled .pointer-shape:hover{background:var(--pointer-bg,#fff);background-size:contain;border:var(--pointer-border);box-shadow:var(--pointer-shadow)}.pointer:focus .pointer-shape{background:var(--pointer-bg-focus,#fff);background-size:contain;border:var(--pointer-border-focus);box-shadow:var(--pointer-shadow-focus)}.disabled .pointer:focus .pointer-shape{background:var(--pointer-bg,#fff);background-size:contain;border:var(--pointer-border);box-shadow:var(--pointer-shadow)}.type-vertical .range-slider{--width:.25rem;--height:300px;max-height:100%}.type-vertical .range-slider .pointer{left:50%}.type-vertical .range-slider .panel-fill{width:100%}.type-vertical.range-slider-box{flex-direction:row}.type-vertical .row{flex-direction:column}.animate-on-click .pointer,.animate-on-click .panel-fill{transition:all var(--animate-onclick)}.range-dragging .panel-fill{cursor:move}";
    var oe = "pointers-overlap", se = "pointers-min-distance", ae = "pointers-max-distance", le = "range-dragging", ue = "data", de = "min", ce = "max", pe = "step", be = "round", ge = "type", fe = "theme", me = "rtl", he = "btt", ve = "disabled", ye = "keyboard-disabled", Pt = "slider-width", St = "slider-height", Et = "slider-radius", Tt = "slider-bg", At = "slider-bg-hover", Mt = "slider-bg-fill", Lt = "pointer-width", wt = "pointer-height", Dt = "pointer-radius", Ct = "pointer-bg", kt = "pointer-bg-hover", Ht = "pointer-bg-focus", It = "pointer-shadow", Rt = "pointer-shadow-hover", Bt = "pointer-shadow-focus", Ot = "pointer-border", Ft = "pointer-border-hover", Vt = "pointer-border-focus", xe = "animate-onclick", Nt = "css-links";
    var R = "vertical", V = "horizontal";
    var Ee = (r, i, t, n, a)=>{
        let d = i - r;
        return d === 0 ? t : (n - t) * (a - r) / d + t;
    }, B = (r)=>!isNaN(parseFloat(r)) && isFinite(r), E = (r, i)=>B(r) ? Number(r) : i, Ge = (r, i)=>i === 0 ? 0 : Math.round(r / i) * i, Ut = (r, i = 1 / 0)=>{
        if (i === 1 / 0) return r;
        let t = vt(10, i);
        return Math.round(r * t) / t;
    }, D = (r)=>r == null ? !1 : typeof r == "boolean" ? r : r.trim().toLowerCase() === "true";
    var zt = (r, i)=>{
        r.dispatchEvent(new CustomEvent("onPointerClicked", {
            detail: {
                $pointer: i
            }
        }));
    }, Wt = (r, i)=>{
        r.dispatchEvent(new CustomEvent("onMouseDown", {
            detail: {
                nativeEvent: i
            }
        }));
    }, Kt = (r, i)=>{
        r.dispatchEvent(new CustomEvent("onMouseUp", {
            detail: {
                nativeEvent: i
            }
        }));
    }, jt = (r, i)=>{
        r.dispatchEvent(new CustomEvent("onKeyDown", {
            detail: {
                nativeEvent: i
            }
        }));
    }, qt = (r, i)=>{
        if (!i || i.length <= 0) return;
        let t = i.map((a)=>B(a) ? E(a, a) : a), n = {
            values: t || []
        };
        n.value = t[0], n.value0 = t[0], n.value1 = t[0];
        for(let a = 1; a < t.length; a++)n[`value${a + 1}`] = t[a];
        r.dispatchEvent(new CustomEvent("change", {
            detail: n
        }));
    };
    var G = (r, i, t)=>{
        let n = 0, a, d, m, l, s = !1, f = (g1, T, w, P, M, H)=>{
            w !== void 0 && g1 > w && (g1 = w), T !== void 0 && g1 < T && (g1 = T), n = g1;
            let C = n;
            (P === R && H || P === V && M) && (C = 100 - C), P === R ? i.style.top = `${C}%` : i.style.left = `${C}%`;
        }, x = (g1)=>g1 === i || i.contains(g1), p = (g1, T, w, P)=>{
            a = g1, d = T, m = w, l = P;
        }, b = (g1)=>{
            s = g1, i.classList.toggle("disabled", s), s ? i.setAttribute("aria-disabled", "true") : i.hasAttribute("aria-disabled") && i.removeAttribute("aria-disabled");
        }, A = (g1, T)=>{
            T == null ? i.removeAttribute(g1) : i.setAttribute(g1, T);
        }, k = (g1)=>i.getAttribute(g1), c1 = (g1)=>{
            if (!s) {
                switch(g1.key){
                    case "ArrowLeft":
                        g1.preventDefault(), typeof a == "function" && a(t);
                        break;
                    case "ArrowRight":
                        g1.preventDefault(), typeof d == "function" && d(t);
                        break;
                    case "ArrowUp":
                        g1.preventDefault(), typeof m == "function" && m(t);
                        break;
                    case "ArrowDown":
                        g1.preventDefault(), typeof l == "function" && l(t);
                        break;
                }
                jt(r, g1);
            }
        }, h = ()=>{
            s || zt(r, i);
        };
        return i.className = `pointer pointer-${t}`, i.addEventListener("keydown", c1), i.addEventListener("click", h), {
            $pointer: i,
            get percent () {
                return n;
            },
            get disabled () {
                return s;
            },
            set disabled (g){
                b(g);
            },
            updatePosition: f,
            isClicked: x,
            setCallbacks: p,
            setAttr: A,
            getAttr: k,
            destroy: ()=>{
                i.removeEventListener("keydown", c1), i.removeEventListener("click", h), i.remove();
            }
        };
    };
    var Xt = (r)=>{
        if (r == null) return;
        if (Array.isArray(r)) return r;
        if (r.trim() === "") return;
        let t = r.split(","), n = [], a = !0;
        for(let d = 0; d < t.length; d++){
            let m = t[d].trim();
            m !== "" && (n.push(m), B(m) || (a = !1));
        }
        return a ? n.map((d)=>Number(d)) : n;
    }, Gt = (r, i)=>i ? i.findIndex((t)=>t === r || t.toString().trim() === r.toString().trim()) : -1;
    var Yt = (r)=>({
            updatePosition: (t, n, a, d)=>{
                if (n.length <= 0) return;
                let m = n.length === 1, l = n[0], s = n[n.length - 1];
                t === R ? (r.style.removeProperty("width"), r.style.removeProperty("right"), r.style.removeProperty("left"), m ? r.style.height = `${l}%` : r.style.height = `${Math.abs(l - s)}%`, d ? (r.style.bottom = "0%", m ? r.style.top = "auto" : r.style.top = `${Math.min(100 - s, 100 - l)}%`) : (r.style.bottom = "auto", m ? r.style.top = "0%" : r.style.top = `${Math.min(l, s)}%`)) : (r.style.removeProperty("height"), r.style.removeProperty("top"), r.style.removeProperty("bottom"), m ? r.style.width = `${l}%` : r.style.width = `${Math.abs(l - s)}%`, a ? (r.style.right = "0%", m ? r.style.left = "auto" : r.style.left = `${Math.min(100 - s, 100 - l)}%`) : (r.style.right = "auto", m ? r.style.left = "0%" : r.style.left = `${Math.min(l, s)}%`));
            }
        });
    var Ye = "--animate-onclick", Jt = "--width", Qt = "--height", Zt = "--panel-bg-border-radius", _t = "--panel-bg", $t = "--panel-bg-hover", en = "--panel-bg-fill", tn = "--pointer-width", nn = "--pointer-height", rn = "--pointer-border-radius", on = "--pointer-bg", sn = "--pointer-bg-hover", an = "--pointer-bg-focus", ln = "--pointer-shadow", un = "--pointer-shadow-hover", dn = "--pointer-shadow-focus", cn = "--pointer-border", pn = "--pointer-border-hover", bn = "--pointer-border-focus";
    var j = (r, i, t)=>{
        let n = new Map;
        for (let a of r.attributes){
            let d = a.nodeName.trim().toLowerCase();
            if (!i.test(d)) continue;
            let l = d.replace(/\D/g, "").trim(), s = l === "" || l === "0" || l === "1" ? 0 : E(l, 0) - 1, f = t && typeof t == "function" ? t(a.value) : a.value;
            n.set(s, f);
        }
        return n;
    }, fn = (r)=>{
        if (!r) return null;
        let i = r.getAttribute(Nt);
        if (!i) return null;
        let t = i.split(";"), n = [];
        for (let a of t)a.trim() !== "" && n.push(a.trim());
        return n;
    };
    var Je = [
        [
            Jt,
            Pt,
            "sliderWidth",
            null
        ],
        [
            Qt,
            St,
            "sliderHeight",
            null
        ],
        [
            Zt,
            Et,
            "sliderRadius",
            null
        ],
        [
            _t,
            Tt,
            "sliderBg",
            null
        ],
        [
            $t,
            At,
            "sliderBgHover",
            null
        ],
        [
            en,
            Mt,
            "sliderBgFill",
            null
        ],
        [
            tn,
            Lt,
            "pointer#Width",
            /^pointer([0-9]*)-width$/
        ],
        [
            nn,
            wt,
            "pointer#Height",
            /^pointer([0-9]*)-height$/
        ],
        [
            rn,
            Dt,
            "pointer#Radius",
            /^pointer([0-9]*)-radius$/
        ],
        [
            on,
            Ct,
            "pointer#Bg",
            /^pointer([0-9]*)-bg$/
        ],
        [
            sn,
            kt,
            "pointer#BgHover",
            /^pointer([0-9]*)-bg-hover$/
        ],
        [
            an,
            Ht,
            "pointer#BgFocus",
            /^pointer([0-9]*)-bg-focus$/
        ],
        [
            ln,
            It,
            "pointer#Shadow",
            /^pointer([0-9]*)-shadow$/
        ],
        [
            un,
            Rt,
            "pointer#ShadowHover",
            /^pointer([0-9]*)-shadow-hover$/
        ],
        [
            dn,
            Bt,
            "pointer#ShadowFocus",
            /^pointer([0-9]*)-shadow-focus$/
        ],
        [
            cn,
            Ot,
            "pointer#Border",
            /^pointer([0-9]*)-border$/
        ],
        [
            pn,
            Ft,
            "pointer#BorderHover",
            /^pointer([0-9]*)-border-hover$/
        ],
        [
            bn,
            Vt,
            "pointer#BorderFocus",
            /^pointer([0-9]*)-border-focus$/
        ]
    ], mn = (r, i, t)=>{
        let n = null, a = [], d = new Map, m = (c1, h = i)=>{
            let L = [
                ...h.classList
            ];
            for (let g1 of L)g1.startsWith(c1) && i.classList.remove(g1);
        }, l = ()=>{
            m("shape");
            let c1 = i.querySelectorAll(".pointer");
            for (let h of c1)m("shape", h);
        }, s = (c1)=>{
            n = c1, m("theme-"), typeof c1 == "string" && i.classList.add(`theme-${c1}`);
        }, f = ()=>{
            if (l(), !(a.length <= 0)) {
                i.classList.add("shape", `shape-${a[0]}`);
                for(let c1 = 1; c1 < a.length; c1++){
                    let h = a[c1];
                    if (!h) continue;
                    let L = i.querySelector(`.pointer-${c1}`);
                    !L || L.classList.add("shape", `shape-${h}`);
                }
            }
        }, x = (c1, h)=>{
            a[c1] = h, f();
        }, p = ()=>{
            l();
            let c1 = j(r, /^pointer([0-9]*)-shape$/);
            if (!(c1.size <= 0)) {
                for (let h of c1){
                    let L = h[0];
                    a[L] = h[1];
                }
                f();
            }
        }, b = (c1, h)=>`${c1}-${h}`, A = (c1, h, L)=>{
            let g1 = t[L];
            if (!g1) return;
            let T = L === 0 ? i : g1.$pointer;
            if (h == null) {
                d.has(b(c1, L)) && d.delete(b(c1, L)), T.style.removeProperty(c1);
                return;
            }
            d.set(b(c1, L), h), T.style.setProperty(c1, h);
        }, k = (c1, h)=>d.get(b(c1, h));
        return (()=>{
            for (let c1 of Je){
                let [h, L, g1, T] = c1;
                if (T) {
                    let P = j(r, T);
                    for (let M of P){
                        let H = M[0], C = M[1];
                        A(h, C, H);
                    }
                } else {
                    let P1 = r.getAttribute(L);
                    A(h, P1, 0);
                }
                let w = [];
                if (g1.indexOf("#") === -1) w.push([
                    g1,
                    0
                ]);
                else {
                    w.push([
                        g1.replace("#", ""),
                        0
                    ]), w.push([
                        g1.replace("#", "0"),
                        0
                    ]), w.push([
                        g1.replace("#", "1"),
                        0
                    ]);
                    for(let P2 = 1; P2 < t.length; P2++)w.push([
                        g1.replace("#", (P2 + 1).toString()),
                        P2
                    ]);
                }
                for (let P3 of w)try {
                    let M1 = P3[0], H1 = P3[1];
                    Object.prototype.hasOwnProperty.call(r, M1) || Object.defineProperty(r, M1, {
                        get () {
                            return k(h, H1);
                        },
                        set: (C)=>{
                            A(h, C, H1);
                        }
                    });
                } catch (M2) {
                    console.error(M2);
                }
            }
            s(r.getAttribute(fe)), p();
        })(), {
            setStyle: A,
            getStyle: k,
            get theme () {
                return n;
            },
            set theme (c){
                s(c);
            },
            get pointerShapes () {
                return a;
            },
            setPointerShape: x
        };
    };
    var W = "animate-on-click", Qe = "range-dragging";
    var hn = (r, i, t, n)=>{
        let a = [], d = (p)=>{
            for (let b of a)b.update && typeof b.update == "function" && b.update(p);
        }, m = ()=>{
            for (let p of a)p.destroy && typeof p.destroy == "function" && p.destroy();
        }, l = (p, b)=>{
            for (let A of a)A.onAttrChange && typeof A.onAttrChange == "function" && A.onAttrChange(p, b);
        }, s = (p)=>{
            if (!!p.gettersAndSetters) {
                for (let b of p.gettersAndSetters)if (!(!b.name || !b.attributes)) try {
                    Object.prototype.hasOwnProperty.call(r, b.name) || Object.defineProperty(r, b.name, b.attributes);
                } catch (A) {
                    console.error("defineSettersGetters error:", A);
                }
            }
        }, f = (p)=>{
            var A;
            if (!p.css) return;
            let b = (A = r.shadowRoot) == null ? void 0 : A.querySelector("style");
            !b || (b.innerHTML += p.css);
        };
        return {
            init: ()=>{
                if (!!window.tcRangeSliderPlugins) for (let p of window.tcRangeSliderPlugins){
                    let b = p();
                    a.push(b), b.init && typeof b.init == "function" && (b.init(r, i, t, n), s(b), f(b));
                }
            },
            update: d,
            onAttrChange: l,
            destroy: m
        };
    };
    var Wn = 10, vn = (r, i)=>{
        let t = new Map, n = /^value([0-9]*)$/;
        for (let l of r.attributes){
            let s = l.nodeName.trim().toLowerCase();
            if (!n.test(s)) continue;
            let x = s.replace("value", "").trim(), p = x === "" || x === "0" || x === "1" ? 0 : E(x, 0) - 1, b = B(l.value) ? E(l.value, 0) : l.value;
            t.set(p, b);
        }
        let a = Math.max(...Array.from(t.keys())), d = [];
        d.push([
            G(r, i, 0),
            t.get(0)
        ]);
        let m = i;
        for(let l1 = 1; l1 <= a; l1++){
            let s1 = i.cloneNode(!0);
            m.after(s1), m = s1, d.push([
                G(r, s1, l1),
                t.get(l1)
            ]);
        }
        return d;
    }, Ze = (r, i, t, n, a, d, m)=>{
        try {
            Object.defineProperty(r, n, {
                configurable: !0,
                get () {
                    if (!i) return;
                    let l = i.pointers[t];
                    if (!l) return;
                    let s = i.getTextValue(l.percent);
                    return B(s) ? E(s, s) : s;
                },
                set: (l)=>{
                    i.pointers[t] ? i == null || i.setValue(l, t) : i == null || i.addPointer(l);
                }
            }), Object.defineProperty(r, a, {
                configurable: !0,
                get () {
                    var l, s;
                    return (s = (l = i == null ? void 0 : i.pointers[t]) == null ? void 0 : l.getAttr("aria-label")) != null ? s : void 0;
                },
                set: (l)=>{
                    !i || i.setAriaLabel(t, l);
                }
            }), Object.defineProperty(r, d, {
                configurable: !0,
                get () {
                    var l, s;
                    return (s = (l = i == null ? void 0 : i.styles) == null ? void 0 : l.pointerShapes[t]) != null ? s : null;
                },
                set: (l)=>{
                    !i || !i.styles || i.styles.setPointerShape(t, l);
                }
            }), Object.defineProperty(r, m, {
                configurable: !0,
                get () {
                    var l;
                    return (l = i == null ? void 0 : i.pointers[t].disabled) != null ? l : !1;
                },
                set: (l)=>{
                    if (!i) return;
                    let s = i == null ? void 0 : i.pointers[t];
                    !s || (s.disabled = l);
                }
            });
        } catch (l) {
            console.error(l);
        }
    }, yn = (r, i)=>{
        let t = [
            [
                "value",
                "ariaLabel",
                "pointerShape",
                "pointerDisabled",
                0
            ],
            [
                "value0",
                "ariaLabel0",
                "pointerShape0",
                "pointer0Disabled",
                0
            ],
            [
                "value1",
                "ariaLabel1",
                "pointerShape1",
                "pointer1Disabled",
                0
            ]
        ];
        for(let n = 2; n < Wn; n++)t.push([
            `value${n}`,
            `ariaLabel${n}`,
            `pointer${n}Shape`,
            `pointer${n}Disabled`,
            n - 1
        ]);
        for (let n1 of t)Ze(r, i, n1[4], n1[0], n1[1], n1[2], n1[3]);
    }, _e = (r, i, t)=>{
        var a;
        let n = (a = t.shadowRoot) == null ? void 0 : a.querySelector(".container");
        if (!!n) for (let d of r)i ? n.prepend(d.$pointer) : n.append(d.$pointer);
    };
    var $e = 0, Y = 100, U = 2, xn = "0.3s", Pn = (r, i, t)=>{
        let n = t.map((e1)=>e1[0]), a = null, d = null, m = null, l = null, s = $e, f = Y, x, p, b = V, A = U, k = !1, c1 = !1, h = !1, L = 0, g1 = 1 / 0, T = !1, w, P, M = !1, H = !1, C = xn, tt = [], nt = (e1)=>{
            M || (e1.preventDefault && e1.preventDefault(), N(e1), window.addEventListener("mousemove", N), window.addEventListener("mouseup", Ae), Wt(r, e1));
        }, Ae = (e1)=>{
            M || (w = void 0, P = void 0, window.removeEventListener("mousemove", N), window.removeEventListener("mouseup", N), C && i.classList.add(W), Kt(r, e1));
        }, En = (e1, o)=>{
            if (n.length <= 0) return;
            if (n.length === 1) return n[0].isClicked(e1) && C && i.classList.remove(W), n[0];
            let u = An(e1);
            if (T) {
                let S = o, F = J(S);
                F !== void 0 && (S = Ge(S, F)), u ? (w = S, P = 0, C && i.classList.remove(W)) : w !== void 0 && (P = S - w, w = S);
            }
            if (!Tn(e1) && !u) {
                for (let S1 of n)if (!!S1.isClicked(e1)) return C && i.classList.remove(W), S1;
                for (let S2 of n)if (a === S2) return S2;
            }
            let v = 1 / 0, y = null;
            for (let S3 of n){
                let F1 = Math.abs(o - S3.percent);
                F1 < v && (v = F1, y = S3);
            }
            return y;
        }, rt = ()=>n.findIndex((e1)=>a === e1 && !e1.disabled), N = (e1)=>{
            let o;
            if (b === R) {
                let { height: v , top: y  } = i.getBoundingClientRect(), S = e1.type.indexOf("mouse") !== -1 ? e1.clientY : e1.touches[0].clientY;
                o = Math.min(Math.max(0, S - y), v) * 100 / v;
            } else {
                let { width: v1 , left: y1  } = i.getBoundingClientRect(), S1 = e1.type.indexOf("mouse") !== -1 ? e1.clientX : e1.touches[0].clientX;
                o = Math.min(Math.max(0, S1 - y1), v1) * 100 / v1;
            }
            if ((k || c1) && (o = 100 - o), a = En(e1.target, o), T && n.length > 1 && P !== void 0) {
                let v2 = n[0], y2 = n[n.length - 1], S2 = v2.percent + P < 0, F = y2.percent + P > 100;
                if (S2 || F) return;
                for(let re = 0; re < n.length; re++)I(re, n[re].percent + P);
                return;
            }
            let u = rt();
            u !== -1 && (I(u, o), a == null || a.$pointer.focus());
        }, it = (e1)=>{
            if (M || document.activeElement !== r || (a == null ? void 0 : a.disabled)) return;
            e1.stopPropagation(), e1.preventDefault();
            let o = e1.deltaY < 0, u = k || c1, v = o ? !u : u, y = rt();
            y !== -1 && (v ? q(y, n[y].percent) : X(y, n[y].percent));
        }, ot = (e1)=>{
            M || H || (b === R ? c1 ? I(e1, 100) : I(e1, 0) : k ? X(e1, n[e1].percent) : q(e1, n[e1].percent));
        }, st = (e1)=>{
            M || H || (b === R ? c1 ? I(e1, 0) : I(e1, 100) : k ? q(e1, n[e1].percent) : X(e1, n[e1].percent));
        }, at = (e1)=>{
            M || H || (b === R ? c1 ? X(e1, n[e1].percent) : q(e1, n[e1].percent) : k ? I(e1, 100) : I(e1, 0));
        }, lt = (e1)=>{
            M || H || (b === R ? c1 ? q(e1, n[e1].percent) : X(e1, n[e1].percent) : k ? I(e1, 0) : I(e1, 100));
        }, Tn = (e1)=>e1.classList.contains("panel"), An = (e1)=>e1.classList.contains("panel-fill"), q = (e1, o)=>{
            if (o === void 0) return;
            let u = J(o);
            u == null && (u = 1), o -= u, o < 0 && (o = 0), I(e1, o);
        }, X = (e1, o)=>{
            if (o === void 0) return;
            let u = J(o);
            u == null && (u = 1), o += u, o > 100 && (o = 100), I(e1, o);
        }, z = ()=>{
            !l || l.update({
                percents: ut(),
                values: dt(),
                $pointers: ct(),
                min: pt(),
                max: bt(),
                data: Le(),
                step: Me(),
                round: De(),
                type: we(),
                textMin: Q(),
                textMax: Z(),
                rightToLeft: He(),
                bottomToTop: Ie(),
                pointersOverlap: Oe(),
                pointersMinDistance: Ce(),
                pointersMaxDistance: ke(),
                rangeDragging: Fe(),
                disabled: Re(),
                keyboardDisabled: Be()
            });
        }, Mn = ()=>{
            z();
        }, Ln = (e1)=>{
            if (!(h || n.length <= 1 || f === s)) {
                if (e1 === 0) {
                    let o = g1 * 100 / (f - s);
                    return Math.max(0, n[e1 + 1].percent - o);
                } else {
                    let o1 = L * 100 / (f - s);
                    return Math.min(n[e1 - 1].percent + o1, 100);
                }
            }
        }, wn = (e1)=>{
            if (!(h || n.length <= 1 || f === s)) {
                if (e1 === n.length - 1) {
                    let o = g1 * 100 / (f - s);
                    return Math.min(n[e1 - 1].percent + o, 100);
                } else {
                    let o1 = L * 100 / (f - s);
                    return Math.max(0, n[e1 + 1].percent - o1);
                }
            }
        }, J = (e1)=>{
            let o;
            if (typeof x == "function") {
                let u = Ee(0, 100, s, f, e1);
                o = x(u, e1);
            } else o = x;
            if (B(o)) {
                let u1 = f - s;
                return o = u1 === 0 ? 0 : o * 100 / u1, o;
            }
        }, K = (e1)=>{
            if (e1 === void 0) return;
            let o = Ee(0, 100, s, f, e1);
            return p !== void 0 ? p[Math.round(o)] : Ut(o, A);
        }, Q = ()=>p !== void 0 ? p[s] : s, Z = ()=>p !== void 0 ? p[f] : f, Me = ()=>x, Dn = (e1)=>{
            var o;
            return e1 <= 0 || h ? Q() : (o = K(n[e1 - 1].percent)) != null ? o : "";
        }, Cn = (e1)=>{
            var o;
            return n.length <= 1 || e1 >= n.length - 1 || h ? Z() : (o = K(n[e1 + 1].percent)) != null ? o : "";
        }, ut = ()=>n.map((e1)=>e1.percent), dt = ()=>n.map((e1)=>K(e1.percent)), ct = ()=>n.map((e1)=>e1.$pointer), pt = ()=>s, bt = ()=>f, Le = ()=>p, we = ()=>b, De = ()=>A, Ce = ()=>L, ke = ()=>g1, kn = (e1)=>tt[e1], He = ()=>k, Ie = ()=>c1, Re = ()=>M, Be = ()=>H, Oe = ()=>h, Fe = ()=>T, I = (e1, o)=>{
            if (o === void 0) return;
            let u = J(o);
            u !== void 0 && (o = Ge(o, u));
            let v = n[e1];
            if (!!v) {
                v.updatePosition(o, Ln(e1), wn(e1), b, k, c1), d == null || d.updatePosition(b, n.map((y)=>y.percent), k, c1), z();
                for (let y of n){
                    let S = K(y.percent);
                    S !== void 0 && (y.setAttr("aria-valuenow", S.toString()), y.setAttr("aria-valuetext", S.toString()));
                }
                In(), qt(r, n.map((y)=>K(y.percent)));
            }
        }, O = ()=>{
            for(let e1 = 0; e1 < n.length; e1++)I(e1, n[e1].percent);
        }, Hn = (e1, o)=>{
            s = p !== void 0 ? 0 : E(e1, $e), f = p !== void 0 ? p.length - 1 : E(o, Y), _(s), $(f);
        }, In = ()=>{
            var e1, o;
            for(let u = 0; u < n.length; u++){
                let v = n[u];
                v.setAttr("aria-valuemin", ((e1 = Dn(u)) != null ? e1 : "").toString()), v.setAttr("aria-valuemax", ((o = Cn(u)) != null ? o : "").toString());
            }
        }, _ = (e1)=>{
            s = E(e1, $e), s > f && (f = s + Y), O();
        }, $ = (e1)=>{
            f = E(e1, Y), f < s && (f = s + Y), O();
        }, gt = (e1)=>{
            h = !0;
            for(let o = 0; o < e1.length; o++)ee(e1[o], o);
            h = !1;
            for(let o1 = 0; o1 < e1.length; o1++)ee(e1[o1], o1);
        }, ee = (e1, o)=>{
            let u;
            p !== void 0 ? (u = e1 == null ? 0 : Gt(e1, p), u === -1 && (u = 0)) : (u = E(e1, s), u < s && (u = s), u > f && (u = f));
            let v = Ee(s, f, 0, 100, u);
            I(o, v);
        }, te = (e1)=>{
            if (e1 == null) {
                x = void 0;
                return;
            }
            if (typeof e1 == "function") {
                x = e1, O();
                return;
            }
            if (B(e1)) {
                x = E(e1, 1);
                let o = Math.abs(f - s);
                x > o && (x = void 0), O();
                return;
            }
            x = void 0;
        }, Ve = (e1)=>{
            h = e1, O();
        }, Ne = (e1)=>{
            (!B(e1) || e1 < 0) && (e1 = 0), L = e1;
        }, Ue = (e1)=>{
            (!B(e1) || e1 < 0) && (e1 = 1 / 0), g1 = e1;
        }, ze = (e1)=>{
            M = e1, i.classList.toggle("disabled", M), M ? i.setAttribute("aria-disabled", "true") : i.hasAttribute("aria-disabled") && i.removeAttribute("aria-disabled");
        }, ft = (e1)=>{
            H = e1;
        }, We = (e1)=>{
            if (e1 == null) {
                p = void 0;
                return;
            }
            if (p = Xt(e1), p === void 0 || p.length <= 0) {
                p = void 0;
                return;
            }
            _(0), $(p.length - 1), x === void 0 && te(1);
        }, Ke = (e1)=>{
            var v;
            typeof e1 == "string" ? b = e1.trim().toLowerCase() === R ? R : V : b = V;
            let o = (v = r.shadowRoot) == null ? void 0 : v.querySelector(".range-slider-box");
            if (!o) return;
            o.className = `range-slider-box type-${b}`, O();
            let u = b === R ? "vertical" : "horizontal";
            for (let y of n)y.setAttr("aria-orientation", u);
        }, je = (e1)=>{
            k = e1, n.length > 1 && _e(n, k, r), O(), z();
        }, qe = (e1)=>{
            c1 = e1, n.length > 1 && _e(n, c1, r), O(), z();
        }, Xe = (e1)=>{
            A = E(e1, U), A < 0 && (A = U), z();
        }, mt = (e1)=>{
            e1 == null || e1.toString().trim().toLowerCase() === "false" ? (C = void 0, i.style.removeProperty(Ye), i.classList.remove(W)) : (C = e1.toString(), i.style.setProperty(Ye, C), i.classList.add(W));
        }, ht = (e1, o)=>{
            let u = n[e1];
            !u || (u.setAttr("aria-label", o), tt[e1] = o);
        }, ne = (e1)=>{
            if (w = void 0, n.length <= 1) {
                T = !1, i.classList.remove(Qe);
                return;
            }
            T = e1, i.classList.toggle(Qe, T);
        }, Rn = ()=>{
            ze(D(r.getAttribute(ve))), H = D(r.getAttribute(ye));
            let e1 = j(r, /^pointer([0-9]*)-disabled$/, (o)=>D(o));
            for (let o of e1){
                let u = o[0];
                !n[u] || (n[u].disabled = o[1]);
            }
        }, Bn = ()=>{
            let e1 = j(r, /^aria-label([0-9]*)$/);
            for (let o of e1){
                let u = o[0];
                ht(u, o[1]);
            }
        }, On = (e1)=>{
            let o = n.length, u = n[o - 1].$pointer, v = u.cloneNode(!0);
            u.after(v);
            let y = G(r, v, o);
            return y.setCallbacks(ot, st, at, lt), n.push(y), ee(e1, o), O(), z(), o;
        }, Fn = ()=>{
            let e1 = n.length, o = n[e1 - 1];
            return o ? (o.destroy(), n.pop(), n.length <= 1 && ne(!1), O(), z(), e1 - 1) : -1;
        };
        return (()=>{
            var o, u;
            for (let v of n)v.setCallbacks(ot, st, at, lt);
            let e1 = (o = r.shadowRoot) == null ? void 0 : o.querySelector(".panel-fill");
            e1 && (d = Yt(e1)), Ke(r.getAttribute(ge)), je(D(r.getAttribute(me))), qe(D(r.getAttribute(he))), Hn(r.getAttribute(de), r.getAttribute(ce)), te(r.getAttribute(pe)), We(r.getAttribute(ue)), gt(t.map((v)=>v[1])), Ve(D(r.getAttribute(oe))), Ne(E(r.getAttribute(se), 0)), Ue(E(r.getAttribute(ae), 1 / 0)), ne(D(r.getAttribute(le))), Xe(E(r.getAttribute(be), U)), Rn(), Bn(), m = mn(r, i, n), mt((u = r.getAttribute(xe)) != null ? u : xn), i.addEventListener("mousedown", nt), i.addEventListener("mouseup", Ae), i.addEventListener("touchmove", N), i.addEventListener("touchstart", N), document.addEventListener("wheel", it, {
                passive: !1
            }), l = hn(r, Mn, {
                setValues: gt,
                setMin: _,
                setMax: $,
                setStep: te,
                setPointersOverlap: Ve,
                setPointersMinDistance: Ne,
                setPointersMaxDistance: Ue,
                setDisabled: ze,
                setType: Ke,
                setRightToLeft: je,
                setBottomToTop: qe,
                setRound: Xe,
                setKeyboardDisabled: ft,
                setRangeDragging: ne,
                setData: We
            }, {
                getPercents: ut,
                getValues: dt,
                getPointerElements: ct,
                getMin: pt,
                getMax: bt,
                getStep: Me,
                getData: Le,
                getType: we,
                getRound: De,
                getTextMin: Q,
                getTextMax: Z,
                isRightToLeft: He,
                isBottomToTop: Ie,
                isDisabled: Re,
                isKeyboardDisabled: Be,
                isPointersOverlap: Oe,
                isRangeDraggingEnabled: Fe,
                getPointersMinDistance: Ce,
                getPointersMaxDistance: ke
            }), l.init();
        })(), {
            get pointers () {
                return n;
            },
            get styles () {
                return m;
            },
            get pluginsManager () {
                return l;
            },
            get min () {
                return Q();
            },
            get max () {
                return Z();
            },
            get step () {
                return Me();
            },
            get pointersOverlap () {
                return Oe();
            },
            set pointersOverlap (e){
                Ve(e);
            },
            get pointersMinDistance () {
                return Ce();
            },
            set pointersMinDistance (e){
                Ne(e);
            },
            get pointersMaxDistance () {
                return ke();
            },
            set pointersMaxDistance (e){
                Ue(e);
            },
            get disabled () {
                return Re();
            },
            set disabled (e){
                ze(e);
            },
            get data () {
                return Le();
            },
            get type () {
                return we();
            },
            set type (e){
                Ke(e);
            },
            get rightToLeft () {
                return He();
            },
            set rightToLeft (e){
                je(e);
            },
            get bottomToTop () {
                return Ie();
            },
            set bottomToTop (e){
                qe(e);
            },
            get round () {
                return De();
            },
            set round (e){
                Xe(e);
            },
            get animateOnClick () {
                return C;
            },
            set animateOnClick (e){
                mt(e);
            },
            get keyboardDisabled () {
                return Be();
            },
            set keyboardDisabled (e){
                ft(e);
            },
            get rangeDragging () {
                return Fe();
            },
            set rangeDragging (e){
                ne(e);
            },
            setMin: _,
            setMax: $,
            setValue: ee,
            setStep: te,
            setData: We,
            getTextValue: K,
            setAriaLabel: ht,
            getAriaLabel: kn,
            addPointer: On,
            removePointer: Fn,
            destroy: ()=>{
                i.removeEventListener("mousedown", nt), i.removeEventListener("mouseup", Ae), i.removeEventListener("touchmove", N), i.removeEventListener("touchstart", N), document.removeEventListener("wheel", it);
                for (let e1 of n)e1.destroy();
                l == null || l.destroy();
            }
        };
    };
    var Sn = (r, i, t)=>{
        let n = Je.find(([l, s, f, x])=>s.replace("#", "") === i.replace(/\d+/g, ""));
        if (n && r.styles) {
            let [l, s, f, x] = n, p = i.replace(/\D/g, "").trim(), b = p === "" || p === "0" || p === "1" ? 0 : E(p, 0) - 1;
            r.styles.setStyle(l, t, b);
            return;
        }
        switch(r && r.pluginsManager && r.pluginsManager.onAttrChange(i, t), i){
            case de:
                r.setMin(t);
                break;
            case ce:
                r.setMax(t);
                break;
            case pe:
                r.setStep(t);
                break;
            case oe:
                r.pointersOverlap = D(t);
                break;
            case se:
                r.pointersMinDistance = E(t, 0);
                break;
            case le:
                r.rangeDragging = D(t);
                break;
            case ae:
                r.pointersMaxDistance = E(t, 1 / 0);
                break;
            case ve:
                r.disabled = D(t);
                break;
            case ye:
                r.keyboardDisabled = D(t);
                break;
            case ue:
                r.setData(t);
                break;
            case ge:
                r.type = t;
                break;
            case me:
                r.rightToLeft = D(t);
                break;
            case he:
                r.bottomToTop = D(t);
                break;
            case be:
                r.round = E(t, U);
                break;
            case fe:
                r.styles && (r.styles.theme = t);
                break;
            case xe:
                r.animateOnClick = t;
                break;
        }
        let a = null;
        if (/^value([0-9]*)$/.test(i) && (a = "value"), /^pointer([0-9]*)-disabled$/.test(i) && (a = "pointer-disabled"), /^aria-label([0-9]*)$/.test(i) && (a = "aria-label"), /^pointer([0-9]*)-shape$/.test(i) && (a = "pointer-shape"), !a) return;
        let d = i.replace(/\D/g, "").trim(), m = d === "" || d === "0" || d === "1" ? 0 : E(d, 0) - 1;
        switch(a){
            case "value":
                r.setValue(t, m);
                break;
            case "pointer-disabled":
                {
                    let l1 = r == null ? void 0 : r.pointers[m];
                    if (!l1) return;
                    l1.disabled = D(t);
                    break;
                }
            case "aria-label":
                r.setAriaLabel(m, t);
                break;
            case "pointer-shape":
                r.styles && r.styles.setPointerShape(m, t);
                break;
        }
    };
    var et = class extends HTMLElement {
        constructor(){
            super();
            ie(this, "slider");
            ie(this, "_externalCSSList", []);
            ie(this, "_observer", null);
            this.attachShadow({
                mode: "open"
            });
        }
        set step(t) {
            this.slider && this.slider.setStep(t);
        }
        get step() {
            var t;
            return (t = this.slider) == null ? void 0 : t.step;
        }
        set disabled(t) {
            this.slider && (this.slider.disabled = t);
        }
        get disabled() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.disabled) != null ? n : !1;
        }
        set data(t) {
            var n;
            (n = this.slider) == null || n.setData(t);
        }
        get data() {
            var t;
            return (t = this.slider) == null ? void 0 : t.data;
        }
        set min(t) {
            var n;
            (n = this.slider) == null || n.setMin(t);
        }
        get min() {
            var t;
            return (t = this.slider) == null ? void 0 : t.min;
        }
        set max(t) {
            var n;
            (n = this.slider) == null || n.setMax(t);
        }
        get max() {
            var t;
            return (t = this.slider) == null ? void 0 : t.max;
        }
        set round(t) {
            !this.slider || (this.slider.round = t);
        }
        get round() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.round) != null ? n : U;
        }
        set type(t) {
            !this.slider || (this.slider.type = t != null ? t : V);
        }
        get type() {
            var t;
            return ((t = this.slider) == null ? void 0 : t.type) || V;
        }
        set pointersOverlap(t) {
            !this.slider || (this.slider.pointersOverlap = t);
        }
        get pointersOverlap() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.pointersOverlap) != null ? n : !1;
        }
        set pointersMinDistance(t) {
            !this.slider || (this.slider.pointersMinDistance = t);
        }
        get pointersMinDistance() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.pointersMinDistance) != null ? n : 0;
        }
        set pointersMaxDistance(t) {
            !this.slider || (this.slider.pointersMaxDistance = t);
        }
        get pointersMaxDistance() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.pointersMaxDistance) != null ? n : 1 / 0;
        }
        set theme(t) {
            !this.slider || !this.slider.styles || (this.slider.styles.theme = t);
        }
        get theme() {
            var t, n, a;
            return (a = (n = (t = this.slider) == null ? void 0 : t.styles) == null ? void 0 : n.theme) != null ? a : null;
        }
        set rtl(t) {
            !this.slider || (this.slider.rightToLeft = t);
        }
        get rtl() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.rightToLeft) != null ? n : !1;
        }
        set btt(t) {
            !this.slider || (this.slider.bottomToTop = t);
        }
        get btt() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.bottomToTop) != null ? n : !1;
        }
        set keyboardDisabled(t) {
            !this.slider || (this.slider.keyboardDisabled = t);
        }
        get keyboardDisabled() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.keyboardDisabled) != null ? n : !1;
        }
        set animateOnClick(t) {
            !this.slider || (this.slider.animateOnClick = t);
        }
        get animateOnClick() {
            var t;
            return (t = this.slider) == null ? void 0 : t.animateOnClick;
        }
        get rangeDragging() {
            var t, n;
            return (n = (t = this.slider) == null ? void 0 : t.rangeDragging) != null ? n : !1;
        }
        set rangeDragging(t) {
            this.slider && (this.slider.rangeDragging = D(t));
        }
        get externalCSSList() {
            return this._externalCSSList;
        }
        addPointer(t) {
            var a;
            if (!this.slider) return;
            let n = (a = this.slider) == null ? void 0 : a.addPointer(t);
            Ze(this, this.slider, n, `value${n + 1}`, `ariaLabel${n + 1}`, `pointerShape${n + 1}`, `pointer${n + 1}Disabled`);
        }
        removePointer() {
            var t;
            !this.slider || (t = this.slider) == null || t.removePointer();
        }
        addCSS(t) {
            if (!this.shadowRoot) return;
            let n = document.createElement("style");
            n.textContent = t, this.shadowRoot.appendChild(n);
        }
        connectedCallback() {
            var d, m;
            if (!this.shadowRoot) return;
            this._externalCSSList = fn(this), this.shadowRoot.innerHTML = yt(xt, this._externalCSSList);
            let t = (d = this.shadowRoot) == null ? void 0 : d.querySelector(".pointer");
            if (!t) return;
            let n = (m = this.shadowRoot) == null ? void 0 : m.getElementById("range-slider");
            if (!n) return;
            let a = vn(this, t);
            this.slider = Pn(this, n, a), yn(this, this.slider), this._observer = new MutationObserver((l)=>{
                l.forEach((s)=>{
                    var x;
                    if (!this.slider || s.type !== "attributes") return;
                    let f = s.attributeName;
                    !f || Sn(this.slider, f, (x = this.getAttribute(f)) != null ? x : "");
                });
            }), this._observer.observe(this, {
                attributes: !0
            });
        }
        disconnectedCallback() {
            this._observer && this._observer.disconnect(), this.slider && this.slider.destroy();
        }
    }, Te = et;
    window.tcRangeSlider = Te;
    customElements.get("toolcool-range-slider") || customElements.define("toolcool-range-slider", Te);
    customElements.get("tc-range-slider") || customElements.define("tc-range-slider", class extends Te {
    });
})();

},{}],"48oyx":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("aNMIV") + "slider.d9fb2dd3.css" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},["84Rv8","jeorp"], "jeorp", "parcelRequired6be")

//# sourceMappingURL=index.b7a05eb9.js.map
