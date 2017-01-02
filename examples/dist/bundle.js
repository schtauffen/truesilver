(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _mithril = __webpack_require__(2);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	var _truesilver = __webpack_require__(26);
	
	var _main = __webpack_require__(27);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _index = __webpack_require__(28);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_mithril2.default.route.prefix('');
	
	var Link = (0, _truesilver.component)(function () {
	  return function (_ref) {
	    var attrs = _ref.attrs,
	        children = _ref.children;
	
	    var classname = _mithril2.default.route.get() === attrs.href ? _main2.default.navlink_active : _main2.default.navlink;
	    return (0, _mithril2.default)('a.' + classname, _extends({ oncreate: _mithril2.default.route.link }, attrs), children);
	  };
	});
	
	// layout helper
	var L = function L(Cmp) {
	  return (0, _truesilver.component)(function () {
	    return function () {
	      return [(0, _mithril2.default)('nav', (0, _mithril2.default)('ul.' + _main2.default.navlist, ['lightbox', 'redux', 'random-gif'].map(function (path) {
	        return (0, _mithril2.default)('li.' + _main2.default.navitem, (0, _mithril2.default)(Link, { href: '/' + path }, path));
	      }))), (0, _mithril2.default)('main', (0, _mithril2.default)(Cmp))];
	    };
	  });
	};
	
	var Home = (0, _truesilver.component)(function () {
	  return function () {
	    return 'Choose an example';
	  };
	});
	
	var routes = {
	  '/': L(Home),
	  '/lightbox': L(_index2.default)
	};
	
	_mithril2.default.route(document.querySelector('#app'), '/', routes);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var m = __webpack_require__(3)
	var requestService = __webpack_require__(8)
	var redrawService = __webpack_require__(15)
	
	requestService.setCompletionCallback(redrawService.redraw)
	
	m.mount = __webpack_require__(18)
	m.route = __webpack_require__(20)
	m.withAttr = __webpack_require__(24)
	m.render = __webpack_require__(25).render
	m.redraw = redrawService.redraw
	m.request = requestService.request
	m.jsonp = requestService.jsonp
	m.parseQueryString = __webpack_require__(23)
	m.buildQueryString = __webpack_require__(14)
	m.version = "bleeding-edge"
	m.vnode = __webpack_require__(5)
	
	module.exports = m


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var hyperscript = __webpack_require__(4)
	
	hyperscript.trust = __webpack_require__(6)
	hyperscript.fragment = __webpack_require__(7)
	
	module.exports = hyperscript


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var Vnode = __webpack_require__(5)
	
	var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
	var selectorCache = {}
	function hyperscript(selector) {
		if (selector == null || typeof selector !== "string" && selector.view == null) {
			throw Error("The selector must be either a string or a component.");
		}
	
		if (typeof selector === "string" && selectorCache[selector] === undefined) {
			var match, tag, classes = [], attributes = {}
			while (match = selectorParser.exec(selector)) {
				var type = match[1], value = match[2]
				if (type === "" && value !== "") tag = value
				else if (type === "#") attributes.id = value
				else if (type === ".") classes.push(value)
				else if (match[3][0] === "[") {
					var attrValue = match[6]
					if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
					if (match[4] === "class") classes.push(attrValue)
					else attributes[match[4]] = attrValue || true
				}
			}
			if (classes.length > 0) attributes.className = classes.join(" ")
			selectorCache[selector] = function(attrs, children) {
				var hasAttrs = false, childList, text
				var className = attrs.className || attrs.class
				for (var key in attributes) attrs[key] = attributes[key]
				if (className !== undefined) {
					if (attrs.class !== undefined) {
						attrs.class = undefined
						attrs.className = className
					}
					if (attributes.className !== undefined) attrs.className = attributes.className + " " + className
				}
				for (var key in attrs) {
					if (key !== "key") {
						hasAttrs = true
						break
					}
				}
				if (children instanceof Array && children.length == 1 && children[0] != null && children[0].tag === "#") text = children[0].children
				else childList = children
	
				return Vnode(tag || "div", attrs.key, hasAttrs ? attrs : undefined, childList, text, undefined)
			}
		}
		var attrs, children, childrenIndex
		if (arguments[1] == null || typeof arguments[1] === "object" && arguments[1].tag === undefined && !(arguments[1] instanceof Array)) {
			attrs = arguments[1]
			childrenIndex = 2
		}
		else childrenIndex = 1
		if (arguments.length === childrenIndex + 1) {
			children = arguments[childrenIndex] instanceof Array ? arguments[childrenIndex] : [arguments[childrenIndex]]
		}
		else {
			children = []
			for (var i = childrenIndex; i < arguments.length; i++) children.push(arguments[i])
		}
	
		if (typeof selector === "string") return selectorCache[selector](attrs || {}, Vnode.normalizeChildren(children))
	
		return Vnode(selector, attrs && attrs.key, attrs || {}, Vnode.normalizeChildren(children), undefined, undefined)
	}
	
	module.exports = hyperscript


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Vnode(tag, key, attrs, children, text, dom) {
		return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: {}, events: undefined, instance: undefined, skip: false}
	}
	Vnode.normalize = function(node) {
		if (node instanceof Array) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
		if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node, undefined, undefined)
		return node
	}
	Vnode.normalizeChildren = function normalizeChildren(children) {
		for (var i = 0; i < children.length; i++) {
			children[i] = Vnode.normalize(children[i])
		}
		return children
	}
	
	module.exports = Vnode


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var Vnode = __webpack_require__(5)
	
	module.exports = function(html) {
		if (html == null) html = ""
		return Vnode("<", undefined, undefined, html, undefined, undefined)
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var Vnode = __webpack_require__(5)
	
	module.exports = function(attrs, children) {
		return Vnode("[", attrs.key, attrs, Vnode.normalizeChildren(children), undefined, undefined)
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var PromisePolyfill = __webpack_require__(9)
	module.exports = __webpack_require__(13)(window, PromisePolyfill)


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, global) {"use strict"
	/** @constructor */
	var PromisePolyfill = function(executor) {
		if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
		if (typeof executor !== "function") throw new TypeError("executor must be a function")
	
		var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
		var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
		var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
		function handler(list, shouldAbsorb) {
			return function execute(value) {
				var then
				try {
					if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
						if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
						executeOnce(then.bind(value))
					}
					else {
						callAsync(function() {
							if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
							for (var i = 0; i < list.length; i++) list[i](value)
							resolvers.length = 0, rejectors.length = 0
							instance.state = shouldAbsorb
							instance.retry = function() {execute(value)}
						})
					}
				}
				catch (e) {
					rejectCurrent(e)
				}
			}
		}
		function executeOnce(then) {
			var runs = 0
			function run(fn) {
				return function(value) {
					if (runs++ > 0) return
					fn(value)
				}
			}
			var onerror = run(rejectCurrent)
			try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
		}
	
		executeOnce(executor)
	}
	PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
		var self = this, instance = self._instance
		function handle(callback, list, next, state) {
			list.push(function(value) {
				if (typeof callback !== "function") next(value)
				else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
			})
			if (typeof instance.retry === "function" && state === instance.state) instance.retry()
		}
		var resolveNext, rejectNext
		var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
		handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
		return promise
	}
	PromisePolyfill.prototype.catch = function(onRejection) {
		return this.then(null, onRejection)
	}
	PromisePolyfill.resolve = function(value) {
		if (value instanceof PromisePolyfill) return value
		return new PromisePolyfill(function(resolve) {resolve(value)})
	}
	PromisePolyfill.reject = function(value) {
		return new PromisePolyfill(function(resolve, reject) {reject(value)})
	}
	PromisePolyfill.all = function(list) {
		return new PromisePolyfill(function(resolve, reject) {
			var total = list.length, count = 0, values = []
			if (list.length === 0) resolve([])
			else for (var i = 0; i < list.length; i++) {
				(function(i) {
					function consume(value) {
						count++
						values[i] = value
						if (count === total) resolve(values)
					}
					if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
						list[i].then(consume, reject)
					}
					else consume(list[i])
				})(i)
			}
		})
	}
	PromisePolyfill.race = function(list) {
		return new PromisePolyfill(function(resolve, reject) {
			for (var i = 0; i < list.length; i++) {
				list[i].then(resolve, reject)
			}
		})
	}
	
	if (typeof window !== "undefined") {
		if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
		module.exports = window.Promise
	} else if (typeof global !== "undefined") {
		if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
		module.exports = global.Promise
	} else {
		module.exports = PromisePolyfill
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(11);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(12)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var buildQueryString = __webpack_require__(14)
	
	module.exports = function($window, Promise) {
		var callbackCount = 0
	
		var oncompletion
		function setCompletionCallback(callback) {oncompletion = callback}
		function finalizer() {
			var count = 0
			function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
	
			return function finalize(promise) {
				var then = promise.then
				promise.then = function() {
					count++
					var next = then.apply(promise, arguments)
					next.then(complete, function(e) {
						complete()
						if (count === 0) throw e
					})
					return finalize(next)
				}
				return promise
			}
		}
		function normalize(args, extra) {
			if (typeof args === "string") {
				var url = args
				args = extra || {}
				if (args.url == null) args.url = url
			}
			return args
		}
		
		function request(args, extra) {
			var finalize = finalizer()
			args = normalize(args, extra)
	
			var promise = new Promise(function(resolve, reject) {
				if (args.method == null) args.method = "GET"
				args.method = args.method.toUpperCase()
	
				var useBody = typeof args.useBody === "boolean" ? args.useBody : args.method !== "GET" && args.method !== "TRACE"
	
				if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
				if (typeof args.deserialize !== "function") args.deserialize = deserialize
				if (typeof args.extract !== "function") args.extract = extract
	
				args.url = interpolate(args.url, args.data)
				if (useBody) args.data = args.serialize(args.data)
				else args.url = assemble(args.url, args.data)
	
				var xhr = new $window.XMLHttpRequest()
				xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
	
				if (args.serialize === JSON.stringify && useBody) {
					xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
				}
				if (args.deserialize === deserialize) {
					xhr.setRequestHeader("Accept", "application/json, text/*")
				}
				if (args.withCredentials) xhr.withCredentials = args.withCredentials
	
				if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
	
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						try {
							var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
								resolve(cast(args.type, response))
							}
							else {
								var error = new Error(xhr.responseText)
								for (var key in response) error[key] = response[key]
								reject(error)
							}
						}
						catch (e) {
							reject(e)
						}
					}
				}
	
				if (useBody && (args.data != null)) xhr.send(args.data)
				else xhr.send()
			})
			return args.background === true ? promise : finalize(promise)
		}
	
		function jsonp(args, extra) {
			var finalize = finalizer()
			args = normalize(args, extra)
			
			var promise = new Promise(function(resolve, reject) {
				var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
				var script = $window.document.createElement("script")
				$window[callbackName] = function(data) {
					script.parentNode.removeChild(script)
					resolve(cast(args.type, data))
					delete $window[callbackName]
				}
				script.onerror = function() {
					script.parentNode.removeChild(script)
					reject(new Error("JSONP request failed"))
					delete $window[callbackName]
				}
				if (args.data == null) args.data = {}
				args.url = interpolate(args.url, args.data)
				args.data[args.callbackKey || "callback"] = callbackName
				script.src = assemble(args.url, args.data)
				$window.document.documentElement.appendChild(script)
			})
			return args.background === true? promise : finalize(promise)
		}
	
		function interpolate(url, data) {
			if (data == null) return url
	
			var tokens = url.match(/:[^\/]+/gi) || []
			for (var i = 0; i < tokens.length; i++) {
				var key = tokens[i].slice(1)
				if (data[key] != null) {
					url = url.replace(tokens[i], data[key])
					delete data[key]
				}
			}
			return url
		}
	
		function assemble(url, data) {
			var querystring = buildQueryString(data)
			if (querystring !== "") {
				var prefix = url.indexOf("?") < 0 ? "?" : "&"
				url += prefix + querystring
			}
			return url
		}
	
		function deserialize(data) {
			try {return data !== "" ? JSON.parse(data) : null}
			catch (e) {throw new Error(data)}
		}
	
		function extract(xhr) {return xhr.responseText}
	
		function cast(type, data) {
			if (typeof type === "function") {
				if (data instanceof Array) {
					for (var i = 0; i < data.length; i++) {
						data[i] = new type(data[i])
					}
				}
				else return new type(data)
			}
			return data
		}
	
		return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict"
	
	module.exports = function(object) {
		if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	
		var args = []
		for (var key in object) {
			destructure(key, object[key])
		}
		return args.join("&")
	
		function destructure(key, value) {
			if (value instanceof Array) {
				for (var i = 0; i < value.length; i++) {
					destructure(key + "[" + i + "]", value[i])
				}
			}
			else if (Object.prototype.toString.call(value) === "[object Object]") {
				for (var i in value) {
					destructure(key + "[" + i + "]", value[i])
				}
			}
			else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
		}
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16)(window)

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var coreRenderer = __webpack_require__(17)
	
	function throttle(callback) {
		//60fps translates to 16.6ms, round it down since setTimeout requires int
		var time = 16
		var last = 0, pending = null
		var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
		return function() {
			var now = Date.now()
			if (last === 0 || now - last >= time) {
				last = now
				callback()
			}
			else if (pending === null) {
				pending = timeout(function() {
					pending = null
					callback()
					last = Date.now()
				}, time - (now - last))
			}
		}
	}
	
	module.exports = function($window) {
		var renderService = coreRenderer($window)
		renderService.setEventCallback(function(e) {
			if (e.redraw !== false) redraw()
		})
		
		var callbacks = []
		function subscribe(key, callback) {
			unsubscribe(key)
			callbacks.push(key, throttle(callback))
		}
		function unsubscribe(key) {
			var index = callbacks.indexOf(key)
			if (index > -1) callbacks.splice(index, 2)
		}
	    function redraw() {
	        for (var i = 1; i < callbacks.length; i += 2) {
	            callbacks[i]()
	        }
	    }
		return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var Vnode = __webpack_require__(5)
	
	module.exports = function($window) {
		var $doc = $window.document
		var $emptyFragment = $doc.createDocumentFragment()
	
		var onevent
		function setEventCallback(callback) {return onevent = callback}
	
		//create
		function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					insertNode(parent, createNode(vnode, hooks, ns), nextSibling)
				}
			}
		}
		function createNode(vnode, hooks, ns) {
			var tag = vnode.tag
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			if (typeof tag === "string") {
				switch (tag) {
					case "#": return createText(vnode)
					case "<": return createHTML(vnode)
					case "[": return createFragment(vnode, hooks, ns)
					default: return createElement(vnode, hooks, ns)
				}
			}
			else return createComponent(vnode, hooks, ns)
		}
		function createText(vnode) {
			return vnode.dom = $doc.createTextNode(vnode.children)
		}
		function createHTML(vnode) {
			var match = vnode.children.match(/^\s*?<(\w+)/im) || []
			var parent = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match[1]] || "div"
			var temp = $doc.createElement(parent)
	
			temp.innerHTML = vnode.children
			vnode.dom = temp.firstChild
			vnode.domSize = temp.childNodes.length
			var fragment = $doc.createDocumentFragment()
			var child
			while (child = temp.firstChild) {
				fragment.appendChild(child)
			}
			return fragment
		}
		function createFragment(vnode, hooks, ns) {
			var fragment = $doc.createDocumentFragment()
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(fragment, children, 0, children.length, hooks, null, ns)
			}
			vnode.dom = fragment.firstChild
			vnode.domSize = fragment.childNodes.length
			return fragment
		}
		function createElement(vnode, hooks, ns) {
			var tag = vnode.tag
			switch (vnode.tag) {
				case "svg": ns = "http://www.w3.org/2000/svg"; break
				case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
			}
	
			var attrs = vnode.attrs
			var is = attrs && attrs.is
	
			var element = ns ?
				is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
				is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
			vnode.dom = element
	
			if (attrs != null) {
				setAttrs(vnode, attrs, ns)
			}
	
			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode)
			}
			else {
				if (vnode.text != null) {
					if (vnode.text !== "") element.textContent = vnode.text
					else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				}
				if (vnode.children != null) {
					var children = vnode.children
					createNodes(element, children, 0, children.length, hooks, null, ns)
					setLateAttrs(vnode)
				}
			}
			return element
		}
		function createComponent(vnode, hooks, ns) {
			// For object literals since `Vnode()` always sets the `state` field.
			if (!vnode.state) vnode.state = {}
			var constructor = function() {}
			constructor.prototype = vnode.tag
			vnode.state = new constructor
	
			var view = vnode.tag.view
			if (view.reentrantLock != null) return $emptyFragment
			view.reentrantLock = true
			initLifecycle(vnode.tag, vnode, hooks)
			vnode.instance = Vnode.normalize(view.call(vnode.state, vnode))
			view.reentrantLock = null
			if (vnode.instance != null) {
				if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as arguments")
				var element = createNode(vnode.instance, hooks, ns)
				vnode.dom = vnode.instance.dom
				vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
				return element
			}
			else {
				vnode.domSize = 0
				return $emptyFragment
			}
		}
	
		//update
		function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
			if (old === vnodes || old == null && vnodes == null) return
			else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, undefined)
			else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
			else {
				if (old.length === vnodes.length) {
					var isUnkeyed = false
					for (var i = 0; i < vnodes.length; i++) {
						if (vnodes[i] != null && old[i] != null) {
							isUnkeyed = vnodes[i].key == null && old[i].key == null
							break
						}
					}
					if (isUnkeyed) {
						for (var i = 0; i < old.length; i++) {
							if (old[i] === vnodes[i]) continue
							else if (old[i] == null && vnodes[i] != null) insertNode(parent, createNode(vnodes[i], hooks, ns), getNextSibling(old, i + 1, nextSibling))
							else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
							else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), false, ns)
						}
						return
					}
				}
				var recycling = isRecyclable(old, vnodes)
				if (recycling) old = old.concat(old.pool)
	
				var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldStart], v = vnodes[start]
					if (o === v && !recycling) oldStart++, start++
					else if (o == null) oldStart++
					else if (v == null) start++
					else if (o.key === v.key) {
						oldStart++, start++
						updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), recycling, ns)
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					}
					else {
						var o = old[oldEnd]
						if (o === v && !recycling) oldEnd--, start++
						else if (o == null) oldEnd--
						else if (v == null) start++
						else if (o.key === v.key) {
							updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
							oldEnd--, start++
						}
						else break
					}
				}
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldEnd], v = vnodes[end]
					if (o === v && !recycling) oldEnd--, end--
					else if (o == null) oldEnd--
					else if (v == null) end--
					else if (o.key === v.key) {
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
						if (o.dom != null) nextSibling = o.dom
						oldEnd--, end--
					}
					else {
						if (!map) map = getKeyMap(old, oldEnd)
						if (v != null) {
							var oldIndex = map[v.key]
							if (oldIndex != null) {
								var movable = old[oldIndex]
								updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
								insertNode(parent, toFragment(movable), nextSibling)
								old[oldIndex].skip = true
								if (movable.dom != null) nextSibling = movable.dom
							}
							else {
								var dom = createNode(v, hooks, undefined)
								insertNode(parent, dom, nextSibling)
								nextSibling = dom
							}
						}
						end--
					}
					if (end < start) break
				}
				createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
				removeNodes(old, oldStart, oldEnd + 1, vnodes)
			}
		}
		function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			var oldTag = old.tag, tag = vnode.tag
			if (oldTag === tag) {
				vnode.state = old.state
				vnode.events = old.events
				if (shouldUpdate(vnode, old)) return
				if (vnode.attrs != null) {
					updateLifecycle(vnode.attrs, vnode, hooks, recycling)
				}
				if (typeof oldTag === "string") {
					switch (oldTag) {
						case "#": updateText(old, vnode); break
						case "<": updateHTML(parent, old, vnode, nextSibling); break
						case "[": updateFragment(parent, old, vnode, hooks, nextSibling, ns); break
						default: updateElement(old, vnode, hooks, ns)
					}
				}
				else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
			}
			else {
				removeNode(old, null)
				insertNode(parent, createNode(vnode, hooks, ns), nextSibling)
			}
		}
		function updateText(old, vnode) {
			if (old.children.toString() !== vnode.children.toString()) {
				old.dom.nodeValue = vnode.children
			}
			vnode.dom = old.dom
		}
		function updateHTML(parent, old, vnode, nextSibling) {
			if (old.children !== vnode.children) {
				toFragment(old)
				insertNode(parent, createHTML(vnode), nextSibling)
			}
			else vnode.dom = old.dom, vnode.domSize = old.domSize
		}
		function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
			updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns)
			var domSize = 0, children = vnode.children
			vnode.dom = null
			if (children != null) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null && child.dom != null) {
						if (vnode.dom == null) vnode.dom = child.dom
						domSize += child.domSize || 1
					}
				}
				if (domSize !== 1) vnode.domSize = domSize
			}
		}
		function updateElement(old, vnode, hooks, ns) {
			var element = vnode.dom = old.dom
			switch (vnode.tag) {
				case "svg": ns = "http://www.w3.org/2000/svg"; break
				case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
			}
			if (vnode.tag === "textarea") {
				if (vnode.attrs == null) vnode.attrs = {}
				if (vnode.text != null) {
					vnode.attrs.value = vnode.text //FIXME handle multiple children
					vnode.text = undefined
				}
			}
			updateAttrs(vnode, old.attrs, vnode.attrs, ns)
			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode)
			}
			else if (old.text != null && vnode.text != null && vnode.text !== "") {
				if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
			}
			else {
				if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
				if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				updateNodes(element, old.children, vnode.children, hooks, null, ns)
			}
		}
		function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			vnode.instance = Vnode.normalize(vnode.tag.view.call(vnode.state, vnode))
			updateLifecycle(vnode.tag, vnode, hooks, recycling)
			if (vnode.instance != null) {
				if (old.instance == null) insertNode(parent, createNode(vnode.instance, hooks, ns), nextSibling)
				else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
				vnode.dom = vnode.instance.dom
				vnode.domSize = vnode.instance.domSize
			}
			else if (old.instance != null) {
				removeNode(old.instance, null)
				vnode.dom = undefined
				vnode.domSize = 0
			}
			else {
				vnode.dom = old.dom
				vnode.domSize = old.domSize
			}
		}
		function isRecyclable(old, vnodes) {
			if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
				var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
				var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
				var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
				if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
					return true
				}
			}
			return false
		}
		function getKeyMap(vnodes, end) {
			var map = {}, i = 0
			for (var i = 0; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					var key = vnode.key
					if (key != null) map[key] = i
				}
			}
			return map
		}
		function toFragment(vnode) {
			var count = vnode.domSize
			if (count != null || vnode.dom == null) {
				var fragment = $doc.createDocumentFragment()
				if (count > 0) {
					var dom = vnode.dom
					while (--count) fragment.appendChild(dom.nextSibling)
					fragment.insertBefore(dom, fragment.firstChild)
				}
				return fragment
			}
			else return vnode.dom
		}
		function getNextSibling(vnodes, i, nextSibling) {
			for (; i < vnodes.length; i++) {
				if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
			}
			return nextSibling
		}
	
		function insertNode(parent, dom, nextSibling) {
			if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
			else parent.appendChild(dom)
		}
	
		function setContentEditable(vnode) {
			var children = vnode.children
			if (children != null && children.length === 1 && children[0].tag === "<") {
				var content = children[0].children
				if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
			}
			else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
		}
	
		//remove
		function removeNodes(vnodes, start, end, context) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					if (vnode.skip) vnode.skip = false
					else removeNode(vnode, context)
				}
			}
		}
		function removeNode(vnode, context) {
			var expected = 1, called = 0
			if (vnode.attrs && vnode.attrs.onbeforeremove) {
				var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
				if (result != null && typeof result.then === "function") {
					expected++
					result.then(continuation, continuation)
				}
			}
			if (typeof vnode.tag !== "string" && vnode.tag.onbeforeremove) {
				var result = vnode.tag.onbeforeremove.call(vnode.state, vnode)
				if (result != null && typeof result.then === "function") {
					expected++
					result.then(continuation, continuation)
				}
			}
			continuation()
			function continuation() {
				if (++called === expected) {
					onremove(vnode)
					if (vnode.dom) {
						var count = vnode.domSize || 1
						if (count > 1) {
							var dom = vnode.dom
							while (--count) {
								removeNodeFromDOM(dom.nextSibling)
							}
						}
						removeNodeFromDOM(vnode.dom)
						if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
							if (!context.pool) context.pool = [vnode]
							else context.pool.push(vnode)
						}
					}
				}
			}
		}
		function removeNodeFromDOM(node) {
			var parent = node.parentNode
			if (parent != null) parent.removeChild(node)
		}
		function onremove(vnode) {
			if (vnode.attrs && vnode.attrs.onremove) vnode.attrs.onremove.call(vnode.state, vnode)
			if (typeof vnode.tag !== "string" && vnode.tag.onremove) vnode.tag.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
			else {
				var children = vnode.children
				if (children instanceof Array) {
					for (var i = 0; i < children.length; i++) {
						var child = children[i]
						if (child != null) onremove(child)
					}
				}
			}
		}
	
		//attrs
		function setAttrs(vnode, attrs, ns) {
			for (var key in attrs) {
				setAttr(vnode, key, null, attrs[key], ns)
			}
		}
		function setAttr(vnode, key, old, value, ns) {
			var element = vnode.dom
			if (key === "key" || key === "is" || (old === value && !isFormAttribute(vnode, key)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key)) return
			var nsLastIndex = key.indexOf(":")
			if (nsLastIndex > -1 && key.substr(0, nsLastIndex) === "xlink") {
				element.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(nsLastIndex + 1), value)
			}
			else if (key[0] === "o" && key[1] === "n" && typeof value === "function") updateEvent(vnode, key, value)
			else if (key === "style") updateStyle(element, old, value)
			else if (key in element && !isAttribute(key) && ns === undefined && !isCustomElement(vnode)) {
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if (vnode.tag === "input" && key === "value" && vnode.dom.value === value && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select" && key === "value" && vnode.dom.value === value && vnode.dom === $doc.activeElement) return
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && key === "value" && vnode.dom.value === value) return
				element[key] = value
			}
			else {
				if (typeof value === "boolean") {
					if (value) element.setAttribute(key, "")
					else element.removeAttribute(key)
				}
				else element.setAttribute(key === "className" ? "class" : key, value)
			}
		}
		function setLateAttrs(vnode) {
			var attrs = vnode.attrs
			if (vnode.tag === "select" && attrs != null) {
				if ("value" in attrs) setAttr(vnode, "value", null, attrs.value, undefined)
				if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined)
			}
		}
		function updateAttrs(vnode, old, attrs, ns) {
			if (attrs != null) {
				for (var key in attrs) {
					setAttr(vnode, key, old && old[key], attrs[key], ns)
				}
			}
			if (old != null) {
				for (var key in old) {
					if (attrs == null || !(key in attrs)) {
						if (key === "className") key = "class"
						if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined)
						else if (key !== "key") vnode.dom.removeAttribute(key)
					}
				}
			}
		}
		function isFormAttribute(vnode, attr) {
			return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
		}
		function isLifecycleMethod(attr) {
			return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
		}
		function isAttribute(attr) {
			return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
		}
		function isCustomElement(vnode){
			return vnode.attrs.is || vnode.tag.indexOf("-") > -1
		}
		function hasIntegrationMethods(source) {
			return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
		}
	
		//style
		function updateStyle(element, old, style) {
			if (old === style) element.style.cssText = "", old = null
			if (style == null) element.style.cssText = ""
			else if (typeof style === "string") element.style.cssText = style
			else {
				if (typeof old === "string") element.style.cssText = ""
				for (var key in style) {
					element.style[key] = style[key]
				}
				if (old != null && typeof old !== "string") {
					for (var key in old) {
						if (!(key in style)) element.style[key] = ""
					}
				}
			}
		}
	
		//event
		function updateEvent(vnode, key, value) {
			var element = vnode.dom
			var callback = typeof onevent !== "function" ? value : function(e) {
				var result = value.call(element, e)
				onevent.call(element, e)
				return result
			}
			if (key in element) element[key] = typeof value === "function" ? callback : null
			else {
				var eventName = key.slice(2)
				if (vnode.events === undefined) vnode.events = {}
				if (vnode.events[key] === callback) return
				if (vnode.events[key] != null) element.removeEventListener(eventName, vnode.events[key], false)
				if (typeof value === "function") {
					vnode.events[key] = callback
					element.addEventListener(eventName, vnode.events[key], false)
				}
			}
		}
	
		//lifecycle
		function initLifecycle(source, vnode, hooks) {
			if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
			if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
		}
		function updateLifecycle(source, vnode, hooks, recycling) {
			if (recycling) initLifecycle(source, vnode, hooks)
			else if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
		}
		function shouldUpdate(vnode, old) {
			var forceVnodeUpdate, forceComponentUpdate
			if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
			if (typeof vnode.tag !== "string" && typeof vnode.tag.onbeforeupdate === "function") forceComponentUpdate = vnode.tag.onbeforeupdate.call(vnode.state, vnode, old)
			if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
				vnode.dom = old.dom
				vnode.domSize = old.domSize
				vnode.instance = old.instance
				return true
			}
			return false
		}
	
		function render(dom, vnodes) {
			if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
			var hooks = []
			var active = $doc.activeElement
	
			// First time rendering into a node clears it out
			if (dom.vnodes == null) dom.textContent = ""
	
			if (!(vnodes instanceof Array)) vnodes = [vnodes]
			updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), hooks, null, undefined)
			dom.vnodes = vnodes
			for (var i = 0; i < hooks.length; i++) hooks[i]()
			if ($doc.activeElement !== active) active.focus()
		}
	
		return {render: render, setEventCallback: setEventCallback}
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var redrawService = __webpack_require__(15)
	
	module.exports = __webpack_require__(19)(redrawService)

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var Vnode = __webpack_require__(5)
	
	module.exports = function(redrawService) {
		return function(root, component) {
			if (component === null) {
				redrawService.render(root, [])
				redrawService.unsubscribe(root)
				return
			}
			
			if (component.view == null) throw new Error("m.mount(element, component) expects a component, not a vnode")
			
			var run = function() {
				redrawService.render(root, Vnode(component))
			}
			redrawService.subscribe(root, run)
			redrawService.redraw()
		}
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var redrawService = __webpack_require__(15)
	
	module.exports = __webpack_require__(21)(window, redrawService)

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var Vnode = __webpack_require__(5)
	var Promise = __webpack_require__(9)
	var coreRouter = __webpack_require__(22)
	
	module.exports = function($window, redrawService) {
		var routeService = coreRouter($window)
	
		var identity = function(v) {return v}
		var render, component, attrs, currentPath, lastUpdate
		var route = function(root, defaultRoute, routes) {
			if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
			var run = function() {
				if (render != null) redrawService.render(root, render(Vnode(component, attrs.key, attrs)))
			}
			var bail = function() {
				routeService.setPath(defaultRoute, null, {replace: true})
			}
			routeService.defineRoutes(routes, function(payload, params, path) {
				var update = lastUpdate = function(routeResolver, comp) {
					if (update !== lastUpdate) return
					component = comp != null && typeof comp.view === "function" ? comp : "div", attrs = params, currentPath = path, lastUpdate = null
					render = (routeResolver.render || identity).bind(routeResolver)
					run()
				}
				if (payload.view) update({}, payload)
				else {
					if (payload.onmatch) {
						Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
							update(payload, resolved)
						}, bail)
					}
					else update(payload, "div")
				}
			}, bail)
			redrawService.subscribe(root, run)
		}
		route.set = function(path, data, options) {
			if (lastUpdate != null) options = {replace: true}
			lastUpdate = null
			routeService.setPath(path, data, options)
		}
		route.get = function() {return currentPath}
		route.prefix = function(prefix) {routeService.prefix = prefix}
		route.link = function(vnode) {
			vnode.dom.setAttribute("href", routeService.prefix + vnode.attrs.href)
			vnode.dom.onclick = function(e) {
				if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
				e.preventDefault()
				e.redraw = false
				var href = this.getAttribute("href")
				if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
				route.set(href, undefined, undefined)
			}
		}
	
		return route
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict"
	
	var buildQueryString = __webpack_require__(14)
	var parseQueryString = __webpack_require__(23)
	
	module.exports = function($window) {
		var supportsPushState = typeof $window.history.pushState === "function"
		var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	
		function normalize(fragment) {
			var data = $window.location[fragment].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
			if (fragment === "pathname" && data[0] !== "/") data = "/" + data
			return data
		}
	
		var asyncId
		function debounceAsync(callback) {
			return function() {
				if (asyncId != null) return
				asyncId = callAsync(function() {
					asyncId = null
					callback()
				})
			}
		}
	
		function parsePath(path, queryData, hashData) {
			var queryIndex = path.indexOf("?")
			var hashIndex = path.indexOf("#")
			var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
			if (queryIndex > -1) {
				var queryEnd = hashIndex > -1 ? hashIndex : path.length
				var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
				for (var key in queryParams) queryData[key] = queryParams[key]
			}
			if (hashIndex > -1) {
				var hashParams = parseQueryString(path.slice(hashIndex + 1))
				for (var key in hashParams) hashData[key] = hashParams[key]
			}
			return path.slice(0, pathEnd)
		}
	
		var router = {prefix: "#!"}
		router.getPath = function() {
			var type = router.prefix.charAt(0)
			switch (type) {
				case "#": return normalize("hash").slice(router.prefix.length)
				case "?": return normalize("search").slice(router.prefix.length) + normalize("hash")
				default: return normalize("pathname").slice(router.prefix.length) + normalize("search") + normalize("hash")
			}
		}
		router.setPath = function(path, data, options) {
			var queryData = {}, hashData = {}
			path = parsePath(path, queryData, hashData)
			if (data != null) {
				for (var key in data) queryData[key] = data[key]
				path = path.replace(/:([^\/]+)/g, function(match, token) {
					delete queryData[token]
					return data[token]
				})
			}
	
			var query = buildQueryString(queryData)
			if (query) path += "?" + query
	
			var hash = buildQueryString(hashData)
			if (hash) path += "#" + hash
	
			if (supportsPushState) {
				var state = options ? options.state : null
				var title = options ? options.title : null
				$window.onpopstate()
				if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
				else $window.history.pushState(state, title, router.prefix + path)
			}
			else $window.location.href = router.prefix + path
		}
		router.defineRoutes = function(routes, resolve, reject) {
			function resolveRoute() {
				var path = router.getPath()
				var params = {}
				var pathname = parsePath(path, params, params)
				
				var state = $window.history.state
				if (state != null) {
					for (var k in state) params[k] = state[k]
				}
				for (var route in routes) {
					var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
	
					if (matcher.test(pathname)) {
						pathname.replace(matcher, function() {
							var keys = route.match(/:[^\/]+/g) || []
							var values = [].slice.call(arguments, 1, -2)
							for (var i = 0; i < keys.length; i++) {
								params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
							}
							resolve(routes[route], params, path, route)
						})
						return
					}
				}
	
				reject(path, params)
			}
			
			if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
			else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
			resolveRoute()
		}
		
		return router
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate))

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict"
	
	module.exports = function(string) {
		if (string === "" || string == null) return {}
		if (string.charAt(0) === "?") string = string.slice(1)
	
		var entries = string.split("&"), data = {}, counters = {}
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i].split("=")
			var key = decodeURIComponent(entry[0])
			var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
	
			if (value === "true") value = true
			else if (value === "false") value = false
	
			var levels = key.split(/\]\[?|\[/)
			var cursor = data
			if (key.indexOf("[") > -1) levels.pop()
			for (var j = 0; j < levels.length; j++) {
				var level = levels[j], nextLevel = levels[j + 1]
				var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
				var isValue = j === levels.length - 1
				if (level === "") {
					var key = levels.slice(0, j).join()
					if (counters[key] == null) counters[key] = 0
					level = counters[key]++
				}
				if (cursor[level] == null) {
					cursor[level] = isValue ? value : isNumber ? [] : {}
				}
				cursor = cursor[level]
			}
		}
		return data
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict"
	
	module.exports = function(attrName, callback, context) {
		return function(e) {
			return callback.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
		}
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17)(window)

/***/ },
/* 26 */
/***/ function(module, exports) {

	(function () {
	  var truesilver = {
	    component: component,
	    connect: Connector(),
	  }
	
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = truesilver
	  } else {
	    window.truesilver = truesilver
	  }
	
	  function Connector (context ) {
	    var refs = []
	    context = typeof context === 'undefined' ? {} : context
	
	    connect.replaceContext = function (pContext) {
	      context = pContext
	    }
	
	    Object.defineProperty(connect, 'context', {
	      get: function () {
	        return context
	      },
	      set: function (props) {
	        return Object.assign(context, props)
	      }
	    })
	
	    connect.withContext = Connector
	
	    return connect
	
	    function connect (mapStateToProps, mapDispatchToProps, mergeProps) {
	      if (typeof mapStateToProps === 'object' && mapStateToProps.hasOwnProperty('view')) {
	        refs = [context]
	        return connectedComponent(mapStateToProps)
	      }
	
	      if (typeof mapStateToProps === 'function') {
	        refs.push(function () {
	          return mapStateToProps(context.getState())
	        })
	      } else if (typeof mapStateToProps != null) {
	        refs.push(function () {
	          return context.getState()
	        })
	      }
	
	      if (typeof mapDispatchToProps === 'object') {
	        refs.push(Object.keys(mapDispatchToProps).reduce(function (out, key) {
	          out[key] = function (val) {
	            return function () {
	              return context.dispatch(mapDispatchToProps[key](val))
	            }
	          }
	        }, {}))
	      } else if (typeof mapDispatchToProps === 'function') {
	        refs.push(mapDispatchToProps(context.dispatch))
	      }
	
	      return connectedComponent
	
	      function connectedComponent (component) {
	        return Object.assign({}, component, {
	          oninit (vnode) {
	            this.streams = []
	            addConnectedProps(vnode.state)
	
	            if (component.oninit) {
	              component.oninit.call(vnode.state, vnode)
	            }
	          },
	          onbeforeupdate (vnode, old) {
	            addConnectedProps(vnode.state)
	
	            if (component.onbeforeupdate)
	              return component.onbeforeupdate.call(vnode.state, vnode, old)
	
	            return true
	          },
	          onbeforeremove (vnode) {
	            addConnectedProps(vnode.state)
	
	            if (component.onbeforeremove)
	              return component.onbeforeremove.call(vnode.state, vnode)
	
	            return null
	          },
	          onremove (vnode) {
	            if (Array.isArray(this.streams))
	              this.streams.forEach(s => s.end(true))
	
	            if (component.onremove)
	              component.onremove.call(vnode.state, vnode)
	          },
	        })
	      }
	
	      function addConnectedProps (props) {
	        var toAdd = refs.map(function (f) {
	          if (typeof f === 'function') return f()
	          return f
	        })
	
	        return Object.assign.apply(null, [props].concat(toAdd))
	      }
	    }
	  }
	
	  function component (initializor) {
	    return {
	      oninit: function (vnode) {
	        this.view = initializor(vnode)
	      },
	      view: function (vnode) {
	        return this.view(vnode)
	      }
	    }
	  }
	})();


/***/ },
/* 27 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"navlist":"main__navlist__3Z5i1","navitem":"main__navitem__3Cxe0","navlink":"main__navlink__3-nf9","navlink_active":"main__navlink_active__1CAoz"};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mithril = __webpack_require__(2);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	var _stream = __webpack_require__(29);
	
	var _stream2 = _interopRequireDefault(_stream);
	
	var _truesilver = __webpack_require__(26);
	
	var _portal = __webpack_require__(31);
	
	var _portal2 = _interopRequireDefault(_portal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DOM = {
	  click: (0, _stream2.default)(),
	  blur: (0, _stream2.default)()
	};
	document.addEventListener('click', DOM.click);
	document.addEventListener('blur', DOM.blur, true);
	_truesilver.connect.context = { DOM: DOM };
	
	var inner = (0, _truesilver.component)(function (_ref) {
	  var attrs = _ref.attrs,
	      state = _ref.state;
	
	  state.close = function (e) {
	    console.log('close');
	    attrs.active(false);
	  };
	
	  var onclick = function onclick() {
	    console.log('div click');
	    state.close();
	  };
	
	  return function () {
	    return (0, _mithril2.default)('div', { onclick: onclick }, 123);
	  };
	});
	inner.oncreate = function (_ref2) {
	  var state = _ref2.state;
	
	  state.streams = [state.DOM.click.map(function (e) {
	    console.log('click');
	    state.close();
	    _mithril2.default.redraw();
	  })];
	};
	inner.onremove = function () {
	  return console.log('removing');
	};
	inner = (0, _truesilver.connect)(inner);
	
	exports.default = (0, _truesilver.component)(function () {
	  var active = (0, _stream2.default)(false);
	  var onclick = function onclick(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    console.log('open');
	    active(true);
	  };
	
	  return function () {
	    return [(0, _mithril2.default)('button', { onclick: onclick }, 'open lightbox'), active() ? (0, _mithril2.default)(_portal2.default, {
	      component: inner,
	      attrs: { active: active }
	    }) : null];
	  };
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30)

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict"
	
	var guid = 0, HALT = {}
	function createStream() {
		function stream() {
			if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0])
			return stream._state.value
		}
		initStream(stream)
	
		if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0])
	
		return stream
	}
	function initStream(stream) {
		stream.constructor = createStream
		stream._state = {id: guid++, value: undefined, state: 0, derive: undefined, recover: undefined, deps: {}, parents: [], endStream: undefined}
		stream.map = stream["fantasy-land/map"] = map, stream["fantasy-land/ap"] = ap, stream["fantasy-land/of"] = createStream
		stream.valueOf = valueOf, stream.toJSON = toJSON, stream.toString = valueOf
	
		Object.defineProperties(stream, {
			end: {get: function() {
				if (!stream._state.endStream) {
					var endStream = createStream()
					endStream.map(function(value) {
						if (value === true) unregisterStream(stream), unregisterStream(endStream)
						return value
					})
					stream._state.endStream = endStream
				}
				return stream._state.endStream
			}}
		})
	}
	function updateStream(stream, value) {
		updateState(stream, value)
		for (var id in stream._state.deps) updateDependency(stream._state.deps[id], false)
		finalize(stream)
	}
	function updateState(stream, value) {
		stream._state.value = value
		stream._state.changed = true
		if (stream._state.state !== 2) stream._state.state = 1
	}
	function updateDependency(stream, mustSync) {
		var state = stream._state, parents = state.parents
		if (parents.length > 0 && parents.every(active) && (mustSync || parents.some(changed))) {
			var value = stream._state.derive()
			if (value === HALT) return false
			updateState(stream, value)
		}
	}
	function finalize(stream) {
		stream._state.changed = false
		for (var id in stream._state.deps) stream._state.deps[id]._state.changed = false
	}
	
	function combine(fn, streams) {
		if (!streams.every(valid)) throw new Error("Ensure that each item passed to m.prop.combine/m.prop.merge is a stream")
		return initDependency(createStream(), streams, function() {
			return fn.apply(this, streams.concat([streams.filter(changed)]))
		})
	}
	
	function initDependency(dep, streams, derive) {
		var state = dep._state
		state.derive = derive
		state.parents = streams.filter(notEnded)
	
		registerDependency(dep, state.parents)
		updateDependency(dep, true)
	
		return dep
	}
	function registerDependency(stream, parents) {
		for (var i = 0; i < parents.length; i++) {
			parents[i]._state.deps[stream._state.id] = stream
			registerDependency(stream, parents[i]._state.parents)
		}
	}
	function unregisterStream(stream) {
		for (var i = 0; i < stream._state.parents.length; i++) {
			var parent = stream._state.parents[i]
			delete parent._state.deps[stream._state.id]
		}
		for (var id in stream._state.deps) {
			var dependent = stream._state.deps[id]
			var index = dependent._state.parents.indexOf(stream)
			if (index > -1) dependent._state.parents.splice(index, 1)
		}
		stream._state.state = 2 //ended
		stream._state.deps = {}
	}
	
	function map(fn) {return combine(function(stream) {return fn(stream())}, [this])}
	function ap(stream) {return combine(function(s1, s2) {return s1()(s2())}, [stream, this])}
	function valueOf() {return this._state.value}
	function toJSON() {return this._state.value != null && typeof this._state.value.toJSON === "function" ? this._state.value.toJSON() : this._state.value}
	
	function valid(stream) {return stream._state }
	function active(stream) {return stream._state.state === 1}
	function changed(stream) {return stream._state.changed}
	function notEnded(stream) {return stream._state.state !== 2}
	
	function merge(streams) {
		return combine(function() {
			return streams.map(function(s) {return s()})
		}, streams)
	}
	createStream["fantasy-land/of"] = createStream
	createStream.merge = merge
	createStream.combine = combine
	createStream.HALT = HALT
	
	module.exports = createStream


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mithril = __webpack_require__(2);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  oncreate: function oncreate(_ref) {
	    var attrs = _ref.attrs;
	
	    this.portal = document.createElement('div');
	    document.body.appendChild(this.portal);
	    _mithril2.default.mount(this.portal, {
	      view: function view() {
	        return (0, _mithril2.default)(attrs.component, attrs.attrs || {});
	      }
	    });
	  },
	  onremove: function onremove() {
	    var _this = this;
	
	    _mithril2.default.mount(this.portal, null);
	    setTimeout(function () {
	      return document.body.removeChild(_this.portal);
	    }, 0);
	  },
	  view: function view() {
	    return null;
	  }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map