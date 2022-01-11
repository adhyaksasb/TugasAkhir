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
})({"graficarBarras.js":[function(require,module,exports) {
/**
 * Script para hacer gr&aacute;ficos de barras, hecho para 
 * sustituir a JPGraph
 * @author rsalcedo
 */
function graficarBarras(quien, ancho, alto, vector, rotulo, legenda, myParam) {
  ///////////////Parámetros a cambiar, variables globales
  var miMargen = 0.70; //80%

  var separZonas = 0.05; //5%

  var elMaxY = 0;
  var tituloGraf = "Ejecutado Vs Esperado";
  var tituloEjeX = "Complejo";
  var tituloEjeY = "Fuerza Labor";
  var nLineasDiv = 10;
  var mysColores = [["rgba(171,115,51,1)", "rgba(251,163,1,1)"], //amarillos
  ["rgba(93,18,18,1)", "rgba(196,19,24,1)"], //,   //rojos
  ["rgba(37,94,43,1)", "rgba(18,152,30,1)"], //verdes
  ["rgba(0,10,93,1)", "rgba(0,0,247,1)"], //azules
  ["rgba(93,93,93,1)", "rgba(150,150,150,1)"] //grises
  ];
  var myVector = [//[1685,734,278,1582],[1521,509,210,1344]//,[1521,509,210,1344]
  ];
  var myRotulo = [//"AMC", "Corporativo", "Jose", "Morón"
  ];
  var myLegenda = [//"Esperado","Ejecutado"//,"Calculado"
  ]; ///////////////

  establecer_valores(vector, rotulo, legenda);
  establecer_parametros(myParam);
  arrancaGraficar(quien, ancho, alto);
  /**
   * Modifica las variables globales de la funci&oacute;n madre
   */

  function establecer_parametros(param) {
    if (param) {
      if (param.miMargen) miMargen = param.miMargen;
      if (param.separZonas) separZonas = param.separZonas;
      if (param.tituloGraf) tituloGraf = param.tituloGraf;
      if (param.tituloEjeX) tituloEjeX = param.tituloEjeX;
      if (param.tituloEjeY) tituloEjeY = param.tituloEjeY;
      if (param.mysColores) mysColores = param.mysColores;
      if (param.anchoLinea) anchoLinea = param.anchoLinea;
      if (param.nLineasDiv) nLineasDiv = param.nLineasDiv;
    }
  }
  /**
   * Establece los par&aacute;metros a graficar
   */


  function establecer_valores(vector, rotulo, legenda) {
    myVector = vector;
    myRotulo = rotulo;
    myLegenda = legenda;
  }
  /**
   * Dibuja el rect&aacute;ngulo interno donde se va a graficar,
   * escribe el t&iacute;tulo del gr&aacute;fico, de los ejes y 
   * coloca la imagen de fondo
   * @param quien, id del canvas donde se va a dibujar
   * @param x, ancho
   * @param y, alto
   */


  function rectangulo(quien, x, y) {
    var canvas = document.getElementById(quien);

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      if (!document.getElementById("myFondo")) console.log("No se encuentra imagen de fondo.");else //imagen de fondo
        ctx.drawImage(document.getElementById("myFondo"), (1 - miMargen) / 2 * x, (1 - miMargen) / 2 * y, miMargen * x, miMargen * y);
      ctx.strokeStyle = "rgba(190,190,190,1)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect((1 - miMargen) / 2 * x, (1 - miMargen) / 2 * y, miMargen * x, miMargen * y);
    } // escribir título del gráfico


    ctx.font = "10pt monospace";
    ctx.fillStyle = "rgba(150,150,150,1)"; //sombrita

    if (x > ctx.measureText(tituloGraf).width) margenTexto = (x - ctx.measureText(tituloGraf).width) / 2;else margenTexto = 0;
    ctx.fillText(tituloGraf, margenTexto + 2, 0 + 14, x - 2);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillText(tituloGraf, margenTexto + 1, 0 + 15, x - 2); // escribir título del eje x

    ctx.font = "bold 10pt monospace";
    ctx.fillStyle = "rgba(0,0,0,1)";
    margenTexto = x - ctx.measureText(tituloEjeX).width - 2;
    ctx.fillText(tituloEjeX, margenTexto, (1 - miMargen) / 2 * y + miMargen * y + 30, y); // escribir título del eje Y

    ctx.save();
    ctx.translate(10, y / 2);
    ctx.rotate(3 * (Math.PI / 180) * 90);
    ctx.font = "bold 10pt monospace";
    ctx.fillStyle = "rgba(0,0,0,1)";
    margenTexto = y - ctx.measureText(tituloEjeY).width - 2;
    ctx.fillText(tituloEjeY, 0, 10);
    ctx.restore();
  }
  /**
   * Arranca el porceso de graficar, es como un main
   * @param quien, id del canvas donde se va a dibujar
   * @param ancho
   * @param alto
   */


  function arrancaGraficar(quien, ancho, alto) {
    try {
      rectangulo(quien, ancho, alto);
      zonas = calcular_zonas(myVector);

      if (zonas == 0) {
        alert("Inconsistencia en los datos de entrada!\nLos Vectores no son del mismo tama\xF1o");
        throw "Los Vectores no son del mismo tamaño";
      }

      elMaxY = calcular_max(myVector, alto);
      calcular_y_dibujar_lineas_div_vert_y_escala(quien, elMaxY, ancho, alto);
      calcular_y_dibujar_serie(quien, myVector, zonas, ancho, alto, myRotulo);
    } catch (e) {
      console.log("Algo salió mal: " + e.message);
    }
  }
  /**
   * Calcula las zonas para graficar, deben ser consistentes con
   * los datos a graficar
   * @param myVector, array de los datos a graficar
   * @returns {Number}
   */


  function calcular_zonas(myVector) {
    var long = 0;

    for (var i = 0; i < myVector.length; i++) {
      long = myVector[i].length;

      if (i > 0 && myVector[i].length != myVector[i - 1].length) {
        long = 0;
        break;
      }
    }

    return long;
  }
  /**
   * Dibuja las columnas, con sus correspondientes valores
   * @param quien, id del canvas donde se va a dibujar
   * @param myVector, array de los datos a graficar
   * @param zonas
   * @param x, ancho
   * @param y, alto
   * @param myRotulo, array con el nombre de las categorías 
   */


  function calcular_y_dibujar_serie(quien, myVector, zonas, x, y, myRotulo) {
    var separacion = separZonas * miMargen * x;
    var canvas = document.getElementById(quien);
    var anchoZona = miMargen * x / zonas;
    var anchoBarra = (anchoZona - separacion) / myVector.length;

    if (anchoBarra < 0) {
      alert("Cambie el margen y la separaci\xF3n, el gr\xE1fico no tiene espacio para mostrarse");
      throw "El ancho de la barra es negativo, cambie el margen y la separación";
    }

    if (canvas.getContext) var ctx = canvas.getContext('2d');

    for (var i = 0; i < myVector.length; i++) {
      for (var j = 0; j < myVector[i].length; j++) {
        altoBarra = myVector[i][j] / elMaxY; //otra forma

        ctx.beginPath();
        xi = (1 - miMargen) / 2 * x + separacion / 2 + anchoZona * j + anchoBarra * i;
        yi = (1 - miMargen) / 2 * y + miMargen * y;
        ctx.moveTo(xi, yi);
        ctx.lineTo(xi + anchoBarra, yi);
        ctx.lineTo(xi + anchoBarra, yi - altoBarra * miMargen * y);
        ctx.lineTo(xi, yi - altoBarra * miMargen * y); //escribir los textos de los valores

        ctx.font = "8pt monospace";
        ctx.fillStyle = "rgba(0,0,0,1)";
        margenTexto = (anchoBarra - ctx.measureText(myVector[i][j]).width) / 2;
        ctx.fillText(myVector[i][j], xi + margenTexto, yi - altoBarra * miMargen * y - 2, anchoBarra); //escribiendo los rótulos de categorias

        if (i == 0) {
          //sóĺo una vez
          margenTexto = (anchoBarra * myVector.length - ctx.measureText(myRotulo[j]).width) / 2;
          ctx.fillText(myRotulo[j], xi + margenTexto, yi + 14, anchoZona);
        } //pintura


        if (i == 0) {
          ctx.strokeStyle = "rgba(225,165,0,1)";
        } else {
          ctx.strokeStyle = "rgba(200,20,25,1)";
        }

        var linGradiente = ctx.createLinearGradient(xi, yi, xi + anchoBarra, yi);
        linGradiente.addColorStop(0, mysColores[i][0]);
        linGradiente.addColorStop(0.45, mysColores[i][1]);
        linGradiente.addColorStop(0.55, mysColores[i][1]);
        linGradiente.addColorStop(1, mysColores[i][0]);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = linGradiente;
        ctx.fillRect(xi, yi, anchoBarra, -altoBarra * miMargen * y);
        ctx.strokeRect(xi, yi, anchoBarra, -altoBarra * miMargen * y);
      } // escribir la leyenda


      if (myLegenda[i] != '.') {
        //escribir un . evita la escritura de la leyenda
        if (i == 0) {
          margenTexto2 = 0;
        } else {
          margenTexto2 = margenTexto2 + ctx.measureText(myLegenda[i - 1]).width + 30;
        }

        var linGradiente2 = ctx.createLinearGradient((1 - miMargen) / 2 * x + margenTexto2, y - 60, (1 - miMargen) / 2 * x + margenTexto2 + 12, y - 60);
        linGradiente2.addColorStop(0, mysColores[i][0]);
        linGradiente2.addColorStop(0.45, mysColores[i][1]);
        linGradiente2.addColorStop(0.55, mysColores[i][1]);
        linGradiente2.addColorStop(1, mysColores[i][0]);
        ctx.fillStyle = linGradiente2;
        ctx.fillRect((1 - miMargen) / 2 * x + margenTexto2, y - 30, 12, 12); //y-30=((1-miMargen)/2)*y + miMargen*y + 18

        ctx.font = "italic 8pt monospace";
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillText(myLegenda[i], (1 - miMargen) / 2 * x + margenTexto2 + 14, y - 20, y);
      }
    }
  }
  /**
   * 
   * @param myVector, array de los datos a graficar
   * @param y, alto
   * @returns {Number}
   */


  function calcular_max(myVector, y) {
    var mayor = 0;
    var agregar = 0;
    var max = 0;

    for (var i = 0; i < myVector.length; i++) {
      for (var j = 0; j < myVector[i].length; j++) {
        if (myVector[i][j] > mayor) {
          mayor = myVector[i][j];
        }
      }
    }

    max = mayor * (1 + 15 / (miMargen * y)); //1.0385;

    agregar = 10 - (max - Math.floor(max / 10) * 10);
    max = max + agregar; // 15 es el alto de la fuente
    //console.log(max)

    return max;
  }
  /**
   * Dibuja las lineas de divisi&oacute;n verticales, que realmente 
   * son lineas horizontales, y los valores de la escala
   * @param quien, id del canvas donde se va a dibujar
   * @param max, el máximo valor a graficar
   * @param x, ancho
   * @param y, alto
   */


  function calcular_y_dibujar_lineas_div_vert_y_escala(quien, max, x, y) {
    var intervaloEjeY = 0;
    var canvas = document.getElementById(quien);
    if (canvas.getContext) var ctx = canvas.getContext('2d');
    if (nLineasDiv != 0) intervaloEjeY = max / nLineasDiv;

    for (var n = 0; n <= nLineasDiv; n++) {
      //console.log(intervaloEjeY*n/max)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(190,190,190,1)";
      ctx.moveTo((1 - miMargen) / 2 * x - 4, (1 - miMargen) / 2 * y + miMargen * y - intervaloEjeY * n / max * miMargen * y);
      ctx.lineTo((1 - miMargen) / 2 * x + miMargen * x, (1 - miMargen) / 2 * y + miMargen * y - intervaloEjeY * n / max * miMargen * y);
      ctx.closePath();
      ctx.stroke(); //escribir los textos de los valores de las lineas de división del eje Y

      ctx.font = "8pt monospace";
      ctx.fillStyle = "rgba(0,0,0,1)";
      margenTexto = ctx.measureText(intervaloEjeY * n).width + 2;
      ctx.fillText(intervaloEjeY * n, (1 - miMargen) / 2 * x - 5 - margenTexto, (1 - miMargen) / 2 * y + miMargen * y - intervaloEjeY * n / max * miMargen * y + 3);
    }
  }
}
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62515" + '/');

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
},{}]},{},["C:/Users/adshi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","graficarBarras.js"], null)
//# sourceMappingURL=/graficarBarras.13be1145.js.map