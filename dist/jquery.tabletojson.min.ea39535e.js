// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jquery.tabletojson.min.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*! table-to-json - v1.0.0 - Daniel White - MIT - https://github.com/lightswitch05/table-to-json */
!function (a) {
  "use strict";

  var b = function b(_b, c, d) {
    this.$element = a(_b), this.index = c, this.cachedRowSpan = null, this.options = a.extend({}, a.fn.tableToJSONCell.defaults, d), this.init();
  };

  b.prototype = {
    constructor: b,
    value: function value(b) {
      var c = a.extend({}, this.options, b),
          d = a.trim(this.$element.text()),
          e = this.$element.attr(this.options.textDataOverride);
      if (e) d = e;else {
        if (c.extractor || c.textExtractor) return this.extractedValue();
        c.allowHTML && (d = a.trim(this.$element.html()));
      }
      return this.withColSpan(d);
    },
    extractedValue: function extractedValue() {
      var b = this.options.extractor || this.options.textExtractor,
          c = null;
      return a.isFunction(b) ? c = b(this.index, this.$element) : "object" == _typeof(b) && a.isFunction(b[this.index]) && (c = b[this.index](this.index, this.$element)), "string" == typeof c ? a.trim(c) : c;
    },
    colSpan: function colSpan() {
      var a = 1;
      return this.$element.attr("colSpan") && (a = parseInt(this.$element.attr("colSpan"), 10)), a;
    },
    rowSpan: function rowSpan(a) {
      return 1 === arguments.length ? this.cachedRowSpan = a : this.cachedRowSpan || (this.cachedRowSpan = 1, this.$element.attr("rowSpan") && (this.cachedRowSpan = parseInt(this.$element.attr("rowSpan"), 10))), this.cachedRowSpan;
    },
    withColSpan: function withColSpan(a) {
      var b = a;

      if (this.$element.attr("colSpan")) {
        var c = this.colSpan();

        if (c > 1) {
          b = [];

          for (var d = 0; d < c; d++) {
            b.push(a);
          }
        }
      }

      return b;
    },
    init: function init() {
      a.proxy(function () {
        this.$element.triggerHandler("init", this);
      }, this);
    }
  }, a.fn.tableToJSONCell = function (a, c) {
    return new b(this, a, c);
  }, a.fn.tableToJSONCell.defaults = {
    allowHTML: !1,
    textDataOverride: "data-override",
    extractor: null,
    textExtractor: null
  };
}(jQuery), function (a) {
  "use strict";

  var b = function b(_b2, c) {
    this.$element = a(_b2), this.cells = [], this.options = a.extend({}, a.fn.tableToJSONRow.defaults, c), this.init();
  };

  b.prototype = {
    constructor: b,
    id: function id() {
      return this.$element.attr("id") ? this.$element.attr("id") : null;
    },
    valuesWithHeadings: function valuesWithHeadings(a) {
      for (var b = {}, c = this.values(), d = 0; d < c.length; d++) {
        b[a[d]] = c[d];
      }

      return b;
    },
    isEmpty: function isEmpty() {
      for (var a = !0, b = this.values(), c = 0; a && c < b.length; c++) {
        "" !== b[c] && (a = !1);
      }

      return a;
    },
    cell: function cell(a) {
      return a < this.cells.length ? this.cells[a] : null;
    },
    insert: function insert(a, b) {
      this.cells.splice(a, 0, b);
    },
    getRowSpans: function getRowSpans(a) {
      for (var b, c, d = [], e = 0; e < this.cells.length; e++) {
        if (d = [], c = this.cells[e]) {
          for (b = c.rowSpan(); b > 1;) {
            d.push(c), b--;
          }

          c.rowSpan(1);
        }

        d.length > 0 && (a[e] = d);
      }

      return a;
    },
    insertRowSpans: function insertRowSpans(a) {
      for (var b = 0; b < a.length; b++) {
        if (a[b] && a[b].length > 0) {
          var c = a[b].splice(0, 1)[0];
          this.insert(b, c);
        }
      }

      return a;
    },
    rowSpans: function rowSpans() {
      for (var a, b, c = [], d = [], e = 0; e < this.cells.length; e++) {
        for (d = [], b = this.cells[e], a = b.rowSpan(); a > 1;) {
          d.push(b), a--;
        }

        b.rowSpan(1), d.length > 0 && (c[e] = d);
      }

      return c;
    },
    values: function values(b) {
      for (var c = a.extend({}, this.options, b), d = [], e = null, f = 0, g = 0; g < this.cells.length; g++) {
        if (e = this.cells[g].value(c), 1 === this.cells[g].colSpan()) this.ignoreColumn(f) || (d = d.concat(e)), f++;else for (var h = 0; h < e.length; h++) {
          this.ignoreColumn(f) || (d = d.concat(e[h])), f++;
        }
      }

      return d;
    },
    ignoreColumn: function ignoreColumn(a) {
      return this.options.onlyColumns ? this.options.onlyColumns.indexOf(a) < 0 : this.options.ignoreColumns.indexOf(a) > -1;
    },
    init: function init() {
      var b = this;
      this.$element.children(this.options.cellSelector).each(function (c, d) {
        b.cells.push(a(d).tableToJSONCell(c, b.options));
      }), a.proxy(function () {
        this.$element.triggerHandler("init", this);
      }, this);
    }
  }, a.fn.tableToJSONRow = function (a) {
    return new b(this, a);
  }, a.fn.tableToJSONRow.defaults = {
    onlyColumns: null,
    ignoreColumns: [],
    cellSelector: "td,th"
  };
}(jQuery), function (a) {
  "use strict";

  var b = function b(_b3, c) {
    this.$element = a(_b3), this.rows = [], this.options = a.extend({}, a.fn.tableToJSON.defaults, c), this.init();
  };

  b.prototype = {
    constructor: b,
    headings: function headings() {
      return this.rows.length > 0 && !this.options.headings ? this.rows[0].values({
        extractor: null,
        textExtractor: null
      }) : this.options.headings ? this.options.headings : [];
    },
    values: function values() {
      var a = [],
          b = this.headings(),
          c = this.options.headings ? 0 : 1;

      for (c; c < this.rows.length; c++) {
        if (!this.ignoreRow(this.rows[c], c)) if (this.options.includeRowId) {
          var d = "string" == typeof this.options.includeRowId ? this.options.includeRowId : "rowId",
              e = this.rows[c].valuesWithHeadings(b);
          e[d] = this.rows[c].id(), a.push(e);
        } else a.push(this.rows[c].valuesWithHeadings(b));
      }

      return a;
    },
    ignoreRow: function ignoreRow(a, b) {
      return this.options.ignoreRows && this.options.ignoreRows.indexOf(b) > -1 || a.$element.data("ignore") && "false" !== a.$element.data("ignore") || this.options.ignoreHiddenRows && !a.$element.is(":visible") || this.options.ignoreEmptyRows && a.isEmpty();
    },
    addRow: function addRow(a, b) {
      return a.insertRowSpans(b), this.rows.push(a), a.getRowSpans(b);
    },
    init: function init() {
      var b = this,
          c = [],
          d = null;
      this.$element.children(this.options.rowParentSelector).children(this.options.rowSelector).each(function (e, f) {
        d = a(f).tableToJSONRow(b.options), c = b.addRow(d, c);
      }), a.proxy(function () {
        this.$element.triggerHandler("init", this);
      }, this);
    }
  }, a.fn.tableToJSON = function (a) {
    return new b(this, a).values();
  }, a.fn.tableToJSON.defaults = {
    ignoreRows: [],
    ignoreHiddenRows: !0,
    ignoreEmptyRows: !1,
    headings: null,
    includeRowId: !1,
    rowParentSelector: "tbody,*",
    rowSelector: "tr"
  };
}(jQuery);
},{}],"C:/Users/adshi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52462" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/adshi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jquery.tabletojson.min.js"], null)
//# sourceMappingURL=/jquery.tabletojson.min.ea39535e.js.map