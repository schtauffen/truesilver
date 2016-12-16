(function () {
  var truesilver = {
    selectState: selectState,
    bindActions: bindActions,
    component: Component()
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = truesilver
  } else {
    window.truesilver = truesilver
  }

  function selectState (selector) {
    return function (context) {
      return selector(context.getState())
    }
  }

  function bindActions (actions) {
    return function (context) {
      return Object.keys(actions)
        .reduce(function (out, key) {
          out[key] = function (val) {
            return function () {
              context.dispatch(actions[key](val))
            }
          }
          return out
        }, {})
    }
  }

  function Component (context) {
    context = typeof context === 'undefined' ? {} : context

    component.replaceContext = function (pContext) {
      context = pContext
    }

    Object.defineProperty(component, 'context', {
      get: function () {
        return context
      },
      set: function (props) {
        return Object.assign(context, props)
      }
    })

    component.withContext = Component

    return component

    function component (initializor, selector) {

      if (Array.isArray(selector) || arguments.length > 2) {
        var i
        var il = arguments.length
        var selectors = []

        for (i = 1; i < il; ++i) {
          selectors = selectors.concat(arguments[i])
        }

        selector = function (context) {
          return selectors.reduce(function (out, sel) {
            return Object.assign(out, sel(context))
          }, {})
        }
      }

      return {
        oninit: function (vnode) {
          this.view = initializor(this.getContext(vnode))
        },
        getContext: function (vnode) {
            var ctx = selector ? selector(context) : context
            vnode = vnode ? { vnode: vnode } : {}
            return Object.assign({}, ctx, vnode)
        },
        view: function (vnode) {
          return this.view(this.getContext(vnode))
        }
      }
    }
  }
})();
